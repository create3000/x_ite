export default /* glsl */ `
precision highp float;
precision highp int;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

attribute vec4 x3d_Vertex;
attribute vec3 x3d_Normal;
attribute vec4 x3d_TexCoord0;

varying vec3 vertex;
varying vec3 normal;
varying vec4 texCoord;

#pragma X3D include "include/PointSize.glsl"

void
main ()
{
   #if defined (X3D_GEOMETRY_0D)
      #if defined (X3D_STYLE_PROPERTIES)
         gl_PointSize = max (pointSize = getPointSize (vertex), 2.0);
      #else
         gl_PointSize = 2.0;
      #endif
   #endif

   vec4 position = x3d_ModelViewMatrix * x3d_Vertex;

   vertex   = position .xyz;
   normal   = x3d_Normal;
   texCoord = x3d_TexCoord0;

   gl_Position = x3d_ProjectionMatrix * position;
}
`;
