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

import Vector3 from "../Numbers/Vector3.js";

function Sphere3 (radius, center)
{
   this .radius = radius;
   this .center = center .copy ();
}

Sphere3 .prototype =
{
   constructor: Sphere3,
   set: function (radius, center)
   {
      this .radius = radius;
      this .center .assign (center);
   },
   intersectsLine: function (line, enterPoint, exitPoint)
   {
      // https://github.com/Alexpux/Coin3D/blob/master/src/base/SbSphere.cpp

      const
         { point, direction } = line,
         { center, radius }   = this;

      const
         b = 2 * (point .dot (direction) - center .dot (direction)),
         c = (point .x * point .x + point .y * point .y + point .z * point .z) +
             (center .x * center .x + center .y * center .y + center .z * center .z) -
             2 * point .dot (center) - radius * radius;

      const core = b * b - 4 * c;

      if (core >= 0)
      {
         let
            t1 = (-b + Math .sqrt (core)) / 2,
            t2 = (-b - Math .sqrt (core)) / 2;

         if (t1 > t2)
         {
            const tmp = t1;
            t1 = t2;
            t2 = tmp;
         }

         enterPoint .assign (direction) .multiply (t1) .add (point);
         exitPoint  .assign (direction) .multiply (t2) .add (point);

         return true;
      }
      else
      {
         return false;
      }
   },
   intersectsTriangle: (function ()
   {
      const
         AB = new Vector3 (0, 0, 0),
         AC = new Vector3 (0, 0, 0),
         BC = new Vector3 (0, 0, 0),
         CA = new Vector3 (0, 0, 0),
         Q1 = new Vector3 (0, 0, 0),
         Q2 = new Vector3 (0, 0, 0),
         Q3 = new Vector3 (0, 0, 0);

      return function (A, B, C)
      {
         const
            P = this .center,
            r = this .radius;

         A .subtract (P);
         B .subtract (P);
         C .subtract (P);

         // Testing if sphere lies outside the triangle plane.

         AB .assign (B) .subtract (A);
         AC .assign (C) .subtract (A);

         const
            rr   = r * r,
            V    = AB .cross (AC),
            d    = Vector3 .dot (A, V),
            e    = Vector3 .dot (V, V),
            sep1 = d * d > rr * e;

         if (sep1)
            return false;

         // Testing if sphere lies outside a triangle vertex.
         const
            aa   = Vector3 .dot (A, A),
            ab   = Vector3 .dot (A, B),
            ac   = Vector3 .dot (A, C),
            bb   = Vector3 .dot (B, B),
            bc   = Vector3 .dot (B, C),
            cc   = Vector3 .dot (C, C),
            sep2 = (aa > rr) && (ab > aa) && (ac > aa),
            sep3 = (bb > rr) && (ab > bb) && (bc > bb),
            sep4 = (cc > rr) && (ac > cc) && (bc > cc);

         if (sep2 || sep3 || sep4)
            return false;

         // Testing if sphere lies outside a triangle edge.

         AB .assign (B) .subtract (A);
         BC .assign (C) .subtract (B);
         CA .assign (A) .subtract (C);

         const
            d1   = ab - aa,
            d2   = bc - bb,
            d3   = ac - cc,
            e1   = Vector3 .dot (AB, AB),
            e2   = Vector3 .dot (BC, BC),
            e3   = Vector3 .dot (CA, CA);

         Q1 .assign (A) .multiply (e1) .subtract (AB .multiply (d1));
         Q2 .assign (B) .multiply (e2) .subtract (BC .multiply (d2));
         Q3 .assign (C) .multiply (e3) .subtract (CA .multiply (d3));

         const
            QC   = C .multiply (e1) .subtract (Q1),
            QA   = A .multiply (e2) .subtract (Q2),
            QB   = B .multiply (e3) .subtract (Q3),
            sep5 = (Vector3 .dot (Q1, Q1) > rr * e1 * e1) && (Vector3 .dot (Q1, QC) > 0),
            sep6 = (Vector3 .dot (Q2, Q2) > rr * e2 * e2) && (Vector3 .dot (Q2, QA) > 0),
            sep7 = (Vector3 .dot (Q3, Q3) > rr * e3 * e3) && (Vector3 .dot (Q3, QB) > 0);

         if (sep5 || sep6 || sep7)
            return false;

         return true;
      };
   })(),
   toString: function ()
   {
      return this .radius + " " + this .center .toString ();
   },
};

export default Sphere3;
