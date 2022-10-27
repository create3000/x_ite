
#if defined (X3D_SHADOWS)
#pragma X3D include "ShadowIntensity.glsl"

uniform int x3d_NumLights;
uniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];

vec3
getShadowColor (const in vec3 normal, in vec3 finalColor)
{
   vec3 N = normalize (normal);

   for (int i = 0; i < x3d_MaxLights; ++ i)
   {
      if (i == x3d_NumLights)
         break;

      x3d_LightSourceParameters light = x3d_LightSource [i];

      vec3  vL = light .location - vertex;
      float dL = length (light .matrix * vL);
      bool  di = light .type == x3d_DirectionalLight;

      if (di || dL <= light .radius)
      {
         vec3 d = light .direction;
         vec3 L = di ? -d : normalize (vL);

         float lightAngle = dot (N, L); // Angle between normal and light ray.

         if (lightAngle > 0.0)
            finalColor = mix (finalColor, light .shadowColor, getShadowIntensity (i, light) * 0.8);
      }
   }

   return finalColor;
}
#endif
