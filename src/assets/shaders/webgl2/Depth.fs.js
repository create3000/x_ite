export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;

in vec3 vertex;

out vec4 x3d_FragColor;

#pragma X3D include "include/ClipPlanes.glsl"
#pragma X3D include "include/Point.glsl"

void
main ()
{
   #if defined (X3D_CLIP_PLANES)
      clip ();
   #endif

   #if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
      if (getPointColor (vec4 (1.0)) .a < 0.5)
         discard;
   #endif

   x3d_FragColor = vec4 (gl_FragCoord .z);
}
`;
