export default /* glsl*/ `
#if defined (X3D_VOLUME_EMITTER) || defined (X3D_BOUNDED_VOLUME)
bool
intersects (const in vec3 min, const in vec3 max, const in Line3 line)
{
   vec3 intersection;

   // front

   if (intersects (plane3 (max, vec3 (0.0, 0.0, 1.0)), line, intersection))
   {
      if (all (greaterThanEqual (vec4 (intersection .xy, max .xy), vec4 (min .xy, intersection .xy))))
         return true;
   }

   // back

   if (intersects (plane3 (min, vec3 (0.0, 0.0, -1.0)), line, intersection))
   {
      if (all (greaterThanEqual (vec4 (intersection .xy, max .xy), vec4 (min .xy, intersection .xy))))
         return true;
   }

   // top

   if (intersects (plane3 (max, vec3 (0.0, 1.0, 0.0)), line, intersection))
   {
      if (all (greaterThanEqual (vec4 (intersection .xz, max .xz), vec4 (min .xz, intersection .xz))))
         return true;
   }

   // bottom

   if (intersects (plane3 (min, vec3 (0.0, -1.0, 0.0)), line, intersection))
   {
      if (all (greaterThanEqual (vec4 (intersection .xz, max .xz), vec4 (min .xz, intersection .xz))))
         return true;
   }

   // right

   if (intersects (plane3 (max, vec3 (1.0, 0.0, 0.0)), line, intersection))
   {
      if (all (greaterThanEqual (vec4 (intersection .yz, max .yz), vec4 (min .yz, intersection .yz))))
         return true;
   }

   return false;
}
#endif
`;
