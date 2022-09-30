#version 300 es

precision highp float;
precision highp int;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

in vec4 x3d_Vertex;
in vec4 x3d_ParticlePosition;

out vec3 vertex; // point on geometry

void
main ()
{
   vec3 local    = x3d_ParticlePosition .xyz + x3d_Vertex .xyz;
   vec4 position = x3d_ModelViewMatrix * vec4 (local, x3d_Vertex .w);

   vertex = position .xyz;

   gl_Position = x3d_ProjectionMatrix * position;
}
