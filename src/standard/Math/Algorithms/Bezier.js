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

import Algorithm from "../Algorithm.js";

const lerp = Algorithm .lerp;

function Bezier (x0, y0, x1, y1, x2, y2, x3, y3)
{
   this .x0 = x0;
   this .y0 = y0;
   this .x1 = x1;
   this .y1 = y1;
   this .x2 = x2;
   this .y2 = y2;
   this .x3 = x3;
   this .y3 = y3;

   this .order = arguments .length / 2 - 1;
}

Bezier .prototype =
{
   getLUT: function (dimension)
   {
      const
         x0  = this .x0,
         y0  = this .y0,
         x1  = this .x1,
         y1  = this .y1,
         x2  = this .x2,
         y2  = this .y2,
         x3  = this .x3,
         y3  = this .y3,
         lut = [ ];

      switch (this .order)
      {
         case 2:
         {
            for (let i = 0, d = dimension - 1; i < dimension; ++ i)
            {
               lut .push (quadric (x0, y0, x1, y1, x2, y2, i / d));
            }

            break;
         }
         case 3:
         {
            for (let i = 0, d = dimension - 1; i < dimension; ++ i)
            {
               lut .push (cubic (x0, y0, x1, y1, x2, y2, x3, y3, i / d));
            }

            break;
         }
      }

      return lut;
   }
};

function quadric (x0, y0, x1, y1, x2, y2, t)
{
   const
      ax0 = lerp (x0, x1, t),
      ay0 = lerp (y0, y1, t),
      ax1 = lerp (x1, x2, t),
      ay1 = lerp (y1, y2, t),
      bx0 = lerp (ax0, ax1, t),
      by0 = lerp (ay0, ay1, t);

   return {x: bx0, y: by0};
}

function cubic (x0, y0, x1, y1, x2, y2, x3, y3, t)
{
   const
      ax0 = lerp (x0, x1, t),
      ay0 = lerp (y0, y1, t),
      ax1 = lerp (x1, x2, t),
      ay1 = lerp (y1, y2, t),
      ax2 = lerp (x2, x3, t),
      ay2 = lerp (y2, y3, t),
      bx0 = lerp (ax0, ax1, t),
      by0 = lerp (ay0, ay1, t),
      bx1 = lerp (ax1, ax2, t),
      by1 = lerp (ay1, ay2, t),
      cx0 = lerp (bx0, bx1, t),
      cy0 = lerp (by0, by1, t);

   return {x: cx0, y: cy0};
}

export default Bezier;
