uniform float x3d_AlphaCutoff;

varying vec3 vertex;      // point on geometry
varying vec3 localVertex; // point on geometry in local coordinates

#if defined (X3D_FOG)
   #if defined (X3D_FOG_COORDS)
      varying float fogDepth;
   #endif
#endif

#if defined (X3D_COLOR_MATERIAL)
   varying vec4 color;
#endif

#if ! defined (X3D_GEOMETRY_0D) && ! defined (X3D_GEOMETRY_1D)
   #if x3d_MaxTextures > 0
      varying vec4 texCoord0;
   #endif

   #if x3d_MaxTextures > 1
      varying vec4 texCoord1;
   #endif
#else
   #if x3d_MaxTextures > 0
      vec4 texCoord0 = vec4 (0.0);
   #endif

   #if x3d_MaxTextures > 1
      vec4 texCoord1 = vec4 (0.0);
   #endif
#endif

#if defined (X3D_NORMALS)
   varying vec3 normal;
   varying vec3 localNormal;
#else
   vec3 normal      = vec3 (0.0, 0.0, 1.0);
   vec3 localNormal = vec3 (0.0, 0.0, 1.0);
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
   #if defined (X3D_STYLE_PROPERTIES) && defined (X3D_GEOMETRY_0D)
      setTexCoords ();

      #if ! defined (X3D_TEXTURE) && ! defined (X3D_MATERIAL_TEXTURES)
         return getPointColor (getMaterialColor ());
      #endif
   #endif

   return getMaterialColor ();
}

void
fragment_main ()
{
   clip ();

   vec4 finalColor = getFinalColor ();

   #if defined (X3D_STYLE_PROPERTIES) && (defined (X3D_GEOMETRY_2D) || defined (X3D_GEOMETRY_3D))
      finalColor = getHatchColor (finalColor);
   #endif

   #if defined (X3D_FOG)
      finalColor .rgb = getFogColor (finalColor .rgb);
   #endif

   if (finalColor .a < x3d_AlphaCutoff)
      discard;

   gl_FragColor = finalColor;

   #if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
      //http://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
      if (x3d_LogarithmicFarFactor1_2 > 0.0)
         gl_FragDepth = log2 (depth) * x3d_LogarithmicFarFactor1_2;
      else
         gl_FragDepth = gl_FragCoord .z;
   #endif
}
