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
	"standard/Math/Numbers/Vector4",
	"standard/Math/Numbers/Matrix4",
],
function (Vector4,
          Matrix4)
{
"use strict";

	var
		T  = [ ],
		Fp = [ ],
		Fm = [ ],
		S  = new Vector4 (0, 0, 0, 0);
		
	var H = new Matrix4 ( 2, -2,  1,  1,
			               -3,  3, -2, -1,
			                0,  0,  1,  0,
			                1,  0,  0,  0);

	function CatmullRomSplineInterpolator ()
	{
		this .T0 = [ ];
		this .T1 = [ ];
	}

	CatmullRomSplineInterpolator .prototype =
	{
		constructor: CatmullRomSplineInterpolator,
		generate: function (closed, key, keyValue, keyVelocity, normalizeVelocity)
		{
			var
				T0 = this .T0,
				T1 = this .T1;

			T0 .length = 0;
			T1 .length = 0;

			T  .length = 0;
			Fp .length = 0;
			Fm .length = 0;

			if (key .length > 1)
			{
				// T
		
				if (keyVelocity .length === 0)
				{
					if (closed)
						T .push (this .divide (this .subtract (keyValue [1] .getValue (), keyValue [keyValue .size () - 2] .getValue ()), 2));
		
					else
						T .push (this .create ());
		
					for (var i = 1, length = keyValue .length - 1; i < length; ++ i)
						T .push (this .divide (this .subtract (keyValue [i + 1] .getValue (), keyValue [i - 1] .getValue ()), 2));
		
					T .push (this .copy (T [0]));
				}
				else
				{
					for (var i = 0, length = keyVelocity .length; i < length; ++ i)
						T .push (this .copy (keyVelocity [i] .getValue ()));
		
					if (normalizeVelocity)
					{
						var Dtot = 0;
		
						for (var i = 0, length = keyValue .length - 1; i < length; ++ i)
							Dtot += this .abs (this .subtract (keyValue [i] .getValue (), keyValue [i + 1] .getValue ()));
		
						for (var i = 0, length = T .length - 1; i < length; ++ i)
							T [i] = this .multiply (T [i], Dtot / this .abs (T [i]));
					}
				}

				// Fm, Fp
		
				if (closed)
				{
					var i_1 = key .length - 1;
					var i_2 = key .length - 2;
		
					var d = key [1] .getValue () - key [0] .getValue () + key [i_1] .getValue () - key [i_2] .getValue ();
		
					Fm .push (2 * (key [1]   .getValue () - key [0]   .getValue ()) / d);
					Fp .push (2 * (key [i_1] .getValue () - key [i_2] .getValue ()) / d);

				}
				else
				{
					Fm .push (1);
					Fp .push (1);
				}

				for (var i = 1, length = key .length - 1; i < length; ++ i)
				{
					var d = key [i + 1] .getValue () - key [i - 1] .getValue ();
		
					Fm .push (2 * (key [i + 1] .getValue () - key [i]     .getValue ()) / d);
					Fp .push (2 * (key [i]     .getValue () - key [i - 1] .getValue ()) / d);
				}
		
				Fm .push (Fm [0]);
				Fp .push (Fp [0]);
		
				// T0, T1
		
				for (var i = 0, length = T .length; i < length; ++ i)
				{
					T0 .push (this .multiply (T [i], Fp [i]));
					T1 .push (this .multiply (T [i], Fm [i]));
				}
			}
			else
			{
				T0 .push (this .create ());
				T1 .push (this .create ());
			}
		},
		interpolate: function (index0, index1, weight, keyValue)
		{
			S .set (Math .pow (weight, 3), Math .pow (weight, 2), weight, 1);
		
			// Taking dot product from SH and C;

			return this .dot (H .multVecMatrix (S),
                           keyValue [index0] .getValue (),
                           keyValue [index1] .getValue (),
                           this .T0 [index0],
                           this .T1 [index1]);
		},
	};

	return CatmullRomSplineInterpolator;
});


