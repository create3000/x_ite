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
	"cobweb/Fields",
	"cobweb/Basic/X3DFieldDefinition",
	"cobweb/Basic/FieldDefinitionArray",
	"cobweb/Execution/X3DExecutionContext",
	"cobweb/Prototype/X3DProtoDeclarationNode",
	"cobweb/Bits/X3DConstants",
	"cobweb/InputOutput/Generator",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DExecutionContext,
          X3DProtoDeclarationNode, 
          X3DConstants,
          Generator)
{
"use strict";

	function X3DProtoDeclaration (executionContext)
	{
		X3DProtoDeclarationNode .call (this, executionContext);
		X3DExecutionContext     .call (this, executionContext);

		this .addType (X3DConstants .X3DProtoDeclaration);

		this .addChildObjects ("loadState", new Fields .SFInt32 (X3DConstants .NOT_STARTED_STATE));
	}

	X3DProtoDeclaration .prototype = $.extend (Object .create (X3DExecutionContext .prototype),
		X3DProtoDeclarationNode .prototype,
	{
		constructor: X3DProtoDeclaration,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "PROTO";
		},
		getComponentName: function ()
		{
			return "Excite";
		},
		getContainerField: function ()
		{
			return "protos";
		},
		initialize: function ()
		{
			X3DProtoDeclarationNode .prototype .initialize .call (this);

			this .loadState_ = X3DConstants .COMPLETE_STATE;
		},
		hasUserDefinedFields: function ()
		{
			return true;
		},
		getURL: function ()
		{
			return this .getExecutionContext () .getURL ();
		},
		getProtoDeclaration: function ()
		{
			return this;
		},
		checkLoadState: function ()
		{
			return this .loadState_ .getValue ();
		},
		toXMLStream: function (stream)
		{
			stream .string += Generator .Indent ();
			stream .string += "<ProtoDeclare";
			stream .string += " ";
			stream .string += "name='";
			stream .string += Generator .XMLEncode (this .getName ());
			stream .string += "'";
			stream .string += ">";
			stream .string += "\n";
		
			// <ProtoInterface>

			Generator .EnterScope ();
		
			var userDefinedFields = this .getUserDefinedFields ();

			if (! $.isEmptyObject (userDefinedFields))
			{
				Generator .IncIndent ();

				stream .string += Generator .Indent ();
				stream .string += "<ProtoInterface>\n";

				Generator .IncIndent ();

				for (var name in userDefinedFields)
				{
					var field = userDefinedFields [name];

					stream .string += Generator .Indent ();
					stream .string += "<field";
					stream .string += " ";
					stream .string += "accessType='";
					stream .string += Generator .AccessType (field .getAccessType ());
					stream .string += "'";
					stream .string += " ";
					stream .string += "type='";
					stream .string += field .getTypeName ();
					stream .string += "'";
					stream .string += " ";
					stream .string += "name='";
					stream .string += Generator .XMLEncode (field .getName ());
					stream .string += "'";

					if (field .isDefaultValue ())
					{
						stream .string += "/>\n";
					}
					else
					{
						switch (field .getType ())
						{
							case X3DConstants .SFNode:
							case X3DConstants .MFNode:
							{
								Generator .PushContainerField (null);
		
								stream .string += ">\n";

								Generator .IncIndent ();

								field .toXMLStream (stream);

								stream .string += "\n";

								Generator .DecIndent ();

								stream .string += Generator .Indent ();
								stream .string += "</field>\n";

								Generator .PopContainerField ();
								break;
							}
							default:
							{
								stream .string += " ";
								stream .string += "value='";

								field .toXMLStream (stream);

								stream .string += "'";
								stream .string += "/>\n";
								break;
							}
						}
					}
				}
		
				Generator .DecIndent ();

				stream .string += Generator .Indent ();
				stream .string += "</ProtoInterface>\n";

				Generator .DecIndent ();
			}
		
			Generator .LeaveScope ();
		
			// </ProtoInterface>

			// <ProtoBody>
		
			Generator .IncIndent ();

			stream .string += Generator .Indent ();
			stream .string += "<ProtoBody>\n";

			Generator .IncIndent ();

			X3DExecutionContext .prototype .toXMLStream .call (this, stream);

			Generator .DecIndent ();

			stream .string += Generator .Indent ();
			stream .string += "</ProtoBody>\n";

			Generator .DecIndent ();
		
			// </ProtoBody>

			stream .string += Generator .Indent ();
			stream .string += "</ProtoDeclare>";
		},
	});

	Object .defineProperty (X3DProtoDeclaration .prototype, "name",
	{
		get: function () { return this .getName (); },
		enumerable: true,
		configurable: false
	});

	Object .defineProperty (X3DProtoDeclaration .prototype, "fields",
	{
		get: function () { return this .getFieldDefinitions (); },
		enumerable: true,
		configurable: false
	});

	Object .defineProperty (X3DProtoDeclaration .prototype, "isExternProto",
	{
		get: function () { return false; },
		enumerable: true,
		configurable: false
	});

	return X3DProtoDeclaration;
});

