const Algorithm =
{
   radians (value)
   {
      // Convert degrees to radians.
      return value * (Math .PI / 180);
   },
   degrees (value)
   {
      // Convert radians to degrees.
      return value * (180 / Math .PI);
   },
   random (min, max)
   {
      return min + Math .random () * (max - min);
   },
   fract (value)
   {
      return value % 1;
   },
   clamp (value, min, max)
   {
      // https://registry.khronos.org/OpenGL-Refpages/gl4/html/clamp.xhtml
      return Math .min (Math .max (value, min), max);
   },
   interval (value, low, high)
   {
      if (value >= high)
         return ((value - low) % (high - low)) + low;

      if (value < low)
         return ((value - high) % (high - low)) + high;

      return value;
   },
   project (value, fromLow, fromHigh, toLow, toHigh)
   {
      return toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow);
   },
   roundToMultiple (value, multiple)
   {
      return Math .ceil (value / multiple) * multiple;
   },
   lerp (source, destination, t)
   {
      return source + t * (destination - source);
   },
   slerp (source, destination, t)
   {
      let cosom = source .dot (destination);

      // if (cosom <= -1) ... vectors are inverse colinear.
      // ; // This case is not handled.

      if (cosom >= 1) // Both normal vectors are equal.
         return source;

      if (cosom < 0)
      {
         // Reverse signs so we travel the short way round.
         cosom = -cosom;
         destination .negate ();
      }

      const
         omega  = Math .acos (cosom),
         sinom  = Math .sin  (omega),
         scale0 = Math .sin ((1 - t) * omega) / sinom,
         scale1 = Math .sin (t * omega) / sinom;

      source .x = source .x * scale0 + destination .x * scale1;
      source .y = source .y * scale0 + destination .y * scale1;
      source .z = source .z * scale0 + destination .z * scale1;
      source .w = source .w * scale0 + destination .w * scale1;

      return source;
   },
   simpleSlerp (source, destination, t)
   {
      const cosom = source .dot (destination);

      // if (cosom <= -1) ... vectors are inverse colinear.

      if (cosom >= 1) // Both normal vectors are equal.
         return source;

      const
         omega  = Math .acos (cosom),
         sinom  = Math .sin  (omega),
         scale0 = Math .sin ((1 - t) * omega) / sinom,
         scale1 = Math .sin (t * omega) / sinom;

      source .x = source .x * scale0 + destination .x * scale1;
      source .y = source .y * scale0 + destination .y * scale1;
      source .z = source .z * scale0 + destination .z * scale1;
      source .w = source .w * scale0 + destination .w * scale1;

      return source;
   },
   isPowerOfTwo (n)
   {
      return ((n - 1) & n) === 0;
   },
   nextPowerOfTwo (n)
   {
      ///  Returns the next power of two of @a n. If n is a power of two, n is returned.

      if (Algorithm .isPowerOfTwo (n))
         return n;

      return 1 << (32 - Math .clz32 (n));
   },
   bitCount (n)
   {
      n = n - ((n >>> 1) & 0x55555555);
      n = (n & 0x33333333) + ((n >>> 2) & 0x33333333);
      return ((n + (n >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24;
   },
   cmp (lhs, rhs)
   {
      return lhs > rhs ? 1 : lhs < rhs ? -1 : 0;
   },
   less (lhs, rhs)
   {
      return lhs < rhs;
   },
   greater (lhs, rhs)
   {
      return lhs > rhs;
   },
   lowerBound (array, first, last, value, comp = Algorithm.less)
   {
      // https://en.cppreference.com/w/cpp/algorithm/lower_bound

      let
         index = 0,
         step  = 0,
         count = last - first;

      while (count > 0)
      {
         step  = count >>> 1;
         index = first + step;

         if (comp (array [index], value))
         {
            first  = ++ index;
            count -= step + 1;
         }
         else
            count = step;
      }

      return first;
   },
   upperBound (array, first, last, value, comp = Algorithm.less)
   {
      // sen.cppreference.com/w/cpp/algorithm/upper_bound

      let
         index = 0,
         step  = 0,
         count = last - first;

      while (count > 0)
      {
         step  = count >>> 1;
         index = first + step;

         if (comp (value, array [index]))
            count = step;

         else
         {
            first  = ++ index;
            count -= step + 1;
         }
      }

      return first;
   },
};

export default Algorithm;
