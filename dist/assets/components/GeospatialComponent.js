/* X_ITE v11.5.0 */
const __X_ITE_X3D__ = window [Symbol .for ("X_ITE.X3D-11.5.0")];
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/

// UNUSED EXPORTS: default

;// external "__X_ITE_X3D__ .Components"
const external_X_ITE_X3D_Components_namespaceObject = __X_ITE_X3D__ .Components;
var external_X_ITE_X3D_Components_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Components_namespaceObject);
;// external "__X_ITE_X3D__ .Fields"
const external_X_ITE_X3D_Fields_namespaceObject = __X_ITE_X3D__ .Fields;
var external_X_ITE_X3D_Fields_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Fields_namespaceObject);
;// external "__X_ITE_X3D__ .X3DFieldDefinition"
const external_X_ITE_X3D_X3DFieldDefinition_namespaceObject = __X_ITE_X3D__ .X3DFieldDefinition;
var external_X_ITE_X3D_X3DFieldDefinition_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DFieldDefinition_namespaceObject);
;// external "__X_ITE_X3D__ .FieldDefinitionArray"
const external_X_ITE_X3D_FieldDefinitionArray_namespaceObject = __X_ITE_X3D__ .FieldDefinitionArray;
var external_X_ITE_X3D_FieldDefinitionArray_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_FieldDefinitionArray_namespaceObject);
;// external "__X_ITE_X3D__ .X3DNode"
const external_X_ITE_X3D_X3DNode_namespaceObject = __X_ITE_X3D__ .X3DNode;
var external_X_ITE_X3D_X3DNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DNode_namespaceObject);
;// external "__X_ITE_X3D__ .X3DCoordinateNode"
const external_X_ITE_X3D_X3DCoordinateNode_namespaceObject = __X_ITE_X3D__ .X3DCoordinateNode;
var external_X_ITE_X3D_X3DCoordinateNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DCoordinateNode_namespaceObject);
;// external "__X_ITE_X3D__ .X3DConstants"
const external_X_ITE_X3D_X3DConstants_namespaceObject = __X_ITE_X3D__ .X3DConstants;
var external_X_ITE_X3D_X3DConstants_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DConstants_namespaceObject);
;// external "__X_ITE_X3D__ .Namespace"
const external_X_ITE_X3D_Namespace_namespaceObject = __X_ITE_X3D__ .Namespace;
var external_X_ITE_X3D_Namespace_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Namespace_namespaceObject);
;// ./src/standard/Math/Geometry/Spheroid3.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

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
         const f_1 = arguments [1];
         this .semiMajorAxis = semiMajorAxis;                 // a
         this .semiMinorAxis = semiMajorAxis * (1 - 1 / f_1); // c
         break;
   }
}

Object .assign (Spheroid3 .prototype,
{
   getSemiMajorAxis ()
   {
      // Returns the semi-major axis (a)
      return this .semiMajorAxis; // a
   },
   getSemiMinorAxis ()
   {
      // Returns the semi-minor axis (c)
      return this .semiMinorAxis; // c
   },
   toString ()
   {
      return `${this .semiMajorAxis} ${this .semiMinorAxis}`;
   },
});

const __default__ = Spheroid3;
;

/* harmony default export */ const Geometry_Spheroid3 = (external_X_ITE_X3D_Namespace_default().add ("Spheroid3", __default__));
;// ./src/standard/Geospatial/ReferenceEllipsoids.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/



const ReferenceEllipsoids = new Map ([
   // Earth
   // X3D Specification
   ["AA", new Geometry_Spheroid3 (6377563.396, 299.3249646,   true)], // Airy 1830
   ["AM", new Geometry_Spheroid3 (6377340.189, 299.3249646,   true)], // Modified Airy
   ["AN", new Geometry_Spheroid3 (6378160,     298.25,        true)], // Australian National
   ["BN", new Geometry_Spheroid3 (6377483.865, 299.1528128,   true)], // Bessel 1841 (Namibia)
   ["BR", new Geometry_Spheroid3 (6377397.155, 299.1528128,   true)], // Bessel 1841 (Ethiopia Indonesia...)
   ["CC", new Geometry_Spheroid3 (6378206.4,   294.9786982,   true)], // Clarke 1866
   ["CD", new Geometry_Spheroid3 (6378249.145, 293.465,       true)], // Clarke 1880
   ["EA", new Geometry_Spheroid3 (6377276.345, 300.8017,      true)], // Everest (India 1830)
   ["EB", new Geometry_Spheroid3 (6377298.556, 300.8017,      true)], // Everest (Sabah & Sarawak)
   ["EC", new Geometry_Spheroid3 (6377301.243, 300.8017,      true)], // Everest (India 1956)
   ["ED", new Geometry_Spheroid3 (6377295.664, 300.8017,      true)], // Everest (W. Malaysia 1969)
   ["EE", new Geometry_Spheroid3 (6377304.063, 300.8017,      true)], // Everest (W. Malaysia & Singapore 1948)
   ["EF", new Geometry_Spheroid3 (6377309.613, 300.8017,      true)], // Everest (Pakistan)
   ["FA", new Geometry_Spheroid3 (6378155,     298.3,         true)], // Modified Fischer 1960
   ["HE", new Geometry_Spheroid3 (6378200,     298.3,         true)], // Helmert 1906
   ["HO", new Geometry_Spheroid3 (6378270,     297,           true)], // Hough 1960
   ["ID", new Geometry_Spheroid3 (6378160,     298.247,       true)], // Indonesian 1974
   ["IN", new Geometry_Spheroid3 (6378388,     297,           true)], // International 1924
   ["KA", new Geometry_Spheroid3 (6378245,     298.3,         true)], // Krassovsky 1940
   ["RF", new Geometry_Spheroid3 (6378137,     298.257222101, true)], // Geodetic Reference System 1980 (GRS 80)
   ["SA", new Geometry_Spheroid3 (6378160,     298.25,        true)], // South American 1969
   ["WD", new Geometry_Spheroid3 (6378135,     298.26,        true)], // WGS 72
   ["WE", new Geometry_Spheroid3 (6378137,     298.257223563, true)], // WGS 84
   // Solar System
   // https:,//en.wikipedia.de
   // Can someone give me more accurate parameters.
   ["SUN",     new Geometry_Spheroid3 (696342000, 1 / 9e-6, true)],
   ["MERCURY", new Geometry_Spheroid3 (2439700,  2439700)],
   ["VENUS",   new Geometry_Spheroid3 (6051800,  6051800)],
   ["MOON",    new Geometry_Spheroid3 (1738140,  1735970)],
   ["MARS",    new Geometry_Spheroid3 (3395428,  3377678)], // https",//adsabs.harvard.edu/abs/2010EM%26P..106....1A
   ["JUPITER", new Geometry_Spheroid3 (71492000, 66854000)],
   ["SATURN",  new Geometry_Spheroid3 (60268000, 54364000)],
   ["URANUS",  new Geometry_Spheroid3 (2555000,  24973000)],
   ["NEPTUNE", new Geometry_Spheroid3 (24764000, 24341000)],
   ["PLUTO",   new Geometry_Spheroid3 (1153000,  1153000)],
]);

const ReferenceEllipsoids_default_ = ReferenceEllipsoids;
;

/* harmony default export */ const Geospatial_ReferenceEllipsoids = (external_X_ITE_X3D_Namespace_default().add ("ReferenceEllipsoids", ReferenceEllipsoids_default_));
;// ./src/standard/Geospatial/Geodetic.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

const
   EPS_H = 1e-3,
   EPS_P = 1e-10,
   IMAX  = 30;

function Geodetic (spheroid, latitudeFirst, radians)
{
   this .longitudeFirst = ! latitudeFirst;
   this .degrees        = ! radians;
   this .a              = spheroid .getSemiMajorAxis ();
   this .c              = spheroid .getSemiMinorAxis ();
   this .c2a2           = (spheroid .getSemiMinorAxis () / this .a) ** 2;
   this .ecc2           = 1 - this .c2a2;
}

Object .assign (Geodetic .prototype,
{
   convert (geodetic, result)
   {
      const elevation = geodetic .z;

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
   convertRadians (latitude, longitude, elevation, result)
   {
      const
         slat  = Math .sin (latitude),
         slat2 = slat ** 2,
         clat  = Math .cos (latitude),
         N     = this .a / Math .sqrt (1 - this .ecc2 * slat2),
         Nhl   = (N + elevation) * clat;

      return result .set (Nhl * Math .cos (longitude),
                          Nhl * Math .sin (longitude),
                          (N * this .c2a2 + elevation) * slat);
   },
   apply (geocentric, result)
   {
      this .applyRadians (geocentric, result);

      if (this .degrees)
      {
         result .x *= 180 / Math .PI; // latitude
         result .y *= 180 / Math .PI; // longitude
      }

      if (this .longitudeFirst)
      {
         const tmp = result .x;

         result .x = result .y; // latitude
         result .y = tmp;       // longitude
      }

      return result;
   },
   applyRadians (geocentric, result)
   {
      const
         x = geocentric .x,
         y = geocentric .y,
         z = geocentric .z;

      const P = Math .sqrt (x * x + y * y);

      // Handle pole case.
      if (P == 0)
         return result .set (Math .PI, 0, z - this .c);

      let
         latitude  = 0,
         longitude = Math .atan2 (y, x),
         elevation = 0;

      let
         a    = this .a,
         N    = a,
         ecc2 = this .ecc2;

      for (let i = 0; i < IMAX; ++ i)
      {
         const
            h0 = elevation,
            b0 = latitude;

         latitude = Math .atan (z / P / (1 - ecc2 * N / (N + elevation)));

         const sin_p = Math .sin (latitude);

         N         = a / Math .sqrt (1 - ecc2 * sin_p * sin_p);
         elevation = P / Math .cos (latitude) - N;

         if (Math .abs (elevation - h0) < EPS_H && Math .abs (latitude - b0) < EPS_P)
            break;
      }

      return result .set (latitude, longitude, elevation);
   },
   normal (geocentric, result)
   {
      const geodetic = this .applyRadians (geocentric, result);

      const
         latitude  = geodetic .x,
         longitude = geodetic .y;

      const clat = Math .cos (latitude);

      const
         nx = Math .cos (longitude) * clat,
         ny = Math .sin (longitude) * clat,
         nz = Math .sin (latitude);

      return result .set (nx, ny, nz);
   },
});

const Geodetic_default_ = Geodetic;
;

/* harmony default export */ const Geospatial_Geodetic = (external_X_ITE_X3D_Namespace_default().add ("Geodetic", Geodetic_default_));
;// external "__X_ITE_X3D__ .Algorithm"
const external_X_ITE_X3D_Algorithm_namespaceObject = __X_ITE_X3D__ .Algorithm;
var external_X_ITE_X3D_Algorithm_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Algorithm_namespaceObject);
;// ./src/standard/Geospatial/UniversalTransverseMercator.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/




const
   N0 = 1.0e7,
   E0 = 5.0e5,
   k0 = 0.9996;

function UniversalTransverseMercator (spheroid, zone, northernHemisphere, northingFirst)
{
   const
      a    = spheroid .getSemiMajorAxis (),
      ecc2 = 1 - (spheroid .getSemiMinorAxis () / a) ** 2,
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
   this .longitude0         = external_X_ITE_X3D_Algorithm_default().radians (zone * 6 - 183);
   this .geodeticConverter  = new Geospatial_Geodetic (spheroid, true, true);
}

Object .assign (UniversalTransverseMercator .prototype,
{
   convert (utm, result)
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

      let S = this .southernHemisphere;

      if (northing < 0)
      {
         S        = ! this .southernHemisphere;
         northing = -northing;
      }

      if (S)
         northing -= N0;

      easting -= E0;

      // Begin calculation.

      const
         mu   = northing / this .A,
         phi1 = mu + this .B * Math .sin (2 * mu) + this .C * Math .sin (4 * mu) + this .D * Math .sin (6 * mu);

      const
         sinphi1 = Math .sin (phi1) ** 2,
         cosphi1 = Math .cos (phi1),
         tanphi1 = Math .tan (phi1);

      const
         N1 = this .a / Math .sqrt (1 - this .ecc2 * sinphi1),
         T2 = tanphi1 ** 2,
         T8 = tanphi1 ** 8,
         C1 = this .EE * T2,
         C2 = C1 * C1,
         R1 = this .E / (1 - this .ecc2 * sinphi1) ** 1.5,
         I  = easting / (N1 * k0);

      const
         J = (5 + 3 * T2 + 10 * C1 - 4 * C2 - this .E9) * I ** 4 / 24,
         K = (61 + 90 * T2 + 298 * C1 + 45 * T8 - this .E252 - 3 * C2) * I ** 6 / 720,
         L = (5 - 2 * C1 + 28 * T2 - 3 * C2 + this .E8 + 24 * T8) * I ** 5 / 120;

      const
         latitude  = phi1 - (N1 * tanphi1 / R1) * (I * I / 2 - J + K),
         longitude = this .longitude0 + (I - (1 + 2 * T2 + C1) * I ** 3 / 6 + L) / cosphi1;

      return this .geodeticConverter .convertRadians (latitude, longitude, utm .z, result);
   },
   apply (geocentric, result)
   {
      // https://gist.github.com/duedal/840476

      const
         geodetic  = this .geodeticConverter .applyRadians (geocentric, result),
         latitude  = geodetic .x,
         longitude = geodetic .y;

      const
         tanlat = Math .tan (latitude),
         coslat = Math .cos (latitude);

      const
         EE = this .EE,
         N  = this .a / Math .sqrt (1 - this .ecc2 * Math .sin (latitude) ** 2),
         T  = tanlat * tanlat,
         T6 = T * T * T,
         C  = EE * coslat * coslat,
         A  = coslat * (longitude - this .longitude0);

      const M = this .a * (this .W * latitude
                           - this .X * Math .sin (2 * latitude)
                           + this .Y * Math .sin (4 * latitude)
                           - this .Z * Math .sin (6 * latitude));

      const easting = k0 * N * (A + (1 - T + C) * A ** 3 / 6
                                + (5 - 18 * T6 + 72 * C - 58 * EE) * A ** 5 / 120)
                      + E0;

      let northing = k0 * (M + N * tanlat * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A ** 4 / 24
                                             + (61 - 58 * T6 + 600 * C - 330 * EE) * A ** 6 / 720));

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
});

const UniversalTransverseMercator_default_ = UniversalTransverseMercator;
;

/* harmony default export */ const Geospatial_UniversalTransverseMercator = (external_X_ITE_X3D_Namespace_default().add ("UniversalTransverseMercator", UniversalTransverseMercator_default_));
;// ./src/x_ite/Browser/Geospatial/Geocentric.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/



function Geocentric () { }

Object .assign (Geocentric .prototype,
{
   convert (geocentric, result)
   {
      return result .assign (geocentric);
   },
   apply (geocentric, result)
   {
      return result .assign (geocentric);
   },
   slerp (source, destination, t)
   {
      const
         sourceLength      = source      .magnitude (),
         destinationLength = destination .magnitude ();

      source      .normalize ();
      destination .normalize ();

      return external_X_ITE_X3D_Algorithm_default().simpleSlerp (source, destination, t) .multiply (external_X_ITE_X3D_Algorithm_default().lerp (sourceLength, destinationLength, t));
   },
});

const Geocentric_default_ = Geocentric;
;

/* harmony default export */ const Geospatial_Geocentric = (external_X_ITE_X3D_Namespace_default().add ("Geocentric", Geocentric_default_));
;// ./src/x_ite/Browser/Geospatial/GeospatialObject.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/






let i = 0;

const
   GD  = i ++,
   UTM = i ++,
   GC  = i ++;

const CoordinateSystems = new Map ([
   ["GD",  GD],
   ["GDC", GD],
   ["UTM", UTM],
   ["GC",  GC],
   ["GCC", GC],
   ["GS",  GC],
]);

const Zone = /^Z(\d+)$/;

const GeospatialObject =
{
   GD: GD,
   UTM: UTM,
   GC: GC,
   getReferenceFrame (geoSystem, radians)
   {
      switch (this .getCoordinateSystem (geoSystem))
      {
         case GD:
         {
            return new Geospatial_Geodetic (this .getEllipsoid (geoSystem),
                                 this .getLatitudeFirst (geoSystem),
                                 radians);
         }
         case UTM:
         {
            return new Geospatial_UniversalTransverseMercator (this .getEllipsoid (geoSystem),
                                                    this .getZone (geoSystem),
                                                    this .getNorthernHemisphere (geoSystem),
                                                    this .getNorthingFirst (geoSystem));
         }
         case GC:
         {
            return new Geospatial_Geocentric ();
         }
      }

      return new Geospatial_Geodetic (Geospatial_ReferenceEllipsoids .get ("WE"), true, radians);
   },
   getElevationFrame (geoSystem, radians)
   {
      return new Geospatial_Geodetic (this .getEllipsoid (geoSystem), true, radians);
   },
   getCoordinateSystem (geoSystem)
   {
      for (const gs of geoSystem)
      {
         const coordinateSystem = CoordinateSystems .get (gs);

         if (coordinateSystem !== undefined)
            return coordinateSystem;
      }

      return GD;
   },
   getEllipsoid (geoSystem)
   {
      for (const gs of geoSystem)
      {
         const ellipsoid = Geospatial_ReferenceEllipsoids .get (gs);

         if (ellipsoid !== undefined)
            return ellipsoid;
      }

      return Geospatial_ReferenceEllipsoids .get ("WE");
   },
   // getEllipsoidString (geoSystem)
   // {
   //    for (const gs of geoSystem)
   //    {
   //       const ellipsoid = ReferenceEllipsoids .get (gs);

   //       if (ellipsoid !== undefined)
   //          return gs;
   //    }

   //    return "WE";
   // },
   isStandardOrder (geoSystem)
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
   getLatitudeFirst (geoSystem)
   {
      for (const gs of geoSystem)
      {
         if (gs === "longitude_first")
            return false;
      }

      return true;
   },
   getNorthingFirst (geoSystem)
   {
      for (const gs of geoSystem)
      {
         if (gs === "easting_first")
            return false;
      }

      return true;
   },
   getZone (geoSystem)
   {
      for (const gs of geoSystem)
      {
         const match = gs .match (Zone);

         if (match)
            return parseInt (match [1]);
      }

      return 1;
   },
   getNorthernHemisphere (geoSystem)
   {
      for (const gs of geoSystem)
      {
         if (gs === "S")
            return false;
      }

      return true;
   },
};

const GeospatialObject_default_ = GeospatialObject;
;

/* harmony default export */ const Geospatial_GeospatialObject = (external_X_ITE_X3D_Namespace_default().add ("GeospatialObject", GeospatialObject_default_));
;// external "__X_ITE_X3D__ .X3DCast"
const external_X_ITE_X3D_X3DCast_namespaceObject = __X_ITE_X3D__ .X3DCast;
var external_X_ITE_X3D_X3DCast_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DCast_namespaceObject);
;// external "__X_ITE_X3D__ .Vector3"
const external_X_ITE_X3D_Vector3_namespaceObject = __X_ITE_X3D__ .Vector3;
var external_X_ITE_X3D_Vector3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Vector3_namespaceObject);
;// external "__X_ITE_X3D__ .Matrix4"
const external_X_ITE_X3D_Matrix4_namespaceObject = __X_ITE_X3D__ .Matrix4;
var external_X_ITE_X3D_Matrix4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Matrix4_namespaceObject);
;// ./src/x_ite/Components/Geospatial/X3DGeospatialObject.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/








const
   vector = new (external_X_ITE_X3D_Vector3_default()) (),
   result = new (external_X_ITE_X3D_Vector3_default()) (),
   t      = new (external_X_ITE_X3D_Vector3_default()) (),
   x      = new (external_X_ITE_X3D_Vector3_default()) (),
   y      = new (external_X_ITE_X3D_Vector3_default()) (),
   z      = new (external_X_ITE_X3D_Vector3_default()) ();

function X3DGeospatialObject (executionContext)
{
   this .addType ((external_X_ITE_X3D_X3DConstants_default()).X3DGeospatialObject);

   this .radians         = false;
   this .origin          = new (external_X_ITE_X3D_Vector3_default()) ();
   this .originMatrix    = new (external_X_ITE_X3D_Matrix4_default()) ();
   this .invOriginMatrix = new (external_X_ITE_X3D_Matrix4_default()) ();
}

Object .assign (X3DGeospatialObject .prototype,
{
   initialize ()
   {
      this ._geoSystem .addInterest ("set_geoSystem__", this);
      this ._geoOrigin .addInterest ("set_geoOrigin__", this);

      this .set_geoSystem__ ();
      this .set_geoOrigin__ ();
   },
   set_geoSystem__ ()
   {
      this .coordinateSystem = Geospatial_GeospatialObject .getCoordinateSystem (this ._geoSystem);
      this .referenceFrame   = Geospatial_GeospatialObject .getReferenceFrame   (this ._geoSystem, this .radians);
      this .elevationFrame   = Geospatial_GeospatialObject .getElevationFrame   (this ._geoSystem, this .radians);
      this .standardOrder    = Geospatial_GeospatialObject .isStandardOrder     (this ._geoSystem);
   },
   set_geoOrigin__ ()
   {
      if (this .geoOriginNode)
      {
         this .geoOriginNode .removeInterest ("set_origin__",    this);
         this .geoOriginNode .removeInterest ("set_rotateYUp__", this);
         this .geoOriginNode .removeInterest ("addNodeEvent",    this);
      }

      this .geoOriginNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).GeoOrigin, this ._geoOrigin);

      if (this .geoOriginNode)
      {
         this .geoOriginNode .addInterest ("set_origin__",    this);
         this .geoOriginNode .addInterest ("set_rotateYUp__", this);
         this .geoOriginNode .addInterest ("addNodeEvent",    this);
      }

      this .set_origin__ ();
      this .set_rotateYUp__ ();
   },
   set_origin__ ()
   {
      if (this .geoOriginNode)
         this .geoOriginNode .getOrigin (this .origin);
      else
         this .origin .set (0, 0, 0);

      this .set_originMatrix__ ();
   },
   set_originMatrix__ ()
   {
      if (this .geoOriginNode)
      {
         // Position
         const t = this .origin;

         // Let's work out the orientation at that location in order
         // to maintain a view where +Y is in the direction of gravitational
         // up for that region of the planet's surface. This will be the
         // value of the rotation matrix for the transform.

         this .elevationFrame .normal (t, y);

         x .set (0, 0, 1) .cross (y);

         // Handle pole cases.
         if (x .equals ((external_X_ITE_X3D_Vector3_default()).Zero))
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
   },
   set_rotateYUp__ ()
   {
      if (this .geoOriginNode && this .geoOriginNode ._rotateYUp .getValue ())
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
   getReferenceFrame ()
   {
      return this .referenceFrame;
   },
   getStandardOrder ()
   {
      return this .standardOrder;
   },
   getCoord (geoPoint, result)
   {
      return this .referenceFrame .convert (geoPoint, result) .subtract (this .origin);
   },
   getGeoCoord (point, result)
   {
      return this .referenceFrame .apply (vector .assign (point) .add (this .origin), result);
   },
   getGeoElevation (point)
   {
      return this .getGeoCoord (point, result) .z;
   },
   getGeoUpVector (point, result)
   {
      return this .elevationFrame .normal (vector .assign (point) .add (this .origin), result);
   },
   getLocationMatrix (geoPoint, result)
   {
      const
         origin         = this .origin,
         locationMatrix = getStandardLocationMatrix .call (this, geoPoint, result);

      // translateRight (-origin)
      locationMatrix [12] -= origin .x;
      locationMatrix [13] -= origin .y;
      locationMatrix [14] -= origin .z;

      return locationMatrix;
   },
   dispose ()
   { },
});

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
   if (x .equals ((external_X_ITE_X3D_Vector3_default()).Zero))
      x .set (1, 0, 0);

   z .assign (x) .cross (y);

   x .normalize ();
   z .normalize ();

   return result .set (x .x, x .y, x .z, 0,
                       y .x, y .y, y .z, 0,
                       z .x, z .y, z .z, 0,
                       t .x, t .y, t .z, 1);
}

Object .defineProperties (X3DGeospatialObject, external_X_ITE_X3D_X3DNode_default().getStaticProperties ("X3DGeospatialObject", "Geospatial", 1));

const X3DGeospatialObject_default_ = X3DGeospatialObject;
;

/* harmony default export */ const Geospatial_X3DGeospatialObject = (external_X_ITE_X3D_Namespace_default().add ("X3DGeospatialObject", X3DGeospatialObject_default_));
;// external "__X_ITE_X3D__ .Triangle3"
const external_X_ITE_X3D_Triangle3_namespaceObject = __X_ITE_X3D__ .Triangle3;
var external_X_ITE_X3D_Triangle3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Triangle3_namespaceObject);
;// ./src/x_ite/Components/Geospatial/GeoCoordinate.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/











function GeoCoordinate (executionContext)
{
   external_X_ITE_X3D_X3DCoordinateNode_default().call (this, executionContext);
   Geospatial_X3DGeospatialObject .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).GeoCoordinate);
}

Object .assign (Object .setPrototypeOf (GeoCoordinate .prototype, (external_X_ITE_X3D_X3DCoordinateNode_default()).prototype),
   Geospatial_X3DGeospatialObject .prototype,
{
   initialize ()
   {
      external_X_ITE_X3D_X3DCoordinateNode_default().prototype .initialize .call (this);
      Geospatial_X3DGeospatialObject .prototype .initialize .call (this);
   },
   set1Point: (() =>
   {
      const result = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (index, point)
      {
         this ._point [index] = this .getGeoCoord (point, result);
      };
   })(),
   get1Point: (() =>
   {
      const p = new (external_X_ITE_X3D_Vector3_default()) ();

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
   addPoint: (() =>
   {
      const
         p = new (external_X_ITE_X3D_Vector3_default()) (),
         g = new (external_X_ITE_X3D_Vector3_default()) ();

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
   addPoints: (() =>
   {
      const
         p = new (external_X_ITE_X3D_Vector3_default()) (),
         g = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (array)
      {
         const
            point  = this .point,
            length = this .length * 3;

         for (let index = 0; index < length; index += 3)
         {
            this .getCoord (p .set (point [index], point [index + 1], point [index + 2]), g);

            array .push (g [0], g [1], g [2], 1);
         }

         return array;
      };
   })(),
   getNormal: (() =>
   {
      const
         point1 = new (external_X_ITE_X3D_Vector3_default()) (),
         point2 = new (external_X_ITE_X3D_Vector3_default()) (),
         point3 = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (index1, index2, index3)
      {
         // The index[1,2,3] cannot be less than 0.

         const length = this .length;

         if (index1 < length && index2 < length && index3 < length)
         {
            return external_X_ITE_X3D_Triangle3_default().normal (this .get1Point (index1, point1),
                                      this .get1Point (index2, point2),
                                      this .get1Point (index3, point3),
                                      new (external_X_ITE_X3D_Vector3_default()) ());
         }

         return new (external_X_ITE_X3D_Vector3_default()) ();
      };
   })(),
   getQuadNormal: (() =>
   {
      const
         point1 = new (external_X_ITE_X3D_Vector3_default()) (),
         point2 = new (external_X_ITE_X3D_Vector3_default()) (),
         point3 = new (external_X_ITE_X3D_Vector3_default()) (),
         point4 = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (index1, index2, index3, index4)
      {
         // The index[1,2,3,4] cannot be less than 0.

         const length = this .length;

         if (index1 < length && index2 < length && index3 < length && index4 < length)
         {
            return external_X_ITE_X3D_Triangle3_default().quadNormal (this .get1Point (index1, point1),
                                          this .get1Point (index2, point2),
                                          this .get1Point (index3, point3),
                                          this .get1Point (index4, point4),
                                          new (external_X_ITE_X3D_Vector3_default()) ());
         }

         return new (external_X_ITE_X3D_Vector3_default()) ();
      };
   })(),
   dispose ()
   {
      Geospatial_X3DGeospatialObject .prototype .dispose .call (this);
      external_X_ITE_X3D_X3DCoordinateNode_default().prototype .dispose .call (this);
   },
});

Object .defineProperties (GeoCoordinate,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("GeoCoordinate", "Geospatial", 1, "coord", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",  new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "geoOrigin", new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "geoSystem", new (external_X_ITE_X3D_Fields_default()).MFString ("GD", "WE")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "point",     new (external_X_ITE_X3D_Fields_default()).MFVec3d ()),
      ]),
      enumerable: true,
   },
});

const GeoCoordinate_default_ = GeoCoordinate;
;

/* harmony default export */ const Geospatial_GeoCoordinate = (external_X_ITE_X3D_Namespace_default().add ("GeoCoordinate", GeoCoordinate_default_));
;// external "__X_ITE_X3D__ .X3DGeometryNode"
const external_X_ITE_X3D_X3DGeometryNode_namespaceObject = __X_ITE_X3D__ .X3DGeometryNode;
var external_X_ITE_X3D_X3DGeometryNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DGeometryNode_namespaceObject);
;// external "__X_ITE_X3D__ .Vector2"
const external_X_ITE_X3D_Vector2_namespaceObject = __X_ITE_X3D__ .Vector2;
var external_X_ITE_X3D_Vector2_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Vector2_namespaceObject);
;// ./src/x_ite/Components/Geospatial/GeoElevationGrid.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/













function GeoElevationGrid (executionContext)
{
   external_X_ITE_X3D_X3DGeometryNode_default().call (this, executionContext);
   Geospatial_X3DGeospatialObject .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).GeoElevationGrid);

   // Units

   this ._set_height  .setUnit ("length");
   this ._creaseAngle .setUnit ("angle");
   this ._height      .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (GeoElevationGrid .prototype, (external_X_ITE_X3D_X3DGeometryNode_default()).prototype),
   Geospatial_X3DGeospatialObject .prototype,
{
   initialize ()
   {
      external_X_ITE_X3D_X3DGeometryNode_default().prototype .initialize .call (this);
      Geospatial_X3DGeospatialObject .prototype .initialize .call (this);

      this ._set_height .addFieldInterest (this ._height);
      this ._color      .addInterest ("set_color__", this);
      this ._texCoord   .addInterest ("set_texCoord__", this);
      this ._normal     .addInterest ("set_normal__", this);

      this .set_color__ ();
      this .set_texCoord__ ();
      this .set_normal__ ();
   },
   set_color__ ()
   {
      this .colorNode ?.removeInterest ("requestRebuild", this);

      this .colorNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DColorNode, this ._color);

      this .colorNode ?.addInterest ("requestRebuild", this);

      this .setTransparent (this .colorNode ?.isTransparent ());
   },
   set_texCoord__ ()
   {
      this .texCoordNode ?.removeInterest ("requestRebuild", this);

      this .texCoordNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DTextureCoordinateNode, this ._texCoord);

      this .texCoordNode ?.addInterest ("requestRebuild", this);

      this .setTextureCoordinate (this .texCoordNode);
   },
   set_normal__ ()
   {
      this .normalNode ?.removeInterest ("requestRebuild", this);

      this .normalNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DNormalNode, this ._normal);

      this .normalNode ?.addInterest ("requestRebuild", this);
   },
   getColor ()
   {
      return this .colorNode;
   },
   getTexCoord ()
   {
      return this .texCoordNode;
   },
   getNormal ()
   {
      return this .normalNode;
   },
   getTangent ()
   {
      return this .tangentNode;
   },
   getHeight (index)
   {
      if (index < this ._height .length)
         return this ._height [index] * this ._yScale .getValue ();

      return 0;
   },
   createTexCoords ()
   {
      const
         texCoords  = [ ],
         xDimension = this ._xDimension .getValue (),
         zDimension = this ._zDimension .getValue (),
         xSize      = xDimension - 1,
         zSize      = zDimension - 1;

      for (let z = 0; z < zDimension; ++ z)
      {
         for (let x = 0; x < xDimension; ++ x)
            texCoords .push (new (external_X_ITE_X3D_Vector2_default()) (x / xSize, z / zSize));
      }

      return texCoords;
   },
   createNormals (points, coordIndex, creaseAngle)
   {
      const
         cw          = !this ._ccw .getValue (),
         normalIndex = new Map (),
         normals     = [ ];

      for (let p = 0; p < points .length; ++ p)
         normalIndex .set (p, [ ]);

      for (let c = 0; c < coordIndex .length; c += 3)
      {
         const
            c0 = coordIndex [c],
            c1 = coordIndex [c + 1],
            c2 = coordIndex [c + 2];

         normalIndex .get (c0) .push (normals .length);
         normalIndex .get (c1) .push (normals .length + 1);
         normalIndex .get (c2) .push (normals .length + 2);

         const normal = external_X_ITE_X3D_Triangle3_default().normal (points [c0], points [c1], points [c2], new (external_X_ITE_X3D_Vector3_default()) ());

         if (cw)
            normal .negate ();

         normals .push (normal);
         normals .push (normal);
         normals .push (normal);
      }

      if (!this ._normalPerVertex .getValue ())
         return normals;

      return this .refineNormals (normalIndex, normals, creaseAngle ?? this ._creaseAngle .getValue ());
   },
   createCoordIndex ()
   {
      // p1 - p4
      //  | \ |
      // p2 - p3

      const
         coordIndex = [ ],
         xDimension = this ._xDimension .getValue (),
         zDimension = this ._zDimension .getValue (),
         xSize      = xDimension - 1,
         zSize      = zDimension - 1;

      for (let z = 0; z < zSize; ++ z)
      {
         for (let x = 0; x < xSize; ++ x)
         {
            const
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
   createPoints ()
   {
      const
         points     = [ ],
         xDimension = this ._xDimension .getValue (),
         zDimension = this ._zDimension .getValue (),
         xSpacing   = this ._xSpacing .getValue (),
         zSpacing   = this ._zSpacing .getValue ();

      // When the geoSystem is "GD", xSpacing refers to the number of units of longitude in angle base units between
      // adjacent height values and zSpacing refers to the number of units of latitude in angle base units between
      // vertical height values.

      // When the geoSystem is "UTM", xSpacing refers to the number of eastings (length base units) between adjacent
      // height values and zSpacing refers to the number of northings (length base units) between vertical height values.

      if (this .getStandardOrder ())
      {
         for (let z = 0; z < zDimension; ++ z)
         {
            for (let x = 0; x < xDimension; ++ x)
            {
               const point = new (external_X_ITE_X3D_Vector3_default()) (zSpacing * z, // latitude, northing
                                          xSpacing * x, // longitude, easting
                                          this .getHeight (x + z * xDimension));

               point .add (this ._geoGridOrigin .getValue ());

               points .push (this .getCoord (point, point));
            }
         }
      }
      else
      {
         for (let z = 0; z < zDimension; ++ z)
         {
            for (let x = 0; x < xDimension; ++ x)
            {
               const point = new (external_X_ITE_X3D_Vector3_default()) (xSpacing * x, // longitude, easting
                                          zSpacing * z, // latitude, northing
                                          this .getHeight (x + z * xDimension));

               point .add (this ._geoGridOrigin .getValue ());

               points .push (this .getCoord (point, point));
            }
         }
      }

      return points;
   },
   build ()
   {
      if (this ._xDimension .getValue () < 2 || this ._zDimension .getValue () < 2)
         return;

      const
         colorPerVertex     = this ._colorPerVertex .getValue (),
         normalPerVertex    = this ._normalPerVertex .getValue (),
         coordIndex         = this .createCoordIndex (),
         colorNode          = this .getColor (),
         texCoordNode       = this .getTexCoord (),
         normalNode         = this .getNormal (),
         tangentNode        = this .getTangent (),
         points             = this .createPoints (),
         colorArray         = this .getColors (),
         multiTexCoordArray = this .getMultiTexCoords (),
         normalArray        = this .getNormals (),
         tangentArray       = this .getTangent (),
         vertexArray        = this .getVertices ();

      let face = 0;

      // Vertex attribute

      //std::vector <std::vector <float>> attribArrays (attribNodes .size ());

      //for (size_t a = 0, size = attribNodes .size (); a < size; ++ a)
      //   attribArrays [a] .reserve (coordIndex .size ());

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

      for (let c = 0; c < coordIndex .length; ++ face)
      {
         for (let p = 0; p < 6; ++ p, ++ c)
         {
            const
               index       = coordIndex [c],
               { x, y, z } = points [index];

            //for (size_t a = 0, size = attribNodes .size (); a < size; ++ a)
            //   attribNodes [a] -> addValue (attribArrays [a], i);

            colorNode ?.addColor (colorPerVertex ? index : face, colorArray);

            if (texCoordNode)
            {
               texCoordNode .addPoint (index, multiTexCoordArray);
            }
            else
            {
               const { x, y } = texCoords [index];

               texCoordArray .push (x, y, 0, 1);
            }

            normalNode  ?.addVector (normalPerVertex ? index : face, normalArray);
            tangentNode ?.addVector (normalPerVertex ? index : face, tangentArray);

            vertexArray .push (x, y, z, 1);
         }
      }

      // Add auto-generated normals if needed.

      if (!normalNode)
      {
         const normals = this .createNormals (points, coordIndex);

         for (const { x, y, z } of normals)
            normalArray .push (x, y, z);
      }

      this .setSolid (this ._solid .getValue ());
      this .setCCW (this ._ccw .getValue ());
   },
   dispose ()
   {
      Geospatial_X3DGeospatialObject .prototype .dispose .call (this);
      external_X_ITE_X3D_X3DGeometryNode_default().prototype .dispose .call (this);
   },
});

Object .defineProperties (GeoElevationGrid,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("GeoElevationGrid", "Geospatial", 1, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "geoOrigin",       new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "geoSystem",       new (external_X_ITE_X3D_Fields_default()).MFString ("GD", "WE")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "set_height",      new (external_X_ITE_X3D_Fields_default()).MFDouble ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "geoGridOrigin",   new (external_X_ITE_X3D_Fields_default()).SFVec3d ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "xDimension",      new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "zDimension",      new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "xSpacing",        new (external_X_ITE_X3D_Fields_default()).SFDouble (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "zSpacing",        new (external_X_ITE_X3D_Fields_default()).SFDouble (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "yScale",          new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "solid",           new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "ccw",             new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "creaseAngle",     new (external_X_ITE_X3D_Fields_default()).SFDouble ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "colorPerVertex",  new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "normalPerVertex", new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "color",           new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "texCoord",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "tangent",         new (external_X_ITE_X3D_Fields_default()).SFNode ()), // experimental
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "normal",          new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "height",          new (external_X_ITE_X3D_Fields_default()).MFDouble (0, 0)),
      ]),
      enumerable: true,
   },
});

const GeoElevationGrid_default_ = GeoElevationGrid;
;

/* harmony default export */ const Geospatial_GeoElevationGrid = (external_X_ITE_X3D_Namespace_default().add ("GeoElevationGrid", GeoElevationGrid_default_));
;// external "__X_ITE_X3D__ .X3DChildNode"
const external_X_ITE_X3D_X3DChildNode_namespaceObject = __X_ITE_X3D__ .X3DChildNode;
var external_X_ITE_X3D_X3DChildNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DChildNode_namespaceObject);
;// external "__X_ITE_X3D__ .X3DBoundedObject"
const external_X_ITE_X3D_X3DBoundedObject_namespaceObject = __X_ITE_X3D__ .X3DBoundedObject;
var external_X_ITE_X3D_X3DBoundedObject_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DBoundedObject_namespaceObject);
;// external "__X_ITE_X3D__ .TraverseType"
const external_X_ITE_X3D_TraverseType_namespaceObject = __X_ITE_X3D__ .TraverseType;
var external_X_ITE_X3D_TraverseType_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_TraverseType_namespaceObject);
;// external "__X_ITE_X3D__ .Group"
const external_X_ITE_X3D_Group_namespaceObject = __X_ITE_X3D__ .Group;
var external_X_ITE_X3D_Group_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Group_namespaceObject);
;// external "__X_ITE_X3D__ .Inline"
const external_X_ITE_X3D_Inline_namespaceObject = __X_ITE_X3D__ .Inline;
var external_X_ITE_X3D_Inline_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Inline_namespaceObject);
;// ./src/x_ite/Components/Geospatial/GeoLOD.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/















function GeoLOD (executionContext)
{
   external_X_ITE_X3D_X3DChildNode_default().call (this, executionContext);
   external_X_ITE_X3D_X3DBoundedObject_default().call (this, executionContext);
   Geospatial_X3DGeospatialObject .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).GeoLOD);

   this .setVisibleObject (true);

   // Units

   this ._range .setUnit ("length");

   // Private properties

   this .unload           = false;
   this .rootGroupNode    = new (external_X_ITE_X3D_Group_default()) (this .getBrowser () .getPrivateScene ());
   this .rootInlineNode   = new (external_X_ITE_X3D_Inline_default()) (executionContext);
   this .child1InlineNode = new (external_X_ITE_X3D_Inline_default()) (executionContext);
   this .child2InlineNode = new (external_X_ITE_X3D_Inline_default()) (executionContext);
   this .child3InlineNode = new (external_X_ITE_X3D_Inline_default()) (executionContext);
   this .child4InlineNode = new (external_X_ITE_X3D_Inline_default()) (executionContext);
   this .childInlineNodes = [this .child1InlineNode, this .child2InlineNode, this .child3InlineNode, this .child4InlineNode];
   this .childrenLoaded   = false;
   this .keepCurrentLevel = false;
   this .modelViewMatrix  = new (external_X_ITE_X3D_Matrix4_default()) ();
}

Object .assign (Object .setPrototypeOf (GeoLOD .prototype, (external_X_ITE_X3D_X3DChildNode_default()).prototype),
   (external_X_ITE_X3D_X3DBoundedObject_default()).prototype,
   Geospatial_X3DGeospatialObject .prototype,
{
   initialize ()
   {
      external_X_ITE_X3D_X3DChildNode_default().prototype .initialize .call (this);
      external_X_ITE_X3D_X3DBoundedObject_default().prototype .initialize .call (this);
      Geospatial_X3DGeospatialObject .prototype .initialize .call (this);

      this ._rootNode .addFieldInterest (this .rootGroupNode ._children);

      this .rootGroupNode ._children = this ._rootNode;
      this .rootGroupNode .setPrivate (true);

      this .rootInlineNode ._loadState .addInterest ("set_rootLoadState__", this);

      for (const childInlineNode of this .childInlineNodes)
         childInlineNode ._loadState .addInterest ("set_childLoadState__", this);

      this ._rootUrl   .addFieldInterest (this .rootInlineNode   ._url);
      this ._child1Url .addFieldInterest (this .child1InlineNode ._url);
      this ._child2Url .addFieldInterest (this .child2InlineNode ._url);
      this ._child3Url .addFieldInterest (this .child3InlineNode ._url);
      this ._child4Url .addFieldInterest (this .child4InlineNode ._url);

      this .rootInlineNode ._load = true;

      for (const childInlineNode of this .childInlineNodes)
         childInlineNode ._load = false;

      this .rootInlineNode   ._url = this ._rootUrl;
      this .child1InlineNode ._url = this ._child1Url;
      this .child2InlineNode ._url = this ._child2Url;
      this .child3InlineNode ._url = this ._child3Url;
      this .child4InlineNode ._url = this ._child4Url;

      this .rootInlineNode .setup ();

      for (const childInlineNode of this .childInlineNodes)
         childInlineNode .setup ();
   },
   getBBox (bbox, shadows)
   {
      if (this .isDefaultBBoxSize ())
      {
         switch (this .childrenLoaded ? this ._level_changed .getValue () : 0)
         {
            case 0:
            {
               if (this ._rootNode .length)
                  return this .rootGroupNode .getBBox (bbox, shadows);

               return this .rootInlineNode .getBBox (bbox, shadows);
            }
            case 1:
            {
               return external_X_ITE_X3D_X3DBoundedObject_default().prototype .getBBox .call (this, this .childInlineNodes, bbox, shadows);
            }
         }
      }

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   set_rootLoadState__ ()
   {
      if (this ._level_changed .getValue () !== 0)
         return;

      if (this ._rootNode .length)
         return;

      if (this .rootInlineNode .checkLoadState () !== (external_X_ITE_X3D_X3DConstants_default()).COMPLETE_STATE)
         return;

      this .childrenLoaded = false;
      this ._children      = this .rootInlineNode .getInternalScene () .getRootNodes ();
   },
   set_childLoadState__ ()
   {
      if (this ._level_changed .getValue () !== 1)
         return;

      const loaded = this .childInlineNodes .reduce ((previous, childInlineNode) =>
      {
         return previous + (childInlineNode .checkLoadState () === (external_X_ITE_X3D_X3DConstants_default()).COMPLETE_STATE ||
            childInlineNode .checkLoadState () === (external_X_ITE_X3D_X3DConstants_default()).FAILED_STATE);
      },
      0)

      if (loaded !== 4)
         return;

      this .childrenLoaded = true;
      this ._children      = this .childInlineNodes .flatMap (childInlineNode => Array .from (childInlineNode .getInternalScene () .getRootNodes ()));
   },
   set_childBoundedObject__ ()
   {
      this .setBoundedObject (this .childInlineNodes .some (childInlineNode => childInlineNode .isBoundedObject ()));
   },
   set_childPointingObject__ ()
   {
      this .setPointingObject (this .childInlineNodes .some (childInlineNode => childInlineNode .isPointingObject ()));
   },
   set_childCameraObject__ ()
   {
      this .setCameraObject (this .childInlineNodes .some (childInlineNode => childInlineNode .isCameraObject ()));
   },
   set_childPickableObject__ ()
   {
      this .setPickableObject (this .childInlineNodes .some (childInlineNode => childInlineNode .isPickableObject ()));
   },
   set_childCollisionObject__ ()
   {
      this .setCollisionObject (this .childInlineNodes .some (childInlineNode => childInlineNode .isCollisionObject ()));
   },
   set_childShadowObject__ ()
   {
      this .setShadowObject (this .childInlineNodes .some (childInlineNode => childInlineNode .isShadowObject ()));
   },
   getLevel (modelViewMatrix)
   {
      const distance = this .getDistance (modelViewMatrix);

      if (distance < this ._range .getValue ())
         return 1;

      return 0;
   },
   getDistance: (() =>
   {
      const center = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (modelViewMatrix)
      {
         modelViewMatrix .translate (this .getCoord (this ._center .getValue (), center));

         return modelViewMatrix .origin .magnitude ();
      };
   })(),
   traverse (type, renderObject)
   {
      switch (type)
      {
         case (external_X_ITE_X3D_TraverseType_default()).PICKING:
         {
            const
               browser          = this .getBrowser (),
               pickingHierarchy = browser .getPickingHierarchy ();

            pickingHierarchy .push (this);

            this .traverseChildren (type, renderObject);

            pickingHierarchy .pop ();
            return;
         }
         case (external_X_ITE_X3D_TraverseType_default()).DISPLAY:
         {
            const level = this .getLevel (this .modelViewMatrix .assign (renderObject .getModelViewMatrix () .get ()));

            if (level !== this ._level_changed .getValue ())
            {
               this ._level_changed = level;

               switch (level)
               {
                  case 0:
                  {
                     for (const childInlineNode of this .childInlineNodes)
                     {
                        childInlineNode ._isBoundedObject   .removeInterest ("set_childBoundedObject__",   this);
                        childInlineNode ._isPointingObject  .removeInterest ("set_childPointingObject__",  this);
                        childInlineNode ._isCameraObject    .removeInterest ("set_childCameraObject__",    this);
                        childInlineNode ._isPickableObject  .removeInterest ("set_childPickableObject__",  this);
                        childInlineNode ._isCollisionObject .removeInterest ("set_childCollisionObject__", this);
                        childInlineNode ._isShadowObject    .removeInterest ("set_childShadowObject__",    this);
                     }

                     if (this ._rootNode .length)
                     {
                        this .connectChildNode (this .rootGroupNode, [(external_X_ITE_X3D_TraverseType_default()).DISPLAY]);

                        this ._children      = this ._rootNode;
                        this .childrenLoaded = false;
                     }
                     else
                     {
                        if (this .rootInlineNode .checkLoadState () == (external_X_ITE_X3D_X3DConstants_default()).COMPLETE_STATE)
                        {
                           this .connectChildNode (this .rootInlineNode, [(external_X_ITE_X3D_TraverseType_default()).DISPLAY]);

                           this ._children      = this .rootInlineNode .getInternalScene () .getRootNodes ();
                           this .childrenLoaded = false;
                        }
                     }

                     if (this .unload)
                     {
                        for (const childInlineNode of this .childInlineNodes)
                           childInlineNode ._load = false;
                     }

                     break;
                  }
                  case 1:
                  {
                     if (this ._rootNode .length)
                        this .disconnectChildNode (this .rootGroupNode);
                     else
                        this .disconnectChildNode (this .rootInlineNode);

                     for (const childInlineNode of this .childInlineNodes)
                     {
                        childInlineNode ._isBoundedObject   .addInterest ("set_childBoundedObject__",   this);
                        childInlineNode ._isPointingObject  .addInterest ("set_childPointingObject__",  this);
                        childInlineNode ._isCameraObject    .addInterest ("set_childCameraObject__",    this);
                        childInlineNode ._isPickableObject  .addInterest ("set_childPickableObject__",  this);
                        childInlineNode ._isCollisionObject .addInterest ("set_childCollisionObject__", this);
                        childInlineNode ._isShadowObject    .addInterest ("set_childShadowObject__",    this);
                     }

                     this .set_childBoundedObject__ ();
                     this .set_childPointingObject__ ();
                     this .set_childCameraObject__ ();
                     this .set_childPickableObject__ ();
                     this .set_childCollisionObject__ ();
                     this .set_childShadowObject__ ();

                     if (this .child1InlineNode ._load .getValue ())
                     {
                        this .set_childLoadState__ ();
                     }
                     else
                     {
                        for (const childInlineNode of this .childInlineNodes)
                           childInlineNode ._load = true;
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
   traverseChildren (type, renderObject)
   {
      switch (this .childrenLoaded ? this ._level_changed .getValue () : 0)
      {
         case 0:
         {
            if (this ._rootNode .length)
               this .rootGroupNode .traverse (type, renderObject);
            else
               this .rootInlineNode .traverse (type, renderObject);

            break;
         }
         case 1:
         {
            for (const childInlineNode of this .childInlineNodes)
               childInlineNode .traverse (type, renderObject);

            break;
         }
      }
   },
   dispose ()
   {
      Geospatial_X3DGeospatialObject .prototype .dispose .call (this);
      external_X_ITE_X3D_X3DBoundedObject_default().prototype .dispose .call (this);
      external_X_ITE_X3D_X3DChildNode_default().prototype .dispose .call (this);
   },
});

Object .defineProperties (GeoLOD,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("GeoLOD", "Geospatial", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",      new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "geoOrigin",     new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "geoSystem",     new (external_X_ITE_X3D_Fields_default()).MFString ("GD", "WE")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "rootUrl",       new (external_X_ITE_X3D_Fields_default()).MFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "child1Url",     new (external_X_ITE_X3D_Fields_default()).MFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "child2Url",     new (external_X_ITE_X3D_Fields_default()).MFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "child3Url",     new (external_X_ITE_X3D_Fields_default()).MFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "child4Url",     new (external_X_ITE_X3D_Fields_default()).MFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "center",        new (external_X_ITE_X3D_Fields_default()).SFVec3d ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "range",         new (external_X_ITE_X3D_Fields_default()).SFFloat (10)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "level_changed", new (external_X_ITE_X3D_Fields_default()).SFInt32 (-1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "visible",       new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "bboxDisplay",   new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxSize",      new (external_X_ITE_X3D_Fields_default()).SFVec3f (-1, -1, -1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxCenter",    new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "rootNode",      new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "children",      new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const GeoLOD_default_ = GeoLOD;
;

/* harmony default export */ const Geospatial_GeoLOD = (external_X_ITE_X3D_Namespace_default().add ("GeoLOD", GeoLOD_default_));
;// external "__X_ITE_X3D__ .X3DTransformMatrix3DNode"
const external_X_ITE_X3D_X3DTransformMatrix3DNode_namespaceObject = __X_ITE_X3D__ .X3DTransformMatrix3DNode;
var external_X_ITE_X3D_X3DTransformMatrix3DNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DTransformMatrix3DNode_namespaceObject);
;// ./src/x_ite/Components/Geospatial/GeoLocation.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/










function GeoLocation (executionContext)
{
   external_X_ITE_X3D_X3DTransformMatrix3DNode_default().call (this, executionContext);
   Geospatial_X3DGeospatialObject      .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).GeoLocation);
}

Object .assign (Object .setPrototypeOf (GeoLocation .prototype, (external_X_ITE_X3D_X3DTransformMatrix3DNode_default()).prototype),
   Geospatial_X3DGeospatialObject .prototype,
{
   initialize ()
   {
      external_X_ITE_X3D_X3DTransformMatrix3DNode_default().prototype .initialize .call (this);
      Geospatial_X3DGeospatialObject      .prototype .initialize .call (this);

      this .addInterest ("eventsProcessed", this);

      this .eventsProcessed ();
   },
   eventsProcessed: (() =>
   {
      const locationMatrix = new (external_X_ITE_X3D_Matrix4_default()) ();

      return function ()
      {
         this .setMatrix (this .getLocationMatrix (this ._geoCoords .getValue (), locationMatrix));
      };
   })(),
   dispose ()
   {
      Geospatial_X3DGeospatialObject      .prototype .dispose .call (this);
      external_X_ITE_X3D_X3DTransformMatrix3DNode_default().prototype .dispose .call (this);
   },
});

Object .defineProperties (GeoLocation,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("GeoLocation", "Geospatial", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",       new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "geoOrigin",      new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "geoSystem",      new (external_X_ITE_X3D_Fields_default()).MFString ("GD", "WE")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "geoCoords",      new (external_X_ITE_X3D_Fields_default()).SFVec3d ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "visible",        new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "bboxDisplay",    new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxSize",       new (external_X_ITE_X3D_Fields_default()).SFVec3f (-1, -1, -1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxCenter",     new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "addChildren",    new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "removeChildren", new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "children",       new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const GeoLocation_default_ = GeoLocation;
;

/* harmony default export */ const Geospatial_GeoLocation = (external_X_ITE_X3D_Namespace_default().add ("GeoLocation", GeoLocation_default_));
;// external "__X_ITE_X3D__ .X3DInfoNode"
const external_X_ITE_X3D_X3DInfoNode_namespaceObject = __X_ITE_X3D__ .X3DInfoNode;
var external_X_ITE_X3D_X3DInfoNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DInfoNode_namespaceObject);
;// external "__X_ITE_X3D__ .X3DUrlObject"
const external_X_ITE_X3D_X3DUrlObject_namespaceObject = __X_ITE_X3D__ .X3DUrlObject;
var external_X_ITE_X3D_X3DUrlObject_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DUrlObject_namespaceObject);
;// ./src/x_ite/Components/Geospatial/GeoMetadata.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/









function GeoMetadata (executionContext)
{
   external_X_ITE_X3D_X3DInfoNode_default().call (this, executionContext);
   external_X_ITE_X3D_X3DUrlObject_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).GeoMetadata);
}

Object .assign (Object .setPrototypeOf (GeoMetadata .prototype, (external_X_ITE_X3D_X3DInfoNode_default()).prototype),
   (external_X_ITE_X3D_X3DUrlObject_default()).prototype,
{
   initialize ()
   {
      external_X_ITE_X3D_X3DInfoNode_default().prototype .initialize .call (this);
      external_X_ITE_X3D_X3DUrlObject_default().prototype .initialize .call (this);
   },
   async requestImmediateLoad (cache = true)
   { },
   dispose ()
   {
      external_X_ITE_X3D_X3DUrlObject_default().prototype .dispose .call (this);
      external_X_ITE_X3D_X3DInfoNode_default().prototype .dispose .call (this);
   },
});

Object .defineProperties (GeoMetadata,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("GeoMetadata", "Geospatial", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",             new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "description",          new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "load",                 new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "url",                  new (external_X_ITE_X3D_Fields_default()).MFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "autoRefresh",          new (external_X_ITE_X3D_Fields_default()).SFTime (0)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "autoRefreshTimeLimit", new (external_X_ITE_X3D_Fields_default()).SFTime (3600)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "summary",              new (external_X_ITE_X3D_Fields_default()).MFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "data",                 new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const GeoMetadata_default_ = GeoMetadata;
;

/* harmony default export */ const Geospatial_GeoMetadata = (external_X_ITE_X3D_Namespace_default().add ("GeoMetadata", GeoMetadata_default_));
;// ./src/x_ite/Components/Geospatial/GeoOrigin.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/








function GeoOrigin (executionContext)
{
   external_X_ITE_X3D_X3DNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).GeoOrigin);

   this .radians = false;
}

Object .assign (Object .setPrototypeOf (GeoOrigin .prototype, (external_X_ITE_X3D_X3DNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DNode_default().prototype .initialize .call (this);

      this ._geoSystem .addInterest ("set_geoSystem__", this);

      this .set_geoSystem__ ();
   },
   set_geoSystem__ ()
   {
      this .referenceFrame = Geospatial_GeospatialObject .getReferenceFrame (this ._geoSystem, this .radians);
   },
   getOrigin (result)
   {
      return this .referenceFrame .convert (this ._geoCoords .getValue (), result);
   },
});

Object .defineProperties (GeoOrigin,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("GeoOrigin", "Geospatial", 1, "geoOrigin", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",  new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "geoSystem", new (external_X_ITE_X3D_Fields_default()).MFString ("GD", "WE")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "geoCoords", new (external_X_ITE_X3D_Fields_default()).SFVec3d ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "rotateYUp", new (external_X_ITE_X3D_Fields_default()).SFBool ()),
      ]),
      enumerable: true,
   },
});

const GeoOrigin_default_ = GeoOrigin;
;

/* harmony default export */ const Geospatial_GeoOrigin = (external_X_ITE_X3D_Namespace_default().add ("GeoOrigin", GeoOrigin_default_));
;// external "__X_ITE_X3D__ .X3DInterpolatorNode"
const external_X_ITE_X3D_X3DInterpolatorNode_namespaceObject = __X_ITE_X3D__ .X3DInterpolatorNode;
var external_X_ITE_X3D_X3DInterpolatorNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DInterpolatorNode_namespaceObject);
;// ./src/x_ite/Components/Geospatial/GeoPositionInterpolator.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/











function GeoPositionInterpolator (executionContext)
{
   external_X_ITE_X3D_X3DInterpolatorNode_default().call (this, executionContext);
   Geospatial_X3DGeospatialObject .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).GeoPositionInterpolator);

   // Units

   this ._value_changed .setUnit ("length");

   // Private properties
   
   this .geocentric = new Geospatial_Geocentric ();
}

Object .assign (Object .setPrototypeOf (GeoPositionInterpolator .prototype, (external_X_ITE_X3D_X3DInterpolatorNode_default()).prototype),
   Geospatial_X3DGeospatialObject .prototype,
{
   setup ()
   {
      Geospatial_X3DGeospatialObject .prototype .initialize .call (this);

      external_X_ITE_X3D_X3DInterpolatorNode_default().prototype .setup .call (this);
   },
   initialize ()
   {
      external_X_ITE_X3D_X3DInterpolatorNode_default().prototype .initialize .call (this);

      this ._keyValue .addInterest ("set_keyValue__", this);
   },
   set_keyValue__ ()
   {
      const
         key      = this ._key,
         keyValue = this ._keyValue;

      if (keyValue .length < key .length)
         keyValue .resize (key .length, keyValue .length ? keyValue [keyValue .length - 1] : new (external_X_ITE_X3D_Fields_default()).SFVec3f ());
   },
   interpolate: (() =>
   {
      const
         keyValue0 = new (external_X_ITE_X3D_Vector3_default()) (),
         keyValue1 = new (external_X_ITE_X3D_Vector3_default()) (),
         geovalue  = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (index0, index1, weight)
      {
         this .getCoord (this ._keyValue [index0] .getValue (), keyValue0);
         this .getCoord (this ._keyValue [index1] .getValue (), keyValue1);

         const coord = this .geocentric .slerp (keyValue0, keyValue1, weight);

         this ._geovalue_changed = this .getGeoCoord (coord, geovalue);
         this ._value_changed    = coord;
      };
   })(),
   dispose ()
   {
      Geospatial_X3DGeospatialObject .prototype .dispose .call (this);
      external_X_ITE_X3D_X3DInterpolatorNode_default().prototype .dispose .call (this);
   },
});

Object .defineProperties (GeoPositionInterpolator,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("GeoPositionInterpolator", "Geospatial", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "geoOrigin",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "geoSystem",        new (external_X_ITE_X3D_Fields_default()).MFString ("GD", "WE")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "set_fraction",     new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "key",              new (external_X_ITE_X3D_Fields_default()).MFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "keyValue",         new (external_X_ITE_X3D_Fields_default()).MFVec3d ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "value_changed",    new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "geovalue_changed", new (external_X_ITE_X3D_Fields_default()).SFVec3d ()),
      ]),
      enumerable: true,
   },
});

const GeoPositionInterpolator_default_ = GeoPositionInterpolator;
;

/* harmony default export */ const Geospatial_GeoPositionInterpolator = (external_X_ITE_X3D_Namespace_default().add ("GeoPositionInterpolator", GeoPositionInterpolator_default_));
;// external "__X_ITE_X3D__ .X3DEnvironmentalSensorNode"
const external_X_ITE_X3D_X3DEnvironmentalSensorNode_namespaceObject = __X_ITE_X3D__ .X3DEnvironmentalSensorNode;
var external_X_ITE_X3D_X3DEnvironmentalSensorNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DEnvironmentalSensorNode_namespaceObject);
;// external "__X_ITE_X3D__ .ProximitySensor"
const external_X_ITE_X3D_ProximitySensor_namespaceObject = __X_ITE_X3D__ .ProximitySensor;
var external_X_ITE_X3D_ProximitySensor_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_ProximitySensor_namespaceObject);
;// ./src/x_ite/Components/Geospatial/GeoProximitySensor.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/











function GeoProximitySensor (executionContext)
{
   external_X_ITE_X3D_X3DEnvironmentalSensorNode_default().call (this, executionContext);
   Geospatial_X3DGeospatialObject        .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).GeoProximitySensor);

   // Units

   this ._position_changed         .setUnit ("length");
   this ._centerOfRotation_changed .setUnit ("length");

   // Private properties

   this .proximitySensor = new (external_X_ITE_X3D_ProximitySensor_default()) (executionContext);
}

Object .assign (Object .setPrototypeOf (GeoProximitySensor .prototype, (external_X_ITE_X3D_X3DEnvironmentalSensorNode_default()).prototype),
   Geospatial_X3DGeospatialObject .prototype,
{
   initialize ()
   {
      external_X_ITE_X3D_X3DEnvironmentalSensorNode_default().prototype .initialize .call (this);
      Geospatial_X3DGeospatialObject        .prototype .initialize .call (this);

      this ._enabled .addFieldInterest (this .proximitySensor ._enabled);
      this ._size    .addFieldInterest (this .proximitySensor ._size);
      this ._center  .addFieldInterest (this .proximitySensor ._center);

      this ._geoCenter .addFieldInterest (this ._center);

      this .proximitySensor ._isActive                 .addFieldInterest (this ._isActive);
      this .proximitySensor ._enterTime                .addFieldInterest (this ._enterTime);
      this .proximitySensor ._exitTime                 .addFieldInterest (this ._exitTime);
      this .proximitySensor ._position_changed         .addFieldInterest (this ._position_changed);
      this .proximitySensor ._orientation_changed      .addFieldInterest (this ._orientation_changed);
      this .proximitySensor ._centerOfRotation_changed .addFieldInterest (this ._centerOfRotation_changed);

      this .proximitySensor ._position_changed .addInterest ("set_position__", this);

      this .proximitySensor ._enabled = this ._enabled;
      this .proximitySensor ._size    = this ._size;
      this .proximitySensor ._center  = this ._center;

      this .proximitySensor .setup ();

      this .connectChildNode (this .proximitySensor);
   },
   set_position__: (() =>
   {
      const geoCoord = new (external_X_ITE_X3D_Vector3_default()) ();

      return function ()
      {
         this ._geoCoord_changed = this .getGeoCoord (this .proximitySensor ._position_changed .getValue (), geoCoord);
      };
   })(),
   traverse (type, renderObject)
   {
      this .proximitySensor .traverse (type, renderObject);
   },
   dispose ()
   {
      Geospatial_X3DGeospatialObject        .prototype .dispose .call (this);
      external_X_ITE_X3D_X3DEnvironmentalSensorNode_default().prototype .dispose .call (this);
   },
});

Object .defineProperties (GeoProximitySensor,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("GeoProximitySensor", "Geospatial", 2, "children", "3.2"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",                 new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "description",              new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "geoOrigin",                new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "geoSystem",                new (external_X_ITE_X3D_Fields_default()).MFString ("GD", "WE")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "enabled",                  new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "size",                     new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "center",                   new (external_X_ITE_X3D_Fields_default()).SFVec3d ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "geoCenter",                new (external_X_ITE_X3D_Fields_default()).SFVec3d ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "isActive",                 new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "enterTime",                new (external_X_ITE_X3D_Fields_default()).SFTime ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "exitTime",                 new (external_X_ITE_X3D_Fields_default()).SFTime ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "geoCoord_changed",         new (external_X_ITE_X3D_Fields_default()).SFVec3d ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "position_changed",         new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "orientation_changed",      new (external_X_ITE_X3D_Fields_default()).SFRotation ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "centerOfRotation_changed", new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
      ]),
      enumerable: true,
   },
});

const GeoProximitySensor_default_ = GeoProximitySensor;
;

/* harmony default export */ const Geospatial_GeoProximitySensor = (external_X_ITE_X3D_Namespace_default().add ("GeoProximitySensor", GeoProximitySensor_default_));
;// external "__X_ITE_X3D__ .X3DTouchSensorNode"
const external_X_ITE_X3D_X3DTouchSensorNode_namespaceObject = __X_ITE_X3D__ .X3DTouchSensorNode;
var external_X_ITE_X3D_X3DTouchSensorNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DTouchSensorNode_namespaceObject);
;// ./src/x_ite/Components/Geospatial/GeoTouchSensor.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/










function GeoTouchSensor (executionContext)
{
   external_X_ITE_X3D_X3DTouchSensorNode_default().call (this, executionContext);
   Geospatial_X3DGeospatialObject .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).GeoTouchSensor);

   // Units

   this ._hitPoint_changed .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (GeoTouchSensor .prototype, (external_X_ITE_X3D_X3DTouchSensorNode_default()).prototype),
   Geospatial_X3DGeospatialObject .prototype,
{
   initialize ()
   {
      external_X_ITE_X3D_X3DTouchSensorNode_default().prototype .initialize .call (this);
      Geospatial_X3DGeospatialObject .prototype .initialize .call (this);
   },
   set_over__: (() =>
   {
      const geoCoords = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (over, hit, modelViewMatrix, projectionMatrix, viewport)
      {
         external_X_ITE_X3D_X3DTouchSensorNode_default().prototype .set_over__ .call (this, over, hit, modelViewMatrix, projectionMatrix, viewport);

         if (this ._isOver .getValue ())
            this ._hitGeoCoord_changed = this .getGeoCoord (this ._hitPoint_changed .getValue (), geoCoords);
      };
   })(),
   dispose ()
   {
      Geospatial_X3DGeospatialObject .prototype .dispose .call (this);
      external_X_ITE_X3D_X3DTouchSensorNode_default().prototype .dispose .call (this);
   },
});

Object .defineProperties (GeoTouchSensor,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("GeoTouchSensor", "Geospatial", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",            new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "description",         new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "geoOrigin",           new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "geoSystem",           new (external_X_ITE_X3D_Fields_default()).MFString ("GD", "WE")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "enabled",             new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "hitTexCoord_changed", new (external_X_ITE_X3D_Fields_default()).SFVec2f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "hitNormal_changed",   new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "hitPoint_changed",    new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "hitGeoCoord_changed", new (external_X_ITE_X3D_Fields_default()).SFVec3d ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "isOver",              new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "isActive",            new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "touchTime",           new (external_X_ITE_X3D_Fields_default()).SFTime ()),
      ]),
      enumerable: true,
   },
});

const GeoTouchSensor_default_ = GeoTouchSensor;
;

/* harmony default export */ const Geospatial_GeoTouchSensor = (external_X_ITE_X3D_Namespace_default().add ("GeoTouchSensor", GeoTouchSensor_default_));
;// ./src/x_ite/Components/Geospatial/GeoTransform.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/










function GeoTransform (executionContext)
{
   external_X_ITE_X3D_X3DTransformMatrix3DNode_default().call (this, executionContext);
   Geospatial_X3DGeospatialObject      .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).GeoTransform);

   // Units

   this ._translation .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (GeoTransform .prototype, (external_X_ITE_X3D_X3DTransformMatrix3DNode_default()).prototype),
   Geospatial_X3DGeospatialObject .prototype,
{
   initialize ()
   {
      external_X_ITE_X3D_X3DTransformMatrix3DNode_default().prototype .initialize .call (this);
      Geospatial_X3DGeospatialObject      .prototype .initialize .call (this);

      this .addInterest ("eventsProcessed", this);

      this .eventsProcessed ();
   },
   eventsProcessed: (() =>
   {
      const
         matrix         = new (external_X_ITE_X3D_Matrix4_default()) (),
         locationMatrix = new (external_X_ITE_X3D_Matrix4_default()) ();

      return function ()
      {
         this .getLocationMatrix (this ._geoCenter .getValue (), locationMatrix);

         matrix .set (this ._translation        .getValue (),
                        this ._rotation         .getValue (),
                        this ._scale            .getValue (),
                        this ._scaleOrientation .getValue ());

         this .setMatrix (matrix .multRight (locationMatrix) .multLeft (locationMatrix .inverse ()));
      };
   })(),
   dispose ()
   {
      Geospatial_X3DGeospatialObject      .prototype .dispose .call (this);
      external_X_ITE_X3D_X3DTransformMatrix3DNode_default().prototype .dispose .call (this);
   },
});

Object .defineProperties (GeoTransform,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("GeoTransform", "Geospatial", 2, "children", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "translation",      new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "rotation",         new (external_X_ITE_X3D_Fields_default()).SFRotation ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "scale",            new (external_X_ITE_X3D_Fields_default()).SFVec3f (1, 1, 1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "scaleOrientation", new (external_X_ITE_X3D_Fields_default()).SFRotation ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "geoOrigin",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "geoSystem",        new (external_X_ITE_X3D_Fields_default()).MFString ("GD", "WE")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "geoCenter",        new (external_X_ITE_X3D_Fields_default()).SFVec3d ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "visible",          new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "bboxDisplay",      new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxSize",         new (external_X_ITE_X3D_Fields_default()).SFVec3f (-1, -1, -1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxCenter",       new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "addChildren",      new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "removeChildren",   new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "children",         new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const GeoTransform_default_ = GeoTransform;
;

/* harmony default export */ const Geospatial_GeoTransform = (external_X_ITE_X3D_Namespace_default().add ("GeoTransform", GeoTransform_default_));
;// external "__X_ITE_X3D__ .X3DViewpointNode"
const external_X_ITE_X3D_X3DViewpointNode_namespaceObject = __X_ITE_X3D__ .X3DViewpointNode;
var external_X_ITE_X3D_X3DViewpointNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DViewpointNode_namespaceObject);
;// external "__X_ITE_X3D__ .Viewpoint"
const external_X_ITE_X3D_Viewpoint_namespaceObject = __X_ITE_X3D__ .Viewpoint;
var external_X_ITE_X3D_Viewpoint_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Viewpoint_namespaceObject);
;// external "__X_ITE_X3D__ .NavigationInfo"
const external_X_ITE_X3D_NavigationInfo_namespaceObject = __X_ITE_X3D__ .NavigationInfo;
var external_X_ITE_X3D_NavigationInfo_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_NavigationInfo_namespaceObject);
;// external "__X_ITE_X3D__ .Rotation4"
const external_X_ITE_X3D_Rotation4_namespaceObject = __X_ITE_X3D__ .Rotation4;
var external_X_ITE_X3D_Rotation4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Rotation4_namespaceObject);
;// ./src/x_ite/Components/Geospatial/GeoViewpoint.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/














function GeoViewpoint (executionContext)
{
   external_X_ITE_X3D_X3DViewpointNode_default().call (this, executionContext);
   Geospatial_X3DGeospatialObject .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).GeoViewpoint);

   this .addChildObjects ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "navType",   new (external_X_ITE_X3D_Fields_default()).MFString ("EXAMINE", "ANY"),
                          (external_X_ITE_X3D_X3DConstants_default()).inputOutput, "headlight", new (external_X_ITE_X3D_Fields_default()).SFBool (true));

   // Units

   this ._centerOfRotation .setUnit ("length");
   this ._fieldOfView      .setUnit ("angle");

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.2)
   {
      this .addAlias ("navType",   this ._navType);
      this .addAlias ("headlight", this ._headlight);

      this .traverse = traverse;
   }

   // Private properties

   this .geoNavigationInfoNode = new (external_X_ITE_X3D_NavigationInfo_default()) (executionContext);
   this .projectionMatrix      = new (external_X_ITE_X3D_Matrix4_default()) ();
   this .elevation             = 0;
}

Object .assign (Object .setPrototypeOf (GeoViewpoint .prototype, (external_X_ITE_X3D_X3DViewpointNode_default()).prototype),
   Geospatial_X3DGeospatialObject .prototype,
{
   initialize ()
   {
      external_X_ITE_X3D_X3DViewpointNode_default().prototype .initialize .call (this);
      Geospatial_X3DGeospatialObject .prototype .initialize .call (this);

      // Logarithmic depth buffer support

      const gl = this .getBrowser () .getContext ();

      this .logarithmicDepthBuffer = gl .HAS_FEATURE_FRAG_DEPTH;

      // Fields

      this ._position       .addInterest ("set_position__", this);
      this ._positionOffset .addInterest ("set_position__", this);
      this ._navType        .addFieldInterest (this .geoNavigationInfoNode ._type);
      this ._headlight      .addFieldInterest (this .geoNavigationInfoNode ._headlight);

      this .geoNavigationInfoNode ._type      = this ._navType;
      this .geoNavigationInfoNode ._headlight = this ._headlight;

      this .geoNavigationInfoNode .setup ();

      if (this .getExecutionContext () .getSpecificationVersion () <= 3.2)
         this ._navigationInfo = this .geoNavigationInfoNode;

      this .set_position__ ();
   },
   getRelativeTransformation: (external_X_ITE_X3D_Viewpoint_default()).prototype .getRelativeTransformation,
   setInterpolators: (external_X_ITE_X3D_Viewpoint_default()).prototype .setInterpolators,
   getFieldOfView: (external_X_ITE_X3D_Viewpoint_default()).prototype .getFieldOfView,
   setFieldOfView: (external_X_ITE_X3D_Viewpoint_default()).prototype .setFieldOfView,
   getUserFieldOfView: (external_X_ITE_X3D_Viewpoint_default()).prototype .getUserFieldOfView,
   getScreenScale: (external_X_ITE_X3D_Viewpoint_default()).prototype .getScreenScale,
   getViewportSize: (external_X_ITE_X3D_Viewpoint_default()).prototype .getViewportSize,
   getLookAtDistance: (external_X_ITE_X3D_Viewpoint_default()).prototype .getLookAtDistance,
   getProjectionMatrixWithLimits: (external_X_ITE_X3D_Viewpoint_default()).prototype .getProjectionMatrixWithLimits,
   getLogarithmicDepthBuffer ()
   {
      return this .logarithmicDepthBuffer;
   },
   getPosition: (() =>
   {
      const position = new (external_X_ITE_X3D_Vector3_default()) ();

      return function ()
      {
         return this .getCoord (this ._position .getValue (), position);
      };
   })(),
   setPosition: (() =>
   {
      const geoPosition = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (value)
      {
         this ._position .setValue (this .getGeoCoord (value, geoPosition));
      };
   })(),
   set_position__: (() =>
   {
      const position = new (external_X_ITE_X3D_Vector3_default()) ();

      return function ()
      {
         this .getCoord (this ._position .getValue (), position);

         this .elevation = this .getGeoElevation (position .add (this ._positionOffset .getValue ()));
      };
   })(),
   getOrientation: (() =>
   {
      const
         locationMatrix = new (external_X_ITE_X3D_Matrix4_default()) (),
         orientation    = new (external_X_ITE_X3D_Rotation4_default()) ();

      return function ()
      {
         ///  Returns the resulting orientation for this viewpoint.

         const rotationMatrix = this .getLocationMatrix (this ._position .getValue (), locationMatrix) .submatrix;

         orientation .setMatrix (rotationMatrix);

         return orientation .multLeft (this ._orientation .getValue ());
      };
   })(),
   setOrientation: (() =>
   {
      const
         locationMatrix = new (external_X_ITE_X3D_Matrix4_default()) (),
         geoOrientation = new (external_X_ITE_X3D_Rotation4_default()) ();

      return function (value)
      {
         ///  Returns the resulting orientation for this viewpoint.

         const rotationMatrix = this .getLocationMatrix (this ._position .getValue (), locationMatrix) .submatrix;

         geoOrientation .setMatrix (rotationMatrix);

         this ._orientation .setValue (geoOrientation .inverse () .multLeft (value));
      };
   })(),
   getCenterOfRotation: (() =>
   {
      const centerOfRotation = new (external_X_ITE_X3D_Vector3_default()) ();

      return function ()
      {
         return this .getCoord (this ._centerOfRotation .getValue (), centerOfRotation);
      };
   })(),
   setCenterOfRotation: (() =>
   {
      const geoCenterOfRotation = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (value)
      {
         this ._centerOfRotation .setValue (this .getGeoCoord (value, geoCenterOfRotation));
      };
   })(),
   getMaxFarValue ()
   {
      return 1e9;
   },
   getUpVector: (() =>
   {
      const
         position = new (external_X_ITE_X3D_Vector3_default()) (),
         upVector = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (dynamic = false)
      {
         if (!dynamic || this .getUserPosition () .magnitude () < 6.5e6)
         {
            this .getCoord (this ._position .getValue (), position);

            return this .getGeoUpVector (position .add (this ._positionOffset .getValue ()), upVector);
         }
         else
         {
            return upVector .assign ((external_X_ITE_X3D_Vector3_default()).zAxis);
         }
      };
   })(),
   getSpeedFactor ()
   {
      return (Math .max (this .elevation, 0.0) + 10) / 10 * this ._speedFactor .getValue ();
   },
   dispose ()
   {
      Geospatial_X3DGeospatialObject .prototype .dispose .call (this);
      external_X_ITE_X3D_X3DViewpointNode_default().prototype .dispose .call (this);
   },
});

function traverse (type, renderObject)
{
   external_X_ITE_X3D_X3DViewpointNode_default().prototype .traverse .call (this, type, renderObject);

   this .geoNavigationInfoNode .traverse (type, renderObject);
}

Object .defineProperties (GeoViewpoint,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("GeoViewpoint", "Geospatial", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",          new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "geoOrigin",         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "geoSystem",         new (external_X_ITE_X3D_Fields_default()).MFString ("GD", "WE")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "set_bind",          new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "description",       new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "position",          new (external_X_ITE_X3D_Fields_default()).SFVec3d (0, 0, 100000)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "orientation",       new (external_X_ITE_X3D_Fields_default()).SFRotation ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "centerOfRotation",  new (external_X_ITE_X3D_Fields_default()).SFVec3d ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "fieldOfView",       new (external_X_ITE_X3D_Fields_default()).SFFloat (0.785398)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "nearDistance",      new (external_X_ITE_X3D_Fields_default()).SFFloat (-1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "farDistance",       new (external_X_ITE_X3D_Fields_default()).SFFloat (-1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "viewAll",           new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "jump",              new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "retainUserOffsets", new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "speedFactor",       new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "isBound",           new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "bindTime",          new (external_X_ITE_X3D_Fields_default()).SFTime ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "navigationInfo",    new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const GeoViewpoint_default_ = GeoViewpoint;
;

/* harmony default export */ const Geospatial_GeoViewpoint = (external_X_ITE_X3D_Namespace_default().add ("GeoViewpoint", GeoViewpoint_default_));
;// ./src/assets/components/GeospatialComponent.js
/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/















external_X_ITE_X3D_Components_default().add ({
   name: "Geospatial",
   concreteNodes:
   [
      Geospatial_GeoCoordinate,
      Geospatial_GeoElevationGrid,
      Geospatial_GeoLOD,
      Geospatial_GeoLocation,
      Geospatial_GeoMetadata,
      Geospatial_GeoOrigin,
      Geospatial_GeoPositionInterpolator,
      Geospatial_GeoProximitySensor,
      Geospatial_GeoTouchSensor,
      Geospatial_GeoTransform,
      Geospatial_GeoViewpoint,
   ],
   abstractNodes:
   [
      Geospatial_X3DGeospatialObject,
   ],
});

const GeospatialComponent_default_ = undefined;
;

/* harmony default export */ const GeospatialComponent = (external_X_ITE_X3D_Namespace_default().add ("GeospatialComponent", GeospatialComponent_default_));
/******/ })()
;