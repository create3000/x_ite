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

#if __VERSION__ >= 300 && defined (X3D_VOLUME_SCATTER_MATERIAL_EXT)

uniform vec3  x3d_MultiscatterColorEXT;
uniform float x3d_ScatterAnisotropyEXT;
uniform vec3  x3d_ScatterSamplesEXT [X3D_SCATTER_SAMPLES_COUNT_EXT];

uniform sampler2D x3d_ScatterSamplerEXT;
uniform sampler2D x3d_ScatterIBLSamplerEXT;
uniform sampler2D x3d_ScatterDepthSamplerEXT;

// vec3
// getSubsurfaceScattering (const in vec3 vertex, const in mat4 modelMatrix, const in mat4 viewMatrix, const in mat4 projectionMatrix, const in float attenuationDistance)
// {
//    vec2  uv           = vec2 (projectionMatrix * viewMatrix * vec4 (vertex, 1.0)); // TODO: vertex is already in world space
//    float centerDepth  = texture (x3d_ScatterDepthSamplerEXT, uv) .x;
//    vec2  texelSize    = 1.0 / vec2 (x3d_Viewport .zw);
//    vec2  centerVector = uv * centerDepth;
//    vec2  cornerVector = (uv + 0.5 * texelSize) * centerDepth;
//    vec2  pixelPerM    = abs (cornerVector - centerVector) * 2.0;

//    for (int i = 0; i < X3D_SCATTER_SAMPLES_COUNT_EXT; ++ i)
//    {
//       vec3  scatterSample = x3d_ScatterSamplesEXT [i];
//       float fabAngle      = scatterSample .x;
//       float r             = scatterSample .y;
//       float rcpPdf        = scatterSample .z;
//       vec2  samplePos     = vec2 (cos (fabAngle), sin (fabAngle));

//       samplePos *= uv + round (r * pixelPerM * attenuationDistance);
//    }

//    return vec3 (0.0);
// }

vec3
getSubsurfaceScattering(const in vec3 vertex,
                        const in mat4 modelMatrix,
                        const in mat4 viewMatrix,
                        const in mat4 projectionMatrix,
                        const in float attenuationDistance)
{
   vec3 scatterColor = vec3 (0.0);

   vec2  uv           = vec2 (projectionMatrix * viewMatrix * vec4 (vertex, 1.0)); // TODO: vertex is already in world space
   float centerDepth  = texture (x3d_ScatterDepthSamplerEXT, uv) .x;
   vec2  texelSize    = 1.0 / vec2 (x3d_Viewport .zw);
   vec2  centerVector = uv * centerDepth;
   vec2  cornerVector = (uv + 0.5 * texelSize) * centerDepth;
   vec2  pixelPerM    = abs (cornerVector - centerVector) * 2.0;

   for (int i = 0; i < X3D_SCATTER_SAMPLES_COUNT_EXT; ++ i)
   {
      vec3  scatterSample = x3d_ScatterSamplesEXT [i];
      float fabAngle      = scatterSample .x;
      float r             = scatterSample .y;
      float rcpPdf        = scatterSample .z;
      vec2  samplePos     = vec2 (cos (fabAngle), sin (fabAngle));

      samplePos *= uv + round (r * pixelPerM * attenuationDistance);

      // TODO: code below is AI generate.

      // Sample depth and color at sample position
      float sampleDepth = texture (x3d_ScatterDepthSamplerEXT, samplePos) .r;
      vec3  sampleColor = texture (x3d_ScatterSamplerEXT, samplePos) .rgb;

      // Estimate thickness along the view ray
      float thickness = abs (centerDepth - sampleDepth) * attenuationDistance;

      // Compute attenuation (Beer-Lambert law)
      vec3 attenuation = exp (-thickness * x3d_MultiscatterColorEXT);

      // Weight by inverse PDF and anisotropy factor
      float weight = r * max (0.0, 1.0 - x3d_ScatterAnisotropyEXT * rcpPdf);

      // Accumulate the weighted sample color
      scatterColor += sampleColor * attenuation * weight;
   }

   scatterColor /= float (X3D_SCATTER_SAMPLES_COUNT_EXT); // Average the result
   return scatterColor;
}
#endif
`;
