(function () {

	var
		define  = X3D .define,
		require = X3D .require,
		module  = { };
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


define ('standard/Math/Geometry/Spheroid3',[],function ()
{
"use strict";

	function Spheroid3 (semiMajorAxis, semiMinorAxis)
	{
		switch (arguments .length)
		{
			case 0:
				this .semiMajorAxis = 0; // a
				this .semiMinorAxis = 0; // c
				break;
			case 2:
				this .semiMajorAxis = semiMajorAxis; // a
				this .semiMinorAxis = semiMinorAxis; // c
				break;
			case 3:
				var f_1 = arguments [1];
				this .semiMajorAxis = semiMajorAxis;                 // a
				this .semiMinorAxis = semiMajorAxis * (1 - 1 / f_1); // c
				break;
		}
	}

	Spheroid3 .prototype =
	{
		constructor: Spheroid3,
		getSemiMajorAxis: function ()
		{
			// Returns the semi-major axis (a)
			return this .semiMajorAxis; // a
		},
		getSemiMinorAxis: function ()
		{
			// Returns the semi-minor axis (c)
			return this .semiMinorAxis; // c
		},
		toString: function ()
		{
			return this .semiMajorAxis + " " + this .semiMinorAxis;
		},
	};

	return Spheroid3;
});

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


define ('standard/Geospatial/ReferenceEllipsoids',[
	"standard/Math/Geometry/Spheroid3",
],
function (Spheroid3)
{
"use strict";

	var ReferenceEllipsoids =
	{
		// Earth
		// X3D Specification
		AA: new Spheroid3 (6377563.396, 299.3249646,   true), // Airy 1830
		AM: new Spheroid3 (6377340.189, 299.3249646,   true), // Modified Airy
		AN: new Spheroid3 (6378160,     298.25,        true), // Australian National
		BN: new Spheroid3 (6377483.865, 299.1528128,   true), // Bessel 1841 (Namibia)
		BR: new Spheroid3 (6377397.155, 299.1528128,   true), // Bessel 1841 (Ethiopia Indonesia...)
		CC: new Spheroid3 (6378206.4,   294.9786982,   true), // Clarke 1866
		CD: new Spheroid3 (6378249.145, 293.465,       true), // Clarke 1880
		EA: new Spheroid3 (6377276.345, 300.8017,      true), // Everest (India 1830)
		EB: new Spheroid3 (6377298.556, 300.8017,      true), // Everest (Sabah & Sarawak)
		EC: new Spheroid3 (6377301.243, 300.8017,      true), // Everest (India 1956)
		ED: new Spheroid3 (6377295.664, 300.8017,      true), // Everest (W. Malaysia 1969)
		EE: new Spheroid3 (6377304.063, 300.8017,      true), // Everest (W. Malaysia & Singapore 1948)
		EF: new Spheroid3 (6377309.613, 300.8017,      true), // Everest (Pakistan)
		FA: new Spheroid3 (6378155,     298.3,         true), // Modified Fischer 1960
		HE: new Spheroid3 (6378200,     298.3,         true), // Helmert 1906
		HO: new Spheroid3 (6378270,     297,           true), // Hough 1960
		ID: new Spheroid3 (6378160,     298.247,       true), // Indonesian 1974
		IN: new Spheroid3 (6378388,     297,           true), // International 1924
		KA: new Spheroid3 (6378245,     298.3,         true), // Krassovsky 1940
		RF: new Spheroid3 (6378137,     298.257222101, true), // Geodetic Reference System 1980 (GRS 80)
		SA: new Spheroid3 (6378160,     298.25,        true), // South American 1969
		WD: new Spheroid3 (6378135,     298.26,        true), // WGS 72
		WE: new Spheroid3 (6378137,     298.257223563, true), // WGS 84
		// Solar System
		// http://en.wikipedia.de
		// Can someone give me more accurate parameters.
		SUN:     new Spheroid3 (696342000, 1 / 9e-6, true),
		MERCURY: new Spheroid3 (2439700,  2439700),
		VENUS:   new Spheroid3 (6051800,  6051800),
		MOON:    new Spheroid3 (1738140,  1735970),
		MARS:    new Spheroid3 (3395428,  3377678), // http://adsabs.harvard.edu/abs/2010EM%26P..106....1A
		JUPITER: new Spheroid3 (71492000, 66854000),
		SATURN:  new Spheroid3 (60268000, 54364000),
		URANUS:  new Spheroid3 (2555000,  24973000),
		NEPTUNE: new Spheroid3 (24764000, 24341000),
		PLUTO:   new Spheroid3 (1153000,  1153000),
	};

	return ReferenceEllipsoids;
});

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


define ('standard/Geospatial/Geodetic',[
	"standard/Math/Numbers/Vector3",
	"standard/Math/Algorithm",
],
function (Vector3,
          Algorithm)
{
"use strict";

	var
		EPS_H = 1e-3,
		EPS_P = 1e-10,
		IMAX  = 30;
		
	function Geodetic (spheroid, latitudeFirst, radians)
	{
		this .longitudeFirst = ! latitudeFirst;
      this .degrees        = ! radians;
      this .a              = spheroid .getSemiMajorAxis ();
      this .c              = spheroid .getSemiMinorAxis ();
      this .c2a2           = Math .pow (spheroid .getSemiMinorAxis () / this .a, 2);
      this .ecc2           = 1 - this .c2a2;
	}

	Geodetic .prototype =
	{
		constructor: Geodetic,
		convert: function (geodetic, result)
		{
			var elevation = geodetic .z;

			if (this .longitudeFirst)
			{
				var
					latitude  = geodetic .y,
					longitude = geodetic .x;
			}
			else
			{
				var
					latitude  = geodetic .x,
					longitude = geodetic .y;
			}
		
			if (this .degrees)
			{
				latitude  *= Math .PI / 180;
				longitude *= Math .PI / 180;
			}
		
			return this .convertRadians (latitude, longitude, elevation, result);
		},
		convertRadians: function (latitude, longitude, elevation, result)
		{
			var
				slat  = Math .sin (latitude),
				slat2 = Math .pow (slat, 2),
				clat  = Math .cos (latitude),
				N     = this .a / Math .sqrt (1 - this .ecc2 * slat2),
				Nhl   = (N + elevation) * clat;

			return result .set (Nhl * Math .cos (longitude),
			                    Nhl * Math .sin (longitude),
			                    (N * this .c2a2 + elevation) * slat);
		},
		apply: function (geocentric, result)
		{
			this .applyRadians (geocentric, result);

			if (this .degrees)
			{
				result .x *= 180 / Math .PI; // latitude
				result .y *= 180 / Math .PI; // longitude
			}

			if (this .longitudeFirst)
			{
				var tmp = result .x;

				result .x = result .y; // latitude
				result .y = tmp;       // longitude
			}

			return result;
		},
		applyRadians: function (geocentric, result)
		{
			var
				x = geocentric .x,
				y = geocentric .y,
				z = geocentric .z;
		
			var P = Math .sqrt (x * x + y * y);
		
			// Handle pole case.
			if (P == 0)
				return result .set (Math .PI, 0, z - this .c);

			var
				latitude  = 0,
				longitude = Math .atan2 (y, x),
				elevation = 0;
		
			var
				a    = this .a,
				N    = a,
				ecc2 = this .ecc2;
		
			for (var i = 0; i < IMAX; ++ i)
			{
				var
					h0 = elevation,
					b0 = latitude;
		
				latitude = Math .atan (z / P / (1 - ecc2 * N / (N + elevation)));
		
				var sin_p = Math .sin (latitude);
		
				N         = a / Math .sqrt (1 - ecc2 * sin_p * sin_p);
				elevation = P / Math .cos (latitude) - N;
		
				if (Math .abs (elevation - h0) < EPS_H && Math .abs (latitude - b0) < EPS_P)
					break;
			}

			return result .set (latitude, longitude, elevation);
		},
		normal: function (geocentric, result)
		{
			var geodetic = this .applyRadians (geocentric, result);

			var
				latitude  = geodetic .x,
				longitude = geodetic .y;

			var clat = Math .cos (latitude);

			var
				nx = Math .cos (longitude) * clat,
				ny = Math .sin (longitude) * clat,
				nz = Math .sin (latitude);

			return result .set (nx, ny, nz);
		},
		/*
		lerp: function (s, d, t)
		{
			var
				source     =  this .source      .assign (s),
				destination = this .destination .assign (d);

			var
				RANGE    = this .degrees ? 180 : M_PI,
				RANGE1_2 = RANGE / 2,
				RANGE2   = RANGE * 2;
		
			var range = 0;
		
			if (this .longitudeFirst)
			{
				source .x = Algorithm .interval (source .x, -RANGE,    RANGE);	
				source .y = Algorithm .interval (source .y, -RANGE1_2, RANGE1_2);
		
				destination .x = Algorithm .interval (destination .x, -RANGE,    RANGE);	
				destination .y = Algorithm .interval (destination .y, -RANGE1_2, RANGE1_2);
		
				range = Math .abs (destination .x - source .x);
			}
			else
			{
				source .x = Algorithm .interval (source .x, -RANGE1_2, RANGE1_2);
				source .y = Algorithm .interval (source .y, -RANGE,    RANGE);
		
				destination .x = Algorithm .interval (destination .x, -RANGE1_2, RANGE1_2);
				destination .y = Algorithm .interval (destination .y, -RANGE,    RANGE);
		
				range = Math .abs (destination .y - source .y);
			}
		
			if (range <= RANGE)
				return source .lerp (destination, t);
		
			var step = (RANGE2 - range) * t;
		
			if (this .longitudeFirst)
			{
				var longitude = source .x < destination .x ? source .x - step : source .x + step;
		
				if (longitude < -RANGE)
					longitude += RANGE2;
		
				else if (longitude > RANGE)
					longitude -= RANGE2;
		
				return source .set (longitude,
				                    source .y + t * (destination .y - source .y),
				                    source .z + t * (destination .z - source .z));
			}

			var longitude = source .y < destination .y ? source .y - step : source .y + step;
	
			if (longitude < -RANGE)
				longitude += RANGE2;
	
			else if (longitude > RANGE)
				longitude -= RANGE2;
	
			return source .set (source .x + t * (destination .x - source .x),
			                    longitude,
			                    source .z + t * (destination .z - source .z));
		},
		source: new Vector3 (0, 0, 0),
		destination: new Vector3 (0, 0, 0),
		*/
	};

	return Geodetic;
});

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


define ('standard/Geospatial/UniversalTransverseMercator',[
	"standard/Geospatial/Geodetic",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Algorithm",
],
function (Geodetic,
          Vector3,
          Algorithm)
{
"use strict";

	var
		N0 = 1.0e7,
		E0 = 5.0e5,
		k0 = 0.9996;

	function UniversalTransverseMercator (spheroid, zone, northernHemisphere, northingFirst)
	{
		var
			a    = spheroid .getSemiMajorAxis (),
			ecc2 = 1 - Math .pow (spheroid .getSemiMinorAxis () / a, 2),
			EE   = ecc2 / (1 - ecc2),
			e1   = (1 - Math .sqrt (1 - ecc2)) / (1 + Math .sqrt (1 - ecc2));

		this .southernHemisphere = ! northernHemisphere;
		this .eastingFirst       = ! northingFirst;
		this .a                  = a;
		this .ecc2               = ecc2;
		this .EE                 = EE;
		this .E8                 = 8 * EE;
		this .E9                 = 9 * EE;
		this .E252               = 252 * EE;
		this .e1                 = e1;
		this .A                  = k0 * (a * (1 - ecc2 / 4 - 3 * ecc2 * ecc2 / 64 - 5 * ecc2 * ecc2 * ecc2 / 256));
		this .B                  = 3 * e1 / 2 - 7 * e1 * e1 * e1 / 32;
		this .C                  = 21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32;
		this .D                  = 151 * e1 * e1 * e1 / 96;
		this .E                  = a * (1 - ecc2);
		this .W                  = 1 - ecc2 / 4 - 3 * ecc2 * ecc2 / 64 - 5 * ecc2 * ecc2 * ecc2 / 256;
		this .X                  = 3 * ecc2 / 8 + 3 * ecc2 * ecc2 / 32 + 45 * ecc2 * ecc2 * ecc2 / 1024;
		this .Y                  = 15 * ecc2 * ecc2 / 256 + 45 * ecc2 * ecc2 * ecc2 / 1024;
		this .Z                  = 35 * ecc2 * ecc2 * ecc2 / 3072;
		this .longitude0         = Algorithm .radians (zone * 6 - 183);
		this .geodeticConverter  = new Geodetic (spheroid, true, true);
	}

	UniversalTransverseMercator .prototype =
	{
		constructor: UniversalTransverseMercator,
		convert: function (utm, result)
		{
			// https://gist.github.com/duedal/840476
		
			if (this .eastingFirst)
			{
				var
					northing = utm .y,
					easting  = utm .x;
			}
			else
			{
				var
					northing = utm .x,
					easting  = utm .y;
			}
		
			// Check for southern hemisphere and remove offset from easting.
		
			var S = this .southernHemisphere;
		
			if (northing < 0)
			{
				S        = ! this .southernHemisphere;
				northing = -northing;
			}
		
			if (S)
				northing -= N0;
		
			easting -= E0;
		
			// Begin calculation.
		
			var
				mu   = northing / this .A,
				phi1 = mu + this .B * Math .sin (2 * mu) + this .C * Math .sin (4 * mu) + this .D * Math .sin (6 * mu);
		
			var
				sinphi1 = Math .pow (Math .sin (phi1), 2),
				cosphi1 = Math .cos (phi1),
				tanphi1 = Math .tan (phi1);
		
			var
				N1 = this .a / Math .sqrt (1 - this .ecc2 * sinphi1),
				T2 = Math .pow (tanphi1, 2),
				T8 = Math .pow (tanphi1, 8),
				C1 = this .EE * T2,
				C2 = C1 * C1,
				R1 = this .E / Math .pow (1 - this .ecc2 * sinphi1, 1.5),
				I  = easting / (N1 * k0);
		
			var
				J = (5 + 3 * T2 + 10 * C1 - 4 * C2 - this .E9) * Math .pow (I, 4) / 24,
				K = (61 + 90 * T2 + 298 * C1 + 45 * T8 - this .E252 - 3 * C2) * Math .pow (I, 6) / 720,
				L = (5 - 2 * C1 + 28 * T2 - 3 * C2 + this .E8 + 24 * T8) * Math .pow (I, 5) / 120;
		
			var
				latitude  = phi1 - (N1 * tanphi1 / R1) * (I * I / 2 - J + K),
				longitude = this .longitude0 + (I - (1 + 2 * T2 + C1) * Math .pow (I, 3) / 6 + L) / cosphi1;
		
			return this .geodeticConverter .convertRadians (latitude, longitude, utm .z, result);
		},
		apply: function (geocentric, result)
		{
			// https://gist.github.com/duedal/840476

			var
				geodetic  = this .geodeticConverter .applyRadians (geocentric, result),
				latitude  = geodetic .x,
				longitude = geodetic .y;
		
			var
				tanlat = Math .tan (latitude),
				coslat = Math .cos (latitude);
		
			var
				EE = this .EE,
				N  = this .a / Math .sqrt (1 - this .ecc2 * Math .pow (Math .sin (latitude), 2)),
				T  = tanlat * tanlat,
				T6 = T * T * T,
				C  = EE * coslat * coslat,
				A  = coslat * (longitude - this .longitude0);
		
			var M = this .a * (this .W * latitude
			                   - this .X * Math .sin (2 * latitude)
			                   + this .Y * Math .sin (4 * latitude)
			                   - this .Z * Math .sin (6 * latitude));
		
			var easting = k0 * N * (A + (1 - T + C) * Math .pow (A, 3) / 6
			                        + (5 - 18 * T6 + 72 * C - 58 * EE) * Math .pow (A, 5) / 120)
			              + E0;
		
			var northing = k0 * (M + N * tanlat * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * Math .pow (A, 4) / 24
			                                       + (61 - 58 * T6 + 600 * C - 330 * EE) * Math .pow (A, 6) / 720));
		
			if (latitude < 0)
			{
				northing += N0;
				
				if (! this .southernHemisphere)
					northing = -northing;
			}
			else
			{
				if (this .southernHemisphere)
					northing = -northing;		
			}
		
			if (this .eastingFirst)
				return result .set (easting, northing, geodetic .z);
		
			return result .set (northing, easting, geodetic .z);
		},
		//lerp: Vector3 .lerp,
	};

	return UniversalTransverseMercator;
});

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


define ('x_ite/Browser/Geospatial/Geocentric',[
	"standard/Math/Numbers/Vector3",
	"standard/Math/Algorithm",
],
function (Vector3,
          Algorithm)
{
"use strict";

	function Geocentric () { }

	Geocentric .prototype =
	{
		constructor: Geocentric,
		convert: function (geocentric, result)
		{
			return result .assign (geocentric);
		},
		apply: function (geocentric, result)
		{
			return result .assign (geocentric);
		},
		slerp: function (source, destination, t)
		{
			var
				sourceLength      = source      .abs (),
				destinationLength = destination .abs ();
			
			source      .normalize ();
			destination .normalize ();
			
			return Algorithm .simpleSlerp (source, destination, t) .multiply (Algorithm .lerp (sourceLength, destinationLength, t));
		},
	};

	return Geocentric;
});

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


define ('x_ite/Browser/Geospatial/Geospatial',[
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


define ('x_ite/Components/Geospatial/X3DGeospatialObject',[
	"x_ite/Bits/X3DConstants",
	"x_ite/Browser/Geospatial/Geospatial",
	"x_ite/Bits/X3DCast",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Matrix4",
],
function (X3DConstants,
          Geospatial,
          X3DCast,
          Vector3,
          Matrix4)
{
"use strict";

	var
		vector = new Vector3 (0, 0, 0),
		result = new Vector3 (0, 0, 0),
		t      = new Vector3 (0, 0, 0),
		x      = new Vector3 (0, 0, 0),
		y      = new Vector3 (0, 0, 0),
		z      = new Vector3 (0, 0, 0);

	function X3DGeospatialObject (executionContext)
	{
		this .addType (X3DConstants .X3DGeospatialObject);

		this .radians         = false;
		this .origin          = new Vector3 (0, 0, 0);
		this .originMatrix    = new Matrix4 ();
		this .invOriginMatrix = new Matrix4 ();
	}

	X3DGeospatialObject .prototype =
	{
		constructor: X3DGeospatialObject,
		initialize: function ()
		{
			this .geoSystem_ .addInterest ("set_geoSystem__", this);
			this .geoOrigin_ .addInterest ("set_geoOrigin__", this);

			this .set_geoSystem__ ();
			this .set_geoOrigin__ ();
		},
		set_geoSystem__: function ()
		{
			this .coordinateSystem = Geospatial .getCoordinateSystem (this .geoSystem_);
			this .referenceFrame   = Geospatial .getReferenceFrame   (this .geoSystem_, this .radians);
			this .elevationFrame   = Geospatial .getElevationFrame   (this .geoSystem_, this .radians);
			this .standardOrder    = Geospatial .isStandardOrder     (this .geoSystem_);
		},
		set_geoOrigin__: function ()
		{
			if (this .geoOriginNode)
			{
				this .geoOriginNode .removeInterest ("set_origin__",    this);
				this .geoOriginNode .removeInterest ("set_rotateYUp__", this);
				this .geoOriginNode .removeInterest ("addNodeEvent",    this);
			}

			this .geoOriginNode = X3DCast (X3DConstants .GeoOrigin, this .geoOrigin_);

			if (this .geoOriginNode)
			{
				this .geoOriginNode .addInterest ("set_origin__",    this);
				this .geoOriginNode .addInterest ("set_rotateYUp__", this);
				this .geoOriginNode .addInterest ("addNodeEvent",    this);
			}
		
			this .set_origin__ ();
			this .set_rotateYUp__ ();
		},
		set_origin__: function ()
		{
			if (this .geoOriginNode)
				this .geoOriginNode .getOrigin (this .origin);
			else
				this .origin .set (0, 0, 0);

			this .set_originMatrix__ ();
		},
		set_originMatrix__: function ()
		{
			try
			{
				if (this .geoOriginNode)
				{
					// Position
					var t = this .origin;
			
					// Let's work out the orientation at that location in order
					// to maintain a view where +Y is in the direction of gravitional
					// up for that region of the planet's surface. This will be the
					// value of the rotation matrix for the transform.
				
					this .elevationFrame .normal (t, y);
			
					x .set (0, 0, 1) .cross (y);
			
					// Handle pole cases.
					if (x .equals (Vector3 .Zero))
						x .set (1, 0, 0);
				
					z .assign (x) .cross (y);
				
					x .normalize ();
					z .normalize ();
				
					this .originMatrix .set (x .x, x .y, x .z, 0,
					                         y .x, y .y, y .z, 0,
					                         z .x, z .y, z .z, 0,
					                         t .x, t .y, t .z, 1);
	
					this .invOriginMatrix .assign (this .originMatrix) .inverse ();
				}
			}
			catch (error)
			{
				/// ???
			}
		},
		set_rotateYUp__: function ()
		{
			if (this .geoOriginNode && this .geoOriginNode .rotateYUp_ .getValue ())
			{
				this .getCoord          = getCoordRotateYUp;
				this .getGeoCoord       = getGeoCoordRotateYUp;
				this .getGeoUpVector    = getGeoUpVectorRotateYUp;
				this .getLocationMatrix = getLocationMatrixRotateYUp;
			}
			else
			{
				delete this .getCoord;
				delete this .getGeoCoord;
				delete this .getGeoUpVector;
				delete this .getLocationMatrix;
			}
		},
		getReferenceFrame: function ()
		{
			return this .referenceFrame;
		},
		getStandardOrder: function ()
		{
			return this .standardOrder;
		},
		getCoord: function (geoPoint, result)
		{
			return this .referenceFrame .convert (geoPoint, result) .subtract (this .origin);
		},
		getGeoCoord: function (point, result)
		{
			return this .referenceFrame .apply (vector .assign (point) .add (this .origin), result);
		},
		getGeoElevation: function (point)
		{
			return this .getGeoCoord (point, result) .z;
		},
		getGeoUpVector: function (point, result)
		{
			return this .elevationFrame .normal (vector .assign (point) .add (this .origin), result);
		},
		getLocationMatrix: function (geoPoint, result)
		{
			var
				origin         = this .origin,
				locationMatrix = getStandardLocationMatrix .call (this, geoPoint, result);
	
			// translateRight (-origin)
			locationMatrix [12] -= origin .x;
			locationMatrix [13] -= origin .y;
			locationMatrix [14] -= origin .z;
	
			return locationMatrix;
		},
	};

	function getCoordRotateYUp (geoPoint, result)
	{
		return this .invOriginMatrix .multVecMatrix (this .referenceFrame .convert (geoPoint, result));
	}

	function getGeoCoordRotateYUp (point, result)
	{
		return this .referenceFrame .apply (this .originMatrix .multVecMatrix (vector .assign (point)), result);
	}

	function getGeoUpVectorRotateYUp (point, result)
	{
		return this .invOriginMatrix .multDirMatrix (this .elevationFrame .normal (this .originMatrix .multVecMatrix (vector .assign (point)), result));
	}

	function getLocationMatrixRotateYUp (geoPoint, result)
	{
		return getStandardLocationMatrix .call (this, geoPoint, result) .multRight (this .invOriginMatrix);
	}

	function getStandardLocationMatrix (geoPoint, result)
	{
		// Position
		this .referenceFrame .convert (geoPoint, t);

		// Let's work out the orientation at that location in order
		// to maintain a view where +Y is in the direction of gravitional
		// up for that region of the planet's surface. This will be the
		// value of the rotation matrix for the transform.
	
		this .elevationFrame .normal (t, y);

		x .set (0, 0, 1) .cross (y);

		// Handle pole cases.
		if (x .equals (Vector3 .Zero))
			x .set (1, 0, 0);
	
		z .assign (x) .cross (y);
	
		x .normalize ();
		z .normalize ();
	
		return result .set (x .x, x .y, x .z, 0,
		                    y .x, y .y, y .z, 0,
		                    z .x, z .y, z .z, 0,
		                    t .x, t .y, t .z, 1);
	}

	return X3DGeospatialObject;
});



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


define ('x_ite/Components/Geospatial/GeoCoordinate',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Rendering/X3DCoordinateNode",
	"x_ite/Components/Geospatial/X3DGeospatialObject",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Geometry/Triangle3",
	"standard/Math/Numbers/Vector3",
],
function (Fields,
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
	}

	GeoCoordinate .prototype = Object .assign (Object .create (X3DCoordinateNode .prototype),
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

			this .point_ .addInterest ("set_point__", this);

			this .set_point__ ();
		},
		set_point__: function ()
		{
			this .point  = this .point_ .getValue ();
			this .length = this .point_ .length;
		},
		isEmpty: function ()
		{
			return this .length === 0;
		},
		getSize: function ()
		{
			return this .length;
		},
		set1Point: (function ()
		{
			var result = new Vector3 (0, 0, 0);

			return function (index, point)
			{
				this .point_ [index] = this .getGeoCoord (point, result);
			};
		})(),
		get1Point: (function ()
		{
			var p = new Vector3 (0, 0, 0);

			return function (index, result)
			{
				if (index < this .length)
				{
					const point = this .point;
	
					index *= 3;
	
					return this .getCoord (p .set (point [index], point [index + 1], point [index + 2]), result);
				}
				else
				{
					return result .set (0, 0, 0);
				}
			};
		})(),
		addPoint: (function ()
		{
			var
				p = new Vector3 (0, 0, 0),
				g = new Vector3 (0, 0, 0);

			return function (index, array)
			{
				if (index < this .length)
				{
					const point = this .point;
	
					index *= 3;

					this .getCoord (p .set (point [index], point [index + 1], point [index + 2]), g);
	
					array .push (g [0], g [1], g [2], 1);
				}
				else
				{
					array .push (0, 0, 0, 1);
				}
			};
		})(),
		addPoints: (function ()
		{
			var
				p = new Vector3 (0, 0, 0),
				g = new Vector3 (0, 0, 0);

			return function (array, min)
			{
				const point = this .point;
	
				for (var index = 0, length = this .length * 3; index < length; index += 3)
				{
					this .getCoord (p .set (point [index], point [index + 1], point [index + 2]), g);
	
					array .push (g [0], g [1], g [2], 1);
				}
	
				for (var index = length, length = min * 3; index < length; index += 3)
					array .push (0, 0, 0, 1);
			};
		})(),
		getNormal: (function ()
		{
			var
				point1 = new Vector3 (0, 0, 0),
				point2 = new Vector3 (0, 0, 0),
				point3 = new Vector3 (0, 0, 0);

			return function (index1, index2, index3)
			{
				// The index[1,2,3] cannot be less than 0.
	
				var length = this .length;
	
				if (index1 < length && index2 < length && index3 < length)
				{
					return Triangle3 .normal (this .get1Point (index1, point1),
					                          this .get1Point (index2, point2),
					                          this .get1Point (index3, point3),
					                          new Vector3 (0, 0, 0));
				}
	
				return new Vector3 (0, 0, 0);
			};
		})(),
		getQuadNormal: (function ()
		{
			var
				point1 = new Vector3 (0, 0, 0),
				point2 = new Vector3 (0, 0, 0),
				point3 = new Vector3 (0, 0, 0),
				point4 = new Vector3 (0, 0, 0);

			return function (index1, index2, index3, index4)
			{
				// The index[1,2,3,4] cannot be less than 0.
	
				var length = this .length;
	
				if (index1 < length && index2 < length && index3 < length && index4 < length)
				{
					return Triangle3 .quadNormal (this .get1Point (index1, point1),
					                              this .get1Point (index2, point2),
					                              this .get1Point (index3, point3),
					                              this .get1Point (index4, point4),
					                              new Vector3 (0, 0, 0));
				}
	
				return new Vector3 (0, 0, 0);
			};
		})(),
	});

	return GeoCoordinate;
});



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


define ('x_ite/Components/Geospatial/GeoElevationGrid',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Rendering/X3DGeometryNode",
	"x_ite/Components/Geospatial/X3DGeospatialObject",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
	"standard/Math/Geometry/Triangle3",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGeometryNode, 
          X3DGeospatialObject, 
          X3DConstants,
          X3DCast,
          Triangle3,
          Vector2,
          Vector3)
{
"use strict";

	function GeoElevationGrid (executionContext)
	{
		X3DGeometryNode     .call (this, executionContext);
		X3DGeospatialObject .call (this, executionContext);

		this .addType (X3DConstants .GeoElevationGrid);

		this .creaseAngle_ .setUnit ("angle");
		this .height_      .setUnit ("length");

		this .colorNode    = null;
		this .texCoordNode = null;
		this .normalNode   = null;
	}

	GeoElevationGrid .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
		X3DGeospatialObject .prototype,
	{
		constructor: GeoElevationGrid,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",       new Fields .MFString ("GD", "WE")),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geoGridOrigin",   new Fields .SFVec3d ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "xDimension",      new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "zDimension",      new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "xSpacing",        new Fields .SFDouble (1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "zSpacing",        new Fields .SFDouble (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "yScale",          new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",           new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",             new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "creaseAngle",     new Fields .SFDouble ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "colorPerVertex",  new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "normalPerVertex", new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "color",           new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "texCoord",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "normal",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "height",          new Fields .MFDouble (0, 0)),
		]),
		getTypeName: function ()
		{
			return "GeoElevationGrid";
		},
		getComponentName: function ()
		{
			return "Geospatial";
		},
		getContainerField: function ()
		{
			return "geometry";
		},
		initialize: function ()
		{
			X3DGeometryNode     .prototype .initialize .call (this);
			X3DGeospatialObject .prototype .initialize .call (this);

			this .color_    .addInterest ("set_color__", this);
			this .texCoord_ .addInterest ("set_texCoord__", this);
			this .normal_   .addInterest ("set_normal__", this);
		
			this .set_color__ ();
			this .set_texCoord__ ();
			this .set_normal__ ();
		},
		set_color__: function ()
		{
			if (this .colorNode)
			{
				this .colorNode .removeInterest ("requestRebuild", this);
				this .colorNode .transparent_ .removeInterest ("set_transparent__", this);
			}

			this .colorNode = X3DCast (X3DConstants .X3DColorNode, this .color_);

			if (this .colorNode)
			{
				this .colorNode .addInterest ("requestRebuild", this);
				this .colorNode .transparent_ .addInterest ("set_transparent__", this);

				this .set_transparent__ ();
			}
			else
				this .setTransparent (false);
		},
		set_transparent__: function ()
		{
			this .setTransparent (this .colorNode .getTransparent ());
		},
		set_texCoord__: function ()
		{
			if (this .texCoordNode)
				this .texCoordNode .removeInterest ("requestRebuild", this);

			this .texCoordNode = X3DCast (X3DConstants .X3DTextureCoordinateNode, this .texCoord_);

			if (this .texCoordNode)
				this .texCoordNode .addInterest ("requestRebuild", this);

			this .setTextureCoordinate (this .texCoordNode);
		},
		set_normal__: function ()
		{
			if (this .normalNode)
				this .normalNode .removeInterest ("requestRebuild", this);

			this .normalNode = X3DCast (X3DConstants .X3DNormalNode, this .normal_);

			if (this .normalNode)
				this .normalNode .addInterest ("requestRebuild", this);
		},
		getColor: function ()
		{
			return this .colorNode;
		},
		getTexCoord: function ()
		{
			return this .texCoordNode;
		},
		getNormal: function ()
		{
			return this .normalNode;
		},
		getHeight: function (index)
		{
			if (index < this .height_ .length)
				return this .height_ [index] * this .yScale_ .getValue ();

			return 0;
		},
		createTexCoords: function ()
		{
			var
				texCoords  = [ ],
				xDimension = this .xDimension_ .getValue (),
				zDimension = this .zDimension_ .getValue (),
				xSize      = xDimension - 1,
				zSize      = zDimension - 1;

			for (var z = 0; z < zDimension; ++ z)
			{
				for (var x = 0; x < xDimension; ++ x)
					texCoords .push (new Vector2 (x / xSize, z / zSize));
			}

			return texCoords;
		},
		createNormals: function (points, coordIndex, creaseAngle)
		{
			var
				cw          = ! this .ccw_ .getValue (),
				normalIndex = [ ],
				normals     = [ ];

			for (var p = 0; p < points .length; ++ p)
				normalIndex [p] = [ ];

			for (var c = 0; c < coordIndex .length; c += 3)
			{
				var
					c0 = coordIndex [c],
					c1 = coordIndex [c + 1],
					c2 = coordIndex [c + 2];
				
				normalIndex [c0] .push (normals .length);
				normalIndex [c1] .push (normals .length + 1);
				normalIndex [c2] .push (normals .length + 2);

				var normal = Triangle3 .normal (points [c0], points [c1], points [c2], new Vector3 (0, 0, 0));

				if (cw)
					normal .negate ();

				normals .push (normal);
				normals .push (normal);
				normals .push (normal);
			}

			return this .refineNormals (normalIndex, normals, this .creaseAngle_ .getValue ());
		},
		createCoordIndex: function ()
		{
			// p1 - p4 
			//  | \ |
			// p2 - p3

			var
				coordIndex = [ ],
				xDimension = this .xDimension_ .getValue (),
				zDimension = this .zDimension_ .getValue (),
				xSize      = xDimension - 1,
				zSize      = zDimension - 1;

			for (var z = 0; z < zSize; ++ z)
			{
				for (var x = 0; x < xSize; ++ x)
				{
					var
						i1 =       z * xDimension + x,
						i2 = (z + 1) * xDimension + x,
						i3 = (z + 1) * xDimension + (x + 1),
						i4 =       z * xDimension + (x + 1);

					coordIndex .push (i1); // p1
					coordIndex .push (i3); // p3
					coordIndex .push (i2); // p2

					coordIndex .push (i1); // p1
					coordIndex .push (i4); // p4
					coordIndex .push (i3); // p3
				}
			}

			return coordIndex;
		},
		createPoints: function ()
		{
			var
				points     = [ ],
				xDimension = this .xDimension_ .getValue (),
				zDimension = this .zDimension_ .getValue (),
				xSpacing   = this .xSpacing_ .getValue (),
				zSpacing   = this .zSpacing_ .getValue ();

			// When the geoSystem is "GD", xSpacing refers to the number of units of longitude in angle base units between
			// adjacent height values and zSpacing refers to the number of units of latitude in angle base units between
			// vertical height values.
		
			// When the geoSystem is "UTM", xSpacing refers to the number of eastings (length base units) between adjacent
			// height values and zSpacing refers to the number of northings (length base units) between vertical height values.

			if (this .getStandardOrder ())
			{
				for (var z = 0; z < zDimension; ++ z)
				{
					for (var x = 0; x < xDimension; ++ x)
					{
						var point = new Vector3 (zSpacing * z, // latitude, northing
						                         xSpacing * x, // longitude, easting
						                         this .getHeight (x + z * xDimension));
	
						point .add (this .geoGridOrigin_ .getValue ());

						points .push (this .getCoord (point, point));
					}
				}
			}
			else
			{
				for (var z = 0; z < zDimension; ++ z)
				{
					for (var x = 0; x < xDimension; ++ x)
					{
						var point = new Vector3 (xSpacing * x, // longitude, easting
						                         zSpacing * z, // latitude, northing
						                         this .getHeight (x + z * xDimension));
	
						point .add (this .geoGridOrigin_ .getValue ());

						points .push (this .getCoord (point, point));
					}
				}
			}

			return points;
		},
		build: function ()
		{
			if (this .xDimension_ .getValue () < 2 || this .zDimension_ .getValue () < 2)
				return;

			var
				colorPerVertex     = this .colorPerVertex_ .getValue (),
				normalPerVertex    = this .normalPerVertex_ .getValue (),
				coordIndex         = this .createCoordIndex (),
				colorNode          = this .getColor (),
				texCoordNode       = this .getTexCoord (),
				normalNode         = this .getNormal (),
				points             = this .createPoints (),
				colorArray         = this .getColors (),
				multiTexCoordArray = this .getMultiTexCoords (),
				normalArray        = this .getNormals (),
				vertexArray        = this .getVertices (),
				face               = 0;

			// Vertex attribute

			//std::vector <std::vector <float>> attribArrays (attribNodes .size ());

			//for (size_t a = 0, size = attribNodes .size (); a < size; ++ a)
			//	attribArrays [a] .reserve (coordIndex .size ());

			if (texCoordNode)
			{
				texCoordNode .init (multiTexCoordArray);
			}
			else
			{
				var
					texCoords     = this .createTexCoords (),
					texCoordArray = this .getTexCoords ();

				multiTexCoordArray .push (texCoordArray);
			}

			// Build geometry

			for (var c = 0; c < coordIndex .length; ++ face)
			{
				for (var p = 0; p < 6; ++ p, ++ c)
				{
					var
						index = coordIndex [c],
						point = points [index];

					//for (size_t a = 0, size = attribNodes .size (); a < size; ++ a)
					//	attribNodes [a] -> addValue (attribArrays [a], i);

					if (colorNode)
					{
						if (colorPerVertex)
							colorNode .addColor (index, colorArray);
						else
							colorNode .addColor (face, colorArray);
					}
						
					if (texCoordNode)
					{
						texCoordNode .addTexCoord (index, multiTexCoordArray);
					}
					else
					{
						var t = texCoords [index];

						texCoordArray .push (t .x, t .y, 0, 1);
					}

					if (normalNode)
					{
						if (normalPerVertex)
							normalNode .addVector (index, normalArray);

						else
							normalNode .addVector (face, normalArray);
					}

					vertexArray .push (point .x, point .y, point .z, 1);
				}
			}

			// Add auto-generated normals if needed.

			if (! normalNode)
			{
				var normals = this .createNormals (points, coordIndex);

				for (var i = 0; i < normals .length; ++ i)
				{
					var normal = normals [i];

					normalArray .push (normal .x, normal .y, normal .z);
				}
			}

			this .setSolid (this .solid_ .getValue ());
			this .setCCW (this .ccw_ .getValue ());
		},
	});

	return GeoElevationGrid;
});



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


define ('x_ite/Components/Geospatial/GeoLOD',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Core/X3DChildNode",
	"x_ite/Components/Grouping/X3DBoundedObject",
	"x_ite/Components/Geospatial/X3DGeospatialObject",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/TraverseType",
	"x_ite/Components/Grouping/Group",
	"x_ite/Components/Networking/Inline",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Geometry/Box3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DChildNode, 
          X3DBoundedObject, 
          X3DGeospatialObject, 
          X3DConstants,
          TraverseType,
          Group,
          Inline,
          Vector3,
          Matrix4,
          Box3)
{
"use strict";

	var center = new Vector3 (0, 0, 0);

	function GeoLOD (executionContext)
	{
		X3DChildNode        .call (this, executionContext);
		X3DBoundedObject    .call (this, executionContext);
		X3DGeospatialObject .call (this, executionContext);

		this .addType (X3DConstants .GeoLOD);

		this .range_ .setUnit ("length");

		this .unload           = false;
		this .rootGroup        = new Group (this .getBrowser () .getPrivateScene ());
		this .rootInline       = new Inline (executionContext);
		this .child1Inline     = new Inline (executionContext);
		this .child2Inline     = new Inline (executionContext);
		this .child3Inline     = new Inline (executionContext);
		this .child4Inline     = new Inline (executionContext);
		this .childrenLoaded   = false;
		this .childBBox        = new Box3 ();
		this .keepCurrentLevel = false;
		this .modelViewMatrix  = new Matrix4 ();
	}

	GeoLOD .prototype = Object .assign (Object .create (X3DChildNode .prototype),
		X3DBoundedObject .prototype,
		X3DGeospatialObject .prototype,
	{
		constructor: GeoLOD,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",      new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",     new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",     new Fields .MFString ("GD", "WE")),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "rootUrl",       new Fields .MFString ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "child1Url",     new Fields .MFString ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "child2Url",     new Fields .MFString ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "child3Url",     new Fields .MFString ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "child4Url",     new Fields .MFString ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "center",        new Fields .SFVec3d ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "range",         new Fields .SFFloat (10)),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "level_changed", new Fields .SFInt32 (-1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "rootNode",      new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",      new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",    new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "children",      new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "GeoLOD";
		},
		getComponentName: function ()
		{
			return "Geospatial";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DChildNode        .prototype .initialize .call (this);
			X3DBoundedObject    .prototype .initialize .call (this);
			X3DGeospatialObject .prototype .initialize .call (this);

			this .rootNode_ .addFieldInterest (this .rootGroup .children_);
		
			this .rootGroup .children_ = this .rootNode_;
			this .rootGroup .setPrivate (true);
			this .rootGroup .setup ();
		
			this .rootInline   .loadState_ .addInterest ("set_rootLoadState__", this);
			this .child1Inline .loadState_ .addInterest ("set_childLoadState__", this);
			this .child2Inline .loadState_ .addInterest ("set_childLoadState__", this);
			this .child3Inline .loadState_ .addInterest ("set_childLoadState__", this);
			this .child4Inline .loadState_ .addInterest ("set_childLoadState__", this);
		
			this .rootUrl_   .addFieldInterest (this .rootInline   .url_);
			this .child1Url_ .addFieldInterest (this .child1Inline .url_);
			this .child2Url_ .addFieldInterest (this .child2Inline .url_);
			this .child3Url_ .addFieldInterest (this .child3Inline .url_);
			this .child4Url_ .addFieldInterest (this .child4Inline .url_);
		
			this .rootInline   .load_ = true;
			this .child1Inline .load_ = false;
			this .child2Inline .load_ = false;
			this .child3Inline .load_ = false;
			this .child4Inline .load_ = false;
		
			this .rootInline   .url_ = this .rootUrl_;
			this .child1Inline .url_ = this .child1Url_;
			this .child2Inline .url_ = this .child2Url_;
			this .child3Inline .url_ = this .child3Url_;
			this .child4Inline .url_ = this .child4Url_;
		
			this .rootInline   .setup ();
			this .child1Inline .setup ();
			this .child2Inline .setup ();
			this .child3Inline .setup ();
			this .child4Inline .setup ();
		},
		getBBox: function (bbox) 
		{
			if (this .bboxSize_ .getValue () .equals (this .getDefaultBBoxSize ()))
			{
				var level = this .level_changed_ .getValue ();

				switch (this .childrenLoaded ? level : 0)
				{
					case 0:
					{
						if (this .rootNode_ .length)
							return this .rootGroup .getBBox (bbox);

						return this .rootInline .getBBox (bbox);
					}
					case 1:
					{
						bbox .set ();
						
						bbox .add (this .child1Inline .getBBox (this .childBBox));
						bbox .add (this .child2Inline .getBBox (this .childBBox));
						bbox .add (this .child3Inline .getBBox (this .childBBox));
						bbox .add (this .child4Inline .getBBox (this .childBBox));
		
						return bbox;
					}
				}

				return bbox .set ();
			}

			return bbox .set (this .bboxSize_ .getValue (), this .bboxCenter_ .getValue ());
		},
		set_rootLoadState__: function ()
		{
			if (this .level_changed_ .getValue () !== 0)
				return;
		
			if (this .rootNode_ .length)
				return;
		
			if (this .rootInline .checkLoadState () === X3DConstants .COMPLETE_STATE)
			{
				this .children_      = this .rootInline .getInternalScene () .getRootNodes ();
				this .childrenLoaded = false;
			}
		},
		set_childLoadState__: function ()
		{
			if (this .level_changed_ .getValue () !== 1)
				return;
	
			var loaded = 0;
	
			if (this .child1Inline .checkLoadState () === X3DConstants .COMPLETE_STATE ||
			    this .child1Inline .checkLoadState () === X3DConstants .FAILED_STATE)
				++ loaded;

			if (this .child2Inline .checkLoadState () === X3DConstants .COMPLETE_STATE ||
			    this .child2Inline .checkLoadState () === X3DConstants .FAILED_STATE)
				++ loaded;

			if (this .child3Inline .checkLoadState () === X3DConstants .COMPLETE_STATE ||
			    this .child3Inline .checkLoadState () === X3DConstants .FAILED_STATE)
				++ loaded;

			if (this .child4Inline .checkLoadState () === X3DConstants .COMPLETE_STATE ||
			    this .child4Inline .checkLoadState () === X3DConstants .FAILED_STATE)
				++ loaded;
	
			if (loaded === 4)
			{
				this .childrenLoaded = true;
	
				var children = this .children_;

				children .length = 0;

				var rootNodes = this .child1Inline .getInternalScene () .getRootNodes ();
	
				for (var i = 0, length = rootNodes .length; i < length; ++ i)
					children .push (rootNodes [i]);
	
				var rootNodes = this .child2Inline .getInternalScene () .getRootNodes ();
	
				for (var i = 0, length = rootNodes .length; i < length; ++ i)
					children .push (rootNodes [i]);
	
				var rootNodes = this .child3Inline .getInternalScene () .getRootNodes ();
	
				for (var i = 0, length = rootNodes .length; i < length; ++ i)
					children .push (rootNodes [i]);
	
				var rootNodes = this .child4Inline .getInternalScene () .getRootNodes ();
	
				for (var i = 0, length = rootNodes .length; i < length; ++ i)
					children .push (rootNodes [i]);
			}
		},
		set_childCameraObject__: function ()
		{
			this .setCameraObject (this .child1Inline .getCameraObject () ||
			                       this .child2Inline .getCameraObject () ||
			                       this .child3Inline .getCameraObject () ||
			                       this .child4Inline .getCameraObject ());
		},
		set_childPickableObject__: function ()
		{
			this .setPickableObject (this .child1Inline .getPickableObject () ||
			                         this .child2Inline .getPickableObject () ||
			                         this .child3Inline .getPickableObject () ||
			                         this .child4Inline .getPickableObject ());
		},
		getLevel: function (modelViewMatrix)
		{
			var distance = this .getDistance (modelViewMatrix);
		
			if (distance < this .range_ .getValue ())
				return 1;
		
			return 0;
		},
		getDistance: function (modelViewMatrix)
		{
			modelViewMatrix .translate (this .getCoord (this .center_ .getValue (), center));

			return modelViewMatrix .origin .abs ();
		},
		traverse: function (type, renderObject)
		{
			switch (type)
			{
				case TraverseType .PICKING:
				{
					var
						browser          = renderObject .getBrowser (),
						pickingHierarchy = browser .getPickingHierarchy ();

					pickingHierarchy .push (this);

					this .traverseChildren (type, renderObject);

					pickingHierarchy .pop ();
					return;
				}
				case TraverseType .DISPLAY:
				{
					var level = this .getLevel (this .modelViewMatrix .assign (renderObject .getModelViewMatrix () .get ()));
				
					if (level !== this .level_changed_ .getValue ())
					{
						this .level_changed_ = level;
				
						switch (level)
						{
							case 0:
							{
								this .child1Inline .isCameraObject_   .removeInterest ("set_childCameraObject__",   this);
								this .child2Inline .isCameraObject_   .removeInterest ("set_childCameraObject__",   this);
								this .child3Inline .isCameraObject_   .removeInterest ("set_childCameraObject__",   this);
								this .child4Inline .isCameraObject_   .removeInterest ("set_childCameraObject__",   this);
								this .child1Inline .isPickableObject_ .removeInterest ("set_childPickableObject__", this);
								this .child2Inline .isPickableObject_ .removeInterest ("set_childPickableObject__", this);
								this .child3Inline .isPickableObject_ .removeInterest ("set_childPickableObject__", this);
								this .child4Inline .isPickableObject_ .removeInterest ("set_childPickableObject__", this);
	
								if (this .rootNode_ .length)
								{
									this .rootGroup .isCameraObject_   .addFieldInterest (this .isCameraObject_);
									this .rootGroup .isPickableObject_ .addFieldInterest (this .isPickableObject_);
	
									this .setCameraObject   (this .rootGroup .getCameraObject ());
									this .setPickableObject (this .rootGroup .getPickableObject ());
	
									this .children_      = this .rootNode_;
									this .childrenLoaded = false;
								}
								else
								{
									if (this .rootInline .checkLoadState () == X3DConstants .COMPLETE_STATE)
									{
										this .rootInline .isCameraObject_   .addFieldInterest (this .isCameraObject_);
										this .rootInline .isPickableObject_ .addFieldInterest (this .isPickableObject_);
	
										this .setCameraObject   (this .rootInline .getCameraObject ());
										this .setPickableObject (this .rootInline .getPickableObject ());
	
										this .children_      = this .rootInline .getInternalScene () .getRootNodes ();
										this .childrenLoaded = false;
									}
								}

								if (this .unload)
								{
									this .child1Inline .load_ = false;
									this .child2Inline .load_ = false;
									this .child3Inline .load_ = false;
									this .child4Inline .load_ = false;
								}

								break;
							}
							case 1:
							{
								if (this .rootNode_ .length)
								{
									this .rootGroup .isCameraObject_   .removeFieldInterest (this .isCameraObject_);
									this .rootGroup .isPickableObject_ .removeFieldInterest (this .isPickableObject_);
								}
								else
								{
									this .rootInline .isCameraObject_   .removeFieldInterest (this .isCameraObject_);
									this .rootInline .isPickableObject_ .removeFieldInterest (this .isPickableObject_);
								}
	
								this .child1Inline .isCameraObject_   .addInterest ("set_childCameraObject__",   this);
								this .child2Inline .isCameraObject_   .addInterest ("set_childCameraObject__",   this);
								this .child3Inline .isCameraObject_   .addInterest ("set_childCameraObject__",   this);
								this .child4Inline .isCameraObject_   .addInterest ("set_childCameraObject__",   this);
								this .child1Inline .isPickableObject_ .addInterest ("set_childPickableObject__", this);
								this .child2Inline .isPickableObject_ .addInterest ("set_childPickableObject__", this);
								this .child3Inline .isPickableObject_ .addInterest ("set_childPickableObject__", this);
								this .child4Inline .isPickableObject_ .addInterest ("set_childPickableObject__", this);
	
								this .set_childCameraObject__ ();
								this .set_childPickableObject__ ();

								if (this .child1Inline .load_ .getValue ())
								{
									this .set_childLoadState__ ();
								}
								else
								{
									this .child1Inline .load_ = true;
									this .child2Inline .load_ = true;
									this .child3Inline .load_ = true;
									this .child4Inline .load_ = true;
								}

								break;
							}
						}
					}

					this .traverseChildren (type, renderObject);
					return;
				}
				default:
				{
					this .traverseChildren (type, renderObject);
					return;
				}
			}
		},
		traverseChildren: function (type, renderObject)
		{
			switch (this .childrenLoaded ? this .level_changed_ .getValue () : 0)
			{
				case 0:
				{
					if (this .rootNode_ .length)
						this .rootGroup .traverse (type, renderObject);
					else
						this .rootInline .traverse (type, renderObject);
		
					break;
				}
				case 1:
				{
					this .child1Inline .traverse (type, renderObject);
					this .child2Inline .traverse (type, renderObject);
					this .child3Inline .traverse (type, renderObject);
					this .child4Inline .traverse (type, renderObject);
					break;
				}
			}
		},
	});

	return GeoLOD;
});



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


define ('x_ite/Components/Geospatial/GeoLocation',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Grouping/X3DTransformMatrix3DNode",
	"x_ite/Components/Geospatial/X3DGeospatialObject",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Matrix4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTransformMatrix3DNode, 
          X3DGeospatialObject, 
          X3DConstants,
          Matrix4)
{
"use strict";

	var locationMatrix = new Matrix4 ();

	function GeoLocation (executionContext)
	{
		X3DTransformMatrix3DNode .call (this, executionContext);
		X3DGeospatialObject      .call (this, executionContext);

		this .addType (X3DConstants .GeoLocation);
	}

	GeoLocation .prototype = Object .assign (Object .create (X3DTransformMatrix3DNode .prototype),
		X3DGeospatialObject .prototype,
	{
		constructor: GeoLocation,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",      new Fields .MFString ("GD", "WE")),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "geoCoords",      new Fields .SFVec3d ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",      new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "GeoLocation";
		},
		getComponentName: function ()
		{
			return "Geospatial";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DTransformMatrix3DNode .prototype .initialize .call (this);
			X3DGeospatialObject      .prototype .initialize .call (this);
		
			this .addInterest ("eventsProcessed", this);
		
			this .eventsProcessed ();
		},
		eventsProcessed: function ()
		{
			this .setMatrix (this .getLocationMatrix (this .geoCoords_ .getValue (), locationMatrix));
		},
	});

	return GeoLocation;
});



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


define ('x_ite/Components/Geospatial/GeoMetadata',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Core/X3DInfoNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DInfoNode, 
          X3DConstants)
{
"use strict";

	function GeoMetadata (executionContext)
	{
		X3DInfoNode .call (this, executionContext);

		this .addType (X3DConstants .GeoMetadata);
	}

	GeoMetadata .prototype = Object .assign (Object .create (X3DInfoNode .prototype),
	{
		constructor: GeoMetadata,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "url",      new Fields .MFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "summary",  new Fields .MFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "data",     new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "GeoMetadata";
		},
		getComponentName: function ()
		{
			return "Geospatial";
		},
		getContainerField: function ()
		{
			return "children";
		},
	});

	return GeoMetadata;
});



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


define ('x_ite/Components/Geospatial/GeoOrigin',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Core/X3DNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Browser/Geospatial/Geospatial",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNode, 
          X3DConstants,
          Geospatial)
{
"use strict";

	function GeoOrigin (executionContext)
	{
		X3DNode .call (this, executionContext);

		this .addType (X3DConstants .GeoOrigin);

		this .radians = false;
	}

	GeoOrigin .prototype = Object .assign (Object .create (X3DNode .prototype),
	{
		constructor: GeoOrigin,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",  new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem", new Fields .MFString ("GD", "WE")),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "geoCoords", new Fields .SFVec3d ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "rotateYUp", new Fields .SFBool ()),
		]),
		getTypeName: function ()
		{
			return "GeoOrigin";
		},
		getComponentName: function ()
		{
			return "Geospatial";
		},
		getContainerField: function ()
		{
			return "geoOrigin";
		},
		initialize: function ()
		{
			X3DNode .prototype .initialize .call (this);

			this .geoSystem_ .addInterest ("set_geoSystem__", this);

			this .set_geoSystem__ ();
		},
		set_geoSystem__: function ()
		{
			this .referenceFrame = Geospatial .getReferenceFrame (this .geoSystem_, this .radians);
		},
		getOrigin: function (result)
		{
			return this .referenceFrame .convert (this .geoCoords_ .getValue (), result);
		},
	});

	return GeoOrigin;
});



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


define ('x_ite/Components/Geospatial/GeoPositionInterpolator',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Interpolation/X3DInterpolatorNode",
	"x_ite/Components/Geospatial/X3DGeospatialObject",
	"x_ite/Browser/Geospatial/Geocentric",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
],
function (Fields,
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

		this .value_changed_ .setUnit ("length");

		this .geocentric = new Geocentric ();
	}

	GeoPositionInterpolator .prototype = Object .assign (Object .create (X3DInterpolatorNode .prototype),
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


define ('x_ite/Components/Geospatial/GeoProximitySensor',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/EnvironmentalSensor/X3DEnvironmentalSensorNode",
	"x_ite/Components/Geospatial/X3DGeospatialObject",
	"x_ite/Components/EnvironmentalSensor/ProximitySensor",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DEnvironmentalSensorNode, 
          X3DGeospatialObject,
          ProximitySensor,
          X3DConstants,
          Vector3)
{
"use strict";

	var geoCoord = new Vector3 (0, 0, 0);

	function GeoProximitySensor (executionContext)
	{
		X3DEnvironmentalSensorNode .call (this, executionContext);
		X3DGeospatialObject        .call (this, executionContext);

		this .addType (X3DConstants .GeoProximitySensor);

		this .position_changed_         .setUnit ("length");
		this .centerOfRotation_changed_ .setUnit ("length");

		this .proximitySensor = new ProximitySensor (executionContext);

		this .setCameraObject   (this .proximitySensor .getCameraObject ());
		this .setPickableObject (this .proximitySensor .getPickableObject ());
	}

	GeoProximitySensor .prototype = Object .assign (Object .create (X3DEnvironmentalSensorNode .prototype),
		X3DGeospatialObject .prototype,
	{
		constructor: GeoProximitySensor,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",                 new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",                new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",                new Fields .MFString ("GD", "WE")),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",                  new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "size",                     new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "center",                   new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",                 new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "enterTime",                new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "exitTime",                 new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "geoCoord_changed",         new Fields .SFVec3d ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "position_changed",         new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "orientation_changed",      new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "centerOfRotation_changed", new Fields .SFVec3f ()),
		]),
		getTypeName: function ()
		{
			return "GeoProximitySensor";
		},
		getComponentName: function ()
		{
			return "Geospatial";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DEnvironmentalSensorNode .prototype .initialize .call (this);
			X3DGeospatialObject        .prototype .initialize .call (this);

			this .enabled_ .addFieldInterest (this .proximitySensor .enabled_);
			this .size_    .addFieldInterest (this .proximitySensor .size_);
			this .center_  .addFieldInterest (this .proximitySensor .center_);
		
			this .proximitySensor .isCameraObject_   .addFieldInterest (this .isCameraObject_);
			this .proximitySensor .isPickableObject_ .addFieldInterest (this .isPickableObject_);

			this .proximitySensor .isActive_                 .addFieldInterest (this .isActive_);
			this .proximitySensor .enterTime_                .addFieldInterest (this .enterTime_);
			this .proximitySensor .exitTime_                 .addFieldInterest (this .exitTime_);
			this .proximitySensor .position_changed_         .addFieldInterest (this .position_changed_);
			this .proximitySensor .orientation_changed_      .addFieldInterest (this .orientation_changed_);
			this .proximitySensor .centerOfRotation_changed_ .addFieldInterest (this .centerOfRotation_changed_);
		
			this .proximitySensor .position_changed_ .addInterest ("set_position__", this);
		
			this .proximitySensor .enabled_ = this .enabled_;
			this .proximitySensor .size_    = this .size_;
			this .proximitySensor .center_  = this .center_;
		
			this .proximitySensor .setup ();
		},
		set_position__: function (position)
		{
			this .geoCoord_changed_ = this .getGeoCoord (this .proximitySensor .position_changed_ .getValue (), geoCoord);
		},
		traverse: function (type, renderObject)
		{
			this .proximitySensor .traverse (type, renderObject);
		},
	});

	return GeoProximitySensor;
});



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


define ('x_ite/Components/Geospatial/GeoTouchSensor',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/PointingDeviceSensor/X3DTouchSensorNode",
	"x_ite/Components/Geospatial/X3DGeospatialObject",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Matrix4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTouchSensorNode, 
          X3DGeospatialObject, 
          X3DConstants,
          Vector3,
          Matrix4)
{
"use strict";

	var
		invModelViewMatrix = new Matrix4 (),
		geoCoords          = new Vector3 (0, 0, 0);

	function GeoTouchSensor (executionContext)
	{
		X3DTouchSensorNode  .call (this, executionContext);
		X3DGeospatialObject .call (this, executionContext);

		this .addType (X3DConstants .GeoTouchSensor);

		this .hitPoint_changed_ .setUnit ("length");
	}

	GeoTouchSensor .prototype = Object .assign (Object .create (X3DTouchSensorNode .prototype),
		X3DGeospatialObject .prototype,
	{
		constructor: GeoTouchSensor,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",            new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",           new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",           new Fields .MFString ("GD", "WE")),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",             new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "description",         new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "hitTexCoord_changed", new Fields .SFVec2f ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "hitNormal_changed",   new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "hitPoint_changed",    new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "hitGeoCoord_changed", new Fields .SFVec3d ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isOver",              new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",            new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "touchTime",           new Fields .SFTime ()),
		]),
		getTypeName: function ()
		{
			return "GeoTouchSensor";
		},
		getComponentName: function ()
		{
			return "Geospatial";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DTouchSensorNode  .prototype .initialize .call (this);
			X3DGeospatialObject .prototype .initialize .call (this);
		},
		set_over__: function (over, hit, modelViewMatrix, projectionMatrix, viewport)
		{
			try
			{
				X3DTouchSensorNode .prototype .set_over__ .call (this, over, hit, modelViewMatrix, projectionMatrix, viewport);

				if (this .isOver_ .getValue ())
				{
					var intersection = hit .intersection;

					invModelViewMatrix .assign (modelViewMatrix) .inverse ();

					this .hitTexCoord_changed_ = intersection .texCoord;
					this .hitNormal_changed_   = modelViewMatrix .multMatrixDir (intersection .normal .copy ()) .normalize ();
					this .hitPoint_changed_    = invModelViewMatrix .multVecMatrix (intersection .point .copy ());
					this .hitGeoCoord_changed_ = this .getGeoCoord (this .hitPoint_changed_ .getValue (), geoCoords);
				}
			}
			catch (error)
			{
				console .log (error);
			}
		},
	});

	return GeoTouchSensor;
});



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


define ('x_ite/Components/Geospatial/GeoTransform',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Grouping/X3DTransformMatrix3DNode",
	"x_ite/Components/Geospatial/X3DGeospatialObject",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Matrix4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTransformMatrix3DNode, 
          X3DGeospatialObject, 
          X3DConstants,
          Matrix4)
{
"use strict";

	var
		matrix         = new Matrix4 (),
		locationMatrix = new Matrix4 ();

	function GeoTransform (executionContext)
	{
		X3DTransformMatrix3DNode .call (this, executionContext);
		X3DGeospatialObject      .call (this, executionContext);

		this .addType (X3DConstants .GeoTransform);

		this .translation_ .setUnit ("length");
	}

	GeoTransform .prototype = Object .assign (Object .create (X3DTransformMatrix3DNode .prototype),
		X3DGeospatialObject .prototype,
	{
		constructor: GeoTransform,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "translation",      new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",         new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",            new Fields .SFVec3f (1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "scaleOrientation", new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",        new Fields .MFString ("GD", "WE")),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "geoCenter",        new Fields .SFVec3d ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",      new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren",   new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "children",         new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "GeoTransform";
		},
		getComponentName: function ()
		{
			return "Geospatial";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DTransformMatrix3DNode .prototype .initialize .call (this);
			X3DGeospatialObject      .prototype .initialize .call (this);
		
			this .addInterest ("eventsProcessed", this);
		
			this .eventsProcessed ();
		},
		eventsProcessed: function ()
		{
			try
			{
				this .setHidden (this .scale_ .x === 0 ||
				                 this .scale_ .y === 0 ||
				                 this .scale_ .z === 0);
	
				this .getLocationMatrix (this .geoCenter_ .getValue (), locationMatrix);
	
				matrix .set (this .translation_      .getValue (),
				             this .rotation_         .getValue (),
				             this .scale_            .getValue (),
				             this .scaleOrientation_ .getValue ());
	
				this .setMatrix (matrix .multRight (locationMatrix) .multLeft (locationMatrix .inverse ()));
			}
			catch (error)
			{
				// Should normally not happen.
				this .setHidden (true);
			}
		},
	});

	return GeoTransform;
});



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


define ('x_ite/Components/Geospatial/GeoViewpoint',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Navigation/X3DViewpointNode",
	"x_ite/Components/Geospatial/X3DGeospatialObject",
	"x_ite/Components/Interpolation/ScalarInterpolator",
	"x_ite/Components/Navigation/NavigationInfo",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Geometry/Camera",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Algorithm",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DViewpointNode, 
          X3DGeospatialObject,
          ScalarInterpolator,
          NavigationInfo,
          X3DConstants,
          Camera,
          Vector2,
          Vector3,
          Rotation4,
          Matrix4,
          Algorithm)
{
"use strict";

	function traverse (type, renderObject)
	{
		X3DViewpointNode .prototype .traverse .call (this, type, renderObject);

		this .navigationInfoNode .traverse (type, renderObject);
	}

	function GeoViewpoint (executionContext)
	{
		X3DViewpointNode    .call (this, executionContext);
		X3DGeospatialObject .call (this, executionContext);

		this .addType (X3DConstants .GeoViewpoint);

		this .centerOfRotation_ .setUnit ("length");
		this .fieldOfView_      .setUnit ("angle");

		this .navigationInfoNode      = new NavigationInfo (executionContext);
		this .fieldOfViewInterpolator = new ScalarInterpolator (this .getBrowser () .getPrivateScene ());
		this .projectionMatrix        = new Matrix4 ();
		this .elevation               = 0;

		switch (executionContext .specificationVersion)
		{
			case "2.0":
			case "3.0":
			case "3.1":
			case "3.2":
				this .traverse = traverse;
				break;
		}
	}

	GeoViewpoint .prototype = Object .assign (Object .create (X3DViewpointNode .prototype),
		X3DGeospatialObject .prototype,
	{
		constructor: GeoViewpoint,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",         new Fields .MFString ("GD", "WE")),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "set_bind",          new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "description",       new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "position",          new Fields .SFVec3d (0, 0, 100000)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "orientation",       new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "centerOfRotation",  new Fields .SFVec3d ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "fieldOfView",       new Fields .SFFloat (0.7854)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "jump",              new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "retainUserOffsets", new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "navType",           new Fields .MFString ("EXAMINE", "ANY")),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "headlight",         new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "speedFactor",       new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isBound",           new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "bindTime",          new Fields .SFTime ()),
		]),
		getTypeName: function ()
		{
			return "GeoViewpoint";
		},
		getComponentName: function ()
		{
			return "Geospatial";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DViewpointNode    .prototype .initialize .call (this);
			X3DGeospatialObject .prototype .initialize .call (this);

			this .position_       .addInterest ("set_position__", this);
			this .positionOffset_ .addInterest ("set_position__", this);
			this .navType_        .addFieldInterest (this .navigationInfoNode .type_);
			this .headlight_      .addFieldInterest (this .navigationInfoNode .headlight_);
		
			this .navigationInfoNode .setup ();
		
			this .set_position__ ();

			// Setup interpolators

			this .fieldOfViewInterpolator .key_ = [ 0, 1 ];
			this .fieldOfViewInterpolator .setup ();

			this .getEaseInEaseOut () .modifiedFraction_changed_ .addFieldInterest (this .fieldOfViewInterpolator .set_fraction_);
			this .fieldOfViewInterpolator .value_changed_ .addFieldInterest (this .fieldOfViewScale_);
		},
		setInterpolators: function (fromViewpoint)
		{
			if (fromViewpoint .getType () .indexOf (X3DConstants .GeoViewpoint) < 0)
			{
				this .fieldOfViewInterpolator .keyValue_ = [ this .fieldOfViewScale_ .getValue (), this .fieldOfViewScale_ .getValue () ];
			}
			else
			{
				var scale = fromViewpoint .getFieldOfView () / this .fieldOfView_ .getValue ();
	
				this .fieldOfViewInterpolator .keyValue_ = [ scale, this .fieldOfViewScale_ .getValue () ];
	
				this .fieldOfViewScale_ = scale;
			}
		},
		setPosition: (function ()
		{
			var geoPosition = new Vector3 (0, 0, 0);

			return function (value)
			{
				this .position_ .setValue (this .getGeoCoord (value, geoPosition));
			};
		})(),
		getPosition: (function ()
		{
			var position = new Vector3 (0, 0, 0);

			return function () 
			{
				return this .getCoord (this .position_ .getValue (), position);
			};
		})(),
		set_position__: (function ()
		{
			var position = new Vector3 (0, 0, 0);

			return function ()
			{
				this .getCoord (this .position_ .getValue (), position);
	
				this .elevation = this .getGeoElevation (position .add (this .positionOffset_ .getValue ()));
			};
		})(),
		setOrientation: (function ()
		{
			var
				locationMatrix = new Matrix4 (),
				geoOrientation = new Rotation4 (0, 0, 1, 0);

			return function (value)
			{
				///  Returns the resulting orientation for this viewpoint.
	
				var rotationMatrix = this .getLocationMatrix (this .position_ .getValue (), locationMatrix) .submatrix;
	
				geoOrientation .setMatrix (rotationMatrix);
	
				this .orientation_ .setValue (geoOrientation .inverse () .multLeft (value));
			};
		})(),
		getOrientation: (function ()
		{
			var
				locationMatrix = new Matrix4 (),
				orientation    = new Rotation4 (0, 0, 1, 0);

			return function ()
			{
				///  Returns the resulting orientation for this viewpoint.
	
				var rotationMatrix = this .getLocationMatrix (this .position_ .getValue (), locationMatrix) .submatrix;
	
				orientation .setMatrix (rotationMatrix);
			
				return orientation .multLeft (this .orientation_ .getValue ());
			};
		})(),
		getCenterOfRotation: (function ()
		{
			var centerOfRotation = new Vector3 (0, 0, 0);

			return function ()
			{
				return this .getCoord (this .centerOfRotation_ .getValue (), centerOfRotation);
			};
		})(),
		getFieldOfView: function ()
		{
			var fov = this .fieldOfView_ * this .fieldOfViewScale_;

			return fov > 0 && fov < Math .PI ? fov : Math .PI / 4;
		},
		getMaxFarValue: function ()
		{
			return this .getBrowser () .getRenderingProperty ("LogarithmicDepthBuffer") ? 1e10 : 1e9;
		},
		getUpVector: (function ()
		{
			var
				position = new Vector3 (0, 0, 0),
				upVector = new Vector3 (0, 0, 0);

			return function ()
			{
				this .getCoord (this .position_ .getValue (), position);

				return this .getGeoUpVector .call (this, position .add (this .positionOffset_ .getValue ()), upVector);
			};
		})(),
		getSpeedFactor: function ()
		{
			return (Math .max (this .elevation, 0.0) + 10) / 10 * this .speedFactor_ .getValue ();
		},
		getScreenScale: (function ()
		{
			var screenScale = new Vector3 (0, 0, 0);

			return function (point, viewport)
			{
			   // Returns the screen scale in meter/pixel for on pixel.
	
				var
					width  = viewport [2],
					height = viewport [3],
					size   = Math .abs (point .z) * Math .tan (this .getFieldOfView () / 2) * 2;
	
				if (width > height)
					size /= height;
				else
					size /= width;
	
				return screenScale .set (size, size, size);
			};
		})(),
		getViewportSize: (function ()
		{
			var viewportSize = new Vector2 (0, 0);

			return function (viewport, nearValue)
			{
				var
					width  = viewport [2],
					height = viewport [3],
					size   = nearValue * Math .tan (this .getFieldOfView () / 2) * 2,
					aspect = width / height;
			
				if (aspect > 1)
					return viewportSize .set (size * aspect, size);
	
				return viewportSize .set (size, size / aspect);
			};
		})(),
		getLookAtDistance: function (bbox)
		{
			return (bbox .size .abs () / 2) / Math .tan (this .getFieldOfView () / 2);
		},
		getProjectionMatrixWithLimits: function (nearValue, farValue, viewport, limit)
		{
			if (limit || this .getBrowser () .getRenderingProperty ("LogarithmicDepthBuffer"))
				return Camera .perspective (this .getFieldOfView (), nearValue, farValue, viewport [2], viewport [3], this .projectionMatrix);
				
			// Linear interpolate nearValue and farValue

			var
				geoZNear = Math .max (Algorithm .lerp (Math .min (nearValue, 1e4), 1e4, this .elevation / 1e7), 1),
				geoZFar  = Math .max (Algorithm .lerp (1e6, Math .max (farValue, 1e6),  this .elevation / 1e7), 1e6);

			return Camera .perspective (this .getFieldOfView (), geoZNear, geoZFar, viewport [2], viewport [3], this .projectionMatrix);
		},
	});

	return GeoViewpoint;
});



/*******************************************************************************
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
	"x_ite/Components",
	"x_ite/Components/Geospatial/GeoCoordinate",
	"x_ite/Components/Geospatial/GeoElevationGrid",
	"x_ite/Components/Geospatial/GeoLOD",
	"x_ite/Components/Geospatial/GeoLocation",
	"x_ite/Components/Geospatial/GeoMetadata",
	"x_ite/Components/Geospatial/GeoOrigin",
	"x_ite/Components/Geospatial/GeoPositionInterpolator",
	"x_ite/Components/Geospatial/GeoProximitySensor",
	"x_ite/Components/Geospatial/GeoTouchSensor",
	"x_ite/Components/Geospatial/GeoTransform",
	"x_ite/Components/Geospatial/GeoViewpoint",
	"x_ite/Components/Geospatial/X3DGeospatialObject",
],
function (Components,
          GeoCoordinate,
          GeoElevationGrid,
          GeoLOD,
          GeoLocation,
          GeoMetadata,
          GeoOrigin,
          GeoPositionInterpolator,
          GeoProximitySensor,
          GeoTouchSensor,
          GeoTransform,
          GeoViewpoint,
          X3DGeospatialObject)
{
"use strict";

	Components .addComponent ({
		name: "Geospatial",
		types:
		{
			GeoCoordinate:           GeoCoordinate,
			GeoElevationGrid:        GeoElevationGrid,
			GeoLOD:                  GeoLOD,
			GeoLocation:             GeoLocation,
			GeoMetadata:             GeoMetadata,
			GeoOrigin:               GeoOrigin,
			GeoPositionInterpolator: GeoPositionInterpolator,
			GeoProximitySensor:      GeoProximitySensor,
			GeoTouchSensor:          GeoTouchSensor,
			GeoTransform:            GeoTransform,
			GeoViewpoint:            GeoViewpoint,
		},
		abstractTypes:
		{
			X3DGeospatialObject: X3DGeospatialObject,
		},
	});
});



}());
