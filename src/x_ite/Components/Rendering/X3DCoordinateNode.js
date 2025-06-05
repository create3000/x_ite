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

import X3DNode                  from "../Core/X3DNode.js";
import X3DGeometricPropertyNode from "./X3DGeometricPropertyNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import Triangle3                from "../../../standard/Math/Geometry/Triangle3.js";
import Vector3                  from "../../../standard/Math/Numbers/Vector3.js";

function X3DCoordinateNode (executionContext)
{
   X3DGeometricPropertyNode .call (this, executionContext);

   this .addType (X3DConstants .X3DCoordinateNode);

   this .length = 0;
}

Object .assign (Object .setPrototypeOf (X3DCoordinateNode .prototype, X3DGeometricPropertyNode .prototype),
{
   initialize ()
   {
      X3DGeometricPropertyNode .prototype .initialize .call (this);

      this ._point .addInterest ("set_point__", this);

      this .set_point__ ();
   },
   set_point__ ()
   {
      this .point  = this ._point .getValue ();
      this .length = this ._point .length;
   },
   getSize ()
   {
      return this .length;
   },
   set1Point (index, point)
   {
      this ._point [index] = point;
   },
   get1Point (index, result)
   {
      if (index < this .length)
      {
         const point = this .point;

         index *= 3;

         return result .set (point [index], point [index + 1], point [index + 2]);
      }
      else
      {
         return result .set (0);
      }
   },
   addPoint (index, array)
   {
      if (index < this .length)
      {
         const point = this .point;

         index *= 3;

         array .push (point [index], point [index + 1], point [index + 2], 1);
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
         length = this .length * 3;

      for (let index = 0; index < length; index += 3)
         array .push (point [index], point [index + 1], point [index + 2], 1);

      return array;
   },
   getNormal: (() =>
   {
      const
         point1 = new Vector3 (),
         point2 = new Vector3 (),
         point3 = new Vector3 ();

      return function (index1, index2, index3)
      {
         // The index[1,2,3] cannot be less than 0.

         const length = this .length;

         if (index1 < length && index2 < length && index3 < length)
         {
            return Triangle3 .normal (this .get1Point (index1, point1),
                                      this .get1Point (index2, point2),
                                      this .get1Point (index3, point3),
                                      new Vector3 ());
         }

         return new Vector3 ();
      };
   })(),
   getQuadNormal: (() =>
   {
      const
         point1 = new Vector3 (),
         point2 = new Vector3 (),
         point3 = new Vector3 (),
         point4 = new Vector3 ();

      return function (index1, index2, index3, index4)
      {
         // The index[1,2,3,4] cannot be less than 0.

         const length = this .length;

         if (index1 < length && index2 < length && index3 < length && index4 < length)
         {
            return Triangle3 .quadNormal (this .get1Point (index1, point1),
                                          this .get1Point (index2, point2),
                                          this .get1Point (index3, point3),
                                          this .get1Point (index4, point4),
                                          new Vector3 ());
         }

         return new Vector3 ();
      };
   })(),
});

Object .defineProperties (X3DCoordinateNode, X3DNode .getStaticProperties ("X3DCoordinateNode", "Rendering", 1));

export default X3DCoordinateNode;
