precision highp float;
precision highp int;
uniform mat3 x3d_NormalMatrix;
uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;
uniform bool x3d_ColorMaterial; 
uniform int x3d_NumLights;
uniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];
uniform x3d_MaterialParameters x3d_Material;
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
varying vec4 frontColor; 
varying vec4 backColor; 
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
vec4 position = x3d_ModelViewMatrix * x3d_Vertex;
fogDepth = x3d_FogDepth;
vertex = position .xyz;
normal = normalize (x3d_NormalMatrix * x3d_Normal);
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
frontColor = getMaterialColor ( normal, vertex, x3d_Material);
backColor = getMaterialColor (-normal, vertex, x3d_Material);
}
