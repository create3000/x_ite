export default /* glsl */ `
const float GAMMA     = 2.2;
const float INV_GAMMA = 1.0 / GAMMA;

// linear to sRGB approximation
// see http://chilliant.blogspot.com/2012/08/srgb-approximations-for-hlsl.html
vec3
linearTosRGB (const in vec3 color)
{
   return pow (color, vec3 (INV_GAMMA));
}

vec4
linearTosRGB (const in vec4 color)
{
   return vec4 (linearTosRGB (color .rgb), color .a);
}

// sRGB to linear approximation
// see http://chilliant.blogspot.com/2012/08/srgb-approximations-for-hlsl.html
vec3
sRGBToLinear (const in vec3 color)
{
   return pow (color, vec3 (GAMMA));
}

vec4
sRGBToLinear (const in vec4 color)
{
   return vec4 (sRGBToLinear (color .rgb), color .a);
}

#if defined (X3D_TONEMAP_ACES_NARKOWICZ)
// ACES tone map (faster approximation)
// see: https://knarkowicz.wordpress.com/2016/01/06/aces-filmic-tone-mapping-curve/
vec3
toneMapACES_Narkowicz (const in vec3 color)
{
   const float A = 2.51;
   const float B = 0.03;
   const float C = 2.43;
   const float D = 0.59;
   const float E = 0.14;

   return clamp ((color * (A * color + B)) / (color * (C * color + D) + E), 0.0, 1.0);
}
#endif

#if defined (X3D_TONEMAP_ACES_HILL) || defined (X3D_TONEMAP_ACES_HILL_EXPOSURE_BOOST)
// sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT
const mat3 ACESInputMat = mat3
(
   0.59719, 0.07600, 0.02840,
   0.35458, 0.90834, 0.13383,
   0.04823, 0.01566, 0.83777
);

// ODT_SAT => XYZ => D60_2_D65 => sRGB
const mat3 ACESOutputMat = mat3
(
   1.60475, -0.10208, -0.00327,
   -0.53108,  1.10813, -0.07276,
   -0.07367, -0.00605,  1.07602
);

// ACES filmic tone map approximation
// see https://github.com/TheRealMJP/BakingLab/blob/master/BakingLab/ACES.hlsl
vec3
RRTAndODTFit (const in vec3 color)
{
   vec3 a = color * (color + 0.0245786) - 0.000090537;
   vec3 b = color * (0.983729 * color + 0.4329510) + 0.238081;

   return a / b;
}

// tone mapping
vec3
toneMapACES_Hill (in vec3 color)
{
   color = ACESInputMat * color;

   // Apply RRT and ODT
   color = RRTAndODTFit (color);

   color = ACESOutputMat * color;

   // Clamp to [0, 1]
   color = clamp (color, 0.0, 1.0);

   return color;
}
#endif

// Khronos PBR neutral tone mapping
#if defined (X3D_TONEMAP_KHR_PBR_NEUTRAL)
vec3
toneMap_KhronosPbrNeutral (in vec3 color)
{
    const float startCompression = 0.8 - 0.04;
    const float desaturation     = 0.15;

    float x      = min (color .r, min (color .g, color .b));
    float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;

    color -= offset;

    float peak = max (color .r, max (color .g, color .b));

    if (peak < startCompression)
      return color;

    const float d = 1. - startCompression;

    float newPeak = 1. - d * d / (peak + d - startCompression);

    color *= newPeak / peak;

    float g = 1. - 1. / (desaturation * (peak - newPeak) + 1.);

    return mix (color, newPeak * vec3 (1.0), g);
}
#endif

uniform float x3d_Exposure;

vec3
toneMap (in vec3 color)
{
   color *= x3d_Exposure;

   #if defined (X3D_TONEMAP_ACES_NARKOWICZ)
      color = toneMapACES_Narkowicz (color);
   #endif

   #if defined (X3D_TONEMAP_ACES_HILL)
      color = toneMapACES_Hill (color);
   #endif

   #if defined (X3D_TONEMAP_ACES_HILL_EXPOSURE_BOOST)
      // boost exposure as discussed in https://github.com/mrdoob/three.js/pull/19621
      // this factor is based on the exposure correction of Krzysztof Narkowicz in his
      // implemetation of ACES tone mapping
      color /= 0.6;
      color  = toneMapACES_Hill (color);
   #endif

   #if defined (X3D_TONEMAP_KHR_PBR_NEUTRAL)
      color = toneMap_KhronosPbrNeutral (color);
   #endif

   #if defined (X3D_COLORSPACE_SRGB)
      return color;
   #elif defined (X3D_COLORSPACE_LINEAR_WHEN_PHYSICAL_MATERIAL)
      #if defined (X3D_PHYSICAL_MATERIAL)
         return linearTosRGB (color);
      #else
         return color;
      #endif
   #elif defined (X3D_COLORSPACE_LINEAR)
      return linearTosRGB (color);
   #endif
}
`;
