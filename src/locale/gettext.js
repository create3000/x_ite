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
	"text!locale/de.po",
	"text!locale/fr.po",
],
function (de, fr)
{
"use strict";

	function execAll (regex, string)
	{
		var
			match   = null,
			matches = [ ];

		while (match = regex .exec (string))
			matches .push (match);
	
		return matches;
	}

	function getLanguage ()
	{
		for (var i = 0; i < navigator .languages; ++ i)
		{
			var language = navigator .languages [i] .split ("-") [0];
	
			if (locales [language])
				return language;
		}

		return (navigator .language || navigator .userLanguage) .split ("-") [0];
	}

	function setLocale (language)
	{
		if (locales [language])
		{
			var
				matches = execAll (msg, locales [language]),
				locale  = locales [language] = { };
	
			for (var i = 0, length = matches .length; i < length; ++ i)
			{
				if (matches [i] [2] .length)
					locale [matches [i] [1]] = matches [i] [2];
			}
		}
	}

	var locales =
	{
		en: "C",
		de: de,
		fr: fr,
	};

	var
		msg      = /msgid\s+"(.*?)"\nmsgstr\s+"(.*?)"\n/g,
		language = getLanguage ();

	setLocale (language);

	function gettext (string)
	{
		var ĺocale = locales [language];

		if (ĺocale === undefined)
			return string;

		var translation = ĺocale [string];

		if (translation === undefined)
			return string;

		return translation;
	}

	return gettext;
});