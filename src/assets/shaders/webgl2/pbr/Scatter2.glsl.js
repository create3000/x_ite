export default /* glsl */ `

// Originally from:
// https://github.com/KhronosGroup/glTF-Sample-Renderer/blob/main/source/Renderer/shaders/scatter.frag

uniform int x3d_ScatterMaterialIdEXT;

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

      vec3 n = normalInfo .n;
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

   #if defined (X3D_MATERIAL_METALLIC_ROUGHNESS)
      materialInfo = getMetallicRoughnessInfo (materialInfo);
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

   materialInfo .perceptualRoughness = clamp (materialInfo .perceptualRoughness, 0.0, 1.0);

   // Roughness is authored as perceptual roughness; as is convention,
   // convert to material roughness by squaring the perceptual roughness.
   materialInfo .alphaRoughness = materialInfo .perceptualRoughness * materialInfo .perceptualRoughness;

   // LIGHTING
   vec3 f_specular_dielectric = vec3 (0.0);
   vec3 f_diffuse             = vec3 (0.0);
   vec3 f_dielectric_brdf_ibl = vec3 (0.0);

   float diffuseTransmissionThickness = 1.0;

   #if defined (X3D_DIFFUSE_TRANSMISSION_MATERIAL_EXT)
   #if defined (X3D_VOLUME_MATERIAL_EXT)
      diffuseTransmissionThickness = materialInfo .thickness * (length (x3d_ModelViewMatrix [0] .xyz) + length (x3d_ModelViewMatrix [1] .xyz) + length (x3d_ModelViewMatrix [2] .xyz)) / 3.0;
   #endif
   #endif

   // Calculate lighting contribution from image based lighting source (IBL)
   #if defined (X3D_USE_IBL)
      f_diffuse = getDiffuseLight (n);

      #if defined (X3D_DIFFUSE_TRANSMISSION_MATERIAL_EXT)
         vec3 diffuseTransmissionIBL = getDiffuseLight (-n) * materialInfo .diffuseTransmissionColorFactor;

         #if defined (X3D_VOLUME_MATERIAL_EXT)
            diffuseTransmissionIBL = applyVolumeAttenuation (diffuseTransmissionIBL, diffuseTransmissionThickness, materialInfo .attenuationColor, materialInfo .attenuationDistance);
         #endif

         f_diffuse *= materialInfo .diffuseTransmissionFactor;
         f_diffuse += diffuseTransmissionIBL * materialInfo .diffuseTransmissionFactor;
      #endif

      // Calculate fresnel mix for IBL

      vec3 f_dielectric_fresnel_ibl = getIBLGGXFresnel (n, v, materialInfo .perceptualRoughness, materialInfo .f0_dielectric, materialInfo .specularWeight);

      x3d_IBLColor = vec4 (mix (f_diffuse, f_specular_dielectric, f_dielectric_fresnel_ibl), float (x3d_ScatterMaterialIdEXT) / 255.0);
   #endif

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
         float VdotH = clamp (dot (v, h), 0.0, 1.0);

         vec3 dielectric_fresnel = F_Schlick (materialInfo .f0_dielectric * materialInfo .specularWeight, materialInfo .f90_dielectric, abs (VdotH));

         // Calculation of analytical light
         // https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#acknowledgments AppendixB
         vec3 lightIntensity = getLightIntensity (light, l, distanceToLight);

         vec3 l_diffuse             = lightIntensity * NdotL / M_PI;
         vec3 l_specular_dielectric = vec3 (0.0);
         vec3 l_dielectric_brdf     = vec3 (0.0);

         #if defined (X3D_DIFFUSE_TRANSMISSION_MATERIAL_EXT)
            l_diffuse *= materialInfo .diffuseTransmissionFactor;

            if (dot (n, l) < 0.0)
            {
               float diffuseNdotL = clamp (dot (-n, l), 0.0, 1.0);
               vec3  diffuse_btdf = lightIntensity * diffuseNdotL * BRDF_lambertian (materialInfo .diffuseTransmissionColorFactor);

               vec3  l_mirror     = normalize (l + 2.0 * n * dot (-l, n)); // Mirror light reflection vector on surface
               float diffuseVdotH = clamp (dot (v, normalize (l_mirror + v)), 0.0, 1.0);

               dielectric_fresnel = F_Schlick (materialInfo .f0_dielectric * materialInfo .specularWeight, materialInfo .f90_dielectric, abs (diffuseVdotH));

               #if defined (X3D_VOLUME_MATERIAL_EXT)
                  diffuse_btdf = applyVolumeAttenuation (diffuse_btdf, diffuseTransmissionThickness, materialInfo .attenuationColor, materialInfo .attenuationDistance);
               #endif

               l_diffuse += diffuse_btdf * materialInfo .diffuseTransmissionFactor;
            }
         #endif // X3D_DIFFUSE_TRANSMISSION_MATERIAL_EXT

         l_dielectric_brdf = mix (l_diffuse, l_specular_dielectric, dielectric_fresnel); // Do we need to handle vec3 fresnel here?
         color            += l_dielectric_brdf;
      }
   }
   #endif

   return vec4 (color, float (x3d_ScatterMaterialIdEXT) / 255.0);
}
`;
