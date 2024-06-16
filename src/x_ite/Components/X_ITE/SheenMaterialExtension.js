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
import ExtensionKeys            from "../../Browser/X_ITE/ExtensionKeys.js";
import Algorithm                from "../../../standard/Math/Algorithm.js";

function SheenMaterialExtension (executionContext)
{
   X3DMaterialExtensionNode .call (this, executionContext);

   this .addType (X3DConstants .SheenMaterialExtension);

   this .sheenColorArray = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (SheenMaterialExtension .prototype, X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._sheenColor            .addInterest ("set_sheenColor__",            this);
      this ._sheenColorTexture     .addInterest ("set_sheenColorTexture__",     this);
      this ._sheenRoughness        .addInterest ("set_sheenRoughness__",        this);
      this ._sheenRoughnessTexture .addInterest ("set_sheenRoughnessTexture__", this);

      this .set_sheenColor__ ();
      this .set_sheenColorTexture__ ();
      this .set_sheenRoughness__ ();
      this .set_sheenRoughnessTexture__ ();
   },
   getExtensionKey ()
   {
      return ExtensionKeys .SHEEN_MATERIAL_EXTENSION;
   },
   set_sheenColor__ ()
   {
      //We cannot use this in Windows Edge:
      //this .sheenColorArray .set (this ._sheenColor .getValue ());

      const
         sheenColorArray = this .sheenColorArray,
         sheenColor      = this ._sheenColor .getValue ();

      sheenColorArray [0] = sheenColor .r;
      sheenColorArray [1] = sheenColor .g;
      sheenColorArray [2] = sheenColor .b;
   },
   set_sheenColorTexture__ ()
   {
      this .sheenColorTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._sheenColorTexture);

      this .setTexture (0, this .sheenColorTextureNode);
   },
   set_sheenRoughness__ ()
   {
      this .sheenRoughness = Algorithm .clamp (this ._sheenRoughness .getValue (), 0, 1);
   },
   set_sheenRoughnessTexture__ ()
   {
      this .sheenRoughnessTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._sheenRoughnessTexture);

      this .setTexture (1, this .sheenRoughnessTextureNode);
   },
   getShaderOptions (options)
   {
      options .push ("X3D_SHEEN_MATERIAL_EXT");

      if (!+this .getTextureBits ())
         return;

      options .push ("X3D_MATERIAL_TEXTURES");

      this .sheenColorTextureNode     ?.getShaderOptions (options, "SHEEN_COLOR",     true);
      this .sheenRoughnessTextureNode ?.getShaderOptions (options, "SHEEN_ROUGHNESS", true);
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform3fv (shaderObject .x3d_SheenColorEXT,     this .sheenColorArray);
      gl .uniform1f  (shaderObject .x3d_SheenRoughnessEXT, this .sheenRoughness);

      const
         browser              = this .getBrowser (),
         SheenELUTTexture     = browser .getLibraryTexture ("lut_sheen_E.png"),
         SheenELUTTextureUnit = browser .getTexture2DUnit ();

      gl .activeTexture (gl .TEXTURE0 + SheenELUTTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, SheenELUTTexture .getTexture ());
      gl .uniform1i (shaderObject .x3d_SheenELUTTextureEXT, SheenELUTTextureUnit);

      if (+this .getTextureBits ())
      {
         this .sheenColorTextureNode ?.setNamedShaderUniforms (gl,
            shaderObject,
            renderObject,
            shaderObject .x3d_SheenColorTextureEXT,
            this ._sheenColorTextureMapping .getValue (),
            textureTransformMapping,
            textureCoordinateMapping);

         this .sheenRoughnessTextureNode ?.setNamedShaderUniforms (gl,
            shaderObject,
            renderObject,
            shaderObject .x3d_SheenRoughnessTextureEXT,
            this ._sheenRoughnessTextureMapping .getValue (),
            textureTransformMapping,
            textureCoordinateMapping);
      }
   },
});

Object .defineProperties (SheenMaterialExtension,
{
   typeName:
   {
      value: "SheenMaterialExtension",
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
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "sheenColor",                   new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "sheenColorTextureMapping",     new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "sheenColorTexture",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "sheenRoughness",               new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "sheenRoughnessTextureMapping", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "sheenRoughnessTexture",        new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default SheenMaterialExtension;
