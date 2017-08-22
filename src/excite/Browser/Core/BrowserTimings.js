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
 * This file is part of the Excite Project.
 *
 * Excite is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"cobweb/Fields/SFBool",
	"cobweb/Basic/X3DBaseNode",
	"lib/gettext",
],
function ($,
          SFBool,
          X3DBaseNode,
          _)
{
"use strict";
	
   function f2 (n) { return Math .floor (n * 100) / 100; }

	function BrowserTimings (executionContext)
	{
		X3DBaseNode .call (this, executionContext);

		this .addChildObjects ("enabled", new SFBool ());
	}

	BrowserTimings .prototype = $.extend (Object .create (X3DBaseNode .prototype),
	{
		constructor: BrowserTimings,
		getTypeName: function ()
		{
			return "BrowserTimings";
		},
		getComponentName: function ()
		{
			return "Excite";
		},
		getContainerField: function ()
		{
			return "browserTimings";
		},
		initialize: function ()
		{
			X3DBaseNode .prototype .initialize .call (this);

			this .enabled_ .addInterest ("set_enabled__", this);

			this .localeOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
			this .type          = this .getBrowser () .getDataStorage () ["BrowserTimings.type"] || "LESS";
			this .startTime     = 0;
			this .frames        = 0;

			this .element = $("<div></div>") .addClass ("cobweb-browser-timings") .appendTo (this .getBrowser () .getElement () .find (".cobweb-surface"));
			this .table   = $("<table></table>") .appendTo (this .element);
			this .header  = $("<thead></thead>") .append ($("<tr></tr>") .append ($("<th colspan='2'></th>"))) .appendTo (this .table);
			this .body    = $("<tbody></tbody>") .appendTo (this .table);
			this .footer  = $("<tfoot></tfoot>") .append ($("<tr></tr>") .append ($("<td colspan='2'></td>"))) .appendTo (this .table);
			this .button  = $("<button></button>") .click (this .set_type__ .bind (this)) .appendTo (this .footer .find ("td"));
			this .rows    = [ ];

			this .set_button__ ();

			if (this .getBrowser () .getDataStorage () ["BrowserTimings.enabled"])
				this .enabled_ = true;
		},
		set_enabled__: function (enabled)
		{
			if (! this .getBrowser () .getBrowserOptions () .getTimings ())
				return;

			this .getBrowser () .getDataStorage () ["BrowserTimings.enabled"] = enabled .getValue ();

			if (enabled .getValue ())
			{
				this .element .fadeIn ();
				this .getBrowser () .prepareEvents () .addInterest ("update", this);
				this .update ();
			}
			else
			{
				this .element .fadeOut ();
				this .getBrowser () .prepareEvents () .removeInterest ("update", this);
			}
		},
		set_type__: function ()
		{
			if (this .type === "MORE")
				this .type = "LESS";
			else
				this .type = "MORE";

			this .getBrowser () .getDataStorage () ["BrowserTimings.type"] = this .type;

			this .set_button__ ();
			this .build ();
		},
		set_button__: function ()
		{
			if (this .type === "MORE")
				this .button .text (_("Less Properties"));
			else
				this .button .text (_("More Properties"));
		},
		update: function ()
		{
			var currentTime = this .getBrowser () .getCurrentTime ();
		
			if (currentTime - this .startTime > 1)
			{
			   this .build ();
				
				this .frames    = 0;
				this .startTime = currentTime;
			}
			else
				++ this .frames;
		},
		build: function ()
		{
			var
				browser     = this .getBrowser (),
				currentTime = browser .getCurrentTime (),
				language    = navigator .language || navigator .userLanguage,
				fixed       = this .localeOptions,
				rows        = this .rows,
				r           = 0;
			
			rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("Frame rate") + ":")) .append ($("<td></td>") .text (f2(this .frames / (currentTime - this .startTime)) .toLocaleString (language, fixed) + " " + _("fps")));
			rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("Speed")      + ":")) .append ($("<td></td>") .text (f2(this .getSpeed (browser .currentSpeed))         .toLocaleString (language, fixed) + " " + this .getSpeedUnit (browser .currentSpeed)));

			if (this .type === "MORE")
			{
				var 
					layers            = browser .getWorld () .getLayerSet () .getLayers (),
					activeLayer       = browser .getActiveLayer (),
					systemTime        = browser .systemTime,
					navigationTime    = activeLayer && browser .getCollisionCount () ? activeLayer .collisionTime : 0,
					collisionTime     = browser .collisionTime + navigationTime,
					routingTime       = browser .browserTime - (browser .cameraTime + browser .collisionTime + browser .displayTime + navigationTime),
					prepareEvents     = Object .keys (browser .prepareEvents () .getInterests ()) .length - 1,
					sensors           = Object .keys (browser .sensors () .getInterests ()) .length,
					opaqueShapes      = 0,
					transparentShapes = 0;

				for (var l = 0; l < layers .length; ++ l)
				{
					var layer = layers [l];
					opaqueShapes      += layer .numOpaqueShapes;
					transparentShapes += layer .numTransparentShapes;
				}

			   rows [1] .addClass ("cobweb-more");

				rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("Browser")   + ":")) .append ($("<td></td>") .text (f2(systemTime)           .toLocaleString (language, fixed) + " " + _("ms")));
				rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("X3D")       + ":")) .append ($("<td></td>") .text (f2(browser .browserTime) .toLocaleString (language, fixed) + " " + _("ms")));
				rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("Routing")   + ":")) .append ($("<td></td>") .text (f2(routingTime)          .toLocaleString (language, fixed) + " " + _("ms")));
				rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("Picking")   + ":")) .append ($("<td></td>") .text (f2(browser .pickingTime) .toLocaleString (language, fixed) + " " + _("ms")));
				rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("Camera")    + ":")) .append ($("<td></td>") .text (f2(browser .cameraTime)  .toLocaleString (language, fixed) + " " + _("ms")));
				rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("Collision") + ":")) .append ($("<td></td>") .text (f2(collisionTime)        .toLocaleString (language, fixed) + " " + _("ms")));
				rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("Display")   + ":")) .append ($("<td></td>") .text (f2(browser .displayTime) .toLocaleString (language, fixed) + " " + _("ms")));
				rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("Shapes")    + ":")) .append ($("<td></td>") .text (opaqueShapes + " + " + transparentShapes));
				rows [r++] = $("<tr></tr>") .append ($("<td></td>") .text (_("Sensors")   + ":")) .append ($("<td></td>") .text (prepareEvents + sensors));
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

	return BrowserTimings;
});
