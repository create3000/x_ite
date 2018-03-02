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
	"x_ite/Parser/X3DParser",
	"x_ite/Prototype/X3DExternProtoDeclaration",
	"x_ite/Prototype/X3DProtoDeclaration",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DParser,
          X3DExternProtoDeclaration,
          X3DProtoDeclaration,
          X3DConstants)
{
"use strict";

	function accessTypeToString (accessType)
	{
		switch (accessType)
		{
			case X3DConstants .inializeOnly:
				return "initializeOnly";
			case X3DConstants .inputOnly:
				return "inputOnly";
			case X3DConstants .outputOnly:
				return "outputOnly";
			case X3DConstants .inputOutput:
				return "inputOutput";
		}
	}

	/*
	 *  Grammar
	 */


//	Comment out scriptBody function fragments
//
//	// VRML lexical elements
//	var Grammar =
//	{
//		// General
//		Whitespaces: /^([\x20\n,\t\r]+)/,
//		Comment:     /^#(.*?)(?=[\n\r])/,
//
//		// Header
//		Header:	    /^#(VRML|X3D) V(.*?) (utf8)(?: (.*?))?[\n\r]/,
//
//		// Keywords
//		AS:          /^AS/,
//		COMPONENT:   /^COMPONENT/,
//		DEF:         /^DEF/,
//		EXPORT:      /^EXPORT/,
//		EXTERNPROTO: /^EXTERNPROTO/,
//		FALSE:       /^FALSE/,
//		false:       /^false/,
//		IMPORT:      /^IMPORT/,
//		IS:          /^IS/,
//		META:        /^META/,
//		NULL:        /^NULL/,
//		TRUE:        /^TRUE/,
//		true:        /^true/,
//		PROFILE:     /^PROFILE/,
//		PROTO:       /^PROTO/,
//		ROUTE:       /^ROUTE/,
//		TO:          /^TO/,
//		UNIT:        /^UNIT/,
//		USE:         /^USE/,
//
//		// Terminal symbols
//		OpenBrace:    /^\{/,
//		CloseBrace:   /^\}/,
//		OpenBracket:  /^\[/,
//		CloseBracket: /^\]/,
//		Period:       /^\./,
//		Colon:        /^\:/,
//
//		Id: /^([^\x30-\x39\x00-\x20\x22\x23\x27\x2b\x2c\x2d\x2e\x5b\x5c\x5d\x7b\x7d\x7f]{1}[^\x00-\x20\x22\x23\x27\x2c\x2e\x5b\x5c\x5d\x7b\x7d\x7f]*)/,
//		ComponentNameId: /^([^\x30-\x39\x00-\x20\x22\x23\x27\x2b\x2c\x2d\x2e\x5b\x5c\x5d\x7b\x7d\x7f\x3a]{1}[^\x00-\x20\x22\x23\x27\x2c\x2e\x5b\x5c\x5d\x7b\x7d\x7f\x3a]*)/,
//
//		initializeOnly: /^initializeOnly/,
//		inputOnly:      /^inputOnly/,
//		outputOnly:     /^outputOnly/,
//		inputOutput:    /^inputOutput/,
//
//		field:        /^field/,
//		eventIn:      /^eventIn/,
//		eventOut:     /^eventOut/,
//		exposedField: /^exposedField/,
//
//		FieldType: /^(MFBool|MFColorRGBA|MFColor|MFDouble|MFFloat|MFImage|MFInt32|MFMatrix3d|MFMatrix3f|MFMatrix4d|MFMatrix4f|MFNode|MFRotation|MFString|MFTime|MFVec2d|MFVec2f|MFVec3d|MFVec3f|MFVec4d|MFVec4f|SFBool|SFColorRGBA|SFColor|SFDouble|SFFloat|SFImage|SFInt32|SFMatrix3d|SFMatrix3f|SFMatrix4d|SFMatrix4f|SFNode|SFRotation|SFString|SFTime|SFVec2d|SFVec2f|SFVec3d|SFVec3f|SFVec4d|SFVec4f)/,
//
//		// Values
//		int32:  /^((?:0[xX][\da-fA-F]+)|(?:[+-]?\d+))/,
//		double: /^([+-]?(?:(?:(?:\d*\.\d+)|(?:\d+(?:\.)?))(?:[eE][+-]?\d+)?))/,
//		string: /^"((?:[^"\\]|\\\\|\\")*)"/,
//
//		Inf:         /^[+]?inf/i,
//		NegativeInf: /^-inf/i,
//		NaN:         /^[+-]?nan/i,
//
//		// Misc
//		Break: /\r?\n/g,
//	};
//
//	function parse (parser)
//	{
//		this .lastIndex = 0;
//		parser .result  = this .exec (parser .input);
//
//		if (parser .result)
//		{
//			parser .input = parser .input .slice (parser .result [0] .length);
//			return true;
//		}
//
//		return false;
//	}


	// Comment out scriptBody function fragments
	//
	// VRML lexical elements
	var Grammar =
	{
		// General
		Whitespaces: new RegExp ('([\\x20\\n,\\t\\r]+)', 'gy'),
		Comment:     new RegExp ('#(.*?)(?=[\\n\\r])',   'gy'),

		// Header
		Header:	    new RegExp ("#(VRML|X3D) V(.*?) (utf8)(?: (.*?))?[\\n\\r]", 'gy'),

		// Keywords
		AS:          new RegExp ('AS',          'gy'),
		COMPONENT:   new RegExp ('COMPONENT',   'gy'),
		DEF:         new RegExp ('DEF',         'gy'),
		EXPORT:      new RegExp ('EXPORT',      'gy'),
		EXTERNPROTO: new RegExp ('EXTERNPROTO', 'gy'),
		FALSE:       new RegExp ('FALSE',       'gy'),
		false:       new RegExp ('false',       'gy'),
		IMPORT:      new RegExp ('IMPORT',      'gy'),
		IS:          new RegExp ('IS',          'gy'),
		META:        new RegExp ('META',        'gy'),
		NULL:        new RegExp ('NULL',        'gy'),
		TRUE:        new RegExp ('TRUE',        'gy'),
		true:        new RegExp ('true',        'gy'),
		PROFILE:     new RegExp ('PROFILE',     'gy'),
		PROTO:       new RegExp ('PROTO',       'gy'),
		ROUTE:       new RegExp ('ROUTE',       'gy'),
		TO:          new RegExp ('TO',          'gy'),
		UNIT:        new RegExp ('UNIT',        'gy'),
		USE:         new RegExp ('USE',         'gy'),

		// Terminal symbols
		OpenBrace:    new RegExp ('\\{', 'gy'),
		CloseBrace:   new RegExp ('\\}', 'gy'),
		OpenBracket:  new RegExp ('\\[', 'gy'),
		CloseBracket: new RegExp ('\\]', 'gy'),
		Period:       new RegExp ('\\.', 'gy'),
		Colon:        new RegExp ('\\:', 'gy'),

		Id: new RegExp ('([^\\x30-\\x39\\x00-\\x20\\x22\\x23\\x27\\x2b\\x2c\\x2d\\x2e\\x5b\\x5c\\x5d\\x7b\\x7d\\x7f]{1}[^\\x00-\\x20\\x22\\x23\\x27\\x2c\\x2e\\x5b\\x5c\\x5d\\x7b\\x7d\\x7f]*)', 'gy'),
		ComponentNameId: new RegExp ('([^\\x30-\\x39\\x00-\\x20\\x22\\x23\\x27\\x2b\\x2c\\x2d\\x2e\\x5b\\x5c\\x5d\\x7b\\x7d\\x7f\\x3a]{1}[^\\x00-\\x20\\x22\\x23\\x27\\x2c\\x2e\\x5b\\x5c\\x5d\\x7b\\x7d\\x7f\\x3a]*)', 'gy'),

		initializeOnly: new RegExp ('initializeOnly', 'gy'),
		inputOnly:      new RegExp ('inputOnly',      'gy'),
		outputOnly:     new RegExp ('outputOnly',     'gy'),
		inputOutput:    new RegExp ('inputOutput',    'gy'),

		field:        new RegExp ('field', 'gy'),
		eventIn:      new RegExp ('eventIn', 'gy'),
		eventOut:     new RegExp ('eventOut', 'gy'),
		exposedField: new RegExp ('exposedField', 'gy'),

		FieldType: new RegExp ('(MFBool|MFColorRGBA|MFColor|MFDouble|MFFloat|MFImage|MFInt32|MFMatrix3d|MFMatrix3f|MFMatrix4d|MFMatrix4f|MFNode|MFRotation|MFString|MFTime|MFVec2d|MFVec2f|MFVec3d|MFVec3f|MFVec4d|MFVec4f|SFBool|SFColorRGBA|SFColor|SFDouble|SFFloat|SFImage|SFInt32|SFMatrix3d|SFMatrix3f|SFMatrix4d|SFMatrix4f|SFNode|SFRotation|SFString|SFTime|SFVec2d|SFVec2f|SFVec3d|SFVec3f|SFVec4d|SFVec4f)', 'gy'),

		// Values
		int32:  new RegExp ('((?:0[xX][\\da-fA-F]+)|(?:[+-]?\\d+))', 'gy'),
		double: new RegExp ('([+-]?(?:(?:(?:\\d*\\.\\d+)|(?:\\d+(?:\\.)?))(?:[eE][+-]?\\d+)?))', 'gy'),
		string: new RegExp ('"((?:[^\\\\"]|\\\\\\\\|\\\\\\")*)"', 'gy'),
		
		Inf:         new RegExp ('[+]?inf',  'gyi'),
		NegativeInf: new RegExp ('-inf',     'gyi'),
		NaN:         new RegExp ('[+-]?nan', 'gyi'),

		// Misc
		Break: new RegExp ('\\r?\\n', 'g'),
	};

	function parse (parser)
	{
		this .lastIndex = parser .lastIndex;

		parser .result = this .exec (parser .input);

		if (parser .result)
		{
			parser .lastIndex = this .lastIndex;
			return true;
		}

		return false;
	}

	for (var key in Grammar)
		Grammar [key] .parse = parse;

	Object .preventExtensions (Grammar);
	Object .freeze (Grammar);
	Object .seal (Grammar);

	/*
	 *  Parser
	 */

	function Parser (scene, isXML)
	{
		X3DParser .call (this, scene);

		this .isXML = isXML;
	}

	Parser .prototype = Object .assign (Object .create (X3DParser .prototype),
	{
		accessTypes:
		{
			field:          X3DConstants .initializeOnly,
			eventIn:        X3DConstants .inputOnly,
			eventOut:       X3DConstants .outputOnly,
			exposedField:   X3DConstants .inputOutput,
			initializeOnly: X3DConstants .initializeOnly,
			inputOnly:      X3DConstants .inputOnly,
			outputOnly:     X3DConstants .outputOnly,
			inputOutput:    X3DConstants .inputOutput,
		},
		SFBool: new Fields .SFBool (),
		SFColor: new Fields .SFColor (),
		SFColorRGBA: new Fields .SFColorRGBA (),
		SFDouble: new Fields .SFDouble (),
		SFFloat: new Fields .SFFloat (),
		SFImage: new Fields .SFImage (),
		SFInt32: new Fields .SFInt32 (),
		SFMatrix3f: new Fields .SFMatrix3f (),
		SFMatrix3d: new Fields .SFMatrix3d (),
		SFMatrix4f: new Fields .SFMatrix4f (),
		SFMatrix4d: new Fields .SFMatrix4d (),
		SFNode: new Fields .SFNode (),
		SFRotation: new Fields .SFRotation (),
		SFString: new Fields .SFString (),
		SFTime: new Fields .SFTime (),
		SFVec2d: new Fields .SFVec2d (),
		SFVec2f: new Fields .SFVec2f (),
		SFVec3d: new Fields .SFVec3d (),
		SFVec3f: new Fields .SFVec3f (),
		SFVec4d: new Fields .SFVec4d (),
		SFVec4f: new Fields .SFVec4f (),
		MFBool: new Fields .MFBool (),
		MFColor: new Fields .MFColor (),
		MFColorRGBA: new Fields .MFColorRGBA (),
		MFDouble: new Fields .MFDouble (),
		MFFloat: new Fields .MFFloat (),
		MFImage: new Fields .MFImage (),
		MFInt32: new Fields .MFInt32 (),
		MFMatrix3d: new Fields .MFMatrix3d (),
		MFMatrix3f: new Fields .MFMatrix3f (),
		MFMatrix4d: new Fields .MFMatrix4d (),
		MFMatrix4f: new Fields .MFMatrix4f  (),
		MFNode: new Fields .MFNode (),
		MFRotation: new Fields .MFRotation (),
		MFString: new Fields .MFString (),
		MFTime: new Fields .MFTime (),
		MFVec2d: new Fields .MFVec2d (),
		MFVec2f: new Fields .MFVec2f (),
		MFVec3d: new Fields .MFVec3d (),
		MFVec3f: new Fields .MFVec3f (),
		MFVec4d: new Fields .MFVec4d (),
		MFVec4f: new Fields .MFVec4f (),
		setInput: function (value)
		{
			this .input      = value;
			this .lineNumber = 1;
			this .lastIndex  = 0;
		},
		exception: function (string)
		{
			if (this .getBrowser () .isStrict ())
				throw new Error (string);

			this .getBrowser () .println (string);
		},
		parseIntoScene: function (input)
		{
			try
			{
				this .getScene () .setEncoding ("VRML");
				this .getScene () .setProfile (this .getBrowser () .getProfile ("Full"));

				this .setInput (input);
				this .x3dScene ();
				return;
			}
			catch (error)
			{
				//console .log (error);
				throw new Error (this .getError (error));
			}
		},
		getError: function (error)
		{
			//console .log (error);

			var string = error .message;

			var
				rest     = this .getLine (),
				line     = this .getLastLine (),
				lastLine = this .getLastLine (),
				linePos  = line .length - rest .length + 1;
	
			if (line .length > 80)
			{
				line     = line .substr (linePos - 40, 80);
				lastLine = "";
				linePos  = 40;
			}
	
			// Format error

			var message = "\n"
				+ "********************************************************************************" + "\n"
				+ "Parser error at line " + this .lineNumber + ":" + linePos  + "\n"
				+ "in '" + this .getScene () .getURL () + "'" + "\n"
				+ "\n"
				+ lastLine + "\n"
				+ line + "\n"
				+ Array (linePos) .join (" ") + "^" + "\n"
				+ string + "\n"
				+ "********************************************************************************"
				+ "\n"
			;

			return message;
		},
		getLine: function ()
		{
			var
				input     = this .input,
				lastIndex = this .lastIndex,
				line      = "";

			while (lastIndex < input .length && input [lastIndex] !== "\n" && input [lastIndex] !== "\r")
				line += input [lastIndex ++];

			this .lastIndex = lastIndex;

			return line;
		},
		getLastLine: function ()
		{
			var
				input     = this .input,
				lastIndex = this .lastIndex,
				line      = "";

			if (lastIndex < input .length && (input [lastIndex] !== "\n" || input [lastIndex] !== "\r"))
				-- lastIndex;

			while (lastIndex >= 0 && input [lastIndex] !== "\n" && input [lastIndex] !== "\r")
				line = input [lastIndex --] + line;

			this .lastIndex = lastIndex;

			return line;
		},
		comments: function ()
		{
			while (this .comment ())
				;
		},
		comment: function ()
		{
			if (this .whitespaces ())
				return true;

			return Grammar .Comment .parse (this);
		},
		whitespaces: function ()
		{
			if (Grammar .Whitespaces .parse (this))
			{
				if (!this .xml)
					this .lines (this .result [1]);
				
				return true;
			}

			return false;	
		},
		lines: function (string)
		{
			var match = string .match (Grammar .Break);

			if (match)
				this .lineNumber += match .length;
		},
		x3dScene: function ()
		{
			this .pushExecutionContext (this .getScene ());

			this .headerStatement ();
			this .profileStatement ();
			this .componentStatements ();
			this .unitStatements ();
			this .metaStatements ();

			try
			{
				this .setUnits (this .getScene () .getMetaData ("generator"));
			}
			catch (error)
			{ }

			this .statements ();

			this .popExecutionContext (this .getScene ());

			if (this .lastIndex < this .input .length)
				throw new Error ("Unknown statement.");
		},
		headerStatement: function ()
		{
			var result = Grammar .Header .exec (this .input);

			if (result)
			{
				this .getScene () .specificationVersion = result [2];
				this .getScene () .encoding             = "VRML";
				return true;
			}

			return false;
		},
		profileStatement: function ()
		{
			this .comments ();

			if (Grammar .PROFILE .parse (this))
			{
				if (this .profileNameId ())
				{
					var profile = this .getBrowser () .getProfile (this .result [1]);

					this .getScene () .setProfile (profile);
					return;
				}

				throw new Error ("Expected a profile name.");
			}
		},
		componentStatements: function ()
		{
			var component = this .componentStatement ();

			while (component)
			{
				this .getScene () .addComponent (component);

				component = this .componentStatement ();
			}
		},
		componentStatement: function ()
		{
			this .comments ();

			if (Grammar .COMPONENT .parse (this))
			{
				if (this .componentNameId ())
				{
					var componentNameIdCharacters = this .result [1];

					this .comments ();
		
					if (Grammar .Colon .parse (this))
					{
						if (this .componentSupportLevel ())
						{
							var componentSupportLevel = this .value;

							return this .getBrowser () .getComponent (componentNameIdCharacters, componentSupportLevel);
						}
		
						throw new Error ("Expected a component support level.");
					}
		
					throw new Error ("Expected a ':' after component name.");
				}
		
				throw new Error ("Expected a component name.");
			}
		
			return null;
		},
		componentSupportLevel: function ()
		{
			return this .int32 ();
		},
		unitStatements: function ()
		{
			while (this .unitStatement ())
				;
		},
		unitStatement: function ()
		{
			this .comments ();
		
			if (Grammar .UNIT .parse (this))
			{
				if (this .categoryNameId ())
				{
					var categoryNameId = this .result [1];
		
					if (this .unitNameId ())
					{
						var unitNameId = this .result [1];
		
						if (this .unitConversionFactor ())
						{
							var unitConversionFactor = this .value;

						   try
						   {
								this .getScene () .updateUnit (categoryNameId, unitNameId, unitConversionFactor);
								return true;
							}
							catch (error)
							{
							   console .log (error .message);
							   return true;
							}
						}
		
						throw new Error ("Expected unit conversion factor.");
					}
		
					throw new Error ("Expected unit name identificator.");
				}
		
				throw new Error ("Expected category name identificator after UNIT statement.");
			}
		
			return false;
		},
		unitConversionFactor: function ()
		{
			return this .double ();
		},
		metaStatements: function ()
		{
			while (this .metaStatement ())
				;
		},
		metaStatement: function ()
		{
			this .comments ();

			if (Grammar .META .parse (this))
			{
				if (this .metakey ())
				{
					var metakey = this .value;
		
					if (this .metavalue ())
					{
						var metavalue = this .value;

						this .getScene () .setMetaData (metakey, metavalue);
						return true;
					}
		
					throw new Error ("Expected metadata value.");
				}
		
				throw new Error ("Expected metadata key.");
			}
		
			return false;
		},
		metakey: function ()
		{
			return this .string ();
		},
		metavalue: function ()
		{
			return this .string ();
		},
		exportStatement: function ()
		{
			this .comments ();

			if (Grammar .EXPORT .parse (this))
			{
				if (this .nodeNameId ())
				{
					var
						localNodeNameId    = this .result [1],
						exportedNodeNameId = "";
		
					this .comments ();
		
					var node = this .getScene () .getLocalNode (localNodeNameId);
		
					if (Grammar .AS .parse (this))
					{
						if (this .exportedNodeNameId ())
							exportedNodeNameId = this .result [1];
						else
							throw new Error ("No name given after AS.");
					}
					else
						exportedNodeNameId = localNodeNameId;
		
					this .getScene () .updateExportedNode (exportedNodeNameId, node);
					return true;
				}
		
				throw new Error ("No name given after EXPORT.");
			}
		
			return false;
		},
		importStatement: function ()
		{
			this .comments ();

			if (Grammar .IMPORT .parse (this))
			{
				if (this .nodeNameId ())
				{
					var
						inlineNodeNameId = this .result [1],
						namedNode        = this .getExecutionContext () .getNamedNode (inlineNodeNameId);
		
					this .comments ();
	
					if (Grammar .Period .parse (this))
					{
						if (this .exportedNodeNameId ())
						{
							var
								exportedNodeNameId = this .result [1],
								nodeNameId         = exportedNodeNameId;
	
							this .comments ();
	
							if (Grammar .AS .parse (this))
							{
								if (this .nodeNameId ())
									nodeNameId = this .result [1];

								else
									throw new Error ("No name given after AS.");
							}
	
							this .getExecutionContext () .updateImportedNode (namedNode, exportedNodeNameId, nodeNameId);
							return true;
						}
	
						throw new Error ("Expected exported node name.");
					}
	
					throw new Error ("Expected a '.' after exported node name.");
				}
		
				throw new Error ("No name given after IMPORT statement.");
			}
			return false;
		},
		statements: function ()
		{
			while (this .statement ())
				;
		},
		statement: function ()
		{
			if (this .protoStatement ())
				return true;
		
			if (this .routeStatement ())
				return true;
		
			if (this .importStatement ())
				return true;
		
			if (this .exportStatement ())
				return true;

			var node = this .nodeStatement ();

			if (node !== false)
			{
				this .addRootNode (node);
				return true;
			}

			return false;
		},
		nodeStatement: function ()
		{
			this .comments ();

			if (Grammar .DEF .parse (this))
			{
				if (this .nodeNameId ())
					return this .node (this .result [1]);

				throw new Error ("No name given after DEF.");
			}

			if (Grammar .USE .parse (this))
			{
				if (this .nodeNameId ())
					return this .getExecutionContext () .getNamedNode (this .result [1]) .getValue ();

				throw new Error ("No name given after USE.");
			}

			if (Grammar .NULL .parse (this))
				return null;

			return this .node ("");
		},
		protoStatement: function ()
		{
			if (this .proto ())
				return true;
		
			if (this .externproto ())
				return true;
		
			return false;
		},
		protoStatements: function ()
		{
			while (this .protoStatement ())
				;
		},
		proto: function ()
		{
			this .comments ();
		
			if (Grammar .PROTO .parse (this))
			{
				if (this .nodeTypeId ())
				{
					var nodeTypeId = this .result [1];
		
					this .comments ();
		
					if (Grammar .OpenBracket .parse (this))
					{
						var interfaceDeclarations = this .interfaceDeclarations ();
		
						this .comments ();
		
						if (Grammar .CloseBracket .parse (this))
						{
							this .comments ();
		
							if (Grammar .OpenBrace .parse (this))
							{
								var proto = new X3DProtoDeclaration (this .getExecutionContext ());

								for (var i = 0, length = interfaceDeclarations .length; i < length; ++ i)
								{
									var field = interfaceDeclarations [i];

									proto .addUserDefinedField (field .getAccessType (), field .getName (), field);
								}

								this .pushExecutionContext (proto);
		
								this .protoBody ();
		
								this .popExecutionContext ();
		
								this .comments ();
		
								if (Grammar .CloseBrace .parse (this))
								{
									proto .setName (nodeTypeId);
									proto .setup ();

									this .getExecutionContext () .protos .add (nodeTypeId, proto);
									return true;
								}
	
								throw new Error ("Expected a '}' at the end of PROTO body.");
							}

							throw new Error ("Expected a '{' at the beginning of PROTO body.");
						}

						throw new Error ("Expected a ']' at the end of PROTO interface declaration.");
					}

					throw new Error ("Expected a '[' at the beginning of PROTO interface declaration.");
				}

				throw new Error ("Invalid PROTO definition name.");
			}

			return false;
		},
		protoBody: function ()
		{
			this .protoStatements ();

			var rootNodeStatement = this .rootNodeStatement ();

			if (rootNodeStatement !== false)
				this .addRootNode (rootNodeStatement);

			this .statements ();
		},
		rootNodeStatement: function ()
		{
			this .comments ();
		
			if (Grammar .DEF .parse (this))
			{
				if (this .nodeNameId ())
				{
					var
						nodeNameId = this .result [0],
						baseNode   = this .node (nodeNameId);

					if (baseNode !== false)
						return baseNode;

					throw new Error ("Expected node type name after DEF.");
				}
	
				throw new Error ("No name given after DEF.");
			}

			var baseNode = this .node ("");

			if (baseNode !== false)
				return baseNode;

			return false;
		},
		interfaceDeclarations: function ()
		{
			var
				interfaceDeclarations = [ ],
				field                 = this .interfaceDeclaration ();

			while (field)
			{
				interfaceDeclarations .push (field);

				field = this .interfaceDeclaration ();
			}

			return interfaceDeclarations;
		},
		restrictedInterfaceDeclaration: function ()
		{
			this .comments ();
		
			if (Grammar .inputOnly .parse (this) || Grammar .eventIn .parse (this))
			{
				if (this .fieldType ())
				{
					var fieldType = this .result [1];
		
					if (this .inputOnlyId ())
					{
						var
							fieldId = this .result [1],
							field = new (this [fieldType] .constructor) ();
						
						field .setAccessType (X3DConstants .inputOnly);
						field .setName (fieldId);
						return field;
					}
		
					throw new Error ("Expected a name for field.");
				}

				this .Id ()
		
				throw new Error ("Unknown event or field type: '" + this .result [1] + "'.");
			}
		
			if (Grammar .outputOnly .parse (this) || Grammar .eventOut .parse (this))
			{
				if (this .fieldType ())
				{
					var fieldType = this .result [1];
		
					if (this .outputOnlyId ())
					{
						var
							fieldId = this .result [1],
							field = new (this [fieldType] .constructor) ();

						field .setAccessType (X3DConstants .outputOnly);
						field .setName (fieldId);
						return field;
					}
		
					throw new Error ("Expected a name for field.");
				}
		
				this .Id ()
		
				throw new Error ("Unknown event or field type: '" + this .result [1] + "'.");
			}
		
			if (Grammar .initializeOnly .parse (this) || Grammar .field .parse (this))
			{
				if (this .fieldType ())
				{
					var fieldType = this .result [1];
		
					if (this .initializeOnlyId ())
					{
						var
							fieldId = this .result [1],
							field = new (this [fieldType] .constructor) ();
		
						if (this .fieldValue (field))
						{
							field .setAccessType (X3DConstants .initializeOnly);
							field .setName (fieldId);
							return field;
						}
		
						throw new Error ("Couldn't read value for field '" + fieldId + "'.");
					}
		
					throw new Error ("Expected a name for field.");
				}
		
				this .Id ()
		
				throw new Error ("Unknown event or field type: '" + this .result [1] + "'.");
			}
		
			return null;
		},
		interfaceDeclaration: function ()
		{
			var field = this .restrictedInterfaceDeclaration ();
		
			if (field)
				return field;

			this .comments ();
		
			if (Grammar .inputOutput .parse (this) || Grammar .exposedField .parse (this))
			{
				if (this .fieldType ())
				{
					var fieldType = this .result [1];
		
					if (this .inputOutputId ())
					{
						var
							fieldId = this .result [1],
							field   = new (this [fieldType] .constructor) ();
		
						if (this .fieldValue (field))
						{
							field .setAccessType (X3DConstants .inputOutput);
							field .setName (fieldId);
							return field;
						}
		
						throw new Error ("Couldn't read value for field '" + fieldId + "'.");
					}
		
					throw new Error ("Expected a name for field.");
				}
	
				this .Id ()
		
				throw new Error ("Unknown event or field type: '" + this .result [1] + "'.");
			}

			return null;
		},
		externproto: function ()
		{
			this .comments ();
		
			if (Grammar .EXTERNPROTO .parse (this))
			{
				if (this .nodeTypeId ())
				{
					var nodeTypeId = this .result [1];
		
					this .comments ();
		
					if (Grammar .OpenBracket .parse (this))
					{
						var externInterfaceDeclarations = this .externInterfaceDeclarations ();
		
						this .comments ();
		
						if (Grammar .CloseBracket .parse (this))
						{
							if (this .URLList (this .MFString))
							{
								var externproto = new X3DExternProtoDeclaration (this .getExecutionContext ());

								for (var i = 0, length = externInterfaceDeclarations .length; i < length; ++ i)
								{
									var field = externInterfaceDeclarations [i];

									externproto .addUserDefinedField (field .getAccessType (), field .getName (), field);
								}
		
								externproto .setName (nodeTypeId);
								externproto .url_ = this .MFString;
								externproto .setup ();

								this .getExecutionContext () .externprotos .add (nodeTypeId, externproto);	
								return true;
							}
		
							throw new Error ("Expected a URL list after EXTERNPROTO interface declaration '" + nodeTypeId + "'.");
						}
		
						throw new Error ("Expected a ']' at the end of EXTERNPROTO interface declaration.");
					}
		
					throw new Error ("Expected a '[' at the beginning of EXTERNPROTO interface declaration.");
				}
		
				throw new Error ("Invalid EXTERNPROTO definition name.");
			}
		
			return false;
		},
		externInterfaceDeclarations: function ()
		{
			var
				externInterfaceDeclarations = [ ],
				field                       = this .externInterfaceDeclaration ();

			while (field)
			{
				externInterfaceDeclarations .push (field);
				
				field = this .externInterfaceDeclaration ();
			}

			return externInterfaceDeclarations;
		},
		externInterfaceDeclaration: function ()
		{
			this .comments ();
		
			if (Grammar .inputOnly .parse (this) || Grammar .eventIn .parse (this))
			{
				if (this .fieldType ())
				{
					var fieldType = this .result [1];
		
					if (this .inputOnlyId ())
					{
						var
							fieldId = this .result [1],
							field = new (this [fieldType] .constructor) ();
						
						field .setAccessType (X3DConstants .inputOnly);
						field .setName (fieldId);
						return field;
					}
		
					throw new Error ("Expected a name for field.");
				}

				this .Id ()
		
				throw new Error ("Unknown event or field type: '" + this .result [1] + "'.");
			}
		
			if (Grammar .outputOnly .parse (this) || Grammar .eventOut .parse (this))
			{
				if (this .fieldType ())
				{
					var fieldType = this .result [1];
		
					if (this .outputOnlyId ())
					{
						var
							fieldId = this .result [1],
							field = new (this [fieldType] .constructor) ();

						field .setAccessType (X3DConstants .outputOnly);
						field .setName (fieldId);
						return field;
					}
		
					throw new Error ("Expected a name for field.");
				}
		
				this .Id ()
		
				throw new Error ("Unknown event or field type: '" + this .result [1] + "'.");
			}
		
			if (Grammar .initializeOnly .parse (this) || Grammar .field .parse (this))
			{
				if (this .fieldType ())
				{
					var fieldType = this .result [1];
		
					if (this .initializeOnlyId ())
					{
						var
							fieldId = this .result [1],
							field = new (this [fieldType] .constructor) ();
		
						field .setAccessType (X3DConstants .initializeOnly);
						field .setName (fieldId);
						return field;
					}
		
					throw new Error ("Expected a name for field.");
				}
		
				this .Id ()
		
				throw new Error ("Unknown event or field type: '" + this .result [1] + "'.");
			}
			
			if (Grammar .inputOutput .parse (this) || Grammar .exposedField .parse (this))
			{
				if (this .fieldType ())
				{
					var fieldType = this .result [1];
		
					if (this .inputOutputId ())
					{
						var
							fieldId = this .result [1],
							field   = new (this [fieldType] .constructor) ();
		
						field .setAccessType (X3DConstants .inputOutput);
						field .setName (fieldId);
						return field;
					}
	
					throw new Error ("Expected a name for field.");
				}
	
				this .Id ()
		
				throw new Error ("Unknown event or field type: '" + this .result [1] + "'.");
			}

			return null;
		},
		URLList: function (field)
		{
			return this .mfstringValue (field);
		},
		routeStatement: function ()
		{
			this .comments ();
		
			if (Grammar .ROUTE .parse (this))
			{
				if (this .nodeNameId ())
				{
					var
						fromNodeId = this .result [1],
						fromNode   = this .getExecutionContext () .getLocalNode (fromNodeId);

					this .comments ();
		
					if (Grammar .Period .parse (this))
					{
						if (this .outputOnlyId ())
						{
							var eventOutId = this .result [1];
	
							this .comments ();
		
							if (Grammar .TO .parse (this))
							{
								if (this .nodeNameId ())
								{
									var
										toNodeId = this .result [1],
										toNode   = this .getExecutionContext () .getLocalNode (toNodeId);

									this .comments ();

									if (Grammar .Period .parse (this))
									{
										if (this .inputOnlyId ())
										{
											try
											{
												var eventInId = this .result [1];

												this .getExecutionContext () .addRoute (fromNode, eventOutId, toNode, eventInId);
												return true;
											}
											catch (error)
											{
												this .exception (error .message);

												return true;
											}
										}
		
										throw new Error ("Bad ROUTE specification: Expected a field name.");
									}
		
									throw new Error ("Bad ROUTE specification: Expected a '.' after node name.");
								}
		
								throw new Error ("Bad ROUTE specification: Expected a node name.");
							}
		
							throw new Error ("Bad ROUTE specification: Expected a 'TO'.");
						}
		
						throw new Error ("Bad ROUTE specification: Expected a field name.");
					}
		
					throw new Error ("Bad ROUTE specification: Expected a '.' after node name.");
				}
		
				throw new Error ("Bad ROUTE specification: Expected a node name.");
			}
		
			return false;
		},
		node: function (nodeNameId)
		{
			if (this .nodeTypeId ())
			{
				var nodeTypeId = this .result [1];
		
				try
				{
					var baseNode = this .getExecutionContext () .createNode (nodeTypeId, false);
				}
				catch (error1)
				{
					try
					{
						var baseNode = this .getExecutionContext () .createProto (nodeTypeId, false);
					}
					catch (error2)
					{
						throw new Error (error1 .message + "\n" + error2 .message);
					}
				}
		
				if (nodeNameId .length)
				{
					try
					{
						var namedNode = this .getExecutionContext () .getNamedNode (nodeNameId);

						this .getExecutionContext () .updateNamedNode (this .getExecutionContext () .getUniqueName (nodeNameId), namedNode);
					}
					catch (error)
					{ }

					this .getExecutionContext () .updateNamedNode (nodeNameId, baseNode);
				}
		
				this .comments ();
		
				if (Grammar .OpenBrace .parse (this))
				{
					if (baseNode .hasUserDefinedFields ())
						this .scriptBody (baseNode);
		
					else
						this .nodeBody (baseNode);
		
					this .comments ();
		
					if (Grammar .CloseBrace .parse (this))
					{
						this .getExecutionContext () .addUninitializedNode (baseNode);
						return baseNode;
					}
		
					throw new Error ("Expected '}' at the end of node body.");
				}
		
				throw new Error ("Expected '{' at the beginning of node body.");
			}
		
			return false;
		},
		scriptBody: function (baseNode)
		{
			while (this .scriptBodyElement (baseNode))
				;
		},
		scriptBodyElement: function (baseNode)
		{
			var
				lastIndex  = this .lastIndex,
				lineNumber = this .lineNumber;

//			var
//				input      = this .input,
//				lineNumber = this .lineNumber;

			if (this .Id ())
			{
				var accessType = this .accessTypes [this .result [1]];
		
				if (accessType)
				{
					if (this .fieldType ())
					{
						var fieldType = this .result [1];
		
						if (this .Id ())
						{
							var fieldId = this .result [1];

							this .comments ();
		
							if (Grammar .IS .parse (this))
							{
								if (this .isInsideProtoDefinition ())
								{
									if (this .Id ())
									{
										var isId = this .result [1];
		
										try
										{
											var reference = this .getExecutionContext () .getField (isId);
										}
										catch (error)
										{
											this .exception ("No such event or field '" + isId + "' inside PROTO " + this .getExecutionContext () .getName () + " interface declaration.");
											
											return true;
										}
		
										var supportedField = this [fieldType];
		
										if (supportedField .getType () === reference .getType ())
										{
											if (reference .isReference (accessType))
											{
												try
												{
													var field = baseNode .getField (fieldId);
		
													if (reference .getType () === field .getType ())
													{
														if (accessType === field .getAccessType ())
															;
														else if (field .getAccessType () === X3DConstants .inputOutput)
														{
															if (accessType !== field .getAccessType ())
																field = this .createUserDefinedField (baseNode, accessType, fieldId, supportedField);
														}
														else
														{
															this .exception ("Field '" + fieldId + "' must have access type " + accessTypeToString (field .getAccessType ()) + ".");
	
															return true;
														}
													}
													else
														field = this .createUserDefinedField (baseNode, accessType, fieldId, supportedField);
												}
												catch (error)
												{
													var field = this .createUserDefinedField (baseNode, accessType, fieldId, supportedField);
												}
		
												field .addReference (reference);
												return true;
											}
		
											throw new Error ("Field '" + fieldId + "' and '" + reference .getName () + "' in PROTO '" + this .getExecutionContext () .getName () + "' are incompatible as an IS mapping.");
										}
		
										throw new Error ("Field '" + fieldId + "' and '" + reference .getName () + "' in PROTO '" + this .getExecutionContext () .getName () + "' have different types.");
									}
		
									throw new Error ("No name give after IS statement.");
								}
		
								throw new Error ("IS statement outside PROTO definition.");
							}
						}
					}
				}
			}

			this .lastIndex  = lastIndex;
			this .lineNumber = lineNumber;

//			this .input      = input;
//			this .lineNumber = lineNumber;

			var field = this .interfaceDeclaration ();
		
			if (field)
			{
				try
				{
					if (field .getAccessType () === X3DConstants .inputOutput)
					{
						var existingField = baseNode .getField (field .getName ());
		
						if (existingField .getAccessType () === X3DConstants .inputOutput)
						{
							if (field .getType () === existingField .getType ())
							{
								existingField .set (field .getValue ());
								existingField .setSet (true);
								return true;
							}
						}
					}
				}
				catch (error)
				{ }

				baseNode .addUserDefinedField (field .getAccessType (), field .getName (), field);
				return true;
			}
		
			return this .nodeBodyElement (baseNode);
		},
		createUserDefinedField: function (baseNode, accessType, fieldId, supportedField)
		{
			var field = new (supportedField .constructor) ();

			baseNode .addUserDefinedField (accessType, fieldId, field);

			return field;
		},
		nodeBody: function (baseNode)
		{
			while (this .nodeBodyElement (baseNode))
				;
		},
		nodeBodyElement: function (baseNode)
		{
			if (this .protoStatement ())
				return true;
		
			if (this .routeStatement ())
				return true;
		
			if (this .Id ())
			{
				var fieldId = this .result [1];

				try
				{
					var field = baseNode .getField (fieldId);
				}
				catch (error)
				{
					throw new Error ("Unknown field '" + fieldId + "' in class '" + baseNode .getTypeName () + "'.");
				}
		
				this .comments ();
		
				if (Grammar .IS .parse (this))
				{
					if (this .isInsideProtoDefinition ())
					{
						if (this .Id ())
						{
							var isId = this .result [1];
		
							try
							{
								var reference = this .getExecutionContext () .getField (isId);
							}
							catch (error)
							{
								this .exception ("No such event or field '" + isId + "' inside PROTO " + this .getExecutionContext () .getName ());
		
								return true;
							}
		
							if (field .getType () === reference .getType ())
							{
								if (reference .isReference (field .getAccessType ()))
								{
									field .addReference (reference);
									return true;
								}
		
								throw new Error ("Field '" + field .getName () + "' and '" + reference .getName () + "' in PROTO " + this .getExecutionContext () . getName () + " are incompatible as an IS mapping.");
							}
		
							throw new Error ("Field '" + field .getName () + "' and '" + reference .getName () + "' in PROTO " + this .getExecutionContext () .getName () + " have different types.");
						}
		
						throw new Error("No name give after IS statement.");
					}
		
					throw new Error ("IS statement outside PROTO definition.");
				}
		
				if (field .isInitializable ())
				{
					if (this .fieldValue (field))
						return true;

					throw new Error ("Couldn't read value for field '" + fieldId + "'.");
				}
		
				throw new Error ("Couldn't assign value to " + accessTypeToString (field .getAccessType ()) + " field '" + fieldId + "'.");
			}
		
			return false;
		},
		profileNameId: function () { return this .Id (); },
		componentNameId: function ()
		{
			this .comments ();

			return Grammar .ComponentNameId .parse (this);
		},
		categoryNameId: function () { return this .Id (); },
		unitNameId: function () { return this .Id (); },
		exportedNodeNameId: function () { return this .Id (); },
		nodeNameId: function () { return this .Id (); },
		nodeTypeId: function () { return this .Id (); },
		initializeOnlyId: function () { return this .Id (); },
		inputOnlyId: function () { return this .Id (); },
		outputOnlyId: function () { return this .Id (); },
		inputOutputId: function () { return this .Id (); },
		Id: function ()
		{
			this .comments ();

			return Grammar .Id .parse (this);
		},
		fieldType: function ()
		{
			this .comments ();

			return Grammar .FieldType .parse (this);
		},
		fieldValue: function (field)
		{
			field .setSet (true);

			return this .fieldTypes [field .getType ()] .call (this, field);
		},
		double: function ()
		{
			this .comments ();
			
			if (Grammar .double .parse (this))
			{
				this .value = parseFloat (this .result [1]);
				return true;
			}

			if (Grammar .Inf .parse (this))
			{
				this .value = Number .POSITIVE_INFINITY;
				return true;
			}

			if (Grammar .NegativeInf .parse (this))
			{
				this .value = Number .NEGATIVE_INFINITY;
				return true;
			}

			if (Grammar .NaN .parse (this))
			{
				this .value = Number .NaN;
				return true;
			}

			return false;
		},
		int32: function ()
		{
			this .comments ();

			if (Grammar .int32 .parse (this))
			{
				this .value = parseInt (this .result [1]);
				return true;
			}

			return false;
		},
		string: function ()
		{
			this .comments ();

			if (Grammar .string .parse (this))
			{
				this .value = Fields .SFString .unescape (this .result [1]);

				if (!this .isXML)
					this .lines (this .value);

				return true;
			}

			return false;
		},
		sfboolValue: function (field)
		{
			this .comments ();

			if (this .isXML)
			{
				if (Grammar .true .parse (this))
				{
					field .set (true);
					return true;
				}

				if (Grammar .false .parse (this))
				{
					field .set (false);
					return true;
				}
			}

			if (Grammar .TRUE .parse (this))
			{
				field .set (true);
				return true;
			}

			if (Grammar .FALSE .parse (this))
			{
				field .set (false);
				return true;
			}

			return false;
		},
		mfboolValue: function (field)
		{
			field .length = 0;

			if (this .sfboolValue (this .SFBool))
			{
				field .push (this .SFBool);
				return true;
			}			

			if (Grammar .OpenBracket .parse (this))
			{
				this .sfboolValues (field);

				this .comments ();

				if (Grammar .CloseBracket .parse (this))
					return true;

				throw new Error ("Expected ']'.");
			}

			return false;
		},
		sfboolValues: function (field)
		{
			field .length = 0;
			field         = field .target;

			while (this .sfboolValue (this .SFBool))
			{
				field .push (this .SFBool);
			}
		},
		sfcolorValue: function (field)
		{
			if (this .double ())
			{
				var r = this .value;
				
				if (this .double ())
				{
					var g = this .value;
					
					if (this .double ())
					{
						var b = this .value;

						field .getValue () .set (r, g, b);
						return true;
					}
				}
			}

			return false;
		},
		mfcolorValue: function (field)
		{
			field .length = 0;

			if (this .sfcolorValue (this .SFColor))
			{
				field .push (this .SFColor);
				return true;
			}			

			if (Grammar .OpenBracket .parse (this))
			{
				this .sfcolorValues (field);

				this .comments ();

				if (Grammar .CloseBracket .parse (this))
					return true;

				throw new Error ("Expected ']'.");
			}

			return false;
		},
		sfcolorValues: function (field)
		{
			field .length = 0;
			field         = field .target;

			while (this .sfcolorValue (this .SFColor))
			{
				field .push (this .SFColor);
			}
		},
		sfcolorrgbaValue: function (field)
		{
			if (this .double ())
			{
				var r = this .value;
				
				if (this .double ())
				{
					var g = this .value;
					
					if (this .double ())
					{
						var b = this .value;

						if (this .double ())
						{
							var a = this .value;

							field .getValue () .set (r, g, b, a);
							return true;
						}
					}
				}
			}

			return false;
		},
		mfcolorrgbaValue: function (field)
		{
			field .length = 0;

			if (this .sfcolorrgbaValue (this .SFColorRGBA))
			{
				field .push (this .SFColorRGBA);
				return true;
			}			

			if (Grammar .OpenBracket .parse (this))
			{
				this .sfcolorrgbaValues (field);

				this .comments ();

				if (Grammar .CloseBracket .parse (this))
					return true;

				throw new Error ("Expected ']'.");
			}

			return false;
		},
		sfcolorrgbaValues: function (field)
		{
			field .length = 0;
			field         = field .target;

			while (this .sfcolorrgbaValue (this .SFColorRGBA))
			{
				field .push (this .SFColorRGBA);
			}
		},
		sfdoubleValue: function (field)
		{
			if (this .double ())
			{
				field .set (this .fromUnit (field .getUnit (), this .value));
				return true;
			}

			return false;
		},
		mfdoubleValue: function (field)
		{
			field .length = 0;

			this .SFDouble .setUnit (field .getUnit ());

			if (this .sfdoubleValue (this .SFDouble))
			{
				field .push (this .SFDouble);
				return true;
			}			

			if (Grammar .OpenBracket .parse (this))
			{
				this .sfdoubleValues (field);

				this .comments ();

				if (Grammar .CloseBracket .parse (this))
					return true;

				throw new Error ("Expected ']'.");
			}

			return false;
		},
		sfdoubleValues: function (field)
		{
			field .length = 0;
			field         = field .target;

			this .SFDouble .setUnit (field .getUnit ());

			while (this .sfdoubleValue (this .SFDouble))
			{
				field .push (this .SFDouble);
			}
		},
		sffloatValue: function (field)
		{
			return this .sfdoubleValue (field);
		},
		mffloatValue: function (field)
		{
			field .length = 0;

			this .SFFloat .setUnit (field .getUnit ());

			if (this .sffloatValue (this .SFFloat))
			{
				field .push (this .SFFloat);
				return true;
			}			

			if (Grammar .OpenBracket .parse (this))
			{
				this .sffloatValues (field);

				this .comments ();

				if (Grammar .CloseBracket .parse (this))
					return true;

				throw new Error ("Expected ']'.");
			}

			return false;
		},
		sffloatValues: function (field)
		{
			field .length = 0;
			field         = field .target;

			this .SFFloat .setUnit (field .getUnit ());

			while (this .sffloatValue (this .SFFloat))
			{
				field .push (this .SFFloat);
			}
		},
		sfimageValue: function (field)
		{
			if (this .int32 ())
			{
				var width = this .value;

				if (this .int32 ())
				{
					var height = this .value;
					
					if (this .int32 ())
					{
						var
							comp  = this .value,
							size  = width * height;

						field .width  = width;
						field .height = height;
						field .comp   = comp;

						var array = field .array;

						for (var i = 0; i < size; ++ i)
						{
							if (this .int32 ())
							{
								array [i] = this .value;
								continue;
							}

							return false;
						}

						return true;
					}
				}
			}

			return false;
		},
		mfimageValue: function (field)
		{
			field .length = 0;

			if (this .sfimageValue (this .SFImage))
			{
				field .push (this .SFImage);
				return true;
			}			

			if (Grammar .OpenBracket .parse (this))
			{
				this .sfimageValues (field);

				this .comments ();

				if (Grammar .CloseBracket .parse (this))
					return true;

				throw new Error ("Expected ']'.");
			}

			return false;
		},
		sfimageValues: function (field)
		{
			field .length = 0;
			field         = field .target;

			while (this .sfimageValue (this .SFImage))
			{
				field .push (this .SFImage);
			}
		},
		sfint32Value: function (field)
		{
			if (this .int32 ())
			{
				field .set (this .value);
				return true;
			}

			return false;
		},
		mfint32Value: function (field)
		{
			field .length = 0;

			if (this .sfint32Value (this .SFInt32))
			{
				field .push (this .SFInt32);
				return true;
			}			

			if (Grammar .OpenBracket .parse (this))
			{
				this .sfint32Values (field);

				this .comments ();

				if (Grammar .CloseBracket .parse (this))
					return true;

				throw new Error ("Expected ']'.");
			}

			return false;
		},
		sfint32Values: function (field)
		{
			field .length = 0;
			field         = field .target;

			while (this .sfint32Value (this .SFInt32))
			{
				field .push (this .SFInt32);
			}
		},			
		sfmatrix3dValue: function (field)
		{
			if (this .double ())
			{
				var m00 = this .value;
				
				if (this .double ())
				{
					var m01 = this .value;
					
					if (this .double ())
					{
						var m02 = this .value;

							if (this .double ())
							{
								var m10 = this .value;
								
								if (this .double ())
								{
									var m11 = this .value;
									
									if (this .double ())
									{
										var m12 = this .value;

										if (this .double ())
										{
											var m20 = this .value;
											
											if (this .double ())
											{
												var m21 = this .value;
												
												if (this .double ())
												{
													var m22 = this .value;

													field .getValue () .set (m00, m01, m02,
													                         m10, m11, m12,
													                         m20, m21, m22);
													return true;
											}
										}
									}
								}
							}
						}
					}
				}
			}								
							
			return false;
		},
		mfmatrix3dValue: function (field)
		{
			field .length = 0;

			if (this .sfmatrix3dValue (this .SFMatrix3d))
			{
				field .push (this .SFMatrix3d);
				return true;
			}			

			if (Grammar .OpenBracket .parse (this))
			{
				this .sfmatrix3dValues (field);

				this .comments ();

				if (Grammar .CloseBracket .parse (this))
					return true;

				throw new Error ("Expected ']'.");
			}

			return false;
		},
		sfmatrix3dValues: function (field)
		{
			field .length = 0;
			field         = field .target;

			while (this .sfmatrix3dValue (this .SFMatrix3d))
			{
				field .push (this .SFMatrix3d);
			}
		},
		sfmatrix3fValue: function (field)
		{
			return this .sfmatrix3dValue (field);
		},
		mfmatrix3fValue: function (field)
		{
			field .length = 0;

			if (this .sfmatrix3fValue (this .SFMatrix3f))
			{
				field .push (this .SFMatrix3f);
				return true;
			}			

			if (Grammar .OpenBracket .parse (this))
			{
				this .sfmatrix3fValues (field);

				this .comments ();

				if (Grammar .CloseBracket .parse (this))
					return true;

				throw new Error ("Expected ']'.");
			}

			return false;
		},
		sfmatrix3fValues: function (field)
		{
			field .length = 0;
			field         = field .target;

			while (this .sfmatrix3fValue (this .SFMatrix3f))
			{
				field .push (this .SFMatrix3f);
			}
		},
		sfmatrix4dValue: function (field)
		{
			if (this .double ())
			{
				var m00 = this .value;
				
				if (this .double ())
				{
					var m01 = this .value;
					
					if (this .double ())
					{
						var m02 = this .value;

						if (this .double ())
						{
							var m03 = this .value;

							if (this .double ())
							{
								var m10 = this .value;
								
								if (this .double ())
								{
									var m11 = this .value;
									
									if (this .double ())
									{
										var m12 = this .value;

										if (this .double ())
										{
											var m13 = this .value;

											if (this .double ())
											{
												var m20 = this .value;
												
												if (this .double ())
												{
													var m21 = this .value;
													
													if (this .double ())
													{
														var m22 = this .value;

														if (this .double ())
														{
															var m23 = this .value;

															if (this .double ())
															{
																var m30 = this .value;
																
																if (this .double ())
																{
																	var m31 = this .value;
																	
																	if (this .double ())
																	{
																		var m32 = this .value;

																		if (this .double ())
																		{
																			var m33 = this .value;

																			field .getValue () .set (m00, m01, m02, m03,
																			                         m10, m11, m12, m13,
																			                         m20, m21, m22, m23,
																			                         m30, m31, m32, m33);
																			return true;
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}								
							
			return false;
		},
		mfmatrix4dValue: function (field)
		{
			field .length = 0;

			if (this .sfmatrix4dValue (this .SFMatrix4d))
			{
				field .push (this .SFMatrix4d);
				return true;
			}			

			if (Grammar .OpenBracket .parse (this))
			{
				this .sfmatrix4dValues (field);

				this .comments ();

				if (Grammar .CloseBracket .parse (this))
					return true;

				throw new Error ("Expected ']'.");
			}

			return false;
		},
		sfmatrix4dValues: function (field)
		{
			field .length = 0;
			field         = field .target;

			while (this .sfmatrix4dValue (this .SFMatrix4d))
			{
				field .push (this .SFMatrix4d);
			}
		},
		sfmatrix4fValue: function (field)
		{
			return this .sfmatrix4dValue (field);
		},
		mfmatrix4fValue: function (field)
		{
			field .length = 0;

			if (this .sfmatrix4fValue (this .SFMatrix4f))
			{
				field .push (this .SFMatrix4f);
				return true;
			}			

			if (Grammar .OpenBracket .parse (this))
			{
				this .sfmatrix4fValues (field);

				this .comments ();

				if (Grammar .CloseBracket .parse (this))
					return true;

				throw new Error ("Expected ']'.");
			}

			return false;
		},
		sfmatrix4fValues: function (field)
		{
			field .length = 0;
			field         = field .target;

			while (this .sfmatrix4fValue (this .SFMatrix4f))
			{
				field .push (this .SFMatrix4f);
			}
		},
		sfnodeValue: function (field)
		{
			var baseNode = this .nodeStatement ();

			if (baseNode !== false)
			{
				field .setValue (baseNode);
				return true;
			}

			return false;
		},
		mfnodeValue: function (field)
		{
			field .length = 0;

			var node = this .nodeStatement ();

			if (node !== false)
			{
				field .push (node);
				return true;
			}			

			if (Grammar .OpenBracket .parse (this))
			{
				this .nodeStatements (field);

				this .comments ();

				if (Grammar .CloseBracket .parse (this))
					return true;

				throw new Error ("Expected ']'.");
			}

			return false;
		},
		nodeStatements: function (field)
		{
			var node = this .nodeStatement ();
		
			while (node !== false)
			{
				field .push (node);
				
				node = this .nodeStatement ();
			}
		},
		sfrotationValue: function (field)
		{
			if (this .double ())
			{
				var x = this .value;
				
				if (this .double ())
				{
					var y = this .value;
					
					if (this .double ())
					{
						var z = this .value;

						if (this .double ())
						{
							var angle = this .value;

							field .getValue () .set (x, y, z, this .fromUnit ("angle", angle));
							return true;
						}
					}
				}
			}

			return false;
		},
		mfrotationValue: function (field)
		{
			field .length = 0;

			if (this .sfrotationValue (this .SFRotation))
			{
				field .push (this .SFRotation);
				return true;
			}			

			if (Grammar .OpenBracket .parse (this))
			{
				this .sfrotationValues (field);

				this .comments ();

				if (Grammar .CloseBracket .parse (this))
					return true;

				throw new Error ("Expected ']'.");
			}

			return false;
		},
		sfrotationValues: function (field)
		{
			field .length = 0;
			field         = field .target;

			while (this .sfrotationValue (this .SFRotation))
			{
				field .push (this .SFRotation);
			}
		},
		sfstringValue: function (field)
		{
			if (this .string ())
			{
				field .set (this .value);
				return true;
			}

			return false;
		},
		mfstringValue: function (field)
		{
			field .length = 0;

			if (this .sfstringValue (this .SFString))
			{
				field .push (this .SFString);
				return true;
			}			

			if (Grammar .OpenBracket .parse (this))
			{
				this .sfstringValues (field);

				this .comments ();

				if (Grammar .CloseBracket .parse (this))
					return true;

				throw new Error ("Expected ']'.");
			}

			return false;
		},
		sfstringValues: function (field)
		{
			field .length = 0;
			field         = field .target;

			while (this .sfstringValue (this .SFString))
			{
				field .push (this .SFString);
			}
		},
		sftimeValue: function (field)
		{
			return this .sfdoubleValue (field);
		},
		mftimeValue: function (field)
		{
			field .length = 0;

			if (this .sftimeValue (this .SFTime))
			{
				field .push (this .SFTime);
				return true;
			}			

			if (Grammar .OpenBracket .parse (this))
			{
				this .sftimeValues (field);

				this .comments ();

				if (Grammar .CloseBracket .parse (this))
					return true;

				throw new Error ("Expected ']'.");
			}

			return false;
		},
		sftimeValues: function (field)
		{
			field .length = 0;
			field         = field .target;

			while (this .sftimeValue (this .SFTime))
			{
				field .push (this .SFTime);
			}
		},
		sfvec2dValue: function (field)
		{
			if (this .double ())
			{
				var x = this .value;
				
				if (this .double ())
				{
					var
						y        = this .value,
						category = field .getUnit ();

					field .getValue () .set (this .fromUnit (category, x),
					                         this .fromUnit (category, y));
					return true;
				}
			}

			return false;
		},
		mfvec2dValue: function (field)
		{
			field .length = 0;

			this .SFVec2d .setUnit (field .getUnit ());

			if (this .sfvec2dValue (this .SFVec2d))
			{
				field .push (this .SFVec2d);
				return true;
			}			

			if (Grammar .OpenBracket .parse (this))
			{
				this .sfvec2dValues (field);

				this .comments ();

				if (Grammar .CloseBracket .parse (this))
					return true;

				throw new Error ("Expected ']'.");
			}

			return false;
		},
		sfvec2dValues: function (field)
		{
			field .length = 0;
			field         = field .target;

			this .SFVec2d .setUnit (field .getUnit ());

			while (this .sfvec2dValue (this .SFVec2d))
			{
				field .push (this .SFVec2d);
			}
		},
		sfvec2fValue: function (field)
		{
			return this .sfvec2dValue (field);
		},
		mfvec2fValue: function (field)
		{
			field .length = 0;

			this .SFVec2f .setUnit (field .getUnit ());

			if (this .sfvec2fValue (this .SFVec2f))
			{
				field .push (this .SFVec2f);
				return true;
			}			

			if (Grammar .OpenBracket .parse (this))
			{
				this .sfvec2fValues (field);

				this .comments ();

				if (Grammar .CloseBracket .parse (this))
					return true;

				throw new Error ("Expected ']'.");
			}

			return false;
		},
		sfvec2fValues: function (field)
		{
			field .length = 0;
			field         = field .target;

			this .SFVec2f .setUnit (field .getUnit ());

			while (this .sfvec2fValue (this .SFVec2f))
			{
				field .push (this .SFVec2f);
			}
		},
		sfvec3dValue: function (field)
		{
			if (this .double ())
			{
				var x = this .value;
				
				if (this .double ())
				{
					var y = this .value;
					
					if (this .double ())
					{
						var
							z        = this .value,
							category = field .getUnit ();

						field .getValue () .set (this .fromUnit (category, x),
						                         this .fromUnit (category, y),
						                         this .fromUnit (category, z));
						return true;
					}
				}
			}

			return false;
		},
		mfvec3dValue: function (field)
		{
			field .length = 0;

			this .SFVec3d .setUnit (field .getUnit ());

			if (this .sfvec3dValue (this .SFVec3d))
			{
				field .push (this .SFVec3d);
				return true;
			}			

			if (Grammar .OpenBracket .parse (this))
			{
				this .sfvec3dValues (field);

				this .comments ();

				if (Grammar .CloseBracket .parse (this))
					return true;

				throw new Error ("Expected ']'.");
			}

			return false;
		},
		sfvec3dValues: function (field)
		{
			field .length = 0;
			field         = field .target;

			this .SFVec3d .setUnit (field .getUnit ());

			while (this .sfvec3dValue (this .SFVec3d))
			{
				field .push (this .SFVec3d);
			}
		},
		sfvec3fValue: function (field)
		{
			return this .sfvec3dValue (field);
		},
		mfvec3fValue: function (field)
		{
			field .length = 0;

			this .SFVec3f .setUnit (field .getUnit ());

			if (this .sfvec3fValue (this .SFVec3f))
			{
				field .push (this .SFVec3f);
				return true;
			}			

			if (Grammar .OpenBracket .parse (this))
			{
				this .sfvec3fValues (field);

				this .comments ();

				if (Grammar .CloseBracket .parse (this))
					return true;

				throw new Error ("Expected ']'.");
			}

			return false;
		},
		sfvec3fValues: function (field)
		{
			field .length = 0;
			field         = field .target;

			this .SFVec3f .setUnit (field .getUnit ());

			while (this .sfvec3fValue (this .SFVec3f))
			{
				field .push (this .SFVec3f);
			}
		},
		sfvec4dValue: function (field)
		{
			if (this .double ())
			{
				var x = this .value;
				
				if (this .double ())
				{
					var y = this .value;
					
					if (this .double ())
					{
						var z = this .value;

						if (this .double ())
						{
							var
								w        = this .value,
								category = field .getUnit ();

							field .getValue () .set (this .fromUnit (category, x),
							                         this .fromUnit (category, y),
							                         this .fromUnit (category, z),
							                         this .fromUnit (category, w));
							return true;
						}
					}
				}
			}

			return false;
		},
		mfvec4dValue: function (field)
		{
			field .length = 0;

			this .SFVec4d .setUnit (field .getUnit ());

			if (this .sfvec4dValue (this .SFVec4d))
			{
				field .push (this .SFVec4d);
				return true;
			}			

			if (Grammar .OpenBracket .parse (this))
			{
				this .sfvec4dValues (field);

				this .comments ();

				if (Grammar .CloseBracket .parse (this))
					return true;

				throw new Error ("Expected ']'.");
			}

			return false;
		},
		sfvec4dValues: function (field)
		{
			field .length = 0;
			field         = field .target;

			this .SFVec4d .setUnit (field .getUnit ());

			while (this .sfvec4dValue (this .SFVec4d))
			{
				field .push (this .SFVec4d);
			}
		},
		sfvec4fValue: function (field)
		{
			return this .sfvec4dValue (field);
		},
		mfvec4fValue: function (field)
		{
			field .length = 0;

			this .SFVec4f .setUnit (field .getUnit ());

			if (this .sfvec4fValue (this .SFVec4f))
			{
				field .push (this .SFVec4f);
				return true;
			}			

			if (Grammar .OpenBracket .parse (this))
			{
				this .sfvec4fValues (field);

				this .comments ();

				if (Grammar .CloseBracket .parse (this))
					return true;

				throw new Error ("Expected ']'.");
			}

			return false;
		},
		sfvec4fValues: function (field)
		{
			field .length = 0;
			field         = field .target;

			this .SFVec4f .setUnit (field .getUnit ());

			while (this .sfvec4fValue (this .SFVec4f))
			{
				field .push (this .SFVec4f);
			}
		},
	});

	Parser .prototype .fieldTypes = [ ];
	Parser .prototype .fieldTypes [X3DConstants .SFBool]      = Parser .prototype .sfboolValue;
	Parser .prototype .fieldTypes [X3DConstants .SFColor]     = Parser .prototype .sfcolorValue;
	Parser .prototype .fieldTypes [X3DConstants .SFColorRGBA] = Parser .prototype .sfcolorrgbaValue;
	Parser .prototype .fieldTypes [X3DConstants .SFDouble]    = Parser .prototype .sfdoubleValue;
	Parser .prototype .fieldTypes [X3DConstants .SFFloat]     = Parser .prototype .sffloatValue;
	Parser .prototype .fieldTypes [X3DConstants .SFImage]     = Parser .prototype .sfimageValue;
	Parser .prototype .fieldTypes [X3DConstants .SFInt32]     = Parser .prototype .sfint32Value;
	Parser .prototype .fieldTypes [X3DConstants .SFMatrix3f]  = Parser .prototype .sfmatrix4dValue;
	Parser .prototype .fieldTypes [X3DConstants .SFMatrix3d]  = Parser .prototype .sfmatrix4fValue;
	Parser .prototype .fieldTypes [X3DConstants .SFMatrix4f]  = Parser .prototype .sfmatrix4dValue;
	Parser .prototype .fieldTypes [X3DConstants .SFMatrix4d]  = Parser .prototype .sfmatrix4fValue;
	Parser .prototype .fieldTypes [X3DConstants .SFNode]      = Parser .prototype .sfnodeValue;
	Parser .prototype .fieldTypes [X3DConstants .SFRotation]  = Parser .prototype .sfrotationValue;
	Parser .prototype .fieldTypes [X3DConstants .SFString]    = Parser .prototype .sfstringValue;
	Parser .prototype .fieldTypes [X3DConstants .SFTime]      = Parser .prototype .sftimeValue;
	Parser .prototype .fieldTypes [X3DConstants .SFVec2d]     = Parser .prototype .sfvec2dValue;
	Parser .prototype .fieldTypes [X3DConstants .SFVec2f]     = Parser .prototype .sfvec2fValue;
	Parser .prototype .fieldTypes [X3DConstants .SFVec3d]     = Parser .prototype .sfvec3dValue;
	Parser .prototype .fieldTypes [X3DConstants .SFVec3f]     = Parser .prototype .sfvec3fValue;
	Parser .prototype .fieldTypes [X3DConstants .SFVec4d]     = Parser .prototype .sfvec4dValue;
	Parser .prototype .fieldTypes [X3DConstants .SFVec4f]     = Parser .prototype .sfvec4fValue;

	Parser .prototype .fieldTypes [X3DConstants .MFBool]      = Parser .prototype .mfboolValue;
	Parser .prototype .fieldTypes [X3DConstants .MFColor]     = Parser .prototype .mfcolorValue;
	Parser .prototype .fieldTypes [X3DConstants .MFColorRGBA] = Parser .prototype .mfcolorrgbaValue;
	Parser .prototype .fieldTypes [X3DConstants .MFDouble]    = Parser .prototype .mfdoubleValue;
	Parser .prototype .fieldTypes [X3DConstants .MFFloat]     = Parser .prototype .mffloatValue;
	Parser .prototype .fieldTypes [X3DConstants .MFImage]     = Parser .prototype .mfimageValue;
	Parser .prototype .fieldTypes [X3DConstants .MFInt32]     = Parser .prototype .mfint32Value;
	Parser .prototype .fieldTypes [X3DConstants .MFMatrix3d]  = Parser .prototype .mfmatrix3dValue;
	Parser .prototype .fieldTypes [X3DConstants .MFMatrix3f]  = Parser .prototype .mfmatrix3fValue;
	Parser .prototype .fieldTypes [X3DConstants .MFMatrix4d]  = Parser .prototype .mfmatrix4dValue;
	Parser .prototype .fieldTypes [X3DConstants .MFMatrix4f]  = Parser .prototype .mfmatrix4fValue;
	Parser .prototype .fieldTypes [X3DConstants .MFNode]      = Parser .prototype .mfnodeValue;
	Parser .prototype .fieldTypes [X3DConstants .MFRotation]  = Parser .prototype .mfrotationValue;
	Parser .prototype .fieldTypes [X3DConstants .MFString]    = Parser .prototype .mfstringValue;
	Parser .prototype .fieldTypes [X3DConstants .MFTime]      = Parser .prototype .mftimeValue;
	Parser .prototype .fieldTypes [X3DConstants .MFVec2d]     = Parser .prototype .mfvec2dValue;
	Parser .prototype .fieldTypes [X3DConstants .MFVec2f]     = Parser .prototype .mfvec2fValue;
	Parser .prototype .fieldTypes [X3DConstants .MFVec3d]     = Parser .prototype .mfvec3dValue;
	Parser .prototype .fieldTypes [X3DConstants .MFVec3f]     = Parser .prototype .mfvec3fValue;
	Parser .prototype .fieldTypes [X3DConstants .MFVec4d]     = Parser .prototype .mfvec4dValue;
	Parser .prototype .fieldTypes [X3DConstants .MFVec4f]     = Parser .prototype .mfvec4fValue;

	return Parser;
});
