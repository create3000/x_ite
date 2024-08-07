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
import X3DNode                 from "../Core/X3DNode.js";
import X3DTextureTransformNode from "./X3DTextureTransformNode.js";
import X3DConstants            from "../../Base/X3DConstants.js";
import X3DCast                 from "../../Base/X3DCast.js";

function MultiTextureTransform (executionContext)
{
   X3DTextureTransformNode .call (this, executionContext);

   this .addType (X3DConstants .MultiTextureTransform);

   const browser = this .getBrowser ();

   this .maxTextureTransforms  = browser .getMaxTextureTransforms ();
   this .textureTransformNodes = [ ];
}

Object .assign (Object .setPrototypeOf (MultiTextureTransform .prototype, X3DTextureTransformNode .prototype),
{
   initialize ()
   {
      X3DTextureTransformNode .prototype .initialize .call (this);

      this ._textureTransform .addInterest ("set_textureTransform__", this);

      this .set_textureTransform__ ();
   },
   set_textureTransform__ ()
   {
      const textureTransformNodes = this .textureTransformNodes;

      textureTransformNodes .length = 0;

      for (const node of this ._textureTransform)
      {
         const textureTransformNode = X3DCast (X3DConstants .X3DSingleTextureTransformNode, node);

         if (textureTransformNode)
            textureTransformNodes .push (textureTransformNode);
      }

      if (!textureTransformNodes .length)
         textureTransformNodes .push (this .getBrowser () .getDefaultTextureTransform ());
   },
   getCount ()
   {
      return Math .min (this .maxTextureTransforms, this .textureTransformNodes .length);
   },
   getTextureTransformMapping (textureTransformMapping)
   {
      const
         textureTransformNodes = this .textureTransformNodes,
         length                = Math .min (this .maxTextureTransforms, textureTransformNodes .length);

      for (let i = 0; i < length; ++ i)
         textureTransformNodes [i] .getTextureTransformMapping (textureTransformMapping, i);
   },
   setShaderUniforms (gl, shaderObject)
   {
      const
         textureTransformNodes = this .textureTransformNodes,
         length                = Math .min (this .maxTextureTransforms, textureTransformNodes .length);

      for (let i = 0; i < length; ++ i)
         textureTransformNodes [i] .setShaderUniforms (gl, shaderObject, i);
   },
   transformPoint (texCoord)
   {
      return this .textureTransformNodes [0] .transformPoint (texCoord);
   },
});

Object .defineProperties (MultiTextureTransform,
{
   typeName:
   {
      value: "MultiTextureTransform",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Texturing", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "textureTransform",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.0", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "textureTransform", new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default MultiTextureTransform;
