export default /* glsl */ `
precision highp float;
precision highp int;
precision highp sampler2D;
precision highp samplerCube;

#pragma X3D include "common/Fragment.glsl"

varying vec4 frontColor;

#if ! defined (X3D_GEOMETRY_0D) && ! defined (X3D_GEOMETRY_1D)
   varying vec4 backColor;
#endif

vec4
getMaterialColor ()
{
   #if defined (X3D_GEOMETRY_0D) || defined (X3D_GEOMETRY_1D)
      vec4 finalColor = frontColor;
   #else
      vec4 finalColor = gl_FrontFacing ? frontColor : backColor;
   #endif

   #if defined (X3D_TEXTURE)
      finalColor = getTextureColor (finalColor, vec4 (1.0));
   #endif

   #if defined (X3D_PROJECTIVE_TEXTURE_MAPPING)
      finalColor = getProjectiveTextureColor (finalColor);
   #endif

   return finalColor;
}

void
main ()
{
   fragment_main ();
}
`;
