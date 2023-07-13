export default /* glsl */ `
#if defined (X3D_SKINNING)

in float x3d_CoordIndex;

uniform sampler2D x3d_JointsTexture;
uniform sampler2D x3d_WeightsTexture;
uniform sampler2D x3d_JointMatricesTexture;
uniform sampler2D x3d_JointNormalMatricesTexture;

mat4
getJointMatrix (const in int joint)
{
   vec4 a = texelFetch (x3d_JointMatricesTexture, joint * 4 + 0, 0);
   vec4 b = texelFetch (x3d_JointMatricesTexture, joint * 4 + 1, 0);
   vec4 c = texelFetch (x3d_JointMatricesTexture, joint * 4 + 2, 0);
   vec4 d = texelFetch (x3d_JointMatricesTexture, joint * 4 + 3, 0);

   return mat4 (a, b, c, d);
}

vec4
getSkinningVertex (const in vec4 vertex)
{
   int  coordIndex = int (x3d_CoordIndex);
   vec4 joints     = texelFetch (x3d_JointsTexture,  coordIndex, 0);
   vec4 weights    = texelFetch (x3d_WeightsTexture, coordIndex, 0);

   mat4 jointMatrix0 = getJointMatrix (int (joints [0]));
   mat4 jointMatrix1 = getJointMatrix (int (joints [1]));
   mat4 jointMatrix2 = getJointMatrix (int (joints [2]));
   mat4 jointMatrix3 = getJointMatrix (int (joints [3]));

   vec4 skin = vertex;

   skin += (jointMatrix0 [0] * vertex - vertex) * weights [0];
   skin += (jointMatrix1 [1] * vertex - vertex) * weights [1];
   skin += (jointMatrix2 [2] * vertex - vertex) * weights [2];
   skin += (jointMatrix3 [3] * vertex - vertex) * weights [3];

   return skin;
}

#if defined (X3D_NORMALS)
vec3
getSkinningNormal (const in vec3 normal)
{
   return normal;
}
#endif

#else
   #define getSkinningVertex(vertex) (vertex)
   #define getSkinningNormal(normal) (normal)
#endif
`;
