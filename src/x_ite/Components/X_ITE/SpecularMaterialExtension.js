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
import X3DMaterialExtensionNode from "./X3DMaterialExtensionNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import X3DCast                  from "../../Base/X3DCast.js";

function SpecularMaterialExtension (executionContext)
{
   X3DMaterialExtensionNode .call (this, executionContext);

   this .addType (X3DConstants .SpecularMaterialExtension);

   this .specularColorArray = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (SpecularMaterialExtension .prototype, X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._specular             .addInterest ("set_specular__",             this);
      this ._specularTexture      .addInterest ("set_specularTexture__",      this);
      this ._specularColor        .addInterest ("set_specularColor__",        this);
      this ._specularColorTexture .addInterest ("set_specularColorTexture__", this);

      this .set_specular__ ();
      this .set_specularTexture__ ();
      this .set_specularColor__ ();
      this .set_specularColorTexture__ ();
   },
   getExtensionKey ()
   {
      return 6;
   },
   set_specular__ ()
   {
      this .specular = Math .max (this ._specular .getValue (), 0);
   },
   set_specularTexture__ ()
   {
      this .specularTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._specularTexture);

      this .setTexture (0, this .specularTextureNode);
   },
   set_specularColor__ ()
   {
      //We cannot use this in Windows Edge:
      //this .specularColorArray .set (this ._specularColor .getValue ());

      const
         specularColorArray = this .specularColorArray,
         specularColor      = this ._specularColor .getValue ();

      specularColorArray [0] = specularColor .r;
      specularColorArray [1] = specularColor .g;
      specularColorArray [2] = specularColor .b;
   },
   set_specularColorTexture__ ()
   {
      this .specularColorTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._specularColorTexture);

      this .setTexture (1, this .specularColorTextureNode);
   },
   getShaderOptions (options)
   {
      options .push ("X3D_SPECULAR_MATERIAL_EXT");

      if (!+this .getTextureBits ())
         return;

      options .push ("X3D_MATERIAL_TEXTURES");

      if (this .specularTextureNode)
         options .push ("X3D_SPECULAR_MATERIAL_EXT_SPECULAR_TEXTURE", `X3D_SPECULAR_MATERIAL_EXT_SPECULAR_TEXTURE_${this .specularTextureNode .getTextureTypeString ()}`);

      if (this .specularTextureNode ?.getTextureType () === 1)
         options .push ("X3D_SPECULAR_MATERIAL_EXT_SPECULAR_TEXTURE_FLIP_Y");

      if (this .specularColorTextureNode)
         options .push ("X3D_SPECULAR_MATERIAL_EXT_SPECULAR_COLOR_TEXTURE", `X3D_SPECULAR_MATERIAL_EXT_SPECULAR_COLOR_TEXTURE_${this .specularColorTextureNode .getTextureTypeString ()}`);

      if (this .specularColorTextureNode ?.getTextureType () === 1)
         options .push ("X3D_SPECULAR_MATERIAL_EXT_SPECULAR_COLOR_TEXTURE_FLIP_Y");
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform1f  (shaderObject .x3d_SpecularEXT,      this .specular);
      gl .uniform3fv (shaderObject .x3d_SpecularColorEXT, this .specularColorArray);

      if (+this .getTextureBits ())
      {
         // Specular parameters

         if (this .specularTextureNode)
         {
            const
               specularTextureMapping = this ._specularTextureMapping .getValue (),
               specularTexture        = shaderObject .x3d_SpecularTextureEXT;

            this .specularTextureNode .setShaderUniforms (gl, shaderObject, renderObject, specularTexture);

            gl .uniform1i (specularTexture .textureTransformMapping,  textureTransformMapping  .get (specularTextureMapping) ?? 0);
            gl .uniform1i (specularTexture .textureCoordinateMapping, textureCoordinateMapping .get (specularTextureMapping) ?? 0);
         }

         // Specular color parameters

         if (this .specularColorTextureNode)
         {
            const
               specularColorTextureMapping = this ._specularColorTextureMapping .getValue (),
               specularColorTexture        = shaderObject .x3d_SpecularColorTextureEXT;

            this .specularColorTextureNode .setShaderUniforms (gl, shaderObject, renderObject, specularColorTexture);

            gl .uniform1i (specularColorTexture .textureTransformMapping,  textureTransformMapping  .get (specularColorTextureMapping) ?? 0);
            gl .uniform1i (specularColorTexture .textureCoordinateMapping, textureCoordinateMapping .get (specularColorTextureMapping) ?? 0);
         }
      }
   },
});

Object .defineProperties (SpecularMaterialExtension,
{
   typeName:
   {
      value: "SpecularMaterialExtension",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "X_ITE", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "extensions",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "4.0", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specular",                    new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specularTextureMapping",      new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specularTexture",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specularColor",               new Fields .SFColor (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specularColorTextureMapping", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specularColorTexture",        new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default SpecularMaterialExtension;