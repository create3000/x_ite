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

(function ()
{
"use strict";

	function X3D (callback, fallback)
	{
		callbacks .push (callback);
		fallbacks .push (fallback);
	}

	function fallback (error)
	{
		console .log (error);

		require (["excite/Error"],
		function (Error)
		{
			Error (error, fallbacks);

			delete window .X3D;
		});
	}

	function noConflict ()
	{
		if (window .X3D === X3D)
		{
			if (X3D_ === undefined)
				delete window .X3D;
			else
				window .X3D = X3D_;
		}

		return X3D;
	}

	require (["jquery"],
	function ($)
	{
		$ .noConflict (true);
	});

	var
		tempX3D = X3D,
		X3D_    = window .X3D;

	X3D .noConfict = noConflict;
	X3D .require   = require;
	X3D .define    = define;

	// Now assign temporary X3D.
	window .X3D = X3D;

	if (window .Proxy === undefined)
		return fallback ("Proxy is not defined");

	var
		callbacks = [ ],
		fallbacks = [ ];

	require (["excite/X3D"],
	function (X3D)
	{
		function noConflict ()
		{
			if (window .X3D === X3D)
			{
				if (X3D_ === undefined)
					delete window .X3D;
				else
					window .X3D = X3D_;
			}

			return X3D;
		}

		// Now assign real X3D.
		X3D .noConfict = noConflict;

		if (tempX3D === window .X3D)
			window .X3D = X3D;

		// Initialize all X3DCanvas tags.
		X3D (); 

		for (var i = 0; i < callbacks .length; ++ i)
		   X3D (callbacks [i], fallbacks [i]);
	},
	fallback);

}) ();