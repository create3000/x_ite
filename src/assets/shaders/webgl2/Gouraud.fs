#version 300 es

precision highp float;
precision highp int;

uniform float x3d_AlphaCutoff;
uniform bool  x3d_ColorMaterial; // true if a X3DColorNode is attached, otherwise false

in float fogDepth;    // fog depth
in vec4  frontColor;  // color
in vec4  backColor;   // color
in vec3  normal;      // normal vector at this point on geometry
in vec3  vertex;      // point on geometry
in vec3  localNormal; // normal vector at this point on geometry in local coordinates
in vec3  localVertex; // point on geometry in local coordinates

#if x3d_MaxTextures > 0
in vec4 texCoord0;
#endif

#if x3d_MaxTextures > 1
in vec4 texCoord1;
#endif

#if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
uniform float x3d_LogarithmicFarFactor1_2;
in float depth;
#endif

out vec4 x3d_FragColor;

#pragma X3D include "include/Texture.glsl"
#pragma X3D include "include/Hatch.glsl"
#pragma X3D include "include/Fog.glsl"
#pragma X3D include "include/ClipPlanes.glsl"

void
main ()
{
   clip ();

   vec4 finalColor = gl_FrontFacing ? frontColor : backColor;

   finalColor      = getTextureColor (finalColor, vec4 (1.0));
   finalColor      = getProjectiveTextureColor (finalColor);
   finalColor      = getHatchColor (finalColor);
   finalColor .rgb = getFogColor (finalColor .rgb);

   if (finalColor .a < x3d_AlphaCutoff)
      discard;

   x3d_FragColor = finalColor;

   #if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
   //http://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
   if (x3d_LogarithmicFarFactor1_2 > 0.0)
      gl_FragDepth = log2 (depth) * x3d_LogarithmicFarFactor1_2;
   else
      gl_FragDepth = gl_FragCoord .z;
   #endif
}
