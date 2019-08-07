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
	"x_ite/Fields/SFVec3",
	"x_ite/Basic/X3DField",
	"x_ite/Bits/X3DConstants",
	"x_ite/InputOutput/Generator",
	"standard/Math/Numbers/Rotation4",
],
function (SFVec3,
          X3DField,
          X3DConstants,
          Generator,
          Rotation4)
{
"use strict";

	var SFVec3f = SFVec3 .SFVec3f;

	function SFRotation (x, y, z, angle)
	{
		switch (arguments .length)
		{
			case 0:
				return X3DField .call (this, new Rotation4 ());

			case 1:
				return X3DField .call (this, arguments [0]);

			case 2:
				if (arguments [1] instanceof SFVec3f)
					return X3DField .call (this, new Rotation4 (arguments [0] .getValue (), arguments [1] .getValue ()));

				return X3DField .call (this, new Rotation4 (arguments [0] .getValue (), arguments [1] * 1));

			case 4:
				return X3DField .call (this, new Rotation4 (x * 1, y * 1, z * 1, angle * 1));
		}

		throw new Error ("Invalid arguments.");
	}

	SFRotation .prototype = Object .assign (Object .create (X3DField .prototype),
	{
		constructor: SFRotation,
		copy: function ()
		{
			return new SFRotation (this .getValue () .copy ());
		},
		equals: function (rotation)
		{
			return this .getValue () .equals (rotation .getValue ());
		},
		isDefaultValue: function ()
		{
			return this .getValue () .equals (Rotation4 .Identity);
		},
		getTypeName: function ()
		{
			return "SFRotation";
		},
		getType: function ()
		{
			return X3DConstants .SFRotation;
		},
		set: function (value)
		{
			this .getValue () .assign (value);
		},
		setAxis: function (vector)
		{
			this .getValue () .setAxis (vector .getValue ());
			this .addEvent ();
		},
		getAxis: function ()
		{
			return new SFVec3f (this .getValue () .getAxis () .copy ());
		},
		inverse: function ()
		{
			return new SFRotation (Rotation4 .inverse (this .getValue ()));
		},
		multiply: function (rotation)
		{
			return new SFRotation (Rotation4 .multRight (this .getValue (), rotation .getValue ()));
		},
		multVec: function (vector)
		{
			return new SFVec3f (this .getValue () .multVecRot (vector .getValue () .copy ()));
		},
		slerp: function (rotation, t)
		{
			return new SFRotation (Rotation4 .slerp (this .getValue (), rotation .getValue (), t));
		},
		toStream: function (stream)
		{
			var
				generator = Generator .Get (stream),
				rotation  = this .getValue ();

			stream .string +=  rotation .x + " " +
			                   rotation .y + " " +
			                   rotation .z + " " +
			                   generator .ToUnit ("angle", rotation .angle);
		},
		toVRMLStream: function (stream)
		{
			this .toStream (stream);
		},
		toXMLStream: function (stream)
		{
			this .toStream (stream);
		},
	});

	var x = {
		get: function ()
		{
			return this .getValue () .x;
		},
		set: function (value)
		{
			this .getValue () .x = value * 1;
			this .addEvent ();
		},
		enumerable: true,
		configurable: false
	};

	var y = {
		get: function ()
		{
			return this .getValue () .y;
		},
		set: function (value)
		{
			this .getValue () .y = value * 1;
			this .addEvent ();
		},
		enumerable: true,
		configurable: false
	};

	var z = {
		get: function ()
		{
			return this .getValue () .z;
		},
		set: function (value)
		{
			this .getValue () .z = value * 1;
			this .addEvent ();
		},
		enumerable: true,
		configurable: false
	};

	var angle = {
		get: function ()
		{
			return this .getValue () .angle;
		},
		set: function (value)
		{
			this .getValue () .angle = value * 1;
			this .addEvent ();
		},
		enumerable: true,
		configurable: false
	};

	Object .defineProperty (SFRotation .prototype, "x",     x);
	Object .defineProperty (SFRotation .prototype, "y",     y);
	Object .defineProperty (SFRotation .prototype, "z",     z);
	Object .defineProperty (SFRotation .prototype, "angle", angle);

	x     .enumerable = false;
	y     .enumerable = false;
	z     .enumerable = false;
	angle .enumerable = false;

	Object .defineProperty (SFRotation .prototype, "0", x);
	Object .defineProperty (SFRotation .prototype, "1", y);
	Object .defineProperty (SFRotation .prototype, "2", z);
	Object .defineProperty (SFRotation .prototype, "3", angle);

	return SFRotation;
});
