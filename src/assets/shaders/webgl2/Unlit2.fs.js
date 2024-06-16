import MaterialTextures from "../MaterialTextures.js";

export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;
precision highp sampler3D;
precision highp samplerCube;

#pragma X3D include "common/Fragment.glsl"

uniform x3d_UnlitMaterialParameters x3d_Material;

${MaterialTextures .texture ("x3d_EmissiveTexture", "rgba", "sRGB")}

vec4
getEmissiveColor ()
{
   // Get emissive parameter.

   float alpha = 1.0 - x3d_Material .transparency;

   #if defined (X3D_COLOR_MATERIAL)
      vec4 emissiveColor = vec4 (color .rgb, color .a * alpha);
   #else
      vec4 emissiveColor = vec4 (x3d_Material .emissiveColor, alpha);
   #endif

   // Get texture color.

   #if defined (X3D_EMISSIVE_TEXTURE)
      emissiveColor *= getEmissiveTexture ();
   #elif defined (X3D_TEXTURE)
      emissiveColor = getTextureColor (emissiveColor, vec4 (vec3 (1.0), alpha));
   #endif

   return emissiveColor;
}

vec4
getMaterialColor ()
{
   vec4 finalColor = getEmissiveColor ();

   #if defined (X3D_TEXTURE_PROJECTION)
      finalColor .rgb *= getTextureProjectorColor ();
   #endif

   return finalColor;
}

void
main ()
{
   fragment_main ();
}
`;
