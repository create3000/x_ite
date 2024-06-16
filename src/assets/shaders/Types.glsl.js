import MaterialTextures from "./MaterialTextures.js";

export default /* glsl */ `
#if defined (X3D_FOG)
struct x3d_FogParameters {
   mediump int   type;
   mediump vec3  color;
   mediump float visibilityRange;
   mediump mat3  matrix;
};
#endif

//uniform x3d_FogParameters x3d_Fog;

#if defined (X3D_LIGHTING)
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
   #if defined (X3D_SHADOWS)
   mediump vec3  shadowColor;
   mediump float shadowIntensity;
   mediump float shadowBias;
   mediump mat4  shadowMatrix;
   mediump int   shadowMapSize;
   #endif
};
#endif

//uniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];

#if defined (X3D_USE_IBL)
struct x3d_EnvironmentLightSourceParameters {
   mediump vec3        color;
   mediump float       intensity;
   mediump float       ambientIntensity;
   mediump mat3        rotation;
   mediump samplerCube diffuseTexture;
   bool                diffuseTextureLinear;
   mediump samplerCube specularTexture;
   bool                specularTextureLinear;
   mediump int         specularTextureLevels;
   mediump sampler2D   GGXLUTTexture;

   #if defined (X3D_SHEEN_MATERIAL_EXT)
      mediump sampler2D CharlieLUTTexture;
   #endif
};
#endif

//uniform x3d_EnvironmentLightSourceParameters x3d_EnvironmentLightSource;

#if defined (X3D_GEOMETRY_0D) && defined (X3D_STYLE_PROPERTIES)
struct x3d_PointPropertiesParameters
{
   mediump float pointSizeScaleFactor;
   mediump float pointSizeMinValue;
   mediump float pointSizeMaxValue;
   mediump vec3  attenuation;
};
#endif

//uniform x3d_PointPropertiesParameters x3d_PointProperties;

#if defined (X3D_GEOMETRY_1D) && defined (X3D_STYLE_PROPERTIES)
struct x3d_LinePropertiesParameters
{
   mediump int   linetype;
   mediump float lineStippleScale;
   #if defined (X3D_STYLE_PROPERTIES_TEXTURE)
   sampler2D     texture;
   #endif
};
#endif

//uniform x3d_LinePropertiesParameters x3d_LineProperties;

#if (defined (X3D_GEOMETRY_2D) || defined (X3D_GEOMETRY_3D)) && defined (X3D_STYLE_PROPERTIES)
struct x3d_FillPropertiesParameters
{
   bool          filled;
   bool          hatched;
   mediump vec3  hatchColor;
   #if defined (X3D_STYLE_PROPERTIES_TEXTURE)
   sampler2D     texture;
   #endif
   mediump float scale;
};
#endif

//uniform x3d_FillPropertiesParameters x3d_FillProperties;

#if defined (X3D_UNLIT_MATERIAL)
struct x3d_UnlitMaterialParameters
{
   mediump vec3  emissiveColor;
   mediump float normalScale;
   mediump float transparency;
};
#endif

//uniform x3d_UnlitMaterialParameters x3d_Material;

#if defined (X3D_MATERIAL)
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
#endif

//uniform x3d_MaterialParameters x3d_Material;

#if defined (X3D_PHYSICAL_MATERIAL)
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
#endif

//uniform x3d_PhysicalMaterialParameters x3d_Material;

${MaterialTextures .map (name => /* glsl */ `

#if defined (${name .replace (/([a-z])([A-Z])/g, "$1_$2") .toUpperCase ()})
struct ${name .replace (/(EXT)?$/, "Parameters$1")}
{
   mediump int         textureTransformMapping;
   mediump int         textureCoordinateMapping;
   #if defined (${name .replace (/([a-z])([A-Z])/g, "$1_$2") .toUpperCase ()}_2D)
   mediump sampler2D   texture2D;
   #endif
   #if defined (${name .replace (/([a-z])([A-Z])/g, "$1_$2") .toUpperCase ()}_3D) && __VERSION__ != 100
   mediump sampler3D   texture3D;
   #endif
   #if defined (${name .replace (/([a-z])([A-Z])/g, "$1_$2") .toUpperCase ()}_CUBE)
   mediump samplerCube textureCube;
   #endif
};
#endif

//uniform x3d_AmbientTextureParameters x3d_AmbientTexture;

`) .join ("\n")}

//uniform x3d_SpecularColorTextureParametersEXT x3d_SpecularColorTextureEXT;

#if defined (X3D_MULTI_TEXTURING)
struct x3d_MultiTextureParameters
{
   mediump int mode;
   mediump int alphaMode;
   mediump int source;
   mediump int function;
};
#endif

//uniform x3d_MultiTextureParameters x3d_MultiTexture [x3d_MaxTextures];

#if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)
struct x3d_TextureCoordinateGeneratorParameters
{
   mediump int   mode;
   mediump float parameter [6];
};
#endif

//uniform x3d_TextureCoordinateGeneratorParameters x3d_TextureCoordinateGenerator [x3d_MaxTextures];
`;
