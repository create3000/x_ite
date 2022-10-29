#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
precision highp sampler3D;
precision highp samplerCube;
uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;
#if defined (X3D_FOG_COORDS)
in float x3d_FogDepth;
#endif
#if defined (X3D_COLOR_MATERIAL)
in vec4 x3d_Color;
#endif
#if ! defined (X3D_GEOMETRY_0D)
#if (defined (X3D_STYLE_PROPERTIES) && defined (X3D_GEOMETRY_1D)) || defined (X3D_GEOMETRY_2D) || defined (X3D_GEOMETRY_3D)
#if x3d_MaxTextures > 0
in vec4 x3d_TexCoord0;
#endif
#endif
#if ! defined (X3D_GEOMETRY_1D)
#if x3d_MaxTextures > 1
in vec4 x3d_TexCoord1;
#endif
#endif
#endif
in vec4 x3d_Vertex;
#if defined (X3D_FOG)
#if defined (X3D_FOG_COORDS)
out float fogDepth;
#endif
#endif
#if defined (X3D_COLOR_MATERIAL)
out vec4 color;
#endif
#if ! defined (X3D_GEOMETRY_0D) && ! defined (X3D_GEOMETRY_1D)
#if x3d_MaxTextures > 0
out vec4 texCoord0;
#endif
#if x3d_MaxTextures > 1
out vec4 texCoord1;
#endif
#endif
#if defined (X3D_NORMALS)
uniform mat3 x3d_NormalMatrix;
in vec3 x3d_Normal;
out vec3 normal;
out vec3 localNormal;
#else
vec3 normal = vec3 (0.0, 0.0, 1.0);
#endif
#if defined (X3D_STYLE_PROPERTIES) && defined (X3D_GEOMETRY_1D)
flat out float lengthSoFar;
flat out vec2 startPoint;
out vec2 midPoint;
#endif
out vec3 vertex;
out vec3 localVertex;
#if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
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
#if defined (X3D_GEOMETRY_0D)
uniform x3d_PointPropertiesParameters x3d_PointProperties;
uniform int x3d_NumTextures;
out float pointSize;
float
getPointSize (const in vec3 vertex)
{
float pointSizeMinValue = x3d_PointProperties .pointSizeMinValue;
float pointSizeMaxValue = x3d_PointProperties .pointSizeMaxValue;
vec3 pointSizeAttenuation = x3d_PointProperties .pointSizeAttenuation;
float dL = length (vertex);
float pointSize = 0.0;
pointSize = x3d_PointProperties .pointSizeScaleFactor;
pointSize /= dot (pointSizeAttenuation, vec3 (1.0, dL, dL * dL));
pointSize = clamp (pointSize, pointSizeMinValue, pointSizeMaxValue);
return pointSize > 1.0 && x3d_NumTextures == 0 ? pointSize + 1.0 : pointSize;
}
#endif
void
vertex_main ()
{
#if defined (X3D_STYLE_PROPERTIES) && defined (X3D_GEOMETRY_0D)
gl_PointSize = pointSize = getPointSize (vertex);
#endif
#if defined (X3D_STYLE_PROPERTIES) && defined (X3D_GEOMETRY_1D)
lengthSoFar = x3d_TexCoord0 .z;
startPoint = x3d_TexCoord0 .xy;
midPoint = x3d_TexCoord0 .xy;
#endif
#if defined (X3D_FOG)
#if defined (X3D_FOG_COORDS)
fogDepth = x3d_FogDepth;
#endif
#endif
#if defined (X3D_COLOR_MATERIAL)
color = x3d_Color;
#endif
#if ! defined (X3D_GEOMETRY_0D) && ! defined (X3D_GEOMETRY_1D)
#if x3d_MaxTextures > 0
texCoord0 = getTexCoord (x3d_TexCoord0);
#endif
#if x3d_MaxTextures > 1
texCoord1 = getTexCoord (x3d_TexCoord1);
#endif
#endif
#if defined (X3D_NORMALS)
normal = x3d_NormalMatrix * x3d_Normal;
localNormal = x3d_Normal;
#endif
vec4 position = x3d_ModelViewMatrix * getVertex (x3d_Vertex);
vertex = position .xyz;
localVertex = x3d_Vertex .xyz;
gl_Position = x3d_ProjectionMatrix * position;
#if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
depth = 1.0 + gl_Position .w;
#endif
}
void
main ()
{
vertex_main ();
}
