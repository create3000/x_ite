export default /* glsl*/ `
#if defined (X3D_BOUNDED_VOLUME) || defined (X3D_VOLUME_EMITTER)
struct Line3 {
   vec3 point;
   vec3 direction;
};

// Line3
// line3 (const in vec3 point1, const in vec3 point2)
// {
//    return Line3 (point1, normalize (point2 - point1));
// }

/* Line intersect triangle */
bool
intersects (const in Line3 line, const in vec3 a, const in vec3 b, const in vec3 c, out vec3 r)
{
   // find vectors for two edges sharing vert0
   vec3 edge1 = b - a;
   vec3 edge2 = c - a;

   // begin calculating determinant - also used to calculate U parameter
   vec3 pvec = cross (line .direction, edge2);

   // if determinant is near zero, ray lies in plane of triangle
   float det = dot (edge1, pvec);

   // Non culling intersection

   if (det == 0.0)
      return false;

   float inv_det = 1.0 / det;

   // calculate distance from vert0 to ray point
   vec3 tvec = line .point - a;

   // calculate U parameter and test bounds
   float u = dot (tvec, pvec) * inv_det;

   if (u < 0.0 || u > 1.0)
      return false;

   // prepare to test V parameter
   vec3 qvec = cross (tvec, edge1);

   // calculate V parameter and test bounds
   float v = dot (line .direction, qvec) * inv_det;

   if (v < 0.0 || u + v > 1.0)
      return false;

   r = vec3 (u, v, 1.0 - u - v);

   return true;
}
#endif
`;
