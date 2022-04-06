#version 300 es

precision highp float;
precision highp int;
precision highp sampler3D;

uniform int   x3d_GeometryType;
uniform bool  x3d_ColorMaterial; // true if a X3DColorNode is attached, otherwise false
uniform float x3d_AlphaCutoff;

uniform x3d_UnlitMaterialParameters x3d_Material;

in float fogDepth;    // fog depth
in vec4  color;       // color
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

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
uniform float x3d_LogarithmicFarFactor1_2;
in float depth;
#endif

out vec4 x3d_FragColor;

#pragma X3D include "include/Texture.glsl"
#pragma X3D include "include/Hatch.glsl"
#pragma X3D include "include/Fog.glsl"
#pragma X3D include "include/ClipPlanes.glsl"

#ifdef X3D_MATERIAL_TEXTURES

uniform x3d_MaterialTextureParameters x3d_EmissiveTexture;

vec4
getEmissiveColor ()
{
   // Get emissive parameter.

   float alpha             = 1.0 - x3d_Material .transparency;
   vec4  emissiveParameter = x3d_ColorMaterial ? vec4 (color .rgb, color .a * alpha) : vec4 (x3d_Material .emissiveColor, alpha);

   // Get texture color.

   switch (x3d_EmissiveTexture .textureType)
   {
      case x3d_TextureType2D:
      {
         vec4 texCoord = getTexCoord (x3d_EmissiveTexture .textureTransformMapping, x3d_EmissiveTexture .textureCoordinateMapping);

         return emissiveParameter * texture (x3d_EmissiveTexture .texture2D, texCoord .st);
      }

      #ifdef X3D_MATERIAL_TEXTURE_3D
      case x3d_TextureType3D:
      {
         vec4 texCoord = getTexCoord (x3d_EmissiveTexture .textureTransformMapping, x3d_EmissiveTexture .textureCoordinateMapping);

         return emissiveParameter * texture (x3d_EmissiveTexture .texture3D, texCoord .stp);
      }
      #endif

      #ifdef X3D_MATERIAL_TEXTURE_CUBE
      case x3d_TextureTypeCube:
      {
         vec4 texCoord = getTexCoord (x3d_EmissiveTexture .textureTransformMapping, x3d_EmissiveTexture .textureCoordinateMapping);

         return emissiveParameter * texture (x3d_EmissiveTexture .textureCube, texCoord .stp);
      }
      #endif

      default:
         return getTextureColor (emissiveParameter, vec4 (1.0));
   }
}

#else

vec4
getEmissiveColor ()
{
   // Get emissive parameter.

   float alpha             = 1.0 - x3d_Material .transparency;
   vec4  emissiveParameter = x3d_ColorMaterial ? vec4 (color .rgb, color .a * alpha) : vec4 (x3d_Material .emissiveColor, alpha);

   // Get texture color.

   return getTextureColor (emissiveParameter, vec4 (1.0));
}

#endif

vec4
getMaterialColor ()
{
   return getEmissiveColor ();
}

// DEBUG
//uniform ivec4 x3d_Viewport;

void
main ()
{
   clip ();

   vec4 finalColor = vec4 (0.0);

   finalColor      = getMaterialColor ();
   finalColor      = getHatchColor (finalColor);
   finalColor .rgb = getFogColor (finalColor .rgb);

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

   // DEBUG
   #ifdef X3D_SHADOWS
   //x3d_FragColor .rgb = texture2D (x3d_ShadowMap [0], gl_FragCoord .xy / vec2 (x3d_Viewport .zw)) .rgb;
   //x3d_FragColor .rgb = mix (tex .rgb, x3d_FragColor .rgb, 0.5);
   #endif

   #ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
   //x3d_FragColor .rgb = mix (vec3 (1.0, 0.0, 0.0), x3d_FragColor .rgb, 0.5);
   #endif
}
