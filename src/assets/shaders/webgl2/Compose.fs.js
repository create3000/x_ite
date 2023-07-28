export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;

uniform sampler2D x3d_AccumTexture;
uniform sampler2D x3d_AlphaTexture;

out vec4 x3d_FragColor;

void
main ()
{
   ivec2 fragCoord = ivec2 (gl_FragCoord .xy);
   vec4  accum     = texelFetch (x3d_AccumTexture, fragCoord, 0);
   vec4  alpha     = texelFetch (x3d_AlphaTexture, fragCoord, 0);
   float a         = 1.0 - accum .a;

   accum .a = alpha .r;

   x3d_FragColor = vec4 (a * accum .rgb / clamp (accum .a, 0.001, 50000.0), a);
}
`;
