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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Basic/X3DField",
	"x_ite/Basic/X3DArrayField",
	"x_ite/Fields",
	"x_ite/Browser/X3DBrowser",
	"x_ite/Configuration/ComponentInfo",
	"x_ite/Configuration/ComponentInfoArray",
	"x_ite/Configuration/ProfileInfo",
	"x_ite/Configuration/ProfileInfoArray",
	"x_ite/Configuration/UnitInfo",
	"x_ite/Configuration/UnitInfoArray",
	"x_ite/Execution/X3DExecutionContext",
	"x_ite/Execution/X3DScene",
	"x_ite/Prototype/ExternProtoDeclarationArray",
	"x_ite/Prototype/ProtoDeclarationArray",
	"x_ite/Prototype/X3DExternProtoDeclaration",
	"x_ite/Prototype/X3DProtoDeclaration",
	"x_ite/Routing/RouteArray",
	"x_ite/Routing/X3DRoute",
	"x_ite/Browser/Scripting/evaluate",
	"x_ite/Components/Scripting/X3DScriptNode",
	"x_ite/InputOutput/FileLoader",
	"x_ite/Bits/X3DConstants",
],
function ($,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DField,
          X3DArrayField,
          Fields,
          X3DBrowser,
          ComponentInfo,
          ComponentInfoArray,
          ProfileInfo,
          ProfileInfoArray,
          UnitInfo,
          UnitInfoArray,
          X3DExecutionContext,
          X3DScene,
          ExternProtoDeclarationArray,
          ProtoDeclarationArray,
          X3DExternProtoDeclaration,
          X3DProtoDeclaration,
          RouteArray,
          X3DRoute,
          evaluate,
          X3DScriptNode, 
          FileLoader,
          X3DConstants)
{
	function Script (executionContext)
	{
		X3DScriptNode .call (this, executionContext);
		
		this .addChildObjects ("buffer", new Fields .SFTime ());

		this .addType (X3DConstants .Script);
	}

	Script .prototype = Object .assign (Object .create (X3DScriptNode .prototype),
	{
		constructor: Script,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",     new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "url",          new Fields .MFString ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "directOutput", new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "mustEvaluate", new Fields .SFBool ()),
		]),
		getTypeName: function ()
		{
			return "Script";
		},
		getComponentName: function ()
		{
			return "Scripting";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DScriptNode .prototype .initialize .call (this);

			this .url_    .addInterest ("set_url__",    this);
			this .buffer_ .addInterest ("set_buffer__", this);

			var userDefinedFields = this .getUserDefinedFields ();

			for (var field of userDefinedFields .values ())
				field .setSet (false);

			this .set_url__ ();
		},
		set_url__: function ()
		{
			this .setLoadState (X3DConstants .NOT_STARTED_STATE);

			this .requestAsyncLoad ();
		},
		getExtendedEventHandling: function ()
		{
			return false;
		},
		hasUserDefinedFields: function ()
		{
			return true;
		},
		getSourceText: function ()
		{
			return this .url_;
		},
		requestAsyncLoad: function ()
		{
			if (this .checkLoadState () === X3DConstants .COMPLETE_STATE || this .checkLoadState () === X3DConstants .IN_PROGRESS_STATE)
				return;

			if (this .url_ .length === 0)
				return;

			this .setLoadState (X3DConstants .IN_PROGRESS_STATE);

			this .buffer_ .addEvent ();
		},
		set_buffer__: function ()
		{
			new FileLoader (this) .loadScript (this .url_,
			function (data)
			{
				if (data === null)
				{
					// No URL could be loaded.
					this .setLoadState (X3DConstants .FAILED_STATE);
				}
				else
				{
					this .setLoadState (X3DConstants .COMPLETE_STATE);
					this .initialize__ (data);
				}
			}
			.bind (this));
		},
		getContext: function (text)
		{
			try
			{
				var
					callbacks         = ["initialize", "prepareEvents", "eventsProcessed", "shutdown"],
					userDefinedFields = this .getUserDefinedFields ();

				for (var field of userDefinedFields .values ())
				{
					switch (field .getAccessType ())
					{
						case X3DConstants .inputOnly:
							callbacks .push (field .getName ());
							break;
						case X3DConstants .inputOutput:
							callbacks .push ("set_" + field .getName ());
							break;
					}
				}

				text += "\n;var " + callbacks .join (",") + ";";
				text += "\n[" + callbacks .join (",") + "];";

				var
					global  = this .getGlobal (),
					result  = evaluate (global, text),
					context = { };

				for (var i = 0; i < callbacks .length; ++ i)
				{
					if (typeof result [i] === "function")
						context [callbacks [i]] = result [i];
					else
						context [callbacks [i]] = null;
				}

				return context;
			}
			catch (error)
			{
				this .setError ("while evaluating script source", error);

				return { };
			}
		},
		getGlobal: function ()
		{
			var browser = this .getBrowser ();

			function SFNode (vrmlSyntax)
			{
				var scene = browser .createX3DFromString (String (vrmlSyntax));

				if (scene .getRootNodes () .length && scene .getRootNodes () [0])
					return Fields .SFNode .call (this, scene .getRootNodes () [0] .getValue ());

				throw new Error ("SFNode.new: invalid argument, must be 'string' is 'undefined'.");
			}

			SFNode .prototype = Object .create (Fields .SFNode .prototype);
			SFNode .prototype .constructor = SFNode;

			var global =
			{
				NULL:  { value: null },
				FALSE: { value: false },
				TRUE:  { value: true },
				print: { value: function () { browser .println .apply (browser, arguments); }},
				trace: { value: function () { browser .println .apply (browser, arguments); }},

				Browser: { value: browser },

				X3DConstants:                { value: X3DConstants },
				X3DBrowser:                  { value: X3DBrowser },
				X3DExecutionContext:         { value: X3DExecutionContext },
				X3DScene:                    { value: X3DScene },
				ComponentInfo:               { value: ComponentInfo },
				ComponentInfoArray:          { value: ComponentInfoArray },
				ProfileInfo:                 { value: ProfileInfo },
				ProfileInfoArray:            { value: ProfileInfoArray },
				UnitInfo:                    { value: UnitInfo },
				UnitInfoArray:               { value: UnitInfoArray },
				ExternProtoDeclarationArray: { value: ExternProtoDeclarationArray },
				ProtoDeclarationArray:       { value: ProtoDeclarationArray },
				X3DExternProtoDeclaration:   { value: X3DExternProtoDeclaration },
				X3DProtoDeclaration:         { value: X3DProtoDeclaration },
				RouteArray:                  { value: RouteArray },
				X3DRoute:                    { value: X3DRoute },

				X3DFieldDefinition:   { value: X3DFieldDefinition },
				FieldDefinitionArray: { value: FieldDefinitionArray },

				X3DField:      { value: X3DField },
				X3DArrayField: { value: X3DArrayField },

				SFColor:       { value: Fields .SFColor },
				SFColorRGBA:   { value: Fields .SFColorRGBA },
				SFImage:       { value: Fields .SFImage },
				SFMatrix3d:    { value: Fields .SFMatrix3d },
				SFMatrix3f:    { value: Fields .SFMatrix3f },
				SFMatrix4d:    { value: Fields .SFMatrix4d },
				SFMatrix4f:    { value: Fields .SFMatrix4f },
				SFNode:        { value: SFNode },
				SFRotation:    { value: Fields .SFRotation },
				SFVec2d:       { value: Fields .SFVec2d },
				SFVec2f:       { value: Fields .SFVec2f },
				SFVec3d:       { value: Fields .SFVec3d },
				SFVec3f:       { value: Fields .SFVec3f },
				SFVec4d:       { value: Fields .SFVec4d },
				SFVec4f:       { value: Fields .SFVec4f },
				VrmlMatrix:    { value: Fields .VrmlMatrix },

				MFBool:        { value: Fields .MFBool },
				MFColor:       { value: Fields .MFColor },
				MFColorRGBA:   { value: Fields .MFColorRGBA },
				MFDouble:      { value: Fields .MFDouble },
				MFFloat:       { value: Fields .MFFloat },
				MFImage:       { value: Fields .MFImage },
				MFInt32:       { value: Fields .MFInt32 },
				MFMatrix3d:    { value: Fields .MFMatrix3d },
				MFMatrix3f:    { value: Fields .MFMatrix3f },
				MFMatrix4d:    { value: Fields .MFMatrix4d },
				MFMatrix4f:    { value: Fields .MFMatrix4f },
				MFNode:        { value: Fields .MFNode },
				MFRotation:    { value: Fields .MFRotation },
				MFString:      { value: Fields .MFString },
				MFTime:        { value: Fields .MFTime },
				MFVec2d:       { value: Fields .MFVec2d },
				MFVec2f:       { value: Fields .MFVec2f },
				MFVec3d:       { value: Fields .MFVec3d },
				MFVec3f:       { value: Fields .MFVec3f },
				MFVec4d:       { value: Fields .MFVec4d },
				MFVec4f:       { value: Fields .MFVec4f },
			};

			var userDefinedFields = this .getUserDefinedFields ();

			for (var field of userDefinedFields .values ())
			{
				var name = field .getName ();

				if (field .getAccessType () === X3DConstants .inputOnly)
					continue;

				if (! (name in global))
				{
					global [name] =
					{
						get: field .valueOf .bind (field),
						set: field .setValue .bind (field),
					};
				}

				if (field .getAccessType () === X3DConstants .inputOutput)
				{
					global [name + "_changed"] =
					{
						get: field .valueOf .bind (field),
						set: field .setValue .bind (field),
					};
				}
			}

			return Object .create (Object .prototype, global);
		},
		set_live__: function ()
		{
			var userDefinedFields = this .getUserDefinedFields ();

			if (this .isLive () .getValue ())
			{
				if ($.isFunction (this .context .prepareEvents))
					this .getBrowser () .prepareEvents () .addInterest ("prepareEvents__", this);

				if ($.isFunction (this .context .eventsProcessed))
					this .addInterest ("eventsProcessed__", this);

				for (var field of userDefinedFields .values ())
				{
					switch (field .getAccessType ())
					{
						case X3DConstants .inputOnly:
						{
							var callback = this .context [field .getName ()];

							if ($.isFunction (callback))
								field .addInterest ("set_field__", this, callback);

							break;
						}
						case X3DConstants .inputOutput:
						{
							var callback = this .context ["set_" + field .getName ()];

							if ($.isFunction (callback))
								field .addInterest ("set_field__", this, callback);

							break;
						}
					}
				}
			}
			else
			{
				if (this .context .prepareEvents)
					this .getBrowser () .prepareEvents () .removeInterest ("prepareEvents__", this);

				if (this .context .eventsProcessed)
					this .removeInterest ("eventsProcessed__", this);

				for (var field of userDefinedFields .values ())
				{
					switch (field .getAccessType ())
					{
						case X3DConstants .inputOnly:
						case X3DConstants .inputOutput:
							field .removeInterest ("set_field__", this);
							break;
					}
				}
			}
		},
		initialize__: function (text)
		{
			this .context = this .getContext (text);

			this .isLive () .addInterest ("set_live__", this);

			this .set_live__ ();

			// Call initialize function.

			if (this .context .initialize)
			{
				var browser = this .getBrowser ();

				browser .getScriptStack () .push (this);

				try
				{
					this .context .initialize ();
				}
				catch (error)
				{
					this .setError ("in function 'initialize'", error);
				}

				browser .getScriptStack () .pop ();
			}

			// Call outstanding events.

			var userDefinedFields = this .getUserDefinedFields ();

			for (var field of userDefinedFields .values ())
			{
				if (field .getSet ())
				{
					var callback = this .context [field .getName ()];

					if ($.isFunction (callback))
						this .set_field__ (field, callback);
				}
			}
		},
		prepareEvents__: function ()
		{
			var browser = this .getBrowser ();

			browser .getScriptStack () .push (this);

			try
			{
				this .context .prepareEvents (browser .getCurrentTime ());
				browser .addBrowserEvent ();
			}
			catch (error)
			{
				this .setError ("in function 'prepareEvents'", error);
			}

			browser .getScriptStack () .pop ();
		},
		set_field__: function (field, callback)
		{
			var browser = this .getBrowser ();

			field .setTainted (true);
			browser .getScriptStack () .push (this);

			try
			{
				callback (field .valueOf (), browser .getCurrentTime ());
			}
			catch (error)
			{
				this .setError ("in function '" + field .getName () + "'", error);
			}

			browser .getScriptStack () .pop ();
			field .setTainted (false);
		},
		eventsProcessed__: function ()
		{
			var browser = this .getBrowser ();

			browser .getScriptStack () .push (this);

			try
			{
				this .context .eventsProcessed ();
			}
			catch (error)
			{
				this .setError ("in function 'eventsProcessed'", error);
			}

			browser .getScriptStack () .pop ();
		},
		shutdown__: function ()
		{
			var browser = this .getBrowser ();

			browser .getScriptStack () .push (this);

			try
			{
				this .context .shutdown ();
			}
			catch (error)
			{
				this .setError ("in function 'shutdown'", error);
			}

			browser .getScriptStack () .pop ();
		},
		setError: function (reason, error)
		{
			console .error ("JavaScript Error in Script '" + this .getName () + "', " + reason + "\nworld url is '" + this .getExecutionContext () .getURL () + "':");
			console .error (error);
		},
	});

	return Script;
});

