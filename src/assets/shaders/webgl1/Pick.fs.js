export default /* glsl */ `
#extension GL_EXT_draw_buffers : enable

precision highp float;
precision highp int;

varying vec3 vertex;
varying vec3 normal;

#pragma X3D include "include/ClipPlanes.glsl"

uniform float x3d_Id;

void
main ()
{
   #if defined (X3D_CLIP_PLANES)
      clip ();
   #endif

   gl_FragData [0] = vec4 (x3d_Id, vertex);
   gl_FragData [1] = vec4 (normalize (normal), 0.0);
   gl_FragData [2] = vec4 (0.0);
}
`;
