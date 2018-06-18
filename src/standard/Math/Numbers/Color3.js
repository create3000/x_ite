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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"standard/Math/Algorithm",
],
function (Algorithm)
{
"use strict";

	var clamp = Algorithm .clamp;

	function Color3 (r, g, b)
	{
		if (arguments .length)
		{
			this .r_ = clamp (r, 0, 1);
			this .g_ = clamp (g, 0, 1);
			this .b_ = clamp (b, 0, 1);
		}
		else
		{
			this .r_ = 0;
			this .g_ = 0;
			this .b_ = 0;
		}
	}

	Color3 .prototype =
	{
		constructor: Color3,
		length: 3,
		copy: function ()
		{
			var copy = Object .create (Color3 .prototype);
			copy .r_ = this .r_;
			copy .g_ = this .g_;
			copy .b_ = this .b_;
			return copy;
		},
		assign: function (color)
		{
			this .r_ = color .r_;
			this .g_ = color .g_;
			this .b_ = color .b_;
		},
		set: function (r, g, b)
		{
			this .r_ = clamp (r, 0, 1);
			this .g_ = clamp (g, 0, 1);
			this .b_ = clamp (b, 0, 1);
		},
		equals: function (color)
		{
			return this .r_ === color .r_ &&
			       this .g_ === color .g_ &&
			       this .b_ === color .b_;
		},
		getHSV: function (result)
		{
			var h, s, v;

			var min = Math .min (this .r_, this .g_, this .b_);
			var max = Math .max (this .r_, this .g_, this .b_);
			v = max; // value

			var delta = max - min;

			if (max !== 0 && delta !== 0)
			{
				s = delta / max; // s

				if (this .r_ === max)
					h =     (this .g_ - this .b_) / delta;  // between yellow & magenta
				else if (this .g_ === max)
					h = 2 + (this .b_ - this .r_) / delta;  // between cyan & yellow
				else
					h = 4 + (this .r_ - this .g_) / delta;  // between magenta & cyan

				h *= Math .PI / 3;  // radiants
				if (h < 0)
					h += Math .PI * 2;
			}
			else
				s = h = 0;         // s = 0, h is undefined

			result [0] = h;
			result [1] = s;
			result [2] = v;

			return result;
		},
		setHSV: function (h, s, v)
		{
			s = clamp (s, 0, 1),
			v = clamp (v, 0, 1);

			// H is given on [0, 2 * Pi]. S and V are given on [0, 1].
			// RGB are each returned on [0, 1].

			if (s === 0)
			{
				// achromatic (grey)
				this .r_ = this .g_ = this .b_ = v;
			}
			else
			{
				var w = Algorithm .degrees (Algorithm .interval (h, 0, Math .PI * 2)) / 60;     // sector 0 to 5

				var i = Math .floor (w);
				var f = w - i;                      // factorial part of h
				var p = v * ( 1 - s );
				var q = v * ( 1 - s * f );
				var t = v * ( 1 - s * ( 1 - f ) );

				switch (i % 6)
				{
					case 0:  this .r_ = v; this .g_ = t; this .b_ = p; break;
					case 1:  this .r_ = q; this .g_ = v; this .b_ = p; break;
					case 2:  this .r_ = p; this .g_ = v; this .b_ = t; break;
					case 3:  this .r_ = p; this .g_ = q; this .b_ = v; break;
					case 4:  this .r_ = t; this .g_ = p; this .b_ = v; break;
					default: this .r_ = v; this .g_ = p; this .b_ = q; break;
				}
			}
		},
		toString: function ()
		{
			return this .r_ + " " +
			       this .g_ + " " +
			       this .b_;
		},
	};

	var r = {
		get: function () { return this .r_; },
		set: function (value) { this .r_ = clamp (value, 0, 1); },
		enumerable: true,
		configurable: false
	};
	
	var g = {
		get: function () { return this .g_; },
		set: function (value) { this .g_ = clamp (value, 0, 1); },
		enumerable: true,
		configurable: false
	};

	var b = {
		get: function () { return this .b_; },
		set: function (value) { this .b_ = clamp (value, 0, 1); },
		enumerable: true,
		configurable: false
	};

	Object .defineProperty (Color3 .prototype, "r", r);
	Object .defineProperty (Color3 .prototype, "g", g);
	Object .defineProperty (Color3 .prototype, "b", b);

	r .enumerable = false;
	g .enumerable = false;
	b .enumerable = false;

	Object .defineProperty (Color3 .prototype, "0", r);
	Object .defineProperty (Color3 .prototype, "1", g);
	Object .defineProperty (Color3 .prototype, "2", b);

	Object .assign (Color3,
	{
		HSV: function (h, s, v)
		{
			var color = new Color3 (0, 0, 0);
			color .setHSV (h, s, v);
			return color;
		},
		lerp: function (a, b, t, r)
		{
			// Linearely interpolate in HSV space between source color @a a and destination color @a b by an amount of @a t.
			// Source and destination color must be in HSV space. The resulting HSV color is stored in @a r.

			var range = Math .abs (b [0] - a [0]);

			if (range <= Math .PI)
			{
				r [0] = Algorithm .lerp (a [0], b [0], t);
				r [1] = Algorithm .lerp (a [1], b [1], t);
				r [2] = Algorithm .lerp (a [2], b [2], t);
				return r;
			}

			var
				PI2  = Math .PI * 2,
				step = (PI2 - range) * t,
				h    = a [0] < b [0] ? a [0] - step : a [0] + step;

			if (h < 0)
				h += PI2;

			else if (h > PI2)
				h -= PI2;

			r [0] = h;
			r [1] = Algorithm .lerp (a [1], b [1], t);
			r [2] = Algorithm .lerp (a [2], b [2], t);
			return r;
		},
	});

	return Color3;
});
