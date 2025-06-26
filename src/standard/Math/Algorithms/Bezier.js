import Algorithm from "../Algorithm.js";
import Vector2   from "../Numbers/Vector2.js";
import Vector3   from "../Numbers/Vector3.js";
import Vector4   from "../Numbers/Vector4.js";
import Matrix3   from "../Numbers/Matrix3.js";
import Matrix4   from "../Numbers/Matrix4.js";

const { interval } = Algorithm;

// https://pomax.github.io/bezierinfo/

const Bezier =
{
   quadric: (() =>
   {
      const
         c = new Matrix3 (1, 0, 0, -2, 2, 0, 1, -2, 1),
         p = new Matrix3 ();

      return function (x0, y0, z0, x1, y1, z1, x2, y2, z2, steps, points)
      {
         p
            .set (x0, y0, z0, x1, y1, z1, x2, y2, z2)
            .multLeft (c);

         for (let i = 0, d = steps - 1; i < steps; ++ i)
         {
            const t = i / d;

            points .push (p .multVecMatrix (new Vector3 (1, t, t * t)));
         }
      };
   })(),
   cubic: (() =>
   {
      const
         v = new Vector4 (),
         c = new Matrix4 (1, 0, 0, 0, -3, 3, 0, 0, 3, -6, 3, 0, -1, 3, -3, 1),
         p = new Matrix4 ();

      return function (x0, y0, z0, x1, y1, z1, x2, y2, z2, x3, y3, z3, steps, points)
      {
         p
            .set (x0, y0, z0, 0, x1, y1, z1, 0, x2, y2, z2, 0, x3, y3, z3, 0)
            .multLeft (c);

         for (let i = 0, d = steps - 1; i < steps; ++ i)
         {
            const t = i / d;

            p .multVecMatrix (v .set (1, t, t * t, t * t * t));

            points .push (new Vector3 (v .x, v .y, v .z));
         }
      };
   })(),
   arc (ax, ay, rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y, steps, points)
   {
      // https://ericeastwood.com/blog/25/curves-and-arcs-quadratic-cubic-elliptical-svg-implementations
      // See https://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes.

      // If the endpoints are identical, then this is equivalent to omitting the elliptical arc segment entirely.
      if (ax === x && ay === y)
      {
         points .push (new Vector3 (x, y, 0));
         return;
      }

      // In accordance to: http://www.w3.org/TR/SVG/implnote.html#ArcOutOfRangeParameters

      rx = Math .abs (rx);
      ry = Math .abs (ry);

      // If rx = 0 or ry = 0 then this arc is treated as a straight line segment joining the endpoints.
      if (rx === 0 || ry === 0)
      {
         points .push (new Vector3 (ax, ay, 0), new Vector3 (x, y, 0));
         return;
      }

      const
         rx2 = rx * rx,
         ry2 = ry * ry;

      // In accordance to: http://www.w3.org/TR/SVG/implnote.html#ArcOutOfRangeParameters

      xAxisRotation = interval (xAxisRotation, 0, 2 * Math .PI);

      const
         sinRotation = Math .sin (xAxisRotation),
         cosRotation = Math .cos (xAxisRotation);

      // Following "Conversion from endpoint to center parameterization"
      // http://www.w3.org/TR/SVG/implnote.html#ArcConversionEndpointToCenter

      // Step #1: Compute transformedPoint
      const d = new Vector2 (ax - x, ay - y) .divide (2);

      const transformedPoint = new Vector2 ( cosRotation * d .x + sinRotation * d .y,
                                             -sinRotation * d .x + cosRotation * d .y);

      const transformedPoint2 = transformedPoint .copy () .multVec (transformedPoint);

      // Ensure radii are large enough
      const radiiCheck = transformedPoint2 .x / rx2 + transformedPoint2 .y / ry2;

      if (radiiCheck > 1)
      {
         rx = Math .sqrt (radiiCheck) * rx;
         ry = Math .sqrt (radiiCheck) * ry;
      }

      // Step #2: Compute transformedCenter
      const cSquareNumerator = rx2 * ry2 - rx2 * transformedPoint2 .y - ry2 * transformedPoint2 .x;
      const cSquareRootDenom =             rx2 * transformedPoint2 .y + ry2 * transformedPoint2 .x;
      let   cRadicand        = cSquareNumerator / cSquareRootDenom;

      // Make sure this never drops below zero because of precision
      cRadicand = Math .max (0, cRadicand);

      const cCoef = (largeArcFlag !== sweepFlag ? 1 : -1) * Math .sqrt (cRadicand);

      const transformedCenter = new Vector2 ( cCoef * rx * transformedPoint .y / ry,
                                             -cCoef * ry * transformedPoint .x / rx);

      // Step #3: Compute center
      const center = new Vector2 (cosRotation * transformedCenter .x - sinRotation * transformedCenter .y + ((ax + x) / 2),
                                  sinRotation * transformedCenter .x + cosRotation * transformedCenter .y + ((ay + y) / 2));

      // Step #4: Compute start/sweep angles
      const startVector = new Vector2 ((transformedPoint .x - transformedCenter .x) / rx,
                                       (transformedPoint .y - transformedCenter .y) / ry);

      const endVector = new Vector2 ((-transformedPoint .x - transformedCenter .x) / rx,
                                     (-transformedPoint .y - transformedCenter .y) / ry);

      const get_angle  = (x) => { return x > 0 ? x : 2 * Math .PI + x; }; // transform angle to range [0, 2pi]
      const startAngle = get_angle (Math .atan2 (startVector .y, startVector .x));
      const endAngle   = get_angle (Math .atan2 (endVector   .y, endVector   .x));

      let sweepAngle = endAngle - startAngle;

      if (largeArcFlag)
      {
         // sweepAngle must be positive
         if (sweepAngle < 0)
            sweepAngle += 2 * Math .PI;
      }
      else
      {
         // sweepAngle must be negative
         if (sweepAngle > 0)
            sweepAngle -= 2 * Math .PI;
      }

      if (sweepFlag && sweepAngle < 0)
         sweepAngle += 2 *Math .PI;

      else if (!sweepFlag && sweepAngle > 0)
         sweepAngle -= 2 * Math .PI;

      // Interpolate:

      const bezier_steps   = Math .max (4, Math .abs (sweepAngle) * steps / (2 * Math .PI));
      const bezier_steps_1 = bezier_steps - 1;

      points .push (new Vector3 (ax, ay, 0));

      for (let i = 1; i < bezier_steps_1; ++ i)
      {
         const t = i / bezier_steps_1;

         // From http://www.w3.org/TR/SVG/implnote.html#ArcParameterizationAlternatives
         const angle = startAngle + (sweepAngle * t);
         const x     = rx * Math .cos (angle);
         const y     = ry * Math .sin (angle);

         points .push (new Vector3 (cosRotation * x - sinRotation * y + center .x,
                                    sinRotation * x + cosRotation * y + center .y,
                                    0));
      }

      points .push (new Vector3 (x, y, 0));
   },
};

export default Bezier;
