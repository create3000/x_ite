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
	"cobweb/Components/Core/X3DChildNode",
	"cobweb/Components/Time/X3DTimeDependentNode",
	"cobweb/Bits/X3DConstants",
],
function ($,
          X3DChildNode,
          X3DTimeDependentNode,
          X3DConstants)
{
"use strict";

	function X3DSoundSourceNode (executionContext)
	{
		X3DChildNode         .call (this, executionContext);
		X3DTimeDependentNode .call (this, executionContext);

		this .addType (X3DConstants .X3DSoundSourceNode);

		this .volume = 0;
		this .media  = null;
	}

	X3DSoundSourceNode .prototype = $.extend (Object .create (X3DChildNode .prototype),
		X3DTimeDependentNode .prototype,
	{
		constructor: X3DSoundSourceNode,
		initialize: function ()
		{
			X3DChildNode         .prototype .initialize .call (this);
			X3DTimeDependentNode .prototype .initialize .call (this);

		},
		set_browser_live__: function ()
		{
			X3DTimeDependentNode .prototype .set_browser_live__ .call (this);

			if (this .getDisabled ())
			{
				this .getBrowser () .volume_ .removeInterest ("set_volume__", this);
				this .getBrowser () .mute_   .removeInterest ("set_volume__", this);
			}
			else
			{
				this .getBrowser () .volume_ .addInterest ("set_volume__", this);
				this .getBrowser () .mute_   .addInterest ("set_volume__", this);
				this .set_volume__ ();
			}
		},
		setMedia: function (value)
		{
			if (this .media)
			{
				this .media [0] .volume = 0;
				this .media [0] .pause ();
				this .media .unbind ("ended");
			}

			this .media = value;
	
			if (value)
			{
				var media = value [0];

				this .setVolume (0);
				this .duration_changed_ = media .duration;

				//this .set_loop__ ();

				if (this .enabled_ .getValue ())
				{
					if (this .isActive_ .getValue ())
					{
						if (this .loop_ .getValue ())
							media .currentTime = this .getElapsedTime () % media .duration;
						else
							media .currentTime = this .getElapsedTime ();

						if (! this .isPaused_ .getValue ())
						{							
							if (this .speed_ .getValue ())
								media .play ();
						}
					}
				}
			}
		},
		getMedia: function ()
		{
			return this .media;
		},
		setVolume: function (volume)
		{
			this .volume = volume;

			this .set_volume__ ();
		},
		set_volume__: function ()
		{
			if (this .media)
				this .media [0] .volume = (! this .getBrowser () .mute_ .getValue ()) * this .getBrowser () .volume_ .getValue () * this .volume;
		},
		set_speed: function ()
		{ },
		set_pitch: function ()
		{ },
		set_start: function ()
		{
			if (this .media)
			{
				if (this .speed_ .getValue ())
				{
					this .media [0] .currentTime = 0;
					this .media [0] .play ();
				}
			}
		},
		set_pause: function ()
		{
			if (this .media)
			{
				this .media .unbind ("ended");
				this .media [0] .pause ();
			}
		},
		set_resume: function ()
		{
			if (this .media)
			{
				if (this .speed_ .getValue ())
					this .media [0] .play ();
			}
		},
		set_stop: function ()
		{
			if (this .media)
			{
				this .media .unbind ("ended");
				this .media [0] .pause ();
			}
		},
		set_ended: function ()
		{
			if (this .media)
			{
				var media = this .media [0];

				if (media .currentTime < media .duration)
					return;

				if (this .loop_ .getValue ())
				{
					if (this .speed_ .getValue ())
						media .play ();

					// The event order below is very important.

					this .elapsedTime_ = this .getElapsedTime ();
					this .cycleTime_   = this .getBrowser () .getCurrentTime ();
				}
				else
					this .stop ();
			}
		},
		prepareEvents: function ()
		{
			this .set_ended ();

			this .elapsedTime_ = this .getElapsedTime ();
		},
	});

	return X3DSoundSourceNode;
});

