export default /* glsl */ `

// Originally from:
// https://github.com/KhronosGroup/glTF-Sample-Renderer/blob/main/source/Renderer/shaders/punctual.glsl

#if defined (X3D_TRANSMISSION_MATERIAL_EXT) || defined (X3D_DIFFUSE_TRANSMISSION_MATERIAL_EXT)
float
applyIorToRoughness (const in float roughness, const in float ior)
{
    // Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
    // an IOR of 1.5 results in the default amount of microfacet refraction.
    return roughness * clamp (ior * 2.0 - 2.0, 0.0, 1.0);
}
#endif

#if defined (X3D_LIGHTING)

#pragma X3D include "../common/Lighting.glsl"

float
getAttenuationPBR (const in vec3 attenuation, const in float distanceToLight, const in float radius)
{
   float d = dot (attenuation, vec3 (1.0, distanceToLight, distanceToLight * distanceToLight));

   if (radius <= 0.0)
      return 1.0 / d;

   return max (min (1.0 - pow (distanceToLight / radius, 4.0), 1.0), 0.0) / d;
}

vec3
getLightIntensity (const in x3d_LightSourceParameters light, const in vec3 pointToLight, const in float distanceToLight)
{
   float attenuationFactor = 1.0;
   float spotFactor        = 1.0;

   if (light .type != x3d_DirectionalLight)
   {
      attenuationFactor = getAttenuationPBR (light .attenuation, distanceToLight, light .radius);
   }

   if (light .type == x3d_SpotLight)
   {
      spotFactor = getSpotFactor (pointToLight, light .direction, light .cutOffAngle, light .beamWidth);
   }

   return attenuationFactor * spotFactor * light .intensity * light .color;
}

#if defined (X3D_SHEEN_MATERIAL_EXT)
vec3
getPunctualRadianceSheen (const in vec3 sheenColor, const in float sheenRoughness, const in float NdotL, const in float NdotV, const in float NdotH)
{
    return NdotL * BRDF_specularSheen (sheenColor, sheenRoughness, NdotL, NdotV, NdotH);
}
#endif

#if defined (X3D_CLEARCOAT_MATERIAL_EXT)
vec3
getPunctualRadianceClearCoat (const in vec3 clearcoatNormal, const in vec3 v, const in vec3 l, const in vec3 h, const in float VdotH, const in vec3 f0, const in vec3 f90, const in float clearcoatRoughness)
{
    float NdotL = clamp (dot (clearcoatNormal, l), 0.0, 1.0);
    float NdotV = clamp (dot (clearcoatNormal, v), 0.0, 1.0);
    float NdotH = clamp (dot (clearcoatNormal, h), 0.0, 1.0);

    return NdotL * BRDF_specularGGX (clearcoatRoughness * clearcoatRoughness, NdotL, NdotV, NdotH);
}
#endif

#endif

#if defined (X3D_TRANSMISSION_MATERIAL_EXT) || defined (X3D_DIFFUSE_TRANSMISSION_MATERIAL_EXT)
vec3
getPunctualRadianceTransmission (const in vec3 normal, const in vec3 view, const in vec3 pointToLight, const in float alphaRoughness, const in vec3 baseColor, const in float ior)
{
    float transmissionRoughness = applyIorToRoughness (alphaRoughness, ior);

    vec3 n        = normalize (normal);           // Outward direction of surface point
    vec3 v        = normalize (view);             // Direction from surface point to view
    vec3 l        = normalize (pointToLight);
    vec3 l_mirror = normalize (l + 2.0 * n * dot (-l, n)); // Mirror light reflection vector on surface
    vec3 h        = normalize (l_mirror + v);              // Halfway vector between transmission light vector and v

    float D   = D_GGX (clamp (dot (n, h), 0.0, 1.0), transmissionRoughness);
    float Vis = V_GGX (clamp (dot (n, l_mirror), 0.0, 1.0), clamp (dot (n, v), 0.0, 1.0), transmissionRoughness);

    // Transmission BTDF
    return baseColor * D * Vis;
}

// Compute attenuated light as it travels through a volume.
vec3
applyVolumeAttenuation (const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance)
{
   if (attenuationDistance == 0.0)
   {
      // Attenuation distance is +∞ (which we indicate by zero), i.e. the transmitted color is not attenuated at all.
      return radiance;
   }
   else
   {
      // Compute light attenuation using Beer's law.
      vec3 attenuationCoefficient = log (attenuationColor) / attenuationDistance;
      vec3 transmittance          = exp (attenuationCoefficient * transmissionDistance); // Beer's law

      return transmittance * radiance;
   }
}

vec3
getVolumeTransmissionRay (const in vec3 n, const in vec3 v, const in float thickness, const in float ior, in mat4 modelMatrix)
{
   // Direction of refracted light.
   vec3 refractionVector = refract (-v, normalize (n), 1.0 / ior);

   // Compute rotation-independent scaling of the model matrix.
   vec3 modelScale;

   modelScale .x = length (modelMatrix [0] .xyz);
   modelScale .y = length (modelMatrix [1] .xyz);
   modelScale .z = length (modelMatrix [2] .xyz);

   // The thickness is specified in local space.
   return normalize (refractionVector) * thickness * modelScale;
}
#endif

#if defined (X3D_VOLUME_SCATTER_MATERIAL_EXT)

uniform vec3  x3d_MultiscatterColorEXT;
uniform float x3d_ScatterAnisotropyEXT;
uniform vec3  x3d_ScatterSamplesEXT [X3D_SCATTER_SAMPLES_COUNT_EXT];
uniform float x3d_ScatterMinRadiusEXT;

uniform sampler2D x3d_ScatterSamplerEXT;
uniform sampler2D x3d_ScatterIBLSamplerEXT;
uniform sampler2D x3d_ScatterDepthSamplerEXT;

vec3
burley_setup (const in vec3 radius, const in vec3 albedo)
{
   float m_1_pi = 0.318309886183790671538;
   vec3  s      = 1.9 - albedo + 3.5 * ((albedo - 0.8) * (albedo - 0.8));
   vec3  l      = 0.25 * m_1_pi * radius;

   return l / s;
}

vec3
burley_eval (const in vec3 d, const in float r)
{
   vec3 exp_r_3_d = exp (-r / (3.0 * d));
   vec3 exp_r_d   = exp_r_3_d * exp_r_3_d * exp_r_3_d;

   return (exp_r_d + exp_r_3_d) / (4.0 * d);
}

const float M_PHI          = 1.61803398874989484820459;
const float M_GOLDEN_ANGLE = M_PI * (3.0f - sqrt (5.0));

vec3
getSubsurfaceScattering (const in vec3 vertex, const in mat4 projectionMatrix, const in float attenuationDistance, const sampler2D scatterLUT, const in vec3 baseColor)
{
   vec3  scatterDistance     = attenuationDistance * x3d_MultiscatterColorEXT; // Scale the attenuation distance by the multi-scatter color
   float maxColor            = max3 (scatterDistance);
   vec3  vMaxColor           = max (vec3 (maxColor, maxColor, maxColor), vec3 (0.00001));
   mat4  invProjectionMatrix = inverse (projectionMatrix);
   vec2  texelSize           = 1.0 / vec2 (x3d_Viewport .zw);
   vec2  uv                  = gl_FragCoord .xy * texelSize;
   vec4  centerSample        = texture (scatterLUT, uv); // Sample the LUT at the current UV coordinates
   float centerDepth         = texture (x3d_ScatterDepthSamplerEXT, uv) .r; // Get depth from the framebuffer

   centerDepth = centerDepth * 2.0 - 1.0; // Convert to normalized device coordinates

   vec2 clipUV            = uv * 2.0 - 1.0; // Convert to clip space coordinates
   vec4 clipSpacePosition = vec4 (clipUV .xy, centerDepth, 1.0); // Convert to clip space coordinates
   vec4 upos              = invProjectionMatrix * clipSpacePosition; // Convert to view space coordinates
   vec3 fragViewPosition  = upos .xyz / upos .w; // Normalize the coordinates

   upos = invProjectionMatrix * vec4 (clipUV .x + texelSize .x, clipUV .y, centerDepth, 1.0);

   vec3  offsetViewPosition = upos .xyz / upos .w; // Normalize the coordinates
   float mPerPixel          = distance (fragViewPosition, offsetViewPosition);
   float maxRadiusPixels    = maxColor / mPerPixel; // Calculate the maximum radius in pixels

   if (maxRadiusPixels <= 1.0)
      return baseColor; // If the maximum color is less than or equal to the pixel size, return the base color

   centerDepth = fragViewPosition .z; // Extract the depth value

   vec3 totalWeight  = vec3 (0.0);
   vec3 totalDiffuse = vec3 (0.0);

   vec3 albedo                 = baseColor / max (0.00001, max3 (baseColor)); // Normalize the albedo color to avoid division by zero
   vec3 clampedScatterDistance = max (vec3 (x3d_ScatterMinRadiusEXT), scatterDistance / maxColor) * maxColor;
   vec3 d                      = burley_setup (clampedScatterDistance, albedo); // Setup the Burley model parameters

   float randomTheta    = fract (tan (distance (uv * M_PHI, uv) * 1.0) * uv .x) * M_GOLDEN_ANGLE;
   mat2  rotationMatrix = mat2 (cos (randomTheta), -sin (randomTheta), sin (randomTheta), cos (randomTheta));

   for (int i = 0; i < X3D_SCATTER_SAMPLES_COUNT_EXT; ++ i)
   {
      vec3  scatterSample = x3d_ScatterSamplesEXT [i];
      float fabAngle      = scatterSample .x;
      float r             = (scatterSample .y * maxRadiusPixels) * texelSize .x;
      float rcpPdf        = scatterSample .z;
      vec2  sampleCoords  = rotationMatrix * vec2 (cos (fabAngle) * r, sin (fabAngle) * r); // Rotate the sample coordinates
      vec2  sampleUV      = uv + sampleCoords; // + (randomTheta * 2.0 - 1.0) * 0.01;
      vec4  textureSample = texture (scatterLUT, sampleUV);

      // Check volume scatter material id.
      if (centerSample .w != textureSample .w)
         continue;

      float sampleDepth = texture (x3d_ScatterDepthSamplerEXT, sampleUV) .r;

      sampleDepth = sampleDepth * 2.0 - 1.0; // Convert to normalized device coordinates

      vec2  sampleClipUV       = sampleUV * 2.0 - 1.0; // Convert to clip space coordinates
      vec4  sampleUpos         = invProjectionMatrix * vec4 (sampleClipUV .xy, sampleDepth, 1.0);
      vec3  sampleViewPosition = sampleUpos .xyz / sampleUpos .w; // Normalize the coordinates
      float sampleDistance     = distance (sampleViewPosition, fragViewPosition);

      //vec3 exp_13 = exp2(((1.4426950408889634 * (-1.0/3.0)) * c) * vec3(0.5, 0.9, 0.0));
      //vec3 expSum = exp_13 * (1.0 + exp_13 * exp_13);

      //vec3 diffusion = (exp(-c / scatterDistance) + exp(-c / (scatterDistance * 3.0))) / (8.0 * M_PI * scatterDistance) / c;
      //vec3 pdf = (exp(-r / vMaxColor) + exp(-r / (vMaxColor * 3.0))) / (8.0 * M_PI * vMaxColor);

      vec3 weight = burley_eval (d, sampleDistance) * rcpPdf;

      //vec3 weight = diffusion / pdf;
      totalWeight  += weight;
      totalDiffuse += weight * textureSample .rgb;
   }

   totalWeight = max (totalWeight, vec3 (0.0001)); // Avoid division by zero

   return baseColor * (totalDiffuse / totalWeight);
}
#endif
`;
