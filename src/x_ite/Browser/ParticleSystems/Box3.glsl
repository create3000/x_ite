/* const */ vec3 BOX3_NORMALS [5] = vec3 [ ] (
   vec3 (0.0,  0.0,  1.0), // front
   vec3 (0.0,  0.0, -1.0), // back
   vec3 (0.0,  1.0,  0.0), // top
   vec3 (0.0, -1.0,  0.0), // bottom
   vec3 (1.0,  0.0,  0.0)  // right
);

bool
intersects (const in vec3 min, const in vec3 max, const in Line3 line)
{
   vec3 intersection = vec3 (0.0);

   if (intersects (plane3 (max, BOX3_NORMALS [0]), line, intersection))
   {
      if (all (greaterThanEqual (vec4 (intersection .xy, max .xy), vec4 (min .xy, intersection .xy))))
         return true;
   }

   if (intersects (plane3 (min, BOX3_NORMALS [1]), line, intersection))
   {
      if (all (greaterThanEqual (vec4 (intersection .xy, max .xy), vec4 (min .xy, intersection .xy))))
         return true;
   }

   if (intersects (plane3 (max, BOX3_NORMALS [2]), line, intersection))
   {
      if (all (greaterThanEqual (vec4 (intersection .xz, max .xz), vec4 (min .xz, intersection .xz))))
         return true;
   }

   if (intersects (plane3 (min, BOX3_NORMALS [3]), line, intersection))
   {
      if (all (greaterThanEqual (vec4 (intersection .xz, max .xz), vec4 (min .xz, intersection .xz))))
         return true;
   }

   if (intersects (plane3 (max, BOX3_NORMALS [4]), line, intersection))
   {
      if (all (greaterThanEqual (vec4 (intersection .yz, max .yz), vec4 (min .yz, intersection .yz))))
         return true;
   }

   return false;
}
