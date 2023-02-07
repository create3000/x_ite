export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;
uniform mat3 x3d_NormalMatrix;

in vec4 x3d_Vertex;
in vec3 x3d_Normal;

out vec3 vertex;
out vec3 normal;

#pragma X3D include "include/Particle.glsl"

void
main ()
{
   vec4 position = x3d_ModelViewMatrix * getVertex (x3d_Vertex);

   vertex = position .xyz;
   normal = x3d_NormalMatrix * x3d_Normal;

   gl_Position = x3d_ProjectionMatrix * position;
}
`;
