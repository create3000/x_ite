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

﻿
define ([
	"jquery",
],
function ($)
{
"use strict";

	var Events =
	{
		stack: [ ],
		create: function (field)
		{
			if (this .stack .length)
			{
				var event = this .stack .pop ();

				event .field = field;

				return event;
			}
            
			return {
				field: field,
				sources: { }, // Sparse arrays are much more expensive than plain objects!
			};
		},
		copy: function (event)
	   {
			if (this .stack .length)
			{
				var copy = this .stack .pop ();

				copy .field = event .field;
	      }
			else
			{
				var copy = {
					field: event .field,
					sources: { },
				};
			}

			var
				fromSources = event .sources,
				toSources   = copy .sources;

			for (var id in fromSources)
				toSources [id] = fromSources [id];

			return copy;
	   },
		push: function (event)
		{
		   var sources = event .sources;

		   for (var id in sources)
		      delete sources [id];

		   this .stack .push (event);
		},
		clear: function ()
		{
			this .stack .length = 0;
		}
	};

	return Events;
});
