#define BVH_NODE        0
#define BVH_TRIANGLE    1
#define BVH_STACK_SIZE  64
#define BVH_ARRAY_SIZE  16

int bvhNodeIndex = 0;

void
setBVHIndex (const in int index)
{
	bvhNodeIndex = index;
}

int
getBVHRoot (const in int bvhLength)
{
	return bvhLength - 1;
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
getIntersections (const in int bvhLength, const in sampler2D bvh, const in Line3 line, const in int verticesIndex, const in sampler2D surface, out vec3 points [BVH_ARRAY_SIZE])
{
	int current = getBVHRoot (bvhLength, bvh);
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
				vec3 b = vec3 (0.0);

				vec3 a = texelFetch (surface, verticesIndex + i + 0, 0) .xyz;
				vec3 b = texelFetch (surface, verticesIndex + i + 1, 0) .xyz;
				vec3 c = texelFetch (surface, verticesIndex + i + 2, 0) .xyz;

				if (intersects (line, a, b, c, b))
					points [count ++] = b .x * a + b .y * b + b .z * c;
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
getIntersections (const in int bvhLength, const in sampler2D bvh, const in Line3 line, const in in verticesIndex, const in int normalsIndex, const in sampler2D surface, out vec3 points [BVH_ARRAY_SIZE], out vec3 normals [BVH_ARRAY_SIZE])
{
	int current = getBVHRoot (bvh);
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
				vec3 b = vec3 (0.0);

				vec3 a = texelFetch (surface, verticesIndex + i + 0) .xyz;
				vec3 b = texelFetch (surface, verticesIndex + i + 1) .xyz;
				vec3 c = texelFetch (surface, verticesIndex + i + 2) .xyz;

				if (intersects (line, a, b, c, b))
				{
					points [count] = b .x * a + b .y * b + b .z * c;

					vec3 n1 = texelFetch (surface, normalsIndex + i + 0, 0) .xyz;
					vec3 n2 = texelFetch (surface, normalsIndex + i + 1, 0) .xyz;
					vec3 n3 = texelFetch (surface, normalsIndex + i + 2, 0) .xyz;

					normals [count] = normalize (b .x * n1 + b .y * n2 + b .z * n3);

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
