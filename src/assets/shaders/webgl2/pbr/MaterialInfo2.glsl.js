export default /* glsl */ `

struct MaterialInfo
{
   float ior;
   float perceptualRoughness;      // roughness value, as authored by the model creator (input to shader)
   vec3 f0;                        // full reflectance color (n incidence angle)

   float alphaRoughness;           // roughness mapped to a more linear change in the roughness (proposed by [2])
   vec3 c_diff;

   vec3 f90;                       // reflectance color at grazing angle
   float metallic;

   vec3 baseColor;

   float sheenRoughnessFactor;
   vec3 sheenColorFactor;

   vec3 clearcoatF0;
   vec3 clearcoatF90;
   float clearcoatFactor;
   vec3 clearcoatNormal;
   float clearcoatRoughness;

   // KHR_materials_specular
   float specularWeight; // product of specularFactor and specularTexture.a

   float transmissionFactor;

   float thickness;
   vec3 attenuationColor;
   float attenuationDistance;

   // KHR_materials_iridescence
   float iridescenceFactor;
   float iridescenceIor;
   float iridescenceThickness;

   // KHR_materials_anisotropy
   vec3 anisotropicT;
   vec3 anisotropicB;
   float anisotropyStrength;
};

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

   // In addition to the material properties, if a primitive specifies a vertex color using the attribute semantic property COLOR_0, then this value acts as an additional linear multiplier to base color.
   #if defined (X3D_COLOR_MATERIAL)
      baseColor *= color;
   #endif

   // Get texture color.

   #if defined (X3D_MATERIAL_SPECULAR_GLOSSINESS)
      #if defined (X3D_DIFFUSE_TEXTURE)
         vec3 texCoord = getTexCoord (x3d_DiffuseTexture .textureTransformMapping, x3d_DiffuseTexture .textureCoordinateMapping);

         #if defined (X3D_DIFFUSE_TEXTURE_FLIP_Y)
            texCoord .t = 1.0 - texCoord .t;
         #endif

         #if defined (X3D_DIFFUSE_TEXTURE_2D)
            vec4 textureColor = texture (x3d_DiffuseTexture .texture2D, texCoord .st);
         #elif defined (X3D_DIFFUSE_TEXTURE_3D)
            vec4 textureColor = texture (x3d_DiffuseTexture .texture3D, texCoord);
         #elif defined (X3D_DIFFUSE_TEXTURE_CUBE)
            vec4 textureColor = texture (x3d_DiffuseTexture .textureCube, texCoord);
         #endif

         #if defined (X3D_BASE_TEXTURE_LINEAR)
            baseColor *= textureColor;
         #else
            baseColor *= sRGBToLinear (textureColor);
         #endif
      #elif defined (X3D_TEXTURE)
         baseColor = getTextureColor (baseColor, vec4 (vec3 (1.0), alpha));
      #endif
   #elif defined (X3D_MATERIAL_METALLIC_ROUGHNESS)
      #if defined (X3D_BASE_TEXTURE)
         vec3 texCoord = getTexCoord (x3d_BaseTexture .textureTransformMapping, x3d_BaseTexture .textureCoordinateMapping);

         #if defined (X3D_BASE_TEXTURE_FLIP_Y)
            texCoord .t = 1.0 - texCoord .t;
         #endif

         #if defined (X3D_BASE_TEXTURE_2D)
            vec4 textureColor = texture (x3d_BaseTexture .texture2D, texCoord .st);
         #elif defined (X3D_BASE_TEXTURE_3D)
            vec4 textureColor = texture (x3d_BaseTexture .texture3D, texCoord);
         #elif defined (X3D_BASE_TEXTURE_CUBE)
            vec4 textureColor = texture (x3d_BaseTexture .textureCube, texCoord);
         #endif

         #if defined (X3D_BASE_TEXTURE_LINEAR)
            baseColor *= textureColor;
         #else
            baseColor *= sRGBToLinear (textureColor);
         #endif
      #elif defined (X3D_TEXTURE)
         baseColor = getTextureColor (baseColor, vec4 (vec3 (1.0), alpha));
      #endif
   #endif

   return baseColor;
}

#if defined (X3D_MATERIAL_METALLIC_ROUGHNESS)
#if defined (X3D_METALLIC_ROUGHNESS_TEXTURE)
   uniform x3d_MetallicRoughnessTextureParameters x3d_MetallicRoughnessTexture;
#endif

MaterialInfo
getMetallicRoughnessInfo (in MaterialInfo info)
{
   // Metallic and Roughness material properties are packed together
   // In glTF, these factors can be specified by fixed scalar values
   // or from a metallic-roughness map
   info .metallic            = x3d_Material .metallic;
   info .perceptualRoughness = x3d_Material .roughness;

   // Get texture color.

   #if defined (X3D_METALLIC_ROUGHNESS_TEXTURE)
      vec3 texCoord = getTexCoord (x3d_MetallicRoughnessTexture .textureTransformMapping, x3d_MetallicRoughnessTexture .textureCoordinateMapping);

      #if defined (X3D_METALLIC_ROUGHNESS_TEXTURE_FLIP_Y)
         texCoord .t = 1.0 - texCoord .t;
      #endif

      // Roughness is stored in the 'g' channel, metallic is stored in the 'b' channel.
      // This layout intentionally reserves the 'r' channel for (optional) occlusion map data
      #if defined (X3D_METALLIC_ROUGHNESS_TEXTURE_2D)
         vec4 mrSample = texture (x3d_MetallicRoughnessTexture .texture2D, texCoord .st);
      #elif defined (X3D_METALLIC_ROUGHNESS_TEXTURE_3D)
         vec4 mrSample = texture (x3d_MetallicRoughnessTexture .texture3D, texCoord);
      #elif defined (X3D_METALLIC_ROUGHNESS_TEXTURE_CUBE)
         vec4 mrSample = texture (x3d_MetallicRoughnessTexture .textureCube, texCoord);
      #endif

      info .metallic            *= mrSample .b;
      info .perceptualRoughness *= mrSample .g;
   #endif

   // Achromatic f0 based on IOR.
   info .c_diff = mix (info .baseColor .rgb, vec3 (0.0), info .metallic);
   info .f0     = mix (info .f0, info .baseColor .rgb, info .metallic);

   return info;
}
#endif

#if defined (X3D_EMISSIVE_TEXTURE)
   uniform x3d_EmissiveTextureParameters x3d_EmissiveTexture;
#endif

vec3
getEmissiveColor ()
{
   // Get emissive parameter.

   vec3 emissiveColor = x3d_Material .emissiveColor;

   // Get texture color.

   #if defined (X3D_EMISSIVE_TEXTURE)
      vec3 texCoord = getTexCoord (x3d_EmissiveTexture .textureTransformMapping, x3d_EmissiveTexture .textureCoordinateMapping);

      #if defined (X3D_EMISSIVE_TEXTURE_FLIP_Y)
         texCoord .t = 1.0 - texCoord .t;
      #endif

      #if defined (X3D_EMISSIVE_TEXTURE_2D)
         vec3 textureColor = texture (x3d_EmissiveTexture .texture2D, texCoord .st) .rgb;
      #elif defined (X3D_EMISSIVE_TEXTURE_3D)
         vec3 textureColor = texture (x3d_EmissiveTexture .texture3D, texCoord) .rgb;
      #elif defined (X3D_EMISSIVE_TEXTURE_CUBE)
         vec3 textureColor = texture (x3d_EmissiveTexture .textureCube, texCoord) .rgb;
      #endif

      #if defined (X3D_EMISSIVE_TEXTURE_LINEAR)
         emissiveColor *= textureColor;
      #else
         emissiveColor *= sRGBToLinear (textureColor);
      #endif
   #endif

   return emissiveColor;
}

#if defined (X3D_OCCLUSION_TEXTURE)
   uniform x3d_OcclusionTextureParameters x3d_OcclusionTexture;
#endif

float
getOcclusionFactor ()
{
   // Get texture color.

   #if defined (X3D_OCCLUSION_TEXTURE)
      vec3 texCoord = getTexCoord (x3d_OcclusionTexture .textureTransformMapping, x3d_OcclusionTexture .textureCoordinateMapping);

      #if defined (X3D_OCCLUSION_TEXTURE_FLIP_Y)
         texCoord .t = 1.0 - texCoord .t;
      #endif

      #if defined (X3D_OCCLUSION_TEXTURE_2D)
         return texture (x3d_OcclusionTexture .texture2D, texCoord .st) .r;
      #elif defined (X3D_OCCLUSION_TEXTURE_3D)
         return texture (x3d_OcclusionTexture .texture3D, texCoord) .r;
      #elif defined (X3D_OCCLUSION_TEXTURE_CUBE)
         return texture (x3d_OcclusionTexture .textureCube, texCoord) .r;
      #endif
   #else
      return 1.0;
   #endif
}

#if defined (X3D_SPECULAR_MATERIAL_EXT)
#if defined (X3D_SPECULAR_MATERIAL_EXT_SPECULAR_TEXTURE)
uniform x3d_SpecularTextureParametersEXT x3d_SpecularTextureEXT;

float
getSpecularEXT ()
{
   // Get texture color.

   vec3 texCoord = getTexCoord (x3d_SpecularTextureEXT .textureTransformMapping, x3d_SpecularTextureEXT .textureCoordinateMapping);

   #if defined (X3D_SPECULAR_MATERIAL_EXT_SPECULAR_TEXTURE_FLIP_Y)
      texCoord .t = 1.0 - texCoord .t;
   #endif

   #if defined (X3D_SPECULAR_MATERIAL_EXT_SPECULAR_TEXTURE_2D)
      return texture (x3d_SpecularTextureEXT .texture2D, texCoord .st) .a;
   #elif defined (X3D_SPECULAR_MATERIAL_EXT_SPECULAR_TEXTURE_3D)
      return texture (x3d_SpecularTextureEXT .texture3D, texCoord) .a;
   #elif defined (X3D_SPECULAR_MATERIAL_EXT_SPECULAR_TEXTURE_CUBE)
      return texture (x3d_SpecularTextureEXT .textureCube, texCoord) .a;
   #endif
}
#endif

#if defined (X3D_SPECULAR_MATERIAL_EXT_SPECULAR_COLOR_TEXTURE)
uniform x3d_SpecularColorTextureParametersEXT x3d_SpecularColorTextureEXT;

vec3
getSpecularColorEXT ()
{
   // Get texture color.

   vec3 texCoord = getTexCoord (x3d_SpecularColorTextureEXT .textureTransformMapping, x3d_SpecularColorTextureEXT .textureCoordinateMapping);

   #if defined (X3D_SPECULAR_MATERIAL_EXT_SPECULAR_COLOR_TEXTURE_FLIP_Y)
      texCoord .t = 1.0 - texCoord .t;
   #endif

   #if defined (X3D_SPECULAR_MATERIAL_EXT_SPECULAR_COLOR_TEXTURE_2D)
      return texture (x3d_SpecularColorTextureEXT .texture2D, texCoord .st) .rgb;
   #elif defined (X3D_SPECULAR_MATERIAL_EXT_SPECULAR_COLOR_TEXTURE_3D)
      return texture (x3d_SpecularColorTextureEXT .texture3D, texCoord) .rgb;
   #elif defined (X3D_SPECULAR_MATERIAL_EXT_SPECULAR_COLOR_TEXTURE_CUBE)
      return texture (x3d_SpecularColorTextureEXT .textureCube, texCoord) .rgb;
   #endif
}
#endif

uniform float x3d_SpecularEXT;
uniform vec3  x3d_SpecularColorEXT;

MaterialInfo
getSpecularInfo (in MaterialInfo info)
{
   vec4 specularTexture = vec4 (1.0);

   #if defined (X3D_SPECULAR_MATERIAL_EXT_SPECULAR_TEXTURE)
      specularTexture .a = getSpecularEXT ();
   #endif

   #if defined (X3D_SPECULAR_MATERIAL_EXT_SPECULAR_COLOR_TEXTURE)
      specularTexture .rgb = getSpecularColorEXT ();
   #endif

   vec3 dielectricSpecularF0 = min (info .f0 * x3d_SpecularColorEXT * specularTexture .rgb, vec3 (1.0));

   info .f0             = mix (dielectricSpecularF0, info .baseColor .rgb, info .metallic);
   info .specularWeight = x3d_SpecularEXT * specularTexture .a;
   info .c_diff         = mix (info .baseColor .rgb, vec3 (0.0), info .metallic);

   return info;
}
#endif
`;
