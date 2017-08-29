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
	"jquery",
	"x-ite/Basic/X3DField",
	"x-ite/Fields/SFVecPrototypeTemplate",
	"x-ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
],
function ($, X3DField, SFVecPrototypeTemplate, X3DConstants, Vector3)
{
"use strict";

	function SFVec3Template (TypeName, Type)
	{
		function SFVec3 (x, y, z)
		{
			if (arguments .length)
			{
				if (arguments [0] instanceof Vector3)
					return X3DField .call (this, arguments [0]);

				return X3DField .call (this, new Vector3 (+x, +y, +z));
			}

			return X3DField .call (this, new Vector3 (0, 0, 0));
		}
	
		SFVec3 .prototype = $.extend (Object .create (X3DField .prototype),
			SFVecPrototypeTemplate (Vector3),
		{
			constructor: SFVec3,
			getTypeName: function ()
			{
				return TypeName;
			},
			getType: function ()
			{
				return Type;
			},
			cross: function (vector)
			{
				return new (this .constructor) (Vector3 .cross (this .getValue (), vector .getValue ()));
			},
		});
	
		var x = {
			get: function ()
			{
				return this .getValue () .x;
			},
			set: function (value)
			{
				this .getValue () .x = value;
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
				this .getValue () .y = value;
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
				this .getValue () .z = value;
				this .addEvent ();
			},
			enumerable: true,
			configurable: false
		};
	
		Object .defineProperty (SFVec3 .prototype, "x", x);
		Object .defineProperty (SFVec3 .prototype, "y", y);
		Object .defineProperty (SFVec3 .prototype, "z", z);
	
		x .enumerable = false;
		y .enumerable = false;
		z .enumerable = false;
	
		Object .defineProperty (SFVec3 .prototype, "0", x);
		Object .defineProperty (SFVec3 .prototype, "1", y);
		Object .defineProperty (SFVec3 .prototype, "2", z);

		return SFVec3;
	}

	return {
		SFVec3d: SFVec3Template ("SFVec3d", X3DConstants .SFVec3d),
		SFVec3f: SFVec3Template ("SFVec3f", X3DConstants .SFVec3f),
	};
});
