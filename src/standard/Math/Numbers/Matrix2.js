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
	"standard/Math/Algorithm"
],
function (Algorithm)
{
"use strict";

	function Matrix2 ()
	{
		if (arguments .length)
		{
			this [0] = arguments [0];
			this [1] = arguments [1];
			this [2] = arguments [2];
			this [3] = arguments [3];
		}
		else
			this .identity ();
	}

	Matrix2 .prototype =
	{
		constructor: Matrix2,
		order: 2,
		length: 4,
		copy: function ()
		{
			var copy = Object .create (Matrix2 .prototype);
			copy [0] = this [0];
			copy [1] = this [1];
			copy [2] = this [2];
			copy [3] = this [3];
			return copy;
		},
		assign: function (matrix)
		{
			this [0] = matrix [0];
			this [1] = matrix [1];
			this [2] = matrix [2];
			this [3] = matrix [3];
			return this;
		},
		equals: function (matrix)
		{
			return this [0] === matrix [0] &&
			       this [1] === matrix [1] &&
			       this [2] === matrix [2] &&
			       this [3] === matrix [3];
		},
		set1: function (r, c, value)
		{
			this [r * this .order + c] = value;
		},
		get1: function (r, c)
		{
			return this [r * this .order + c];
		},
		set: function ()
		{
			switch (arguments .length)
			{
				case 0:
				{
					this .identity ();
					break;
				}
				case 4:
				{
					this [0] = arguments [0];
					this [1] = arguments [1];
					this [2] = arguments [2];
					this [3] = arguments [3];	
					break;
				}
			}
		},
		determinant1: function ()
		{
			return this [0];
		},
		determinant: function ()
		{
			return this [0] * this [3] -
			       this [1] * this [2];
		},
		transpose: function ()
		{
			var tmp = this [1];

			this [1] = this [2];
			this [2] = tmp;

			return this;
		},
		inverse: function ()
		{
			var d = this .determinant ();
		
			if (d === 0)
				throw new Error ("Matrix2 .inverse: determinant is 0.");

			this [0] =  array [0] / d;
			this [1] = -array [1] / d;
			this [2] = -array [2] / d;
			this [3] =  array [3] / d;

			return this;
		},
		multLeft: function (matrix)
		{
			var
				a0 = this [0], a1 = this [1],
				a2 = this [2], a3 = this [3],
				b0 = matrix [0], b1 = matrix [1],
				b2 = matrix [2], b3 = matrix [3];

	      this [0] = a0 * b0 + a2 * b1;
	      this [1] = a1 * b0 + a3 * b1;
	      this [2] = a0 * b2 + a2 * b3;
	      this [3] = a1 * b2 + a3 * b3;

			return this;
		},
		multRight: function (matrix)
		{
			var
				a0 = this [0], a1 = this [1],
				a2 = this [2], a3 = this [3],
				b0 = matrix [0], b1 = matrix [1],
				b2 = matrix [2], b3 = matrix [3];

	      this [0] = b0 * a0 + b2 * a1;
	      this [1] = b1 * a0 + b3 * a1;
	      this [2] = b0 * a2 + b2 * a3;
	      this [3] = b1 * a2 + b3 * a3;

			return this;
		},
		identity: function ()
		{
			this [0] = 1;
			this [1] = 0;
			this [2] = 0;
			this [3] = 1;	
		},
		toString: function ()
		{
			return this [0] + " " + this [1] + " " +
			       this [2] + " " + this [3]
		},
	};

	Object .defineProperty (Matrix2 .prototype, "x",
	{
		get: function () { return this [0]; },
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Matrix2 .prototype, "origin",
	{
		get: function () { return nthis [2]; },
		enumerable: false,
		configurable: false
	});

	Object .defineProperty (Matrix2 .prototype, "submatrix",
	{
		get: function () { return this .value [0]; },
		enumerable: false,
		configurable: false
	});

	Object .assign (Matrix2,
	{
		Identity: new Matrix2 (),
	});

	return Matrix2;
});
