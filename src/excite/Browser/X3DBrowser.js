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
 * This file is part of the Excite X3D Project.
 *
 * Excite X3D is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite X3D is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite X3D.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"excite/Browser/VERSION",
	"excite/Base/Events",
	"excite/Fields",
	"excite/Browser/X3DBrowserContext",
	"excite/Configuration/ComponentInfo",
	"excite/Configuration/SupportedProfiles",
	"excite/Configuration/SupportedComponents",
	"excite/Configuration/SupportedNodes",
	"excite/Execution/Scene",
	"excite/Execution/X3DScene",
	"excite/InputOutput/FileLoader",
	"excite/Parser/XMLParser",
	"excite/Bits/X3DConstants",
	"locale/gettext",
],
function ($,
          VERSION,
          Events,
          Fields,
          X3DBrowserContext,
          ComponentInfo,
          SupportedProfiles,
          SupportedComponents,
          SupportedNodes,
          Scene,
          X3DScene,
          FileLoader,
          XMLParser,
          X3DConstants,
          _)
{
"use strict";

	function X3DBrowser (element)
	{
		X3DBrowserContext .call (this, element);

		this .currentSpeed         = 0;
		this .currentFrameRate     = 0;
		this .description_         = "";
		this .supportedNodes       = SupportedNodes;
		this .supportedComponents  = SupportedComponents (this);
		this .supportedProfiles    = SupportedProfiles (this);
		this .components           = { };
	};

	X3DBrowser .prototype = $.extend (Object .create (X3DBrowserContext .prototype),
	{
		constructor: X3DBrowser,
		getTypeName: function ()
		{
			return "X3DBrowser";
		},
		getComponentName: function ()
		{
			return "Excite";
		},
		getContainerField: function ()
		{
			return "browser";
		},
		initialize: function ()
		{
			this .replaceWorld (this .createScene ());

			X3DBrowserContext .prototype .initialize .call (this);

			this .getLoadSensor () .loadTime_ .addInterest ("realize", this);

			this .print ("Welcome to " + this .name + " X3D Browser " + this .version + ":\n" +
			                "        Current Graphics Renderer\n" +
			                "                Name: " + this .getVendor () + " " + this .getWebGLVersion () + "\n" +
			                "                Shading language: " + this .getShadingLanguageVersion () + "\n" +
			                "        Rendering Properties\n" +
			                "                Antialiased: " + this .getAntialiased () + "\n" +
			                "                Depth size: " + this .getDepthSize () + " bits\n" +
			                "                Color depth: " + this .getColorDepth () + " bits\n" +
			                "                Max clip planes: 6\n" +
			                "                Max lights: 8\n" +
			                "                Texture units: " + this .getMaxTextureUnits () + " / " + this .getMaxCombinedTextureUnits () + "\n" +
			                "                Max texture size: " + this .getMaxTextureSize () + " × " + this .getMaxTextureSize () + " pixel\n" +
			                "                Texture memory: " + this .getTextureMemory () + "\n" +
			                "                Max vertex uniform vectors: " + this .getMaxVertexUniformVectors () + "\n" +
			                "                Max fragment uniform vectors: " + this .getMaxFragmentUniformVectors () + "\n" +
			                "                Max vertex attribs: " + this .getMaxVertexAttribs () + "\n");

			
		},
		realize: function ()
		{
			this .getLoadSensor () .loadTime_ .removeInterest ("realize", this);

			var urlCharacters = this .getElement () [0] .getAttribute ("src");

			if (urlCharacters)
				urlCharacters = '"' + urlCharacters + '"';
			else
				urlCharacters = this .getElement () [0] .getAttribute ("url");

			this .load (urlCharacters);
		},
		getName: function ()
		{
			return this .name;
		},
		getVersion: function ()
		{
			return this .version;
		},
		getCurrentSpeed: function ()
		{
			return this .currentSpeed;
		},
		getCurrentFrameRate: function ()
		{
			return this .currentFrameRate;
		},
		setDescription: function (value)
		{
			this .description = value;
		},
		getWorldURL: function ()
		{
			return this .currentScene .worldURL;
		},
		getProfile: function (name)
		{
			var profile = this .supportedProfiles .get (name);

			if (profile)
				return profile;

			throw Error ("Profile '" + name + "' is not supported.");
		},
		getComponent: function (name, level)
		{
			var component = this .supportedComponents .get (name);

			if (component)
			{
				//if (level <= component .level)
				//{
					return new ComponentInfo (this,
					{
						title: component .title,
						name:  name,
						level: level,
						providerUrl: this .getProviderUrl ()
					});
				//}
			}

			throw Error ("Component '" + name + "' at level '" + level + "' is not supported.");
		},
		createScene: function ()
		{
		   var scene = new Scene (this);

			scene .setup ();

			if (this .isExternal ())
			   return scene;

			scene .setLive (true);

			return scene;
		},
		replaceWorld: function (scene)
		{
			// Cancel any loading.

			this .loadCount_       .removeInterest ("set_loadCount__", this);
			this .prepareEvents () .removeInterest ("bind", this);

			if (this .loader)
				this .loader .abort ();

			// Remove world.

			if (this .getWorld ())
			{
				this .getExecutionContext () .setLive (false);
				this .shutdown () .processInterests ();
			}

			// Clear event cache.
			Events .clear ();

			// Replace world.

			if (scene instanceof Fields .MFNode)
			{
				// VRML version of replaceWorld has a MFNode value as argument.

				var rootNodes = scene;

				scene = this .createScene ();

				for (var i = 0, length = rootNodes .length; i < length; ++ i)
					scene .isLive () .addInterest (rootNodes [i] .getValue () .getExecutionContext () .isLive ());

				scene .setRootNodes (rootNodes);
			}

			if (! (scene instanceof X3DScene))
				scene = this .createScene ();
			
			// bindWorld
			this .description = "";

			this .setBrowserLoading (true);
			this .loadCount_ .addInterest ("set_loadCount__", this);
	
			for (var id in scene .getLoadingObjects ())
				this .addLoadCount (scene .getLoadingObjects () [id]);

			scene .setLive (this .isLive () .getValue ())

			this .setExecutionContext (scene);

			this .initialized () .setValue (this .getCurrentTime ());
		},
		set_loadCount__: function (loadCount)
		{
			if (loadCount .getValue ())
				return;

			this .loadCount_ .removeInterest ("set_loadCount__", this);

			this .prepareEvents () .addInterest ("bind", this);
			this .addBrowserEvent ();
		},
		bind: function ()
		{
			this .prepareEvents () .removeInterest ("bind", this);

			this .getWorld () .bind ();
			this .setBrowserLoading (false);
		},
		createVrmlFromString: function (vrmlSyntax)
		{
		   var rootNodes = new Fields .MFNode ();

			rootNodes .setValue (this .createX3DFromString (vrmlSyntax) .rootNodes);

			return rootNodes;
		},
		createX3DFromString: function (x3dSyntax)
		{
			var
				currentScene = this .currentScene,
				external     = this .isExternal (),
				scene        = new FileLoader (this .getWorld ()) .createX3DFromString (this .currentScene .getURL (), x3dSyntax);

			if (! external)
			{
				scene .setExecutionContext (currentScene);
				currentScene .isLive () .addInterest ("setLive", scene);

				if (currentScene .isLive () .getValue ())
					scene .setLive (true);
			}

			scene .setup ();

			return scene;
		},
		createVrmlFromURL: function (url, node, event)
		{
			if (! (node instanceof Fields .SFNode))
				throw new Error ("Browser.createVrmlFromURL: node must be of type SFNode.");

			if (! node .getValue ())
				throw new Error ("Browser.createVrmlFromURL: node IS NULL.");

			var field = node .getValue () .getField (event);

			if (! field .isInput ())
				throw new Error ("Browser.createVrmlFromURL: event named '" + event + "' must be a input field.");

			if (field .getType () !== X3DConstants .MFNode)
				throw new Error ("Browser.createVrmlFromURL: event named '" + event + "' must be of type MFNode.");

			var
				currentScene = this .currentScene,
				external     = this .isExternal (),
				loader       = new FileLoader (this .getWorld ());

			this .addLoadCount (loader);

			loader .createX3DFromURL (url, null,
			function (scene)
			{
				this .removeLoadCount (loader);

				if (scene)
				{
					// Handle isLive for script scenes here:

				   if (! external)
				   {
						scene .setExecutionContext (currentScene);
				      currentScene .isLive () .addInterest ("setLive", scene);

						if (currentScene .isLive () .getValue ())
						   scene .setLive (true);
					}

					scene .setup ();
				   
					// Wait until scene is completely loaded, scene .loadCount_ must be 0.
					field .setValue (scene .rootNodes);
				}
			}
			.bind (this));
		},
		createX3DFromURL: function (url, event, node)
		{
			if (arguments .length === 3)
				return this .createVrmlFromURL (url, event, node);

			var
				currentScene = this .currentScene,
				external     = this .isExternal (),
				scene        = new FileLoader (this .getWorld ()) .createX3DFromURL (url, null);

			if (! external)
			{
				scene .setExecutionContext (currentScene);
				currentScene .isLive () .addInterest ("setLive", scene);
						
				if (currentScene .isLive () .getValue ())
					scene .setLive (true);
			}

			scene .setup ();

			return scene;
		},
		loadURL: function (url, parameter)
		{
			// Cancel any loading.

			this .loadCount_       .removeInterest ("set_loadCount__", this);
			this .prepareEvents () .removeInterest ("bind", this);

			if (this .loader)
				this .loader .abort ();

			// Start loading.

			this .setBrowserLoading (true);
			this .addLoadCount (this);

			this .loader = new FileLoader (this .getWorld ());

			this .loader .createX3DFromURL (url, parameter,
			function (scene)
			{
				if (! this .getBrowserOptions () .getSplashScreen ())
					this .getCanvas () .fadeIn (0);

				if (scene)
					this .replaceWorld (scene);
				else
					setTimeout (function () { this .getSplashScreen () .find (".excite-private-spinner-text") .text (_ ("Failed loading world.")); } .bind (this), 31);

				// Must not remove load count, replaceWorld does a resetLoadCount when it sets setBrowserLoading to true.
				// Don't set browser loading to false.
			}
			.bind (this),
			function (fragment)
			{
				this .currentScene .changeViewpoint (fragment);
				this .removeLoadCount (id);
				this .setBrowserLoading (false);
			}
			.bind (this),
			function (url, target)
			{
				if (target)
					window .open (url, target);
				else
					location = url;

				this .removeLoadCount (id);
				this .setBrowserLoading (false);
			}
			.bind (this));
		},
		addBrowserListener: function (callback, object)
		{
			// The string describes the name of the callback function to be called within the current ECMAScript context. 
		},
		removeBrowserListener: function (callback)
		{
			// The string describes the name of the callback function to be called within the current ECMAScript context.
		},
		addBrowserCallback: function (callback, object)
		{
			// Probably to be implemented like addFieldCallback.
		},
		removeBrowserCallback: function (callback)
		{	
			// Probably to be implemented like removeFieldCallback.
		},
		importDocument: function (dom)
		{
			if (! dom) return;
			
			var
				currentScene = this .currentScene,
				external     = this .isExternal (),
				scene        = this .createScene ();

			new XMLParser (scene) .parseIntoScene (dom);

			if (! external)
			{
				scene .setExecutionContext (currentScene);
				currentScene .isLive () .addInterest ("setLive", scene);
						
				if (currentScene .isLive () .getValue ())
					scene .setLive (true);
			}

			scene .setup ();

			return scene;
		},
		getBrowserProperty: function (name)
		{
			return this .getBrowserProperties () .getField (name) .getValue ();
		},
		setBrowserOption: function (name, value)
		{
			this .getBrowserOptions () .getField (name) .setValue (value);
		},
		getBrowserOption: function (name)
		{
			return this .getBrowserOptions () .getField (name) .getValue ();
		},
		getRenderingProperty: function (name)
		{
			this .getRenderingProperties () .getField (name) .getValue ();
		},
		firstViewpoint: function ()
		{
			var activeLayer = this .getActiveLayer ();
		
			if (activeLayer)
			{
				var viewpoints = activeLayer .getUserViewpoints ();

				if (viewpoints .length)
					this .bindViewpoint (viewpoints [0]);
			}
		},
		previousViewpoint: function ()
		{
			var activeLayer = this .getActiveLayer ();

			if (activeLayer)
			{
				var viewpoints = activeLayer .getUserViewpoints ();

				if (viewpoints .length === 0)
					return;

				var index = 0;

				for (var i = 0; i < viewpoints .length; ++ i)
				{
					if (viewpoints [i] .isBound_ .getValue ())
						break;

					++ index;
				}

				if (index < viewpoints .length)
				{
					if (index === 0)
						this .bindViewpoint (viewpoints [viewpoints .length - 1]);

					else
						this .bindViewpoint (viewpoints [index - 1]);
				}
				else
					this .bindViewpoint (viewpoints [viewpoints .length - 1]);
			}
		},
		nextViewpoint: function ()
		{
			var activeLayer = this .getActiveLayer ();

			if (activeLayer)
			{
				var viewpoints = activeLayer .getUserViewpoints ();

				if (viewpoints .length === 0)
					return;

				var index = 0;

				for (var i = 0; i < viewpoints .length; ++ i)
				{
					if (viewpoints [i] .isBound_ .getValue ())
						break;

					++ index;
				}

				if (index < viewpoints .length)
				{
					if (index === viewpoints .length - 1)
						this .bindViewpoint (viewpoints [0]);

					else
						this .bindViewpoint (viewpoints [index + 1]);
				}
				else
					this .bindViewpoint (viewpoints [0]);
			}
		},
		lastViewpoint: function ()
		{
			var activeLayer = this .getActiveLayer ();

			if (activeLayer)
			{
				var viewpoints = activeLayer .getUserViewpoints ();

				if (viewpoints .length)
					this .bindViewpoint (viewpoints [viewpoints .length - 1]);
			}
		},
		changeViewpoint: function (name)
		{
			try
			{
				this .currentScene .changeViewpoint (name);
			}
			catch (error)
			{
				console .log (error .message);
			}
		},
		bindViewpoint: function (viewpoint)
		{
			if (viewpoint .isBound_ .getValue ())
				viewpoint .transitionStart (viewpoint);

			else
				viewpoint .set_bind_ = true;
		},
		addRoute: function (fromNode, fromEventOut, toNode, toEventIn)
		{
			this .currentScene .addRoute (fromNode, fromEventOut, toNode, toEventIn);
		},
		deleteRoute: function (fromNode, fromEventOut, toNode, toEventIn)
		{
			try
			{
				var route = this .currentScene .getRoute (fromNode, fromEventOut, toNode, toEventIn);

				if (route)
					this .currentScene .deleteRoute (route);
			}
			catch (error)
			{
				console .log (error);
			}
		},
		beginUpdate: function ()
		{
			this .setLive (true);
			this .getExecutionContext () .setLive (true);
			this .advanceTime (performance .now ());
		},
		endUpdate: function ()
		{
			this .setLive (false);
			this .getExecutionContext () .setLive (false);
		},
		print: function ()
		{
			var string = "";

			for (var i = 0; i < arguments .length; ++ i)
				string += arguments [i];

			console .log (string);

			$(".excite-console") .append (string);
		},
		println: function ()
		{
			var string = "";

			for (var i = 0; i < arguments .length; ++ i)
				string += arguments [i];

			console .log (string);

			string += "\n";

			$(".excite-console") .append (string);
		},
	});

	Object .defineProperty (X3DBrowser .prototype, "name",
	{
		get: function () { return "X-ITE"; },
		enumerable: true,
		configurable: false
	});

	Object .defineProperty (X3DBrowser .prototype, "version",
	{
		get: function () { return VERSION; },
		enumerable: true,
		configurable: false
	});

	Object .defineProperty (X3DBrowser .prototype, "description",
	{
		get: function () { return this .description_; },
		set: function (value)
		{
			this .description_                = value;
			this .getNotification () .string_ = value;
		},
		enumerable: true,
		configurable: false
	});

	Object .defineProperty (X3DBrowser .prototype, "currentScene",
	{
		get: function ()
		{
			return this .getScriptStack () [this .getScriptStack () .length - 1] .getExecutionContext ();
		},
		enumerable: true,
		configurable: false
	});

	return X3DBrowser;
});
