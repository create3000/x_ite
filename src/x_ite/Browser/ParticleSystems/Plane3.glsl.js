export default /* glsl*/ `
#if defined (X3D_BOUNDED_VOLUME) || defined (X3D_VOLUME_EMITTER)
struct Plane3
{
   vec3  normal;
   float distanceFromOrigin;
};

Plane3
plane3 (const in vec3 point, const in vec3 normal)
{
   return Plane3 (normal, dot (normal, point));
}

float
plane_distance (const in Plane3 plane, const in vec3 point)
{
   return dot (point, plane .normal) - plane .distanceFromOrigin;
}

/* Plane intersect line */
bool
intersects (const in Plane3 plane, const in Line3 line, out vec3 point)
{
   // Check if the line is parallel to the plane.
   float theta = dot (line .direction, plane .normal);

   // Plane and line are parallel.
   if (theta == 0.0)
      return false;

   // Plane and line are not parallel. The intersection point can be calculated now.
   float t = (plane .distanceFromOrigin - dot (plane .normal, line .point)) / theta;

   point = line .point + line .direction * t;

   return true;
}

/* Find find the first point that is farther to the plane than value. */
// int
// upper_bound (const in vec4 points [ARRAY_SIZE], in int count, const in float value, const in Plane3 plane)
// {
//    int first = 0;
//    int step  = 0;

//    while (count > 0)
//    {
//       int index = first;

//       step = count >> 1;

//       index += step;

//       if (value < plane_distance (plane, points [index] .xyz))
//       {
//          count = step;
//       }
//       else
//       {
//          first  = ++ index;
//          count -= step + 1;
//       }
//    }

//    return first;
// }

/* CombSort: sort points in distance to a plane. */
void
sort (inout vec4 points [ARRAY_SIZE], const in int count, const in Plane3 plane)
{
   const float shrink = 1.0 / 1.3;

   int  gap       = count;
   bool exchanged = true;

   while (exchanged)
   {
      gap = int (float (gap) * shrink);

      if (gap <= 1)
      {
         exchanged = false;
         gap       = 1;
      }

      for (int i = 0, l = count - gap; i < l; ++ i)
      {
         int j = gap + i;

         if (plane_distance (plane, points [i] .xyz) > plane_distance (plane, points [j] .xyz))
         {
            vec4 tmp1 = points [i];
            points [i] = points [j];
            points [j] = tmp1;

            exchanged = true;
         }
      }
   }
}

// /* CombSort: sort points and normals in distance to a plane. */
// void
// sort (inout vec4 points [ARRAY_SIZE], inout vec3 normals [ARRAY_SIZE], const in int count, const in Plane3 plane)
// {
//    const float shrink = 1.0 / 1.3;

//    int  gap       = count;
//    bool exchanged = true;

//    while (exchanged)
//    {
//       gap = int (float (gap) * shrink);

//       if (gap <= 1)
//       {
//          exchanged = false;
//          gap       = 1;
//       }

//       for (int i = 0, l = count - gap; i < l; ++ i)
//       {
//          int j = gap + i;

//          if (plane_distance (plane, points [i] .xyz) > plane_distance (plane, points [j] .xyz))
//          {
//             vec4 tmp1 = points [i];
//             points [i] = points [j];
//             points [j] = tmp1;

//             vec3 tmp2   = normals [i];
//             normals [i] = normals [j];
//             normals [j] = tmp2;

//             exchanged = true;
//          }
//       }
//    }
// }

int
min_index (const in vec4 points [ARRAY_SIZE], const in int count, const in float value, const in Plane3 plane)
{
   int   index = -1;
   float dist  = 1000000.0;

   for (int i = 0; i < count; ++ i)
   {
      float d = plane_distance (plane, points [i] .xyz);

      if (d >= value && d < dist)
      {
         dist  = d;
         index = i;
      }
   }

   return index;
}
#endif
`;
