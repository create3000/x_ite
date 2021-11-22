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
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Grouping/X3DGroupingNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/TraverseType",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Matrix4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGroupingNode,
          X3DConstants,
          TraverseType,
          Vector3,
          Rotation4,
          Matrix4)
{
"use strict";

	var
	   inverseModelViewMatrix = new Matrix4 (),
		yAxis                  = new Vector3 (0, 1, 0),
		zAxis                  = new Vector3 (0, 0, 1),
		viewerYAxis            = new Vector3 (0, 0, 0),
		x                      = new Vector3 (0, 0, 0),
		y                      = new Vector3 (0, 0, 0),
		N1                     = new Vector3 (0, 0, 0),
		N2                     = new Vector3 (0, 0, 0),
		rotation               = new Rotation4 (0, 0, 1, 0);

	function Billboard (executionContext)
	{
		X3DGroupingNode .call (this, executionContext);

		this .addType (X3DConstants .Billboard);

		this .matrix = new Matrix4 ();
	}

	Billboard .prototype = Object .assign (Object .create (X3DGroupingNode .prototype),
	{
		constructor: Billboard,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "axisOfRotation", new Fields .SFVec3f (0, 1, 0)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",        new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",    new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "Billboard";
		},
		getComponentName: function ()
		{
			return "Navigation";
		},
		getContainerField: function ()
		{
			return "children";
		},
		getBBox: function (bbox, shadow)
		{
			return X3DGroupingNode .prototype .getBBox .call (this, bbox, shadow) .multRight (this .matrix);
		},
		getMatrix: function ()
		{
			return this .matrix;
		},
		rotate: function (modelViewMatrix)
		{
			// throws domain error

			inverseModelViewMatrix .assign (modelViewMatrix) .inverse ();

			var billboardToViewer = inverseModelViewMatrix .origin .normalize (); // Normalized to get work with Geo

			if (this .axisOfRotation_ .getValue () .equals (Vector3 .Zero))
			{
				inverseModelViewMatrix .multDirMatrix (viewerYAxis .assign (yAxis)) .normalize (); // Normalized to get work with Geo

				x .assign (viewerYAxis) .cross (billboardToViewer);
				y .assign (billboardToViewer) .cross (x);
				var z = billboardToViewer;

				// Compose rotation

				x .normalize ();
				y .normalize ();

				this .matrix .set (x [0], x [1], x [2], 0,
				                   y [0], y [1], y [2], 0,
				                   z [0], z [1], z [2], 0,
				                   0,     0,     0,     1);
			}
			else
			{
				N1 .assign (this .axisOfRotation_ .getValue ()) .cross (billboardToViewer); // Normal vector of plane as in specification
				N2 .assign (this .axisOfRotation_ .getValue ()) .cross (zAxis);             // Normal vector of plane between axisOfRotation and zAxis

				this .matrix .setRotation (rotation .setFromToVec (N2, N1));                // Rotate zAxis in plane
			}

			return this .matrix;
		},
		traverse: function (type, renderObject)
		{
			var modelViewMatrix = renderObject .getModelViewMatrix ();

			modelViewMatrix .push ();

			try
			{
				switch (type)
				{
					case TraverseType .CAMERA:
					case TraverseType .PICKING:
					case TraverseType .DEPTH:
						// No clone support for shadow, generated cube map texture, and bbox
						modelViewMatrix .multLeft (this .matrix);
						break;
					default:
						modelViewMatrix .multLeft (this .rotate (modelViewMatrix .get ()));
						break;
				}

				X3DGroupingNode .prototype .traverse .call (this, type, renderObject);
			}
			catch (error)
			{
				console .log (error);
			}

			modelViewMatrix .pop ();
		},
	});

	return Billboard;
});
