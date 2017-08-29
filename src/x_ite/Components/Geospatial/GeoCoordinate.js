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
	"x_ite/Components/Rendering/X3DCoordinateNode",
	"x_ite/Components/Geospatial/X3DGeospatialObject",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Geometry/Triangle3",
	"standard/Math/Numbers/Vector3",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DCoordinateNode, 
          X3DGeospatialObject, 
          X3DConstants,
          Triangle3,
          Vector3)
{
"use strict";

	function GeoCoordinate (executionContext)
	{
		X3DCoordinateNode   .call (this, executionContext);
		X3DGeospatialObject .call (this, executionContext);

		this .addType (X3DConstants .GeoCoordinate);

		this .points = [ ];                   // Transformed points in GC.
		this .origin = new Vector3 (0, 0, 0); // Origin of the reference frame.
	}

	GeoCoordinate .prototype = $.extend (Object .create (X3DCoordinateNode .prototype),
		X3DGeospatialObject .prototype,
	{
		constructor: GeoCoordinate,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",  new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem", new Fields .MFString ("GD", "WE")),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "point",     new Fields .MFVec3d ()),
		]),
		getTypeName: function ()
		{
			return "GeoCoordinate";
		},
		getComponentName: function ()
		{
			return "Geospatial";
		},
		getContainerField: function ()
		{
			return "coord";
		},
		initialize: function ()
		{
			X3DCoordinateNode   .prototype .initialize .call (this);
			X3DGeospatialObject .prototype .initialize .call (this);
		
			this .addInterest ("eventsProcessed", this);
		
			this .eventsProcessed ();
		},
		eventsProcessed: function ()
		{
			var
				point  = this .point_ .getValue (),
				points = this .points;

			for (var i = 0, length = Math .min (point .length, points .length); i < length; ++ i)
				this .getCoord (point [i] .getValue (), points [i]);

			for (var length = point .length; i < length; ++ i)
			{
				var p = points [i] = new Vector3 (0, 0, 0);
				this .getCoord (point [i] .getValue (), p);
			}
		
			points .length = length;

			this .getCoord (Vector3 .Zero, this .origin);
		},
		isEmpty: function ()
		{
			return this .point_ .length == 0;
		},
		getSize: function ()
		{
			return this .point_ .length;
		},
		get1Point: function (index)
		{
			// The index cannot be less than 0.

			if (index < this .points .length)
				return this .points [index];

			return this .origin;
		},
		getNormal: function (index1, index2, index3)
		{
			// The index[1,2,3] cannot be less than 0.

			var
				points = this .points,
				length = points .length;

			if (index1 < length && index2 < length && index3 < length)
				return Triangle3 .normal (points [index1],
				                          points [index2],
				                          points [index3],
				                          new Vector3 (0, 0, 0));

			return new Vector3 (0, 0, 0);
		},
		getQuadNormal: function (index1, index2, index3, index4)
		{
			// The index[1,2,3,4] cannot be less than 0.

			var
				points = this .points,
				length = points .length;

			if (index1 < length && index2 < length && index3 < length && index4 < length)
				return Triangle3 .quadNormal (points [index1],
				                              points [index2],
				                              points [index3],
				                              points [index4],
				                              new Vector3 (0, 0, 0));

			return new Vector3 (0, 0, 0);
		},
	});

	return GeoCoordinate;
});


