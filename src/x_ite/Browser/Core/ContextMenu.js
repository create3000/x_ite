import X3DBaseNode  from "../../Base/X3DBaseNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import $            from "../../../lib/helper.js";
import _            from "../../../locale/gettext.js";

const
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

      browser .getElement () .addEventListener ("contextmenu", event => this .show (event));
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

         if (menu instanceof Object)
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
         root  = this .getBrowser () .getShadow (),
         menu  = this .build (),
         level = 1;

      event .preventDefault ();
      this .hide ();

      if (!menu)
         return;

      // Layer

      const layer = document .createElement ("div");

      layer .classList .add ("context-menu-layer", menu .className);

      layer .addEventListener ("mousedown",   () => this .hide ());
      layer .addEventListener ("contextmenu", () => this .hide ());

      root .appendChild (layer);

      this [_hide] = () =>
      {
         this [_hide] = null;

         layer .remove ();

         for (const child of ul .children)
         {
            child .classList .remove ("x_ite-private-fade-in-300");
            child .classList .add ("x_ite-private-fade-out-300");
         }

         setTimeout (() => ul .remove (), 1000);

         return false;
      };

      // Menu

      const ul = document .createElement ("ul");

      ul .classList .add ("context-menu-root", "context-menu-list", menu .className);

      ul .style .display = "none";

      ul .addEventListener ("contextmenu", () => this .hide ());

      root .appendChild (ul);

      const background = document .createElement ("div");

      background .classList .add ("context-menu-background");

      ul .appendChild (background);

      for (const k in menu .items)
         ul .appendChild (this .createItem (menu .items [k], "context-menu-root", k, level + 1));

      // Show
      // Must animate children because of blurish background.

      for (const child of ul .children)
         child .classList .add ("x_ite-private-hidden");

      ul .style .display = "block";

      for (const child of ul .children)
      {
         child .classList .remove ("x_ite-private-hidden");
         child .classList .add ("x_ite-private-fade-in-300");
      }

      // Reposition menu if to right or to low.

      this .offset (ul, { left: event .pageX, top: event .pageY });
      this .offset (ul, { left: event .pageX, top: event .pageY }); // Do it again.

      const rect = ul .getBoundingClientRect ();

      if (rect .left + ul .offsetWidth > window .innerWidth)
         this .offset (ul, { left: window .scrollX + Math .max (0, window .innerWidth - ul .offsetWidth) });

      if (rect .top + ul .offsetHeight > window .innerHeight)
         this .offset (ul, { top: window .scrollY + Math .max (0, window .innerHeight - ul .offsetHeight) });

      // Display submenus on the left or right side.
      // If the submenu is higher than vh, add scrollbars.

      for (const submenu of ul .querySelectorAll ("ul"))
      {
         submenu .style .display = "block";

         const
            parentRect = ul .getBoundingClientRect (),
            width      = submenu .clientWidth + ul .clientWidth,
            position   = parentRect .left + width > window .innerWidth ? "right" : "left";

         // Background
         submenu .children [0] .style .height = `${submenu .clientHeight}px`;

         submenu .style [position] =`${ul .clientWidth - 36}px`;

         if (submenu .clientHeight >= window .innerHeight)
         {
            submenu .style .top       = `${-submenu .closest ("li") .getBoundingClientRect () .top}px`;
            submenu .style .maxHeight = "100vh";
            submenu .style .overflowY = "scroll";
         }

         submenu .style .display = "";
      };
   },
   offset (elem, options)
   {
		const
         rect    = elem .getBoundingClientRect (),
         curTop  = parseFloat (elem .style .top)  || 0,
         curLeft = parseFloat (elem .style .left) || 0;

      if (options .left !== undefined)
         elem .style .left = `${options .left - (rect .left + window .scrollX) + curLeft}px`;

      if (options .top !== undefined)
         elem .style .top = `${options .top - (rect .top + window .scrollY) + curTop}px`;
	},
   createItem (item, parent, key, level)
   {
      const li = document .createElement ("li");

      li .classList .add ("context-menu-item");

      switch (typeof item)
      {
         case "string":
         {
            if (item .match (/^-+$/))
               li .classList .add ("context-menu-separator", "context-menu-not-selectable");

            break;
         }
         case "object":
         {
            if (item .className)
               li .classList .add (... item .className .split (/\s+/));

            switch (item .type)
            {
               case "radio":
               case "checkbox":
               {
                  const
                     label = document .createElement ("label"),
                     input = document .createElement ("input");

                  li    .append (label);
                  label .append (input);

                  input .setAttribute ("type", item .type);
                  input .setAttribute ("name", `context-menu-input-${item .radio || parent}`);

                  const span = document .createElement ("span");

                  span .textContent = item .name;

                  label .append (span);

                  if (item .selected)
                     input .setAttribute ("checked", "");

                  li .classList .add ("context-menu-input");

                  this .addEvents (item, input, false);
                  break;
               }
               default:
               {
                  if (item .name)
                  {
                     const span = document .createElement ("span");

                     span .textContent = item .name;

                     li .append (span);
                  }

                  this .addEvents (item, li, true);
                  break;
               }
            }

            break;
         }
      }

      if (typeof item .items === "object" && level < 3)
      {
         const ul = document .createElement ("ul");

         ul .classList .add ("context-menu-list");

         ul .style .zIndex = level;

         li .append (ul);

         const background = document .createElement ("div");

         background .classList .add ("context-menu-background");

         ul .append (background);

         for (const k in item .items)
            ul .append (this .createItem (item .items [k], key, k, level + 1));

         li .classList .add ("context-menu-submenu");
      }

      return li;
   },
   addEvents (item, element, hide)
   {
      if (typeof item .callback === "function")
      {
         element .addEventListener ("click", item .callback);

         if (hide)
            element .addEventListener ("click", () => this .hide ());
      }

      if (typeof item .events === "object")
      {
         for (const k in item .events)
         {
            if (typeof item .events [k] === "function")
               element .addEventListener (k, item .events [k]);
         }
      }
   },
   build ()
   {
      const
         browser    = this .getBrowser (),
         element    = browser .getElement (),
         fullscreen = document .fullscreenElement === element;

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
               callback: event =>
               {
                  const straightenHorizon = event .target .checked;

                  browser .setBrowserOption ("StraightenHorizon", straightenHorizon);

                  if (straightenHorizon)
                     browser .setDescription (`${_("Straighten Horizon")}: ${_("on")}`);
                  else
                     browser .setDescription (`${_("Straighten Horizon")}: ${_("off")}`);
               },
            },
            "display-rubberband": {
               name: _("Display Rubberband"),
               type: "checkbox",
               selected: browser .getBrowserOption ("Rubberband"),
               callback: event =>
               {
                  const rubberband = event .target .checked;

                  browser .setBrowserOption ("Rubberband", rubberband);

                  if (rubberband)
                     browser .setDescription (`${_("Rubberband")}: ${_("on")}`);
                  else
                     browser .setDescription (`${_("Rubberband")}: ${_("off")}`);
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
                        browser .setDescription (`${_("Primitive Quality")}: ${_("high")}`);
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
                        browser .setDescription (`${_("Primitive Quality")}: ${_("medium")}`);
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
                        browser .setDescription (`${_("Primitive Quality")}: ${_("low")}`);
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
                        browser .setDescription (`${_("Texture Quality")}: ${_("high")}`);
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
                        browser .setDescription (`${_("Texture Quality")}: ${_("medium")}`);
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
                        browser .setDescription (`${_("Texture Quality")}: ${_("low")}`);
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
                        browser .setDescription (`${_("Shading")}: ${_("Points")}`);
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
                        browser .setDescription (`${_("Shading")}: ${_("Wireframe")}`);
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
                        browser .setDescription (`${_("Shading")}: ${_("Flat")}`);
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
                        browser .setDescription (`${_("Shading")}: ${_("Gouraud")}`);
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
                        browser .setDescription (`${_("Shading")}: ${_("Phong")}`);
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
               callback: event =>
               {
                  browser .setBrowserOption ("Timings", event .target .checked);
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
                     element .requestFullscreen ({ navigationUI: "hide" }) .catch (Function .prototype);
               },
            },
            "separator4": "--------",
            "world-info": {
               name: _("Show World Info"),
               className: "context-menu-icon x_ite-private-icon-world-info",
               callback ()
               {
                  browser .getShadow () .querySelector (".x_ite-private-world-info") ?.remove ();

                  const
                     priv         = browser .getShadow () .querySelector (".x_ite-private-browser"),
                     overlay      = document .createElement ("div"),
                     div          = document .createElement ("div"),
                     content      = document .createElement ("div"),
                     worldInfos   = browser .getExecutionContext () .getWorldInfos (),
                     worldInfo    = worldInfos .length ? worldInfos [0] : null,
                     hasWorldInfo = worldInfo ?.title .length || worldInfo ?.info .length;

                  overlay .classList .add ("x_ite-private-world-info-overlay");
                  priv .append (overlay);

                  div .style .display = "none";
                  div .classList .add ("x_ite-private-world-info", "x_ite-private-hidden");
                  overlay .append (div);

                  const buttons = document .createElement ("div");

                  buttons .classList .add ("x_ite-private-world-info-buttons");
                  div .append (buttons);

                  const linkify = (element, string) =>
                  {
                     const
                        email = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,})/ig,
                        link  = /(https?:\/\/[-a-zA-Z0-9@:%._+~#=]+\.[a-zA-Z0-9]{2,}\b[-a-zA-Z0-9()@:%_+.~#?&/=]*\b\/?)/ig;

                     const replaced_text = string
                        .replace (email, `<a href="mailto:$1" target="_blank">$1</a>`)
                        .replace (link, `<a href="$1" target="_blank">$1</a>`);

                     element .innerHTML = replaced_text;

                     for (const a of element .querySelectorAll ("a"))
                        a .addEventListener ("click", event => event .stopPropagation ());
                  };

                  const worldInfoButton = document .createElement ("button");

                  worldInfoButton .classList .add ("x_ite-private-browser-button");
                  worldInfoButton .style .width = "100pt";
                  worldInfoButton .textContent = _("World Info");
                  buttons .append (worldInfoButton);

                  worldInfoButton .addEventListener ("click", event =>
                  {
                     event .preventDefault ();
                     event .stopPropagation ();
                     event .stopImmediatePropagation ();

                     const
                        title = worldInfo .title,
                        info  = worldInfo .info;

                     buttons .querySelector ("button") .classList .remove ("active");
                     worldInfoButton .classList .add ("active");

                     content .replaceChildren ();

                     const top = document .createElement ("div");

                     top .classList .add ("x_ite-private-world-info-top");
                     top .textContent = _("World Info");
                     content .append (top);

                     if (title .length)
                     {
                        const t = document .createElement ("div");

                        t .classList .add ("x_ite-private-world-info-title");
                        t .textContent = title;

                        content .append (t);
                     }

                     for (const line of info)
                     {
                        const l = document .createElement ("div");

                        l .classList .add ("x_ite-private-world-info-info");

                        linkify (l, line);

                        content .append (l);
                     }
                  });

                  const metaDataButton = document .createElement ("button");

                  metaDataButton .classList .add ("x_ite-private-browser-button");
                  metaDataButton .style .width = "100pt";
                  metaDataButton .textContent = _("Metadata");
                  buttons .append (metaDataButton);

                  metaDataButton .addEventListener ("click", event =>
                  {
                     event .preventDefault ();
                     event .stopPropagation ();
                     event .stopImmediatePropagation ();

                     buttons .querySelector ("button") .classList .remove ("active");
                     worldInfoButton .classList .add ("active");

                     content .replaceChildren ();

                     const top = document .createElement ("div");

                     top .classList .add ("x_ite-private-world-info-top");
                     top .textContent = _("Metadata");
                     content .append (top);

                     const table = document .createElement ("table");

                     content .append (table);

                     for (const [key, value] of browser .currentScene .getMetaDatas ())
                     {
                        const
                           tr  = document .createElement ("tr"),
                           td1 = document .createElement ("td"),
                           td2 = document .createElement ("td");

                        td1 .textContent = `${key}:`;

                        linkify (td2, value);

                        tr .append (td1, td2);
                        table .append (tr);
                     }
                  });

                  if (!hasWorldInfo)
                     worldInfoButton .style .display = "none";

                  if (!browser .currentScene .getMetaDatas () .length)
                     metaDataButton .style .display = "none";

                  if (hasWorldInfo)
                     worldInfoButton .click ();
                  else
                     metaDataButton .click ();

                  div .append (content);

                  div .style .display = "block";
                  div .classList .remove ("x_ite-private-hidden");
                  div .classList .add ("x_ite-private-fade-in-300");

                  overlay .addEventListener ("click", () =>
                  {
                     div .classList .add ("x_ite-private-fade-out-300");
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

      if ((!worldInfo || (worldInfo .title .length === 0 && worldInfo .info .length === 0)) && !browser .currentScene .getMetaDatas () .length)
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

      const animations = $.try (() => scene .getExportedNode ("Animations"));

      if (!animations)
         return { };

      const timeSensors = $.try (() => Array .from (animations .children, group => group .children [0]))
         .filter (node => node .getNodeType () .includes (X3DConstants .TimeSensor));

      if (!timeSensors ?.length)
         return { };

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
                  className: "context-menu-icon x_ite-private-icon-play",
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
                  className: "context-menu-icon x_ite-private-icon-stop",
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
