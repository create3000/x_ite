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
	"cobweb/Basic/X3DBaseNode",
],
function (jquery,
          X3DBaseNode)
{
"use strict";
	
	function PointingDevice (executionContext)
	{
		X3DBaseNode .call (this, executionContext);

		this .cursor     = "DEFAULT";
		this .isOver     = false;
		this .motionTime = 0;
	}

	PointingDevice .prototype = $.extend (Object .create (X3DBaseNode .prototype),
	{
		constructor: PointingDevice,
		initialize: function ()
		{
			var canvas = this .getBrowser () .getCanvas ();

			//canvas .bind ("mousewheel.PointingDevice", this .mousewheel .bind (this));
			canvas .bind ("mousedown.PointingDevice",  this .mousedown  .bind (this));
			canvas .bind ("mouseup.PointingDevice",    this .mouseup    .bind (this));
			canvas .bind ("dblclick.PointingDevice",   this .dblclick   .bind (this));
			canvas .bind ("mousemove.PointingDevice",  this .mousemove  .bind (this));
			canvas .bind ("mouseout.PointingDevice",   this .onmouseout .bind (this));
		},
		mousewheel: function (event)
		{
			// event .preventDefault () must be done in the several viewers.
		},
		mousedown: function (event)
		{
			var browser = this .getBrowser ();

			browser .getCanvas () .focus ();

			if (browser .getShiftKey () && browser .getControlKey ())
				return;

			if (event .button === 0)
			{
				var
					offset = browser .getCanvas () .offset (), 
					x      = event .pageX - offset .left,
					y      = browser .getCanvas () .height () - (event .pageY - offset .top);

				browser .getCanvas () .unbind ("mousemove.PointingDevice");
				$(document) .bind ("mouseup.PointingDevice"   + this .getId (), this .mouseup .bind (this));
				$(document) .bind ("mousemove.PointingDevice" + this .getId (), this .mousemove .bind (this));

				if (browser .buttonPressEvent (x, y))
				{
					event .preventDefault ();
					event .stopImmediatePropagation (); // Keeps the rest of the handlers from being executed

					browser .setCursor ("HAND");
					browser .finished () .addInterest ("onverifymotion", this, x, y);
				}
			}
		},
		mouseup: function (event)
		{
			event .preventDefault ();
	
			var browser = this .getBrowser ();

			if (event .button === 0)
			{
				event .preventDefault ();
				browser .buttonReleaseEvent ();

				var
					offset = browser .getCanvas () .offset (), 
					x      = event .pageX - offset .left,
					y      = browser .getCanvas () .height () - (event .pageY - offset .top);
			
				$(document) .unbind (".PointingDevice" + this .getId ());
				browser .getCanvas () .bind ("mousemove.PointingDevice", this .mousemove .bind (this));

				browser .setCursor (this .isOver ? "HAND" : "DEFAULT");
				browser .finished () .addInterest ("onverifymotion", this, x, y);
				browser .addBrowserEvent ();

				this .cursor = "DEFAULT";
			}
		},
		dblclick: function (event)
		{
			if (this .isOver)
				event .stopImmediatePropagation ();
		},
		mousemove: function (event)
		{
			event .preventDefault ();

			var browser = this .getBrowser ();

			if (this .motionTime === browser .getCurrentTime ())
				return;

			this .motionTime = browser .getCurrentTime ();

			var
				offset = browser .getCanvas () .offset (), 
				x      = event .pageX - offset .left,
				y      = browser .getCanvas () .height () - (event .pageY - offset .top);

			this .onmotion (x, y);
		},
		onmotion: function (x, y)
		{
			var browser = this .getBrowser ();

			if (browser .motionNotifyEvent (x, y))
			{
				if (! this .isOver)
				{
					this .isOver = true;
					this .cursor = browser .getCursor ();
					browser .setCursor ("HAND");
				}
			}
			else
			{
				if (this .isOver)
				{
					this .isOver = false;
					browser .setCursor (this .cursor);
				}
			}
		},
		onmouseout: function (event)
		{
			this .getBrowser () .leaveNotifyEvent ();
		},
		onverifymotion: function (value, x, y)
		{
			// Veryfy isOver state. This is neccessay if an Switch changes on buttonReleaseEvent
			// and the new child has a sensor node inside. This sensor node must be update to
			// reflect the correct isOver state.

			this .getBrowser () .finished () .removeInterest ("onverifymotion", this);

			this .onmotion (x, y);
		},
	});

	return PointingDevice;
});
