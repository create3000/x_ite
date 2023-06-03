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
import X3DTextureCoordinateNode from "./X3DTextureCoordinateNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import X3DCast                  from "../../Base/X3DCast.js";

function MultiTextureCoordinate (executionContext)
{
   X3DTextureCoordinateNode .call (this, executionContext);

   this .addType (X3DConstants .MultiTextureCoordinate);

   const browser = this .getBrowser ();

   this .maxTexCoords           = browser .getMaxTexCoords ();
   this .textureCoordinateNodes = [ ];
}

MultiTextureCoordinate .prototype = Object .assign (Object .create (X3DTextureCoordinateNode .prototype),
{
   constructor: MultiTextureCoordinate,
   getTypeName: function ()
   {
      return "MultiTextureCoordinate";
   },
   getComponentName: function ()
   {
      return "Texturing";
   },
   getContainerField: function ()
   {
      return "texCoord";
   },
   getSpecificationRange: function ()
   {
      return ["3.0", "Infinity"];
   },
   initialize: function ()
   {
      X3DTextureCoordinateNode .prototype .initialize .call (this);

      this ._texCoord .addInterest ("set_texCoord__", this);

      this .set_texCoord__ ();
   },
   set_texCoord__: function ()
   {
      const textureCoordinateNodes = this .textureCoordinateNodes;

      for (const textureCoordinateNode of textureCoordinateNodes)
         textureCoordinateNode .removeInterest ("addNodeEvent", this);

      textureCoordinateNodes .length = 0;

      for (const node of this ._texCoord)
      {
         const textureCoordinateNode = X3DCast (X3DConstants .X3DSingleTextureCoordinateNode, node);

         if (textureCoordinateNode)
            textureCoordinateNodes .push (textureCoordinateNode);
      }

      for (const textureCoordinateNode of textureCoordinateNodes)
         textureCoordinateNode .addInterest ("addNodeEvent", this);
   },
   getCount: function ()
   {
      return Math .min (this .maxTexCoords, this .textureCoordinateNodes .length);
   },
   isEmpty: function ()
   {
      return true;
   },
   getSize: function ()
   {
      return 0;
   },
   get1Point: function (index, vector)
   {
      for (const textureCoordinateNode of this .textureCoordinateNodes)
         return textureCoordinateNode .get1Point (index, vector);

      return vector .set (0, 0, 0, 1);
   },
   getPoints: function (array)
   {
      for (const textureCoordinateNode of this .textureCoordinateNodes)
         return textureCoordinateNode .getPoints (array);

      return array;
   },
   init: function (multiArray)
   {
      const
         textureCoordinateNodes = this .textureCoordinateNodes,
         length                 = Math .min (this .maxTexCoords, textureCoordinateNodes .length);

      for (let i = 0; i < length; ++ i)
         textureCoordinateNodes [i] .init (multiArray);
   },
   addPoint: function (index, multiArray)
   {
      const
         textureCoordinateNodes = this .textureCoordinateNodes,
         length                 = Math .min (this .maxTexCoords, textureCoordinateNodes .length);

      for (let i = 0; i < length; ++ i)
         textureCoordinateNodes [i] .addPointToChannel (index, multiArray [i]);
   },
   getTextureCoordinateMapping: function (textureCoordinateMapping)
   {
      const
         textureCoordinateNodes = this .textureCoordinateNodes,
         length                 = Math .min (this .maxTexCoords, textureCoordinateNodes .length);

      for (let i = 0; i < length; ++ i)
         textureCoordinateNodes [i] .getTextureCoordinateMapping (textureCoordinateMapping, i);
   },
   setShaderUniforms: function (gl, shaderObject)
   {
      const
         textureCoordinateNodes = this .textureCoordinateNodes,
         length                 = Math .min (this .maxTexCoords, textureCoordinateNodes .length);

      if (length)
      {
         for (let i = 0; i < length; ++ i)
            textureCoordinateNodes [i] .setShaderUniforms (gl, shaderObject, i);
      }
      else
      {
         this .getBrowser () .getDefaultTextureCoordinate () .setShaderUniforms (gl, shaderObject, 0);
      }
   },
});

Object .defineProperties (MultiTextureCoordinate,
{
   typeName:
   {
      value: "MultiTextureCoordinate",
   },
   componentName:
   {
      value: "Texturing",
   },
   containerField:
   {
      value: "texCoord",
   },
   specificationRange:
   {
      value: Object .freeze (["3.0", "Infinity"]),
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "texCoord", new Fields .MFNode ()),
      ]),
   },
});

export default MultiTextureCoordinate;
