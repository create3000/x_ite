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
   "x_ite/Base/X3DBaseNode",
   "locale/gettext",
   "lib/jquery.fullscreen-min",
   "jquery-mousewheel",
],
function ($,
          X3DBaseNode,
          _)
{
"use strict";

   function ContextMenu (executionContext)
   {
      X3DBaseNode .call (this, executionContext);

      this .userMenu = null;
      this .active   = false;
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

         this .initializeContextMenu ({
            element: browser .getElement (),
            appendTo: browser .getShadow (),
            build: this .build .bind (this),
            animation: {duration: 500, show: "fadeIn", hide: "fadeOut"},
         });
      },
      getUserMenu: function ()
      {
         return this .userMenu;
      },
      setUserMenu: function (userMenu)
      {
         this .userMenu = userMenu;
      },
      build: function (event)
      {
         const
            browser          = this .getBrowser (),
            activeLayer      = browser .getActiveLayer (),
            currentViewpoint = activeLayer ? activeLayer .getViewpoint () : null,
            currentViewer    = browser ._viewer .getValue (),
            fullscreen       = browser .getElement () .fullScreen ();

         if (! browser .getBrowserOptions () .getContextMenu ())
            return;

         const menu = {
            className: "x_ite-private-menu",
            items: {
               "title": {
                  name: browser .getName () + " Browser v" + browser .getVersion (),
                  className: "context-menu-title context-menu-not-selectable",
               },
               "separator0": "--------",
               "viewpoints": {
                  name: _("Viewpoints"),
                  className: "context-menu-icon x_ite-private-icon-viewpoint",
                  items: this .getViewpoints (),
               },
               "separator1": "--------",
               "viewer": {
                  name: _(this .getViewerName (currentViewer)),
                  className: "context-menu-icon x_ite-private-icon-" + currentViewer .toLowerCase () + "-viewer",
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
                           browser .getNotification () ._string = _("Straighten Horizon") + ": " + _("on");

                           const activeViewpoint = browser .getActiveViewpoint ();

                           if (activeViewpoint)
                              activeViewpoint .straighten (browser .getActiveLayer (), true);
                        }
                        else
                        {
                           browser .getNotification () ._string = _("Straighten Horizon") + ": " + _("off");
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
                              browser .getNotification () ._string = _("Primitive Quality") + ": " + _("high");
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
                              browser .getNotification () ._string = _("Primitive Quality") + ": " + _("medium");
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
                              browser .getNotification () ._string = _("Primitive Quality") + ": " + _("low");
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
                              browser .getNotification () ._string = _("Texture Quality") + ": " + _("high");
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
                              browser .getNotification () ._string = _("Texture Quality") + ": " + _("medium");
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
                              browser .getNotification () ._string = _("Texture Quality") + ": " + _("low");
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
                           browser .getNotification () ._string = _("Rubberband") + ": " + _("on");
                        else
                           browser .getNotification () ._string = _("Rubberband") + ": " + _("off");
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
                  className: "context-menu-icon " + (fullscreen
                     ? "x_ite-private-icon-leave-fullscreen"
                     : "x_ite-private-icon-enter-fullscreen"),
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

                        browser .getShadow () .find (".x_ite-private-world-info") .remove ();

                        const
                           converter = new showdown .Converter (),
                           priv      = browser .getShadow () .find (".x_ite-private-browser"),
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
            },
         };

         if (typeof this .userMenu === "function")
         {
            const userMenu = this .userMenu ();

            if ($.isPlainObject (userMenu))
            {
               Object .assign (menu .items, { "separator4": "--------" });

               for (const key in userMenu)
                  menu .items ["user-" + key] = userMenu [key];
            }
         }

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
         const
            browser     = this .getBrowser (),
            activeLayer = browser .getActiveLayer ();

         if (! activeLayer)
            return { };

         const
            enableInlineViewpoints = browser .getBrowserOption ("EnableInlineViewpoints"),
            currentScene           = browser .currentScene,
            viewpoints             = activeLayer .getViewpoints () .get (),
            currentViewpoint       = activeLayer .getViewpoint (),
            menu                   = { };

         for (const viewpoint of viewpoints)
         {
            const description = viewpoint ._description .getValue ();

            if (description === "")
               continue;

            if (! enableInlineViewpoints && viewpoint .getScene () !== currentScene)
               continue;

            const item = {
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
         const
            browser          = this .getBrowser (),
            currentViewer    = browser ._viewer .getValue (),
            availableViewers = browser ._availableViewers,
            menu             = { };

         for (const viewer of availableViewers)
         {
            menu [viewer] = {
               name: _(this .getViewerName (viewer)),
               className: "context-menu-icon x_ite-private-icon-" + viewer .toLowerCase () + "-viewer",
               callback: function (viewer)
               {
                  browser ._viewer = viewer;
                  browser .getNotification () ._string = _(this .getViewerName (viewer));
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
      initializeContextMenu: function (options)
      {
         this .triggerContextMenu = this .showContextMenu .bind (this, options);

         options .element .on ("contextmenu", this .triggerContextMenu);
      },
      triggerContextMenu: function (event)
      { },
      showContextMenu: function (options, event)
      {
         const
            menu  = options .build (event),
            level = 1;

         if (! menu) return;

         // Layer

         const layer = $("<div></div>")
            .addClass ("context-menu-layer")
            .addClass (menu .className)
            .appendTo (options .appendTo);

         const hide = function ()
         {
            layer .remove ();

            ul [options .animation .hide] (options .animation .duration, function ()
            {
               ul .remove ();

               if (options .events && typeof options .events .hide === "function")
                  options .events .hide ();
            });

            return false;
         };

         // Menu

         const
            x = event .pageX - options .element .offset () .left,
            y = event .pageY - options .element .offset () .top;

         const ul = $("<ul></ul>")
            .addClass ("context-menu-list")
            .addClass (menu .className)
            .addClass ("context-menu-root")
            .css ({ "left": x, "top": y, "z-index": level, "display": "none" })
            .appendTo (options .appendTo);

         for (const k in menu .items)
            ul .append (this .buildItem (menu .items [k], "context-menu-root", k, level + 1, hide));

         ul [options .animation .show] (options .animation .duration);

         // Reposition menu if to right or to low.

         if (ul .offset () .left - $(document) .scrollLeft () + ul .outerWidth () > $(window) .width ())
            ul .offset ({ "left":  $(document) .scrollLeft () + Math .max (0, $(window) .width () - ul .outerWidth ()) });

         if (ul .offset () .top - $(document) .scrollTop () + ul .outerHeight () > $(window) .height ())
            ul .offset ({ "top": $(document) .scrollTop () + Math .max (0, $(window) .height () - ul .outerHeight ()) });

         // Display submenus on the left or right side..
         // If the submenu is higher than vh, add scrollbars.;

         ul .find ("ul") .each (function (i, e)
         {
            e = $(e);

            const
               width    = e .outerWidth () + ul .outerWidth (),
               position = ul .offset () .left - $(document) .scrollLeft () + width > $(window) .width () ? "right" : "left";

            e .css ("width", e .outerWidth ());
            e .css (position, e .parent () .closest ("ul") .width ());

            if (e .outerHeight () >= $(window) .height ())
            {
               e .css ({ "max-height": "100vh", "overflow-y": "scroll" });

               // Prevent scrolling of parent element.

               e .on ("mousewheel", function (event, d)
               {
                  if (d > 0)
                  {
                     if (e .scrollTop () <= 0)
                        event .preventDefault ();
                  }
                  else if (d < 0)
                  {
                     if (e .scrollTop () + e .innerHeight () >= e .get (0) .scrollHeight)
                        event .preventDefault ();
                  }
               });
            }
         });

         // If the submenu is higher than vh, reposition it.

         ul .find ("li") .on ("mouseenter touchstart", function (event)
         {
            event .stopImmediatePropagation ();

            const
               t = $(event .target) .closest ("li"),
               e = t .children ("ul");

            if (! e .length)
               return;

            const bottom = e .offset () .top + e .outerHeight () - $(window) .scrollTop () - $(window) .height ();

            if (bottom > 0)
               e .offset ({ "top": e .offset () .top - bottom });
            else
               e .css ("top", "");
         });

         // Layer

         layer .on ("click contextmenu", hide);
         ul .on ("contextmenu", hide);

         // Show

         if (options .events && typeof options .events .show === "function")
            options .events .show (ul);

         return false;
      },
      buildItem: function (item, parent, key, level, hide)
      {
         const li = $("<li></li>") .addClass ("context-menu-item");

         switch (typeof item)
         {
            case "string":
            {
               if (item .match (/^-+$/))
                  li .addClass (["context-menu-separator", "context-menu-not-selectable"]);

               break;
            }
            case "object":
            {
               if (item .className)
                  li .addClass (item .className);

               switch (item .type)
               {
                  case "radio":
                  case "checkbox":
                  {
                     const
                        label = $("<label></label>") .appendTo (li),
                        input = $("<input></input>") .appendTo (label);

                     input
                        .attr ("type", item .type)
                        .attr ("name", "context-menu-input-" + parent);

                     $("<span></span>") .text (item .name) .appendTo (label);

                     if (item .selected)
                        input .attr ("checked", "checked");

                     for (const key in item .events)
                     {
                        if (typeof item .events [key] === "function")
                           input .on (key, item .events [key]);
                     }

                     li .addClass ("context-menu-input");

                     break;
                  }
                  default:
                  {
                     if (item .name)
                        $("<span></span>") .text (item .name) .appendTo (li);

                     if (typeof item .callback === "function")
                        li .on ("click", item .callback) .on ("click", hide);

                     break;
                  }
               }

               break;
            }
         }

         if (typeof item .items === "object" && level < 3)
         {
            const ul = $("<ul></ul>")
               .addClass ("context-menu-list")
               .css ({ "z-index": level })
               .appendTo (li);

            for (const k in item .items)
               ul .append (this .buildItem (item .items [k], key, k, level + 1, hide));

            li .addClass ("context-menu-submenu");
         }

         return li;
      },
   });

   return ContextMenu;
});
