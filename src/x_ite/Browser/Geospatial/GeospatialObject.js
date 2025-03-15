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

import ReferenceEllipsoids         from "../../../standard/Geospatial/ReferenceEllipsoids.js";
import Geodetic                    from "../../../standard/Geospatial/Geodetic.js";
import UniversalTransverseMercator from "../../../standard/Geospatial/UniversalTransverseMercator.js";
import Geocentric                  from "./Geocentric.js";

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

      return new Geodetic (ReferenceEllipsoids .get ("WE"), true, radians);
   },
   getElevationFrame (geoSystem, radians)
   {
      return new Geodetic (this .getEllipsoid (geoSystem), true, radians);
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
         const ellipsoid = ReferenceEllipsoids .get (gs);

         if (ellipsoid !== undefined)
            return ellipsoid;
      }

      return ReferenceEllipsoids .get ("WE");
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

export default GeospatialObject;
