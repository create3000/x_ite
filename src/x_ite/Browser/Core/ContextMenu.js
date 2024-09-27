/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

import X3DBaseNode from "../../Base/X3DBaseNode.js";
import _           from "../../../locale/gettext.js";

typeof jquery_fullscreen; // import plugin

const
   _options  = Symbol (),
   _userMenu = Symbol ();

function ContextMenu (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this [_userMenu] = null;
}

Object .assign (Object .setPrototypeOf (ContextMenu .prototype, X3DBaseNode .prototype),
{
   initialize ()
   {
      X3DBaseNode .prototype .initialize .call (this);

      const browser = this .getBrowser ();

      this [_options] = {
         element: browser .getElement (),
         appendTo: browser .getShadow (),
         build: this .build .bind (this),
         animation: { duration: 500, show: "fadeIn", hide: "fadeOut" },
      };

      this [_options] .element .on ("contextmenu.ContextMenu", event => this .show (event));
   },
   getUserMenu ()
   {
      return this [_userMenu];
   },
   setUserMenu (userMenu)
   {
      this [_userMenu] = userMenu;
   },
   createUserMenu ()
   {
      const userMenu = { };

      if (typeof this [_userMenu] === "function")
      {
         const menu = this [_userMenu] (this .getBrowser ());

         if ($.isPlainObject (menu))
         {
            for (const key in menu)
               userMenu [`user-${key}`] = menu [key];
         }
      }

      return userMenu;
   },
   hide (event)
   {
      // Will be overridden by a generated function on show.
   },
   show (event)
   {
      const
         options = this [_options],
         menu    = options .build (event),
         level   = 1;

      if (!menu) return;

      // Layer

      const layer = $("<div></div>")
         .addClass ("context-menu-layer")
         .addClass (menu .className)
         .appendTo (options .appendTo);

      const hide = this .hide = () =>
      {
         delete this .hide;

         layer .remove ();

         ul [options .animation .hide] (options .animation .duration, function ()
         {
            ul .remove ();

            if (typeof options .events ?.hide === "function")
               options .events .hide ();
         });

         return false;
      };

      // Menu

      const ul = $("<ul></ul>")
         .hide ()
         .addClass ("context-menu-root")
         .addClass ("context-menu-list")
         .addClass (menu .className)
         .offset ({ "left": event .pageX, "top": event .pageY })
         .appendTo (options .appendTo);

      for (const k in menu .items)
         ul .append (this .createItem (menu .items [k], "context-menu-root", k, level + 1, hide));

      ul [options .animation .show] (options .animation .duration);

      // Reposition menu if to right or to low.

      ul .offset ({ "left": event .pageX, "top": event .pageY }); // Do it again!

      if (ul .offset () .left - $(document) .scrollLeft () + ul .outerWidth () > $(window) .width ())
         ul .offset ({ "left":  $(document) .scrollLeft () + Math .max (0, $(window) .width () - ul .outerWidth ()) });

      if (ul .offset () .top - $(document) .scrollTop () + ul .outerHeight () > $(window) .height ())
         ul .offset ({ "top": $(document) .scrollTop () + Math .max (0, $(window) .height () - ul .outerHeight ()) });

      // Display submenus on the left or right side.
      // If the submenu is higher than vh, add scrollbars.

      ul .find ("ul") .each ((i, e) =>
      {
         e = $(e);

         const
            width    = e .outerWidth () + ul .outerWidth (),
            position = ul .offset () .left - $(document) .scrollLeft () + width > $(window) .width () ? "right" : "left";

         e .css ("width", e .outerWidth ());
         e .css (position, e .parent () .closest ("ul") .width ());

         if (e .outerHeight () >= $(window) .height ())
            e .css ({ "max-height": "100vh", "overflow-y": "scroll" });
      });

      // If the submenu is higher than vh, reposition it.

      ul .find ("li") .on ("mouseenter touchstart", function (event)
      {
         event .stopImmediatePropagation ();

         const
            t = $(event .target) .closest ("li"),
            e = t .children ("ul");

         if (!e .length)
            return;

         e .css ("top", "");

         const bottom = e .offset () .top + e .outerHeight () - $(window) .scrollTop () - $(window) .height ();

         if (bottom > 0)
            e .offset ({ "top": e .offset () .top - bottom });
      });

      // Layer

      layer .on ("click contextmenu", hide);
      ul .on ("contextmenu", hide);

      // Show

      if (typeof options .events ?.show === "function")
         options .events .show (ul);

      return false;
   },
   createItem (item, parent, key, level, hide)
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
                     .attr ("name", "context-menu-input-" + (item .radio || parent));

                  $("<span></span>") .text (item .name) .appendTo (label);

                  if (item .selected)
                     input .attr ("checked", "checked");

                  for (const k in item .events)
                  {
                     if (typeof item .events [k] === "function")
                        input .on (k, item .events [k]);
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
            ul .append (this .createItem (item .items [k], key, k, level + 1, hide));

         li .addClass ("context-menu-submenu");
      }

      return li;
   },
   build (event)
   {
      const
         browser    = this .getBrowser (),
         fullscreen = browser .getElement () .fullScreen ();

      if (!browser .getBrowserOption ("ContextMenu"))
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
            "available-viewers": {
               name: _("Available Viewers"),
               items: this .getAvailableViewers (),
            },
            "straighten-horizon": {
               name: _("Straighten Horizon"),
               type: "checkbox",
               selected: browser .getBrowserOption ("StraightenHorizon"),
               events: {
                  click: (event) =>
                  {
                     const straightenHorizon = $(event .target) .is (":checked");

                     browser .setBrowserOption ("StraightenHorizon", straightenHorizon);

                     if (straightenHorizon)
                        browser .getNotification () ._string = _("Straighten Horizon") + ": " + _("on");
                     else
                        browser .getNotification () ._string = _("Straighten Horizon") + ": " + _("off");
                  },
               },
            },
            "display-rubberband": {
               name: _("Display Rubberband"),
               type: "checkbox",
               selected: browser .getBrowserOption ("Rubberband"),
               events: {
                  click: (event) =>
                  {
                     const rubberband = $(event .target) .is (":checked");

                     browser .setBrowserOption ("Rubberband", rubberband);

                     if (rubberband)
                        browser .getNotification () ._string = _("Rubberband") + ": " + _("on");
                     else
                        browser .getNotification () ._string = _("Rubberband") + ": " + _("off");
                  },
               },
            },
            "separator1": "--------",
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
                        click: () =>
                        {
                           browser .setBrowserOption ("PrimitiveQuality", "HIGH");
                           browser .getNotification () ._string = _("Primitive Quality") + ": " + _("high");
                        },
                     },
                  },
                  "medium": {
                     name: _("Medium"),
                     type: "radio",
                     radio: "primitive-quality",
                     selected: browser .getBrowserOption ("PrimitiveQuality") === "MEDIUM",
                     events: {
                        click: () =>
                        {
                           browser .setBrowserOption ("PrimitiveQuality", "MEDIUM");
                           browser .getNotification () ._string = _("Primitive Quality") + ": " + _("medium");
                        },
                     },
                  },
                  "low": {
                     name: _("Low"),
                     type: "radio",
                     radio: "primitive-quality",
                     selected: browser .getBrowserOption ("PrimitiveQuality") === "LOW",
                     events: {
                        click: () =>
                        {
                           browser .setBrowserOption ("PrimitiveQuality", "LOW");
                           browser .getNotification () ._string = _("Primitive Quality") + ": " + _("low");
                        },
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
                        click: () =>
                        {
                           browser .setBrowserOption ("TextureQuality", "HIGH");
                           browser .getNotification () ._string = _("Texture Quality") + ": " + _("high");
                        },
                     },
                  },
                  "medium": {
                     name: _("Medium"),
                     type: "radio",
                     radio: "texture-quality",
                     selected: browser .getBrowserOption ("TextureQuality") === "MEDIUM",
                     events: {
                        click: () =>
                        {
                           browser .setBrowserOption ("TextureQuality", "MEDIUM");
                           browser .getNotification () ._string = _("Texture Quality") + ": " + _("medium");
                        },
                     },
                  },
                  "low": {
                     name: _("Low"),
                     type: "radio",
                     radio: "texture-quality",
                     selected: browser .getBrowserOption ("TextureQuality") === "LOW",
                     events: {
                        click: () =>
                        {
                           browser .setBrowserOption ("TextureQuality", "LOW");
                           browser .getNotification () ._string = _("Texture Quality") + ": " + _("low");
                        },
                     },
                  },
               },
            },
            "shading": {
               name: _("Shading"),
               className: "context-menu-icon x_ite-private-icon-shading",
               items: {
                  "point": {
                     name: _("Points"),
                     type: "radio",
                     radio: "shading",
                     selected: browser .getBrowserOption ("Shading") === "POINT",
                     events: {
                        click: () =>
                        {
                           browser .setBrowserOption ("Shading", "POINT");
                           browser .getNotification () ._string = _("Shading") + ": " + _("Points");
                        },
                     },
                  },
                  "wireframe": {
                     name: _("Wireframe"),
                     type: "radio",
                     radio: "shading",
                     selected: browser .getBrowserOption ("Shading") === "WIREFRAME",
                     events: {
                        click: () =>
                        {
                           browser .setBrowserOption ("Shading", "WIREFRAME");
                           browser .getNotification () ._string = _("Shading") + ": " + _("Wireframe");
                        },
                     },
                  },
                  "flat": {
                     name: _("Flat"),
                     type: "radio",
                     radio: "shading",
                     selected: browser .getBrowserOption ("Shading") === "FLAT",
                     events: {
                        click: () =>
                        {
                           browser .setBrowserOption ("Shading", "FLAT");
                           browser .getNotification () ._string = _("Shading") + ": " + _("Flat");
                        },
                     },
                  },
                  "gouraud": {
                     name: _("Gouraud"),
                     type: "radio",
                     radio: "shading",
                     selected: browser .getBrowserOption ("Shading") === "GOURAUD",
                     events: {
                        click: () =>
                        {
                           browser .setBrowserOption ("Shading", "GOURAUD");
                           browser .getNotification () ._string = _("Shading") + ": " + _("Gouraud");
                        },
                     },
                  },
                  "phong": {
                     name: _("Phong"),
                     type: "radio",
                     radio: "shading",
                     selected: browser .getBrowserOption ("Shading") === "PHONG",
                     events: {
                        click: () =>
                        {
                           browser .setBrowserOption ("Shading", "PHONG");
                           browser .getNotification () ._string = _("Shading") + ": " + _("Phong");
                        },
                     },
                  },
               },
            },
            "separator2": "--------",

            // Insert custom user menu items.
            ... this .createUserMenu (),

            "separator3": "--------",
            "browser-timings": {
               name: _("Browser Timings"),
               type: "checkbox",
               selected: browser .getBrowserOption ("Timings"),
               events: {
                  click: (event) =>
                  {
                     browser .setBrowserOption ("Timings", $(event .target) .is (":checked"));
                     browser .getSurface () .focus ();
                  },
               },
            },
            "fullscreen": {
               name: fullscreen ? _("Leave Fullscreen") : _("Fullscreen"),
               className: "context-menu-icon " + (fullscreen
                  ? "x_ite-private-icon-leave-fullscreen"
                  : "x_ite-private-icon-enter-fullscreen"),
               callback: () =>
               {
                  browser .getElement () .toggleFullScreen ();
               },
            },
            "separator4": "--------",
            "world-info": {
               name: _("Show World Info"),
               className: "context-menu-icon x_ite-private-icon-world-info",
               callback ()
               {
                  browser .getShadow () .find (".x_ite-private-world-info") .remove ();

                  const
                     priv      = browser .getShadow () .find (".x_ite-private-browser"),
                     overlay   = $("<div></div>") .addClass ("x_ite-private-world-info-overlay") .appendTo (priv),
                     div       = $("<div></div>") .addClass ("x_ite-private-world-info") .appendTo (overlay),
                     worldInfo = browser .getExecutionContext () .getWorldInfos () [0],
                     title     = worldInfo .title,
                     info      = worldInfo .info;

                  $("<div></div>") .addClass ("x_ite-private-world-info-top") .text ("World Info") .appendTo (div);

                  if (title .length)
                  {
                     $("<div></div>") .addClass ("x_ite-private-world-info-title") .text (title) .appendTo (div);
                  }

                  for (const line of info)
                  {
                     $("<div></div>") .addClass ("x_ite-private-world-info-info") .text (line) .appendTo (div);
                  }

                  overlay .on ("click", function () { overlay .remove (); });
               },
            },
            "about": {
               name: _("About X_ITE"),
               className: "context-menu-icon x_ite-private-icon-help-about",
               callback ()
               {
                  window .open (browser .getProviderURL ());
               },
            },
         },
      };

      if ($.isEmptyObject (menu .items .viewpoints .items))
         delete menu .items ["viewpoints"];

      if (Object .keys (menu .items ["available-viewers"] .items) .length < 2)
      {
         delete menu .items ["available-viewers"];
      }

      if (!browser .getCurrentViewer () .match (/^(?:EXAMINE|FLY)$/))
      {
         delete menu .items ["straighten-horizon"];
      }

      if (!browser .getBrowserOption ("Debug"))
      {
         delete menu .items ["shading"];
      }

      const worldInfo = browser .getExecutionContext () .getWorldInfos () [0];

      if (!worldInfo || (worldInfo .title .length === 0 && worldInfo .info .length === 0))
      {
         delete menu .items ["world-info"];
      }

      return menu;
   },
   getViewpoints ()
   {
      const
         browser     = this .getBrowser (),
         activeLayer = browser .getActiveLayer ();

      if (!activeLayer)
         return { };

      const
         viewpoints       = activeLayer .getUserViewpoints (),
         currentViewpoint = activeLayer .getViewpoint (),
         menu             = { };

      for (const viewpoint of viewpoints)
      {
         const description = viewpoint .getDescriptions () .join (" » ");

         const item = {
            name: description,
            callback: () =>
            {
               browser .bindViewpoint (browser .getActiveLayer (), viewpoint);
               browser .getSurface () .focus ();
            },
         };

         if (viewpoint === currentViewpoint)
            item .className = "context-menu-selected";

         menu [`Viewpoint-${viewpoint .getId ()}`] = item;
      }

      return menu;
   },
   getAvailableViewers ()
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
            callback: () =>
            {
               browser ._viewer = viewer;
               browser .getNotification () ._string = _(this .getViewerName (viewer));
               browser .getSurface () .focus ();
            },
         };

         if (viewer === currentViewer)
            menu [viewer] .className += " context-menu-selected";
      }

      return menu;
   },
   getViewerName (viewer)
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

Object .defineProperties (ContextMenu,
{
   typeName:
   {
      value: "ContextMenu",
      enumerable: true,
   },
});

export default ContextMenu;
