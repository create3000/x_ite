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

	function X3DBaseNode (executionContext)
	{
		if (this .hasOwnProperty ("_executionContext"))
			return;

		X3DEventObject .call (this, executionContext .getBrowser ());

		this ._executionContext  = executionContext;
		this ._type              = [ X3DConstants .X3DBaseNode ];
		this ._fields            = new Map ();
		this ._predefinedFields  = new Map ();
		this ._aliases           = new Map ();
		this ._userDefinedFields = new Map ();
		this ._cloneCount        = 0;

		// Setup fields.

		if (this .hasUserDefinedFields ())
			this .fieldDefinitions = new FieldDefinitionArray (this .fieldDefinitions .getValue () .slice ());

		for (const fieldDefinition of this .fieldDefinitions)
			this .addField (fieldDefinition);
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
			// Currently only useful for Sene.

			this ._executionContext = value;
		},
		getExecutionContext: function ()
		{
			return this ._executionContext;
		},
		getScene: function ()
		{
			let executionContext = this ._executionContext;

			while (! executionContext .isRootContext ())
				executionContext = executionContext .getExecutionContext ();

			return executionContext;
		},
		getMainScene: function ()
		{
			let scene = this ._executionContext .getScene ();

			while (! scene .isMainContext ())
				scene = scene .getScene ();

			return scene;
		},
		addType: function (value)
		{
			this ._type .push (value);
		},
		getType: function ()
		{
			return this ._type;
		},
		isType: function (types)
		{
			for (const type of this ._type)
			{
				if (types .has (type))
					return true;
			}

			return false;
		},
		getInnerNode: function ()
		{
			return this;
		},
		isLive: (function ()
		{
			function isLive ()
			{
			   return this .isLive_;
			}

			return function ()
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
			};
		})(),
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
			const
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
		setInitialized: function (value)
		{
			this ._initialized = value;
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

			this ._fields .forEach (field => field .setTainted (false));

			this .initialize ();
		},
		initialize: function () { },
		create: function (executionContext)
		{
			return new (this .constructor) (executionContext);
		},
		copy: function (instance)
		{
			const executionContext = instance .getBody ();

			// First try to get a named node with the node's name.

			const name = this .getName ();

			if (name .length)
			{
				const namedNode = executionContext .getNamedNodes () .get (name);

				if (namedNode)
					return namedNode;
			}

			// Create copy.

			const copy = this .create (executionContext);

			if (name .length)
				executionContext .updateNamedNode (name, copy);

			// Default fields

			this .getPredefinedFields () .forEach (function (sourceField)
			{
				try
				{
					const destinationField = copy .getField (sourceField .getName ());

					if (sourceField .hasReferences ())
					{
						// IS relationship

						sourceField .getReferences () .forEach (function (originalReference)
						{
							try
							{
								destinationField .addReference (instance .getField (originalReference .getName ()));
							}
							catch (error)
							{
								console .error (error .message);
							}
						});
					}
					else
					{
						if (sourceField .getAccessType () & X3DConstants .initializeOnly)
						{
							switch (sourceField .getType ())
							{
								case X3DConstants .SFNode:
								case X3DConstants .MFNode:
									destinationField .set (sourceField .copy (instance) .getValue ());
									break;
								default:
									destinationField .set (sourceField .getValue (), sourceField .length);
									break;
							}
						}
					}

					destinationField .setModificationTime (sourceField .getModificationTime ());
				}
				catch (error)
				{
					console .log (error .message);
				}
			},
			this);

			// User-defined fields

			this .getUserDefinedFields () .forEach (function (sourceField)
			{
				const destinationField = sourceField .copy (instance);

				copy .addUserDefinedField (sourceField .getAccessType (),
													sourceField .getName (),
													destinationField);

				if (sourceField .hasReferences ())
				{
					// IS relationship

					sourceField .getReferences () .forEach (function (originalReference)
					{
						try
						{
							destinationField .addReference (instance .getField (originalReference .getName ()));
						}
						catch (error)
						{
							console .error ("No reference '" + originalReference .getName () + "' inside execution context " + instance .getTypeName () + " '" + instance .getName () + "'.");
						}
					});
				}

				destinationField .setModificationTime (sourceField .getModificationTime ());
			});

			copy .setup ();

			return copy;
		},
		flatCopy: function (executionContext)
		{
			const copy = this .create (executionContext || this .getExecutionContext ());

			this ._fields .forEach (function (field)
			{
				copy ._fields .get (field .getName ()) .assign (field);
			});

			copy .setup ();

			return copy;
		},
		addChildObjects: function (name, field)
		{
			for (let i = 0, length = arguments .length; i < length; i += 2)
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
			const
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
			this ._fields .set (name, field);

			if (! this .getPrivate ())
				field .addCloneCount (1);

			if (userDefined)
			{
				this ._userDefinedFields .set (name, field);
			}
			else
			{
				this ._predefinedFields .set (name, field);

				Object .defineProperty (this, name + "_",
				{
					get: function () { return field; },
					set: function (value) { field .setValue (value); },
					enumerable: true,
					configurable: true, // false : non deletable
				});
			}
		},
		removeField: function (name)
		{
			const field = this ._fields .get (name);

			if (field)
			{
				this ._fields            .delete (name);
				this ._userDefinedFields .delete (name);

				const fieldDefinitions = this .fieldDefinitions .getValue ();

				for (let i = 0, length = fieldDefinitions .length; i < length; ++ i)
				{
					if (fieldDefinitions [i] .name === name)
					{
						fieldDefinitions .splice (i, 1);
						break;
					}
				}

				if (! this .getPrivate ())
					field .removeCloneCount (1);
			}
		},
		getField: (function ()
		{
			const
				set_field     = /^set_(.*?)$/,
				field_changed = /^(.*?)_changed$/;

			return function (name)
			{
				const field = this ._fields .get (name) || this ._aliases .get (name);

				if (field)
					return field;

				const match = name .match (set_field);

				if (match)
				{
					const field = this ._fields .get (match [1]) || this ._aliases .get (match [1]);

					if (field && field .getAccessType () === X3DConstants .inputOutput)
						return field;
				}
				else
				{
					const match = name .match (field_changed);

					if (match)
					{
						const field = this ._fields .get (match [1]) || this ._aliases .get (match [1]);

						if (field && field .getAccessType () === X3DConstants .inputOutput)
							return field;
					}
				}

				throw new Error ("Unknown field '" + name + "' in node class " + this .getTypeName () + ".");
			};
		})(),
		addAlias: function (alias, field)
		{
			this ._aliases .set (alias, field);

			Object .defineProperty (this, alias + "_",
			{
				get: function () { return field; },
				set: function (value) { field .setValue (value); },
				enumerable: true,
				configurable: false,
			});
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
		getChangedFields: function (extended)
		{
			/* param routes: also return fields with routes */

			const
				changedFields    = [ ],
				predefinedFields = this .getPredefinedFields ();

			if (extended)
			{
				const userDefinedFields = this .getUserDefinedFields ();

				userDefinedFields .forEach (function (field)
				{
					changedFields .push (field);
				});
			}

			predefinedFields .forEach (function (field)
			{
				if (extended)
				{
					if (field .getInputRoutes () .size || field .getOutputRoutes () .size)
					{
						changedFields .push (field);
						return;
					}
				}

				if (field .getReferences () .size === 0)
				{
					if (! field .isInitializable ())
						return;

					if (this .isDefaultValue (field))
						return;
				}

				changedFields .push (field);
			},
			this);

			return changedFields;
		},
		isDefaultValue: function (field)
		{
			const fieldDefinition = this .getFieldDefinitions () .get (field .getName ());

			if (fieldDefinition)
				return fieldDefinition .value .equals (field);

			return ! field .getModificationTime ();
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

			for (const field of this ._fields .values ())
			{
				if (field .getInputRoutes () .size)
					return true;

				if (field .getOutputRoutes () .size)
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
				this ._fields .forEach (function (field)
				{
					field .removeCloneCount (1);
				});
			}
			else
			{
				this ._fields .forEach (function (field)
				{
					field .addCloneCount (1);
				});
			}
		},
		getCloneCount: function ()
		{
			return this ._cloneCount;
		},
		addCloneCount: function (count)
		{
			if (count === 0)
				return;

			this ._cloneCount += count;
		},
		removeCloneCount: function (count)
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
		toVRMLStream: function (stream)
		{
			const generator = Generator .Get (stream);

			if (generator .IsSharedNode (this))
			{
				stream .string += "NULL";
				return;
			}

			generator .EnterScope ();

			const name = generator .Name (this);

			if (name .length)
			{
				if (generator .ExistsNode (this))
				{
					stream .string += "USE";
					stream .string += " ";
					stream .string += name;

					generator .LeaveScope ();
					return;
				}
			}

			if (name .length)
			{
				generator .AddNode (this);

				stream .string += "DEF";
				stream .string += " ";
				stream .string += name;
				stream .string += " ";
			}

			stream .string += this .getTypeName ();
			stream .string += " ";
			stream .string += "{";

			const
				fields            = this .getChangedFields (),
				userDefinedFields = this .getUserDefinedFields ();

			let
				fieldTypeLength  = 0,
				accessTypeLength = 0;

			if (this .hasUserDefinedFields ())
			{
				userDefinedFields .forEach (function (field)
				{
					fieldTypeLength  = Math .max (fieldTypeLength, field .getTypeName () .length);
					accessTypeLength = Math .max (accessTypeLength, generator .AccessType (field .getAccessType ()) .length);
				});

				if (userDefinedFields .size)
				{
					stream .string += "\n";
					generator .IncIndent ();

					userDefinedFields .forEach (function (field)
					{
						this .toVRMLStreamUserDefinedField (stream, field, fieldTypeLength, accessTypeLength);

						stream .string += "\n";
					},
					this);

					generator .DecIndent ();

					if (fields .length !== 0)
						stream .string += "\n";
				}
			}

			if (fields .length === 0)
			{
				if (userDefinedFields .size)
					stream .string += generator .Indent ();
				else
					stream .string += " ";
			}
			else
			{
				if (userDefinedFields .size === 0)
					stream .string += "\n";

				generator .IncIndent ();

				fields .forEach (function (field)
				{
					this .toVRMLStreamField (stream, field, fieldTypeLength, accessTypeLength);

					stream .string += "\n";
				},
				this);

				generator .DecIndent ();
				stream .string += generator .Indent ();
			}

			stream .string += "}";

			generator .LeaveScope ();
		},
		toVRMLStreamField: function (stream, field, fieldTypeLength, accessTypeLength)
		{
			const generator = Generator .Get (stream);

			if (field .getReferences () .size === 0 || ! generator .ExecutionContext ())
			{
				if (field .isInitializable ())
				{
					stream .string += generator .Indent ();
					stream .string += field .getName ();
					stream .string += " ";

					field .toVRMLStream (stream);
				}
			}
			else
			{
				let
					index                  = 0,
					initializableReference = false;

				field .getReferences () .forEach (function (reference)
				{
					initializableReference = initializableReference || reference .isInitializable ();

					// Output build in reference field

					stream .string += generator .Indent ();
					stream .string += field .getName ();
					stream .string += " ";
					stream .string += "IS";
					stream .string += " ";
					stream .string += reference .getName ();

					++ index;

					if (index !== field .getReferences () .size)
						stream .string += "\n";
				});

				if (field .getAccessType () === X3DConstants .inputOutput && ! initializableReference && ! this .isDefaultValue (field))
				{
					// Output build in field

					stream .string += "\n";
					stream .string += generator .Indent ();
					stream .string += field .getName ();
					stream .string += " ";

					field .toVRMLStream (stream);
				}
			}
		},
		toVRMLStreamUserDefinedField: function (stream, field, fieldTypeLength, accessTypeLength)
		{
			const generator = Generator .Get (stream);

			if (field .getReferences () .size === 0 || ! generator .ExecutionContext ())
			{
				stream .string += generator .Indent ();
				stream .string += generator .PadRight (generator .AccessType (field .getAccessType ()), accessTypeLength);
				stream .string += " ";
				stream .string += generator .PadRight (field .getTypeName (), fieldTypeLength);
				stream .string += " ";
				stream .string += field .getName ();

				if (field .isInitializable ())
				{
					stream .string += " ";

					field .toVRMLStream (stream);
				}
			}
			else
			{
				let
					index                  = 0,
					initializableReference = false;

				field .getReferences () .forEach (function (reference)
				{
					initializableReference = initializableReference || reference .isInitializable ();

					// Output user defined reference field

					stream .string += generator .Indent ();
					stream .string += generator .PadRight (generator .AccessType (field .getAccessType ()), accessTypeLength);
					stream .string += " ";
					stream .string += generator .PadRight (field .getTypeName (), fieldTypeLength);
					stream .string += " ";
					stream .string += field .getName ();
					stream .string += " ";
					stream .string += "IS";
					stream .string += " ";
					stream .string += reference .getName ();

					++ index;

					if (index !== field .getReferences () .size)
						stream .string += "\n";
				});

				if (field .getAccessType () === X3DConstants .inputOutput && ! initializableReference && ! field .isDefaultValue ())
				{
					stream .string += "\n";
					stream .string += generator .Indent ();
					stream .string += generator .PadRight (generator .AccessType (field .getAccessType ()), accessTypeLength);
					stream .string += " ";
					stream .string += generator .PadRight (field .getTypeName (), fieldTypeLength);
					stream .string += " ";
					stream .string += field .getName ();

					if (field .isInitializable ())
					{
						stream .string += " ";

						field .toVRMLStream (stream);
					}
				}
			}
		},
		toXMLStream: function (stream)
		{
			const generator = Generator .Get (stream);

			if (generator .IsSharedNode (this))
			{
				stream .string += generator .Indent ();
				stream .string += "<!-- NULL -->";
				return;
			}

			generator .EnterScope ();

			const name = generator .Name (this);

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

					const containerField = generator .ContainerField ();

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

			const containerField = generator .ContainerField ();

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

			const
				fields            = this .getChangedFields (),
				userDefinedFields = this .getUserDefinedFields ();

			const
				references = [ ],
				childNodes = [ ];

			let cdata = this .getSourceText ();

			if (cdata && cdata .length === 0)
				cdata = null;

			generator .IncIndent ();
			generator .IncIndent ();

			for (const field of fields)
			{
				// If the field is a inputOutput and we have as reference only inputOnly or outputOnly we must output the value
				// for this field.

				let mustOutputValue = false;

				if (generator .ExecutionContext ())
				{
					if (field .getAccessType () === X3DConstants .inputOutput && field .getReferences () .size !== 0)
					{
						let initializableReference = false;

						field .getReferences () .forEach (function (fieldReference)
						{
							initializableReference = initializableReference || fieldReference .isInitializable ();
						});

						if (! initializableReference)
							mustOutputValue = ! this .isDefaultValue (field);
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
					userDefinedFields .forEach (function (field)
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

						let mustOutputValue = false;

						if (field .getAccessType () === X3DConstants .inputOutput && field .getReferences () .size !== 0)
						{
							let initializableReference = false;

							field .getReferences () .forEach (function (fieldReference)
							{
								initializableReference = initializableReference || fieldReference .isInitializable ();
							});

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
										generator .PushContainerField (field);

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
					});
				}

				if (references .length)
				{
					stream .string += generator .Indent ();
					stream .string += "<IS>";
					stream .string += "\n";

					generator .IncIndent ();

					for (const field of references)
					{
						const protoFields = field .getReferences ();

						protoFields .forEach (function (protoField)
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
						});
					}

					generator .DecIndent ();

					stream .string += generator .Indent ();
					stream .string += "</IS>\n";
				}

				for (const field of childNodes)
				{
					generator .PushContainerField (field);

					field .toXMLStream (stream);

					stream .string += "\n";

					generator .PopContainerField ();
				}

				if (cdata)
				{
					for (const value of cdata)
					{
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
			// TODO: remove imported node if any. (do this in ImportedNode)
			// TODO: remove exported node if any. (do this in ExportedNode)
			// TODO: remove routes from and to node if any. (do this in Route)

			const
				predefinedFields  = this .getPredefinedFields (),
				userDefinedFields = this .getUserDefinedFields ();

			predefinedFields .forEach (function (predefinedField)
			{
				predefinedField .dispose ();
			});

			userDefinedFields .forEach (function (userDefinedField)
			{
				userDefinedField .dispose ();
			});

			// Remove node from entire scene graph.

			const firstParents = new Set (this .getParents ());

			firstParents .forEach (function (firstParent)
			{
				if (firstParent instanceof Fields .SFNode)
				{
					const secondParents = new Set (firstParent .getParents ());

					secondParents .forEach (function (secondParent)
					{
						if (secondParent instanceof Fields .MFNode)
						{
							const length = secondParent .length;

							secondParent .erase (secondParent .remove (0, length, firstParent), length);
						}
					});

					firstParent .setValue (null);
				}
			});
		},
	});

	return X3DBaseNode;
});
