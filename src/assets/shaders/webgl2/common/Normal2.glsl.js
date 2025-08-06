export default () => /* glsl */ `

#if !defined (X3D_NORMALS) && (defined (X3D_GEOMETRY_2D) || defined (X3D_GEOMETRY_3D))
// Generate flat normals for 2D and 3D geometry.
vec3
generateFlatNormal (const in vec3 vertex)
{
   vec3 dFdxPos = dFdx (vertex);
   vec3 dFdyPos = dFdy (vertex);

   return normalize (cross (dFdxPos, dFdyPos));
}

void
generateFlatNormals ()
{
   normal = generateFlatNormal (vertex);

   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      localNormal = generateFlatNormal (localVertex);
   #endif
}
#endif

#if defined (X3D_LIGHTING) || defined (X3D_USE_IBL) || defined (X3D_ANISOTROPY_MATERIAL_EXT) || defined (X3D_CLEARCOAT_MATERIAL_EXT)
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

NormalInfo
getNormalInfo (const in float normalScale)
{
   #if defined (X3D_NORMAL_TEXTURE)
      #if defined (X3D_NORMAL_TEXTURE_FLIP_Y)
         vec2 flipY = vec2 (-1.0, 1.0);
      #else
         vec2 flipY = vec2 (1.0, 0.0);
      #endif

      vec3 UV = getTexCoord (x3d_NormalTexture .textureTransformMapping, x3d_NormalTexture .textureCoordinateMapping, flipY);
   #else
      vec3 UV = vertex;
   #endif

   vec3 n, t, b, ng;

   // Compute geometrical TBN:
   #if defined (X3D_NORMALS) && defined (X3D_TANGENTS)
      // Trivial TBN computation, present as vertex attribute.
      // Normalize eigenvectors as matrix is linearly interpolated.
      t  = normalize (TBN [0]);
      b  = normalize (TBN [1]);
      ng = normalize (TBN [2]);
   #else
      vec2 uv_dx = dFdx (UV .st);
      vec2 uv_dy = dFdy (UV .st);

      if (length (uv_dx) <= 1e-2)
         uv_dx = vec2 (1.0, 0.0);

      if (length (uv_dy) <= 1e-2)
         uv_dy = vec2 (0.0, 1.0);

      // TODO: Unfortunately, if we use vertex in dFdx/dFdy, we can see the hard faces in the TBN.
      // This can only be solved with precomputed tangents.
      vec3 t_ = (uv_dy .t * dFdx (vertex) - uv_dx .t * dFdy (vertex)) / (uv_dx .s * uv_dy .t - uv_dy .s * uv_dx .t);

      // Normals are either present as vertex attributes or approximated.
      ng = normalize (normal);
      t  = normalize (t_ - ng * dot (ng, t_));
      b  = cross (ng, t);
   #endif

   #if defined (X3D_GEOMETRY_2D) || defined (X3D_GEOMETRY_3D)
   // For a back-facing surface, the tangential basis vectors are negated.
   if (frontFacing == false)
   {
      t  = -t;
      b  = -b;
      ng = -ng;
   }
   #endif

   // Compute normals:
   NormalInfo info;

   info .ng = ng;

   #if defined (X3D_NORMAL_TEXTURE)
      #if defined (X3D_NORMAL_TEXTURE_2D)
         vec3 ntex = texture (x3d_NormalTexture .texture2D, UV .st) .rgb;
      #elif defined (X3D_NORMAL_TEXTURE_3D)
         vec3 ntex = texture (x3d_NormalTexture .texture3D, UV) .rgb;
      #elif defined (X3D_NORMAL_TEXTURE_CUBE)
         vec3 ntex = texture (x3d_NormalTexture .textureCube, UV) .rgb;
      #endif

      // Convert from [0, 1] to [-1, 1] range.
      // Scale by normalScale.
      // The normal texture is expected to be in tangent space.
      ntex  = ntex * 2.0 - vec3 (1.0);
      ntex *= vec3 (vec2 (normalScale), 1.0);
      ntex  = normalize (ntex);

      info .ntex = ntex;
      info .n    = normalize (mat3 (t, b, ng) * ntex);
   #else
      info .n = ng;
   #endif

   info .t = t;
   info .b = b;

   return info;
}
#endif

#if defined (X3D_LIGHTING)
vec3
getNormalVector (const in float normalScale)
{
   return getNormalInfo (normalScale) .n;
}
#endif
`;
