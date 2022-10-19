#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
uniform bool x3d_ColorMaterial; 
uniform x3d_UnlitMaterialParameters x3d_Material;
uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;
in float x3d_FogDepth;
in vec4 x3d_TexCoord0;
in vec4 x3d_Color;
in vec4 x3d_Vertex;
flat out float lengthSoFar; 
flat out vec2 startPoint; 
out vec2 midPoint; 
out float fogDepth; 
out vec4 color; 
out vec3 vertex; 
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
lengthSoFar = x3d_TexCoord0 .z;
startPoint = x3d_TexCoord0 .xy;
midPoint = x3d_TexCoord0 .xy;
fogDepth = x3d_FogDepth;
vertex = position .xyz;
gl_Position = x3d_ProjectionMatrix * position;
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
depth = 1.0 + gl_Position .w;
#endif
float alpha = 1.0 - x3d_Material .transparency;
if (x3d_ColorMaterial)
{
color .rgb = x3d_Color .rgb;
color .a = x3d_Color .a * alpha;
}
else
{
color .rgb = x3d_Material .emissiveColor;
color .a = alpha;
}
}
