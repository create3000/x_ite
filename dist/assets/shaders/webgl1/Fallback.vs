precision highp float;
precision highp int;
uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;
uniform mat3 x3d_NormalMatrix;
uniform mat4 x3d_TextureMatrix [1];
uniform bool x3d_ColorMaterial;
attribute vec4 x3d_Vertex;
attribute vec3 x3d_Normal;
attribute vec4 x3d_TexCoord0;
attribute vec4 x3d_Color;
varying vec3 vertex;
varying vec3 normal;
varying vec4 texCoord;
varying vec4 color;
void
main ()
{
vertex = vec3 (x3d_ModelViewMatrix * x3d_Vertex);
normal = normalize (x3d_NormalMatrix * x3d_Normal);
texCoord = x3d_TextureMatrix [0] * x3d_TexCoord0;
color = x3d_ColorMaterial ? x3d_Color : vec4 (1.0);
gl_Position = x3d_ProjectionMatrix * x3d_ModelViewMatrix * x3d_Vertex;
}
