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
	"x-ite/Fields/ArrayFields",
	"x-ite/Bits/X3DConstants",
],
function ($, X3DField, ArrayFields, X3DConstants)
{
"use strict";

	var MFInt32 = ArrayFields .MFInt32;

	/*
	 *  Image
	 */

	function Image (width, height, comp, array)
	{
		this .width  = width;
		this .height = height;
		this .comp   = comp;
		this .array  = new MFInt32 ();
		this .array .setValue (array);
		this .array .length = width * height;
	}
	
	Image .prototype =
	{
		constructor: Image,
		copy: function ()
		{
			return new Image (this .width, this .height, this .comp, this .array);
		},
		equals: function (image)
		{
			return this .width  === image .width &&
			       this .height === image .height &&
			       this .comp   === image .comp &&
			       this .array .equals (image .array);
		},
		assign: function (image)
		{
			this .width  = image .width;
			this .height = image .height;
			this .comp   = image .comp;
			this .array .set (image .array .getValue ());
		},
		set: function (width, height, comp, array)
		{
			this .width  = width;
			this .height = height;
			this .comp   = comp;
			this .array .set (array);
		},
		setWidth: function (value)
		{
			this .width = value;
			this .array .length = this .width  * this .height;	
		},
		getWidth: function ()
		{
			return this .width;
		},
		setHeight: function (value)
		{
			this .height = value;
			this .array .length = this .width  * this .height;	
		},
		getHeight: function ()
		{
			return this .height;
		},
		setComp: function (value)
		{
			this .comp = value;
		},
		getComp: function ()
		{
			return this .comp;
		},
		setArray: function (value)
		{
			this .array .setValue (value);
			this .array .length = this .width  * this .height;	
		},
		getArray: function ()
		{
			return this .array;
		},
	};

	/*
	 *  SFImage
	 */

	function SFImage (width, height, comp, array)
	{
	   if (this instanceof SFImage)
	   {
			if (arguments .length === 4)
				X3DField .call (this, new Image (+width, +height, +comp, array));
			else
				X3DField .call (this, new Image (0, 0, 0, new MFInt32 ()));

			this .getValue () .getArray () .addParent (this);
			this .addInterest ("set_size__", this);
			return this;
		}

		return SFImage .apply (Object .create (SFImage .prototype), arguments);
	}

	SFImage .prototype = $.extend (Object .create (X3DField .prototype),
	{
		constructor: SFImage,
		set_size__: function ()
		{
			this .getValue () .getArray () .length = this .width * this .height;
		},
		copy: function ()
		{
			return new SFImage (this .getValue ());
		},
		equals: function (image)
		{
			return this .getValue () .equals (image .getValue ());
		},
		isDefaultValue: function ()
		{
			return (
				this .width  === 0 &&
				this .height === 0 &&
				this .comp   === 0);
		},
		set: function (image)
		{
			this .getValue () .assign (image);
		},
		getTypeName: function ()
		{
			return "SFImage";
		},
		getType: function ()
		{
			return X3DConstants .SFImage;
		},
		toString: function ()
		{
		   var
				string = this .width + " " + this .height + " " + this .comp,
				array  = this .array .getValue ();

			for (var i = 0, length = this .width * this .height; i < length; ++ i)
				string += " 0x" + array [i] .toString (16);

			return string;
		},
		toXMLStream: function (stream)
		{
			stream .string += this .toString ();
		},
	});

	var width = {
		get: function ()
		{
			return this .getValue () .getWidth ();
		},
		set: function (value)
		{
			this .getValue () .setWidth (value);
			this .addEvent ();
		},
		enumerable: true,
		configurable: false
	};

	var height = {
		get: function ()
		{
			return this .getValue () .getHeight ();
		},
		set: function (value)
		{
			this .getValue () .setHeight (value);
			this .addEvent ();
		},
		enumerable: true,
		configurable: false
	};

	var comp = {
		get: function ()
		{
			return this .getValue () .getComp ();
		},
		set: function (value)
		{
			this .getValue () .setComp (value);
			this .addEvent ();
		},
		enumerable: true,
		configurable: false
	};

	var array = {
		get: function ()
		{
			return this .getValue () .getArray ();
		},
		set: function (value)
		{
			this .getValue () .setArray (value);
			this .addEvent ();
		},
		enumerable: true,
		configurable: false
	};

	Object .defineProperty (SFImage .prototype, "width",  width);
	Object .defineProperty (SFImage .prototype, "height", height);
	Object .defineProperty (SFImage .prototype, "comp",   comp);
	Object .defineProperty (SFImage .prototype, "array",  array);

	width  .enumerable = false;
	height .enumerable = false;

	Object .defineProperty (SFImage .prototype, "x", width);
	Object .defineProperty (SFImage .prototype, "y", height);

	return SFImage;
});
