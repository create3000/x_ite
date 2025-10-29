export default () => /* glsl */ `
#if defined (X3D_INSTANCING)

#if defined (X3D_TEX_COORD_RAMP)
uniform sampler2D x3d_TexCoordRamp;

in vec4 x3d_Particle;

const int map [6] = int [6] (0, 1, 2, 0, 2, 3);

vec4
getInstanceTexCoord (const in vec4 texCoord, const in int vertexId)
{
   int index0 = int (x3d_Particle [3]);

   return texelFetch (x3d_TexCoordRamp, index0 + map [vertexId], 0);
}
#else
   #define getInstanceTexCoord(texCoord,vertexId) (texCoord)
#endif

#if defined (X3D_INSTANCE_NORMAL)
in mat3 x3d_InstanceNormalMatrix;

vec3
getInstanceNormal (const in vec3 normal)
{
   return x3d_InstanceNormalMatrix * normal;
}
#else
   #define getInstanceNormal(normal) (normal)
#endif

in mat4 x3d_InstanceMatrix;

vec4
getInstanceVertex (const in vec4 vertex)
{
   return x3d_InstanceMatrix * vertex;
}

float
getInstancePointSize (const in float pointSize)
{
   return pointSize * x3d_InstanceMatrix [0] .x;
}

#else
   #define getInstanceVertex(vertex) (vertex)
   #define getInstanceNormal(normal) (normal)
   #define getInstanceTexCoord(texCoord,vertexId) (texCoord)
   #define getInstancePointSize(pointSize) (pointSize)
#endif
`;
