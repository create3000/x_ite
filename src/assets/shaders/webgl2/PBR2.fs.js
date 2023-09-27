export default /* glsl */ `#version 300 es

// https://github.com/cx20/gltf-test/blob/master/examples/khronos-gltf-loader/shaders/pbr-frag.glsl

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

#pragma X3D include "pbr/MaterialInfo.glsl"

// #if defined (X3D_BASE_TEXTURE)
// uniform x3d_BaseTextureParameters x3d_BaseTexture;
// #endif

// vec4
// getBaseColor ()
// {
//    // Get base parameter.

//    float alpha = 1.0 - x3d_Material .transparency;

//    #if defined (X3D_COLOR_MATERIAL)
//       vec4 baseParameter = vec4 (color .rgb, color .a * alpha);
//    #else
//       vec4 baseParameter = vec4 (x3d_Material .baseColor, alpha);
//    #endif

//    // Get texture color.

//    #if defined (X3D_BASE_TEXTURE)
//       vec3 texCoord = getTexCoord (x3d_BaseTexture .textureTransformMapping, x3d_BaseTexture .textureCoordinateMapping);
//       #if defined (X3D_BASE_TEXTURE_2D)
//          return baseParameter * SRGBtoLINEAR (texture (x3d_BaseTexture .texture2D, texCoord .st));
//       #elif defined (X3D_BASE_TEXTURE_3D)
//          return baseParameter * SRGBtoLINEAR (texture (x3d_BaseTexture .texture3D, texCoord));
//       #elif defined (X3D_BASE_TEXTURE_CUBE)
//          return baseParameter * SRGBtoLINEAR (texture (x3d_BaseTexture .textureCube, texCoord));
//       #endif
//    #elif defined (X3D_TEXTURE)
//       return getTextureColor (baseParameter, vec4 (vec3 (1.0), alpha));
//    #else
//       return baseParameter;
//    #endif
// }

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

// #if defined (X3D_METALLIC_ROUGHNESS_TEXTURE)
// uniform x3d_MetallicRoughnessTextureParameters x3d_MetallicRoughnessTexture;
// #endif

// vec2
// getMetallicRoughness ()
// {
//    // Metallic and Roughness material properties are packed together
//    // In glTF, these factors can be specified by fixed scalar values
//    // or from a metallic-roughness map
//    float metallic            = x3d_Material .metallic;
//    float perceptualRoughness = x3d_Material .roughness;

//    // Get texture color.

//    #if defined (X3D_METALLIC_ROUGHNESS_TEXTURE)
//       vec3 texCoord = getTexCoord (x3d_MetallicRoughnessTexture .textureTransformMapping, x3d_MetallicRoughnessTexture .textureCoordinateMapping);
//       // Roughness is stored in the 'g' channel, metallic is stored in the 'b' channel.
//       // This layout intentionally reserves the 'r' channel for (optional) occlusion map data
//       #if defined (X3D_METALLIC_ROUGHNESS_TEXTURE_2D)
//          vec4 mrSample = texture (x3d_MetallicRoughnessTexture .texture2D, texCoord .st);
//       #elif defined (X3D_METALLIC_ROUGHNESS_TEXTURE_3D)
//          vec4 mrSample = texture (x3d_MetallicRoughnessTexture .texture3D, texCoord);
//       #elif defined (X3D_METALLIC_ROUGHNESS_TEXTURE_CUBE)
//          vec4 mrSample = texture (x3d_MetallicRoughnessTexture .textureCube, texCoord);
//       #endif
//       metallic            *= mrSample .b;
//       perceptualRoughness *= mrSample .g;

//       return vec2 (metallic, perceptualRoughness);
//    #else
//       return vec2 (metallic, perceptualRoughness);
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

   return baseColor;
}

void
main ()
{
   fragment_main ();
}
`;
