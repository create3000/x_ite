#version 300 es
precision highp float;
precision highp int;
uniform int x3d_GeometryType;
uniform bool x3d_ColorMaterial; 
uniform float x3d_AlphaCutoff;
uniform int x3d_NumLights;
uniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];
uniform x3d_MaterialParameters x3d_Material;
in float fogDepth; 
in vec4 color; 
in vec3 normal; 
in vec3 vertex; 
in vec3 localNormal; 
in vec3 localVertex; 
#if x3d_MaxTextures > 0
in vec4 texCoord0;
#endif
#if x3d_MaxTextures > 1
in vec4 texCoord1;
#endif
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
uniform float x3d_LogarithmicFarFactor1_2;
in float depth;
#endif
out vec4 x3d_FragColor;
#ifdef TITANIA
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
#ifdef X_ITE
vec4
pack (const in float value)
{
const vec3 bitShifts = vec3 (255.0,
255.0 * 255.0,
255.0 * 255.0 * 255.0);
return vec4 (value, fract (value * bitShifts));
}
#ifdef X3D_DEPTH_TEXTURE
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
#ifdef X3D_SHADOWS
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
precision highp sampler3D;
uniform mat4 x3d_TextureMatrix [x3d_MaxTextures];
uniform int x3d_NumTextures;
uniform int x3d_TextureType [x3d_MaxTextures]; 
uniform sampler2D x3d_Texture2D [x3d_MaxTextures];
uniform sampler3D x3d_Texture3D [x3d_MaxTextures];
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
vec4
getTexCoord (const in int i)
{
switch (i)
{
#if x3d_MaxTextures > 0
case 0:
{
return texCoord0;
}
#endif
#if x3d_MaxTextures > 1
case 1:
{
return texCoord1;
}
#endif
default:
{
return vec4 (0.0);
}
}
}
vec4
getTexCoord (const in x3d_TextureCoordinateGeneratorParameters textureCoordinateGenerator, const in int textureTransformMapping, const in int textureCoordinateMapping)
{
int mode = textureCoordinateGenerator .mode;
switch (mode)
{
case x3d_None:
{
return x3d_TextureMatrix [textureTransformMapping] * getTexCoord (textureCoordinateMapping);
}
case x3d_Sphere:
{
vec2 N = normalize (gl_FrontFacing ? normal : -normal) .xy;
return vec4 (N / 2.0 + 0.5, 0.0, 1.0);
}
case x3d_CameraSpaceNormal:
{
vec3 N = normalize (gl_FrontFacing ? normal : -normal);
return vec4 (N, 1.0);
}
case x3d_CameraSpacePosition:
{
return vec4 (vertex, 1.0);
}
case x3d_CameraSpaceReflectionVector:
{
vec3 N = normalize (gl_FrontFacing ? normal : -normal);
return vec4 (reflect (normalize (vertex), -N), 1.0);
}
case x3d_SphereLocal:
{
vec2 N = normalize (gl_FrontFacing ? localNormal : -localNormal) .xy;
return vec4 (N / 2.0 + 0.5, 0.0, 1.0);
}
case x3d_Coord:
{
return vec4 (localVertex, 1.0);
}
case x3d_CoordEye:
{
return vec4 (vertex, 1.0);
}
case x3d_Noise:
{
vec3 scale = vec3 (textureCoordinateGenerator .parameter [0], textureCoordinateGenerator .parameter [1], textureCoordinateGenerator .parameter [2]);
vec3 translation = vec3 (textureCoordinateGenerator .parameter [3], textureCoordinateGenerator .parameter [4], textureCoordinateGenerator .parameter [5]);
return vec4 (perlin (localVertex * scale + translation), 1.0);
}
case x3d_NoiseEye:
{
vec3 scale = vec3 (textureCoordinateGenerator .parameter [0], textureCoordinateGenerator .parameter [1], textureCoordinateGenerator .parameter [2]);
vec3 translation = vec3 (textureCoordinateGenerator .parameter [3], textureCoordinateGenerator .parameter [4], textureCoordinateGenerator .parameter [5]);
return vec4 (perlin (vertex * scale + translation), 1.0);
}
case x3d_SphereReflect:
{
vec3 N = normalize (gl_FrontFacing ? normal : -normal);
float eta = textureCoordinateGenerator .parameter [0];
return vec4 (refract (normalize (vertex), -N, eta), 1.0);
}
case x3d_SphereReflectLocal:
{
vec3 N = normalize (gl_FrontFacing ? localNormal : -localNormal);
float eta = textureCoordinateGenerator .parameter [0];
vec3 eye = vec3 (textureCoordinateGenerator .parameter [1], textureCoordinateGenerator .parameter [2], textureCoordinateGenerator .parameter [3]);
return vec4 (refract (normalize (localVertex - eye), -N, eta), 1.0);
}
default:
{
return x3d_TextureMatrix [textureTransformMapping] * getTexCoord (textureCoordinateMapping);
}
}
}
vec4
getTexCoord (const in int textureTransformMapping, const in int textureCoordinateMapping)
{
vec4 texCoord = getTexCoord (x3d_TextureCoordinateGenerator [textureCoordinateMapping], textureTransformMapping, textureCoordinateMapping);
texCoord .stp /= texCoord .q;
if ((x3d_GeometryType == x3d_Geometry2D) && (gl_FrontFacing == false))
texCoord .s = 1.0 - texCoord .s;
return texCoord;
}
vec4
getTexture2D (const in int i, const in vec2 texCoord)
{
switch (i)
{
#if x3d_MaxTextures > 0
case 0:
{
return texture (x3d_Texture2D [0], texCoord);
}
#endif
#if x3d_MaxTextures > 1
case 1:
{
return texture (x3d_Texture2D [1], texCoord);
}
#endif
default:
{
return vec4 (0.0);
}
}
}
vec4
getTexture3D (const in int i, const in vec3 texCoord)
{
switch (i)
{
#if x3d_MaxTextures > 0
case 0:
{
return texture (x3d_Texture3D [0], texCoord);
}
#endif
#if x3d_MaxTextures > 1
case 1:
{
return texture (x3d_Texture3D [1], texCoord);
}
#endif
default:
{
return vec4 (0.0);
}
}
}
vec4
getTextureCube (const in int i, const in vec3 texCoord)
{
switch (i)
{
#if x3d_MaxTextures > 0
case 0:
{
return texture (x3d_TextureCube [0], texCoord);
}
#endif
#if x3d_MaxTextures > 1
case 1:
{
return texture (x3d_TextureCube [1], texCoord);
}
#endif
default:
{
return vec4 (0.0);
}
}
}
vec4
getTextureColor (const in vec4 diffuseColor, const in vec4 specularColor)
{
vec4 currentColor = diffuseColor;
for (int i = 0; i < x3d_MaxTextures; ++ i)
{
if (i == x3d_NumTextures)
break;
vec4 texCoord = getTexCoord (i, i);
vec4 textureColor = vec4 (1.0);
switch (x3d_TextureType [i])
{
case x3d_TextureType2D:
{
textureColor = getTexture2D (i, texCoord .st);
break;
}
case x3d_TextureType3D:
{
textureColor = getTexture3D (i, texCoord .stp);
break;
}
case x3d_TextureTypeCube:
{
textureColor = getTextureCube (i, texCoord .stp);
break;
}
}
x3d_MultiTextureParameters multiTexture = x3d_MultiTexture [i];
vec4 arg1 = textureColor;
vec4 arg2 = currentColor;
int source = multiTexture .source;
switch (source)
{
case x3d_Diffuse:
{
arg1 = diffuseColor;
break;
}
case x3d_Specular:
{
arg1 = specularColor;
break;
}
case x3d_Factor:
{
arg1 = x3d_MultiTextureColor;
break;
}
}
int function = multiTexture .function;
switch (function)
{
case x3d_Complement:
{
arg1 = 1.0 - arg1;
break;
}
case x3d_AlphaReplicate:
{
arg1 .a = arg2 .a;
break;
}
}
int mode = multiTexture .mode;
int alphaMode = multiTexture .alphaMode;
switch (mode)
{
case x3d_Replace:
{
currentColor .rgb = arg1 .rgb;
break;
}
case x3d_Modulate:
{
currentColor .rgb = arg1 .rgb * arg2 .rgb;
break;
}
case x3d_Modulate2X:
{
currentColor .rgb = (arg1 .rgb * arg2 .rgb) * 2.0;
break;
}
case x3d_Modulate4X:
{
currentColor .rgb = (arg1 .rgb * arg2 .rgb) * 4.0;
break;
}
case x3d_Add:
{
currentColor .rgb = arg1 .rgb + arg2 .rgb;
break;
}
case x3d_AddSigned:
{
currentColor .rgb = arg1 .rgb + arg2 .rgb - 0.5;
break;
}
case x3d_AddSigned2X:
{
currentColor .rgb = (arg1 .rgb + arg2 .rgb - 0.5) * 2.0;
break;
}
case x3d_AddSmooth:
{
currentColor .rgb = arg1 .rgb + (1.0 - arg1 .rgb) * arg2 .rgb;
break;
}
case x3d_Subtract:
{
currentColor .rgb = arg1 .rgb - arg2 .rgb;
break;
}
case x3d_BlendDiffuseAlpha:
{
currentColor .rgb = arg1 .rgb * diffuseColor .a + arg2 .rgb * (1.0 - diffuseColor .a);
break;
}
case x3d_BlendTextureAlpha:
{
currentColor .rgb = arg1 .rgb * arg1 .a + arg2 .rgb * (1.0 - arg1 .a);
break;
}
case x3d_BlendFactorAlpha:
{
currentColor .rgb = arg1 .rgb * x3d_MultiTextureColor .a + arg2 .rgb * (1.0 - x3d_MultiTextureColor .a);
break;
}
case x3d_BlendCurrentAlpha:
{
currentColor .rgb = arg1 .rgb * arg2 .a + arg2 .rgb * (1.0 - arg2 .a);
break;
}
case x3d_ModulateAlphaAddColor:
{
currentColor .rgb = arg1 .rgb + arg1 .a * arg2 .rgb;
break;
}
case x3d_ModulateInvAlphaAddColor:
{
currentColor .rgb = (1.0 - arg1 .a) * arg2 .rgb + arg1 .rgb;
break;
}
case x3d_ModulateInvColorAddAlpha:
{
currentColor .rgb = (1.0 - arg1 .rgb) * arg2 .rgb + arg1 .a;
break;
}
case x3d_DotProduct3:
{
currentColor .rgb = vec3 (dot (arg1 .rgb * 2.0 - 1.0, arg2 .rgb * 2.0 - 1.0));
break;
}
case x3d_SelectArg1:
{
currentColor .rgb = arg1 .rgb;
break;
}
case x3d_SelectArg2:
{
currentColor .rgb = arg2 .rgb;
break;
}
case x3d_Off:
{
break;
}
}
switch (alphaMode)
{
case x3d_Replace:
{
currentColor .a = arg1 .a;
break;
}
case x3d_Modulate:
{
currentColor .a = arg1 .a * arg2 .a;
break;
}
case x3d_Modulate2X:
{
currentColor .a = (arg1 .a * arg2 .a) * 2.0;
break;
}
case x3d_Modulate4X:
{
currentColor .a = (arg1 .a * arg2 .a) * 4.0;
break;
}
case x3d_Add:
{
currentColor .a = arg1 .a + arg2 .a;
break;
}
case x3d_AddSigned:
{
currentColor .a = arg1 .a + arg2 .a - 0.5;
break;
}
case x3d_AddSigned2X:
{
currentColor .a = (arg1 .a + arg2 .a - 0.5) * 2.0;
break;
}
case x3d_AddSmooth:
{
currentColor .a = arg1 .a + (1.0 - arg1 .a) * arg2 .a;
break;
}
case x3d_Subtract:
{
currentColor .a = arg1 .a - arg2 .a;
break;
}
case x3d_BlendDiffuseAlpha:
{
currentColor .a = arg1 .a * diffuseColor .a + arg2 .a * (1.0 - diffuseColor .a);
break;
}
case x3d_BlendTextureAlpha:
{
currentColor .a = arg1 .a * arg1 .a + arg2 .a * (1.0 - arg1 .a);
break;
}
case x3d_BlendFactorAlpha:
{
currentColor .a = arg1 .a * x3d_MultiTextureColor .a + arg2 .a * (1.0 - x3d_MultiTextureColor .a);
break;
}
case x3d_BlendCurrentAlpha:
{
currentColor .a = arg1 .a * arg2 .a + arg2 .a * (1.0 - arg2 .a);
break;
}
case x3d_ModulateAlphaAddColor:
{
currentColor .a = arg1 .a + arg1 .a * arg2 .a;
break;
}
case x3d_ModulateInvAlphaAddColor:
{
currentColor .a = (1.0 - arg1 .a) * arg2 .a + arg1 .a;
break;
}
case x3d_ModulateInvColorAddAlpha:
{
currentColor .a = (1.0 - arg1 .a) * arg2 .a + arg1 .a;
break;
}
case x3d_DotProduct3:
{
currentColor .a = dot (arg1 .rgb * 2.0 - 1.0, arg2 .rgb * 2.0 - 1.0);
break;
}
case x3d_SelectArg1:
{
currentColor .a = arg1 .a;
break;
}
case x3d_SelectArg2:
{
currentColor .a = arg2 .a;
break;
}
case x3d_Off:
{
break;
}
}
}
return currentColor;
}
#ifdef X3D_PROJECTIVE_TEXTURE_MAPPING
vec4
getProjectiveTexture (const in int i, const in vec2 texCoord)
{
switch (i)
{
#if x3d_MaxTextures > 0
case 0:
{
return texture (x3d_ProjectiveTexture [0], texCoord);
}
#endif
#if x3d_MaxTextures > 1
case 1:
{
return texture (x3d_ProjectiveTexture [1], texCoord);
}
#endif
default:
{
return vec4 (0.0);
}
}
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
switch (x3d_TextureType [0])
{
case x3d_TextureType2D:
{
textureColor = texture (x3d_Texture2D [0], texCoord .st);
break;
}
case x3d_TextureType3D:
{
textureColor = texture (x3d_Texture3D [0], texCoord .stp);
break;
}
case x3d_TextureTypeCube:
{
textureColor = texture (x3d_TextureCube [0], texCoord .stp);
break;
}
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
#if defined(X3D_NORMAL_TEXTURE)
vec4 texCoord = getTexCoord (x3d_NormalTexture .textureTransformMapping, x3d_NormalTexture .textureCoordinateMapping);
vec3 normalScale = vec3 (vec2 (x3d_Material .normalScale), 1.0);
mat3 tbn = getTBNMatrix (texCoord .st);
#if defined(X3D_NORMAL_TEXTURE_2D)
vec3 n = texture (x3d_NormalTexture .texture2D, texCoord .st) .rgb;
#elif defined(X3D_NORMAL_TEXTURE_3D)
vec3 n = texture (x3d_NormalTexture .texture3D, texCoord .stp) .rgb;
#elif defined(X3D_NORMAL_TEXTURE_CUBE)
vec3 n = texture (x3d_NormalTexture .textureCube, texCoord .stp) .rgb;
#endif
return normalize (tbn * ((n * 2.0 - 1.0) * normalScale)) * facing;
#else
return normalize (normal) * facing;
#endif
}
uniform x3d_FillPropertiesParameters x3d_FillProperties;
vec4
getHatchColor (vec4 color)
{
vec4 finalColor = x3d_FillProperties .filled ? color : vec4 (0.0);
if (x3d_FillProperties .hatched)
{
vec4 hatch = texture (x3d_FillProperties .hatchStyle, gl_FragCoord .xy / 32.0);
hatch .rgb *= x3d_FillProperties .hatchColor;
finalColor = mix (finalColor, hatch, hatch .a);
}
return finalColor;
}
uniform x3d_FogParameters x3d_Fog;
float
getFogInterpolant ()
{
if (x3d_Fog .type == x3d_None)
return 1.0;
if (x3d_Fog .fogCoord)
return clamp (1.0 - fogDepth, 0.0, 1.0);
float visibilityRange = x3d_Fog .visibilityRange;
if (visibilityRange <= 0.0)
return 1.0;
float dV = length (x3d_Fog .matrix * vertex);
if (dV >= visibilityRange)
return 0.0;
switch (x3d_Fog .type)
{
case x3d_LinearFog:
{
return (visibilityRange - dV) / visibilityRange;
}
case x3d_ExponentialFog:
{
return exp (-dV / (visibilityRange - dV));
}
default:
{
return 1.0;
}
}
}
vec3
getFogColor (const in vec3 color)
{
return mix (x3d_Fog .color, color, getFogInterpolant ());
}
uniform int x3d_NumClipPlanes;
uniform vec4 x3d_ClipPlane [x3d_MaxClipPlanes];
void
clip ()
{
for (int i = 0; i < x3d_MaxClipPlanes; ++ i)
{
if (i == x3d_NumClipPlanes)
break;
if (dot (vertex, x3d_ClipPlane [i] .xyz) - x3d_ClipPlane [i] .w < 0.0)
discard;
}
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
uniform x3d_AmbientTextureParameters x3d_AmbientTexture;
uniform x3d_DiffuseTextureParameters x3d_DiffuseTexture;
uniform x3d_SpecularTextureParameters x3d_SpecularTexture;
uniform x3d_EmissiveTextureParameters x3d_EmissiveTexture;
uniform x3d_ShininessTextureParameters x3d_ShininessTexture;
uniform x3d_OcclusionTextureParameters x3d_OcclusionTexture;
#endif
vec3
getAmbientColor (in vec3 diffuseColor)
{
vec3 ambientParameter = x3d_Material .ambientIntensity * diffuseColor;
#if defined(X3D_AMBIENT_TEXTURE)
vec4 texCoord = getTexCoord (x3d_AmbientTexture .textureTransformMapping, x3d_AmbientTexture .textureCoordinateMapping);
#if defined(X3D_AMBIENT_TEXTURE_2D)
return ambientParameter * texture (x3d_AmbientTexture .texture2D, texCoord .st) .rgb;
#elif defined(X3D_AMBIENT_TEXTURE_3D)
return ambientParameter * texture (x3d_AmbientTexture .texture3D, texCoord .stp) .rgb;
#elif defined(X3D_AMBIENT_TEXTURE_CUBE)
return ambientParameter * texture (x3d_AmbientTexture .textureCube, texCoord .stp) .rgb;
#endif
#else
return ambientParameter;
#endif
}
vec4
getDiffuseColor ()
{
float alpha = 1.0 - x3d_Material .transparency;
vec4 diffuseParameter = x3d_ColorMaterial ? vec4 (color .rgb, color .a * alpha) : vec4 (x3d_Material .diffuseColor, alpha);
#if defined(X3D_DIFFUSE_TEXTURE)
vec4 texCoord = getTexCoord (x3d_DiffuseTexture .textureTransformMapping, x3d_DiffuseTexture .textureCoordinateMapping);
#if defined(X3D_DIFFUSE_TEXTURE_2D)
return diffuseParameter * texture (x3d_DiffuseTexture .texture2D, texCoord .st) .rgba;
#elif defined(X3D_DIFFUSE_TEXTURE_3D)
return diffuseParameter * texture (x3d_DiffuseTexture .texture3D, texCoord .stp) .rgba;
#elif defined(X3D_DIFFUSE_TEXTURE_CUBE)
return diffuseParameter * texture (x3d_DiffuseTexture .textureCube, texCoord .stp) .rgba;
#endif
#else
return getTextureColor (diffuseParameter, vec4 (x3d_Material .specularColor, alpha));
#endif
}
vec3
getSpecularColor ()
{
vec3 specularParameter = x3d_Material .specularColor;
#if defined(X3D_SPECULAR_TEXTURE)
vec4 texCoord = getTexCoord (x3d_SpecularTexture .textureTransformMapping, x3d_SpecularTexture .textureCoordinateMapping);
#if defined(X3D_SPECULAR_TEXTURE_2D)
return specularParameter * texture (x3d_SpecularTexture .texture2D, texCoord .st) .rgb;
#elif defined(X3D_SPECULAR_TEXTURE_3D)
return specularParameter * texture (x3d_SpecularTexture .texture3D, texCoord .stp) .rgb;
#elif defined(X3D_SPECULAR_TEXTURE_CUBE)
return specularParameter * texture (x3d_SpecularTexture .textureCube, texCoord .stp) .rgb;
#endif
#else
return specularParameter;
#endif
}
vec3
getEmissiveColor ()
{
vec3 emissiveParameter = x3d_Material .emissiveColor;
#if defined(X3D_EMISSIVE_TEXTURE)
vec4 texCoord = getTexCoord (x3d_EmissiveTexture .textureTransformMapping, x3d_EmissiveTexture .textureCoordinateMapping);
#if defined(X3D_EMISSIVE_TEXTURE_2D)
return emissiveParameter * texture (x3d_EmissiveTexture .texture2D, texCoord .st) .rgb;
#elif defined(X3D_EMISSIVE_TEXTURE_3D)
return emissiveParameter * texture (x3d_EmissiveTexture .texture3D, texCoord .stp) .rgb;
#elif defined(X3D_EMISSIVE_TEXTURE_CUBE)
return emissiveParameter * texture (x3d_EmissiveTexture .textureCube, texCoord .stp) .rgb;
#endif
#else
return emissiveParameter;
#endif
}
float
getShininessFactor ()
{
float shininess = x3d_Material .shininess;
#if defined(X3D_SHININESS_TEXTURE)
vec4 texCoord = getTexCoord (x3d_ShininessTexture .textureTransformMapping, x3d_ShininessTexture .textureCoordinateMapping);
#if defined(X3D_SHININESS_TEXTURE_2D)
return shininess * texture (x3d_ShininessTexture .texture2D, texCoord .st) .a * 128.0;
#elif defined(X3D_SHININESS_TEXTURE_3D)
return shininess * texture (x3d_ShininessTexture .texture3D, texCoord .stp) .a * 128.0;
#elif defined(X3D_SHININESS_TEXTURE_CUBE)
return shininess * texture (x3d_ShininessTexture .textureCube, texCoord .stp) .a * 128.0;
#endif
#else
return shininess * 128.0;
#endif
}
float
getOcclusionFactor ()
{
#if defined(X3D_OCCLUSION_TEXTURE)
vec4 texCoord = getTexCoord (x3d_OcclusionTexture .textureTransformMapping, x3d_OcclusionTexture .textureCoordinateMapping);
#if defined(X3D_OCCLUSION_TEXTURE_2D)
return texture (x3d_OcclusionTexture .texture2D, texCoord .st) .r;
#elif defined(X3D_OCCLUSION_TEXTURE_3D)
return texture (x3d_OcclusionTexture .texture3D, texCoord .stp) .r;
#elif defined(X3D_OCCLUSION_TEXTURE_CUBE)
return texture (x3d_OcclusionTexture .textureCube, texCoord .stp) .r;
#endif
#else
return 1.0;
#endif
}
vec4
getMaterialColor ()
{
vec3 N = getNormalVector ();
vec3 V = normalize (-vertex); 
vec4 diffuseColorAlpha = getDiffuseColor ();
float alpha = diffuseColorAlpha .a;
vec3 diffuseColor = diffuseColorAlpha .rgb;
vec3 ambientColor = getAmbientColor (diffuseColor);
vec3 specularColor = getSpecularColor ();
float shininessFactor = getShininessFactor ();
vec4 P = getProjectiveTextureColor (vec4 (1.0));
diffuseColor *= P .rgb;
alpha *= P .a;
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
vec3 H = normalize (L + V); 
float lightAngle = max (dot (N, L), 0.0); 
vec3 diffuseTerm = diffuseColor * lightAngle;
float specularFactor = shininessFactor > 0.0 ? pow (max (dot (N, H), 0.0), shininessFactor) : 1.0;
vec3 specularTerm = specularColor * specularFactor;
float attenuationFactor = di ? 1.0 : 1.0 / max (dot (c, vec3 (1.0, dL, dL * dL)), 1.0);
float spotFactor = light .type == x3d_SpotLight ? getSpotFactor (light .cutOffAngle, light .beamWidth, L, d) : 1.0;
float attenuationSpotFactor = attenuationFactor * spotFactor;
vec3 ambientTerm = light .ambientIntensity * ambientColor;
vec3 diffuseSpecularTerm = light .intensity * (diffuseTerm + specularTerm);
#ifdef X3D_SHADOWS
if (lightAngle > 0.0)
diffuseSpecularTerm = mix (diffuseSpecularTerm, light .shadowColor, getShadowIntensity (i, light));
#endif
finalColor += attenuationSpotFactor * light .color * (ambientTerm + diffuseSpecularTerm);
}
}
#ifdef X3D_OCCLUSION_TEXTURE
finalColor = mix (finalColor, finalColor * getOcclusionFactor (), x3d_Material .occlusionStrength);
#endif
finalColor += getEmissiveColor ();
return vec4 (finalColor, alpha);
}
void
main ()
{
clip ();
vec4 finalColor = vec4 (0.0);
finalColor = getMaterialColor ();
finalColor = getHatchColor (finalColor);
finalColor .rgb = getFogColor (finalColor .rgb);
if (finalColor .a < x3d_AlphaCutoff)
{
discard;
}
x3d_FragColor = finalColor;
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
if (x3d_LogarithmicFarFactor1_2 > 0.0)
gl_FragDepth = log2 (depth) * x3d_LogarithmicFarFactor1_2;
else
gl_FragDepth = gl_FragCoord .z;
#endif
#ifdef X3D_SHADOWS
#endif
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
#endif
}
