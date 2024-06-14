export default /* glsl */ `
#if defined (X3D_USE_IBL)

// uniform int u_MipCount;
// uniform samplerCube u_LambertianEnvSampler;
// uniform samplerCube u_GGXEnvSampler;
// uniform sampler2D u_GGXLUT;
// uniform samplerCube u_CharlieEnvSampler;
// uniform sampler2D u_CharlieLUT;
// uniform sampler2D u_SheenELUT;
// uniform mat3 u_EnvRotation;

uniform x3d_EnvironmentLightSourceParameters x3d_EnvironmentLightSource;

vec3
getDiffuseLight (const in vec3 n)
{
   vec3 texCoord     = x3d_EnvironmentLightSource .rotation * n * vec3 (-1.0, 1.0, 1.0);
   vec3 textureColor = texture (x3d_EnvironmentLightSource .diffuseTexture, texCoord) .rgb;

   if (!x3d_EnvironmentLightSource .diffuseTextureLinear)
      textureColor = sRGBToLinear (textureColor);

   return textureColor * x3d_EnvironmentLightSource .color * x3d_EnvironmentLightSource .intensity;
}

vec3
getSpecularLight (const in vec3 reflection, const in float lod)
{
   vec3 texCoord     = x3d_EnvironmentLightSource .rotation * reflection * vec3 (-1.0, 1.0, 1.0);
   vec3 textureColor = textureLod (x3d_EnvironmentLightSource .specularTexture, texCoord, lod) .rgb;

   if (!x3d_EnvironmentLightSource .specularTextureLinear)
      textureColor = sRGBToLinear (textureColor);

   return textureColor * x3d_EnvironmentLightSource .color * x3d_EnvironmentLightSource .intensity;
}

#if defined (X3D_SHEEN_MATERIAL_EXT)
vec3
getSheenLight (const in vec3 reflection, const in float lod)
{
   // return textureLod (u_CharlieEnvSampler, u_EnvRotation * reflection, lod) * u_EnvIntensity;

   return vec3 (0.5) * (lod / float (x3d_EnvironmentLightSource .specularTextureLevels - 1)) * x3d_EnvironmentLightSource .intensity;
}
#endif

vec3
getIBLRadianceGGX (const in vec3 n, const in vec3 v, const in float roughness, const in vec3 F0, const in float specularWeight)
{
   float NdotV      = clamp (dot (n, v), 0.0, 1.0);
   float lod        = roughness * float (x3d_EnvironmentLightSource .specularTextureLevels - 1);
   vec3  reflection = normalize (reflect (-v, n));

   vec2 brdfSamplePoint = clamp (vec2 (NdotV, roughness), vec2 (0.0), vec2 (1.0));
   vec2 f_ab            = texture (x3d_EnvironmentLightSource .GGXLUTTexture, brdfSamplePoint) .rg;
   vec3 specularLight   = getSpecularLight (reflection, lod);

   // see https://bruop.github.io/ibl/#single_scattering_results at Single Scattering Results
   // Roughness dependent fresnel, from Fdez-Aguera
   vec3 Fr     = max (vec3 (1.0 - roughness), F0) - F0;
   vec3 k_S    = F0 + Fr * pow (1.0 - NdotV, 5.0);
   vec3 FssEss = k_S * f_ab .x + f_ab .y;

   return specularWeight * specularLight * FssEss;
}

// specularWeight is introduced with KHR_materials_specular
vec3
getIBLRadianceLambertian (const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor, const in vec3 F0, const in float specularWeight)
{
   float NdotV           = clamp (dot (n, v), 0.0, 1.0);
   vec2  brdfSamplePoint = clamp (vec2 (NdotV, roughness), vec2 (0.0), vec2 (1.0));
   vec2  f_ab            = texture (x3d_EnvironmentLightSource .GGXLUTTexture, brdfSamplePoint) .rg;

   vec3 irradiance = getDiffuseLight (n);

   // see https://bruop.github.io/ibl/#single_scattering_results at Single Scattering Results
   // Roughness dependent fresnel, from Fdez-Aguera

   vec3 Fr     = max (vec3 (1.0 - roughness), F0) - F0;
   vec3 k_S    = F0 + Fr * pow (1.0 - NdotV, 5.0);
   vec3 FssEss = specularWeight * k_S * f_ab .x + f_ab .y; // <--- GGX / specular light contribution (scale it down if the specularWeight is low)

   // Multiple scattering, from Fdez-Aguera
   float Ems    = (1.0 - (f_ab .x + f_ab .y));
   vec3  F_avg  = specularWeight * (F0 + (1.0 - F0) / 21.0);
   vec3  FmsEms = Ems * FssEss * F_avg / (1.0 - F_avg * Ems);
   vec3  k_D    = diffuseColor * (1.0 - FssEss + FmsEms); // we use +FmsEms as indicated by the formula in the blog post (might be a typo in the implementation)

   return (FmsEms + k_D) * irradiance;
}

#if defined (X3D_ANISOTROPY_MATERIAL_EXT)
vec3
getIBLRadianceAnisotropy (const in vec3 n, const in vec3 v, const in float roughness, const in float anisotropy, const in vec3 anisotropyDirection, const in vec3 F0, const in float specularWeight)
{
   float NdotV = clamp (dot (n, v), 0.0, 1.0);

   float tangentRoughness   = mix (roughness, 1.0, anisotropy * anisotropy);
   vec3  anisotropicTangent = cross (anisotropyDirection, v);
   vec3  anisotropicNormal  = cross (anisotropicTangent, anisotropyDirection);
   float bendFactor         = 1.0 - anisotropy * (1.0 - roughness);
   float bendFactorPow4     = bendFactor * bendFactor * bendFactor * bendFactor;
   vec3  bentNormal         = normalize (mix (anisotropicNormal, n, bendFactorPow4));

   float lod        = roughness * float (x3d_EnvironmentLightSource .specularTextureLevels - 1);
   vec3  reflection = normalize (reflect (-v, bentNormal));

   vec2 brdfSamplePoint = clamp (vec2 (NdotV, roughness), vec2 (0.0), vec2 (1.0));
   vec2 f_ab            = texture (x3d_EnvironmentLightSource .GGXLUTTexture, brdfSamplePoint) .rg;
   vec3 specularLight   = getSpecularLight (reflection, lod);

   // see https://bruop.github.io/ibl/#single_scattering_results at Single Scattering Results
   // Roughness dependent fresnel, from Fdez-Aguera
   vec3 Fr     = max (vec3 (1.0 - roughness), F0) - F0;
   vec3 k_S    = F0 + Fr * pow (1.0 - NdotV, 5.0);
   vec3 FssEss = k_S * f_ab.x + f_ab.y;

   return specularWeight * specularLight * FssEss;
}
#endif

#if defined (X3D_SHEEN_MATERIAL_EXT)
vec3
getIBLRadianceCharlie (const in vec3 n, const in vec3 v, const in float sheenRoughness, const in vec3 sheenColor)
{
   float NdotV      = clamp (dot (n, v), 0.0, 1.0);
   float lod        = sheenRoughness * float (x3d_EnvironmentLightSource .specularTextureLevels - 1);
   vec3  reflection = normalize (reflect (-v, n));

   vec2  brdfSamplePoint = clamp (vec2 (NdotV, sheenRoughness), vec2 (0.0), vec2 (1.0));
   float brdf            = texture (x3d_EnvironmentLightSource .CharlieLUTTexture, brdfSamplePoint) .b;
   vec3  sheenLight      = getSheenLight (reflection, lod);

   return sheenLight * sheenColor * brdf;
}
#endif

#endif
`;
