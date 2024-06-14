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

#endif
`;
