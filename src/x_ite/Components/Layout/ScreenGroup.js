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
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Grouping/X3DGroupingNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/TraverseType",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Geometry/ViewVolume",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGroupingNode, 
          X3DConstants,
          TraverseType,
          Vector3,
          Rotation4,
          Matrix4,
          ViewVolume)
{
"use strict";

	var
		translation = new Vector3 (0, 0, 0),
		rotation    = new Rotation4 (0, 0, 1, 0),
		scale       = new Vector3 (1, 1, 1),
		screenPoint = new Vector3 (0, 0, 0);

	function ScreenGroup (executionContext)
	{
		X3DGroupingNode .call (this, executionContext);

		this .addType (X3DConstants .ScreenGroup);

		this .screenMatrix    = new Matrix4 ();
		this .modelViewMatrix = new Matrix4 ();
	}

	ScreenGroup .prototype = $.extend (Object .create (X3DGroupingNode .prototype),
	{
		constructor: ScreenGroup,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "ScreenGroup";
		},
		getComponentName: function ()
		{
			return "Layout";
		},
		getContainerField: function ()
		{
			return "children";
		},
		getBBox: function (bbox)
		{
			return X3DGroupingNode .prototype .getBBox .call (this, bbox) .multRight (this .getMatrix ());
		},
		getMatrix: function ()
		{
			try
			{
				this .matrix .assign (this .modelViewMatrix) .inverse () .multLeft (this .screenMatrix);
			}
			catch (error)
			{ }

			return this .matrix;
		},
		scale: function (renderObject)
		{
			// throws domain error
			
			this .modelViewMatrix .assign (renderObject .getModelViewMatrix () .get ());
			this .modelViewMatrix .get (translation, rotation, scale);

			var
				projectionMatrix = renderObject .getProjectionMatrix () .get (),
				viewport         = renderObject .getViewVolume () .getViewport (),
				screenScale      = renderObject .getViewpoint () .getScreenScale (translation, viewport),
				screenMatrix     = this .screenMatrix;
		
			screenMatrix .set (translation, rotation, scale .set (screenScale .x * (scale .x < 0 ? -1 : 1),
		                                                         screenScale .y * (scale .y < 0 ? -1 : 1),
		                                                         screenScale .z * (scale .z < 0 ? -1 : 1)));

			// Snap to whole pixel

			ViewVolume .projectPoint (Vector3 .Zero, screenMatrix, projectionMatrix, viewport, screenPoint);

			screenPoint .x = Math .round (screenPoint .x);
			screenPoint .y = Math .round (screenPoint .y);

			ViewVolume .unProjectPoint (screenPoint .x, screenPoint .y, screenPoint .z, screenMatrix, projectionMatrix, viewport, screenPoint);

			screenPoint .z = 0;
			screenMatrix .translate (screenPoint);

			// Return modelViewMatrix

			return screenMatrix;
		},
		traverse: function (type, renderObject)
		{
			try
			{
				var modelViewMatrix = renderObject .getModelViewMatrix ();

				switch (type)
				{
					case TraverseType .CAMERA:
					case TraverseType .DEPTH: // ???
						// No clone support for shadow, generated cube map texture and bbox
						modelViewMatrix .pushMatrix (this .screenMatrix);
						break;
					default:
						modelViewMatrix .pushMatrix (this .scale (renderObject));
						break;
				}

				X3DGroupingNode .prototype .traverse .call (this, type, renderObject);
	
				modelViewMatrix .pop ();
			}
			catch (error)
			{ }
		},
	});

	return ScreenGroup;
});


