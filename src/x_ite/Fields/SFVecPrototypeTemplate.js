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
	"x_ite/Basic/X3DField",
	"x_ite/InputOutput/Generator",
],
function ($, X3DField, Generator)
{
"use strict";

	return function (Type)
	{
		return $.extend (Object .create (X3DField .prototype),
		{
			copy: function ()
			{
				return new (this .constructor) (this .getValue () .copy ());
			},
			equals: function (vector)
			{
				return this .getValue () .equals (vector .getValue ());
			},
			isDefaultValue: function (vector)
			{
				return this .getValue () .equals (Type .Zero);
			},
			set: function (value)
			{
				this .getValue () .assign (value);
			},
			negate: function ()
			{
				return new (this .constructor) (Type .negate (this .getValue () .copy ()));
			},
			add: function (vector)
			{
				return new (this .constructor) (Type .add (this .getValue (), vector .getValue ()));
			},
			subtract: function (vector)
			{
				return new (this .constructor) (Type .subtract (this .getValue (), vector .getValue ()));
			},
			multiply: function (value)
			{
				return new (this .constructor) (Type .multiply (this .getValue (), value));
			},
			multVec: function (vector)
			{
				return new (this .constructor) (Type .multVec (this .getValue (), vector .getValue ()));
			},
			divide: function (value)
			{
				return new (this .constructor) (Type .divide (this .getValue (), value));
			},
			divVec: function (vector)
			{
				return new (this .constructor) (Type .divVec (this .getValue (), vector .getValue ()));
			},
			dot: function (vector)
			{
				return this .getValue () .dot (vector .getValue ());
			},
			normalize: function (vector)
			{
				return new (this .constructor) (Type .normalize (this .getValue ()));
			},
			length: function ()
			{
				return this .getValue () .abs ();
			},
			toStream: function (stream)
			{
				var
					generator = Generator .Get (stream),
					value     = this .getValue (),
					category  = generator .Unit (this .getUnit ());

				for (var i = 0, l = value .length - 1; i < l; ++ i)
				{
					stream .string += String (generator .ToUnit (category, value [i]));
					stream .string += " ";
				}

				stream .string += String (generator .ToUnit (category, value [i]));
			},
			toXMLStream: function (stream)
			{
				this .toStream (stream);
			},
		});
	};
});
