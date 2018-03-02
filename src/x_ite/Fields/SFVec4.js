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
	"x_ite/Basic/X3DField",
	"x_ite/Fields/SFVecPrototypeTemplate",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector4",
],
function (X3DField,
          SFVecPrototypeTemplate,
          X3DConstants,
          Vector4)
{
"use strict";

	function SFVec4Template (TypeName, Type)
	{
		function SFVec4 (x, y, z, w)
		{
			if (arguments .length)
			{
				if (arguments [0] instanceof Vector4)
					return X3DField .call (this, arguments [0]);

				return X3DField .call (this, new Vector4 (+x, +y, +z, +w));
			}

			return X3DField .call (this, new Vector4 (0, 0, 0, 0));
		}
	
		SFVec4 .prototype = Object .assign (Object .create (X3DField .prototype),
			SFVecPrototypeTemplate (Vector4),
		{
			constructor: SFVec4,
			getTypeName: function ()
			{
				return TypeName;
			},
			getType: function ()
			{
				return Type;
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
	
		var w = {
			get: function ()
			{
				return this .getValue () .w;
			},
			set: function (value)
			{
				this .getValue () .w = value;
				this .addEvent ();
			},
			enumerable: true,
			configurable: false
		};
	
		Object .defineProperty (SFVec4 .prototype, "x", x);
		Object .defineProperty (SFVec4 .prototype, "y", y);
		Object .defineProperty (SFVec4 .prototype, "z", z);
		Object .defineProperty (SFVec4 .prototype, "w", w);
	
		x .enumerable = false;
		y .enumerable = false;
		z .enumerable = false;
		w .enumerable = false;
	
		Object .defineProperty (SFVec4 .prototype, "0", x);
		Object .defineProperty (SFVec4 .prototype, "1", y);
		Object .defineProperty (SFVec4 .prototype, "2", z);
		Object .defineProperty (SFVec4 .prototype, "3", w);

		return SFVec4;
	}

	return {
		SFVec4d: SFVec4Template ("SFVec4d", X3DConstants .SFVec4d),
		SFVec4f: SFVec4Template ("SFVec4f", X3DConstants .SFVec4f),
	};
});
