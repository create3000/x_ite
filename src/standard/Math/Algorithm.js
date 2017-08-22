/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the Excite Project.
 *
 * Excite is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/



define (function ()
{
"use strict";

	var Algorithm =
	{
		signum: function (value)
		{
			return (0 < value) - (value < 0);
		},
		radians: function (value)
		{
			return value * (Math .PI / 180);
		},
		degrees: function (value)
		{
			return value * (180 / Math .PI);
		},
		random: function (min, max)
		{
			return min + Math .random () * (max - min);
		},
		clamp: function (value, min, max)
		{
			return value < min ? min : (value > max ? max : value);
		},
		interval: function (value, low, high)
		{
			if (value >= high)
				return ((value - low) % (high - low)) + low;

			if (value < low)
				return ((value - high) % (high - low)) + high;

			return value;
		},
		lerp: function (source, destination, t)
		{
			return source + t * (destination - source);
		},
		slerp: function (source, destination, t)
		{
			var cosom = source .dot (destination);

			if (cosom <= -1)
				throw new Error ("slerp is not possible: vectors are inverse collinear.");

			if (cosom >= 1) // both normal vectors are equal
				return source;

			if (cosom < 0)
			{
				// Reverse signs so we travel the short way round
				cosom = -cosom;
				destination .negate ();
			}				

			var
				omega = Math .acos (cosom),
				sinom = Math .sin  (omega),

				scale0 = Math .sin ((1 - t) * omega) / sinom,
				scale1 = Math .sin (t * omega) / sinom;

			source .x = source .x * scale0 + destination .x * scale1;
			source .y = source .y * scale0 + destination .y * scale1;
			source .z = source .z * scale0 + destination .z * scale1;
			source .w = source .w * scale0 + destination .w * scale1;

			return source;
		},
		simpleSlerp: function (source, destination, t)
		{
			var cosom = source .dot (destination);

			if (cosom <= -1)
				throw new Error ("slerp is not possible: vectors are inverse collinear.");

			if (cosom >= 1) // both normal vectors are equal
				return source;

			var
				omega = Math .acos (cosom),
				sinom = Math .sin  (omega),

				scale0 = Math .sin ((1 - t) * omega) / sinom,
				scale1 = Math .sin (t * omega) / sinom;

			source .x = source .x * scale0 + destination .x * scale1;
			source .y = source .y * scale0 + destination .y * scale1;
			source .z = source .z * scale0 + destination .z * scale1;
			source .w = source .w * scale0 + destination .w * scale1;

			return source;
		},
		isPowerOfTwo: function (n)
		{
			return ((n - 1) & n) === 0;
		},
		nextPowerOfTwo: function (n)
		{
			///  Returns the next power of two of @a n. If n is a power of two, n is returned.

			-- n;

			for (var k = 1; ! (k & (1 << (4 + 1))); k <<= 1)
				n |= n >> k;

			return ++ n;
		},
		/*
		isInt: function(n)
		{
			return typeof n === 'number' && 
			       parseFloat (n) == parseInt (n, 10) && ! isNaN (n);
		},
		decimalPlaces: function (n)
		{
			var
				a = Math.abs(n),
				c = a, count = 1;

			while(! Algorithm .isInt (c) && isFinite (c))
				c = a * Math .pow (10, count ++);
	
			return count-1;
		},
		*/
		less: function (lhs, rhs)
		{
			return lhs < rhs;
		},
		greater: function (lhs, rhs)
		{
			return lhs > rhs;
		},
		lowerBound: function (array, first, last, value, comp)
		{
		   // http://en.cppreference.com/w/cpp/algorithm/lower_bound

			var
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
		upperBound: function (array, first, last, value, comp)
		{
		   // http://en.cppreference.com/w/cpp/algorithm/upper_bound

			var
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
		set_difference: function (lhs, rhs, result)
		{
			for (var key in lhs)
			{
				if (key in rhs)
					continue;

				result [key] = lhs [key];
			}

			return result;
		},
	};

	Object .preventExtensions (Algorithm);
	Object .freeze (Algorithm);
	Object .seal (Algorithm);

	return Algorithm;
});
