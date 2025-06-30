import Vector2 from "../Numbers/Vector2.js";

function Line2 (point = Vector2 .Zero, direction = Vector2 .yAxis)
{
   this .point     = new Vector2 ();
   this .direction = new Vector2 ();

   this .set (point, direction);
}

Object .assign (Line2 .prototype,
{
   copy ()
   {
      const copy = Object .create (Line2 .prototype);

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
   set (point = Vector2 .Zero, direction = Vector2 .yAxis)
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
   getClosestPointToPoint (point, result = new Vector2 ())
   {
      const
         r = result .assign (point) .subtract (this .point),
         d = r .dot (this .direction);

      return result .assign (this .direction) .multiply (d) .add (this .point);
   },
   getPerpendicularVectorToPoint: (() =>
   {
      const t = new Vector2 ();

      return function (point, result = new Vector2 ())
      {
         result .assign (this .point) .subtract (point);

         return result .subtract (t .assign (this .direction) .multiply (result .dot (this .direction)));
      };
   })(),
   intersectsLine: (() =>
   {
      const u = new Vector2 ();

      return function (line, point)
      {
         const
            { point: p1, direction: d1 } = this,
            { point: p2, direction: d2 } = line;

         const theta = d1 .dot (d2); // angle between both lines

         if (Math .abs (theta) >= 1)
            return false; // lines are parallel

         u .assign (p2) .subtract (p1);

         const t = (u .dot (d1) - theta * u .dot (d2)) / (1 - theta * theta);

         point .assign (d1) .multiply (t) .add (p1);

         return true;
      };
   })(),
   toString ()
   {
      return `${this .point}, ${this .direction}`;
   },
});

Object .assign (Line2,
{
   Points (point1, point2)
   {
      const line = Object .create (Line2 .prototype);
      line .point     = point1 .copy ();
      line .direction = point2 .copy () .subtract (point1) .normalize ();
      return line;
   },
});

export default Line2;
