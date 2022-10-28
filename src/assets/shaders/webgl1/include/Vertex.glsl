// Uniforms

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

// Attributes

#if defined (X3D_FOG_COORDS)
   attribute float x3d_FogDepth;
#endif

#if defined (X3D_COLOR_MATERIAL)
   attribute vec4 x3d_Color;
#endif

#if ! defined (X3D_GEOMETRY_0D)
   #if x3d_MaxTextures > 0
      attribute vec4 x3d_TexCoord0;
   #endif

   #if x3d_MaxTextures > 1
      attribute vec4 x3d_TexCoord1;
   #endif
#endif

attribute vec4 x3d_Vertex;

// Varyings

#if defined (X3D_FOG_COORDS)
   varying float fogDepth;
#endif

#if defined (X3D_COLOR_MATERIAL)
   varying vec4 color;
#endif

#if ! defined (X3D_GEOMETRY_0D)
   #if x3d_MaxTextures > 0
      varying vec4 texCoord0;
   #endif

   #if x3d_MaxTextures > 1
      varying vec4 texCoord1;
   #endif
#endif

#if defined (X3D_NORMALS)
   uniform mat3 x3d_NormalMatrix;
   attribute vec3 x3d_Normal;
   varying vec3 normal;
   varying vec3 localNormal;
#else
   vec3 normal = vec3 (0.0, 0.0, 1.0);
#endif

varying vec3 vertex;
varying vec3 localVertex;

#if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
   varying float depth;
#endif

// Main

#pragma X3D include "PointSize.glsl"

void
vertex_main ()
{
   #if defined (X3D_GEOMETRY_0D)
      gl_PointSize = pointSize = getPointSize (vertex);
   #endif

   #if defined (X3D_FOG_COORDS)
      fogDepth = x3d_FogDepth;
   #endif

   #if defined (X3D_COLOR_MATERIAL)
      color = x3d_Color;
   #endif

   #if ! defined (X3D_GEOMETRY_0D)
      #if x3d_MaxTextures > 0
         texCoord0 = x3d_TexCoord0;
      #endif

      #if x3d_MaxTextures > 1
         texCoord1 = x3d_TexCoord1;
      #endif
   #endif

   #if defined (X3D_NORMALS)
      normal      = x3d_NormalMatrix * x3d_Normal;
      localNormal = x3d_Normal;
   #endif

   vec4 position = x3d_ModelViewMatrix * x3d_Vertex;

   vertex      = position .xyz;
   localVertex = x3d_Vertex .xyz;

   gl_Position = x3d_ProjectionMatrix * position;

   #if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
      depth = 1.0 + gl_Position .w;
   #endif
}
