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
	"cobweb/Bits/X3DConstants",
],
function ($,
          X3DChildNode, 
          X3DConstants)
{
"use strict";

	function X3DFollowerNode (executionContext)
	{
		X3DChildNode .call (this, executionContext);

		this .addType (X3DConstants .X3DFollowerNode);

		this .buffer = [ ];

		// Auxillary variables
		this .a      = this .getVector ();
		this .vector = this .getVector ();
	}

	X3DFollowerNode .prototype = $.extend (Object .create (X3DChildNode .prototype),
	{
		constructor: X3DFollowerNode,
		initialize: function ()
		{
			X3DChildNode .prototype .initialize .call (this);

			this .isLive () .addInterest ("set_live__", this);
		},
		duplicate: function (value)
		{
			return value .copy ();
		},
		getBuffer: function ()
		{
			return this .buffer;
		},
		getValue: function ()
		{
			return this .set_value_ .getValue ();
		},
		getDestination: function ()
		{
			return this .set_destination_ .getValue ();
		},
		getInitialValue: function ()
		{
			return this .initialValue_ .getValue ();
		},
		getInitialDestination: function ()
		{
			return this .initialDestination_ .getValue ();
		},
		setValue: function (value)
		{
			this .value_changed_ = value;
		},
		assign: function (buffer, i, value)
		{
			buffer [i] .assign (value);
		},
		equals: function (lhs, rhs, tolerance)
		{
			return this .a .assign (lhs) .subtract (rhs) .abs () < tolerance;
		},
		interpolate: function (source, destination, weight)
		{
			return this .vector .assign (source) .lerp (destination, weight);
		},
		set_live__: function ()
		{
			if (this .isLive () .getValue () && this .isActive_ .getValue ())
			{
				this .getBrowser () .prepareEvents () .addInterest ("prepareEvents", this);
				this .getBrowser () .addBrowserEvent ();
			}
			else
				this .getBrowser () .prepareEvents () .removeInterest ("prepareEvents", this);
		},
		set_active: function (value)
		{
			if (value !== this .isActive_ .getValue ())
			{
				this .isActive_ = value;

				this .set_live__ ();
			}
		},
	});

	return X3DFollowerNode;
});


