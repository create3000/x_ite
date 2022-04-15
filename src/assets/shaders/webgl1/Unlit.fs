
#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
#extension GL_EXT_frag_depth : enable
#endif

precision highp float;
precision highp int;

uniform int   x3d_GeometryType;
uniform bool  x3d_ColorMaterial; // true if a X3DColorNode is attached, otherwise false
uniform float x3d_AlphaCutoff;

uniform x3d_UnlitMaterialParameters x3d_Material;

varying float fogDepth;    // fog depth
varying vec4  color;       // color
varying vec3  normal;      // normal vector at this point on geometry
varying vec3  vertex;      // point on geometry
varying vec3  localNormal; // normal vector at this point on geometry in local coordinates
varying vec3  localVertex; // point on geometry in local coordinates

#if x3d_MaxTextures > 0
varying vec4 texCoord0; // texCoord0
#endif

#if x3d_MaxTextures > 1
varying vec4 texCoord1; // texCoord1
#endif

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
uniform float x3d_LogarithmicFarFactor1_2;
varying float depth;
#endif

#pragma X3D include "include/Texture.glsl"
#pragma X3D include "include/Hatch.glsl"
#pragma X3D include "include/Fog.glsl"
#pragma X3D include "include/ClipPlanes.glsl"

#ifdef X3D_MATERIAL_TEXTURES
uniform x3d_EmissiveTextureParameters x3d_EmissiveTexture;
#endif

vec4
getEmissiveColor ()
{
   // Get emissive parameter.

   float alpha             = 1.0 - x3d_Material .transparency;
   vec4  emissiveParameter = x3d_ColorMaterial ? vec4 (color .rgb, color .a * alpha) : vec4 (x3d_Material .emissiveColor, alpha);

   // Get texture color.

   #if defined(X3D_EMISSIVE_TEXTURE) && !defined(X3D_EMISSIVE_TEXTURE_3D)
      vec4 texCoord = getTexCoord (x3d_EmissiveTexture .textureTransformMapping, x3d_EmissiveTexture .textureCoordinateMapping);

      #if defined(X3D_EMISSIVE_TEXTURE_2D)
         return emissiveParameter * texture2D (x3d_EmissiveTexture .texture2D, texCoord .st) .rgba;
      #elif defined(X3D_EMISSIVE_TEXTURE_CUBE)
         return emissiveParameter * textureCube (x3d_EmissiveTexture .textureCube, texCoord .stp) .rgba;
      #endif
   #else
      return getTextureColor (emissiveParameter, vec4 (vec3 (1.0), alpha));
   #endif
}

vec4
getMaterialColor ()
{
   return getEmissiveColor ();
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

   gl_FragColor = finalColor;

   #ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
   //http://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
   if (x3d_LogarithmicFarFactor1_2 > 0.0)
      gl_FragDepthEXT = log2 (depth) * x3d_LogarithmicFarFactor1_2;
   else
      gl_FragDepthEXT = gl_FragCoord .z;
   #endif

   // DEBUG
   #ifdef X3D_SHADOWS
   //gl_FragColor .rgb = texture2D (x3d_ShadowMap [0], gl_FragCoord .xy / vec2 (x3d_Viewport .zw)) .rgb;
   //gl_FragColor .rgb = mix (tex .rgb, gl_FragColor .rgb, 0.5);
   #endif

   #ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
   //gl_FragColor .rgb = mix (vec3 (1.0, 0.0, 0.0), gl_FragColor .rgb, 0.5);
   #endif
}
