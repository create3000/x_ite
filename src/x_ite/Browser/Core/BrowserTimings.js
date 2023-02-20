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

function f2 (n) { return n .toFixed (2); }

function BrowserTimings (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this .localStorage  = this .getBrowser () .getLocalStorage () .addNameSpace ("BrowserTimings.");
   this .enabled       = false;
   this .fps           = new StopWatch ();
   this .localeOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
}

BrowserTimings .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
{
   constructor: BrowserTimings,
   getTypeName: function ()
   {
      return "BrowserTimings";
   },
   getComponentName: function ()
   {
      return "X_ITE";
   },
   getContainerField: function ()
   {
      return "browserTimings";
   },
   initialize: function ()
   {
      X3DBaseNode .prototype .initialize .call (this);

      this .localStorage .addDefaultValues ({ type: "LESS" });

      this .element = $("<div></div>") .hide () .addClass ("x_ite-private-browser-timings") .appendTo (this .getBrowser () .getSurface ());
      this .table   = $("<table></table>") .appendTo (this .element);
      this .header  = $("<thead></thead>") .append ($("<tr></tr>") .append ($("<th colspan='2'></th>"))) .appendTo (this .table);
      this .body    = $("<tbody></tbody>") .appendTo (this .table);
      this .footer  = $("<tfoot></tfoot>") .append ($("<tr></tr>") .append ($("<td colspan='2'></td>"))) .appendTo (this .table);
      this .button  = $("<button></button>") .attr ("type", "button") .appendTo (this .footer .find ("td"));
      this .rows    = [ ];

      this .button .on ("click touchend", this .set_type__ .bind (this));

      this .set_button__ ();
   },
   getEnabled: function ()
   {
      return this .enabled;
   },
   setEnabled: function (enabled)
   {
      if (this .enabled === enabled)
         return;

      this .enabled = enabled;

      if (enabled)
      {
         this .element .stop (true, true) .fadeIn ();
         this .fps .reset ();
         this .getBrowser () .prepareEvents () .addInterest ("update", this);
         this .update ();
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
         this .localStorage .type = "LESS";
      else
         this .localStorage .type = "MORE";

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
      const
         browser     = this .getBrowser (),
         language    = navigator .language || navigator .userLanguage,
         fixed       = this .localeOptions,
         rows        = this .rows;

      let r = 0;

      rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("Frame rate") + ":")) .append ($("<td></td>") .text (f2(1000 / this .fps .averageTime) .toLocaleString (language, fixed) + " " + _("fps")));
      rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("Speed")      + ":")) .append ($("<td></td>") .text (f2(this .getSpeed (browser .currentSpeed))         .toLocaleString (language, fixed) + " " + this .getSpeedUnit (browser .currentSpeed)));

      if (this .localStorage .type === "MORE")
      {
         const
            layers         = browser .getWorld () .getLayerSet () .getLayers (),
            activeLayer    = browser .getActiveLayer (),
            navigationTime = activeLayer && browser .getCollisionCount () ? activeLayer .getCollisionTime () .averageTime : 0,
            collisionTime  = browser .getCollisionTime () .averageTime + navigationTime,
            routingTime    = Math .max (0, browser .getBrowserTime () .averageTime - (browser .getCameraTime () .averageTime + browser .getCollisionTime () .averageTime + browser .getDisplayTime () .averageTime)),
            prepareEvents  = browser .prepareEvents () .getInterests () .size - 1,
            sensors        = browser .sensorEvents () .getInterests () .size;

         let
            opaqueShapes      = 0,
            transparentShapes = 0;

         for (const layer of layers)
         {
            opaqueShapes      += layer .numOpaqueShapes;
            transparentShapes += layer .numTransparentShapes;
         }

         rows [1] .addClass ("x_ite-private-more");

         rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("Browser")   + ":")) .append ($("<td></td>") .text (f2(browser .getSystemTime () .averageTime)           .toLocaleString (language, fixed) + " " + _("ms")));
         rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("X3D total")       + ":")) .append ($("<td></td>") .text (f2(browser .getBrowserTime () .averageTime) .toLocaleString (language, fixed) + " " + _("ms")));
         rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("Event Processing")   + ":")) .append ($("<td></td>") .text (f2(routingTime)          .toLocaleString (language, fixed) + " " + _("ms")));
         rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("Pointer")   + ":")) .append ($("<td></td>") .text (f2(browser .getPointingTime () .averageTime) .toLocaleString (language, fixed) + " " + _("ms")));
         rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("Camera")    + ":")) .append ($("<td></td>") .text (f2(browser .getCameraTime () .averageTime)  .toLocaleString (language, fixed) + " " + _("ms")));
         rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("Picking")   + ":")) .append ($("<td></td>") .text (f2(browser .getPickingTime () .averageTime) .toLocaleString (language, fixed) + " " + _("ms")));
         rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("Collision Detection") + ":")) .append ($("<td></td>") .text (f2(collisionTime)        .toLocaleString (language, fixed) + " " + _("ms")));
         rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("Rendering")   + ":")) .append ($("<td></td>") .text (f2(browser .getDisplayTime () .averageTime) .toLocaleString (language, fixed) + " " + _("ms")));
         rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("Number of Shapes")    + ":")) .append ($("<td></td>") .text (opaqueShapes + " + " + transparentShapes));
         rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("Number of Sensors")   + ":")) .append ($("<td></td>") .text (prepareEvents + sensors));

         browser .getSystemTime ()    .reset ();
         browser .getBrowserTime ()   .reset ();
         browser .getPointingTime ()   .reset ();
         browser .getCameraTime ()    .reset ();
         browser .getPickingTime ()   .reset ();
         browser .getCollisionTime () .reset ();
         browser .getDisplayTime ()   .reset ();

         if (activeLayer)
            activeLayer .getCollisionTime () .reset ();
      }

      rows .length = r;

      this .header .find ("th") .text (_("Browser Timings"));
      this .body .empty ();
      this .body .append (rows);
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

export default BrowserTimings;
