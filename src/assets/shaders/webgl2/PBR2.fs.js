export default /* glsl */ `#version 300 es

// https://github.com/KhronosGroup/glTF-Sample-Viewer/blob/main/source/Renderer/shaders/pbr.frag

precision highp float;
precision highp int;
precision highp sampler2D;
precision highp sampler3D;
precision highp samplerCube;

#pragma X3D include "include/Fragment.glsl"
#pragma X3D include "include/Colors.glsl"
#pragma X3D include "include/Normal.glsl"
#pragma X3D include "include/SpotFactor.glsl"
#pragma X3D include "include/Shadow.glsl"

#if defined (X3D_LIGHTING)
   uniform x3d_LightSourceParameters x3d_LightSource [X3D_NUM_LIGHTS];
#endif

uniform x3d_PhysicalMaterialParameters x3d_Material;

#pragma X3D include "pbr/Functions.glsl"
#pragma X3D include "pbr/MaterialInfo.glsl"

// #if defined (X3D_EMISSIVE_TEXTURE)
// uniform x3d_EmissiveTextureParameters x3d_EmissiveTexture;
// #endif

// vec3
// getEmissiveColor ()
// {
//    // Get emissive parameter.

//    vec3 emissiveParameter = x3d_Material .emissiveColor;

//    // Get texture color.

//    #if defined (X3D_EMISSIVE_TEXTURE)
//       vec3 texCoord = getTexCoord (x3d_EmissiveTexture .textureTransformMapping, x3d_EmissiveTexture .textureCoordinateMapping);

//       #if defined (X3D_EMISSIVE_TEXTURE_2D)
//          return emissiveParameter * SRGBtoLINEAR (texture (x3d_EmissiveTexture .texture2D, texCoord .st)) .rgb;
//       #elif defined (X3D_EMISSIVE_TEXTURE_3D)
//          return emissiveParameter * SRGBtoLINEAR (texture (x3d_EmissiveTexture .texture3D, texCoord)) .rgb;
//       #elif defined (X3D_EMISSIVE_TEXTURE_CUBE)
//          return emissiveParameter * SRGBtoLINEAR (texture (x3d_EmissiveTexture .textureCube, texCoord)) .rgb;
//       #endif
//    #else
//       return emissiveParameter .rgb;
//    #endif
// }

// #if defined (X3D_OCCLUSION_TEXTURE)
// uniform x3d_OcclusionTextureParameters x3d_OcclusionTexture;
// #endif

// float
// getOcclusionFactor ()
// {
//    // Get texture color.

//    #if defined (X3D_OCCLUSION_TEXTURE)
//       vec3 texCoord = getTexCoord (x3d_OcclusionTexture .textureTransformMapping, x3d_OcclusionTexture .textureCoordinateMapping);

//       #if defined (X3D_OCCLUSION_TEXTURE_2D)
//          return texture (x3d_OcclusionTexture .texture2D, texCoord .st) .r;
//       #elif defined (X3D_OCCLUSION_TEXTURE_3D)
//          return texture (x3d_OcclusionTexture .texture3D, texCoord) .r;
//       #elif defined (X3D_OCCLUSION_TEXTURE_CUBE)
//          return texture (x3d_OcclusionTexture .textureCube, texCoord) .r;
//       #endif
//    #else
//       return 1.0;
//    #endif
// }

vec4
getMaterialColor ()
{
   vec4 baseColor = getBaseColor ();

   vec3 n = getNormalVector (x3d_Material .normalScale);
   vec3 v = normalize (-vertex);

   MaterialInfo materialInfo;

   // The default index of refraction of 1.5 yields a dielectric normal incidence reflectance of 0.04.
   materialInfo .baseColor      = baseColor .rgb;
   materialInfo .ior            = 1.5;
   materialInfo .f0             = vec3 (0.04);
   materialInfo .specularWeight = 1.0;

   #ifdef X3D_MATERIAL_METALLIC_ROUGHNESS
      materialInfo = getMetallicRoughnessInfo (materialInfo);
   #endif

   return baseColor;
}

void
main ()
{
   fragment_main ();
}
`;
