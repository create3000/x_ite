#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;
precision highp sampler3D;
precision highp samplerCube;

#pragma X3D include "include/Fragment.glsl"
#pragma X3D include "include/ShadowColor.glsl"

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
   vec4 finalColor = getEmissiveColor ();

   #if defined (X3D_SHADOWS)
   finalColor .rgb = getShadowColor (normal, finalColor .rgb);
   #endif

   return finalColor;
}

void
main ()
{
   fragment_main ();
}
