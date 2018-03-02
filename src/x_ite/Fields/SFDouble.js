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
	"x_ite/Basic/X3DField",
	"x_ite/Bits/X3DConstants",
	"x_ite/InputOutput/Generator",
],
function (X3DField,
          X3DConstants,
          Generator)
{
"use strict";

	function SFDouble (value)
	{
		if (this instanceof SFDouble)
			return X3DField .call (this, arguments .length ? +value : 0);
		
		return X3DField .call (Object .create (SFDouble .prototype), arguments .length ? +value : 0);
	}

	SFDouble .prototype = Object .assign (Object .create (X3DField .prototype),
	{
		constructor: SFDouble,
		copy: function ()
		{
			return new SFDouble (this .getValue ());
		},
		getTypeName: function ()
		{
			return "SFDouble";
		},
		getType: function ()
		{
			return X3DConstants .SFDouble;
		},
		isDefaultValue: function ()
		{
			return this .getValue () === 0;
		},
		set: function (value)
		{
			X3DField .prototype .set .call (this, +value);
		},
		valueOf: X3DField .prototype .getValue,
		toStream: function (stream)
		{
			var
				generator = Generator .Get (stream),
				category  = generator .Unit (this .getUnit ());

			stream .string += String (generator .ToUnit (category, this .getValue ()));
		},
		toXMLStream: function (stream)
		{
			this .toStream (stream);
		},
	});

	return SFDouble;
});
