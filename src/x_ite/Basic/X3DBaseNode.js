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
	"x_ite/Base/X3DEventObject",
	"x_ite/Base/Events",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Fields",
	"x_ite/Bits/X3DConstants",
	"x_ite/InputOutput/Generator",
],
function (X3DEventObject,
          Events,
          X3DFieldDefinition,
          FieldDefinitionArray,
          Fields,
          X3DConstants,
          Generator)
{
"use strict";

	function isLive ()
	{
	   return this .isLive_;
	}

	function X3DBaseNode (executionContext)
	{
		if (this .hasOwnProperty ("_executionContext"))
			return;

		X3DEventObject .call (this, executionContext .getBrowser ());

		this ._executionContext  = executionContext;
		this ._type              = [ X3DConstants .X3DBaseNode ];
		this ._fields            = new Map ();
		this ._predefinedFields  = new Map ();
		this ._userDefinedFields = new Map ();
		this ._cloneCount        = 0;

		// Setup fields.

		if (this .hasUserDefinedFields ())
			this .fieldDefinitions = new FieldDefinitionArray (this .fieldDefinitions .getValue () .slice ());

		var fieldDefinitions = this .fieldDefinitions .getValue ();

		for (var i = 0, length = fieldDefinitions .length; i < length; ++ i)
			this .addField (fieldDefinitions [i]);
	}

	X3DBaseNode .prototype = Object .assign (Object .create (X3DEventObject .prototype),
	{
		constructor: X3DBaseNode,
		fieldDefinitions: new FieldDefinitionArray ([ ]),
		_private: false,
		_live: true,
		_initialized: false,
		setExecutionContext: function (value)
		{
			// Currently only usefull for Sene.

			this ._executionContext = value;
		},
		getScene: function ()
		{
			var executionContext = this ._executionContext;

			while (! executionContext .isRootContext ())
				executionContext = executionContext .getExecutionContext ();

			return executionContext;
		},
		getExecutionContext: function ()
		{
			return this ._executionContext;
		},
		addType: function (value)
		{
			this ._type .push (value);
		},
		getType: function ()
		{
			return this ._type;
		},
		getInnerNode: function ()
		{
			return this;
		},
		isLive: function ()
		{
			///  Returns the live event of this node.

			// Change function.

			this .isLive = isLive;

			// Add isLive event.

			this .addChildObjects ("isLive", new Fields .SFBool (this .getLiveState ()));

			// Event processing is done manually and immediately, so:
			this .isLive_ .removeParent (this);

			// Connect to execution context.

			if (this ._executionContext !== this)
				this ._executionContext .isLive () .addInterest ("_set_live__", this);

			// Return field

			return this .isLive ();
		},
		setLive: function (value)
		{
			///  Sets the own live state of this node.  Setting the live state to false
			///  temporarily disables this node completely.

			this ._live = value .valueOf ();

			this ._set_live__ ();
		},
		getLive: function ()
		{
			///  Returns the own live state of this node.

			return this ._live;
		},
		getLiveState: function ()
		{
			///  Determines the live state of this node.

			if (this !== this ._executionContext)
				return this .getLive () && this ._executionContext .isLive () .getValue ();

			return this .getLive ();
		},
		_set_live__: function ()
		{
			var
				live   = this .getLiveState (),
				isLive = this .isLive ();

			if (live)
			{
				if (isLive .getValue ())
					return;

				isLive .setValue (true);
				isLive .processEvent (Events .create (isLive));
			}
			else
			{
				if (isLive .getValue ())
				{
					isLive .setValue (false);
					isLive .processEvent (Events .create (isLive));
				}
			}
		},
		isInitialized: function ()
		{
			return this ._initialized;
		},
		setup: function ()
		{
			if (this ._initialized)
				return;

			this ._initialized = true;

			var fieldDefinitions = this .fieldDefinitions .getValue ();

			for (var i = 0, length = fieldDefinitions .length; i < length; ++ i)
			{
				var field = this ._fields .get (fieldDefinitions [i] .name);
				field .updateReferences ();
				field .setTainted (false);
			}

			this .initialize ();
		},
		initialize: function () { },
		eventsProcessed: function () { },
		create: function (executionContext)
		{
			return new (this .constructor) (executionContext);
		},
		copy: function (executionContext)
		{
			// First try to get a named node with the node's name.

			function needsName (baseNode)
			{
				if (baseNode .getCloneCount () > 1)
					return true;

				if (baseNode .hasRoutes ())
					return true;

				return false;
			}

			var name = this .getName ();
		
			if (name .length)
			{
				try
				{
					return executionContext .getNamedNode (name) .getValue ();
				}
				catch (error)
				{ }
			}
			else
			{
				if (needsName (this))
					this .getExecutionContext () .updateNamedNode (this .getExecutionContext () .getUniqueName (name), this);
			}

			// Create copy.

			var copy = this .create (executionContext);

			if (name .length)
				executionContext .updateNamedNode (name, copy);

			// Default fields

			var predefinedFields = this .getPredefinedFields ();

			for (var sourceField of predefinedFields .values ())
			{
				try
				{
					var destfield = copy .getField (sourceField .getName ());

					destfield .setSet (sourceField .getSet ());

					//if (sourceField .getAccessType () === destfield .getAccessType () and sourceField .getType () === destfield .getType ())
					//{

					if (sourceField .hasReferences ())
					{
						var references = sourceField .getReferences ();

						// IS relationship
						for (var originalReference of references .values ())
						{
							try
							{
								destfield .addReference (executionContext .getField (originalReference .getName ()));
							}
							catch (error)
							{
								console .error (error .message);
							}
						}
					}
					else
					{
						if (sourceField .getAccessType () & X3DConstants .initializeOnly)
						{
							switch (sourceField .getType ())
							{
								case X3DConstants .SFNode:
								case X3DConstants .MFNode:
									destfield .setValue (sourceField .copy (executionContext));
									break;
								default:
									destfield .setValue (sourceField);
									break;
							}
						}
					}
				}
				catch (error)
				{
					console .log (error .message);
				}
			}

			// User-defined fields

			var userDefinedFields = this .getUserDefinedFields ();

			for (var sourceField of userDefinedFields .values ())
			{
				var destfield = sourceField .copy (executionContext);

				copy .addUserDefinedField (sourceField .getAccessType (),
				                           sourceField .getName (),
				                           destfield);

				destfield .setSet (sourceField .getSet ());

				if (sourceField .hasReferences ())
				{
					// IS relationship

					var references = sourceField .getReferences ();

					for (var originalReference of references .values ())
					{
						try
						{
							destfield .addReference (executionContext .getField (originalReference .getName ()));
						}
						catch (error)
						{
							console .error ("No reference '" + originalReference .getName () + "' inside execution context " + executionContext .getTypeName () + " '" + executionContext .getName () + "'.");
						}
					}
				}
			}

			executionContext .addUninitializedNode (copy);
			return copy;
		},
		addChildObjects: function (name, field)
		{
			for (var i = 0, length = arguments .length; i < length; i += 2)
				this .addChildObject (arguments [i], arguments [i + 1]);
		},
		addChildObject: function (name, field)
		{
			field .addParent (this);
			field .setName (name);

			Object .defineProperty (this, name + "_",
			{
				get: function () { return field; },
				set: function (value) { field .setValue (value); },
				enumerable: true,
				configurable: false,
			});
		},
		addField: function (fieldDefinition)
		{
			var
				accessType = fieldDefinition .accessType,
				name       = fieldDefinition .name,
				field      = fieldDefinition .value .clone ();

			field .setTainted (true);
			field .addParent (this);
			field .setName (name);
			field .setAccessType (accessType);

			this .setField (name, field);
		},
		setField: function (name, field, userDefined)
		{
			if (field .getAccessType () === X3DConstants .inputOutput)
			{
				this ._fields .set ("set_" + name,     field);
				this ._fields .set (name + "_changed", field);
			}

			this ._fields .set (name, field);

			if (! this .getPrivate ())
				field .addClones (1);

			if (userDefined)
			{
				this ._userDefinedFields .set (name, field);
				return;
			}

			this ._predefinedFields .set (name, field);

			Object .defineProperty (this, name + "_",
			{
				get: function () { return field; },
				set: function (value) { field .setValue (value); },
				enumerable: true,
				configurable: true, // false : non deleteable
			});
		},
		removeField: function (name)
		{
			var field = this ._fields .get (name);

			if (field)
			{
				if (field .getAccessType () === X3DConstants .inputOutput)
				{
					this ._fields .delete ("set_" + field .getName ());
					this ._fields .delete (field .getName () + "_changed");
				}
	
				this ._fields            .delete (name);
				this ._userDefinedFields .delete (name);
	
				var fieldDefinitions = this .fieldDefinitions .getValue ();
	
				for (var i = 0, length = fieldDefinitions .length; i < length; ++ i)
				{
					if (fieldDefinitions [i] .name === name)
					{
						fieldDefinitions .splice (i, 1);
						break;
					}
				}

				if (! this .getPrivate ())
					field .removeClones (1);
			}
		},
		getField: function (name)
		{
			var field = this ._fields .get (name);
			
			if (field)
				return field;

			throw new Error ("Unkown field '" + name + "' in node class " + this .getTypeName () + ".");
		},
		getFieldDefinitions: function ()
		{
			return this .fieldDefinitions;
		},
		hasUserDefinedFields: function ()
		{
			return false;
		},
		addUserDefinedField: function (accessType, name, field)
		{
			if (this ._fields .has (name))
				this .removeField (name);

			field .setTainted (true);
			field .addParent (this);
			field .setName (name);
			field .setAccessType (accessType);

			this .fieldDefinitions .add (new X3DFieldDefinition (accessType, name, field));

			this .setField (name, field, true);
		},
		getUserDefinedFields: function ()
		{
			return this ._userDefinedFields;
		},
		getPredefinedFields: function ()
		{
			return this ._predefinedFields;
		},
		getChangedFields: function ()
		{
			var
				changedFields    = [ ],
				predefinedFields = this .getPredefinedFields ();
		
			for (var field of predefinedFields)
			{
				if (field .getReferences () .size === 0)
				{
					if (! field .isInitializable ())
						continue;

					if (this .isDefaultValue (field))
						continue;
				}

				changedFields .push (field);
			}

			return changedFields;
		},
		isDefaultValue: function (field)
		{
			var fieldDefinition = this .getFieldDefinitions () .get (field .getName ());

			if (fieldDefinition)
				return fieldDefinition .value .equals (field);

			return ! field .getSet ();
		},
		getFields: function ()
		{
			return this ._fields;
		},
		getSourceText: function ()
		{
			return null;
		},
		hasRoutes: function ()
		{
			///  Returns true if there are any routes from or to fields of this node otherwise false.

			var fieldDefinitions = this .getFieldDefinitions ();

			for (var i = 0, length = fieldDefinitions .length; i < length; ++ i)
			{
				var field = this .getField (fieldDefinitions [i] .name);

				if (field .getInputRoutes () .size === 0 && field .getOutputRoutes () .size === 0)
					continue;

				return true;
			}
		
			return false;
		},
		getPrivate: function ()
		{
			return this ._private;
		},
		setPrivate: function (value)
		{
			this ._private = value;

			if (value)
			{
				var fieldDefinitions = this .getFieldDefinitions ();

				for (var i = 0, length = fieldDefinitions .length; i < length; ++ i)
					this .getField (fieldDefinitions [i] .name) .removeClones (1);
			}
			else
			{
				var fieldDefinitions = this .getFieldDefinitions ();

				for (var i = 0, length = fieldDefinitions .length; i < length; ++ i)
					this .getField (fieldDefinitions [i] .name) .addClones (1);
			}
		},
		getCloneCount: function ()
		{
			return this ._cloneCount;
		},
		addClones: function (count)
		{
			if (count === 0)
				return;
		
			this ._cloneCount += count;
		},
		removeClones: function (count)
		{
			if (count === 0)
				return;
		
			this ._cloneCount -= count;
		},
		traverse: function () { },
		toStream: function (stream)
		{
			stream .string += this .getTypeName () + " { }";
		},
		toXMLStream: function (stream)
		{
			var generator = Generator .Get (stream);

			if (generator .IsSharedNode (this))
			{
				stream .string += generator .Indent ();
				stream .string += "<!-- NULL -->";		
				return;
			}

			generator .EnterScope ();

			var name = generator .Name (this);

			if (name .length)
			{
				if (generator .ExistsNode (this))
				{
					stream .string += generator .Indent ();
					stream .string += "<";
					stream .string += this .getTypeName ();
					stream .string += " ";
					stream .string += "USE='";
					stream .string += generator .XMLEncode (name);
					stream .string += "'";

					var containerField = generator .ContainerField ();

					if (containerField)
					{
						if (containerField .getName () !== this .getContainerField ())
						{
							stream .string += " ";
							stream .string += "containerField='";
							stream .string += generator .XMLEncode (containerField .getName ());
							stream .string += "'";
						}
					}

					stream .string += "/>";

					generator .LeaveScope ();
					return;
				}
			}
		
			stream .string += generator .Indent ();
			stream .string += "<";
			stream .string += this .getTypeName ();

			if (name .length)
			{
				generator .AddNode (this);

				stream .string += " ";
				stream .string += "DEF='";
				stream .string += generator .XMLEncode (name);
				stream .string += "'";
			}

			var containerField = generator .ContainerField ();

			if (containerField)
			{
				if (containerField .getName () !== this .getContainerField ())
				{
					stream .string += " ";
					stream .string += "containerField='";
					stream .string += generator .XMLEncode (containerField .getName ());
					stream .string += "'";
				}
			}

			var
				fields            = this .getChangedFields (),
				userDefinedFields = this .getUserDefinedFields ();

			var
				references = [ ],
				childNodes = [ ];

			var cdata = this .getSourceText ();

			if (cdata && cdata .length === 0)
				cdata = null;

			generator .IncIndent ();
			generator .IncIndent ();

			for (var i = 0, length = fields .length; i < length; ++ i)
			{
				var field = fields [i];

				// If the field is a inputOutput and we have as reference only inputOnly or outputOnly we must output the value
				// for this field.

				var mustOutputValue = false;

				if (generator .ExecutionContext ())
				{
					if (field .getAccessType () === X3DConstants .inputOutput && field .getReferences () .size !== 0)
					{
						var
							initializableReference = false,
							fieldReferences        = field .getReferences ();
		
						for (var fieldReference of fieldReferences .values ())
						{
							initializableReference |= fieldReference .isInitializable ();
						}

						if (! initializableReference)
							mustOutputValue = true;
					}
				}

				// If we have no execution context we are not in a proto and must not generate IS references the same is true
				// if the node is a shared node as the node does not belong to the execution context.

				if (field .getReferences () .size === 0 || ! generator .ExecutionContext () || mustOutputValue)
				{
					if (mustOutputValue)
						references .push (field);

					if (field .isInitializable ())
					{
						switch (field .getType ())
						{
							case X3DConstants .SFNode:
							case X3DConstants .MFNode:
							{
								childNodes .push (field);
								break;
							}
							default:
							{
								if (field === cdata)
									break;

								stream .string += "\n";
								stream .string += generator .Indent ();
								stream .string += field .getName ();
								stream .string += "='";

								field .toXMLStream (stream);

								stream .string += "'";			
								break;
							}
						}
					}
				}
				else
				{
					references .push (field);
				}
			}

			generator .DecIndent ();
			generator .DecIndent ();
	
			if ((! this .hasUserDefinedFields () || userDefinedFields .size === 0) && references .length === 0 && childNodes .length === 0 && ! cdata)
			{
				stream .string += "/>";
			}
			else
			{
				stream .string += ">\n";

				generator .IncIndent ();

				if (this .hasUserDefinedFields ())
				{
					for (var field of userDefinedFields)
					{
						stream .string += generator .Indent ();
						stream .string += "<field";
						stream .string += " ";
						stream .string += "accessType='";
						stream .string += generator .AccessType (field .getAccessType ());
						stream .string += "'";
						stream .string += " ";
						stream .string += "type='";
						stream .string += field .getTypeName ();
						stream .string += "'";
						stream .string += " ";
						stream .string += "name='";
						stream .string += generator .XMLEncode (field .getName ());
						stream .string += "'";

						// If the field is a inputOutput and we have as reference only inputOnly or outputOnly we must output the value
						// for this field.

						var mustOutputValue = false;

						if (field .getAccessType () === X3DConstants .inputOutput && field .getReferences () .size !== 0)
						{
							var
								initializableReference = false,
								fieldReferences        = field .getReferences ();

							for (var fieldReference of fieldReferences .values ())
							{
								initializableReference |= fieldReference .isInitializable ();
							}

							if (! initializableReference)
								mustOutputValue = true;
						}

						if ((field .getReferences () .size === 0 || ! generator .ExecutionContext ()) || mustOutputValue)
						{
							if (mustOutputValue && generator .ExecutionContext ())
								references .push (field);
		
							if (! field .isInitializable () || field .isDefaultValue ())
							{
								stream .string += "/>\n";
							}
							else
							{
								// Output value

								switch (field .getType ())
								{
									case X3DConstants .SFNode:
									case X3DConstants .MFNode:
									{
										generator .PushContainerField (null);

										stream .string += ">\n";

										generator .IncIndent ();

										field .toXMLStream (stream);

										stream .string += "\n";

										generator .DecIndent ();

										stream .string += generator .Indent ();
										stream .string += "</field>\n";

										generator .PopContainerField ();
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
						else
						{
							if (generator .ExecutionContext ())
								references .push (field);

							stream .string += "/>\n";
						}
					}
				}
		
				if (references .length)
				{
					stream .string += generator .Indent ();
					stream .string += "<IS>";
					stream .string += "\n";

					generator .IncIndent ();
		
					for (var i = 0, length = references .length; i < length; ++ i)
					{
						var
							field       = references [i],
							protoFields = field .getReferences ()

						for (var protoField of protoFields .values ())
						{
							stream .string += generator .Indent ();
							stream .string += "<connect";
							stream .string += " ";
							stream .string += "nodeField='";
							stream .string += generator .XMLEncode (field .getName ());
							stream .string += "'";
							stream .string += " ";
							stream .string += "protoField='";
							stream .string += generator .XMLEncode (protoField .getName ());
							stream .string += "'";
							stream .string += "/>\n";
						}
					}

					generator .DecIndent ();

					stream .string += generator .Indent ();
					stream .string += "</IS>\n";
				}

				for (var i = 0, length = childNodes .length; i < length; ++ i)
				{
					var field = childNodes [i];

					generator .PushContainerField (field);

					field .toXMLStream (stream);

					stream .string += "\n";

					generator .PopContainerField ();
				}

				if (cdata)
				{
					for (var i = 0, length = cdata .length; i < length; ++ i)
					{
						var value = cdata [i];

						stream .string += "<![CDATA[";
						stream .string += generator .escapeCDATA (value);
						stream .string += "]]>\n";
					}
				}

				generator .DecIndent ();

				stream .string += generator .Indent ();
				stream .string += "</";
				stream .string += this .getTypeName ();
				stream .string += ">";
			}

			generator .LeaveScope ();
		},
		dispose: function ()
		{
			// TODO: remove named node if any. (do this in NamedNode)
			// TODO: remove improted node if any. (do this in ImportedNode)
			// TODO: remove exported node if any. (do this in ExportedNode)
			// TODO: remove routes from and to node if any. (do this in Route)

			var
				predefinedFields  = this .getPredefinedFields (),
				userDefinedFields = this .getUserDefinedFields ();

			for (var predefinedField of predefinedFields)
				predefinedField .dispose ();

			for (var userDefinedField of userDefinedFields)
				userDefinedField .dispose ();

			// Remove node from entire scene graph.

			var firstParents = this .getParents ();

			for (var firstParent of firstParents .values ())
			{
				if (firstParent instanceof Fields .SFNode)
				{
					var secondParents = firstParent .getParents ();

					for (var secondParent of secondParents .values ())
					{
						if (secondParent instanceof Fields .MFNode)
						{
							var length = secondParent .length;

							secondParent .erase (secondParent .remove (0, length, firstParent), length);
						}
					}

					firstParent .setValue (null);
				}
			}
		},
	});

	X3DBaseNode .prototype .addAlias = X3DBaseNode .prototype .setField;

	return X3DBaseNode;
});
