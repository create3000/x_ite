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
	"x_ite/Basic/X3DBaseNode",
	"locale/gettext",
	"contextMenu",
	"lib/jquery.fullscreen-min",
],
function ($,
          X3DBaseNode,
          _)
{
"use strict";

	function ContextMenu (executionContext)
	{
		X3DBaseNode .call (this, executionContext);

		this .active = false;
	}

	ContextMenu .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
	{
		constructor: ContextMenu,
		getTypeName: function ()
		{
			return "ContextMenu";
		},
		getComponentName: function ()
		{
			return "X_ITE";
		},
		getContainerField: function ()
		{
			return "contextMenu";
		},
		initialize: function ()
		{
			X3DBaseNode .prototype .initialize .call (this);

			const browser = this .getBrowser ();

			if (! browser .getBrowserOptions () .getContextMenu ())
				return;

			$.contextMenu ({
				selector: ".x_ite-private-browser-" + browser .getId (),
				build: this .build .bind (this),
				animation: {duration: 500, show: "fadeIn", hide: "fadeOut"},
				hideOnSecondTrigger: true,
				events:
				{
					show: function (options)
					{
						this .active = true;

						if (browser .getElement () .fullScreen ())
						{
							browser .getElement () .append (options .$menu);

							setTimeout (function ()
							{
								browser .getElement () .append (options .$layer .css ({
									position: "absolute",
									width: "100%",
									height: "100%",
								}));
							},
							1);
						}

						// Display submenus on left side if there is no space on right side.

						if (options .$menu .hasClass ("x_ite-private-menu-submenus-left"))
						{
							options .$menu .find (".context-menu-item > .context-menu-list") .css ({
								"right": options .$menu .width () + "px",
							});
						}
					}
					.bind (this),
					hide: function (options)
					{
						this .active = false;
					}
					.bind (this),
				},
			});
		},
		getActive: function ()
		{
			return this .active;
		},
		build: function (trigger, event)
		{
			const
				browser          = this .getBrowser (),
				activeLayer      = browser .getActiveLayer (),
				currentViewpoint = activeLayer ? activeLayer .getViewpoint () : null,
				currentViewer    = browser .viewer_ .getValue (),
				fullscreen       = browser .getElement () .fullScreen (),
				leftSubMenus     = $(document) .width () - event .pageX < 370;

			const menu = {
				className: "x_ite-private-menu x_ite-private-menu-title",
				items: {
					"separator0": "--------",
					"viewpoints": {
						name: _("Viewpoints"),
						className: "context-menu-icon x_ite-private-icon-viewpoint",
						items: this .getViewpoints (),
						callback: function (viewpoint)
						{
							if (! viewpoint)
								return;

							browser .bindViewpoint (browser .getActiveLayer (), viewpoint);
							browser .getSurface () .focus ();
						}
						.bind (this, currentViewpoint),
					},
					"separator1": "--------",
					"viewer": {
						name: _(this .getViewerName (currentViewer)),
						className: "context-menu-icon x_ite-private-icon-" + currentViewer .toLowerCase () + "-viewer",
						callback: function (viewer)
						{
							browser .viewer_ = viewer;
							browser .getNotification () .string_ = _(this .getViewerName (viewer));
							browser .getSurface () .focus ();
						}
						.bind (this, currentViewer),
					},
					"available-viewers": {
						name: _("Available Viewers"),
						items: this .getAvailableViewers (),
					},
					"straighten-horizon": {
						name: _("Straighten Horizon"),
						type: "checkbox",
						selected: browser .getBrowserOption ("StraightenHorizon"),
						events: {
							click: function (event)
							{
								const straightenHorizon = $(event .target) .is (":checked");

								browser .setBrowserOption ("StraightenHorizon", straightenHorizon);

								if (straightenHorizon)
								{
									browser .getNotification () .string_ = _("Straighten Horizon") + ": " + _("on");

									const activeViewpoint = browser .getActiveViewpoint ();

									if (activeViewpoint)
										activeViewpoint .straighten (browser .getActiveLayer (), true);
								}
								else
								{
									browser .getNotification () .string_ = _("Straighten Horizon") + ": " + _("off");
								}
							}
							.bind (this),
						},
					},
					"separator2": "--------",
					"primitive-quality": {
						name: _("Primitive Quality"),
						className: "context-menu-icon x_ite-private-icon-primitive-quality",
						items: {
							"high": {
								name: _("High"),
								type: "radio",
								radio: "primitive-quality",
								selected: browser .getBrowserOption ("PrimitiveQuality") === "HIGH",
								events: {
									click: function ()
									{
										browser .setBrowserOption ("PrimitiveQuality", "HIGH");
										browser .getNotification () .string_ = _("Primitive Quality") + ": " + _("high");
									}
									.bind (this),
								},
							},
							"medium": {
								name: _("Medium"),
								type: "radio",
								radio: "primitive-quality",
								selected: browser .getBrowserOption ("PrimitiveQuality") === "MEDIUM",
								events: {
									click: function ()
									{
										browser .setBrowserOption ("PrimitiveQuality", "MEDIUM");
										browser .getNotification () .string_ = _("Primitive Quality") + ": " + _("medium");
									}
									.bind (this),
								},
							},
							"low": {
								name: _("Low"),
								type: "radio",
								radio: "primitive-quality",
								selected: browser .getBrowserOption ("PrimitiveQuality") === "LOW",
								events: {
									click: function ()
									{
										browser .setBrowserOption ("PrimitiveQuality", "LOW");
										browser .getNotification () .string_ = _("Primitive Quality") + ": " + _("low");
									}
									.bind (this),
								},
							},
						},
					},
					"texture-quality": {
						name: _("Texture Quality"),
						className: "context-menu-icon x_ite-private-icon-texture-quality",
						items: {
							"high": {
								name: _("High"),
								type: "radio",
								radio: "texture-quality",
								selected: browser .getBrowserOption ("TextureQuality") === "HIGH",
								events: {
									click: function ()
									{
										browser .setBrowserOption ("TextureQuality", "HIGH");
										browser .getNotification () .string_ = _("Texture Quality") + ": " + _("high");
									}
									.bind (this),
								},
							},
							"medium": {
								name: _("Medium"),
								type: "radio",
								radio: "texture-quality",
								selected: browser .getBrowserOption ("TextureQuality") === "MEDIUM",
								events: {
									click: function ()
									{
										browser .setBrowserOption ("TextureQuality", "MEDIUM");
										browser .getNotification () .string_ = _("Texture Quality") + ": " + _("medium");
									}
									.bind (this),
								},
							},
							"low": {
								name: _("Low"),
								type: "radio",
								radio: "texture-quality",
								selected: browser .getBrowserOption ("TextureQuality") === "LOW",
								events: {
									click: function ()
									{
										browser .setBrowserOption ("TextureQuality", "LOW");
										browser .getNotification () .string_ = _("Texture Quality") + ": " + _("low");
									}
									.bind (this),
								},
							},
						},
					},
					"display-rubberband": {
						name: _("Display Rubberband"),
						type: "checkbox",
						selected: browser .getBrowserOption ("Rubberband"),
						events: {
							click: function (event)
							{
								const rubberband = $(event .target) .is (":checked");

								browser .setBrowserOption ("Rubberband", rubberband);

								if (rubberband)
									browser .getNotification () .string_ = _("Rubberband") + ": " + _("on");
								else
									browser .getNotification () .string_ = _("Rubberband") + ": " + _("off");
							}
							.bind (this),
						},
					},
					"browser-timings": {
						name: _("Browser Timings"),
						type: "checkbox",
						selected: browser .getBrowserOption ("Timings"),
						events: {
							click: function (event)
							{
								browser .setBrowserOption ("Timings", $(event .target) .is (":checked"));
								browser .getSurface () .focus ();
							}
							.bind (this),
						},
					},
					"fullscreen": {
						name: fullscreen ? _("Leave Fullscreen") : _("Fullscreen"),
						className: "context-menu-icon " + (fullscreen ? "x_ite-private-icon-leave-fullscreen" : "x_ite-private-icon-fullscreen"),
						callback: function ()
						{
							browser .getElement () .toggleFullScreen ();
						}
						.bind (this),
					},
					"separator3": "--------",
					"world-info": {
						name: _("Show World Info"),
						className: "context-menu-icon x_ite-private-icon-world-info",
						callback: function ()
						{
							define .show ();

							require (["https://cdn.jsdelivr.net/gh/showdownjs/showdown@1.9.1/dist/showdown.min.js"], function (showdown)
							{
								define .hide ();

								browser .getElement () .find (".x_ite-private-world-info") .remove ();

								const
									converter = new showdown .Converter (),
									priv      = browser .getElement () .find (".x_ite-private-browser"),
									overlay   = $("<div></div>") .addClass ("x_ite-private-world-info-overlay") .appendTo (priv),
									div       = $("<div></div>") .addClass ("x_ite-private-world-info") .appendTo (overlay),
									worldInfo = browser .getExecutionContext () .getWorldInfos () [0],
									title     = worldInfo .title,
									info      = worldInfo .info;

								converter .setOption ("omitExtraWLInCodeBlocks",            true);
								converter .setOption ("simplifiedAutoLink",                 true);
								converter .setOption ("excludeTrailingPunctuationFromURLs", true);
								converter .setOption ("literalMidWordUnderscores",          true);
								converter .setOption ("strikethrough",                      true);
								converter .setOption ("openLinksInNewWindow",               false);

								$("<div></div>") .addClass ("x_ite-private-world-info-top") .text ("World Info") .appendTo (div);

								if (title .length)
								{
									$("<div></div>") .addClass ("x_ite-private-world-info-title") .text (title) .appendTo (div);
								}

								for (const line of info)
								{
									$("<div></div>") .addClass ("x_ite-private-world-info-info") .html (converter .makeHtml (line)) .appendTo (div);
								}

								div .find ("a") .on ("click", function (event) { event .stopPropagation (); });

								// Open external link in new tab.
								div .find ("a[href^=http]") .each (function ()
								{
									if (this .href .indexOf (location .hostname) !== -1)
										return;

									$(this) .attr ("target", "_blank");
								});

								overlay .on ("click", function () { overlay .remove (); });
							})
						},
					},
					"about": {
						name: _("About X_ITE"),
						className: "context-menu-icon x_ite-private-icon-help-about",
						callback: function ()
						{
							window .open (browser .getProviderUrl ());
						},
					},
				}
			};

			if (leftSubMenus)
				menu .className += " x_ite-private-menu-submenus-left";

			if ($.isEmptyObject (menu .items .viewpoints .items))
			{
				delete menu .items ["separator0"];
				delete menu .items ["viewpoints"];
			}

			if (Object .keys (menu .items ["available-viewers"] .items) .length < 2)
			{
				delete menu .items ["available-viewers"];
			}

			if (!browser .getCurrentViewer () .match (/^(?:EXAMINE|FLY)$/) || (currentViewpoint && currentViewpoint .getTypeName () === "GeoViewpoint"))
			{
				delete menu .items ["straighten-horizon"];
			}

			const worldInfo = browser .getExecutionContext () .getWorldInfos () [0];

			if (!worldInfo || (worldInfo .title .length === 0 && worldInfo .info .length === 0))
			{
				delete menu .items ["world-info"];
			}

			return menu;
		},
		getViewpoints: function ()
		{
			var
				browser     = this .getBrowser (),
				activeLayer = browser .getActiveLayer ();

			if (! activeLayer)
				return { };

			var
				enableInlineViewpoints = browser .getBrowserOption ("EnableInlineViewpoints"),
				currentScene           = browser .currentScene,
				viewpoints             = activeLayer .getViewpoints () .get (),
				currentViewpoint       = activeLayer .getViewpoint (),
				menu                   = { };

			for (var i = 0; i < viewpoints .length; ++ i)
			{
				var
					viewpoint   = viewpoints [i],
					description = viewpoint .description_ .getValue ();

				if (description === "")
					continue;

				if (! enableInlineViewpoints && viewpoint .getScene () !== currentScene)
					continue;

				var item = {
					name: description,
					callback: function (viewpoint)
					{
						browser .bindViewpoint (browser .getActiveLayer (), viewpoint);
						browser .getSurface () .focus ();
					}
					.bind (this, viewpoint),
				};

				if (viewpoint === currentViewpoint)
					item .className = "context-menu-selected";

				menu ["Viewpoint" + viewpoint .getId ()] = item;
			}

			return menu;
		},
		getAvailableViewers: function ()
		{
			var
				browser          = this .getBrowser (),
				currentViewer    = browser .viewer_ .getValue (),
				availableViewers = browser .availableViewers_,
				menu             = { };

			for (var i = 0; i < availableViewers .length; ++ i)
			{
				var viewer = availableViewers [i];

				menu [viewer] = {
					name: _(this .getViewerName (viewer)),
					className: "context-menu-icon x_ite-private-icon-" + viewer .toLowerCase () + "-viewer",
					callback: function (viewer)
					{
						browser .viewer_ = viewer;
						browser .getNotification () .string_ = _(this .getViewerName (viewer));
						browser .getSurface () .focus ();
					}
					.bind (this, viewer),
				};

				if (viewer === currentViewer)
				   menu [viewer] .className += " context-menu-selected";
			}

		   return menu;
		},
		getViewerName: function (viewer)
		{
			switch (viewer)
			{
				case "EXAMINE":
					return _("Examine Viewer");
				case "WALK":
					return _("Walk Viewer");
				case "FLY":
					return _("Fly Viewer");
				case "PLANE":
					return _("Plane Viewer");
				case "LOOKAT":
					return _("Look At Viewer");
				case "NONE":
					return _("None Viewer");
			}
		},
	});

	return ContextMenu;
});
