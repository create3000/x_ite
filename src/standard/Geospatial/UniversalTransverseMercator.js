import Geodetic  from "./Geodetic.js";
import Algorithm from "../Math/Algorithm.js";

const
   N0 = 1.0e7,
   E0 = 5.0e5,
   k0 = 0.9996;

function UniversalTransverseMercator (spheroid, zone, northernHemisphere, northingFirst)
{
   const
      a    = spheroid .semiMajorAxis,
      ecc2 = 1 - (spheroid .semiMinorAxis / a) ** 2,
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

export default UniversalTransverseMercator;
