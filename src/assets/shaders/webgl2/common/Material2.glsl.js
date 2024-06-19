export default /* glsl */ `
uniform x3d_MaterialParameters x3d_Material;

#if defined (X3D_LIGHTING)

#pragma X3D include "Lighting.glsl"
#pragma X3D include "Shadow.glsl"

uniform x3d_LightSourceParameters x3d_LightSource [X3D_NUM_LIGHTS];

vec3
getMaterialColor (const in vec3 vertex, const in vec3 N, const in vec3 ambientColor, const in vec3 diffuseColor, const in vec3 specularColor, const in float shininess)
{
   // Apply light sources

   vec3 V = normalize (-vertex);

   vec3 finalColor = vec3 (0.0);

   for (int i = 0; i < X3D_NUM_LIGHTS; ++ i)
   {
      x3d_LightSourceParameters light = x3d_LightSource [i];

      vec3  vL = light .location - vertex;
      float dL = length (light .matrix * vL);

      if (dL <= light .radius || light .radius < 0.0)
      {
         bool di = light .type == x3d_DirectionalLight;
         vec3 d  = light .direction;
         vec3 c  = light .attenuation;
         vec3 L  = di ? -d : normalize (vL);      // Normalized vector from point on geometry to light source i position.
         vec3 H  = normalize (L + V);             // Specular term

         float lightAngle     = max (dot (N, L), 0.0);      // Angle between normal and light ray.
         vec3  diffuseTerm    = diffuseColor * lightAngle;
         float specularFactor = shininess > 0.0 ? pow (max (dot (N, H), 0.0), shininess * 128.0) : 1.0;
         vec3  specularTerm   = specularColor * specularFactor;

         float attenuationFactor     = di ? 1.0 : getAttenuation (c, dL);
         float spotFactor            = light .type == x3d_SpotLight ? getSpotFactor (L, d, light .cutOffAngle, light .beamWidth) : 1.0;
         float attenuationSpotFactor = attenuationFactor * spotFactor;
         vec3  ambientTerm           = light .ambientIntensity * ambientColor;
         vec3  diffuseSpecularTerm   = light .intensity * (diffuseTerm + specularTerm);

         #if defined (X3D_FRAGMENT_SHADER) && defined (X3D_SHADOWS)
            if (lightAngle > 0.0)
               diffuseSpecularTerm = mix (diffuseSpecularTerm, light .shadowColor, getShadowIntensity (i, light));
         #endif

         finalColor += attenuationSpotFactor * light .color * (ambientTerm + diffuseSpecularTerm);
      }
   }

   return finalColor;
}

#endif
`;
