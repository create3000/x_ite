
#if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
#extension GL_EXT_frag_depth : enable
#endif

precision highp float;
precision highp int;

uniform int x3d_GeometryType;
uniform float x3d_AlphaCutoff;
uniform x3d_PointPropertiesParameters x3d_PointProperties;

varying float pointSize; // point size
varying float fogDepth;  // fog depth
varying vec4  color;     // color
varying vec3  vertex;    // point on geometry

// Text coords, later initialized.
vec4 texCoord0 = vec4 (0.0);
vec4 texCoord1 = vec4 (0.0);

// Dummy variables for texture coordinate generator, which is not available.
vec3 normal      = vec3 (0.0);
vec3 localNormal = vec3 (0.0);
vec3 localVertex = vec3 (0.0);

#if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
uniform float x3d_LogarithmicFarFactor1_2;
varying float depth;
#endif

#pragma X3D include "include/Fog.glsl"
#pragma X3D include "include/ClipPlanes.glsl"
#pragma X3D include "include/Texture.glsl"

vec4
getPointColor ()
{
   vec4 texCoord  = vec4 (gl_PointCoord .x, 1.0 - gl_PointCoord .y, 0.0, 1.0);

   texCoord0 = texCoord;
   texCoord1 = texCoord;

   vec4 finalColor = getTextureColor (color, vec4 (1.0));

   if (x3d_NumTextures == 0)
   {
      if (pointSize > 1.0)
      {
         float t = max (distance (vec2 (0.5), gl_PointCoord) * pointSize - max (pointSize / 2.0 - 1.0, 0.0), 0.0);

         finalColor .a = mix (finalColor .a, 0.0, t);
      }
      else
      {
         finalColor .a *= pointSize;
      }
   }

   return finalColor;
}

void
main ()
{
   clip ();

   vec4 finalColor = getPointColor ();

   finalColor .rgb = getFogColor (finalColor .rgb);

   if (finalColor .a < x3d_AlphaCutoff)
      discard;

   gl_FragColor = finalColor;

   // Logarithmic Depth Buffer

   #if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
   //http://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
   if (x3d_LogarithmicFarFactor1_2 > 0.0)
      gl_FragDepth = log2 (depth) * x3d_LogarithmicFarFactor1_2;
   else
      gl_FragDepth = gl_FragCoord .z;
   #endif
}
