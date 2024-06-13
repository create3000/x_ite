export default /* glsl */ `
#if defined (X3D_NORMAL_TEXTURE)
// Tangent-Bitangent-Normal-Matrix
mat3
getTBNMatrix (const in vec2 texCoord, const in vec3 ng)
{
   vec3 pos_dx = dFdx (vertex);
   vec3 pos_dy = dFdy (vertex);
   vec2 tex_dx = dFdx (texCoord);
   vec2 tex_dy = dFdy (texCoord);
   vec3 t      = (tex_dy .t * pos_dx - tex_dx .t * pos_dy) / (tex_dx .s * tex_dy.t - tex_dy .s * tex_dx .t);
   vec3 N      = ng;
   vec3 T      = normalize (t - N * dot (N, t));
   vec3 B      = normalize (cross (N, T));
   mat3 tbn    = mat3 (T, B, N);

   return tbn;
}
#endif

#if defined (X3D_NORMAL_TEXTURE)
uniform x3d_NormalTextureParameters x3d_NormalTexture;
#endif

struct NormalInfo
{
   vec3 ng;
   vec3 ntex;
   vec3 n;
   vec3 t;
   vec3 b;
};

NormalInfo
getNormalInfo (const in float normalScale)
{
   #if defined (X3D_NORMAL_TEXTURE)
      vec3 UV = getTexCoord (x3d_NormalTexture .textureTransformMapping, x3d_NormalTexture .textureCoordinateMapping);
   #elif defined (X3D_MATERIAL_TEXTURES)
      vec3 UV = getTexCoord (0, 0);
   #else
      vec3 UV = vec3 (0.0);
   #endif

   vec2 uv_dx = dFdx (UV .st);
   vec2 uv_dy = dFdy (UV .st);

   if (length (uv_dx) <= 1e-2)
      uv_dx = vec2 (1.0, 0.0);

   if (length (uv_dy) <= 1e-2)
      uv_dy = vec2 (0.0, 1.0);

   vec3 t_ = (uv_dy .t * dFdx (vertex) - uv_dx .t * dFdy (vertex)) / (uv_dx .s * uv_dy .t - uv_dy .s * uv_dx .t);

   vec3 n, t, b, ng;

   // Compute geometrical TBN:
   // Normals are either present as vertex attributes or approximated.
   ng = normalize (normal);
   t  = normalize (t_ - ng * dot (ng, t_));
   b  = cross (ng, t);

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
      #if defined (X3D_NORMAL_TEXTURE_2D)
         info .ntex = texture (x3d_NormalTexture .texture2D, UV .st) .rgb;
      #elif defined (X3D_NORMAL_TEXTURE_3D)
         info .ntex = texture (x3d_NormalTexture .texture3D, UV) .rgb;
      #elif defined (X3D_NORMAL_TEXTURE_CUBE)
         info .ntex = texture (x3d_NormalTexture .textureCube, UV) .rgb;
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
