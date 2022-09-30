#version 300 es

precision highp float;
precision highp int;

uniform mat3 x3d_NormalMatrix;
uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

in float x3d_FogDepth;
in vec4  x3d_Color;
in vec3  x3d_Normal;
in vec4  x3d_Vertex;
in vec4  x3d_ParticlePosition;

#if x3d_MaxTextures > 0
in vec4 x3d_TexCoord0;
#endif

#if x3d_MaxTextures > 1
in vec4 x3d_TexCoord1;
#endif

out float fogDepth;    // fog depth
out vec4  color;       // color
out vec3  normal;      // normalized normal vector at this point on geometry
out vec3  vertex;      // point on geometry
out vec3  localNormal; // normal vector at this point on geometry in local coordinates
out vec3  localVertex; // point on geometry in local coordinates

#if x3d_MaxTextures > 0
out vec4  texCoord0;   // texCoord0
#endif

#if x3d_MaxTextures > 1
out vec4  texCoord1;   // texCoord1
#endif

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
out float depth;
#endif

void
main ()
{
   vec4 local    = vec4 (x3d_ParticlePosition .xyz + x3d_Vertex .xyz, x3d_ParticlePosition .w * x3d_Vertex .w);
   vec4 position = x3d_ModelViewMatrix * local;

   fogDepth    = x3d_FogDepth;
   color       = x3d_Color;
   normal      = x3d_NormalMatrix * x3d_Normal;
   vertex      = position .xyz;
   localNormal = x3d_Normal;
   localVertex = local .xyz;

   #if x3d_MaxTextures > 0
   texCoord0 = x3d_TexCoord0;
   #endif

   #if x3d_MaxTextures > 1
   texCoord1 = x3d_TexCoord1;
   #endif

   gl_Position = x3d_ProjectionMatrix * position;

   #ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
   depth = 1.0 + gl_Position .w;
   #endif
}
