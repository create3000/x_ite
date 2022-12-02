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

const
   extents1 = { min: 0, max: 0 },
   extents2 = { min: 0, max: 0 };

/**
 *  Class to represent the Separating Axis Theorem.
 */
function SAT () { }

SAT .isSeparated = function (axes, points1, points2)
{
   // https://gamedev.stackexchange.com/questions/25397/obb-vs-obb-collision-detection

   for (const axis of axes)
   {
      project (points1, axis, extents1);
      project (points2, axis, extents2);

      if (overlaps (extents1 .min, extents1 .max, extents2 .min, extents2 .max))
         continue;

      return true;
   }

   return false;
};

///  Projects @a points to @a axis and returns the minimum and maximum bounds.
function project (points, axis, extents)
{
   extents .min = Number .POSITIVE_INFINITY;
   extents .max = Number .NEGATIVE_INFINITY;

   for (const point of points)
   {
      // Just dot it to get the min and max along this axis.
      // NOTE: the axis must be normalized to get accurate projections to calculate the MTV, but if it is only needed to
      // know whether it overlaps, every axis can be used.

      const dotVal = point .dot (axis);

      if (dotVal < extents .min)
         extents .min = dotVal;

      if (dotVal > extents .max)
         extents .max = dotVal;
   }
}

///  Returns true if both ranges overlap, otherwise false.
function overlaps (min1, max1, min2, max2)
{
   return is_between (min2, min1, max1) || is_between (min1, min2, max2);
}

///  Returns true if @a value is between @a lowerBound and @a upperBound, otherwise false.
function is_between (value, lowerBound, upperBound)
{
   return lowerBound <= value && value <= upperBound;
}

export default SAT;
