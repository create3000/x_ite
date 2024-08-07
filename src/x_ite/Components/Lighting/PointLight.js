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
import Camera               from "../../../standard/Math/Geometry/Camera.js";
import ViewVolume           from "../../../standard/Math/Geometry/ViewVolume.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Vector4              from "../../../standard/Math/Numbers/Vector4.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix3              from "../../../standard/Math/Numbers/Matrix3.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import MatrixStack          from "../../../standard/Math/Utility/MatrixStack.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";
import ObjectCache          from "../../../standard/Utility/ObjectCache.js";

// Shadow map layout
// Compact layout:
//
// xzXZ      Char: Axis
// yyYY      Case: Sign

const orientationMatrices = [
   new Matrix4 () .setRotation (new Rotation4 (new Vector3 ( 1,  0,  0), Vector3 .zAxis)), // left
   new Matrix4 () .setRotation (new Rotation4 (new Vector3 (-1,  0,  0), Vector3 .zAxis)), // right
   new Matrix4 () .setRotation (new Rotation4 (new Vector3 ( 0,  0, -1), Vector3 .zAxis)), // front
   new Matrix4 () .setRotation (new Rotation4 (new Vector3 ( 0,  0,  1), Vector3 .zAxis)), // back
   new Matrix4 () .setRotation (new Rotation4 (new Vector3 ( 0,  1,  0), Vector3 .zAxis)), // bottom
   new Matrix4 () .setRotation (new Rotation4 (new Vector3 ( 0, -1,  0), Vector3 .zAxis)), // top
];

const viewports = [
   new Vector4 (0,    0.5, 0.25, 0.5), // left
   new Vector4 (0.5,  0.5, 0.25, 0.5), // right
   new Vector4 (0.75, 0.5, 0.25, 0.5), // front
   new Vector4 (0.25, 0.5, 0.25, 0.5), // back
   new Vector4 (0.0,  0,   0.5,  0.5), // bottom
   new Vector4 (0.5,  0,   0.5,  0.5), // top
];

const PointLights = ObjectCache (PointLightContainer);

function PointLightContainer ()
{
   this .location                      = new Vector3 ();
   this .matrixArray                   = new Float32Array (9);
   this .shadowBuffer                  = null;
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
   this .rotationMatrix                = new Matrix4 ();
   this .textureUnit                   = undefined;
}

Object .assign (PointLightContainer .prototype,
{
   set (lightNode, groupNode, modelViewMatrix)
   {
      const shadowMapSize = lightNode .getShadowMapSize ();

      this .browser   = lightNode .getBrowser ();
      this .lightNode = lightNode;
      this .groupNode = groupNode;
      this .global    = lightNode .getGlobal ();

      this .matrixArray .set (modelViewMatrix .submatrix .inverse ());

      this .modelViewMatrix .pushMatrix (modelViewMatrix);

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
         lightNode           = this .lightNode,
         cameraSpaceMatrix   = renderObject .getCameraSpaceMatrix () .get (),
         modelMatrix         = this .modelMatrix .assign (this .modelViewMatrix .get ()) .multRight (cameraSpaceMatrix),
         invLightSpaceMatrix = this .invLightSpaceMatrix .assign (this .global ? modelMatrix : Matrix4 .Identity);

      invLightSpaceMatrix .translate (lightNode .getLocation ());
      invLightSpaceMatrix .inverse ();

      const shadowMapSize  = lightNode .getShadowMapSize ();

      this .shadowBuffer .bind ();

      for (let i = 0; i < 6; ++ i)
      {
         const
            v                = viewports [i],
            viewport         = this .viewport .set (v [0] * shadowMapSize, v [1] * shadowMapSize, v [2] * shadowMapSize, v [3] * shadowMapSize),
            projectionMatrix = Camera .perspective2 (Algorithm .radians (90), 0.125, 10000, viewport [2], viewport [3], this .projectionMatrix); // Use higher far value for better precision.

         renderObject .getViewVolumes      () .push (this .viewVolume .set (projectionMatrix, viewport, viewport));
         renderObject .getProjectionMatrix () .pushMatrix (this .projectionMatrix);
         renderObject .getModelViewMatrix  () .pushMatrix (orientationMatrices [i]);
         renderObject .getModelViewMatrix  () .multLeft (invLightSpaceMatrix);

         renderObject .render (TraverseType .SHADOW, X3DGroupingNode .prototype .traverse, this .groupNode);

         renderObject .getModelViewMatrix  () .pop ();
         renderObject .getProjectionMatrix () .pop ();
         renderObject .getViewVolumes () .pop ();
      }

      if (!this .global)
         invLightSpaceMatrix .multLeft (modelMatrix .inverse ());

      this .invLightSpaceProjectionMatrix .assign (invLightSpaceMatrix);
   },
   setGlobalVariables (renderObject)
   {
      this .modelViewMatrix .get () .multVecMatrix (this .location .assign (this .lightNode ._location .getValue ()));

      if (!this .shadowBuffer)
         return;

      this .shadowMatrix .assign (renderObject .getCameraSpaceMatrix () .get ()) .multRight (this .invLightSpaceProjectionMatrix);
      this .shadowMatrixArray .set (this .shadowMatrix);
   },
   setShaderUniforms (gl, shaderObject)
   {
      const i = shaderObject .numLights ++;

      if (this .shadowBuffer)
      {
         const textureUnit = this .global
            ? (this .textureUnit = this .textureUnit ?? this .browser .popTexture2DUnit ())
            : this .browser .getTexture2DUnit ();

         if (textureUnit !== undefined)
         {
            gl .activeTexture (gl .TEXTURE0 + textureUnit);

            if (gl .HAS_FEATURE_DEPTH_TEXTURE)
               gl .bindTexture (gl .TEXTURE_2D, this .shadowBuffer .getDepthTexture ());
            else
               gl .bindTexture (gl .TEXTURE_2D, this .shadowBuffer .getColorTexture ());

            gl .uniform1i (shaderObject .x3d_ShadowMap [i], textureUnit);
         }
         else
         {
            console .warn ("Not enough combined texture units for shadow map available.");
         }
      }

      if (shaderObject .hasLight (i, this))
         return;

      const
         { lightNode, location } = this,
         color                   = lightNode .getColor (),
         attenuation             = lightNode .getAttenuation ();

      gl .uniform1i        (shaderObject .x3d_LightType [i],             2);
      gl .uniform3f        (shaderObject .x3d_LightColor [i],            color .r, color .g, color .b);
      gl .uniform1f        (shaderObject .x3d_LightIntensity [i],        lightNode .getIntensity ());
      gl .uniform1f        (shaderObject .x3d_LightAmbientIntensity [i], lightNode .getAmbientIntensity ());
      gl .uniform3f        (shaderObject .x3d_LightAttenuation [i],      Math .max (0, attenuation .x), Math .max (0, attenuation .y), Math .max (0, attenuation .z));
      gl .uniform3f        (shaderObject .x3d_LightLocation [i],         location .x, location .y, location .z);
      gl .uniform1f        (shaderObject .x3d_LightRadius [i],           lightNode .getRadius ());
      gl .uniformMatrix3fv (shaderObject .x3d_LightMatrix [i], false,    this .matrixArray);

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
      this .browser .pushTexture2DUnit (this .textureUnit);

      this .modelViewMatrix .clear ();

      this .shadowBuffer = null;
      this .textureUnit  = undefined;

      // Return container

      PointLights .push (this);
   },
});

function PointLight (executionContext)
{
   X3DLightNode .call (this, executionContext);

   this .addType (X3DConstants .PointLight);

   this ._location .setUnit ("length");
   this ._radius   .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (PointLight .prototype, X3DLightNode .prototype),
{
   getAttenuation ()
   {
      return this ._attenuation .getValue ();
   },
   getLocation ()
   {
      return this ._location .getValue ();
   },
   getRadius ()
   {
      // Negative values mean infinity.
      return this ._radius .getValue ();
   },
   getLights ()
   {
      return PointLights;
   },
});

Object .defineProperties (PointLight, X3DNode .staticProperties ("PointLight", "Lighting", 2, "children", "2.0"));

Object .defineProperties (PointLight,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "global",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "on",               new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "color",            new Fields .SFColor (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "intensity",        new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "ambientIntensity", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "attenuation",      new Fields .SFVec3f (1, 0, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "location",         new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "radius",           new Fields .SFFloat (100)),

         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadows",         new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowColor",     new Fields .SFColor ()),      // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowIntensity", new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowBias",      new Fields .SFFloat (0.005)), // skip test
         new X3DFieldDefinition (X3DConstants .initializeOnly, "shadowMapSize",   new Fields .SFInt32 (1024)),  // skip test
      ]),
      enumerable: true,
   },
});

export default PointLight;
