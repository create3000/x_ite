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
	"excite/Basic/X3DBaseNode",
	"lib/gettext",
	"lib/jquery-contextMenu/dist/jquery.contextMenu",
	"lib/jquery.fullscreen-min",
],
function ($,
          X3DBaseNode,
          _)
{
"use strict";
	
	$("head") .append ('<style>.excite-private-menu-title:before { content: "' + _("Excite X3D Browser") + '" }</style>');

	function ContextMenu (executionContext)
	{
		X3DBaseNode .call (this, executionContext);
	}

	ContextMenu .prototype = $.extend (Object .create (X3DBaseNode .prototype),
	{
		constructor: ContextMenu,
		getTypeName: function ()
		{
			return "ContextMenu";
		},
		getComponentName: function ()
		{
			return "Excite";
		},
		getContainerField: function ()
		{
			return "contextMenu";
		},
		initialize: function ()
		{
			X3DBaseNode .prototype .initialize .call (this);

			if (! this .getBrowser () .getBrowserOptions () .getContextMenu ())
				return;

			$.contextMenu ({
				selector: ".excite-private-surface-" + this .getBrowser () .getId (), 
				build: this .build .bind (this),
			});
		},
		build: function (trigger, event)
		{
			var
				activeLayer      = this .getBrowser () .getActiveLayer (),
				currentViewpoint = activeLayer ? activeLayer .getViewpoint () : null,
				currentViewer    = this .getBrowser () .viewer_ .getValue (),
				fullscreen       = this .getBrowser () .getElement () .fullScreen ();

			var menu = {
				className: "excite-private-menu excite-private-menu-title",
				items: {
					"separator0": "--------",
					"viewpoints": {
						name: _("Viewpoints"),
						className: "context-menu-icon excite-private-icon-viewpoint",
						items: this .getViewpoints (),
						callback: function (viewpoint)
						{
						   if (! viewpoint)
						      return;

							$(".context-menu-list") .fadeOut (500);
							this .getBrowser () .bindViewpoint (viewpoint);
							this .getBrowser () .getCanvas () .focus ();
						}
						.bind (this, currentViewpoint),
					},
					"separator1": "--------",
					"viewer": {
						name: _(this .getViewerName (currentViewer)),
						className: "context-menu-icon excite-private-icon-" + currentViewer .toLowerCase () + "-viewer",
						callback: function (viewer)
						{
							$(".context-menu-list") .fadeOut (500);
							this .getBrowser () .viewer_ = viewer;
							this .getBrowser () .getNotification () .string_ = _(this .getViewerName (viewer));
							this .getBrowser () .getCanvas () .focus ();
						}
						.bind (this, currentViewer),
					},
					"available-viewer": {
						name: _("Available Viewers"),
						items: this .getAvailableViewers (),
					},
					"separator2": "--------",
					"primitive-quality": {
						name: _("Primitive Quality"),
						className: "context-menu-icon excite-private-icon-primitive-quality",
						items: {
							"high": {
								name: _("High"),
								type: "radio",
								radio: "primitive-quality",
								selected: this .getBrowser () .getBrowserOption ("PrimitiveQuality") === "HIGH",
								events: {
									click: function ()
									{
										this .getBrowser () .setBrowserOption ("PrimitiveQuality", "HIGH");
										this .getBrowser () .getNotification () .string_ = _("Primitive Quality") + ": " + _("high");
									}
									.bind (this),
								},
							},
							"medium": {
								name: _("Medium"),
								type: "radio",
								radio: "primitive-quality",
								selected: this .getBrowser () .getBrowserOption ("PrimitiveQuality") === "MEDIUM",
								events: {
									click: function ()
									{
										this .getBrowser () .setBrowserOption ("PrimitiveQuality", "MEDIUM");
										this .getBrowser () .getNotification () .string_ = _("Primitive Quality") + ": " + _("medium");
									}
									.bind (this),
								},
							},
							"low": {
								name: _("Low"),
								type: "radio",
								radio: "primitive-quality",
								selected: this .getBrowser () .getBrowserOption ("PrimitiveQuality") === "LOW",
								events: {
									click: function ()
									{
										this .getBrowser () .setBrowserOption ("PrimitiveQuality", "LOW");
										this .getBrowser () .getNotification () .string_ = _("Primitive Quality") + ": " + _("low");
									}
									.bind (this),
								},
							},
						},
					},
					"texture-quality": {
						name: _("Texture Quality"),
						className: "context-menu-icon excite-private-icon-texture-quality",
						items: {
							"high": {
								name: _("High"),
								type: "radio",
								radio: "texture-quality",
								selected: this .getBrowser () .getBrowserOption ("TextureQuality") === "HIGH",
								events: {
									click: function ()
									{
										this .getBrowser () .setBrowserOption ("TextureQuality", "HIGH");
										this .getBrowser () .getNotification () .string_ = _("Texture Quality") + ": " + _("high");
									}
									.bind (this),
								},
							},
							"medium": {
								name: _("Medium"),
								type: "radio",
								radio: "texture-quality",
								selected: this .getBrowser () .getBrowserOption ("TextureQuality") === "MEDIUM",
								events: {
									click: function ()
									{
										this .getBrowser () .setBrowserOption ("TextureQuality", "MEDIUM");
										this .getBrowser () .getNotification () .string_ = _("Texture Quality") + ": " + _("medium");
									}
									.bind (this),
								},
							},
							"low": {
								name: _("Low"),
								type: "radio",
								radio: "texture-quality",
								selected: this .getBrowser () .getBrowserOption ("TextureQuality") === "LOW",
								events: {
									click: function ()
									{
										this .getBrowser () .setBrowserOption ("TextureQuality", "LOW");
										this .getBrowser () .getNotification () .string_ = _("Texture Quality") + ": " + _("low");
									}
									.bind (this),
								},
							},
						},
					},
					"display-rubberband": {
						name: _("Display Rubberband"),
						type: "checkbox",
						selected: this .getBrowser () .getBrowserOption ("Rubberband"),
						events: {
							click: function ()
							{
							   var rubberband = ! this .getBrowser () .getBrowserOption ("Rubberband");

								this .getBrowser () .setBrowserOption ("Rubberband", rubberband);

								if (rubberband)
									this .getBrowser () .getNotification () .string_ = _("Rubberband") + ": " + _("on");
								else
									this .getBrowser () .getNotification () .string_ = _("Rubberband") + ": " + _("off");
							}
							.bind (this),
						},
					},
					"browser-timings": this .getBrowser () .getBrowserOptions () .getTimings () ? {
						name: _("Browser Timings"),
						type: "checkbox",
						selected: this .getBrowser () .getBrowserTimings () .enabled_ .getValue (),
						events: {
							click: function ()
							{
								this .getBrowser () .getBrowserTimings () .enabled_ = ! this .getBrowser () .getBrowserTimings () .enabled_ .getValue ();
								this .getBrowser () .getCanvas () .focus ();
							}
							.bind (this),
						},
					} : undefined,
					"mute-browser": {
						name: _("Mute Browser"),
						type: "checkbox",
						selected: this .getBrowser () .mute_ .getValue (),
						events: {
							click: function ()
							{
							   var mute = ! this .getBrowser () .mute_ .getValue ();
								this .getBrowser () .mute_ = mute;
								this .getBrowser () .getNotification () .string_ = mute ? _("Browser muted") : _("Browser unmuted");
							}
							.bind (this),
						},
					},
					"fullscreen": {
						name: fullscreen ? _("Leave Fullscreen") : _("Fullscreen"),
						className: "context-menu-icon " + (fullscreen ? "excite-private-icon-leave-fullscreen" : "excite-private-icon-fullscreen"),
						callback: function ()
						{
						   this .getBrowser () .getElement () .toggleFullScreen ();
						}
						.bind (this),
					},
					"separator3": "--------",
					"about": {
						name: _("About Excite X3D"),
						className: "context-menu-icon excite-private-icon-help-about",
						callback: function ()
						{
						   window .open ("http://create3000.de/excite/");
						},
					},
				}
			};

			if ($.isEmptyObject (menu .items .viewpoints .items))
			{
				delete menu .items .separator0;
				delete menu .items .viewpoints;
			}

			return menu;
		},
		getViewpoints: function ()
		{
			var activeLayer = this .getBrowser () .getActiveLayer ();

			if (! activeLayer)
				return { };

			var
				viewpoints       = activeLayer .getViewpoints () .get (),
				currentViewpoint = activeLayer .getViewpoint (),
				menu             = { };

			for (var i = 0; i < viewpoints .length; ++ i)
			{
				var
					viewpoint   = viewpoints [i],
					description = viewpoint .description_ .getValue ();

				if (description === "")
					continue;

				var item = {
					name: description,
					callback: function (viewpoint)
					{
						$(".context-menu-list") .fadeOut (500);
						this .getBrowser () .bindViewpoint (viewpoint);
						this .getBrowser () .getCanvas () .focus ();
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
				currentViewer    = this .getBrowser () .viewer_ .getValue (),
				availableViewers = this .getBrowser () .availableViewers_,
				menu             = { };

			for (var i = 0; i < availableViewers .length; ++ i)
			{
				var viewer = availableViewers [i];

				menu [viewer] = {
					name: _(this .getViewerName (viewer)),
					className: "context-menu-icon excite-private-icon-" + viewer .toLowerCase () + "-viewer",
					callback: function (viewer)
					{
						$(".context-menu-list") .fadeOut (500);
						this .getBrowser () .viewer_ = viewer;
						this .getBrowser () .getNotification () .string_ = _(this .getViewerName (viewer));
						this .getBrowser () .getCanvas () .focus ();
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
