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

import X3DConstants        from "../../Base/X3DConstants.js";
import Fields              from "../../Fields.js";
import Context             from "./Context.js";
import BrowserTimings      from "./BrowserTimings.js";
import BrowserOptions      from "./BrowserOptions.js";
import BrowserProperties   from "./BrowserProperties.js";
import RenderingProperties from "./RenderingProperties.js";
import Notification        from "./Notification.js";
import ContextMenu         from "./ContextMenu.js";
import URLs                from "../Networking/URLs.js";
import X3DScene            from "../../Execution/X3DScene.js";
import DataStorage         from "../../../standard/Utility/DataStorage.js";
import Vector3             from "../../../standard/Math/Numbers/Vector3.js";
import Features            from "../../Features.js";
import Legacy              from "../Legacy.js";
import _                   from "../../../locale/gettext.js";

import "./Fonts.js";

const WEBGL_VERSION = 2;

const
   _instanceId          = Symbol (),
   _element             = Symbol (),
   _attributes          = Symbol (),
   _shadow              = Symbol (),
   _surface             = Symbol (),
   _canvas              = Symbol (),
   _context             = Symbol (),
   _splashScreen        = Symbol (),
   _localStorage        = Symbol (),
   _browserTimings      = Symbol (),
   _browserOptions      = Symbol (),
   _browserProperties   = Symbol (),
   _renderingProperties = Symbol (),
   _notification        = Symbol (),
   _contextMenu         = Symbol (),
   _privateScene        = Symbol (),
   _keydown             = Symbol (),
   _keyup               = Symbol ();

let instanceId = 0;

function X3DCoreContext (element)
{
   // Events

   this .addChildObjects (X3DConstants .outputOnly, "controlKey", new Fields .SFBool (),
                          X3DConstants .outputOnly, "shiftKey",   new Fields .SFBool (),
                          X3DConstants .outputOnly, "altKey",     new Fields .SFBool (),
                          X3DConstants .outputOnly, "commandKey", new Fields .SFBool (),
                          X3DConstants .outputOnly, "altGrKey",   new Fields .SFBool ());

   // Get canvas & context.

   const
      browser      = $("<div></div>", { class: "x_ite-private-browser", part: "browser", tabindex: 0 }),
      surface      = $("<div></div>", { class: "x_ite-private-surface", part: "surface" }) .appendTo (browser),
      splashScreen = $("<div></div>", { class: "x_ite-private-splash-screen x_ite-private-hidden" }) .appendTo (browser),
      spinner      = $("<div></div>", { class: "x_ite-private-spinner" }) .appendTo (splashScreen),
      progress     = $("<div></div>", { class: "x_ite-private-progress" }) .appendTo (splashScreen);

   if (element .prop ("nodeName") .toLowerCase () === "x3d-canvas")
   {
      const shadow = $(element [0] .attachShadow ({ mode: "open", delegatesFocus: true }));

      const stylesheet = new Promise (resolve =>
      {
         $("<link/>",
         {
            on: { load: resolve },
            integrity: "integrity-x_ite-css",
            crossorigin: "anonymous",
            rel: "stylesheet",
            href: new URL ("x_ite.css", URLs .getScriptURL ()),
         })
         .appendTo (shadow);
      });

      this [_shadow] = shadow .append (browser .hide ());

      stylesheet .then (() => browser .show ());
   }
   else
   {
      this [_shadow] = element .prepend (browser);
   }

   $("<div></div>", { class: "x_ite-private-x_ite" }) .html (`${this .getName ()}<b>X3D</b>`) .appendTo (progress);
   $("<div></div>", { class: "x_ite-private-progressbar" })  .appendTo (progress) .append ($("<div></div>"));
   $("<div></div>", { class: "x_ite-private-spinner-text" }) .appendTo (progress);

   this [_instanceId]   = ++ instanceId;
   this [_localStorage] = new DataStorage (localStorage, `X_ITE.X3DBrowser(${this [_instanceId]}).`);
   this [_element]      = element;
   this [_attributes]   = new Map ();
   this [_surface]      = surface;
   this [_canvas]       = $("<canvas></canvas>", { part: "canvas", class: "x_ite-private-canvas" }) .prependTo (surface);
   this [_context]      = Context .create (this [_canvas] [0], WEBGL_VERSION, element .attr ("preserveDrawingBuffer") === "true");
   this [_splashScreen] = splashScreen;

   this [_renderingProperties] = new RenderingProperties (this .getPrivateScene ());
   this [_browserOptions]      = new BrowserOptions      (this .getPrivateScene ());
   this [_browserProperties]   = new BrowserProperties   (this .getPrivateScene ());
   this [_browserTimings]      = new BrowserTimings      (this .getPrivateScene ());
   this [_notification]        = new Notification        (this .getPrivateScene ());
   this [_contextMenu]         = new ContextMenu         (this .getPrivateScene ());
}

Object .assign (X3DCoreContext .prototype,
{
   initialize ()
   {
      const element = this .getElement ();

      // Setup browser nodes.

      this [_renderingProperties] .setup ();
      this [_browserOptions]      .setup ();
      this [_browserProperties]   .setup ();
      this [_browserTimings]      .setup ();
      this [_notification]        .setup ();
      this [_contextMenu]         .setup ();

      // Define properties of X3DCanvasElement.

      Object .defineProperties (element [0],
      {
         browser:
         {
            value: this,
            enumerable: true,
         },
         ... Legacy .properties (this, Object .fromEntries ([
            "src",
            "url",
         ]
         .map (name => [name,
         {
            get: () =>
            {
               return this [_attributes] .get (name .toLowerCase ());
            },
            set: (value) =>
            {
               element .attr (name, value);
            },
            enumerable: true,
         }]))),
      });

      // Configure browser event handlers.

      element
         .on ("keydown.X3DCoreContext", this [_keydown] .bind (this))
         .on ("keyup.X3DCoreContext",   this [_keyup]   .bind (this));
   },
   getInstanceId ()
   {
      return this [_instanceId];
   },
   getElement ()
   {
      return this [_element];
   },
   getShadow ()
   {
      return this [_shadow];
   },
   getSurface ()
   {
      return this [_surface];
   },
   getSplashScreen ()
   {
      return this [_splashScreen];
   },
   getCanvas ()
   {
      return this [_canvas];
   },
   getContext ()
   {
      return this [_context];
   },
   getLocalStorage ()
   {
      return this [_localStorage];
   },
   getBrowserTimings ()
   {
      return this [_browserTimings];
   },
   getBrowserOptions ()
   {
      return this [_browserOptions];
   },
   getBrowserProperties ()
   {
      return this [_browserProperties];
   },
   getRenderingProperties ()
   {
      return this [_renderingProperties];
   },
   getNotification ()
   {
      return this [_notification];
   },
   getContextMenu ()
   {
      return this [_contextMenu];
   },
   getPrivateScene ()
   {
      // X3DScene for default nodes.

      return this [_privateScene] ??= (() =>
      {
         const privateScene = new X3DScene (this);

         privateScene .checkLiveState = () => true;
         privateScene .setLive (true);
         privateScene .setup ();

         return privateScene;
      })();
   },
   connectedCallback ()
   {
      // Workaround for a bug in Chrome (v135) where attributeChangedCallback is not
      // initially called for attributes set in XHTML and call callback initially
      // for legacy X3DCanvas element.

      for (const { name, value } of this .getElement () [0] .attributes)
      {
         if (this [_attributes] .has (name .toLowerCase ()))
            continue;

         this .attributeChangedCallback (name, undefined, value);
      }

      // AutoUpdate

      this .getBrowserOptions () .checkUpdate ();
   },
   disconnectedCallback ()
   {
      // AutoUpdate

      this .getBrowserOptions () .checkUpdate ();
   },
   attributeChangedCallback (name, oldValue, newValue)
   {
      switch (name .toLowerCase ())
      {
         case "antialiased":
         {
            this .setBrowserOption ("Antialiased", this .parseBooleanAttribute (newValue) ?? true);
            break;
         }
         case "baseurl":
         {
            this .setBaseURL (newValue);
            break;
         }
         case "cache":
         {
            this .setBrowserOption ("Cache", this .parseBooleanAttribute (newValue) ?? true);
            break;
         }
         case "colorspace":
         {
            this .setBrowserOption ("ColorSpace", newValue);
            break;
         }
         case "contentscale":
         {
            this .setBrowserOption ("ContentScale", newValue === "auto" ? -1 : parseFloat (newValue));
            break;
         }
         case "contextmenu":
         {
            this .setBrowserOption ("ContextMenu", this .parseBooleanAttribute (newValue) ?? true);
            break;
         }
         case "debug":
         {
            this .setBrowserOption ("Debug", this .parseBooleanAttribute (newValue) ?? false);
            break;
         }
         case "exposure":
         {
            this .setBrowserOption ("Exposure", newValue);
            break;
         }
         case "logarithmicdepthbuffer":
         {
            this .setBrowserOption ("LogarithmicDepthBuffer", this .parseBooleanAttribute (newValue) ?? false);
            break;
         }
         case "multisampling":
         {
            const samples = parseInt (newValue);

            this .setBrowserOption ("Multisampling", isNaN (samples) ? 4 : samples);
            break;
         }
         case "notifications":
         {
            this .setBrowserOption ("Notifications", this .parseBooleanAttribute (newValue) ?? true);
            break;
         }
         case "oninitialized":
         case "onshutdown":
         {
            try
            {
               this .getElement () [0] [name] = new Function ("event", newValue);
            }
            catch (error)
            {
               console .error (error);
            }

            break;
         }
         case "orderindependenttransparency":
         {
            this .setBrowserOption ("OrderIndependentTransparency", this .parseBooleanAttribute (newValue) ?? false);
            break;
         }
         case "splashscreen":
         {
            this .setBrowserOption ("SplashScreen", this .parseBooleanAttribute (newValue) ?? true);

            if (!this .getBrowserOption ("SplashScreen"))
            {
               this .getCanvas () .show ();

               this .getSplashScreen ()
                  .removeClass ("x_ite-private-fade-out-2000")
                  .addClass ("x_ite-private-hidden");
            }

            break;
         }
         case "src":
         {
            if (newValue)
            {
               this .loadURL (new Fields .MFString (newValue))
                  .catch (error => console .error (error));
            }

            break;
         }
         case "textcompression":
         {
            this .setBrowserOption ("TextCompression", newValue || "CHAR_SPACINGS");
            break;
         }
         case "timings":
         {
            this .setBrowserOption ("Timings", this .parseBooleanAttribute (newValue) ?? false);
            break;
         }
         case "tonemapping":
         {
            this .setBrowserOption ("ToneMapping", newValue || "NONE");
            break;
         }
         case "update":
         {
            if (newValue === "auto")
            {
               this .setBrowserOption ("AutoUpdate", true);
            }
            else
            {
               this .setBrowserOption ("AutoUpdate", false);

               if (this .parseBooleanAttribute (newValue) ?? true)
                  this .beginUpdate ();
               else
                  this .endUpdate ();
            }

            break;
         }
         case "url":
         {
            if (newValue)
            {
               this .loadURL (newValue = this .parseUrlAttribute (newValue))
                  .catch (error => console .error (error));
            }

            break;
         }
         case "xrsessionmode":
         {
            this .setBrowserOption ("XRSessionMode", newValue || "IMMERSIVE_VR");
            break;
         }
      }

      this [_attributes] .set (name .toLowerCase (), newValue);
   },
   parseBooleanAttribute (value)
   {
      if (value === "true")
         return true;

      if (value === "false")
         return false;
   },
   parseUrlAttribute (urlCharacters)
   {
      try
      {
         const url = new Fields .MFString ();

         if (/^\s*\[.*?\]\s*$/ .test (urlCharacters))
            url .fromString (urlCharacters, this .getExecutionContext ());
         else
            url .fromString (`[${urlCharacters}]`, this .getExecutionContext ());

         return url;
      }
      catch
      {
         throw new Error ("Couldn't parse url attribute.");
      }
   },
   callBrowserEventHandler: (() =>
   {
      const build_in = new Set (["error", "load"]);

      return function (events)
      {
         const element = this .getElement () [0];

         for (const name of events .split (" "))
         {
            // Order is attribute, then dispatch.

            const event = new CustomEvent (name);

            try
            {
               if (!build_in .has (name))
                  element [`on${name}`] ?.(event);
            }
            catch (error)
            {
               console .error (error);
            }

            element .dispatchEvent (event);
         }
      };
   })(),
   getShiftKey ()
   {
      return this ._shiftKey .getValue ();
   },
   getControlKey ()
   {
      return this ._controlKey .getValue ();
   },
   getAltKey ()
   {
      return this ._altKey .getValue ();
   },
   getCommandKey ()
   {
      return this ._commandKey .getValue ();
   },
   getAltGrKey ()
   {
      return this ._altGrKey .getValue ();
   },
   [_keydown] (event)
   {
      switch (event .keyCode)
      {
         case 16: // Shift
         {
            this ._shiftKey = true;
            break;
         }
         case 17: // Ctrl
         {
            this ._controlKey = true;
            break;
         }
         case 18: // Alt
         {
            this ._altKey = true;
            break;
         }
         case 49: // 1
         {
            if (this .getBrowserOption ("Debug"))
            {
               if (this .getControlKey ())
               {
                  event .preventDefault ();
                  this .setBrowserOption ("Shading", "POINT");
                  this .setDescription ("Shading: Pointset");
               }
            }

            break;
         }
         case 50: // 2
         {
            if (this .getBrowserOption ("Debug"))
            {
               if (this .getControlKey ())
               {
                  event .preventDefault ();
                  this .setBrowserOption ("Shading", "WIREFRAME");
                  this .setDescription ("Shading: Wireframe");
               }
            }

            break;
         }
         case 51: // 3
         {
            if (this .getBrowserOption ("Debug"))
            {
               if (this .getControlKey ())
               {
                  event .preventDefault ();
                  this .setBrowserOption ("Shading", "FLAT");
                  this .setDescription ("Shading: Flat");
               }
            }

            break;
         }
         case 52: // 4
         {
            if (this .getBrowserOption ("Debug"))
            {
               if (this .getControlKey ())
               {
                  event .preventDefault ();
                  this .setBrowserOption ("Shading", "GOURAUD");
                  this .setDescription ("Shading: Gouraud");
               }
            }

            break;
         }
         case 53: // 5
         {
            if (this .getBrowserOption ("Debug"))
            {
               if (this .getControlKey ())
               {
                  event .preventDefault ();
                  this .setBrowserOption ("Shading", "PHONG");
                  this .setDescription ("Shading: Phong");
               }
            }

            break;
         }
         case 83: // s
         {
            if (this .getBrowserOption ("Debug"))
            {
               if (this .getControlKey ())
               {
                  event .preventDefault ();

                  if (this .isLive ())
                     this .endUpdate ();
                  else
                     this .beginUpdate ();

                  this .setDescription (this .isLive () ? "Begin Update" : "End Update");
               }
            }

            break;
         }
         case 91: // Command
         {
            this ._commandKey = true;
            break;
         }
         case 225: // Alt Gr
         {
            this ._altGrKey = true;
            break;
         }
         case 171: // Plus // Firefox
         case 187: // Plus // Opera
         {
            if (this .getControlKey ())
            {
               event .preventDefault ();
               this .setBrowserOption ("Timings", !this .getBrowserOption ("Timings"));
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

               // Create viewpoint node.

               const viewpoint = this .getActiveViewpoint ();

               if (!viewpoint)
                  break;

               const
                  executionContext = this .getExecutionContext (),
                  vp               = executionContext .createNode (viewpoint .getTypeName ());

               switch (viewpoint .getTypeName ())
               {
                  case "Viewpoint":
                  {
                     vp .position         = viewpoint .getUserPosition ();
                     vp .orientation      = viewpoint .getUserOrientation ();
                     vp .centerOfRotation = viewpoint .getUserCenterOfRotation ();
                     vp .fieldOfView      = viewpoint .getUserFieldOfView ();
                     break;
                  }
                  case "OrthoViewpoint":
                  {
                     vp .position         = viewpoint .getUserPosition ();
                     vp .orientation      = viewpoint .getUserOrientation ();
                     vp .centerOfRotation = viewpoint .getUserCenterOfRotation ();
                     vp .fieldOfView      = viewpoint .getUserFieldOfView ();
                     break;
                  }
                  case "GeoViewpoint":
                  {
                     const
                        geoOrigin = viewpoint ._geoOrigin,
                        geoCoord  = new Vector3 ();

                     if (geoOrigin .getValue () && geoOrigin .getNodeTypeName () === "GeoOrigin")
                     {
                        const go = executionContext .createNode ("GeoOrigin");

                        vp .geoOrigin = go;
                        go .geoSystem = geoOrigin .geoSystem;
                        go .geoCoords = geoOrigin .geoCoords;
                        go .rotateYUp = geoOrigin .rotateYUp;
                     }

                     vp .geoSystem        = viewpoint ._geoSystem;
                     vp .position         = viewpoint .getGeoCoord (viewpoint .getUserPosition (), geoCoord);
                     vp .orientation      = viewpoint .getUserOrientation ();
                     vp .centerOfRotation = viewpoint .getGeoCoord (viewpoint .getUserCenterOfRotation (), geoCoord);
                     vp .fieldOfView      = viewpoint .getUserFieldOfView ();
                     break;
                  }
               }

               // Create text.

               const options = Features .ENVIRONMENT === "NODE" ? { } : { scene: executionContext };

               let text;

               switch (executionContext .getEncoding ())
               {
                  case "ASCII":
                  case "VRML": text = vp .toVRMLString (options); break;
                  case "JSON": text = vp .toJSONString (options); break;
                  default:     text = vp .toXMLString  (options); break;
               }

               text += "\n";

               // Copy to clipboard.

               this .copyToClipboard (text) .then (() =>
               {
                  this .setDescription (_("Viewpoint copied to clipboard."));

                  console .log ("Viewpoint copied to clipboard.");
                  console .debug (text);
               });
            }

            break;
         }
      }
   },
   [_keyup] (event)
   {
      //console .log (event .which);

      switch (event .which)
      {
         case 16: // Shift
         {
            this ._shiftKey = false;
            break;
         }
         case 17: // Ctrl
         {
            this ._controlKey = false;
            break;
         }
         case 18: // Alt
         {
            this ._altKey = false;
            break;
         }
         case 91: // Command
         {
            this ._commandKey = false;
            break;
         }
         case 225: // Alt Gr
         {
            this ._altGrKey = false;
            break;
         }
      }
   },
   async copyToClipboard (text)
   {
      try
      {
         await navigator .clipboard .writeText (text);
      }
      catch
      {
         // The textarea must be visible to make copy work.
         const tmp = $("<textarea></textarea>");
         this .getShadow () .find (".x_ite-private-browser") .prepend (tmp);
         tmp .text (text) .trigger ("select");
         document .execCommand ("copy");
         tmp .remove ();
      }
   },
   dispose ()
   {
      this .getElement () .off (".X3DCoreContext .ContextMenu");

      this [_context] .getExtension ("WEBGL_lose_context") ?.loseContext ?.();
      this [_shadow] .find ("*") .remove ();
   },
});

export default X3DCoreContext;
