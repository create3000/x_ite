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

	function Vector2 (x, y)
	{		
		this .x = x;
		this .y = y;
	}

	Vector2 .prototype =
	{
		constructor: Vector2,
		length: 2,
		copy: function ()
		{
			var copy = Object .create (Vector2 .prototype);
			copy .x = this .x;
			copy .y = this .y;
			return copy;
		},
		assign: function (vector)
		{
			this .x = vector .x;
			this .y = vector .y;
			return this;
		},
		set: function (x, y)
		{
			this .x = x;
			this .y = y;
			return this;
		},
		equals: function (vector)
		{
			return this .x === vector .x &&
			       this .y === vector .y;
		},
		negate: function ()
		{
			this .x = -this .x;
			this .y = -this .y;
			return this;
		},
		add: function (vector)
		{
			this .x += vector .x;
			this .y += vector .y;
			return this;
		},
		subtract: function (vector)
		{
			this .x -= vector .x;
			this .y -= vector .y;
			return this;
		},
		multiply: function (value)
		{
			this .x *= value;
			this .y *= value;
			return this;
		},
		multVec: function (vector)
		{
			this .x *= vector .x;
			this .y *= vector .y;
			return this;
		},
		divide: function (value)
		{
			this .x /= value;
			this .y /= value;
			return this;
		},
		divVec: function (vector)
		{
			this .x /= vector .x;
			this .y /= vector .y;
			return this;
		},
		normalize: function ()
		{
			var
				x = this .x,
				y = this .y;

			var length = Math .sqrt (x * x +
			                         y * y);

			if (length)
			{
				this .x = x / length;
				this .y = y / length;
			}

			return this;
		},
		dot: function (vector)
		{
			return this .x * vector .x +
			       this .y * vector .y;
		},
		norm: function ()
		{
			var
				x = this .x,
				y = this .y;

			return x * x +
			       y * y;
		},
		abs: function ()
		{
			var
				x = this .x,
				y = this .y;

			return Math .sqrt (x * x +
			                   y * y);
		},
		distance: function (vector)
		{
			var
				x = this .x - vector .x,
				y = this .y - vector .y;

			return Math .sqrt (x * x +
			                   y * y);
		},
		lerp: function (dest, t)
		{
			var
				x = this .x,
				y = this .y;

			this .x = x + t * (dest .x - x);
			this .y = y + t * (dest .y - y);
			return this;
		},
		min: function (vector)
		{
			var
				x = this .x,
				y = this .y;

			for (var i = 0, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				x = Math .min (x, vector .x);
				y = Math .min (y, vector .y);
			}

			this .x = x;
			this .y = y;
			return this;
		},
		max: function (vector)
		{
			var
				x = this .x,
				y = this .y;

			for (var i = 0, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				x = Math .max (x, vector .x);
				y = Math .max (y, vector .y);
			}

			this .x = x;
			this .y = y;
			return this;
		},
		toString: function ()
		{
			return this .x + " " +
			       this .y;
		}
	};

	Object .defineProperty (Vector2 .prototype, "0",
	{
		get: function () { return this .x; },
		set: function (value) { this .x = value; },
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Vector2 .prototype, "1",
	{
		get: function () { return this .y; },
		set: function (value) { this .y = value; },
		enumerable: false,
		configurable: false
	});

	Object .assign (Vector2,
	{
		Zero: new Vector2 (0, 0),
		One: new Vector2 (1, 1),
		negate: function (vector)
		{
			var copy = Object .create (this .prototype);
			copy .x = -vector .x;
			copy .y = -vector .y;
			return copy;
		},
		add: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x + rhs .x;
			copy .y = lhs .y + rhs .y;
			return copy;
		},
		subtract: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x - rhs .x;
			copy .y = lhs .y - rhs .y;
			return copy;
		},
		multiply: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x * rhs;
			copy .y = lhs .y * rhs;
			return copy;
		},
		multVec: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x * rhs .x;
			copy .y = lhs .y * rhs .y;
			return copy;
		},
		divide: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x / rhs;
			copy .y = lhs .y / rhs;
			return copy;
		},
		divVec: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x / rhs .x;
			copy .y = lhs .y / rhs .y;
			return copy;
		},
		normalize: function (vector)
		{
			var
				copy   = Object .create (this .prototype),
				x      = vector .x,
				y      = vector .y,
				length = Math .sqrt (x * x + y * y);

			if (length)
			{
				copy .x = x / length;
				copy .y = y / length;
			}
			else
			{
				copy .x = 0;
				copy .y = 0;
			}

			return copy;
		},
		dot: function (lhs, rhs)
		{
			return lhs .dot (rhs);
		},
		lerp: function (source, dest, t)
		{
			return new Vector2 (source .x + t * (dest .x - source .x),
			                    source .y + t * (dest .y - source .y));
		},
		min: function (lhs, rhs)
		{
			var
				x = lhs .x,
				y = lhs .y;

			for (var i = 1, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				x = Math .min (x, vector .x);
				y = Math .min (y, vector .y);
			}

			return new Vector2 (x, y);
		},
		max: function (lhs, rhs)
		{
			var
				x = lhs .x,
				y = lhs .y;

			for (var i = 1, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				x = Math .max (x, vector .x);
				y = Math .max (y, vector .y);
			}

			return new Vector2 (x, y);
		},
	});

	return Vector2;
});
