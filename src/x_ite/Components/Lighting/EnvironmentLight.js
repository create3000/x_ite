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
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import MatrixStack          from "../../../standard/Math/Utility/MatrixStack.js";
import ObjectCache          from "../../../standard/Utility/ObjectCache.js";

const EnvironmentLights = ObjectCache (EnvironmentLightContainer);

function EnvironmentLightContainer ()
{
   this .modelViewMatrix = new MatrixStack (Matrix4);
   this .rotation        = new Rotation4 ();
   this .rotationMatrix  = new Float32Array (9);
}

Object .assign (EnvironmentLightContainer .prototype,
{
   set (lightNode, groupNode, modelViewMatrix)
   {
      this .browser   = lightNode .getBrowser ();
      this .lightNode = lightNode;
      this .global    = lightNode .getGlobal ();

      this .modelViewMatrix .push (modelViewMatrix);
   },
   renderShadowMap (renderObject)
   { },
   setGlobalVariables (renderObject)
   {
      this .modelViewMatrix .get () .get (null, this .rotation);

      this .rotation
         .multLeft (this .lightNode ._rotation .getValue ())
         .inverse ()
         .getMatrix (this .rotationMatrix);
   },
   setShaderUniforms (gl, shaderObject)
   {
      const
         { browser, lightNode, global } = this,
         color             = lightNode .getColor (),
         diffuseTexture    = lightNode .getDiffuseTexture (),
         specularTexture   = lightNode .getSpecularTexture (),
         GGXLUTTexture     = browser .getLibraryTexture ("lut_ggx.png");

      const diffuseTextureUnit = global
         ? this .diffuseTextureUnit = this .diffuseTextureUnit ?? browser .popTextureCubeUnit ()
         : browser .getTextureCubeUnit ();

      const specularTextureUnit = global
         ? this .specularTextureUnit = this .specularTextureUnit ?? browser .popTextureCubeUnit ()
         : browser .getTextureCubeUnit ();

      const GGXLUTTextureUnit = global
         ? this .GGXLUTTextureUnit = this .GGXLUTTextureUnit ?? browser .popTexture2DUnit ()
         : browser .getTexture2DUnit ();

      gl .uniform3f        (shaderObject .x3d_EnvironmentLightColor,                 color .r, color .g, color .b);
      gl .uniform1f        (shaderObject .x3d_EnvironmentLightIntensity,             lightNode .getIntensity ());
      gl .uniformMatrix3fv (shaderObject .x3d_EnvironmentLightRotation, false,       this .rotationMatrix);
      gl .uniform1i        (shaderObject .x3d_EnvironmentLightDiffuseTextureLinear,  diffuseTexture ?.isLinear ());
      gl .uniform1i        (shaderObject .x3d_EnvironmentLightDiffuseTextureLevels,  diffuseTexture ?.getLevels () ?? 0);
      gl .uniform1i        (shaderObject .x3d_EnvironmentLightSpecularTextureLinear, specularTexture ?.isLinear ());
      gl .uniform1i        (shaderObject .x3d_EnvironmentLightSpecularTextureLevels, specularTexture ?.getLevels () ?? 0);

      gl .activeTexture (gl .TEXTURE0 + diffuseTextureUnit);
      gl .bindTexture (gl .TEXTURE_CUBE_MAP, diffuseTexture ?.getTexture () ?? browser .getDefaultTextureCube ());
      gl .uniform1i (shaderObject .x3d_EnvironmentLightDiffuseTexture, diffuseTextureUnit);

      gl .activeTexture (gl .TEXTURE0 + specularTextureUnit);
      gl .bindTexture (gl .TEXTURE_CUBE_MAP, specularTexture ?.getTexture () ?? browser .getDefaultTextureCube ());
      gl .uniform1i (shaderObject .x3d_EnvironmentLightSpecularTexture, specularTextureUnit);

      gl .activeTexture (gl .TEXTURE0 + GGXLUTTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, GGXLUTTexture .getTexture ());
      gl .uniform1i (shaderObject .x3d_EnvironmentLightGGXLUTTexture, GGXLUTTextureUnit);

      if (shaderObject .x3d_EnvironmentLightCharlieLUTTexture)
      {
         const CharlieLUTTexture = browser .getLibraryTexture ("lut_charlie.png");

         const CharlieLUTTextureUnit = global
            ? this .CharlieLUTTextureUnit = this .CharlieLUTTextureUnit ?? browser .popTexture2DUnit ()
            : browser .getTexture2DUnit ();

         gl .activeTexture (gl .TEXTURE0 + CharlieLUTTextureUnit);
         gl .bindTexture (gl .TEXTURE_2D, CharlieLUTTexture .getTexture ());
         gl .uniform1i (shaderObject .x3d_EnvironmentLightCharlieLUTTexture, CharlieLUTTextureUnit);
      }
   },
   dispose ()
   {
      const browser = this .browser;

      browser .pushTextureCubeUnit (this .diffuseTextureUnit);
      browser .pushTextureCubeUnit (this .specularTextureUnit);
      browser .pushTexture2DUnit   (this .GGXLUTTextureUnit);
      browser .pushTexture2DUnit   (this .CharlieLUTTextureUnit);

      this .modelViewMatrix .clear ();

      this .diffuseTextureUnit    = undefined;
      this .specularTextureUnit   = undefined;
      this .GGXLUTTextureUnit     = undefined;
      this .CharlieLUTTextureUnit = undefined;

      // Return container

      EnvironmentLights .push (this);
   },
});

function EnvironmentLight (executionContext)
{
   X3DLightNode .call (this, executionContext);

   this .addType (X3DConstants .EnvironmentLight);
}

Object .assign (Object .setPrototypeOf (EnvironmentLight .prototype, X3DLightNode .prototype),
{
   initialize ()
   {
      X3DLightNode .prototype .initialize .call (this);

      // Preload LUTs.
      this .getBrowser () .getLibraryTexture ("lut_ggx.png");

      this ._diffuseTexture  .addInterest ("set_diffuseTexture__",  this);
      this ._specularTexture .addInterest ("set_specularTexture__", this);

      this .set_diffuseTexture__ ();
      this .set_specularTexture__ ();
   },
   getLightKey ()
   {
      return 2;
   },
   getDiffuseTexture ()
   {
      return this .diffuseTexture;
   },
   getSpecularTexture ()
   {
      return this .specularTexture;
   },
   getLights ()
   {
      return EnvironmentLights;
   },
   set_diffuseTexture__ ()
   {
      this .diffuseTexture = X3DCast (X3DConstants .X3DEnvironmentTextureNode, this ._diffuseTexture);
   },
   set_specularTexture__ ()
   {
      this .specularTexture = X3DCast (X3DConstants .X3DEnvironmentTextureNode, this ._specularTexture);
   },
});

Object .defineProperties (EnvironmentLight,
{
   ... X3DNode .getStaticProperties ("EnvironmentLight", "Lighting", 3, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "global",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "on",                  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "color",               new Fields .SFColor (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "intensity",           new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "ambientIntensity",    new Fields .SFFloat ()),

         new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",            new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "diffuseCoefficients", new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "diffuseTexture",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "specularTexture",     new Fields .SFNode ()),

         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadows",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowColor",         new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowIntensity",     new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowBias",          new Fields .SFFloat (0.005)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "shadowMapSize",       new Fields .SFInt32 (1024)),
      ]),
      enumerable: true,
   },
});

export default EnvironmentLight;
