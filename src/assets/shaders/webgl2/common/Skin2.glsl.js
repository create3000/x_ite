export default () => /* glsl */ `
#if defined (X3D_SKINNING)

in float x3d_CoordIndex;

#if X3D_NUM_JOINT_SETS > 0
   uniform sampler2D x3d_JointsTexture;
#endif

#if X3D_NUM_DISPLACEMENTS > 0
   uniform sampler2D x3d_DisplacementsTexture;
   uniform sampler2D x3d_DisplacementWeightsTexture;
#endif

#if X3D_NUM_JOINT_SETS > 0 || X3D_NUM_DISPLACEMENTS > 0
   uniform sampler2D x3d_JointMatricesTexture;
#endif

#if X3D_NUM_JOINT_SETS > 0
mat4
getJointMatrix (const in int joint)
{
   vec4 a = texelFetch (x3d_JointMatricesTexture, joint * 8,     0);
   vec4 b = texelFetch (x3d_JointMatricesTexture, joint * 8 + 1, 0);
   vec4 c = texelFetch (x3d_JointMatricesTexture, joint * 8 + 2, 0);
   vec4 d = texelFetch (x3d_JointMatricesTexture, joint * 8 + 3, 0);

   return mat4 (a, b, c, d);
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
#endif
#endif

#if X3D_NUM_DISPLACEMENTS > 0
mat3
getDisplacementJointMatrix (const in int joint)
{
   vec4 a = texelFetch (x3d_JointMatricesTexture, joint * 8,     0);
   vec4 b = texelFetch (x3d_JointMatricesTexture, joint * 8 + 1, 0);
   vec4 c = texelFetch (x3d_JointMatricesTexture, joint * 8 + 2, 0);

   return mat3 (a .xyz, b .xyz, c .xyz);
}
#endif

#if defined (X3D_NORMALS)
vec3 skinNormal = vec3 (0.0);

#if defined (X3D_TANGENTS)
   vec3 skinTangent = vec3 (0.0);
#endif

#define getSkinNormal(normal) (skinNormal)

#if defined (X3D_TANGENTS)
#define getSkinTangent(tangent) (skinTangent)
#endif

#else
   #define getSkinNormal(normal) (normal)
   #define getSkinTangent(tangent) (tangent)
#endif

vec4
getSkinVertex (const in vec4 vertex, const in vec3 normal, const in vec3 tangent)
{
   int  coordIndex = int (x3d_CoordIndex);
   vec4 skin       = vertex;

   #if defined (X3D_NORMALS)
      skinNormal = normal;

      #if defined (X3D_TANGENTS)
         skinTangent = tangent;
      #endif
   #endif

   #if X3D_NUM_DISPLACEMENTS > 0
   {
      int coordIndexD = coordIndex * (X3D_NUM_DISPLACEMENTS * 2);

      for (int i = 0; i < X3D_NUM_DISPLACEMENTS; ++ i)
      {
         int   index        = coordIndexD + i * 2;
         vec4  displacement = texelFetch (x3d_DisplacementsTexture, index, 0);
         int   weightIndex  = int (texelFetch (x3d_DisplacementsTexture, index + 1, 0) .x);
         float weight       = texelFetch (x3d_DisplacementWeightsTexture, weightIndex, 0) .x;

         skin .xyz += getDisplacementJointMatrix (int (displacement .w)) * (displacement .xyz * weight);
      }
   }
   #endif

   #if X3D_NUM_JOINT_SETS > 0
   {
      int coordIndexJ = coordIndex * (X3D_NUM_JOINT_SETS * 2);

      for (int i = 0; i < X3D_NUM_JOINT_SETS; ++ i)
      {
         int   index   = coordIndexJ + i;
         ivec4 joints  = ivec4 (texelFetch (x3d_JointsTexture, index, 0));
         vec4  weights = texelFetch (x3d_JointsTexture, index + X3D_NUM_JOINT_SETS, 0);

         for (int i = 0; i < 4; ++ i)
         {
            int   joint  = joints  [i];
            float weight = weights [i];

            skin += (getJointMatrix (joint) * vertex - vertex) * weight;

            #if defined (X3D_NORMALS)
               mat3 jointNormalMatrix = getJointNormalMatrix (joint);

               skinNormal += (jointNormalMatrix * normal - normal) * weight;

               #if defined (X3D_TANGENTS)
                  skinTangent += (jointNormalMatrix * tangent - tangent) * weight;
               #endif
            #endif
         }
      }
   }
   #endif

   return skin;
}
#endif
`;
