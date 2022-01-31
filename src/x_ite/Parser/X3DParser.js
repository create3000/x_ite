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


define (function ()
{
"use strict";

	function X3DParser (scene)
	{
		this .scene             = scene;
		this .executionContexts = [ scene ];
		this .prototypes        = [ ];
		this .units             = true;
	}

	X3DParser .prototype = {
		constructor: X3DParser,
		getScene: function ()
		{
			return this .scene;
		},
		getBrowser: function ()
		{
			return this .scene .getBrowser ();
		},
		getExecutionContext: function ()
		{
			return this .executionContexts .at (-1);
		},
		pushExecutionContext: function (executionContext)
		{
			return this .executionContexts .push (executionContext);
		},
		popExecutionContext: function ()
		{
			this .executionContexts .pop ();
		},
		getPrototype: function ()
		{
			return this .prototypes .at (-1);
		},
		pushPrototype: function (prototype)
		{
			return this .prototypes .push (prototype);
		},
		popPrototype: function ()
		{
			this .prototypes .pop ();
		},
		isInsideProtoDefinition: function ()
		{
			return Boolean (this .prototypes .length);
		},
		addRootNode: function (node)
		{
			this .getExecutionContext () .rootNodes .push (node);
		},
		getProviderUrls: (function ()
		{
			const componentsUrl = /\.js$/;

			return function ()
			{
				const
					scene             = this .getScene (),
					profile           = scene .getProfile () ? scene .getProfile () : scene .getBrowser () .getProfile ("Full"),
					profileComponents = profile .components,
					components        = scene .getComponents (),
					providerUrls      = new Set ();

				for (const component of profileComponents)
				{
					const providerUrl = component .providerUrl;

					if (providerUrl .match (componentsUrl))
						providerUrls .add (providerUrl);
				}

				for (const component of components)
				{
					const providerUrl = component .providerUrl;
				if (providerUrl .match (componentsUrl))
						providerUrls .add (providerUrl);
				}

				if (typeof globalRequire === "function")
				{
					if (typeof globalProcess === "object" && globalProcess .platform === "win32")
					{
						for (const url of providerUrls)
							globalRequire (url);
					}
					else
					{
						for (const url of providerUrls)
							globalRequire (new URL (url) .pathname);
					}
				}

				return Array .from (providerUrls);
			};
		})(),
		setUnits: function (generator)
		{
			if (typeof arguments [0] == "boolean")
			{
				this .units = arguments [0];
				return;
			}

			const
				version = /Titania\s+V(\d+).*/,
				match   = generator .match (version);

			if (match)
			{
				const major = parseInt (match [1]);

				// Before version 4 units are wrongly implemented.
				if (major < 4)
				{
					this .units = false;
					return;
				}
			}

			this .units = true;
		},
		getUnits: function ()
		{
			return this .units;
		},
		fromUnit: function (category, value)
		{
			if (this .units)
				return this .getExecutionContext () .fromUnit (category, value);

			return value;
		},
	};

	return X3DParser;
});
