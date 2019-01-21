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
			return this .executionContexts [this .executionContexts .length - 1];
		},
		pushExecutionContext: function (executionContext)
		{
			return this .executionContexts .push (executionContext);
		},
		popExecutionContext: function ()
		{
			this .executionContexts .pop ();
		},
		isInsideProtoDefinition: function ()
		{
			return this .executionContexts .length > 1;
		},
		getProviderUrls: (function ()
		{
			var componentsUrl = /\/components\/.*?\.js$/;

			return function ()
			{
				var
					profileComponents = this .getScene () .getProfile () .components,
					components        = this .getScene () .getComponents (),
					providerUrls      = [ ];
	
				for (var i = 0, length = profileComponents .length; i < length; ++ i)
				{
					var providerUrl = profileComponents [i] .providerUrl;
	
					if (providerUrl .match (componentsUrl))
						providerUrls .push (providerUrl);
				}
	
				for (var i = 0, length = components .length; i < length; ++ i)
				{
					var providerUrl = components [i] .providerUrl;
	
					if (providerUrl .match (componentsUrl))
						providerUrls .push (providerUrl);
				}
	
				function unique (value, index, self)
				{ 
					return self .indexOf (value) === index;
				}
	
				return providerUrls .filter (unique);
			};
		})(),
		addRootNode: function (node)
		{
			this .getExecutionContext () .rootNodes .push (node);
		},
		setUnits: function (generator)
		{
			if ((typeof arguments [0]) == "boolean")
			{
				this .units = arguments [0];
				return;
			}

			var
				version = /Titania\s+V(\d+).*/,
				match   = generator .match (version);

			if (match)
			{
				var major = parseInt (match [1]);

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
