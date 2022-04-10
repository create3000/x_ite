#version 300 es

#define MANUAL_SRGB

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
#extension GL_EXT_frag_depth : enable
#endif

precision highp float;
precision highp int;

out vec4 x3d_FragColor;

uniform int   x3d_GeometryType;
uniform bool  x3d_ColorMaterial; // true if a X3DColorNode is attached, otherwise false
uniform float x3d_AlphaCutoff;

uniform int x3d_NumLights;
uniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];
uniform x3d_PhysicalMaterialParameters x3d_Material;

#ifdef USE_IBL
   uniform samplerCube diffuseEnvironmentTexture;
   uniform samplerCube specularEnvironmentTexture;
   uniform sampler2D brdfLUT;
#endif

in vec3 vertex;
in vec4 texCoord0;
in vec4 texCoord1;
in vec4 color;
in vec3 normal;
in vec3 localNormal;
in vec3 localVertex;

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
uniform float x3d_LogarithmicFarFactor1_2;
in float depth;
#endif

#pragma X3D include "include/Texture.glsl"
#pragma X3D include "include/Normal.glsl"
#pragma X3D include "include/SpotFactor.glsl"

#ifdef X3D_MATERIAL_TEXTURES

uniform x3d_MaterialTextureParameters x3d_BaseTexture;
uniform x3d_MaterialTextureParameters x3d_EmissiveTexture;
uniform x3d_MaterialTextureParameters x3d_MetallicRoughnessTexture;
uniform x3d_MaterialTextureParameters x3d_OcclusionTexture;

vec4
SRGBtoLINEAR (const in vec4);

vec4
getBaseColor ()
{
   // Get base parameter.

   float alpha         = 1.0 - x3d_Material .transparency;
   vec4  baseParameter = x3d_ColorMaterial ? vec4 (color .rgb, color .a * alpha) : vec4 (x3d_Material .baseColor, alpha);

   // Get texture color.

   switch (x3d_BaseTexture .textureType)
   {
      case x3d_TextureType2D:
      {
         vec4 texCoord = getTexCoord (x3d_BaseTexture .textureTransformMapping, x3d_BaseTexture .textureCoordinateMapping);

         return baseParameter * SRGBtoLINEAR (texture (x3d_BaseTexture .texture2D, texCoord .st));
      }

      #ifdef X3D_MATERIAL_TEXTURE_3D
      case x3d_TextureType3D:
      {
         vec4 texCoord = getTexCoord (x3d_BaseTexture .textureTransformMapping, x3d_BaseTexture .textureCoordinateMapping);

         return baseParameter * SRGBtoLINEAR (texture (x3d_BaseTexture .texture3D, texCoord .stp));
      }
      #endif

      #ifdef X3D_MATERIAL_TEXTURE_CUBE
      case x3d_TextureTypeCube:
      {
         vec4 texCoord = getTexCoord (x3d_BaseTexture .textureTransformMapping, x3d_BaseTexture .textureCoordinateMapping);

         return baseParameter * SRGBtoLINEAR (texture (x3d_BaseTexture .textureCube, texCoord .stp));
      }
      #endif

      default:
         return getTextureColor (baseParameter, vec4 (vec3 (1.0), alpha));
   }
}

vec3
getEmissiveColor ()
{
   // Get emissive parameter.

   vec3 emissiveParameter = x3d_Material .emissiveColor;

   // Get texture color.

   switch (x3d_EmissiveTexture .textureType)
   {
      case x3d_TextureType2D:
      {
         vec4 texCoord = getTexCoord (x3d_EmissiveTexture .textureTransformMapping, x3d_EmissiveTexture .textureCoordinateMapping);

         return emissiveParameter * SRGBtoLINEAR (texture (x3d_EmissiveTexture .texture2D, texCoord .st)) .rgb;
      }

      #ifdef X3D_MATERIAL_TEXTURE_3D
      case x3d_TextureType3D:
      {
         vec4 texCoord = getTexCoord (x3d_EmissiveTexture .textureTransformMapping, x3d_EmissiveTexture .textureCoordinateMapping);

         return emissiveParameter * SRGBtoLINEAR (texture (x3d_EmissiveTexture .texture3D, texCoord .stp)) .rgb;
      }
      #endif

      #ifdef X3D_MATERIAL_TEXTURE_CUBE
      case x3d_TextureTypeCube:
      {
         vec4 texCoord = getTexCoord (x3d_EmissiveTexture .textureTransformMapping, x3d_EmissiveTexture .textureCoordinateMapping);

         return emissiveParameter * SRGBtoLINEAR (texture (x3d_EmissiveTexture .textureCube, texCoord .stp)) .rgb;
      }
      #endif

      default:
         return emissiveParameter .rgb;
   }
}

vec2
getMetallicRoughness ()
{
   // Metallic and Roughness material properties are packed together
   // In glTF, these factors can be specified by fixed scalar values
   // or from a metallic-roughness map
   float metallic            = x3d_Material .metallic;
   float perceptualRoughness = x3d_Material .roughness;

   // Get texture color.

   switch (x3d_MetallicRoughnessTexture .textureType)
   {
      case x3d_TextureType2D:
      {
         vec4 texCoord = getTexCoord (x3d_MetallicRoughnessTexture .textureTransformMapping, x3d_MetallicRoughnessTexture .textureCoordinateMapping);

         // Roughness is stored in the 'g' channel, metallic is stored in the 'b' channel.
         // This layout intentionally reserves the 'r' channel for (optional) occlusion map data
         vec4 mrSample = texture (x3d_MetallicRoughnessTexture .texture2D, texCoord .st);

         metallic            *= mrSample .b;
         perceptualRoughness *= mrSample .g;

         return vec2 (metallic, perceptualRoughness);
      }

      #ifdef X3D_MATERIAL_TEXTURE_3D
      case x3d_TextureType3D:
      {
         vec4 texCoord = getTexCoord (x3d_MetallicRoughnessTexture .textureTransformMapping, x3d_MetallicRoughnessTexture .textureCoordinateMapping);

         // Roughness is stored in the 'g' channel, metallic is stored in the 'b' channel.
         // This layout intentionally reserves the 'r' channel for (optional) occlusion map data
         vec4 mrSample = texture (x3d_MetallicRoughnessTexture .texture3D, texCoord .stp);

         metallic            *= mrSample .b;
         perceptualRoughness *= mrSample .g;

         return vec2 (metallic, perceptualRoughness);
      }
      #endif

      #ifdef X3D_MATERIAL_TEXTURE_CUBE
      case x3d_TextureTypeCube:
      {
         vec4 texCoord = getTexCoord (x3d_MetallicRoughnessTexture .textureTransformMapping, x3d_MetallicRoughnessTexture .textureCoordinateMapping);

         // Roughness is stored in the 'g' channel, metallic is stored in the 'b' channel.
         // This layout intentionally reserves the 'r' channel for (optional) occlusion map data
         vec4 mrSample = texture (x3d_MetallicRoughnessTexture .textureCube, texCoord .stp);

         metallic            *= mrSample .b;
         perceptualRoughness *= mrSample .g;

         return vec2 (metallic, perceptualRoughness);
      }
      #endif

      default:
         return vec2 (metallic, perceptualRoughness);
   }
}

float
getOcclusionFactor ()
{
   // Get texture color.

   switch (x3d_OcclusionTexture .textureType)
   {
      case x3d_TextureType2D:
      {
         vec4 texCoord = getTexCoord (x3d_OcclusionTexture .textureTransformMapping, x3d_OcclusionTexture .textureCoordinateMapping);

         return texture (x3d_OcclusionTexture .texture2D, texCoord .st) .r;
      }

      #ifdef X3D_MATERIAL_TEXTURE_3D
      case x3d_TextureType3D:
      {
         vec4 texCoord = getTexCoord (x3d_OcclusionTexture .textureTransformMapping, x3d_OcclusionTexture .textureCoordinateMapping);

         return texture (x3d_OcclusionTexture .texture3D, texCoord .stp) .r;
      }
      #endif

      #ifdef X3D_MATERIAL_TEXTURE_CUBE
      case x3d_TextureTypeCube:
      {
         vec4 texCoord = getTexCoord (x3d_OcclusionTexture .textureTransformMapping, x3d_OcclusionTexture .textureCoordinateMapping);

         return texture (x3d_OcclusionTexture .textureCube, texCoord .stp) .r;
      }
      #endif

      default:
         return 1.0;
   }
}

#else // X3D_MATERIAL_TEXTURES

vec2
getMetallicRoughness ()
{
   // Metallic and Roughness material properties are packed together
   // In glTF, these factors can be specified by fixed scalar values
   // or from a metallic-roughness map
   float metallic            = x3d_Material .metallic;
   float perceptualRoughness = x3d_Material .roughness;

   return vec2 (metallic, perceptualRoughness);
}

vec4
getBaseColor ()
{
   // Get base parameter.

   float alpha         = 1.0 - x3d_Material .transparency;
   vec4  baseParameter = x3d_ColorMaterial ? vec4 (color .rgb, color .a * alpha) : vec4 (x3d_Material .baseColor, alpha);

   return getTextureColor (baseParameter, vec4 (vec3 (1.0), alpha));
}

vec3
getEmissiveColor ()
{
   return x3d_Material .emissiveColor;
}

float
getOcclusionFactor ()
{
   return 1.0;
}

#endif // X3D_MATERIAL_TEXTURES

// Encapsulate the various inputs used by the various functions in the shading equation
// We store values in this struct to simplify the integration of alternative implementations
// of the shading terms, outlined in the Readme.MD Appendix.
struct PBRInfo
{
   float NdotL;                  // cos angle between normal and light direction
   float NdotV;                  // cos angle between normal and view direction
   float NdotH;                  // cos angle between normal and half vector
   float LdotH;                  // cos angle between light direction and half vector
   float VdotH;                  // cos angle between view direction and half vector
   float perceptualRoughness;    // roughness value, as authored by the model creator (input to shader)
   float metalness;              // metallic value at the surface
   vec3 reflectance0;            // full reflectance color (normal incidence angle)
   vec3 reflectance90;           // reflectance color at grazing angle
   float alphaRoughness;         // roughness mapped to a more linear change in the roughness (proposed by [2])
   vec3 diffuseColor;            // color contribution from diffuse lighting
   vec3 specularColor;           // color contribution from specular lighting
};

const float M_PI           = 3.141592653589793;
const float c_MinRoughness = 0.04;

vec4
SRGBtoLINEAR (const in vec4 srgbIn)
{
   #ifdef MANUAL_SRGB
      #ifdef SRGB_FAST_APPROXIMATION
         vec3 linOut = pow (srgbIn .xyz, vec3 (2.2));
      #else //SRGB_FAST_APPROXIMATION
         vec3 bLess  = step (vec3 (0.04045), srgbIn .xyz);
         vec3 linOut = mix (srgbIn .xyz / vec3 (12.92), pow ((srgbIn .xyz + vec3 (0.055)) / vec3 (1.055), vec3 (2.4)), bLess);
      #endif //SRGB_FAST_APPROXIMATION
      return vec4 (linOut, srgbIn .w);
   #else //MANUAL_SRGB
      return srgbIn;
   #endif //MANUAL_SRGB
}

#ifdef USE_IBL
// Calculation of the lighting contribution from an optional Image Based Light source.
// Precomputed Environment Maps are required uniform inputs and are computed as outlined in [1].
// See our README.md on Environment Maps [3] for additional discussion.
vec3
getIBLContribution (const in PBRInfo pbrInputs, vec3 n, const in vec3 reflection)
{
   float mipCount = 9.0; // resolution of 512x512
   float lod      = pbrInputs .perceptualRoughness * mipCount;

   // retrieve a scale and bias to F0. See [1], Figure 3
   vec3 brdf         = SRGBtoLINEAR (texture (brdfLUT, vec2 (pbrInputs .NdotV, 1.0 - pbrInputs .perceptualRoughness))) .rgb;
   vec3 diffuseLight = SRGBtoLINEAR (textureCube (diffuseEnvironmentTexture, n)) .rgb;

   #ifdef USE_TEX_LOD
      vec3 specularLight = SRGBtoLINEAR (textureCubeLodEXT (specularEnvironmentTexture, reflection, lod)) .rgb;
   #else
      vec3 specularLight = SRGBtoLINEAR (textureCube (specularEnvironmentTexture, reflection)) .rgb;
   #endif

   vec3 diffuse  = diffuseLight * pbrInputs .diffuseColor;
   vec3 specular = specularLight * (pbrInputs .specularColor * brdf .x + brdf .y);

   return diffuse + specular;
}
#endif

// Basic Lambertian diffuse
// Implementation from Lambert's Photometria https://archive.org/details/lambertsphotome00lambgoog
// See also [1], Equation 1
vec3
diffuse (const in PBRInfo pbrInputs)
{
   return pbrInputs .diffuseColor / M_PI;
}

// The following equation models the Fresnel reflectance term of the spec equation (aka F())
// Implementation of fresnel from [4], Equation 15
vec3
specularReflection (const in PBRInfo pbrInputs)
{
   return pbrInputs .reflectance0 + (pbrInputs .reflectance90 - pbrInputs .reflectance0) * pow (clamp (1.0 - pbrInputs .VdotH, 0.0, 1.0), 5.0);
}

// This calculates the specular geometric attenuation (aka G()),
// where rougher material will reflect less light back to the viewer.
// This implementation is based on [1] Equation 4, and we adopt their modifications to
// alphaRoughness as input as originally proposed in [2].
float
geometricOcclusion (const in PBRInfo pbrInputs)
{
   float NdotL = pbrInputs .NdotL;
   float NdotV = pbrInputs .NdotV;
   float r     = pbrInputs .alphaRoughness;

   float attenuationL = 2.0 * NdotL / (NdotL + sqrt (r * r + (1.0 - r * r) * (NdotL * NdotL)));
   float attenuationV = 2.0 * NdotV / (NdotV + sqrt (r * r + (1.0 - r * r) * (NdotV * NdotV)));

   return attenuationL * attenuationV;
}

// The following equation(s) model the distribution of microfacet normals across the area being drawn (aka D())
// Implementation from \"Average Irregularity Representation of a Roughened Surface for Ray Reflection\" by T. S. Trowbridge, and K. P. Reitz
// Follows the distribution function recommended in the SIGGRAPH 2013 course notes from EPIC Games [1], Equation 3.
float
microfacetDistribution (const in PBRInfo pbrInputs)
{
   float roughnessSq = pbrInputs .alphaRoughness * pbrInputs .alphaRoughness;
   float f           = (pbrInputs .NdotH * roughnessSq - pbrInputs .NdotH) * pbrInputs .NdotH + 1.0;

   return roughnessSq / (M_PI * f * f);
}

void
main ()
{
   // Metallic and Roughness material properties are packed together
   // In glTF, these factors can be specified by fixed scalar values
   // or from a metallic-roughness map.

   vec2  metallicRoughness   = getMetallicRoughness ();
   float perceptualRoughness = clamp (metallicRoughness [1], c_MinRoughness, 1.0);
   float metallic            = clamp (metallicRoughness [0], 0.0, 1.0);

   // Roughness is authored as perceptual roughness; as is convention,
   // convert to material roughness by squaring the perceptual roughness [2].
   float alphaRoughness = perceptualRoughness * perceptualRoughness;

   // The albedo may be defined from a base texture or a flat color.
   vec4 baseColor    = getBaseColor ();
   vec3 f0           = vec3 (0.04);
   vec3 diffuseColor = baseColor .rgb * (vec3 (1.0) - f0);
   diffuseColor *= 1.0 - metallic;

   vec3 specularColor = mix (f0, baseColor .rgb, metallic);

   // Compute reflectance.
   float reflectance = max (max (specularColor .r, specularColor .g), specularColor .b);

   // For typical incident reflectance range (between 4% to 100%) set the grazing reflectance to 100% for typical fresnel effect.
   // For very low reflectance range on highly diffuse objects (below 4%), incrementally reduce grazing reflecance to 0%.
   float reflectance90          = clamp (reflectance * 25.0, 0.0, 1.0);
   vec3  specularEnvironmentR0  = specularColor .rgb;
   vec3  specularEnvironmentR90 = vec3 (1.0, 1.0, 1.0) * reflectance90;

   // Apply light sources

   vec3 n = getNormalVector ();  // normal at surface point
   vec3 v = normalize (-vertex); // Vector from surface point to camera

   vec3 finalColor = vec3 (0.0);

   for (int i = 0; i < x3d_MaxLights; i ++)
   {
      if (i == x3d_NumLights)
         break;

      x3d_LightSourceParameters light = x3d_LightSource [i];

      vec3  vL = light .location - vertex; // Light to fragment
      float dL = length (light .matrix * vL);
      bool  di = light .type == x3d_DirectionalLight;

      if (di || dL <= light .radius)
      {
         vec3 d = light .direction;
         vec3 c = light .attenuation;
         vec3 L = di ? -d : normalize (vL); // Normalized vector from point on geometry to light source i position.

         vec3 l = normalize (L);       // Vector from surface point to light
         vec3 h = normalize (l + v);   // Half vector between both l and v

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

         // Calculate the shading terms for the microfacet specular shading model.
         vec3  F = specularReflection (pbrInputs);
         float G = geometricOcclusion (pbrInputs);
         float D = microfacetDistribution (pbrInputs);

         float attenuationFactor     = di ? 1.0 : 1.0 / max (c [0] + c [1] * dL + c [2] * (dL * dL), 1.0);
         float spotFactor            = light .type == x3d_SpotLight ? getSpotFactor (light .cutOffAngle, light .beamWidth, L, d) : 1.0;
         float attenuationSpotFactor = attenuationFactor * spotFactor;

         // Calculation of analytical lighting contribution
         vec3 diffuseContrib = (1.0 - F) * diffuse (pbrInputs);
         vec3 specContrib    = F * G * D / (4.0 * NdotL * NdotV);
         vec3 color          = NdotL * attenuationSpotFactor * light .color * light .intensity * (diffuseContrib + specContrib);

         finalColor += color;
      }
   }

   // Calculate lighting contribution from image based lighting source (IBL).
   #ifdef USE_IBL
   vec3 reflection = -normalize (reflect (v, n));
   finalColor += getIBLContribution (pbrInputs, n, reflection);
   #endif

   // Apply optional PBR terms for additional (optional) shading.
   finalColor  = mix (finalColor, finalColor * getOcclusionFactor (), x3d_Material .occlusionStrength);
   finalColor += getEmissiveColor ();

   if (baseColor .a < x3d_AlphaCutoff)
   {
      discard;
   }

   // Combine with alpha and do gamma correction.
   x3d_FragColor = vec4 (pow (finalColor, vec3 (1.0 / 2.2)), baseColor .a);

   #ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
   //http://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
   if (x3d_LogarithmicFarFactor1_2 > 0.0)
      gl_FragDepth = log2 (depth) * x3d_LogarithmicFarFactor1_2;
   else
      gl_FragDepth = gl_FragCoord .z;
   #endif
}
