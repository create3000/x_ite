#version 300 es

precision highp float;
precision highp int;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

in vec4 x3d_Vertex;
in mat4 x3d_ParticleMatrix;

out vec3 vertex; // point on geometry

void
main ()
{
   vec4 position = x3d_ModelViewMatrix * (x3d_ParticleMatrix * x3d_Vertex);

   vertex = position .xyz;

   gl_Position = x3d_ProjectionMatrix * position;
}
