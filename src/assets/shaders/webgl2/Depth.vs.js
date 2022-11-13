export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

in vec4 x3d_Vertex;

out vec3 vertex;

#pragma X3D include "include/Particle.glsl"

void
main ()
{
   vec4 position = x3d_ModelViewMatrix * getVertex (x3d_Vertex);

   vertex = position .xyz;

   gl_Position = x3d_ProjectionMatrix * position;
}
`;
