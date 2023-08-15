export default /* glsl */ `
precision highp float;
precision highp int;
precision highp sampler2D;
precision highp samplerCube;

#pragma X3D include "include/Vertex.glsl"

void
main ()
{
   vertex_main ();
}
`;
