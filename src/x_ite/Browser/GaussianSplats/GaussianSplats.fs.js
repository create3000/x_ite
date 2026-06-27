
// https://github.com/javagl/JSplat/blob/41706e0a54372a8ae2e4b474d3a39e19337e42c2/jsplat-viewer-lwjgl/src/main/resources/fragmentShaderSource.glsl

const fs = () => /* glsl */ `#version 300 es

precision highp int;
precision highp float;
precision highp sampler2D;

in vec4 color;
in vec2 coordXY;
in vec3 conic;

#if defined (X3D_CLIP_PLANES) || defined (X3D_FOG) || defined (X3D_POINTING_PASS)
   in vec3 vertex;
#endif

#if defined (X3D_POINTING_PASS)
   in vec2 texCoord;
#endif

#if defined (X3D_POINTING_PASS)
   uniform float x3d_Id;

   layout(location = 0) out vec4 x3d_FragData0;
   layout(location = 1) out vec4 x3d_FragData1;
   layout(location = 2) out vec4 x3d_FragData2;
#elif defined (X3D_DEPTH_PASS)
   uniform int x3d_Id;

   layout(location = 0) out vec4 x3d_FragData0;

   #if defined (X3D_NORMAL_BUFFER)
      layout(location = 1) out vec4 x3d_FragData1;
   #endif
#else
   #if !defined (X3D_ORDER_INDEPENDENT_TRANSPARENCY)
      out vec4 x3d_FragColor;
   #endif
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
   float exponent = -0.5 * (conic .x * coordXY .x * coordXY .x + conic .z * coordXY .y * coordXY .y) - conic .y * coordXY .x * coordXY .y;

   if (exponent > 0.0)
      discard;

   float alpha = min (0.99, exp (exponent) * color .a); // opacity modulated by Gaussian falloff

   if (alpha < 1.0 / 255.0)
      discard;

   #if defined (X3D_POINTING_PASS)
      x3d_FragData0 = vec4 (vertex, x3d_Id);     // vertex
      x3d_FragData1 = vec4 (0.0, 0.0, 1.0, 0.0); // normal
      x3d_FragData2 = vec4 (texCoord, 0.0, 1.0); // texCoord
   #elif defined (X3D_DEPTH_PASS)
      #if defined (X3D_NORMAL_BUFFER)
         x3d_FragData0 = vec4 (gl_FragCoord .z, vec3 (x3d_Id)); // depth, id
         x3d_FragData1 = vec4 (0.0, 0.0, 1.0, float (gl_FrontFacing)); // local normal, front face
      #else
         x3d_FragData0 = vec4 (vec3 (gl_FragCoord .z), 1.0); // depth
      #endif
   #else
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
   #endif
}
`;

export default fs;
