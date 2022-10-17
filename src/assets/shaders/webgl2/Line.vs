#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;

uniform bool x3d_ColorMaterial;   // true if a X3DColorNode is attached, otherwise false
uniform x3d_UnlitMaterialParameters x3d_Material;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

in float x3d_FogDepth;
in vec4  x3d_TexCoord0;
in vec4  x3d_Color;
in vec4  x3d_Vertex;

flat out float lengthSoFar; // in px, stipple support
flat out vec2  startPoint;  // in px, stipple support
out vec2       midPoint;    // in px, stipple support
out float      fogDepth;    // fog depth
out vec4       color;       // color
out vec3       vertex;      // point on geometry

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
out float depth;
#endif

#pragma X3D include "include/Particle.glsl"

void
main ()
{
   vec4 position = x3d_ModelViewMatrix * getVertex (x3d_Vertex);

   lengthSoFar = x3d_TexCoord0 .z;
   startPoint  = x3d_TexCoord0 .xy;
   midPoint    = x3d_TexCoord0 .xy;
   fogDepth    = x3d_FogDepth;
   vertex      = position .xyz;

   gl_Position = x3d_ProjectionMatrix * position;

   #ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
   depth = 1.0 + gl_Position .w;
   #endif

   float alpha = 1.0 - x3d_Material .transparency;

   if (x3d_ColorMaterial)
   {
      color .rgb = x3d_Color .rgb;
      color .a   = x3d_Color .a * alpha;
   }
   else
   {
      color .rgb = x3d_Material .emissiveColor;
      color .a   = alpha;
   }
}
