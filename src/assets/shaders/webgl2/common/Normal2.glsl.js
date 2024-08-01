export default /* glsl */ `
struct NormalInfo
{
   vec3 ng;
   vec3 ntex;
   vec3 n;
   vec3 t;
   vec3 b;
};

#if defined (X3D_NORMAL_TEXTURE)
uniform x3d_NormalTextureParameters x3d_NormalTexture;
#endif

#if !defined (X3D_TANGENTS)
mat3
generateTBN (const in vec3 normal)
{
   vec3  bitangent = vec3 (0.0, 1.0, 0.0);
   float NdotUp    = dot (normal, vec3 (0.0, 1.0, 0.0));
   float epsilon   = 0.0000001;

   if (1.0 - abs (NdotUp) <= epsilon)
   {
      // Sampling +Y or -Y, so we need a more robust bitangent.
      if (NdotUp > 0.0)
         bitangent = vec3 (0.0, 0.0, 1.0);
      else
         bitangent = vec3 (0.0, 0.0, -1.0);
   }

   vec3 tangent = normalize (cross (bitangent, normal));

   bitangent = cross (normal, tangent);

   return mat3 (tangent, bitangent, normal);
}
#endif

NormalInfo
getNormalInfo (const in float normalScale)
{
   #if defined (X3D_NORMAL_TEXTURE)
      vec3 UV = getTexCoord (x3d_NormalTexture .textureTransformMapping, x3d_NormalTexture .textureCoordinateMapping);
   #else
      vec3 UV = getTexCoord (0, 0);
   #endif

   #if defined (X3D_NORMAL_TEXTURE_FLIP_Y)
      UV .t = 1.0 - UV .t;
   #endif

   vec3 n, t, b, ng;

   // Compute geometrical TBN:
   #if defined (X3D_TANGENTS)
      // Trivial TBN computation, present as vertex attribute.
      // Normalize eigenvectors as matrix is linearly interpolated.
      t  = normalize (TBN [0]);
      b  = normalize (TBN [1]);
      ng = normalize (TBN [2]);
   #else
      mat3 TBN = generateTBN (normalize (normal));

      t  = TBN [0];
      b  = TBN [1];
      ng = TBN [2];

      // vec2 uv_dx = dFdx (UV .st);
      // vec2 uv_dy = dFdy (UV .st);

      // if (length (uv_dx) <= 1e-2)
      //    uv_dx = vec2 (1.0, 0.0);

      // if (length (uv_dy) <= 1e-2)
      //    uv_dy = vec2 (0.0, 1.0);

      // vec3 t_ = (uv_dy .t * dFdx (vertex) - uv_dx .t * dFdy (vertex)) / (uv_dx .s * uv_dy .t - uv_dy .s * uv_dx .t);

      // // Normals are either present as vertex attributes or approximated.
      // ng = normalize (normal);
      // t  = normalize (t_ - ng * dot (ng, t_));
      // b  = cross (ng, t);
   #endif

   // For a back-facing surface, the tangential basis vectors are negated.
   if (gl_FrontFacing == false)
   {
      t  *= -1.0;
      b  *= -1.0;
      ng *= -1.0;
   }

   // Compute normals:
   NormalInfo info;

   info .ng = ng;

   #if defined (X3D_NORMAL_TEXTURE)
      #if __VERSION__ == 100
         #if defined (X3D_NORMAL_TEXTURE_2D)
            info .ntex = texture2D (x3d_NormalTexture .texture2D, UV .st) .rgb;
         #elif defined (X3D_NORMAL_TEXTURE_CUBE)
            info .ntex = textureCube (x3d_NormalTexture .textureCube, UV) .rgb;
         #endif
      #else
         #if defined (X3D_NORMAL_TEXTURE_2D)
            info .ntex = texture (x3d_NormalTexture .texture2D, UV .st) .rgb;
         #elif defined (X3D_NORMAL_TEXTURE_3D)
            info .ntex = texture (x3d_NormalTexture .texture3D, UV) .rgb;
         #elif defined (X3D_NORMAL_TEXTURE_CUBE)
            info .ntex = texture (x3d_NormalTexture .textureCube, UV) .rgb;
         #endif
      #endif

      info .ntex  = info .ntex * 2.0 - vec3 (1.0);
      info .ntex *= vec3 (vec2 (normalScale), 1.0);
      info .ntex  = normalize (info .ntex);
      info .n     = normalize (mat3 (t, b, ng) * info .ntex);
   #else
      info .n = ng;
   #endif

   info .t = t;
   info .b = b;

   return info;
}

vec3
getNormalVector (const in float normalScale)
{
   return getNormalInfo (normalScale) .n;
}
`;
