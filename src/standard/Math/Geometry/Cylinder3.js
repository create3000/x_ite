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
 * This file is part of the X-ITE Project.
 *
 * X-ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X-ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X-ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Geometry/Line3",
],
function (Vector3,
          Rotation4,
          Matrix4,
          Line3)
{
"use strict";

	function Cylinder3 (axis, radius)
	{
		this .axis   = axis .copy ();
		this .radius = radius;
	}

	Cylinder3 .prototype =
	{
		constructor: Cylinder3,
		intersectsLine: function (line, enter, exit)
		{
			////////////////////////////////////////////////////////////////////////
			//
			// Description:
			//  Intersect given line with this cylinder, returning the
			//  results in enter and exit. Returns TRUE if there was an
			//  intersection (and results are valid).
			//
			// Taken from Inventor SbCylinder.c++
			
			// The intersection will actually be done on a radius 1 cylinder
			// aligned with the y axis, so we transform the line into that
			// space, then intersect, then transform the results back.

			// rotation to y axis
			var
				rotToYAxis = new Rotation4 (this .axis .direction, new Vector3 (0, 1, 0)),
				mtxToYAxis = Matrix4 .Rotation (rotToYAxis);

			// scale to unit space
			var
				scaleFactor    = 1 / this .radius,
				toUnitCylSpace = new Matrix4 ();
	
			toUnitCylSpace .scale (new Vector3 (scaleFactor, scaleFactor, scaleFactor));
			toUnitCylSpace .multLeft (mtxToYAxis);

			// find the given line un-translated
			var
				point             = Vector3 .subtract (line .point, this .axis .point),
				noTranslationLine = new Line3 (point, line .direction);

			// find the un-translated line in unit cylinder's space
			var cylLine = noTranslationLine .multLineMatrix (toUnitCylSpace);

			// find the intersection on the unit cylinder
			var intersected = this .unitCylinderIntersectsLine (cylLine, enter, exit);

			if (intersected)
			{
				// transform back to original space
				var fromUnitCylSpace = toUnitCylSpace .inverse ();

				fromUnitCylSpace .multVecMatrix (enter);
				enter .add (this .axis .point);

				fromUnitCylSpace .multVecMatrix (exit);
				exit .add (this .axis .point);
			}

			return intersected;
		},
		unitCylinderIntersectsLine: function (line, enter, exit)
		{
			var t0, t1;

			var
				pos = line .point,
				dir = line .direction;

			var
				A = dir [0] * dir [0] + dir [2] * dir [2],
				B = 2 * (pos [0] * dir [0] + pos [2] * dir [2]),
				C = pos [0] * pos [0] + pos [2] * pos [2] - 1;

			// discriminant = B^2 - 4AC
			var discr = B * B - 4 * A * C;

			// if discriminant is negative, no intersection
			if (discr < 0)
				return false;

			var sqroot = Math .sqrt (discr);

			// magic to stabilize the answer
			if (B > 0)
			{
				t0 = -(2 * C) / (sqroot + B);
				t1 = -(sqroot + B) / (2 * A);
			}
			else
			{
				t0 = (2 * C) / (sqroot - B);
				t1 = (sqroot - B) / (2 * A);
			}

			enter .assign (dir) .multiply (t0) .add (pos);
			exit  .assign (dir) .multiply (t1) .add (pos);

			return true;
		},
		toString: function ()
		{
			return this .axis .toString () + " " + this .radius;
		},
	};

	return Cylinder3;
});
