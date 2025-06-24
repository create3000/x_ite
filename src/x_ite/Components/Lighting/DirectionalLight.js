/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DLightNode         from "./X3DLightNode.js";
import X3DGroupingNode      from "../Grouping/X3DGroupingNode.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Box3                 from "../../../standard/Math/Geometry/Box3.js";
import Camera               from "../../../standard/Math/Geometry/Camera.js";
import ViewVolume           from "../../../standard/Math/Geometry/ViewVolume.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Vector4              from "../../../standard/Math/Numbers/Vector4.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import MatrixStack          from "../../../standard/Math/Utility/MatrixStack.js";
import ObjectCache          from "../../../standard/Utility/ObjectCache.js";

const DirectionalLights = ObjectCache (DirectionalLightContainer);

function DirectionalLightContainer ()
{
   this .direction                     = new Vector3 ();
   this .shadowBuffer                  = null;
   this .bbox                          = new Box3 ();
   this .viewVolume                    = new ViewVolume ();
   this .viewport                      = new Vector4 ();
   this .projectionMatrix              = new Matrix4 ();
   this .modelViewMatrix               = new MatrixStack (Matrix4);
   this .modelMatrix                   = new Matrix4 ();
   this .invLightSpaceMatrix           = new Matrix4 ();
   this .invLightSpaceProjectionMatrix = new Matrix4 ();
   this .shadowMatrix                  = new Matrix4 ();
   this .shadowMatrixArray             = new Float32Array (16);
   this .rotation                      = new Rotation4 ();
   this .textureUnit                   = undefined;
}

Object .assign (DirectionalLightContainer .prototype,
{
   set (lightNode, groupNode, modelViewMatrix)
   {
      const shadowMapSize = lightNode .getShadowMapSize ();

      this .browser   = lightNode .getBrowser ();
      this .lightNode = lightNode;
      this .groupNode = groupNode;
      this .global    = lightNode .getGlobal ();

      this .modelViewMatrix .push (modelViewMatrix);

      // Get shadow buffer from browser.

      if (lightNode .getShadowIntensity () > 0 && shadowMapSize > 0)
      {
         this .shadowBuffer = this .browser .popShadowBuffer (shadowMapSize);

         if (!this .shadowBuffer)
            console .warn ("Couldn't create shadow buffer.");
      }
   },
   renderShadowMap (renderObject)
   {
      if (!this .shadowBuffer)
         return;

      const
         lightNode            = this .lightNode,
         cameraSpaceMatrix    = renderObject .getCameraSpaceMatrix () .get (),
         modelMatrix          = this .modelMatrix .assign (this .modelViewMatrix .get ()) .multRight (cameraSpaceMatrix),
         invLightSpaceMatrix  = this .invLightSpaceMatrix .assign (this .global ? modelMatrix : Matrix4 .Identity);

      invLightSpaceMatrix .rotate (this .rotation .setFromToVec (Vector3 .zAxis, this .direction .assign (lightNode .getDirection ()) .negate ()));
      invLightSpaceMatrix .inverse ();

      const
         groupBBox        = this .groupNode .getSubBBox (this .bbox, true), // Group bbox.
         lightBBox        = groupBBox .multRight (invLightSpaceMatrix),     // Group bbox from the perspective of the light.
         shadowMapSize    = lightNode .getShadowMapSize (),
         viewport         = this .viewport .set (0, 0, shadowMapSize, shadowMapSize),
         projectionMatrix = Camera .orthoBox (lightBBox, this .projectionMatrix);

      this .shadowBuffer .bind ();

      renderObject .getViewVolumes      () .push (this .viewVolume .set (projectionMatrix, viewport, viewport));
      renderObject .getProjectionMatrix () .push (projectionMatrix);
      renderObject .getModelViewMatrix  () .push (invLightSpaceMatrix);

      renderObject .render (TraverseType .SHADOW, X3DGroupingNode .prototype .traverse, this .groupNode);

      renderObject .getModelViewMatrix  () .pop ();
      renderObject .getProjectionMatrix () .pop ();
      renderObject .getViewVolumes      () .pop ();

      if (!this .global)
         invLightSpaceMatrix .multLeft (modelMatrix .inverse ());

      this .invLightSpaceProjectionMatrix .assign (invLightSpaceMatrix) .multRight (projectionMatrix) .multRight (lightNode .getBiasMatrix ());
   },
   setGlobalVariables (renderObject)
   {
      this .modelViewMatrix .get () .multDirMatrix (this .direction .assign (this .lightNode .getDirection ())) .normalize ();

      if (!this .shadowBuffer)
         return;

      this .shadowMatrix
         .assign (renderObject .getView () ?.inverse ?? Matrix4 .Identity)
         .multRight (renderObject .getCameraSpaceMatrixArray ())
         .multRight (this .invLightSpaceProjectionMatrix);

      this .shadowMatrixArray .set (this .shadowMatrix);
   },
   setShaderUniforms (gl, shaderObject)
   {
      const
         browser = this .browser,
         i       = shaderObject .numLights ++;

      if (this .shadowBuffer)
      {
         const textureUnit = this .global
            ? (this .textureUnit = this .textureUnit ?? browser .popTextureUnit ())
            : browser .getTextureUnit ();

         gl .activeTexture (gl .TEXTURE0 + textureUnit);

         if (gl .HAS_FEATURE_DEPTH_TEXTURE)
            gl .bindTexture (gl .TEXTURE_2D, this .shadowBuffer .getDepthTexture ());
         else
            gl .bindTexture (gl .TEXTURE_2D, this .shadowBuffer .getColorTexture ());

         gl .uniform1i (shaderObject .x3d_ShadowMap [i], textureUnit);
      }
      else
      {
         const textureUnit = browser .getDefaultTexture2DUnit ();

         gl .activeTexture (gl .TEXTURE0 + textureUnit);
         gl .bindTexture (gl .TEXTURE_2D, browser .getDefaultTexture2D ());
         gl .uniform1i (shaderObject .x3d_ShadowMap [i], textureUnit);
      }

      if (shaderObject .hasLight (i, this))
         return;

      const
         { lightNode, direction} = this,
         color                   = lightNode .getColor ();

      gl .uniform1i (shaderObject .x3d_LightType [i],             1);
      gl .uniform3f (shaderObject .x3d_LightColor [i],            color .r, color .g, color .b);
      gl .uniform1f (shaderObject .x3d_LightIntensity [i],        lightNode .getIntensity ());
      gl .uniform1f (shaderObject .x3d_LightAmbientIntensity [i], lightNode .getAmbientIntensity ());
      gl .uniform3f (shaderObject .x3d_LightDirection [i],        direction .x, direction .y, direction .z);
      gl .uniform1f (shaderObject .x3d_LightRadius [i],           -1);

      if (this .shadowBuffer)
      {
         const shadowColor = lightNode .getShadowColor ();

         gl .uniform3f        (shaderObject .x3d_ShadowColor [i],         shadowColor .r, shadowColor .g, shadowColor .b);
         gl .uniform1f        (shaderObject .x3d_ShadowIntensity [i],     lightNode .getShadowIntensity ());
         gl .uniform1f        (shaderObject .x3d_ShadowBias [i],          lightNode .getShadowBias ());
         gl .uniformMatrix4fv (shaderObject .x3d_ShadowMatrix [i], false, this .shadowMatrixArray);
         gl .uniform1i        (shaderObject .x3d_ShadowMapSize [i],       lightNode .getShadowMapSize ());
      }
      else
      {
         gl .uniform1f (shaderObject .x3d_ShadowIntensity [i], 0);
      }
   },
   dispose ()
   {
      this .browser .pushShadowBuffer (this .shadowBuffer);
      this .browser .pushTextureUnit (this .textureUnit);

      this .modelViewMatrix .clear ();

      this .shadowBuffer = null;
      this .textureUnit  = undefined;

      // Return container

      DirectionalLights .push (this);
   },
});

function DirectionalLight (executionContext)
{
   X3DLightNode .call (this, executionContext);

   this .addType (X3DConstants .DirectionalLight);

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.0)
      this ._global = true;
}

Object .assign (Object .setPrototypeOf (DirectionalLight .prototype, X3DLightNode .prototype),
{
   getLights ()
   {
      return DirectionalLights;
   },
});

Object .defineProperties (DirectionalLight,
{
   ... X3DNode .getStaticProperties ("DirectionalLight", "Lighting", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "global",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "on",               new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "color",            new Fields .SFColor (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "intensity",        new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "ambientIntensity", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "direction",        new Fields .SFVec3f (0, 0, -1)),

         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadows",         new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowColor",     new Fields .SFColor ()),        // skip test, Color of shadows
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowIntensity", new Fields .SFFloat (1)),       // Intensity of shadow color in the range (0, 1)
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowBias",      new Fields .SFFloat (0.005)),   // skip test, Bias of the shadow
         new X3DFieldDefinition (X3DConstants .initializeOnly, "shadowMapSize",   new Fields .SFInt32 (1024)),    // skip test, Size of the shadow map in pixels in the range (0, inf).
      ]),
      enumerable: true,
   },
});

export default DirectionalLight;
