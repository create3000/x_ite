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

import Vector2 from "../Numbers/Vector2.js";

const Triangle2 =
{
   /**
    *
    * @param {Vector2} a first point of triangle
    * @param {Vector2} b second point of triangle
    * @param {Vector2} c third point of triangle
    * @returns
    */
   area ({ x: ax, y: ay }, { x: bx, y: by }, { x: cx, y: cy })
   {
      return Math .abs (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by)) / 2;
   },
   /**
    *
    * @param {Vector2} p point to test
    * @param {Vector2} a first point of triangle
    * @param {Vector2} b second point of triagle
    * @param {Vector2} c third point of triangle
    * @returns
    */
   isPointInTriangle ({ x: px, y: py }, { x: ax, y: ay }, { x: bx, y: by }, { x: cx, y: cy })
   {
      // https://en.wikipedia.org/wiki/Barycentric_coordinate_system

      const det = (by - cy) * (ax - cx) + (cx - bx) * (ay - cy);

      if (det === 0)
         return false;

      const u = ((by - cy) * (px - cx) + (cx - bx) * (py - cy)) / det;

      if (u < 0 || u > 1)
         return false;

      const v = ((cy - ay) * (px - cx) + (ax - cx) * (py - cy)) / det;

      if (v < 0 || v > 1)
         return false;

      const t = 1 - u - v;

      if (t < 0 || t > 1)
         return false;

      return true;
   },
   /**
    *
    * @param {Vector2} p point to convert
    * @param {Vector2} a first point of triangle
    * @param {Vector2} b second point of triangle
    * @param {Vector2} c third point of triangle
    * @returns
    */
   toBarycentric: (function ()
   {
      const
         v0 = new Vector2 (),
         v1 = new Vector2 (),
         v2 = new Vector2 ();

      return function (point, a, b, c, result = { })
      {
         v0 .assign (b) .subtract (a);
         v1 .assign (c) .subtract (a);
         v2 .assign (point) .subtract (a);

         const
            d00   = v0 .dot (v0),
            d01   = v0 .dot (v1),
            d11   = v1 .dot (v1),
            d20   = v2 .dot (v0),
            d21   = v2 .dot (v1),
            denom = d00 * d11 - d01 * d01;

         result .v = (d11 * d20 - d01 * d21) / denom;
         result .t = (d00 * d21 - d01 * d20) / denom;
         result .u = 1 - result .v - result .t;

         return result;
      };
   })(),
};

export default Triangle2;
