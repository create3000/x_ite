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
	"cobweb/Fields",
	"cobweb/Basic/X3DFieldDefinition",
	"cobweb/Basic/FieldDefinitionArray",
	"cobweb/Components/Layering/X3DViewportNode",
	"cobweb/Bits/X3DConstants",
	"cobweb/Bits/TraverseType",
	"standard/Utility/ObjectCache",
	"standard/Math/Geometry/ViewVolume",
	"standard/Math/Numbers/Vector4",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DViewportNode, 
          X3DConstants,
          TraverseType,
          ObjectCache,
          ViewVolume,
          Vector4)
{
"use strict";

	var ViewVolumes = ObjectCache (ViewVolume);

	function Viewport (executionContext)
	{
		X3DViewportNode .call (this, executionContext);

		this .addType (X3DConstants .Viewport);

		this .rectangle = new Vector4 (0, 0, 0, 0);
	}

	Viewport .prototype = $.extend (Object .create (X3DViewportNode .prototype),
	{
		constructor: Viewport,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "clipBoundary",   new Fields .MFFloat (0, 1, 0, 1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "Viewport";
		},
		getComponentName: function ()
		{
			return "Layering";
		},
		getContainerField: function ()
		{
			return "viewport";
		},
		getRectangle: function (browser)
		{
			var viewport = browser .getViewport ();

			var
				left   = Math .floor (viewport [2] * this .getLeft ()),
				right  = Math .floor (viewport [2] * this .getRight ()),
				bottom = Math .floor (viewport [3] * this .getBottom ()),
				top    = Math .floor (viewport [3] * this .getTop ());

			this .rectangle .set (left,
			                      bottom,
			                      Math .max (0, right - left),
			                      Math .max (0, top - bottom));

			return this .rectangle;
		},
		getLeft: function ()
		{
			return this .clipBoundary_ .length > 0 ? this .clipBoundary_ [0] : 0;
		},
		getRight: function ()
		{
			return this .clipBoundary_ .length > 1 ? this .clipBoundary_ [1] : 1;
		},
		getBottom: function ()
		{
			return this .clipBoundary_ .length > 2 ? this .clipBoundary_ [2] : 0;
		},
		getTop: function ()
		{
			return this .clipBoundary_ .length > 3 ? this .clipBoundary_ [3] : 1;
		},
		traverse: function (type, renderObject)
		{
			this .push (renderObject);

			switch (type)
			{
				case TraverseType .POINTER:
				{
					if (renderObject .getBrowser () .isPointerInRectangle (this .rectangle))
						X3DViewportNode .prototype .traverse .call (this, type, renderObject);

					break;
				}
				default:
					X3DViewportNode .prototype .traverse .call (this, type, renderObject);
					break;
			}

			this .pop (renderObject);
		},
		push: function (renderObject)
		{
			var
				viewVolumes = renderObject .getViewVolumes (),
				rectangle   = this .getRectangle (renderObject .getBrowser ()),
				viewport    = viewVolumes .length ? viewVolumes [viewVolumes .length - 1] .getViewport () : rectangle,
				viewVolume  = ViewVolumes .pop ();

			viewVolume .set (renderObject .getProjectionMatrix () .get (), viewport, rectangle);

			viewVolumes .push (viewVolume);
		},
		pop: function (renderObject)
		{
			ViewVolumes .push (renderObject .getViewVolumes () .pop ());
		},
	});

	return Viewport;
});


