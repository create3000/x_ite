export default /* glsl*/ `
#define BVH_NODE        0
#define BVH_TRIANGLE    1
#define BVH_STACK_SIZE  32

int bvhNodeIndex = 0;

void
setBVHIndex (const in int index)
{
   bvhNodeIndex = index;
}

int
getBVHRoot (const in sampler2D volume, const in int hierarchyIndex, const in int rootIndex)
{
   return int (texelFetch (volume, rootIndex, 0) .x) + hierarchyIndex;
}

int
getBVHType (const in sampler2D volume)
{
   return int (texelFetch (volume, bvhNodeIndex, 0) .x);
}

vec3
getBVHMin (const in sampler2D volume)
{
   return texelFetch (volume, bvhNodeIndex + 1, 0) .xyz;
}

vec3
getBVHMax (const in sampler2D volume)
{
   return texelFetch (volume, bvhNodeIndex + 2, 0) .xyz;
}

int
getBVHLeft (const in sampler2D volume, const in int hierarchyIndex)
{
   return int (texelFetch (volume, bvhNodeIndex, 0) .y) + hierarchyIndex;
}

int
getBVHRight (const in sampler2D volume, const in int hierarchyIndex)
{
   return int (texelFetch (volume, bvhNodeIndex, 0) .z) + hierarchyIndex;
}

int
getBVHTriangle (const in sampler2D volume)
{
   return int (texelFetch (volume, bvhNodeIndex, 0) .y);
}

/* Ray triangle intersection test */

int
getIntersections (const in sampler2D volume, const in int verticesIndex, const in int hierarchyIndex, const in int rootIndex, const in Line3 line, out vec4 points [ARRAY_SIZE])
{
   int current    = getBVHRoot (volume, hierarchyIndex, rootIndex);
   int count      = 0;
   int stackIndex = -1;
   int stack [BVH_STACK_SIZE];

   while (stackIndex >= 0 || current >= 0)
   {
      if (current >= 0)
      {
         setBVHIndex (current);

         if (getBVHType (volume) == BVH_NODE)
         {
            // Node

            if (intersects (getBVHMin (volume), getBVHMax (volume), line))
            {
               stack [++ stackIndex] = current;

               current = getBVHLeft (volume, hierarchyIndex);
            }
            else
            {
               current = -1;
            }
         }
         else
         {
            // Triangle

            int  t = getBVHTriangle (volume);
            int  v = verticesIndex + t;
            vec3 r = vec3 (0.0);

            vec3 a = texelFetch (volume, v,     0) .xyz;
            vec3 b = texelFetch (volume, v + 1, 0) .xyz;
            vec3 c = texelFetch (volume, v + 2, 0) .xyz;

            if (intersects (line, a, b, c, r))
               points [count ++] = vec4 (r .z * a + r .x * b + r .y * c, 1.0);

            current = -1;
         }
      }
      else
      {
         setBVHIndex (stack [stackIndex --]);

         current = getBVHRight (volume, hierarchyIndex);
      }
   }

   return count;
}

int
getIntersections (const in sampler2D volume, const in int verticesIndex, const in int normalsIndex, const in int hierarchyIndex, const in int rootIndex, const in Line3 line, out vec4 points [ARRAY_SIZE], out vec3 normals [ARRAY_SIZE])
{
   int current    = getBVHRoot (volume, hierarchyIndex, rootIndex);
   int count      = 0;
   int stackIndex = -1;
   int stack [BVH_STACK_SIZE];

   while (stackIndex >= 0 || current >= 0)
   {
      if (current >= 0)
      {
         setBVHIndex (current);

         if (getBVHType (volume) == BVH_NODE)
         {
            // Node

            if (intersects (getBVHMin (volume), getBVHMax (volume), line))
            {
               stack [++ stackIndex] = current;

               current = getBVHLeft (volume, hierarchyIndex);
            }
            else
            {
               current = -1;
            }
         }
         else
         {
            // Triangle

            int  t = getBVHTriangle (volume);
            int  v = verticesIndex + t;
            vec3 r = vec3 (0.0);

            vec3 a = texelFetch (volume, v,     0) .xyz;
            vec3 b = texelFetch (volume, v + 1, 0) .xyz;
            vec3 c = texelFetch (volume, v + 2, 0) .xyz;

            if (intersects (line, a, b, c, r))
            {
               points [count] = vec4 (r .z * a + r .x * b + r .y * c, 1.0);

               int n = normalsIndex + t;

               vec3 n0 = texelFetch (volume, n,     0) .xyz;
               vec3 n1 = texelFetch (volume, n + 1, 0) .xyz;
               vec3 n2 = texelFetch (volume, n + 2, 0) .xyz;

               normals [count] = r .z * n0 + r .x * n1 + r .y * n2;

               ++ count;
            }

            current = -1;
         }
      }
      else
      {
         setBVHIndex (stack [stackIndex --]);

         current = getBVHRight (volume, hierarchyIndex);
      }
   }

   return count;
}
`;
