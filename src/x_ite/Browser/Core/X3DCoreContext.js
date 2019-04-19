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
	"x_ite/Fields",
	"x_ite/Browser/Core/BrowserOptions",
	"x_ite/Browser/Core/BrowserProperties",
	"x_ite/Browser/Core/RenderingProperties",
	"x_ite/Browser/Core/Notification",
	"x_ite/Browser/Core/BrowserTimings",
	"x_ite/Browser/Core/ContextMenu",
	"x_ite/Execution/Scene",
	"x_ite/Parser/Parser",
	"standard/Utility/DataStorage",
	"x_ite/DEBUG",
],
function ($,
          Fields,
          BrowserOptions,
          BrowserProperties,
          RenderingProperties,
          Notification,
          BrowserTimings,
          ContextMenu,
          Scene,
          Parser,
          DataStorage,
          DEBUG)
{
"use strict";
	
	var browserNumber = 0;

	var extensions = [
		"ANGLE_instanced_arrays",
		"EXT_blend_minmax",
		"EXT_frag_depth",
		"EXT_shader_texture_lod",
		"EXT_texture_filter_anisotropic",
		"OES_element_index_uint",
		"OES_standard_derivatives",
		"OES_texture_float",
		"OES_texture_float_linear",
		"OES_texture_half_float",
		"OES_texture_half_float_linear",
		"OES_vertex_array_object",
		"WEBGL_compressed_texture_s3tc",
		"WEBGL_debug_renderer_info",
		"WEBGL_debug_shaders",
		"WEBGL_depth_texture",
		"WEBGL_draw_buffers",
		"WEBGL_lose_context",

		"EXT_color_buffer_float",
		"EXT_color_buffer_half_float",
		"EXT_disjoint_timer_query",
		"EXT_disjoint_timer_query_webgl2",
		"EXT_sRGB",
		"WEBGL_color_buffer_float",
		"WEBGL_compressed_texture_astc",
		"WEBGL_compressed_texture_atc",
		"WEBGL_compressed_texture_etc",
		"WEBGL_compressed_texture_etc1",
		"WEBGL_compressed_texture_pvrtc",
		"WEBGL_compressed_texture_s3tc",
		"WEBGL_compressed_texture_s3tc_srgb",

		"EXT_float_blend",
		"OES_fbo_render_mipmap",
		"WEBGL_get_buffer_sub_data_async",
		"WEBGL_multiview",
		"WEBGL_security_sensitive_resources",
		"WEBGL_shared_resources",

		"EXT_clip_cull_distance",
		"WEBGL_debug",
		"WEBGL_dynamic_texture",
		"WEBGL_subarray_uploads",
		"WEBGL_texture_multisample",
		"WEBGL_texture_source_iframe",
		"WEBGL_video_texture",

		"EXT_texture_storage",
		"OES_depth24",
		"WEBGL_debug_shader_precision",
		"WEBGL_draw_elements_no_range_check",
		"WEBGL_subscribe_uniform",
		"WEBGL_texture_from_depth_video",
	];

	function getContext (canvas, version, preserveDrawingBuffer)
	{
		var
			options = { preserveDrawingBuffer: preserveDrawingBuffer },
			gl      = null;

		if (version >= 2 && ! gl)
		{
			gl = canvas .getContext ("webgl2", options);
	
			if (gl)
				gl .getVersion = function () { return 2; };
		}

		if (version >= 1 && ! gl)
		{
			gl = canvas .getContext ("webgl",              options) ||
			     canvas .getContext ("experimental-webgl", options);

			if (gl)
				gl .getVersion = function () { return 1; };
		}

		if (! gl)
			throw new Error ("Couldn't create WebGL context.");

		// Feature detection:
		
		// If the aliased linewidth ranges are both 1, gl.lineWidth is probably not possible,
		// thus we disable it completely to prevent webgl errors.
		
		var aliasedLineWidthRange = gl .getParameter (gl .ALIASED_LINE_WIDTH_RANGE);
		
		if (aliasedLineWidthRange [0] === 1 && aliasedLineWidthRange [1] === 1)
		{
			gl .lineWidth = Function .prototype;
		}
		
		// Return context.
		
		return gl;
	}

	function X3DCoreContext (element)
	{
		this .number  = ++ browserNumber;
		this .element = element;

		// Get canvas & context.

		var browser      = $("<div></div>") .addClass ("x_ite-private-browser")  .prependTo (this .element);
		var splashScreen = $("<div></div>") .addClass ("x_ite-private-splash-screen") .appendTo (browser);
		var spinner      = $("<div></div>") .addClass ("x_ite-private-spinner")  .appendTo (splashScreen);
		var progress     = $("<div></div>") .addClass ("x_ite-private-progress") .appendTo (splashScreen);
		var surface      = $("<div></div>") .addClass ("x_ite-private-surface x_ite-private-surface-" + this .getId ()) .appendTo (browser);

		$("<div></div>") .addClass ("x_ite-private-spinner-text") .appendTo (progress) .text ("Lade 0 Dateien");
		$("<div></div>") .addClass ("x_ite-private-progressbar")  .appendTo (progress) .append ($("<div></div>"));

		this .splashScreen = splashScreen;
		this .surface      = surface;
		this .canvas       = $("<canvas></canvas>") .addClass ("x_ite-private-canvas") .prependTo (surface);
		this .context      = getContext (this .canvas [0], DEBUG ? 2 : 1, element .attr ("preserveDrawingBuffer") === "true");
		this .extensions   = { };

		var gl = this .getContext ();

		extensions .forEach (function (name)
		{
			this .extensions [name] = gl .getExtension (name);
		},
		this);

		this .browserOptions      = new BrowserOptions      (this .getPrivateScene ());
		this .browserProperties   = new BrowserProperties   (this .getPrivateScene ());
		this .renderingProperties = new RenderingProperties (this .getPrivateScene ());
		this .notification        = new Notification        (this .getPrivateScene ());
		this .browserTimings      = new BrowserTimings      (this .getPrivateScene ());
		this .contextMenu         = new ContextMenu         (this .getPrivateScene ());

		this .localStorage = new DataStorage (localStorage, "X_ITE.X3DBrowser(" + this .number + ").");
		this .mobile       = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i .test (navigator .userAgent);

		$(".x_ite-console") .empty ();

		this .addChildObjects ("controlKey",  new Fields .SFBool (),
		                       "shiftKey",    new Fields .SFBool (),
		                       "altKey",      new Fields .SFBool (),
		                       "altGrKey",    new Fields .SFBool ());
	}

	X3DCoreContext .prototype =
	{
		initialize: function ()
		{
			// Setup browser nodes.

			this .browserOptions      .setup ()
			this .browserProperties   .setup ()
			this .renderingProperties .setup ();
			this .notification        .setup ();
			this .browserTimings      .setup ();
			this .contextMenu         .setup ();

			// Observe Element's attributes.

			this .observer = new MutationObserver (this .processMutations .bind (this));

			this .observer .observe (this .element [0], { attributes: true, childList: false, characterData: false, subtree: false });

			// Define src and url property.

			Object .defineProperty (this .getElement () .get (0), "src",
			{
				get: (function ()
				{
					return this .getExecutionContext () .getWorldURL ();
				})
				.bind (this),
				set: (function (value)
				{
					this .loadURL (new Fields .MFString (value), new Fields .MFString ());
				})
				.bind (this),
				enumerable: true,
				configurable: false
			});
	
			Object .defineProperty (this .getElement () .get (0), "url",
			{
				get: (function ()
				{
					var worldURL = this .getExecutionContext () .getWorldURL ();
	
					if (worldURL)
						return new Fields .MFString (worldURL);
					else
						return new Fields .MFString ();
				})
				.bind (this),
				set: (function (value)
				{
					this .loadURL (value, new Fields .MFString ());
				})
				.bind (this),
				enumerable: true,
				configurable: false
			});

			// Configure browser event handlers.

			this .setBrowserEventHandler ("onload");
			this .setBrowserEventHandler ("onshutdown");
			this .setBrowserEventHandler ("onerror");

			this .getElement () .bind ("keydown.X3DCoreContext", this .keydown_X3DCoreContext .bind (this));
			this .getElement () .bind ("keyup.X3DCoreContext",   this .keyup_X3DCoreContext   .bind (this));
		},
		getDebug: function ()
		{
			return this .getBrowserOptions () .getDebug ();
		},
		getNumber: function ()
		{
			return this .number;
		},
		isStrict: function ()
		{
			return false;
		},
		getElement: function ()
		{
			return this .element;
		},
		getSurface: function ()
		{
			return this .surface;
		},
		getSplashScreen: function ()
		{
			return this .splashScreen;
		},
		getCanvas: function ()
		{
			return this .canvas;
		},
		getContext: function ()
		{
			return this .context;
		},
		getExtension: function (name)
		{
			return this .extensions [name];
		},
		getBrowserOptions: function ()
		{
			return this .browserOptions;
		},
		getBrowserProperties: function ()
		{
			return this .browserProperties;
		},
		getRenderingProperties: function ()
		{
			return this .renderingProperties;
		},
		getNotification: function ()
		{
			return this .notification;
		},
		getBrowserTimings: function ()
		{
			return this .browserTimings;
		},
		getLocalStorage: function ()
		{
			return this .localStorage;
		},
		getMobile: function ()
		{
			return this .mobile;
		},
		getPrivateScene: function ()
		{
			if (this .privateScene)
				return this .privateScene;

			// Scene for default nodes.

			this .privateScene = new Scene (this);

			this .privateScene .setPrivate (true);
			this .privateScene .setLive (true);
			this .privateScene .setup ();

			return this .privateScene;
		},
		processMutations: function (mutations)
		{
			mutations .forEach (function (mutation)
			{
				this .processMutation (mutation);
			},
			this);
		},
		processMutation: function (mutation)
		{
			var element = mutation .target;
			
			switch (mutation .type)
			{
				case "attributes":
				{
					this .processAttribute (mutation, element);
					break;
				}
			}
		},
		processAttribute: function (mutation, element)
		{
			var attributeName = mutation .attributeName;

			switch (attributeName .toLowerCase ())
			{
				case "onerror":
				{
					this .setBrowserEventHandler ("onerror");
					break;
				}
				case "onload":
				{
					this .setBrowserEventHandler ("onload");
					break;
				}
				case "onshutdown":
				{
					this .setBrowserEventHandler ("onshutdown");
					break;
				}
				case "splashscreen":
				{
					this .getBrowserOptions () .setAttributeSplashScreen ();
					break;
				}
				case "src":
				{
					var urlCharacters = this .getElement () .attr ("src");
		
					this .load ('"' + urlCharacters + '"');
					break;
				}
				case "url":
				{
					this .load (this .getElement () .attr ("url"));
					break;
				}
			}
		},
		load: function (urlCharacters)
		{
			if (urlCharacters)
			{
			   var
					parser    = new Parser (this .getExecutionContext ()),
					url       = new Fields .MFString (),
					parameter = new Fields .MFString ();

				parser .setInput (urlCharacters);
				parser .sfstringValues (url);

				if (url .length)
					this .loadURL (url, parameter);
			}
			else
			{
				if (! this .getLoading ())
					this .getCanvas () .fadeIn (0);
			}
		},
		setBrowserEventHandler: function (name)
		{
			var
				element      = this .getElement () .get (0),
				browserEvent = this .getElement () .attr (name);

			if (browserEvent)
				element [name] = new Function (browserEvent);
			else
				element [name] = Function .prototype;
		},
		callBrowserEventHandler: function (name)
		{
			var
				element             = this .getElement () .get (0),
				browserEventHandler = element [name];

			if (browserEventHandler)
				browserEventHandler .call (element);

			if (window .jQuery)
				window .jQuery (element) .trigger (name .substr (2));
		},
		getShiftKey: function ()
		{
			return this .shiftKey_ .getValue ();
		},
		getControlKey: function ()
		{
			return this .controlKey_ .getValue ();
		},
		getAltKey: function ()
		{
			return this .altKey_ .getValue ();
		},
		getAltGrKey: function ()
		{
			return this .altGrKey_ .getValue ();
		},
		keydown_X3DCoreContext: function (event)
		{
			//console .log (event .keyCode);
	
			switch (event .keyCode)
			{
				case 16: // Shift
				{
					this .shiftKey_ = true;
					break;
				}
				case 17: // Ctrl
				{
					this .controlKey_ = true;
					break;
				}
				case 18: // Alt
				{
					this .altKey_ = true;
					break;
				}
				case 49: // 1
				{
					if (this .getDebug ())
					{
						if (this .getControlKey ())
						{
							event .preventDefault ();
							this .setBrowserOption ("Shading", "POINT");
							this .getNotification () .string_ = "Shading: Pointset";
						}
					}

					break;
				}
				case 50: // 2
				{
					if (this .getDebug ())
					{
						if (this .getControlKey ())
						{
							event .preventDefault ();
							this .setBrowserOption ("Shading", "WIREFRAME");
							this .getNotification () .string_ = "Shading: Wireframe";
						}
					}

					break;
				}
				case 51: // 3
				{
					if (this .getDebug ())
					{
						if (this .getControlKey ())
						{
							event .preventDefault ();
							this .setBrowserOption ("Shading", "FLAT");
							this .getNotification () .string_ = "Shading: Flat";
						}
					}

					break;
				}
				case 52: // 4
				{
					if (this .getDebug ())
					{
						if (this .getControlKey ())
						{
							event .preventDefault ();
							this .setBrowserOption ("Shading", "GOURAUD");
							this .getNotification () .string_ = "Shading: Gouraud";
						}
					}

					break;
				}
				case 53: // 5
				{
					if (this .getDebug ())
					{
						if (this .getControlKey ())
						{
							event .preventDefault ();
							this .setBrowserOption ("Shading", "PHONG");
							this .getNotification () .string_ = "Shading: Phong";
						}
					}

					break;
				}
				case 83: // s
				{
					if (this .getDebug ())
					{
						if (this .getControlKey ())
						{
							event .preventDefault ();

							if (this .isLive () .getValue ())
								this .endUpdate ();
							else
								this .beginUpdate ();
							
							this .getNotification () .string_ = this .isLive () .getValue () ? "Begin Update" : "End Update";
						}
					}

					break;
				}
				case 225: // Alt Gr
				{
					this .altGrKey_ = true;
					break;
				}
				case 171: // Plus // Firefox
				case 187: // Plus // Opera
				{
					if (this .getControlKey ())
					{
						event .preventDefault ();
						this .getBrowserTimings () .setEnabled (! this .getBrowserTimings () .getEnabled ());
					}

					break;
				}
				case 36: // Pos 1
				{
					event .preventDefault ();
					this .firstViewpoint ();
					break;
				}
				case 35: // End
				{
					event .preventDefault ();
					this .lastViewpoint ();
					break;
				}
				case 33: // Page Up
				{
					event .preventDefault ();
					this .previousViewpoint ();
					break;
				}
				case 34: // Page Down
				{
					event .preventDefault ();
					this .nextViewpoint ();
					break;
				}
				case 119: // F8
				{
					if (this .getShiftKey ())
					{
						event .preventDefault ();
						
						var viewpoint = this .getActiveViewpoint ();

						if (! viewpoint)
							break;

						var text = "";

						text += "Viewpoint {\n";
						text += "  position " + viewpoint .getUserPosition () .toString () + "\n";
						text += "  orientation " + viewpoint .getUserOrientation () .toString () + "\n";
						text += "  centerOfRotation " + viewpoint .getUserCenterOfRotation () .toString () + "\n";
						text += "}\n";

						console .log (text);

						navigator .clipboard .writeText (text) .then (function()
						{
							this .getNotification () .string_ = "Copied Viewpoint to clipboard.";
						}
						.bind (this),
						function (error)
						{
							this .getNotification () .string_ = "Couldn't copy viewpoint.";
						}
						.bind (this));
					}

					break;
				}
			}
		},
		keyup_X3DCoreContext: function (event)
		{
			//console .log (event .which);

			switch (event .which)
			{
				case 16: // Shift
				{
					this .shiftKey_ = false;
					break;
				}
				case 17: // Ctrl
				{
					this .controlKey_ = false;
					break;
				}
				case 18: // Alt
				{
					this .altKey_ = false;
					break;
				}
				case 225: // Alt Gr
				{
					this .altGrKey_ = false;
					break;
				}
			}
		},
	};

	return X3DCoreContext;
});
