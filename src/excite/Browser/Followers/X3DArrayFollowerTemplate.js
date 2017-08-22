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


define (function ()
{
"use strict";

	return function (Type)
	{
		function X3DArrayFollowerObject ()
		{
			this .array = this .getArray ();
		}
	
		X3DArrayFollowerObject .prototype =
		{
			getValue: function ()
			{
				return this .set_value_;
			},
			getDestination: function ()
			{
				return this .set_destination_;
			},
			getInitialValue: function ()
			{
				return this .initialValue_;
			},
			getInitialDestination: function ()
			{
				return this .initialDestination_;
			},
			assign: function (buffer, i, value)
			{
				buffer [i] .setValue (value);
			},
			equals: function (lhs, rhs, tolerance)
			{
				var
					a        = this .a,
					l        = lhs .getValue (),
					r        = rhs .getValue (),
					distance = 0;

				for (var i = 0, length = l .length; i < length; ++ i)
				  distance = Math .max (a .assign (l [i] .getValue ()) .subtract (r [i] .getValue ()) .abs ());
	
				return distance < tolerance;
			},
			interpolate: function (source, destination, weight)
			{
				var
					a = this .array .getValue (),
					s = source .getValue (),
					d = destination .getValue ();
	
				this .array .length = s .length;
	
				for (var i = 0, length = s .length; i < length; ++ i)
					a [i] .getValue () .assign (s [i] .getValue ()) .lerp (d [i] .getValue (), weight);
	
				return this .array;
			},
			set_value__: function ()
			{
				this .getBuffer () [0] .length = this .set_value_ .length;
	
				Type .prototype .set_value__ .call (this);
			},
			set_destination__: function ()
			{
				var
					buffer = this .getBuffer (),
					l      = this .set_destination_ .length;
	
				for (var i = 0, length = buffer .length; i < length; ++ i)
					buffer [i] .length = l;
				
				Type .prototype .set_destination__ .call (this);
			},
		};
	
		return X3DArrayFollowerObject;
	};
});


