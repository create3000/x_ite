export default () => /* glsl */ `
#if defined (X3D_VOLUME_SCATTER_MATERIAL_EXT)
uniform vec3  x3d_MultiscatterColorEXT;

// glTF specification for converting multi-scatter color to single scatter color.
vec3
multiToSingleScatter ()
{
   vec3 s = 4.09712 + 4.20863 * x3d_MultiscatterColorEXT - sqrt (9.59217 + 41.6808 * x3d_MultiscatterColorEXT + 17.7126 * x3d_MultiscatterColorEXT * x3d_MultiscatterColorEXT);

   return 1.0 - s * s;
}

#if !defined (X3D_VOLUME_SCATTER_PASS)
// Subsurface scattering based on the blender implementation of the Burley model.

uniform float x3d_ScatterAnisotropyEXT;
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
getSubsurfaceScattering (const in vec3 vertex, const in mat4 projectionMatrix, const in float attenuationDistance, const in vec3 diffuseColor)
{
   vec3  scatterDistance     = attenuationDistance * x3d_MultiscatterColorEXT; // Scale the attenuation distance by the multi-scatter color.
   float maxColor            = max3 (scatterDistance);
   vec3  vMaxColor           = max (vec3 (maxColor), vec3 (0.00001));
   vec2  texelSize           = 1.0 / vec2 (x3d_Viewport .zw);
   mat4  invProjectionMatrix = inverse (projectionMatrix);
   vec2  uv                  = gl_FragCoord .xy * texelSize;
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
      return centerSample .rgb; // If the maximum radius is less than or equal to the pixel size, the pixel itself defines the scatter color.

   centerDepth = fragViewPosition .z; // Extract the depth value.

   vec3 totalWeight  = vec3 (0.0);
   vec3 totalDiffuse = vec3 (0.0);

   vec3 albedo                 = diffuseColor / max (0.00001, max3 (diffuseColor)); // Normalize the albedo color to avoid division by zero. // TODO: not used.
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

   return totalDiffuse / totalWeight;
}
#endif
#endif
`;
