import Vector3 from "../Numbers/Vector3.js";

const Triangle3 =
{
   /**
    *
    * @param {Vector3} a first point of triangle
    * @param {Vector3} b second point of triangle
    * @param {Vector3} c third point of triangle
    * @returns
    */
   area: (() =>
   {
      const
         B = new Vector3 (),
         C = new Vector3 ();

      return function (a, b, c)
      {
         return B .assign (b) .subtract (a) .cross (C .assign (c) .subtract (a)) .magnitude () / 2;
      };
   })(),
   /**
    *
    * @param {Vector3} a first point of triangle
    * @param {Vector3} b second point of triangle
    * @param {Vector3} c third point of triangle
    * @param {Vector3} normal resulting normal
    * @returns
    */
   normal (a, b, c, normal)
   {
      const
         x1 = c .x - b .x,
         y1 = c .y - b .y,
         z1 = c .z - b .z,
         x2 = a .x - b .x,
         y2 = a .y - b .y,
         z2 = a .z - b .z;

      normal .set (y1 * z2 - z1 * y2,
                   z1 * x2 - x1 * z2,
                   x1 * y2 - y1 * x2);

      return normal .normalize ();
   },
   /**
    *
    * @param {Vector3} a first point of quad
    * @param {Vector3} b second point of quad
    * @param {Vector3} c third point of quad
    * @param {Vector3} d third point of quad
    * @param {Vector3} normal resulting normal
    * @returns
    */
   quadNormal (a, b, c, d, normal)
   {
      const
         x1 = c .x - a .x,
         y1 = c .y - a .y,
         z1 = c .z - a .z,
         x2 = d .x - b .x,
         y2 = d .y - b .y,
         z2 = d .z - b .z;

      normal .set (y1 * z2 - z1 * y2,
                   z1 * x2 - x1 * z2,
                   x1 * y2 - y1 * x2);

      return normal .normalize ();
   },
   triangulatePolygon: (() =>
   {
      // Function called for each vertex of tesselator output.

      function vertexCallback (index, triangles)
      {
         triangles .push (index);
      }

      // Required in case of a combine, otherwise an empty array is returned.

      function combineCallback (coords, data, weight)
      {
         return data [0];
      }

      const tessy = new libtess .GluTesselator ();

      tessy .gluTessCallback (libtess .gluEnum .GLU_TESS_VERTEX_DATA,  vertexCallback);
      tessy .gluTessCallback (libtess .gluEnum .GLU_TESS_COMBINE,      combineCallback);
      tessy .gluTessProperty (libtess .gluEnum .GLU_TESS_WINDING_RULE, libtess .windingRule .GLU_TESS_WINDING_ODD);

      return function (polygon, triangles)
      {
         tessy .gluTessBeginPolygon (triangles);
         tessy .gluTessBeginContour ();

         for (const point of polygon)
            tessy .gluTessVertex (point, point .index);

         tessy .gluTessEndContour ();
         tessy .gluTessEndPolygon ();

         // Return array of indices.
         return triangles;
      };
   })(),
   triangulateConvexPolygon (vertices, triangles)
   {
      // Fallback: Very simple triangulation for convex polygons.

      const numVertices_1 = vertices .length - 1;

      for (let i = 1; i < numVertices_1; ++ i)
         triangles .push (vertices [0], vertices [i], vertices [i + 1]);

      return triangles;
   },
};

export default Triangle3;
