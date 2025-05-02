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

import Matrix3 from "../Numbers/Matrix3.js";
import Vector2 from "../Numbers/Vector2.js";

function Box2 (... args) /* size, center */
{
   this .matrix = new Matrix3 ();

   this .set (... args);
}

Object .assign (Box2 .prototype,
{
   copy ()
   {
      const copy = Object .create (Box2 .prototype);

      copy .matrix = this .matrix .copy ();

      return copy;
   },
   assign (box)
   {
      this .matrix .assign (box .matrix);

      return this;
   },
   equals (box)
   {
      return this .matrix .equals (box .matrix);
   },
   set (size, center)
   {
      switch (arguments .length)
      {
         case 0:
         {
            this .matrix .set (0, 0, 0,
                               0, 0, 0,
                               0, 0, 0);

            return this;
         }
         case 2:
         {
            this .matrix .set (size .x / 2, 0, 0,
                               0, size .y / 2, 0,
                               center .x, center .y, 1);

            return this;
         }
         // case 3:
         // {
         //    console .trace ()
         //    return this .setExtents (arguments [0], arguments [1]);
         // }
      }
   },
   setExtents (min, max)
   {
      const
         sx = (max .x - min .x) / 2,
         sy = (max .y - min .y) / 2,
         cx = (max .x + min .x) / 2,
         cy = (max .y + min .y) / 2;

      this .matrix .set (sx,  0, 0,
                          0, sy, 0,
                         cx, cy, 1);

      return this;
   },
   isEmpty ()
   {
      return this .matrix [8] === 0;
   },
   add: (() =>
   {
      const
         lhs_min = new Vector2 (),
         lhs_max = new Vector2 (),
         rhs_min = new Vector2 (),
         rhs_max = new Vector2 ();

      return function (box)
      {
         if (this .isEmpty ())
            return this .assign (box);

         if (box .isEmpty ())
            return this;

         this .getExtents (lhs_min, lhs_max);
         box  .getExtents (rhs_min, rhs_max);

         return this .setExtents (lhs_min .min (rhs_min), lhs_max .max (rhs_max));
      };
   })(),
   multLeft (matrix)
   {
      this .matrix .multLeft (matrix);
      return this;
   },
   multRight (matrix)
   {
      this .matrix .multRight (matrix);
      return this;
   },
   getExtents (min, max)
   {
      this .getAbsoluteExtents (min, max);

      min .add (this .center);
      max .add (this .center);
   },
   getAbsoluteExtents: (() =>
   {
      const p1 = new Vector2 ();

      return function (min, max)
      {
         const
            m = this .matrix,
            x = m .xAxis,
            y = m .yAxis;

         p1 .assign (x) .add (y);

         const p2 = y .subtract (x);

         min .assign (p1) .min (p2);
         max .assign (p1) .max (p2);

         p1 .negate ();
         p2 .negate ();

         min .min (p1, p2);
         max .max (p1, p2);
      };
   })(),
   containsPoint: (() =>
   {
      const
         min = new Vector2 (),
         max = new Vector2 ();

      return function (point)
      {
         this .getExtents (min, max);

         return min .x <= point .x &&
                max .x >= point .x &&
                min .y <= point .y &&
                max .y >= point .y;
      };
   })(),
   toString ()
   {
      return `${this .size}, ${this .center}`;
   },
});

Object .assign (Box2,
{
   Extents (min, max)
   {
      return new Box2 () .setExtents (min, max);
   },
   Points (points)
   {
      const
         min = new Vector2 (Number .POSITIVE_INFINITY, Number .POSITIVE_INFINITY),
         max = new Vector2 (Number .NEGATIVE_INFINITY, Number .NEGATIVE_INFINITY);

      for (const point of points)
      {
         min .min (point);
         max .max (point);
      }

      return new Box2 () .setExtents (min, max);
   },
});

Object .defineProperties (Box2 .prototype,
{
   size:
   {
      get: (() =>
      {
         const
            min = new Vector2 (),
            max = new Vector2 ();

         return function ()
         {
            this .getAbsoluteExtents (min, max);

            return max .subtract (min);
         };
      })(),
      enumerable: true,
   },
   center:
   {
      get ()
      {
         return this .matrix .origin;
      },
      enumerable: true,
   },
});

export default Box2;
