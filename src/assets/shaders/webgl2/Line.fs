#version 300 es

precision highp float;
precision highp int;

uniform float x3d_AlphaCutoff;
uniform x3d_LinePropertiesParameters x3d_LineProperties;
uniform ivec4 x3d_Viewport;

flat in float lengthSoFar; // in px, stipple support
flat in vec2  startPoint;  // in px, stipple support
in vec2       midPoint;    // in px, stipple support
in float      fogDepth;    // fog depth
in vec4       color;       // color
in vec3       vertex;      // point on geometry

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
uniform float x3d_LogarithmicFarFactor1_2;
in float depth;
#endif

out vec4 x3d_FragColor;

#pragma X3D include "include/Fog.glsl"
#pragma X3D include "include/ClipPlanes.glsl"
#pragma X3D include "include/Line2.glsl"

void
stipple ()
{
   if (x3d_LineProperties .applied)
   {
      vec2  point = closest_point (line2 (startPoint, midPoint), gl_FragCoord .xy);
      float s     = (lengthSoFar + length (point - startPoint)) * x3d_LineProperties .lineStippleScale;
      float alpha = texture (x3d_LineProperties .linetype, vec2 (s, 0.5)) .a;

      if (alpha != 1.0)
         discard;
   }
}

void
main ()
{
   clip ();
   stipple ();

   vec4 finalColor = vec4 (0.0);

   finalColor .rgb = getFogColor (color .rgb);
   finalColor .a   = color .a;

   if (finalColor .a < x3d_AlphaCutoff)
   {
      discard;
   }

   x3d_FragColor = finalColor;

   #ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
   //http://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
   if (x3d_LogarithmicFarFactor1_2 > 0.0)
      gl_FragDepth = log2 (depth) * x3d_LogarithmicFarFactor1_2;
   else
      gl_FragDepth = gl_FragCoord .z;
   #endif
}
