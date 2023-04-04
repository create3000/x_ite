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

import Fields              from "../../Fields.js";
import Context             from "./Context.js";
import BrowserTimings      from "./BrowserTimings.js";
import BrowserOptions      from "./BrowserOptions.js";
import BrowserProperties   from "./BrowserProperties.js";
import RenderingProperties from "./RenderingProperties.js";
import Notification        from "./Notification.js";
import ContextMenu         from "./ContextMenu.js";
import Scene               from "../../Execution/Scene.js";
import DataStorage         from "../../../standard/Utility/DataStorage.js";
import Vector3             from "../../../standard/Math/Numbers/Vector3.js";
import _                   from "../../../locale/gettext.js";

const WEBGL_LATEST_VERSION = 2;

const
   _instanceId               = Symbol (),
   _element                  = Symbol (),
   _shadow                   = Symbol (),
   _surface                  = Symbol (),
   _canvas                   = Symbol (),
   _context                  = Symbol (),
   _splashScreen             = Symbol (),
   _localStorage             = Symbol (),
   _mobile                   = Symbol (),
   _browserTimings           = Symbol (),
   _browserOptions           = Symbol (),
   _browserProperties        = Symbol (),
   _renderingProperties      = Symbol (),
   _notification             = Symbol (),
   _contextMenu              = Symbol (),
   _privateScene             = Symbol (),
   _keydown                  = Symbol (),
   _keyup                    = Symbol (),
   _pixelPerPoint            = Symbol ();

let instanceId = 0;

function X3DCoreContext (element)
{
   // Get canvas & context.

   const
      shadow       = element .data ("shadow"),
      browser      = $("<div></div>") .addClass ("x_ite-private-browser") .attr ("tabindex", 0),
      surface      = $("<div></div>") .addClass ("x_ite-private-surface") .appendTo (browser),
      splashScreen = $("<div></div>") .hide () .addClass ("x_ite-private-splash-screen") .appendTo (browser),
      spinner      = $("<div></div>") .addClass ("x_ite-private-spinner") .appendTo (splashScreen),
      progress     = $("<div></div>") .addClass ("x_ite-private-progress") .appendTo (splashScreen);

   $("<div></div>") .addClass ("x_ite-private-x_ite") .html (this .getName () + "<span class='x_ite-private-x3d'>X3D</span>") .appendTo (progress);
   $("<div></div>") .addClass ("x_ite-private-progressbar")  .appendTo (progress) .append ($("<div></div>"));
   $("<div></div>") .addClass ("x_ite-private-spinner-text") .appendTo (progress);

   this [_instanceId]   = ++ instanceId;
   this [_element]      = element;
   this [_shadow]       = shadow ? shadow .append (browser .hide ()) : this [_element] .prepend (browser);
   this [_surface]      = surface;
   this [_canvas]       = $("<canvas></canvas>") .addClass ("x_ite-private-canvas") .prependTo (surface);
   this [_context]      = Context .create (this [_canvas] [0], WEBGL_LATEST_VERSION, element .attr ("preserveDrawingBuffer") === "true");
   this [_splashScreen] = splashScreen;

   if (shadow)
      element .data ("loaded") .then (function () { browser .show (); });

   this [_localStorage] = new DataStorage (localStorage, "X_ITE.X3DBrowser(" + this [_instanceId] + ").");
   this [_mobile]       = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i .test (navigator .userAgent);

   this [_browserTimings]      = new BrowserTimings      (this .getPrivateScene ());
   this [_browserOptions]      = new BrowserOptions      (this .getPrivateScene ());
   this [_browserProperties]   = new BrowserProperties   (this .getPrivateScene ());
   this [_renderingProperties] = new RenderingProperties (this .getPrivateScene ());
   this [_notification]        = new Notification        (this .getPrivateScene ());
   this [_contextMenu]         = new ContextMenu         (this .getPrivateScene ());

   const inches = $("<div></div>") .hide () .css ("height", "10in") .appendTo ($("body"));
   this [_pixelPerPoint] = inches .height () / 720 || 1;
   inches .remove ();

   this .addChildObjects ("controlKey", new Fields .SFBool (),
                          "shiftKey",   new Fields .SFBool (),
                          "altKey",     new Fields .SFBool (),
                          "altGrKey",   new Fields .SFBool ());
}

X3DCoreContext .prototype =
{
   initialize: function ()
   {
      // Setup browser nodes.

      this [_browserTimings]      .setup ();
      this [_browserOptions]      .setup ();
      this [_browserProperties]   .setup ();
      this [_renderingProperties] .setup ();
      this [_notification]        .setup ();
      this [_contextMenu]         .setup ();

      // Define src and url property.

      Object .defineProperty (this .getElement () .get (0), "src",
      {
         get: () =>
         {
            return this .getExecutionContext () .getWorldURL ();
         },
         set: (value) =>
         {
            this .loadURL (new Fields .MFString (value), new Fields .MFString ());
         },
         enumerable: true,
         configurable: false,
      });

      Object .defineProperty (this .getElement () .get (0), "url",
      {
         get: () =>
         {
            return new Fields .MFString (this .getExecutionContext () .getWorldURL ());
         },
         set: (value) =>
         {
            this .loadURL (value, new Fields .MFString ());
         },
         enumerable: true,
         configurable: false,
      });

      // Configure browser event handlers.

      this .getElement () .on ("keydown.X3DCoreContext", this [_keydown] .bind (this));
      this .getElement () .on ("keyup.X3DCoreContext",   this [_keyup]   .bind (this));
   },
   getInstanceId: function ()
   {
      return this [_instanceId];
   },
   isStrict: function ()
   {
      return false;
   },
   getElement: function ()
   {
      return this [_element];
   },
   getShadow: function ()
   {
      return this [_shadow];
   },
   getSurface: function ()
   {
      return this [_surface];
   },
   getSplashScreen: function ()
   {
      return this [_splashScreen];
   },
   getCanvas: function ()
   {
      return this [_canvas];
   },
   getContext: function ()
   {
      return this [_context];
   },
   getMobile: function ()
   {
      return this [_mobile];
   },
   getLocalStorage: function ()
   {
      return this [_localStorage];
   },
   getBrowserTimings: function ()
   {
      return this [_browserTimings];
   },
   getBrowserOptions: function ()
   {
      return this [_browserOptions];
   },
   getBrowserProperties: function ()
   {
      return this [_browserProperties];
   },
   getRenderingProperties: function ()
   {
      return this [_renderingProperties];
   },
   getNotification: function ()
   {
      return this [_notification];
   },
   getContextMenu: function ()
   {
      return this [_contextMenu];
   },
   getPrivateScene: function ()
   {
      if (this [_privateScene])
         return this [_privateScene];

      // Scene for default nodes.

      this [_privateScene] = new Scene (this);

      this [_privateScene] .setPrivate (true);
      this [_privateScene] .setLive (true);
      this [_privateScene] .setup ();

      return this [_privateScene];
   },
   getPixelPerPoint: function ()
   {
      return this [_pixelPerPoint] * this .getRenderingProperty ("ContentScale");
   },
   connectedCallback: function ()
   { },
   attributeChangedCallback: function (name, oldValue, newValue)
   {
      switch (name)
      {
         case "antialiased":
         {
            this .setBrowserOption ("Antialiased", this .parseBooleanAttribute (newValue, true));
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
            this .loadURL (new Fields .MFString (newValue), new Fields .MFString ());
            break;
         }
         case "timings":
         {
            this .setBrowserOption ("Timings", this .parseBooleanAttribute (newValue, false));
            break;
         }
         case "url":
         {
            this .loadURL (this .parseUrlAttribute (newValue), new Fields .MFString ());
            break;
         }
      }
   },
   parseBooleanAttribute: function  (value, defaultValue)
   {
      if (value === "true")
         return true;

      if (value === "false")
         return false;

      return defaultValue;
   },
   parseUrlAttribute: function (urlCharacters)
   {
      const url = new Fields .MFString ();

      url .fromString ("[" + urlCharacters + "]", this .getExecutionContext ());

      return url;
   },
   callBrowserEventHandler: function (events)
   {
      const element = this .getElement ();

      for (const event of events .split (" "))
         element .trigger (event);
   },
   getShiftKey: function ()
   {
      return this ._shiftKey .getValue ();
   },
   getControlKey: function ()
   {
      return this ._controlKey .getValue ();
   },
   getAltKey: function ()
   {
      return this ._altKey .getValue ();
   },
   getAltGrKey: function ()
   {
      return this ._altGrKey .getValue ();
   },
   [_keydown]: function (event)
   {
      //console .log (event .keyCode);

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

               const vp = this .getPrivateScene () .createNode (viewpoint .getTypeName ());

               switch (viewpoint .getTypeName ())
               {
                  case "Viewpoint":
                  {
                     vp .position         = viewpoint .getUserPosition ();
                     vp .orientation      = viewpoint .getUserOrientation ();
                     vp .centerOfRotation = viewpoint .getUserCenterOfRotation ();
                     vp .fieldOfView      = viewpoint .getFieldOfView ();
                     break;
                  }
                  case "OrthoViewpoint":
                  {
                     vp .position         = viewpoint .getUserPosition ();
                     vp .orientation      = viewpoint .getUserOrientation ();
                     vp .centerOfRotation = viewpoint .getUserCenterOfRotation ();
                     vp .fieldOfView      = new Fields .MFFloat (viewpoint .getMinimumX (), viewpoint .getMinimumY (), viewpoint .getMaximumX (), viewpoint .getMaximumY ());
                     break;
                  }
                  case "GeoViewpoint":
                  {
                     const
                        geoOrigin = viewpoint ._geoOrigin,
                        geoCoord  = new Vector3 (0, 0, 0);

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
                     vp .fieldOfView      = viewpoint .getFieldOfView ();
                     break;
                  }
               }

               let text;

               switch (this .getExecutionContext () .getEncoding ())
               {
                  case "ASCII":
                  case "VRML": text = vp .toVRMLString (); break;
                  case "JSON": text = vp .toJSONString (); break;
                  default:     text = vp .toXMLString ();  break;
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
   [_keyup]: function (event)
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
         case 225: // Alt Gr
         {
            this ._altGrKey = false;
            break;
         }
      }
   },
   copyToClipboard: function (text)
   {
      // The textarea must be visible to make copy work.
      const tmp = $("<textarea></textarea>");
      this .getShadow () .find (".x_ite-private-browser") .prepend (tmp);
      tmp .text (text) .trigger ("select");
      document .execCommand ("copy");
      tmp .remove ();
   },
   dispose: function ()
   {
      this [_context] .getExtension ("WEBGL_lose_context") .loseContext ();
   },
};

export default X3DCoreContext;
