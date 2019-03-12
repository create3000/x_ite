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
	"x_ite/Bits/X3DConstants",
	"x_ite/InputOutput/Generator",
	"x_ite/Fields/SFNodeCache",
],
function (X3DField,
          X3DConstants,
          Generator,
          SFNodeCache)
{
"use strict";

	var handler =
	{
		get: function (target, key)
		{
			try
			{
				var value = target [key];

				if (value !== undefined)
					return value;

				var
					field      = target .getValue () .getField (key),
					accessType = field .getAccessType ();

				// Specification conform would be: accessType & X3DConstants .outputOnly.
				// But we allow read access to plain fields, too.
				if (accessType === X3DConstants .inputOnly)
					return undefined;

				return field .valueOf ();
			}
			catch (error)
			{
				return undefined;
			}
 		},
		set: function (target, key, value)
		{
			if (key in target)
			{
				target [key] = value;
				return true;
			}

			try
			{
				var
					field      = target .getValue () .getField (key),
					accessType = field .getAccessType ();

				if (accessType !== X3DConstants .outputOnly)
					field .setValue (value);

	 			return true;
			}
			catch (error)
			{
				console .error (target, key, error);
				return false;
			}
		},
		has: function (target, key)
		{
			try
			{
				return Boolean (target .getValue () .getField (key));
			}
			catch (error)
			{
				return key in target;
			}
		},
		enumerate: function (target)
		{
			if (! target .getValue ())
				return [ ] [Symbol .iterator] ();

			var
				indices          = [ ],
				fieldDefinitions = target .getValue () .getFieldDefinitions ();

			for (var i = 0, length = fieldDefinitions .length; i < length; ++ i)
				array .push (fieldDefinitions [i] .name);

			return indices [Symbol .iterator] ();
		},
	};

	function SFNode (value)
	{
	   if (this instanceof SFNode)
	   {
			if (value)
			{
				value .addParent (this);

				X3DField .call (this, value);
			}
			else
			{
				X3DField .call (this, null);
			}

			return new Proxy (this, handler);
		}

		return SFNode .call (Object .create (SFNode .prototype), value);
	}

	SFNode .prototype = Object .assign (Object .create (X3DField .prototype),
	{
		constructor: SFNode,
		_cloneCount: 0,
		clone: function ()
		{
			return new SFNode (this .getValue ());
		},
		copy: function (executionContext)
		{
			var value = this .getValue ();
			
			if (value)
				return new SFNode (value .copy (executionContext));

			return new SFNode ();
		},
		getTypeName: function ()
		{
			return "SFNode";
		},
		getType: function ()
		{
			return X3DConstants .SFNode;
		},
		equals: function (node)
		{
			if (node)
				return this .getValue () === node .getValue ();

			return this .getValue () === null;
		},
		isDefaultValue: function ()
		{
			return this .getValue () === null;
		},
		set: function (value)
		{
			var current = this .getValue ();

			if (current)
			{
				current .removeClones (this ._cloneCount);
				current .removeParent (this);
			}

			if (value)
			{
				value .addParent (this);
				value .addClones (this ._cloneCount);

				X3DField .prototype .set .call (this, value);
			}
			else
			{
				X3DField .prototype .set .call (this, null);
			}
		},
		getNodeTypeName: function ()
		{
			var value = this .getValue ();

			if (value)
				return value .getTypeName ();

			throw new Error ("SFNode.getNodeTypeName: node is null.");
		},
		getNodeName: function ()
		{
			var value = this .getValue ();

			if (value)
				return value .getName ();

			throw new Error ("SFNode.getNodeName: node is null.");
		},
		getNodeType: function ()
		{
			var value = this .getValue ();

			if (value)
				return value .getType () .slice ();

			throw new Error ("SFNode.getNodeType: node is null.");
		},
		getFieldDefinitions: function ()
		{
			var value = this .getValue ();

			if (value)
				return value .getFieldDefinitions ();

			throw new Error ("SFNode.getFieldDefinitions: node is null.");
		},
		addFieldCallback: function (name, string, object)
		{
			switch (arguments .length)
			{
				case 2:
				{
					return X3DField .prototype .addFieldCallback .apply (this, arguments);
				}
				case 3:
				{
					var value = this .getValue ();
		
					if (value)
						return value .getField (name) .addFieldCallback (string, object);

					throw new Error ("SFNode.addFieldCallback: node is null.");
				}
			}
		},
		removeFieldCallback: function (name, string)
		{
			switch (arguments .length)
			{
				case 1:
				{
					return X3DField .prototype .removeFieldCallback .apply (this, arguments);
				}
				case 2:
				{
					var value = this .getValue ();
		
					if (value)
						return value .getField (name) .removeFieldCallback (string);
		
					throw new Error ("SFNode.removeFieldCallback: node is null.");
				}
			}
		},
		addClones: function (count)
		{
			var value = this .getValue ();

			this ._cloneCount += count;

			if (value)
				value .addClones (count);
		},
		removeClones: function (count)
		{
			var value = this .getValue ();

			this ._cloneCount -= count;

			if (value)
				value .removeClones (count);
		},
		valueOf: function ()
		{
			var baseNode = this .getValue ();

			if (baseNode)
			{
				var node = SFNodeCache .get (baseNode);

				if (node)
					return node;

				// Always create new instance!
				node = new SFNode (baseNode);

				SFNodeCache .set (baseNode, node);

				return node;
			}

			return null;	
		},
		toStream: function (stream)
		{
			var node = this .getValue ();

			if (node)
				node .toStream (stream);
			else
				stream .string += "NULL";
		},
		toVRMLStream: function (stream)
		{
			var node = this .getValue ();

			if (node)
				node .toVRMLStream (stream);
			else
				stream .string += "NULL";
		},
		toXMLString: function ()
		{
			var
				stream    = { string: "" },
				generator = Generator .Get (stream),
				node      = this .getValue ();

			generator .PushExecutionContext (node .getExecutionContext ());

			this .toXMLStream (stream);

			generator .PopExecutionContext ();

			return stream .string;
		},
		toXMLStream: function (stream)
		{
			var node = this .getValue ();

			if (node)
				node .toXMLStream (stream);
			else
				stream .string += "NULL";
		},
		dispose: function ()
		{
			this .set (null);

			X3DField .prototype .dispose .call (this);
		},
	});

	return SFNode;
});
