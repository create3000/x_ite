export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;

/* sum(rgb * a, a) */
uniform sampler2D x3d_AccumTexture;

/* prod(1 - a) */
uniform sampler2D x3d_RevealageTexture;

out vec4 x3d_FragColor;

void
main ()
{
   ivec2 fragCoord = ivec2 (gl_FragCoord .xy);
   vec4  accum     = texelFetch (x3d_AccumTexture, fragCoord, 0);
   vec4  revealage = texelFetch (x3d_RevealageTexture, fragCoord, 0);

   x3d_FragColor = revealage;
}
`;
