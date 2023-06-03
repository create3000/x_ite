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

import Fields                         from "../../Fields.js";
import X3DFieldDefinition             from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray           from "../../Base/FieldDefinitionArray.js";
import X3DSingleTextureCoordinateNode from "../Texturing/X3DSingleTextureCoordinateNode.js";
import X3DConstants                   from "../../Base/X3DConstants.js";
import Vector4                        from "../../../standard/Math/Numbers/Vector4.js";

function TextureCoordinate4D (executionContext)
{
   X3DSingleTextureCoordinateNode .call (this, executionContext);

   this .addType (X3DConstants .TextureCoordinate4D);
}

TextureCoordinate4D .prototype = Object .assign (Object .create (X3DSingleTextureCoordinateNode .prototype),
{
   constructor: TextureCoordinate4D,
   getContainerField: function ()
   {
      return "texCoord";
   },
   getSpecificationRange: function ()
   {
      return ["3.1", "Infinity"];
   },
   initialize: function ()
   {
      X3DSingleTextureCoordinateNode .prototype .initialize .call (this);

      this ._point .addInterest ("set_point__", this);

      this .set_point__ ();
   },
   set_point__: function ()
   {
      this .point  = this ._point .getValue ();
      this .length = this ._point .length;
   },
   isEmpty: function ()
   {
      return this .length === 0;
   },
   getSize: function ()
   {
      return this .length;
   },
   get1Point: function (index, vector)
   {
      if (index >= 0 && index < this .length)
      {
         const point = this .point;

         index *= 4;

         return vector .set (point [index], point [index + 1], point [index + 2], point [index + 3]);
      }
      else if (index >= 0 && this .length)
      {
         const point = this .point;

         index %= this .length;
         index *= 4;

         return vector .set (point [index], point [index + 1], point [index + 2], point [index + 3]);
      }
      else
      {
         return vector .set (0, 0, 0, 1);
      }
   },
   getPoints: function (array)
   {
      const
         point  = this .point,
         length = this .length;

      for (let i = 0, p = 0; i < length; ++ i, p += 4)
         array .push (point [p], point [p + 1], point [p + 2], point [p + 3]);

      return array;
   },
   addPointToChannel: function (index, array)
   {
      if (index >= 0 && index < this .length)
      {
         const point = this .point;

         index *= 4;

         array .push (point [index], point [index + 1], point [index + 2], point [index + 3]);
      }
      else if (index >= 0 && this .length)
      {
         const point = this .point;

         index %= this .length;
         index *= 4;

         array .push (point [index], point [index + 1], point [index + 2], point [index + 3]);
      }
      else
      {
         array .push (0, 0, 0, 1);
      }
   },
});

Object .defineProperties (TextureCoordinate4D,
{
   typeName:
   {
      value: "TextureCoordinate4D",
   },
   componentName:
   {
      value: "Texturing3D",
   },
   containerField:
   {
      value: "texCoord",
   },
   specificationRange:
   {
      value: Object .freeze (["3.1", "Infinity"]),
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mapping",  new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "point",    new Fields .MFVec4f ()),
      ]),
   },
});

export default TextureCoordinate4D;
