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
	"standard/Math/Geometry/Line3",
	"standard/Math/Geometry/Plane3",
	"standard/Math/Geometry/Triangle3",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Vector4",
	"standard/Math/Numbers/Matrix4",
],
function (Line3, Plane3, Triangle3, Vector3, Vector4, Matrix4)
{
"use strict";

	var
		p1     = new Vector3 (0, 0, 0),
		p2     = new Vector3 (0, 0, 0),
		p3     = new Vector3 (0, 0, 0),
		p4     = new Vector3 (0, 0, 0),
		p5     = new Vector3 (0, 0, 0),
		p6     = new Vector3 (0, 0, 0),
		near   = new Vector3 (0, 0, 0),
		far    = new Vector3 (0, 0, 0),
		matrix = new Matrix4 (),
		normal = new Vector3 (0, 0, 0),
		vin    = new Vector4 (0, 0, 0, 0);

	function ViewVolume ()
	{
		this .viewport = new Vector4 (0, 0, 0, 0);
		this .scissor  = new Vector4 (0, 0, 0, 0);
		
		this .planes = [
			new Plane3 (Vector3 .Zero, Vector3 .Zero),  // front
			new Plane3 (Vector3 .Zero, Vector3 .Zero),  // left
			new Plane3 (Vector3 .Zero, Vector3 .Zero),  // right
			new Plane3 (Vector3 .Zero, Vector3 .Zero),  // top
			new Plane3 (Vector3 .Zero, Vector3 .Zero),  // bottom
			new Plane3 (Vector3 .Zero, Vector3 .Zero),  // back
		];
	}

	ViewVolume .prototype =
	{
		constructor: ViewVolume,
		set: function (projectionMatrix, viewport, scissor)
		{
			try
			{
				this .viewport .assign (viewport);
				this .scissor  .assign (scissor);

				var
					x1 = scissor [0],
					x2 = scissor [0] + scissor [2],
					y1 = scissor [1],
					y2 = scissor [1] + scissor [3];

				matrix .assign (projectionMatrix) .inverse ();

				ViewVolume .unProjectPointMatrix (x1, y2, 1, matrix, viewport, p1),
				ViewVolume .unProjectPointMatrix (x1, y1, 1, matrix, viewport, p2),
				ViewVolume .unProjectPointMatrix (x1, y1, 0, matrix, viewport, p3),
				ViewVolume .unProjectPointMatrix (x2, y1, 0, matrix, viewport, p4),
				ViewVolume .unProjectPointMatrix (x2, y2, 0, matrix, viewport, p5),
				ViewVolume .unProjectPointMatrix (x2, y2, 1, matrix, viewport, p6);

				this .planes [0] .set (p4, Triangle3 .normal (p3, p4, p5, normal));  // front
				this .planes [1] .set (p2, Triangle3 .normal (p1, p2, p3, normal));  // left
				this .planes [2] .set (p5, Triangle3 .normal (p6, p5, p4, normal));  // right
				this .planes [3] .set (p6, Triangle3 .normal (p5, p6, p1, normal));  // top
				this .planes [4] .set (p3, Triangle3 .normal (p4, p3, p2, normal));  // bottom
				this .planes [5] .set (p1, Triangle3 .normal (p2, p1, p6, normal));  // back  

				this .valid = true;
			}
			catch (error)
			{
				this .valid = false;
				//console .log (error);
			}

			return this;
		},
		getViewport: function ()
		{
			return this .viewport;
		},
		getScissor: function ()
		{
			return this .scissor;
		},
		intersectsSphere: function (radius, center)
		{
			if (this .valid)
			{
				var planes = this .planes;
			
				if (planes [0] .getDistanceToPoint (center) > radius)
					return false;
	
				if (planes [1] .getDistanceToPoint (center) > radius)
					return false;
	
				if (planes [2] .getDistanceToPoint (center) > radius)
					return false;
	
				if (planes [3] .getDistanceToPoint (center) > radius)
					return false;
	
				if (planes [4] .getDistanceToPoint (center) > radius)
					return false;
	
				if (planes [5] .getDistanceToPoint (center) > radius)
					return false;
			}

			return true;
		},
	};

	Object .assign (ViewVolume,
	{
		unProjectPoint: function (winx, winy, winz, modelViewMatrix, projectionMatrix, viewport, point)
		{
			matrix .assign (modelViewMatrix) .multRight (projectionMatrix) .inverse ();

			return this .unProjectPointMatrix (winx, winy, winz, matrix, viewport, point);
		},
		unProjectPointMatrix: function (winx, winy, winz, invModelViewProjection, viewport, point)
		{
			// Transformation of normalized coordinates between -1 and 1
			vin .set ((winx - viewport [0]) / viewport [2] * 2 - 1,
			          (winy - viewport [1]) / viewport [3] * 2 - 1,
			          2 * winz - 1,
			          1);

			//Objects coordinates
			invModelViewProjection .multVecMatrix (vin);

			if (vin .w === 0)
				throw new Error ("Couldn't unproject point: divisor is 0.");

			var d = 1 / vin .w;

			return point .set (vin .x * d, vin .y * d, vin .z * d);
		},
		unProjectRay: function (winx, winy, modelViewMatrix, projectionMatrix, viewport, result)
		{
			matrix .assign (modelViewMatrix) .multRight (projectionMatrix) .inverse ();

			ViewVolume .unProjectPointMatrix (winx, winy, 0.0, matrix, viewport, near);
			ViewVolume .unProjectPointMatrix (winx, winy, 0.9, matrix, viewport, far);

			return result .setPoints (near, far);
		},
		projectPoint: function (point, modelViewMatrix, projectionMatrix, viewport, vout)
		{
			vin .set (point .x, point .y, point .z, 1);

			projectionMatrix .multVecMatrix (modelViewMatrix .multVecMatrix (vin));

			if (vin .w === 0)
				throw new Error ("Couldn't project point: divisor is 0.");

			var d = 1 / (2 * vin .w);

			return vout .set ((vin .x * d + 0.5) * viewport [2] + viewport [0],
			                  (vin .y * d + 0.5) * viewport [3] + viewport [1],
			                  (vin .z * d + 0.5));
		},
		projectLine: function (line, modelViewMatrix, projectionMatrix, viewport, result)
		{
			ViewVolume .projectPoint (line .point, modelViewMatrix, projectionMatrix, viewport, near);
			ViewVolume .projectPoint (Vector3 .multiply (line .direction, 1e9) .add (line .point), modelViewMatrix, projectionMatrix, viewport, far);

			near .z = 0;
			far  .z = 0;

			return result .setPoints (near, far);
		},
	});

	return ViewVolume;
});
