export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;

layout(location=0) in vec4 x3d_Vertex;

void
main ()
{
   gl_Position = x3d_Vertex;
}
`;
