import { maxTexCoords } from "../../../../x_ite/Browser/Texturing/TexturingConfiguration.js";

export default /* glsl */ `
#if defined (X3D_ALPHA_MODE_MASK)
   uniform float x3d_AlphaCutoff;
#endif

#if defined (X3D_FOG) && defined (X3D_FOG_COORDS)
   varying float fogDepth;
#endif

#if defined (X3D_COLOR_MATERIAL)
   varying vec4 color;
#endif

#if !defined (X3D_GEOMETRY_0D) && !defined (X3D_GEOMETRY_1D)
   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      ${Array .from ({ length: maxTexCoords }, (_, i) => /* glsl */ `

      #if X3D_NUM_TEXTURE_COORDINATES > ${i}
         varying vec4 texCoord${i};
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
   varying vec3 normal;

   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      varying vec3 localNormal;
   #endif

   #if defined (X3D_TANGENTS)
      varying mat3 TBN;
   #endif
#else
   vec3 normal = vec3 (0.0, 0.0, 1.0);

   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      vec3 localNormal = vec3 (0.0, 0.0, 1.0);
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

#pragma X3D include "../pbr/ToneMapping.glsl"
#pragma X3D include "Texture.glsl"
#pragma X3D include "ClipPlanes.glsl"
#pragma X3D include "Point.glsl"
#pragma X3D include "Hatch.glsl"
#pragma X3D include "Fog.glsl"

vec4
getMaterialColor ();

#if !defined (X3D_NORMALS) && (defined (X3D_GEOMETRY_2D) || defined (X3D_GEOMETRY_3D))
// Generate flat normals for 2D and 3D geometry.
vec3
generateNormal (const in vec3 vertex)
{
   vec3 dFdxPos = dFdx (vertex);
   vec3 dFdyPos = dFdy (vertex);

   return normalize (cross (dFdxPos, dFdyPos));
}
#endif

void
fragment_main ()
{
   #if !defined (X3D_NORMALS) && (defined (X3D_GEOMETRY_2D) || defined (X3D_GEOMETRY_3D))
      normal = generateNormal (vertex);

      #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
         localNormal = generateNormal (localVertex);
      #endif
   #endif

   #if defined (X3D_CLIP_PLANES)
      clip ();
   #endif

   #if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
      setPointTexCoords ();
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

   gl_FragColor = finalColor;

   #if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
      // https://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
      gl_FragDepthEXT = log2 (depth) * x3d_LogarithmicFarFactor1_2;
   #endif
}
`;
