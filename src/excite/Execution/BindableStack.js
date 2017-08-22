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
 * This file is part of the Excite X3D Project.
 *
 * Excite X3D is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite X3D is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite X3D.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"excite/Basic/X3DBaseNode",
],
function ($, X3DBaseNode)
{
"use strict";

	function BindableStack (executionContext, layer, defaultNode)
	{
		X3DBaseNode .call (this, executionContext);

		this .layer = layer;
		this .array = [ defaultNode ];
	}

	BindableStack .prototype = $.extend (Object .create (X3DBaseNode .prototype),
	{
		constructor: BindableStack,
		getTypeName: function ()
		{
			return "BindableStack";
		},
		getComponentName: function ()
		{
			return "Excite";
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
			return this .array [this .array .length - 1];
		},
		forcePush: function (node)
		{
			node .isBound_  = true;
			node .bindTime_ = this .getBrowser () .getCurrentTime ();

			this .push (node);
		},
		push: function (node)
		{
			if (this .array .length === 0)
				return;

			if (node === this .array [0])
				return;

			var top = this .top ();

			if (node !== top)
			{
				this .pushOnTop (node);

				if (top .isBound_ .getValue ())
				{
					top .set_bind_ = false;
					top .isBound_  = false;
				}

				if (! node .isBound_ .getValue ())
				{
					node .isBound_  = true;
					node .bindTime_ = this .getBrowser () .getCurrentTime ();
					node .transitionStart (top);
				}

				this .pushOnTop (node);

				this .addNodeEvent ();
			}
		},
		pushOnTop: function (node)
		{
			var index = this .array .indexOf (node);

			if (index > -1)
				this .array .splice (index, 1);

			this .array .push (node);
		},
		remove: function (node)
		{
			if (node === this .array [0])
				return;

			// If on top, pop node.

			var top = this .top ();

			if (node === top)
				return this .pop (node);

			// Simply remove.

			var index = this .array .indexOf (node);

			if (index > -1)
				this .array .splice (index, 1);
		},
		pop: function (node)
		{
			if (node === this .array [0])
				return;

			var top = this .top ();
			
			if (node === top)
			{
				if (node .isBound_ .getValue ())
					node .isBound_ = false;

				if (this .array .length === 0)
					return;

				this .array .pop ();

				top = this .top ();

				if (! top .isBound_ .getValue ())
				{
					top .set_bind_ = true;
					top .isBound_  = true;
					top .bindTime_ = this .getBrowser () .getCurrentTime ();
					top .transitionStart (node);
				}

				this .addNodeEvent ();
			}
		},
	});

	return BindableStack;
});