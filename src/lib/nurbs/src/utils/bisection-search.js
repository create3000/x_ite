export default function bisect (x, t, imin, imax)
{
   let
      lo = imin === undefined ? 0 : imin,
      hi = imax === undefined ? x .length - 1 : imax;

   while (hi - 1 > lo)
   {
      const m = Math .floor (0.5 * (hi + lo));

      if (x [m] > t)
         hi = m;
      else
         lo = m;

   }

   while (lo < imax && x [lo] === x [lo + 1])
      ++ lo;

   return lo;
};
