export default /* glsl */ `
precision highp float;
precision highp int;

varying vec3 vertex;

#pragma X3D include "include/ClipPlanes.glsl"

uniform float x3d_Id;

void
main ()
{
   #if defined (X3D_CLIP_PLANES)
      clip ();
   #endif

   gl_FragColor = vec4 (x3d_Id, vertex);
}
`;
