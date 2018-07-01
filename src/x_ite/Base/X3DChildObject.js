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
	"x_ite/Base/X3DObject",
],
function (X3DObject)
{
"use strict";

	function X3DChildObject ()
	{
		X3DObject .call (this);

		this ._parents = { }; // Sparse arrays are much more expensive than plain objects!
	}

	X3DChildObject .prototype = Object .assign (Object .create (X3DObject .prototype),
	{
		constructor: X3DChildObject,
		_tainted: false,
		setTainted: function (value)
		{
			this ._tainted = value;
		},
		getTainted: function ()
		{
			return this ._tainted;
		},
		addEvent: function ()
		{
			var parents = this ._parents;

			for (var id in parents)
				parents [id] .addEvent (this);
		},
		addEventObject: function (field, event)
		{
			var parents = this ._parents;

			for (var id in parents)
				parents [id] .addEventObject (this, event);
		},
		addParent: function (parent)
		{
			this ._parents [parent .getId ()] = parent;
		},
		removeParent: function (parent)
		{
			delete this ._parents [parent .getId ()];
		},
		getParents: function ()
		{
			return this ._parents;
		},
		addClones: Function .prototype,
		removeClones: Function .prototype,
		dispose: function ()
		{
//			var parents = this ._parents;
//
//			for (var key in parents)
//				delete parents [key];

			X3DObject .prototype .dispose .call (this);
		},
	});

	return X3DChildObject;
});
