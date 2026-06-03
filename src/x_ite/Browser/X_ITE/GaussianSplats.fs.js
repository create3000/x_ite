
// https://github.com/javagl/JSplat/blob/41706e0a54372a8ae2e4b474d3a39e19337e42c2/jsplat-viewer-lwjgl/src/main/resources/fragmentShaderSource.glsl

const fs = () => /* glsl */ `#version 300 es

precision highp int;
precision highp float;
precision highp sampler2D;

in vec4 color;
in vec2 texCoord;
in vec3 conic;

#if defined (X3D_CLIP_PLANES) || defined (X3D_FOG)
   in vec3 vertex;
#endif

#if !defined (X3D_ORDER_INDEPENDENT_TRANSPARENCY)
   out vec4 x3d_FragColor;
#endif

#include <ToneMapping>
#include <ClipPlanes>
#include <Fog>
#include <OIT>
#include <Logarithmic>

void
main ()
{
   #if defined (X3D_CLIP_PLANES)
      clip ();
   #endif

   // Equation 4
   float exponent = -0.5 * (conic .x * texCoord .x * texCoord .x + conic .z * texCoord .y * texCoord .y) - conic .y * texCoord .x * texCoord .y;

   if (exponent > 0.0)
      discard;

   float alpha = min (0.99, exp (exponent) * color .a); // opacity modulated by Gaussian falloff

   if (alpha < 1.0 / 255.0)
      discard;

   vec4 finalColor = vec4 (color .rgb, alpha);

   #if defined (X3D_FOG)
      finalColor .rgb = getFogColor (finalColor .rgb);
   #endif

   finalColor .rgb = toneMap (finalColor .rgb);

   #if defined (X3D_ORDER_INDEPENDENT_TRANSPARENCY)
      oit (finalColor);
   #else
      x3d_FragColor = finalColor;
   #endif

   #if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
      logarithmic ();
   #endif
}
`;

export default fs;
