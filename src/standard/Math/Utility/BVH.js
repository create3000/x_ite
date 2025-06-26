import Vector3   from "../Numbers/Vector3.js";
import Plane3    from "../Geometry/Plane3.js";
import QuickSort from "../Algorithms/QuickSort.js";

const
   v0  = new Vector3 (),
   v1  = new Vector3 (),
   v2  = new Vector3 (),
   uvt = { u: 0, v: 0, t: 0 };

// Box normals for bbox / line intersection.
const boxNormals = [
   new Vector3 (0,  0,  1), // front
   new Vector3 (0,  0, -1), // back
   new Vector3 (0,  1,  0), // top
   new Vector3 (0, -1,  0), // bottom
   new Vector3 (1,  0,  0)  // right
   // left: We do not have to test for left.
];

const
   NODE     = 0,
   TRIANGLE = 1;

function SortComparator (vertices, axis)
{
   return function compare (a, b)
   {
       return Math .min (vertices [a + axis], vertices [a + 4 + axis], vertices [a + 8 + axis]) <
              Math .min (vertices [b + axis], vertices [b + 4 + axis], vertices [b + 8 + axis]);
   }
}

function Triangle (tree, triangle)
{
   this .vertices = tree .vertices;
   this .normals  = tree .normals;
   this .triangle = triangle;
   this .i4       = triangle * 12;
   this .i3       = triangle * 9;
}

Object .assign (Triangle .prototype,
{
   intersectsLine (line, intersections, intersectionNormals)
   {
      const
         vertices = this .vertices,
         normals  = this .normals,
         i4       = this .i4,
         i3       = this .i3;

      v0 .x = vertices [i4];     v0 .y = vertices [i4 + 1]; v0 .z = vertices [i4 +  2];
      v1 .x = vertices [i4 + 4]; v1 .y = vertices [i4 + 5]; v1 .z = vertices [i4 +  6];
      v2 .x = vertices [i4 + 8]; v2 .y = vertices [i4 + 9]; v2 .z = vertices [i4 + 10];

      if (line .intersectsTriangle (v0, v1, v2, uvt))
      {
         // Get barycentric coordinates.

         const { u, v, t } = uvt;

         // Determine vectors for X3DPointingDeviceSensors.

         const i = intersections .size ++;

         if (i >= intersections .length)
            intersections .push (new Vector3 ());

         intersections [i] .set (u * vertices [i4]     + v * vertices [i4 + 4] + t * vertices [i4 +  8],
                                 u * vertices [i4 + 1] + v * vertices [i4 + 5] + t * vertices [i4 +  9],
                                 u * vertices [i4 + 2] + v * vertices [i4 + 6] + t * vertices [i4 + 10]);

         if (intersectionNormals)
         {
            if (i >= intersectionNormals .length)
               intersectionNormals .push (new Vector3 ());

            intersectionNormals [i] .set (u * normals [i3]     + v * normals [i3 + 3] + t * normals [i3 + 6],
                                          u * normals [i3 + 1] + v * normals [i3 + 4] + t * normals [i3 + 7],
                                          u * normals [i3 + 2] + v * normals [i3 + 5] + t * normals [i3 + 8]);
         }
      }
   },
   toArray (array)
   {
      const index = array .length / 4;

      array .push (TRIANGLE, this .triangle * 3, 0, 0);

      return index;
   },
});

function Node (tree, triangles, first, size)
{
   this .min          = new Vector3 ();
   this .max          = new Vector3 ();
   this .planes       = [ ];
   this .intersection = new Vector3 ();

   const
      vertices = tree .vertices,
      min      = this .min,
      max      = this .max,
      last     = first + size;

   let t = triangles [first] * 12;

   // Calculate bbox

   min .set (vertices [t], vertices [t + 1], vertices [t + 2]);
   max .assign (min);

   for (let i = first; i < last; ++ i)
   {
      t = triangles [i] * 12;

      v0 .set (vertices [t],     vertices [t + 1], vertices [t + 2]);
      v1 .set (vertices [t + 4], vertices [t + 5], vertices [t + 6]);
      v2 .set (vertices [t + 8], vertices [t + 9], vertices [t + 10]);

      min .min (v0, v1, v2);
      max .max (v0, v1, v2);
   }

   for (let i = 0; i < 5; ++ i)
      this .planes [i] = new Plane3 (i % 2 ? min : max, boxNormals [i]);

   // Sort and split array

   if (size > 2)
   {
      // Sort array

      tree .sorter .compare .axis = this .getLongestAxis (min, max);
      tree .sorter .sort (first, last);

      // Split array

      var leftSize = size >>> 1;
   }
   else
      var leftSize = 1;

   // Split array

   const rightSize = size - leftSize;

   // Construct left and right node

   if (leftSize > 1)
      this .left = new Node (tree, triangles, first, leftSize);
   else
      this .left = new Triangle (tree, triangles [first]);

   if (rightSize > 1)
      this .right = new Node (tree, triangles, first + leftSize, rightSize);
   else
      this .right = new Triangle (tree, triangles [first + leftSize]);
}

Object .assign (Node .prototype,
{
   intersectsLine (line, intersections, intersectionNormals)
   {
      if (this .intersectsBBox (line))
      {
         this .left  .intersectsLine (line, intersections, intersectionNormals);
         this .right .intersectsLine (line, intersections, intersectionNormals);
      }
   },
   intersectsBBox (line)
   {
      const
         planes       = this .planes,
         min          = this .min,
         max          = this .max,
         minX         = min .x,
         maxX         = max .x,
         minY         = min .y,
         maxY         = max .y,
         minZ         = min .z,
         maxZ         = max .z,
         intersection = this .intersection;

      // front
      if (planes [0] .intersectsLine (line, intersection))
      {
         if (intersection .x >= minX && intersection .x <= maxX &&
             intersection .y >= minY && intersection .y <= maxY)
            return true;
      }

      // back
      if (planes [1] .intersectsLine (line, intersection))
      {
         if (intersection .x >= minX && intersection .x <= maxX &&
             intersection .y >= minY && intersection .y <= maxY)
            return true;
      }

      // top
      if (planes [2] .intersectsLine (line, intersection))
      {
         if (intersection .x >= minX && intersection .x <= maxX &&
             intersection .z >= minZ && intersection .z <= maxZ)
            return true;
      }

      // bottom
      if (planes [3] .intersectsLine (line, intersection))
      {
         if (intersection .x >= minX && intersection .x <= maxX &&
             intersection .z >= minZ && intersection .z <= maxZ)
            return true;
      }

      // right
      if (planes [4] .intersectsLine (line, intersection))
      {
         if (intersection .y >= minY && intersection .y <= maxY &&
             intersection .z >= minZ && intersection .z <= maxZ)
            return true;
      }

      return false;
   },
   getLongestAxis (min, max)
   {
      const
         x = max .x - min .x,
         y = max .y - min .y,
         z = max .z - min .z;

      if (x < y)
      {
         if (y < z)
            return 2;

         return 1;
      }
      else
      {
         if (x < z)
            return 2;

         return 0;
      }
   },
   toArray (array)
   {
      const
         left  = this .left .toArray (array),
         right = this .right .toArray (array),
         min   = this .min,
         max   = this .max,
         index = array .length / 4;

      array .push (NODE, left, right, 0,
                   min .x, min .y, min .z, 0,
                   max .x, max .y, max .z, 0);

      return index;
   },
});

function BVH (vertices, normals)
{
   const numTriangles = vertices .length / 12;

   this .vertices = vertices;
   this .normals  = normals;

   switch (numTriangles)
   {
      case 0:
      {
         this .root = null;
         break;
      }
      case 1:
      {
         this .root = new Triangle (this, 0);
         break;
      }
      default:
      {
         const triangles = [ ];

         for (let i = 0; i < numTriangles; ++ i)
            triangles .push (i);

         this .sorter = new QuickSort (triangles, SortComparator (vertices, 0));
         this .root   = new Node (this, triangles, 0, numTriangles);
         break;
      }
   }
}

Object .assign (BVH .prototype,
{
   intersectsLine (line, intersections, intersectionNormals)
   {
      intersections .size = 0;

      if (this .root)
      {
         this .root .intersectsLine (line, intersections, intersectionNormals);
         return intersections .size;
      }

      return 0;
   },
   toArray (array)
   {
      if (this .root)
      {
         const root = this .root .toArray (array);

         array .push (root, 0, 0, 0);
      }

      return array;
   },
});

export default BVH;
