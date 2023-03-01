export default /* glsl */ `
// Uniforms

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

// Attributes

#if defined (X3D_FOG) && defined (X3D_FOG_COORDS)
   attribute float x3d_FogDepth;
#endif

#if defined (X3D_COLOR_MATERIAL)
   attribute vec4 x3d_Color;
#endif

#if ! defined (X3D_GEOMETRY_0D) && ! defined (X3D_GEOMETRY_1D)
   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      #if X3D_NUM_TEXTURE_COORDINATES > 0
         attribute vec4 x3d_TexCoord0;
      #endif

      #if X3D_NUM_TEXTURE_COORDINATES > 1
         attribute vec4 x3d_TexCoord1;
      #endif
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
      #if X3D_NUM_TEXTURE_COORDINATES > 0
         varying vec4 texCoord0;
      #endif

      #if X3D_NUM_TEXTURE_COORDINATES > 1
         varying vec4 texCoord1;
      #endif
   #endif
#endif

#if defined (X3D_NORMALS)
   uniform mat3 x3d_NormalMatrix;
   attribute vec3 x3d_Normal;
   varying vec3 normal;

   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      varying vec3 localNormal;
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

#pragma X3D include "Particle.glsl"
#pragma X3D include "PointSize.glsl"

void
vertex_main ()
{
   vec4 position = x3d_ModelViewMatrix * x3d_Vertex;

   vertex = position .xyz;

   #if defined (X3D_GEOMETRY_0D)
      #if defined (X3D_STYLE_PROPERTIES)
         gl_PointSize = pointSize = getPointSize (vertex);
      #else
         gl_PointSize = 1.0;
      #endif
   #endif

   #if defined (X3D_FOG) && defined (X3D_FOG_COORDS)
      fogDepth = x3d_FogDepth;
   #endif

   #if defined (X3D_COLOR_MATERIAL)
      color = x3d_Color;
   #endif

   #if ! defined (X3D_GEOMETRY_0D) && ! defined (X3D_GEOMETRY_1D)
      #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
         #if X3D_NUM_TEXTURE_COORDINATES > 0
            texCoord0 = getTexCoord (x3d_TexCoord0);
         #endif

         #if X3D_NUM_TEXTURE_COORDINATES > 1
            texCoord1 = getTexCoord (x3d_TexCoord1);
         #endif
      #endif
   #endif

   #if defined (X3D_NORMALS)
      normal      = x3d_NormalMatrix * x3d_Normal;

      #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
         localNormal = x3d_Normal;
      #endif
   #endif

   #if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
      localVertex = x3d_Vertex .xyz;
   #endif

   gl_Position = x3d_ProjectionMatrix * position;

   #if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
      depth = 1.0 + gl_Position .w;
   #endif
}
`;
