import MaterialTextures from "../../MaterialTextures.js";

export default /* glsl */ `
#pragma X3D include "Fragment.glsl"

uniform x3d_MaterialParameters x3d_Material;

#if defined (X3D_LIGHTING)
${MaterialTextures .texture ("x3d_AmbientTexture", "rgb", "sRGB")}

vec3
getAmbientColor (const in vec3 diffuseColor)
{
   // Get ambient parameter.

   vec3 ambientColor = x3d_Material .ambientIntensity * diffuseColor;

   // Get texture color.

   #if defined (X3D_AMBIENT_TEXTURE)
      ambientColor *= getAmbientTexture ();
   #endif

   return ambientColor;
}
#endif

${MaterialTextures .texture ("x3d_DiffuseTexture", "rgba", "sRGB")}

vec4
getDiffuseColor ()
{
   // Get diffuse parameter.

   float alpha = 1.0 - x3d_Material .transparency;

   #if defined (X3D_COLOR_MATERIAL)
      vec4 diffuseColor = vec4 (color .rgb, color .a * alpha);
   #else
      vec4 diffuseColor = vec4 (x3d_Material .diffuseColor, alpha);
   #endif

   // Get texture color.

   #if defined (X3D_DIFFUSE_TEXTURE)
      diffuseColor *= getDiffuseTexture ();
   #elif defined (X3D_TEXTURE)
      diffuseColor = getTextureColor (diffuseColor, vec4 (x3d_Material .specularColor, alpha));
   #endif

   return diffuseColor;
}

#if defined (X3D_LIGHTING)
${MaterialTextures .texture ("x3d_SpecularTexture", "rgb", "sRGB")}

vec3
getSpecularColor ()
{
   // Get specular parameter.

   vec3 specularColor = x3d_Material .specularColor;

   // Get texture color.

   #if defined (X3D_SPECULAR_TEXTURE)
      specularColor *= getSpecularTexture ();
   #endif

   return specularColor;
}
#endif

${MaterialTextures .texture ("x3d_EmissiveTexture", "rgb", "sRGB")}

vec3
getEmissiveColor ()
{
   // Get emissive parameter.

   vec3 emissiveColor = x3d_Material .emissiveColor;

   // Get texture color.

   #if defined (X3D_EMISSIVE_TEXTURE)
      emissiveColor *= getEmissiveTexture ();
   #endif

   return emissiveColor;
}

#if defined (X3D_LIGHTING)
${MaterialTextures .texture ("x3d_ShininessTexture", "a")}

float
getShininessFactor ()
{
   // Get shininess parameter.

   float shininess = x3d_Material .shininess;

   // Get texture color.

   #if defined (X3D_SHININESS_TEXTURE)
      shininess *= getShininessTexture ();
   #endif

   return shininess;
}
#endif

${MaterialTextures .texture ("x3d_OcclusionTexture", "r")}

float
getOcclusionFactor ()
{
   // Get texture color.

   #if defined (X3D_OCCLUSION_TEXTURE)
      return getOcclusionTexture ();
   #else
      return 1.0;
   #endif
}

#if defined (X3D_LIGHTING)

#pragma X3D include "Normal.glsl"
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

         #if defined (X3D_SHADOWS)
            if (lightAngle > 0.0)
               diffuseSpecularTerm = mix (diffuseSpecularTerm, light .shadowColor, getShadowIntensity (i, light));
         #endif

         finalColor += attenuationSpotFactor * light .color * (ambientTerm + diffuseSpecularTerm);
      }
   }

   return finalColor;
}

#endif

#if defined (X3D_GOURAUD_MATERIAL)
vec4
getMaterialColor ()
{
   // Calculate diffuseColor & alpha

   float alpha = 1.0 - x3d_Material .transparency;

   #if defined (X3D_COLOR_MATERIAL)
      vec3 diffuseColor = color .rgb;
      alpha *= color .a;
   #else
      vec3 diffuseColor = x3d_Material .diffuseColor;
   #endif

   #if defined (X3D_LIGHTING)
      vec3  ambientColor  = getAmbientColor (diffuseColor);
      vec3  specularColor = getSpecularColor ();
      float shininess     = getShininessFactor ();
      float normalScale   = x3d_Material .normalScale;

      vec4 finalColor = vec4 (getMaterialColor (vertex, getNormalVector (normalScale), ambientColor, diffuseColor, specularColor, shininess), alpha);
   #else
      vec4 finalColor = vec4 (vec3 (0.0), alpha);
   #endif

   #if defined (X3D_OCCLUSION_TEXTURE)
      finalColor = mix (finalColor, finalColor * getOcclusionFactor (), x3d_Material .occlusionStrength);
   #endif

   finalColor .rgb += getEmissiveColor ();

   #if defined (X3D_DIFFUSE_TEXTURE)
      finalColor *= getDiffuseTexture ();
   #elif defined (X3D_TEXTURE)
      finalColor = getTextureColor (finalColor, vec4 (x3d_Material .specularColor, alpha));
   #endif

   #if defined (X3D_TEXTURE_PROJECTION)
      diffuseColor *= getTextureProjectorColor ();
   #endif

   return finalColor;
}
#endif

#if defined (X3D_PHONG_MATERIAL)
vec4
getMaterialColor ()
{
   // Calculate diffuseColor & alpha

   vec4  diffuseColorAlpha = getDiffuseColor ();
   float alpha             = diffuseColorAlpha .a;
   vec3  diffuseColor      = diffuseColorAlpha .rgb;

   #if defined (X3D_TEXTURE_PROJECTION)
      diffuseColor *= getTextureProjectorColor ();
   #endif

   #if defined (X3D_LIGHTING)
      vec3  ambientColor  = getAmbientColor (diffuseColor);
      vec3  specularColor = getSpecularColor ();
      float shininess     = getShininessFactor ();
      float normalScale   = x3d_Material .normalScale;

      vec3 finalColor = getMaterialColor (vertex, getNormalVector (normalScale), ambientColor, diffuseColor, specularColor, shininess);
   #else
      vec3 finalColor = vec3 (0.0);
   #endif

   #if defined (X3D_OCCLUSION_TEXTURE)
      finalColor = mix (finalColor, finalColor * getOcclusionFactor (), x3d_Material .occlusionStrength);
   #endif

   finalColor += getEmissiveColor ();

   return vec4 (finalColor, alpha);
}
#endif

void
main ()
{
   fragment_main ();
}
`;
