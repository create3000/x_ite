#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;

#pragma X3D include "include/Vertex.glsl"
#pragma X3D include "include/SpotFactor.glsl"

uniform int x3d_NumLights;
uniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];
uniform x3d_MaterialParameters x3d_Material;
uniform bool x3d_ColorMaterial; // true if a X3DColorNode is attached, otherwise false

out vec4 frontColor;
out vec4 backColor;

vec4
getMaterialColor (const in vec3 N,
                  const in vec3 vertex,
                  const in x3d_MaterialParameters material)
{
   #if defined (X3D_NORMALS)
      float alpha        = (1.0 - material .transparency) * (x3d_ColorMaterial ? x3d_Color .a : 1.0);
      vec3  diffuseColor = x3d_ColorMaterial ? x3d_Color .rgb : material .diffuseColor;
      vec3  ambientColor = diffuseColor * material .ambientIntensity;

      // Apply light sources

      vec3 V = normalize (-vertex);

      vec3 finalColor = vec3 (0.0);

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
            vec3 c = light .attenuation;
            vec3 L = di ? -d : normalize (vL);      // Normalized vector from point on geometry to light source i position.
            vec3 H = normalize (L + V);             // Specular term

            float lightAngle     = max (dot (N, L), 0.0);      // Angle between normal and light ray.
            vec3  diffuseTerm    = diffuseColor * lightAngle;
            float specularFactor = material .shininess > 0.0 ? pow (max (dot (N, H), 0.0), material .shininess * 128.0) : 1.0;
            vec3  specularTerm   = material .specularColor * specularFactor;

            float attenuationFactor     = di ? 1.0 : 1.0 / max (dot (c, vec3 (1.0, dL, dL * dL)), 1.0);
            float spotFactor            = light .type == x3d_SpotLight ? getSpotFactor (light .cutOffAngle, light .beamWidth, L, d) : 1.0;
            float attenuationSpotFactor = attenuationFactor * spotFactor;
            vec3  ambientTerm           = light .ambientIntensity * ambientColor;
            vec3  diffuseSpecularTerm   = light .intensity * (diffuseTerm + specularTerm);

            finalColor += attenuationSpotFactor * light .color * (ambientTerm + diffuseSpecularTerm);
         }
      }
   #else
      float alpha      = 1.0 - x3d_Material .transparency;
      vec3  finalColor = vec3 (0.0);

      if (x3d_ColorMaterial)
      {
         alpha      *= color .a;
         finalColor  = color .rgb;
      }
   #endif

   finalColor += material .emissiveColor;

   return vec4 (clamp (finalColor, 0.0, 1.0), alpha);
}

void
main ()
{
   vertex_main ();

   normal     = normalize (normal);
   frontColor = getMaterialColor ( normal, vertex, x3d_Material);
   backColor  = getMaterialColor (-normal, vertex, x3d_Material);
}
