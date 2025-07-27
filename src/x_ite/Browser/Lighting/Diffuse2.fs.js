export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp samplerCube;

const float M_PI = 3.1415926535897932384626433832795;

uniform samplerCube x3d_SpecularTextureEXT;
uniform int         x3d_CurrentFaceEXT;

in vec2 texCoord; // [-1,1]
out vec4 x3d_FragColor;

const float x1 [] = float [] (0.0, -M_PI, -M_PI / 2.0, M_PI / 2.0, M_PI, M_PI); // f,b,r,l - t,b
const float y1 [] = float [] (M_PI / 2.0, M_PI / 2.0, M_PI / 2.0, M_PI / 2.0, M_PI / 2.0, M_PI / 2.0);

void
main ()
{
   vec2 t = texCoord;

   float a = x1 [x3d_CurrentFaceEXT] + atan (t .x);
   float b = y1 [x3d_CurrentFaceEXT] + atan (t .y);

   float x = sin (a) * sin (b);
   float y = cos (b);
   float z = cos (a) * sin (b);

   vec3 normal = vec3 (x, y, z);
   vec3 color  = texture (x3d_SpecularTextureEXT, normal) .rgb;

   x3d_FragColor = vec4 (color, 1.0);
}
`;
