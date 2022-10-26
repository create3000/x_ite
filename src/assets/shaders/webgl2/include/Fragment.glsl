uniform float x3d_AlphaCutoff;
uniform bool  x3d_ColorMaterial;

in float fogDepth;    // fog depth
in vec4  color;       // color
in vec3  vertex;      // point on geometry
in vec3  localVertex; // point on geometry in local coordinates

#if ! defined (X3D_GEOMETRY_0D)
   #if x3d_MaxTextures > 0
   in vec4 texCoord0;
   #endif

   #if x3d_MaxTextures > 1
   in vec4 texCoord1;
   #endif
#endif

#if defined (X3D_NORMALS)
   in vec3 normal;
   in vec3 localNormal;
#else
   vec3 normal      = vec3 (0.0, 0.0, 1.0);
   vec3 localNormal = vec3 (0.0, 0.0, 1.0);
#endif

#if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
uniform float x3d_LogarithmicFarFactor1_2;
in float depth;
#endif

out vec4 x3d_FragColor;

#pragma X3D include "Point.glsl"
#pragma X3D include "Stipple.glsl"
#pragma X3D include "Hatch.glsl"
#pragma X3D include "Fog.glsl"
#pragma X3D include "ClipPlanes.glsl"
#pragma X3D include "Texture.glsl"

vec4
getMaterialColor ();

vec4
getFinalMaterialColor ()
{
   #if defined (X3D_GEOMETRY_0D)
      setTexCoords ();

      #if ! defined (X3D_MATERIAL_TEXTURES)
      if (x3d_NumTextures == 0)
         return getPointColor (getMaterialColor ());
      #endif

      return getMaterialColor ();
   #else
      return getMaterialColor ();
   #endif
}

void
fragment_main ()
{
   clip ();

   #if defined (X3D_GEOMETRY_1D)
      stipple ();
   #endif

   vec4 finalColor = getFinalMaterialColor ();

   #if defined (X3D_GEOMETRY_2D) || defined (X3D_GEOMETRY_3D)
      finalColor = getHatchColor (finalColor);
   #endif

   finalColor .rgb = getFogColor (finalColor .rgb);

   if (finalColor .a < x3d_AlphaCutoff)
      discard;

   x3d_FragColor = finalColor;

   #if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
   //http://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
   if (x3d_LogarithmicFarFactor1_2 > 0.0)
      gl_FragDepth = log2 (depth) * x3d_LogarithmicFarFactor1_2;
   else
      gl_FragDepth = gl_FragCoord .z;
   #endif
}
