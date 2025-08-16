export default () => /* glsl */ `
#if defined (X3D_FOG)

uniform x3d_FogParameters x3d_Fog;

float
getFogInterpolant ()
{
   // Returns 0.0 for fog color and 1.0 for material color.

   #if defined (X3D_FOG_COORDS)
      return clamp (1.0 - fogDepth, 0.0, 1.0);
   #else
      float visibilityStart = x3d_Fog .visibilityStart;
      float visibilityRange = x3d_Fog .visibilityRange;
      float dV              = max (length (x3d_Fog .matrix * vertex) - visibilityStart, 0.0);

      #if defined (X3D_FOG_LINEAR)
         return max (visibilityRange - dV, 0.0) / visibilityRange;
      #elif defined (X3D_FOG_EXPONENTIAL)
         return exp (-dV / max (visibilityRange - dV, 0.001));
      #endif
   #endif
}

vec3
getFogColor (const in vec3 color)
{
   return mix (x3d_Fog .color, color, getFogInterpolant ());
}

#endif
`;
