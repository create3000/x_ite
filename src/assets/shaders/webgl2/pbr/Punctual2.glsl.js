export default /* glsl */ `
#if defined (X3D_TRANSMISSION_MATERIAL_EXT)
float
applyIorToRoughness (const in float roughness, const in float ior)
{
    // Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
    // an IOR of 1.5 results in the default amount of microfacet refraction.
    return roughness * clamp (ior * 2.0 - 2.0, 0.0, 1.0);
}
#endif

#if defined (X3D_LIGHTING)

#pragma X3D include "../common/Lighting.glsl"

float
getAttenuationPBR (const in vec3 attenuation, const in float distanceToLight, const in float radius)
{
   float d = dot (attenuation, vec3 (1.0, distanceToLight, distanceToLight * distanceToLight));

   if (radius <= 0.0)
      return 1.0 / d;

   return max (min (1.0 - pow (distanceToLight / radius, 4.0), 1.0), 0.0) / d;
}

vec3
getLightIntensity (const in x3d_LightSourceParameters light, const in vec3 pointToLight, const in float distanceToLight)
{
   float attenuationFactor = 1.0;
   float spotFactor        = 1.0;

   if (light .type != x3d_DirectionalLight)
   {
      attenuationFactor = getAttenuationPBR (light .attenuation, distanceToLight, light .radius);
   }

   if (light .type == x3d_SpotLight)
   {
      spotFactor = getSpotFactor (pointToLight, light .direction, light .cutOffAngle, light .beamWidth);
   }

   return attenuationFactor * spotFactor * light .intensity * light .color;
}

#if defined (X3D_SHEEN_MATERIAL_EXT)
vec3
getPunctualRadianceSheen (const in vec3 sheenColor, const in float sheenRoughness, const in float NdotL, const in float NdotV, const in float NdotH)
{
    return NdotL * BRDF_specularSheen (sheenColor, sheenRoughness, NdotL, NdotV, NdotH);
}
#endif

#if defined (X3D_CLEARCOAT_MATERIAL_EXT)
vec3
getPunctualRadianceClearCoat (const in vec3 clearcoatNormal, const in vec3 v, const in vec3 l, const in vec3 h, const in float VdotH, const in vec3 f0, const in vec3 f90, const in float clearcoatRoughness)
{
    float NdotL = clamp (dot (clearcoatNormal, l), 0.0, 1.0);
    float NdotV = clamp (dot (clearcoatNormal, v), 0.0, 1.0);
    float NdotH = clamp (dot (clearcoatNormal, h), 0.0, 1.0);

    return NdotL * BRDF_specularGGX (clearcoatRoughness * clearcoatRoughness, NdotL, NdotV, NdotH);
}
#endif

#endif

#if defined (X3D_TRANSMISSION_MATERIAL_EXT)
vec3
getPunctualRadianceTransmission (const in vec3 n, const in vec3 v, const in vec3 l, const in float alphaRoughness, const in vec3 f0, const in vec3 f90, const in vec3 baseColor, const in float ior)
{
   float transmissionRoughness = applyIorToRoughness (alphaRoughness, ior);

   vec3 l_mirror = normalize (l + 2.0 * n * dot (-l, n)); // Mirror light reflection vector on surface
   vec3 h        = normalize (l_mirror + v);              // Halfway vector between transmission light vector and v

   float D   = D_GGX (clamp (dot (n, h), 0.0, 1.0), transmissionRoughness);
   vec3  F   = F_Schlick (f0, f90, clamp (dot (v, h), 0.0, 1.0));
   float Vis = V_GGX (clamp (dot (n, l_mirror), 0.0, 1.0), clamp (dot (n, v), 0.0, 1.0), transmissionRoughness);

   // Transmission BTDF
   return (1.0 - F) * baseColor * D * Vis;
}

// Compute attenuated light as it travels through a volume.
vec3
applyVolumeAttenuation (const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance)
{
   if (attenuationDistance == 0.0)
   {
      // Attenuation distance is +∞ (which we indicate by zero), i.e. the transmitted color is not attenuated at all.
      return radiance;
   }
   else
   {
      // Compute light attenuation using Beer's law.
      vec3 attenuationCoefficient = log (attenuationColor) / attenuationDistance;
      vec3 transmittance          = exp (attenuationCoefficient * transmissionDistance); // Beer's law

      return transmittance * radiance;
   }
}

vec3
getVolumeTransmissionRay (const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix)
{
   // Direction of refracted light.
   vec3 refractionVector = refract (-v, normalize (n), 1.0 / ior);

   // Compute rotation-independant scaling of the model matrix.
   vec3 modelScale;

   modelScale .x = length (vec3 (modelMatrix [0] .xyz));
   modelScale .y = length (vec3 (modelMatrix [1] .xyz));
   modelScale .z = length (vec3 (modelMatrix [2] .xyz));

   // The thickness is specified in local space.
   return normalize (refractionVector) * thickness * modelScale;
}
#endif
`;
