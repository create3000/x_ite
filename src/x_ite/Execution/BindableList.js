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
	"x_ite/Basic/X3DBaseNode",
],
function (X3DBaseNode)
{
"use strict";

	function equals (lhs, rhs)
	{
		if (lhs .length !== rhs .length)
			return false;

		for (var i = 0; i < lhs .length; ++ i)
		{
			if (lhs [i] !== rhs [i])
				return false
		}

		return true;
	}

	function BindableList (executionContext, layer, defaultNode)
	{
		X3DBaseNode .call (this, executionContext);

		this .layer     = layer;
		this .collected = [ defaultNode ];
		this .array     = [ defaultNode ];
	}

	BindableList .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
	{
		constructor: BindableList,
		getTypeName: function ()
		{
			return "BindableList";
		},
		getComponentName: function ()
		{
			return "X_ITE";
		},
		getContainerField: function ()
		{
			return "bindableList";
		},
		get: function ()
		{
			return this .array;
		},
		getBound: function (name)
		{
			if (name && name .length)
			{
				for (var i = 1, length = this .array .length; i < length; ++ i)
				{
					var node = this .array [i];

					if (node .getName () == name)
						return node;
				}
			}

			for (var i = 1, length = this .array .length; i < length; ++ i)
			{
				var node = this .array [i];

				if (node .isBound_ .getValue ())
					return node;
			}

			if (length > 1)
				return this .array [1];

			return this .array [0];
		},
		push: function (node)
		{
			return this .collected .push (node);
		},
		update: function ()
		{
			if (! equals (this .collected, this .array))
			{
				for (var i = 0, length = this .array .length; i < length; ++ i)
				{
					var node = this .array [i];

					if (this .collected .indexOf (node) < 0)
					{
						if (node .isBound_ .getValue ())
							node .set_bind_ = false;							
					}
				}

				// Swap arrays.

				var tmp = this .array;

				this .array     = this .collected;
				this .collected = tmp;
			}

			this .collected .length = 1;
		},
	});

	return BindableList;
});
