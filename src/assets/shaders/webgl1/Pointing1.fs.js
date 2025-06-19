export default () => /* glsl */ `
#extension GL_EXT_draw_buffers : enable

precision highp float;
precision highp int;
precision highp sampler2D;

varying vec3 vertex;
varying vec3 normal;

#if !defined (X3D_GEOMETRY_0D) && !defined (X3D_GEOMETRY_1D)
   varying vec4 texCoord0;
#else
   vec4 texCoord0 = vec4 (0.0, 0.0, 0.0, 1.0);
#endif

#pragma X3D include "common/ClipPlanes.glsl"
#pragma X3D include "common/Point.glsl"

uniform float x3d_Id;

void
main ()
{
   #if defined (X3D_CLIP_PLANES)
      clip ();
   #endif

   #if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
      if (getPointColor (vec4 (1.0)) .a < 0.5)
         discard;

      texCoord0 = vec4 (gl_PointCoord .x, 1.0 - gl_PointCoord .y, 0.0, 1.0);
   #endif

   gl_FragData [0] = vec4 (vertex, x3d_Id);
   gl_FragData [1] = vec4 (normal, 0.0);
   gl_FragData [2] = texCoord0;
}
`;
