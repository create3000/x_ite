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
],
function ()
{
"use strict";

	function X3DRoutingContext ()
	{
		this .taintedFields     = [ ];
		this .taintedFieldsTemp = [ ];
		this .taintedNodes      = [ ];
		this .taintedNodesTemp  = [ ];
	}

	X3DRoutingContext .prototype =
	{
		constructor: X3DRoutingContext,
		initialize: function () { },
		addTaintedField: function (field, event)
		{
			this .taintedFields .push (field, event);
		},
		addTaintedNode: function (node)
		{
			this .taintedNodes .push (node);
		},
		processEvents: function ()
		{
			do
			{
				// Process field events
				do
				{
					var taintedFields = this .taintedFields;

					// Swap tainted fields.
					this .taintedFields         = this .taintedFieldsTemp;
					this .taintedFields .length = 0;

					for (var i = 0, length = taintedFields .length; i < length; i += 2)
						taintedFields [i] .processEvent (taintedFields [i + 1]);

					// Don't know why this must be done after the for loop, otherwise a fatal error could be thrown.
					this .taintedFieldsTemp = taintedFields;
				}
				while (this .taintedFields .length);

				// Process node events
				do
				{
					var taintedNodes = this .taintedNodes;

					// Swap tainted nodes.
					this .taintedNodes         = this .taintedNodesTemp;
					this .taintedNodes .length = 0;

					for (var i = 0, length = taintedNodes .length; i < length; ++ i)
						taintedNodes [i] .processEvents ();
					
					// Don't know why this must be done after the for loop, otherwise a fatal error could be thrown.
					this .taintedNodesTemp = taintedNodes;
				}
				while (! this .taintedFields .length && this .taintedNodes .length);
			}
			while (this .taintedFields .length);
		},
	};

	return X3DRoutingContext;
});
