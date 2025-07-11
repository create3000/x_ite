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

function ViewVolume (... args)
{
   this .viewport = new Vector4 ();

   this .points  = Array .from ({ length: 8 }, () => new Vector3 ());
   // front, left, right, top, bottom, back
   this .normals = Array .from ({ length: 6 }, () => new Vector3 ());
   this .edges   = Array .from ({ length: 8 }, () => new Vector3 ());
   // front, left, right, top, bottom, back
   this .planes  = Array .from ({ length: 6 }, () => new Plane3 ());

   if (args .length)
      this .set (... args);
}

Object .assign (ViewVolume .prototype,
{
   set: (() =>
   {
      const matrix = new Matrix4 ();

      return function (projectionMatrix, viewport)
      {
         this .viewport .assign (viewport);

         const [p0, p1 ,p2, p3, p4, p5, p6, p7] = this .points;

         const
            x1 = viewport [0],
            x2 = x1 + viewport [2],
            y1 = viewport [1],
            y2 = y1 + viewport [3];

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

      return function (winX, winY, winZ, modelViewMatrix, projectionMatrix, viewport, point)
      {
         return this .unProjectPointMatrix (winX, winY, winZ, invModelViewProjectionMatrix .assign (modelViewMatrix) .multRight (projectionMatrix) .inverse (), viewport, point);
      };
   })(),
   unProjectPointMatrix: (() =>
   {
      const vin = new Vector4 ();

      return function (winX, winY, winZ, invModelViewProjectionMatrix, viewport, point)
      {
         // Transformation of normalized coordinates between -1 and 1
         vin .set ((winX - viewport [0]) / viewport [2] * 2 - 1,
                   (winY - viewport [1]) / viewport [3] * 2 - 1,
                   winZ * 2 - 1,
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

      return function (winX, winY, modelViewMatrix, projectionMatrix, viewport, result)
      {
         return this .unProjectRayMatrix (winX, winY, invModelViewProjectionMatrix .assign (modelViewMatrix) .multRight (projectionMatrix) .inverse (), viewport, result);
      };
   })(),
   unProjectRayMatrix: (() =>
   {
      const
         near = new Vector3 (),
         far  = new Vector3 ();

      return function (winX, winY, invModelViewProjectionMatrix, viewport, result)
      {
         ViewVolume .unProjectPointMatrix (winX, winY, 0.0, invModelViewProjectionMatrix, viewport, near);
         ViewVolume .unProjectPointMatrix (winX, winY, 0.9, invModelViewProjectionMatrix, viewport, far);

         return result .setPoints (near, far);
      };
   })(),
   projectPoint: (() =>
   {
      const vin = new Vector4 ();

      return function (point, modelViewMatrix, projectionMatrix, viewport, vOut)
      {
         if (point .length === 4)
            vin .assign (point);
         else
            vin .set (point .x, point .y, point .z, 1);

         projectionMatrix .multVecMatrix (modelViewMatrix .multVecMatrix (vin));

         const d = 1 / (2 * vin .w);

         return vOut .set ((vin .x * d + 0.5) * viewport [2] + viewport [0],
                           (vin .y * d + 0.5) * viewport [3] + viewport [1],
                           (vin .z * d + 0.5));
      };
   })(),
   projectPointMatrix: (() =>
   {
      const vin = new Vector4 ();

      return function (point, modelViewProjectionMatrix, viewport, vOut)
      {
         if (point .length === 4)
            vin .assign (point);
         else
            vin .set (point .x, point .y, point .z, 1);

         modelViewProjectionMatrix .multVecMatrix (vin);

         const d = 1 / (2 * vin .w);

         return vOut .set ((vin .x * d + 0.5) * viewport [2] + viewport [0],
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
