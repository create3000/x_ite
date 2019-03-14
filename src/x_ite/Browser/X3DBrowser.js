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
	"x_ite/Browser/VERSION",
	"x_ite/Base/Events",
	"x_ite/Fields",
	"x_ite/Components",
	"x_ite/Browser/X3DBrowserContext",
	"x_ite/Configuration/ComponentInfo",
	"x_ite/Configuration/SupportedProfiles",
	"x_ite/Configuration/SupportedComponents",
	"x_ite/Configuration/SupportedNodes",
	"x_ite/Execution/Scene",
	"x_ite/Execution/X3DScene",
	"x_ite/InputOutput/FileLoader",
	"x_ite/Parser/XMLParser",
	"x_ite/Parser/JSONParser",
	"x_ite/Bits/X3DConstants",
	"locale/gettext",
],
function ($,
          VERSION,
          Events,
          Fields,
          Components,
          X3DBrowserContext,
          ComponentInfo,
          SupportedProfiles,
          SupportedComponents,
          SupportedNodes,
          Scene,
          X3DScene,
          FileLoader,
          XMLParser,
          JSONParser,
          X3DConstants,
          _)
{
"use strict";

	function X3DBrowser (element)
	{
		X3DBrowserContext .call (this, element);

		this .currentSpeed         = 0;
		this .currentFrameRate     = 60;
		this .components           = { };
		this .browserCallbacks     = new Map ();

		this .replaceWorld (this .createScene ());
	};

	X3DBrowser .prototype = Object .assign (Object .create (X3DBrowserContext .prototype),
	{
		constructor: X3DBrowser,
		getTypeName: function ()
		{
			return "X3DBrowser";
		},
		getComponentName: function ()
		{
			return "X_ITE";
		},
		getContainerField: function ()
		{
			return "browser";
		},
		initialize: function ()
		{
			X3DBrowserContext .prototype .initialize .call (this);

			this .getLoadSensor () .isLoaded_ .addInterest ("set_loaded__", this);
		},
		set_loaded__: function (loaded)
		{
			this .getLoadSensor () .isLoaded_ .removeInterest ("set_loaded__", this);
			this .getLoadSensor () .enabled_ = false;

			var urlCharacters = this .getElement () .attr ("src");

			if (urlCharacters)
				urlCharacters = '"' + urlCharacters + '"';
			else
				urlCharacters = this .getElement () .attr ("url");

			if (urlCharacters)
			{
				this .initialized () .set (this .getCurrentTime ());

				this .load (urlCharacters);
			}
			else
			{
				this .initialized () .setValue (this .getCurrentTime ());
				this .callBrowserCallbacks (X3DConstants .INITIALIZED_EVENT);
				this .callBrowserEventHandler ("onload");
			}

			// Print welcome message.

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
			var profile = SupportedProfiles .get (name);

			if (profile)
				return profile;

			throw Error ("Profile '" + name + "' is not supported.");
		},
		getComponent: function (name, level)
		{
			var component = SupportedComponents .get (name);

			if (component)
			{
				if (level <= component .level || true)
					return new ComponentInfo (name, level, component .title, component. providerUrl);
			}

			throw Error ("Component '" + name + "' at level '" + level + "' is not supported.");
		},
		getSupportedNode: function (typeName)
		{
			return SupportedNodes .getType (typeName);
		},
		createScene: function (profile, component1 /*, ...*/)
		{
		   var scene = new Scene (this);

			if (arguments .length)
			{
				scene .setProfile (profile);

				for (var i = 1, length = arguments .length; i < length; ++ i)
					scene .addComponent (arguments [i]);
			}

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
				this .callBrowserCallbacks (X3DConstants .SHUTDOWN_EVENT);
				this .callBrowserEventHandler ("onshutdown");
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

			this .getBrowserOptions () .configure ();
			this .setBrowserLoading (true);
			this .loadCount_ .addInterest ("set_loadCount__", this);
			this .prepareEvents () .removeInterest ("bind", this);
	
			for (var id in scene .getLoadingObjects ())
				this .addLoadCount (scene .getLoadingObjects () [id]);

			scene .setLive (this .isLive () .getValue ());

			// Scene.setup is done in World.inititalize.
			this .setExecutionContext (scene);
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

			this .setBrowserLoading (false);

			if (this .initialized () .getValue ())
			{
				this .initialized () .setValue (this .getCurrentTime ());
				this .callBrowserCallbacks (X3DConstants .INITIALIZED_EVENT);
				this .callBrowserEventHandler ("onload");
			}
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
				{
					this .replaceWorld (scene);
				}
				else
				{
					this .callBrowserCallbacks (X3DConstants .CONNECTION_ERROR);
					this .callBrowserEventHandler ("onerror");

					setTimeout (function () { this .getSplashScreen () .find (".x_ite-private-spinner-text") .text (_ ("Failed loading world.")); } .bind (this), 31);
				}

				// Must not remove load count, replaceWorld does a resetLoadCount when it sets setBrowserLoading to true.
				// Don't set browser loading to false.
			}
			.bind (this),
			function (fragment)
			{
				this .currentScene .changeViewpoint (fragment);
				this .removeLoadCount (this);
				this .setBrowserLoading (false);
			}
			.bind (this),
			function (url, target)
			{
				if (target)
					window .open (url, target);
				else
					location = url;

				this .removeLoadCount (this);
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
		addBrowserCallback: function (key, object)
		{
			this .browserCallbacks .set (key, object);
		},
		removeBrowserCallback: function (key)
		{
			this .browserCallbacks .delete (key);
		},
		getBrowserCallbacks: function ()
		{
			return this .browserCallbacks;
		},
		callBrowserCallbacks: function (browserEvent)
		{
			if (this .browserCallbacks .size)
			{
				this .browserCallbacks .forEach (function (browserCallback)
				{
					browserCallback (browserEvent);
				});
			}
		},
		importDocument: function (dom, success, error)
		{
			if (! dom)
				return;

			var
				scene        = this .createScene (),
				currentScene = this .currentScene,
				external     = this .isExternal ();

			if (success)
			{
				new XMLParser (scene) .parseIntoScene (dom,
				function ()
				{
					this .setupScene (scene, currentScene, external);
					success (scene);
				}
				.bind (this),
				function (message)
				{
					if (error)
						error (message);
				});
			}
			else
			{
				new XMLParser (scene) .parseIntoScene (dom);

				this .setupScene (scene, currentScene, external);

				return scene;
			}
		},
		importJS: function (jsobj, success, error)
		{
			if (! jsobj)
				return;

			var
				scene        = this .createScene (),
				currentScene = this .currentScene,
				external     = this .isExternal ();

			if (success)
			{
				new JSONParser (scene) .parseJavaScript (jsobj,
				function ()
				{
					this .setupScene (scene, currentScene, external);
					success (scene);
				}
				.bind (this),
				function (message)
				{
					if (error)
						error (message);
				});
			}
			else
			{
				new JSONParser (scene) .parseJavaScript (jsobj);

				this .setupScene (scene, currentScene, external);

				return scene;
			}
		},
		setupScene: function (scene, currentScene, external)
		{
			if (! external)
			{
				scene .setExecutionContext (currentScene);
				currentScene .isLive () .addInterest ("setLive", scene);
						
				if (currentScene .isLive () .getValue ())
					scene .setLive (true);
			}

			scene .setup ();
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
			return this .getRenderingProperties () .getField (name) .getValue ();
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
			viewpoint .setAnimate (true); // VRML

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

			var consoleElement = $(".x_ite-console");

			if (consoleElement .length)
				consoleElement .append (document .createTextNode (string));
		},
		println: function ()
		{
			var string = "";

			for (var i = 0; i < arguments .length; ++ i)
				string += arguments [i];

			console .log (string);

			string += "\n";

			var element = $(".x_ite-console");

			if (element .length)
				element .append (document .createTextNode (string));
		},
	});

	Object .defineProperty (X3DBrowser .prototype, "name",
	{
		get: function () { return "X_ITE"; },
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
		get: function ()
		{
			return this .getNotification () .string_ .getValue ();
		},
		set: function (value)
		{
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
