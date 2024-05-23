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
import _                   from "../../../locale/gettext.js";

const WEBGL_VERSION = 2;

const
   _instanceId          = Symbol (),
   _element             = Symbol (),
   _shadow              = Symbol (),
   _surface             = Symbol (),
   _canvas              = Symbol (),
   _context             = Symbol (),
   _splashScreen        = Symbol (),
   _localStorage        = Symbol (),
   _mobile              = Symbol (),
   _browserTimings      = Symbol (),
   _browserOptions      = Symbol (),
   _browserProperties   = Symbol (),
   _renderingProperties = Symbol (),
   _notification        = Symbol (),
   _contextMenu         = Symbol (),
   _privateScene        = Symbol (),
   _keydown             = Symbol (),
   _keyup               = Symbol (),
   _pixelsPerPoint      = Symbol ();

let instanceId = 0;

function X3DCoreContext (element)
{
   // Get canvas & context.

   const
      browser      = $("<div></div>") .addClass ("x_ite-private-browser") .attr ("tabindex", 0),
      surface      = $("<div></div>") .addClass ("x_ite-private-surface") .appendTo (browser),
      splashScreen = $("<div></div>") .hide () .addClass ("x_ite-private-splash-screen") .appendTo (browser),
      spinner      = $("<div></div>") .addClass ("x_ite-private-spinner") .appendTo (splashScreen),
      progress     = $("<div></div>") .addClass ("x_ite-private-progress") .appendTo (splashScreen);

   if (element .prop ("nodeName") .toLowerCase () === "x3d-canvas")
   {
      const
         shadow = $(element [0] .attachShadow ({ mode: "open", delegatesFocus: true })),
         link   = $("<link/>");

      link
         .on ("load", () => browser .show ())
         .attr ("rel", "stylesheet")
         .attr ("type", "text/css")
         .attr ("href", new URL ("x_ite.css", URLs .getScriptURL ()) .href);

      this [_shadow] = shadow
         .append (link)
         .append (browser .hide ());
   }
   else
   {
      this [_shadow] = element .prepend (browser);
   }

   $("<div></div>") .addClass ("x_ite-private-x_ite") .html (this .getName () + "<span class='x_ite-private-x3d'>X3D</span>") .appendTo (progress);
   $("<div></div>") .addClass ("x_ite-private-progressbar")  .appendTo (progress) .append ($("<div></div>"));
   $("<div></div>") .addClass ("x_ite-private-spinner-text") .appendTo (progress);

   this [_instanceId]   = ++ instanceId;
   this [_localStorage] = new DataStorage (localStorage, "X_ITE.X3DBrowser(" + this [_instanceId] + ").");
   this [_mobile]       = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i .test (navigator .userAgent);
   this [_element]      = element;
   this [_surface]      = surface;
   this [_canvas]       = $("<canvas></canvas>") .addClass ("x_ite-private-canvas") .prependTo (surface);
   this [_context]      = Context .create (this [_canvas] [0], WEBGL_VERSION, element .attr ("preserveDrawingBuffer") === "true", this [_mobile]);
   this [_splashScreen] = splashScreen;

   this [_renderingProperties] = new RenderingProperties (this .getPrivateScene ());
   this [_browserOptions]      = new BrowserOptions      (this .getPrivateScene ());
   this [_browserProperties]   = new BrowserProperties   (this .getPrivateScene ());
   this [_browserTimings]      = new BrowserTimings      (this .getPrivateScene ());
   this [_notification]        = new Notification        (this .getPrivateScene ());
   this [_contextMenu]         = new ContextMenu         (this .getPrivateScene ());

   const inches = $("<div></div>") .hide () .css ("height", "10in") .appendTo ($("body"));
   this [_pixelsPerPoint] = inches .height () / 720 || 1;
   inches .remove ();

   this .addChildObjects (X3DConstants .outputOnly, "controlKey", new Fields .SFBool (),
                          X3DConstants .outputOnly, "shiftKey",   new Fields .SFBool (),
                          X3DConstants .outputOnly, "altKey",     new Fields .SFBool (),
                          X3DConstants .outputOnly, "commandKey", new Fields .SFBool (),
                          X3DConstants .outputOnly, "altGrKey",   new Fields .SFBool ());
}

Object .assign (X3DCoreContext .prototype,
{
   initialize ()
   {
      // Setup browser nodes.

      this [_renderingProperties] .setup ();
      this [_browserOptions]      .setup ();
      this [_browserProperties]   .setup ();
      this [_browserTimings]      .setup ();
      this [_notification]        .setup ();
      this [_contextMenu]         .setup ();

      // Define properties of X3DCanvasElement.

      Object .defineProperties (this .getElement () .get (0),
      {
         browser:
         {
            value: this,
            enumerable: true,
         },
         src:
         {
            get: () =>
            {
               return this .getExecutionContext () .getWorldURL ();
            },
            set: (value) =>
            {
               this .loadURL (new Fields .MFString (value))
                  .catch (error => console .error (error));
            },
            enumerable: true,
         },
         url:
         {
            get: () =>
            {
               return new Fields .MFString (this .getExecutionContext () .getWorldURL ());
            },
            set: (value) =>
            {
               this .loadURL (value)
                  .catch (error => console .error (error));
            },
            enumerable: true,
         },
      });

      // Configure browser event handlers.

      this .getElement ()
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
   getMobile ()
   {
      return this [_mobile];
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
      if (this [_privateScene])
         return this [_privateScene];

      // X3DScene for default nodes.

      this [_privateScene] = new X3DScene (this);

      this [_privateScene] .setLive (true);
      this [_privateScene] .setup ();

      return this [_privateScene];
   },
   getPixelsPerPoint ()
   {
      return this [_pixelsPerPoint] * this .getRenderingProperty ("ContentScale");
   },
   connectedCallback ()
   { },
   attributeChangedCallback (name, oldValue, newValue)
   {
      switch (name)
      {
         case "antialiased":
         {
            this .setBrowserOption ("Antialiased", this .parseBooleanAttribute (newValue, true));
            break;
         }
         case "baseURL":
         case "baseurl":
         {
            this .setBaseURL (newValue);
            break;
         }
         case "cache":
         {
            this .setBrowserOption ("Cache", this .parseBooleanAttribute (newValue, true));
            break;
         }
         case "contentScale":
         case "contentscale":
         {
            this .setBrowserOption ("ContentScale", newValue === "auto" ? -1 : parseFloat (newValue));
            break;
         }
         case "contextMenu":
         case "contextmenu":
         {
            this .setBrowserOption ("ContextMenu", this .parseBooleanAttribute (newValue, true));
            break;
         }
         case "debug":
         {
            this .setBrowserOption ("Debug", this .parseBooleanAttribute (newValue, false));
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
            this .setBrowserOption ("Notifications", this .parseBooleanAttribute (newValue, true));
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
         case "orderIndependentTransparency":
         case "orderindependenttransparency":
         {
            this .setBrowserOption ("OrderIndependentTransparency", this .parseBooleanAttribute (newValue, false));
            break;
         }
         case "splashScreen":
         case "splashscreen":
         {
            this .setBrowserOption ("SplashScreen", this .parseBooleanAttribute (newValue, true));

            if (! this .getBrowserOption ("SplashScreen"))
            {
               this .getCanvas () .show ();
               this .getSplashScreen () .stop (true, true) .hide ();
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
         case "timings":
         {
            this .setBrowserOption ("Timings", this .parseBooleanAttribute (newValue, false));
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

               if (this .parseBooleanAttribute (newValue, true))
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
               this .loadURL (this .parseUrlAttribute (newValue))
                  .catch (error => console .error (error));
            }

            break;
         }
      }
   },
   parseBooleanAttribute  (value, defaultValue)
   {
      if (value === "true")
         return true;

      if (value === "false")
         return false;

      return defaultValue;
   },
   parseUrlAttribute (urlCharacters)
   {
      try
      {
         const url = new Fields .MFString ();

         url .fromString ("[" + urlCharacters + "]", this .getExecutionContext ());

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
                  this .getNotification () ._string = "Shading: Pointset";
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
                  this .getNotification () ._string = "Shading: Wireframe";
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
                  this .getNotification () ._string = "Shading: Flat";
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
                  this .getNotification () ._string = "Shading: Gouraud";
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
                  this .getNotification () ._string = "Shading: Phong";
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

                  this .getNotification () ._string = this .getLive () .getValue () ? "Begin Update" : "End Update";
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

               const viewpoint = this .getActiveViewpoint ();

               if (!viewpoint)
                  break;

               const vp = this .getExecutionContext () .createNode (viewpoint .getTypeName ());

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
                        const go = this .getPrivateScene () .createNode ("GeoOrigin");

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

               const options = { scene: this .getExecutionContext () };

               let text;

               switch (this .getExecutionContext () .getEncoding ())
               {
                  case "ASCII":
                  case "VRML": text = vp .toVRMLString (options); break;
                  case "JSON": text = vp .toJSONString (options); break;
                  default:     text = vp .toXMLString  (options); break;
               }

               text += "\n";

               this .copyToClipboard (text);
               this .getNotification () ._string = _ ("Viewpoint copied to clipboard.");

               console .log ("Viewpoint copied to clipboard.");
               console .debug (text);
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
   copyToClipboard (text)
   {
      // The textarea must be visible to make copy work.
      const tmp = $("<textarea></textarea>");
      this .getShadow () .find (".x_ite-private-browser") .prepend (tmp);
      tmp .text (text) .trigger ("select");
      document .execCommand ("copy");
      tmp .remove ();
   },
   dispose ()
   {
      this [_context] .getExtension ("WEBGL_lose_context") ?.loseContext ();
   },
});

export default X3DCoreContext;
