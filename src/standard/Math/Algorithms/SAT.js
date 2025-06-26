const
   extents1 = { min: 0, max: 0 },
   extents2 = { min: 0, max: 0 };

/**
 *  Class to represent the Separating Axis Theorem.
 */
function SAT () { }

SAT .isSeparated = function (axes, points1, points2)
{
   // https://gamedev.stackexchange.com/questions/25397/obb-vs-obb-collision-detection

   for (const axis of axes)
   {
      project (points1, axis, extents1);
      project (points2, axis, extents2);

      if (overlaps (extents1 .min, extents1 .max, extents2 .min, extents2 .max))
         continue;

      return true;
   }

   return false;
};

///  Projects @a points to @a axis and returns the minimum and maximum bounds.
function project (points, axis, extents)
{
   extents .min = Number .POSITIVE_INFINITY;
   extents .max = Number .NEGATIVE_INFINITY;

   for (const point of points)
   {
      // Just dot it to get the min and max along this axis.
      // NOTE: the axis must be normalized to get accurate projections to calculate the MTV, but if it is only needed to
      // know whether it overlaps, every axis can be used.

      const dotVal = point .dot (axis);

      if (dotVal < extents .min)
         extents .min = dotVal;

      if (dotVal > extents .max)
         extents .max = dotVal;
   }
}

///  Returns true if both ranges overlap, otherwise false.
function overlaps (min1, max1, min2, max2)
{
   return is_between (min2, min1, max1) || is_between (min1, min2, max2);
}

///  Returns true if @a value is between @a lowerBound and @a upperBound, otherwise false.
function is_between (value, lowerBound, upperBound)
{
   return lowerBound <= value && value <= upperBound;
}

export default SAT;
