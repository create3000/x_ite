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
 * This file is part of the Excite X3D Project.
 *
 * Excite X3D is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite X3D is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite X3D.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"excite/Fields",
	"excite/Basic/X3DFieldDefinition",
	"excite/Basic/FieldDefinitionArray",
	"excite/Components/Interpolation/X3DInterpolatorNode",
	"excite/Components/Geospatial/X3DGeospatialObject",
	"excite/Browser/Geospatial/Geocentric",
	"excite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DInterpolatorNode, 
          X3DGeospatialObject,
          Geocentric,
          X3DConstants,
          Vector3)
{
"use strict";

	function GeoPositionInterpolator (executionContext)
	{
		X3DInterpolatorNode .call (this, executionContext);
		X3DGeospatialObject .call (this, executionContext);

		this .addType (X3DConstants .GeoPositionInterpolator);

		this .geocentric = new Geocentric ();
	}

	GeoPositionInterpolator .prototype = $.extend (Object .create (X3DInterpolatorNode .prototype),
		X3DGeospatialObject .prototype,
	{
		constructor: GeoPositionInterpolator,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",        new Fields .MFString ("GD", "WE")),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "set_fraction",     new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "key",              new Fields .MFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "keyValue",         new Fields .MFVec3d ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "value_changed",    new Fields .SFVec3d ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "geovalue_changed", new Fields .SFVec3d ()),
		]),
		keyValue0: new Vector3 (0, 0, 0),
		keyValue1: new Vector3 (0, 0, 0),
		geovalue: new Vector3 (0, 0, 0),
		value: new Vector3 (0, 0, 0),
		getTypeName: function ()
		{
			return "GeoPositionInterpolator";
		},
		getComponentName: function ()
		{
			return "Geospatial";
		},
		getContainerField: function ()
		{
			return "children";
		},
		setup: function ()
		{
			X3DGeospatialObject .prototype .initialize .call (this);

			X3DInterpolatorNode .prototype .setup .call (this);
		},
		initialize: function ()
		{
			X3DInterpolatorNode .prototype .initialize .call (this);

			this .keyValue_ .addInterest ("set_keyValue__", this);
		},
		set_keyValue__: function ()
		{
			var
				key      = this .key_,
				keyValue = this .keyValue_;

			if (keyValue .length < key .length)
				keyValue .resize (key .length, keyValue .length ? keyValue [keyValue .length - 1] : new Fields .SFVec3f ());
		},
		interpolate: function (index0, index1, weight)
		{
			try
			{
				this .getCoord (this .keyValue_ [index0] .getValue (), this .keyValue0);
				this .getCoord (this .keyValue_ [index1] .getValue (), this .keyValue1);
	
				var coord = this .geocentric .slerp (this .keyValue0, this .keyValue1, weight);
	
				this .geovalue_changed_ = this .getGeoCoord (coord, this .geovalue);
				this .value_changed_    = coord;
			}
			catch (error)
			{ }
		},
	});

	return GeoPositionInterpolator;
});


