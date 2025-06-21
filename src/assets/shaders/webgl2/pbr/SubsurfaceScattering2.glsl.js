export default () => /* glsl */ `
#if defined (X3D_VOLUME_SCATTER_MATERIAL_EXT)

uniform vec3  x3d_MultiscatterColorEXT;
uniform float x3d_ScatterAnisotropyEXT;
uniform vec3  x3d_ScatterSamplesEXT [X3D_SCATTER_SAMPLES_COUNT_EXT];
uniform float x3d_ScatterMinRadiusEXT;

uniform sampler2D x3d_ScatterSamplerEXT;
uniform sampler2D x3d_ScatterIBLSamplerEXT;
uniform sampler2D x3d_ScatterDepthSamplerEXT;

const float M_1_PI         = 1.0 / M_PI;
const float M_PHI          = (1.0 + sqrt (5.0)) / 2.0;
const float M_GOLDEN_ANGLE = M_PI * (3.0f - sqrt (5.0));

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
getSubsurfaceScattering (const in vec3 vertex, const in mat4 projectionMatrix, const in float attenuationDistance, const sampler2D scatterLUT, const in vec3 baseColor)
{
   vec3  scatterDistance     = attenuationDistance * x3d_MultiscatterColorEXT; // Scale the attenuation distance by the multi-scatter color
   float maxColor            = max3 (scatterDistance);
   vec3  vMaxColor           = max (vec3 (maxColor, maxColor, maxColor), vec3 (0.00001));
   vec2  texelSize           = 1.0 / vec2 (x3d_Viewport .zw);
   mat4  invProjectionMatrix = inverse (projectionMatrix);
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
      return baseColor * centerSample .rgb; // If the maximum color is less than or equal to the pixel size, return the base color

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
      float r             = scatterSample .y * maxRadiusPixels * texelSize .x;
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
