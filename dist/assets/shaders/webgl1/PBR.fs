
#extension GL_OES_standard_derivatives : enable
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
#extension GL_EXT_frag_depth : enable
#endif
precision highp float;
precision highp int;
uniform int x3d_GeometryType;
uniform bool x3d_ColorMaterial; 
uniform float x3d_AlphaCutoff;
uniform int x3d_NumLights;
uniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];
uniform x3d_PhysicalMaterialParameters x3d_Material;
#ifdef USE_IBL
uniform samplerCube diffuseEnvironmentTexture;
uniform samplerCube specularEnvironmentTexture;
uniform sampler2D brdfLUT;
#endif
varying vec3 vertex;
varying vec4 texCoord0;
varying vec4 texCoord1;
varying vec4 color;
varying vec3 normal;
varying vec3 localNormal;
varying vec3 localVertex;
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
uniform float x3d_LogarithmicFarFactor1_2;
in float depth;
#endif
#define MANUAL_SRGB
vec4
SRGBtoLINEAR (const in vec4 srgbIn)
{
#ifdef MANUAL_SRGB
#ifdef SRGB_FAST_APPROXIMATION
vec3 linOut = pow (srgbIn .xyz, vec3 (2.2));
#else 
vec3 bLess = step (vec3 (0.04045), srgbIn .xyz);
vec3 linOut = mix (srgbIn .xyz / vec3 (12.92), pow ((srgbIn .xyz + vec3 (0.055)) / vec3 (1.055), vec3 (2.4)), bLess);
#endif 
return vec4 (linOut, srgbIn .w);
#else 
return srgbIn;
#endif 
}
vec4
Gamma (const in vec4 color)
{
#ifdef MANUAL_SRGB
return vec4 (pow (color .rgb, vec3 (1.0 / 2.2)), color .a);
#else
return color;
#endif
}
uniform mat4 x3d_TextureMatrix [x3d_MaxTextures];
uniform int x3d_NumTextures;
uniform int x3d_TextureType [x3d_MaxTextures]; 
uniform sampler2D x3d_Texture2D [x3d_MaxTextures];
uniform samplerCube x3d_TextureCube [x3d_MaxTextures];
#ifdef X3D_MULTI_TEXTURING
float rand (vec2 co) { return fract (sin (dot (co.xy, vec2 (12.9898,78.233))) * 43758.5453); }
float rand (vec2 co, float l) { return rand (vec2 (rand (co), l)); }
float rand (vec2 co, float l, float t) { return rand (vec2 (rand (co, l), t)); }
float
perlin (vec2 p, float dim, float time)
{
const float M_PI = 3.14159265358979323846;
vec2 pos = floor (p * dim);
vec2 posx = pos + vec2 (1.0, 0.0);
vec2 posy = pos + vec2 (0.0, 1.0);
vec2 posxy = pos + vec2 (1.0);
float c = rand (pos, dim, time);
float cx = rand (posx, dim, time);
float cy = rand (posy, dim, time);
float cxy = rand (posxy, dim, time);
vec2 d = fract (p * dim);
d = -0.5 * cos (d * M_PI) + 0.5;
float ccx = mix (c, cx, d.x);
float cycxy = mix (cy, cxy, d.x);
float center = mix (ccx, cycxy, d.y);
return center * 2.0 - 1.0;
}
vec3
perlin (vec3 p)
{
return vec3 (perlin (p.xy, 1.0, 0.0),
perlin (p.yz, 1.0, 0.0),
perlin (p.zx, 1.0, 0.0));
}
#ifdef X3D_PROJECTIVE_TEXTURE_MAPPING
uniform int x3d_NumProjectiveTextures;
uniform sampler2D x3d_ProjectiveTexture [x3d_MaxTextures];
uniform mat4 x3d_ProjectiveTextureMatrix [x3d_MaxTextures];
uniform vec3 x3d_ProjectiveTextureLocation [x3d_MaxTextures];
#endif
uniform vec4 x3d_MultiTextureColor;
uniform x3d_MultiTextureParameters x3d_MultiTexture [x3d_MaxTextures];
uniform x3d_TextureCoordinateGeneratorParameters x3d_TextureCoordinateGenerator [x3d_MaxTextures];
mat4
getTextureMatrix (const in int i)
{
mat4 textureMatrix = mat4 (0.0);
#if x3d_MaxTextures > 0
if (i == 0)
textureMatrix = x3d_TextureMatrix [0];
#endif
#if x3d_MaxTextures > 1
else if (i == 1)
textureMatrix = x3d_TextureMatrix [1];
#endif
return textureMatrix;
}
vec4
getTexCoord (const in int i)
{
vec4 texCoord = vec4 (0.0);
#if x3d_MaxTextures > 0
if (i == 0)
texCoord = texCoord0;
#endif
#if x3d_MaxTextures > 1
else if (i == 1)
texCoord = texCoord1;
#endif
return texCoord;
}
vec4
getTexCoord (const in x3d_TextureCoordinateGeneratorParameters textureCoordinateGenerator, const in int textureTransformMapping, const in int textureCoordinateMapping)
{
int mode = textureCoordinateGenerator .mode;
if (mode == x3d_None)
{
return getTextureMatrix (textureTransformMapping) * getTexCoord (textureCoordinateMapping);
}
else if (mode == x3d_Sphere)
{
vec2 N = normalize (gl_FrontFacing ? normal : -normal) .xy;
return vec4 (N / 2.0 + 0.5, 0.0, 1.0);
}
else if (mode == x3d_CameraSpaceNormal)
{
vec3 N = normalize (gl_FrontFacing ? normal : -normal);
return vec4 (N, 1.0);
}
else if (mode == x3d_CameraSpacePosition)
{
return vec4 (vertex, 1.0);
}
else if (mode == x3d_CameraSpaceReflectionVector)
{
vec3 N = normalize (gl_FrontFacing ? normal : -normal);
return vec4 (reflect (normalize (vertex), -N), 1.0);
}
else if (mode == x3d_SphereLocal)
{
vec2 N = normalize (gl_FrontFacing ? localNormal : -localNormal) .xy;
return vec4 (N / 2.0 + 0.5, 0.0, 1.0);
}
else if (mode == x3d_Coord)
{
return vec4 (localVertex, 1.0);
}
else if (mode == x3d_CoordEye)
{
return vec4 (vertex, 1.0);
}
else if (mode == x3d_Noise)
{
vec3 scale = vec3 (textureCoordinateGenerator .parameter [0], textureCoordinateGenerator .parameter [1], textureCoordinateGenerator .parameter [2]);
vec3 translation = vec3 (textureCoordinateGenerator .parameter [3], textureCoordinateGenerator .parameter [4], textureCoordinateGenerator .parameter [5]);
return vec4 (perlin (localVertex * scale + translation), 1.0);
}
else if (mode == x3d_NoiseEye)
{
vec3 scale = vec3 (textureCoordinateGenerator .parameter [0], textureCoordinateGenerator .parameter [1], textureCoordinateGenerator .parameter [2]);
vec3 translation = vec3 (textureCoordinateGenerator .parameter [3], textureCoordinateGenerator .parameter [4], textureCoordinateGenerator .parameter [5]);
return vec4 (perlin (vertex * scale + translation), 1.0);
}
else if (mode == x3d_SphereReflect)
{
vec3 N = normalize (gl_FrontFacing ? normal : -normal);
float eta = textureCoordinateGenerator .parameter [0];
return vec4 (refract (normalize (vertex), -N, eta), 1.0);
}
else if (mode == x3d_SphereReflectLocal)
{
vec3 N = normalize (gl_FrontFacing ? localNormal : -localNormal);
float eta = textureCoordinateGenerator .parameter [0];
vec3 eye = vec3 (textureCoordinateGenerator .parameter [1], textureCoordinateGenerator .parameter [2], textureCoordinateGenerator .parameter [3]);
return vec4 (refract (normalize (localVertex - eye), -N, eta), 1.0);
}
return getTextureMatrix (textureTransformMapping) * getTexCoord (textureCoordinateMapping);
}
vec4
getTexCoord (const in int textureTransformMapping, const in int textureCoordinateMapping)
{
vec4 texCoord;
#if x3d_MaxTextures > 0
if (textureCoordinateMapping == 0)
texCoord = getTexCoord (x3d_TextureCoordinateGenerator [0], textureTransformMapping, textureCoordinateMapping);
#endif
#if x3d_MaxTextures > 1
else if (textureCoordinateMapping == 1)
texCoord = getTexCoord (x3d_TextureCoordinateGenerator [1], textureTransformMapping, textureCoordinateMapping);
#endif
texCoord .stp /= texCoord .q;
if ((x3d_GeometryType == x3d_Geometry2D) && (gl_FrontFacing == false))
texCoord .s = 1.0 - texCoord .s;
return texCoord;
}
vec4
getTexture2D (const in int i, const in vec2 texCoord)
{
vec4 color = vec4 (0.0);
#if x3d_MaxTextures > 0
if (i == 0)
color = texture2D (x3d_Texture2D [0], texCoord);
#endif
#if x3d_MaxTextures > 1
else if (i == 1)
color = texture2D (x3d_Texture2D [1], texCoord);
#endif
return color;
}
vec4
getTextureCube (const in int i, const in vec3 texCoord)
{
vec4 color = vec4 (0.0);
#if x3d_MaxTextures > 0
if (i == 0)
color = textureCube (x3d_TextureCube [0], texCoord);
#endif
#if x3d_MaxTextures > 1
else if (i == 1)
color = textureCube (x3d_TextureCube [1], texCoord);
#endif
return color;
}
vec4
getTextureColor (const in vec4 diffuseColor, const in vec4 specularColor)
{
vec4 currentColor = diffuseColor;
for (int i = 0; i < x3d_MaxTextures; ++ i)
{
if (i == x3d_NumTextures)
break;
vec4 texCoord = getTexCoord (x3d_TextureCoordinateGenerator [i], i, i);
vec4 textureColor = vec4 (1.0);
texCoord .stp /= texCoord .q;
if ((x3d_GeometryType == x3d_Geometry2D) && (gl_FrontFacing == false))
texCoord .s = 1.0 - texCoord .s;
if (x3d_TextureType [i] == x3d_TextureType2D)
{
textureColor = getTexture2D (i, texCoord .st);
}
else if (x3d_TextureType [i] == x3d_TextureTypeCube)
{
textureColor = getTextureCube (i, texCoord .stp);
}
x3d_MultiTextureParameters multiTexture = x3d_MultiTexture [i];
vec4 arg1 = textureColor;
vec4 arg2 = currentColor;
int source = multiTexture .source;
if (source == x3d_Diffuse)
{
arg1 = diffuseColor;
}
else if (source == x3d_Specular)
{
arg1 = specularColor;
}
else if (source == x3d_Factor)
{
arg1 = x3d_MultiTextureColor;
}
int function = multiTexture .function;
if (function == x3d_Complement)
{
arg1 = 1.0 - arg1;
}
else if (function == x3d_AlphaReplicate)
{
arg1 .a = arg2 .a;
}
int mode = multiTexture .mode;
int alphaMode = multiTexture .alphaMode;
if (mode == x3d_Replace)
{
currentColor .rgb = arg1 .rgb;
}
else if (mode == x3d_Modulate)
{
currentColor .rgb = arg1 .rgb * arg2 .rgb;
}
else if (mode == x3d_Modulate2X)
{
currentColor .rgb = (arg1 .rgb * arg2 .rgb) * 2.0;
}
else if (mode == x3d_Modulate4X)
{
currentColor .rgb = (arg1 .rgb * arg2 .rgb) * 4.0;
}
else if (mode == x3d_Add)
{
currentColor .rgb = arg1 .rgb + arg2 .rgb;
}
else if (mode == x3d_AddSigned)
{
currentColor .rgb = arg1 .rgb + arg2 .rgb - 0.5;
}
else if (mode == x3d_AddSigned2X)
{
currentColor .rgb = (arg1 .rgb + arg2 .rgb - 0.5) * 2.0;
}
else if (mode == x3d_AddSmooth)
{
currentColor .rgb = arg1 .rgb + (1.0 - arg1 .rgb) * arg2 .rgb;
}
else if (mode == x3d_Subtract)
{
currentColor .rgb = arg1 .rgb - arg2 .rgb;
}
else if (mode == x3d_BlendDiffuseAlpha)
{
currentColor .rgb = arg1 .rgb * diffuseColor .a + arg2 .rgb * (1.0 - diffuseColor .a);
}
else if (mode == x3d_BlendTextureAlpha)
{
currentColor .rgb = arg1 .rgb * arg1 .a + arg2 .rgb * (1.0 - arg1 .a);
}
else if (mode == x3d_BlendFactorAlpha)
{
currentColor .rgb = arg1 .rgb * x3d_MultiTextureColor .a + arg2 .rgb * (1.0 - x3d_MultiTextureColor .a);
}
else if (mode == x3d_BlendCurrentAlpha)
{
currentColor .rgb = arg1 .rgb * arg2 .a + arg2 .rgb * (1.0 - arg2 .a);
}
else if (mode == x3d_ModulateAlphaAddColor)
{
currentColor .rgb = arg1 .rgb + arg1 .a * arg2 .rgb;
}
else if (mode == x3d_ModulateInvAlphaAddColor)
{
currentColor .rgb = (1.0 - arg1 .a) * arg2 .rgb + arg1 .rgb;
}
else if (mode == x3d_ModulateInvColorAddAlpha)
{
currentColor .rgb = (1.0 - arg1 .rgb) * arg2 .rgb + arg1 .a;
}
else if (mode == x3d_DotProduct3)
{
currentColor .rgb = vec3 (dot (arg1 .rgb * 2.0 - 1.0, arg2 .rgb * 2.0 - 1.0));
}
else if (mode == x3d_SelectArg1)
{
currentColor .rgb = arg1 .rgb;
}
else if (mode == x3d_SelectArg2)
{
currentColor .rgb = arg2 .rgb;
}
else if (mode == x3d_Off)
;
if (alphaMode == x3d_Replace)
{
currentColor .a = arg1 .a;
}
else if (alphaMode == x3d_Modulate)
{
currentColor .a = arg1 .a * arg2 .a;
}
else if (alphaMode == x3d_Modulate2X)
{
currentColor .a = (arg1 .a * arg2 .a) * 2.0;
}
else if (alphaMode == x3d_Modulate4X)
{
currentColor .a = (arg1 .a * arg2 .a) * 4.0;
}
else if (alphaMode == x3d_Add)
{
currentColor .a = arg1 .a + arg2 .a;
}
else if (alphaMode == x3d_AddSigned)
{
currentColor .a = arg1 .a + arg2 .a - 0.5;
}
else if (alphaMode == x3d_AddSigned2X)
{
currentColor .a = (arg1 .a + arg2 .a - 0.5) * 2.0;
}
else if (alphaMode == x3d_AddSmooth)
{
currentColor .a = arg1 .a + (1.0 - arg1 .a) * arg2 .a;
}
else if (alphaMode == x3d_Subtract)
{
currentColor .a = arg1 .a - arg2 .a;
}
else if (alphaMode == x3d_BlendDiffuseAlpha)
{
currentColor .a = arg1 .a * diffuseColor .a + arg2 .a * (1.0 - diffuseColor .a);
}
else if (alphaMode == x3d_BlendTextureAlpha)
{
currentColor .a = arg1 .a * arg1 .a + arg2 .a * (1.0 - arg1 .a);
}
else if (alphaMode == x3d_BlendFactorAlpha)
{
currentColor .a = arg1 .a * x3d_MultiTextureColor .a + arg2 .a * (1.0 - x3d_MultiTextureColor .a);
}
else if (alphaMode == x3d_BlendCurrentAlpha)
{
currentColor .a = arg1 .a * arg2 .a + arg2 .a * (1.0 - arg2 .a);
}
else if (alphaMode == x3d_ModulateAlphaAddColor)
{
currentColor .a = arg1 .a + arg1 .a * arg2 .a;
}
else if (alphaMode == x3d_ModulateInvAlphaAddColor)
{
currentColor .a = (1.0 - arg1 .a) * arg2 .a + arg1 .a;
}
else if (alphaMode == x3d_ModulateInvColorAddAlpha)
{
currentColor .a = (1.0 - arg1 .a) * arg2 .a + arg1 .a;
}
else if (alphaMode == x3d_DotProduct3)
{
currentColor .a = dot (arg1 .rgb * 2.0 - 1.0, arg2 .rgb * 2.0 - 1.0);
}
else if (alphaMode == x3d_SelectArg1)
{
currentColor .a = arg1 .a;
}
else if (alphaMode == x3d_SelectArg2)
{
currentColor .a = arg2 .a;
}
else if (alphaMode == x3d_Off)
;
}
return currentColor;
}
#ifdef X3D_PROJECTIVE_TEXTURE_MAPPING
vec4
getProjectiveTexture (const in int i, const in vec2 texCoord)
{
vec4 color = vec4 (0.0);
#if x3d_MaxTextures > 0
if (i == 0)
color = texture2D (x3d_ProjectiveTexture [0], texCoord);
#endif
#if x3d_MaxTextures > 1
else if (i == 1)
color = texture2D (x3d_ProjectiveTexture [1], texCoord);
#endif
return color;
}
vec4
getProjectiveTextureColor (in vec4 currentColor)
{
if (x3d_NumProjectiveTextures > 0)
{
vec3 N = gl_FrontFacing ? normal : -normal;
for (int i = 0; i < x3d_MaxTextures; ++ i)
{
if (i == x3d_NumProjectiveTextures)
break;
vec4 texCoord = x3d_ProjectiveTextureMatrix [i] * vec4 (vertex, 1.0);
texCoord .stp /= texCoord .q;
if (texCoord .s < 0.0 || texCoord .s > 1.0)
continue;
if (texCoord .t < 0.0 || texCoord .t > 1.0)
continue;
if (texCoord .p < 0.0 || texCoord .p > 1.0)
continue;
vec3 p = x3d_ProjectiveTextureLocation [i] - vertex;
if (dot (N, p) < 0.0)
continue;
currentColor *= getProjectiveTexture (i, texCoord .st);
}
}
return currentColor;
}
#else 
vec4
getProjectiveTextureColor (in vec4 currentColor)
{
return currentColor;
}
#endif 
#else 
vec4
getTexCoord (const in int textureTransformMapping, const in int textureCoordinateMapping)
{
return texCoord0;
}
vec4
getTextureColor (const in vec4 diffuseColor, const in vec4 specularColor)
{
vec4 texCoord = texCoord0;
vec4 textureColor = vec4 (1.0);
texCoord .stp /= texCoord .q;
if ((x3d_GeometryType == x3d_Geometry2D) && (gl_FrontFacing ? false : true))
texCoord .s = 1.0 - texCoord .s;
if (x3d_TextureType [0] == x3d_TextureType2D)
{
textureColor = texture2D (x3d_Texture2D [0], texCoord .st);
}
else if (x3d_TextureType [0] == x3d_TextureTypeCube)
{
textureColor = textureCube (x3d_TextureCube [0], texCoord .stp);
}
return diffuseColor * textureColor;
}
vec4
getProjectiveTextureColor (in vec4 currentColor)
{
return currentColor;
}
#endif 
#ifdef X3D_MATERIAL_TEXTURES
uniform x3d_NormalTextureParameters x3d_NormalTexture;
mat3
getTBNMatrix (const in vec2 texCoord)
{
vec3 pos_dx = dFdx (vertex);
vec3 pos_dy = dFdy (vertex);
vec3 tex_dx = dFdx (vec3 (texCoord, 0.0));
vec3 tex_dy = dFdy (vec3 (texCoord, 0.0));
vec3 t = (tex_dy .t * pos_dx - tex_dx .t * pos_dy) / (tex_dx .s * tex_dy.t - tex_dy .s * tex_dx .t);
vec3 N = normalize (normal); 
vec3 T = normalize (t - N * dot (N, t));
vec3 B = normalize (cross (N, T));
mat3 tbn = mat3 (T, B, N);
return tbn;
}
#endif
vec3
getNormalVector ()
{
float facing = gl_FrontFacing ? 1.0 : -1.0;
#if defined(X3D_NORMAL_TEXTURE) && !defined(X3D_NORMAL_TEXTURE_3D)
vec4 texCoord = getTexCoord (x3d_NormalTexture .textureTransformMapping, x3d_NormalTexture .textureCoordinateMapping);
vec3 normalScale = vec3 (vec2 (x3d_Material .normalScale), 1.0);
mat3 tbn = getTBNMatrix (texCoord .st);
#if defined(X3D_NORMAL_TEXTURE_2D)
vec3 n = texture2D (x3d_NormalTexture .texture2D, texCoord .st) .rgb;
#elif defined(X3D_NORMAL_TEXTURE_CUBE)
vec3 n = textureCube (x3d_NormalTexture .textureCube, texCoord .stp) .rgb;
#endif
return normalize (tbn * ((n * 2.0 - 1.0) * normalScale)) * facing;
#else
return normalize (normal) * facing;
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
#ifdef X3D_MATERIAL_TEXTURES
uniform x3d_BaseTextureParameters x3d_BaseTexture;
uniform x3d_EmissiveTextureParameters x3d_EmissiveTexture;
uniform x3d_MetallicRoughnessTextureParameters x3d_MetallicRoughnessTexture;
uniform x3d_OcclusionTextureParameters x3d_OcclusionTexture;
#endif
vec4
getBaseColor ()
{
float alpha = 1.0 - x3d_Material .transparency;
vec4 baseParameter = x3d_ColorMaterial ? vec4 (color .rgb, color .a * alpha) : vec4 (x3d_Material .baseColor, alpha);
#if defined(X3D_BASE_TEXTURE) && !defined(X3D_BASE_TEXTURE_3D)
vec4 texCoord = getTexCoord (x3d_BaseTexture .textureTransformMapping, x3d_BaseTexture .textureCoordinateMapping);
#if defined(X3D_BASE_TEXTURE_2D)
return baseParameter * SRGBtoLINEAR (texture2D (x3d_BaseTexture .texture2D, texCoord .st));
#elif defined(X3D_BASE_TEXTURE_CUBE)
return baseParameter * SRGBtoLINEAR (textureCube (x3d_BaseTexture .textureCube, texCoord .stp));
#endif
#else
return getTextureColor (baseParameter, vec4 (vec3 (1.0), alpha));
#endif
}
vec3
getEmissiveColor ()
{
vec3 emissiveParameter = x3d_Material .emissiveColor;
#if defined(X3D_EMISSIVE_TEXTURE) && !defined(X3D_EMISSIVE_TEXTURE_3D)
vec4 texCoord = getTexCoord (x3d_EmissiveTexture .textureTransformMapping, x3d_EmissiveTexture .textureCoordinateMapping);
#if defined(X3D_EMISSIVE_TEXTURE_2D)
return emissiveParameter * SRGBtoLINEAR (texture2D (x3d_EmissiveTexture .texture2D, texCoord .st)) .rgb;
#elif defined(X3D_EMISSIVE_TEXTURE_CUBE)
return emissiveParameter * SRGBtoLINEAR (textureCube (x3d_EmissiveTexture .textureCube, texCoord .stp)) .rgb;
#endif
#else
return emissiveParameter .rgb;
#endif
}
vec2
getMetallicRoughness ()
{
float metallic = x3d_Material .metallic;
float perceptualRoughness = x3d_Material .roughness;
#if defined(X3D_METALLIC_ROUGHNESS_TEXTURE) && !defined(X3D_METALLIC_ROUGHNESS_TEXTURE_3D)
vec4 texCoord = getTexCoord (x3d_MetallicRoughnessTexture .textureTransformMapping, x3d_MetallicRoughnessTexture .textureCoordinateMapping);
#if defined(X3D_METALLIC_ROUGHNESS_TEXTURE_2D)
vec4 mrSample = texture2D (x3d_MetallicRoughnessTexture .texture2D, texCoord .st);
#elif defined(X3D_METALLIC_ROUGHNESS_TEXTURE_CUBE)
vec4 mrSample = textureCube (x3d_MetallicRoughnessTexture .textureCube, texCoord .stp);
#endif
metallic *= mrSample .b;
perceptualRoughness *= mrSample .g;
return vec2 (metallic, perceptualRoughness);
#else
return vec2 (metallic, perceptualRoughness);
#endif
}
float
getOcclusionFactor ()
{
#if defined(X3D_OCCLUSION_TEXTURE) && !defined(X3D_OCCLUSION_TEXTURE_3D)
vec4 texCoord = getTexCoord (x3d_OcclusionTexture .textureTransformMapping, x3d_OcclusionTexture .textureCoordinateMapping);
#if defined(X3D_OCCLUSION_TEXTURE_2D)
return texture2D (x3d_OcclusionTexture .texture2D, texCoord .st) .r;
#elif defined(X3D_OCCLUSION_TEXTURE_CUBE)
return textureCube (x3d_OcclusionTexture .textureCube, texCoord .stp) .r;
#endif
#else
return 1.0;
#endif
}
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
#ifdef USE_IBL
vec3
getIBLContribution (const in PBRInfo pbrInputs, vec3 n, const in vec3 reflection)
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
diffuse (const in PBRInfo pbrInputs)
{
return pbrInputs .diffuseColor / M_PI;
}
vec3
specularReflection (const in PBRInfo pbrInputs)
{
return pbrInputs .reflectance0 + (pbrInputs .reflectance90 - pbrInputs .reflectance0) * pow (clamp (1.0 - pbrInputs .VdotH, 0.0, 1.0), 5.0);
}
float
geometricOcclusion (const in PBRInfo pbrInputs)
{
float NdotL = pbrInputs .NdotL;
float NdotV = pbrInputs .NdotV;
float r = pbrInputs .alphaRoughness;
float attenuationL = 2.0 * NdotL / (NdotL + sqrt (r * r + (1.0 - r * r) * (NdotL * NdotL)));
float attenuationV = 2.0 * NdotV / (NdotV + sqrt (r * r + (1.0 - r * r) * (NdotV * NdotV)));
return attenuationL * attenuationV;
}
float
microfacetDistribution (const in PBRInfo pbrInputs)
{
float roughnessSq = pbrInputs .alphaRoughness * pbrInputs .alphaRoughness;
float f = (pbrInputs .NdotH * roughnessSq - pbrInputs .NdotH) * pbrInputs .NdotH + 1.0;
return roughnessSq / (M_PI * f * f);
}
void
main ()
{
vec2 metallicRoughness = getMetallicRoughness ();
float perceptualRoughness = clamp (metallicRoughness [1], c_MinRoughness, 1.0);
float metallic = clamp (metallicRoughness [0], 0.0, 1.0);
float alphaRoughness = perceptualRoughness * perceptualRoughness;
vec4 baseColor = getBaseColor ();
if (baseColor .a < x3d_AlphaCutoff)
{
discard;
}
vec3 f0 = vec3 (0.04);
vec3 diffuseColor = baseColor .rgb * (vec3 (1.0) - f0);
diffuseColor *= 1.0 - metallic;
vec3 specularColor = mix (f0, baseColor .rgb, metallic);
float reflectance = max (max (specularColor .r, specularColor .g), specularColor .b);
float reflectance90 = clamp (reflectance * 25.0, 0.0, 1.0);
vec3 specularEnvironmentR0 = specularColor .rgb;
vec3 specularEnvironmentR90 = vec3 (1.0, 1.0, 1.0) * reflectance90;
vec3 n = getNormalVector (); 
vec3 v = normalize (-vertex); 
vec3 finalColor = vec3 (0.0);
for (int i = 0; i < x3d_MaxLights; i ++)
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
vec3 l = normalize (L); 
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
float attenuationFactor = di ? 1.0 : 1.0 / max (dot (c, vec3 (1.0, dL, dL * dL)), 1.0);
float spotFactor = light .type == x3d_SpotLight ? getSpotFactor (light .cutOffAngle, light .beamWidth, L, d) : 1.0;
float attenuationSpotFactor = attenuationFactor * spotFactor;
vec3 diffuseContrib = (1.0 - F) * diffuse (pbrInputs);
vec3 specContrib = F * G * D / (4.0 * NdotL * NdotV);
vec3 color = NdotL * attenuationSpotFactor * light .color * light .intensity * (diffuseContrib + specContrib);
finalColor += color;
}
}
#ifdef USE_IBL
vec3 reflection = -normalize (reflect (v, n));
finalColor += getIBLContribution (pbrInputs, n, reflection);
#endif
#ifdef X3D_OCCLUSION_TEXTURE
finalColor = mix (finalColor, finalColor * getOcclusionFactor (), x3d_Material .occlusionStrength);
#endif
finalColor += getEmissiveColor ();
gl_FragColor = Gamma (vec4 (finalColor, baseColor .a));
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
if (x3d_LogarithmicFarFactor1_2 > 0.0)
gl_FragDepth = log2 (depth) * x3d_LogarithmicFarFactor1_2;
else
gl_FragDepth = gl_FragCoord .z;
#endif
}
