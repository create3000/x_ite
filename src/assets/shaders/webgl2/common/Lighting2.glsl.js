export default () => /* glsl */ `
#if defined (X3D_LIGHTING)

float
getAttenuation (const in vec3 attenuation, const in float distanceToLight)
{
   return 1.0 / max (dot (attenuation, vec3 (1.0, distanceToLight, distanceToLight * distanceToLight)), 1.0);
}

float
getSpotFactor (const in vec3 pointToLight, const in vec3 direction, const in float cutOffAngle, const in float beamWidth)
{
   float spotAngle = acos (clamp (dot (-pointToLight, direction), -1.0, 1.0));

   if (spotAngle >= cutOffAngle)
      return 0.0;
   else if (spotAngle <= beamWidth)
      return 1.0;

   return (spotAngle - cutOffAngle) / (beamWidth - cutOffAngle);
}

#endif
`;
