export default () => /* glsl */ `
precision highp float;
precision highp int;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

attribute vec4 x3d_Vertex;

varying vec3 vertex;

#pragma X3D include "common/PointSize.glsl"

void
main ()
{
   vec4 position = x3d_ModelViewMatrix * x3d_Vertex;

   vertex = position .xyz;

   #if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
      gl_PointSize = pointSize = getPointSize (vertex);
   #else
      gl_PointSize = 1.0;
   #endif

   gl_Position = x3d_ProjectionMatrix * position;
}
`;
