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
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Fields",
	"x_ite/Base/X3DChildObject",
	"x_ite/Components/Core/X3DNode",
	"x_ite/Execution/X3DExecutionContext",
	"x_ite/Bits/X3DConstants",
	"x_ite/InputOutput/Generator",
],
function ($,
          FieldDefinitionArray,
          Fields,
          X3DChildObject,
          X3DNode,
          X3DExecutionContext,
          X3DConstants,
          Generator)
{
"use strict";

	function X3DPrototypeInstance (executionContext, protoNode)
	{
		this .protoNode        = protoNode;
		this .fieldDefinitions = new FieldDefinitionArray (protoNode .getFieldDefinitions () .getValue () .slice ());

		X3DNode             .call (this, executionContext);
		X3DExecutionContext .call (this, executionContext);

		this .addType (X3DConstants .X3DPrototypeInstance);
		this .getRootNodes () .setAccessType (X3DConstants .initializeOnly);

		this .getScene () .addInitLoadCount (this);

		if (protoNode .isExternProto)
			protoNode .requestAsyncLoad (this .construct .bind (this));

		else
			this .construct ();
	}

	X3DPrototypeInstance .prototype = $.extend (Object .create (X3DExecutionContext .prototype),
		X3DNode .prototype,
	{
		constructor: X3DPrototypeInstance,
		create: function (executionContext)
		{
			return new X3DPrototypeInstance (executionContext, this .protoNode);
		},
		getTypeName: function ()
		{
			return this .protoNode .getName ();
		},
		getComponentName: function ()
		{
			return "Core";
		},
		getContainerField: function ()
		{
			return "children";
		},
		construct: function ()
		{
			this .getScene () .removeInitLoadCount (this);

			var proto = this .protoNode .getProtoDeclaration ();

			if (proto)
			{
				// If there is a proto the externproto is completely loaded.
			
				if (! this .metadata_ .getSet ())
					this .metadata_ = proto .metadata_;

				if (this .protoNode .isExternProto)
				{
					var fieldDefinitions = proto .getFieldDefinitions ();

					for (var i = 0, length = fieldDefinitions .length; i < length; ++ i)
					{
						try
						{
							var
								fieldDefinition = fieldDefinitions [i],
                        field           = this .getField (fieldDefinition .name),
								protoField      = proto .getField (fieldDefinition .name);

							// Continue if something is wrong.
							if (field .getAccessType () !== protoField .getAccessType ())
								continue;

							// Continue if something is wrong.
							if (field .getType () !== protoField .getType ())
								continue;

							// Continue if field is eventIn or eventOut.
							if (! (field .getAccessType () & X3DConstants .initializeOnly))
								continue;

							// Is set during parse.	
							if (field .getSet ())
								continue;

							// Has IS references.
							if (field .hasReferences ())
								continue;

							field .setValue (protoField .getValue ());
						}
						catch (error)
						{
							// Definition exists in proto but does not exist in extern proto.
							this .addField (fieldDefinition);
						}
					}
				}

				// Assign metadata.

				this .setURL (proto .getURL ());

				this .importExternProtos (proto .externprotos);
				this .importProtos       (proto .protos);
				this .copyRootNodes      (proto .rootNodes);

				if (this .isInitialized ())
				{
					this .setup ();
					X3DChildObject .prototype .addEvent .call (this);
				}
			}
		},
		setup: function ()
		{
			X3DNode             .prototype .setup .call (this);
			X3DExecutionContext .prototype .setup .call (this);
		},
		initialize: function ()
		{
			try
			{
				var proto = this .protoNode .getProtoDeclaration ();

				if (proto)
				{
					this .copyImportedNodes (proto, proto .importedNodes);
					this .copyRoutes (proto, proto .routes);
				}

				// TODO: connect getRootNodes () to X3DChildObject .prototype .addEvent .call (this);

				// Now initialize bases.
	
				X3DNode             .prototype .initialize .call (this);
				X3DExecutionContext .prototype .initialize .call (this);
			}
			catch (error)
			{
				console .error (error .message);
			}
		},
		getExtendedEventHandling: function ()
		{
			return false;
		},
		getInnerNode: function ()
		{
			var rootNodes = this .getRootNodes () .getValue ();
			
			if (rootNodes .length)
			{
				var rootNode = rootNodes [0];
				
				if (rootNode)
					return rootNode .getValue () .getInnerNode ();
			}

			throw new Error ("Root node not available.");
		},
		importExternProtos: function (externprotos)
		{
			for (var i = 0, length = externprotos .length; i < length; ++ i)
				this .externprotos .add (externprotos [i] .getName (), externprotos [i]);
		},
		importProtos: function (protos)
		{
			for (var i = 0, length = protos .length; i < length; ++ i)
				this .protos .add (protos [i] .getName (), protos [i]);
		},
		copyRootNodes: function (rootNodes)
		{
			var
				rootNodes1 = rootNodes .getValue (),
				rootNodes2 = this  .getRootNodes () .getValue ();

			for (var i = 0, length = rootNodes1 .length; i < length; ++ i)
			{
				var value = rootNodes1 [i] .copy (this);
				value .addParent (this .getRootNodes ());
				rootNodes2 .push (value);
			}
		},
		copyImportedNodes: function (executionContext, importedNodes)
		{
			for (var importedName in importedNodes)
			{
				try
				{
					var
						importedNode = importedNodes [importedName],
						inlineNode   = this .getNamedNode (importedNode .getInlineNode () .getName ()),
						exportedName = importedNode .getExportedName (),
						importedName = importedNode .getImportedName ();

					this .addImportedNode (inlineNode, exportedName, importedName);
				}
				catch (error)
				{
					console .error ("Bad IMPORT specification in copy: ", error);
				}
			}
		},
		copyRoutes: function (executionContext, routes)
		{
			for (var i = 0, length = routes .length; i < length; ++ i)
			{
				try
				{
					var
						route           = routes [i],
						sourceNode      = this .getLocalNode (executionContext .getLocalName (route .sourceNode)),
						destinationNode = this .getLocalNode (executionContext .getLocalName (route .destinationNode));

					// new Route ... addUninitializedNode ...
					this .addRoute (sourceNode, route .sourceField, destinationNode, route .destinationField);
				}
				catch (error)
				{
					console .log (error);
				}
			}
		},
		toXMLStream: function (stream)
		{
			if (Generator .IsSharedNode (this))
			{
				stream .string += Generator .Indent ();
				stream .string += "<!-- NULL -->";		
				return;
			}

			Generator .EnterScope ();

			var name = Generator .Name (this);

			if (name .length)
			{
				if (Generator .ExistsNode (this))
				{
					stream .string += Generator .Indent ();
					stream .string += "<ProtoInstance";
					stream .string += " ";
					stream .string += "name='";
					stream .string += Generator .XMLEncode (this .getTypeName ());
					stream .string += "'";
					stream .string += " ";
					stream .string += "USE='";
					stream .string += Generator .XMLEncode (name);
					stream .string += "'";

					var containerField = Generator .ContainerField ();

					if (containerField)
					{
						if (containerField .getName () !== this .getContainerField ())
						{
							stream .string += " ";
							stream .string += "containerField='";
							stream .string += Generator .XMLEncode (containerField .getName ());
							stream .string += "'";
						}
					}

					stream .string += "/>";

					Generator .LeaveScope ();
					return;
				}
			}

			stream .string += Generator .Indent ();
			stream .string += "<ProtoInstance";
			stream .string += " ";
			stream .string += "name='";
			stream .string += Generator .XMLEncode (this .getTypeName ());
			stream .string += "'";

			if (name .length)
			{
				Generator .AddNode (this);

				stream .string += " ";
				stream .string += "DEF='";
				stream .string += Generator .XMLEncode (name);
				stream .string += "'";
			}

			var containerField = Generator .ContainerField ();

			if (containerField)
			{
				if (containerField .getName () !== this .getContainerField ())
				{
					stream .string += " ";
					stream .string += "containerField='";
					stream .string += Generator .XMLEncode (containerField .getName ());
					stream .string += "'";
				}
			}
		
			var
				fields   = this .getChangedFields (),
				metadata = this .metadata_;

			try
			{
				metadata = this .getField ("metadata");
			}
			catch (error)
			{ }

			if (metadata === this .metadata_)
			{
				fields = fields .filter (function (value) { return value !== this .metadata_; } .bind (this));
			}

			if (fields .length === 0 && (metadata === this .metadata_ ? true || ! metadata .getValue () : true))
			{
				stream .string += "/>";
			}
			else
			{
				stream .string += ">\n";

				Generator .IncIndent ();

				var references = [ ];

				for (var i = 0, length = fields .length; i < length; ++ i)
				{
					var field = fields [i];

					// If the field is a inputOutput and we have as reference only inputOnly or outputOnly we must output the value
					// for this field.

					var mustOutputValue = false;

					if (Generator .ExecutionContext ())
					{
						if (field .getAccessType () === X3DConstants .inputOutput && ! $.isEmptyObject (field .getReferences ()))
						{
							var
								initializableReference = false,
								fieldReferences        = field .getReferences ();

							for (var id in fieldReferences)
							{
								initializableReference |= fieldReferences [id] .isInitializable ();
							}

							if (! initializableReference)
								mustOutputValue = true;
						}
					}

					// If we have no execution context we are not in a proto and must not generate IS references the same is true
					// if the node is a shared node as the node does not belong to the execution context.

					if ($.isEmptyObject (field .getReferences ()) || ! Generator .ExecutionContext () || mustOutputValue)
					{
						if (mustOutputValue)
							references .push (field);

						switch (field .getType ())
						{
							case X3DConstants .MFNode:
							{
								stream .string += Generator .Indent ();
								stream .string += "<fieldValue";
								stream .string += " ";
								stream .string += "name='";
								stream .string += Generator .XMLEncode (field .getName ());
								stream .string += "'";

								if (field .length === 0)
								{
									stream .string += "/>\n";
								}
								else
								{
									stream .string += ">\n";

									Generator .IncIndent ();

									field .toXMLStream (stream);

									stream .string += "\n";

									Generator .DecIndent ();

									stream .string += Generator .Indent ();
									stream .string += "</fieldValue>\n";
								}

								break;
							}
							case X3DConstants .SFNode:
							{
								if (field .getValue () !== null)
								{
									stream .string += Generator .Indent ();
									stream .string += "<fieldValue";
									stream .string += " ";
									stream .string += "name='";
									stream .string += Generator .XMLEncode (field .getName ())
									stream .string += "'";
									stream .string += ">\n";
									
									Generator .IncIndent ();

									field .toXMLStream (stream);

									stream .string += "\n";

									Generator .DecIndent ();

									stream .string += Generator .Indent ();
									stream .string += "</fieldValue>\n";		
									break;
								}
		
								// Proceed with next case.
							}
							default:
							{
								stream .string += Generator .Indent ();
								stream .string += "<fieldValue";
								stream .string += " ";
								stream .string += "name='";
								stream .string += Generator .XMLEncode (field .getName ())
								stream .string += "'";
								stream .string += " ";
								stream .string += "value='";

								field .toXMLStream (stream);

								stream .string += "'";
								stream .string += "/>\n";
								break;
							}
						}
					}
					else
					{
						references .push (field);
					}
				}

				if (references .length)
				{
					stream .string += Generator .Indent ();
					stream .string += "<IS>";
					stream .string += "\n";

					Generator .IncIndent ();
		
					for (var i = 0, length = references .length; i < length; ++ i)
					{
						var
							field       = references [i],
							protoFields = field .getReferences ()

						for (var id in protoFields)
						{
							var protoField = protoFields [id];

							stream .string += Generator .Indent ();
							stream .string += "<connect";
							stream .string += " ";
							stream .string += "nodeField='";
							stream .string += Generator .XMLEncode (field .getName ());
							stream .string += "'";
							stream .string += " ";
							stream .string += "protoField='";
							stream .string += Generator .XMLEncode (protoField .getName ());
							stream .string += "'";
							stream .string += "/>\n";
						}
					}

					Generator .DecIndent ();

					stream .string += Generator .Indent ();
					stream .string += "</IS>\n";
				}

				if (metadata === this .metadata_)
				{
					if (metadata .getValue ())
					{
						metadata .toXMLStream (stream);

						stream .string += "\n";
					}
				}

				Generator .DecIndent ();

				stream .string += Generator .Indent ();
				stream .string += "</ProtoInstance>";
			}

			Generator .LeaveScope ();
		},
	});

	return X3DPrototypeInstance;
});


