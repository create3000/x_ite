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
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Basic/X3DBaseNode",
	"x_ite/Execution/ImportedNode",
	"x_ite/Prototype/ExternProtoDeclarationArray",
	"x_ite/Prototype/ProtoDeclarationArray",
	"x_ite/Routing/RouteArray",
	"x_ite/Routing/X3DRoute",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/X3DConstants",
	"x_ite/InputOutput/Generator",
	"x_ite/Fields/SFNodeCache",
	"standard/Math/Algorithm",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DBaseNode,
          ImportedNode,
          ExternProtoDeclarationArray,
          ProtoDeclarationArray,
          RouteArray,
          X3DRoute,
          X3DCast,
          X3DConstants,
          Generator,
          SFNodeCache,
          Algorithm)
{
"use strict";

	function X3DExecutionContext (executionContext)
	{
		X3DBaseNode .call (this, executionContext);

		this .addChildObjects ("rootNodes", new Fields .MFNode ());

		this .rootNodes_ .addCloneCount (1);

		this ._uninitializedNodes   = [ ];
		this ._uninitializedNodes2  = [ ];
		this ._namedNodes           = new Map ();
		this ._importedNodes        = new Map ();
		this ._protos               = new ProtoDeclarationArray ();
		this ._externprotos         = new ExternProtoDeclarationArray ();
		this ._routes               = new RouteArray ();
		this ._routeIndex           = new Map ();
		this ._worldInfoNodes       = [ ];
	}

	X3DExecutionContext .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
	{
		constructor: X3DExecutionContext,
		setup: function ()
		{
			X3DBaseNode .prototype .setup .call (this);

			var X3DProtoDeclaration = require ("x_ite/Prototype/X3DProtoDeclaration");

			if (this .constructor !== X3DProtoDeclaration)
			{
				// Setup nodes.

				while (this ._uninitializedNodes .length)
				{
					var uninitializedNodes = this ._uninitializedNodes;

					this ._uninitializedNodes  = this ._uninitializedNodes2;
					this ._uninitializedNodes2 = uninitializedNodes;

					for (var i = 0, length = uninitializedNodes .length; i < length; ++ i)
						uninitializedNodes [i] .setup ();

					uninitializedNodes .length = 0;
				}
			}
		},
		isMasterContext: function ()
		{
			return false;
		},
		isRootContext: function ()
		{
			return false;
		},
		getSpecificationVersion: function ()
		{
			return this .getExecutionContext () .getSpecificationVersion ();
		},
		getEncoding: function ()
		{
			return this .getExecutionContext () .getEncoding ();
		},
		getWorldURL: function ()
		{
			return this .getURL () .location;
		},
		getURL: function ()
		{
			return this .getExecutionContext () .getURL ();
		},
		getProfile: function ()
		{
			return this .getExecutionContext () .getProfile ();
		},
		getComponents: function ()
		{
			return this .getExecutionContext () .getComponents ();
		},
		fromUnit: function (category, value)
		{
			return this .getExecutionContext () .fromUnit (category, value);
		},
		toUnit: function (category, value)
		{
			return this .getExecutionContext () .toUnit (category, value);
		},
		getUnits: function ()
		{
			return this .getExecutionContext () .getUnits ();
		},
		createNode: function (typeName, setup)
		{
			if (setup === false)
			{
				var Type = this .getBrowser () .getSupportedNode (typeName);

				if (! Type)
					return null;

				var baseNode = new Type (this);

				return baseNode;
			}
			else
			{
				var Type = this .getBrowser () .getSupportedNode (typeName);

				if (! Type)
					throw new Error ("Unknown node type '" + typeName + "'.");

				var baseNode = new Type (this);

				baseNode .setup ();

				return SFNodeCache .add (baseNode);
			}
		},
		createProto: function (name, setup)
		{
			var executionContext = this;

			for (;;)
			{
				var proto = executionContext .protos .get (name);

				if (proto)
					return proto .createInstance (this, setup);

				var externproto = executionContext .externprotos .get (name);

				if (externproto)
					return externproto .createInstance (this, setup);

				if (executionContext .isRootContext ())
					break;

				executionContext = executionContext .getExecutionContext ();
			}

			if (setup === false)
				return null;
			else
				throw new Error ("Unknown proto or externproto type '" + name + "'.");
		},
		addUninitializedNode: function (node)
		{
			this ._uninitializedNodes .push (node);
		},
		addNamedNode: function (name, node)
		{
			if (this ._namedNodes .has (name))
				throw new Error ("Couldn't add named node: node named '" + name + "' is already in use.");

			this .updateNamedNode (name, node);
		},
		updateNamedNode: function (name, node)
		{
			if (! (node instanceof Fields .SFNode || node instanceof X3DBaseNode))
				throw new Error ("Couldn't update named node: node must be of type SFNode.");

			name = String (name);

			var baseNode = node instanceof Fields .SFNode ? node .getValue () : node;

			if (! baseNode)
				throw new Error ("Couldn't update named node: node IS NULL.");

			if (baseNode .getExecutionContext () !== this)
				throw new Error ("Couldn't update named node: node does not belong to this execution context.");

			if (name .length === 0)
				throw new Error ("Couldn't update named node: node name is empty.");

			// Remove named node.

			this .removeNamedNode (baseNode .getName ());
			this .removeNamedNode (name);

			// Update named node.

			baseNode .setName (name);

			this ._namedNodes .set (name, baseNode);
		},
		removeNamedNode: function (name)
		{
			this ._namedNodes .delete (name);
		},
		getNamedNode: function (name)
		{
			var baseNode = this ._namedNodes .get (name);

			if (baseNode)
				return SFNodeCache .get (baseNode);

			throw new Error ("Named node '" + name + "' not found.");
		},
		getNamedNodes: function ()
		{
			return this ._namedNodes;
		},
		getUniqueName: function (name)
		{
			var _TrailingNumbers = /(_\d+$)/;

			name = name .replace (_TrailingNumbers, "");

			var
				newName = name,
				i       = 64;

			for (; i;)
			{
				if (this ._namedNodes .has (newName) || newName .length === 0)
				{
					var
						min = i,
						max = i <<= 1;

					newName  = name;
					newName += '_';
					newName += Math .round (Algorithm .random (min, max));
				}
				else
					break;
			}

			return newName;
		},
		addImportedNode: function (inlineNode, exportedName, importedName)
		{
			if (importedName === undefined)
				importedName = exportedName;

			if (this ._importedNodes .has (importedName))
				throw new Error ("Couldn't add imported node: imported name '" + importedName + "' already in use.");

			this .updateImportedNode (inlineNode, exportedName, importedName);
		},
		updateImportedNode: function (inlineNode, exportedName, importedName)
		{
			inlineNode   = X3DCast (X3DConstants .Inline, inlineNode);
			exportedName = String (exportedName);
			importedName = importedName === undefined ? exportedName : String (importedName);

			if (! inlineNode)
				throw new Error ("Node named is not an Inline node.");

			if (inlineNode .getExecutionContext () !== this)
				throw new Error ("Couldn't update imported node: Inline node does not belong to this execution context.");

			if (exportedName .length === 0)
				throw new Error ("Couldn't update imported node: exported name is empty.");

			if (importedName .length === 0)
				throw new Error ("Couldn't update imported node: imported name is empty.");

			// Update imported node.

			this .removeImportedNode (importedName);

			var importedNode = new ImportedNode (this, inlineNode, exportedName, importedName);

			this ._importedNodes .set (importedName, importedNode);

			importedNode .setup ();
		},
		removeImportedNode: function (importedName)
		{
			var importedNode = this ._importedNodes .get (importedName);

			if (! importedNode)
				return;

			importedNode .dispose ();

			this ._importedNodes .delete (importedName);
		},
		getImportedNode: function (importedName)
		{
			var importedNode = this ._importedNodes .get (importedName);

			if (importedNode)
				return importedNode .getExportedNode () .valueOf ();

			throw new Error ("Imported node '" + importedName + "' not found.");
		},
		getImportedNodes: function ()
		{
			return this ._importedNodes;
		},
		getLocalNode: function (name)
		{
			try
			{
				return this .getNamedNode (name);
			}
			catch (error)
			{
				var importedNode = this ._importedNodes .get (name);

				if (importedNode)
					return SFNodeCache .get (importedNode);

				throw new Error ("Unknown named or imported node '" + name + "'.");
			}
		},
		getLocalName: function (node)
		{
			if (! (node instanceof Fields .SFNode))
				throw new Error ("Couldn't get local name: node is NULL.");

			if (node .getValue () .getExecutionContext () === this)
				return node .getValue () .getName ();

			for (var importedNode of this ._importedNodes .values ())
			{
				try
				{
					if (importedNode .getExportedNode () .getValue () === node .getValue ())
						return importedNode .getImportedName ();
				}
				catch (error)
				{
					//console .log (error);
				}
			}

			throw new Error ("Couldn't get local name: node is shared.");
		},
		setRootNodes: function () { },
		getRootNodes: function ()
		{
			return this .rootNodes_;
		},
		getProtoDeclaration: function (name)
		{
			var proto = this ._protos .get (name);

			if (proto)
				return proto;

			throw new Error ("Proto declaration '" + name + "' not found.");
		},
		getProtoDeclarations: function ()
		{
			return this ._protos;
		},
		getExternProtoDeclaration: function (name)
		{
			var externproto = this ._externprotos .get (name);

			if (externproto)
				return externproto;

			throw new Error ("Extern proto declaration '" + name + "' not found.");
		},
		getExternProtoDeclarations: function ()
		{
			return this ._externprotos;
		},
		addRoute: function (sourceNode, sourceField, destinationNode, destinationField)
		{
			sourceField      = String (sourceField);
			destinationField = String (destinationField);

			if (! (sourceNode instanceof Fields .SFNode))
				throw new Error ("Bad ROUTE specification: source node must be of type SFNode.");

			if (! (destinationNode instanceof Fields .SFNode))
				throw new Error ("Bad ROUTE specification: destination node must be of type SFNode.");

			if (! sourceNode .getValue ())
				throw new Error ("Bad ROUTE specification: source node is NULL.");

			if (! destinationNode .getValue ())
				throw new Error ("Bad ROUTE specification: destination node is NULL.");

			var
				sourceNodeValue      = sourceNode      .getValue (),
				destinationNodeValue = destinationNode .getValue ();

			if (! sourceNodeValue)
				throw new Error ("Bad ROUTE specification: source node is NULL.");

			if (! destinationNodeValue)
				throw new Error ("Bad ROUTE specification: destination node is NULL.");

			// Imported nodes handling.

			var
				importedSourceNode      = sourceNodeValue      instanceof ImportedNode ? sourceNodeValue      : null,
				importedDestinationNode = destinationNodeValue instanceof ImportedNode ? destinationNodeValue : null;

			try
			{
				// If sourceNode is shared node try to find the corresponding ImportedNode.
				if (sourceNodeValue .getExecutionContext () !== this)
					importedSourceNode = this .getLocalNode (this .getLocalName (sourceNode)) .getValue ();
			}
			catch (error)
			{
				// Source node is shared but not imported.
			}

			try
			{
				// If destinationNode is shared node try to find the corresponding ImportedNode.
				if (destinationNodeValue .getExecutionContext () !== this)
					importedDestinationNode = this .getLocalNode (this .getLocalName (destinationNode)) .getValue ();
			}
			catch (error)
			{
				// Destination node is shared but not imported.
			}

			if (importedSourceNode instanceof ImportedNode && importedDestinationNode instanceof ImportedNode)
			{
				importedSourceNode      .addRoute (importedSourceNode, sourceField, importedDestinationNode, destinationField);
				importedDestinationNode .addRoute (importedSourceNode, sourceField, importedDestinationNode, destinationField);
			}
			else if (importedSourceNode instanceof ImportedNode)
			{
				importedSourceNode .addRoute (importedSourceNode, sourceField, destinationNodeValue, destinationField);
			}
			else if (importedDestinationNode instanceof ImportedNode)
			{
				importedDestinationNode .addRoute (sourceNodeValue, sourceField, importedDestinationNode, destinationField);
			}

			// If either sourceNode or destinationNode is an ImportedNode return here without value.
			if (importedSourceNode === sourceNodeValue || importedDestinationNode === destinationNodeValue)
				return;

			// Create route and return.

			return this .addSimpleRoute (sourceNodeValue, sourceField, destinationNodeValue, destinationField);
		},
		addSimpleRoute: function (sourceNode, sourceField, destinationNode, destinationField)
		{
			// Source and dest node are here X3DBaseNode.

			try
			{
				// Private function.
				// Create route and return.

				sourceField      = sourceNode      .getField (sourceField),
				destinationField = destinationNode .getField (destinationField);

				if (! sourceField .isOutput ())
					throw new Error ("Field named '" + sourceField .getName () + "' in node named '" + sourceNode .getName () + "' of type " + sourceNode .getTypeName () + " is not an output field.");

				if (! destinationField .isInput ())
					throw new Error ("Field named '" + destinationField .getName () + "' in node named '" + destinationNode .getName () + "' of type " + destinationNode .getTypeName () + " is not an input field.");

				if (sourceField .getType () !== destinationField .getType ())
					throw new Error ("ROUTE types " + sourceField .getTypeName () + " and " + destinationField .getTypeName () + " do not match.");

				var
					id    = sourceField .getId () + "." + destinationField .getId (),
					route = this ._routeIndex .get (id);

				if (route)
					return route;

				var route = new X3DRoute (this, sourceNode, sourceField, destinationNode, destinationField);

				this ._routes .getValue () .push (route);
				this ._routeIndex .set (id, route);

				return route;
			}
			catch (error)
			{
				throw new Error ("Bad ROUTE specification: " + error .message);
			}
		},
		deleteRoute: function (route)
		{
			// sourceNode, sourceField, destinationNode, destinationField
			if (arguments .length === 4)
			{
				route = this .getRoute .apply (this, arguments);

				if (! route)
					return false;
			}

			if (this .deleteSimpleRoute (route))
				this .deleteImportedRoute (route .getSourceNode (), route .getDestinationNode (), route);
		},
		deleteSimpleRoute: function (route)
		{
			try
			{
				var
					sourceField      = route ._sourceField,
					destinationField = route ._destinationField,
					id               = sourceField .getId () + "." + destinationField .getId (),
					index            = this ._routes .getValue () .indexOf (route);

				route .disconnect ();

				if (index !== -1)
					this ._routes .getValue () .splice (index, 1);

				this ._routeIndex .delete (id);

				return true;
			}
			catch (error)
			{
				console .log (error);
				return false;
			}
		},
		deleteImportedRoute (sourceNode, destinationNode, route)
		{
			// Imported nodes handling.

			var
				importedSourceNode      = null,
				importedDestinationNode = null;

			try
			{
				// If sourceNode is shared node try to find the corresponding ImportedNode.
				if (sourceNode .getValue () .getExecutionContext () !== this)
					importedSourceNode = this .getLocalNode (this .getLocalName (sourceNode)) .getValue ();
			}
			catch (error)
			{
				// Source node is shared but not imported.
			}

			try
			{
				// If destinationNode is shared node try to find the corresponding ImportedNode.
				if (destinationNode .getValue () .getExecutionContext () !== this)
					importedDestinationNode = this .getLocalNode (this .getLocalName (destinationNode)) .getValue ();
			}
			catch (error)
			{
				// Destination node is shared but not imported.
			}

			if (importedSourceNode instanceof ImportedNode && importedDestinationNode instanceof ImportedNode)
			{
				importedSourceNode      .deleteRoute (route);
				importedDestinationNode .deleteRoute (route);
			}
			else if (importedSourceNode instanceof ImportedNode)
			{
				importedSourceNode .deleteRoute (route);
			}
			else if (importedDestinationNode instanceof ImportedNode)
			{
				importedDestinationNode .deleteRoute (route);
			}
		},
		getRoute: function (sourceNode, sourceField, destinationNode, destinationField)
		{
			if (! sourceNode .getValue ())
				throw new Error ("Bad ROUTE specification: sourceNode is NULL.");

			if (! destinationNode .getValue ())
				throw new Error ("Bad ROUTE specification: destinationNode is NULL.");

			var
				sourceField      = sourceNode .getValue () .getField (sourceField),
				destinationField = destinationNode .getValue () .getField (destinationField),
				id               = sourceField .getId () + "." + destinationField .getId ();

			return this ._routeIndex .get (id);
		},
		getRoutes: function ()
		{
			return this ._routes;
		},
		getWorldInfo: function ()
		{
			const length = this ._worldInfoNodes .length;

			if (length)
				return this ._worldInfoNodes [length - 1];

			return null;
		},
		addWorldInfo: function (worldInfoNode)
		{
			this ._worldInfoNodes .push (worldInfoNode);
		},
		removeWorldInfo: function (worldInfoNode)
		{
			this ._worldInfoNodes = this ._worldInfoNodes .filter (function (node) { return node !== worldInfoNode; });
		},
		changeViewpoint: function (name)
		{
			try
			{
				var
					namedNode = this .getNamedNode (name),
					viewpoint = X3DCast (X3DConstants .X3DViewpointNode, namedNode);

				if (! viewpoint)
					throw 1;

				viewpoint .setAnimate (true); // VRML

				viewpoint .set_bind_ = true;
			}
			catch (error)
			{
				if (! this .isRootContext ())
					this .getExecutionContext () .changeViewpoint (name);
				else
					throw new Error ("Viewpoint named '" + name + "' not found.");
			}
		},
		toVRMLStream: function (stream)
		{
			var generator = Generator .Get (stream);

			generator .PushExecutionContext (this);
			generator .EnterScope ();
			generator .ImportedNodes (this .getImportedNodes ());

			// Output extern protos

			this .getExternProtoDeclarations () .toVRMLStream (stream);

			// Output protos

			this .getProtoDeclarations () .toVRMLStream (stream);

			// Output root nodes

			var rootNodes = this .getRootNodes ();

			for (var i = 0, length = rootNodes .length; i < length; ++ i)
			{
				var rootNode = rootNodes [i];

				stream .string += generator .Indent ();

				if (rootNode)
					rootNode .toVRMLStream (stream);
				else
					stream .string += "NULL";

				stream .string += "\n";

				if (i !== length - 1)
					stream .string += "\n";
			}

			// Output imported nodes

			var importedNodes = this .getImportedNodes ();

			if (importedNodes .size)
			{
				stream .string += "\n";

				importedNodes .forEach (function (importedNode)
				{
					try
					{
						importedNode .toVRMLStream (stream);

						stream .string += "\n";
					}
					catch (error)
					{ }
				});
			}

			// Output routes

			var routes = this .getRoutes ();

			if (routes .length)
			{
				stream .string += "\n";

				routes .toVRMLStream (stream);
			}

			generator .LeaveScope ();
			generator .PopExecutionContext ();
		},
		toXMLStream: function (stream)
		{
			var generator = Generator .Get (stream);

			generator .PushExecutionContext (this);
			generator .EnterScope ();
			generator .ImportedNodes (this .getImportedNodes ());

			// Output extern protos

			this .getExternProtoDeclarations () .toXMLStream (stream);

			// Output protos

			this .getProtoDeclarations () .toXMLStream (stream);

			// Output root nodes

			var rootNodes = this .getRootNodes ();

			if (rootNodes .length)
			{
				rootNodes .toXMLStream (stream);

				stream .string += "\n";
			}

			// Output imported nodes

			var importedNodes = this .getImportedNodes ();

			importedNodes .forEach (function (importedNode)
			{
				try
				{
					importedNode .toXMLStream (stream);

					stream .string += "\n";
				}
				catch (error)
				{ }
			});

			// Output routes

			this .getRoutes () .toXMLStream (stream);

			generator .LeaveScope ();
			generator .PopExecutionContext ();
		},
	});

	Object .defineProperty (X3DExecutionContext .prototype, "specificationVersion",
	{
		get: function () { return this .getSpecificationVersion (); },
		enumerable: true,
		configurable: false
	});

	Object .defineProperty (X3DExecutionContext .prototype, "encoding",
	{
		get: function () { return this .getEncoding (); },
		enumerable: true,
		configurable: false
	});

	Object .defineProperty (X3DExecutionContext .prototype, "profile",
	{
		get: function () { return this .getProfile (); },
		enumerable: true,
		configurable: false
	});

	Object .defineProperty (X3DExecutionContext .prototype, "components",
	{
		get: function () { return this .getComponents (); },
		enumerable: true,
		configurable: false
	});

	Object .defineProperty (X3DExecutionContext .prototype, "worldURL",
	{
		get: function () { return this .getWorldURL (); },
		enumerable: true,
		configurable: false
	});

	Object .defineProperty (X3DExecutionContext .prototype, "units",
	{
		get: function () { return this .getUnits (); },
		enumerable: true,
		configurable: false
	});

	Object .defineProperty (X3DExecutionContext .prototype, "rootNodes",
	{
		get: function () { return this .getRootNodes (); },
		set: function (value) { this .setRootNodes (value); },
		enumerable: true,
		configurable: false
	});

	Object .defineProperty (X3DExecutionContext .prototype, "protos",
	{
		get: function () { return this .getProtoDeclarations (); },
		enumerable: true,
		configurable: false
	});

	Object .defineProperty (X3DExecutionContext .prototype, "externprotos",
	{
		get: function () { return this .getExternProtoDeclarations (); },
		enumerable: true,
		configurable: false
	});

	Object .defineProperty (X3DExecutionContext .prototype, "routes",
	{
		get: function () { return this .getRoutes (); },
		enumerable: true,
		configurable: false
	});

	return X3DExecutionContext;
});
