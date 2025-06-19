export default () => /* glsl */ `
precision highp float;
precision highp int;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

attribute vec4 x3d_Vertex;
attribute vec3 x3d_Normal;

#if !defined (X3D_GEOMETRY_0D) && !defined (X3D_GEOMETRY_1D)
   attribute vec4 x3d_TexCoord0;
#endif

varying vec3 vertex;
varying vec3 normal;

#if !defined (X3D_GEOMETRY_0D) && !defined (X3D_GEOMETRY_1D)
   varying vec4 texCoord0;
#endif

#pragma X3D include "common/PointSize.glsl"

void
main ()
{
   #if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
      gl_PointSize = pointSize = max (getPointSize (vertex), 2.0);
   #else
      gl_PointSize = 2.0;
   #endif

   vec4 position = x3d_ModelViewMatrix * x3d_Vertex;

   vertex = position .xyz;
   normal = x3d_Normal;

   #if !defined (X3D_GEOMETRY_0D) && !defined (X3D_GEOMETRY_1D)
      texCoord0 = x3d_TexCoord0;
   #endif

   gl_Position = x3d_ProjectionMatrix * position;
}
`;
