export default /* glsl */ `
float
getSpotFactor (const in float cutOffAngle, const in float beamWidth, const in vec3 L, const in vec3 d)
{
   float spotAngle = acos (clamp (dot (-L, d), -1.0, 1.0));

   if (spotAngle >= cutOffAngle)
      return 0.0;
   else if (spotAngle <= beamWidth)
      return 1.0;

   return (spotAngle - cutOffAngle) / (beamWidth - cutOffAngle);
}
`;
