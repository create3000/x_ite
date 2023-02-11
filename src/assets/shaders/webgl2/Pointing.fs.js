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
#pragma X3D include "include/Point.glsl"
#pragma X3D include "Stipple.glsl"

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
   #endif

   #if defined (X3D_GEOMETRY_1D) && defined (X3D_STYLE_PROPERTIES)
      stipple ();
   #endif

   x3d_FragData0 = vec4 (vertex, x3d_Id);
   x3d_FragData1 = vec4 (normal, 0.0);

   #if defined (X3D_GEOMETRY_0D)
      x3d_FragData2 = vec4 (gl_PointCoord .x, 1.0 - gl_PointCoord .y, 0.0, 1.0);
   #else
      x3d_FragData2 = texCoord;
   #endif
}
`;
