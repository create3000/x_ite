#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;

uniform mat3 x3d_NormalMatrix;
uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

uniform bool x3d_ColorMaterial; // true if a X3DColorNode is attached, otherwise false

uniform int x3d_NumLights;
uniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];
uniform x3d_MaterialParameters x3d_Material;

in float x3d_FogDepth;
in vec4  x3d_Color;
in vec3  x3d_Normal;
in vec4  x3d_Vertex;

#if x3d_MaxTextures > 0
in vec4 x3d_TexCoord0;
#endif

#if x3d_MaxTextures > 1
in vec4 x3d_TexCoord1;
#endif

out float fogDepth;    // fog depth
out vec4  frontColor;  // color
out vec4  backColor;   // color
out vec3  normal;      // normal vector at this point on geometry
out vec3  vertex;      // point on geometry
out vec3  localNormal; // normal vector at this point on geometry in local coordinates
out vec3  localVertex; // point on geometry in local coordinates

#if x3d_MaxTextures > 0
out vec4  texCoord0;   // texCoord0
#endif

#if x3d_MaxTextures > 1
out vec4  texCoord1;   // texCoord1
#endif

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
out float depth;
#endif

#pragma X3D include "include/Particle.glsl"
#pragma X3D include "include/SpotFactor.glsl"

vec4
getMaterialColor (const in vec3 N,
                  const in vec3 vertex,
                  const in x3d_MaterialParameters material)
{
   vec3 V = normalize (-vertex); // normalized vector from point on geometry to viewer's position

   // Calculate diffuseColor & alpha

   float alpha        = (1.0 - material .transparency) * (x3d_ColorMaterial ? x3d_Color .a : 1.0);
   vec3  diffuseColor = x3d_ColorMaterial ? x3d_Color .rgb : material .diffuseColor;
   vec3  ambientColor = diffuseColor * material .ambientIntensity;

   // Apply light sources

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

         float attenuationFactor     = di ? 1.0 : 1.0 / max (c [0] + c [1] * dL + c [2] * (dL * dL), 1.0);
         float spotFactor            = light .type == x3d_SpotLight ? getSpotFactor (light .cutOffAngle, light .beamWidth, L, d) : 1.0;
         float attenuationSpotFactor = attenuationFactor * spotFactor;
         vec3  ambientTerm           = light .ambientIntensity * ambientColor;
         vec3  diffuseSpecularTerm   = light .intensity * (diffuseTerm + specularTerm);

         finalColor += attenuationSpotFactor * light .color * (ambientTerm + diffuseSpecularTerm);
      }
   }

   finalColor += material .emissiveColor;

   return vec4 (clamp (finalColor, 0.0, 1.0), alpha);
}

void
main ()
{
   vec4 position = x3d_ModelViewMatrix * getVertex (x3d_Vertex);

   fogDepth    = x3d_FogDepth;
   vertex      = position .xyz;
   normal      = normalize (x3d_NormalMatrix * x3d_Normal);
   localNormal = x3d_Normal;
   localVertex = x3d_Vertex .xyz;

   #if x3d_MaxTextures > 0
   texCoord0 = getTexCoord (x3d_TexCoord0);
   #endif

   #if x3d_MaxTextures > 1
   texCoord1 = getTexCoord (x3d_TexCoord1);
   #endif

   gl_Position = x3d_ProjectionMatrix * position;

   #ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
   depth = 1.0 + gl_Position .w;
   #endif

   frontColor = getMaterialColor ( normal, vertex, x3d_Material);
   backColor  = getMaterialColor (-normal, vertex, x3d_Material);
}
