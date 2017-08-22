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
	"excite/Fields/SFBool",
	"excite/Fields/SFColor",
	"excite/Fields/SFColorRGBA",
	"excite/Fields/SFDouble",
	"excite/Fields/SFFloat",
	"excite/Fields/SFImage",
	"excite/Fields/SFInt32",
	"excite/Fields/SFMatrix3",
	"excite/Fields/SFMatrix4",
	"excite/Fields/SFNode",
	"excite/Fields/SFRotation",
	"excite/Fields/SFString",
	"excite/Fields/SFTime",
	"excite/Fields/SFVec2",
	"excite/Fields/SFVec3",
	"excite/Fields/SFVec4",
	"excite/Basic/X3DArrayField",
	"excite/Bits/X3DConstants",
	"excite/InputOutput/Generator",
],
function ($,
          SFBool,
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
          X3DArrayField,
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
			return X3DArrayField .call (this, arguments);
		
		return X3DArrayField .call (Object .create (MFNode .prototype), arguments);
	}

	MFNode .prototype = $.extend (Object .create (X3DArrayField .prototype),
	{
		constructor: MFNode,
		_valueType: SFNode,
		_cloneCount: 0,
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
			X3DArrayField .prototype .addChildObject .call (this, value);

			value .addClones (this ._cloneCount);
		},
		removeChild: function (value)
		{
			X3DArrayField .prototype .removeChild .call (this, value);

			value .removeClones (this ._cloneCount);
		},
		toXMLStream: function (stream)
		{
			var length = this .length;

			if (length)
			{
				Generator .EnterScope ();

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
						stream .string += Generator .Indent ();
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
					stream .string += Generator .Indent ();
					stream .string += "<!-- NULL -->";
				}

				Generator .LeaveScope ();
			}
		},
	});
	
	function MFFieldTemplate (TypeName, Type, SFField)
	{
		function MFField (value)
		{
			if (this instanceof MFField)
				return X3DArrayField .call (this, arguments);
			
			return X3DArrayField .call (Object .create (MFField .prototype), arguments);
		}
	
		MFField .prototype = $.extend (Object .create (X3DArrayField .prototype),
		{
			constructor: MFField,
			_valueType: SFField,
			getTypeName: function ()
			{
				return TypeName;
			},
			getType: function ()
			{
				return Type;
			},
		});

		return MFField;
	}

	function MFString (value)
	{
		if (this instanceof MFString)
			return X3DArrayField .call (this, arguments);
		
		return X3DArrayField .call (Object .create (MFString .prototype), arguments);
	}

	MFString .prototype = $.extend (Object .create (X3DArrayField .prototype),
	{
		constructor: MFString,
		_valueType: SFString,
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

	var ArrayFields =
	{
		MFBool:      MFFieldTemplate ("MFBool",      X3DConstants .MFBool,      SFBool),
		MFColor:     MFFieldTemplate ("MFColor",     X3DConstants .MFColor,     SFColor),
		MFColorRGBA: MFFieldTemplate ("MFColorRGBA", X3DConstants .MFColorRGBA, SFColorRGBA),
		MFDouble:    MFFieldTemplate ("MFDouble",    X3DConstants .MFDouble,    SFDouble),
		MFFloat:     MFFieldTemplate ("MFFloat",     X3DConstants .MFFloat,     SFFloat),
		MFImage:     MFFieldTemplate ("MFImage",     X3DConstants .MFImage,     SFImage),
		MFInt32:     MFFieldTemplate ("MFInt32",     X3DConstants .MFInt32,     SFInt32),
		MFMatrix3d:  MFFieldTemplate ("MFMatrix3d",  X3DConstants .MFMatrix3d,  SFMatrix3d),
		MFMatrix3f:  MFFieldTemplate ("MFMatrix3f",  X3DConstants .MFMatrix3f,  SFMatrix3f),
		MFMatrix4d:  MFFieldTemplate ("MFMatrix4d",  X3DConstants .MFMatrix4d,  SFMatrix4d),
		MFMatrix4f:  MFFieldTemplate ("MFMatrix4f",  X3DConstants .MFMatrix4f,  SFMatrix4f),
		MFNode:      MFNode,
		MFRotation:  MFFieldTemplate ("MFRotation",  X3DConstants .MFRotation,  SFRotation),
		MFString:    MFString,
		MFTime:      MFFieldTemplate ("MFTime",      X3DConstants .MFTime,      SFTime),
		MFVec2d:     MFFieldTemplate ("MFVec2d",     X3DConstants .MFVec2d,     SFVec2d),
		MFVec2f:     MFFieldTemplate ("MFVec2f",     X3DConstants .MFVec2f,     SFVec2f),
		MFVec3d:     MFFieldTemplate ("MFVec3d",     X3DConstants .MFVec3d,     SFVec3d),
		MFVec3f:     MFFieldTemplate ("MFVec3f",     X3DConstants .MFVec3f,     SFVec3f),
		MFVec4d:     MFFieldTemplate ("MFVec4d",     X3DConstants .MFVec4d,     SFVec4d),
		MFVec4f:     MFFieldTemplate ("MFVec4f",     X3DConstants .MFVec4f,     SFVec4f),
	};

	Object .preventExtensions (ArrayFields);
	Object .freeze (ArrayFields);
	Object .seal (ArrayFields);

	return ArrayFields;
});