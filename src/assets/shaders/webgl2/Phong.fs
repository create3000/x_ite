#version 300 es

precision highp float;
precision highp int;

uniform int   x3d_GeometryType;
uniform bool  x3d_ColorMaterial; // true if a X3DColorNode is attached, otherwise false
uniform float x3d_AlphaCutoff;

uniform int x3d_NumLights;
uniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];
uniform x3d_MaterialParameters    x3d_Material;

in float fogDepth;    // fog depth
in vec4  color;       // color
in vec3  normal;      // normal vector at this point on geometry
in vec3  vertex;      // point on geometry
in vec3  localNormal; // normal vector at this point on geometry in local coordinates
in vec3  localVertex; // point on geometry in local coordinates

#if x3d_MaxTextures > 0
in vec4 texCoord0;
#endif

#if x3d_MaxTextures > 1
in vec4 texCoord1;
#endif

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
uniform float x3d_LogarithmicFarFactor1_2;
in float depth;
#endif

out vec4 x3d_FragColor;

#pragma X3D include "include/Shadow.glsl"
#pragma X3D include "include/Texture.glsl"
#pragma X3D include "include/Normal.glsl"
#pragma X3D include "include/Hatch.glsl"
#pragma X3D include "include/Fog.glsl"
#pragma X3D include "include/ClipPlanes.glsl"
#pragma X3D include "include/SpotFactor.glsl"

#ifdef X3D_MATERIAL_TEXTURES
uniform x3d_AmbientTextureParameters   x3d_AmbientTexture;
uniform x3d_DiffuseTextureParameters   x3d_DiffuseTexture;
uniform x3d_SpecularTextureParameters  x3d_SpecularTexture;
uniform x3d_EmissiveTextureParameters  x3d_EmissiveTexture;
uniform x3d_ShininessTextureParameters x3d_ShininessTexture;
uniform x3d_OcclusionTextureParameters x3d_OcclusionTexture;
#endif

vec3
getAmbientColor (in vec3 diffuseColor)
{
   // Get ambient parameter.

   vec3 ambientParameter = x3d_Material .ambientIntensity * diffuseColor;

   // Get texture color.

   #if defined(X3D_AMBIENT_TEXTURE)
      vec4 texCoord = getTexCoord (x3d_AmbientTexture .textureTransformMapping, x3d_AmbientTexture .textureCoordinateMapping);

      #if defined(X3D_AMBIENT_TEXTURE_2D)
         return ambientParameter * texture (x3d_AmbientTexture .texture2D, texCoord .st) .rgb;
      #elif defined(X3D_AMBIENT_TEXTURE_3D)
         return ambientParameter * texture (x3d_AmbientTexture .texture3D, texCoord .stp) .rgb;
      #elif defined(X3D_AMBIENT_TEXTURE_CUBE)
         return ambientParameter * texture (x3d_AmbientTexture .textureCube, texCoord .stp) .rgb;
      #endif
   #else
      return ambientParameter;
   #endif
}

vec4
getDiffuseColor ()
{
   // Get diffuse parameter.

   float alpha            = 1.0 - x3d_Material .transparency;
   vec4  diffuseParameter = x3d_ColorMaterial ? vec4 (color .rgb, color .a * alpha) : vec4 (x3d_Material .diffuseColor, alpha);

   // Get texture color.

   #if defined(X3D_DIFFUSE_TEXTURE)
      vec4 texCoord = getTexCoord (x3d_DiffuseTexture .textureTransformMapping, x3d_DiffuseTexture .textureCoordinateMapping);

      #if defined(X3D_DIFFUSE_TEXTURE_2D)
         return diffuseParameter * texture (x3d_DiffuseTexture .texture2D, texCoord .st) .rgba;
      #elif defined(X3D_DIFFUSE_TEXTURE_3D)
         return diffuseParameter * texture (x3d_DiffuseTexture .texture3D, texCoord .stp) .rgba;
      #elif defined(X3D_DIFFUSE_TEXTURE_CUBE)
         return diffuseParameter * texture (x3d_DiffuseTexture .textureCube, texCoord .stp) .rgba;
      #endif
   #else
      return getTextureColor (diffuseParameter, vec4 (x3d_Material .specularColor, alpha));
   #endif
}

vec3
getSpecularColor ()
{
   // Get specular parameter.

   vec3 specularParameter = x3d_Material .specularColor;

   // Get texture color.

   #if defined(X3D_SPECULAR_TEXTURE)
      vec4 texCoord = getTexCoord (x3d_SpecularTexture .textureTransformMapping, x3d_SpecularTexture .textureCoordinateMapping);

      #if defined(X3D_SPECULAR_TEXTURE_2D)
         return specularParameter * texture (x3d_SpecularTexture .texture2D, texCoord .st) .rgb;
      #elif defined(X3D_SPECULAR_TEXTURE_3D)
         return specularParameter * texture (x3d_SpecularTexture .texture3D, texCoord .stp) .rgb;
      #elif defined(X3D_SPECULAR_TEXTURE_CUBE)
         return specularParameter * texture (x3d_SpecularTexture .textureCube, texCoord .stp) .rgb;
      #endif
   #else
      return specularParameter;
   #endif
}

vec3
getEmissiveColor ()
{
   // Get emissive parameter.

   vec3 emissiveParameter = x3d_Material .emissiveColor;

   // Get texture color.

   #if defined(X3D_EMISSIVE_TEXTURE)
      vec4 texCoord = getTexCoord (x3d_EmissiveTexture .textureTransformMapping, x3d_EmissiveTexture .textureCoordinateMapping);

      #if defined(X3D_EMISSIVE_TEXTURE_2D)
         return emissiveParameter * texture (x3d_EmissiveTexture .texture2D, texCoord .st) .rgb;
      #elif defined(X3D_EMISSIVE_TEXTURE_3D)
         return emissiveParameter * texture (x3d_EmissiveTexture .texture3D, texCoord .stp) .rgb;
      #elif defined(X3D_EMISSIVE_TEXTURE_CUBE)
         return emissiveParameter * texture (x3d_EmissiveTexture .textureCube, texCoord .stp) .rgb;
      #endif
   #else
      return emissiveParameter;
   #endif
}

float
getShininessFactor ()
{
   // Get shininess parameter.

   float shininess = x3d_Material .shininess;

   // Get texture color.

   #if defined(X3D_SHININESS_TEXTURE)
      vec4 texCoord = getTexCoord (x3d_ShininessTexture .textureTransformMapping, x3d_ShininessTexture .textureCoordinateMapping);

      #if defined(X3D_SHININESS_TEXTURE_2D)
         return shininess * texture (x3d_ShininessTexture .texture2D, texCoord .st) .a * 128.0;
      #elif defined(X3D_SHININESS_TEXTURE_3D)
         return shininess * texture (x3d_ShininessTexture .texture3D, texCoord .stp) .a * 128.0;
      #elif defined(X3D_SHININESS_TEXTURE_CUBE)
         return shininess * texture (x3d_ShininessTexture .textureCube, texCoord .stp) .a * 128.0;
      #endif
   #else
      return shininess * 128.0;
   #endif
}

float
getOcclusionFactor ()
{
   // Get texture color.

   #if defined(X3D_OCCLUSION_TEXTURE)
      vec4 texCoord = getTexCoord (x3d_OcclusionTexture .textureTransformMapping, x3d_OcclusionTexture .textureCoordinateMapping);

      #if defined(X3D_OCCLUSION_TEXTURE_2D)
         return texture (x3d_OcclusionTexture .texture2D, texCoord .st) .r;
      #elif defined(X3D_OCCLUSION_TEXTURE_3D)
         return texture (x3d_OcclusionTexture .texture3D, texCoord .stp) .r;
      #elif defined(X3D_OCCLUSION_TEXTURE_CUBE)
         return texture (x3d_OcclusionTexture .textureCube, texCoord .stp) .r;
      #endif
   #else
      return 1.0;
   #endif
}

vec4
getMaterialColor ()
{
   vec3 N = getNormalVector ();
   vec3 V = normalize (-vertex); // normalized vector from point on geometry to viewer's position

   // Calculate diffuseColor & alpha

   vec4  diffuseColorAlpha = getDiffuseColor ();
   float alpha             = diffuseColorAlpha .a;
   vec3  diffuseColor      = diffuseColorAlpha .rgb;
   vec3  ambientColor      = getAmbientColor (diffuseColor);
   vec3  specularColor     = getSpecularColor ();
   float shininessFactor   = getShininessFactor ();

   // Projective texture

   vec4 P = getProjectiveTextureColor (vec4 (1.0));

   diffuseColor *= P .rgb;
   alpha        *= P .a;

   // Apply light sources

   vec3 finalColor = vec3 (0.0);

   for (int i = 0; i < x3d_MaxLights; i ++)
   {
      if (i == x3d_NumLights)
         break;

      x3d_LightSourceParameters light = x3d_LightSource [i];

      vec3  vL = light .location - vertex; // Light to fragment
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
         float specularFactor = shininessFactor > 0.0 ? pow (max (dot (N, H), 0.0), shininessFactor) : 1.0;
         vec3  specularTerm   = specularColor * specularFactor;

         float attenuationFactor     = di ? 1.0 : 1.0 / max (c [0] + c [1] * dL + c [2] * (dL * dL), 1.0);
         float spotFactor            = light .type == x3d_SpotLight ? getSpotFactor (light .cutOffAngle, light .beamWidth, L, d) : 1.0;
         float attenuationSpotFactor = attenuationFactor * spotFactor;
         vec3  ambientTerm           = light .ambientIntensity * ambientColor;
         vec3  diffuseSpecularTerm   = light .intensity * (diffuseTerm + specularTerm);

         #ifdef X3D_SHADOWS
            if (lightAngle > 0.0)
               diffuseSpecularTerm = mix (diffuseSpecularTerm, light .shadowColor, getShadowIntensity (i, light));
         #endif

         finalColor += attenuationSpotFactor * light .color * (ambientTerm + diffuseSpecularTerm);
      }
   }

   #ifdef X3D_OCCLUSION_TEXTURE
	finalColor = mix (finalColor, finalColor * getOcclusionFactor (), x3d_Material .occlusionStrength);
   #endif

   finalColor += getEmissiveColor ();

   return vec4 (finalColor, alpha);
}

// DEBUG
//uniform ivec4 x3d_Viewport;

void
main ()
{
   clip ();

   vec4 finalColor = vec4 (0.0);

   finalColor      = getMaterialColor ();
   finalColor      = getHatchColor (finalColor);
   finalColor .rgb = getFogColor (finalColor .rgb);

   if (finalColor .a < x3d_AlphaCutoff)
   {
      discard;
   }

   x3d_FragColor = finalColor;

   #ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
   //http://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
   if (x3d_LogarithmicFarFactor1_2 > 0.0)
      gl_FragDepth = log2 (depth) * x3d_LogarithmicFarFactor1_2;
   else
      gl_FragDepth = gl_FragCoord .z;
   #endif

   // DEBUG
   #ifdef X3D_SHADOWS
   //x3d_FragColor .rgb = texture2D (x3d_ShadowMap [0], gl_FragCoord .xy / vec2 (x3d_Viewport .zw)) .rgb;
   //x3d_FragColor .rgb = mix (tex .rgb, x3d_FragColor .rgb, 0.5);
   #endif

   #ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
   //x3d_FragColor .rgb = mix (vec3 (1.0, 0.0, 0.0), x3d_FragColor .rgb, 0.5);
   #endif
}
