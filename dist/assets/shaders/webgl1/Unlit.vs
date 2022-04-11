precision highp float;
precision highp int;
uniform mat3 x3d_NormalMatrix;
uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;
attribute float x3d_FogDepth;
attribute vec4 x3d_Color;
attribute vec3 x3d_Normal;
attribute vec4 x3d_Vertex;
#if x3d_MaxTextures > 0
attribute vec4 x3d_TexCoord0;
#endif
#if x3d_MaxTextures > 1
attribute vec4 x3d_TexCoord1;
#endif
varying float fogDepth; 
varying vec4 color; 
varying vec3 normal; 
varying vec3 vertex; 
varying vec3 localNormal; 
varying vec3 localVertex; 
#if x3d_MaxTextures > 0
varying vec4 texCoord0; 
#endif
#if x3d_MaxTextures > 1
varying vec4 texCoord1; 
#endif
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
varying float depth;
#endif
void
main ()
{
vec4 position = x3d_ModelViewMatrix * x3d_Vertex;
fogDepth = x3d_FogDepth;
color = x3d_Color;
normal = x3d_NormalMatrix * x3d_Normal;
vertex = position .xyz;
localNormal = x3d_Normal;
localVertex = x3d_Vertex .xyz;
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
