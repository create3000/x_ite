import MaterialTextures                   from "./MaterialTextures.js";
import MultiTextureModeType               from "../../x_ite/Browser/Texturing/ModeType.js";
import MultiTextureSourceType             from "../../x_ite/Browser/Texturing/SourceType.js";
import MultiTextureFunctionType           from "../../x_ite/Browser/Texturing/FunctionType.js";
import TextureCoordinateGeneratorModeType from "../../x_ite/Browser/Texturing/TextureCoordinateGeneratorModeType.js";
import { maxClipPlanes }                  from "../../x_ite/Browser/Rendering/RenderingConfiguration.js";
import { maxTextures }                    from "../../x_ite/Browser/Texturing/TexturingConfiguration.js";

export default /* glsl */ `

///
/// Defines
///

#define X_ITE

#define x3d_None 0

#define x3d_Points      0
#define x3d_Lines       1
#define x3d_Geometry2D  2
#define x3d_Geometry3D  3

#define x3d_MaxClipPlanes  ${maxClipPlanes}

#define x3d_LinearFog        1
#define x3d_ExponentialFog   2
#define x3d_Exponential2Fog  3

#define x3d_DirectionalLight  1
#define x3d_PointLight        2
#define x3d_SpotLight         3

#define x3d_MaxTextures      ${maxTextures}
#define x3d_TextureType2D    2
#define x3d_TextureType3D    3
#define x3d_TextureTypeCube  4

#define x3d_Replace                   ${MultiTextureModeType .REPLACE}
#define x3d_Modulate                  ${MultiTextureModeType .MODULATE}
#define x3d_Modulate2X                ${MultiTextureModeType .MODULATE2X}
#define x3d_Modulate4X                ${MultiTextureModeType .MODULATE4X}
#define x3d_Add                       ${MultiTextureModeType .ADD}
#define x3d_AddSigned                 ${MultiTextureModeType .ADDSIGNED}
#define x3d_AddSigned2X               ${MultiTextureModeType .ADDSIGNED2X}
#define x3d_AddSmooth                 ${MultiTextureModeType .ADDSMOOTH}
#define x3d_Subtract                  ${MultiTextureModeType .SUBTRACT}
#define x3d_BlendDiffuseAlpha         ${MultiTextureModeType .BLENDDIFFUSEALPHA}
#define x3d_BlendTextureAlpha         ${MultiTextureModeType .BLENDTEXTUREALPHA}
#define x3d_BlendFactorAlpha          ${MultiTextureModeType .BLENDFACTORALPHA}
#define x3d_BlendCurrentAlpha         ${MultiTextureModeType .BLENDCURRENTALPHA}
#define x3d_ModulateAlphaAddColor     ${MultiTextureModeType .MODULATEALPHA_ADDCOLOR}
#define x3d_ModulateInvAlphaAddColor  ${MultiTextureModeType .MODULATEINVALPHA_ADDCOLOR}
#define x3d_ModulateInvColorAddAlpha  ${MultiTextureModeType .MODULATEINVCOLOR_ADDALPHA}
#define x3d_DotProduct3               ${MultiTextureModeType .DOTPRODUCT3}
#define x3d_SelectArg1                ${MultiTextureModeType .SELECTARG1}
#define x3d_SelectArg2                ${MultiTextureModeType .SELECTARG2}
#define x3d_Off                       ${MultiTextureModeType .OFF}

#define x3d_Diffuse  ${MultiTextureSourceType .DIFFUSE}
#define x3d_Specular ${MultiTextureSourceType .SPECULAR}
#define x3d_Factor   ${MultiTextureSourceType .FACTOR}

#define x3d_Complement     ${MultiTextureFunctionType .COMPLEMENT}
#define x3d_AlphaReplicate ${MultiTextureFunctionType .ALPHAREPLICATE}

#define x3d_Sphere                      ${TextureCoordinateGeneratorModeType .SPHERE}
#define x3d_CameraSpaceNormal           ${TextureCoordinateGeneratorModeType .CAMERASPACENORMAL}
#define x3d_CameraSpacePosition         ${TextureCoordinateGeneratorModeType .CAMERASPACEPOSITION}
#define x3d_CameraSpaceReflectionVector ${TextureCoordinateGeneratorModeType .CAMERASPACEREFLECTIONVECTOR}
#define x3d_SphereLocal                 ${TextureCoordinateGeneratorModeType .SPHERE_LOCAL}
#define x3d_Coord                       ${TextureCoordinateGeneratorModeType .COORD}
#define x3d_CoordEye                    ${TextureCoordinateGeneratorModeType .COORD_EYE}
#define x3d_Noise                       ${TextureCoordinateGeneratorModeType .NOISE}
#define x3d_NoiseEye                    ${TextureCoordinateGeneratorModeType .NOISE_EYE}
#define x3d_SphereReflect               ${TextureCoordinateGeneratorModeType .SPHERE_REFLECT}
#define x3d_SphereReflectLocal          ${TextureCoordinateGeneratorModeType .SPHERE_REFLECT_LOCAL}

// Legacy
#define x3d_GeometryPoints  0
#define x3d_GeometryLines   1
#define x3d_NoneClipPlane   vec4 (88.0, 51.0, 68.0, 33.0)
#define x3d_NoneFog         0
#define x3d_NoneLight       0
#define x3d_NoneTexture     0

///
/// Types
///

#if defined (X3D_FOG)
struct x3d_FogParameters {
   mediump int   type;
   mediump vec3  color;
   mediump float visibilityStart;
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
   mediump int         diffuseTextureLevels;
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
   #if defined (X3D_MATERIAL_SPECULAR_GLOSSINESS)
      mediump vec3 diffuseColor;
      mediump vec3 specularColor;
      mediump float glossiness;
   #elif defined (X3D_MATERIAL_METALLIC_ROUGHNESS)
      mediump vec3  baseColor;
      mediump float metallic;
      mediump float roughness;
   #endif
   mediump vec3  emissiveColor;
   mediump float occlusionStrength;
   mediump float normalScale;
   mediump float transparency;
};
#endif

//uniform x3d_PhysicalMaterialParameters x3d_Material;

${MaterialTextures .structs ()}

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
