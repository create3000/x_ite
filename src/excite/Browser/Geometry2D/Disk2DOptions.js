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
 * This file is part of the Excite Project.
 *
 * Excite is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"excite/Basic/X3DBaseNode",
	"excite/Fields",
	"standard/Math/Numbers/Complex",
	"standard/Math/Numbers/Vector3",
],
function ($,
          X3DBaseNode,
          Fields,
          Complex,
          Vector3)
{
"use strict";
	
	var half = new Complex (0.5, 0.5);

	function Disk2DOptions (executionContext)
	{
		X3DBaseNode .call (this, executionContext);

		this .addChildObjects ("dimension", new Fields .SFInt32 (40))

		this .circleVertices = [ ];
		this .diskTexCoords  = [ ];
		this .diskNormals    = [ ];
		this .diskVertices   = [ ];
	}

	Disk2DOptions .prototype = $.extend (Object .create (X3DBaseNode .prototype),
	{
		constructor: Disk2DOptions,
		getTypeName: function ()
		{
			return "Disk2DOptions";
		},
		getComponentName: function ()
		{
			return "Excite";
		},
		getContainerField: function ()
		{
			return "circle2DOptions";
		},
		initialize: function ()
		{
			this .addInterest ("build", this);

			this .build ();
		},
		getCircleVertices: function ()
		{
			return this .circleVertices;
		},
		getDiskTexCoords: function ()
		{
			return this .diskTexCoords;
		},
		getDiskNormals: function ()
		{
			return this .diskNormals;
		},
		getDiskVertices: function ()
		{
			return this .diskVertices;
		},
		build: function ()
		{
			var
				dimension = this .dimension_ .getValue (),
				angle     = Math .PI * 2 / dimension;
		
			this .circleVertices .length = 0;
			this .diskTexCoords  .length = 0;
			this .diskNormals    .length = 0;
			this .diskVertices   .length = 0;

			for (var n = 0; n < dimension; ++ n)
			{
				var
					theta1    = angle * n,
					theta2    = angle * (n + 1),
					texCoord1 = Complex .Polar (0.5, theta1) .add (half),
					texCoord2 = Complex .Polar (0.5, theta2) .add (half),
					point1    = Complex .Polar (1, theta1),
					point2    = Complex .Polar (1, theta2);
		
				// Circle

				this .circleVertices .push (point1 .real, point1 .imag, 0, 1);

				// Disk

				this .diskTexCoords .push (0.5, 0.5, 0, 1,
				                           texCoord1 .real, texCoord1 .imag, 0, 1,
				                           texCoord2 .real, texCoord2 .imag, 0, 1);

				this .diskNormals .push (0, 0, 1,  0, 0, 1,  0, 0, 1);

				this .diskVertices .push (0, 0, 0, 1,
				                          point1 .real, point1 .imag, 0, 1,
				                          point2 .real, point2 .imag, 0, 1);
			}
		},
	});

	return Disk2DOptions;
});
