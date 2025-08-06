import { maxTexCoords, maxTextures } from "../../../../x_ite/Browser/Texturing/TexturingConfiguration.js";

export default () => /* glsl */ `
#if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)

#pragma X3D include "Perlin.glsl"

vec4 texCoords [X3D_NUM_TEXTURE_COORDINATES];

void
setTexCoords ()
{
   ${Array .from ({ length: maxTexCoords }, (_, i) => /* glsl */ `

   #if X3D_NUM_TEXTURE_COORDINATES > ${i}
      texCoords [${i}] = texCoord${i};
   #endif

   `) .join ("\n")}
}

uniform mat4 x3d_TextureMatrix [X3D_NUM_TEXTURE_TRANSFORMS];
uniform x3d_TextureCoordinateGeneratorParameters x3d_TextureCoordinateGenerator [X3D_NUM_TEXTURE_COORDINATES];

vec4
getTexCoord (const in int textureCoordinateMapping)
{
   x3d_TextureCoordinateGeneratorParameters textureCoordinateGenerator = x3d_TextureCoordinateGenerator [textureCoordinateMapping];

   switch (textureCoordinateGenerator .mode)
   {
      case x3d_Sphere:
      {
         #if defined (X3D_GEOMETRY_0D) || defined (X3D_GEOMETRY_1D)
            vec2 N = normalize (normal) .xy;
         #else
            vec2 N = normalize (frontFacing ? normal : -normal) .xy;
         #endif

         return vec4 (N * 0.5 + 0.5, 0.0, 1.0);
      }
      case x3d_CameraSpaceNormal:
      {
         #if defined (X3D_GEOMETRY_0D) || defined (X3D_GEOMETRY_1D)
            vec3 N = normalize (normal);
         #else
            vec3 N = normalize (frontFacing ? normal : -normal);
         #endif

         return vec4 (N, 1.0);
      }
      case x3d_CameraSpacePosition:
      {
         return vec4 (vertex, 1.0);
      }
      case x3d_CameraSpaceReflectionVector:
      {
         #if defined (X3D_GEOMETRY_0D) || defined (X3D_GEOMETRY_1D)
            vec3 N = normalize (normal);
         #else
            vec3 N = normalize (frontFacing ? normal : -normal);
         #endif

         return vec4 (reflect (normalize (vertex), -N), 1.0);
      }
      case x3d_SphereLocal:
         {
         #if defined (X3D_GEOMETRY_0D) || defined (X3D_GEOMETRY_1D)
            vec2 N = normalize (localNormal) .xy;
         #else
            vec2 N = normalize (frontFacing ? localNormal : -localNormal) .xy;
         #endif

         return vec4 (N * 0.5 + 0.5, 0.0, 1.0);
      }
      case x3d_Coord:
      {
         return vec4 (localVertex, 1.0);
      }
      case x3d_CoordEye:
      {
         return vec4 (vertex, 1.0);
      }
      case x3d_Noise:
      {
         vec3 scale       = vec3 (textureCoordinateGenerator .parameter [0], textureCoordinateGenerator .parameter [1], textureCoordinateGenerator .parameter [2]);
         vec3 translation = vec3 (textureCoordinateGenerator .parameter [3], textureCoordinateGenerator .parameter [4], textureCoordinateGenerator .parameter [5]);

         return vec4 (perlin (localVertex * scale + translation), 1.0);
      }
      case x3d_NoiseEye:
      {
         vec3 scale       = vec3 (textureCoordinateGenerator .parameter [0], textureCoordinateGenerator .parameter [1], textureCoordinateGenerator .parameter [2]);
         vec3 translation = vec3 (textureCoordinateGenerator .parameter [3], textureCoordinateGenerator .parameter [4], textureCoordinateGenerator .parameter [5]);

         return vec4 (perlin (vertex * scale + translation), 1.0);
      }
      case x3d_SphereReflect:
      {
         #if defined (X3D_GEOMETRY_0D) || defined (X3D_GEOMETRY_1D)
            vec3 N = normalize (normal);
         #else
            vec3 N = normalize (frontFacing ? normal : -normal);
         #endif

         float eta = textureCoordinateGenerator .parameter [0];

         return vec4 (refract (normalize (vertex), -N, eta), 1.0);
      }
      case x3d_SphereReflectLocal:
      {
         #if defined (X3D_GEOMETRY_0D) || defined (X3D_GEOMETRY_1D)
            vec3 N = normalize (localNormal);
         #else
            vec3 N = normalize (frontFacing ? localNormal : -localNormal);
         #endif

         float eta = textureCoordinateGenerator .parameter [0];
         vec3  eye = vec3 (textureCoordinateGenerator .parameter [1], textureCoordinateGenerator .parameter [2], textureCoordinateGenerator .parameter [3]);

         return vec4 (refract (normalize (localVertex - eye), -N, eta), 1.0);
      }
      default:
      {
         return texCoords [textureCoordinateMapping];
      }
   }
}

vec3
getTexCoord (const in int textureTransformMapping, const in int textureCoordinateMapping, const in vec2 flipY)
{
   vec4 texCoord = getTexCoord (textureCoordinateMapping);

   #if defined (X3D_GEOMETRY_2D)
      // Flip X if needed.
      if (frontFacing == false)
         texCoord .x = 1.0 - texCoord .x;
   #endif

   // Flip Y if needed.
   texCoord .y = texCoord .y * flipY .x + flipY .y;

   texCoord       = x3d_TextureMatrix [textureTransformMapping] * texCoord;
   texCoord .stp /= texCoord .q;

   return texCoord .stp;
}

#endif // X3D_TEXTURE || X3D_MATERIAL_TEXTURES

#if defined (X3D_TEXTURE)

uniform sampler2D   x3d_Texture2D   [X3D_NUM_TEXTURES];
uniform sampler3D   x3d_Texture3D   [X3D_NUM_TEXTURES];
uniform samplerCube x3d_TextureCube [X3D_NUM_TEXTURES];

vec4
getTexture (const in int i, const in int textureTransformMapping, const in int textureCoordinateMapping)
{
   vec4 textureColor = vec4 (1.0);

   switch (i)
   {
      ${Array .from ({ length: maxTextures }, (_, i) => /* glsl */ `

      #if X3D_NUM_TEXTURES > ${i}
      case ${i}:
      {
         #if defined (X3D_TEXTURE${i}_FLIP_Y)
            vec2 flipY = vec2 (-1.0, 1.0);
         #else
            vec2 flipY = vec2 (1.0, 0.0);
         #endif

         vec3 texCoord = getTexCoord (textureTransformMapping, textureCoordinateMapping, flipY);

         #if defined (X3D_TEXTURE${i}_2D)
            textureColor = texture (x3d_Texture2D [${i}], texCoord .st);
         #elif defined (X3D_TEXTURE${i}_3D)
            textureColor = texture (x3d_Texture3D [${i}], texCoord .stp);
         #elif defined (X3D_TEXTURE${i}_CUBE)
            textureColor = texture (x3d_TextureCube [${i}], texCoord .stp);
         #endif

         #if defined (X3D_COLORSPACE_SRGB)
            #if defined (X3D_TEXTURE${i}_LINEAR)
               textureColor = linearToSRGB (textureColor);
            #endif
         #elif defined (X3D_COLORSPACE_LINEAR_WHEN_PHYSICAL_MATERIAL)
            #if defined (X3D_PHYSICAL_MATERIAL) && !defined (X3D_TEXTURE${i}_LINEAR)
               textureColor = sRGBToLinear (textureColor);
            #elif !defined (X3D_PHYSICAL_MATERIAL) && defined (X3D_TEXTURE${i}_LINEAR)
               textureColor = linearToSRGB (textureColor);
            #endif
         #elif defined (X3D_COLORSPACE_LINEAR)
            #if !defined (X3D_TEXTURE${i}_LINEAR)
               textureColor = sRGBToLinear (textureColor);
            #endif
         #endif

         break;
      }
      #endif

      `) .join ("\n")}
   }

   return textureColor;
}

#if defined (X3D_MULTI_TEXTURING)
   uniform vec4 x3d_MultiTextureColor;
   uniform x3d_MultiTextureParameters x3d_MultiTexture [X3D_NUM_TEXTURES];
#endif

vec4
getTextureColor (const in vec4 diffuseColor, const in vec4 specularColor)
{
   #if defined (X3D_MULTI_TEXTURING)
      vec4 currentColor = diffuseColor;

      for (int i = 0; i < X3D_NUM_TEXTURES; ++ i)
      {
         // Get texture color.

         vec4 textureColor = getTexture (i, min (i, X3D_NUM_TEXTURE_TRANSFORMS - 1), min (i, X3D_NUM_TEXTURE_COORDINATES - 1));

         // Multi texturing

         x3d_MultiTextureParameters multiTexture = x3d_MultiTexture [i];

         vec4 arg1 = textureColor;
         vec4 arg2 = currentColor;

         // Source

         int source = multiTexture .source;

         switch (source)
         {
            case x3d_Diffuse:
            {
               arg1 = diffuseColor;
               break;
            }
            case x3d_Specular:
            {
               arg1 = specularColor;
               break;
            }
            case x3d_Factor:
            {
               arg1 = x3d_MultiTextureColor;
               break;
            }
         }

         // Function

         int function = multiTexture .function;

         switch (function)
         {
            case x3d_Complement:
            {
               arg1 = 1.0 - arg1;
               break;
            }
            case x3d_AlphaReplicate:
            {
               arg1 .a = arg2 .a;
               break;
            }
         }

         // Mode

         int mode      = multiTexture .mode;
         int alphaMode = multiTexture .alphaMode;

         // RGB

         switch (mode)
         {
            case x3d_Replace:
            {
               currentColor .rgb = arg1 .rgb;
               break;
            }
            case x3d_Modulate:
            {
               currentColor .rgb = arg1 .rgb * arg2 .rgb;
               break;
            }
            case x3d_Modulate2X:
            {
               currentColor .rgb = (arg1 .rgb * arg2 .rgb) * 2.0;
               break;
            }
            case x3d_Modulate4X:
            {
               currentColor .rgb = (arg1 .rgb * arg2 .rgb) * 4.0;
               break;
            }
            case x3d_Add:
            {
               currentColor .rgb = arg1 .rgb + arg2 .rgb;
               break;
            }
            case x3d_AddSigned:
            {
               currentColor .rgb = arg1 .rgb + arg2 .rgb - 0.5;
               break;
            }
            case x3d_AddSigned2X:
            {
               currentColor .rgb = (arg1 .rgb + arg2 .rgb - 0.5) * 2.0;
               break;
            }
            case x3d_AddSmooth:
            {
               currentColor .rgb = arg1 .rgb + (1.0 - arg1 .rgb) * arg2 .rgb;
               break;
            }
            case x3d_Subtract:
            {
               currentColor .rgb = arg1 .rgb - arg2 .rgb;
               break;
            }
            case x3d_BlendDiffuseAlpha:
            {
               currentColor .rgb = arg1 .rgb * diffuseColor .a + arg2 .rgb * (1.0 - diffuseColor .a);
               break;
            }
            case x3d_BlendTextureAlpha:
            {
               currentColor .rgb = arg1 .rgb * arg1 .a + arg2 .rgb * (1.0 - arg1 .a);
               break;
            }
            case x3d_BlendFactorAlpha:
            {
               currentColor .rgb = arg1 .rgb * x3d_MultiTextureColor .a + arg2 .rgb * (1.0 - x3d_MultiTextureColor .a);
               break;
            }
            case x3d_BlendCurrentAlpha:
            {
               currentColor .rgb = arg1 .rgb * arg2 .a + arg2 .rgb * (1.0 - arg2 .a);
               break;
            }
            case x3d_ModulateAlphaAddColor:
            {
               currentColor .rgb = arg1 .rgb + arg1 .a * arg2 .rgb;
               break;
            }
            case x3d_ModulateInvAlphaAddColor:
            {
               currentColor .rgb = (1.0 - arg1 .a) * arg2 .rgb + arg1 .rgb;
               break;
            }
            case x3d_ModulateInvColorAddAlpha:
            {
               currentColor .rgb = (1.0 - arg1 .rgb) * arg2 .rgb + arg1 .a;
               break;
            }
            case x3d_DotProduct3:
            {
               currentColor .rgb = vec3 (dot (arg1 .rgb * 2.0 - 1.0, arg2 .rgb * 2.0 - 1.0));
               break;
            }
            case x3d_SelectArg1:
            {
               currentColor .rgb = arg1 .rgb;
               break;
            }
            case x3d_SelectArg2:
            {
               currentColor .rgb = arg2 .rgb;
               break;
            }
            case x3d_Off:
            {
               break;
            }
         }

         // Alpha

         switch (alphaMode)
         {
            case x3d_Replace:
            {
               currentColor .a = arg1 .a;
               break;
            }
            case x3d_Modulate:
            {
               currentColor .a = arg1 .a * arg2 .a;
               break;
            }
            case x3d_Modulate2X:
            {
               currentColor .a = (arg1 .a * arg2 .a) * 2.0;
               break;
            }
            case x3d_Modulate4X:
            {
               currentColor .a = (arg1 .a * arg2 .a) * 4.0;
               break;
            }
            case x3d_Add:
            {
               currentColor .a = arg1 .a + arg2 .a;
               break;
            }
            case x3d_AddSigned:
            {
               currentColor .a = arg1 .a + arg2 .a - 0.5;
               break;
            }
            case x3d_AddSigned2X:
            {
               currentColor .a = (arg1 .a + arg2 .a - 0.5) * 2.0;
               break;
            }
            case x3d_AddSmooth:
            {
               currentColor .a = arg1 .a + (1.0 - arg1 .a) * arg2 .a;
               break;
            }
            case x3d_Subtract:
            {
               currentColor .a = arg1 .a - arg2 .a;
               break;
            }
            case x3d_BlendDiffuseAlpha:
            {
               currentColor .a = arg1 .a * diffuseColor .a + arg2 .a * (1.0 - diffuseColor .a);
               break;
            }
            case x3d_BlendTextureAlpha:
            {
               currentColor .a = arg1 .a * arg1 .a + arg2 .a * (1.0 - arg1 .a);
               break;
            }
            case x3d_BlendFactorAlpha:
            {
               currentColor .a = arg1 .a * x3d_MultiTextureColor .a + arg2 .a * (1.0 - x3d_MultiTextureColor .a);
               break;
            }
            case x3d_BlendCurrentAlpha:
            {
               currentColor .a = arg1 .a * arg2 .a + arg2 .a * (1.0 - arg2 .a);
               break;
            }
            case x3d_ModulateAlphaAddColor:
            {
               currentColor .a = arg1 .a + arg1 .a * arg2 .a;
               break;
            }
            case x3d_ModulateInvAlphaAddColor:
            {
               currentColor .a = (1.0 - arg1 .a) * arg2 .a + arg1 .a;
               break;
            }
            case x3d_ModulateInvColorAddAlpha:
            {
               currentColor .a = (1.0 - arg1 .a) * arg2 .a + arg1 .a;
               break;
            }
            case x3d_DotProduct3:
            {
               currentColor .a = dot (arg1 .rgb * 2.0 - 1.0, arg2 .rgb * 2.0 - 1.0);
               break;
            }
            case x3d_SelectArg1:
            {
               currentColor .a = arg1 .a;
               break;
            }
            case x3d_SelectArg2:
            {
               currentColor .a = arg2 .a;
               break;
            }
            case x3d_Off:
            {
               break;
            }
         }
      }

      return currentColor;
   #else
      return diffuseColor * getTexture (0, 0, 0);
   #endif
}

#endif // X3D_TEXTURE

#if defined (X3D_TEXTURE_PROJECTION)

uniform vec3      x3d_TextureProjectorColor     [X3D_NUM_TEXTURE_PROJECTORS];
uniform float     x3d_TextureProjectorIntensity [X3D_NUM_TEXTURE_PROJECTORS];
uniform vec3      x3d_TextureProjectorLocation  [X3D_NUM_TEXTURE_PROJECTORS];
uniform vec3      x3d_TextureProjectorParams    [X3D_NUM_TEXTURE_PROJECTORS]; // near, far, linear
uniform mat4      x3d_TextureProjectorMatrix    [X3D_NUM_TEXTURE_PROJECTORS];
uniform sampler2D x3d_TextureProjectorTexture   [X3D_NUM_TEXTURE_PROJECTORS];

vec4
getTextureProjectorTexture (const in int i, const in vec2 texCoord)
{
   vec4 textureColor = vec4 (1.0);

   switch (i)
   {
      ${Array .from ({ length: maxTextures }, (_, i) => /* glsl */ `

      #if X3D_NUM_TEXTURE_PROJECTORS > ${i}
      case ${i}:
         textureColor = texture (x3d_TextureProjectorTexture [${i}], texCoord);
         break;
      #endif

      `) .join ("\n")}
   }

   return textureColor;
}

vec3
getTextureProjectorColor ()
{
   vec3 currentColor = vec3 (1.0);

   #if defined (X3D_GEOMETRY_0D) || defined (X3D_GEOMETRY_1D)
      vec3 N = normal;
   #else
      vec3 N = frontFacing ? normal : -normal;
   #endif

   for (int i = 0; i < X3D_NUM_TEXTURE_PROJECTORS; ++ i)
   {
      vec4 texCoord = x3d_TextureProjectorMatrix [i] * vec4 (vertex, 1.0);

      texCoord .stp /= texCoord .q;
      texCoord .p    = clamp (texCoord .p, x3d_TextureProjectorParams [i] .x, x3d_TextureProjectorParams [i] .y);

      if (any (greaterThan (abs (texCoord .stp - 0.5), vec3 (0.5))))
         continue;

      // We do not need to normalize p, as we only need the sign of the dot product.
      vec3 p = x3d_TextureProjectorLocation [i] - vertex;

      if (dot (N, p) < 0.0)
         continue;

      vec4 T = getTextureProjectorTexture (i, texCoord .st);

      #if defined (X3D_COLORSPACE_SRGB)
         if (bool (x3d_TextureProjectorParams [i] .z))
            T = linearToSRGB (T);
      #elif defined (X3D_COLORSPACE_LINEAR_WHEN_PHYSICAL_MATERIAL)
         #if defined (X3D_PHYSICAL_MATERIAL)
            if (!bool (x3d_TextureProjectorParams [i] .z))
               T = sRGBToLinear (T);
         #else
            if (bool (x3d_TextureProjectorParams [i] .z))
               T = linearToSRGB (T);
         #endif
      #elif defined (X3D_COLORSPACE_LINEAR)
         if (!bool (x3d_TextureProjectorParams [i] .z))
            T = sRGBToLinear (T);
      #endif

      currentColor *= mix (vec3 (1.0), T .rgb * x3d_TextureProjectorColor [i], T .a * x3d_TextureProjectorIntensity [i]);
   }

   return currentColor;
}

#endif // X3D_TEXTURE_PROJECTION
`;
