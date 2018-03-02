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
	"x_ite/Components/Followers/X3DChaserNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Color3",
	"standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DChaserNode, 
          X3DConstants,
          Color3,
          Vector3)
{
"use strict";

	var
		initialValue       = new Vector3 (0, 0, 0),
		initialDestination = new Vector3 (0, 0, 0),
		deltaOut           = new Vector3 (0, 0, 0),
		vector             = new Vector3 (0, 0, 0);

	function ColorChaser (executionContext)
	{
		X3DChaserNode .call (this, executionContext);

		this .addType (X3DConstants .ColorChaser);
	}

	ColorChaser .prototype = Object .assign (Object .create (X3DChaserNode .prototype),
	{
		constructor: ColorChaser,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",           new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "set_value",          new Fields .SFColor ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "set_destination",    new Fields .SFColor ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "initialValue",       new Fields .SFColor (0.8, 0.8, 0.8)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "initialDestination", new Fields .SFColor (0.8, 0.8, 0.8)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "duration",           new Fields .SFTime (1)),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",           new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "value_changed",      new Fields .SFColor ()),
		]),
		getTypeName: function ()
		{
			return "ColorChaser";
		},
		getComponentName: function ()
		{
			return "Followers";
		},
		getContainerField: function ()
		{
			return "children";
		},
		getVector: function ()
		{
			return new Vector3 (0, 0, 0);
		},
		getValue: function ()
		{
			return this .set_value_ .getValue () .getHSV (vector);
		},
		getDestination: function ()
		{
			return this .set_destination_ .getValue () .getHSV (vector);
		},
		getInitialValue: function ()
		{
			return this .initialValue_ .getValue () .getHSV (initialValue);
		},
		getInitialDestination: function ()
		{
			return this .initialDestination_ .getValue () .getHSV (initialDestination);
		},
		setValue: function (value)
		{
			this .value_changed_ .setHSV (value .x, value .y, value .z);
		},
		interpolate: function (source, destination, weight)
		{
			return Color3 .lerp (source, destination, weight, vector);
		},
		step: function (value1, value2, t)
		{
			deltaOut .assign (this .output) .add (value1) .subtract (value2);

			//step .x = Algorithm .interval (step .x, 0, 2 * Math .PI);

			Color3 .lerp (this .output, deltaOut, t, this .output);
		},
	});

	return ColorChaser;
});


