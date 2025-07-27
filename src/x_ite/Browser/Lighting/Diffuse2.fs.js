export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp samplerCube;

const float M_PI = 3.1415926535897932384626433832795;

uniform samplerCube x3d_SpecularTextureEXT;
uniform int         x3d_CurrentFaceEXT;

in vec2 texCoord; // [-1,1]
out vec4 x3d_FragColor;

mat3
getMatrix (const in int face)
{
   mat3 m;

   switch (face)
   {
      case 0: // front
         m = mat3 (vec3 (1.0, 0.0, 0.0),
                   vec3 (0.0, -1.0, 0.0),
                   vec3 (0.0, 0.0, 1.0));
         break;
      case 1: // back
         m = mat3 (vec3 (-1.0, 0.0, 0.0),
                   vec3 (0.0, -1.0, 0.0),
                   vec3 (0.0, 0.0, -1.0));
         break;
      case 2: // right
         m = mat3 (vec3 (0.0, 0.0, 1.0),
                   vec3 (0.0, -1.0, 0.0),
                   vec3 (-1.0, 0.0, 0.0));
         break;
      case 3: // left
         m = mat3 (vec3 (0.0, 0.0, -1.0),
                   vec3 (0.0, -1.0, 0.0),
                   vec3 (1.0, 0.0, 0.0));
         break;
      case 4: // top
         m = mat3 (vec3 (1.0, 0.0, 0.0),
                   vec3 (0.0, 0.0, 1.0),
                   vec3 (0.0, 1.0, 0.0));
         break;
      case 5: // bottom
         m = mat3 (vec3 (1.0, 0.0, 0.0),
                   vec3 (0.0, 0.0, -1.0),
                   vec3 (0.0, -1.0, 0.0));
         break;
   }

   return m;
}

#define SAMPLES 99

void
main ()
{
   mat3 matrix    = getMatrix (x3d_CurrentFaceEXT);
   vec3 direction = vec3 (texCoord .xy, 1.0);

   vec3 color = vec3 (0.0);

   for (int y = SAMPLES / -2; y < SAMPLES / 2 + 1; ++ y)
   {
      for (int x = SAMPLES / -2; x < SAMPLES / 2 + 1; ++ x)
      {
         float a = float (x) * (M_PI / 2.0) / 512.0;
         float b = float (y) * (M_PI / 2.0) / 512.0;

         mat3 xAxis = mat3 (vec3 (1.0, 0.0, 0.0),
                            vec3 (0.0, cos (a), -sin (a)),
                            vec3 (0.0, sin (a), cos (a)));

         mat3 yAxis = mat3 (vec3 (cos (b), 0.0, sin (b)),
                            vec3 (0.0, 1.0, 0.0),
                            vec3 (-sin (b), 0, cos (b)));

         vec3 sampleDirection = normalize (matrix * xAxis * yAxis * direction);

         color += texture (x3d_SpecularTextureEXT, sampleDirection) .rgb;
      }
   }

   color /= float (SAMPLES * SAMPLES);

   x3d_FragColor = vec4 (color, 1.0);
}
`;
