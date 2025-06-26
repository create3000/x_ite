import Vector3 from "../Numbers/Vector3.js";

function Sphere3 (radius = 1, center = Vector3 .Zero)
{
   this .center = new Vector3 ();

   this .set (radius, center);
}

Object .assign (Sphere3 .prototype,
{
   copy ()
   {
      const copy = Object .create (Sphere3 .prototype);

      copy .radius = this .radius;
      copy .center = this .center .copy ();

      return copy;
   },
   assign (sphere)
   {
      this .radius = sphere .radius;
      this .center .assign (sphere .center);

      return this;
   },
   equals (sphere)
   {
      return this .radius === sphere .radius && this .center .equals (sphere .center);
   },
   set (radius = 1, center = Vector3 .Zero)
   {
      this .radius = radius;
      this .center .assign (center);

      return this;
   },
   intersectsLine (line, enterPoint, exitPoint)
   {
      // https://github.com/Alexpux/Coin3D/blob/master/src/base/SbSphere.cpp

      const
         { point, direction } = line,
         { center, radius }   = this;

      const
         b = 2 * (point .dot (direction) - center .dot (direction)),
         c = (point .x * point .x + point .y * point .y + point .z * point .z) +
             (center .x * center .x + center .y * center .y + center .z * center .z) -
             2 * point .dot (center) - radius * radius;

      const core = b * b - 4 * c;

      if (core >= 0)
      {
         let
            t1 = (-b + Math .sqrt (core)) / 2,
            t2 = (-b - Math .sqrt (core)) / 2;

         if (t1 > t2)
         {
            const tmp = t1;
            t1 = t2;
            t2 = tmp;
         }

         enterPoint .assign (direction) .multiply (t1) .add (point);
         exitPoint  .assign (direction) .multiply (t2) .add (point);

         return true;
      }
      else
      {
         return false;
      }
   },
   intersectsTriangle: (() =>
   {
      const
         AB = new Vector3 (),
         AC = new Vector3 (),
         BC = new Vector3 (),
         CA = new Vector3 (),
         Q1 = new Vector3 (),
         Q2 = new Vector3 (),
         Q3 = new Vector3 ();

      return function (A, B, C)
      {
         const
            P = this .center,
            r = this .radius;

         A .subtract (P);
         B .subtract (P);
         C .subtract (P);

         // Testing if sphere lies outside the triangle plane.

         AB .assign (B) .subtract (A);
         AC .assign (C) .subtract (A);

         const
            rr   = r * r,
            V    = AB .cross (AC),
            d    = A .dot (V),
            e    = V .dot (V),
            sep1 = d * d > rr * e;

         if (sep1)
            return false;

         // Testing if sphere lies outside a triangle vertex.
         const
            aa   = A .dot (A),
            ab   = A .dot (B),
            ac   = A .dot (C),
            bb   = B .dot (B),
            bc   = B .dot (C),
            cc   = C .dot (C),
            sep2 = (aa > rr) && (ab > aa) && (ac > aa),
            sep3 = (bb > rr) && (ab > bb) && (bc > bb),
            sep4 = (cc > rr) && (ac > cc) && (bc > cc);

         if (sep2 || sep3 || sep4)
            return false;

         // Testing if sphere lies outside a triangle edge.

         AB .assign (B) .subtract (A);
         BC .assign (C) .subtract (B);
         CA .assign (A) .subtract (C);

         const
            d1   = ab - aa,
            d2   = bc - bb,
            d3   = ac - cc,
            e1   = AB .dot (AB),
            e2   = BC .dot (BC),
            e3   = CA .dot (CA);

         Q1 .assign (A) .multiply (e1) .subtract (AB .multiply (d1));
         Q2 .assign (B) .multiply (e2) .subtract (BC .multiply (d2));
         Q3 .assign (C) .multiply (e3) .subtract (CA .multiply (d3));

         const
            QC   = C .multiply (e1) .subtract (Q1),
            QA   = A .multiply (e2) .subtract (Q2),
            QB   = B .multiply (e3) .subtract (Q3),
            sep5 = (Q1 .dot (Q1) > rr * e1 * e1) && (Q1 .dot (QC) > 0),
            sep6 = (Q2 .dot (Q2) > rr * e2 * e2) && (Q2 .dot (QA) > 0),
            sep7 = (Q3 .dot (Q3) > rr * e3 * e3) && (Q3 .dot (QB) > 0);

         if (sep5 || sep6 || sep7)
            return false;

         return true;
      };
   })(),
   toString ()
   {
      return `${this .radius} ${this .center}`;
   },
});

export default Sphere3;
