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
 * This file is part of the X-ITE Project.
 *
 * X-ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X-ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X-ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"x-ite/Components/Core/X3DChildNode",
	"x-ite/Bits/X3DConstants",
	"standard/Math/Algorithm",
],
function ($,
          X3DChildNode, 
          X3DConstants,
          Algorithm)
{
"use strict";

	function X3DInterpolatorNode (executionContext)
	{
		X3DChildNode .call (this, executionContext);

		this .addType (X3DConstants .X3DInterpolatorNode);
	}

	X3DInterpolatorNode .prototype = $.extend (Object .create (X3DChildNode .prototype),
	{
		constructor: X3DInterpolatorNode,
		setup: function ()
		{
			// If an X3DInterpolatorNode value_changed outputOnly field is read before it receives any inputs,
			// keyValue[0] is returned if keyValue is not empty. If keyValue is empty (i.e., [ ]), the initial
			// value for the respective field type is returned (EXAMPLE  (0, 0, 0) for Fields .SFVec3f);

			this .set_key__ ();

			if (this .key_ .length)
				this .interpolate (0, 0, 0);

			X3DChildNode .prototype .setup .call (this);
		},
		initialize: function ()
		{
			X3DChildNode .prototype .initialize .call (this);
			
			this .set_fraction_ .addInterest ("set_fraction__", this);
			this .key_          .addInterest ("set_key__", this);
		},
		set_fraction__: function ()
		{
			var
				key      = this .key_,
				length   = key .length,
				fraction = this .set_fraction_ .getValue ();

			switch (length)
			{
				case 0:
					// Interpolator nodes containing no keys in the key field shall not produce any events.
					return;
				case 1:
					return this .interpolate (0, 0, 0);
				default:
				{
					if (fraction <= key [0])
						return this .interpolate (0, 1, 0);

					var index1 = Algorithm .upperBound (key, 0, length, fraction, Algorithm .less);

					if (index1 !== length)
					{
						var
							index0 = index1 - 1,
							weight = (fraction - key [index0]) / (key [index1] - key [index0]);

						this .interpolate (index0, index1, Algorithm .clamp (weight, 0, 1));
					}
					else
						this .interpolate (length - 2, length - 1, 1);
				}
			}
		},
		set_key__: function ()
		{
			this .set_keyValue__ ();
		},
		set_keyValue__: function () { },
		interpolate: function () { },
	});

	return X3DInterpolatorNode;
});


