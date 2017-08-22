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
	"standard/Math/Numbers/Color3",
	"cobweb/Basic/X3DField",
	"cobweb/Bits/X3DConstants",
],
function ($, Color3, X3DField, X3DConstants)
{
"use strict";

	function SFColor (r, g, b)
	{
		if (this instanceof SFColor)
		{
			if (arguments .length)
			{
				if (arguments [0] instanceof Color3)
					return X3DField .call (this, arguments [0]);
				else
					return X3DField .call (this, new Color3 (+r, +g, +b));
			}

			return X3DField .call (this, new Color3 ());
		}

		return SFColor .apply (Object .create (SFColor .prototype), arguments);
	}

	SFColor .prototype = $.extend (Object .create (X3DField .prototype),
	{
		constructor: SFColor,
		copy: function ()
		{
			return new SFColor (this .getValue () .copy ());
		},
		getTypeName: function ()
		{
			return "SFColor";
		},
		getType: function ()
		{
			return X3DConstants .SFColor;
		},
		equals: function (color)
		{
			return this .getValue () .equals (color .getValue ());
		},
		isDefaultValue: function ()
		{
			return (
				this .getValue () .r === 0 &&
				this .getValue () .g === 0 &&
				this .getValue () .b === 0);
		},
		set: function (value)
		{
			this .getValue () .assign (value);
		},
		getHSV: function ()
		{
			return this .getValue () .getHSV ([ ]);
		},
		setHSV: function (h, s, v)
		{
			this .getValue () .setHSV (h, s, v);
			this .addEvent ();
		},
		toString: function ()
		{
			return this .getValue () .toString ();
		},
		toXMLStream: function (stream)
		{
			stream .string += this .getValue () .toString ();
		},
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

	Object .defineProperty (SFColor .prototype, "r", r);
	Object .defineProperty (SFColor .prototype, "g", g);
	Object .defineProperty (SFColor .prototype, "b", b);

	r .enumerable = false;
	g .enumerable = false;
	b .enumerable = false;

	Object .defineProperty (SFColor .prototype, "0", r);
	Object .defineProperty (SFColor .prototype, "1", g);
	Object .defineProperty (SFColor .prototype, "2", b);

	return SFColor;
});
