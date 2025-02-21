export default /* glsl */ `

// https://github.com/KhronosGroup/glTF-Sample-Viewer/blob/main/source/Renderer/shaders/pbr.frag

#pragma X3D include "../common/Fragment.glsl"
#pragma X3D include "../common/Normal.glsl"
#pragma X3D include "../common/Shadow.glsl"

#if defined (X3D_TRANSMISSION_MATERIAL_EXT)
   uniform mat4 x3d_ProjectionMatrix;
   uniform mat4 x3d_ModelViewMatrix;
#endif

#if defined (X3D_XR_SESSION)
uniform mat4 x3d_EyeMatrix;

mat4
eye (const in mat4 modelViewMatrix)
{
   return x3d_EyeMatrix * modelViewMatrix;
}
#else
   #define eye(x) (x)
#endif

#if defined (X3D_LIGHTING)
   uniform x3d_LightSourceParameters x3d_LightSource [X3D_NUM_LIGHTS];
#endif

uniform x3d_PhysicalMaterialParameters x3d_Material;

#pragma X3D include "pbr/BRDF.glsl"
#pragma X3D include "pbr/MaterialInfo.glsl"
#pragma X3D include "pbr/Punctual.glsl"
#pragma X3D include "pbr/IBL.glsl"
#pragma X3D include "pbr/Iridescence.glsl"

vec4
getMaterialColor ()
{
   vec4 baseColor = getBaseColor ();

   #if defined (X3D_TEXTURE_PROJECTION)
      baseColor .rgb *= getTextureProjectorColor ();
   #endif

   vec3 color = vec3 (0.0);

   vec3 v = normalize (-vertex);

   #if defined (X3D_USE_IBL) || defined (X3D_LIGHTING) || defined (X3D_ANISOTROPY_MATERIAL_EXT) || defined (X3D_CLEARCOAT_MATERIAL_EXT)
      NormalInfo normalInfo = getNormalInfo (x3d_Material .normalScale);

      vec3  n     = normalInfo .n;
      float NdotV = clamp (dot (n, v), 0.0, 1.0);
   #endif

   MaterialInfo materialInfo;

   // The default index of refraction of 1.5 yields a dielectric normal incidence reflectance of 0.04.
   materialInfo .baseColor      = baseColor .rgb;
   materialInfo .ior            = 1.5;
   materialInfo .f0_dielectric  = vec3 (0.04);
   materialInfo .specularWeight = 1.0;

   // Anything less than 2% is physically impossible and is instead considered to be shadowing. Compare to "Real-Time-Rendering" 4th edition on page 325.
   materialInfo .f90            = vec3 (1.0);
   materialInfo .f90_dielectric = materialInfo .f90;

   #if defined (X3D_IOR_MATERIAL_EXT)
      materialInfo = getIorInfo (materialInfo);
   #endif

   #if defined (X3D_MATERIAL_SPECULAR_GLOSSINESS)
      materialInfo = getSpecularGlossinessInfo (materialInfo);
   #endif

   #if defined (X3D_MATERIAL_METALLIC_ROUGHNESS)
      materialInfo = getMetallicRoughnessInfo (materialInfo);
   #endif

   #if defined (X3D_SHEEN_MATERIAL_EXT)
      materialInfo = getSheenInfo (materialInfo);
   #endif

   #if defined (X3D_CLEARCOAT_MATERIAL_EXT)
      materialInfo = getClearCoatInfo (materialInfo, normalInfo);
   #endif

   #if defined (X3D_SPECULAR_MATERIAL_EXT)
      materialInfo = getSpecularInfo (materialInfo);
   #endif

   #if defined (X3D_TRANSMISSION_MATERIAL_EXT)
      materialInfo = getTransmissionInfo (materialInfo);
   #endif

   #if defined (X3D_VOLUME_MATERIAL_EXT)
      materialInfo = getVolumeInfo (materialInfo);
   #endif

   #if defined (X3D_IRIDESCENCE_MATERIAL_EXT)
      materialInfo = getIridescenceInfo (materialInfo);
   #endif

   #if defined (X3D_DIFFUSE_TRANSMISSION_MATERIAL_EXT)
      materialInfo = getDiffuseTransmissionInfo (materialInfo);
   #endif

   #if defined (X3D_ANISOTROPY_MATERIAL_EXT)
      materialInfo = getAnisotropyInfo (materialInfo, normalInfo);
   #endif

   materialInfo .perceptualRoughness = clamp (materialInfo .perceptualRoughness, 0.0, 1.0);
   materialInfo .metallic            = clamp (materialInfo .metallic,            0.0, 1.0);

   // Roughness is authored as perceptual roughness; as is convention,
   // convert to material roughness by squaring the perceptual roughness.
   materialInfo .alphaRoughness = materialInfo .perceptualRoughness * materialInfo .perceptualRoughness;

   // Compute reflectance.
   float reflectance = max3 (materialInfo .f0_dielectric);

   // LIGHTING
   vec3 f_specular_dielectric   = vec3 (0.0);
   vec3 f_specular_metal        = vec3 (0.0);
   vec3 f_diffuse               = vec3 (0.0);
   vec3 f_dielectric_brdf_ibl   = vec3 (0.0);
   vec3 f_metal_brdf_ibl        = vec3 (0.0);
   vec3 f_emissive              = vec3 (0.0);
   vec3 clearcoat_brdf          = vec3 (0.0);
   vec3 f_sheen                 = vec3 (0.0);
   vec3 f_specular_transmission = vec3 (0.0);
   vec3 f_diffuse_transmission  = vec3 (0.0);

   float clearcoatFactor  = 0.0;
   vec3  clearcoatFresnel = vec3 (0.0);

   float albedoSheenScaling           = 1.0;
   float diffuseTransmissionThickness = 1.0;

   #if defined (X3D_IRIDESCENCE_MATERIAL_EXT) && (defined (X3D_USE_IBL) || defined (X3D_LIGHTING))
      vec3 iridescenceFresnel_dielectric = evalIridescence (1.0, materialInfo .iridescenceIor, NdotV, materialInfo .iridescenceThickness, materialInfo .f0_dielectric);
      vec3 iridescenceFresnel_metallic   = evalIridescence (1.0, materialInfo .iridescenceIor, NdotV, materialInfo .iridescenceThickness, baseColor .rgb);

      if (materialInfo .iridescenceThickness == 0.0)
         materialInfo .iridescenceFactor = 0.0;
   #endif

   #if defined (X3D_DIFFUSE_TRANSMISSION_MATERIAL_EXT)
   #if defined (X3D_VOLUME_MATERIAL_EXT)
      diffuseTransmissionThickness = materialInfo .thickness * (length (vec3 (u_ModelMatrix[0] .xyz)) + length (vec3 (u_ModelMatrix[1] .xyz)) + length (vec3 (u_ModelMatrix[2] .xyz))) / 3.0;
   #endif
   #endif

   #if defined (X3D_CLEARCOAT_MATERIAL_EXT)
      clearcoatFactor  = materialInfo .clearcoatFactor;
      clearcoatFresnel = F_Schlick (materialInfo .clearcoatF0, materialInfo .clearcoatF90, clamp (dot (materialInfo .clearcoatNormal, v), 0.0, 1.0));
   #endif

   // Calculate lighting contribution from image based lighting source (IBL)
   #if defined (X3D_USE_IBL)
      f_diffuse = getDiffuseLight (n) * baseColor .rgb;

      #if defined (X3D_DIFFUSE_TRANSMISSION_MATERIAL_EXT)
         vec3 diffuseTransmissionIBL = getDiffuseLight (-n) * materialInfo .diffuseTransmissionColorFactor;

         #if defined (X3D_VOLUME_MATERIAL_EXT)
            diffuseTransmissionIBL = applyVolumeAttenuation (diffuseTransmissionIBL, diffuseTransmissionThickness, materialInfo .attenuationColor, materialInfo .attenuationDistance);
         #endif

         f_diffuse = mix (f_diffuse, diffuseTransmissionIBL, materialInfo .diffuseTransmissionFactor);
      #endif

      #if defined (X3D_TRANSMISSION_MATERIAL_EXT)
         f_specular_transmission += getIBLVolumeRefraction (
            n,
            v,
            materialInfo .perceptualRoughness,
            baseColor .rgb,
            materialInfo .f0_dielectric,
            materialInfo .f90,
            vertex,
            eye (x3d_ModelViewMatrix), // x3d_ModelMatrix
            x3d_ProjectionMatrix,
            materialInfo .ior,
            materialInfo .thickness,
            materialInfo .attenuationColor,
            materialInfo .attenuationDistance,
            materialInfo .dispersion);

         f_diffuse = mix (f_diffuse, f_specular_transmission, materialInfo .transmissionFactor);
      #endif

      #if defined (X3D_ANISOTROPY_MATERIAL_EXT)
         f_specular_metal      = getIBLRadianceAnisotropy (n, v, materialInfo .perceptualRoughness, materialInfo .anisotropyStrength, materialInfo .anisotropicB);
         f_specular_dielectric = f_specular_metal;
      #else
         f_specular_metal      = getIBLRadianceGGX (n, v, materialInfo .perceptualRoughness);
         f_specular_dielectric = f_specular_metal;
      #endif

      // Calculate fresnel mix for IBL

      vec3 f_metal_fresnel_ibl = getIBLGGXFresnel (n, v, materialInfo .perceptualRoughness, baseColor .rgb, 1.0);

      f_metal_brdf_ibl = f_metal_fresnel_ibl * f_specular_metal;

      vec3 f_dielectric_fresnel_ibl = getIBLGGXFresnel (n, v, materialInfo .perceptualRoughness, materialInfo .f0_dielectric, materialInfo .specularWeight);

      f_dielectric_brdf_ibl = mix (f_diffuse, f_specular_dielectric, f_dielectric_fresnel_ibl);

      #if defined (X3D_IRIDESCENCE_MATERIAL_EXT)
         f_metal_brdf_ibl      = mix (f_metal_brdf_ibl, f_specular_metal * iridescenceFresnel_metallic, materialInfo .iridescenceFactor);
         f_dielectric_brdf_ibl = mix (f_dielectric_brdf_ibl, rgb_mix (f_diffuse, f_specular_dielectric, iridescenceFresnel_dielectric), materialInfo .iridescenceFactor);
      #endif

      #if defined (X3D_CLEARCOAT_MATERIAL_EXT)
         clearcoat_brdf = getIBLRadianceGGX (materialInfo .clearcoatNormal, v, materialInfo .clearcoatRoughness);
      #endif

      #if defined (X3D_SHEEN_MATERIAL_EXT)
         f_sheen            = getIBLRadianceCharlie (n, v, materialInfo .sheenRoughnessFactor, materialInfo .sheenColorFactor);
         albedoSheenScaling = 1.0 - max3 (materialInfo .sheenColorFactor) * albedoSheenScalingLUT (NdotV, materialInfo .sheenRoughnessFactor);
      #endif

      color = mix (f_dielectric_brdf_ibl, f_metal_brdf_ibl, materialInfo .metallic);
      color = f_sheen + color * albedoSheenScaling;
      color = mix (color, clearcoat_brdf, clearcoatFactor * clearcoatFresnel);
   #endif

   // Holger: moved occlusion out of IBL.
   #if defined (X3D_OCCLUSION_TEXTURE)
      float ao = getOcclusionFactor ();

      color *= 1.0 + x3d_Material .occlusionStrength * (ao - 1.0);
   #endif

   f_diffuse             = vec3 (0.0);
   f_specular_dielectric = vec3 (0.0);
   f_specular_metal      = vec3 (0.0);

   vec3 f_dielectric_brdf = vec3 (0.0);
   vec3 f_metal_brdf      = vec3 (0.0);

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
         float VdotH = clamp (dot (v, h), 0.0, 1.0);

         vec3 dielectric_fresnel = F_Schlick (materialInfo .f0_dielectric * materialInfo .specularWeight, materialInfo .f90_dielectric, abs (VdotH));
         vec3 metal_fresnel      = F_Schlick (baseColor .rgb, vec3 (1.0), abs (VdotH));

         // Calculation of analytical light
         // https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#acknowledgments AppendixB
         vec3 lightIntensity = getLightIntensity (light, l, distanceToLight);

         #if defined (X3D_SHADOWS)
            lightIntensity = mix (lightIntensity, light .shadowColor, getShadowIntensity (i, light));
         #endif

         vec3  l_diffuse             = lightIntensity * NdotL * BRDF_lambertian (baseColor .rgb);
         vec3  l_specular_dielectric = vec3 (0.0);
         vec3  l_specular_metal      = vec3 (0.0);
         vec3  l_dielectric_brdf     = vec3 (0.0);
         vec3  l_metal_brdf          = vec3 (0.0);
         vec3  l_clearcoat_brdf      = vec3 (0.0);
         vec3  l_sheen               = vec3 (0.0);
         float l_albedoSheenScaling  = 1.0;

         #if defined (X3D_DIFFUSE_TRANSMISSION_MATERIAL_EXT)
            vec3 diffuse_btdf = lightIntensity * clamp (dot (-n, l), 0.0, 1.0) * BRDF_lambertian (materialInfo .diffuseTransmissionColorFactor);

            #if defined (X3D_VOLUME_MATERIAL_EXT)
               diffuse_btdf = applyVolumeAttenuation (diffuse_btdf, diffuseTransmissionThickness, materialInfo .attenuationColor, materialInfo .attenuationDistance);
            #endif

            l_diffuse = mix (l_diffuse, diffuse_btdf, materialInfo .diffuseTransmissionFactor);
         #endif // X3D_DIFFUSE_TRANSMISSION_MATERIAL_EXT

         // BTDF (Bidirectional Transmittance Distribution Function)
         #if defined (X3D_TRANSMISSION_MATERIAL_EXT)
            // If the light ray travels through the geometry, use the point it exits the geometry again.
            // That will change the angle to the light source, if the material refracts the light ray.
            vec3 transmissionRay = getVolumeTransmissionRay (n, v, materialInfo .thickness, materialInfo .ior, eye (x3d_ModelViewMatrix)); // x3d_ModelMatrix

            pointToLight -= transmissionRay;
            l             = normalize (pointToLight);

            vec3 transmittedLight = lightIntensity * getPunctualRadianceTransmission (n, v, l, materialInfo .alphaRoughness, materialInfo .f0_dielectric, materialInfo .f90, baseColor .rgb, materialInfo .ior);

            #if defined (X3D_VOLUME_MATERIAL_EXT)
               transmittedLight = applyVolumeAttenuation (transmittedLight, length (transmissionRay), materialInfo .attenuationColor, materialInfo .attenuationDistance);
            #endif

            l_diffuse = mix (l_diffuse, transmittedLight, materialInfo .transmissionFactor);
         #endif

         // Calculation of analytical light
         // https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#acknowledgments AppendixB
         vec3 intensity = getLightIntensity (light, l, length (light .matrix * pointToLight));

         #if defined (X3D_ANISOTROPY_MATERIAL_EXT)
            l_specular_metal      = intensity * NdotL * BRDF_specularGGXAnisotropy (materialInfo .alphaRoughness, materialInfo .anisotropyStrength, n, v, l, h, materialInfo .anisotropicT, materialInfo .anisotropicB);
            l_specular_dielectric = l_specular_metal;
         #else
            l_specular_metal      = intensity * NdotL * BRDF_specularGGX (materialInfo .alphaRoughness, NdotL, NdotV, NdotH);
            l_specular_dielectric = l_specular_metal;
         #endif

         l_metal_brdf      = metal_fresnel * l_specular_metal;
         l_dielectric_brdf = mix (l_diffuse, l_specular_dielectric, dielectric_fresnel); // Do we need to handle vec3 fresnel here?

         #if defined (X3D_IRIDESCENCE_MATERIAL_EXT)
            l_metal_brdf      = mix (l_metal_brdf, l_specular_metal * iridescenceFresnel_metallic, materialInfo .iridescenceFactor);
            l_dielectric_brdf = mix (l_dielectric_brdf, rgb_mix (l_diffuse, l_specular_dielectric, iridescenceFresnel_dielectric), materialInfo .iridescenceFactor);
         #endif

         #if defined (X3D_CLEARCOAT_MATERIAL_EXT)
            l_clearcoat_brdf = intensity * getPunctualRadianceClearCoat (materialInfo .clearcoatNormal, v, l, h, VdotH, materialInfo .clearcoatF0, materialInfo .clearcoatF90, materialInfo .clearcoatRoughness);
         #endif

         #if defined (X3D_SHEEN_MATERIAL_EXT)
            l_sheen              = intensity * getPunctualRadianceSheen (materialInfo .sheenColorFactor, materialInfo .sheenRoughnessFactor, NdotL, NdotV, NdotH);
            l_albedoSheenScaling = min (1.0 - max3 (materialInfo .sheenColorFactor) * albedoSheenScalingLUT (NdotV, materialInfo .sheenRoughnessFactor), 1.0 - max3 (materialInfo .sheenColorFactor) * albedoSheenScalingLUT (NdotL, materialInfo .sheenRoughnessFactor));
         #endif

         vec3 l_color = mix (l_dielectric_brdf, l_metal_brdf, materialInfo .metallic);

         l_color = l_sheen + l_color * l_albedoSheenScaling;
         l_color = mix (l_color, l_clearcoat_brdf, clearcoatFactor * clearcoatFresnel);
         color  += l_color;
      }
   }
   #endif

   f_emissive = getEmissiveColor ();

   #if defined (X3D_UNLIT_MATERIAL_EXT)
      color = baseColor .rgb;
   #else
      color = f_emissive * (1.0 - clearcoatFactor * clearcoatFresnel) + color;
   #endif

   return vec4 (color, baseColor .a);
}

void
main ()
{
   fragment_main ();
}
`;
