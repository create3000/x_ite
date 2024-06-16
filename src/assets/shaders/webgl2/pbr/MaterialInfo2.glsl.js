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

   // KHR_materials_dispersion
   float dispersion;
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

#if defined (X3D_EMISSIVE_STRENGTH_MATERIAL_EXT)
   uniform float x3d_EmissiveStrengthEXT;
#endif

vec3
getEmissiveColor ()
{
   // Get emissive parameter.

   vec3 emissiveColor = x3d_Material .emissiveColor;

   #if defined (X3D_EMISSIVE_STRENGTH_MATERIAL_EXT)
      emissiveColor *= x3d_EmissiveStrengthEXT;
   #endif

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

#if defined (X3D_SHEEN_MATERIAL_EXT)
#if defined (X3D_SHEEN_COLOR_TEXTURE_EXT)
uniform x3d_SheenColorTextureParametersEXT x3d_SheenColorTextureEXT;

vec3
getSheenColorEXT ()
{
   // Get texture color.

   vec3 texCoord = getTexCoord (x3d_SheenColorTextureEXT .textureTransformMapping, x3d_SheenColorTextureEXT .textureCoordinateMapping);

   #if defined (X3D_SHEEN_COLOR_TEXTURE_EXT_FLIP_Y)
      texCoord .t = 1.0 - texCoord .t;
   #endif

   #if defined (X3D_SHEEN_COLOR_TEXTURE_EXT_2D)
      return texture (x3d_SheenColorTextureEXT .texture2D, texCoord .st) .rgb;
   #elif defined (X3D_SHEEN_COLOR_TEXTURE_EXT_3D)
      return texture (x3d_SheenColorTextureEXT .texture3D, texCoord) .rgb;
   #elif defined (X3D_SHEEN_COLOR_TEXTURE_EXT_CUBE)
      return texture (x3d_SheenColorTextureEXT .textureCube, texCoord) .rgb;
   #endif
}
#endif

#if defined (X3D_SHEEN_ROUGHNESS_TEXTURE_EXT)
uniform x3d_SheenRoughnessTextureParametersEXT x3d_SheenRoughnessTextureEXT;

float
getSheenRoughnessEXT ()
{
   // Get texture color.

   vec3 texCoord = getTexCoord (x3d_SheenRoughnessTextureEXT .textureTransformMapping, x3d_SheenRoughnessTextureEXT .textureCoordinateMapping);

   #if defined (X3D_SHEEN_ROUGHNESS_TEXTURE_EXT_FLIP_Y)
      texCoord .t = 1.0 - texCoord .t;
   #endif

   #if defined (X3D_SHEEN_ROUGHNESS_TEXTURE_EXT_2D)
      return texture (x3d_SheenRoughnessTextureEXT .texture2D, texCoord .st) .a;
   #elif defined (X3D_SHEEN_ROUGHNESS_TEXTURE_EXT_3D)
      return texture (x3d_SheenRoughnessTextureEXT .texture3D, texCoord) .a;
   #elif defined (X3D_SHEEN_ROUGHNESS_TEXTURE_EXT_CUBE)
      return texture (x3d_SheenRoughnessTextureEXT .textureCube, texCoord) .a;
   #endif
}
#endif

uniform vec3  x3d_SheenColorEXT;
uniform float x3d_SheenRoughnessEXT;

MaterialInfo
getSheenInfo (in MaterialInfo info)
{
   info .sheenColorFactor     = x3d_SheenColorEXT;
   info .sheenRoughnessFactor = x3d_SheenRoughnessEXT;

   #if defined (X3D_SHEEN_COLOR_TEXTURE_EXT)
      info .sheenColorFactor *= getSheenColorEXT ();
   #endif

   #if defined (X3D_SHEEN_ROUGHNESS_TEXTURE_EXT)
      info .sheenRoughnessFactor *= getSheenRoughnessEXT ();
   #endif

   return info;
}

uniform sampler2D x3d_SheenELUTTextureEXT;

float
albedoSheenScalingLUT (const in float NdotV, const in float sheenRoughnessFactor)
{
   return texture (x3d_SheenELUTTextureEXT, vec2 (NdotV, sheenRoughnessFactor)) .r;
}
#endif

#if defined (X3D_CLEARCOAT_MATERIAL_EXT)
#if defined (X3D_CLEARCOAT_TEXTURE_EXT)
uniform x3d_ClearcoatTextureParametersEXT x3d_ClearcoatTextureEXT;

float
getClearcoatEXT ()
{
   // Get texture color.

   vec3 texCoord = getTexCoord (x3d_ClearcoatTextureEXT .textureTransformMapping, x3d_ClearcoatTextureEXT .textureCoordinateMapping);

   #if defined (X3D_CLEARCOAT_TEXTURE_EXT_FLIP_Y)
      texCoord .t = 1.0 - texCoord .t;
   #endif

   #if defined (X3D_CLEARCOAT_TEXTURE_EXT_2D)
      return texture (x3d_ClearcoatTextureEXT .texture2D, texCoord .st) .r;
   #elif defined (X3D_CLEARCOAT_TEXTURE_EXT_3D)
      return texture (x3d_ClearcoatTextureEXT .texture3D, texCoord) .r;
   #elif defined (X3D_CLEARCOAT_TEXTURE_EXT_CUBE)
      return texture (x3d_ClearcoatTextureEXT .textureCube, texCoord) .r;
   #endif
}
#endif

#if defined (X3D_CLEARCOAT_ROUGHNESS_TEXTURE_EXT)
uniform x3d_ClearcoatRoughnessTextureParametersEXT x3d_ClearcoatRoughnessTextureEXT;

float
getClearcoatRoughnessEXT ()
{
   // Get texture color.

   vec3 texCoord = getTexCoord (x3d_ClearcoatRoughnessTextureEXT .textureTransformMapping, x3d_ClearcoatRoughnessTextureEXT .textureCoordinateMapping);

   #if defined (X3D_CLEARCOAT_ROUGHNESS_TEXTURE_EXT_FLIP_Y)
      texCoord .t = 1.0 - texCoord .t;
   #endif

   #if defined (X3D_CLEARCOAT_ROUGHNESS_TEXTURE_EXT_2D)
      return texture (x3d_ClearcoatRoughnessTextureEXT .texture2D, texCoord .st) .g;
   #elif defined (X3D_CLEARCOAT_ROUGHNESS_TEXTURE_EXT_3D)
      return texture (x3d_ClearcoatRoughnessTextureEXT .texture3D, texCoord) .g;
   #elif defined (X3D_CLEARCOAT_ROUGHNESS_TEXTURE_EXT_CUBE)
      return texture (x3d_ClearcoatRoughnessTextureEXT .textureCube, texCoord) .g;
   #endif
}
#endif

#if defined (X3D_CLEARCOAT_NORMAL_TEXTURE_EXT)
const float x3d_ClearcoatNormalScaleEXT = 1.0;
uniform x3d_ClearcoatNormalTextureParametersEXT x3d_ClearcoatNormalTextureEXT;
#endif

vec3
getClearcoatNormalEXT (const in NormalInfo normalInfo)
{
   #if defined (X3D_CLEARCOAT_NORMAL_TEXTURE_EXT)
      // Get texture color.

      vec3 texCoord = getTexCoord (x3d_ClearcoatNormalTextureEXT .textureTransformMapping, x3d_ClearcoatNormalTextureEXT .textureCoordinateMapping);

      #if defined (X3D_CLEARCOAT_NORMAL_TEXTURE_EXT_FLIP_Y)
         texCoord .t = 1.0 - texCoord .t;
      #endif

      #if defined (X3D_CLEARCOAT_NORMAL_TEXTURE_EXT_2D)
         vec3 color = texture (x3d_ClearcoatNormalTextureEXT .texture2D, texCoord .st) .rgb;
      #elif defined (X3D_CLEARCOAT_NORMAL_TEXTURE_EXT_3D)
         vec3 color = texture (x3d_ClearcoatNormalTextureEXT .texture3D, texCoord) .rgb;
      #elif defined (X3D_CLEARCOAT_NORMAL_TEXTURE_EXT_CUBE)
         vec3 color = texture (x3d_ClearcoatNormalTextureEXT .textureCube, texCoord) .rgb;
      #endif

      vec3 n = color * 2.0 - vec3 (1.0);

      n *= vec3 (vec2 (x3d_ClearcoatNormalScaleEXT), 1.0);
      n  = mat3 (normalInfo .t, normalInfo .b, normalInfo .ng) * normalize (n);

      return n;
   #else
      return normalInfo .ng;
   #endif
}

uniform float x3d_ClearcoatEXT;
uniform float x3d_ClearcoatRoughnessEXT;

MaterialInfo
getClearCoatInfo (in MaterialInfo info, const in NormalInfo normalInfo)
{
   info .clearcoatFactor    = x3d_ClearcoatEXT;
   info .clearcoatRoughness = x3d_ClearcoatRoughnessEXT;
   info .clearcoatF0        = vec3 (pow ((info .ior - 1.0) / (info .ior + 1.0), 2.0));
   info .clearcoatF90       = vec3 (1.0);

   #if defined (X3D_CLEARCOAT_TEXTURE_EXT)
      info .clearcoatFactor *= getClearcoatEXT ();
   #endif

   #if defined (X3D_CLEARCOAT_ROUGHNESS_TEXTURE_EXT)
      info .clearcoatRoughness *= getClearcoatRoughnessEXT ();
   #endif

   info .clearcoatNormal    = getClearcoatNormalEXT (normalInfo);
   info .clearcoatRoughness = clamp (info .clearcoatRoughness, 0.0, 1.0);
   return info;
}
#endif

#if defined (X3D_SPECULAR_MATERIAL_EXT)
#if defined (X3D_SPECULAR_TEXTURE_EXT)
uniform x3d_SpecularTextureParametersEXT x3d_SpecularTextureEXT;

float
getSpecularEXT ()
{
   // Get texture color.

   vec3 texCoord = getTexCoord (x3d_SpecularTextureEXT .textureTransformMapping, x3d_SpecularTextureEXT .textureCoordinateMapping);

   #if defined (X3D_SPECULAR_TEXTURE_EXT_FLIP_Y)
      texCoord .t = 1.0 - texCoord .t;
   #endif

   #if defined (X3D_SPECULAR_TEXTURE_EXT_2D)
      return texture (x3d_SpecularTextureEXT .texture2D, texCoord .st) .a;
   #elif defined (X3D_SPECULAR_TEXTURE_EXT_3D)
      return texture (x3d_SpecularTextureEXT .texture3D, texCoord) .a;
   #elif defined (X3D_SPECULAR_TEXTURE_EXT_CUBE)
      return texture (x3d_SpecularTextureEXT .textureCube, texCoord) .a;
   #endif
}
#endif

#if defined (X3D_SPECULAR_COLOR_TEXTURE_EXT)
uniform x3d_SpecularColorTextureParametersEXT x3d_SpecularColorTextureEXT;

vec3
getSpecularColorEXT ()
{
   // Get texture color.

   vec3 texCoord = getTexCoord (x3d_SpecularColorTextureEXT .textureTransformMapping, x3d_SpecularColorTextureEXT .textureCoordinateMapping);

   #if defined (X3D_SPECULAR_COLOR_TEXTURE_EXT_FLIP_Y)
      texCoord .t = 1.0 - texCoord .t;
   #endif

   #if defined (X3D_SPECULAR_COLOR_TEXTURE_EXT_2D)
      return texture (x3d_SpecularColorTextureEXT .texture2D, texCoord .st) .rgb;
   #elif defined (X3D_SPECULAR_COLOR_TEXTURE_EXT_3D)
      return texture (x3d_SpecularColorTextureEXT .texture3D, texCoord) .rgb;
   #elif defined (X3D_SPECULAR_COLOR_TEXTURE_EXT_CUBE)
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

   #if defined (X3D_SPECULAR_TEXTURE_EXT)
      specularTexture .a = getSpecularEXT ();
   #endif

   #if defined (X3D_SPECULAR_COLOR_TEXTURE_EXT)
      specularTexture .rgb = getSpecularColorEXT ();
   #endif

   vec3 dielectricSpecularF0 = min (info .f0 * x3d_SpecularColorEXT * specularTexture .rgb, vec3 (1.0));

   info .f0             = mix (dielectricSpecularF0, info .baseColor .rgb, info .metallic);
   info .specularWeight = x3d_SpecularEXT * specularTexture .a;
   info .c_diff         = mix (info .baseColor .rgb, vec3 (0.0), info .metallic);

   return info;
}
#endif

#if defined (X3D_ANISOTROPY_MATERIAL_EXT)
#if defined (X3D_ANISOTROPY_TEXTURE_EXT)
uniform x3d_AnisotropyTextureParametersEXT x3d_AnisotropyTextureEXT;

vec3
getAnisotropyEXT ()
{
   // Get texture color.

   vec3 texCoord = getTexCoord (x3d_AnisotropyTextureEXT .textureTransformMapping, x3d_AnisotropyTextureEXT .textureCoordinateMapping);

   #if defined (X3D_ANISOTROPY_TEXTURE_EXT_FLIP_Y)
      texCoord .t = 1.0 - texCoord .t;
   #endif

   #if defined (X3D_ANISOTROPY_TEXTURE_EXT_2D)
      return texture (x3d_AnisotropyTextureEXT .texture2D, texCoord .st) .rgb;
   #elif defined (X3D_ANISOTROPY_TEXTURE_EXT_3D)
      return texture (x3d_AnisotropyTextureEXT .texture3D, texCoord) .rgb;
   #elif defined (X3D_ANISOTROPY_TEXTURE_EXT_CUBE)
      return texture (x3d_AnisotropyTextureEXT .textureCube, texCoord) .rgb;
   #endif
}
#endif

uniform vec3 x3d_AnisotropyEXT;

MaterialInfo
getAnisotropyInfo (in MaterialInfo info, const in NormalInfo normalInfo)
{
   vec2  direction      = vec2 (1.0, 0.0);
   float strengthFactor = 1.0;

   #if defined (X3D_ANISOTROPY_TEXTURE_EXT)
      vec3 anisotropySample = getAnisotropyEXT ();

      direction      = anisotropySample .xy * 2.0 - vec2 (1.0);
      strengthFactor = anisotropySample .z;
   #endif

   vec2 directionRotation = x3d_AnisotropyEXT .xy; // cos(theta), sin(theta)
   mat2 rotationMatrix    = mat2 (directionRotation .x, directionRotation .y, -directionRotation .y, directionRotation .x);

   direction = rotationMatrix * direction;

   info .anisotropicT       = mat3 (normalInfo .t, normalInfo .b, normalInfo .n) * normalize (vec3 (direction, 0.0));
   info .anisotropicB       = cross (normalInfo .ng, info .anisotropicT);
   info .anisotropyStrength = clamp (x3d_AnisotropyEXT .z * strengthFactor, 0.0, 1.0);

   return info;
}
#endif
`;
