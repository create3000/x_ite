export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;
precision highp sampler3D;
precision highp samplerCube;

#pragma X3D include "common/Fragment.glsl"

uniform x3d_UnlitMaterialParameters x3d_Material;

#if defined (X3D_EMISSIVE_TEXTURE)
   uniform x3d_EmissiveTextureParameters x3d_EmissiveTexture;
#endif

vec4
getEmissiveColor ()
{
   // Get emissive parameter.

   float alpha = 1.0 - x3d_Material .transparency;

   vec4 emissiveParameter = vec4 (x3d_Material .emissiveColor, alpha);

   #if defined (X3D_COLOR_MATERIAL)
      emissiveParameter *= color;
   #endif

   // Get texture color.

   #if defined (X3D_EMISSIVE_TEXTURE)
      vec3 texCoord = getTexCoord (x3d_EmissiveTexture .textureTransformMapping, x3d_EmissiveTexture .textureCoordinateMapping);

      #if defined (X3D_EMISSIVE_TEXTURE_2D)
         emissiveParameter *= texture (x3d_EmissiveTexture .texture2D, texCoord .st);
      #elif defined (X3D_EMISSIVE_TEXTURE_3D)
         emissiveParameter *= texture (x3d_EmissiveTexture .texture3D, texCoord);
      #elif defined (X3D_EMISSIVE_TEXTURE_CUBE)
         emissiveParameter *= texture (x3d_EmissiveTexture .textureCube, texCoord);
      #endif
   #elif defined (X3D_TEXTURE)
      emissiveParameter = getTextureColor (emissiveParameter, vec4 (vec3 (1.0), alpha));
   #endif

   return emissiveParameter;
}

vec4
getMaterialColor ()
{
   return getEmissiveColor ();
}

void
main ()
{
   fragment_main ();
}
`;
