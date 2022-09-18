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
distance (const in Plane3 plane, const in vec3 point)
{
   return dot (point, plane .normal) - plane .distanceFromOrigin;
}

/* Plane intersect line */
bool
intersects (const in Plane3 plane, const in Line3 line, out vec3 point)
{
   point = vec3 (0.0);

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
int
upper_bound (const in vec4 points [ARRAY_SIZE], in int count, const in float value, const in Plane3 plane)
{
   int first = 0;
   int step  = 0;

   while (count > 0)
   {
      int index = first;

      step = count >> 1;

      index += step;

      if (value < distance (plane, points [index] .xyz))
      {
         count = step;
      }
      else
      {
         first  = ++ index;
         count -= step + 1;
      }
   }

   return first;
}

/* CombSort: sort points in distance to a plane. */
void
sort (inout vec4 points [ARRAY_SIZE], const in int count, const in Plane3 plane)
{
   const float shrinkFactor = 0.801711847137793;

   int  gap       = count;
   bool exchanged = false;

   do
   {
      exchanged = false;

      if (gap > 1)
         gap = int (float (gap) * shrinkFactor);

      for (int i = 0; i + gap < count; ++ i)
      {
         int j = i + gap;

         if (distance (plane, points [j] .xyz) < distance (plane, points [i] .xyz))
         {
            vec4 tmp = points [i];

            points [i] = points [j];
            points [j] = tmp;

            exchanged = true;
         }
      }
   }
   while (exchanged || gap > 1);
}


/* CombSort: sort points and normals in distance to a plane. */
void
sort (inout vec4 points [ARRAY_SIZE], inout vec3 normals [ARRAY_SIZE], const in int count, const in Plane3 plane)
{
   const float shrinkFactor = 0.801711847137793;

   int  gap       = count;
   bool exchanged = false;

   do
   {
      exchanged = false;

      if (gap > 1)
         gap = int (float (gap) * shrinkFactor);

      for (int i = 0; i + gap < count; ++ i)
      {
         int j = i + gap;

         if (distance (plane, points [j] .xyz) < distance (plane, points [i] .xyz))
         {
            vec4 tmp1 = points [i];
            points [i] = points [j];
            points [j] = tmp1;

            vec3 tmp2   = normals [i];
            normals [i] = normals [j];
            normals [j] = tmp2;

            exchanged = true;
         }
      }
   }
   while (exchanged || gap > 1);
}
