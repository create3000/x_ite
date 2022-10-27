uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

attribute float x3d_FogDepth;
attribute vec4  x3d_Color;
attribute vec4  x3d_Vertex;

#if x3d_MaxTextures > 0
   attribute vec4 x3d_TexCoord0;
#endif

#if x3d_MaxTextures > 1
   attribute vec4 x3d_TexCoord1;
#endif

varying float fogDepth;
varying vec4  color;
varying vec3  vertex;
varying vec3  localVertex;

#if ! defined (X3D_GEOMETRY_0D)
   #if x3d_MaxTextures > 0
   varying vec4  texCoord0;
   #endif

   #if x3d_MaxTextures > 1
   varying vec4  texCoord1;
   #endif
#endif

#if defined (X3D_NORMALS)
   uniform mat3 x3d_NormalMatrix;

   attribute  vec3 x3d_Normal;
   varying vec3 normal;
   varying vec3 localNormal;
#else
   vec3 normal = vec3 (0.0, 0.0, 1.0);
#endif

#if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
   varying float depth;
#endif

#pragma X3D include "PointSize.glsl"

void
vertex_main ()
{
   vec4 position = x3d_ModelViewMatrix * x3d_Vertex;

   fogDepth    = x3d_FogDepth;
   color       = x3d_Color;
   vertex      = position .xyz;
   localVertex = x3d_Vertex .xyz;

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

   gl_Position = x3d_ProjectionMatrix * position;

   #if defined (X3D_GEOMETRY_0D)
   gl_PointSize = pointSize = getPointSize (vertex);
   #endif

   #if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
   depth = 1.0 + gl_Position .w;
   #endif
}
