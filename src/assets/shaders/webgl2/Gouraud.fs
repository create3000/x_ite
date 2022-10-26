#version 300 es

precision highp float;
precision highp int;
precision highp sampler3D;

#pragma X3D include "include/Fragment.glsl"

in vec4 frontColor;
in vec4 backColor;

vec4
getMaterialColor ()
{
   vec4 finalColor = gl_FrontFacing ? frontColor : backColor;

   finalColor = getTextureColor (finalColor, vec4 (1.0));
   finalColor = getProjectiveTextureColor (finalColor);

   return finalColor;
}

void
main ()
{
   fragment_main ();
}
