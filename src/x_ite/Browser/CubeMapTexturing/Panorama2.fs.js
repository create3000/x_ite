export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;

const float M_PI = 3.1415926535897932384626433832795;

in  vec2 texCoord;
out vec4 x3d_FragColor;

uniform sampler2D x3d_PanoramaTextureEXT;
uniform int       x3d_CurrentFaceEXT;

vec3
uvToXYZ (const in int face, const in vec2 uv)
{
   switch (face)
   {
      case 0:  return vec3 ( 1.0,    uv .y,  uv .x);
      case 1:  return vec3 (-1.0,    uv .y, -uv .x);
      case 2:  return vec3 ( uv .x,  uv .y, -1.0);
      case 3:  return vec3 (-uv .x,  uv .y,  1.0);
      case 4:  return vec3 ( uv .y, -1.0,    uv .x);
      default: return vec3 (-uv .y,  1.0,    uv .x);
   }
}

vec2
dirToUV (const in vec3 dir)
{
   return vec2 (0.5 + 0.5 * atan (dir .z, dir .x) / M_PI,
                1.0 - acos (dir .y) / M_PI);
}

vec3
panoramaToCubeMap (const in int face, const in vec2 texCoord)
{
   vec3 scan      = uvToXYZ (face, texCoord);
   vec3 direction = normalize (scan);
   vec2 src       = dirToUV (direction);

   return texture (x3d_PanoramaTextureEXT, src) .rgb;
}

void
main ()
{
   x3d_FragColor = vec4 (panoramaToCubeMap (x3d_CurrentFaceEXT, texCoord), 1.0);
}
`;
