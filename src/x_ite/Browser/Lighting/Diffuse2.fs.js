export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp samplerCube;

uniform samplerCube x3d_SpecularTexture;
uniform int         x3d_CurrentFace;

out vec4 x3d_FragColor;

void
main ()
{
   x3d_FragColor = vec4 (1.0, 0.0, 0.0, 1.0);
}
`;
