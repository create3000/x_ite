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
 * This file is part of the Excite Project.
 *
 * Excite is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"excite/Error",
	"excite/Basic/X3DFieldDefinition",
	"excite/Basic/FieldDefinitionArray",
	"excite/Basic/X3DField",
	"excite/Basic/X3DArrayField",
	"excite/Fields",
	"excite/Browser/X3DBrowser",
	"excite/Configuration/ComponentInfo",
	"excite/Configuration/ComponentInfoArray",
	"excite/Configuration/ProfileInfo",
	"excite/Configuration/ProfileInfoArray",
	"excite/Configuration/UnitInfo",
	"excite/Configuration/UnitInfoArray",
	"excite/Execution/X3DExecutionContext",
	"excite/Execution/X3DScene",
	"excite/Prototype/ExternProtoDeclarationArray",
	"excite/Prototype/ProtoDeclarationArray",
	"excite/Prototype/X3DExternProtoDeclaration",
	"excite/Prototype/X3DProtoDeclaration",
	"excite/Routing/RouteArray",
	"excite/Routing/X3DRoute",
	"excite/Bits/X3DConstants",
],
function ($,
          Error,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DField,
          X3DArrayField,
          Fields,
          X3DBrowser,
          ComponentInfo,
          ComponentInfoArray,
          ProfileInfo,
          ProfileInfoArray,
          UnitInfo,
          UnitInfoArray,
          X3DExecutionContext,
          X3DScene,
          ExternProtoDeclarationArray,
          ProtoDeclarationArray,
          X3DExternProtoDeclaration,
          X3DProtoDeclaration,
          RouteArray,
          X3DRoute,
          X3DConstants)
{
"use strict";

	// Console fallback

	if (! console)        console        = { };
	if (! console .log)   console .log   = function () { };
	if (! console .info)  console .info  = console .log;
	if (! console .warn)  console .warn  = console .log;
	if (! console .error) console .error = console .log;

	// DEBUG
	//	function print ()
	//	{
	//		var string = "";
	//
	//		for (var i = 0; i < arguments .length; ++ i)
	//			string += arguments [i];
	//
	//		$(".excite-console") .append (string);
	//	}
	//
	//	console .log   = print;
	//	console .info  = print;
	//	console .warn  = print;
	//	console .error = print;

	// X3D

	function createBrowser (url, parameter)
	{
		var element = $("<X3DCanvas></X3DCanvas>");

		if (url instanceof Fields .MFString)
			 element .attr ("url", url .toString ())

		createBrowserFromElement (element);

		return element [0];
	}

	function getBrowser (dom)
	{
		return $(dom) .data ("browser");
	}

	function createBrowserFromElement (dom)
	{
		dom = $(dom);

		var browser = new X3DBrowser (dom);

		dom .data ("browser", browser);

		browser .setup ();

		return browser;
	}

	var
	   initialized = false,
		callbacks   = $.Deferred (),
		fallbacks   = $.Deferred ();

	function X3D (callback, fallback)
	{
		if (typeof callback === "function")
			callbacks .done (callback);

		if (typeof fallback === "function")
			fallbacks .done (fallback);

		if (initialized)
			return;

		initialized = true;

		$(function ()
		{
			var elements = $("X3DCanvas");

			try
			{
				var browsers = $.map (elements, createBrowserFromElement);

				numBrowsers = browsers .length;

				if (elements .length)
				{
					for (var i = 0; i < numBrowsers; ++ i)
					{
						var browser = browsers [i];

						browser .initialized () .addFieldCallback ("initialized" + browser .getId (), set_initialized .bind (null, browser));
					}
				}
				else
					set_initialized (null);
			}
			catch (error)
			{
				Error .fallback (elements);
				fallbacks .resolve (error);
			}
		});
	}

	var numBrowsers = 0;

	function set_initialized (browser)
	{
		if (browser)
			browser .initialized () .removeFieldCallback ("initialized" + browser .getId ());

		if (-- numBrowsers > 0)
			return;

		callbacks .resolve ();
	}

	$.extend (X3D,
		Fields,
	{
		require:                     require,
		define:                      define,
		getBrowser:                  getBrowser,
		createBrowser:               createBrowser,
		X3DConstants:                X3DConstants,
		X3DFieldDefinition:          X3DFieldDefinition,
		FieldDefinitionArray:        FieldDefinitionArray,
		X3DField:                    X3DField,
		X3DArrayField:               X3DArrayField,
		X3DExecutionContext:         X3DExecutionContext,
		X3DScene:                    X3DScene,
		ComponentInfo:               ComponentInfo,
		ComponentInfoArray:          ComponentInfoArray,
		ProfileInfo:                 ProfileInfo,
		ProfileInfoArray:            ProfileInfoArray,
		UnitInfo:                    UnitInfo,
		UnitInfoArray:               UnitInfoArray,
		ExternProtoDeclarationArray: ExternProtoDeclarationArray,
		ProtoDeclarationArray:       ProtoDeclarationArray,
		X3DExterProtonDeclaration:   X3DExternProtoDeclaration,
		X3DProtoDeclaration:         X3DProtoDeclaration,
		RouteArray:                  RouteArray,
		X3DRoute:                    X3DRoute,
	});

	return X3D;
});
