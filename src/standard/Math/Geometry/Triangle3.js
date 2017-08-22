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
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Matrix4",
	"lib/poly2tri.js/dist/poly2tri",
],
function (Vector3,
          Matrix4,
          poly2tri)
{
"use strict";

	var
		A      = new Vector3 (0, 0, 0),
		B      = new Vector3 (0, 0, 0),
		C      = new Vector3 (0, 0, 0),
		xAxis  = new Vector3 (0, 0, 0),
		yAxis  = new Vector3 (0, 0, 0),
		zAxis  = new Vector3 (0, 0, 0),
		matrix = new Matrix4 ();

	return {
	   area: function (a, b, c)
	   {
	      return B .assign (b) .subtract (a) .cross (C .assign (c) .subtract (a)) .abs () / 2;
	   },
		normal: function (v1, v2, v3, normal)
		{
			var
				x1 = v3 .x - v2 .x,
				y1 = v3 .y - v2 .y,
				z1 = v3 .z - v2 .z,
				x2 = v1 .x - v2 .x,
				y2 = v1 .y - v2 .y,
				z2 = v1 .z - v2 .z;

			normal .set (y1 * z2 - z1 * y2,
			             z1 * x2 - x1 * z2,
			             x1 * y2 - y1 * x2);

			return normal .normalize ();
		},
		quadNormal: function (v1, v2, v3, v4, normal)
		{
			var
				x1 = v3 .x - v1 .x,
				y1 = v3 .y - v1 .y,
				z1 = v3 .z - v1 .z,
				x2 = v4 .x - v2 .x,
				y2 = v4 .y - v2 .y,
				z2 = v4 .z - v2 .z;

			normal .set (y1 * z2 - z1 * y2,
			             z1 * x2 - x1 * z2,
			             x1 * y2 - y1 * x2);

			return normal .normalize ();
		},
		removeCollinearPoints: function (polygon)
		{
			for (var i = 0, k = 0, length = polygon .length, l1 = length - 1; i < length; ++ i)
			{
				var
					i0 = (i + l1) % length,
					i1 = (i + 1) % length;

				if (this .isCollinear (polygon [i0], polygon [i], polygon [i1]))
					continue;

				polygon [k ++] = polygon [i];
		   }

			polygon .length = k;
		},
		isCollinear: function (a, b, c)
		{
			var
				ab = A .assign (a) .subtract (b) .normalize (),
				cb = C .assign (c) .subtract (b) .normalize ();
	
			if (ab .abs () == 0)
				return true;
	
			if (cb .abs () == 0)
				return true;
	
			return Math .abs (ab .dot (cb)) >= 1;
		},
		triangulatePolygon: function (vertices, triangles)
		{
			try
			{
				// Filter collinear points.

				this .removeCollinearPoints (vertices);

				// Transform vertices to 2D space.

				var
					p0 = vertices [0],
					p1 = vertices [1];

				this .getPolygonNormal (vertices, zAxis);

				xAxis .assign (p1) .subtract (p0);
				yAxis .assign (zAxis) .cross (xAxis);

				xAxis .normalize ();
				yAxis .normalize ();
				
				matrix .set (xAxis .x, xAxis .y, xAxis .z, 0,
				             yAxis .x, yAxis .y, yAxis .z, 0,
				             zAxis .x, zAxis .y, zAxis .z, 0,
				             p0 .x, p0 .y, p0 .z, 1);

				matrix .inverse ();

				for (var i = 0, length = vertices .length; i < length; ++ i)
					matrix .multVecMatrix (vertices [i]);

				// Triangulate polygon.

				var
					context = new poly2tri .SweepContext (vertices),
					ts      = context .triangulate () .getTriangles ();

				for (var i = 0, length = ts .length; i < length; ++ i)
					triangles .push (ts [i] .getPoint (0), ts [i] .getPoint (1), ts [i] .getPoint (2));
			}
			catch (error)
			{
				//console .log (error);
				this .triangulateConvexPolygon (vertices, triangles);
			}
		},
		triangulateConvexPolygon: function (vertices, triangles)
		{
			// Fallback: Very simple triangulation for convex polygons.
			for (var i = 1, length = vertices .length - 1; i < length; ++ i)
				triangles .push (vertices [0], vertices [i], vertices [i + 1]);
		},
		getPolygonNormal: function (vertices, normal)
		{
			// Determine polygon normal.
			// We use Newell's method https://www.opengl.org/wiki/Calculating_a_Surface_Normal here:

			normal .set (0, 0, 0);

			var next = vertices [0];

			for (var i = 0, length = vertices .length; i < length; ++ i)
			{
				var
					current = next,
					next    = vertices [(i + 1) % length];

				normal .x += (current .y - next .y) * (current .z + next .z);
				normal .y += (current .z - next .z) * (current .x + next .x);
				normal .z += (current .x - next .x) * (current .y + next .y);
			}

			return normal .normalize ();
		},
	};
});
