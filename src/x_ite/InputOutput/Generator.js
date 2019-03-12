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
	"x_ite/Bits/X3DConstants",
],
function (X3DConstants)
{
"use strict";

	function Generator ()
	{
		this .indent                = "";
		this .indentChar            = "  ";
		this .executionContextStack = [ null ];
		this .importedNodesIndex    = { };
		this .exportedNodesIndex    = { };
		this .nodes                 = { };
		this .names                 = { };
		this .namesByNode           = { };
		this .importedNames         = { };
		this .routeNodes            = { };
		this .level                 = 0;
		this .newName               = 0;
		this .containerFields       = [ ];
		this .units                 = true;
		this .unitCategories        = [ ];
	}

	Generator .prototype =
	{
		constructor: Generator,
		Indent: function ()
		{
			return this .indent;
		},
		IncIndent: function ()
		{
			this .indent += this .indentChar;
		},
		DecIndent: function ()
		{
			this .indent = this .indent .substr (0, this .indent .length - this .indentChar .length);
		},
		PadRight: function (string, pad)
		{
			for (var i = 0, length = pad - string .length; i < length; ++ i)
				string += " ";

			return string;
		},
		PushExecutionContext: function (executionContext)
		{
			this .executionContextStack .push (executionContext);

			if (! this .importedNodesIndex [executionContext .getId ()])
				this .importedNodesIndex [executionContext .getId ()] = { };

			if (! this .exportedNodesIndex [executionContext .getId ()])
				this .exportedNodesIndex [executionContext .getId ()] = { };
		},
		PopExecutionContext: function ()
		{
			this .executionContextStack .pop ();

			if (this .ExecutionContext ())
				return;

			this .importedNodesIndex = { };
			this .exportedNodesIndex = { };
		},
		ExecutionContext: function ()
		{
			return this .executionContextStack [this .executionContextStack .length - 1];
		},
		EnterScope: function ()
		{
			if (this .level === 0)
				this .newName = 0;
		
			++ this .level;
		},
		LeaveScope: function ()
		{
			-- this .level;
		
			if (this .level === 0)
			{
				this .nodes         = { };
				this .names         = { };
				this .namesByNode   = { };
				this .importedNames = { };
				this .importedNodes = { };
			}
		},
		ExportedNodes: function (exportedNodes)
		{
			var index = this .exportedNodesIndex [this .ExecutionContext () .getId ()];

			exportedNodes .forEach (function (exportedNode)
			{
				try
				{
					index [exportedNode .getLocalNode () .getValue () .getId ()] = true;
				}
				catch (error)
				{ }
			});
		},
		ImportedNodes: function (importedNodes)
		{
			var index = this .importedNodesIndex [this .ExecutionContext () .getId ()];

			importedNodes .forEach (function (importedNode)
			{
				try
				{
					index [importedNode .getInlineNode () .getId ()] = true;
				}
				catch (error)
				{ }
			});
		},
		AddImportedNode: function (exportedNode, importedName)
		{
			this .importedNames [exportedNode .getId ()] = importedName;
		},
		AddRouteNode: function (routeNode)
		{
			this .routeNodes [routeNode .getId ()] = true;
		},
		ExistsRouteNode: function (routeNode)
		{
			if (this .routeNodes [routeNode .getId ()])
				return true;
	
			return false;
		},
		IsSharedNode: function (baseNode)
		{
			return false;
		},
		AddNode: function (baseNode)
		{
			this .nodes [baseNode .getId ()] = true;

			this .AddRouteNode (baseNode);
		},
		ExistsNode: function (baseNode)
		{
			return this .nodes [baseNode .getId ()] !== undefined;
		},
		Name: function (baseNode)
		{
			// Is the node already in index

			var name = this .namesByNode [baseNode .getId ()];

			if (name !== undefined)
				return name;

			// The node has no name

			if (baseNode .getName () .length === 0)
			{
				if (this .NeedsName (baseNode))
				{
					var name = this .UniqueName ();
		
					this .names [name]                     = baseNode;
					this .namesByNode [baseNode .getId ()] = name;

					return name;
				}
		
				// The node doesn't need a name

				return baseNode .getName ();
			}
		
			// The node has a name
		 	
			var _TrailingNumbers = /(_\d+$)/;

			var name      = baseNode .getName ();
			var hasNumber = name .match (_TrailingNumbers) !== null;
		
			name = name .replace (_TrailingNumbers, "");
		
			if (name .length === 0)
			{
				if (this .NeedsName (baseNode))
					name = this .UniqueName ();

				else
					return "";
			}
			else
			{
				var
					i       = 0,
					newName = hasNumber ? name + '_' + (++ i) : name;

				while (this .names [newName] !== undefined)
				{
					newName = name + '_' + (++ i);
				}

				name = newName;
			}

			this .names [name]                     = baseNode;
			this .namesByNode [baseNode .getId ()] = name;

			return name;
		},
		NeedsName: function (baseNode)
		{
			if (baseNode .getCloneCount () > 1)
				return true;

			if (baseNode .hasRoutes ())
				return true;

			var
				executionContext = baseNode .getExecutionContext (),
				index            = this .importedNodesIndex [executionContext .getId ()];

			if (index)
			{
				if (index [baseNode .getId ()])
					return true;
			}

			var index = this .exportedNodesIndex [executionContext .getId ()];

			if (index)
			{
				if (index [baseNode .getId ()])
					return true;
			}

			return false;
		},
		UniqueName: function ()
		{
			for (; ;)
			{
				var name = '_' + (++ this .newName);
		
				if (this .names [name] !== undefined)
					continue;

				return name;
			}
		},
		LocalName: function (baseNode)
		{
			var importedName = this .importedNames [baseNode .getId ()];

			if (importedName !== undefined)
				return importedName;

			if (this .ExistsNode (baseNode))
				return this .Name (baseNode);

			throw new Error ("Couldn't get local name for node '" + baseNode .getTypeName () + "'.");
		},
		PushContainerField: function (field)
		{
			this .containerFields .push (field);
		},
		PopContainerField: function ()
		{
			this .containerFields .pop ();
		},
		ContainerField: function ()
		{
			if (this .containerFields .length)
				return this .containerFields [this .containerFields .length - 1];

			return null;
		},
		AccessType: function (accessType)
		{
			switch (accessType)
			{
				case X3DConstants .initializeOnly:
					return "initializeOnly";
				case X3DConstants .inputOnly:
					return "inputOnly";
				case X3DConstants .outputOnly:
					return "outputOnly";
				case X3DConstants .inputOutput:
					return "inputOutput";
			}
		},
		SetUnits: function (value)
		{
			this .units = value;
		},
		GetUnits: function ()
		{
			return this .units;
		},
		PushUnitCategory: function (category)
		{
			this .unitCategories .push (category);
		},
		PopUnitCategory: function ()
		{
			this .unitCategories .pop ();
		},
		Unit: function (category)
		{
			var length = this .unitCategories .length;

			if (length == 0)
				return category;

			return this .unitCategories [length - 1];
		},
		ToUnit: function (category, value)
		{
			if (this .units)
			{
				var executionContext = this .ExecutionContext ();
			
				if (executionContext)
					return executionContext .toUnit (category, value);
			}

			return value;
		},
		XMLEncode: function (string)
		{
			return string
				.replace (/&/g, "&amp;")
				.replace (/\\/g, "&#92;")
				.replace (/\t/g, "&#x9;")
				.replace (/\n/g, "&#xA;")
				.replace (/\r/g, "&#xD;")
				.replace (/</g, "&lt;")
				.replace (/>/g, "&gt;")
				.replace (/'/g, "&apos;")
				.replace (/"/g, "\\\"");
		},
		escapeCDATA: function (string)
		{
			return string .replace (/\]\]\>/g, "\\]\\]\\>");
		},
	};

	Generator .Get = function (stream)
	{
		if (! stream .generator)
			stream .generator = new Generator ();

		return stream .generator;
	};

	return Generator;
});
