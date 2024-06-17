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
   vec3 texCoord     = x3d_EnvironmentLightSource .rotation * n;
   vec3 textureColor = textureCube (x3d_EnvironmentLightSource .diffuseTexture, texCoord) .rgb;

   if (!x3d_EnvironmentLightSource .diffuseTextureLinear)
      textureColor = sRGBToLinear (textureColor);

   return textureColor * x3d_EnvironmentLightSource .color * x3d_EnvironmentLightSource .intensity;
}

vec3
getSpecularLight (const in vec3 reflection, const in float lod)
{
   vec3 texCoord     = x3d_EnvironmentLightSource .rotation * reflection;
   vec3 textureColor = textureCubeLodEXT (x3d_EnvironmentLightSource .specularTexture, texCoord, lod) .rgb;

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
   vec2 f_ab            = texture2D (x3d_EnvironmentLightSource .GGXLUTTexture, brdfSamplePoint) .rg;
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
   vec2  f_ab            = texture2D (x3d_EnvironmentLightSource .GGXLUTTexture, brdfSamplePoint) .rg;

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

#if defined (X3D_TRANSMISSION_MATERIAL_EXT)
vec3
getTransmissionSample (const in vec2 fragCoord, const in float roughness, const in float ior)
{
   // float framebufferLod   = log2 (float (u_TransmissionFramebufferSize .x)) * applyIorToRoughness (roughness, ior);
   // vec3  transmittedLight = textureLod (u_TransmissionFramebufferSampler, fragCoord .xy, framebufferLod) .rgb;

   // return transmittedLight;

   return vec3 (0.5, 0.5, 0.5);
}

vec3
getIBLVolumeRefraction (const in vec3 n, const in vec3 v, const in float perceptualRoughness, const in vec3 baseColor, const in vec3 f0, const in vec3 f90, const in vec3 position, const in mat4 modelMatrix, const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness, const in vec3 attenuationColor, const in float attenuationDistance, const in float dispersion)
{
   #if defined (X3D_DISPERSION_MATERIAL_EXT)
      // Dispersion will spread out the ior values for each r,g,b channel
      float halfSpread = (ior - 1.0) * 0.025 * dispersion;
      vec3  iors       = vec3 (ior - halfSpread, ior, ior + halfSpread);

      vec3  transmittedLight;
      float transmissionRayLength;

      for (int i = 0; i < 3; i++)
      {
         vec3 transmissionRay = getVolumeTransmissionRay (n, v, thickness, iors [i], modelMatrix);
         // TODO: taking length of blue ray, ideally we would take the length of the green ray. For now overwriting seems ok
         transmissionRayLength = length (transmissionRay);
         vec3 refractedRayExit = position + transmissionRay;

         // Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
         vec4 ndcPos           = projMatrix * viewMatrix * vec4 (refractedRayExit, 1.0);
         vec2 refractionCoords = ndcPos.xy / ndcPos.w;

         refractionCoords += 1.0;
         refractionCoords /= 2.0;

         // Sample framebuffer to get pixel the refracted ray hits for this color channel.
         transmittedLight [i] = getTransmissionSample (refractionCoords, perceptualRoughness, iors [i]) [i];
      }
   #else
      vec3  transmissionRay       = getVolumeTransmissionRay (n, v, thickness, ior, modelMatrix);
      float transmissionRayLength = length (transmissionRay);
      vec3  refractedRayExit      = position + transmissionRay;

      // Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
      vec4 ndcPos           = projMatrix * viewMatrix * vec4 (refractedRayExit, 1.0);
      vec2 refractionCoords = ndcPos.xy / ndcPos.w;

      refractionCoords += 1.0;
      refractionCoords /= 2.0;

      // Sample framebuffer to get pixel the refracted ray hits.
      vec3 transmittedLight = getTransmissionSample (refractionCoords, perceptualRoughness, ior);
   #endif // MATERIAL_DISPERSION

   vec3 attenuatedColor = applyVolumeAttenuation (transmittedLight, transmissionRayLength, attenuationColor, attenuationDistance);

   // Sample GGX LUT to get the specular component.
   float NdotV           = clamp (dot(n, v), 0.0, 1.0);
   vec2  brdfSamplePoint = clamp (vec2 (NdotV, perceptualRoughness), vec2 (0.0), vec2 (1.0));
   vec2  brdf            = texture2D (x3d_EnvironmentLightSource .GGXLUTTexture, brdfSamplePoint) .rg;
   vec3  specularColor   = f0 * brdf .x + f90 * brdf .y;

   return (1.0 - specularColor) * attenuatedColor * baseColor;
}
#endif

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
   vec2 f_ab            = texture2D (x3d_EnvironmentLightSource .GGXLUTTexture, brdfSamplePoint) .rg;
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
   float brdf            = texture2D (x3d_EnvironmentLightSource .CharlieLUTTexture, brdfSamplePoint) .b;
   vec3  sheenLight      = getSheenLight (reflection, lod);

   return sheenLight * sheenColor * brdf;
}
#endif

#endif
`;
