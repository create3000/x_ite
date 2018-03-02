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
	"x_ite/Browser/Interpolation/CatmullRomSplineInterpolator"
],
function (CatmullRomSplineInterpolator)
{
"use strict";

	return function (Type)
	{
		var
			c0 = new Type (0, 0, 0, 0),
			c1 = new Type (0, 0, 0, 0),
			c2 = new Type (0, 0, 0, 0),
			c3 = new Type (0, 0, 0, 0);
	
		function CatmullRomSplineInterpolatorInstance ()
		{
			this .T0 = [ ];
			this .T1 = [ ];
		}
	
		CatmullRomSplineInterpolatorInstance .prototype = Object .assign (Object .create (CatmullRomSplineInterpolator .prototype),
		{
			constructor: CatmullRomSplineInterpolatorInstance,
			create: function ()
			{
				return new Type (0, 0, 0, 0);
			},
			copy: function (value)
			{
				return value .copy ();
			},
			subtract: function (lhs, rhs)
			{
				return Type .subtract (lhs, rhs);
			},
			multiply: function (lhs, rhs)
			{
				return Type .multiply (lhs, rhs);
			},
			divide: function (lhs, rhs)
			{
				return Type .divide (lhs, rhs);
			},
			abs: function (value)
			{
				return value .abs ();
			},
			dot: function (SH, C0, C1, C2, C3)
			{
				c0 .assign (C0) .multiply (SH [0]);
				c1 .assign (C1) .multiply (SH [1]);
				c2 .assign (C2) .multiply (SH [2]);
				c3 .assign (C3) .multiply (SH [3]);
	
				return c0 .add (c1) .add (c2) .add (c3);
			},
		});
	
		return CatmullRomSplineInterpolatorInstance;
	};
});


