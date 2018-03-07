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
	"standard/Math/Numbers/Vector3",
	"standard/Math/Geometry/Plane3",
	"standard/Math/Algorithms/QuickSort",
],
function (Vector3,
          Plane3,
          QuickSort)
{
"use strict";

	var
		v0  = new Vector3 (0, 0, 0),
		v1  = new Vector3 (0, 0, 0),
		v2  = new Vector3 (0, 0, 0),
		uvt = { u: 0, v: 0, t: 0 };

	// Box normals for bbox / line intersection.
	var boxNormals = [
		new Vector3 (0,  0,  1), // front
		new Vector3 (0,  0, -1), // back
		new Vector3 (0,  1,  0), // top
		new Vector3 (0, -1,  0), // bottom
		new Vector3 (1,  0,  0)  // right
		// left: We do not have to test for left.
	];

	function SortComparator (vertices, axis)
	{
		function compare (a, b)
		{
			var
				vertices = compare .vertices;
				axis     = compare .axis;

			return Math .min (vertices [a + axis], vertices [a + 4 + axis], vertices [a + 8 + axis]) <
			       Math .min (vertices [b + axis], vertices [b + 4 + axis], vertices [b + 8 + axis]);
		}

		compare .vertices = vertices;
		compare .axis     = axis;

		return compare;
	}

	function Triangle (tree, triangle)
	{
		this .vertices = tree .vertices;
		this .normals  = tree .normals;
		this .i4       = triangle * 12;
		this .i3       = triangle * 9;
	}

	Triangle .prototype =
	{
		intersectsLine: function (line, intersections, intersectionNormals)
		{
			var
				vertices = this .vertices,
				normals  = this .normals,
				i4       = this .i4,
				i3       = this .i3;

			v0 .x = vertices [i4 + 0]; v0 .y = vertices [i4 + 1]; v0 .z = vertices [i4 +  2];
			v1 .x = vertices [i4 + 4]; v1 .y = vertices [i4 + 5]; v1 .z = vertices [i4 +  6];
			v2 .x = vertices [i4 + 8]; v2 .y = vertices [i4 + 9]; v2 .z = vertices [i4 + 10];

			if (line .intersectsTriangle (v0, v1, v2, uvt))
			{
				// Get barycentric coordinates.

				var
					u = uvt .u,
					v = uvt .v,
					t = 1 - u - v;

				// Determine vectors for X3DPointingDeviceSensors.

				var i = intersections .size ++;

				if (i >= intersections .length)
					intersections .push (new Vector3 (0, 0, 0));

				intersections [i] .set (t * vertices [i4 + 0] + u * vertices [i4 + 4] + v * vertices [i4 +  8],
				                        t * vertices [i4 + 1] + u * vertices [i4 + 5] + v * vertices [i4 +  9],
				                        t * vertices [i4 + 2] + u * vertices [i4 + 6] + v * vertices [i4 + 10]);

				if (intersectionNormals)
				{
					if (i >= intersectionNormals .length)
						intersectionNormals .push (new Vector3 (0, 0, 0));

					intersectionNormals [i] .set (t * normals [i3 + 0] + u * normals [i3 + 3] + v * normals [i3 + 6],
					                              t * normals [i3 + 1] + u * normals [i3 + 4] + v * normals [i3 + 7],
					                              t * normals [i3 + 2] + u * normals [i3 + 5] + v * normals [i3 + 8]);
				}
			}
		},
	};

	function Node (tree, triangles, first, size)
	{
		this .min          = new Vector3 (0, 0, 0);
		this .max          = new Vector3 (0, 0, 0);
		this .planes       = [ ];
		this .intersection = new Vector3 (0, 0, 0);

		var
			vertices = tree .vertices,
			min      = this .min,
			max      = this .max,
			last     = first + size,
			t        = triangles [first] * 12;

		// Calculate bbox

		min .set (vertices [t], vertices [t + 1], vertices [t + 2]);
		max .assign (min);

		for (var i = first; i < last; ++ i)
		{
			t = triangles [i] * 12;

			v0 .set (vertices [t + 0], vertices [t + 1], vertices [t + 2]);
			v1 .set (vertices [t + 4], vertices [t + 5], vertices [t + 6]);
			v2 .set (vertices [t + 8], vertices [t + 9], vertices [t + 10]);

			min .min (v0, v1, v2);
			max .max (v0, v1, v2);
		}

		for (var i = 0; i < 5; ++ i)
			this .planes [i] = new Plane3 (i % 2 ? min : max, boxNormals [i]);

		// Sort and split array

		if (size > 2)
		{
			// Sort array

			tree .sorter .compare .axis = this .getLongestAxis (min, max);
			tree .sorter .sort (first, last);

			// Split array

			var leftSize = size >>> 1;
		}
		else
			var leftSize = 1;

		// Split array

		var rightSize = size - leftSize;

		// Construct left and right node

		if (leftSize > 1)
			this .left = new Node (tree, triangles, first, leftSize);
		else
			this .left = new Triangle (tree, triangles [first]);

		if (rightSize > 1)
			this .right = new Node (tree, triangles, first + leftSize, rightSize);
		else
			this .right = new Triangle (tree, triangles [first + leftSize]);
	}

	Node .prototype =
	{
		intersectsLine: function (line, intersections, intersectionNormals)
		{
			if (this .intersectsBBox (line))
			{
				this .left  .intersectsLine (line, intersections, intersectionNormals);
				this .right .intersectsLine (line, intersections, intersectionNormals);
			}
		},
		intersectsBBox: function (line)
		{
			var
				planes       = this .planes,
				min          = this .min,
				max          = this .max,
				minX         = min .x,
				maxX         = max .x,
				minY         = min .y,
				maxY         = max .y,
				minZ         = min .z,
				maxZ         = max .z,
				intersection = this .intersection;

		   // front
			if (planes [0] .intersectsLine (line, intersection))
			{
				if (intersection .x >= minX && intersection .x <= maxX &&
				    intersection .y >= minY && intersection .y <= maxY)
					return true;
			}

			// back
			if (planes [1] .intersectsLine (line, intersection))
			{
				if (intersection .x >= minX && intersection .x <= maxX &&
				    intersection .y >= minY && intersection .y <= maxY)
					return true;
			}

			// top
			if (planes [2] .intersectsLine (line, intersection))
			{
				if (intersection .x >= minX && intersection .x <= maxX &&
				    intersection .z >= minZ && intersection .z <= maxZ)
					return true;
			}

			// bottom
			if (planes [3] .intersectsLine (line, intersection))
			{
				if (intersection .x >= minX && intersection .x <= maxX &&
				    intersection .z >= minZ && intersection .z <= maxZ)
					return true;
			}

			// right
			if (planes [4] .intersectsLine (line, intersection))
			{
				if (intersection .y >= minY && intersection .y <= maxY &&
				    intersection .z >= minZ && intersection .z <= maxZ)
					return true;
			}

			return false;
		},
		getLongestAxis: function (min, max)
		{
			var
				x = max .x - min .x,
				y = max .y - min .y,
				z = max .z - min .z;
	
			if (x < y)
			{
				if (y < z)
					return 2;

				return 1;
			}
			else
			{
				if (x < z)
					return 2;

				return 0;
			}
		},
	};

	function BVH (vertices, normals)
	{
		this .vertices = vertices;
		this .normals  = normals;

		var numTriangles = vertices .length / 12;
	
		switch (numTriangles)
		{
			case 0:
			{
				this .root = null;
				break;
			}
			case 1:
			{
				this .root = new Triangle (this, 0);
				break;
			}
			default:
			{
				var triangles = [ ];

				for (var i = 0; i < numTriangles; ++ i)
					triangles .push (i);

				this .sorter = new QuickSort (triangles, SortComparator (vertices, 0));

				this .root = new Node (this, triangles, 0, numTriangles);
				break;
			}
		}
	}

	BVH .prototype =
	{
		constructor: BVH,
		
		intersectsLine: function (line, intersections, intersectionNormals)
		{
			intersections .size = 0;

			if (this .root)
			{
				this .root .intersectsLine (line, intersections, intersectionNormals);
				return intersections .size;
			}

			return 0;
		},
	};

	return BVH;
});
