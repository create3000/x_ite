precision highp float;
precision highp int;
precision highp sampler2D;
precision highp samplerCube;

#pragma X3D include "include/Fragment.glsl"
#pragma X3D include "include/ShadowColor.glsl"

varying vec4 frontColor;
varying vec4 backColor;

vec4
getMaterialColor ()
{
   vec4 finalColor = gl_FrontFacing ? frontColor : backColor;

   finalColor = getTextureColor (finalColor, vec4 (1.0));
   finalColor = getProjectiveTextureColor (finalColor);

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
