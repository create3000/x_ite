export default () => /* glsl */ `

// Originally from:
// https://github.com/KhronosGroup/glTF-Sample-Renderer/blob/main/source/Renderer/shaders/punctual.glsl

#if defined (X3D_TRANSMISSION_MATERIAL_EXT) || defined (X3D_DIFFUSE_TRANSMISSION_MATERIAL_EXT)
float
applyIorToRoughness (const in float roughness, const in float ior)
{
    // Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
    // an IOR of 1.5 results in the default amount of microfacet refraction.
    return roughness * clamp (ior * 2.0 - 2.0, 0.0, 1.0);
}
#endif

#if defined (X3D_LIGHTING)

// https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_lights_punctual/README.md#range-property
float
getRangeAttenuation (const in float radius, const in float distanceToLight)
{
   if (radius <= 0.0)
   {
      // negative range means unlimited
      return 1.0 / pow (distanceToLight, 2.0);
   }

   return max (min (1.0 - pow (distanceToLight / radius, 4.0), 1.0), 0.0) / pow (distanceToLight, 2.0);
}

// https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_lights_punctual/README.md#inner-and-outer-cone-angles
float
getSpotAttenuation (const in vec3 pointToLight, const in vec3 spotDirection, const in float outerConeCos, const in float innerConeCos)
{
   float actualCos = dot (normalize (spotDirection), normalize (-pointToLight));

   if (actualCos > outerConeCos)
   {
      if (actualCos < innerConeCos)
      {
         float angularAttenuation = (actualCos - outerConeCos) / (innerConeCos - outerConeCos);

         return angularAttenuation * angularAttenuation;
      }

      return 1.0;
   }

   return 0.0;
}

vec3
getLightIntensity (const in x3d_LightSourceParameters light, const in vec3 pointToLight, const in float distanceToLight)
{
   float attenuation      = dot (light .attenuation, vec3 (1.0, distanceToLight, distanceToLight * distanceToLight));
   float rangeAttenuation = 1.0;
   float spotAttenuation  = 1.0;

   if (light .type != x3d_DirectionalLight)
   {
      rangeAttenuation = getRangeAttenuation (light .radius, distanceToLight);
   }

   if (light .type == x3d_SpotLight)
   {
      spotAttenuation = getSpotAttenuation (pointToLight, light .direction, cos (light .cutOffAngle), cos (light .beamWidth));
   }

   return attenuation * rangeAttenuation * spotAttenuation * light .intensity * light .color;
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

#if defined (X3D_TRANSMISSION_MATERIAL_EXT) || defined (X3D_DIFFUSE_TRANSMISSION_MATERIAL_EXT)
vec3
getPunctualRadianceTransmission (const in vec3 normal, const in vec3 view, const in vec3 pointToLight, const in float alphaRoughness, const in vec3 baseColor, const in float ior)
{
    float transmissionRoughness = applyIorToRoughness (alphaRoughness, ior);

    vec3 n        = normalize (normal);           // Outward direction of surface point
    vec3 v        = normalize (view);             // Direction from surface point to view
    vec3 l        = normalize (pointToLight);
    vec3 l_mirror = normalize (l + 2.0 * n * dot (-l, n)); // Mirror light reflection vector on surface
    vec3 h        = normalize (l_mirror + v);              // Halfway vector between transmission light vector and v

    float D   = D_GGX (clamp (dot (n, h), 0.0, 1.0), transmissionRoughness);
    float Vis = V_GGX (clamp (dot (n, l_mirror), 0.0, 1.0), clamp (dot (n, v), 0.0, 1.0), transmissionRoughness);

    // Transmission BTDF
    return baseColor * D * Vis;
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
getVolumeTransmissionRay (const in vec3 n, const in vec3 v, const in float thickness, const in float ior, in mat4 modelMatrix)
{
   // Direction of refracted light.
   vec3 refractionVector = refract (-v, normalize (n), 1.0 / ior);

   // Compute rotation-independent scaling of the model matrix.
   vec3 modelScale;

   modelScale .x = length (modelMatrix [0] .xyz);
   modelScale .y = length (modelMatrix [1] .xyz);
   modelScale .z = length (modelMatrix [2] .xyz);

   // The thickness is specified in local space.
   return normalize (refractionVector) * thickness * modelScale;
}
#endif
`;
