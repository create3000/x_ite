export default /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler3D;

in vec3 vertex;
in vec4 texCoord;

uniform sampler3D x3d_Texture3D [1];
uniform mat3 x3d_TextureNormalMatrix;

uniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];

const float M_PI = 3.14159265359;

out vec4 x3d_FragColor;

#pragma X3D include "includes/ClipPlanes.glsl"
#pragma X3D include "includes/Fog.glsl"

__VOLUME_STYLES_DEFINES__

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

   x3d_FragColor = finalColor;
}
`;
