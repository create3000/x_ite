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
import X3DNode                        from "../Core/X3DNode.js";
import X3DSingleTextureCoordinateNode from "../Texturing/X3DSingleTextureCoordinateNode.js";
import X3DConstants                   from "../../Base/X3DConstants.js";
import Vector3                        from "../../../standard/Math/Numbers/Vector3.js";

function TextureCoordinate3D (executionContext)
{
   X3DSingleTextureCoordinateNode .call (this, executionContext);

   this .addType (X3DConstants .TextureCoordinate3D);
}

Object .assign (Object .setPrototypeOf (TextureCoordinate3D .prototype, X3DSingleTextureCoordinateNode .prototype),
{
   initialize ()
   {
      X3DSingleTextureCoordinateNode .prototype .initialize .call (this);

      this ._point .addInterest ("set_point__", this);

      this .set_point__ ();
   },
   set_point__ ()
   {
      this .point  = this ._point .getValue ();
      this .length = this ._point .length;
   },
   isEmpty ()
   {
      return this .length === 0;
   },
   getSize ()
   {
      return this .length;
   },
   get1Point (index, result)
   {
      if (index < this .length)
      {
         const point = this .point;

         index *= 3;

         return result .set (point [index], point [index + 1], point [index + 2], 1);
      }
      else
      {
         return result .set (0, 0, 0, 1);
      }
   },
   set1Point: (() =>
   {
      const point = new Vector3 ();

      return function (index, { x, y, z, w })
      {
         this ._point [index] = point .set (x, y, z) .divide (w);
      };
   })(),
   addPointToChannel (index, array)
   {
      if (index >= 0 && this .length)
      {
         const
            point = this .point,
            i     = (index % this .length) * 3;

         array .push (point [i], point [i + 1], point [i + 2], 1);
      }
      else
      {
         array .push (0, 0, 0, 1);
      }
   },
   addPoints (array)
   {
      const
         point  = this .point,
         length = this .length;

      for (let i = 0, p = 0; i < length; ++ i, p += 3)
         array .push (point [p], point [p + 1], point [p + 2], 1);

      return array;
   },
});

Object .defineProperties (TextureCoordinate3D,
{
   ... X3DNode .getStaticProperties ("TextureCoordinate3D", "Texturing3D", 1, "texCoord", "3.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mapping",  new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "point",    new Fields .MFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default TextureCoordinate3D;
