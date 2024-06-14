export default /* glsl */ `#version 300 es

// https://github.com/KhronosGroup/glTF-Sample-Viewer/blob/main/source/Renderer/shaders/pbr.frag

precision highp float;
precision highp int;
precision highp sampler2D;
precision highp sampler3D;
precision highp samplerCube;

#pragma X3D include "common/Fragment.glsl"
#pragma X3D include "common/Normal.glsl"
#pragma X3D include "common/Shadow.glsl"

#if defined (X3D_LIGHTING)
   uniform x3d_LightSourceParameters x3d_LightSource [X3D_NUM_LIGHTS];
#endif

uniform x3d_PhysicalMaterialParameters x3d_Material;

float max3 (const in vec3 value)
{
   return max (max (value .x, value .y), value .z);
}

#pragma X3D include "pbr/BRDF.glsl"
#pragma X3D include "pbr/MaterialInfo.glsl"
#pragma X3D include "pbr/Punctual.glsl"
#pragma X3D include "pbr/IBL.glsl"

vec4
getMaterialColor ()
{
   vec4 baseColor = getBaseColor ();

   #if defined (X3D_TEXTURE_PROJECTION)
      baseColor .rgb *= getTextureProjectorColor ();
   #endif

   vec3 v = normalize (-vertex);

   #if defined (X3D_LIGHTING) || defined (X3D_USE_IBL) || defined (X3D_ANISOTROPY_MATERIAL_EXT)
      NormalInfo normalInfo = getNormalInfo (x3d_Material .normalScale);

      vec3 n = normalInfo .n;
   #endif

   float NdotV = clamp (dot (n, v), 0.0, 1.0);

   MaterialInfo materialInfo;

   // The default index of refraction of 1.5 yields a dielectric normal incidence reflectance of 0.04.
   materialInfo .baseColor      = baseColor .rgb;
   materialInfo .ior            = 1.5;
   materialInfo .f0             = vec3 (0.04);
   materialInfo .specularWeight = 1.0;

   #if defined (X3D_MATERIAL_METALLIC_ROUGHNESS)
      materialInfo = getMetallicRoughnessInfo (materialInfo);
   #endif

   #if defined (X3D_SHEEN_MATERIAL_EXT)
      materialInfo = getSheenInfo (materialInfo);
   #endif

   #if defined (X3D_SPECULAR_MATERIAL_EXT)
      materialInfo = getSpecularInfo (materialInfo);
   #endif

   #if defined (X3D_ANISOTROPY_MATERIAL_EXT)
      materialInfo = getAnisotropyInfo (materialInfo, normalInfo);
   #endif

   materialInfo .perceptualRoughness = clamp (materialInfo .perceptualRoughness, 0.0, 1.0);
   materialInfo .metallic            = clamp (materialInfo .metallic, 0.0, 1.0);

   // Roughness is authored as perceptual roughness; as is convention,
   // convert to material roughness by squaring the perceptual roughness.
   materialInfo .alphaRoughness = materialInfo .perceptualRoughness * materialInfo .perceptualRoughness;

   // Compute reflectance.
   float reflectance = max (max (materialInfo .f0 .r, materialInfo .f0 .g), materialInfo .f0 .b);

   // Anything less than 2% is physically impossible and is instead considered to be shadowing. Compare to "Real-Time-Rendering" 4th edition on page 325.
   materialInfo .f90 = vec3 (1.0);

   // LIGHTING
   vec3 f_specular     = vec3 (0.0);
   vec3 f_diffuse      = vec3 (0.0);
   vec3 f_emissive     = vec3 (0.0);
   vec3 f_clearcoat    = vec3 (0.0);
   vec3 f_sheen        = vec3 (0.0);
   vec3 f_transmission = vec3 (0.0);

   float albedoSheenScaling = 1.0;

   // Calculate lighting contribution from image based lighting source (IBL)
   #if defined (X3D_USE_IBL)
      #if defined (X3D_IRIDESCENCE_MATERIAL_EXT)
         f_specular += getIBLRadianceGGXIridescence (n, v, materialInfo .perceptualRoughness, materialInfo .f0, iridescenceFresnel, materialInfo .iridescenceFactor, materialInfo .specularWeight);
         f_diffuse  += getIBLRadianceLambertianIridescence (n, v, materialInfo .perceptualRoughness, materialInfo .c_diff, materialInfo .f0, iridescenceF0, materialInfo .iridescenceFactor, materialInfo .specularWeight);
      #elif defined (X3D_ANISOTROPY_MATERIAL_EXT)
         f_specular += getIBLRadianceAnisotropy (n, v, materialInfo .perceptualRoughness, materialInfo .anisotropyStrength, materialInfo .anisotropicB, materialInfo .f0, materialInfo .specularWeight);
         f_diffuse  += getIBLRadianceLambertian (n, v, materialInfo .perceptualRoughness, materialInfo .c_diff, materialInfo .f0, materialInfo .specularWeight);
      #else
         f_specular += getIBLRadianceGGX (n, v, materialInfo .perceptualRoughness, materialInfo .f0, materialInfo .specularWeight);
         f_diffuse  += getIBLRadianceLambertian (n, v, materialInfo .perceptualRoughness, materialInfo .c_diff, materialInfo .f0, materialInfo .specularWeight);
      #endif

      #if defined (X3D_CLEARCOAT_MATERIAL_EXT)
         f_clearcoat += getIBLRadianceGGX (materialInfo .clearcoatNormal, v, materialInfo .clearcoatRoughness, materialInfo .clearcoatF0, 1.0);
      #endif

      #if defined (X3D_SHEEN_MATERIAL_EXT)
         f_sheen += getIBLRadianceCharlie (n, v, materialInfo .sheenRoughnessFactor, materialInfo .sheenColorFactor);
         albedoSheenScaling = 1.0 - max3 (materialInfo .sheenColorFactor) * albedoSheenScalingLUT (NdotV, materialInfo .sheenRoughnessFactor);
      #endif
   #endif

   vec3 f_diffuse_ibl   = f_diffuse;
   vec3 f_specular_ibl  = f_specular;
   vec3 f_sheen_ibl     = f_sheen;
   vec3 f_clearcoat_ibl = f_clearcoat;

   f_diffuse   = vec3 (0.0);
   f_specular  = vec3 (0.0);
   f_sheen     = vec3 (0.0);
   f_clearcoat = vec3 (0.0);

   #if defined (X3D_LIGHTING)
   for (int i = 0; i < X3D_NUM_LIGHTS; ++ i)
   {
      x3d_LightSourceParameters light = x3d_LightSource [i];

      vec3  pointToLight;
      float distanceToLight;

      if (light .type != x3d_DirectionalLight)
      {
         pointToLight    = light .location - vertex;
         distanceToLight = length (light .matrix * pointToLight);
      }
      else
      {
         pointToLight    = -light .direction;
         distanceToLight = -1.0;
      }

      if (distanceToLight <= light .radius || light .radius < 0.0)
      {
         // BSTF
         vec3 l = normalize (pointToLight);   // Direction from surface point to light
         vec3 h = normalize (l + v);          // Direction of the vector between l and v, called halfway vector

         float NdotL = clamp (dot (n, l), 0.0, 1.0);
         float NdotH = clamp (dot (n, h), 0.0, 1.0);
         // float LdotH = clamp (dot (l, h), 0.0, 1.0);
         float VdotH = clamp (dot (v, h), 0.0, 1.0);

         if (NdotL > 0.0 || NdotV > 0.0)
         {
            // Calculation of analytical light
            // https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#acknowledgments AppendixB
            vec3 intensity = getLightIntensity (light, l, distanceToLight);

            #if defined (X3D_SHADOWS)
               if (light .shadowIntensity > 0.0)
                  intensity = mix (intensity, light .shadowColor, getShadowIntensity (i, light));
            #endif

            vec3 l_diffuse  = vec3 (0.0);
            vec3 l_specular = vec3 (0.0);

            #if defined (X3D_IRIDESCENCE_MATERIAL_EXT)
               l_diffuse  += intensity * NdotL * BRDF_lambertianIridescence (materialInfo .f0, materialInfo .f90, iridescenceFresnel, materialInfo .iridescenceFactor, materialInfo .c_diff, materialInfo .specularWeight, VdotH);
               l_specular += intensity * NdotL * BRDF_specularGGXIridescence (materialInfo .f0, materialInfo .f90, iridescenceFresnel, materialInfo .alphaRoughness, materialInfo .iridescenceFactor, materialInfo .specularWeight, VdotH, NdotL, NdotV, NdotH);
            #elif defined (X3D_ANISOTROPY_MATERIAL_EXT)
               l_diffuse  += intensity * NdotL * BRDF_lambertian (materialInfo .f0, materialInfo .f90, materialInfo .c_diff, materialInfo .specularWeight, VdotH);
               l_specular += intensity * NdotL * BRDF_specularGGXAnisotropy (materialInfo .f0, materialInfo .f90, materialInfo .alphaRoughness, materialInfo .anisotropyStrength, n, v, l, h, materialInfo .anisotropicT, materialInfo .anisotropicB);
            #else
               l_diffuse  += intensity * NdotL * BRDF_lambertian (materialInfo .f0, materialInfo .f90, materialInfo .c_diff, materialInfo .specularWeight, VdotH);
               l_specular += intensity * NdotL * BRDF_specularGGX (materialInfo .f0, materialInfo .f90, materialInfo .alphaRoughness, materialInfo .specularWeight, VdotH, NdotL, NdotV, NdotH);
            #endif

            #if defined (X3D_SHEEN_MATERIAL_EXT)
               f_sheen += intensity * getPunctualRadianceSheen (materialInfo .sheenColorFactor, materialInfo .sheenRoughnessFactor, NdotL, NdotV, NdotH);

               float l_albedoSheenScaling = min (1.0 - max3 (materialInfo .sheenColorFactor) * albedoSheenScalingLUT (NdotV, materialInfo .sheenRoughnessFactor), 1.0 - max3 (materialInfo .sheenColorFactor) * albedoSheenScalingLUT (NdotL, materialInfo .sheenRoughnessFactor));

               l_diffuse  *= l_albedoSheenScaling;
               l_specular *= l_albedoSheenScaling;
            #endif

            f_diffuse  += l_diffuse;
            f_specular += l_specular;

            #if defined (X3D_CLEARCOAT_MATERIAL_EXT)
               f_clearcoat += intensity * getPunctualRadianceClearCoat (materialInfo .clearcoatNormal, v, l, h, VdotH, materialInfo .clearcoatF0, materialInfo .clearcoatF90, materialInfo .clearcoatRoughness);
            #endif
         }
      }
   }
   #endif

   f_emissive = getEmissiveColor ();

   // Layer blending

   float clearcoatFactor  = 0.0;
   vec3  clearcoatFresnel = vec3 (0.0);
   vec3  diffuse;
   vec3  specular;
   vec3  sheen;
   vec3  clearcoat;

    // Apply optional PBR terms for additional (optional) shading
   #if defined (X3D_OCCLUSION_TEXTURE)
      float ao                = getOcclusionFactor ();
      float occlusionStrength = x3d_Material .occlusionStrength;

      diffuse   = f_diffuse   + mix (f_diffuse_ibl,   f_diffuse_ibl   * ao, occlusionStrength);
      // apply ambient occlusion to all lighting that is not punctual
      specular  = f_specular  + mix (f_specular_ibl,  f_specular_ibl  * ao, occlusionStrength);
      sheen     = f_sheen     + mix (f_sheen_ibl,     f_sheen_ibl     * ao, occlusionStrength);
      clearcoat = f_clearcoat + mix (f_clearcoat_ibl, f_clearcoat_ibl * ao, occlusionStrength);
   #else
      diffuse   = f_diffuse_ibl   + f_diffuse;
      specular  = f_specular_ibl  + f_specular;
      sheen     = f_sheen_ibl     + f_sheen;
      clearcoat = f_clearcoat_ibl + f_clearcoat;
   #endif

   vec3 color = vec3 (0.0);

   #if defined (X3D_MATERIAL_UNLIT)
      color = baseColor .rgb;
   #else
      color = f_emissive + diffuse + specular;
      color = sheen + color * albedoSheenScaling;
      color = color * (1.0 - clearcoatFactor * clearcoatFresnel) + clearcoat;
   #endif

   #if defined (X3D_LINEAR_OUTPUT)
      return vec4 (color, baseColor .a);
   #else
      return vec4 (toneMap (color), baseColor .a);
   #endif
}

void
main ()
{
   fragment_main ();
}
`;
