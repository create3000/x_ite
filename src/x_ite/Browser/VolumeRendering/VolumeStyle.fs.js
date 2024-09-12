export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler3D;

in vec3 vertex;
in vec4 texCoord;

#if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
   uniform float x3d_LogarithmicFarFactor1_2;
   in float depth;
#endif

uniform sampler3D x3d_Texture3D [1];
uniform mat3 x3d_TextureNormalMatrix;

uniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];

const float M_PI      = 3.141592653589793;
const float M_SQRT2   = 1.4142135623730951;
const float M_SQRT1_2 = 0.7071067811865476;

#if defined (X3D_ORDER_INDEPENDENT_TRANSPARENCY)
   layout(location = 0) out vec4 x3d_FragData0;
   layout(location = 1) out vec4 x3d_FragData1;
#else
   out vec4 x3d_FragColor;
#endif

#pragma X3D include "includes/ClipPlanes.glsl"
#pragma X3D include "includes/Fog.glsl"

__VOLUME_STYLES_DEFINES__

#if defined (X3D_HSV)
vec3
rgb2hsv (in vec3 color)
{
   float h = 0.0;
   float s = 0.0;
   float v = 0.0;

   float min = min (min (color .r, color .g), color .b);
   float max = max (max (color .r, color .g), color .b);
   v = max; // value

   float delta = max - min;

   if (max != 0.0 && delta != 0.0)
   {
      s = delta / max; // s

      if (color .r == max)
         h =     (color .g - color .b) / delta;  // between yellow & magenta
      else if (color .g == max)
         h = 2.0 + (color .b - color .r) / delta;  // between cyan & yellow
      else
         h = 4.0 + (color .r - color .g) / delta;  // between magenta & cyan

      h *= M_PI / 3.0;  // radiants
      if (h < 0.0)
         h += M_PI * 2.0;
   }
   else
      s = h = 0.0;         // s = 0, h is undefined

   return vec3 (h, s, v);
}

vec3
hsv2rgb (in vec3 hsv)
{
   float h = hsv [0];
   float s = clamp (hsv [1], 0.0, 1.0);
   float v = clamp (hsv [2], 0.0, 1.0);

   // H is given on [0, 2 * Pi]. S and V are given on [0, 1].
   // RGB are each returned on [0, 1].

   if (s == 0.0)
   {
      // achromatic (grey)
      return vec3 (v, v, v);
   }
   else
   {
      float w = (h * (180.0 / M_PI)) / 60.0;     // sector 0 to 5

      float i = floor (w);
      float f = w - i;                      // factorial part of h
      float p = v * ( 1.0 - s );
      float q = v * ( 1.0 - s * f );
      float t = v * ( 1.0 - s * ( 1.0 - f ) );

      switch (int (i) % 6)
      {
         case 0:  return vec3 (v, t, p);
         case 1:  return vec3 (q, v, p);
         case 2:  return vec3 (p, v, t);
         case 3:  return vec3 (p, q, v);
         case 4:  return vec3 (t, p, v);
         default: return vec3 (v, p, q);
      }
   }

   return vec3 (0.0);
}

vec3
mix_hsv (in vec3 a, in vec3 b, in float t)
{
   // Linearely interpolate in HSV space between source color @a a and destination color @a b by an amount of ;
   // Source and destination color must be in HSV space.

   float ha = a [0];
   float sa = a [1];
   float va = a [2];

   float hb = b [0];
   float sb = b [1];
   float vb = b [2];

   if (sa == 0.0)
      ha = hb;

   if (sb == 0.0)
      hb = ha;

   float range = abs (hb - ha);

   if (range <= M_PI)
   {
      float h = ha + t * (hb - ha);
      float s = sa + t * (sb - sa);
      float v = va + t * (vb - va);
      return vec3 (h, s, v);
   }

   float PI2  = M_PI * 2.0;
   float step = (PI2 - range) * t;
   float h    = ha < hb ? ha - step : ha + step;

   if (h < 0.0)
      h += PI2;

   else if (h > PI2)
      h -= PI2;

   float s = sa + t * (sb - sa);
   float v = va + t * (vb - va);
   return vec3 (h, s, v);
}
#endif // X3D_HSV

#if defined (X3D_PLANE)
struct Plane3
{
   vec3  normal;
   float distanceFromOrigin;
};

Plane3
plane3 (const in vec3 point, const in vec3 normal)
{
   return Plane3 (normal, dot (normal, point));
}

vec3
plane3_perpendicular_vector (const in Plane3 plane, const in vec3 point)
{
   return plane .normal * (dot (point, plane .normal) - plane .distanceFromOrigin);
}
#endif // X3D_PLANE

#if defined (X3D_SHADING)
float
getSpotFactor (const in float cutOffAngle, const in float beamWidth, const in vec3 L, const in vec3 d)
{
   float spotAngle = acos (clamp (dot (-L, d), -1.0, 1.0));

   if (spotAngle >= cutOffAngle)
      return 0.0;
   else if (spotAngle <= beamWidth)
      return 1.0;

   return (spotAngle - cutOffAngle) / (beamWidth - cutOffAngle);
}
#endif // X3D_SHADING

#if defined (X3D_RANDOM)
/* Random number generation */

uint seed = 1u;

void
srand (const in int value)
{
   seed = uint (value);
}

// Return a uniform distributed random floating point number in the interval [0, 1].
float
random ()
{
   seed = seed * 1103515245u + 12345u;

   return float (seed) / 4294967295.0;
}
#endif

__VOLUME_STYLES_UNIFORMS__

vec4
getTextureColor (in vec3 texCoord)
{
   if (any (greaterThan (abs (texCoord - 0.5), vec3 (0.5))))
      discard;

   vec4 textureColor = texture (x3d_Texture3D [0], texCoord);

   // Apply volume styles.

   __VOLUME_STYLES_FUNCTIONS__

   return textureColor;
}

#if defined (X3D_ORDER_INDEPENDENT_TRANSPARENCY)
float
weight (const in float z, const in float a)
{
   return clamp (pow (min (1.0, a * 10.0) + 0.01, 3.0) * 1e8 * pow (1.0 - z * 0.9, 3.0), 1e-2, 3e3);
}
#endif

void
main ()
{
   #if defined (X3D_CLIP_PLANES)
      clip ();
   #endif

   vec4 finalColor = getTextureColor (texCoord .stp / texCoord .q);

   #if defined (X3D_FOG)
      finalColor .rgb = getFogColor (finalColor .rgb);
   #endif

   #if defined (X3D_ORDER_INDEPENDENT_TRANSPARENCY)
      float a = finalColor .a;
      float w = weight (gl_FragCoord .z, a);

      finalColor .rgb *= a;
      finalColor      *= w;

      x3d_FragData0 = vec4 (finalColor .rgb, a);
      x3d_FragData1 = vec4 (finalColor .a);
   #else
      x3d_FragColor = finalColor;
   #endif

   #if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
      // https://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
      gl_FragDepth = log2 (depth) * x3d_LogarithmicFarFactor1_2;
   #endif
}
`;
