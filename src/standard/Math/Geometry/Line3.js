import Vector3 from "../Numbers/Vector3.js";

function Line3 (point = Vector3 .Zero, direction = Vector3 .zAxis)
{
   this .point     = new Vector3 ();
   this .direction = new Vector3 ();

   this .set (point, direction);
}

Object .assign (Line3 .prototype,
{
   copy ()
   {
      const copy = Object .create (Line3 .prototype);

      copy .point     = this .point .copy ();
      copy .direction = this .direction .copy ();

      return copy;
   },
   assign (line)
   {
      this .point     .assign (line .point);
      this .direction .assign (line .direction);

      return this;
   },
   equals (line)
   {
      return this .point .equals (line .point) && this .direction .equals (line .direction);
   },
   set (point = Vector3 .Zero, direction = Vector3 .zAxis)
   {
      this .point     .assign (point);
      this .direction .assign (direction);
      return this;
   },
   setPoints (point1, point2)
   {
      this .point .assign (point1);
      this .direction .assign (point2) .subtract (point1) .normalize ();
      return this;
   },
   multMatrixLine (matrix)
   {
      matrix .multMatrixVec (this .point);
      matrix .multMatrixDir (this .direction) .normalize ();
      return this;
   },
   multLineMatrix (matrix)
   {
      matrix .multVecMatrix (this .point);
      matrix .multDirMatrix (this .direction) .normalize ();
      return this;
   },
   getClosestPointToPoint (point, result = new Vector3 ())
   {
      const
         r = result .assign (point) .subtract (this .point),
         d = r .dot (this .direction);

      return result .assign (this .direction) .multiply (d) .add (this .point);
   },
   getClosestPointToLine: (() =>
   {
      const u = new Vector3 ();

      return function (line, point)
      {
         const
            { point: p1, direction: d1 } = this,
            { point: p2, direction: d2 } = line;

         let t = d1 .dot (d2);

         if (Math .abs (t) >= 1)
            return false;  // lines are parallel

         u .assign (p2) .subtract (p1);

         t = (u .dot (d1) - t * u .dot (d2)) / (1 - t * t);

         point .assign (d1) .multiply (t) .add (p1);
         return true;
      };
   })(),
   getPerpendicularVectorToPoint: (() =>
   {
      const t = new Vector3 ();

      return function (point, result = new Vector3 ())
      {
         result .assign (this .point) .subtract (point);

         return result .subtract (t .assign (this .direction) .multiply (result .dot (this .direction)));
      };
   })(),
   getPerpendicularVectorToLine: (() =>
   {
      const
         diff   = new Vector3 (),
         proj   = new Vector3 (),
         d      = new Vector3 (),
         point1 = new Vector3 ();

      return function (line, result = new Vector3 ())
      {
         const
            { point: p1, direction: d1 } = this,
            { point: p2, direction: d2 } = line;

         const t = d1 .dot (d2);

         if (Math .abs (t) >= 1)
         {
            // Lines are parallel

            diff .assign (p2) .subtract (p1);
            proj .assign (d1) .multiply (diff .dot (d1) / d1 .dot (d1));

            return proj .subtract (diff);
         }

         d .assign (p1) .subtract (p2);

         const
            re1 = d .dot (d1),
            re2 = d .dot (d2),
            e12 = d1 .dot (d2),
            E12 = e12 * e12;

         const
            a =  (re1 - re2 * e12) / (1 - E12),
            b = -(re2 - re1 * e12) / (1 - E12);

         point1 .assign (d1) .multiply (a);
         result .assign (d2) .multiply (b);

         return result .subtract (point1) .add (d);
      };
   })(),
   intersectsTriangle: (() =>
   {
      const
         pvec = new Vector3 (),
         tvec = new Vector3 ();

      return function (A, B, C, uvt)
      {
         // Find vectors for two edges sharing vert0.
         const
            edge1 = B .subtract (A),
            edge2 = C .subtract (A);

         // Begin calculating determinant - also used to calculate U parameter.
         pvec .assign (this .direction) .cross (edge2);

         // If determinant is near zero, ray lies in plane of triangle.
         const det = edge1 .dot (pvec);

         // Non culling intersection.

         if (det === 0)
            return false;

            const inv_det = 1 / det;

         // Calculate distance from vert0 to ray point.
         tvec .assign (this .point) .subtract (A);

         // Calculate U parameter and test bounds.
         const u = tvec .dot (pvec) * inv_det;

         if (u < 0 || u > 1)
            return false;

         // Prepare to test V parameter.
         const qvec = tvec .cross (edge1);

         // Calculate V parameter and test bounds.
         const v = this .direction .dot (qvec) * inv_det;

         if (v < 0 || u + v > 1)
            return false;

         //let u = edge2 .dot (qvec) * inv_det;

         uvt .u = 1 - u - v;
         uvt .v = u;
         uvt .t = v;

         return true;
      };
   })(),
   toString ()
   {
      return `${this .point}, ${this .direction}`;
   },
});

Object .assign (Line3,
{
   Points (point1, point2)
   {
      const line = Object .create (Line3 .prototype);
      line .point     = point1 .copy ();
      line .direction = point2 .copy () .subtract (point1) .normalize ();
      return line;
   },
});

export default Line3;
