export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

in vec4 x3d_Vertex;
in vec3 x3d_Normal;
in vec4 x3d_TexCoord0;

out vec3 vertex;
out vec3 normal;
out vec4 texCoord;

#pragma X3D include "include/Particle.glsl"
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

   vec4 position = x3d_ModelViewMatrix * getVertex (x3d_Vertex);

   vertex   = position .xyz;
   normal   = x3d_Normal;
   texCoord = x3d_TexCoord0;

   gl_Position = x3d_ProjectionMatrix * position;
}
`;
