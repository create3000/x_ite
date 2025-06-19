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

import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DMaterialExtensionNode from "./X3DMaterialExtensionNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import X3DCast                  from "../../Base/X3DCast.js";
import ExtensionKeys            from "../../Browser/X_ITE/ExtensionKeys.js";
import Algorithm                from "../../../standard/Math/Algorithm.js";

// Register key.

ExtensionKeys .add ("CLEARCOAT_MATERIAL_EXTENSION");

// Register textures.

import MaterialTextures from "../../../assets/shaders/MaterialTextures.js";

MaterialTextures .register ("x3d_ClearcoatTextureEXT");
MaterialTextures .register ("x3d_ClearcoatRoughnessTextureEXT");
MaterialTextures .register ("x3d_ClearcoatNormalTextureEXT");

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function ClearcoatMaterialExtension (executionContext)
{
   X3DMaterialExtensionNode .call (this, executionContext);

   this .addType (X3DConstants .ClearcoatMaterialExtension);
}

Object .assign (Object .setPrototypeOf (ClearcoatMaterialExtension .prototype, X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._clearcoat                 .addInterest ("set_clearcoat__",                 this);
      this ._clearcoatTexture          .addInterest ("set_clearcoatTexture__",          this);
      this ._clearcoatRoughness        .addInterest ("set_clearcoatRoughness__",        this);
      this ._clearcoatRoughnessTexture .addInterest ("set_clearcoatRoughnessTexture__", this);
      this ._clearcoatNormalTexture    .addInterest ("set_clearcoatNormalTexture__",    this);

      this .set_clearcoat__ ();
      this .set_clearcoatTexture__ ();
      this .set_clearcoatRoughness__ ();
      this .set_clearcoatRoughnessTexture__ ();
      this .set_clearcoatNormalTexture__ ();
   },
   set_clearcoat__ ()
   {
      this .clearcoat = Math .max (this ._clearcoat .getValue (), 0);
   },
   set_clearcoatTexture__ ()
   {
      this .clearcoatTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._clearcoatTexture);

      this .setTexture (0, this .clearcoatTextureNode);
   },
   set_clearcoatRoughness__ ()
   {
      this .clearcoatRoughness = Algorithm .clamp (this ._clearcoatRoughness .getValue (), 0, 1);
   },
   set_clearcoatRoughnessTexture__ ()
   {
      this .clearcoatRoughnessTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._clearcoatRoughnessTexture);

      this .setTexture (1, this .clearcoatRoughnessTextureNode);
   },
   set_clearcoatNormalTexture__ ()
   {
      this .clearcoatNormalTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._clearcoatNormalTexture);

      this .setTexture (2, this .clearcoatNormalTextureNode);
   },
   getExtensionKey ()
   {
      return ExtensionKeys .CLEARCOAT_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_CLEARCOAT_MATERIAL_EXT");

      if (!+this .getTextureBits ())
         return;

      options .push ("X3D_MATERIAL_TEXTURES");

      this .clearcoatTextureNode          ?.getShaderOptions (options, "CLEARCOAT",           true);
      this .clearcoatRoughnessTextureNode ?.getShaderOptions (options, "CLEARCOAT_ROUGHNESS", true);
      this .clearcoatNormalTextureNode    ?.getShaderOptions (options, "CLEARCOAT_NORMAL",    true);
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_ClearcoatEXT");
      uniforms .push ("x3d_ClearcoatRoughnessEXT");
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform1f (shaderObject .x3d_ClearcoatEXT,          this .clearcoat);
      gl .uniform1f (shaderObject .x3d_ClearcoatRoughnessEXT, this .clearcoatRoughness);

      if (!+this .getTextureBits ())
         return;

      this .clearcoatTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_ClearcoatTextureEXT,
         this ._clearcoatTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .clearcoatRoughnessTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_ClearcoatRoughnessTextureEXT,
         this ._clearcoatRoughnessTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .clearcoatNormalTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_ClearcoatNormalTextureEXT,
         this ._clearcoatNormalTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);
   },
});

Object .defineProperties (ClearcoatMaterialExtension,
{
   ... X3DNode .getStaticProperties ("ClearcoatMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "clearcoat",                        new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "clearcoatTextureMapping",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "clearcoatTexture",                 new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "clearcoatRoughness",               new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "clearcoatRoughnessTextureMapping", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "clearcoatRoughnessTexture",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "clearcoatNormalTextureMapping",    new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "clearcoatNormalTexture",           new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default ClearcoatMaterialExtension;
