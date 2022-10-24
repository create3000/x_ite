#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
uniform x3d_PointPropertiesParameters x3d_PointProperties;
uniform bool x3d_ColorMaterial; 
uniform x3d_UnlitMaterialParameters x3d_Material;
uniform int x3d_NumTextures;
uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;
in float x3d_FogDepth;
in vec4 x3d_Color;
in vec4 x3d_Vertex;
out float pointSize; 
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
fogDepth = x3d_FogDepth;
vertex = position .xyz;
gl_Position = x3d_ProjectionMatrix * position;
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
depth = 1.0 + gl_Position .w;
#endif
float pointSizeMinValue = x3d_PointProperties .pointSizeMinValue;
float pointSizeMaxValue = x3d_PointProperties .pointSizeMaxValue;
vec3 pointSizeAttenuation = x3d_PointProperties .pointSizeAttenuation;
float dL = length (vertex);
pointSize = x3d_PointProperties .pointSizeScaleFactor;
pointSize /= dot (pointSizeAttenuation, vec3 (1.0, dL, dL * dL));
pointSize = clamp (pointSize, pointSizeMinValue, pointSizeMaxValue);
gl_PointSize = pointSize > 1.0 && x3d_NumTextures == 0 ? pointSize + 1.0 : pointSize;
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
