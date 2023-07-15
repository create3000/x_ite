export default /* glsl */ `
#if defined (X3D_SKINNING)

in float x3d_CoordIndex;

uniform sampler2D x3d_JointsTexture;
uniform sampler2D x3d_DisplacementsTexture;
uniform sampler2D x3d_JointMatricesTexture;

mat4
getJointMatrix (const in int joint)
{
   vec4 a = texelFetch (x3d_JointMatricesTexture, joint * 8,     0);
   vec4 b = texelFetch (x3d_JointMatricesTexture, joint * 8 + 1, 0);
   vec4 c = texelFetch (x3d_JointMatricesTexture, joint * 8 + 2, 0);
   vec4 d = texelFetch (x3d_JointMatricesTexture, joint * 8 + 3, 0);

   return mat4 (a, b, c, d);
}

mat3
getDisplacementJointMatrix (const in int joint)
{
   mat4 m = getJointMatrix (joint);

   return mat3 (m [0] .xyz, m [1] .xyz, m [2] .xyz);
}

vec4
getSkinningVertex (const in vec4 vertex)
{
   int   coordIndex2 = int (x3d_CoordIndex) * 2;
   ivec4 joints      = ivec4 (texelFetch (x3d_JointsTexture, coordIndex2, 0));
   vec4  weights     = texelFetch (x3d_JointsTexture, coordIndex2 + 1, 0);
   int   width       = textureSize (x3d_DisplacementsTexture, 0) .x;
   int   offset      = (width * width) / 2;
   vec4  skin        = vertex;

   for (int i = 0; i < 2; ++ i)
   {
      vec4  displacement = texelFetch (x3d_DisplacementsTexture, coordIndex2 + i,      0);
      float weight       = texelFetch (x3d_DisplacementsTexture, coordIndex2 + offset, 0) [i];

      skin .xyz += (getDisplacementJointMatrix (int (displacement .w)) * displacement .xyz) * weight;
   }

   for (int i = 0; i < 4; ++ i)
      skin += (getJointMatrix (joints [i]) * vertex - vertex) * weights [i];

   return skin;
}

#if defined (X3D_NORMALS)
mat3
getJointNormalMatrix (const in int joint)
{
   vec4 a = texelFetch (x3d_JointMatricesTexture, joint * 8 + 4, 0);
   vec4 b = texelFetch (x3d_JointMatricesTexture, joint * 8 + 5, 0);
   vec4 c = texelFetch (x3d_JointMatricesTexture, joint * 8 + 6, 0);

   return mat3 (a .xyz, vec3 (a .w, b .xy), vec3 (b .zw, c .x));
}

vec3
getSkinningNormal (const in vec3 normal)
{
   int   coordIndex2 = int (x3d_CoordIndex);
   ivec4 joints      = ivec4 (texelFetch (x3d_JointsTexture, coordIndex2, 0));
   vec4  weights     = texelFetch (x3d_JointsTexture, coordIndex2 + 1, 0);
   vec3  skin        = normal;

   for (int i = 0; i < 4; ++ i)
      skin += (getJointNormalMatrix (joints [i]) * normal - normal) * weights [i];

   return skin;
}
#endif

#else
   #define getSkinningVertex(vertex) (vertex)
   #define getSkinningNormal(normal) (normal)
#endif
`;
