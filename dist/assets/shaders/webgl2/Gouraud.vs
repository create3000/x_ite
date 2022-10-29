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
float
getSpotFactor (const in float cutOffAngle, const in float beamWidth, const in vec3 L, const in vec3 d)
{
float spotAngle = acos (clamp (dot (-L, d), -1.0, 1.0));
if (spotAngle >= cutOffAngle)
return 0.0;
else if (spotAngle <= beamWidth)
return 1.0;
return (spotAngle - cutOffAngle) / (beamWidth - cutOffAngle);
}
#if defined (X3D_SHADOWS)
#if defined (TITANIA)
vec4
pack (const in float value)
{
return vec4 (0.0, 0.0, 0.0, 0.0);
}
float
unpack (const in vec4 color)
{
return color .r;
}
#endif
#if defined (X_ITE)
vec4
pack (const in float value)
{
const vec3 bitShifts = vec3 (255.0,
255.0 * 255.0,
255.0 * 255.0 * 255.0);
return vec4 (value, fract (value * bitShifts));
}
#if defined (X3D_DEPTH_TEXTURE)
float
unpack (const in vec4 color)
{
return color .r;
}
#else
float
unpack (const vec4 color)
{
const vec3 bitShifts = vec3 (1.0 / 255.0,
1.0 / (255.0 * 255.0),
1.0 / (255.0 * 255.0 * 255.0));
return color .x + dot (color .gba, bitShifts);
}
#endif
#endif
uniform sampler2D x3d_ShadowMap [x3d_MaxLights];
float
getShadowDepth (const in int index, const in vec2 shadowCoord)
{
switch (index)
{
#if x3d_MaxLights > 0
case 0:
{
return unpack (texture (x3d_ShadowMap [0], shadowCoord));
}
#endif
#if x3d_MaxLights > 1
case 1:
{
return unpack (texture (x3d_ShadowMap [1], shadowCoord));
}
#endif
#if x3d_MaxLights > 2
case 2:
{
return unpack (texture (x3d_ShadowMap [2], shadowCoord));
}
#endif
#if x3d_MaxLights > 3
case 3:
{
return unpack (texture (x3d_ShadowMap [3], shadowCoord));
}
#endif
#if x3d_MaxLights > 4
case 4:
{
return unpack (texture (x3d_ShadowMap [4], shadowCoord));
}
#endif
#if x3d_MaxLights > 5
case 5:
{
return unpack (texture (x3d_ShadowMap [5], shadowCoord));
}
#endif
#if x3d_MaxLights > 6
case 6:
{
return unpack (texture (x3d_ShadowMap [6], shadowCoord));
}
#endif
#if x3d_MaxLights > 7
case 7:
{
return unpack (texture (x3d_ShadowMap [7], shadowCoord));
}
#endif
default:
{
return 0.0;
}
}
}
float
texture2DCompare (const in int index, const in vec2 texCoord, const in float compare)
{
float shadowDepth = getShadowDepth (index, texCoord);
return (1.0 - step (1.0, shadowDepth)) * step (shadowDepth, compare);
}
float
texture2DShadowLerp (const in int index, const in vec2 texelSize, const in float shadowMapSize, const in vec2 texCoord, const in float compare)
{
const vec2 offset = vec2 (0.0, 1.0);
vec2 centroidTexCoord = floor (texCoord * shadowMapSize + 0.5) / shadowMapSize;
float lb = texture2DCompare (index, centroidTexCoord + texelSize * offset .xx, compare);
float lt = texture2DCompare (index, centroidTexCoord + texelSize * offset .xy, compare);
float rb = texture2DCompare (index, centroidTexCoord + texelSize * offset .yx, compare);
float rt = texture2DCompare (index, centroidTexCoord + texelSize * offset .yy, compare);
vec2 f = fract (texCoord * shadowMapSize + 0.5);
float a = mix (lb, lt, f.y);
float b = mix (rb, rt, f.y);
float c = mix (a, b, f.x);
return c;
}
vec2
cubeToUVCompact (in vec3 v, const float texelSizeY)
{
vec3 absV = abs (v);
float scaleToCube = 1.0 / max (absV .x, max (absV .y, absV .z));
absV *= scaleToCube;
v *= scaleToCube * (1.0 - 2.0 * texelSizeY);
vec2 planar = v .xy;
float almostATexel = 1.5 * texelSizeY;
float almostOne = 1.0 - almostATexel;
if (absV .z >= almostOne)
{
if (v .z > 0.0)
planar .x = 4.0 - v .x;
}
else if (absV .x >= almostOne)
{
float signX = sign (v .x);
planar .x = v .z * signX + 2.0 * signX;
}
else if (absV .y >= almostOne)
{
float signY = sign (v .y);
planar .x = (v .x + 0.5 + signY) * 2.0;
planar .y = v .z * signY - 2.0;
}
return vec2 (0.125, 0.25) * planar + vec2 (0.375, 0.75);
}
mat4
getPointLightRotations (const in vec3 vector)
{
mat4 rotations [6];
rotations [0] = mat4 ( 0, 0 , 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1);
rotations [1] = mat4 ( 0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1);
rotations [2] = mat4 (-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1);
rotations [3] = mat4 ( 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
rotations [4] = mat4 ( 1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1);
rotations [5] = mat4 ( 1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1);
vec3 a = abs (vector .xyz);
if (a .x > a .y)
{
if (a .x > a .z)
return vector .x > 0.0 ? rotations [1] : rotations [0];
else
return vector .z > 0.0 ? rotations [2] : rotations [3];
}
else
{
if (a .y > a .z)
return vector .y > 0.0 ? rotations [5] : rotations [4];
else
return vector .z > 0.0 ? rotations [2] : rotations [3];
}
return rotations [3];
}
float
getShadowIntensity (const in int index, const in x3d_LightSourceParameters light)
{
if (light .type == x3d_PointLight)
{
const mat4 biasMatrix = mat4 (0.5, 0.0, 0.0, 0.0,
0.0, 0.5, 0.0, 0.0,
0.0, 0.0, 0.5, 0.0,
0.5, 0.5, 0.5, 1.0);
const mat4 projectionMatrix = mat4 (1.0, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.000025000312504, -1.0, 0, 0.0, -0.25000312503906297, 0.0);
vec2 texelSize = vec2 (1.0) / (float (light .shadowMapSize) * vec2 (4.0, 2.0));
vec4 shadowCoord = light .shadowMatrix * vec4 (vertex, 1.0);
vec3 lightToPosition = shadowCoord .xyz;
shadowCoord = biasMatrix * (projectionMatrix * (getPointLightRotations (lightToPosition) * shadowCoord));
shadowCoord .z -= light .shadowBias;
shadowCoord .xyz /= shadowCoord .w;
#if defined (X3D_PCF_FILTERING) || defined (X3D_PCF_SOFT_FILTERING)
vec2 offset = vec2 (-1, 1) * (texelSize .y * 42.0);
float value = (
texture2DCompare (index, cubeToUVCompact (lightToPosition + offset .xyy, texelSize .y), shadowCoord .z) +
texture2DCompare (index, cubeToUVCompact (lightToPosition + offset .yyy, texelSize .y), shadowCoord .z) +
texture2DCompare (index, cubeToUVCompact (lightToPosition + offset .xyx, texelSize .y), shadowCoord .z) +
texture2DCompare (index, cubeToUVCompact (lightToPosition + offset .yyx, texelSize .y), shadowCoord .z) +
texture2DCompare (index, cubeToUVCompact (lightToPosition, texelSize .y), shadowCoord .z) +
texture2DCompare (index, cubeToUVCompact (lightToPosition + offset .xxy, texelSize .y), shadowCoord .z) +
texture2DCompare (index, cubeToUVCompact (lightToPosition + offset .yxy, texelSize .y), shadowCoord .z) +
texture2DCompare (index, cubeToUVCompact (lightToPosition + offset .xxx, texelSize .y), shadowCoord .z) +
texture2DCompare (index, cubeToUVCompact (lightToPosition + offset .yxx, texelSize .y), shadowCoord .z)
) * (1.0 / 9.0);
return light .shadowIntensity * value;
#else
float value = texture2DCompare (index, cubeToUVCompact (lightToPosition, texelSize .y), shadowCoord .z);
return light .shadowIntensity * value;
#endif
}
else
{
#if defined (X3D_PCF_FILTERING)
vec2 texelSize = vec2 (1.0) / vec2 (light .shadowMapSize);
vec4 shadowCoord = light .shadowMatrix * vec4 (vertex, 1.0);
shadowCoord .z -= light .shadowBias;
shadowCoord .xyz /= shadowCoord .w;
float dx0 = - texelSize .x;
float dy0 = - texelSize .y;
float dx1 = + texelSize .x;
float dy1 = + texelSize .y;
float value = (
texture2DCompare (index, shadowCoord .xy + vec2 (dx0, dy0), shadowCoord .z) +
texture2DCompare (index, shadowCoord .xy + vec2 (0.0, dy0), shadowCoord .z) +
texture2DCompare (index, shadowCoord .xy + vec2 (dx1, dy0), shadowCoord .z) +
texture2DCompare (index, shadowCoord .xy + vec2 (dx0, 0.0), shadowCoord .z) +
texture2DCompare (index, shadowCoord .xy, shadowCoord .z) +
texture2DCompare (index, shadowCoord .xy + vec2 (dx1, 0.0), shadowCoord .z) +
texture2DCompare (index, shadowCoord .xy + vec2 (dx0, dy1), shadowCoord .z) +
texture2DCompare (index, shadowCoord .xy + vec2 (0.0, dy1), shadowCoord .z) +
texture2DCompare (index, shadowCoord .xy + vec2 (dx1, dy1), shadowCoord .z)
) * (1.0 / 9.0);
return light .shadowIntensity * value;
#elif defined (X3D_PCF_SOFT_FILTERING)
vec2 texelSize = vec2 (1.0) / vec2 (light .shadowMapSize);
vec4 shadowCoord = light .shadowMatrix * vec4 (vertex, 1.0);
shadowCoord .z -= light .shadowBias;
shadowCoord .xyz /= shadowCoord .w;
float dx0 = - texelSize.x;
float dy0 = - texelSize.y;
float dx1 = + texelSize.x;
float dy1 = + texelSize.y;
float value = (
texture2DShadowLerp (index, texelSize, float (shadowMapSize), shadowCoord .xy + vec2 (dx0, dy0), shadowCoord .z) +
texture2DShadowLerp (index, texelSize, float (shadowMapSize), shadowCoord .xy + vec2 (0.0, dy0), shadowCoord .z) +
texture2DShadowLerp (index, texelSize, float (shadowMapSize), shadowCoord .xy + vec2 (dx1, dy0), shadowCoord .z) +
texture2DShadowLerp (index, texelSize, float (shadowMapSize), shadowCoord .xy + vec2 (dx0, 0.0), shadowCoord .z) +
texture2DShadowLerp (index, texelSize, float (shadowMapSize), shadowCoord .xy, shadowCoord .z) +
texture2DShadowLerp (index, texelSize, float (shadowMapSize), shadowCoord .xy + vec2 (dx1, 0.0), shadowCoord .z) +
texture2DShadowLerp (index, texelSize, float (shadowMapSize), shadowCoord .xy + vec2 (dx0, dy1), shadowCoord .z) +
texture2DShadowLerp (index, texelSize, float (shadowMapSize), shadowCoord .xy + vec2 (0.0, dy1), shadowCoord .z) +
texture2DShadowLerp (index, texelSize, float (shadowMapSize), shadowCoord .xy + vec2 (dx1, dy1), shadowCoord .z)
) * ( 1.0 / 9.0 );
return light .shadowIntensity * value;
#else
vec4 shadowCoord = shadowMatrix * vec4 (vertex, 1.0);
shadowCoord .z -= shadowBias;
shadowCoord .xyz /= shadowCoord .w;
float value = texture2DCompare (index, shadowCoord .xy, shadowCoord .z);
return light .shadowIntensity * value;
#endif
}
return 0.0;
}
#endif
uniform int x3d_NumLights;
uniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];
uniform x3d_MaterialParameters x3d_Material;
vec3
getMaterialColor (const in vec3 vertex, const in vec3 N, const in vec3 ambientColor, const in vec3 diffuseColor, const in vec3 specularColor, const in float shininess)
{
vec3 V = normalize (-vertex);
vec3 finalColor = vec3 (0.0);
for (int i = 0; i < x3d_MaxLights; ++ i)
{
if (i == x3d_NumLights)
break;
x3d_LightSourceParameters light = x3d_LightSource [i];
vec3 vL = light .location - vertex;
float dL = length (light .matrix * vL);
bool di = light .type == x3d_DirectionalLight;
if (di || dL <= light .radius)
{
vec3 d = light .direction;
vec3 c = light .attenuation;
vec3 L = di ? -d : normalize (vL);
vec3 H = normalize (L + V);
float lightAngle = max (dot (N, L), 0.0);
vec3 diffuseTerm = diffuseColor * lightAngle;
float specularFactor = shininess > 0.0 ? pow (max (dot (N, H), 0.0), shininess * 128.0) : 1.0;
vec3 specularTerm = specularColor * specularFactor;
float attenuationFactor = di ? 1.0 : 1.0 / max (dot (c, vec3 (1.0, dL, dL * dL)), 1.0);
float spotFactor = light .type == x3d_SpotLight ? getSpotFactor (light .cutOffAngle, light .beamWidth, L, d) : 1.0;
float attenuationSpotFactor = attenuationFactor * spotFactor;
vec3 ambientTerm = light .ambientIntensity * ambientColor;
vec3 diffuseSpecularTerm = light .intensity * (diffuseTerm + specularTerm);
#if defined (X3D_PHONG) && defined (X3D_SHADOWS)
if (lightAngle > 0.0)
diffuseSpecularTerm = mix (diffuseSpecularTerm, light .shadowColor, getShadowIntensity (i, light));
#endif
finalColor += attenuationSpotFactor * light .color * (ambientTerm + diffuseSpecularTerm);
}
}
return finalColor;
}
out vec4 frontColor;
#if ! defined (X3D_GEOMETRY_0D) && ! defined (X3D_GEOMETRY_1D)
out vec4 backColor;
#endif
vec4
getMaterialColor (const in vec3 N,
const in vec3 vertex,
const in x3d_MaterialParameters material)
{
float alpha = 1.0 - x3d_Material .transparency;
#if defined (X3D_COLOR_MATERIAL)
vec4 diffuseParameter = vec4 (color .rgb, color .a * alpha);
#else
vec4 diffuseParameter = vec4 (x3d_Material .diffuseColor, alpha);
#endif
vec3 ambientColor = diffuseParameter .rgb * material .ambientIntensity;
vec3 finalColor = getMaterialColor (vertex, N, ambientColor, diffuseParameter .rgb, material .specularColor, material .shininess);
finalColor += material .emissiveColor;
return vec4 (finalColor, diffuseParameter .a);
}
void
main ()
{
vertex_main ();
normal = normalize (normal);
frontColor = getMaterialColor (normal, vertex, x3d_Material);
#if ! defined (X3D_GEOMETRY_0D) && ! defined (X3D_GEOMETRY_1D)
backColor = getMaterialColor (-normal, vertex, x3d_Material);
#endif
}
