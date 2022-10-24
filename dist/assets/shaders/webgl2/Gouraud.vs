#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
uniform mat3 x3d_NormalMatrix;
uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;
uniform bool x3d_ColorMaterial; 
uniform int x3d_NumLights;
uniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];
uniform x3d_MaterialParameters x3d_Material;
in float x3d_FogDepth;
in vec4 x3d_Color;
in vec3 x3d_Normal;
in vec4 x3d_Vertex;
#if x3d_MaxTextures > 0
in vec4 x3d_TexCoord0;
#endif
#if x3d_MaxTextures > 1
in vec4 x3d_TexCoord1;
#endif
out float fogDepth; 
out vec4 frontColor; 
out vec4 backColor; 
out vec3 normal; 
out vec3 vertex; 
out vec3 localNormal; 
out vec3 localVertex; 
#if x3d_MaxTextures > 0
out vec4 texCoord0; 
#endif
#if x3d_MaxTextures > 1
out vec4 texCoord1; 
#endif
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
vec4
getMaterialColor (const in vec3 N,
const in vec3 vertex,
const in x3d_MaterialParameters material)
{
vec3 V = normalize (-vertex); 
float alpha = (1.0 - material .transparency) * (x3d_ColorMaterial ? x3d_Color .a : 1.0);
vec3 diffuseColor = x3d_ColorMaterial ? x3d_Color .rgb : material .diffuseColor;
vec3 ambientColor = diffuseColor * material .ambientIntensity;
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
float specularFactor = material .shininess > 0.0 ? pow (max (dot (N, H), 0.0), material .shininess * 128.0) : 1.0;
vec3 specularTerm = material .specularColor * specularFactor;
float attenuationFactor = di ? 1.0 : 1.0 / max (dot (c, vec3 (1.0, dL, dL * dL)), 1.0);
float spotFactor = light .type == x3d_SpotLight ? getSpotFactor (light .cutOffAngle, light .beamWidth, L, d) : 1.0;
float attenuationSpotFactor = attenuationFactor * spotFactor;
vec3 ambientTerm = light .ambientIntensity * ambientColor;
vec3 diffuseSpecularTerm = light .intensity * (diffuseTerm + specularTerm);
finalColor += attenuationSpotFactor * light .color * (ambientTerm + diffuseSpecularTerm);
}
}
finalColor += material .emissiveColor;
return vec4 (clamp (finalColor, 0.0, 1.0), alpha);
}
void
main ()
{
vec4 position = x3d_ModelViewMatrix * getVertex (x3d_Vertex);
fogDepth = x3d_FogDepth;
vertex = position .xyz;
normal = normalize (x3d_NormalMatrix * x3d_Normal);
localNormal = x3d_Normal;
localVertex = x3d_Vertex .xyz;
#if x3d_MaxTextures > 0
texCoord0 = getTexCoord (x3d_TexCoord0);
#endif
#if x3d_MaxTextures > 1
texCoord1 = getTexCoord (x3d_TexCoord1);
#endif
gl_Position = x3d_ProjectionMatrix * position;
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
depth = 1.0 + gl_Position .w;
#endif
frontColor = getMaterialColor ( normal, vertex, x3d_Material);
backColor = getMaterialColor (-normal, vertex, x3d_Material);
}
