export default /* glsl */ `

// https://github.com/cx20/gltf-test/blob/master/examples/khronos-gltf-loader/shaders/pbr-frag.glsl

#extension GL_EXT_shader_texture_lod: enable

precision highp float;
precision highp int;
precision highp sampler2D;
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

#if defined (USE_IBL)
   uniform samplerCube diffuseEnvironmentTexture;
   uniform samplerCube specularEnvironmentTexture;
   uniform sampler2D brdfLUT;
#endif

#if defined (X3D_BASE_TEXTURE)
uniform x3d_BaseTextureParameters x3d_BaseTexture;
#endif

vec4
getBaseColor ()
{
   // Get base parameter.

   float alpha = 1.0 - x3d_Material .transparency;

   #if defined (X3D_COLOR_MATERIAL)
      vec4 baseParameter = vec4 (color .rgb, color .a * alpha);
   #else
      vec4 baseParameter = vec4 (x3d_Material .baseColor, alpha);
   #endif

   // Get texture color.

   #if defined (X3D_BASE_TEXTURE)
      vec3 texCoord = getTexCoord (x3d_BaseTexture .textureTransformMapping, x3d_BaseTexture .textureCoordinateMapping);
      #if defined (X3D_BASE_TEXTURE_2D)
         return baseParameter * SRGBtoLINEAR (texture2D (x3d_BaseTexture .texture2D, texCoord .st));
      #elif defined (X3D_BASE_TEXTURE_CUBE)
         return baseParameter * SRGBtoLINEAR (textureCube (x3d_BaseTexture .textureCube, texCoord));
      #endif
   #elif defined (X3D_TEXTURE)
      return getTextureColor (baseParameter, vec4 (vec3 (1.0), alpha));
   #else
      return baseParameter;
   #endif
}

#if defined (X3D_EMISSIVE_TEXTURE)
uniform x3d_EmissiveTextureParameters x3d_EmissiveTexture;
#endif

vec3
getEmissiveColor ()
{
   // Get emissive parameter.

   vec3 emissiveParameter = x3d_Material .emissiveColor;

   // Get texture color.

   #if defined (X3D_EMISSIVE_TEXTURE)
      vec3 texCoord = getTexCoord (x3d_EmissiveTexture .textureTransformMapping, x3d_EmissiveTexture .textureCoordinateMapping);

      #if defined (X3D_EMISSIVE_TEXTURE_2D)
         return emissiveParameter * SRGBtoLINEAR (texture2D (x3d_EmissiveTexture .texture2D, texCoord .st)) .rgb;
      #elif defined (X3D_EMISSIVE_TEXTURE_CUBE)
         return emissiveParameter * SRGBtoLINEAR (textureCube (x3d_EmissiveTexture .textureCube, texCoord)) .rgb;
      #endif
   #else
      return emissiveParameter .rgb;
   #endif
}

#if defined (X3D_METALLIC_ROUGHNESS_TEXTURE)
uniform x3d_MetallicRoughnessTextureParameters x3d_MetallicRoughnessTexture;
#endif

vec2
getMetallicRoughness ()
{
   // Metallic and Roughness material properties are packed together
   // In glTF, these factors can be specified by fixed scalar values
   // or from a metallic-roughness map
   float metallic            = x3d_Material .metallic;
   float perceptualRoughness = x3d_Material .roughness;

   // Get texture color.

   #if defined (X3D_METALLIC_ROUGHNESS_TEXTURE)
      vec3 texCoord = getTexCoord (x3d_MetallicRoughnessTexture .textureTransformMapping, x3d_MetallicRoughnessTexture .textureCoordinateMapping);
      // Roughness is stored in the 'g' channel, metallic is stored in the 'b' channel.
      // This layout intentionally reserves the 'r' channel for (optional) occlusion map data
      #if defined (X3D_METALLIC_ROUGHNESS_TEXTURE_2D)
         vec4 mrSample = texture2D (x3d_MetallicRoughnessTexture .texture2D, texCoord .st);
      #elif defined (X3D_METALLIC_ROUGHNESS_TEXTURE_CUBE)
         vec4 mrSample = textureCube (x3d_MetallicRoughnessTexture .textureCube, texCoord);
      #endif
      metallic            *= mrSample .b;
      perceptualRoughness *= mrSample .g;

      return vec2 (metallic, perceptualRoughness);
   #else
      return vec2 (metallic, perceptualRoughness);
   #endif
}

#if defined (X3D_OCCLUSION_TEXTURE)
uniform x3d_OcclusionTextureParameters x3d_OcclusionTexture;
#endif

float
getOcclusionFactor ()
{
   // Get texture color.

   #if defined (X3D_OCCLUSION_TEXTURE)
      vec3 texCoord = getTexCoord (x3d_OcclusionTexture .textureTransformMapping, x3d_OcclusionTexture .textureCoordinateMapping);

      #if defined (X3D_OCCLUSION_TEXTURE_2D)
         return texture2D (x3d_OcclusionTexture .texture2D, texCoord .st) .r;
      #elif defined (X3D_OCCLUSION_TEXTURE_CUBE)
         return textureCube (x3d_OcclusionTexture .textureCube, texCoord) .r;
      #endif
   #else
      return 1.0;
   #endif
}

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

#if defined (USE_IBL)
// Calculation of the lighting contribution from an optional Image Based Light source.
// Precomputed Environment Maps are required uniform inputs and are computed as outlined in [1].
// See our README.md on Environment Maps [3] for additional discussion.
vec3
getIBLContribution (const in PBRInfo pbrInputs, vec3 n, const in vec3 reflection)
{
   float mipCount = 9.0; // resolution of 512x512
   float lod      = pbrInputs .perceptualRoughness * mipCount;

   // retrieve a scale and bias to F0. See [1], Figure 3
   vec3 brdf         = SRGBtoLINEAR (texture2D (brdfLUT, vec2 (pbrInputs .NdotV, 1.0 - pbrInputs .perceptualRoughness))) .rgb;
   vec3 diffuseLight = SRGBtoLINEAR (textureCube (diffuseEnvironmentTexture, n)) .rgb;

   #if defined (USE_TEX_LOD)
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

vec4
getMaterialColor ()
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
   vec4  baseColor    = getBaseColor ();
   float alpha        = baseColor .a;
   vec3  f0           = vec3 (0.04);
   vec3  diffuseColor = baseColor .rgb * (vec3 (1.0) - f0);
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

   vec3 n = getNormalVector (x3d_Material .normalScale);  // normal at surface point
   vec3 v = normalize (-vertex); // Vector from surface point to camera

   vec3 finalColor = vec3 (0.0);

   #if defined (X3D_LIGHTING)
   for (int i = 0; i < X3D_NUM_LIGHTS; i ++)
   {
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

         float attenuationFactor     = di ? 1.0 : 1.0 / max (dot (c, vec3 (1.0, dL, dL * dL)), 1.0);
         float spotFactor            = light .type == x3d_SpotLight ? getSpotFactor (light .cutOffAngle, light .beamWidth, L, d) : 1.0;
         float attenuationSpotFactor = attenuationFactor * spotFactor;

         // Calculation of analytical lighting contribution
         vec3 diffuseContrib     = (1.0 - F) * diffuse (pbrInputs);
         vec3 specContrib        = F * G * D / (4.0 * NdotL * NdotV);
         vec3 diffuseSpecContrib = light .intensity * (diffuseContrib + specContrib);

         #if defined (X3D_SHADOWS)
            if (NdotL > 0.001 && light .shadowIntensity > 0.0)
               diffuseSpecContrib = mix (diffuseSpecContrib, light .shadowColor, getShadowIntensity (i, light));
         #endif

         vec3 color = NdotL * attenuationSpotFactor * light .color * diffuseSpecContrib;

         finalColor += color;
      }
   }
   #endif

   // Calculate lighting contribution from image based lighting source (IBL).
   #if defined (USE_IBL)
   vec3 reflection = -normalize (reflect (v, n));
   finalColor += getIBLContribution (pbrInputs, n, reflection);
   #endif

   // Apply optional PBR terms for additional (optional) shading.
   #if defined (X3D_OCCLUSION_TEXTURE)
   finalColor = mix (finalColor, finalColor * getOcclusionFactor (), x3d_Material .occlusionStrength);
   #endif

   finalColor += getEmissiveColor ();

   // Combine with alpha and do gamma correction.
   return Gamma (vec4 (finalColor, alpha));
}

void
main ()
{
   fragment_main ();
}
`;
