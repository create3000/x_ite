
precision highp float;
precision highp int;
uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;
uniform mat3 x3d_NormalMatrix;
attribute vec4 x3d_Vertex;
attribute vec3 x3d_Normal;
attribute vec4 x3d_TexCoord0;
attribute vec4 x3d_TexCoord1;
attribute vec4 x3d_Color;
varying vec3 vertex;
varying vec3 normal;
varying vec4 texCoord0;
varying vec4 texCoord1;
varying vec4 color; 
varying vec3 localNormal; 
varying vec3 localVertex; 
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
varying float depth;
#endif
void
main ()
{
vec4 position = x3d_ModelViewMatrix * x3d_Vertex;
vertex = position .xyz;
normal = x3d_NormalMatrix * x3d_Normal;
texCoord0 = x3d_TexCoord0;
texCoord1 = x3d_TexCoord1;
color = x3d_Color;
localNormal = x3d_Normal;
localVertex = x3d_Vertex .xyz;
gl_Position = x3d_ProjectionMatrix * position;
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
depth = 1.0 + gl_Position .w;
#endif
}
