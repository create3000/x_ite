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

	var namespaces = new WeakMap ();

	var handler =
	{
		get: function (target, key)
		{
			var value = target [key];

			if (value !== undefined)
				return value;

			var value = localStorage [target .getNameSpace () + key];

			if (value === undefined || value === "undefined")
			   return undefined;

			return $ .parseJSON (value);
		},
		set: function (target, key, value)
		{
			localStorage [target .getNameSpace () + key] = JSON .stringify (value);
			return true;
		},
	};

	function DataStorage (namespace)
	{
		namespaces .set (this, namespace);

		return new Proxy (this, handler);
	}

	DataStorage .prototype = {
		constructor: DataStorage,
		getNameSpace: function ()
		{
			return namespaces .get (this);
		},
		removeItem: function (key)
		{
			return localStorage .removeItem (this .getNameSpace () + key);
		},
		clear: function ()
		{
			var namespace = this .getNameSpace ();

			$.each (localStorage, function (key)
			{
				if (key .substr (0, namespace .length) === namespace)
					localStorage .removeItem (key);
			});
		},
	}

	return DataStorage;
});