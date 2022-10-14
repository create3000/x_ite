#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;
uniform mat3 x3d_NormalMatrix;
in vec4 x3d_Color;
in vec4 x3d_TexCoord0;
in vec4 x3d_TexCoord1;
in vec3 x3d_Normal;
in vec4 x3d_Vertex;
out vec3 vertex;
out vec3 normal;
out vec4 texCoord0;
out vec4 texCoord1;
out vec4 color; 
out vec3 localNormal; 
out vec3 localVertex; 
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
out float depth;
#endif
in vec4 x3d_Particle;
in mat4 x3d_ParticleMatrix;
uniform sampler2D x3d_TexCoordRamp;
vec4
texelFetch (const in sampler2D sampler, const in int index, const in int lod)
{
int x = textureSize (sampler, lod) .x;
ivec2 p = ivec2 (index % x, index / x);
vec4 t = texelFetch (sampler, p, lod);
return t;
}
vec4
getVertex (const in vec4 vertex)
{
if (x3d_Particle [0] == 0.0)
return vertex;
return x3d_ParticleMatrix * vertex;
}
vec4
getTexCoord (const in vec4 texCoord)
{
int index0 = int (x3d_Particle [3]);
if (x3d_Particle [0] == 0.0 || index0 == -1)
return texCoord;
const int map [6] = int [6] (0, 1, 2, 0, 2, 3);
return texelFetch (x3d_TexCoordRamp, index0 + map [gl_VertexID % 6], 0);
}
void
main ()
{
vec4 position = x3d_ModelViewMatrix * getVertex (x3d_Vertex);
vertex = position .xyz;
normal = x3d_NormalMatrix * x3d_Normal;
texCoord0 = getTexCoord (x3d_TexCoord0);
texCoord1 = getTexCoord (x3d_TexCoord1);
color = x3d_Color;
localNormal = x3d_Normal;
localVertex = x3d_Vertex .xyz;
gl_Position = x3d_ProjectionMatrix * position;
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
depth = 1.0 + gl_Position .w;
#endif
}
