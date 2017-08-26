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
 * This file is part of the Excite X3D Project.
 *
 * Excite X3D is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite X3D is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite X3D.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"excite/Fields",
	"excite/Components/Networking/LoadSensor",
	"excite/Browser/Networking/urls",
	"standard/Networking/URI",
	"sprintf",
	"locale/gettext",
],
function (Fields,
          LoadSensor,
          urls,
          URI,
          sprintf,
          _)
{
"use strict";
	
	function getBaseURI (element)
	{
		var baseURI = element .baseURI;

		// Fix for Edge.
		if (baseURI .startsWith ("about:"))
			baseURI = document .baseURI;

		return new URI (baseURI);
	}

	function X3DNetworkingContext ()
	{
		this .addChildObjects ("loadCount", new Fields .SFInt32 ());

		this .loadSensor     = new LoadSensor (this .getPrivateScene ());
		this .loadingTotal   = 0;
		this .loadingObjects = { };
		this .loading        = false;
		this .location       = getBaseURI (this .getElement () [0]);
		this .defaultScene   = this .createScene (); // Inline node's empty scene.
	}

	X3DNetworkingContext .prototype =
	{
		initialize: function ()
		{
			this .loadSensor .setup ();

			// Inline node's empty scene.

			this .defaultScene .setPrivate (true);
			this .defaultScene .setLive (true);
			this .defaultScene .setup ();
		},
		getProviderUrl: function ()
		{
			return urls .providerUrl;
		},
		getLocation: function ()
		{
			return this .location;
		},
		getDefaultScene: function ()
		{
			return this .defaultScene;
		},
		getLoadSensor: function ()
		{
			return this .loadSensor;
		},
		setBrowserLoading: function (value)
		{
			this .loading = value;

			if (value)
			{
				this .resetLoadCount ();

				if (this .getBrowserOptions () .getSplashScreen ())
				{
					this .getCanvas ()       .stop (true, true) .animate ({ "delay": 1 }, 1) .fadeOut (0);
					this .getSplashScreen () .stop (true, true) .animate ({ "delay": 1 }, 1) .fadeIn (0);
				}
			}
			else
			{
				if (this .getBrowserOptions () .getSplashScreen ())
				{
					this .getSplashScreen () .stop (true, true) .fadeIn  (0) .fadeOut (2000);
					this .getCanvas ()       .stop (true, true) .fadeOut (0) .fadeIn  (2000);
				}
				else
					this .getCanvas () .fadeIn (0);
			}
		},
		getLoading: function ()
		{
			return this .loading;
		},
		addLoadCount: function (object)
		{
		   var id = object .getId ();

			if (this .loadingObjects .hasOwnProperty (id))
				return;

			++ this .loadingTotal;
			this .loadingObjects [id] = object;
			
			this .setLoadCount (this .loadCount_ = this .loadCount_ .getValue () + 1);
			this .setCursor ("DEFAULT");
		},
		removeLoadCount: function (object)
		{
         var id = object .getId ();

			if (! this .loadingObjects .hasOwnProperty (id))
				return;

			delete this .loadingObjects [id];

			this .setLoadCount (this .loadCount_ = this .loadCount_ .getValue () - 1);
		},
		setLoadCount: function (value)
		{
			if (value)
				var string = sprintf .sprintf (value == 1 ? _ ("Loading %d file") : _ ("Loading %d files"), value);
			
			else
			{
				var string = _("Loading done");
				this .setCursor ("DEFAULT");
			}

			if (! this .loading)
				this .getNotification () .string_ = string;

			this .getSplashScreen () .find (".excite-private-spinner-text") .text (string);
			this .getSplashScreen () .find (".excite-private-progressbar div") .css ("width", ((this .loadingTotal - value) * 100 / this .loadingTotal) + "%");
		},
		resetLoadCount: function ()
		{
			this .loadCount_     = 0;
			this .loadingTotal   = 0;
			this .loadingObjects = { };			   
		},
	};

	return X3DNetworkingContext;
});
