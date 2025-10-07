import X3DBaseNode from "../../Base/X3DBaseNode.js";
import _           from "../../../locale/gettext.js";

const
   _options  = Symbol (),
   _userMenu = Symbol (),
   _hide     = Symbol ();

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
         const menu = $.try (() => this [_userMenu] (this .getBrowser ()), true);

         if ($.isPlainObject (menu))
         {
            for (const key in menu)
               userMenu [`user-${key}`] = menu [key];
         }
      }

      return userMenu;
   },
   hide ()
   {
      this [_hide] ?.();
   },
   show (event)
   {
      const
         options = this [_options],
         menu    = options .build (event),
         level   = 1;

      this .hide ();

      if (!menu) return;

      // Layer

      const layer = $("<div></div>")
         .addClass (["context-menu-layer", menu .className])
         .appendTo (options .appendTo);

      this [_hide] = () =>
      {
         this [_hide] = null;

         layer .remove ();
         ul .children ()
            .removeClass ("x_ite-private-fade-in-300")
            .addClass ("x_ite-private-fade-out-300");

         setTimeout (() => ul .remove (), 1000);

         return false;
      };

      // Menu

      const ul = $("<ul></ul>")
         .hide ()
         .addClass (["context-menu-root", "context-menu-list", menu .className])
         .offset ({ "left": event .pageX, "top": event .pageY })
         .appendTo (options .appendTo);

      $("<div></div>")
         .addClass ("context-menu-background")
         .appendTo (ul);

      for (const k in menu .items)
         ul .append (this .createItem (menu .items [k], "context-menu-root", k, level + 1));

      // Show
      // Must animate children because of blurish background.

      ul .children () .addClass ("x_ite-private-hidden");
      ul .show ();
      ul .children ()
         .removeClass ("x_ite-private-hidden")
         .addClass ("x_ite-private-fade-in-300");

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

         e .children (":first-child") .css ("height", e .innerHeight ());

         e
            .css ("width",  e .outerWidth ())
            .css (position, e .parent () .closest ("ul") .width () - 12);

         if (e .outerHeight () >= $(window) .height ())
            e .css ({ "max-height": "100vh", "overflow-y": "scroll" });
      });

      // If the submenu is higher than vh, reposition it.

      ul .find ("li") .on ("mouseenter touchstart", event =>
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

      layer .on ("mousedown contextmenu", () => this .hide ());
      ul .on ("contextmenu", () => this .hide ());

      return false;
   },
   createItem (item, parent, key, level)
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
                     .attr ("name", `context-menu-input-${item .radio || parent}`);

                  $("<span></span>") .text (item .name) .appendTo (label);

                  if (item .selected)
                     input .attr ("checked", "");

                  li .addClass ("context-menu-input");
                  this .addEvents (item, input, false);
                  break;
               }
               default:
               {
                  if (item .name)
                     $("<span></span>") .text (item .name) .appendTo (li);

                  this .addEvents (item, li, true);
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
            .css ("z-index", level)
            .appendTo (li);

         $("<div></div>")
            .addClass ("context-menu-background")
            .appendTo (ul);

         for (const k in item .items)
            ul .append (this .createItem (item .items [k], key, k, level + 1));

         li .addClass ("context-menu-submenu");
      }

      return li;
   },
   addEvents (item, element, hide)
   {
      if (typeof item .callback === "function")
      {
         element .on ("click", item .callback);

         if (hide)
            element .on ("click", () => this .hide ());
      }

      if (typeof item .events === "object")
      {
         for (const k in item .events)
         {
            if (typeof item .events [k] === "function")
               element .on (k, item .events [k]);
         }
      }
   },
   build (event)
   {
      const
         browser    = this .getBrowser (),
         element    = browser .getElement (),
         fullscreen = document .fullscreenElement === element [0];

      if (!browser .getBrowserOption ("ContextMenu"))
         return;

      const menu = {
         className: "x_ite-private-menu",
         items: {
            "title": {
               name: `${browser .getName ()} Browser v${browser .getVersion ()}`,
               className: "context-menu-title context-menu-icon x_ite-private-icon-logo context-menu-not-selectable",
            },
            "separator0": "--------",
            "viewpoints": {
               name: _("Viewpoints"),
               className: "context-menu-icon x_ite-private-icon-viewpoint",
               items: this .getViewpoints (),
            },
            "available-viewers": {
               name: _("Available Viewers"),
               className: "context-menu-icon x_ite-private-icon-viewer",
               items: this .getAvailableViewers (),
            },
            "straighten-horizon": {
               name: _("Straighten Horizon"),
               type: "checkbox",
               selected: browser .getBrowserOption ("StraightenHorizon"),
               callback: (event) =>
               {
                  const straightenHorizon = $(event .target) .is (":checked");

                  browser .setBrowserOption ("StraightenHorizon", straightenHorizon);

                  if (straightenHorizon)
                     browser .setDescription (_("Straighten Horizon") + ": " + _("on"));
                  else
                     browser .setDescription (_("Straighten Horizon") + ": " + _("off"));
               },
            },
            "display-rubberband": {
               name: _("Display Rubberband"),
               type: "checkbox",
               selected: browser .getBrowserOption ("Rubberband"),
               callback: (event) =>
               {
                  const rubberband = $(event .target) .is (":checked");

                  browser .setBrowserOption ("Rubberband", rubberband);

                  if (rubberband)
                     browser .setDescription (_("Rubberband") + ": " + _("on"));
                  else
                     browser .setDescription (_("Rubberband") + ": " + _("off"));
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
                     callback: () =>
                     {
                        browser .setBrowserOption ("PrimitiveQuality", "HIGH");
                        browser .setDescription (_("Primitive Quality") + ": " + _("high"));
                     },
                  },
                  "medium": {
                     name: _("Medium"),
                     type: "radio",
                     radio: "primitive-quality",
                     selected: browser .getBrowserOption ("PrimitiveQuality") === "MEDIUM",
                     callback: () =>
                     {
                        browser .setBrowserOption ("PrimitiveQuality", "MEDIUM");
                        browser .setDescription (_("Primitive Quality") + ": " + _("medium"));
                     },
                  },
                  "low": {
                     name: _("Low"),
                     type: "radio",
                     radio: "primitive-quality",
                     selected: browser .getBrowserOption ("PrimitiveQuality") === "LOW",
                     callback: () =>
                     {
                        browser .setBrowserOption ("PrimitiveQuality", "LOW");
                        browser .setDescription (_("Primitive Quality") + ": " + _("low"));
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
                     callback: () =>
                     {
                        browser .setBrowserOption ("TextureQuality", "HIGH");
                        browser .setDescription (_("Texture Quality") + ": " + _("high"));
                     },
                  },
                  "medium": {
                     name: _("Medium"),
                     type: "radio",
                     radio: "texture-quality",
                     selected: browser .getBrowserOption ("TextureQuality") === "MEDIUM",
                     callback: () =>
                     {
                        browser .setBrowserOption ("TextureQuality", "MEDIUM");
                        browser .setDescription (_("Texture Quality") + ": " + _("medium"));
                     },
                  },
                  "low": {
                     name: _("Low"),
                     type: "radio",
                     radio: "texture-quality",
                     selected: browser .getBrowserOption ("TextureQuality") === "LOW",
                     callback: () =>
                     {
                        browser .setBrowserOption ("TextureQuality", "LOW");
                        browser .setDescription (_("Texture Quality") + ": " + _("low"));
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
                     callback: () =>
                     {
                        browser .setBrowserOption ("Shading", "POINT");
                        browser .setDescription (_("Shading") + ": " + _("Points"));
                     },
                  },
                  "wireframe": {
                     name: _("Wireframe"),
                     type: "radio",
                     radio: "shading",
                     selected: browser .getBrowserOption ("Shading") === "WIREFRAME",
                     callback: () =>
                     {
                        browser .setBrowserOption ("Shading", "WIREFRAME");
                        browser .setDescription (_("Shading") + ": " + _("Wireframe"));
                     },
                  },
                  "flat": {
                     name: _("Flat"),
                     type: "radio",
                     radio: "shading",
                     selected: browser .getBrowserOption ("Shading") === "FLAT",
                     callback: () =>
                     {
                        browser .setBrowserOption ("Shading", "FLAT");
                        browser .setDescription (_("Shading") + ": " + _("Flat"));
                     },
                  },
                  "gouraud": {
                     name: _("Gouraud"),
                     type: "radio",
                     radio: "shading",
                     selected: browser .getBrowserOption ("Shading") === "GOURAUD",
                     callback: () =>
                     {
                        browser .setBrowserOption ("Shading", "GOURAUD");
                        browser .setDescription (_("Shading") + ": " + _("Gouraud"));
                     },
                  },
                  "phong": {
                     name: _("Phong"),
                     type: "radio",
                     radio: "shading",
                     selected: browser .getBrowserOption ("Shading") === "PHONG",
                     callback: () =>
                     {
                        browser .setBrowserOption ("Shading", "PHONG");
                        browser .setDescription (_("Shading") + ": " + _("Phong"));
                     },
                  },
               },
            },
            "separator2": "--------",

            // Insert custom user menu items.
            ... this .createUserMenu (),

            "separator3": "--------",

            ... this .createAnimationsMenu (),

            "browser-timings": {
               name: _("Browser Timings"),
               type: "checkbox",
               selected: browser .getBrowserOption ("Timings"),
               callback: (event) =>
               {
                  browser .setBrowserOption ("Timings", $(event .target) .is (":checked"));
                  browser .getSurface () .focus ();
               },
            },
            "fullscreen": {
               name: fullscreen ? _("Leave Fullscreen") : _("Fullscreen"),
               className: `context-menu-icon ${fullscreen ? "x_ite-private-icon-leave-fullscreen" : "x_ite-private-icon-enter-fullscreen"}`,
               callback: () =>
               {
                  if (fullscreen)
                     document .exitFullscreen () .catch (Function .prototype);
                  else
                     element [0] .requestFullscreen ({ navigationUI: "hide" }) .catch (Function .prototype);
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
                     div       = $("<div></div>") .hide () .addClass (["x_ite-private-world-info", "x_ite-private-hidden"]) .appendTo (overlay),
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

                  div
                     .show ()
                     .removeClass ("x_ite-private-hidden")
                     .addClass ("x_ite-private-fade-in-300");

                  overlay .on ("click", () =>
                  {
                     div .addClass ("x_ite-private-fade-out-300");
                     setTimeout (() => overlay .remove (), 300);
                  });
               },
            },
            "about": {
               name: _("About X_ITE"),
               className: "context-menu-icon x_ite-private-icon-info",
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

      if (!browser .getCurrentViewer () .match (/^(?:WALK|FLY)$/))
      {
         delete menu .items ["display-rubberband"];
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
         menu [`Viewpoint-${viewpoint .getId ()}`] = {
            name: viewpoint .getDescriptions () .join (" » "),
            type: "radio",
            radio: "viewpoints",
            selected: viewpoint === currentViewpoint,
            className: "x_ite-private-viewpoint",
            callback: () =>
            {
               browser .bindViewpoint (browser .getActiveLayer (), viewpoint);
               browser .getSurface () .focus ();
            },
         };
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
            type: "radio",
            radio: "viewers",
            selected: viewer === currentViewer,
            className: `x_ite-private-${viewer .toLowerCase ()}-viewer`,
            callback: () =>
            {
               browser ._viewer = viewer;
               browser .setDescription (_(this .getViewerName (viewer)));
               browser .getSurface () .focus ();
            },
         };
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
   createAnimationsMenu ()
   {
      const
         browser = this .getBrowser (),
         scene   = browser .currentScene;

      if (scene .encoding !== "GLTF")
         return { };

      const animations = $.try (() => scene .getExportedNode ("Animations"));

      if (!animations)
         return { };

      const timeSensors = Array .from (animations .children, group => group .children [0]);

      return {
         "animations": {
            name: _("Animations"),
            className: "context-menu-icon x_ite-private-icon-animations",
            items: {
               ... Object .fromEntries (timeSensors .map ((timeSensor, i) =>
               {
                  return [`animation-${i}`, {
                     name: timeSensor .description,
                     type: "checkbox",
                     selected: timeSensor .isActive,
                     callback ()
                     {
                        if (timeSensor .isActive)
                        {
                           timeSensor .stopTime = Date .now () / 1000;
                        }
                        else
                        {
                           timeSensor .loop      = true;
                           timeSensor .startTime = Date .now () / 1000;
                        }
                     },
                  }];
               })),

               "separator2": "--------",

               "all": {
                  name: _("All"),
                  className: "context-menu-icon x_ite-private-icon-all",
                  callback ()
                  {
                     for (const timeSensor of timeSensors)
                     {
                        timeSensor .loop      = true;
                        timeSensor .startTime = Date .now () / 1000;
                     }
                  },
               },
               "none": {
                  name: _("None"),
                  className: "context-menu-icon x_ite-private-icon-none",
                  callback ()
                  {
                     for (const timeSensor of timeSensors)
                        timeSensor .stopTime = Date .now () / 1000;
                  },
               },
            },
         },
      };
   }
});

Object .defineProperties (ContextMenu .prototype,
{
   userMenu:
   {
      get: ContextMenu .prototype .getUserMenu,
      set: ContextMenu .prototype .setUserMenu,
      enumerable: true,
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
