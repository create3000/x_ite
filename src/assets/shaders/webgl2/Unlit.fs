#version 300 es

precision highp float;
precision highp int;
precision highp sampler3D;

in float fogDepth;    // fog depth
in vec4  color;       // color
in vec3  normal;      // normal vector at this point on geometry
in vec3  vertex;      // point on geometry
in vec3  localNormal; // normal vector at this point on geometry in local coordinates
in vec3  localVertex; // point on geometry in local coordinates

#if ! defined (X3D_GEOMETRY_0D)
   #if x3d_MaxTextures > 0
   in vec4 texCoord0;
   #endif

   #if x3d_MaxTextures > 1
   in vec4 texCoord1;
   #endif
#endif

#if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
uniform float x3d_LogarithmicFarFactor1_2;
in float depth;
#endif

out vec4 x3d_FragColor;

#pragma X3D include "include/Point.glsl"
#pragma X3D include "include/Stipple.glsl"
#pragma X3D include "include/Hatch.glsl"
#pragma X3D include "include/Texture.glsl"
#pragma X3D include "include/Fog.glsl"
#pragma X3D include "include/ClipPlanes.glsl"

uniform float x3d_AlphaCutoff;
uniform bool  x3d_ColorMaterial;
uniform x3d_UnlitMaterialParameters x3d_Material;

#if defined (X3D_EMISSIVE_TEXTURE)
uniform x3d_EmissiveTextureParameters x3d_EmissiveTexture;
#endif

vec4
getEmissiveColor ()
{
   // Get emissive parameter.

   float alpha             = 1.0 - x3d_Material .transparency;
   vec4  emissiveParameter = x3d_ColorMaterial ? vec4 (color .rgb, color .a * alpha) : vec4 (x3d_Material .emissiveColor, alpha);

   // Get texture color.

   #if defined (X3D_EMISSIVE_TEXTURE)
      vec3 texCoord = getTexCoord (x3d_EmissiveTexture .textureTransformMapping, x3d_EmissiveTexture .textureCoordinateMapping);

      #if defined (X3D_EMISSIVE_TEXTURE_2D)
         return emissiveParameter * texture (x3d_EmissiveTexture .texture2D, texCoord .st);
      #elif defined (X3D_EMISSIVE_TEXTURE_3D)
         return emissiveParameter * texture (x3d_EmissiveTexture .texture3D, texCoord .stp);
      #elif defined (X3D_EMISSIVE_TEXTURE_CUBE)
         return emissiveParameter * texture (x3d_EmissiveTexture .textureCube, texCoord .stp);
      #endif
   #else
      return getTextureColor (emissiveParameter, vec4 (vec3 (1.0), alpha));
   #endif
}

vec4
getMaterialColor ()
{
   #if defined (X3D_GEOMETRY_0D) && ! defined (X3D_EMISSIVE_TEXTURE)
      setTexCoords ();

      if (x3d_NumTextures == 0)
         return getPointColor (getEmissiveColor ());
      else
         return getEmissiveColor ();
   #else
      return getEmissiveColor ();
   #endif
}

void
main ()
{
   clip ();

   #if defined (X3D_GEOMETRY_1D)
      stipple ();
   #endif

   vec4 finalColor = getMaterialColor ();

   #if defined (X3D_GEOMETRY_2D) || defined (X3D_GEOMETRY_3D)
      finalColor = getHatchColor (finalColor);
   #endif

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
