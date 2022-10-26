#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;

#pragma X3D include "include/Vertex.glsl"

void
main ()
{
   vertex_main ();
}
