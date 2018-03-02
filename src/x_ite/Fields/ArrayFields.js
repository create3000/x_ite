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
	"x_ite/Fields/SFBool",
	"x_ite/Fields/SFColor",
	"x_ite/Fields/SFColorRGBA",
	"x_ite/Fields/SFDouble",
	"x_ite/Fields/SFFloat",
	"x_ite/Fields/SFImage",
	"x_ite/Fields/SFInt32",
	"x_ite/Fields/SFMatrix3",
	"x_ite/Fields/SFMatrix4",
	"x_ite/Fields/SFNode",
	"x_ite/Fields/SFRotation",
	"x_ite/Fields/SFString",
	"x_ite/Fields/SFTime",
	"x_ite/Fields/SFVec2",
	"x_ite/Fields/SFVec3",
	"x_ite/Fields/SFVec4",
	"x_ite/Basic/X3DObjectArrayField",
	"x_ite/Basic/X3DTypedArrayField",
	"x_ite/Bits/X3DConstants",
	"x_ite/InputOutput/Generator",
],
function (SFBool,
          SFColor,
          SFColorRGBA,
          SFDouble,
          SFFloat,
          SFImage,
          SFInt32,
          SFMatrix3,
          SFMatrix4,
          SFNode,
          SFRotation,
          SFString,
          SFTime,
          SFVec2,
          SFVec3,
          SFVec4,
          X3DObjectArrayField,
          X3DTypedArrayField,
          X3DConstants,
          Generator)
{
"use strict";

	var
		SFMatrix3d = SFMatrix3 .SFMatrix3d,
		SFMatrix3f = SFMatrix3 .SFMatrix3f,
		SFMatrix4d = SFMatrix4 .SFMatrix4d,
		SFMatrix4f = SFMatrix4 .SFMatrix4f,
		SFVec2d    = SFVec2 .SFVec2d,
		SFVec2f    = SFVec2 .SFVec2f,
		SFVec3d    = SFVec3 .SFVec3d,
		SFVec3f    = SFVec3 .SFVec3f,
		SFVec4d    = SFVec4 .SFVec4d,
		SFVec4f    = SFVec4 .SFVec4f;

	/*
	 *  MFNode
	 */

	function MFNode (value)
	{
		if (this instanceof MFNode)
			return X3DObjectArrayField .call (this, arguments);
		
		return X3DObjectArrayField .call (Object .create (MFNode .prototype), arguments);
	}

	MFNode .prototype = Object .assign (Object .create (X3DObjectArrayField .prototype),
	{
		constructor: MFNode,
		_cloneCount: 0,
		getSingleType: function ()
		{
			return SFNode;
		},
		getValueType: function ()
		{
			return SFNode;
		},
		getArrayType: function ()
		{
			return Array;
		},
		getComponents: function ()
		{
			return 1;
		},
		getTypeName: function ()
		{
			return "MFNode";
		},
		getType: function ()
		{
			return X3DConstants .MFNode;
		},
		clone: function ()
		{
			var clone = new MFNode ();
			clone .setValue (this);
			return clone;
		},
		copy: function (executionContext)
		{
			var
				copy   = new MFNode (),
				array1 = this .getValue (),
				array2 = copy .getValue ();

			for (var i = 0, length = array1 .length; i < length; ++ i)
			{
				var value = array1 [i] .copy (executionContext);
				value .addParent (copy);
				array2 .push (value);
			}

			return copy;
		},
		addClones: function (count)
		{
			var array = this .getValue ();

			this ._cloneCount += count;

			for (var i = 0, length = array .length; i < length; ++ i)
				array [i] .addClones (count);
		},
		removeClones: function (count)
		{
			var array = this .getValue ();

			this ._cloneCount += count;

			for (var i = 0, length = array .length; i < length; ++ i)
				array [i] .removeClones (count);
		},
		addChildObject: function (value)
		{
			X3DObjectArrayField .prototype .addChildObject .call (this, value);

			value .addClones (this ._cloneCount);
		},
		removeChild: function (value)
		{
			X3DObjectArrayField .prototype .removeChild .call (this, value);

			value .removeClones (this ._cloneCount);
		},
		toXMLStream: function (stream)
		{
			var
				generator = Generator .Get (stream),
				length    = this .length;

			if (length)
			{
				generator .EnterScope ();

				var value = this .getValue ();

				for (var i = 0, n = length - 1; i < n; ++ i)
				{
					var node = value [i] .getValue ();

					if (node)
					{
						node .toXMLStream (stream);
						stream .string += "\n";
					}
					else
					{
						stream .string += generator .Indent ();
						stream .string += "<!-- NULL -->\n";
					}
				}

				var node = value [n] .getValue ();

				if (node)
				{
					node .toXMLStream (stream);
				}
				else
				{
					stream .string += generator .Indent ();
					stream .string += "<!-- NULL -->";
				}

				generator .LeaveScope ();
			}
		},
	});

	function MFString (value)
	{
		if (this instanceof MFString)
			return X3DObjectArrayField .call (this, arguments);
		
		return X3DObjectArrayField .call (Object .create (MFString .prototype), arguments);
	}

	MFString .prototype = Object .assign (Object .create (X3DObjectArrayField .prototype),
	{
		constructor: MFString,
		getValueType: function ()
		{
			return String;
		},
		getSingleType: function ()
		{
			return SFString;
		},
		getArrayType: function ()
		{
			return Array;
		},
		getComponents: function ()
		{
			return 1;
		},
		getTypeName: function ()
		{
			return "MFString";
		},
		getType: function ()
		{
			return X3DConstants .MFString;
		},
		toXMLStream: function (stream)
		{
			var length = this .length;

			if (length)
			{
				var value = this .getValue ();

				for (var i = 0, n = length - 1; i < n; ++ i)
				{
					stream .string += "\"";
					value [i] .toXMLStream (stream);
					stream .string += "\"";
					stream .string += ", ";
				}

				stream .string += "\"";
				value [n] .toXMLStream (stream);
				stream .string += "\"";
			}
		},
	});
	
	function ArrayTemplate (TypeName, Type, SingleType, ValueType, ArrayType, Components)
	{
		function ArrayField (value)
		{
			if (this instanceof ArrayField)
				return X3DObjectArrayField .call (this, arguments);
			
			return X3DObjectArrayField .call (Object .create (ArrayField .prototype), arguments);
		}

		ArrayField .prototype = Object .assign (Object .create (X3DObjectArrayField .prototype),
		{
			constructor: ArrayField,
			getSingleType: function ()
			{
				return SingleType;
			},
			getValueType: function ()
			{
				return ValueType;
			},
			getArrayType: function ()
			{
				return ArrayType;
			},
			getComponents: function ()
			{
				return Components;
			},
			getTypeName: function ()
			{
				return TypeName;
			},
			getType: function ()
			{
				return Type;
			},
		});

		return ArrayField;
	}

	function TypedArrayTemplate (TypeName, Type, SingleType, ValueType, ArrayType, Components)
	{
		function ArrayField (value)
		{
			if (this instanceof ArrayField)
				return X3DTypedArrayField .call (this, arguments);

			return X3DTypedArrayField .call (Object .create (ArrayField .prototype), arguments);
		}

		ArrayField .prototype = Object .assign (Object .create (X3DTypedArrayField .prototype),
		{
			constructor: ArrayField,
			getSingleType: function ()
			{
				return SingleType;
			},
			getValueType: function ()
			{
				return ValueType;
			},
			getArrayType: function ()
			{
				return ArrayType;
			},
			getComponents: function ()
			{
				return Components;
			},
			getTypeName: function ()
			{
				return TypeName;
			},
			getType: function ()
			{
				return Type;
			},
		});

		return ArrayField;
	}

	var ArrayFields =
	{
		MFBool:      TypedArrayTemplate ("MFBool",      X3DConstants .MFBool,      SFBool,      Boolean,     Uint8Array,   1),
		MFColor:     TypedArrayTemplate ("MFColor",     X3DConstants .MFColor,     SFColor,     SFColor,     Float32Array, 3),
		MFColorRGBA: TypedArrayTemplate ("MFColorRGBA", X3DConstants .MFColorRGBA, SFColorRGBA, SFColorRGBA, Float32Array, 4),
		MFDouble:    TypedArrayTemplate ("MFDouble",    X3DConstants .MFDouble,    SFDouble,    Number,      Float64Array, 1),
		MFFloat:     TypedArrayTemplate ("MFFloat",     X3DConstants .MFFloat,     SFFloat,     Number,      Float32Array, 1),
		MFImage:     ArrayTemplate      ("MFImage",     X3DConstants .MFImage,     SFImage,     SFImage,     Array,        1),
		MFInt32:     TypedArrayTemplate ("MFInt32",     X3DConstants .MFInt32,     SFInt32,     Number,      Int32Array,   1),
		MFMatrix3d:  TypedArrayTemplate ("MFMatrix3d",  X3DConstants .MFMatrix3d,  SFMatrix3d,  SFMatrix3d,  Float64Array, 9),
		MFMatrix3f:  TypedArrayTemplate ("MFMatrix3f",  X3DConstants .MFMatrix3f,  SFMatrix3f,  SFMatrix3f,  Float32Array, 9),
		MFMatrix4d:  TypedArrayTemplate ("MFMatrix4d",  X3DConstants .MFMatrix4d,  SFMatrix4d,  SFMatrix4d,  Float64Array, 16),
		MFMatrix4f:  TypedArrayTemplate ("MFMatrix4f",  X3DConstants .MFMatrix4f,  SFMatrix4f,  SFMatrix4f,  Float32Array, 16),
		MFNode:      MFNode,
		MFRotation:  TypedArrayTemplate ("MFRotation",  X3DConstants .MFRotation,  SFRotation,  SFRotation,  Float64Array, 4),
		MFString:    MFString,
		MFTime:      TypedArrayTemplate ("MFTime",      X3DConstants .MFTime,      SFTime,      Number,      Float64Array, 1),
		MFVec2d:     TypedArrayTemplate ("MFVec2d",     X3DConstants .MFVec2d,     SFVec2d,     SFVec2d,     Float64Array, 2),
		MFVec2f:     TypedArrayTemplate ("MFVec2f",     X3DConstants .MFVec2f,     SFVec2f,     SFVec2f,     Float32Array, 2),
		MFVec3d:     TypedArrayTemplate ("MFVec3d",     X3DConstants .MFVec3d,     SFVec3d,     SFVec3d,     Float64Array, 3),
		MFVec3f:     TypedArrayTemplate ("MFVec3f",     X3DConstants .MFVec3f,     SFVec3f,     SFVec3f,     Float32Array, 3),
		MFVec4d:     TypedArrayTemplate ("MFVec4d",     X3DConstants .MFVec4d,     SFVec4d,     SFVec4d,     Float64Array, 4),
		MFVec4f:     TypedArrayTemplate ("MFVec4f",     X3DConstants .MFVec4f,     SFVec4f,     SFVec4f,     Float32Array, 4),
	};

	Object .preventExtensions (ArrayFields);
	Object .freeze (ArrayFields);
	Object .seal (ArrayFields);

	return ArrayFields;
});
