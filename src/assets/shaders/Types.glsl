struct x3d_FogParameters {
   mediump int   type;
   mediump vec3  color;
   mediump float visibilityRange;
   mediump mat3  matrix;
   bool          fogCoord;
};

//uniform x3d_FogParameters x3d_Fog;

struct x3d_LightSourceParameters {
   mediump int   type;
   mediump vec3  color;
   mediump float intensity;
   mediump float ambientIntensity;
   mediump vec3  attenuation;
   mediump vec3  location;
   mediump vec3  direction;
   mediump float radius;
   mediump float beamWidth;
   mediump float cutOffAngle;
   mediump mat3  matrix;
   #ifdef X3D_SHADOWS
   mediump vec3  shadowColor;
   mediump float shadowIntensity;
   mediump float shadowBias;
   mediump mat4  shadowMatrix;
   mediump int   shadowMapSize;
   #endif
};

//uniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];

struct x3d_PointPropertiesParameters
{
   mediump float pointSizeScaleFactor;
   mediump float pointSizeMinValue;
   mediump float pointSizeMaxValue;
   mediump vec3  pointSizeAttenuation;
};

//uniform x3d_PointPropertiesParameters x3d_PointProperties;

struct x3d_LinePropertiesParameters
{
   bool          applied;
   mediump float linewidthScaleFactor;
   sampler2D     linetype;
};

//uniform x3d_LinePropertiesParameters x3d_LineProperties;

struct x3d_FillPropertiesParameters
{
   bool         filled;
   bool         hatched;
   mediump vec3 hatchColor;
   sampler2D    hatchStyle;
};

//uniform x3d_FillPropertiesParameters x3d_FillProperties;

struct x3d_UnlitMaterialParameters
{
   mediump vec3  emissiveColor;
   mediump float normalScale;
   mediump float transparency;
};

//uniform x3d_UnlitMaterialParameters x3d_Material;

struct x3d_MaterialParameters
{
   mediump float ambientIntensity;
   mediump vec3  diffuseColor;
   mediump vec3  specularColor;
   mediump vec3  emissiveColor;
   mediump float shininess;
   mediump float occlusionStrength;
   mediump float normalScale;
   mediump float transparency;
};

//uniform x3d_MaterialParameters x3d_Material;

struct x3d_PhysicalMaterialParameters
{
   mediump vec3  baseColor;
   mediump vec3  emissiveColor;
   mediump float metallic;
   mediump float roughness;
   mediump float occlusionStrength;
   mediump float normalScale;
   mediump float transparency;
};

//uniform x3d_PhysicalMaterialParameters x3d_Material;

#ifdef X3D_MATERIAL_TEXTURES
struct x3d_AmbientTextureParameters
{
   mediump int         textureType;
   mediump int         textureTransformMapping;
   mediump int         textureCoordinateMapping;
   #ifdef X3D_AMBIENT_TEXTURE_2D
   mediump sampler2D   texture2D;
   #endif
   #if defined(X3D_AMBIENT_TEXTURE_3D) && __VERSION__ != 100
   mediump sampler3D   texture3D;
   #endif
   #ifdef X3D_AMBIENT_TEXTURE_CUBE
   mediump samplerCube textureCube;
   #endif
};

struct x3d_DiffuseTextureParameters
{
   mediump int         textureType;
   mediump int         textureTransformMapping;
   mediump int         textureCoordinateMapping;
   #ifdef X3D_DIFFUSE_TEXTURE_2D
   mediump sampler2D   texture2D;
   #endif
   #if defined(X3D_DIFFUSE_TEXTURE_3D) && __VERSION__ != 100
   mediump sampler3D   texture3D;
   #endif
   #ifdef X3D_DIFFUSE_TEXTURE_CUBE
   mediump samplerCube textureCube;
   #endif
};

struct x3d_SpecularTextureParameters
{
   mediump int         textureType;
   mediump int         textureTransformMapping;
   mediump int         textureCoordinateMapping;
   #ifdef X3D_SPECULAR_TEXTURE_2D
   mediump sampler2D   texture2D;
   #endif
   #if defined(X3D_SPECULAR_TEXTURE_3D) && __VERSION__ != 100
   mediump sampler3D   texture3D;
   #endif
   #ifdef X3D_SPECULAR_TEXTURE_CUBE
   mediump samplerCube textureCube;
   #endif
};

struct x3d_EmissiveTextureParameters
{
   mediump int         textureType;
   mediump int         textureTransformMapping;
   mediump int         textureCoordinateMapping;
   #ifdef X3D_EMISSIVE_TEXTURE_2D
   mediump sampler2D   texture2D;
   #endif
   #if defined(X3D_EMISSIVE_TEXTURE_3D) && __VERSION__ != 100
   mediump sampler3D   texture3D;
   #endif
   #ifdef X3D_EMISSIVE_TEXTURE_CUBE
   mediump samplerCube textureCube;
   #endif
};

struct x3d_ShininessTextureParameters
{
   mediump int         textureType;
   mediump int         textureTransformMapping;
   mediump int         textureCoordinateMapping;
   #ifdef X3D_SHININESS_TEXTURE_2D
   mediump sampler2D   texture2D;
   #endif
   #if defined(X3D_SHININESS_TEXTURE_3D) && __VERSION__ != 100
   mediump sampler3D   texture3D;
   #endif
   #ifdef X3D_SHININESS_TEXTURE_CUBE
   mediump samplerCube textureCube;
   #endif
};

struct x3d_BaseTextureParameters
{
   mediump int         textureType;
   mediump int         textureTransformMapping;
   mediump int         textureCoordinateMapping;
   #ifdef X3D_BASE_TEXTURE_2D
   mediump sampler2D   texture2D;
   #endif
   #if defined(X3D_BASE_TEXTURE_3D) && __VERSION__ != 100
   mediump sampler3D   texture3D;
   #endif
   #ifdef X3D_BASE_TEXTURE_CUBE
   mediump samplerCube textureCube;
   #endif
};

struct x3d_MetallicRoughnessTextureParameters
{
   mediump int         textureType;
   mediump int         textureTransformMapping;
   mediump int         textureCoordinateMapping;
   #ifdef X3D_METALLIC_ROUGHNESS_TEXTURE_2D
   mediump sampler2D   texture2D;
   #endif
   #if defined(X3D_METALLIC_ROUGHNESS_TEXTURE_3D) && __VERSION__ != 100
   mediump sampler3D   texture3D;
   #endif
   #ifdef X3D_METALLIC_ROUGHNESS_TEXTURE_CUBE
   mediump samplerCube textureCube;
   #endif
};

struct x3d_OcclusionTextureParameters
{
   mediump int         textureType;
   mediump int         textureTransformMapping;
   mediump int         textureCoordinateMapping;
   #ifdef X3D_OCCLUSION_TEXTURE_2D
   mediump sampler2D   texture2D;
   #endif
   #if defined(X3D_OCCLUSION_TEXTURE_3D) && __VERSION__ != 100
   mediump sampler3D   texture3D;
   #endif
   #ifdef X3D_OCCLUSION_TEXTURE_CUBE
   mediump samplerCube textureCube;
   #endif
};

struct x3d_NormalTextureParameters
{
   mediump int         textureType;
   mediump int         textureTransformMapping;
   mediump int         textureCoordinateMapping;
   #ifdef X3D_NORMAL_TEXTURE_2D
   mediump sampler2D   texture2D;
   #endif
   #if defined(X3D_NORMAL_TEXTURE_3D) && __VERSION__ != 100
   mediump sampler3D   texture3D;
   #endif
   #ifdef X3D_NORMAL_TEXTURE_CUBE
   mediump samplerCube textureCube;
   #endif
};
#endif // X3D_MATERIAL_TEXTURES

struct x3d_MultiTextureParameters
{
   mediump int mode;
   mediump int alphaMode;
   mediump int source;
   mediump int function;
};

//uniform x3d_MultiTextureParameters x3d_MultiTexture [x3d_MaxTextures];

struct x3d_TextureCoordinateGeneratorParameters
{
   mediump int   mode;
   mediump float parameter [6];
};

//uniform x3d_TextureCoordinateGeneratorParameters x3d_TextureCoordinateGenerator [x3d_MaxTextures];

struct x3d_ParticleParameters
{
   mediump int   id;
   mediump int   life;
   mediump float elapsedTime;
};

//uniform x3d_ParticleParameters x3d_Particle;
