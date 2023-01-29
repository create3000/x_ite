export default /* glsl */ `
#if defined (X3D_NORMAL_TEXTURE)
   #extension GL_OES_standard_derivatives : enable
#endif

#if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
   #extension GL_EXT_frag_depth : enable
#endif

uniform float x3d_AlphaCutoff;

#if defined (X3D_FOG) && defined (X3D_FOG_COORDS)
   varying float fogDepth;
#endif

#if defined (X3D_COLOR_MATERIAL)
   varying vec4 color;
#endif

#if ! defined (X3D_GEOMETRY_0D) && ! defined (X3D_GEOMETRY_1D)
   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      #if X3D_NUM_TEXTURE_COORDINATES > 0
         varying vec4 texCoord0;
      #endif

      #if X3D_NUM_TEXTURE_COORDINATES > 1
         varying vec4 texCoord1;
      #endif
   #endif
#else
   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      #if X3D_NUM_TEXTURE_COORDINATES > 0
         vec4 texCoord0 = vec4 (0.0);
      #endif

      #if X3D_NUM_TEXTURE_COORDINATES > 1
         vec4 texCoord1 = vec4 (0.0);
      #endif
   #endif
#endif

#if defined (X3D_NORMALS)
   varying vec3 normal;

   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      varying vec3 localNormal;
   #endif
#else
   const vec3 normal = vec3 (0.0, 0.0, 1.0);

   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      const vec3 localNormal = vec3 (0.0, 0.0, 1.0);
   #endif
#endif

varying vec3 vertex;

#if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
   varying vec3 localVertex;
#endif

#if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
   uniform float x3d_LogarithmicFarFactor1_2;
   varying float depth;
#endif

#pragma X3D include "Point.glsl"
#pragma X3D include "Hatch.glsl"
#pragma X3D include "Fog.glsl"
#pragma X3D include "ClipPlanes.glsl"
#pragma X3D include "Texture.glsl"

vec4
getMaterialColor ();

vec4
getFinalColor ()
{
   #if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
      #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
         setTexCoords ();

         return getMaterialColor ();
       #else
         return getPointColor (getMaterialColor ());
      #endif
   #else
      return getMaterialColor ();
   #endif
}
void
fragment_main ()
{
   #if defined (X3D_CLIP_PLANES)
      clip ();
   #endif

   vec4 finalColor = getFinalColor ();

   #if (defined (X3D_GEOMETRY_2D) || defined (X3D_GEOMETRY_3D)) && defined (X3D_STYLE_PROPERTIES)
      finalColor = getHatchColor (finalColor);
   #endif

   #if defined (X3D_FOG)
      finalColor .rgb = getFogColor (finalColor .rgb);
   #endif

   if (finalColor .a < x3d_AlphaCutoff)
      discard;

   gl_FragColor = finalColor;

   #if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
      //https://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
      gl_FragDepthEXT = log2 (depth) * x3d_LogarithmicFarFactor1_2;
   #endif
}
`;
