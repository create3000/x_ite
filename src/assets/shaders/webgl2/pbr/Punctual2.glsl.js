export default /* glsl */ `
#if defined (X3D_LIGHTING)

// X3D attenuation
float
getAttenuation (const in vec3 attenuation, const in float distanceToLight)
{
   return 1.0 / max (dot (attenuation, vec3 (1.0, distanceToLight, distanceToLight * distanceToLight)), 1.0);
}

// https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_lights_punctual/README.md#range-property
float
getRangeAttenuation (const in float range, const in float _distance)
{
   if (range <= 0.0)
   {
      // negative range means unlimited
      return 1.0 / pow (_distance, 2.0);
   }

   return clamp (1.0 - pow (_distance / range, 4.0), 0.0, 1.0) / pow (_distance, 2.0);
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
         return smoothstep (outerConeCos, innerConeCos, actualCos);
      }

      return 1.0;
   }

   return 0.0;
}

vec3
getLightIntensity (const in x3d_LightSourceParameters light, const in vec3 pointToLight, const in float distanceToLight)
{
   float attenuation      = 1.0;
   float rangeAttenuation = 1.0;
   float spotAttenuation  = 1.0;

   if (light .type != x3d_DirectionalLight)
   {
      attenuation      = getAttenuation (light .attenuation, distanceToLight);
      rangeAttenuation = getRangeAttenuation (light .radius, length (pointToLight));
   }

   if (light .type == x3d_SpotLight)
   {
      spotAttenuation = getSpotAttenuation (pointToLight, light .direction, cos (light .cutOffAngle), cos (light .beamWidth));
   }

   return attenuation * rangeAttenuation * spotAttenuation * light .intensity * light .color;
}

#endif
`;
