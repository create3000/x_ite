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

const Algorithm =
{
   radians (value)
   {
      // Convert degrees to radians.
      return value * (Math .PI / 180);
   },
   degrees (value)
   {
      // Convert radians to degrees.
      return value * (180 / Math .PI);
   },
   random (min, max)
   {
      return min + Math .random () * (max - min);
   },
   fract (value)
   {
      return value % 1;
   },
   clamp (value, min, max)
   {
      // https://registry.khronos.org/OpenGL-Refpages/gl4/html/clamp.xhtml
      return Math .min (Math .max (value, min), max);
   },
   interval (value, low, high)
   {
      if (value >= high)
         return ((value - low) % (high - low)) + low;

      if (value < low)
         return ((value - high) % (high - low)) + high;

      return value;
   },
   roundToMultiple (value, multiple)
   {
      return Math .ceil (value / multiple) * multiple;
   },
   lerp (source, destination, t)
   {
      return source + t * (destination - source);
   },
   slerp (source, destination, t)
   {
      let cosom = source .dot (destination);

      // if (cosom <= -1) ... vectors are inverse colinear.

      if (cosom >= 1) // Both normal vectors are equal.
         return source;

      if (cosom < 0)
      {
         // Reverse signs so we travel the short way round.
         cosom = -cosom;
         destination .negate ();
      }

      const
         omega  = Math .acos (cosom),
         sinom  = Math .sin  (omega),
         scale0 = Math .sin ((1 - t) * omega) / sinom,
         scale1 = Math .sin (t * omega) / sinom;

      source .x = source .x * scale0 + destination .x * scale1;
      source .y = source .y * scale0 + destination .y * scale1;
      source .z = source .z * scale0 + destination .z * scale1;
      source .w = source .w * scale0 + destination .w * scale1;

      return source;
   },
   simpleSlerp (source, destination, t)
   {
      const cosom = source .dot (destination);

      // if (cosom <= -1) ... vectors are inverse colinear.

      if (cosom >= 1) // Both normal vectors are equal.
         return source;

      const
         omega  = Math .acos (cosom),
         sinom  = Math .sin  (omega),
         scale0 = Math .sin ((1 - t) * omega) / sinom,
         scale1 = Math .sin (t * omega) / sinom;

      source .x = source .x * scale0 + destination .x * scale1;
      source .y = source .y * scale0 + destination .y * scale1;
      source .z = source .z * scale0 + destination .z * scale1;
      source .w = source .w * scale0 + destination .w * scale1;

      return source;
   },
   isPowerOfTwo (n)
   {
      return ((n - 1) & n) === 0;
   },
   nextPowerOfTwo (n)
   {
      ///  Returns the next power of two of @a n. If n is a power of two, n is returned.

      if (Algorithm .isPowerOfTwo (n))
         return n;

      return 1 << (32 - Math .clz32 (n));
   },
   bitCount (n)
   {
      n = n - ((n >>> 1) & 0x55555555);
      n = (n & 0x33333333) + ((n >>> 2) & 0x33333333);
      return ((n + (n >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24;
   },
   cmp (lhs, rhs)
   {
      return lhs > rhs ? 1 : lhs < rhs ? -1 : 0;
   },
   less (lhs, rhs)
   {
      return lhs < rhs;
   },
   greater (lhs, rhs)
   {
      return lhs > rhs;
   },
   lowerBound (array, first, last, value, comp = Algorithm.less)
   {
      // https://en.cppreference.com/w/cpp/algorithm/lower_bound

      let
         index = 0,
         step  = 0,
         count = last - first;

      while (count > 0)
      {
         step  = count >>> 1;
         index = first + step;

         if (comp (array [index], value))
         {
            first  = ++ index;
            count -= step + 1;
         }
         else
            count = step;
      }

      return first;
   },
   upperBound (array, first, last, value, comp = Algorithm.less)
   {
      // sen.cppreference.com/w/cpp/algorithm/upper_bound

      let
         index = 0,
         step  = 0,
         count = last - first;

      while (count > 0)
      {
         step  = count >>> 1;
         index = first + step;

         if (comp (value, array [index]))
            count = step;

         else
         {
            first  = ++ index;
            count -= step + 1;
         }
      }

      return first;
   },
};

export default Algorithm;
