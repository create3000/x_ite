export default /* glsl */ `

#extension GL_OES_standard_derivatives : enable
#extension GL_EXT_frag_depth : enable

precision highp float;
precision highp int;
precision highp sampler2D;
precision highp samplerCube;

#pragma X3D include "common/Fragment.glsl"
#pragma X3D include "common/Material.glsl"
#pragma X3D include "common/Normal.glsl"

#if defined (X3D_AMBIENT_TEXTURE)
   uniform x3d_AmbientTextureParameters x3d_AmbientTexture;
#endif

vec3
getAmbientColor (const in vec3 diffuseColor)
{
   // Get ambient parameter.

   vec3 ambientParameter = x3d_Material .ambientIntensity * diffuseColor;

   // Get texture color.

   #if defined (X3D_AMBIENT_TEXTURE)
      vec3 texCoord = getTexCoord (x3d_AmbientTexture .textureTransformMapping, x3d_AmbientTexture .textureCoordinateMapping, x3d_AmbientTexture .textureMatrix);

      #if defined (X3D_AMBIENT_TEXTURE_2D)
         return ambientParameter * texture2D (x3d_AmbientTexture .texture2D, texCoord .st) .rgb;
      #elif defined (X3D_AMBIENT_TEXTURE_CUBE)
         return ambientParameter * textureCube (x3d_AmbientTexture .textureCube, texCoord) .rgb;
      #endif
   #else
      return ambientParameter;
   #endif
}

#if defined (X3D_DIFFUSE_TEXTURE)
   uniform x3d_DiffuseTextureParameters x3d_DiffuseTexture;
#endif

vec4
getDiffuseColor ()
{
   // Get diffuse parameter.

   float alpha = 1.0 - x3d_Material .transparency;

   #if defined (X3D_COLOR_MATERIAL)
      vec4 diffuseParameter = vec4 (color .rgb, color .a * alpha);
   #else
      vec4 diffuseParameter = vec4 (x3d_Material .diffuseColor, alpha);
   #endif

   // Get texture color.

   #if defined (X3D_DIFFUSE_TEXTURE)
      vec3 texCoord = getTexCoord (x3d_DiffuseTexture .textureTransformMapping, x3d_DiffuseTexture .textureCoordinateMapping, x3d_DiffuseTexture .textureMatrix);

      #if defined (X3D_DIFFUSE_TEXTURE_2D)
         diffuseParameter *= texture2D (x3d_DiffuseTexture .texture2D, texCoord .st);
      #elif defined (X3D_DIFFUSE_TEXTURE_CUBE)
         diffuseParameter *= textureCube (x3d_DiffuseTexture .textureCube, texCoord);
      #endif
   #elif defined (X3D_TEXTURE)
      diffuseParameter = getTextureColor (diffuseParameter, vec4 (x3d_Material .specularColor, alpha));
   #endif

   return diffuseParameter;
}

#if defined (X3D_SPECULAR_TEXTURE)
   uniform x3d_SpecularTextureParameters x3d_SpecularTexture;
#endif

vec3
getSpecularColor ()
{
   // Get specular parameter.

   vec3 specularParameter = x3d_Material .specularColor;

   // Get texture color.

   #if defined (X3D_SPECULAR_TEXTURE)
      vec3 texCoord = getTexCoord (x3d_SpecularTexture .textureTransformMapping, x3d_SpecularTexture .textureCoordinateMapping, x3d_SpecularTexture .textureMatrix);

      #if defined (X3D_SPECULAR_TEXTURE_2D)
         specularParameter *= texture2D (x3d_SpecularTexture .texture2D, texCoord .st) .rgb;
      #elif defined (X3D_SPECULAR_TEXTURE_CUBE)
         specularParameter *= textureCube (x3d_SpecularTexture .textureCube, texCoord) .rgb;
      #endif
   #endif

   return specularParameter;
}

#if defined (X3D_EMISSIVE_TEXTURE)
   uniform x3d_EmissiveTextureParameters x3d_EmissiveTexture;
#endif

vec3
getEmissiveColor ()
{
   // Get emissive parameter.

   vec3 emissiveParameter = x3d_Material .emissiveColor;

   // Get texture color.

   #if defined (X3D_EMISSIVE_TEXTURE)
      vec3 texCoord = getTexCoord (x3d_EmissiveTexture .textureTransformMapping, x3d_EmissiveTexture .textureCoordinateMapping, x3d_EmissiveTexture .textureMatrix);

      #if defined (X3D_EMISSIVE_TEXTURE_2D)
         emissiveParameter *= texture2D (x3d_EmissiveTexture .texture2D, texCoord .st) .rgb;
      #elif defined (X3D_EMISSIVE_TEXTURE_CUBE)
         emissiveParameter *= textureCube (x3d_EmissiveTexture .textureCube, texCoord) .rgb;
      #endif
   #endif

   return emissiveParameter;
}

#if defined (X3D_SHININESS_TEXTURE)
   uniform x3d_ShininessTextureParameters x3d_ShininessTexture;
#endif

float
getShininessFactor ()
{
   // Get shininess parameter.

   float shininess = x3d_Material .shininess;

   // Get texture color.

   #if defined (X3D_SHININESS_TEXTURE)
      vec3 texCoord = getTexCoord (x3d_ShininessTexture .textureTransformMapping, x3d_ShininessTexture .textureCoordinateMapping, x3d_ShininessTexture .textureMatrix);

      #if defined (X3D_SHININESS_TEXTURE_2D)
         shininess *= texture2D (x3d_ShininessTexture .texture2D, texCoord .st) .a;
      #elif defined (X3D_SHININESS_TEXTURE_CUBE)
         shininess *= textureCube (x3d_ShininessTexture .textureCube, texCoord) .a;
      #endif
   #endif

   return shininess;
}

#if defined (X3D_OCCLUSION_TEXTURE)
   uniform x3d_OcclusionTextureParameters x3d_OcclusionTexture;
#endif

float
getOcclusionFactor ()
{
   // Get texture color.

   #if defined (X3D_OCCLUSION_TEXTURE)
      vec3 texCoord = getTexCoord (x3d_OcclusionTexture .textureTransformMapping, x3d_OcclusionTexture .textureCoordinateMapping, x3d_OcclusionTexture .textureMatrix);

      #if defined (X3D_OCCLUSION_TEXTURE_2D)
         return texture2D (x3d_OcclusionTexture .texture2D, texCoord .st) .r;
      #elif defined (X3D_OCCLUSION_TEXTURE_CUBE)
         return textureCube (x3d_OcclusionTexture .textureCube, texCoord) .r;
      #endif
   #else
      return 1.0;
   #endif
}

vec4
getMaterialColor ()
{
   // Calculate diffuseColor & alpha

   vec4  diffuseColorAlpha = getDiffuseColor ();
   float alpha             = diffuseColorAlpha .a;
   vec3  diffuseColor      = diffuseColorAlpha .rgb;
   vec3  ambientColor      = getAmbientColor (diffuseColor);
   vec3  specularColor     = getSpecularColor ();
   float shininess         = getShininessFactor ();
   float normalScale       = x3d_Material .normalScale;

   #if defined (X3D_TEXTURE_PROJECTORS)
      vec4 P = getTextureProjectorColor (vec4 (1.0));

      diffuseColor *= P .rgb;
      alpha        *= P .a;
   #endif

   #if defined (X3D_LIGHTING)
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

void
main ()
{
   fragment_main ();
}
`;
