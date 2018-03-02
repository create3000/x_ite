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
	"x_ite/Components/Rendering/X3DGeometricPropertyNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Geometry/Triangle3",
	"standard/Math/Numbers/Vector3",
],
function (X3DGeometricPropertyNode, 
          X3DConstants,
          Triangle3,
          Vector3)
{
"use strict";

	var
		point1 = new Vector3 (0, 0, 0),
		point2 = new Vector3 (0, 0, 0),
		point3 = new Vector3 (0, 0, 0),
		point4 = new Vector3 (0, 0, 0);

	function X3DCoordinateNode (executionContext)
	{
		X3DGeometricPropertyNode .call (this, executionContext);

		this .addType (X3DConstants .X3DCoordinateNode);
	}

	X3DCoordinateNode .prototype = Object .assign (Object .create (X3DGeometricPropertyNode .prototype),
	{
		constructor: X3DCoordinateNode,
		initialize: function ()
		{
			X3DGeometricPropertyNode .prototype .initialize .call (this);

			this .point_ .addInterest ("set_point__", this);

			this .set_point__ ();
		},
		set_point__: function ()
		{
			this .point  = this .point_ .getValue ();
			this .length = this .point_ .length;
		},
		isEmpty: function ()
		{
			return this .length === 0;
		},
		getSize: function ()
		{
			return this .length;
		},
		get1Point: function (index, vector)
		{
			if (index < this .length)
			{
				const point = this .point;

				index *= 3;

				return vector .set (point [index + 0], point [index + 1], point [index + 2]);
			}
			else
			{
				return vector .set (0, 0, 0);
			}
		},
		addPoint: function (index, array)
		{
			if (index < this .length)
			{
				const point = this .point;

				index *= 3;

				array .push (point [index + 0], point [index + 1], point [index + 2], 1);
			}
			else
			{
				array .push (0, 0, 0, 1);
			}
		},
		getNormal: function (index1, index2, index3)
		{
			// The index[1,2,3] cannot be less than 0.

			var length = this .length;

			if (index1 < length && index2 < length && index3 < length)
			{
				return Triangle3 .normal (this .get1Point (index1, point1),
				                          this .get1Point (index2, point2),
				                          this .get1Point (index3, point3),
				                          new Vector3 (0, 0, 0));
			}

			return new Vector3 (0, 0, 0);
		},
		getQuadNormal: function (index1, index2, index3, index4)
		{
			// The index[1,2,3,4] cannot be less than 0.

			var length = this .length;

			if (index1 < length && index2 < length && index3 < length && index4 < length)
			{
				return Triangle3 .quadNormal (this .get1Point (index1, point1),
				                              this .get1Point (index2, point2),
				                              this .get1Point (index3, point3),
				                              this .get1Point (index4, point4),
				                              new Vector3 (0, 0, 0));
			}

			return new Vector3 (0, 0, 0);
		},
	});

	return X3DCoordinateNode;
});


