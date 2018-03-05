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

	function Vector4 (x, y, z, w)
	{		
		this .x = x;
		this .y = y;
		this .z = z;
		this .w = w;
	}

	Vector4 .prototype =
	{
		constructor: Vector4,
		length: 4,
		copy: function ()
		{
			var copy = Object .create (Vector4 .prototype);
			copy .x = this .x;
			copy .y = this .y;
			copy .z = this .z;
			copy .w = this .w;
			return copy;
		},
		assign: function (vector)
		{
			this .x = vector .x;
			this .y = vector .y;
			this .z = vector .z;
			this .w = vector .w;
			return this;
		},
		set: function (x, y, z, w)
		{
			this .x = x;
			this .y = y;
			this .z = z;
			this .w = w;
			return this;
		},
		equals: function (vector)
		{
			return this .x === vector .x &&
			       this .y === vector .y &&
			       this .z === vector .z &&
			       this .w === vector .w;
		},
		negate: function ()
		{
			this .x = -this .x;
			this .y = -this .y;
			this .z = -this .z;
			this .w = -this .w;
			return this;
		},
		add: function (vector)
		{
			this .x += vector .x;
			this .y += vector .y;
			this .z += vector .z;
			this .w += vector .w;
			return this;
		},
		subtract: function (vector)
		{
			this .x -= vector .x;
			this .y -= vector .y;
			this .z -= vector .z;
			this .w -= vector .w;
			return this;
		},
		multiply: function (value)
		{
			this .x *= value;
			this .y *= value;
			this .z *= value;
			this .w *= value;
			return this;
		},
		multVec: function (vector)
		{
			this .x *= vector .x;
			this .y *= vector .y;
			this .z *= vector .z;
			this .w *= vector .w;
			return this;
		},
		divide: function (value)
		{
			this .x /= value;
			this .y /= value;
			this .z /= value;
			this .w /= value;
			return this;
		},
		divVec: function (vector)
		{
			this .x /= vector .x;
			this .y /= vector .y;
			this .z /= vector .z;
			this .w /= vector .w;
			return this;
		},
		normalize: function ()
		{
			var
				x = this .x,
				y = this .y,
				z = this .z,
				w = this .w;

			var length = Math .sqrt (x * x +
			                         y * y +
			                         z * z +
			                         w * w);

			if (length)
			{
				this .x = x / length;
				this .y = y / length;
				this .z = z / length;
				this .w = w / length;
			}

			return this;
		},
		dot: function (vector)
		{
			return this .x * vector .x +
			       this .y * vector .y +
			       this .z * vector .z +
			       this .w * vector .w;
		},
		norm: function ()
		{
			var
				x = this .x,
				y = this .y,
				z = this .z,
				w = this .w;

			return x * x +
			       y * y +
			       z * z +
			       w * w;
		},
		abs: function ()
		{
			var
				x = this .x,
				y = this .y,
				z = this .z,
				w = this .w;

			return Math .sqrt (x * x +
			                   y * y +
			                   z * z +
			                   w * w);
		},
		distance: function (vector)
		{
			var
				x = this .x - vector .x,
				y = this .y - vector .y,
				z = this .z - vector .z,
				w = this .w - vector .w;

			return Math .sqrt (x * x +
			                   y * y +
			                   z * z +
			                   w * w);
		},
		lerp: function (dest, t)
		{
			var
				x = this .x,
				y = this .y,
				z = this .z,
				w = this .w;

			this .x = x + t * (dest .x - x);
			this .y = y + t * (dest .y - y);
			this .z = z + t * (dest .z - z);
			this .w = w + t * (dest .w - w);
			return this;
		},
		min: function (vector)
		{
			var
				x = this .x,
				y = this .y,
				z = this .z,
				w = this .w;

			for (var i = 0, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				x = Math .min (x, vector .x);
				y = Math .min (y, vector .y);
				z = Math .min (z, vector .z);
				w = Math .min (w, vector .w);
			}

			this .x = x;
			this .y = y;
			this .z = z;
			this .w = w;
			return this;
		},
		max: function (vector)
		{
			var
				x = this .x,
				y = this .y,
				z = this .z,
				w = this .w;

			for (var i = 0, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				x = Math .max (x, vector .x);
				y = Math .max (y, vector .y);
				z = Math .max (z, vector .z);
				w = Math .max (w, vector .w);
			}

			this .x = x;
			this .y = y;
			this .z = z;
			this .w = w;
			return this;
		},
		toString: function ()
		{
			return this .x + " " +
			       this .y + " " +
			       this .z + " " +
			       this .w;
		},
	};

	Object .defineProperty (Vector4 .prototype, "0",
	{
		get: function () { return this .x; },
		set: function (value) { this .x = value; },
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Vector4 .prototype, "1",
	{
		get: function () { return this .y; },
		set: function (value) { this .y = value; },
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Vector4 .prototype, "2",
	{
		get: function () { return this .z; },
		set: function (value) { this .z = value; },
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Vector4 .prototype, "3",
	{
		get: function () { return this .w; },
		set: function (value) { this .w = value; },
		enumerable: false,
		configurable: false
	});

	Object .assign (Vector4,
	{
		Zero: new Vector4 (0, 0, 0, 0),
		One: new Vector4 (1, 1, 1, 1),
		negate: function (vector)
		{
			var copy = Object .create (this .prototype);
			copy .x = -vector .x;
			copy .y = -vector .y;
			copy .z = -vector .z;
			copy .w = -vector .w;
			return copy;
		},
		add: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x + rhs .x;
			copy .y = lhs .y + rhs .y;
			copy .z = lhs .z + rhs .z;
			copy .w = lhs .w + rhs .w;
			return copy;
		},
		subtract: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x - rhs .x;
			copy .y = lhs .y - rhs .y;
			copy .z = lhs .z - rhs .z;
			copy .w = lhs .w - rhs .w;
			return copy;
		},
		multiply: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x * rhs;
			copy .y = lhs .y * rhs;
			copy .z = lhs .z * rhs;
			copy .w = lhs .w * rhs;
			return copy;
		},
		multVec: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x * rhs .x;
			copy .y = lhs .y * rhs .y;
			copy .z = lhs .z * rhs .z;
			copy .w = lhs .w * rhs .w;
			return copy;
		},
		divide: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x / rhs;
			copy .y = lhs .y / rhs;
			copy .z = lhs .z / rhs;
			copy .w = lhs .w / rhs;
			return copy;
		},
		divVec: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x / rhs .x;
			copy .y = lhs .y / rhs .y;
			copy .z = lhs .z / rhs .z;
			copy .w = lhs .w / rhs .w;
			return copy;
		},
		normalize: function (vector)
		{
			var
				copy   = Object .create (this .prototype),
				x      = vector .x,
				y      = vector .y,
				z      = vector .z,
				w      = vector .w,
				length = Math .sqrt (x * x + y * y + z * z + w * w);

			if (length)
			{
				copy .x = x / length;
				copy .y = y / length;
				copy .z = z / length;
				copy .w = w / length;
			}
			else
			{
				copy .x = 0;
				copy .y = 0;
				copy .z = 0;
				copy .w = 0;
			}

			return copy;
		},
		dot: function (lhs, rhs)
		{
			return lhs .dot (rhs);
		},
		lerp: function (source, dest, t)
		{
			return new Vector4 (Algorithm .lerp (source .x, dest .x, t),
			                    Algorithm .lerp (source .y, dest .y, t),
			                    Algorithm .lerp (source .z, dest .z, t),
			                    Algorithm .lerp (source .w, dest .w, t));
		},
		min: function (lhs, rhs)
		{
			var
				x = lhs .x,
				y = lhs .y,
				z = lhs .z,
				w = lhs .w;

			for (var i = 1, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				x = Math .min (x, vector .x);
				y = Math .min (y, vector .y);
				z = Math .min (z, vector .z);
				w = Math .min (w, vector .w);
			}

			return new Vector4 (x, y, z, w);
		},
		max: function (lhs, rhs)
		{
			var
				x = lhs .x,
				y = lhs .y,
				z = lhs .z,
				w = lhs .w;

			for (var i = 1, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				x = Math .max (x, vector .x);
				y = Math .max (y, vector .y);
				z = Math .max (z, vector .z);
				w = Math .max (w, vector .w);
			}

			return new Vector4 (x, y, z, w);
		},
	});

	return Vector4;
});
