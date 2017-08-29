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
	"standard/Geospatial/ReferenceEllipsoids",
	"standard/Geospatial/Geodetic",
	"standard/Geospatial/UniversalTransverseMercator",
	"x_ite/Browser/Geospatial/Geocentric",
],
function (ReferenceEllipsoids,
          Geodetic,
          UniversalTransverseMercator,
          Geocentric)
{
"use strict";

	var
		i   = 0,
		GD  = i ++,
		UTM = i ++,
		GC  = i ++;

	var CoordinateSystems = {
		GD:  GD,
		GDC: GD,
		UTM: UTM,
		GC:  GC,
		GCC: GC,
		GS:  GC,
	};
	
	var Zone = /^Z(\d+)$/;

	var Geospatial =
	{
		GD: GD,
		UTM: UTM,
		GC: GC,
		getReferenceFrame: function (geoSystem, radians)
		{
			switch (this .getCoordinateSystem (geoSystem))
			{
				case GD:
				{
					return new Geodetic (this .getEllipsoid (geoSystem),
					                     this .getLatitudeFirst (geoSystem),
					                     radians);
				}
				case UTM:
				{
					return new UniversalTransverseMercator (this .getEllipsoid (geoSystem),
					                                        this .getZone (geoSystem),
					                                        this .getNorthernHemisphere (geoSystem),
					                                        this .getNorthingFirst (geoSystem));
				}
				case GC:
				{
					return new Geocentric ();
				}
			}

			return new Geodetic (ReferenceEllipsoids .WE, true, radians);
		},
		getElevationFrame: function (geoSystem, radians)
		{
			return new Geodetic (this .getEllipsoid (geoSystem), true, radians);
		},
		getCoordinateSystem: function (geoSystem)
		{
			for (var i = 0, length = geoSystem .length; i < length; ++ i)
			{
				var coordinateSystem = CoordinateSystems [geoSystem [i]];

				if (coordinateSystem !== undefined)
					return coordinateSystem;
			}
		
			return GD;
		},
		getEllipsoid: function (geoSystem)
		{
			for (var i = 0, length = geoSystem .length; i < length; ++ i)
			{
				var ellipsoid = ReferenceEllipsoids [geoSystem [i]];

				if (ellipsoid !== undefined)
					return ellipsoid;
			}
		
			return ReferenceEllipsoids .WE;
		},
		getEllipsoidString: function (geoSystem)
		{
			for (var i = 0, length = geoSystem .length; i < length; ++ i)
			{
				var ellipsoid = ReferenceEllipsoids [geoSystem [i]];

				if (ellipsoid !== undefined)
					return geoSystem [i];
			}

			return "WE";
		},
		isStandardOrder: function (geoSystem)
		{
			switch (this .getCoordinateSystem (geoSystem))
			{
				case GD:
				{
					return this .getLatitudeFirst (geoSystem);
				}
				case UTM:
				{
					return this .getNorthingFirst (geoSystem);
				}
				case GC:
				{
					return true;
				}
			}
		
			return this .getLatitudeFirst (geoSystem);
		},
		getLatitudeFirst: function (geoSystem)
		{
			for (var i = 0, length = geoSystem .length; i < length; ++ i)
			{
				if (geoSystem [i] === "longitude_first")
					return false;
			}

			return true;
		},
		getNorthingFirst: function (geoSystem)
		{
			for (var i = 0, length = geoSystem .length; i < length; ++ i)
			{
				if (geoSystem [i] === "easting_first")
					return false;
			}
		
			return true;
		},
		getZone: function (geoSystem)
		{
			for (var i = 0, length = geoSystem .length; i < length; ++ i)
			{
				var match = geoSystem [i] .match (Zone);

				if (match)
					return parseInt (match [1]);
			}
		
			return 1;
		},
		getNorthernHemisphere: function (geoSystem)
		{
			for (var i = 0, length = geoSystem .length; i < length; ++ i)
			{
				if (geoSystem [i] === "S")
					return false;
			}

			return true;
		},
	};
	
	return Geospatial;
});
