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

	/*
	 *  Id
	 */

	var id = 0;
	
	function getId () { return this ._id; }

	/*
	 *  X3DObject
	 */

	function X3DObject () { }

	X3DObject .prototype =
	{
		constructor: X3DObject,
		_id: 0,
		_name: "",
		_tainted: false,
		_interests: { },
		getId: function ()
		{
			this .getId = getId;

			return this ._id = ++ id;
		},
		setName: function (value)
		{
			this ._name = value;
		},
		getName: function ()
		{
			return this ._name;
		},
		setTainted: function (value)
		{
			this ._tainted = value;
		},
		getTainted: function ()
		{
			return this ._tainted;
		},
		hasInterest: function (callback, object)
		{
			return Boolean (this ._interests [object .getId () + callback]);
		},
		addInterest: function (callback, object)
		{
			if (! this .hasOwnProperty ("_interests"))
				this ._interests = { };

			var args = Array .prototype .slice .call (arguments, 0);

			args [0] = arguments [1];
			args [1] = this;

			this ._interests [object .getId () + callback] = Function .prototype .bind .apply (object [callback], args);
		},
		removeInterest: function (callback, object)
		{
			delete this ._interests [object .getId () + callback];
		},
		getInterests: function ()
		{
			return this ._interests;
		},
		processInterests: function ()
		{
			var interests = this ._interests;

			for (var key in interests)
				interests [key] ();
		},
		toString: function ()
		{
			var stream = { string: "" };

			this .toStream (stream);

			return stream .string;
		},
		toVRMLString: function ()
		{ },
		toXMLString: function ()
		{
			var stream = { string: "" };

			this .toXMLStream (stream);

			return stream .string;
		},
		dispose: function () { },
	};

	return X3DObject;
});
