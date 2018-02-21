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
	"standard/Math/Algorithm",
],
function ($,
          X3DField,
          X3DConstants, 
          Generator,
          Algorithm)
{
"use strict";

	var tmp = [ ]; // Array with components size.

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
					array      = target .getValue (),
					index      = parseInt (key),
					components = target .getComponents (),
					valueType  = target .getValueType ();

				if (index >= target ._length)
				{
					target .resize (index + 1);
					array = target .getValue ();
				}

				if (components === 1)
				{
					return valueType (array [index]);
				}
				else
				{
					index *= components;
	
					for (var c = 0; c < components; ++ c, ++ index)
						tmp [c] = array [index];

					tmp .length = components;

					var value = Object .create (valueType .prototype);

					valueType .apply (value, tmp);

					return value;
				}
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
					array      = target .getValue (),
					index      = parseInt (key),
					components = target .getComponents ();

				if (index >= target ._length)
				{
					target .resize (index + 1);
					array = target .getValue ();
				}

				if (components === 1)
				{
					array [index] = value;
				}
				else
				{
					index *= components;

					for (var c = 0; c < components; ++ c, ++ index)
						array [index] = value [c];
				}

				target .addEvent ();

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
		X3DField .call (this, new (this .getArrayType ()) (2));

		if (value [0] instanceof Array)
			value = value [0];

		X3DArrayField .prototype .push .apply (this, value);

		return new Proxy (this, handler);
	}

	X3DArrayField .prototype = $.extend (new X3DField ([ ]),
	{
		constructor: X3DArrayField,
		_length: 0,
		copy: function ()
		{
			var
				array      = this .getValue (),
				copy       = new (this .constructor) (),
				copyArray  = new (this .getArrayType ()) (array);

			copy ._length = this ._length;

			X3DField .prototype .set .call (copy, copyArray, this ._length);

			return copy;
		},
		equals: function (other)
		{
			if (this === other)
				return true;

			var length = this ._length;

			if (length !== other ._length)
				return false;

			var
				a = this  .getValue (),
				b = other .getValue ();

			for (var i = 0, l = length * this .getComponents (); i < l; ++ i)
			{
				if (a [i] !== b [i])
					return false;
			}

			return true;
		},
		assign: function (value)
		{
			this .set (value .getValue (), value .length);
			this .addEvent ();
		},
		set: function (otherArray /* value of field */, l /* length of field */)
		{
			var
				components  = this .getComponents (),
				array       = this .getValue (),
				length      = this ._length,
				otherLength = l !== undefined ? l * components : otherArray .length,
				rest        = otherLength % components;

//if (this .getName () == "majorLineEvery")
//{
//console .log (this .getName ());
//console .log (otherArray);
//console .trace (otherArray);
//}
			if (rest)
			{
				throw new Error ("Array length must be multiple of components size, which is " + components + ".");
			}

			otherLength /= components;

			if (array .length < otherArray .length)
			{
				array = this .grow (otherArray .length);
				array .set (otherArray);
			}
			else
			{
				array .set (otherArray);

				if (otherLength < length)
					array .fill (0, otherLength * components, length * components);
			}

			this ._length = otherLength;
		},
		isDefaultValue: function ()
		{
			return this ._length === 0;
		},
		setValue: function (value)
		{
			if (value instanceof this .constructor)
			{
				this .assign (value);
			}
			else
			{
				this .set (value);
				this .addEvent ();
			}
		},
		unshift: function (value)
		{
			var
				components      = this .getComponents (),
				length          = this ._length,
				argumentsLength = arguments .length;

			var array = this .grow ((length + argumentsLength) * components);

			array .copyWithin (argumentsLength * components, 0, length * components);

			if (components === 1)
			{
				array .set (arguments, 0);
			}
			else
			{
				for (var i = 0, a = 0; a < argumentsLength; ++ a)
				{
					var argument = arguments [a];

					for (var c = 0; c < components; ++ i, ++ c)
					{
						array [i] = argument [c];
					}
				}
			}

			this ._length += argumentsLength;

			this .addEvent ();

			return array .length;
		},
		shift: function ()
		{
			var array = this .getValue ();

			if (array .length)
			{
				var
					components = this .getComponents (),
					valueType  = this .getValueType (),
					length     = this ._length,
					newLength  = length - 1;

				if (components === 1)
				{
					var value = valueType (array [0]);
				}
				else
				{
					for (var c = 0; c < components; ++ c)
						tmp [c] = array [c];

					tmp .length = components;

					var value = Object .create (valueType .prototype);

					valueType .apply (value, tmp);
				}

				array .copyWithin (0, components, length * components);
				array .fill (0, components * newLength, length * components);

				this ._length = newLength;

				this .addEvent ();
				return value;
			}
		},
		push: function (value)
		{
			var
				components      = this .getComponents (),
				length          = this ._length,
				argumentsLength = arguments .length;

			var array = this .grow ((length + argumentsLength) * components);

			if (components === 1)
			{
				array .set (arguments, length);
			}
			else
			{
				for (var i = length * components, a = 0; a < argumentsLength; ++ a)
				{
					var argument = arguments [a];

					for (var c = 0; c < components; ++ i, ++ c)
					{
						array [i] = argument [c];
					}
				}
			}

			this ._length += argumentsLength;

			this .addEvent ();

			return this ._length;
		},
		pop: function ()
		{
			var array = this .getValue ();

			if (array .length)
			{
				var
					components = this .getComponents (),
					valueType  = this .getValueType (),
					length     = this ._length,
					newLength  = length - 1;

				if (components === 1)
				{
					var value = valueType (array [length - 1]);
				}
				else
				{
					for (var c = 0, a = newLength * components; c < components; ++ c, ++ a)
						tmp [c] = array [a];
	
					tmp .length = components;

					var value = Object .create (valueType .prototype);

					valueType .apply (value, tmp);
				}

				array .fill (0, newLength * components, length * components);

				this ._length = newLength;

				this .addEvent ();
				return value;
			}
		},
		splice: function (index, deleteCount)
		{
			var
				array  = this .getValue (),
				length = this ._length;

			if (index > length)
				index = length;

			if (index + deleteCount > length)
				deleteCount = length - index;

			var result = this .erase (index, index + deleteCount);

			if (arguments .length > 2)
				this .spliceInsert (index, Array .prototype .splice .call (arguments, 2));

			this .addEvent ();

			return result;
		},
		spliceInsert: function (index, other)
		{
			var
				components  = this .getComponents (),
				length      = this ._length,
				otherLength = other .length;

			index *= components;

			var array = this .grow ((length + otherLength) * components);

			array .copyWithin (index + otherLength * components, index, length * components);

			if (components === 1)
			{
				array .set (other, index);
			}
			else
			{
				for (var i = 0, a = index; i < otherLength; ++ i)
				{
					var value = other [i];

					for (var c = 0; c < components; ++ c, ++ a)
						array [a] = value [c];
				}
			}

			this ._length += otherLength;
		},
		insert: function (index, other, first, last)
		{
			var
				otherArray = other .getValue (),
				components = this .getComponents (),
				difference = last - first;

			index *= components;
			first *= components;
			last  *= components;

			var array = this .grow ((this ._length + difference) * components);

			array .copyWithin (index + difference * components, index, this ._length * components);

			for (; first < last; ++ index, ++ first)
				array [index] = otherArray [first];

			this ._length += difference;

			this .addEvent ();
		},
		erase: function (first, last)
		{
			var
				array      = this .getValue (),
				components = this .getComponents (),
				difference = last - first,
				length     = this ._length,
				newLength  = this ._length - difference,
				values     = new (this .constructor) ();

			first *= components;
			last  *= components;

			var valuesArray = values .grow (difference * components);

			for (var v = 0, f = first; f < last; ++ v, ++ f)
				valuesArray [v] = array [f];

			array .copyWithin (first, last, length * components);
			array .fill (0, newLength * components, length * components);

			this   ._length = newLength;
			values ._length = difference;

			this .addEvent ();

			return values;
		},
		resize: function (newLength, value, silent)
		{
			var
				length     = this ._length,
				components = this .getComponents ();

			if (newLength < length)
			{
				this .getValue () .fill (0, newLength * components, length * components);

				if (! silent)
					this .addEvent ();
			}
			else if (newLength > length)
			{
				var array = this .grow (newLength * components);

				if (value !== undefined)
				{
					if (components === 1)
					{
						array .fill (value, length * components, newLength * components);
					}
					else
					{
						for (var i = length * components, il = newLength * components; i < il; )
						{
							for (var c = 0; c < components; ++ i, ++ c)
							{
								array [i] = value [c];
							}
						}
					}
				}
	
				if (! silent)
					this .addEvent ();
			}

			this ._length = newLength;
		},
		grow: function (length)
		{
			var array = this .getValue ();

			if (length < array .length)
				return array;

			var
				maxLength = Algorithm .nextPowerOfTwo (length),
				newArray  = new (this .getArrayType ()) (maxLength);

			newArray .set (array);

			X3DField .prototype .set .call (this, newArray);

			return newArray;
		},
		toStream: function (stream)
		{
			var
				generator  = Generator .Get (stream),
				array      = this .getValue (),
				length     = this ._length,
				components = this .getComponents (),
				value      = new (this .getSingleType ()) ();

			switch (length)
			{
				case 0:
				{
					stream .string += "[ ]";
					break;
				}
				case 1:
				{
					generator .PushUnitCategory (this .getUnit ());

					if (components === 1)
					{
						value .set (array [0]);

						value .toStream (stream);
					}
					else
					{
						for (var c = 0, first = 0; c < components; ++ c, ++ first)
							value [c] = array [first]; 

						value .toStream (stream);
					}

					generator .PopUnitCategory ();
					break;
				}
				default:
				{
					generator .PushUnitCategory (this .getUnit ());

					stream .string += "[\n";
					generator .IncIndent ();

					if (components === 1)
					{
						for (var i = 0, n = length - 1; i < n; ++ i)
						{
							stream .string += generator .Indent ();

							value .set (array [i * components]);
							value .toStream (stream);
	
							stream .string += ",\n"
						}
	
						stream .string += generator .Indent ();
						value .set (array [n * components]);
						value .toStream (stream);

						stream .string += "\n";
					}
					else
					{
						for (var i = 0, n = length - 1; i < n; ++ i)
						{
							stream .string += generator .Indent ();

							for (var c = 0, first = i * components; c < components; ++ c, ++ first)
								value [c] = array [first]; 
		
							value .toStream (stream);
		
							stream .string += ",\n"
						}

						stream .string += generator .Indent ();

						for (var c = 0, first = n * components; c < components; ++ c, ++ first)
							value [c] = array [first]; 
		
						value .toStream (stream);
						stream .string += "\n";
					}

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
			var length = this ._length;

			if (length)
			{
				var
					generator  = Generator .Get (stream),
					array      = this .getValue (),
					components = this .getComponents (),
					value      = new (this .getSingleType ()) ();
	
				generator .PushUnitCategory (this .getUnit ());

				if (components === 1)
				{
					for (var i = 0, n = length - 1; i < n; ++ i)
					{
						value .set (array [i * components]);
						value .toXMLStream (stream);

						stream .string += ", ";
					}

					value .set (array [n * components]);

					value .toXMLStream (stream);
				}
				else
				{
					for (var i = 0, n = length - 1; i < n; ++ i)
					{
						for (var c = 0, first = i * components; c < components; ++ c, ++ first)
							value [c] = array [first]; 
	
						value .toXMLStream (stream);
	
						stream .string += ", ";
					}

					for (var c = 0, first = n * components; c < components; ++ c, ++ first)
						value [c] = array [first]; 
	
					value .toXMLStream (stream);
				}

				generator .PopUnitCategory ();
			}
		},
		dispose: function ()
		{
			X3DField .prototype .dispose .call (this);
		},
	});

	Object .defineProperty (X3DArrayField .prototype, "length",
	{
		get: function () { return this ._length; },
		set: function (value) { this .resize (value); },
		enumerable: false,
		configurable: false
	});

	return X3DArrayField;
});
