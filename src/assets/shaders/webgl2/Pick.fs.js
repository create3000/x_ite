export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;

in vec3 vertex;
in vec3 normal;
in vec4 texCoord;

layout(location = 0) out vec4 x3d_FragData0;
layout(location = 1) out vec4 x3d_FragData1;
layout(location = 2) out vec4 x3d_FragData2;

#pragma X3D include "include/ClipPlanes.glsl"

uniform float x3d_Id;

void
main ()
{
   #if defined (X3D_CLIP_PLANES)
      clip ();
   #endif

   x3d_FragData0 = vec4 (vertex, x3d_Id);
   x3d_FragData1 = vec4 (normal, 0.0);
   x3d_FragData2 = texCoord;
}
`;
