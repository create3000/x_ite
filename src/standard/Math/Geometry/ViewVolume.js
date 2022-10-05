/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
   "standard/Math/Geometry/Plane3",
   "standard/Math/Geometry/Triangle3",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Vector4",
   "standard/Math/Numbers/Matrix4",
   "standard/Math/Algorithms/SAT",
],
function (Plane3,
          Triangle3,
          Vector3,
          Vector4,
          Matrix4,
          SAT)
{
"use strict";

   /*
    * p7 -------- p6  far plane
    * | \         | \
    * | p3 --------- p2
    * |  |        |  |
    * |  |        |  |
    * p4 |______ p5  |
    *  \ |         \ |
    *   \|          \|
    *    p0 -------- p1  near plane
    */

   function ViewVolume (projectionMatrix, viewport, scissor)
   {
      this .viewport = new Vector4 (0, 0, 0, 0);
      this .scissor  = new Vector4 (0, 0, 0, 0);

      this .points = [
         new Vector3 (0, 0, 0),
         new Vector3 (0, 0, 0),
         new Vector3 (0, 0, 0),
         new Vector3 (0, 0, 0),

         new Vector3 (0, 0, 0),
         new Vector3 (0, 0, 0),
         new Vector3 (0, 0, 0),
         new Vector3 (0, 0, 0),
      ];

      this .normals = [
         new Vector3 (0, 0, 0), // front
         new Vector3 (0, 0, 0), // left
         new Vector3 (0, 0, 0), // right
         new Vector3 (0, 0, 0), // top
         new Vector3 (0, 0, 0), // bottom
         new Vector3 (0, 0, 0), // back
      ];

      this .edges = [
         new Vector3 (0, 0, 0),
         new Vector3 (0, 0, 0),
         new Vector3 (0, 0, 0),
         new Vector3 (0, 0, 0),

         new Vector3 (0, 0, 0),
         new Vector3 (0, 0, 0),
         new Vector3 (0, 0, 0),
         new Vector3 (0, 0, 0),
      ];

      this .planes = [
         new Plane3 (Vector3 .Zero, Vector3 .Zero), // front
         new Plane3 (Vector3 .Zero, Vector3 .Zero), // left
         new Plane3 (Vector3 .Zero, Vector3 .Zero), // right
         new Plane3 (Vector3 .Zero, Vector3 .Zero), // top
         new Plane3 (Vector3 .Zero, Vector3 .Zero), // bottom
         new Plane3 (Vector3 .Zero, Vector3 .Zero), // back
      ];

      if (arguments .length)
         this .set (projectionMatrix, viewport, scissor);
   }

   ViewVolume .prototype =
   {
      constructor: ViewVolume,
      set: (function ()
      {
         const matrix = new Matrix4 ();

         return function (projectionMatrix, viewport, scissor)
         {
            try
            {
               this .viewport .assign (viewport);
               this .scissor  .assign (scissor);

               const points = this .points;

               const
                  p0 = points [0],
                  p1 = points [1],
                  p2 = points [2],
                  p3 = points [3],
                  p4 = points [4],
                  p5 = points [5],
                  p6 = points [6],
                  p7 = points [7];

               const
                  x1 = scissor [0],
                  x2 = x1 + scissor [2],
                  y1 = scissor [1],
                  y2 = y1 + scissor [3];

               matrix .assign (projectionMatrix) .inverse ();

               ViewVolume .unProjectPointMatrix (x1, y1, 0, matrix, viewport, p0),
               ViewVolume .unProjectPointMatrix (x2, y1, 0, matrix, viewport, p1),
               ViewVolume .unProjectPointMatrix (x2, y2, 0, matrix, viewport, p2),
               ViewVolume .unProjectPointMatrix (x1, y2, 0, matrix, viewport, p3),
               ViewVolume .unProjectPointMatrix (x1, y1, 1, matrix, viewport, p4),
               ViewVolume .unProjectPointMatrix (x2, y1, 1, matrix, viewport, p5);
               ViewVolume .unProjectPointMatrix (x2, y2, 1, matrix, viewport, p6);
               ViewVolume .unProjectPointMatrix (x1, y2, 1, matrix, viewport, p7);

               const normals = this .normals;

               Triangle3 .normal (p0, p1, p2, normals [0]); // front
               Triangle3 .normal (p7, p4, p0, normals [1]); // left
               Triangle3 .normal (p6, p2, p1, normals [2]); // right
               Triangle3 .normal (p2, p6, p7, normals [3]); // top
               Triangle3 .normal (p1, p0, p4, normals [4]); // bottom
               Triangle3 .normal (p4, p7, p6, normals [5]); // back

               const planes = this .planes;

               planes [0] .set (p1, normals [0]); // front
               planes [1] .set (p4, normals [1]); // left
               planes [2] .set (p2, normals [2]); // right
               planes [3] .set (p6, normals [3]); // top
               planes [4] .set (p0, normals [4]); // bottom
               planes [5] .set (p7, normals [5]); // back

               this .edges .tainted = true;
               this .valid          = true;
            }
            catch (error)
            {
               this .valid = false;
               //console .log (error);
            }

            return this;
         };
      })(),
      getViewport: function ()
      {
         return this .viewport;
      },
      getScissor: function ()
      {
         return this .scissor;
      },
      getEdges: function ()
      {
         // Return suitable edges for SAT theorem.

         const edges = this .edges;

         if (edges .tainted)
         {
            const points = this .points;

            edges [0] .assign (points [0]) .subtract (points [1]);
            edges [1] .assign (points [1]) .subtract (points [2]);
            edges [2] .assign (points [2]) .subtract (points [3]);
            edges [3] .assign (points [3]) .subtract (points [0]);

            edges [4] .assign (points [0]) .subtract (points [4]);
            edges [5] .assign (points [1]) .subtract (points [5]);
            edges [6] .assign (points [2]) .subtract (points [6]);
            edges [7] .assign (points [3]) .subtract (points [7]);

            // Edges 8 - 11 are equal to edges 0 - 3.

            edges .tainted = false;
         }

         return edges;
      },
      intersectsSphere: function (radius, center)
      {
         if (this .valid)
         {
            const planes = this .planes;

            if (planes [0] .getDistanceToPoint (center) > radius)
               return false;

            if (planes [1] .getDistanceToPoint (center) > radius)
               return false;

            if (planes [2] .getDistanceToPoint (center) > radius)
               return false;

            if (planes [3] .getDistanceToPoint (center) > radius)
               return false;

            if (planes [4] .getDistanceToPoint (center) > radius)
               return false;

            if (planes [5] .getDistanceToPoint (center) > radius)
               return false;
         }

         return true;
      },
      intersectsBox: (function ()
      {
         const points1 = [
            new Vector3 (0, 0, 0),
            new Vector3 (0, 0, 0),
            new Vector3 (0, 0, 0),
            new Vector3 (0, 0, 0),

            new Vector3 (0, 0, 0),
            new Vector3 (0, 0, 0),
            new Vector3 (0, 0, 0),
            new Vector3 (0, 0, 0),
         ];

         const normals1 = [
            new Vector3 (0, 0, 0),
            new Vector3 (0, 0, 0),
            new Vector3 (0, 0, 0),
         ];

         const axes1 = [
            new Vector3 (0, 0, 0),
            new Vector3 (0, 0, 0),
            new Vector3 (0, 0, 0),
         ];

         const axes = [ ];

         for (let i = 0; i < 3 * 8; ++ i)
            axes .push (new Vector3 (0, 0, 0));

         return function (box)
         {
            // Get points.

            box .getPoints (points1);

            const points2 = this .points;

            // Test the three planes spanned by the normal vectors of the faces of the box.

            if (SAT .isSeparated (box .getNormals (normals1), points1, points2))
               return false;

            // Test the six planes spanned by the normal vectors of the faces of the view volume.

            if (SAT .isSeparated (this .normals, points1, points2))
               return false;

            // Test the planes spanned by the edges of each object.

            box .getAxes (axes1);

            const edges = this .getEdges ();

            for (let i1 = 0; i1 < 3; ++ i1)
            {
               for (let i2 = 0; i2 < 8; ++ i2)
                  axes [i1 * 3 + i2] .assign (axes1 [i1]) .cross (edges [i2]);
            }

            if (SAT .isSeparated (axes, points1, points2))
               return false;

            // Both boxes intersect.

            return true;
         };
      })(),
   };

   Object .assign (ViewVolume,
   {
      unProjectPoint: (function ()
      {
         const matrix = new Matrix4 ();

         return function (winx, winy, winz, modelViewMatrix, projectionMatrix, viewport, point)
         {
            matrix .assign (modelViewMatrix) .multRight (projectionMatrix) .inverse ();

            return this .unProjectPointMatrix (winx, winy, winz, matrix, viewport, point);
         };
      })(),
      unProjectPointMatrix: (function ()
      {
         const vin = new Vector4 (0, 0, 0, 0);

         return function (winx, winy, winz, invModelViewProjection, viewport, point)
         {
            // Transformation of normalized coordinates between -1 and 1
            vin .set ((winx - viewport [0]) / viewport [2] * 2 - 1,
                      (winy - viewport [1]) / viewport [3] * 2 - 1,
                      2 * winz - 1,
                      1);

            //Objects coordinates
            invModelViewProjection .multVecMatrix (vin);

            if (vin .w === 0)
               throw new Error ("Couldn't unproject point: divisor is 0.");

            const d = 1 / vin .w;

            return point .set (vin .x * d, vin .y * d, vin .z * d);
         };
      })(),
      unProjectRay: (function ()
      {
         const
            near   = new Vector3 (0, 0, 0),
            far    = new Vector3 (0, 0, 0),
            matrix = new Matrix4 ();

         return function (winx, winy, modelViewMatrix, projectionMatrix, viewport, result)
         {
            matrix .assign (modelViewMatrix) .multRight (projectionMatrix) .inverse ();

            ViewVolume .unProjectPointMatrix (winx, winy, 0.0, matrix, viewport, near);
            ViewVolume .unProjectPointMatrix (winx, winy, 0.9, matrix, viewport, far);

            return result .setPoints (near, far);
         };
      })(),
      projectPoint: (function ()
      {
         const vin = new Vector4 (0, 0, 0, 0);

         return function (point, modelViewMatrix, projectionMatrix, viewport, vout)
         {
            if (point .length === 4)
               vin .assign (point);
            else
               vin .set (point .x, point .y, point .z, 1);

            projectionMatrix .multVecMatrix (modelViewMatrix .multVecMatrix (vin));

            if (vin .w === 0)
               throw new Error ("Couldn't project point: divisor is 0.");

            const d = 1 / (2 * vin .w);

            return vout .set ((vin .x * d + 0.5) * viewport [2] + viewport [0],
                              (vin .y * d + 0.5) * viewport [3] + viewport [1],
                              (vin .z * d + 0.5));
         };
      })(),
      projectPointMatrix: (function ()
      {
         const vin = new Vector4 (0, 0, 0, 0);

         return function (point, modelViewProjectionMatrix, viewport, vout)
         {
            if (point .length === 4)
               vin .assign (point);
            else
               vin .set (point .x, point .y, point .z, 1);

            modelViewProjectionMatrix .multVecMatrix (vin);

            if (vin .w === 0)
               throw new Error ("Couldn't project point: divisor is 0.");

            const d = 1 / (2 * vin .w);

            return vout .set ((vin .x * d + 0.5) * viewport [2] + viewport [0],
                              (vin .y * d + 0.5) * viewport [3] + viewport [1],
                              (vin .z * d + 0.5));
         };
      })(),
      projectLine: (function ()
      {
         const
            near = new Vector3 (0, 0, 0),
            far  = new Vector3 (0, 0, 0);

         return function (line, modelViewMatrix, projectionMatrix, viewport, result)
         {
            ViewVolume .projectPoint (line .point, modelViewMatrix, projectionMatrix, viewport, near);
            ViewVolume .projectPoint (Vector3 .multiply (line .direction, 1e9) .add (line .point), modelViewMatrix, projectionMatrix, viewport, far);

            near .z = 0;
            far  .z = 0;

            return result .setPoints (near, far);
         };
      })(),
   });

   return ViewVolume;
});
