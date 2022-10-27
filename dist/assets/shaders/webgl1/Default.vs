precision highp float;
precision highp int;
precision highp sampler2D;
precision highp samplerCube;
uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;
attribute float x3d_FogDepth;
attribute vec4 x3d_Color;
attribute vec4 x3d_Vertex;
#if x3d_MaxTextures > 0
attribute vec4 x3d_TexCoord0;
#endif
#if x3d_MaxTextures > 1
attribute vec4 x3d_TexCoord1;
#endif
varying float fogDepth;
varying vec4 color;
varying vec3 vertex;
varying vec3 localVertex;
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
#if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
varying float depth;
#endif
#if defined (X3D_GEOMETRY_0D)
uniform x3d_PointPropertiesParameters x3d_PointProperties;
uniform int x3d_NumTextures;
varying float pointSize;
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
vec4 position = x3d_ModelViewMatrix * x3d_Vertex;
fogDepth = x3d_FogDepth;
color = x3d_Color;
vertex = position .xyz;
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
normal = x3d_NormalMatrix * x3d_Normal;
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
void
main ()
{
vertex_main ();
}
