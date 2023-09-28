export default /* glsl */ `
vec4
SRGBtoLINEAR (const in vec4 srgbIn)
{
   #if defined (MANUAL_SRGB)
      #if defined (SRGB_FAST_APPROXIMATION)
         vec3 linOut = pow (srgbIn .xyz, vec3 (2.2));
      #else //SRGB_FAST_APPROXIMATION
         vec3 bLess  = step (vec3 (0.04045), srgbIn .xyz);
         vec3 linOut = mix (srgbIn .xyz / vec3 (12.92), pow ((srgbIn .xyz + vec3 (0.055)) / vec3 (1.055), vec3 (2.4)), bLess);
      #endif //SRGB_FAST_APPROXIMATION
      return vec4 (linOut, srgbIn .w);
   #else //MANUAL_SRGB
      return srgbIn;
   #endif //MANUAL_SRGB
}

#if defined (MANUAL_SRGB)
vec4
Gamma (const in vec4 color)
{
   return vec4 (pow (color .rgb, vec3 (1.0 / 2.2)), color .a);
}
#else
#define Gamma(color) (color)
#endif
`;
