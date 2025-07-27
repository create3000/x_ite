export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp samplerCube;

const float M_PI = 3.1415926535897932384626433832795;

uniform samplerCube x3d_SpecularTextureEXT;
uniform int         x3d_CurrentFaceEXT;

in vec2 texCoord; // [-1,1]
out vec4 x3d_FragColor;

vec3
getDirection (const in vec2 t)
{
   float x;
   float y;
   float z;

   switch (x3d_CurrentFaceEXT)
   {
      case 0: // front
         x = t .x;
         y = -t .y;
         z = 1.0;
         break;
      case 1: // back
         x = -t .x;
         y = -t .y;
         z = -1.0;
         break;
      case 2: // right
         x = -1.0;
         y = -t .y;
         z = t .x;
         break;
      case 3: // left
         x = 1.0;
         y = -t .y;
         z = -t .x;
         break;
      case 4: // top
         x = t .x;
         y = 1.0;
         z = t .y;
         break;
      case 5: // bottom
         x = t .x;
         y = -1.0;
         z = -t .y;
         break;
   }

   return vec3 (x, y, z);;
}

void
main ()
{
   vec3 direction = getDirection (texCoord);
   vec3 color     = texture (x3d_SpecularTextureEXT, direction) .rgb;

   x3d_FragColor = vec4 (color, 1.0);
}
`;
