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
	"x_ite/Fields/SFColor",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Color4",
],
function (X3DField,
          SFColor,
          X3DConstants,
          Color4)
{
"use strict";

	function SFColorRGBA (r, g, b, a)
	{
		if (this instanceof SFColorRGBA)
		{
			if (arguments .length)
			{
				if (arguments [0] instanceof Color4)
					return X3DField .call (this, arguments [0]);
				else
					return X3DField .call (this, new Color4 (+r, +g, +b, +a));
			}

			return X3DField .call (this, new Color4 ());
		}

		return SFColorRGBA .apply (Object .create (SFColorRGBA .prototype), arguments);
	}

	SFColorRGBA .prototype = Object .assign (Object .create (X3DField .prototype),
	{
		constructor: SFColorRGBA,
		copy: function ()
		{
			return new SFColorRGBA (this .getValue () .copy ());
		},
		getTypeName: function ()
		{
			return "SFColorRGBA";
		},
		getType: function ()
		{
			return X3DConstants .SFColorRGBA;
		},
		equals: SFColor .prototype .equals,
		isDefaultValue: function ()
		{
			return (
				this .getValue () .r === 0 &&
				this .getValue () .g === 0 &&
				this .getValue () .b === 0 &&
				this .getValue () .a === 0);
		},
		set: SFColor .prototype .set,
		getHSVA: function ()
		{
			return this .getValue () .getHSVA ([ ]);
		},
		setHSVA: function (h, s, v, a)
		{
			this .getValue () .setHSVA (h, s, v, a);
			this .addEvent ();
		},
		toStream: SFColor .prototype .toStream,
		toXMLStream: SFColor .prototype .toXMLStream,
	});

	var r = {
		get: function ()
		{
			return this .getValue () .r;
		},
		set: function (value)
		{
			this .getValue () .r = value;
			this .addEvent ();
		},
		enumerable: true,
		configurable: false
	};

	var g = {
		get: function ()
		{
			return this .getValue () .g;
		},
		set: function (value)
		{
			this .getValue () .g = value;
			this .addEvent ();
		},
		enumerable: true,
		configurable: false
	};

	var b = {
		get: function ()
		{
			return this .getValue () .b;
		},
		set: function (value)
		{
			this .getValue () .b = value;
			this .addEvent ();
		},
		enumerable: true,
		configurable: false
	};

	var a = {
		get: function ()
		{
			return this .getValue () .a;
		},
		set: function (value)
		{
			this .getValue () .a = value;
			this .addEvent ();
		},
		enumerable: true,
		configurable: false
	};

	Object .defineProperty (SFColorRGBA .prototype, "r", r);
	Object .defineProperty (SFColorRGBA .prototype, "g", g);
	Object .defineProperty (SFColorRGBA .prototype, "b", b);
	Object .defineProperty (SFColorRGBA .prototype, "a", a);

	r .enumerable = false;
	g .enumerable = false;
	b .enumerable = false;
	a .enumerable = false;

	Object .defineProperty (SFColorRGBA .prototype, "0", r);
	Object .defineProperty (SFColorRGBA .prototype, "1", g);
	Object .defineProperty (SFColorRGBA .prototype, "2", b);
	Object .defineProperty (SFColorRGBA .prototype, "3", a);

	return SFColorRGBA;
});
