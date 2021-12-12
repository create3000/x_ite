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

	function BindableStack (executionContext, defaultNode)
	{
		X3DBaseNode .call (this, executionContext);

		this .array          = [ defaultNode ];
		this .transitionNode = defaultNode .create (executionContext);
	}

	BindableStack .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
	{
		constructor: BindableStack,
		getTypeName: function ()
		{
			return "BindableStack";
		},
		getComponentName: function ()
		{
			return "X_ITE";
		},
		getContainerField: function ()
		{
			return "bindableStack";
		},
		get: function ()
		{
			return this .array;
		},
		top: function ()
		{
			return this .transitionNode .transitionActive_ .getValue () ? this .transitionNode : this .array [this .array .length - 1];
		},
		pushOnTop: function (node)
		{
			if (node !== this .array [0])
			{
				this .top () .isBound_ = false;
				this .array .push (node);
			}

			node .isBound_  = true;
			node .bindTime_ = this .getBrowser () .getCurrentTime ();

			this .addNodeEvent ();
		},
		update: function (layerNode, removedNodes, changedNodes)
		{
			if (removedNodes .length === 0 && changedNodes .length === 0)
				return;

			// Save top node for later use.

			const
				fromNode  = this .top (),
				boundNode = this .array [this .array .length - 1];

			// Remove invisible nodes and unbind them if needed.

			for (var i = 0, length = removedNodes .length; i < length; ++ i)
			{
				const
					removedNode = removedNodes [i],
					index       = this .array .indexOf (removedNode);

				if (index > -1)
				{
					this .array .splice (index, 1);
				}

				if (removedNode .isBound_ .getValue ())
				{
					removedNode .isBound_ = false;
				}
			}

			// Unbind nodes with set_bind false and pop top node.

			const unbindNodes = changedNodes .filter (node => ! node .set_bind_ .getValue ());

			for (var i = 0, length = unbindNodes .length; i < length; ++ i)
			{
				if (unbindNodes [i] .isBound_ .getValue ())
					unbindNodes [i] .isBound_ = false;
			}

			if (unbindNodes .indexOf (boundNode) > -1)
			{
				this .array .pop ();
			}

			// Push nodes with set_bind true to top of stack.

			const bindNodes = changedNodes .filter (node => node .set_bind_ .getValue ());

			for (var i = 0, length = bindNodes .length; i < length; ++ i)
			{
				const
					bindNode = bindNodes [i],
					index    = this .array .indexOf (bindNode);

				if (index > -1)
				{
					this .array .splice (index, 1);
				}

				this .array .push (bindNode);
			}

			// Bind top node if not bound.

			const top = this .array [this .array .length - 1];

			if ((! top .isBound_ .getValue () || bindNodes .indexOf (top) >= 0) && top !== boundNode)
			{
				// First unbind last bound node.

				boundNode .set_bind_ = false;
				boundNode .isBound_  = false;

				// Now bind new top node.

				top .isBound_  = true;
				top .bindTime_ = this .getBrowser () .getCurrentTime ();

				// Do transition.

				this .transitionNode = top .create (this .getExecutionContext ());
				this .transitionNode .setup ();

				this .transitionNode .transitionStart (layerNode, fromNode, top);
			}

			if (top !== boundNode)
				this .addNodeEvent ();
		},
	});

	return BindableStack;
});
