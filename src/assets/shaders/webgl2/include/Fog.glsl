
#if defined (X3D_FOG)

uniform x3d_FogParameters x3d_Fog;

float
getFogInterpolant ()
{
   // Returns 0.0 for fog color and 1.0 for material color.

   #if defined (X3D_FOG_COORDS)
      return clamp (1.0 - fogDepth, 0.0, 1.0);
   #else
      float visibilityRange = x3d_Fog .visibilityRange;
      float dV              = length (x3d_Fog .matrix * vertex);

      switch (x3d_Fog .type)
      {
         case x3d_LinearFog:
         {
            return max (0.0, visibilityRange - dV) / visibilityRange;
         }
         case x3d_ExponentialFog:
         {
            return exp (-dV / max (0.001, visibilityRange - dV));
         }
         default:
         {
            return 1.0;
         }
      }
   #endif
}

vec3
getFogColor (const in vec3 color)
{
   return mix (x3d_Fog .color, color, getFogInterpolant ());
}

#endif
