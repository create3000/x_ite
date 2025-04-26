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

import Triangle3 from "./Triangle3.js";
import Matrix4   from "../Numbers/Matrix4.js";
import Vector3   from "../Numbers/Vector3.js";
import SAT       from "../Algorithms/SAT.js";

function Box3 (/* size, center */)
{
   this .matrix = new Matrix4 ();

   this .set (... arguments);
}

Object .assign (Box3 .prototype,
{
   copy ()
   {
      const copy = Object .create (Box3 .prototype);
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
   getMatrix ()
   {
      return this .matrix;
   },
   set (size, center)
   {
      switch (arguments .length)
      {
         case 0:
         {
            this .matrix .set (0, 0, 0, 0,
                               0, 0, 0, 0,
                               0, 0, 0, 0,
                               0, 0, 0, 0);

            return this;
         }
         case 2:
         {
            this .matrix .set (size .x / 2, 0, 0, 0,
                               0, size .y / 2, 0, 0,
                               0, 0, size .z / 2, 0,
                               center .x, center .y, center .z, 1);

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
         sz = (max .z - min .z) / 2,
         cx = (max .x + min .x) / 2,
         cy = (max .y + min .y) / 2,
         cz = (max .z + min .z) / 2;

      this .matrix .set (sx, 0,  0,  0,
                         0,  sy, 0,  0,
                         0,  0,  sz, 0,
                         cx, cy, cz, 1);

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
      const
         r1 = new Vector3 (),
         p1 = new Vector3 (),
         p4 = new Vector3 ();

      return function (min, max)
      {
         const
            m = this .matrix,
            x = m .xAxis,
            y = m .yAxis,
            z = m .zAxis;

         r1 .assign (y) .add (z);

         const r2 = z .subtract (y);

         p1 .assign (x) .add (r1),
         p4 .assign (x) .add (r2);

         const
            p2 = r1 .subtract (x),
            p3 = r2 .subtract (x);

         min .assign (p1) .min (p2, p3, p4);
         max .assign (p1) .max (p2, p3, p4);

         p1 .negate ();
         p2 .negate ();
         p3 .negate ();
         p4 .negate ();

         min .min (p1, p2, p3, p4);
         max .max (p1, p2, p3, p4);
      };
   })(),
   getPoints: (() =>
   {
      const
         x  = new Vector3 (),
         y  = new Vector3 (),
         z  = new Vector3 (),
         r1 = new Vector3 ();

      return function (points)
      {
         /*
          * p6 ---------- p5
          * | \           | \
          * | p2------------ p1
          * |  |          |  |
          * |  |          |  |
          * p7 |_________ p8 |
          *  \ |           \ |
          *   \|            \|
          *    p3 ---------- p4
          */

         const m = this .matrix;

         x .assign (m .xAxis);
         y .assign (m .yAxis);
         z .assign (m .zAxis);

         r1 .assign (y) .add (z);

         const r2 = z .subtract (y);

         points [0] .assign (x)  .add (r1);
         points [1] .assign (r1) .subtract (x);
         points [2] .assign (r2) .subtract (x);
         points [3] .assign (x)  .add (r2);

         points [4] .assign (points [2]) .negate ();
         points [5] .assign (points [3]) .negate ();
         points [6] .assign (points [0]) .negate ();
         points [7] .assign (points [1]) .negate ();

         const center = this .center;

         points [0] .add (center);
         points [1] .add (center);
         points [2] .add (center);
         points [3] .add (center);

         points [4] .add (center);
         points [5] .add (center);
         points [6] .add (center);
         points [7] .add (center);

         return points;
      };
   })(),
   getAxes (axes)
   {
      const m = this .matrix;

      axes [0] .assign (m .xAxis);
      axes [1] .assign (m .yAxis);
      axes [2] .assign (m .zAxis);

      return axes;
   },
   getNormals: (() =>
   {
      const
         x = new Vector3 (),
         y = new Vector3 (),
         z = new Vector3 ();

      const axes = [ Vector3 .xAxis, Vector3 .yAxis, Vector3 .zAxis ];

      return function (normals)
      {
         const m = this .matrix;

         x .assign (m .xAxis);
         y .assign (m .yAxis);
         z .assign (m .zAxis);

         if (x .norm () === 0)
         {
            x .assign (y) .cross (z);

            if (x .norm () === 0)
            {
               for (const axis of axes)
               {
                  x .assign (axis) .cross (y);

                  if (x .norm () !== 0)
                     break;
               }

               if (x .norm () === 0)
               {
                  for (const axis of axes)
                  {
                     x .assign (axis) .cross (z);

                     if (x .norm () !== 0)
                        break;
                  }

                  if (x .norm () === 0)
                     x .assign (Vector3 .xAxis);
               }
            }
         }

         if (y .norm () === 0)
         {
            y .assign (z) .cross (x);

            if (y .norm () === 0)
            {
               for (const axis of axes)
               {
                  y .assign (axis) .cross (z);

                  if (y .norm () !== 0)
                     break;
               }

               if (y .norm () === 0)
               {
                  for (const axis of axes)
                  {
                     y .assign (axis) .cross (x);

                     if (y .norm () !== 0)
                        break;
                  }

                  if (y .norm () === 0)
                     y .assign (Vector3 .yAxis);
               }
            }
         }

         if (z .norm () === 0)
         {
            z .assign (x) .cross (y);

            if (z .norm () === 0)
            {
               for (const axis of axes)
               {
                  z .assign (axis) .cross (x);

                  if (z .norm () !== 0)
                     break;
               }

               if (z .norm () === 0)
               {
                  for (const axis of axes)
                  {
                     z .assign (axis) .cross (y);

                     if (z .norm () !== 0)
                        break;
                  }

                  if (z .norm () === 0)
                     z .assign (Vector3 .zAxis);
               }
            }
         }

         normals [0] .assign (y) .cross (z) .normalize ();
         normals [1] .assign (z) .cross (x) .normalize ();
         normals [2] .assign (x) .cross (y) .normalize ();

         return normals;
      };
   })(),
   isEmpty ()
   {
      return this .matrix [15] === 0;
   },
   add: (() =>
   {
      const
         lhs_min = new Vector3 (),
         lhs_max = new Vector3 (),
         rhs_min = new Vector3 (),
         rhs_max = new Vector3 ();

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
   containsPoint: (() =>
   {
      const
         min = new Vector3 (),
         max = new Vector3 ();

      return function (point)
      {
         this .getExtents (min, max);

         return min .x <= point .x &&
                max .x >= point .x &&
                min .y <= point .y &&
                max .y >= point .y &&
                min .z <= point .z &&
                max .z >= point .z;
      };
   })(),
   intersectsBox: (() =>
   {
      const
         points1 = Array .from ({ length: 8 }, () => new Vector3 ()),
         points2 = Array .from ({ length: 8 }, () => new Vector3 ()),
         axes1   = Array .from ({ length: 3 }, () => new Vector3 ()),
         axes2   = Array .from ({ length: 3 }, () => new Vector3 ()),
         axes9   = Array .from ({ length: 9 }, () => new Vector3 ()),
         normals = Array .from ({ length: 3 }, () => new Vector3 ());

      return function (other)
      {
         // Test special cases.

         if (this .isEmpty ())
            return false;

         if (other .isEmpty ())
            return false;

         // Get points.

         this  .getPoints (points1);
         other .getPoints (points2);

         // Test the three planes spanned by the normal vectors of the faces of the first parallelepiped.

         if (SAT .isSeparated (this .getNormals (normals), points1, points2))
            return false;

         // Test the three planes spanned by the normal vectors of the faces of the second parallelepiped.

         if (SAT .isSeparated (other .getNormals (normals), points1, points2))
            return false;

         // Test the nine other planes spanned by the edges of each parallelepiped.

         this  .getAxes (axes1);
         other .getAxes (axes2);

         for (let i1 = 0; i1 < 3; ++ i1)
         {
            for (let i2 = 0; i2 < 3; ++ i2)
               axes9 [i1 * 3 + i2] .assign (axes1 [i1]) .cross (axes2 [i2]);
         }

         if (SAT .isSeparated (axes9, points1, points2))
            return false;

         // Both boxes intersect.

         return true;
      };
   })(),
   intersectsTriangle: (() =>
   {
      const
         points1        = Array .from ({ length: 8 }, () => new Vector3 ()),
         axes1          = Array .from ({ length: 3 }, () => new Vector3 ()),
         axes9          = Array .from ({ length: 9 }, () => new Vector3 ()),
         normals        = Array .from ({ length: 3 }, () => new Vector3 ()),
         triangle       = [ ],
         triangleNormal = [ new Vector3 () ],
         triangleEdges  = Array .from ({ length: 3 }, () => new Vector3 ());

      return function (a, b, c)
      {
         // Test special cases.

         if (this .isEmpty ())
            return false;

         // Get points.

         this .getPoints (points1);

         triangle [0] = a;
         triangle [1] = b;
         triangle [2] = c;

         // Test the three planes spanned by the normal vectors of the faces of the first parallelepiped.

         if (SAT .isSeparated (this .getNormals (normals), points1, triangle))
            return false;

         // Test the normal of the triangle.

         Triangle3 .normal (a, b, c, triangleNormal [0]);

         if (SAT .isSeparated (triangleNormal, points1, triangle))
            return false;

         // Test the nine other planes spanned by the edges of each parallelepiped.

         this .getAxes (axes1);

         triangleEdges [0] .assign (a) .subtract (b);
         triangleEdges [1] .assign (b) .subtract (c);
         triangleEdges [2] .assign (c) .subtract (a);

         for (let i1 = 0; i1 < 3; ++ i1)
         {
            for (let i2 = 0; i2 < 3; ++ i2)
               axes9 [i1 * 3 + i2] .assign (axes1 [i1]) .cross (triangleEdges [i2]);
         }

         if (SAT .isSeparated (axes9, points1, triangle))
            return false;

         // Box and triangle intersect.

         return true;
      };
   })(),
   toString ()
   {
      return `${this .size}, ${this .center}`;
   },
});

Object .assign (Box3,
{
   Extents (min, max)
   {
      return new Box3 () .setExtents (min, max);
   },
   Points (points)
   {
      const
         min = new Vector3 (Number .POSITIVE_INFINITY, Number .POSITIVE_INFINITY, Number .POSITIVE_INFINITY),
         max = new Vector3 (Number .NEGATIVE_INFINITY, Number .NEGATIVE_INFINITY, Number .NEGATIVE_INFINITY);

      for (const point of points)
      {
         min .min (point);
         max .max (point);
      }

      return new Box3 () .setExtents (min, max);
   },
});

Object .defineProperties (Box3 .prototype,
{
   size:
   {
      get: (() =>
      {
         const
            min = new Vector3 (),
            max = new Vector3 ();

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

export default Box3;
