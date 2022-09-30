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
   vec4 local    = vec4 (x3d_ParticlePosition .xyz + x3d_Vertex .xyz, x3d_ParticlePosition .w * x3d_Vertex .w);
   vec4 position = x3d_ModelViewMatrix * local;

   vertex = position .xyz;

   gl_Position = x3d_ProjectionMatrix * position;
}
