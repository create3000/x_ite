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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Networking/X3DNetworkSensorNode",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNetworkSensorNode,
          X3DCast,
          X3DConstants)
{
"use strict";

	function LoadSensor (executionContext)
	{
		X3DNetworkSensorNode .call (this, executionContext);

		this .addType (X3DConstants .LoadSensor);

		this .urlObjects = [ ];
		this .aborted    = false;
		this .timeOutId  = undefined;
	}

	LoadSensor .prototype = Object .assign (Object .create (X3DNetworkSensorNode .prototype),
	{
		constructor: LoadSensor,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",  new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",   new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "timeOut",   new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",  new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "isLoaded",  new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "progress",  new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "loadTime",  new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "watchList", new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "LoadSensor";
		},
		getComponentName: function ()
		{
			return "Networking";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DNetworkSensorNode .prototype .initialize .call (this);

			this .enabled_   .addInterest ("set_enabled__", this);
			this .timeOut_   .addInterest ("set_timeOut__", this);
			this .watchList_ .addInterest ("set_watchList__", this);

			this .watchList_ .addEvent ();
		},
		set_enabled__: function ()
		{
			if (this .enabled_ .getValue ())
				this .reset ();
		
			else
			{
				this .abort ();
				this .remove ();
			}
		},
		set_timeOut__: function ()
		{
			if (this .isActive_ .getValue ())
			{
				this .clearTimeout ();

				this .aborted = false;

				if (this .timeOut_ .getValue () > 0)
					this .timeOutId = setTimeout (this .abort .bind (this), this .timeOut_ .getValue () * 1000);
			}
		},
		set_watchList__: function ()
		{
			this .reset ();
		},
		set_loadState__: function (dummy, urlObject)
		{
			switch (urlObject .checkLoadState ())
			{
				case X3DConstants .NOT_STARTED_STATE:
					break;
				case X3DConstants .IN_PROGRESS_STATE:
				case X3DConstants .COMPLETE_STATE:
				case X3DConstants .FAILED_STATE:
				{
					this .count ();
					break;
				}
			}
		},
		count: function ()
		{
			var
				complete   = 0,
				failed     = 0,
				urlObjects = this .urlObjects;

			for (var i = 0, length = urlObjects .length; i < length; ++ i)
			{
				var urlObject = urlObjects [i];

				complete += urlObject .checkLoadState () == X3DConstants .COMPLETE_STATE;
				failed   += urlObject .checkLoadState () == X3DConstants .FAILED_STATE;
			}

			var
				loaded   = complete == urlObjects .length,
				progress = complete / urlObjects .length;

			if (this .aborted || failed || loaded)
			{
				this .clearTimeout ();

				this .isActive_ = false;
				this .isLoaded_ = loaded;
				this .progress_ = progress;

				if (loaded)
					this .loadTime_ = this .getBrowser () .getCurrentTime ();
			}
			else
			{
				if (this .isActive_ .getValue ())
				{
					this .progress_ = progress;
				}
				else
				{
					this .isActive_ = true;

					this .progress_ = progress;
		
					this .set_timeOut__ ();
				}
			}
		},
		abort: function ()
		{
			this .clearTimeout ();

			this .aborted = true;

			if (this .enabled_ .getValue ())
				this .count ();
		},
		reset: function ()
		{
			this .remove ();
		
			if (this .enabled_ .getValue ())
			{
				var
					watchList  = this .watchList_ .getValue (),
					urlObjects = this .urlObjects;

				for (var i = 0, length = watchList .length; i < length; ++ i)
				{
					var urlObject = X3DCast (X3DConstants .X3DUrlObject, watchList [i]);
		
					if (urlObject)
					{
						urlObjects .push (urlObject);
		
						urlObject .loadState_ .addInterest ("set_loadState__", this, urlObject);
					}
				}

				this .count ();
			}
		},
		remove: function ()
		{
			this .clearTimeout ();

			var urlObjects = this .urlObjects;

			for (var i = 0, length = urlObjects .length; i < length; ++ i)
				urlObjects [i] .loadState_ .removeInterest ("set_loadState__", this);

			urlObjects .length = 0;
		},
		clearTimeout: function ()
		{
			clearTimeout (this .timeOutId);
			this .timeOutId = undefined;
		},
	});

	return LoadSensor;
});


