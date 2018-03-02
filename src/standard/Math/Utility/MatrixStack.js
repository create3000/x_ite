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


define (function ()
{
"use strict";

	function MatrixStack (Type)
	{
		return Object .assign ([ new Type () ],
		{
			top: 0,
			set: function (matrix)
			{
				this [this .top] .assign (matrix);
			},
			get: function (matrix)
			{
				return this [this .top];
			},
			push: function ()
			{
				var top = ++ this .top;
			
				if (top < this .length)
					this [top] .assign (this [top - 1]);
				else
					this [top] = this [top - 1] .copy ();
			},
			pushMatrix: function (matrix)
			{
				var top = ++ this .top;

				if (top < this .length)
					this [top] .assign (matrix);
				else
					this [top] = matrix .copy ();
			},
			pop: function ()
			{
				-- this .top;
			},
			clear: function ()
			{
				this .top = 0;
			},
			size: function ()
			{
				return this .top + 1;
			},
			identity: function ()
			{
				this [this .top] .identity ();
			},
			multLeft: function (matrix)
			{
				this [this .top] .multLeft (matrix);
			},
			translate: function (vector)
			{
				this [this .top] .translate (vector);
			},
			rotate: function (rotation)
			{
				this [this .top] .rotate (rotation);
			},
			scale: function (vector)
			{
				this [this .top] .scale (vector);
			},
		});
	}

	return MatrixStack;
});
