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
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Rendering/X3DLineGeometryNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Complex",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Algorithm",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DLineGeometryNode, 
          X3DConstants,
          Complex,
          Vector3,
          Algorithm)
{
"use strict";

	function Arc2D (executionContext)
	{
		X3DLineGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .Arc2D);

		this .setGeometryType (1);

		this .startAngle_ .setUnit ("angle");
		this .endAngle_   .setUnit ("angle");
		this .radius_     .setUnit ("length");
	}

	Arc2D .prototype = Object .assign (Object .create (X3DLineGeometryNode .prototype),
	{
		constructor: Arc2D,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",   new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "startAngle", new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "endAngle",   new Fields .SFFloat (1.5708)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "radius",     new Fields .SFFloat (1)),
		]),
		getTypeName: function ()
		{
			return "Arc2D";
		},
		getComponentName: function ()
		{
			return "Geometry2D";
		},
		getContainerField: function ()
		{
			return "geometry";
		},
		set_live__: function ()
		{
			X3DLineGeometryNode .prototype .set_live__ .call (this);

			if (this .isLive () .getValue ())
				this .getBrowser () .getArc2DOptions () .addInterest ("eventsProcessed", this);
			else
				this .getBrowser () .getArc2DOptions () .removeInterest ("eventsProcessed", this);
		},
		getSweepAngle: function ()
		{
			var
				start = Algorithm .interval (this .startAngle_ .getValue (), 0, Math .PI * 2),
				end   = Algorithm .interval (this .endAngle_   .getValue (), 0, Math .PI * 2);
		
			if (start === end)
				return Math .PI * 2;
		
			var sweepAngle = Math .abs (end - start);
		
			if (start > end)
				return (Math .PI * 2) - sweepAngle;
		
			if (! isNaN (sweepAngle))
				return sweepAngle;
			
			// We must test for NAN, as NAN to int is undefined.
			return 0;
		},
		build: function ()
		{
			var
				gl          = this .getBrowser () .getContext (),
				options     = this .getBrowser () .getArc2DOptions (),
				dimension   = options .dimension_ .getValue (),
				startAngle  = this .startAngle_ .getValue  (),
				radius      = Math .abs (this .radius_ .getValue ()),
				sweepAngle  = this .getSweepAngle (),
				circle      = sweepAngle == (Math .PI * 2),
				steps       = Math .floor (sweepAngle * dimension / (Math .PI * 2)),
				vertexArray = this .getVertices ();

			steps = Math .max (3, steps);

			if (! circle)
			{
				++ steps;
				this .setPrimitiveMode (gl .LINE_STRIP);
			}
			else
				this .setPrimitiveMode (gl .LINE_LOOP);

			var steps_1 = circle ? steps : steps - 1;

			for (var n = 0; n < steps; ++ n)
			{
				var
					t     = n / steps_1,
					theta = startAngle + (sweepAngle * t),
					point = Complex .Polar (radius, theta);

				vertexArray .push (point .real, point .imag, 0, 1);
			}

			this .getMin () .set (-radius, -radius, 0);
			this .getMax () .set ( radius,  radius, 0);	
	
			this .setSolid (false);
		},
	});

	return Arc2D;
});


