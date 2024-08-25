import { maxTexCoords } from "../../../../x_ite/Browser/Texturing/TexturingConfiguration.js";

export default /* glsl */ `
// Uniforms

uniform mat4  x3d_ProjectionMatrix;
uniform mat4  x3d_ModelViewMatrix;
uniform float x3d_DepthFactor;

// Attributes

#if defined (X3D_FOG) && defined (X3D_FOG_COORDS)
   attribute float x3d_FogDepth;
#endif

#if defined (X3D_COLOR_MATERIAL)
   attribute vec4 x3d_Color;
#endif

#if ! defined (X3D_GEOMETRY_0D) && ! defined (X3D_GEOMETRY_1D)
   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      ${Array .from ({ length: maxTexCoords }, (_, i) => /* glsl */ `

      #if X3D_NUM_TEXTURE_COORDINATES > ${i}
         attribute vec4 x3d_TexCoord${i};
      #endif

      `) .join ("\n")}
   #endif
#endif

attribute vec4 x3d_Vertex;

// Varyings

#if defined (X3D_FOG) && defined (X3D_FOG_COORDS)
   varying float fogDepth;
#endif

#if defined (X3D_COLOR_MATERIAL)
   varying vec4 color;
#endif

#if ! defined (X3D_GEOMETRY_0D) && ! defined (X3D_GEOMETRY_1D)
   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      ${Array .from ({ length: maxTexCoords }, (_, i) => /* glsl */ `

      #if X3D_NUM_TEXTURE_COORDINATES > ${i}
         varying vec4 texCoord${i};
      #endif

      `) .join ("\n")}
   #endif
#endif

#if defined (X3D_NORMALS)
   uniform mat3 x3d_NormalMatrix;

   attribute vec3 x3d_Normal;
   varying vec3 normal;

   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      varying vec3 localNormal;
   #endif

   #if defined (X3D_TANGENTS)
      attribute vec4 x3d_Tangent;
      varying mat3 TBN;
   #endif
#endif

varying vec3 vertex;

#if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
   varying vec3 localVertex;
#endif

#if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
   varying float depth;
#endif

// Main

#pragma X3D include "PointSize.glsl"

void
vertex_main ()
{
   vec4 position = x3d_ModelViewMatrix * x3d_Vertex;

   vertex = position .xyz;

   #if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
      gl_PointSize = pointSize = getPointSize (vertex);
   #else
      gl_PointSize = 1.0;
   #endif

   #if defined (X3D_FOG) && defined (X3D_FOG_COORDS)
      fogDepth = x3d_FogDepth;
   #endif

   #if defined (X3D_COLOR_MATERIAL)
      color = x3d_Color;
   #endif

   #if ! defined (X3D_GEOMETRY_0D) && ! defined (X3D_GEOMETRY_1D)
      #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
         ${Array .from ({ length: maxTexCoords }, (_, i) => /* glsl */ `

         #if X3D_NUM_TEXTURE_COORDINATES > ${i}
            texCoord${i} = x3d_TexCoord${i};
         #endif

         `) .join ("\n")}
      #endif
   #endif

   #if defined (X3D_NORMALS)
      normal = x3d_NormalMatrix * x3d_Normal;

      #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
         localNormal = x3d_Normal;
      #endif

      #if defined (X3D_TANGENTS)
         vec3 tangent   = x3d_NormalMatrix * x3d_Tangent .xyz;
         vec3 bitangent = cross (normal, tangent) * x3d_Tangent .w;

         TBN = mat3 (tangent, bitangent, normal);
      #endif
   #endif

   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      localVertex = x3d_Vertex .xyz;
   #endif

   gl_Position     = x3d_ProjectionMatrix * position;
   gl_Position .z *= x3d_DepthFactor;

   #if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
      depth = 1.0 + gl_Position .w;
   #endif
}
`;
