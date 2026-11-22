export default () => /* glsl */ `

// Original source code from:
// https://github.com/KhronosGroup/glTF-Sample-Renderer/blob/main/source/Renderer/shaders/punctual.glsl

#if defined (X3D_SCATTER_MATERIAL_EXT)

// glTF specification for converting multi-scatter color to single scatter color.
vec3
multiToSingleScatter (const in vec3 multiscatterColor, const in float scatterStrength, const in float scatterAnisotropy)
{
   vec3 rhoMs = multiscatterColor * scatterStrength;
   vec3 s     = 4.09712 + 4.20863 * rhoMs - sqrt (9.59217 + 41.6808 * rhoMs + 17.7126 * rhoMs * rhoMs);

   s = clamp (s, 0.0, 1.0);

   // For a zero input albedo, force s = 1 so rho_ss is exactly zero.
   vec3 zeroInput = vec3 (equal (rhoMs, vec3 (0.0)));

   s = mix (s, vec3 (1.0), zeroInput);

   vec3 rhoSs = (1.0 - s * s) / (1.0 - scatterAnisotropy * s * s);

   return clamp (rhoSs, 0.0, 1.0);
}

#if defined (X3D_VOLUME_MATERIAL_EXT) && defined (X3D_TRANSMISSION_MATERIAL_EXT)
#if defined (X3D_USE_IBL)
vec3
getDiffuseLight (const in vec3 n);
#endif

const int SCATTER_VOLUME_STEPS = 16;

float
henyeyGreenstein (const in float g, const in float cosTheta)
{
   // Henyey-Greenstein phase function.
   // Henyey & Greenstein (1941), "Diffuse radiation in the galaxy", ApJ 93, 70.

   float gSq   = g * g;
   float denom = 1.0 + gSq - 2.0 * g * cosTheta;

   return (1.0 - gSq) / (4.0 * M_PI * pow (denom, 1.5));
}

vec3 getVolumeSingleScattering (
   vec3 v,
   vec3 n,
   float ior,
   vec3 attenuationColor,
   float attenuationDistance,
   vec3 multiscatterColor,
   float scatterStrength,
   float scatterAnisotropy,
   vec3 frontWorldPos,
   float thicknessMap,
   mat4 modelMatrix
)
{
   vec3 outgoingDir = v;

   // Refract the incoming view ray at the front surface. For total internal
   // reflection, fall back to the un-refracted view ray.
   vec3 refractedDir = refract (-outgoingDir, n, 1.0 / ior);

   if (dot (refractedDir, refractedDir) < 1e-4)
      refractedDir = -outgoingDir;

   // Thin-walled: march the authored thickness map directly as a flat slab
   // (symmetric entry/exit), matching getVolumeTransmissionRay's no-cosine
   // model. The thickness is in local space, so scale it to world space.
   float modelScale  = length (modelMatrix [0] .xyz);
   float cosRay      = 1.0;
   float chordLength = thicknessMap * modelScale;

   // Beer-Lambert attenuation coefficient. attenuationDistance == 0 means no attenuation.
   vec3 sigma_t = vec3 (0.0);

   if (attenuationDistance > 0.0)
   {
      vec3 attenuation = max (attenuationColor, vec3 (1e-4));

      sigma_t = max (-log (attenuation) / attenuationDistance, vec3 (0.0));
   }

   vec3  sigma_s    = sigma_t * multiToSingleScatter (multiscatterColor, scatterStrength, scatterAnisotropy);
   float stepLength = chordLength / float (SCATTER_VOLUME_STEPS);
   vec3  scattered  = vec3 (0.0);

   for (int i = 1; i <= SCATTER_VOLUME_STEPS; ++ i)
   {
      float t         = (float (i) - 0.5) * stepLength;
      vec3  samplePos = frontWorldPos + refractedDir * t;
      vec3  inscatter = vec3 (0.0);

      #if defined (X3D_LIGHTING)
      for (int l = 0; l < X3D_NUM_LIGHTS; ++ l)
      {
         x3d_LightSourceParameters light = x3d_LightSource [l];

         vec3  pointToLight;
         float distanceToLight;

         if (light .type != x3d_DirectionalLight)
         {
            pointToLight    = light .location - samplePos;
            distanceToLight = length (light .matrix * pointToLight);
         }
         else
         {
            pointToLight    = -light .direction;
            distanceToLight = -1.0;
         }

         vec3  lightIntensity = getLightIntensity (light, normalize (pointToLight), distanceToLight);
         float lightDist      = max (length (pointToLight), 1e-4);
         vec3  lightDir       = -pointToLight / lightDist;
         float phase          = henyeyGreenstein (scatterAnisotropy, dot (lightDir, outgoingDir));

         inscatter += lightIntensity * phase;
      }
      #endif

      #if defined (X3D_USE_IBL)
         // Approximate the environment as isotropic incoming radiance.
         inscatter += getDiffuseLight (n) / M_PI;
      #endif

      inscatter *= sigma_s;

      // Beer-Lambert transmittance along the refracted ray and back out to
      // the camera. The scattered light exits through the front surface, so
      // its exit distance is t * cosRay.
      vec3 transmittance = exp (-sigma_t * t * (1.0 + cosRay));

      scattered += inscatter * transmittance * stepLength;
   }

   return scattered;
}
#endif

#if !defined (X3D_SCATTER_PASS)
// Subsurface scattering based on the blender implementation of the Burley model.

uniform vec3  x3d_ScatterSamplesEXT [X3D_SCATTER_SAMPLES_COUNT_EXT];
uniform float x3d_ScatterMinRadiusEXT;

uniform sampler2D x3d_ScatterSamplerEXT;
uniform sampler2D x3d_ScatterDepthSamplerEXT;

const float M_1_PI = 1.0 / M_PI;

vec3
burley_setup (const in vec3 radius, const in vec3 albedo)
{
   vec3 a = albedo - 0.8;
   vec3 s = 1.9 - albedo + 3.5 * (a * a);
   vec3 l = 0.25 * M_1_PI * radius;

   return l / s;
}

vec3
burley_eval (const in vec3 d, const in float r)
{
   vec3 exp_r_3_d = exp (-r / (3.0 * d));
   vec3 exp_r_d   = exp_r_3_d * exp_r_3_d * exp_r_3_d;

   return (exp_r_d + exp_r_3_d) / (4.0 * d);
}

vec3
getSubsurfaceScattering (const in vec3 vertex, const in mat4 projectionMatrix, const in float attenuationDistance, const in vec3 multiscatterColor, const in float scatterStrength, const in float scatterAnisotropy, const in vec3 singleScatter, const in vec4 fragCoord)
{
   vec3 multiScatter = scatterStrength * multiscatterColor;
   // Blend between the multi-scatter-driven diffusion length and the
   // single-scatter-driven length as anisotropy increases. At g = 0 this keeps
   // the previous multi-scatter radius, while forward scattering (g > 0)
   // stretches the profile and backward scattering (g < 0) tightens it.
   vec3  scatterDistance     = attenuationDistance * mix (multiScatter, singleScatter, abs (scatterAnisotropy));
   float maxColor            = max3 (scatterDistance);
   vec3  vMaxColor           = max (vec3 (maxColor), vec3 (0.00001));
   vec2  texelSize           = 1.0 / vec2 (x3d_Viewport .zw);
   mat4  invProjectionMatrix = inverse (projectionMatrix);
   vec2  uv                  = fragCoord .xy * texelSize;
   vec4  centerSample        = textureLod (x3d_ScatterSamplerEXT, uv, 0.0); // Sample the LUT at the current UV coordinates.
   float centerDepth         = textureLod (x3d_ScatterDepthSamplerEXT, uv, 0.0) .r; // Get depth from the framebuffer.

   centerDepth = centerDepth * 2.0 - 1.0; // Convert to normalized device coordinates.

   vec2 clipUV            = uv * 2.0 - 1.0; // Convert to clip space coordinates.
   vec4 clipSpacePosition = vec4 (clipUV .xy, centerDepth, 1.0); // Convert to clip space coordinates.
   vec4 upos              = invProjectionMatrix * clipSpacePosition; // Convert to view space coordinates.
   vec3 fragViewPosition  = upos .xyz / upos .w; // Normalize the coordinates.

   upos = invProjectionMatrix * vec4 (clipUV .x + texelSize .x, clipUV .y, centerDepth, 1.0); // Get position of the next texel to the right.

   vec3  offsetViewPosition = upos .xyz / upos .w;
   float mPerPixel          = distance (fragViewPosition, offsetViewPosition);
   float maxRadiusPixels    = maxColor / mPerPixel; // Calculate the maximum radius in pixels.

   if (maxRadiusPixels <= 1.0)
      return centerSample .rgb * multiscatterColor; // If the maximum radius is less than or equal to the pixel size, the pixel itself defines the scatter color.

   centerDepth = fragViewPosition .z; // Extract the depth value.

   vec3 totalWeight  = vec3 (0.0);
   vec3 totalDiffuse = vec3 (0.0);

   vec3 clampedScatterDistance = max (vec3 (x3d_ScatterMinRadiusEXT), scatterDistance / maxColor) * maxColor;
   vec3 d                      = burley_setup (clampedScatterDistance, vec3 (1.0)); // Setup the Burley model parameters.

   for (int i = 0; i < X3D_SCATTER_SAMPLES_COUNT_EXT; ++ i)
   {
      vec3  scatterSample = x3d_ScatterSamplesEXT [i];
      float fabAngle      = scatterSample .x;
      float r             = scatterSample .y * maxRadiusPixels * texelSize .x;
      float rcpPdf        = scatterSample .z;
      vec2  sampleCoords  = vec2 (cos (fabAngle), sin (fabAngle)) * r;
      vec2  sampleUV      = uv + sampleCoords; // + (randomTheta * 2.0 - 1.0) * 0.01;
      vec4  textureSample = textureLod (x3d_ScatterSamplerEXT, sampleUV, 0.0);

      // Check if sample originates from same mesh/material.
      if (centerSample .w != textureSample .w)
         continue;

      float sampleDepth = textureLod (x3d_ScatterDepthSamplerEXT, sampleUV, 0.0) .r;

      sampleDepth = sampleDepth * 2.0 - 1.0; // Convert to normalized device coordinates.

      vec2 sampleClipUV       = sampleUV * 2.0 - 1.0; // Convert to clip space coordinates.
      vec4 sampleUpos         = invProjectionMatrix * vec4 (sampleClipUV .xy, sampleDepth, 1.0);
      vec3 sampleViewPosition = sampleUpos .xyz / sampleUpos .w; // Normalize the coordinates

      // Distance between center and sample in comparison to maximum radius is used for weighting the scattering contribution.
      float sampleDistance = distance (sampleViewPosition, fragViewPosition);
      vec3  weight         = burley_eval (d, sampleDistance) * rcpPdf;

      totalWeight  += weight;
      totalDiffuse += weight * textureSample .rgb;
   }

   totalWeight = max (totalWeight, vec3 (0.0001)); // Avoid division by zero.

   return totalDiffuse / totalWeight * multiscatterColor;
}
#endif
#endif
`;
