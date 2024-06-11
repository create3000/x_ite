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

import Fields                  from "../../Fields.js";
import X3DFieldDefinition      from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../../Base/FieldDefinitionArray.js";
import X3DOneSidedMaterialNode from "./X3DOneSidedMaterialNode.js";
import X3DConstants            from "../../Base/X3DConstants.js";

function UnlitMaterial (executionContext)
{
   X3DOneSidedMaterialNode .call (this, executionContext);

   this .addType (X3DConstants .UnlitMaterial);
}

Object .assign (Object .setPrototypeOf (UnlitMaterial .prototype, X3DOneSidedMaterialNode .prototype),
{
   initialize ()
   {
      X3DOneSidedMaterialNode .prototype .initialize .call (this);

      this ._emissiveTexture .addInterest ("set_transparent__", this);

      this .set_transparent__ ();
   },
   getMaterialKey ()
   {
      return "0";
   },
   getTextureIndices: (() =>
   {
      let i = 0;

      const textureIndices = {
         EMISSIVE_TEXTURE: i ++,
         NORMAL_TEXTURE: i ++,
      };

      return function ()
      {
         return textureIndices;
      };
   })(),
   set_emissiveTexture__ ()
   {
      this .getEmissiveTexture () ?._transparent .removeInterest ("set_transparent__", this);

      X3DOneSidedMaterialNode .prototype .set_emissiveTexture__ .call (this);

      this .getEmissiveTexture () ?._transparent .addInterest ("set_transparent__", this);
   },
   set_transparent__ ()
   {
      this .setTransparent (this .getTransparency () || this .getEmissiveTexture () ?.isTransparent ());
   },
   createShader (key, geometryContext, renderContext)
   {
      const
         browser = this .getBrowser (),
         options = this .getShaderOptions (geometryContext, renderContext);

      options .push ("X3D_UNLIT_MATERIAL");

      const shaderNode = browser .createShader ("Unlit", "Default", "Unlit", options);

      browser .getShaders () .set (key, shaderNode);

      return shaderNode;
   },
});

Object .defineProperties (UnlitMaterial,
{
   typeName:
   {
      value: "UnlitMaterial",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Shape", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "material",
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
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",               new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveColor",          new Fields .SFColor (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveStrength",       new Fields .SFFloat (1)), // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveTextureMapping", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveTexture",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalScale",            new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalTextureMapping",   new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalTexture",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "transparency",           new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

for (const index of Object .values (UnlitMaterial .prototype .getTextureIndices ()))
{
   UnlitMaterial .prototype [`setTexture${index}`] = function (index, textureNode)
   {
      this .setTexture (index, textureNode);
   };
}

export default UnlitMaterial;
