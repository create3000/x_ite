import { maxTexCoords } from "../../../../x_ite/Browser/Texturing/TexturingConfiguration.js";

export default () => /* glsl */ `
#if defined (X3D_ALPHA_MODE_MASK)
   uniform float x3d_AlphaCutoff;
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

#if !defined (X3D_ORDER_INDEPENDENT_TRANSPARENCY)
   out vec4 x3d_FragColor;
#endif

// There is a bug with Mali GPU when gl_FrontFacing is accessed often or in a deep nested function,
// but assigning it to a global variable in a top level function fixes this issue.
bool frontFacing;

#include <ToneMapping>
#include <Texture>
#include <Normal>
#include <ClipPlanes>
#include <Point>
#include <Stipple>
#include <Hatch>
#include <Fog>
#include <OIT>
#include <Logarithmic>

vec4
getMaterialColor (const in vec4 fragCoord);

void
main ()
{
   frontFacing = gl_FrontFacing;

   #if !defined (X3D_NORMALS) && (defined (X3D_GEOMETRY_2D) || defined (X3D_GEOMETRY_3D))
      generateFlatNormals ();
   #endif

   #if defined (X3D_CLIP_PLANES)
      clip ();
   #endif

   #if defined (X3D_GEOMETRY_1D) && defined (X3D_STYLE_PROPERTIES)
      stipple (gl_FragCoord);
   #endif

   #if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
      setPointTexCoords (gl_PointCoord);
   #elif defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      setTexCoords ();
   #endif

   vec4 finalColor = getMaterialColor (gl_FragCoord);

   #if defined (X3D_ALPHA_MODE_OPAQUE)
      finalColor .a = 1.0;
   #elif defined (X3D_ALPHA_MODE_MASK)
      if (finalColor .a < x3d_AlphaCutoff)
         discard;

      finalColor .a = 1.0;
   #endif

   #if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
      finalColor = getPointColor (finalColor, gl_PointCoord);
   #endif

   #if (defined (X3D_GEOMETRY_2D) || defined (X3D_GEOMETRY_3D)) && defined (X3D_STYLE_PROPERTIES)
      finalColor = getHatchColor (finalColor, gl_FragCoord);
   #endif

   #if defined (X3D_FOG)
      finalColor .rgb = getFogColor (finalColor .rgb);
   #endif

   #if !defined (X3D_LINEAR_OUTPUT)
      finalColor .rgb = toneMap (finalColor .rgb);
   #endif

   #if defined (X3D_ORDER_INDEPENDENT_TRANSPARENCY)
      oit (finalColor);
   #else
      x3d_FragColor = finalColor;
   #endif

   #if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
      logarithmic ();
   #endif
}
`;
