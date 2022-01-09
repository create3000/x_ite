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
	"x_ite/Components/Layering/X3DLayerNode",
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
	"standard/Utility/MapUtilities",
	"locale/gettext",
],
function ($,
          VERSION,
          Events,
          Fields,
          Components,
          X3DLayerNode,
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
          MapUtilities,
          _)
{
"use strict";

	function X3DBrowser (element)
	{
		X3DBrowserContext .call (this, element);

		this .currentSpeed     = 0;
		this .currentFrameRate = 60;
		this .components       = { };
		this .browserCallbacks = new Map ();

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

			let urlCharacters = this .getElement () .attr ("src");

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
			             "   Current Graphics Renderer\n" +
			             "      Name: " + this .getVendor () + " " + this .getRenderer () + "\n" +
			             "      WebGL version: " + this .getWebGLVersion () + "\n" +
			             "      Shading language: " + this .getShadingLanguageVersion () + "\n" +
			             "   Rendering Properties\n" +
			             "      Antialiased: " + this .getAntialiased () + "\n" +
			             "      Depth size: " + this .getDepthSize () + " bits\n" +
			             "      Color depth: " + this .getColorDepth () + " bits\n" +
			             "      Max clip planes: " + this .getMaxClipPlanes () + "\n" +
			             "      Max global lights: " + this .getMaxLights () + "\n" +
			             "      Max textures: " + this .getMaxTextures () + "\n" +
			             "      Texture units: " + this .getMaxCombinedTextureUnits () + "\n" +
			             "      Max texture size: " + this .getMaxTextureSize () + " × " + this .getMaxTextureSize () + " pixel\n" +
			             "      Texture memory: " + this .getTextureMemory () + "\n" +
			             "      Max vertex uniform vectors: " + this .getMaxVertexUniformVectors () + "\n" +
			             "      Max fragment uniform vectors: " + this .getMaxFragmentUniformVectors () + "\n" +
			             "      Max vertex attribs: " + this .getMaxVertexAttribs () + "\n");
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
			return this .getExecutionContext () .worldURL;
		},
		getProfile: function (name)
		{
			const profile = SupportedProfiles .get (name);

			if (profile)
				return profile;

			throw Error ("Profile '" + name + "' is not supported.");
		},
		getComponent: function (name, level)
		{
			const component = SupportedComponents .get (name);

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
		   const scene = new Scene (this);

			if (arguments .length)
			{
				scene .setProfile (profile);

				for (let i = 1, length = arguments .length; i < length; ++ i)
					scene .addComponent (arguments [i]);
			}

			scene .setup ();

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

				const rootNodes = scene;

				scene = this .createScene ();

				for (const rootNode of rootNodes)
					scene .isLive () .addInterest (rootNode .getValue () .getExecutionContext () .isLive ());

				scene .setRootNodes (rootNodes);
			}

			if (! (scene instanceof X3DScene))
				scene = this .createScene ();

			this .description = "";

			this .getBrowserOptions () .configure ();
			this .setBrowserLoading (true);
			this .loadCount_ .addInterest ("set_loadCount__", this);
			this .prepareEvents () .removeInterest ("bind", this);

			for (const object of scene .getLoadingObjects ())
				this .addLoadCount (object);

			this .setExecutionContext (scene);
			this .getWorld () .bind ();

			scene .setLive (this .getLive ());
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
			const
				currentScene = this .getExecutionContext (),
				external     = this .isExternal (),
				fileLoader   = new FileLoader (this .getWorld ()),
				scene        = fileLoader .createX3DFromString (currentScene .getURL (), vrmlSyntax);

			if (! external)
			{
				currentScene .isLive () .addInterest ("setLive", scene);
				scene .setExecutionContext (currentScene);
				scene .setLive (currentScene .getLive ());
			}

			return scene .rootNodes;
		},
		createX3DFromString: function (x3dSyntax, success, error)
		{
			const
				currentScene = this .getExecutionContext (),
				external     = this .isExternal (),
				fileLoader   = new FileLoader (this .getWorld ());

			const promise = new Promise (function (resolve, reject)
			{
				fileLoader .createX3DFromString (currentScene .getURL (), x3dSyntax, function (scene)
				{
					if (! external)
					{
						currentScene .isLive () .addInterest ("setLive", scene);
						scene .setExecutionContext (currentScene);
						scene .setLive (currentScene .getLive ());
					}

					resolve (scene);
				},
				reject);
			});

			if (success)
				promise .then (success);

			if (error)
				promise .catch (error);

			return promise;
		},
		createVrmlFromURL: function (url, node, event)
		{
			if (! (node instanceof Fields .SFNode))
				throw new Error ("Browser.createVrmlFromURL: node must be of type SFNode.");

			if (! node .getValue ())
				throw new Error ("Browser.createVrmlFromURL: node IS NULL.");

			const field = node .getValue () .getField (event);

			if (! field .isInput ())
				throw new Error ("Browser.createVrmlFromURL: event named '" + event + "' must be a input field.");

			if (field .getType () !== X3DConstants .MFNode)
				throw new Error ("Browser.createVrmlFromURL: event named '" + event + "' must be of type MFNode.");

			const
				currentScene = this .getExecutionContext (),
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
						currentScene .isLive () .addInterest ("setLive", scene);
						scene .setExecutionContext (currentScene);
						scene .setLive (currentScene .getLive ());
					}

					// Wait until scene is completely loaded, scene .loadCount_ must be 0.
					field .setValue (scene .rootNodes);
				}
			}
			.bind (this));
		},
		createX3DFromURL: function (url, node, event)
		{
			if (arguments .length === 3)
				return this .createVrmlFromURL (url, node, event);

			const
				currentScene = this .getExecutionContext (),
				external     = this .isExternal (),
				fileLoader   = new FileLoader (this .getWorld ());

			const promise = new Promise (function (resolve, reject)
			{
				fileLoader .createX3DFromURL (url, null, function (scene)
				{
					if (scene)
					{
						if (! external)
						{
							currentScene .isLive () .addInterest ("setLive", scene);
							scene .setExecutionContext (currentScene);
							scene .setLive (currentScene .getLive ());
						}

						resolve (scene);
					}
					else
					{
						reject (new Error ("Couldn't load any URL of '" + Array .prototype .join .call (url, "', ") + "'."));
					}
				});
			});

			return promise;
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

			const loader = this .loader = new FileLoader (this .getWorld ());

			loader .createX3DFromURL (url, parameter,
			function (scene)
			{
				if (loader !== this .loader)
					return;

				if (! this .getBrowserOptions () .getSplashScreen ())
					this .getCanvas () .fadeIn (0);

				if (scene)
				{
					this .replaceWorld (scene);
					this .removeLoadCount (this);
				}
				else
				{
					this .callBrowserCallbacks (X3DConstants .CONNECTION_ERROR);
					this .callBrowserEventHandler ("onerror");

					setTimeout (function () { this .getSplashScreen () .find (".x_ite-private-spinner-text") .text (_ ("Failed loading world.")); } .bind (this), 31);
				}
			}
			.bind (this),
			function (fragment)
			{
				if (loader !== this .loader)
					return;

				this .changeViewpoint (fragment);
				this .removeLoadCount (this);
				this .setBrowserLoading (false);
			}
			.bind (this),
			function (url, target)
			{
				if (loader !== this .loader)
					return;

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
		callBrowserCallbacks: (function ()
		{
			const browserCallbacks = new Map ();

			return function (browserEvent)
			{
				if (this .browserCallbacks .size)
				{
					MapUtilities .assign (browserCallbacks, this .browserCallbacks) .forEach (function (browserCallback)
					{
						browserCallback (browserEvent);
					});
				}
			};
		})(),
		importDocument: function (dom, success, error)
		{
			const
				currentScene = this .getExecutionContext (),
				scene        = this .createScene (),
				external     = this .isExternal ();

			if (!external)
			{
				currentScene .isLive () .addInterest ("setLive", scene);
				scene .setExecutionContext (currentScene);
				scene .setLive (currentScene .getLive ());
			}

			const promise = new Promise (function (resolve, reject)
			{
				new XMLParser (scene) .parseIntoScene (dom, resolve, reject);
			});

			if (success)
				promise .then (success);

			if (error)
				promise .catch (error);

			return promise;
		},
		importJS: function (jsobj, success, error)
		{
			const
				currentScene = this .getExecutionContext (),
				scene        = this .createScene (),
				external     = this .isExternal ();

			if (!external)
			{
				currentScene .isLive () .addInterest ("setLive", scene);
				scene .setExecutionContext (currentScene);
				scene .setLive (currentScene .getLive ());
			}

			const promise = new Promise (function (resolve, reject)
			{
				new JSONParser (scene) .parseIntoScene (jsobj, resolve, reject);
			});

			if (success)
				promise .then (success);

			if (error)
				promise .catch (error);

			return promise;
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
		firstViewpoint: function (layerNode)
		{
			if (layerNode instanceof Fields .SFNode)
				layerNode = layerNode .getValue ()

			if (! layerNode)
				layerNode = this .getActiveLayer ();

			if (layerNode instanceof X3DLayerNode)
			{
				const viewpoints = layerNode .getUserViewpoints ();

				if (viewpoints .length)
					this .bindViewpoint (layerNode, viewpoints [0]);
			}
		},
		previousViewpoint: function (layerNode)
		{
			if (layerNode instanceof Fields .SFNode)
				layerNode = layerNode .getValue ()

			if (! layerNode)
				layerNode = this .getActiveLayer ();

			if (layerNode instanceof X3DLayerNode)
			{
				const viewpoints = layerNode .getUserViewpoints ();

				if (viewpoints .length === 0)
					return;

				for (var i = 0; i < viewpoints .length; ++ i)
				{
					if (viewpoints [i] .isBound_ .getValue ())
						break;
				}

				if (i < viewpoints .length)
				{
					if (i === 0)
						this .bindViewpoint (layerNode, viewpoints .at (-1));

					else
						this .bindViewpoint (layerNode, viewpoints [i - 1]);
				}
				else
					this .bindViewpoint (layerNode, viewpoints .at (-1));
			}
		},
		nextViewpoint: function (layerNode)
		{
			if (layerNode instanceof Fields .SFNode)
				layerNode = layerNode .getValue ()

			if (! layerNode)
				layerNode = this .getActiveLayer ();

			if (layerNode instanceof X3DLayerNode)
			{
				const viewpoints = layerNode .getUserViewpoints ();

				if (viewpoints .length === 0)
					return;

				for (var i = 0; i < viewpoints .length; ++ i)
				{
					if (viewpoints [i] .isBound_ .getValue ())
						break;
				}

				if (i < viewpoints .length)
				{
					if (i === viewpoints .length - 1)
						this .bindViewpoint (layerNode, viewpoints [0]);

					else
						this .bindViewpoint (layerNode, viewpoints [i + 1]);
				}
				else
					this .bindViewpoint (layerNode, viewpoints [0]);
			}
		},
		lastViewpoint: function (layerNode)
		{
			if (layerNode instanceof Fields .SFNode)
				layerNode = layerNode .getValue ()

			if (! layerNode)
				layerNode = this .getActiveLayer ();

			if (layerNode instanceof X3DLayerNode)
			{
				const viewpoints = layerNode .getUserViewpoints ();

				if (viewpoints .length)
					this .bindViewpoint (layerNode, viewpoints .at (-1));
			}
		},
		changeViewpoint: function (layerNode, name)
		{
			if (layerNode instanceof Fields .SFNode)
				layerNode = layerNode .getValue ()

			if (arguments .length === 1)
			{
				name      = layerNode;
				layerNode = this .getActiveLayer ();
			}

			if (layerNode instanceof X3DLayerNode)
			{
				for (const viewpointNode of layerNode .getViewpoints () .get ())
				{
					if (viewpointNode .getName () === name)
					{
						this .bindViewpoint (layerNode, viewpointNode);
						break;
					}
				}
			}
		},
		bindViewpoint: function (layerNode, viewpointNode)
		{
			viewpointNode .setVRMLTransition (true);

			if (viewpointNode .isBound_ .getValue ())
				viewpointNode .transitionStart (layerNode, viewpointNode, viewpointNode);

			else
				viewpointNode .set_bind_ = true;
		},
		addRoute: function (fromNode, fromEventOut, toNode, toEventIn)
		{
			this .getExecutionContext () .addRoute (fromNode, fromEventOut, toNode, toEventIn);
		},
		deleteRoute: function (fromNode, fromEventOut, toNode, toEventIn)
		{
			try
			{
				const route = this .getExecutionContext () .getRoute (fromNode, fromEventOut, toNode, toEventIn);

				if (route)
					this .getExecutionContext () .deleteRoute (route);
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
			let string = "";

			for (const argument of arguments)
				string += argument;

			console .log (string);

			const element = $(".x_ite-console");

			if (element .length)
				element .append (document .createTextNode (string));
		},
		println: function ()
		{
			let string = "";

			for (const argument of arguments)
				string += argument;

			console .log (string);

			string += "\n";

			const element = $(".x_ite-console");

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
			return this .getScriptStack () .at (-1) .getExecutionContext ();
		},
		enumerable: true,
		configurable: false
	});

	Object .defineProperty (X3DBrowser .prototype, "supportedProfiles",
	{
		get: function ()
		{
			return SupportedProfiles;
		},
		enumerable: true,
		configurable: false
	});

	Object .defineProperty (X3DBrowser .prototype, "supportedComponents",
	{
		get: function ()
		{
			return SupportedComponents;
		},
		enumerable: true,
		configurable: false
	});

	return X3DBrowser;
});
