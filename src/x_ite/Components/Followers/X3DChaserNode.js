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
	"x_ite/Components/Followers/X3DFollowerNode",
	"x_ite/Bits/X3DConstants",
],
function (X3DFollowerNode, 
          X3DConstants)
{
"use strict";

	function X3DChaserNode (executionContext)
	{
		X3DFollowerNode .call (this, executionContext);

		this .addType (X3DConstants .X3DChaserNode);

		this .destination   = null;
		this .previousValue = null;
		this .bufferEndTime = 0;
		this .stepTime      = 0;

		// Auxillary variables
		this .deltaOut = this .getArray ();
	}

	X3DChaserNode .prototype = Object .assign (Object .create (X3DFollowerNode .prototype),
	{
		constructor: X3DChaserNode,
		initialize: function ()
		{
			X3DFollowerNode .prototype .initialize .call (this);
		
			this .set_value_       .addInterest ("set_value__", this);
			this .set_destination_ .addInterest ("set_destination__", this);
			this .duration_        .addInterest ("set_duration__", this);

			this .set_duration__ ();

			var
				buffer             = this .getBuffer (),
				initialValue       = this .getInitialValue (),
				initialDestination = this .getInitialDestination (),
				numBuffers         = this .getNumBuffers ();

			this .bufferEndTime = this .getBrowser () .getCurrentTime ();
			this .previousValue = this .duplicate (initialValue);
	
			buffer [0] = this .duplicate (initialDestination);

			for (var i = 1; i < numBuffers; ++ i)
				buffer [i] = this .duplicate (initialValue);

			this .destination = this .duplicate (initialDestination);

			if (this .equals (initialDestination, initialValue, this .getTolerance ()))
				this .setValue (initialDestination);

			else
				this .set_active (true);
		},
		getNumBuffers: function ()
		{
			return 60;
		},
		getTolerance: function ()
		{
			return 1e-8;
		},
		getArray: function ()
		{
			return this .getVector ();
		},
		setPreviousValue: function (value)
		{
			this .previousValue .assign (value);
		},
		step: function (value1, value2, t)
		{
			this .output .add (this .deltaOut .assign (value1) .subtract (value2) .multiply (t));
		},
		stepResponse: function (t)
		{
			if (t <= 0)
				return 0;

			var duration = this .duration_ .getValue ();
		
			if (t >= duration)
				return 1;
	
			return 0.5 - 0.5 * Math .cos ((t / duration) * Math .PI);
		},
		set_value__: function ()
		{
			if (! this .isActive_ .getValue ())
				this .bufferEndTime = this .getBrowser () .getCurrentTime ();

			var
				buffer = this .getBuffer (),
				value  = this .getValue ();

			for (var i = 1, length = buffer .length; i < length; ++ i)
				this .assign (buffer, i, value);

			this .setPreviousValue (value);
			this .setValue (value);

			this .set_active (true);
		},
		set_destination__: function ()
		{
			this .destination = this .duplicate (this .getDestination ());

			if (! this .isActive_ .getValue ())
				this .bufferEndTime = this .getBrowser () .getCurrentTime ();
		
			this .set_active (true);
		},
		set_duration__: function ()
		{
			this .stepTime = this .duration_ .getValue () / this .getNumBuffers ();
		},
		prepareEvents: function ()
		{
			try
			{
				var
					buffer     = this .getBuffer (),
					numBuffers = buffer .length,
					fraction   = this .updateBuffer ();
			
				this .output = this .interpolate (this .previousValue,
				                                  buffer [numBuffers - 1],
				                                  this .stepResponse ((numBuffers - 1 + fraction) * this .stepTime));
	
				for (var i = numBuffers - 2; i >= 0; -- i)
				{
					this .step (buffer [i], buffer [i + 1], this .stepResponse ((i + fraction) * this .stepTime));
				}
	
				this .setValue (this .output);
		
				if (this .equals (this .output, this .destination, this .getTolerance ()))
					this .set_active (false);
			}
			catch (error)
			{ }
		},
		updateBuffer: function ()
		{
			var
				buffer     = this .getBuffer (),
				numBuffers = buffer .length,
				fraction   = (this .getBrowser () .getCurrentTime () - this .bufferEndTime) / this .stepTime;
		
			if (fraction >= 1)
			{
				var seconds = Math .floor (fraction);

				fraction -= seconds;
		
				if (seconds < numBuffers)
				{
					this .setPreviousValue (buffer [numBuffers - seconds]);
		
					for (var i = numBuffers - 1; i >= seconds; -- i)
					{
						this .assign (buffer, i, buffer [i - seconds])
					}
		
					for (var i = 0; i < seconds; ++ i)
					{
						try
						{
							var alpha = i / seconds;

							this .assign (buffer, i, this .interpolate (this .destination, buffer [seconds], alpha))
						}
						catch (error)
						{ }
		 			}
				}
				else
				{
					this .setPreviousValue (seconds == numBuffers ? buffer [0] : this .destination);

					for (var i = 0; i < numBuffers; ++ i)
						this .assign (buffer, i, this .destination);
				}
		
				this .bufferEndTime += seconds * this .stepTime;
			}

			return fraction;
		},
	});

	return X3DChaserNode;
});


