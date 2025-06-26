import Matrix3 from "../Numbers/Matrix3.js";
import Vector2 from "../Numbers/Vector2.js";

function Box2 (... args) /* size, center */
{
   this .matrix = new Matrix3 ();

   this .set (... args);
}

Object .assign (Box2 .prototype,
{
   copy ()
   {
      const copy = Object .create (Box2 .prototype);

      copy .matrix = this .matrix .copy ();

      return copy;
   },
   assign (box)
   {
      this .matrix .assign (box .matrix);

      return this;
   },
   equals (box)
   {
      return this .matrix .equals (box .matrix);
   },
   set (size, center)
   {
      switch (arguments .length)
      {
         case 0:
         {
            this .matrix .set (0, 0, 0,
                               0, 0, 0,
                               0, 0, 0);

            return this;
         }
         case 2:
         {
            this .matrix .set (size .x / 2, 0, 0,
                               0, size .y / 2, 0,
                               center .x, center .y, 1);

            return this;
         }
         // case 3:
         // {
         //    console .trace ()
         //    return this .setExtents (arguments [0], arguments [1]);
         // }
      }
   },
   setExtents (min, max)
   {
      const
         sx = (max .x - min .x) / 2,
         sy = (max .y - min .y) / 2,
         cx = (max .x + min .x) / 2,
         cy = (max .y + min .y) / 2;

      this .matrix .set (sx,  0, 0,
                          0, sy, 0,
                         cx, cy, 1);

      return this;
   },
   isEmpty ()
   {
      return this .matrix [8] === 0;
   },
   add: (() =>
   {
      const
         lhs_min = new Vector2 (),
         lhs_max = new Vector2 (),
         rhs_min = new Vector2 (),
         rhs_max = new Vector2 ();

      return function (box)
      {
         if (this .isEmpty ())
            return this .assign (box);

         if (box .isEmpty ())
            return this;

         this .getExtents (lhs_min, lhs_max);
         box  .getExtents (rhs_min, rhs_max);

         return this .setExtents (lhs_min .min (rhs_min), lhs_max .max (rhs_max));
      };
   })(),
   multLeft (matrix)
   {
      this .matrix .multLeft (matrix);
      return this;
   },
   multRight (matrix)
   {
      this .matrix .multRight (matrix);
      return this;
   },
   getExtents (min, max)
   {
      this .getAbsoluteExtents (min, max);

      min .add (this .center);
      max .add (this .center);
   },
   getAbsoluteExtents: (() =>
   {
      const p1 = new Vector2 ();

      return function (min, max)
      {
         const
            m = this .matrix,
            x = m .xAxis,
            y = m .yAxis;

         p1 .assign (x) .add (y);

         const p2 = y .subtract (x);

         min .assign (p1) .min (p2);
         max .assign (p1) .max (p2);

         p1 .negate ();
         p2 .negate ();

         min .min (p1, p2);
         max .max (p1, p2);
      };
   })(),
   containsPoint: (() =>
   {
      const
         min = new Vector2 (),
         max = new Vector2 ();

      return function (point)
      {
         this .getExtents (min, max);

         return min .x <= point .x &&
                max .x >= point .x &&
                min .y <= point .y &&
                max .y >= point .y;
      };
   })(),
   toString ()
   {
      return `${this .size}, ${this .center}`;
   },
});

Object .assign (Box2,
{
   Extents (min, max)
   {
      return new Box2 () .setExtents (min, max);
   },
   Points (points)
   {
      const
         min = new Vector2 (Number .POSITIVE_INFINITY),
         max = new Vector2 (Number .NEGATIVE_INFINITY);

      for (const point of points)
      {
         min .min (point);
         max .max (point);
      }

      return new Box2 () .setExtents (min, max);
   },
});

Object .defineProperties (Box2 .prototype,
{
   size:
   {
      get: (() =>
      {
         const
            min = new Vector2 (),
            max = new Vector2 ();

         return function ()
         {
            this .getAbsoluteExtents (min, max);

            return max .subtract (min);
         };
      })(),
      enumerable: true,
   },
   center:
   {
      get ()
      {
         return this .matrix .origin;
      },
      enumerable: true,
   },
});

export default Box2;
