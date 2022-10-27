#version 300 es

precision highp float;
precision highp int;
precision highp sampler3D;

#pragma X3D include "include/Fragment.glsl"
#pragma X3D include "include/Shadow.glsl"

in vec4 frontColor;
in vec4 backColor;

#if defined (X3D_SHADOWS)
   uniform int x3d_NumLights;
   uniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];
#endif

vec4
getMaterialColor ()
{
   vec4 finalColor = gl_FrontFacing ? frontColor : backColor;

   finalColor = getTextureColor (finalColor, vec4 (1.0));
   finalColor = getProjectiveTextureColor (finalColor);

   #if defined (X3D_SHADOWS)
      vec3  N               = normalize (normal);
      vec3  shadowColor     = vec3 (0.0);
      float shadowIntensity = 0.0;

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
            {
               shadowColor     += light .shadowColor;
               shadowIntensity += getShadowIntensity (i, light);
            }
         }
      }

      finalColor .rgb = mix (finalColor .rgb, shadowColor, shadowIntensity);
   #endif

   return finalColor;
}

void
main ()
{
   fragment_main ();
}
