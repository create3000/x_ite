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
	"jquery",
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Core/X3DSensorNode",
	"x_ite/Components/Time/X3DTimeDependentNode",
	"x_ite/Bits/X3DConstants",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DSensorNode, 
          X3DTimeDependentNode, 
          X3DConstants)
{
"use strict";

	function TimeSensor (executionContext)
	{
		X3DSensorNode        .call (this, executionContext);
		X3DTimeDependentNode .call (this, executionContext);

		this .addType (X3DConstants .TimeSensor);

		this .addChildObjects ("range", new Fields .MFFloat (0, 0, 1)); // current, first, last (in fractions) - play range starting at current
		
		this .cycle    = 0;
		this .interval = 0;
		this .first    = 0;
		this .last     = 1;
		this .scale    = 1;
	}

	TimeSensor .prototype = $.extend (Object .create (X3DSensorNode .prototype),
		X3DTimeDependentNode .prototype,
	{
		constructor: TimeSensor,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",          new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "cycleInterval",    new Fields .SFTime (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "loop",             new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "startTime",        new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "resumeTime",       new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "pauseTime",        new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "stopTime",         new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "isPaused",         new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",         new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "cycleTime",        new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "elapsedTime",      new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "fraction_changed", new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "time",             new Fields .SFTime ()),
		]),
		getTypeName: function ()
		{
			return "TimeSensor";
		},
		getComponentName: function ()
		{
			return "Time";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DSensorNode        .prototype .initialize .call (this);
			X3DTimeDependentNode .prototype .initialize .call (this);

			this .cycleInterval_ .addInterest ("set_cycleInterval__", this);
			this .range_         .addInterest ("set_range__",         this);
		},
		setRange: function (currentFraction, firstFraction, lastFraction)
		{
			this .first  = firstFraction;
			this .last   = lastFraction;
			this .scale  = this .last - this .first;

			var offset = (currentFraction -  this .first) * this .cycleInterval_ .getValue ();

			this .interval = this .cycleInterval_ .getValue () * this .scale;
			this .cycle    = this .getBrowser () .getCurrentTime () - offset;
		},
		set_cycleInterval__: function ()
		{
			if (this .isActive_ .getValue ())
				this .setRange (this .fraction_changed_ .getValue (), this .range_ [1], this .range_ [2]);
		},
		set_range__: function ()
		{
			if (this .isActive_ .getValue ())
			{
				this .setRange (this .range_ [0], this .range_ [1], this .range_ [2]);

				if (! this .isPaused_ .getValue ())
					this .set_fraction (this .getBrowser () .getCurrentTime ());
			}
		},
		set_start: function ()
		{
			this .setRange (this .range_ [0], this .range_ [1], this .range_ [2]);

			this .fraction_changed_ = this .range_ [0];
			this .time_             = this .getBrowser () .getCurrentTime ();
		},			
		set_resume: function (pauseInterval)
		{
			this .setRange (this .fraction_changed_ .getValue (), this .range_ [1], this .range_ [2]);
		},
		set_fraction: function (time)
		{
			var t = (time - this .cycle) / this .interval;

			this .fraction_changed_ = this .first + (t - Math .floor (t)) * this .scale;
		},
		set_time: function ()
		{
			// The event order below is very important.

			var time = this .getBrowser () .getCurrentTime ();

			if (time - this .cycle >= this .interval)
			{
				if (this .loop_ .getValue ())
				{
					if (this .interval)
					{
						this .cycle += this .interval * Math .floor ((time - this .cycle) / this .interval);

						this .set_fraction (time);

						this .elapsedTime_ = this .getElapsedTime ();
						this .cycleTime_   = time;
					}
				}
				else
				{
					this .fraction_changed_ = this .last;
					this .stop ();
				}
			}
			else
			{
				this .set_fraction (time);

				this .elapsedTime_ = this .getElapsedTime ();
			}

			this .time_ = time;
		},
	});

	return TimeSensor;
});


