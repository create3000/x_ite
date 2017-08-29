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
],
function ($)
{
"use strict";

	function Complex (real, imag)
	{
		this .real = real
		this .imag = imag;
	}

	Complex .prototype =
	{
		constructor: Complex,
		copy: function ()
		{
			var copy = Object .create (Complex .prototype);
			copy .real = this .real;
			copy .imag = this .imag;
			return copy;
		},
		assign: function (complex)
		{
			this .real = complex .real;
			this .imag = complex .imag;
			return this;
		},
		equals: function (complex)
		{
			return this .real === complex .real &&
			       this .imag === complex .imag;
		},
		setRadius: function (radius)
		{
			return this .setPolar (radius, this .getAngle ());
		},
		getRadius: function ()
		{
			if (this .real)
			{
				if (this .imag)
					return Math .sqrt (this .real * this .real + this .imag * this .imag);

				return Math .abs (this .real);
			}

			return Math .abs (this .imag);
		},
		setAngle: function (angle)
		{
			return this .setPolar (this .getRadius (), angle);
		},
		getAngle: function ()
		{
			return Math .atan2 (this .imag, this .real);
		},
		setPolar: function (radius, angle)
		{
			this .real = radius * Math .cos (angle);
			this .imag = radius * Math .sin (angle);
		},
		conjugate: function ()
		{
			this .imag = -this .imag;
			return this;
		},
		negate: function ()
		{
			this .real = -this .real;
			this .imag = -this .imag;
			return this;
		},
		inverse: function ()
		{
			var d = this .real * this .real + this .imag * this .imag;

			this .real /=  d;
			this .imag /= -d;
			return this;
		},
		add: function (value)
		{
			this .real += value .real;
			this .imag += value .imag;
			return this;
		},
		subtract: function (value)
		{
			this .real -= value .real;
			this .imag -= value .imag;
			return this;
		},
		multiply: function (value)
		{
			this .real *= value;
			this .imag *= value;
			return this;
		},
		multComp: function ()
		{
			var
				real = this .real, imag = this .imag;

			this .real = real * value .real - imag * value .imag;
			this .imag = real * value .imag + imag * value .real;
			return this;
		},
		//divide: function (value)
		//{
		//	return this;
		//},
		divComp: function (value)
		{
			var
				ar = this .real, ai = this .imag,
				br = value .real, bi = value .imag;

			var d = br * br + bi * bi;

			this .real = (ar * br + ai * bi) / d;
			this .imag = (ai * br - ar * bi) / d;
			return this;
		},
		toString: function ()
		{
			if (this .imag)
				return this .real + " " + this .imag + "i";

			return String (this .real);
		},
	};

	$.extend (Complex,
	{
		Polar: function (radius, angle)
		{
			var complex = Object .create (Complex .prototype);
			complex .real = radius * Math .cos (angle);
			complex .imag = radius * Math .sin (angle);
			return complex;
		},
		multiply: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .real = lhs .real * rhs;
			copy .imag = lhs .imag * rhs;
			return copy;
		},
		multComp: function (lhs, rhs)
		{
			var copy = Object .create (this .prototype);
			copy .real = lhs .real * rhs .real - lsh .imag * rhs .imag;
			copy .imag = lhs .real * rhs .imag + lsh .imag * rhs .real;
			return copy;
		},
	});

	return Complex;
});
