export default /* glsl */ `
#if defined (X3D_NORMAL_TEXTURE)
// Tangent-Bitangent-Normal-Matrix
mat3
getTBNMatrix (const in vec2 texCoord)
{
   vec3 pos_dx = dFdx (vertex);
   vec3 pos_dy = dFdy (vertex);
   vec3 tex_dx = dFdx (vec3 (texCoord, 0.0));
   vec3 tex_dy = dFdy (vec3 (texCoord, 0.0));
   vec3 t      = (tex_dy .t * pos_dx - tex_dx .t * pos_dy) / (tex_dx .s * tex_dy.t - tex_dy .s * tex_dx .t);
   vec3 N      = normalize (normal); // OR generated face normal: n = normalize (cross (pos_dx, pos_dy));
   vec3 T      = normalize (t - N * dot (N, t));
   vec3 B      = normalize (cross (N, T));
   mat3 tbn    = mat3 (T, B, N);

   return tbn;
}
#endif

#if defined (X3D_NORMAL_TEXTURE)
uniform x3d_NormalTextureParameters x3d_NormalTexture;
#endif

vec3
getNormalVector (const in float normalScale)
{
   float facing = gl_FrontFacing ? 1.0 : -1.0;

   // Get normal vector.

   #if defined (X3D_NORMAL_TEXTURE) && ! defined (X3D_NORMAL_TEXTURE_3D)
      vec3 texCoord = getTexCoord (x3d_NormalTexture .textureTransformMapping, x3d_NormalTexture .textureCoordinateMapping);

      #if defined (X3D_NORMAL_TEXTURE_FLIP_Y)
         texCoord .t = 1.0 - texCoord .t;
      #endif

      vec3 scale = vec3 (vec2 (normalScale), 1.0);
      mat3 tbn   = getTBNMatrix (texCoord .st);

      #if defined (X3D_NORMAL_TEXTURE_2D)
         vec3 n = texture2D (x3d_NormalTexture .texture2D, texCoord .st) .rgb;
      #elif defined (X3D_NORMAL_TEXTURE_CUBE)
         vec3 n = textureCube (x3d_NormalTexture .textureCube, texCoord) .rgb;
      #endif

      return normalize (tbn * ((n * 2.0 - 1.0) * scale)) * facing;
   #else
      return normalize (normal) * facing;
   #endif
}
`;
