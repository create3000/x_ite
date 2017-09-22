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


var Bookmarks = (function ()
{
"use strict";

	var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i .test (navigator .userAgent);

	function shuffle (array)
	{
		var i = array .length;

		while (i > 1)
		{
			var
				a = -- i,
				b = Math .floor (Math .random () * a),
				t = array [a];

			array [a] = array [b];
			array [b] = t;
		}

		return array;
	}

	function Bookmarks (browser, element, bookmarks, filesPerPage)
	{
		var index = browser .getDataStorage () ["Bookmarks.pageIndex"];

		this .browser         = browser;
		this .element         = element;
		this .bookmarks       = bookmarks;
		this .filesPerPage    = filesPerPage;
		this .index           = index || 0;
		this .randomBookmarks = [ ];
	}

	Bookmarks .prototype =
	{
		setup: function ()
		{
			var
				bookmarks    = this .bookmarks .slice (),
				filesPerPage = this .filesPerPage,
				index        = this .index,
				pages        = [ ];

			if (mobile)
				bookmarks = bookmarks .filter (function (bookmark) { return bookmark .mobile; });

			while (bookmarks .length)
				pages .push (bookmarks .splice (0, filesPerPage || 20));

			this .index = Math .min (index, pages .length - 1);
			this .pages = pages;

			this .next (0);
		},
		setFilesPerPage: function (filesPerPage)
		{
			var first = this .filesPerPage * this .index;

			this .filesPerPage = filesPerPage;
			this .index = parseInt (first / this .filesPerPage);
			this .setup ();
		},
		restore: function (first)
		{
			var url = this .browser .getDataStorage () ["Bookmarks.url"];

			if (url)
				this .loadURL (url);
			else
				this .loadURL (first);
		},
		loadURL: function (url, li)
		{
			$(this .element) .find (".bookmark-selected") .removeClass ("bookmark-selected");

			if (li)
				li .addClass ("bookmark-selected");

			this .currentUrl = url;

			this .browser .getDataStorage () ["Bookmarks.url"] = url;

			this .browser .loadURL (new X3D .MFString (url), new X3D .MFString ());

			return false;
		},
		next: function (n)
		{
			this .element .empty ();

			this .index = (this .index + this .pages .length + n) % this .pages .length;

			this .browser .getDataStorage () ["Bookmarks.pageIndex"] = this .index;

			var ul = $("<ul></ul>") .addClass ("bookmark-list") .appendTo (this .element);

			var previous = $("<li></li>")
				.addClass ("bookmark")
				.addClass ("bookmark-previous")
				.appendTo (ul);

			$("<a></a>")
				.attr ("href", "previous")
				.click (this .next .bind (this, -1))
				.html ("<span>previous</span>")
				.appendTo (previous);

			var currentUrl = this .browser .getDataStorage () ["Bookmarks.url"] ;

			this .pages [this .index] .forEach (function (item)
			{
				var li = $("<li></li>") .addClass ("bookmark") .appendTo (ul);

				if (item .url)
				{
					var
						url     = item .url [0],
						archive = item .archive;

					$("<a></a>")
						.attr ("href", url)
						.attr ("title", url)
						.click (this .loadURL .bind (this, item .url, li))
						.text (item .name)
						.addClass ("bookmark-link")
						.appendTo (li);

					if (archive)
					{
						$("<a></a>")
							.attr ("href", archive)
							.attr ("title", archive)
							.text ("Download")
							.addClass ("bookmark-archive")
							.appendTo (li);
					}

					if (url == currentUrl)
						li .addClass ("bookmark-selected");
				}
				else
				{
					li .addClass ("bookmark-section");

					$("<span></span>")
						.text (item .name)
						.appendTo (li);
				}
			},
			this);

			var next = $("<li></li>")
				.addClass ("bookmark")
				.addClass ("bookmark-next")
				.appendTo (ul);

			$("<a></a>")
				.attr ("href", "next")
				.click (this .next .bind (this, 1))
				.html ("<span>next</span>")
				.appendTo (next);

			return false;
		},
		random: function ()
		{
			if (this .randomBookmarks .length === 0)
			{
				for (var p = 0; p < this .pages .length; ++ p)
				{
					var page = this .pages [p];

					for (var w = 0; w < page .length; ++ w)
					{
						if (page [w] .url)
							this .randomBookmarks .push (page [w]);
					}
				}

				shuffle (this .randomBookmarks);
			}

			this .loadURL (this .randomBookmarks .pop () .url);
			return false;
		},
	};

	return Bookmarks;
}) ();
