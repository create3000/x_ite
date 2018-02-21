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
	"jquery",
	"x_ite/Basic/X3DField",
	"x_ite/Bits/X3DConstants",
	"x_ite/InputOutput/Generator",
],
function ($,
          X3DField,
          X3DConstants, 
          Generator)
{
"use strict";

	var handler =
	{
		get: function (target, key)
		{
			try
			{
				if (key in target)
					return target [key];

				// value
				
				var
					array = target .getValue (),
					index = parseInt (key);

				if (index >= array .length)
					target .resize (index + 1);

				return array [index] .valueOf ();
			}
			catch (error)
			{
				// Don't know what to do with symbols, but it seem not to affect anything.
				if ((typeof key) === "symbol")
					return;

				// if target not instance of X3DArrayField, then the constuctor is called as function.
				console .log (target, typeof key, key, error);
			}
		},
		set: function (target, key, value)
		{
			try
			{
				if (key in target)
				{
					target [key] = value;
					return true;
				}

				var
					array = target .getValue (),
					index = parseInt (key);

				if (index >= array .length)
					target .resize (index + 1);

				array [index] .setValue (value);
				return true;
			}
			catch (error)
			{
				// if target not instance of X3DArrayField, then the constuctor is called as function.
				console .log (target, key, error);
				return false;
			}
		},
		has: function (target, key)
		{
			return key in target .getValue ();
		},
		enumerate: function (target)
		{
			return Object .keys (target .getValue ()) [Symbol.iterator] ();
		},
	};

	function X3DArrayField (value)
	{
		X3DField .call (this, [ ]);
		
		if (value [0] instanceof Array)
			value = value [0];

		X3DArrayField .prototype .push .apply (this, value);

		return new Proxy (this, handler);
	}

	X3DArrayField .prototype = $.extend (new X3DField ([ ]),
	{
		constructor: X3DArrayField,
		copy: function ()
		{
			var
				copy  = new (this .constructor) (),
				array = this .getValue ();

			X3DArrayField .prototype .push .apply (copy, array);

			return copy;
		},
		equals: function (array)
		{
			var
				a      = this .getValue (),
				b      = array .getValue (),
				length = a .length;

			if (a === b)
				return true;

			if (length !== b .length)
				return false;

			for (var i = 0; i < length; ++ i)
				if (! a [i] .equals (b [i]))
					return false;

			return true;
		},
		set: function (value)
		{
			this .resize (value .length, undefined, true);

			var array = this .getValue ();

			for (var i = 0, length = value .length; i < length; ++ i)
				array [i] .set (value [i] instanceof X3DField ? value [i] .getValue () : value [i]);
		},
		isDefaultValue: function ()
		{
			return this .length === 0;
		},
		setValue: function (value)
		{
			this .set (value instanceof X3DArrayField ? value .getValue () : value);
			this .addEvent ();
		},
		unshift: function (value)
		{
			var array = this .getValue ();

			for (var i = arguments .length - 1; i >= 0; -- i)
			{
				var field = new (this .getSingleType ()) ();

				field .setValue (arguments [i]);
	
				this .addChild (field);

				array .unshift (field);
			}

			this .addEvent ();

			return array .length;
		},
		shift: function ()
		{
			var array = this .getValue ();

			if (array .length)
			{
				var field = array .shift ();
				this .removeChild (field);
				this .addEvent ();
				return field .valueOf ();
			}
		},
		push: function (value)
		{
			var array = this .getValue ();

			for (var i = 0, length = arguments .length; i < length; ++ i)
			{
				var field = new (this .getSingleType ()) ();

				field .setValue (arguments [i]);

				this .addChild (field);

				array .push (field);
			}

			this .addEvent ();

			return array .length;
		},
		pop: function ()
		{
			var array = this .getValue ();

			if (array .length)
			{
				var field = array .pop ();
				this .removeChild (field);
				this .addEvent ();
				return field .valueOf ();
			}
		},
		splice: function (index, deleteCount)
		{
			var array = this .getValue ();

			if (index > array .length)
				index = array .length;

			if (index + deleteCount > array .length)
				deleteCount = array .length - index;

			var result = this .erase (index, index + deleteCount);

			if (arguments .length > 2)
				this .insert (index, arguments, 2, arguments .length);

			return result;
		},
		insert: function (index, array, first, last)
		{
			var args = [index, 0];

			for (var i = first; i < last; ++ i)
			{
				var field = new (this .getSingleType ()) ();

				field .setValue (array [i]);

				this .addChild (field);
				args .push (field);
			}

			Array .prototype .splice .apply (this .getValue (), args);

			this .addEvent ();
		},
		find: function (first, last, value)
		{
			if ($.isFunction (value))
			{
				var values = this .getValue ();
	
				for (var i = first; i < last; ++ i)
				{
					if (value (values [i] .valueOf ()))
						return i;
				}
	
				return last;
			}

			var values = this .getValue ();

			for (var i = first; i < last; ++ i)
			{
				if (values [i] .equals (value))
					return i;
			}

			return last;
		},
		remove: function (first, last, value)
		{
			if ($.isFunction (value))
			{
				var values = this .getValue ();
	
				first = this .find (first, last, value);
	
				if (first !== last)
				{
					for (var i = first; ++ i < last; )
					{
						var current = values [i];

						if (! value (current .valueOf ()))
						{
							var tmp = values [first];
	
							values [first ++] = current;
							values [i]        = tmp;
						}
					}
				}
		
				if (first !== last)
					this .addEvent ();

				return first;
			}

			var values = this .getValue ();

			first = this .find (first, last, value);

			if (first !== last)
			{
				for (var i = first; ++ i < last; )
				{
					var current = values [i];

					if (! current .equals (value))
					{
						var tmp = values [first];

						values [first ++] = current;
						values [i]        = tmp;
					}
				}
			}

			if (first !== last)
				this .addEvent ();

			return first;
		},
		erase: function (first, last)
		{
			var values = this .getValue () .splice (first, last - first);
				
			for (var i = 0, length = values .length; i < length; ++ i)
				this .removeChild (values [i]);
			
			this .addEvent ();

			return new (this .constructor) (values);
		},
		resize: function (size, value, silent)
		{
			var array = this .getValue ();
		
			if (size < array .length)
			{
				for (var i = size, length = array .length; i < length; ++ i)
					this .removeChild (array [i]);

				array .length = size;

				if (! silent)
					this .addEvent ();
			}
			else if (size > array .length)
			{
				for (var i = array .length; i < size; ++ i)
				{
					var field = new (this .getSingleType ()) ();

					if (value !== undefined)
						field .setValue (value);

					this .addChild (field);
					array .push (field);
				}

				if (! silent)
					this .addEvent ();
			}
		},
		addChild: function (value)
		{
			value .addParent (this);
		},
		removeChild: function (value)
		{
			value .removeParent (this);
		},
		toStream: function (stream)
		{
			var
				generator = Generator .Get (stream),
				array     = this .getValue ();

			switch (array .length)
			{
				case 0:
				{
					stream .string += "[ ]";
					break;
				}
				case 1:
				{
					generator .PushUnitCategory (this .getUnit ());

					array [0] .toStream (stream);

					generator .PopUnitCategory ();
					break;
				}
				default:
				{
					generator .PushUnitCategory (this .getUnit ());

					stream .string += "[\n";
					generator .IncIndent ();
				
					for (var i = 0, length = array .length - 1; i < length; ++ i)
					{
						stream .string += generator .Indent ();
						array [i] .toStream (stream);
						stream .string += ",\n"
					}

					stream .string += generator .Indent ();
					array [length] .toStream (stream);
					stream .string += "\n";

					generator .DecIndent ();
					stream .string += generator .Indent ();
					stream .string += "]";

					generator .PopUnitCategory ();
					break;
				}
			}
		},
		toXMLStream: function (stream)
		{
			var length = this .length;

			if (length)
			{
				var
					generator = Generator .Get (stream),
					array     = this .getValue ();

				generator .PushUnitCategory (this .getUnit ());

				for (var i = 0, n = length - 1; i < n; ++ i)
				{
					array [i] .toXMLStream (stream);
					stream .string += ", ";
				}

				array [n] .toXMLStream (stream);

				generator .PopUnitCategory ();
			}
		},
		dispose: function ()
		{
			var array = this .getValue ();

			for (var i = 0, length = this .length; i < length; ++ i)
				this .removeChild (array [i]);

			array .length = 0;

			X3DField .prototype .dispose .call (this);
		},
	});

	Object .defineProperty (X3DArrayField .prototype, "length",
	{
		get: function () { return this .getValue () .length; },
		set: function (value) { this .resize (value); },
		enumerable: false,
		configurable: false
	});

	return X3DArrayField;
});
