import MaterialTextures from "../../MaterialTextures.js";

export default /* glsl */ `

struct MaterialInfo
{
   float ior;
   float perceptualRoughness;      // roughness value, as authored by the model creator (input to shader)
   vec3 f0_dielectric;             // full reflectance color (n incidence angle)

   float alphaRoughness;           // roughness mapped to a more linear change in the roughness (proposed by [2])

   float fresnel_w;

   vec3 f90;                       // reflectance color at grazing angle
   vec3 f90_dielectric;
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

   float diffuseTransmissionFactor;
   vec3 diffuseTransmissionColorFactor;

   // KHR_materials_anisotropy
   vec3 anisotropicT;
   vec3 anisotropicB;
   float anisotropyStrength;

   // KHR_materials_dispersion
   float dispersion;
};

#if defined (X3D_MATERIAL_SPECULAR_GLOSSINESS)
   ${MaterialTextures .texture ("x3d_DiffuseTexture", "rgba", "linear")}
#elif defined (X3D_MATERIAL_METALLIC_ROUGHNESS)
   ${MaterialTextures .texture ("x3d_BaseTexture", "rgba", "linear")}
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
         baseColor *= getDiffuseTexture ();
      #elif defined (X3D_TEXTURE)
         baseColor = getTextureColor (baseColor, vec4 (vec3 (1.0), alpha));
      #endif
   #elif defined (X3D_MATERIAL_METALLIC_ROUGHNESS)
      #if defined (X3D_BASE_TEXTURE)
         baseColor *= getBaseTexture ();
      #elif defined (X3D_TEXTURE)
         baseColor = getTextureColor (baseColor, vec4 (vec3 (1.0), alpha));
      #endif
   #endif

   return baseColor;
}

#if defined (X3D_MATERIAL_SPECULAR_GLOSSINESS)

${MaterialTextures .texture ("x3d_SpecularGlossinessTexture", "rgba", "linear")}

MaterialInfo
getSpecularGlossinessInfo (in MaterialInfo info)
{
   info .f0_dielectric       = x3d_Material .specularColor;
   info .perceptualRoughness = x3d_Material .glossiness;

   #if defined (X3D_SPECULAR_GLOSSINESS_TEXTURE)
      vec4 sgSample = getSpecularGlossinessTexture ();

      info .perceptualRoughness *= sgSample .a ;  // glossiness to roughness
      info .f0_dielectric       *= sgSample .rgb; // specular
   #endif

   info .perceptualRoughness = 1.0 - info .perceptualRoughness; // 1 - glossiness

   return info;
}
#endif

#if defined (X3D_MATERIAL_METALLIC_ROUGHNESS)

${MaterialTextures .texture ("x3d_MetallicRoughnessTexture")}

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
      // Roughness is stored in the 'g' channel, metallic is stored in the 'b' channel.
      // This layout intentionally reserves the 'r' channel for (optional) occlusion map data
      vec4 mrSample = getMetallicRoughnessTexture ();

      info .metallic            *= mrSample .b;
      info .perceptualRoughness *= mrSample .g;
   #endif

   return info;
}
#endif

${MaterialTextures .texture ("x3d_EmissiveTexture", "rgb", "linear")}

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
      emissiveColor *= getEmissiveTexture ();
   #endif

   return emissiveColor;
}

${MaterialTextures .texture ("x3d_OcclusionTexture", "r")}

float
getOcclusionFactor ()
{
   // Get texture color.

   #if defined (X3D_OCCLUSION_TEXTURE)
      return getOcclusionTexture ();
   #else
      return 1.0;
   #endif
}

#if defined (X3D_IOR_MATERIAL_EXT)
uniform float x3d_IorEXT;

MaterialInfo
getIorInfo (in MaterialInfo info)
{
    info .f0_dielectric = vec3 (pow ((x3d_IorEXT - 1.0) / (x3d_IorEXT + 1.0), 2.0));
    info .ior           = x3d_IorEXT;

    return info;
}
#endif

#if defined (X3D_SHEEN_MATERIAL_EXT)

${MaterialTextures .texture ("x3d_SheenColorTextureEXT",     "rgb", "linear")}
${MaterialTextures .texture ("x3d_SheenRoughnessTextureEXT", "a")}

uniform vec3  x3d_SheenColorEXT;
uniform float x3d_SheenRoughnessEXT;

MaterialInfo
getSheenInfo (in MaterialInfo info)
{
   info .sheenColorFactor     = x3d_SheenColorEXT;
   info .sheenRoughnessFactor = x3d_SheenRoughnessEXT;

   #if defined (X3D_SHEEN_COLOR_TEXTURE_EXT)
      info .sheenColorFactor *= getSheenColorTextureEXT ();
   #endif

   #if defined (X3D_SHEEN_ROUGHNESS_TEXTURE_EXT)
      info .sheenRoughnessFactor *= getSheenRoughnessTextureEXT ();
   #endif

   return info;
}

uniform sampler2D x3d_SheenELUTTextureEXT;

float
albedoSheenScalingLUT (const in float NdotV, const in float sheenRoughnessFactor)
{
   #if __VERSION__ == 100
      return texture2D (x3d_SheenELUTTextureEXT, vec2 (NdotV, sheenRoughnessFactor)) .r;
   #else
      return texture (x3d_SheenELUTTextureEXT, vec2 (NdotV, sheenRoughnessFactor)) .r;
   #endif
}
#endif

#if defined (X3D_CLEARCOAT_MATERIAL_EXT)

${MaterialTextures .texture ("x3d_ClearcoatTextureEXT",          "r")}
${MaterialTextures .texture ("x3d_ClearcoatRoughnessTextureEXT", "g")}
${MaterialTextures .texture ("x3d_ClearcoatNormalTextureEXT",    "rgb")}

#if defined (X3D_CLEARCOAT_NORMAL_TEXTURE_EXT)
const float x3d_ClearcoatNormalScaleEXT = 1.0;
#endif

vec3
getClearcoatNormalEXT (const in NormalInfo normalInfo)
{
   #if defined (X3D_CLEARCOAT_NORMAL_TEXTURE_EXT)
      vec3 color = getClearcoatNormalTextureEXT ();
      vec3 n     = color * 2.0 - vec3 (1.0);

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
      info .clearcoatFactor *= getClearcoatTextureEXT ();
   #endif

   #if defined (X3D_CLEARCOAT_ROUGHNESS_TEXTURE_EXT)
      info .clearcoatRoughness *= getClearcoatRoughnessTextureEXT ();
   #endif

   info .clearcoatNormal    = getClearcoatNormalEXT (normalInfo);
   info .clearcoatRoughness = clamp (info .clearcoatRoughness, 0.0, 1.0);
   return info;
}
#endif

#if defined (X3D_SPECULAR_MATERIAL_EXT)

${MaterialTextures .texture ("x3d_SpecularTextureEXT",      "a")}
${MaterialTextures .texture ("x3d_SpecularColorTextureEXT", "rgb", "linear")}

uniform float x3d_SpecularEXT;
uniform vec3  x3d_SpecularColorEXT;

MaterialInfo
getSpecularInfo (in MaterialInfo info)
{
   vec4 specularTexture = vec4 (1.0);

   #if defined (X3D_SPECULAR_TEXTURE_EXT)
      specularTexture .a = getSpecularTextureEXT ();
   #endif

   #if defined (X3D_SPECULAR_COLOR_TEXTURE_EXT)
      specularTexture .rgb = getSpecularColorTextureEXT ();
   #endif

   info .f0_dielectric  = min (info .f0_dielectric * x3d_SpecularColorEXT * specularTexture .rgb, vec3 (1.0));
   info .specularWeight = x3d_SpecularColorEXT * specularTexture .a;
   info .f90_dielectric = vec3 (info .specularWeight);

   return info;
}
#endif

#if defined (X3D_VOLUME_MATERIAL_EXT)

${MaterialTextures .texture ("x3d_ThicknessTextureEXT", "g")}

uniform float x3d_ThicknessEXT;
uniform float x3d_AttenuationDistanceEXT;
uniform vec3  x3d_AttenuationColorEXT;

MaterialInfo
getVolumeInfo (in MaterialInfo info)
{
   info .thickness           = x3d_ThicknessEXT;
   info .attenuationDistance = x3d_AttenuationDistanceEXT;
   info .attenuationColor    = x3d_AttenuationColorEXT;

   #if defined (X3D_THICKNESS_TEXTURE_EXT)
      info .thickness *= getThicknessTextureEXT ();
   #endif

   return info;
}
#endif

#if defined (X3D_IRIDESCENCE_MATERIAL_EXT)

${MaterialTextures .texture ("x3d_IridescenceTextureEXT",          "r")}
${MaterialTextures .texture ("x3d_IridescenceThicknessTextureEXT", "g")}

uniform float x3d_IridescenceEXT;
uniform float x3d_IridescenceIndexOfRefractionEXT;
uniform float x3d_IridescenceThicknessMinimumEXT;
uniform float x3d_IridescenceThicknessMaximumEXT;

MaterialInfo
getIridescenceInfo (in MaterialInfo info)
{
    info .iridescenceFactor    = x3d_IridescenceEXT;
    info .iridescenceIor       = x3d_IridescenceIndexOfRefractionEXT;
    info .iridescenceThickness = x3d_IridescenceThicknessMaximumEXT;

    #if defined (X3D_IRIDESCENCE_TEXTURE_EXT)
        info .iridescenceFactor *= getIridescenceTextureEXT ();
    #endif

    #if defined (X3D_IRIDESCENCE_THICKNESS_TEXTURE_EXT)
        float thicknessSampled = getIridescenceThicknessTextureEXT ();
        float thickness        = mix (x3d_IridescenceThicknessMinimumEXT, x3d_IridescenceThicknessMaximumEXT, thicknessSampled);

        info .iridescenceThickness = thickness;
    #endif

    return info;
}
#endif

#if defined (X3D_TRANSMISSION_MATERIAL_EXT)

${MaterialTextures .texture ("x3d_TransmissionTextureEXT", "r")}

uniform float x3d_TransmissionEXT;

#if defined (X3D_DISPERSION_MATERIAL_EXT)
   uniform float x3d_DispersionEXT;
#endif

MaterialInfo
getTransmissionInfo (in MaterialInfo info)
{
   info .transmissionFactor = x3d_TransmissionEXT;

   #if defined (X3D_TRANSMISSION_TEXTURE_EXT)
      info .transmissionFactor *= getTransmissionTextureEXT ();
   #endif

   #if defined (X3D_DISPERSION_MATERIAL_EXT)
      info .dispersion = x3d_DispersionEXT;
   #else
      info .dispersion = 0.0;
   #endif

   return info;
}
#endif

#if defined (X3D_ANISOTROPY_MATERIAL_EXT)

${MaterialTextures .texture ("x3d_AnisotropyTextureEXT", "rgb")}

uniform vec3 x3d_AnisotropyEXT;

MaterialInfo
getAnisotropyInfo (in MaterialInfo info, const in NormalInfo normalInfo)
{
   vec2  direction      = vec2 (1.0, 0.0);
   float strengthFactor = 1.0;

   #if defined (X3D_ANISOTROPY_TEXTURE_EXT)
      vec3 anisotropySample = getAnisotropyTextureEXT ();

      direction      = anisotropySample .xy * 2.0 - vec2 (1.0);
      strengthFactor = anisotropySample .z;
   #endif

   vec2 directionRotation = x3d_AnisotropyEXT .xy; // cos(theta), sin(theta)
   mat2 rotationMatrix    = mat2 (directionRotation .xy, -directionRotation .y, directionRotation .x);

   direction = rotationMatrix * direction;

   info .anisotropicT       = mat3 (normalInfo .t, normalInfo .b, normalInfo .n) * normalize (vec3 (direction, 0.0));
   info .anisotropicB       = cross (normalInfo .ng, info .anisotropicT);
   info .anisotropyStrength = clamp (x3d_AnisotropyEXT .z * strengthFactor, 0.0, 1.0);

   return info;
}
#endif
`;
