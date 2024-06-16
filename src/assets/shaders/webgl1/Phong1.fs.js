import MaterialTextures from "../MaterialTextures.js";

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

${MaterialTextures .texture ("x3d_AmbientTexture", "rgb", "sRGB")}

vec3
getAmbientColor (const in vec3 diffuseColor)
{
   // Get ambient parameter.

   vec3 ambientColor = x3d_Material .ambientIntensity * diffuseColor;

   // Get texture color.

   #if defined (X3D_AMBIENT_TEXTURE)
      ambientColor *= getAmbientTexture ();
   #else
      return ambientColor;
   #endif
}

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

   #if defined (X3D_TEXTURE_PROJECTION)
      diffuseColor *= getTextureProjectorColor ();
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
