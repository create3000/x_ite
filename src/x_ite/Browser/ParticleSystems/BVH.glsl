#define BVH_NODE        0
#define BVH_TRIANGLE    1
#define BVH_STACK_SIZE  64

int bvhNodeIndex = 0;

void
setBVHIndex (const in int index)
{
   bvhNodeIndex = index;
}

int
getBVHRoot (const in sampler2D bvh, const in int root)
{
   return int (texelFetch (bvh, root, 0) .x);
}

int
getBVHType (const in sampler2D bvh)
{
   return int (texelFetch (bvh, bvhNodeIndex, 0) .x);
}

vec3
getBVHMin (const in sampler2D bvh)
{
   return texelFetch (bvh, bvhNodeIndex + 1, 0) .xyz;
}

vec3
getBVHMax (const in sampler2D bvh)
{
   return texelFetch (bvh, bvhNodeIndex + 2, 0) .xyz;
}

int
getBVHLeft (const in sampler2D bvh)
{
   return int (texelFetch (bvh, bvhNodeIndex, 0) .y);
}

int
getBVHRight (const in sampler2D bvh)
{
   return int (texelFetch (bvh, bvhNodeIndex, 0) .z);
}

int
getBVHTriangle (const in sampler2D bvh)
{
   return int (texelFetch (bvh, bvhNodeIndex, 0) .y);
}

/* Ray triangle intersection test */

int
getIntersections (const in sampler2D bvh, const in int bvhRoot, const in Line3 line, const in sampler2D surface, const in int verticesIndex, out vec4 points [ARRAY_SIZE])
{
   int current = getBVHRoot (bvh, bvhRoot);
   int count   = 0;
   int id      = -1;
   int stack [BVH_STACK_SIZE];

   while (id >= 0 || current >= 0)
   {
      if (current >= 0)
      {
         setBVHIndex (current);

         if (getBVHType (bvh) == BVH_NODE)
         {
            // Node

            if (intersects (getBVHMin (bvh), getBVHMax (bvh), line))
            {
               stack [++ id] = current;

               current = getBVHLeft (bvh);
            }
            else
            {
               current = -1;
            }
         }
         else
         {
            // Triangle

            current = -1;

            int  i = getBVHTriangle (bvh);
            vec3 r = vec3 (0.0);

            vec3 a = texelFetch (surface, verticesIndex + i + 0, 0) .xyz;
            vec3 b = texelFetch (surface, verticesIndex + i + 1, 0) .xyz;
            vec3 c = texelFetch (surface, verticesIndex + i + 2, 0) .xyz;

            if (intersects (line, a, b, c, r))
               points [count ++] = vec4 (r .z * a + r .x * b + r .y * c, 1.0);
         }
      }
      else
      {
         setBVHIndex (stack [id --]);

         current = getBVHRight (bvh);
      }
   }

   return count;
}

int
getIntersections (const in sampler2D bvh, const in int bvhLength, const in Line3 line, const in sampler2D surface, const in int verticesIndex, const in int normalsIndex, out vec4 points [ARRAY_SIZE], out vec3 normals [ARRAY_SIZE])
{
   int current = getBVHRoot (bvh, bvhLength);
   int count   = 0;
   int id      = -1;
   int stack [BVH_STACK_SIZE];

   while (id >= 0 || current >= 0)
   {
      if (current >= 0)
      {
         setBVHIndex (current);

         if (getBVHType (bvh) == BVH_NODE)
         {
            // Node

            if (intersects (getBVHMin (bvh), getBVHMax (bvh), line))
            {
               stack [++ id] = current;

               current = getBVHLeft (bvh);
            }
            else
            {
               current = -1;
            }
         }
         else
         {
            // Triangle

            current = -1;

            int  i = getBVHTriangle (bvh);
            vec3 r = vec3 (0.0);

            vec3 a = texelFetch (surface, verticesIndex + i + 0, 0) .xyz;
            vec3 b = texelFetch (surface, verticesIndex + i + 1, 0) .xyz;
            vec3 c = texelFetch (surface, verticesIndex + i + 2, 0) .xyz;

            if (intersects (line, a, b, c, r))
            {
               points [count] = vec4 (r .z * a + r .x * b + r .y * c, 1.0);

               vec3 n1 = texelFetch (surface, normalsIndex + i + 0, 0) .xyz;
               vec3 n2 = texelFetch (surface, normalsIndex + i + 1, 0) .xyz;
               vec3 n3 = texelFetch (surface, normalsIndex + i + 2, 0) .xyz;

               normals [count] = save_normalize (r .z * n1 + r .x * n2 + r .y * n3);

               ++ count;
            }
         }
      }
      else
      {
         setBVHIndex (stack [id --]);

         current = getBVHRight (bvh);
      }
   }

   return count;
}
