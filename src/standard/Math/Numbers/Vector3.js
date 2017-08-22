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
 * This file is part of the Excite X3D Project.
 *
 * Excite X3D is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite X3D is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite X3D.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"standard/Math/Algorithm",
],
function ($, Algorithm)
{
"use strict";

	function Vector3 (x, y, z)
	{		
		this .x = x;
		this .y = y;
		this .z = z;
	}

	Vector3 .prototype =
	{
		constructor: Vector3,
		length: 3,
		copy: function ()
		{
			var copy = Object .create (Vector3 .prototype);
			copy .x = this .x;
			copy .y = this .y;
			copy .z = this .z;
			return copy;
		},
		assign: function (vector)
		{
			this .x = vector .x;
			this .y = vector .y;
			this .z = vector .z;
			return this;
		},
		set: function (x, y, z)
		{
			this .x = x;
			this .y = y;
			this .z = z;
			return this;
		},
		equals: function (vector)
		{
			return this .x === vector .x &&
			       this .y === vector .y &&
			       this .z === vector .z;
		},
		negate: function ()
		{
			this .x = -this .x;
			this .y = -this .y;
			this .z = -this .z;
			return this;
		},
		add: function (vector)
		{
			this .x += vector .x;
			this .y += vector .y;
			this .z += vector .z;
			return this;
		},
		subtract: function (vector)
		{
			this .x -= vector .x;
			this .y -= vector .y;
			this .z -= vector .z;
			return this;
		},
		multiply: function (value)
		{
			this .x *= value;
			this .y *= value;
			this .z *= value;
			return this;
		},
		multVec: function (vector)
		{
			this .x *= vector .x;
			this .y *= vector .y;
			this .z *= vector .z;
			return this;
		},
		divide: function (value)
		{
			this .x /= value;
			this .y /= value;
			this .z /= value;
			return this;
		},
		divVec: function (vector)
		{
			this .x /= vector .x;
			this .y /= vector .y;
			this .z /= vector .z;
			return this;
		},
		cross: function (vector)
		{
			var x = this .x, y = this .y, z = this .z;

			this .x = y * vector .z - z * vector .y;
			this .y = z * vector .x - x * vector .z;
			this .z = x * vector .y - y * vector .x;

			return this;
		},
		normalize: function ()
		{
			var length = Math .sqrt (this .x * this .x +
			                         this .y * this .y +
			                         this .z * this .z);
			
			if (length)
			{
				length = 1 / length;

				this .x *= length;
				this .y *= length;
				this .z *= length;
			}

			return this;
		},
		dot: function (vector)
		{
			return this .x * vector .x +
			       this .y * vector .y +
			       this .z * vector .z;
		},
		norm: function ()
		{
			return this .x * this .x +
			       this .y * this .y +
			       this .z * this .z;
		},
		abs: function ()
		{
			return Math .sqrt (this .x * this .x +
			                   this .y * this .y +
			                   this .z * this .z);
		},
		distance: function (vector)
		{
			var
				x = this .x - vector .x,
				y = this .y - vector .y,
				z = this .z - vector .z;

			return Math .sqrt (x * x +
			                   y * y +
			                   z * z);
		},
		lerp: function (dest, t)
		{
			this .x = this .x + t * (dest .x - this .x);
			this .y = this .y + t * (dest .y - this .y);
			this .z = this .z + t * (dest .z - this .z);
			return this;
		},
		slerp: function (destination, t)
		{
			return Algorithm .simpleSlerp (this, tmp .assign (destination), t);
		},
		min: function (vector)
		{
			for (var i = 0, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				this .x = Math .min (this .x, vector .x);
				this .y = Math .min (this .y, vector .y);
				this .z = Math .min (this .z, vector .z);
			}

			return this;
		},
		max: function (vector)
		{
			for (var i = 0, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				this .x = Math .max (this .x, vector .x);
				this .y = Math .max (this .y, vector .y);
				this .z = Math .max (this .z, vector .z);
			}

			return this;
		},
		toString: function ()
		{
			return this .x + " " +
			       this .y + " " +
			       this .z;
		}
	};

	Object .defineProperty (Vector3 .prototype, "0",
	{
		get: function () { return this .x; },
		set: function (value) { this .x = value; },
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Vector3 .prototype, "1",
	{
		get: function () { return this .y; },
		set: function (value) { this .y = value; },
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Vector3 .prototype, "2",
	{
		get: function () { return this .z; },
		set: function (value) { this .z = value; },
		enumerable: false,
		configurable: false
	});

	$.extend (Vector3,
	{
		Zero: new Vector3 (0, 0, 0),
		One: new Vector3 (1, 1, 1),
		xAxis: new Vector3 (1, 0, 0),
		yAxis: new Vector3 (0, 1, 0),
		zAxis: new Vector3 (0, 0, 1),
		negate: function (vector)
		{
			var copy = Object .create (this .prototype);
			copy .x = -vector .x;
			copy .y = -vector .y;
			copy .z = -vector .z;
			return copy;
		},
		add: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x + rhs .x;
			copy .y = lhs .y + rhs .y;
			copy .z = lhs .z + rhs .z;
			return copy;
		},
		subtract: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x - rhs .x;
			copy .y = lhs .y - rhs .y;
			copy .z = lhs .z - rhs .z;
			return copy;
		},
		multiply: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x * rhs;
			copy .y = lhs .y * rhs;
			copy .z = lhs .z * rhs;
			return copy;
		},
		multVec: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x * rhs .x;
			copy .y = lhs .y * rhs .y;
			copy .z = lhs .z * rhs .z;
			return copy;
		},
		divide: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x / rhs;
			copy .y = lhs .y / rhs;
			copy .z = lhs .z / rhs;
			return copy;
		},
		divVec: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .x / rhs .x;
			copy .y = lhs .y / rhs .y;
			copy .z = lhs .z / rhs .z;
			return copy;
		},
		cross: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .x = lhs .y * rhs .z - lhs .z * rhs .y;
			copy .y = lhs .z * rhs .x - lhs .x * rhs .z;
			copy .z = lhs .x * rhs .y - lhs .y * rhs .x;
			return copy;
		},
		normalize: function (vector)
		{
			var
				copy   = Object .create (this .prototype),
				x      = vector .x,
				y      = vector .y,
				z      = vector .z,
				length = Math .sqrt (x * x + y * y + z * z);

			if (length)
			{
				length = 1 / length;

				copy .x = x * length;
				copy .y = y * length;
				copy .z = z * length;
			}
			else
			{
				copy .x = 0;
				copy .y = 0;
				copy .z = 0;
			}

			return copy;
		},
		dot: function (lhs, rhs)
		{
			return lhs .dot (rhs);
		},
		lerp: function (source, dest, t)
		{
			return new Vector3 (Algorithm .lerp (source .x, dest .x, t),
			                    Algorithm .lerp (source .y, dest .y, t),
			                    Algorithm .lerp (source .z, dest .z, t));
		},
		slerp: function (source, destination, t)
		{
			return Algorithm .simpleSlerp (source .copy (), tmp .assign (destination), t);
		},
		min: function (lhs, rhs)
		{
			var
				x = lhs .x,
				y = lhs .y,
				z = lhs .z;

			for (var i = 1, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				x = Math .min (x, vector .x);
				y = Math .min (y, vector .y);
				z = Math .min (z, vector .z);
			}

			return new Vector3 (x, y, z);
		},
		max: function (lhs, rhs)
		{
			var
				x = lhs .x,
				y = lhs .y,
				z = lhs .z;

			for (var i = 1, length = arguments .length; i < length; ++ i)
			{
				var vector = arguments [i];

				x = Math .max (x, vector .x);
				y = Math .max (y, vector .y);
				z = Math .max (z, vector .z);
			}

			return new Vector3 (x, y, z);
		},
	});

	var tmp = new Vector3 (0, 0, 0);

	return Vector3;
});
