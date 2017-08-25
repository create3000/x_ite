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
	"excite/Fields",
	"excite/Browser/Core/BrowserOptions",
	"excite/Browser/Core/BrowserProperties",
	"excite/Browser/Core/RenderingProperties",
	"excite/Browser/Core/Notification",
	"excite/Browser/Core/BrowserTimings",
	"excite/Browser/Core/ContextMenu",
	"excite/Execution/Scene",
	"excite/Parser/Parser",
	"lib/DataStorage",
],
function (Fields,
          BrowserOptions,
          BrowserProperties,
          RenderingProperties,
          Notification,
          BrowserTimings,
          ContextMenu,
          Scene,
          Parser,
          DataStorage)
{
"use strict";
	
	var browserNumber = 0;

	function getContext (canvas)
	{
		var gl = canvas .getContext ("webgl") ||
		         canvas .getContext ("experimental-webgl");

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

		var browser      = $("<div></div>") .addClass ("excite-private-browser")  .prependTo (this .element);
		var splashScreen = $("<div></div>") .addClass ("excite-private-splash-screen") .appendTo (browser);
		var spinner      = $("<div></div>") .addClass ("excite-private-spinner")  .appendTo (splashScreen);
		var progress     = $("<div></div>") .addClass ("excite-private-progress") .appendTo (splashScreen);
		var surface      = $("<div></div>") .addClass ("excite-private-surface excite-private-surface-" + this .getId ()) .appendTo (browser);

		$("<div></div>") .addClass ("excite-private-spinner-one")   .appendTo (spinner);
		$("<div></div>") .addClass ("excite-private-spinner-two")   .appendTo (spinner);
		$("<div></div>") .addClass ("excite-private-spinner-three") .appendTo (spinner);
		$("<div></div>") .addClass ("excite-private-spinner-text")  .appendTo (progress) .text ("Lade 0 Dateien");
		$("<div></div>") .addClass ("excite-private-progressbar")   .appendTo (progress) .append ($("<div></div>"));

		this .splashScreen = splashScreen;
		this .canvas       = $("<canvas></canvas>") .prependTo (surface);
		this .context      = getContext (this .canvas [0]);

		this .privateScene = new Scene (this); // Scene for default nodes.

		this .browserOptions      = new BrowserOptions      (this .getPrivateScene ());
		this .browserProperties   = new BrowserProperties   (this .getPrivateScene ());
		this .renderingProperties = new RenderingProperties (this .getPrivateScene ());
		this .notification        = new Notification        (this .getPrivateScene ());
		this .browserTimings      = new BrowserTimings      (this .getPrivateScene ());
		this .contextMenu         = new ContextMenu         (this .getPrivateScene ());

		this .dataStorage = new DataStorage ("X3DBrowser(" + this .number + ").");
		this .mobile      = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i .test (navigator .userAgent);

		this .getCanvas () .fadeOut (0);

		if (this .getBrowserOptions () .getSplashScreen ())
			this .getSplashScreen () .fadeIn (0);

		$(".excite-console") .empty ();
	}

	X3DCoreContext .prototype =
	{
		initialize: function ()
		{
			// Scene for default nodes.

			this .privateScene .setPrivate (true);
			this .privateScene .setLive (true);
			this .privateScene .setup ();

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
		getDataStorage: function ()
		{
			return this .dataStorage;
		},
		getMobile: function ()
		{
			return this .mobile;
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

			switch (attributeName .toLowerCase())
			{
				case "src":
					var urlCharacters = this .getElement () .attr ("src");
		
					if (urlCharacters)
						this .load ('"' + urlCharacters + '"');

					break;
				case "url":
					this .load (this .getElement () .attr ("url"));
					break;
				case "splashscreen":
					this .getBrowserOptions () .setAttributeSplashScreen ();
					break;
			}
		},
		load: function (urlCharacters)
		{
			if (urlCharacters)
			{
			   var
			      parser    = new Parser (this .getExecutionContext (), true),
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
		getPrivateScene: function ()
		{
			return this .privateScene;
		},
	};

	return X3DCoreContext;
});
