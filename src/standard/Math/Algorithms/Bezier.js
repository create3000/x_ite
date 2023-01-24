/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

import Algorithm from "../Algorithm.js";
import Vector2   from "../Numbers/Vector2.js";

const lerp = Algorithm .lerp;

function Bezier (/*x0, y0, x1, y1, x2, y2, x3, y3*/)
{
   this .args = arguments;
}

Bezier .prototype =
{
   getPoints: function (type, steps)
   {
      const points = [ ];

      switch (type)
      {
         case "quadric":
         {
            const
               x0 = this .args [0],
               y0 = this .args [1],
               x1 = this .args [2],
               y1 = this .args [3],
               x2 = this .args [4],
               y2 = this .args [5];

            for (let i = 0, d = steps - 1; i < steps; ++ i)
            {
               points .push (quadric (x0, y0, x1, y1, x2, y2, i / d));
            }

            break;
         }
         case "cubic":
         {
            const
               x0 = this .args [0],
               y0 = this .args [1],
               x1 = this .args [2],
               y1 = this .args [3],
               x2 = this .args [4],
               y2 = this .args [5],
               x3 = this .args [6],
               y3 = this .args [7];

            for (let i = 0, d = steps - 1; i < steps; ++ i)
            {
               points .push (cubic (x0, y0, x1, y1, x2, y2, x3, y3, i / d));
            }

            break;
         }
         case "arc":
         {
            let
               ax            = this .args [0],
               ay            = this .args [1],
               rx            = this .args [2],
               ry            = this .args [3],
               xAxisRotation = this .args [4],
               largeArcFlag  = this .args [5],
               sweepFlag     = this .args [6],
               x             = this .args [7],
               y             = this .args [8];

            // https://ericeastwood.com/blog/25/curves-and-arcs-quadratic-cubic-elliptical-svg-implementations
            // See https://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes.

            // If the endpoints are identical, then this is equivalent to omitting the elliptical arc segment entirely.
            if (ax === x && ay === y)
            {
               points .push (new Vector2 (x, y));
               return;
            }

            // In accordance to: http://www.w3.org/TR/SVG/implnote.html#ArcOutOfRangeParameters

            rx = Math .abs (rx);
            ry = Math .abs (ry);

            // If rx = 0 or ry = 0 then this arc is treated as a straight line segment joining the endpoints.
            if (rx === 0 || ry === 0)
            {
               points .push (new Vector2 (ax, ay), new Vector2 (x, y));
               return;
            }

            const
               rx2 = rx * rx,
               ry2 = ry * ry;

            // In accordance to: http://www.w3.org/TR/SVG/implnote.html#ArcOutOfRangeParameters

            xAxisRotation = Algorithm .interval (xAxisRotation, 0, 2 * Math .PI);

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

            points .push (new Vector2 (ax, ay));

            for (let i = 1; i < bezier_steps_1; ++ i)
            {
               const t = i / bezier_steps_1;

               // From http://www.w3.org/TR/SVG/implnote.html#ArcParameterizationAlternatives
               const angle = startAngle + (sweepAngle * t);
               const x     = rx * Math .cos (angle);
               const y     = ry * Math .sin (angle);

               const point = new Vector2 (cosRotation * x - sinRotation * y + center .x,
                                          sinRotation * x + cosRotation * y + center .y);

               points .push (point);
            }

            points .push (new Vector2 (x, y));
            break;
         }
      }

      return points;
   }
};

function quadric (x0, y0, x1, y1, x2, y2, t)
{
   const
      ax0 = lerp (x0, x1, t),
      ay0 = lerp (y0, y1, t),
      ax1 = lerp (x1, x2, t),
      ay1 = lerp (y1, y2, t),
      bx0 = lerp (ax0, ax1, t),
      by0 = lerp (ay0, ay1, t);

   return new Vector2 (bx0, by0);
}

function cubic (x0, y0, x1, y1, x2, y2, x3, y3, t)
{
   const
      ax0 = lerp (x0, x1, t),
      ay0 = lerp (y0, y1, t),
      ax1 = lerp (x1, x2, t),
      ay1 = lerp (y1, y2, t),
      ax2 = lerp (x2, x3, t),
      ay2 = lerp (y2, y3, t),
      bx0 = lerp (ax0, ax1, t),
      by0 = lerp (ay0, ay1, t),
      bx1 = lerp (ax1, ax2, t),
      by1 = lerp (ay1, ay2, t),
      cx0 = lerp (bx0, bx1, t),
      cy0 = lerp (by0, by1, t);

   return new Vector2 (cx0, cy0);
}

export default Bezier;
