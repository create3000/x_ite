#version 300 es
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
#extension GL_EXT_frag_depth : enable
#endif
precision highp float;
precision highp int;
out vec4 x3d_FragColor;
uniform x3d_LightSourceParameters x3d_LightSource [1];
uniform mat4 x3d_CameraSpaceMatrix;
#define lightDirection (-x3d_LightSource [0] .direction)
#define lightColor (x3d_LightSource [0] .color)
#ifdef USE_IBL
uniform samplerCube diffuseEnvironmentTexture;
uniform samplerCube specularEnvironmentTexture;
uniform sampler2D brdfLUT;
#endif
#ifdef HAS_NORMAL_MAP
uniform sampler2D normalTexture;
uniform float normalScale;
#endif
#ifdef HAS_EMISSIVE_MAP
uniform sampler2D emissiveTexture;
uniform vec3 emissiveFactor;
#endif
#ifdef HAS_OCCLUSION_MAP
uniform sampler2D occlusionTexture;
uniform float occlusionStrength;
#endif
#ifdef KHR_materials_pbrMetallicRoughness
uniform vec4 baseColorFactor;
uniform vec2 metallicRoughnessValues;
#ifdef HAS_BASE_COLOR_MAP
uniform sampler2D baseColorTexture;
#endif
#ifdef HAS_METAL_ROUGHNESS_MAP
uniform sampler2D metallicRoughnessTexture;
#endif
#elif defined (KHR_materials_pbrSpecularGlossiness)
uniform vec4 diffuseFactor;
uniform vec3 specularFactor;
uniform float glossinessFactor;
#ifdef HAS_DIFFUSE_MAP
uniform sampler2D diffuseTexture;
#endif
#ifdef HAS_SPECULAR_MAP
uniform sampler2D specularGlossinessTexture;
#endif
#endif
#define camera (vec3 (0.0))
in vec3 position;
in vec2 texCoord;
#ifdef HAS_COLORS
in vec4 color;
#endif
#ifdef HAS_NORMALS
#ifdef HAS_TANGENTS
in mat3 TBN;
#else
in vec3 normal;
#endif
#endif
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
uniform float x3d_LogarithmicFarFactor1_2;
in float depth;
#endif
struct PBRInfo
{
float NdotL; 
float NdotV; 
float NdotH; 
float LdotH; 
float VdotH; 
float perceptualRoughness; 
float metalness; 
vec3 reflectance0; 
vec3 reflectance90; 
float alphaRoughness; 
vec3 diffuseColor; 
vec3 specularColor; 
};
const float M_PI = 3.141592653589793;
const float c_MinRoughness = 0.04;
vec4
SRGBtoLINEAR (vec4 srgbIn)
{
#ifdef MANUAL_SRGB
#ifdef SRGB_FAST_APPROXIMATION
vec3 linOut = pow (srgbIn .xyz, vec3 (2.2));
#else 
vec3 bLess = step (vec3 (0.04045) ,srgbIn .xyz);
vec3 linOut = mix (srgbIn .xyz / vec3 (12.92), pow ((srgbIn .xyz + vec3 (0.055)) / vec3 (1.055), vec3 (2.4)), bLess);
#endif 
return vec4 (linOut, srgbIn .w);
#else 
return srgbIn;
#endif 
}
vec3
getNormal ()
{
#ifndef HAS_TANGENTS
vec3 pos_dx = dFdx (position);
vec3 pos_dy = dFdy (position);
vec3 tex_dx = dFdx (vec3 (texCoord, 0.0));
vec3 tex_dy = dFdy (vec3 (texCoord, 0.0));
vec3 t = (tex_dy .t * pos_dx - tex_dx .t * pos_dy) / (tex_dx .s * tex_dy.t - tex_dy .s * tex_dx .t);
#ifdef HAS_NORMALS
vec3 ng = normalize (normal);
#else
vec3 ng = normalize (cross (pos_dx, pos_dy));
#endif
t = normalize (t - ng * dot (ng, t));
vec3 b = normalize (cross (ng, t));
mat3 tbn = mat3 (t, b, ng);
#else 
mat3 tbn = TBN;
#endif
#ifdef HAS_NORMAL_MAP
vec3 n = texture (normalTexture, texCoord) .rgb;
n = normalize (tbn * ((n * 2.0 - 1.0) * vec3 (normalScale, normalScale, 1.0)));
#else
vec3 n = tbn [2] .xyz;
#endif
return n;
}
#ifdef USE_IBL
vec3
getIBLContribution (PBRInfo pbrInputs, vec3 n, vec3 reflection)
{
float mipCount = 9.0; 
float lod = pbrInputs .perceptualRoughness * mipCount;
vec3 brdf = SRGBtoLINEAR (texture (brdfLUT, vec2 (pbrInputs .NdotV, 1.0 - pbrInputs .perceptualRoughness))) .rgb;
vec3 diffuseLight = SRGBtoLINEAR (textureCube (diffuseEnvironmentTexture, n)) .rgb;
#ifdef USE_TEX_LOD
vec3 specularLight = SRGBtoLINEAR (textureCubeLodEXT (specularEnvironmentTexture, reflection, lod)) .rgb;
#else
vec3 specularLight = SRGBtoLINEAR (textureCube (specularEnvironmentTexture, reflection)) .rgb;
#endif
vec3 diffuse = diffuseLight * pbrInputs .diffuseColor;
vec3 specular = specularLight * (pbrInputs .specularColor * brdf .x + brdf .y);
return diffuse + specular;
}
#endif
vec3
diffuse (PBRInfo pbrInputs)
{
return pbrInputs .diffuseColor / M_PI;
}
vec3
specularReflection (PBRInfo pbrInputs)
{
return pbrInputs .reflectance0 + (pbrInputs .reflectance90 - pbrInputs .reflectance0) * pow (clamp (1.0 - pbrInputs .VdotH, 0.0, 1.0), 5.0);
}
float
geometricOcclusion (PBRInfo pbrInputs)
{
float NdotL = pbrInputs .NdotL;
float NdotV = pbrInputs .NdotV;
float r = pbrInputs .alphaRoughness;
float attenuationL = 2.0 * NdotL / (NdotL + sqrt (r * r + (1.0 - r * r) * (NdotL * NdotL)));
float attenuationV = 2.0 * NdotV / (NdotV + sqrt (r * r + (1.0 - r * r) * (NdotV * NdotV)));
return attenuationL * attenuationV;
}
float
microfacetDistribution (PBRInfo pbrInputs)
{
float roughnessSq = pbrInputs .alphaRoughness * pbrInputs .alphaRoughness;
float f = (pbrInputs .NdotH * roughnessSq - pbrInputs .NdotH) * pbrInputs .NdotH + 1.0;
return roughnessSq / (M_PI * f * f);
}
void
main ()
{
#ifdef KHR_materials_pbrMetallicRoughness
float perceptualRoughness = metallicRoughnessValues .y;
float metallic = metallicRoughnessValues .x;
#ifdef HAS_METAL_ROUGHNESS_MAP
vec4 mrSample = texture (metallicRoughnessTexture, texCoord);
perceptualRoughness = mrSample .g * perceptualRoughness;
metallic = mrSample .b * metallic;
#endif
perceptualRoughness = clamp (perceptualRoughness, c_MinRoughness, 1.0);
metallic = clamp (metallic, 0.0, 1.0);
float alphaRoughness = perceptualRoughness * perceptualRoughness;
#ifdef HAS_BASE_COLOR_MAP
vec4 baseColor = SRGBtoLINEAR (texture (baseColorTexture, texCoord)) * baseColorFactor;
#else
vec4 baseColor = baseColorFactor;
#endif
#ifdef HAS_COLORS
baseColor *= color;
#endif
vec3 f0 = vec3 (0.04);
vec3 diffuseColor = baseColor .rgb * (vec3 (1.0) - f0);
diffuseColor *= 1.0 - metallic;
vec3 specularColor = mix (f0, baseColor .rgb, metallic);
float reflectance = max (max (specularColor .r, specularColor .g), specularColor .b);
#elif defined (KHR_materials_pbrSpecularGlossiness)
#ifdef HAS_SPECULAR_MAP
vec4 specularGlossiness = SRGBtoLINEAR (texture (specularGlossinessTexture, texCoord));
float perceptualRoughness = 1.0 - specularGlossiness .a * glossinessFactor;
vec3 specularColor = specularGlossiness .rgb * specularFactor;
#else
float perceptualRoughness = 1.0 - glossinessFactor;
vec3 specularColor = specularFactor;
#endif
float metallic = 1.0;
perceptualRoughness = clamp (perceptualRoughness, c_MinRoughness, 1.0);
float alphaRoughness = perceptualRoughness * perceptualRoughness;
#ifdef HAS_DIFFUSE_MAP
vec4 baseColor = SRGBtoLINEAR (texture (diffuseTexture, texCoord)) * diffuseFactor;
#else
vec4 baseColor = diffuseFactor;
#endif
#ifdef HAS_COLORS
baseColor *= color;
#endif
specularColor = vec3 (0.0); 
float reflectance = max (max (specularColor .r, specularColor .g), specularColor .b);
vec3 diffuseColor = baseColor .rgb;
#else
vec4 baseColor = vec4 (1.0);
vec3 diffuseColor = vec3 (1.0);
vec3 specularColor = vec3 (1.0);
float metallic = 1.0;
float perceptualRoughness = 1.0;
float alphaRoughness = 1.0;
float reflectance = 1.0;
#endif
float reflectance90 = clamp (reflectance * 25.0, 0.0, 1.0);
vec3 specularEnvironmentR0 = specularColor .rgb;
vec3 specularEnvironmentR90 = vec3 (1.0, 1.0, 1.0) * reflectance90;
vec3 n = getNormal (); 
vec3 v = normalize (camera - position); 
vec3 l = normalize (lightDirection); 
vec3 h = normalize (l + v); 
float NdotL = clamp (dot (n, l), 0.001, 1.0);
float NdotV = abs (dot (n, v)) + 0.001;
float NdotH = clamp (dot (n, h), 0.0, 1.0);
float LdotH = clamp (dot (l, h), 0.0, 1.0);
float VdotH = clamp (dot (v, h), 0.0, 1.0);
PBRInfo pbrInputs = PBRInfo (
NdotL,
NdotV,
NdotH,
LdotH,
VdotH,
perceptualRoughness,
metallic,
specularEnvironmentR0,
specularEnvironmentR90,
alphaRoughness,
diffuseColor,
specularColor
);
vec3 F = specularReflection (pbrInputs);
float G = geometricOcclusion (pbrInputs);
float D = microfacetDistribution (pbrInputs);
vec3 diffuseContrib = (1.0 - F) * diffuse (pbrInputs);
vec3 specContrib = F * G * D / (4.0 * NdotL * NdotV);
vec3 finalColor = NdotL * lightColor * (diffuseContrib + specContrib);
#ifdef USE_IBL
vec3 reflection = -normalize (reflect (v, n));
finalColor += getIBLContribution (pbrInputs, n, reflection);
#endif
#ifdef HAS_OCCLUSION_MAP
float ao = texture (occlusionTexture, texCoord) .r;
finalColor = mix (finalColor, finalColor * ao, occlusionStrength);
#endif
#ifdef HAS_EMISSIVE_MAP
vec3 emissive = SRGBtoLINEAR (texture (emissiveTexture, texCoord)) .rgb * emissiveFactor;
finalColor += emissive;
#endif
x3d_FragColor = vec4 (pow (finalColor, vec3 (1.0 / 2.2)), baseColor .a);
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
if (x3d_LogarithmicFarFactor1_2 > 0.0)
gl_FragDepth = log2 (depth) * x3d_LogarithmicFarFactor1_2;
else
gl_FragDepth = gl_FragCoord .z;
#endif
}
