export default /* glsl */ `
#if defined (X3D_ALPHA_MODE_MASK)
   uniform float x3d_AlphaCutoff;
#endif

#if defined (X3D_FOG) && defined (X3D_FOG_COORDS)
   in float fogDepth;
#endif

#if defined (X3D_COLOR_MATERIAL)
   in vec4 color;
#endif

#if ! defined (X3D_GEOMETRY_0D) && ! defined (X3D_GEOMETRY_1D)
   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      #if X3D_NUM_TEXTURE_COORDINATES > 0
         in vec4 texCoord0;
      #endif

      #if X3D_NUM_TEXTURE_COORDINATES > 1
         in vec4 texCoord1;
      #endif

      #if X3D_NUM_TEXTURE_COORDINATES > 2
         in vec4 texCoord2;
      #endif

      #if X3D_NUM_TEXTURE_COORDINATES > 3
         in vec4 texCoord3;
      #endif
   #endif
#else
   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      #if X3D_NUM_TEXTURE_COORDINATES > 0
         vec4 texCoord0 = vec4 (0.0, 0.0, 0.0, 1.0);
      #endif

      #if X3D_NUM_TEXTURE_COORDINATES > 1
         vec4 texCoord1 = vec4 (0.0, 0.0, 0.0, 1.0);
      #endif

      #if X3D_NUM_TEXTURE_COORDINATES > 2
         vec4 texCoord2 = vec4 (0.0, 0.0, 0.0, 1.0);
      #endif

      #if X3D_NUM_TEXTURE_COORDINATES > 3
         vec4 texCoord3 = vec4 (0.0, 0.0, 0.0, 1.0);
      #endif
   #endif
#endif

#if defined (X3D_NORMALS)
   in vec3 normal;

   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      in vec3 localNormal;
   #endif
#else
   const vec3 normal = vec3 (0.0, 0.0, 1.0);

   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      const vec3 localNormal = vec3 (0.0, 0.0, 1.0);
   #endif
#endif

in vec3 vertex;

#if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
   in vec3 localVertex;
#endif

#if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
   uniform float x3d_LogarithmicFarFactor1_2;
   in float depth;
#endif

#if defined (X3D_ORDER_INDEPENDENT_TRANSPARENCY)
   layout(location = 0) out vec4 x3d_FragData0;
   layout(location = 1) out vec4 x3d_FragData1;
#else
   out vec4 x3d_FragColor;
#endif

#pragma X3D include "Texture.glsl"
#pragma X3D include "ClipPlanes.glsl"
#pragma X3D include "Point.glsl"
#pragma X3D include "Stipple.glsl"
#pragma X3D include "Hatch.glsl"
#pragma X3D include "Fog.glsl"

vec4
getMaterialColor ();

void
fragment_main ()
{
   #if defined (X3D_CLIP_PLANES)
      clip ();
   #endif

   #if defined (X3D_GEOMETRY_1D) && defined (X3D_STYLE_PROPERTIES)
      stipple ();
   #endif

   #if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
      setPointTexCoords ();
   #elif defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      setTexCoords ();
   #endif

   vec4 finalColor = getMaterialColor ();

   #if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
      finalColor = getPointColor (finalColor);
   #endif

   #if (defined (X3D_GEOMETRY_2D) || defined (X3D_GEOMETRY_3D)) && defined (X3D_STYLE_PROPERTIES)
      finalColor = getHatchColor (finalColor);
   #endif

   #if defined (X3D_FOG)
      finalColor .rgb = getFogColor (finalColor .rgb);
   #endif

   #if defined (X3D_ALPHA_MODE_OPAQUE)
      finalColor .a = 1.0;
   #endif

   #if defined (X3D_ALPHA_MODE_MASK)
      if (finalColor .a < x3d_AlphaCutoff)
         discard;

      finalColor .a = 1.0;
   #endif

   #if defined (X3D_ORDER_INDEPENDENT_TRANSPARENCY)
      x3d_FragData0 = finalColor;
      x3d_FragData1 = finalColor;
   #else
      x3d_FragColor = finalColor;
   #endif

   #if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
      //https://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
      gl_FragDepth = log2 (depth) * x3d_LogarithmicFarFactor1_2;
   #endif
}
`;
