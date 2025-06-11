import { maxTexCoords } from "../../../../x_ite/Browser/Texturing/TexturingConfiguration.js";

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

#if !defined (X3D_GEOMETRY_0D) && !defined (X3D_GEOMETRY_1D)
   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      ${Array .from ({ length: maxTexCoords }, (_, i) => /* glsl */ `

      #if X3D_NUM_TEXTURE_COORDINATES > ${i}
         in vec4 texCoord${i};
      #endif

      `) .join ("\n")}
   #endif
#else
   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      ${Array .from ({ length: maxTexCoords }, (_, i) => /* glsl */ `

      #if X3D_NUM_TEXTURE_COORDINATES > ${i}
         vec4 texCoord${i} = vec4 (0.0, 0.0, 0.0, 1.0);
      #endif

      `) .join ("\n")}
   #endif
#endif

#if defined (X3D_NORMALS)
   in vec3 normal;

   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      in vec3 localNormal;
   #endif

   #if defined (X3D_TANGENTS)
      in mat3 TBN;
   #endif
#else
   vec3 normal = vec3 (0.0, 0.0, 1.0);

   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      vec3 localNormal = vec3 (0.0, 0.0, 1.0);
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
   layout(location = 0) out vec4 x3d_FragColor;
#endif

#pragma X3D include "../pbr/ToneMapping.glsl"
#pragma X3D include "Texture.glsl"
#pragma X3D include "Normal.glsl"
#pragma X3D include "ClipPlanes.glsl"
#pragma X3D include "Point.glsl"
#pragma X3D include "Stipple.glsl"
#pragma X3D include "Hatch.glsl"
#pragma X3D include "Fog.glsl"

vec4
getMaterialColor ();

#if defined (X3D_ORDER_INDEPENDENT_TRANSPARENCY)
// https://learnopengl.com/Guest-Articles/2020/OIT/Weighted-Blended
float
weight (const in float z, const in float a)
{
   return clamp (pow (min (1.0, a * 10.0) + 0.01, 3.0) * 1e8 * pow (1.0 - z * 0.9, 3.0), 1e-2, 3e3);
}
#endif

void
fragment_main ()
{
   #if !defined (X3D_NORMALS) && (defined (X3D_GEOMETRY_2D) || defined (X3D_GEOMETRY_3D))
      generateFlatNormals ();
   #endif

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

   #if defined (X3D_ALPHA_MODE_OPAQUE)
      finalColor .a = 1.0;
   #endif

   #if defined (X3D_ALPHA_MODE_MASK)
      if (finalColor .a < x3d_AlphaCutoff)
         discard;

      finalColor .a = 1.0;
   #endif

   #if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
      finalColor = getPointColor (finalColor);
   #endif

   #if (defined (X3D_GEOMETRY_2D) || defined (X3D_GEOMETRY_3D)) && defined (X3D_STYLE_PROPERTIES)
      finalColor = getHatchColor (finalColor);
   #endif

   #if defined (X3D_FOG)
      finalColor .rgb = getFogColor (finalColor .rgb);
   #endif

   finalColor .rgb = toneMap (finalColor .rgb);

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
