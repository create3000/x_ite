#version 300 es

precision highp float;
precision highp int;

#pragma X3D include "include/Fragment.glsl"

vec4
getGouraudColor ()
{
   vec4 finalColor = gl_FrontFacing ? frontColor : backColor;

   finalColor = getTextureColor (finalColor, vec4 (1.0));
   finalColor = getProjectiveTextureColor (finalColor);

   return finalColor;
}

vec4
getMaterialColor ()
{
   #if defined (X3D_GEOMETRY_0D)
      setTexCoords ();

      #if ! defined (X3D_DIFFUSE_TEXTURE)
      if (x3d_NumTextures == 0)
         return getPointColor (getGouraudColor ());
      #endif

      return getGouraudColor ();
   #else
      return getGouraudColor ();
   #endif
}

void
main ()
{
   fragment ();
}
