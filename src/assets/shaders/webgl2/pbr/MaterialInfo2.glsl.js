export default /* glsl */ `

#if defined (X3D_MATERIAL_SPECULAR_GLOSSINESS)
   #if defined (X3D_DIFFUSE_TEXTURE)
      uniform x3d_DiffuseTextureParameters x3d_DiffuseTexture;
   #endif
#elif defined (X3D_MATERIAL_METALLIC_ROUGHNESS)
   #if defined (X3D_BASE_TEXTURE)
      uniform x3d_BaseTextureParameters x3d_BaseTexture;
   #endif
#endif

vec4
getBaseColor ()
{
   // Get base parameter.

   float alpha = 1.0 - x3d_Material .transparency;

   #if defined (X3D_MATERIAL_SPECULAR_GLOSSINESS)
      vec4 baseColor = vec4 (x3d_Material .diffuseColor, alpha);
   #elif defined (X3D_MATERIAL_METALLIC_ROUGHNESS)
      vec4 baseColor = vec4 (x3d_Material .baseColor, alpha);
   #endif

   // Get texture color.

   #if defined (X3D_MATERIAL_SPECULAR_GLOSSINESS)
      #if defined (X3D_DIFFUSE_TEXTURE)
         vec3 texCoord = getTexCoord (x3d_Diffuse .textureTransformMapping, x3d_Diffuse .textureCoordinateMapping);
         #if defined (X3D_DIFFUSE_TEXTURE_2D)
            baseColor *= texture (x3d_Diffuse .texture2D, texCoord .st);
         #elif defined (X3D_DIFFUSE_TEXTURE_3D)
            baseColor *= texture (x3d_Diffuse .texture3D, texCoord);
         #elif defined (X3D_DIFFUSE_TEXTURE_CUBE)
            baseColor *= texture (x3d_Diffuse .textureCube, texCoord);
         #endif
      #elif defined (X3D_TEXTURE)
         baseColor = getTextureColor (baseColor, vec4 (vec3 (1.0), alpha));
      #endif
   #elif defined (X3D_MATERIAL_METALLIC_ROUGHNESS)
      #if defined (X3D_BASE_TEXTURE)
         vec3 texCoord = getTexCoord (x3d_BaseTexture .textureTransformMapping, x3d_BaseTexture .textureCoordinateMapping);
         #if defined (X3D_BASE_TEXTURE_2D)
            baseColor *= texture (x3d_BaseTexture .texture2D, texCoord .st);
         #elif defined (X3D_BASE_TEXTURE_3D)
            baseColor *= texture (x3d_BaseTexture .texture3D, texCoord);
         #elif defined (X3D_BASE_TEXTURE_CUBE)
            baseColor *= texture (x3d_BaseTexture .textureCube, texCoord);
         #endif
      #elif defined (X3D_TEXTURE)
         baseColor = getTextureColor (baseColor, vec4 (vec3 (1.0), alpha));
      #endif
   #endif

   #if defined (X3D_COLOR_MATERIAL)
      baseColor *= color;
   #endif

   return baseColor;
}
`;
