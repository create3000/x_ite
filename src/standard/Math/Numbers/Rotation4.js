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
	"standard/Math/Numbers/Quaternion",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Vector4",
	"standard/Math/Algorithm",
],
function (Quaternion,
          Vector3,
          Vector4,
          Algorithm)
{
"use strict";

	function Rotation4 (x, y, z, angle)
	{
		this .x_     = 0;
		this .y_     = 0;
		this .z_     = 1;
		this .angle_ = 0;

		switch (arguments .length)
		{
			case 0:
			{
				this .value = new Quaternion (0, 0, 0, 1);
				return;
			}
			case 1:
			{
				this .value = arguments [0];
				this .update ();
				return;
			}
			case 2:
			{
				var
					arg0 = arguments [0],
					arg1 = arguments [1];

				this .value = new Quaternion (0, 0, 0, 1);

				if (arg1 instanceof Vector3)
				   return this .setFromToVec (arg0, arg1);

				this .set (arg0 .x,
				           arg0 .y,
				           arg0 .z,
				           arg1);
			
			   return;
			}
			case 4:
			{
				this .value = new Quaternion (0, 0, 0, 1);
				this .set (x, y, z, angle);
				return;
			}
		}
	}

	Rotation4 .prototype =
	{
		constructor: Rotation4,
		length: 4,
		update: function ()
		{
			var rotation = this .get ();

			this .x_     = rotation .x;
			this .y_     = rotation .y;
			this .z_     = rotation .z;
			this .angle_ = rotation .w;

			return this;
		},
		copy: function ()
		{
			var copy = Object .create (Rotation4 .prototype);

			copy .x_     = this .x_;
			copy .y_     = this .y_;
			copy .z_     = this .z_;
			copy .angle_ = this .angle_;

			copy .value  = this .value .copy ();

			return copy;
		},
		assign: function (rotation)
		{
			this .x_     = rotation .x_;
			this .y_     = rotation .y_;
			this .z_     = rotation .z_;
			this .angle_ = rotation .angle_;

			this .value .assign (rotation .value);

			return this;
		},
		set: function (x, y, z, angle)
		{
			this .x_     = x;
			this .y_     = y;
			this .z_     = z;
			this .angle_ = angle;

			var scale = Math .sqrt (x * x + y * y + z * z);

			if (scale === 0)
			{
				this .value .set (0, 0, 0, 1);
				return this;
			}

			// Calculate quaternion

			var
				halfTheta = Algorithm .interval (angle / 2, 0, Math .PI),
				scale     = Math .sin (halfTheta) / scale;

			this .value .set (x * scale,
			                  y * scale,
			                  z * scale,
			                  Math .cos (halfTheta));
			return this;
		},
		get: (function ()
		{
			var result = new Vector4 (0, 0, 0, 0);

			return function ()
			{
				var value = this .value;
	
				if (Math .abs (value .w) >= 1)
					return Vector4 .zAxis;

				var vector = value .imag .normalize ();
	
				return result .set (vector .x,
				                    vector .y,
				                    vector .z,
				                    2 * Math .acos (value .w));
			};
		})(),
		setAxisAngle: function (axis, angle)
		{
			return this .set (axis .x, axis .y, axis .z, angle);
		},
		setFromToVec: (function ()
		{
			var
				from = new Vector3 (0, 0, 0),
				to   = new Vector3 (0, 0, 0),
				cv   = new Vector3 (0, 0, 0),
				t    = new Vector3 (0, 0, 0);

			return function (fromVec, toVec)
			{
				// https://bitbucket.org/Coin3D/coin/src/abc9f50968c9/src/base/SbRotation.cpp
	
				from .assign (fromVec) .normalize ();
				to   .assign (toVec)   .normalize ();
	
				var
					cos_angle = Algorithm .clamp (from .dot (to), -1, 1),
					crossvec  = cv .assign (from) .cross (to) .normalize (),
					crosslen  = crossvec .abs ();
	
				if (crosslen === 0)
				{
					// Parallel vectors
					// Check if they are pointing in the same direction.
					if (cos_angle > 0)
						this .value .set (0, 0, 0, 1); // standard rotation
	
					// Ok, so they are parallel and pointing in the opposite direction
					// of each other.
					else
					{
						// Try crossing with x axis.
						t  .assign (from) .cross (Vector3 .xAxis);
	
						// If not ok, cross with y axis.
						if (t .norm () === 0)
							t  .assign (from) .cross (Vector3 .yAxis);
	
						t .normalize ();
	
						this .value .set (t .x, t .y, t .z, 0);
					}
				}
				else
				{
					// Vectors are not parallel
					// The abs () wrapping is to avoid problems when `dot' "overflows" a tiny wee bit,
					// which can lead to sqrt () returning NaN.
					crossvec .multiply (Math .sqrt (Math .abs (1 - cos_angle) / 2));
	
					this .value .set (crossvec .x,
					                  crossvec .y,
					                  crossvec .z,
					                  Math .sqrt ((1 + cos_angle) / 2));
				}
	
				this .update ();
	
				return this;
			};
		})(),
		setAxis: function (vector)
		{
			this .set (vector .x, vector .y, vector .z, this .angle_);
		},
		getAxis: (function ()
		{
			var axis = new Vector3 (0, 0, 0);

			return function ()
			{
				return axis .set (this .x_, this .y_, this .z_);
			};
		})(),
		setMatrix: function (matrix)
		{
			this .value .setMatrix (matrix) .normalize ();
			this .update ();
			return this;
		},
		getMatrix: function (matrix)
		{
			return this .value .getMatrix (matrix);
		},
		equals: function (rot)
		{
			return this .value .equals (rot .value);
		},
		inverse: function ()
		{
			this .value .inverse ();
			this .update ();
			return this;
		},
		multLeft: function (rotation)
		{
			this .value .multLeft (rotation .value) .normalize ();
			this .update ();
			return this;
		},
		multRight: function (rotation)
		{
			this .value .multRight (rotation .value) .normalize ();
			this .update ();
			return this;
		},
		multVecRot: function (vector)
		{
			return this .value .multVecQuat (vector);
		},
		multRotVec: function (vector)
		{
			return this .value .multQuatVec (vector);
		},
		normalize: function ()
		{
			this .value .normalize ();
			this .update ();
			return this;
		},
		pow: function (exponent)
		{
			this .value .pow (exponent);
			this .update ();
			return this;
		},
		slerp: function (dest, t)
		{
			this .value .slerp (dest .value, t);
			this .update ();
			return this;
		},
		squad: function (a ,b, dest, t)
		{
			this .value .squad (a .value, b .value, dest .value, t);
			this .update ();
			return this;
		},
		toString: function ()
		{
			var rotation = this .get ();

			return rotation .x + " " +
			       rotation .y + " " +
			       rotation .z + " " +
			       rotation .w;
		}
	};

	var x = {
		get: function ()
		{
			return this .x_;
		},
		set: function (value)
		{
			this .x_ = value;
			this .set (value, this .y_, this .z_, this .angle_);
		},
		enumerable: true,
		configurable: false
	};

	var y = {
		get: function ()
		{
			return this .y_;
		},
		set: function (value)
		{
			this .y_ = value;
			this .set (this .x_, value, this .z_, this .angle_);
		},
		enumerable: true,
		configurable: false
	};

	var z = {
		get: function ()
		{
			return this .z_;
		},
		set: function (value)
		{
			this .z_ = value;
			this .set (this .x_, this .y_, value, this .angle_);
		},
		enumerable: true,
		configurable: false
	};

	var angle = {
		get: function ()
		{
			return this .angle_;
		},
		set: function (value)
		{
			this .angle_ = value;
			this .set (this .x_, this .y_, this .z_, value);
		},
		enumerable: true,
		configurable: false
	};

	Object .defineProperty (Rotation4 .prototype, "x", x);
	Object .defineProperty (Rotation4 .prototype, "y", y);
	Object .defineProperty (Rotation4 .prototype, "z", z);
	Object .defineProperty (Rotation4 .prototype, "angle", angle);

	x     .enumerable = false;
	y     .enumerable = false;
	z     .enumerable = false;
	angle .enumerable = false;

	Object .defineProperty (Rotation4 .prototype, "0", x);
	Object .defineProperty (Rotation4 .prototype, "1", y);
	Object .defineProperty (Rotation4 .prototype, "2", z);
	Object .defineProperty (Rotation4 .prototype, "3", angle);

	Object .assign (Rotation4,
	{
		Identity: new Rotation4 (),
		inverse: function (rotation)
		{
			var copy = Object .create (this .prototype);
			copy .value = Quaternion .inverse (rotation .value);
			copy .update ();
			return copy;
		},
		multRight: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .value = Quaternion .multRight (lhs .value, rhs .value);
			copy .update ();
			return copy;
		},
		slerp: function (source, destination, t)
		{
			var copy = Object .create (this .prototype);
			copy .value = Quaternion .slerp (source .value, destination .value, t);
			copy .update ();
			return copy;
		},
		squad: function (source, a, b, destination, t)
		{
			var copy = Object .create (this .prototype);
			copy .value = Quaternion .squad (source .value, a, b, destination .value, t);
			copy .update ();
			return copy;
		},
		bezier: function (source, a, b, destination, t)
		{
			var copy = Object .create (this .prototype);
			copy .value = Quaternion .bezier (source .value, a, b, destination .value, t);
			copy .update ();
			return copy;
		},
		spline: function (q0, q1, q2)
		{
			var copy = Object .create (this .prototype);
			copy .value = Quaternion .spline (q0 .value, q1 .value, q2 .value);
			copy .update ();
			return copy;
		},
	});

	return Rotation4;
});
