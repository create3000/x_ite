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

#pragma X3D include "include/Normal.glsl"
#pragma X3D include "include/Shadow.glsl"
#pragma X3D include "include/Texture.glsl"
#pragma X3D include "include/Hatch.glsl"
#pragma X3D include "include/Fog.glsl"
#pragma X3D include "include/ClipPlanes.glsl"

#ifdef X3D_MATERIAL_TEXTURES

uniform x3d_MaterialTextureParameters x3d_AmbientTexture;
uniform x3d_MaterialTextureParameters x3d_DiffuseTexture;
uniform x3d_MaterialTextureParameters x3d_SpecularTexture;
uniform x3d_MaterialTextureParameters x3d_EmissiveTexture;
uniform x3d_MaterialTextureParameters x3d_ShininessTexture;
uniform x3d_MaterialTextureParameters x3d_OcclusionTexture;

vec3
getAmbientColor ()
{
   // Get ambient parameter.

   vec3 ambientParameter = x3d_Material .ambientIntensity * x3d_Material .diffuseColor;

   // Get texture color.

   switch (x3d_AmbientTexture .textureType)
   {
      case x3d_TextureType2D:
      {
         vec4 texCoord = getTexCoord (x3d_AmbientTexture .textureTransformMapping, x3d_AmbientTexture .textureCoordinateMapping);

         return ambientParameter * texture (x3d_AmbientTexture .texture2D, texCoord .st) .rgb;
      }

      #ifdef X3D_MATERIAL_TEXTURE_3D
      case x3d_TextureType3D:
      {
         vec4 texCoord = getTexCoord (x3d_AmbientTexture .textureTransformMapping, x3d_AmbientTexture .textureCoordinateMapping);

         return ambientParameter * texture (x3d_AmbientTexture .texture3D, texCoord .stp) .rgb;
      }
      #endif

      #ifdef X3D_MATERIAL_TEXTURE_CUBE
      case x3d_TextureTypeCube:
      {
         vec4 texCoord = getTexCoord (x3d_AmbientTexture .textureTransformMapping, x3d_AmbientTexture .textureCoordinateMapping);

         return ambientParameter * texture (x3d_AmbientTexture .textureCube, texCoord .stp) .rgb;
      }
      #endif

      default:
         return ambientParameter;
   }
}

vec4
getDiffuseColor ()
{
   // Get diffuse parameter.

   float alpha            = 1.0 - x3d_Material .transparency;
   vec4  diffuseParameter = x3d_ColorMaterial ? vec4 (color .rgb, color .a * alpha) : vec4 (x3d_Material .diffuseColor, alpha);

   // Get texture color.

   switch (x3d_DiffuseTexture .textureType)
   {
      case x3d_TextureType2D:
      {
         vec4 texCoord = getTexCoord (x3d_DiffuseTexture .textureTransformMapping, x3d_DiffuseTexture .textureCoordinateMapping);

         return diffuseParameter * texture (x3d_DiffuseTexture .texture2D, texCoord .st);
      }

      #ifdef X3D_MATERIAL_TEXTURE_3D
      case x3d_TextureType3D:
      {
         vec4 texCoord = getTexCoord (x3d_DiffuseTexture .textureTransformMapping, x3d_DiffuseTexture .textureCoordinateMapping);

         return diffuseParameter * texture (x3d_DiffuseTexture .texture3D, texCoord .stp);
      }
      #endif

      #ifdef X3D_MATERIAL_TEXTURE_CUBE
      case x3d_TextureTypeCube:
      {
         vec4 texCoord = getTexCoord (x3d_DiffuseTexture .textureTransformMapping, x3d_DiffuseTexture .textureCoordinateMapping);

         return diffuseParameter * texture (x3d_DiffuseTexture .textureCube, texCoord .stp);
      }
      #endif

      default:
         return getTextureColor (diffuseParameter, vec4 (x3d_Material .specularColor, alpha));
   }
}

vec3
getSpecularColor ()
{
   // Get specular parameter.

   vec3 specularParameter = x3d_Material .specularColor;

   // Get texture color.

   switch (x3d_SpecularTexture .textureType)
   {
      case x3d_TextureType2D:
      {
         vec4 texCoord = getTexCoord (x3d_SpecularTexture .textureTransformMapping, x3d_SpecularTexture .textureCoordinateMapping);

         return specularParameter * texture (x3d_SpecularTexture .texture2D, texCoord .st) .rgb;
      }

      #ifdef X3D_MATERIAL_TEXTURE_3D
      case x3d_TextureType3D:
      {
         vec4 texCoord = getTexCoord (x3d_SpecularTexture .textureTransformMapping, x3d_SpecularTexture .textureCoordinateMapping);

         return specularParameter * texture (x3d_SpecularTexture .texture3D, texCoord .stp) .rgb;
      }
      #endif

      #ifdef X3D_MATERIAL_TEXTURE_CUBE
      case x3d_TextureTypeCube:
      {
         vec4 texCoord = getTexCoord (x3d_SpecularTexture .textureTransformMapping, x3d_SpecularTexture .textureCoordinateMapping);

         return specularParameter * texture (x3d_SpecularTexture .textureCube, texCoord .stp) .rgb;
      }
      #endif

      default:
         return specularParameter;
   }
}

vec3
getEmissiveColor ()
{
   // Get emissive parameter.

   vec3 emissiveParameter = x3d_Material .emissiveColor;

   // Get texture color.

   switch (x3d_EmissiveTexture .textureType)
   {
      case x3d_TextureType2D:
      {
         vec4 texCoord = getTexCoord (x3d_EmissiveTexture .textureTransformMapping, x3d_EmissiveTexture .textureCoordinateMapping);

         return emissiveParameter * texture (x3d_EmissiveTexture .texture2D, texCoord .st) .rgb;
      }

      #ifdef X3D_MATERIAL_TEXTURE_3D
      case x3d_TextureType3D:
      {
         vec4 texCoord = getTexCoord (x3d_EmissiveTexture .textureTransformMapping, x3d_EmissiveTexture .textureCoordinateMapping);

         return emissiveParameter * texture (x3d_EmissiveTexture .texture3D, texCoord .stp) .rgb;
      }
      #endif

      #ifdef X3D_MATERIAL_TEXTURE_CUBE
      case x3d_TextureTypeCube:
      {
         vec4 texCoord = getTexCoord (x3d_EmissiveTexture .textureTransformMapping, x3d_EmissiveTexture .textureCoordinateMapping);

         return emissiveParameter * texture (x3d_EmissiveTexture .textureCube, texCoord .stp) .rgb;
      }
      #endif

      default:
         return emissiveParameter;
   }
}

float
getShininessFactor ()
{
   // Get shininess parameter.

   float shininess = x3d_Material .shininess;

   // Get texture color.

   switch (x3d_ShininessTexture .textureType)
   {
      case x3d_TextureType2D:
      {
         vec4 texCoord = getTexCoord (x3d_ShininessTexture .textureTransformMapping, x3d_ShininessTexture .textureCoordinateMapping);

         return shininess * texture (x3d_ShininessTexture .texture2D, texCoord .st) .a * 128.0;
      }

      #ifdef X3D_MATERIAL_TEXTURE_3D
      case x3d_TextureType3D:
      {
         vec4 texCoord = getTexCoord (x3d_ShininessTexture .textureTransformMapping, x3d_ShininessTexture .textureCoordinateMapping);

         return shininess * texture (x3d_ShininessTexture .texture3D, texCoord .stp) .a * 128.0;
      }
      #endif

      #ifdef X3D_MATERIAL_TEXTURE_CUBE
      case x3d_TextureTypeCube:
      {
         vec4 texCoord = getTexCoord (x3d_ShininessTexture .textureTransformMapping, x3d_ShininessTexture .textureCoordinateMapping);

         return shininess * texture (x3d_ShininessTexture .textureCube, texCoord .stp) .a * 128.0;
      }
      #endif

      default:
         return shininess * 128.0;
   }
}

float
getOcclusionFactor ()
{
   // Get texture color.

   switch (x3d_OcclusionTexture .textureType)
   {
      case x3d_TextureType2D:
      {
         vec4 texCoord = getTexCoord (x3d_OcclusionTexture .textureTransformMapping, x3d_OcclusionTexture .textureCoordinateMapping);

         return texture (x3d_OcclusionTexture .texture2D, texCoord .st) .r;
      }

      #ifdef X3D_MATERIAL_TEXTURE_3D
      case x3d_TextureType3D:
      {
         vec4 texCoord = getTexCoord (x3d_OcclusionTexture .textureTransformMapping, x3d_OcclusionTexture .textureCoordinateMapping);

         return texture (x3d_OcclusionTexture .texture3D, texCoord .stp) .r;
      }
      #endif

      #ifdef X3D_MATERIAL_TEXTURE_CUBE
      case x3d_TextureTypeCube:
      {
         vec4 texCoord = getTexCoord (x3d_OcclusionTexture .textureTransformMapping, x3d_OcclusionTexture .textureCoordinateMapping);

         return texture (x3d_OcclusionTexture .textureCube, texCoord .stp) .r;
      }
      #endif

      default:
         return 1.0;
   }
}

#else

vec3
getAmbientColor ()
{
   return x3d_Material .ambientIntensity * x3d_Material .diffuseColor;
}

vec4
getDiffuseColor ()
{
   // Get diffuse parameter.

   float alpha            = 1.0 - x3d_Material .transparency;
   vec4  diffuseParameter = x3d_ColorMaterial ? vec4 (color .rgb, color .a * alpha) : vec4 (x3d_Material .diffuseColor, alpha);

   return getTextureColor (diffuseParameter, vec4 (x3d_Material .specularColor, alpha));
}

vec3
getSpecularColor ()
{
   return x3d_Material .specularColor;
}

vec3
getEmissiveColor ()
{
   return x3d_Material .emissiveColor;
}

float
getShininessFactor ()
{
   return x3d_Material .shininess * 128.0;
}

float
getOcclusionFactor ()
{
   return 1.0;
}

#endif

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

vec4
getMaterialColor ()
{
   vec3 N = getNormalVector ();
   vec3 V = normalize (-vertex); // normalized vector from point on geometry to viewer's position

   // Calculate diffuseColor & alpha

   vec4  diffuseColorAlpha = getDiffuseColor ();
   float alpha             = diffuseColorAlpha .a;
   vec3  diffuseColor      = diffuseColorAlpha .rgb;
   vec3  ambientColor      = getAmbientColor ();
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

	finalColor  = mix (finalColor, finalColor * getOcclusionFactor (), x3d_Material .occlusionStrength);
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
