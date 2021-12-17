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

if (typeof module === 'undefined')
	var module = { };

require .config ({
	"waitSeconds": 0,
});

define .show = function ()
{
	this   .define = window .define;
	window .define = this;
};

define .hide = function ()
{
	if (this .define === undefined)
		delete window .define;
	else
		window .define = this .define;

	delete this .define;
};

const getScriptURL = (function ()
{
	const
		scripts = document .getElementsByTagName ('script'),
		src     = scripts [scripts .length - 1] .src;

	return function ()
	{
		return src;
	};
})();

(function ()
{
"use strict";

	function X_ITE (callback, fallback)
	{
		if (PrivateX3D)
		{
			PrivateX3D (callback, fallback);
		}
		else
		{
			callbacks .push (callback);
			fallbacks .push (fallback);
		}
	}

	function fallback (error)
	{
		require (["x_ite/Error"],
		function (Error)
		{
			Error (error, fallbacks);
		});
	}

	function noConflict ()
	{
		if (window .X3D === X_ITE)
		{
			if (X3D_ === undefined)
				delete window .X3D;
			else
				window .X3D = X3D_;
		}

		return X_ITE;
	}

	const X3D_ = window .X3D;

	let PrivateX3D = null;

	X_ITE .noConflict = noConflict;
	X_ITE .require    = require;
	X_ITE .define     = define;

	// Now assign temporary X3D.
	window .X3D = X_ITE;

	// IE fix.
	document .createElement ("X3DCanvas");

	if (window .Proxy === undefined)
		return fallback ("Proxy is not defined");

	const
		callbacks = [ ],
		fallbacks = [ ];

	require (["jquery", "x_ite/X3D"], function ($, X3D)
	{
		$ .noConflict (true);

		// Now assign real X3D.
		PrivateX3D = X3D;

		Object .assign (X_ITE, X3D);

		// Initialize all X3DCanvas tags.
		X3D ();

		for (let i = 0; i < callbacks .length; ++ i)
		   X3D (callbacks [i], fallbacks [i]);
	},
	fallback);

})();

(function ()
{
	// https://github.com/tc39/proposal-relative-indexing-method#polyfill

	function at (n)
	{
		// ToInteger() abstract op
		n = Math.trunc(n) || 0;
		// Allow negative indexing from the end
		if (n < 0) n += this.length;
		// OOB access is guaranteed to return undefined
		if (n < 0 || n >= this.length) return undefined;
		// Otherwise, this is just normal property access
		return this[n];
	}

	const TypedArray = Reflect .getPrototypeOf (Int8Array);
	for (const C of [Array, String, TypedArray])
	{
		if (C .prototype .at === undefined)
		{
			Object .defineProperty (C .prototype, "at",
			{
				value: at,
				writable: true,
				enumerable: false,
				configurable: true,
			});
		}
	}
})();
