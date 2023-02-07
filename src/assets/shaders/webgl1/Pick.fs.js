export default /* glsl */ `
#extension GL_EXT_draw_buffers : enable

precision highp float;
precision highp int;

varying vec3 vertex;
varying vec3 normal;
varying vec4 texCoord;

#pragma X3D include "include/ClipPlanes.glsl"
#pragma X3D include "include/Point.glsl"

uniform float x3d_Id;

void
main ()
{
   #if defined (X3D_CLIP_PLANES)
      clip ();
   #endif

   #if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
      if (getPointColor (vec4 (1.0)) .a == 0.0)
         discard;
   #endif

   gl_FragData [0] = vec4 (vertex, x3d_Id);
   gl_FragData [1] = vec4 (normal, 0.0);
   gl_FragData [2] = texCoord;
}
`;
