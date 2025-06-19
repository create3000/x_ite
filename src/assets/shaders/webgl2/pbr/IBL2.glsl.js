export default () => /* glsl */ `

// Originally from:
// https://github.com/KhronosGroup/glTF-Sample-Renderer/blob/main/source/Renderer/shaders/ibl.glsl

#if defined (X3D_USE_IBL)

uniform x3d_EnvironmentLightSourceParameters x3d_EnvironmentLightSource;

vec3
getDiffuseLight (const in vec3 n)
{
   vec3 texCoord = x3d_EnvironmentLightSource .rotation * n * vec3 (-1.0, 1.0, 1.0);

   #if __VERSION__ == 100
      vec3 textureColor = textureCube (x3d_EnvironmentLightSource .diffuseTexture, texCoord) .rgb;
   #else
      vec3 textureColor = texture (x3d_EnvironmentLightSource .diffuseTexture, texCoord) .rgb;
   #endif

   #if defined (X3D_COLORSPACE_SRGB)
      if (x3d_EnvironmentLightSource .diffuseTextureLinear)
         textureColor = linearToSRGB (textureColor);
   #else
      if (!x3d_EnvironmentLightSource .diffuseTextureLinear)
         textureColor = sRGBToLinear (textureColor);
   #endif

   return textureColor * x3d_EnvironmentLightSource .color * x3d_EnvironmentLightSource .intensity;
}

vec3
getSpecularLight (const in vec3 reflection, const in float lod)
{
   vec3 texCoord = x3d_EnvironmentLightSource .rotation * reflection * vec3 (-1.0, 1.0, 1.0);

   #if __VERSION__ == 100
      vec3 textureColor = textureCubeLodEXT (x3d_EnvironmentLightSource .specularTexture, texCoord, lod) .rgb;
   #else
      vec3 textureColor = textureLod (x3d_EnvironmentLightSource .specularTexture, texCoord, lod) .rgb;
   #endif

   #if defined (X3D_COLORSPACE_SRGB)
      if (x3d_EnvironmentLightSource .specularTextureLinear)
         textureColor = linearToSRGB (textureColor);
   #else
      if (!x3d_EnvironmentLightSource .specularTextureLinear)
         textureColor = sRGBToLinear (textureColor);
   #endif

   return textureColor * x3d_EnvironmentLightSource .color * x3d_EnvironmentLightSource .intensity;
}

#if defined (X3D_SHEEN_MATERIAL_EXT)
vec3
getSheenLight (const in vec3 reflection, const in float lod)
{
   // TODO: use sheenTexture.

   vec3 texCoord = x3d_EnvironmentLightSource .rotation * reflection * vec3 (-1.0, 1.0, 1.0);

   #if __VERSION__ == 100
      vec3 textureColor = textureCubeLodEXT (x3d_EnvironmentLightSource .diffuseTexture, texCoord, lod) .rgb;
   #else
      vec3 textureColor = textureLod (x3d_EnvironmentLightSource .diffuseTexture, texCoord, lod) .rgb;
   #endif

   #if defined (X3D_COLORSPACE_SRGB)
      if (x3d_EnvironmentLightSource .diffuseTextureLinear)
         textureColor = linearToSRGB (textureColor);
   #else
      if (!x3d_EnvironmentLightSource .diffuseTextureLinear)
         textureColor = sRGBToLinear (textureColor);
   #endif

   return textureColor * x3d_EnvironmentLightSource .color * x3d_EnvironmentLightSource .intensity;
}
#endif

vec3
getIBLGGXFresnel (const in vec3 n, const in vec3 v, const in float roughness, const in vec3 F0, const in float specularWeight)
{
   // see https://bruop.github.io/ibl/#single_scattering_results at Single Scattering Results
   // Roughness dependent fresnel, from Fdez-Aguera
   float NdotV           = clamp (dot(n, v), 0.0, 1.0);
   vec2  brdfSamplePoint = clamp (vec2 (NdotV, roughness), vec2 (0.0), vec2 (1.0));

   #if __VERSION__ == 100
      vec2 f_ab = texture2D (x3d_EnvironmentLightSource .GGXLUTTexture, brdfSamplePoint) .rg;
   #else
      vec2 f_ab = texture (x3d_EnvironmentLightSource .GGXLUTTexture, brdfSamplePoint) .rg;
   #endif

   vec3 Fr     = max (vec3 (1.0 - roughness), F0) - F0;
   vec3 k_S    = F0 + Fr * pow (1.0 - NdotV, 5.0);
   vec3 FssEss = specularWeight * (k_S * f_ab .x + f_ab .y);

   // Multiple scattering, from Fdez-Aguera
   float Ems    = (1.0 - (f_ab .x + f_ab .y));
   vec3  F_avg  = specularWeight * (F0 + (1.0 - F0) / 21.0);
   vec3  FmsEms = Ems * FssEss * F_avg / (1.0 - F_avg * Ems);

   return FssEss + FmsEms;
}

vec3
getIBLRadianceGGX (const in vec3 n, const in vec3 v, const in float roughness)
{
   // Holger: https://blender.stackexchange.com/questions/93790/is-the-roughness-setting-is-based-on-a-standard-measuring-unit
   float NdotV         = clamp (dot (n, v), 0.0, 1.0);
   float lod           = sqrt (roughness) * float (x3d_EnvironmentLightSource .specularTextureLevels); // Holger: added sqrt.
   vec3  reflection    = normalize (reflect (-v, n));
   vec3  specularLight = getSpecularLight (reflection, lod);

   return specularLight;
}

#if defined (X3D_TRANSMISSION_MATERIAL_EXT)

// Framebuffers have all the same size, so we can use x3d_Viewport
// to determine the size of the framebuffer.
uniform sampler2D x3d_TransmissionSamplerEXT;

vec3
getTransmissionSample (const in vec2 fragCoord, const in float roughness, const in float ior)
{
   #if __VERSION__ == 100
      float framebufferSize  = max (float (x3d_Viewport .z), float (x3d_Viewport .w));
      float framebufferLod   = log2 (framebufferSize) * applyIorToRoughness (roughness, ior);
      vec3  transmittedLight = texture2DLodEXT (x3d_TransmissionSamplerEXT, fragCoord, framebufferLod) .rgb;
   #else
      int   framebufferSize  = max (x3d_Viewport .z, x3d_Viewport .w);
      float framebufferLod   = log2 (float (framebufferSize)) * applyIorToRoughness (roughness, ior);
      vec3  transmittedLight = textureLod (x3d_TransmissionSamplerEXT, fragCoord, framebufferLod) .rgb;
   #endif

   #if defined (X3D_COLORSPACE_SRGB)
      return transmittedLight;
   #else
      return sRGBToLinear (transmittedLight);
   #endif
}

vec3 getIBLVolumeRefraction (const in vec3 n, const in vec3 v, const in float perceptualRoughness, const in vec3 baseColor, const in vec3 position, const in mat4 modelMatrix, const in mat4 projMatrix, const in float ior, const in float thickness, const in vec3 attenuationColor, const in float attenuationDistance, const in float dispersion)
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
         vec4 ndcPos           = projMatrix * vec4 (refractedRayExit, 1.0); // removed viewMatrix
         vec2 refractionCoords = ndcPos .xy / ndcPos .w;

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
      vec4 ndcPos           = projMatrix * vec4 (refractedRayExit, 1.0); // removed viewMatrix
      vec2 refractionCoords = ndcPos .xy / ndcPos .w;

      refractionCoords += 1.0;
      refractionCoords /= 2.0;

      // Sample framebuffer to get pixel the refracted ray hits.
      vec3 transmittedLight = getTransmissionSample (refractionCoords, perceptualRoughness, ior);
   #endif // MATERIAL_DISPERSION

   vec3 attenuatedColor = applyVolumeAttenuation (transmittedLight, transmissionRayLength, attenuationColor, attenuationDistance);

   return attenuatedColor * baseColor;
}
#endif

#if defined (X3D_ANISOTROPY_MATERIAL_EXT)
vec3
getIBLRadianceAnisotropy (const in vec3 n, const in vec3 v, const in float roughness, const in float anisotropy, const in vec3 anisotropyDirection)
{
   float NdotV = clamp (dot (n, v), 0.0, 1.0);

   float tangentRoughness   = mix (roughness, 1.0, anisotropy * anisotropy);
   vec3  anisotropicTangent = cross (anisotropyDirection, v);
   vec3  anisotropicNormal  = cross (anisotropicTangent, anisotropyDirection);
   float bendFactor         = 1.0 - anisotropy * (1.0 - roughness);
   float bendFactorPow4     = bendFactor * bendFactor * bendFactor * bendFactor;
   vec3  bentNormal         = normalize (mix (anisotropicNormal, n, bendFactorPow4));

   // Holger: https://blender.stackexchange.com/questions/93790/is-the-roughness-setting-is-based-on-a-standard-measuring-unit
   float lod           = sqrt (roughness) * float (x3d_EnvironmentLightSource .specularTextureLevels); // Holger: added sqrt.
   vec3  reflection    = normalize (reflect (-v, bentNormal));
   vec3  specularLight = getSpecularLight (reflection, lod);

   return specularLight;
}
#endif

#if defined (X3D_SHEEN_MATERIAL_EXT)
vec3
getIBLRadianceCharlie (const in vec3 n, const in vec3 v, const in float sheenRoughness, const in vec3 sheenColor)
{
   // TODO: use sheenTexture.

   float NdotV           = clamp (dot (n, v), 0.0, 1.0);
   float lod             = sheenRoughness * float (x3d_EnvironmentLightSource .diffuseTextureLevels);
   vec3  reflection      = normalize (reflect (-v, n));
   vec2  brdfSamplePoint = clamp (vec2 (NdotV, sheenRoughness), vec2 (0.0), vec2 (1.0));

   #if __VERSION__ == 100
      float brdf = texture2D (x3d_EnvironmentLightSource .CharlieLUTTexture, brdfSamplePoint) .b;
   #else
      float brdf = texture (x3d_EnvironmentLightSource .CharlieLUTTexture, brdfSamplePoint) .b;
   #endif

   vec3 sheenLight = getSheenLight (reflection, lod);

   return sheenLight * sheenColor * brdf;
}
#endif

#endif
`;
