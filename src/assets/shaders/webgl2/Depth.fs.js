export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;

in vec3 vertex;

out vec4 x3d_FragColor;

#pragma X3D include "include/ClipPlanes.glsl"

void
main ()
{
   #if defined (X3D_CLIP_PLANES)
      clip ();
   #endif

   x3d_FragColor = vec4 (gl_FragCoord .z);
}
`;
