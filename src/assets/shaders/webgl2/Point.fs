#version 300 es

precision highp float;
precision highp int;

uniform int x3d_GeometryType;
uniform float x3d_AlphaCutoff;
uniform x3d_PointPropertiesParameters x3d_PointProperties;
uniform x3d_UnlitMaterialParameters x3d_Material;
uniform bool x3d_ColorMaterial;

#ifdef X3D_MATERIAL_TEXTURES
uniform x3d_EmissiveTextureParameters x3d_EmissiveTexture;
#endif

in float pointSize; // point size
in float fogDepth;  // fog depth
in vec4  color;     // color
in vec3  vertex;    // point on geometry

// Text coords, later initialized.
vec4 texCoord0 = vec4 (0.0);
vec4 texCoord1 = vec4 (0.0);

// Dummy variables for texture coordinate generator, which is not available.
vec3 normal      = vec3 (0.0);
vec3 localNormal = vec3 (0.0);
vec3 localVertex = vec3 (0.0);

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
uniform float x3d_LogarithmicFarFactor1_2;
in float depth;
#endif

out vec4 x3d_FragColor;

#pragma X3D include "include/Texture.glsl"
#pragma X3D include "include/Fog.glsl"
#pragma X3D include "include/ClipPlanes.glsl"

vec4
getEmissiveColor ()
{
   // Get emissive parameter.

   float alpha             = 1.0 - x3d_Material .transparency;
   vec4  emissiveParameter = x3d_ColorMaterial ? vec4 (color .rgb, color .a * alpha) : vec4 (x3d_Material .emissiveColor, alpha);

   // Get texture color.

   #if defined(X3D_EMISSIVE_TEXTURE)
      vec3 texCoord = getTexCoord (x3d_EmissiveTexture .textureTransformMapping, x3d_EmissiveTexture .textureCoordinateMapping);

      #if defined(X3D_EMISSIVE_TEXTURE_2D)
         return emissiveParameter * texture (x3d_EmissiveTexture .texture2D, texCoord .st);
      #elif defined(X3D_EMISSIVE_TEXTURE_3D)
         return emissiveParameter * texture (x3d_EmissiveTexture .texture3D, texCoord .stp);
      #elif defined(X3D_EMISSIVE_TEXTURE_CUBE)
         return emissiveParameter * texture (x3d_EmissiveTexture .textureCube, texCoord .stp);
      #endif
   #else
      return getTextureColor (emissiveParameter, vec4 (vec3 (1.0), alpha));
   #endif
}

vec4
getPointColor ()
{
   vec4 texCoord  = vec4 (gl_PointCoord .x, 1.0 - gl_PointCoord .y, 0.0, 1.0);

   texCoord0 = texCoord;
   texCoord1 = texCoord;

   vec4 finalColor = getEmissiveColor ();

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
   {
      discard;
   }

   x3d_FragColor = finalColor;

   // Logarithmic Depth Buffer

   #ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
   //http://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
   if (x3d_LogarithmicFarFactor1_2 > 0.0)
      gl_FragDepth = log2 (depth) * x3d_LogarithmicFarFactor1_2;
   else
      gl_FragDepth = gl_FragCoord .z;
   #endif
}
