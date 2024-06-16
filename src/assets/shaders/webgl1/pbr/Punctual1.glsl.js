export default /* glsl */ `
#if defined (X3D_LIGHTING)

#pragma X3D include "../common/Lighting.glsl"

vec3
getLightIntensity (const in x3d_LightSourceParameters light, const in vec3 pointToLight, const in float distanceToLight)
{
   float attenuationFactor = 1.0;
   float spotFactor        = 1.0;

   if (light .type != x3d_DirectionalLight)
   {
      attenuationFactor = getAttenuation (light .attenuation, distanceToLight);
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

    return NdotL * BRDF_specularGGX (f0, f90, clearcoatRoughness * clearcoatRoughness, 1.0, VdotH, NdotL, NdotV, NdotH);
}
#endif

#endif
`;
