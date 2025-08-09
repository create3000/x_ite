const
   EPS_H = 1e-3,
   EPS_P = 1e-10,
   IMAX  = 30;

function Geodetic (spheroid, latitudeFirst, radians)
{
   this .longitudeFirst = ! latitudeFirst;
   this .degrees        = ! radians;
   this .a              = spheroid .semiMajorAxis;
   this .c              = spheroid .semiMinorAxis;
   this .c2a2           = (spheroid .semiMinorAxis / this .a) ** 2;
   this .ecc2           = 1 - this .c2a2;
}

Object .assign (Geodetic .prototype,
{
   convert (geodetic, result)
   {
      const elevation = geodetic .z;

      let latitude, longitude;

      if (this .longitudeFirst)
      {
         latitude  = geodetic .y,
         longitude = geodetic .x;
      }
      else
      {
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

export default Geodetic;
