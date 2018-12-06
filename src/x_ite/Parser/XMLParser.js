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
	"x_ite/Basic/X3DField",
	"x_ite/Basic/X3DBaseNode",
	"x_ite/Components/Core/X3DPrototypeInstance",
	"x_ite/Fields",
	"x_ite/Parser/Parser",
	"x_ite/Parser/X3DParser",
	"x_ite/Parser/HTMLSupport",
	"x_ite/Prototype/X3DExternProtoDeclaration",
	"x_ite/Prototype/X3DProtoDeclaration",
	"x_ite/Bits/X3DConstants",
],
function ($,
          X3DField,
          X3DBaseNode,
          X3DPrototypeInstance,
          Fields,
          Parser,
          X3DParser,
          HTMLSupport,   
          X3DExternProtoDeclaration,
          X3DProtoDeclaration,
          X3DConstants)
{
"use strict";

	var AccessType =
	{
		initializeOnly: X3DConstants .initializeOnly,
		inputOnly:      X3DConstants .inputOnly,
		outputOnly:     X3DConstants .outputOnly,
		inputOutput:    X3DConstants .inputOutput,
	};

	function XMLParser (scene)
	{
		X3DParser .call (this, scene);

		this .protoDeclarations = [ ];
		this .parents           = [ ];
		this .parser            = new Parser (scene);
		this .url               = new Fields .MFString ();

		try
		{
			this .setUnits (this .getScene () .getMetaData ("generator"));
			this .parser .setUnits (this .getUnits ());
		}
		catch (error)
		{ }
	}

	XMLParser .prototype = Object .assign (Object .create (X3DParser .prototype),
	{
		constructor: XMLParser,
		parseIntoScene: function (xmlElement)
		{
			this .getScene () .setEncoding ("XML");
			this .getScene () .setProfile (this .getBrowser () .getProfile ("Full"));

			this .xmlElement (xmlElement);
		},
		parseIntoNode: function (node, xmlElement)
		{
			this .pushExecutionContext (node .getExecutionContext ());
			this .pushParent (node);

			this .childElement (xmlElement);

			this .popParent ();
			this .popExecutionContext ();
		},
		xmlElement: function (xmlElement)
		{
			switch (xmlElement .nodeName)
			{
				case "#document":
				{
					var X3D = $(xmlElement) .children ("X3D");

					if (X3D .length)
					{
						for (var i = 0; i < X3D .length; ++ i)
							this .x3dElement (X3D [i]);
					}
					else
						this .childrenElements (xmlElement);

					break;
				}
				case "X3D":
					this .x3dElement (xmlElement);
					break;
				case "Scene":
				case "SCENE":
					this .sceneElement (xmlElement);
					break;
				default:
					this .childElement (xmlElement);
					break;
			}
		},
		x3dElement: function (xmlElement)
		{
			// Profile

			try
			{
				var
					profileNameId = xmlElement .getAttribute ("profile"),
					profile       = this .getBrowser () .getProfile (profileNameId || "Full");

				this .getScene () .setProfile (profile);
			}
			catch (error)
			{
				console .log (error);
			}

			// Specification version

			var specificationVersion = xmlElement .getAttribute ("version");

			if (specificationVersion)
				this .getScene () .specificationVersion = specificationVersion;

			// Process child nodes

			var childNodes = xmlElement .childNodes;

			for (var i = 0; i < childNodes .length; ++ i)
				this .x3dElementChild (childNodes [i])
		},
		x3dElementChild: function (xmlElement)
		{
			switch (xmlElement .nodeName)
			{
				case "head":
				case "HEAD":
					this .headElement (xmlElement);
					return;
				case "Scene":
				case "SCENE":
					this .sceneElement (xmlElement);
					return;
			}
		},
		headElement: function (xmlElement)
		{
			var childNodes = xmlElement .childNodes;
	
			for (var i = 0; i < childNodes .length; ++ i)
				this .headElementChild (childNodes [i]);

			try
			{
				this .setUnits (this .getScene () .getMetaData ("generator"));
				this .parser .setUnits (this .getUnits ());
			}
			catch (error)
			{ }
		},
		headElementChild: function (xmlElement)
		{
			switch (xmlElement .nodeName)
			{
				case "component":
				case "COMPONENT":
					this .componentElement (xmlElement);
					return;
				case "unit":
				case "UNIT":
					this .unitElement (xmlElement);
					return;
				case "meta":
				case "META":
					this .metaElement (xmlElement);
					return;
			}
		},
		componentElement: function (xmlElement)
		{
			try
			{
				var
					componentNameIdCharacters = xmlElement .getAttribute ("name"),
					componentSupportLevel = parseInt (xmlElement .getAttribute ("level"));
	
				if (componentNameIdCharacters === null)
					return console .warn ("XML Parser Error: Bad component statement: Expected name attribute.");
	
				if (componentSupportLevel === null)
					return console .warn ("XML Parser Error: Bad component statement: Expected level attribute.");

				var component = this .getBrowser () .getComponent (componentNameIdCharacters, componentSupportLevel);
	
				this .getScene () .addComponent (component);
			}
			catch (error)
			{
				console .log (error .message);
			}
		},
		unitElement: function (xmlElement)
		{
			var
				category         = xmlElement .getAttribute ("category"),
				name             = xmlElement .getAttribute ("name"),
				conversionFactor = xmlElement .getAttribute ("conversionFactor"); //works for html5 as well

			if (category === null)
				return console .warn ("XML Parser Error: Bad unit statement: Expected category attribute.");

			if (name === null)
				return console .warn ("XML Parser Error: Bad unit statement: Expected name attribute.");

			if (conversionFactor === null)
				return console .warn ("XML Parser Error: Bad unit statement: Expected conversionFactor attribute.");

			this .getScene () .updateUnit (category, name, parseFloat (conversionFactor));
		},
		metaElement: function (xmlElement)
		{
			var
				metakey   = xmlElement .getAttribute ("name"),
				metavalue = xmlElement .getAttribute ("content");

			if (metakey === null)
				return console .warn ("XML Parser Error: Bad meta statement: Expected name attribute.");	

			if (metavalue === null)
				return console .warn ("XML Parser Error: Bad meta statement: Expected content attribute.");

			this .getScene () .setMetaData (metakey, metavalue);
		},
		sceneElement: function (xmlElement)
		{
			this .childrenElements (xmlElement);
		},
		childrenElements: function (xmlElement)
		{
			var childNodes = xmlElement .childNodes;

			for (var i = 0; i < childNodes .length; ++ i)
				this .childElement (childNodes [i]);
		},
		childElement: function (xmlElement)
		{
			switch (xmlElement .nodeName)
			{
				case "#comment":
				case "#text":
					return;

				case "#cdata-section":
					this .cdataNode (xmlElement);
					return;
				
				case "ExternProtoDeclare":
				case "EXTERNPROTODECLARE":
					this .externProtoDeclareElement (xmlElement);
					return;

				case "ProtoDeclare":
				case "PROTODECLARE":
					this .protoDeclareElement (xmlElement);
					return;

				case "IS":
					this .isElement (xmlElement);
					return;

				case "ProtoInstance":
				case "PROTOINSTANCE":
					this .protoInstanceElement (xmlElement);
					return;

				case "fieldValue":
				case "FIELDVALUE":
					this .fieldValueElement (xmlElement);
					return;

				case "field":
				case "FIELD":
					this .fieldElement (xmlElement);
					return;

				case "ROUTE":
					this .routeElement (xmlElement);
					return;

				case "IMPORT":
					this .importElement (xmlElement);
					return;

				case "EXPORT":
					this .exportElement (xmlElement);
					return;

				default:
					this .nodeElement (xmlElement);
					return;
			}
		},
		externProtoDeclareElement: function (xmlElement)
		{
			var name = xmlElement .getAttribute ("name");

			if (this .id (name))
			{
				var url = xmlElement .getAttribute ("url");

				if (url === null)
					return console .warn ("XML Parser Error: Bad ExternProtoDeclare statement: Expected url attribute.");
				
				this .parser .setInput (url);
				Parser .prototype .sfstringValues .call (this .parser, this .url);

				var externproto = new X3DExternProtoDeclaration (this .getExecutionContext ());
							
				this .pushParent (externproto);
				this .protoInterfaceElement (xmlElement); // parse fields
				this .popParent ();

				externproto .setName (name);
				externproto .url_ = this .url;
				externproto .setup ();

				this .getExecutionContext () .externprotos .add (name, externproto);	
			}
		},
		protoDeclareElement: function (xmlElement)
		{
			var name = xmlElement .getAttribute ("name");

			if (this .id (name))
			{
				var
					proto      = new X3DProtoDeclaration (this .getExecutionContext ()),
					childNodes = xmlElement .childNodes;

				for (var i = 0; i < childNodes .length; ++ i)
				{
					var child = childNodes [i];

					switch (child .nodeName)
					{
						case "ProtoInterface":
						case "PROTOINTERFACE":
						{
							this .pushParent (proto);
							this .protoInterfaceElement (child);
							this .popParent ();
							break;
						}
						default:
							continue;
					}

					break;
				}

				for (var i = 0; i < childNodes .length; ++ i)
				{
					var child = childNodes [i];

					switch (child .nodeName)
					{
						case "ProtoBody":
						case "PROTOBODY":
						{
							this .pushExecutionContext (proto);
							this .pushParent (proto);
							this .protoBodyElement (child);
							this .popParent ();
							this .popExecutionContext ();
							break;
						}
						default:
							continue;
					}

					break;
				}

				proto .setName (name);
				proto .setup ();

				this .getExecutionContext () .protos .add (name, proto);
			}
		},
		protoInterfaceElement: function (xmlElement)
		{
			var childNodes = xmlElement .childNodes;

			for (var i = 0; i < childNodes .length; ++ i)
				this .protoInterfaceElementChild (childNodes [i]);
		},
		protoInterfaceElementChild: function (xmlElement)
		{
			switch (xmlElement .nodeName)
			{
				case "field": // User-defined field
				case "FIELD": // User-defined field
					this .fieldElement (xmlElement);
					return;
			}
		},
		fieldElement: function (xmlElement)
		{
			try
			{
				if (this .getParents () .length === 0)
					return;

				var node = this .getParent ();
	
				if (! (node instanceof X3DBaseNode))
					return;

				if (! node .hasUserDefinedFields ())
					return;
	
				var accessType = AccessType [xmlElement .getAttribute ("accessType")];
	
				if (accessType === undefined)
					accessType = X3DConstants .initializeOnly;
	
				var type = Fields [xmlElement .getAttribute ("type")];
	
				if (type === undefined)
					return;
	
				var name = xmlElement .getAttribute ("name");
	
				if (! this .id (name))
					return;
	
				var field = new type ();
	
				if (accessType & X3DConstants .initializeOnly)
				{
					this .fieldValue (field, xmlElement .getAttribute ("value"));
	
					this .pushParent (field);
					this .childrenElements (xmlElement);
					this .popParent ();
				}
	
				node .addUserDefinedField (accessType, name, field);
			}
			catch (error)
			{
				//console .log (error);
			}
		},
		protoBodyElement: function (xmlElement)
		{
			this .childrenElements (xmlElement);
		},
		isElement: function (xmlElement)
		{
			if (this .getExecutionContext () instanceof X3DProtoDeclaration)
			{
				var childNodes = xmlElement .childNodes;

				for (var i = 0; i < childNodes .length; ++ i)
					this .isElementChild (childNodes [i]);
			}
		},
		isElementChild: function (xmlElement)
		{
			switch (xmlElement .nodeName)
			{
				case "connect":
				case "CONNECT":
					this .connectElement (xmlElement);
					return;
			}
		},
		connectElement: function (xmlElement)
		{
			var
				nodeFieldName  = xmlElement .getAttribute ("nodeField"),
				protoFieldName = xmlElement .getAttribute ("protoField");

			if (nodeFieldName === null)
				return console .warn ("XML Parser Error: Bad connect statement: Expected nodeField attribute.");

			if (protoFieldName === null)
				return console .warn ("XML Parser Error: Bad connect statement: Expected protoField attribute.");

			try
			{
				if (this .getParents () .length === 0)
					return;

				var
					node  = this .getParent (),
					proto = this .getExecutionContext ();

				if (! (node instanceof X3DBaseNode))
					return;

				var
					nodeField  = node .getField (nodeFieldName),
					protoField = proto .getField (protoFieldName);

				if (nodeField .getType () === protoField .getType ())
				{
					if (protoField .isReference (nodeField .getAccessType ()))
						nodeField .addReference (protoField);
					else
						throw new Error ("Field '" + nodeField .getName () + "' and '" + protoField .getName () + "' in PROTO " + this .getExecutionContext () . getName () + " are incompatible as an IS mapping.");
				}
				else
					throw new Error ("Field '" + nodeField .getName () + "' and '" + protoField .getName () + "' in PROTO " + this .getExecutionContext () .getName () + " have different types.");
			}
			catch (error)
			{
				console .warn ("XML Parser Error: Couldn't create IS reference: " + error .message);
			}
		},
		protoInstanceElement: function (xmlElement)
		{
			try
			{
				if (this .useAttribute (xmlElement))
					return;

				var name = xmlElement .getAttribute ("name");

				if (this .id (name))
				{
					var node = this .getExecutionContext () .createProto (name, false);

					//AP: attach node to DOM xmlElement for access from DOM.
					xmlElement .x3d = node;

					this .defAttribute (xmlElement, node);
					this .addNode (xmlElement, node);
					this .pushParent (node);
					this .childrenElements (xmlElement);
					this .getExecutionContext () .addUninitializedNode (node);
					this .popParent ();
				}
			}
			catch (error)
			{
				console .warn ("XML Parser Error: ", error .message);
				//console .warn (error);
			}
		},
		fieldValueElement: function (xmlElement)
		{
			try
			{
				if (this .getParents () .length === 0)
					return;

				var
					node = this .getParent (),
					name = xmlElement .getAttribute ("name");

				if (! (node instanceof X3DPrototypeInstance))
					return;

				if (! this .id (name))
					return;

				var
					field      = node .getField (name),
					accessType = field .getAccessType ();

				if (accessType & X3DConstants .initializeOnly)
				{
					this .fieldValue (field, xmlElement .getAttribute ("value"));

					this .pushParent (field);
					this .childrenElements (xmlElement);
					this .popParent ();
				}
			}
			catch (error)
			{
				console .warn ("XML Parser Error: Couldn't assign field value: " + error .message);
			}
		},
		nodeElement: function (xmlElement)
		{
			try
			{
				if (this .useAttribute (xmlElement))
					return;

				var node = this .getExecutionContext () .createNode (xmlElement .nodeName, false);

				//AP: attach node to DOM xmlElement for access from DOM.
				xmlElement .x3d = node;

				this .defAttribute (xmlElement, node);
				this .addNode (xmlElement, node);
				this .pushParent (node);
				this .nodeAttributes (xmlElement, node);
				this .childrenElements (xmlElement);
				this .getExecutionContext () .addUninitializedNode (node);
				this .popParent ();
			}
			catch (error)
			{
				//console .error (error);

				console .error ("XML Parser Error: " + error .message);
			}
		},
		routeElement: function (xmlElement)
		{
			try
			{
				var
					sourceNodeName      = xmlElement .getAttribute ("fromNode"),
					sourceField         = xmlElement .getAttribute ("fromField"),
					destinationNodeName = xmlElement .getAttribute ("toNode"),
					destinationField    = xmlElement .getAttribute ("toField");

				if (sourceNodeName === null)
					throw new Error ("Bad ROUTE statement: Expected fromNode attribute.");

				if (sourceField === null)
					throw new Error ("Bad ROUTE statement: Expected fromField attribute.");

				if (destinationNodeName === null)
					throw new Error ("Bad ROUTE statement: Expected toNode attribute.");

				if (destinationField === null)
					throw new Error ("Bad ROUTE statement: Expected toField attribute.");

				var
					executionContext = this .getExecutionContext (),
					sourceNode       = executionContext .getLocalNode (sourceNodeName),
					destinationNode  = executionContext .getLocalNode (destinationNodeName),
					route            = executionContext .addRoute (sourceNode, sourceField, destinationNode, destinationField);

				xmlElement .x3d = route;
			}
			catch (error)
			{
				console .warn ("XML Parser Error: " + error .message);
			}
		},
		importElement: function (xmlElement)
		{
			try
			{
				var
					inlineNodeName   = xmlElement .getAttribute ("inlineDEF"),
					exportedNodeName = xmlElement .getAttribute ("importedDEF") || xmlElement .getAttribute ("exportedDEF"),
					localNodeName    = xmlElement .getAttribute ("AS");

				if (inlineNodeName === null)
					throw new Error ("Bad IMPORT statement: Expected inlineDEF attribute.");

				if (exportedNodeName === null)
					throw new Error ("Bad IMPORT statement: Expected importedDEF attribute.");

				if (! localNodeName)
					localNodeName = exportedNodeName;

				var inlineNode = this .getExecutionContext () .getNamedNode (inlineNodeName);

				this .getExecutionContext () .updateImportedNode (inlineNode, exportedNodeName, localNodeName);
			}
			catch (error)
			{
				console .warn ("XML Parser Error: " + error .message);
			}
		},
		exportElement: function (xmlElement)
		{
			try
			{
				if (this .getScene () !== this .getExecutionContext ())
					return;

				var
					localNodeName    = xmlElement .getAttribute ("localDEF"),
					exportedNodeName = xmlElement .getAttribute ("AS");

				if (localNodeName === null)
					throw new Error ("Bad EXPORT statement: Expected localDEF attribute.");

				if (! exportedNodeName)
					exportedNodeName = localNodeName;

				var localNode = this .getExecutionContext () .getLocalNode (localNodeName);

				this .getScene () .updateExportedNode (exportedNodeName, localNode);
			}
			catch (error)
			{
				console .warn ("XML Parser Error: " + error .message);
			}
		},
		cdataNode: function (xmlElement)
		{
			if (this .getParents () .length === 0)
				return;

			var node = this .getParent ();

			if (node instanceof X3DBaseNode)
			{
				var field = node .getSourceText ();

				if (field)
				{
					field .push (xmlElement .data);
					field .setSet (true);
				}
			}
		},
		useAttribute: function (xmlElement)
		{
			try
			{
				var name = xmlElement .getAttribute ("USE");

				if (this .id (name))
				{
					var node = this .getExecutionContext () .getNamedNode (name);

					this .addNode (xmlElement, node .getValue ());
					return true;
				}
			}
			catch (error)
			{
				console .warn ("Invalid USE name: " + error .message);
			}

			return false;
		},
		defAttribute: function (xmlElement, node)
		{
			try
			{
				var name = xmlElement .getAttribute ("DEF");

				if (name)
				{
					try
					{
						var namedNode = this .getExecutionContext () .getNamedNode (name);

						this .getExecutionContext () .updateNamedNode (this .getExecutionContext () .getUniqueName (name), namedNode);
					}
					catch (error)
					{ }

					this .getExecutionContext () .updateNamedNode (name, node);
				}
			}
			catch (error)
			{
				console .warn ("Invalid DEF name: " + error .message);
			}
		},
		nodeAttributes: function (xmlElement, node)
		{
			var xmlAttributes = xmlElement .attributes;

			for (var i = 0; i < xmlAttributes .length; ++ i)
				this .nodeAttribute (xmlAttributes [i], node);
		},
		nodeAttribute: function (xmlAttribute, node)
		{
			try
			{
				var
					field      = node .getField (this .attributeToCamelCase (xmlAttribute .name)),
					accessType = field .getAccessType ();

				if (accessType & X3DConstants .initializeOnly)
					this .fieldValue (field, xmlAttribute .value);
			}
			catch (error)
			{
				//console .warn (error .message);
			}
		},
		fieldValue: function (field, value)
		{
			if (value === null)
				return;

			field .setSet (true);

			this .parser .pushExecutionContext (this .getExecutionContext ());

			this .parser .setInput (value);
			this .fieldTypes [field .getType ()] .call (this .parser, field);

			this .parser .popExecutionContext ();
		},
		addNode: function (xmlElement, node)
		{
			if (this .parents .length === 0 || this .getParent () instanceof X3DProtoDeclaration)
			{
				this .getExecutionContext () .rootNodes .push (node);
				return;
			}

			var parent = this .getParent ();

			if (parent instanceof X3DField)
			{
				switch (parent .getType ())
				{
					case X3DConstants .SFNode:
						parent .setValue (node);
						parent .setSet (true);
						return;

					case X3DConstants .MFNode:
						parent .push (node);
						parent .setSet (true);
						return;
				}
					
				return;
			}
				
			// parent is a node.

			try
			{
				var containerField = xmlElement .getAttribute ("containerField");
				
				if (! containerField)
					containerField = node .getContainerField ();
				
				var field = parent .getField (containerField);

				switch (field .getType ())
				{
					case X3DConstants .SFNode:
						field .setValue (node);
						field .setSet (true);
						return;

					case X3DConstants .MFNode:
						field .push (node);
						field .setSet (true);
						return;
				}
			}
			catch (error)
			{
				//console .warn (error .message);
			}
		},
		getParents: function ()
		{
			return this .parents;
		},
		getParent: function ()
		{
			return this .parents [this .parents .length - 1];
		},
		pushParent: function (parent)
		{
			return this .parents .push (parent);
		},
		popParent: function ()
		{
			this .parents .pop ();
		},
		id: function (string)
		{
			if (string === null)
				return false;

			if (string .length === 0)
				return false;

			return true;
		},
		attributeToCamelCase: function (name)
		{
			if (name !== name .toLowerCase())
				return name ;
			
			return HTMLSupport .attributeLowerCaseToCamelCase [name] ;
		},
	});

	XMLParser .prototype .fieldTypes = [ ];
	XMLParser .prototype .fieldTypes [X3DConstants .SFBool]      = Parser .prototype .sfboolValue;
	XMLParser .prototype .fieldTypes [X3DConstants .SFColor]     = Parser .prototype .sfcolorValue;
	XMLParser .prototype .fieldTypes [X3DConstants .SFColorRGBA] = Parser .prototype .sfcolorrgbaValue;
	XMLParser .prototype .fieldTypes [X3DConstants .SFDouble]    = Parser .prototype .sfdoubleValue;
	XMLParser .prototype .fieldTypes [X3DConstants .SFFloat]     = Parser .prototype .sffloatValue;
	XMLParser .prototype .fieldTypes [X3DConstants .SFImage]     = Parser .prototype .sfimageValue;
	XMLParser .prototype .fieldTypes [X3DConstants .SFInt32]     = Parser .prototype .sfint32Value;
	XMLParser .prototype .fieldTypes [X3DConstants .SFMatrix3f]  = Parser .prototype .sfmatrix3dValue;
	XMLParser .prototype .fieldTypes [X3DConstants .SFMatrix3d]  = Parser .prototype .sfmatrix3fValue;
	XMLParser .prototype .fieldTypes [X3DConstants .SFMatrix4f]  = Parser .prototype .sfmatrix4dValue;
	XMLParser .prototype .fieldTypes [X3DConstants .SFMatrix4d]  = Parser .prototype .sfmatrix4fValue;
	XMLParser .prototype .fieldTypes [X3DConstants .SFNode]      = function (field) { field .set (null); };
	XMLParser .prototype .fieldTypes [X3DConstants .SFRotation]  = Parser .prototype .sfrotationValue;
	XMLParser .prototype .fieldTypes [X3DConstants .SFString]    = function (field) { field .set (this .input); };
	XMLParser .prototype .fieldTypes [X3DConstants .SFTime]      = Parser .prototype .sftimeValue;
	XMLParser .prototype .fieldTypes [X3DConstants .SFVec2d]     = Parser .prototype .sfvec2dValue;
	XMLParser .prototype .fieldTypes [X3DConstants .SFVec2f]     = Parser .prototype .sfvec2fValue;
	XMLParser .prototype .fieldTypes [X3DConstants .SFVec3d]     = Parser .prototype .sfvec3dValue;
	XMLParser .prototype .fieldTypes [X3DConstants .SFVec3f]     = Parser .prototype .sfvec3fValue;
	XMLParser .prototype .fieldTypes [X3DConstants .SFVec4d]     = Parser .prototype .sfvec4dValue;
	XMLParser .prototype .fieldTypes [X3DConstants .SFVec4f]     = Parser .prototype .sfvec4fValue;

	XMLParser .prototype .fieldTypes [X3DConstants .MFBool]      = Parser .prototype .sfboolValues;
	XMLParser .prototype .fieldTypes [X3DConstants .MFColor]     = Parser .prototype .sfcolorValues;
	XMLParser .prototype .fieldTypes [X3DConstants .MFColorRGBA] = Parser .prototype .sfcolorrgbaValues;
	XMLParser .prototype .fieldTypes [X3DConstants .MFDouble]    = Parser .prototype .sfdoubleValues;
	XMLParser .prototype .fieldTypes [X3DConstants .MFFloat]     = Parser .prototype .sffloatValues;
	XMLParser .prototype .fieldTypes [X3DConstants .MFImage]     = Parser .prototype .sfimageValues;
	XMLParser .prototype .fieldTypes [X3DConstants .MFInt32]     = Parser .prototype .sfint32Values;
	XMLParser .prototype .fieldTypes [X3DConstants .MFMatrix3d]  = Parser .prototype .sfmatrix3dValues;
	XMLParser .prototype .fieldTypes [X3DConstants .MFMatrix3f]  = Parser .prototype .sfmatrix3fValues;
	XMLParser .prototype .fieldTypes [X3DConstants .MFMatrix4d]  = Parser .prototype .sfmatrix4dValues;
	XMLParser .prototype .fieldTypes [X3DConstants .MFMatrix4f]  = Parser .prototype .sfmatrix4fValues;
	XMLParser .prototype .fieldTypes [X3DConstants .MFNode]      = function () { };
	XMLParser .prototype .fieldTypes [X3DConstants .MFRotation]  = Parser .prototype .sfrotationValues;
	XMLParser .prototype .fieldTypes [X3DConstants .MFString]    = Parser .prototype .sfstringValues;
	XMLParser .prototype .fieldTypes [X3DConstants .MFTime]      = Parser .prototype .sftimeValues;
	XMLParser .prototype .fieldTypes [X3DConstants .MFVec2d]     = Parser .prototype .sfvec2dValues;
	XMLParser .prototype .fieldTypes [X3DConstants .MFVec2f]     = Parser .prototype .sfvec2fValues;
	XMLParser .prototype .fieldTypes [X3DConstants .MFVec3d]     = Parser .prototype .sfvec3dValues;
	XMLParser .prototype .fieldTypes [X3DConstants .MFVec3f]     = Parser .prototype .sfvec3fValues;
	XMLParser .prototype .fieldTypes [X3DConstants .MFVec4d]     = Parser .prototype .sfvec4dValues;
	XMLParser .prototype .fieldTypes [X3DConstants .MFVec4f]     = Parser .prototype .sfvec4fValues;

	/*
	 * Lazy parse functions.
	 */

	var
		infs            = /\binf\b/g,
		nans            = /\bnan\b/g,
		trimWhitespaces = /^[\x20\n,\t\r"]+|[\x20\n,\t\r"]+$/g,
		whitespaces     = /[\x20\n,\t\r"]+/,
		strings         = new RegExp ('"((?:[^\\\\"]|\\\\\\\\|\\\\\\")*)"', 'g');

   function prepareBools (string)
	{
		return string .replace (trimWhitespaces, "") .split (whitespaces);
	}

   function prepareFloats (string)
	{
		return (string
			.replace (infs, "Infinity")
			.replace (nans, "NaN")
			.replace (trimWhitespaces, "")
			.split (whitespaces));
	}

   function prepareInts (string)
	{
		return string .replace (trimWhitespaces, "") .split (whitespaces);
	}

   function prepareStrings (string)
	{
		var
			match = null,
			array = [ ];

		while (match = strings .exec (string))
			array .push (match [1]);

		return array .map (Fields .SFString .unescape);
	}

	// Unitless fields.

	XMLParser .prototype .fieldTypes [X3DConstants .MFColor] =
	XMLParser .prototype .fieldTypes [X3DConstants .MFColorRGBA] =
	XMLParser .prototype .fieldTypes [X3DConstants .MFMatrix3d] =
	XMLParser .prototype .fieldTypes [X3DConstants .MFMatrix3f] =
	XMLParser .prototype .fieldTypes [X3DConstants .MFMatrix4d] =
	XMLParser .prototype .fieldTypes [X3DConstants .MFMatrix4f] =
	XMLParser .prototype .fieldTypes [X3DConstants .MFVec4d] =
	XMLParser .prototype .fieldTypes [X3DConstants .MFVec4f] = function (field)
	{
		field .setValue (prepareFloats (this .getInput ()) .map (function (value)
		{
			return parseFloat (value);
		}));
	};

	XMLParser .prototype .fieldTypes [X3DConstants .MFBool] = function (field)
	{
		field .setValue (prepareBools (this .getInput ()) .map (function (value)
		{
			if (value === "true" || value === "TRUE")
				return true;

			return false;
		}));
	};

	XMLParser .prototype .fieldTypes [X3DConstants .MFInt32] = function (field)
	{
		field .setValue (prepareInts (this .getInput ()) .map (function (value)
		{
			return parseInt (value);
		}));
	};

	// Unit fields.

	XMLParser .prototype .fieldTypes [X3DConstants .MFDouble] =
	XMLParser .prototype .fieldTypes [X3DConstants .MFFloat] =
	XMLParser .prototype .fieldTypes [X3DConstants .MFVec2d] =
	XMLParser .prototype .fieldTypes [X3DConstants .MFVec2f] =
	XMLParser .prototype .fieldTypes [X3DConstants .MFVec3d] =
	XMLParser .prototype .fieldTypes [X3DConstants .MFVec3f] = function (field)
	{
		var category = field .getUnit ();

		field .setValue (prepareFloats (this .getInput ()) .map (function (value)
		{
			return this .fromUnit (category, parseFloat (value));
		},
		this));
	};

	XMLParser .prototype .fieldTypes [X3DConstants .MFString] = function (field)
	{
		field .setValue (prepareStrings (this .getInput ()));
	};

	return XMLParser;
});
