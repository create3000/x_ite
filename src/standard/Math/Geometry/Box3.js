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
	"standard/Math/Geometry/Triangle3",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Algorithms/SAT",
],
function (Triangle3,
          Matrix4,
          Vector3,
          SAT)
{
"use strict";

	var
	   min = new Vector3 (0, 0, 0),
	   max = new Vector3 (0, 0, 0),
	   x   = new Vector3 (0, 0, 0),
	   y   = new Vector3 (0, 0, 0),
	   z   = new Vector3 (0, 0, 0),
	   r1  = new Vector3 (0, 0, 0),
	   p1  = new Vector3 (0, 0, 0),
	   p4  = new Vector3 (0, 0, 0);

	var
		lhs_min = new Vector3 (0, 0, 0),
		lhs_max = new Vector3 (0, 0, 0),
		rhs_min = new Vector3 (0, 0, 0),
		rhs_max = new Vector3 (0, 0, 0);


	var points1 = [
		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),

		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),
	];

	var points2 = [
		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),

		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),
	];

	var axes1 = [
		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),
	];

	var axes2 = [
		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),
	];

	var axes9 = [
		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),

		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),

		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),
	];

	var planes = [
		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),
	];

	var triangle = [ ];

	var triangleNormal = [ new Vector3 (0, 0, 0) ];

	var triangleEdges = [
		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0),
		new Vector3 (0, 0, 0)
	];

	function Box3 (size, center)
	{
		switch (arguments .length)
		{
			case 0:
			{
				this .matrix = new Matrix4 (0.5, 0,   0,   0,
				                            0,   0.5, 0,   0,
				                            0,   0,   0.5, 0,
				                            0,   0,   0,   0);
				return;
			}
			case 2:
			{
				this .matrix = new Matrix4 (size .x / 2, 0, 0, 0,
				                            0, size .y / 2, 0, 0,
				                            0, 0, size .z / 2, 0,
				                            center .x, center .y, center .z, 1);
				return;
			}
			case 3:
			{
				var
					min = arguments [0],
					max = arguments [1],
					sx  = (max .x - min .x) / 2,
					sy  = (max .y - min .y) / 2,
					sz  = (max .z - min .z) / 2,
					cx  = (max .x + min .x) / 2,
					cy  = (max .y + min .y) / 2,
					cz  = (max .z + min .z) / 2;

				this .matrix = new Matrix4 (sx, 0,  0,  0,
				                            0,  sy, 0,  0,
				                            0,  0,  sz, 0,
				                            cx, cy, cz, 1);
				return;
			}
		}
	}

	Box3 .prototype =
	{
		constructor: Box3,
		copy: function ()
		{
			var copy = Object .create (Box3 .prototype);
			copy .matrix = this .matrix .copy ();
			return copy;
		},
		assign: function (box)
		{
			this .matrix .assign (box .matrix);
			return this;
		},
		equals: function (box)
		{
			return this .matrix .equals (box .matrix);
		},
		getMatrix: function ()
		{
			return this .matrix;
		},
		set: function (size, center)
		{
			if (points1 .box === this) points1 .box = null;
			if (axes1   .box === this) axes1   .box = null;

			var m = this .matrix;

			switch (arguments .length)
			{
				case 0:
				{
					m [ 0] = 0.5; m [ 1] = 0;   m [ 2] = 0;   m [ 3] = 0;
					m [ 4] = 0;   m [ 5] = 0.5; m [ 6] = 0;   m [ 7] = 0;
					m [ 8] = 0;   m [ 9] = 0;   m [10] = 0.5; m [11] = 0;
					m [12] = 0;   m [13] = 0;   m [14] = 0;   m [15] = 0;
					return this;
				}
				case 2:
				{
					m [ 0] = size .x / 2; m [ 1] = 0;           m [ 2] = 0;           m [ 3] = 0;
					m [ 4] = 0;           m [ 5] = size .y / 2; m [ 6] = 0;           m [ 7] = 0;
					m [ 8] = 0;           m [ 9] = 0;           m [10] = size .z / 2; m [11] = 0;
					m [12] = center .x;   m [13] = center .y;   m [14] = center .z;   m [15] = 1;
					return this;
				}
			}
		},
		setExtents: function (min, max)
		{
			if (points1 .box === this) points1 .box = null;
			if (axes1   .box === this) axes1   .box = null;

			var
				m  = this .matrix,
				sx = (max .x - min .x) / 2,
				sy = (max .y - min .y) / 2,
				sz = (max .z - min .z) / 2,
				cx = (max .x + min .x) / 2,
				cy = (max .y + min .y) / 2,
				cz = (max .z + min .z) / 2;

			m [ 0] = sx; m [ 1] = 0;  m [ 2] = 0;  m [ 3] = 0;
			m [ 4] = 0;  m [ 5] = sy; m [ 6] = 0;  m [ 7] = 0;
			m [ 8] = 0;  m [ 9] = 0;  m [10] = sz; m [11] = 0;
			m [12] = cx; m [13] = cy; m [14] = cz; m [15] = 1;
			return this;
		},
		getExtents: function (min, max)
		{
			this .getAbsoluteExtents (min, max);

			min .add (this .center);
			max .add (this .center);
		},
		getAbsoluteExtents: function (min, max)
		{
			var m = this .matrix;

			x .set (m [0], m [1], m [2]);
			y .set (m [4], m [5], m [6]);
			z .set (m [8], m [9], m [10]);

			r1 .assign (y) .add (z);

			var r2 = z .subtract (y);

			p1 .assign (x) .add (r1),
			p4 .assign (x) .add (r2);
			
			var
				p2 = r1 .subtract (x),
				p3 = r2 .subtract (x);

			min .assign (p1);
			max .assign (p1);

			min .min (p2, p3, p4);
			max .max (p2, p3, p4);

			p1 .negate ();
			p2 .negate ();
			p3 .negate ();
			p4 .negate ();

			min .min (p1, p2, p3, p4);
			max .max (p1, p2, p3, p4);
		},
		getPoints: function (points)
		{
			/*
			 * p6 ---------- p5
			 * | \           | \
			 * | p2------------ p1
			 * |  |          |  |
			 * |  |          |  |
			 * p7 |_________ p8 |
			 *  \ |           \ |
			 *   \|            \|
			 *    p3 ---------- p4
			 */
		
			var m = this .matrix;

			x .set (m [0], m [1], m [2]);
			y .set (m [4], m [5], m [6]);
			z .set (m [8], m [9], m [10]);
		
			r1 .assign (y) .add (z);

			var r2 = z .subtract (y);
		
			points [0] .assign (x)  .add (r1);
			points [1] .assign (r1) .subtract (x);
			points [2] .assign (r2) .subtract (x);
			points [3] .assign (x)  .add (r2);
		
			points [4] .assign (points [2]) .negate ();
			points [5] .assign (points [3]) .negate ();
			points [6] .assign (points [0]) .negate ();
			points [7] .assign (points [1]) .negate ();
		
			var center = this .center;

			points [0] .add (center);
			points [1] .add (center);
			points [2] .add (center);
			points [3] .add (center);
		
			points [4] .add (center);
			points [5] .add (center);
			points [6] .add (center);
			points [7] .add (center);
		
			return points;
		},
		getAxes: function (axes)
		{
			var m = this .matrix;

			axes [0] .set (m [0], m [1], m [2]);
			axes [1] .set (m [4], m [5], m [6]);
			axes [2] .set (m [8], m [9], m [10]);

			return axes;
		},
		getNormals: (function ()
		{
			var
				x = new Vector3 (0, 0, 0),
				y = new Vector3 (0, 0, 0),
				z = new Vector3 (0, 0, 0),
				v = new Vector3 (0, 0, 0);

			return function (planes)
			{
				var m = this .matrix;

				x .set (m [0], m [1], m [2]);
				y .set (m [4], m [5], m [6]);
				z .set (m [8], m [9], m [10]);

				if (x .abs () == 0)
				{
					x .assign (y) .cross (z);

					if (x .abs () == 0)
					{
						x .set (1, 0, 0);

						if (y .abs ())
							x .assign (v .assign (y) .cross (x .cross (y)));
						else if (z .abs ())
							x .assign (v .assign (z) .cross (x .cross (z)));
					}
				}

				if (y .abs () == 0)
				{
					y .assign (z) .cross (x);

					if (y .abs () == 0)
					{
						y .set (0, 1, 0);

						if (x .abs ())
							y .assign (v .assign (x) .cross (y .cross (x)));
						else if (z .abs ())
							y .assign (v .assign (z) .cross (y .cross (z)));
					}
				}

				if (z .abs () == 0)
				{
					z .assign (x) .cross (y);

					if (z .abs () == 0)
					{
						z .set (0, 0, 1);

						if (x .abs ())
							z .assign (v .assign (x) .cross (z .cross (x)));
						else if (y .abs ())
							z .assign (v .assign (y) .cross (z .cross (y)));
					}
				}

				planes [0] .assign (y) .cross (z) .normalize ();
				planes [1] .assign (z) .cross (x) .normalize ();
				planes [2] .assign (x) .cross (y) .normalize ();
			
				return planes;
			};
		})(),
		isEmpty: function ()
		{
			return this .matrix [15] === 0;
		},
		add: function (box)
		{
			if (this .isEmpty ())
				return this .assign (box);

			if (box .isEmpty ())
				return this;

			this .getExtents (lhs_min, lhs_max);
			box  .getExtents (rhs_min, rhs_max);

			return this .assign (new Box3 (lhs_min .min (rhs_min), lhs_max .max (rhs_max), true));
		},
		multLeft: function (matrix)
		{
			this .matrix .multLeft (matrix);
			return this;
		},
		multRight: function (matrix)
		{
			this .matrix .multRight (matrix);
			return this;
		},
		intersectsPoint: function (point)
		{
			this .getExtents (min, max);

			return min .x <= point .x &&
			       max .x >= point .x &&
			       min .y <= point .y &&
			       max .y >= point .y &&
			       min .z <= point .z &&
			       max .z >= point .z;
		},
		intersectsBox: function (other)
		{
			// Test special cases.
		
			if (this .isEmpty ())
				return false;
		
			if (other .isEmpty ())
				return false;
		
			// Get points.
		
			this  .getPoints (points1);
			other .getPoints (points2);
		
			// Test the three planes spanned by the normal vectors of the faces of the first parallelepiped.
		
			if (SAT .isSeparated (this .getNormals (planes), points1, points2))
				return false;
		
			// Test the three planes spanned by the normal vectors of the faces of the second parallelepiped.
		
			if (SAT .isSeparated (other .getNormals (planes), points1, points2))
				return false;

			// Test the nine other planes spanned by the edges of each parallelepiped.
		
			this  .getAxes (axes1);
			other .getAxes (axes2);

			for (var i1 = 0; i1 < 3; ++ i1)
			{
				for (var i2 = 0; i2 < 3; ++ i2)
					axes9 [i1 * 3 + i2] .assign (axes1 [i1]) .cross (axes2 [i2]);
			}
		
			if (SAT .isSeparated (axes9, points1, points2))
				return false;
		
			// Both boxes intersect.
		
			return true;
		},
		intersectsTriangle: function (a, b, c)
		{
			// Test special cases.

			if (this .isEmpty ())
				return false;

			// Get points.

			if (points1 .box !== this)
			{
				points1 .box = this;
				this .getPoints (points1);
			}

			triangle [0] = a;
			triangle [1] = b;
			triangle [2] = c;

			// Test the three planes spanned by the normal vectors of the faces of the first parallelepiped.

			if (SAT .isSeparated (this .getNormals (planes), points1, triangle))
				return false;

			// Test the normal of the triangle.

			Triangle3 .normal (a, b, c, triangleNormal [0]);

			if (SAT .isSeparated (triangleNormal, points1, triangle))
				return false;

			// Test the nine other planes spanned by the edges of each parallelepiped.

			if (axes1 .box !== this)
			{
				axes1 .box = this;
				this  .getAxes (axes1);
			}

			triangleEdges [0] .assign (a) .subtract (b);
			triangleEdges [1] .assign (b) .subtract (c);
			triangleEdges [2] .assign (c) .subtract (a);

			for (var i1 = 0; i1 < 3; ++ i1)
			{
				for (var i2 = 0; i2 < 3; ++ i2)
					axes9 [i1 * 3 + i2] .assign (axes1 [i1]) .cross (triangleEdges [i2]);
			}

			if (SAT .isSeparated (axes9, points1, points2))
				return false;

			// Box and triangle intersect.

			return true;
		},
		toString: function ()
		{
			return this .size + ", " + this .center;
		},
	};

	Object .defineProperty (Box3 .prototype, "size",
	{
		get: function ()
		{
			var max = new Vector3 (0, 0, 0);
			
			this .getAbsoluteExtents (min, max);

			return max .subtract (min);
		},
		enumerable: true,
		configurable: false
	});

	Object .defineProperty (Box3 .prototype, "center",
	{
		get: function ()
		{
			return this .matrix .origin;
		},
		enumerable: true,
		configurable: false
	});

	return Box3;
});
