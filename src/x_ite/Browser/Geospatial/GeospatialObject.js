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
