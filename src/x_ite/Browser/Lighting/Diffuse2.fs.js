export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp samplerCube;

const float M_PI = 3.1415926535897932384626433832795;

uniform samplerCube x3d_SpecularTextureEXT;
uniform int         x3d_CurrentFaceEXT;

in vec2 texCoord; // [-1,1]
out vec4 x3d_FragColor;

const float x1 [] = float [] ( M_PI / 2.0 + M_PI / 2.0);
const float x2 [] = float [] (-M_PI / 2.0 + M_PI / 2.0);
const float y1 [] = float [] ( M_PI / 4.0);
const float y2 [] = float [] ( M_PI * 3.0 / 4.0);

void
main ()
{
   vec2 t = texCoord * 0.5 + 0.5; // [0,1]

   float a = mix (x1 [0], x2 [0], t .x);
   float b = mix (y1 [0], y2 [0], t .y);

   float x = cos (a) * sin (b);
   float y = cos (b);
   float z = sin (a) * sin (b);

   vec3 normal = vec3 (x, y, z);
   vec3 color  = texture (x3d_SpecularTextureEXT, normal) .rgb;

   x3d_FragColor = vec4 (color, 1.0);
}
`;
