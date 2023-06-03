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
import StopWatch   from "../../../standard/Time/StopWatch.js";
import _           from "../../../locale/gettext.js";

function BrowserTimings (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this .localStorage  = this .getBrowser () .getLocalStorage () .addNameSpace ("BrowserTimings.");
   this .fps           = new StopWatch ();
}

BrowserTimings .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
{
   constructor: BrowserTimings,
   initialize: function ()
   {
      X3DBaseNode .prototype .initialize .call (this);

      this .getBrowser () .getBrowserOptions () ._Timings .addInterest ("set_enabled__", this);

      this .localStorage .addDefaultValues ({ type: "LESS" });

      this .element = $("<div></div>")
         .hide ()
         .addClass ("x_ite-private-browser-timings")
         .appendTo (this .getBrowser () .getSurface ());

      this .table = $("<table></table>")
         .appendTo (this .element);

      this .header = $("<thead></thead>")
         .append ($("<tr></tr>")
         .append ($("<th colspan='2'></th>")
         .text (_("Browser Timings"))))
         .appendTo (this .table);

      this .body = $("<tbody></tbody>")
         .appendTo (this .table);

      this .footer = $("<tfoot></tfoot>")
         .append ($("<tr></tr>")
         .append ($("<td colspan='2'></td>")))
         .appendTo (this .table);

      this .button = $("<button></button>")
         .attr ("type", "button")
         .appendTo (this .footer .find ("td"));

      this .frameRate       = $("<td></td>");
      this .speed           = $("<td></td>");
      this .frameRate       = $("<td></td>");
      this .speed           = $("<td></td>");
      this .browserTime     = $("<td></td>");
      this .x3dTotal        = $("<td></td>");
      this .eventProcessing = $("<td></td>");
      this .pointerTime     = $("<td></td>");
      this .cameraTime      = $("<td></td>");
      this .pickingTime     = $("<td></td>");
      this .collisionTime   = $("<td></td>");
      this .renderTime      = $("<td></td>");
      this .numShapes       = $("<td></td>");
      this .sensors         = $("<td></td>");

      this .body .append ($("<tr></tr>")
         .append ($("<td></td>") .text (_("Frame rate") + ":"))
         .append (this .frameRate));

      this .body .append ($("<tr></tr>")
         .append ($("<td></td>") .text (_("Speed") + ":"))
         .append (this .speed)
         .addClass ("x_ite-private-more"));

      this .body .append ($("<tr></tr>")
         .append ($("<td></td>") .text (_("Browser") + ":"))
         .append (this .browserTime));

      this .body .append ($("<tr></tr>")
         .append ($("<td></td>") .text (_("X3D total") + ":"))
         .append (this .x3dTotal));

      this .body .append ($("<tr></tr>")
         .append ($("<td></td>") .text (_("Event Processing") + ":"))
         .append (this .eventProcessing));

      this .body .append ($("<tr></tr>")
         .append ($("<td></td>") .text (_("Pointer") + ":"))
         .append (this .pointerTime));

      this .body .append ($("<tr></tr>")
         .append ($("<td></td>") .text (_("Camera") + ":"))
         .append (this .cameraTime));

      this .body .append ($("<tr></tr>")
         .append ($("<td></td>") .text (_("Picking") + ":"))
         .append (this .pickingTime));

      this .body .append ($("<tr></tr>")
         .append ($("<td></td>") .text (_("Collision Detection") + ":"))
         .append (this .collisionTime));

      this .body .append ($("<tr></tr>")
         .append ($("<td></td>") .text (_("Rendering") + ":"))
         .append (this .renderTime));

      this .body .append ($("<tr></tr>")
         .append ($("<td></td>") .text (_("Number of Shapes") + ":"))
         .append (this .numShapes));

      this .body .append ($("<tr></tr>")
         .append ($("<td></td>") .text (_("Number of Sensors") + ":"))
         .append (this .sensors));

      this .button .on ("click touchend", this .set_type__ .bind (this));

      this .localStorage .type = this .localStorage .type === "MORE" ? "LESS" : "MORE";

      this .set_type__ ();
   },
   set_enabled__: function ()
   {
      if (this .getBrowser () .getBrowserOption ("Timings"))
      {
         this .element .stop (true, true) .fadeIn ();
         this .fps .reset ();
         this .getBrowser () .prepareEvents () .addInterest ("update", this);
         this .update ();
         this .build ();
      }
      else
      {
         this .element .stop (true, true) .fadeOut ();
         this .getBrowser () .prepareEvents () .removeInterest ("update", this);
      }
   },
   set_type__: function ()
   {
      if (this .localStorage .type === "MORE")
      {
         this .localStorage .type = "LESS";
         this .table .addClass ("less");
         this .table .removeClass ("more");
      }
      else
      {
         this .localStorage .type = "MORE";
         this .table .addClass ("more");
         this .table .removeClass ("less");
      }

      this .set_button__ ();
      this .build ();
   },
   set_button__: function ()
   {
      if (this .localStorage .type === "MORE")
         this .button .text (_("Less Properties"));
      else
         this .button .text (_("More Properties"));
   },
   update: function ()
   {
      this .fps .stop ()

      if (this .fps .elapsedTime > 1000)
      {
         this .build ();
         this .fps .reset ();
      }

      this .fps .start ();
   },
   build: function ()
   {
      const browser = this .getBrowser ();

      this .frameRate .text (f2(1000 / this .fps .averageTime) + " " + _("fps"));
      this .speed .text (f2(this .getSpeed (browser .currentSpeed)) + " " + this .getSpeedUnit (browser .currentSpeed));

      if (this .localStorage .type !== "MORE" || !browser .getWorld ())
         return;

      const
         layers            = browser .getWorld () .getLayerSet () .getLayers (),
         activeLayer       = browser .getActiveLayer (),
         navigationTime    = activeLayer && browser .getCollisionCount () ? activeLayer .getCollisionTime () .averageTime : 0,
         collisionTime     = browser .getCollisionTime () .averageTime + navigationTime,
         routingTime       = Math .max (0, browser .getBrowserTime () .averageTime - (browser .getCameraTime () .averageTime + browser .getCollisionTime () .averageTime + browser .getDisplayTime () .averageTime)),
         prepareEvents     = browser .prepareEvents () .getInterests () .size - 1,
         sensors           = browser .sensorEvents () .getInterests () .size,
         opaqueShapes      = layers .reduce ((n, layer) => n + layer .getNumOpaqueShapes (), 0),
         transparentShapes = layers .reduce ((n, layer) => n + layer .getNumTransparentShapes (), 0);

      this .browserTime     .text (f2(browser .getSystemTime () .averageTime) + " " + _("ms"));
      this .x3dTotal        .text (f2(browser .getBrowserTime () .averageTime) + " " + _("ms"));
      this .eventProcessing .text (f2(routingTime) + " " + _("ms"));
      this .pointerTime     .text (f2(browser .getPointingTime () .averageTime) + " " + _("ms"));
      this .cameraTime      .text (f2(browser .getCameraTime () .averageTime) + " " + _("ms"));
      this .pickingTime     .text (f2(browser .getPickingTime () .averageTime) + " " + _("ms"));
      this .collisionTime   .text (f2(collisionTime) + " " + _("ms"));
      this .renderTime      .text (f2(browser .getDisplayTime () .averageTime) + " " + _("ms"));
      this .numShapes       .text (opaqueShapes + " + " + transparentShapes);
      this .sensors         .text (prepareEvents + sensors);

      browser .getSystemTime ()    .reset ();
      browser .getBrowserTime ()   .reset ();
      browser .getPointingTime ()  .reset ();
      browser .getCameraTime ()    .reset ();
      browser .getPickingTime ()   .reset ();
      browser .getCollisionTime () .reset ();
      browser .getDisplayTime ()   .reset ();

      activeLayer ?.getCollisionTime () .reset ();
   },
   getSpeed: function (speed)
   {
      if (speed < 15)
         return speed;

      return speed * 3.6;
   },
   getSpeedUnit: function (speed)
   {
      if (speed < 15)
         return _("m/s");

      return _("km/h");
   },
});

Object .defineProperties (BrowserTimings,
{
   typeName:
   {
      value: "BrowserTimings",
   },
});

const f2 = (function ()
{
   const format = new Intl .NumberFormat (navigator .language || navigator .userLanguage, {
      notation: "standard",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
   }) .format;

   return function (value)
   {
      return format (Number .isFinite (value) ? value : 0);
   };
})();

export default BrowserTimings;
