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
	"x_ite/Components/NURBS/X3DNurbsControlCurveNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Browser/NURBS/NURBS",
	"standard/Math/Numbers/Vector3",
	"nurbs",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNurbsControlCurveNode,
          X3DConstants,
          NURBS,
          Vector3,
          nurbs)
{
"use strict";

	function NurbsCurve2D (executionContext)
	{
		X3DNurbsControlCurveNode .call (this, executionContext);

		this .addType (X3DConstants .NurbsCurve2D);

		this .knots         = [ ];
		this .weights       = [ ];
		this .controlPoints = [ ];
		this .mesh          = { };
		this .sampleOptions = { resolution: [ ] };
		this .array         = [ ];
	}

	NurbsCurve2D .prototype = Object .assign (Object .create (X3DNurbsControlCurveNode .prototype),
	{
		constructor: NurbsCurve2D,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",     new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "tessellation", new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "closed",       new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "order",        new Fields .SFInt32 (3)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "knot",         new Fields .MFDouble ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "weight",       new Fields .MFDouble ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "controlPoint", new Fields .MFVec2d ()),
		]),
		getTypeName: function ()
		{
			return "NurbsCurve2D";
		},
		getComponentName: function ()
		{
			return "NURBS";
		},
		getContainerField: function ()
		{
			return "children";
		},
		getTessellation: function (numKnots)
		{
			return NURBS .getTessellation (this .tessellation_ .getValue (), numKnots - this .order_ .getValue ());
		},
		getClosed: function (order, knot, weight, controlPoint)
		{
			if (! this .closed_ .getValue ())
				return false;

			return NURBS .getClosed2D (order, knot, weight, controlPoint);
		},
		getKnots: function (result, closed, order, dimension, knot)
		{
			return NURBS .getKnots (result, closed, order, dimension, knot);
		},
		getWeights: function (result, dimension, weight)
		{
			return NURBS .getWeights (result, dimension, weight);
		},
		getControlPoints: function (result, closed, order, weights, controlPoint)
		{
			return NURBS .getControlPoints2D (result, closed, order, weights, controlPoint);
		},
		tessellate: function (type)
		{
			var array = this .array;

			array .length = 0;

			if (this .order_ .getValue () < 2)
				return array;

			if (this .controlPoint_ .length < this .order_ .getValue ())
				return array;

			// Order and dimension are now positive numbers.

			var
				closed        = this .getClosed (this .order_ .getValue (), this .knot_, this .weight_, this .controlPoint_),
				weights       = this .getWeights (this .weights, this .controlPoint_ .length, this .weight_),
				controlPoints = this .getControlPoints (this .controlPoints, closed, this .order_ .getValue (), weights, this .controlPoint_);

			// Knots

			var
				knots = this .getKnots (this .knots, closed, this .order_ .getValue (), this .controlPoint_ .length, this .knot_),
				scale = knots .at (-1) - knots [0];

			// Initialize NURBS tessellator

			var degree = this .order_ .getValue () - 1;

			var surface = this .surface = (this .surface || nurbs) ({
				boundary: ["open"],
				degree: [degree],
				knots: [knots],
				points: controlPoints,
				debug: false,
			});

			this .sampleOptions .resolution [0] = this .getTessellation (knots .length);
			this .sampleOptions .haveWeights    = Boolean (weights);

			var
				mesh   = nurbs .sample (this .mesh, surface, this .sampleOptions),
				points = mesh .points;

			switch (type)
			{
				case 0:
				{
					for (var i = 0, length = points .length; i < length; i += 2)
					{
						array .push (points [i], points [i + 1]);
					}

					break;
				}
				case 1:
				{
					for (var i = 0, length = points .length; i < length; i += 2)
					{
						array .push (points [i], 0, points [i + 1]);
					}

					break;
				}
				case 2:
				{
					for (var i = 0, length = points .length; i < length; i += 2)
					{
						array .push (new Vector3 (points [i], points [i + 1], 0));
					}

					break;
				}
			}

			return array;
		},
	});

	return NurbsCurve2D;
});
