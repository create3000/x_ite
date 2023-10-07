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

vec3
getDiffuseLight (const in vec3 n)
{
   return texture (u_LambertianEnvSampler, u_EnvRotation * n) .rgb * u_EnvIntensity;
}

vec4
getSpecularSample (const in vec3 reflection, const in float lod)
{
   return textureLod (u_GGXEnvSampler, u_EnvRotation * reflection, lod) * u_EnvIntensity;
}

vec3
getIBLRadianceGGX (const in vec3 n, const in vec3 v, const in float roughness, const in vec3 F0, const in float specularWeight)
{
   float NdotV      = clamp (dot (n, v), vec3 (0.0), vec3 (1.0));
   float lod        = roughness * float (u_MipCount - 1);
   vec3  reflection = normalize (reflect (-v, n));

   vec2 brdfSamplePoint = clamp (vec2 (NdotV, roughness), vec2 (0.0), vec2 (1.0));
   vec2 f_ab            = texture (u_GGXLUT, brdfSamplePoint) .rg;
   vec4 specularSample  = getSpecularSample (reflection, lod);

   vec3 specularLight = specularSample .rgb;

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
   float NdotV           = clamp (dot (n, v), vec3 (0.0), vec3 (1.0));
   vec2  brdfSamplePoint = clamp (vec2 (NdotV, roughness), vec2 (0.0), vec2 (1.0));
   vec2  f_ab            = texture (u_GGXLUT, brdfSamplePoint) .rg;

   vec3 irradiance = getDiffuseLight (n);

   // see https://bruop.github.io/ibl/#single_scattering_results at Single Scattering Results
   // Roughness dependent fresnel, from Fdez-Aguera

   vec3 Fr     = max (vec3 (1.0 - roughness), F0) - F0;
   vec3 k_S    = F0 + Fr * pow (1.0 - NdotV, 5.0);
   vec3 FssEss = specularWeight * k_S * f_ab .x + f_ab .y; // <--- GGX / specular light contribution (scale it down if the specularWeight is low)

   // Multiple scattering, from Fdez-Aguera
   float Ems   = (1.0 - (f_ab .x + f_ab .y));
   vec3 F_avg  = specularWeight * (F0 + (1.0 - F0) / 21.0);
   vec3 FmsEms = Ems * FssEss * F_avg / (1.0 - F_avg * Ems);
   vec3 k_D    = diffuseColor * (1.0 - FssEss + FmsEms); // we use +FmsEms as indicated by the formula in the blog post (might be a typo in the implementation)

   return (FmsEms + k_D) * irradiance;
}

#endif
`;
