export default () => /* glsl */ `

precision highp float;
precision highp int;
precision highp sampler2D;

attribute vec2 x3d_Vertex;
varying   vec2 texCoord; // [-1,1]

void
main ()
{
   texCoord    = x3d_Vertex;
   gl_Position = vec4 (x3d_Vertex, 0.0, 1.0);
}
`;
