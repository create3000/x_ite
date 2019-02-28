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
	"x_ite/Configuration/ComponentInfoArray",
	"x_ite/Execution/ImportedNode",
	"x_ite/Prototype/ExternProtoDeclarationArray",
	"x_ite/Prototype/ProtoDeclarationArray",
	"x_ite/Routing/RouteArray",
	"x_ite/Routing/X3DRoute",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/X3DConstants",
	"standard/Networking/URI",
	"standard/Math/Algorithm",
	"x_ite/InputOutput/Generator",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DBaseNode,
          ComponentInfoArray,
          ImportedNode,
          ExternProtoDeclarationArray,
          ProtoDeclarationArray,
          RouteArray,
          X3DRoute,
          X3DCast,
          X3DConstants,
          URI,
          Algorithm,
          Generator)
{
"use strict";

	function X3DExecutionContext (executionContext)
	{
		X3DBaseNode .call (this, executionContext);

		this .addChildObjects ("rootNodes", new Fields .MFNode ());

		this .rootNodes_ .addClones (1);

		this .specificationVersion = "3.3";
		this .encoding             = "SCRIPTED";
		this .profile              = null;
		this .components           = new ComponentInfoArray (this .getBrowser ());
		this .url                  = new URI (window .location);
		this .uninitializedNodes   = [ ];
		this .uninitializedNodes2  = [ ];
		this .namedNodes           = new Map ();
		this .importedNodes        = new Map ();
		this .protos               = new ProtoDeclarationArray ();
		this .externprotos         = new ExternProtoDeclarationArray ();
		this .routes               = new RouteArray ();
		this .routeIndex           = new Map ();
	}

	X3DExecutionContext .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
	{
		constructor: X3DExecutionContext,
		setup: function ()
		{
			X3DBaseNode .prototype .setup .call (this);

			var X3DProtoDeclaration = require ("x_ite/Prototype/X3DProtoDeclaration");

			if (! (this instanceof X3DProtoDeclaration))
			{
				// Setup nodes.

				while (this .uninitializedNodes .length)
				{
					var uninitializedNodes = this .uninitializedNodes;
	
					this .uninitializedNodes  = this .uninitializedNodes2;
					this .uninitializedNodes2 = uninitializedNodes;
		
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
			return this .specificationVersion;
		},
		setEncoding: function (value)
		{
			this .encoding = value;
		},
		getEncoding: function ()
		{
			return this .encoding;
		},
		getWorldURL: function ()
		{
			return this .getURL () .location;
		},
		setURL: function (url)
		{
			this .url = url;
		},
		getURL: function ()
		{
			return this .url;
		},
		setProfile: function (profile)
		{
			this .profile = profile;
		},
		getProfile: function (profile)
		{
			return this .profile;
		},
		addComponent: function (component)
		{
			this .components .add (component .name, component);
		},
		getComponents: function ()
		{
			return this .components;
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
	
				var node = new Type (this);
	
				return node;
			}
			else
			{
				var Type = this .getBrowser () .getSupportedNode (typeName);
	
				if (! Type)
					throw new Error ("Unknown node type '" + typeName + "'.");
	
				var node = new Type (this);
	
				node .setup ();
	
				return new Fields .SFNode (node);
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
			this .uninitializedNodes .push (node);
		},
		addNamedNode: function (name, node)
		{
			if (this .namedNodes .has (name))
				throw new Error ("Couldn't add named node: node named '" + name + "' is already in use.");

			this .updateNamedNode (name, node);
		},
		updateNamedNode: function (name, node)
		{
			if (! (node instanceof Fields .SFNode || node instanceof X3DBaseNode))
				throw new Error ("Couldn't update named node: node must be of type SFNode.");

			name = String (name);
			node = new Fields .SFNode (node instanceof Fields .SFNode ? node .getValue () : node);

			if (! node .getValue ())
				throw new Error ("Couldn't update named node: node IS NULL.");

			if (node .getValue () .getExecutionContext () !== this)
				throw new Error ("Couldn't update named node: node does not belong to this execution context.");

			if (name .length === 0)
				throw new Error ("Couldn't update named node: node name is empty.");

			// Remove named node.

			this .removeNamedNode (node .getValue () .getName ());
			this .removeNamedNode (name);

			// Update named node.

			node .getValue () .setName (name);

			this .namedNodes .set (name, node);
		},
		removeNamedNode: function (name)
		{
			this .namedNodes .delete (name);
		},
		getNamedNode: function (name)
		{
			var node = this .namedNodes .get (name);

			if (! node)
				throw new Error ("Named node '" + name + "' not found.");

			return node;
		},
		getNamedNodes: function ()
		{
			return this .namedNodes;
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
				if (this .namedNodes .has (newName) || newName .length === 0)
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

			if (this .importedNodes .has (importedName))
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

			// Update existing imported node.

			for (var key of this .importedNodes .keys ())
			{
				var importedNode = this .importedNodes .get (key);
				
				if (importedNode .getInlineNode () === inlineNode && importedNode .getExportedName () === exportedName)
				{
					this .importedNodes .delete (key);
					
					this .importedNodes .set (importedName, importedNode);
					
					importedNode .setImportedName (importedName);
					return;
				}
			}

			// Add new imported node.

			this .removeImportedNode (importedName);

			var importedNode = new ImportedNode (this, inlineNode, exportedName, importedName);

			this .importedNodes .set (importedName, importedNode);

			importedNode .setup ();
		},
		removeImportedNode: function (importedName)
		{
			var importedNode = this .importedNodes .get (importedName);

			if (importedNode)
				importedNode .dispose ();

			this .importedNodes .delete (importedName);
		},
		getImportedNode: function (importedName)
		{
			var importedNode = this .importedNodes .get (importedName);

			if (importedNode)
				return importedNode .getExportedNode ();

			throw new Error ("Imported node '" + importedName + "' not found.");
		},
		getImportedNodes: function ()
		{
			return this .importedNodes;
		},
		getLocalNode: function (name)
		{
			try
			{
				return this .getNamedNode (name);
			}
			catch (error)
			{
				var importedNode = this .importedNodes .get (name);

				if (importedNode)
					return new Fields .SFNode (importedNode);

				throw new Error ("Unknown named or imported node '" + name + "'.");
			}
		},
		getLocalName: function (node)
		{
			if (! (node instanceof Fields .SFNode))
				throw new Error ("Couldn't get local name: node is NULL.");
				
			if (node .getValue () .getExecutionContext () === this)
				return node .getValue () .getName ();

			for (var importedNode of this .importedNodes .values ())
			{
				try
				{
					if (importedNode .getExportedNode () === node)
						return key;
				}
				catch (error)
				{ }
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
			return this .protos .get (name);
		},
		getProtoDeclarations: function ()
		{
			return this .protos;
		},
		getExternProtoDeclaration: function (name)
		{
			return this .externprotos .get (name);
		},
		getExternProtoDeclarations: function ()
		{
			return this .externprotos;
		},
		addRoute: function (sourceNode, sourceField, destinationNode, destinationField)
		{
			sourceField      = String (sourceField);
			destinationField = String (destinationField);

			if (! (sourceNode instanceof Fields .SFNode))
				throw new Error ("Bad ROUTE specification: source node must be of type SFNode.");

			if (! (destinationNode instanceof Fields .SFNode))
				throw new Error ("Bad ROUTE specification: destination node must be of type SFNode.");

			sourceNode      = sourceNode      .getValue ();
			destinationNode = destinationNode .getValue ();

			if (! sourceNode)
				throw new Error ("Bad ROUTE specification: source node is NULL.");

			if (! destinationNode)
				throw new Error ("Bad ROUTE specification: destination node is NULL.");

			// Imported nodes handling.

			var
				importedSourceNode      = sourceNode      instanceof ImportedNode ? sourceNode      : null,
				importedDestinationNode = destinationNode instanceof ImportedNode ? destinationNode : null;

			try
			{
				// If sourceNode is shared node try to find the corresponding ImportedNode.
				if (sourceNode .getExecutionContext () !== this)
					importedSourceNode = this .getLocalNode (this .getLocalName (sourceNode));
			}
			catch (error)
			{
				// Source node is shared but not imported.
			}

			try
			{
				// If destinationNode is shared node try to find the corresponding ImportedNode.
				if (destinationNode .getExecutionContext () !== this)
					importedDestinationNode = this .getLocalNode (this .getLocalName (destinationNode));
			}
			catch (error)
			{
				// Destination node is shared but not imported.
			}

			if (importedSourceNode instanceof ImportedNode)
				importedSourceNode .addRoute (importedSourceNode, sourceField, destinationNode, destinationField);

			if (importedDestinationNode instanceof ImportedNode)
				importedDestinationNode .addRoute (sourceNode, sourceField, importedDestinationNode, destinationField);

			// If either sourceNode or destinationNode is an ImportedNode return here without value.
			if (importedSourceNode === sourceNode || importedDestinationNode === destinationNode)
				return;

			// Create route and return.

			return this .addSimpleRoute (sourceNode, sourceField, destinationNode, destinationField);
		},
		addSimpleRoute: function (sourceNode, sourceField, destinationNode, destinationField)
		{
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
					route = this .routeIndex .get (id);

				if (route)
					return route;

				var route = new X3DRoute (this, sourceNode, sourceField, destinationNode, destinationField);

				this .routes .getValue () .push (route);
				this .routeIndex .set (id, route);

				return route;
			}
			catch (error)
			{
				throw new Error ("Bad ROUTE specification: " + error .message); 
			}
		},
		deleteRoute: function (route)
		{
			try
			{
				// sourceNode, sourceField, destinationNode, destinationField
				if (arguments .length === 4)
				{
					route = this .getRoute .apply (this, arguments);

					if (! route)
						return;
				}

				var
					sourceField      = route ._sourceField,
					destinationField = route ._destinationField,
					id               = sourceField .getId () + "." + destinationField .getId (),
					index            = this .routes .getValue () .indexOf (route);

				route .disconnect ();

				if (index !== -1)
					this .routes .getValue () .splice (index, 1);

				this .routeIndex .delete (id);
			}
			catch (error)
			{
				console .log (error);
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

			return this .routeIndex .get (id);
		},
		getRoutes: function ()
		{
			return this .routes;
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

				if (viewpoint .isBound_ .getValue ())
					viewpoint .transitionStart (viewpoint);

				else
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

			for (var importedNode of importedNodes .values ())
			{
				try
				{
					importedNode .toXMLStream (stream);

					stream .string += "\n";
				}
				catch (error)
				{ }
			}
		
			// Output routes

			this .getRoutes () .toXMLStream (stream);

			generator .LeaveScope ();
			generator .PopExecutionContext ();
		},
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

	return X3DExecutionContext;
});
