export default /* glsl */ `

// Originally from:
// https://github.com/KhronosGroup/glTF-Sample-Renderer/blob/main/source/Renderer/shaders/pbr.frag

#pragma X3D include "../common/Fragment.glsl"
#pragma X3D include "../common/Shadow.glsl"

#if defined (X3D_LIGHTING)
   uniform x3d_LightSourceParameters x3d_LightSource [X3D_NUM_LIGHTS];
#endif

uniform x3d_PhysicalMaterialParameters x3d_Material;

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

   vec3 color = vec3 (0.0);

   vec3 v = normalize (-vertex);

   #if defined (X3D_USE_IBL) || defined (X3D_LIGHTING)
      NormalInfo normalInfo = getNormalInfo (x3d_Material .normalScale);

      vec3  n     = normalInfo .n;
      float NdotV = clamp (dot (n, v), 0.0, 1.0);
   #endif

   MaterialInfo materialInfo;

   // Anything less than 2% is physically impossible and is instead considered to be shadowing. Compare to "Real-Time-Rendering" 4th editon on page 325.
   materialInfo .baseColor      = baseColor .rgb;
   materialInfo .f90_dielectric = vec3(1.0);
   materialInfo .metallic       = 0.0;

   materialInfo = getSpecularGlossinessInfo (materialInfo);

   materialInfo .perceptualRoughness = clamp (materialInfo .perceptualRoughness, 0.0, 1.0);

   // Roughness is authored as perceptual roughness; as is convention,
   // convert to material roughness by squaring the perceptual roughness.
   materialInfo .alphaRoughness = materialInfo .perceptualRoughness * materialInfo .perceptualRoughness;

   // LIGHTING
   vec3 f_emissive = vec3 (0.0);

   // Calculate lighting contribution from image based lighting source (IBL)
   #if defined (X3D_USE_IBL)
      vec3 f_diffuse             = getDiffuseLight (n) * baseColor .rgb ;
      vec3 f_specular_dielectric = getIBLRadianceGGX (n, v, materialInfo .perceptualRoughness);

      // Calculate fresnel mix for IBL

      vec3 f_dielectric_fresnel_ibl = getIBLGGXFresnel (n, v, materialInfo .perceptualRoughness, materialInfo .f0_dielectric, 1.0);
      vec3 f_dielectric_brdf_ibl    = mix (f_diffuse, f_specular_dielectric,  f_dielectric_fresnel_ibl);

      color = f_dielectric_brdf_ibl;

      // Holger: moved occlusion out of IBL.
      #if defined (X3D_OCCLUSION_TEXTURE)
         float ao = getOcclusionFactor ();

         color *= 1.0 + x3d_Material .occlusionStrength * (ao - 1.0);
      #endif

   #endif //end USE_IBL

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
         float NdotV = clamp (dot (n, v), 0.0, 1.0);
         float NdotH = clamp (dot (n, h), 0.0, 1.0);
         float VdotH = clamp (dot (v, h), 0.0, 1.0);

         vec3 dielectric_fresnel = F_Schlick (materialInfo .f0_dielectric, materialInfo .f90_dielectric, abs (VdotH));

         // Calculation of analytical light
         // https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#acknowledgments AppendixB
         vec3 lightIntensity = getLightIntensity (light, l, distanceToLight);

         #if defined (X3D_SHADOWS)
            lightIntensity = mix (lightIntensity, light .shadowColor, getShadowIntensity (i, light));
         #endif

         vec3 l_diffuse = lightIntensity * NdotL * BRDF_lambertian (baseColor .rgb);

         // Calculation of analytical light
         // https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#acknowledgments AppendixB
         vec3 intensity = lightIntensity;

         vec3 l_specular_dielectric = intensity * NdotL * BRDF_specularGGX (materialInfo .alphaRoughness, NdotL, NdotV, NdotH);
         vec3 l_dielectric_brdf     = mix (l_diffuse, l_specular_dielectric, dielectric_fresnel); // Do we need to handle vec3 fresnel here?

         color += l_dielectric_brdf;
      }
   }
   #endif // USE_PUNCTUAL

   f_emissive = getEmissiveColor ();

   #if defined (X3D_UNLIT_MATERIAL_EXT)
      color = baseColor .rgb;
   #elif (defined (X3D_GEOMETRY_0D) || defined (X3D_GEOMETRY_1D)) && !defined (X3D_NORMALS)
      // Points or Lines with no NORMAL attribute SHOULD be rendered without lighting and instead use the sum of the base color value and the emissive value.
      color = f_emissive + baseColor .rgb;
   #else
      color = f_emissive + color;
   #endif

   return vec4 (color, baseColor .a);
}

void
main ()
{
   fragment_main ();
}
`;
