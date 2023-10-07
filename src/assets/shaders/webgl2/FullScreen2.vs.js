export default /* glsl */ `#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;

out vec2 texCoord;

void
main ()
{
   float x = float ((gl_VertexID & 1) << 2);
   float y = float ((gl_VertexID & 2) << 1);

   texCoord = vec2 (x, y) - 1.0;

   gl_Position = vec4 (texCoord, 0, 1);
}
`;
