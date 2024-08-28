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

import Plane3    from "./Plane3.js";
import Triangle3 from "./Triangle3.js";
import Vector2   from "../Numbers/Vector2.js";
import Vector3   from "../Numbers/Vector3.js";
import Vector4   from "../Numbers/Vector4.js";
import Matrix4   from "../Numbers/Matrix4.js";
import SAT       from "../Algorithms/SAT.js";

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
   this .viewport = new Vector4 ();
   this .scissor  = new Vector4 ();

   this .points = [
      new Vector3 (),
      new Vector3 (),
      new Vector3 (),
      new Vector3 (),

      new Vector3 (),
      new Vector3 (),
      new Vector3 (),
      new Vector3 (),
   ];

   this .normals = [
      new Vector3 (), // front
      new Vector3 (), // left
      new Vector3 (), // right
      new Vector3 (), // top
      new Vector3 (), // bottom
      new Vector3 (), // back
   ];

   this .edges = [
      new Vector3 (),
      new Vector3 (),
      new Vector3 (),
      new Vector3 (),

      new Vector3 (),
      new Vector3 (),
      new Vector3 (),
      new Vector3 (),
   ];

   this .planes = [
      new Plane3 (), // front
      new Plane3 (), // left
      new Plane3 (), // right
      new Plane3 (), // top
      new Plane3 (), // bottom
      new Plane3 (), // back
   ];

   if (arguments .length)
      this .set (projectionMatrix, viewport, scissor);
}

Object .assign (ViewVolume .prototype,
{
   set: (() =>
   {
      const matrix = new Matrix4 ();

      return function (projectionMatrix, viewport, scissor)
      {
         this .viewport .assign (viewport);
         this .scissor  .assign (scissor);

         const [p0, p1 ,p2, p3, p4, p5, p6, p7] = this .points;

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

         return this;
      };
   })(),
   getViewport ()
   {
      return this .viewport;
   },
   getScissor ()
   {
      return this .scissor;
   },
   getEdges ()
   {
      // Return suitable edges for SAT theorem.

      const edges = this .edges;

      if (edges .tainted)
      {
         const [p0, p1 ,p2, p3, p4, p5, p6, p7] = this .points;

         edges [0] .assign (p0) .subtract (p1);
         edges [1] .assign (p1) .subtract (p2);
         edges [2] .assign (p2) .subtract (p3);
         edges [3] .assign (p3) .subtract (p0);

         edges [4] .assign (p0) .subtract (p4);
         edges [5] .assign (p1) .subtract (p5);
         edges [6] .assign (p2) .subtract (p6);
         edges [7] .assign (p3) .subtract (p7);

         // Edges 8 - 11 are equal to edges 0 - 3.

         edges .tainted = false;
      }

      return edges;
   },
   intersectsSphere (radius, center)
   {
      for (const plane of this .planes)
      {
         if (plane .getDistanceToPoint (center) > radius)
            return false;
      }

      return true;
   },
   intersectsBox: (() =>
   {
      const
         points1  = Array .from ({ length: 8 }, () => new Vector3 ()),
         normals1 = Array .from ({ length: 3 }, () => new Vector3 ()),
         axes1    = Array .from ({ length: 3 }, () => new Vector3 ()),
         axes     = Array .from ({ length: 3 * 8 }, () => new Vector3 ());

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
});

Object .assign (ViewVolume,
{
   unProjectPoint: (() =>
   {
      const invModelViewProjectionMatrix = new Matrix4 ();

      return function (winx, winy, winz, modelViewMatrix, projectionMatrix, viewport, point)
      {
         return this .unProjectPointMatrix (winx, winy, winz, invModelViewProjectionMatrix .assign (modelViewMatrix) .multRight (projectionMatrix) .inverse (), viewport, point);
      };
   })(),
   unProjectPointMatrix: (() =>
   {
      const vin = new Vector4 ();

      return function (winx, winy, winz, invModelViewProjectionMatrix, viewport, point)
      {
         // Transformation of normalized coordinates between -1 and 1
         vin .set ((winx - viewport [0]) / viewport [2] * 2 - 1,
                   (winy - viewport [1]) / viewport [3] * 2 - 1,
                   winz * 2 - 1,
                   1);

         //Objects coordinates
         invModelViewProjectionMatrix .multVecMatrix (vin);

         const d = 1 / vin .w;

         return point .set (vin .x * d, vin .y * d, vin .z * d, 1);
      };
   })(),
   unProjectRay: (() =>
   {
      const invModelViewProjectionMatrix = new Matrix4 ();

      return function (winx, winy, modelViewMatrix, projectionMatrix, viewport, result)
      {
         return this .unProjectRayMatrix (winx, winy, invModelViewProjectionMatrix .assign (modelViewMatrix) .multRight (projectionMatrix) .inverse (), viewport, result);
      };
   })(),
   unProjectRayMatrix: (() =>
   {
      const
         near = new Vector3 (),
         far  = new Vector3 ();

      return function (winx, winy, invModelViewProjectionMatrix, viewport, result)
      {
         ViewVolume .unProjectPointMatrix (winx, winy, 0.0, invModelViewProjectionMatrix, viewport, near);
         ViewVolume .unProjectPointMatrix (winx, winy, 0.9, invModelViewProjectionMatrix, viewport, far);

         return result .setPoints (near, far);
      };
   })(),
   projectPoint: (() =>
   {
      const vin = new Vector4 ();

      return function (point, modelViewMatrix, projectionMatrix, viewport, vout)
      {
         if (point .length === 4)
            vin .assign (point);
         else
            vin .set (point .x, point .y, point .z, 1);

         projectionMatrix .multVecMatrix (modelViewMatrix .multVecMatrix (vin));

         const d = 1 / (2 * vin .w);

         return vout .set ((vin .x * d + 0.5) * viewport [2] + viewport [0],
                           (vin .y * d + 0.5) * viewport [3] + viewport [1],
                           (vin .z * d + 0.5));
      };
   })(),
   projectPointMatrix: (() =>
   {
      const vin = new Vector4 ();

      return function (point, modelViewProjectionMatrix, viewport, vout)
      {
         if (point .length === 4)
            vin .assign (point);
         else
            vin .set (point .x, point .y, point .z, 1);

         modelViewProjectionMatrix .multVecMatrix (vin);

         const d = 1 / (2 * vin .w);

         return vout .set ((vin .x * d + 0.5) * viewport [2] + viewport [0],
                           (vin .y * d + 0.5) * viewport [3] + viewport [1],
                           (vin .z * d + 0.5));
      };
   })(),
   projectLine: (() =>
   {
      const modelViewProjectionMatrix = new Matrix4 ();

      return function (line, modelViewMatrix, projectionMatrix, viewport, result)
      {
         return this .projectLineMatrix (line, modelViewProjectionMatrix .assign (modelViewMatrix) .multRight (projectionMatrix), viewport, result);
      };
   })(),
   projectLineMatrix: (() =>
   {
      const
         near      = new Vector2 (),
         far       = new Vector2 (),
         direction = new Vector3 ();

      return function (line, modelViewProjectionMatrix, viewport, result)
      {
         ViewVolume .projectPointMatrix (line .point, modelViewProjectionMatrix, viewport, near);
         ViewVolume .projectPointMatrix (direction .assign (line .direction) .multiply (1e9) .add (line .point), modelViewProjectionMatrix, viewport, far);

         return result .setPoints (near, far);
      };
   })(),
});

export default ViewVolume;
