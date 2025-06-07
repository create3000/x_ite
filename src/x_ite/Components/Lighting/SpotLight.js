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
import Algorithm            from "../../../standard/Math/Algorithm.js";
import ObjectCache          from "../../../standard/Utility/ObjectCache.js";

const SpotLights = ObjectCache (SpotLightContainer);

function SpotLightContainer ()
{
   this .location                      = new Vector3 ();
   this .direction                     = new Vector3 ();
   this .matrixArray                   = new Float32Array (9);
   this .renderShadow                  = true;
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
   this .lightBBoxMin                  = new Vector3 ();
   this .lightBBoxMax                  = new Vector3 ();
   this .textureUnit                   = undefined;
}

Object .assign (SpotLightContainer .prototype,
{
   set (lightNode, groupNode, modelViewMatrix)
   {
      const shadowMapSize = lightNode .getShadowMapSize ();

      this .browser   = lightNode .getBrowser ();
      this .lightNode = lightNode;
      this .groupNode = groupNode;
      this .global    = lightNode .getGlobal ();

      this .matrixArray .set (modelViewMatrix .submatrix .inverse ());

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

      invLightSpaceMatrix .translate (lightNode .getLocation ());
      invLightSpaceMatrix .rotate (this .rotation .setFromToVec (Vector3 .zAxis, this .direction .assign (lightNode .getDirection ()) .negate ()));
      invLightSpaceMatrix .inverse ();

      const
         groupBBox        = this .groupNode .getSubBBox (this .bbox, true),                 // Group bbox.
         lightBBox        = groupBBox .multRight (invLightSpaceMatrix),                     // Group bbox from the perspective of the light.
         lightBBoxExtents = lightBBox .getExtents (this .lightBBoxMin, this .lightBBoxMax), // Result not used, but arguments.
         shadowMapSize    = lightNode .getShadowMapSize (),
         farValue         = Math .min (lightNode .getRadius (), -this .lightBBoxMin .z),
         viewport         = this .viewport .set (0, 0, shadowMapSize, shadowMapSize),
         projectionMatrix = Camera .perspective (lightNode .getCutOffAngle () * 2, 0.125, Math .max (10000, farValue), shadowMapSize, shadowMapSize, this .projectionMatrix); // Use higher far value for better precision.

      this .renderShadow = farValue > 0;

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
      const
         lightNode       = this .lightNode,
         modelViewMatrix = this .modelViewMatrix .get ();

      modelViewMatrix .multVecMatrix (this .location  .assign (lightNode ._location  .getValue ()));
      modelViewMatrix .multDirMatrix (this .direction .assign (lightNode ._direction .getValue ())) .normalize ();

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
               gl .bindTexture (gl .TEXTURE_2D, this .shadowBuffer .getColorTexture0 ());

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
         { lightNode, location, direction } = this,
         color                              = lightNode .getColor (),
         attenuation                        = lightNode .getAttenuation ();

      gl .uniform1i        (shaderObject .x3d_LightType [i],             3);
      gl .uniform3f        (shaderObject .x3d_LightColor [i],            color .r, color .g, color .b);
      gl .uniform1f        (shaderObject .x3d_LightIntensity [i],        lightNode .getIntensity ());
      gl .uniform1f        (shaderObject .x3d_LightAmbientIntensity [i], lightNode .getAmbientIntensity ());
      gl .uniform3f        (shaderObject .x3d_LightAttenuation [i],      Math .max (0, attenuation .x), Math .max (0, attenuation .y), Math .max (0, attenuation .z));
      gl .uniform3f        (shaderObject .x3d_LightLocation [i],         location .x, location .y, location .z);
      gl .uniform3f        (shaderObject .x3d_LightDirection [i],        direction .x, direction .y, direction .z);
      gl .uniform1f        (shaderObject .x3d_LightRadius [i],           lightNode .getRadius ());
      gl .uniform1f        (shaderObject .x3d_LightBeamWidth [i],        lightNode .getBeamWidth ());
      gl .uniform1f        (shaderObject .x3d_LightCutOffAngle [i],      lightNode .getCutOffAngle ());
      gl .uniformMatrix3fv (shaderObject .x3d_LightMatrix [i], false,    this .matrixArray);

      if (this .renderShadow && this .shadowBuffer)
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

      SpotLights .push (this);
   },
});

function SpotLight (executionContext)
{
   X3DLightNode .call (this, executionContext);

   this .addType (X3DConstants .SpotLight);

   // Units

   this ._location    .setUnit ("length");
   this ._radius      .setUnit ("length");
   this ._beamWidth   .setUnit ("angle");
   this ._cutOffAngle .setUnit ("angle");

   // Legacy

   if (executionContext .getSpecificationVersion () == 3.3)
   {
      this ._beamWidth   = 0.785398;
      this ._cutOffAngle = 1.5708;
   }
   else if (executionContext .getSpecificationVersion () <= 3.2)
   {
      this ._beamWidth   = 1.5708;
      this ._cutOffAngle = 0.785398;
   }
}

Object .assign (Object .setPrototypeOf (SpotLight .prototype, X3DLightNode .prototype),
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
   getBeamWidth ()
   {
      // If the beamWidth is greater than the cutOffAngle, beamWidth is defined to be equal to the cutOffAngle.

      const
         beamWidth   = this ._beamWidth .getValue (),
         cutOffAngle = this .getCutOffAngle ();

      if (beamWidth > cutOffAngle)
         return cutOffAngle;

      return Algorithm .clamp (beamWidth, 0, Math .PI / 2);
   },
   getCutOffAngle ()
   {
      return Algorithm .clamp (this ._cutOffAngle .getValue (), 0, Math .PI / 2);
   },
   getLights ()
   {
      return SpotLights;
   },
});

Object .defineProperties (SpotLight,
{
   ... X3DNode .getStaticProperties ("SpotLight", "Lighting", 2, "children", "2.0"),
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
         new X3DFieldDefinition (X3DConstants .inputOutput,    "direction",        new Fields .SFVec3f (0, 0, -1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "radius",           new Fields .SFFloat (100)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "beamWidth",        new Fields .SFFloat (0.589049)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "cutOffAngle",      new Fields .SFFloat (1.570796)),

         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadows",         new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowColor",     new Fields .SFColor ()),      // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowIntensity", new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowBias",      new Fields .SFFloat (0.005)), // skip test
         new X3DFieldDefinition (X3DConstants .initializeOnly, "shadowMapSize",   new Fields .SFInt32 (1024)),  // skip test
      ]),
      enumerable: true,
   },
});

export default SpotLight;
