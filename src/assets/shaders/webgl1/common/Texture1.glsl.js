import { maxTextureTransforms, maxTexCoords, maxTextures } from "../../../../x_ite/Browser/Texturing/TexturingConfiguration.js";

export default /* glsl */ `
#if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)

#pragma X3D include "Perlin.glsl"

uniform mat4 x3d_TextureMatrix [X3D_NUM_TEXTURE_TRANSFORMS];

mat4
getTextureMatrix (const in int i)
{
   #if X3D_NUM_TEXTURE_TRANSFORMS > 1
      mat4 textureTransformMatrix = mat4 (0.0);

      ${Array .from ({ length: maxTextureTransforms }, (_, i) => /* glsl */ `

      #if X3D_NUM_TEXTURE_TRANSFORMS > ${i}
         ${i === 0 ? "" : "else"} if (i == ${i})
            textureTransformMatrix = x3d_TextureMatrix [${i}];
      #endif

      `) .join ("\n")}

      return textureTransformMatrix;
   #else
      return x3d_TextureMatrix [0];
   #endif
}

vec4
getTexCoord (const in int i)
{
   #if X3D_NUM_TEXTURE_COORDINATES > 1
      vec4 texCoord = vec4 (0.0);

      ${Array .from ({ length: maxTexCoords }, (_, i) => /* glsl */ `

      #if X3D_NUM_TEXTURE_COORDINATES > ${i}
      ${i === 0 ? "" : "else"} if (i == ${i})
         texCoord = texCoord${i};
      #endif

      `) .join ("\n")}

      return texCoord;
   #else
      return texCoord0;
   #endif
}

vec4
getTexCoord (const in x3d_TextureCoordinateGeneratorParameters textureCoordinateGenerator, const in int textureTransformMapping, const in int textureCoordinateMapping)
{
   int mode = textureCoordinateGenerator .mode;

   if (mode == x3d_None)
   {
      return getTextureMatrix (textureTransformMapping) * getTexCoord (textureCoordinateMapping);
   }
   else if (mode == x3d_Sphere)
   {
      vec2 N = normalize (gl_FrontFacing ? normal : -normal) .xy;

      return vec4 (N * 0.5 + 0.5, 0.0, 1.0);
   }
   else if (mode == x3d_CameraSpaceNormal)
   {
      vec3 N = normalize (gl_FrontFacing ? normal : -normal);

      return vec4 (N, 1.0);
   }
   else if (mode == x3d_CameraSpacePosition)
   {
      return vec4 (vertex, 1.0);
   }
   else if (mode == x3d_CameraSpaceReflectionVector)
   {
      vec3 N = normalize (gl_FrontFacing ? normal : -normal);

      return vec4 (reflect (normalize (vertex), -N), 1.0);
   }
   else if (mode == x3d_SphereLocal)
   {
      vec2 N = normalize (gl_FrontFacing ? localNormal : -localNormal) .xy;

      return vec4 (N * 0.5 + 0.5, 0.0, 1.0);
   }
   else if (mode == x3d_Coord)
   {
      return vec4 (localVertex, 1.0);
   }
   else if (mode == x3d_CoordEye)
   {
      return vec4 (vertex, 1.0);
   }
   else if (mode == x3d_Noise)
   {
      vec3 scale       = vec3 (textureCoordinateGenerator .parameter [0], textureCoordinateGenerator .parameter [1], textureCoordinateGenerator .parameter [2]);
      vec3 translation = vec3 (textureCoordinateGenerator .parameter [3], textureCoordinateGenerator .parameter [4], textureCoordinateGenerator .parameter [5]);

      return vec4 (perlin (localVertex * scale + translation), 1.0);
   }
   else if (mode == x3d_NoiseEye)
   {
      vec3 scale       = vec3 (textureCoordinateGenerator .parameter [0], textureCoordinateGenerator .parameter [1], textureCoordinateGenerator .parameter [2]);
      vec3 translation = vec3 (textureCoordinateGenerator .parameter [3], textureCoordinateGenerator .parameter [4], textureCoordinateGenerator .parameter [5]);

      return vec4 (perlin (vertex * scale + translation), 1.0);
   }
   else if (mode == x3d_SphereReflect)
   {
      vec3  N   = normalize (gl_FrontFacing ? normal : -normal);
      float eta = textureCoordinateGenerator .parameter [0];

      return vec4 (refract (normalize (vertex), -N, eta), 1.0);
   }
   else if (mode == x3d_SphereReflectLocal)
   {
      vec3  N   = normalize (gl_FrontFacing ? localNormal : -localNormal);
      float eta = textureCoordinateGenerator .parameter [0];
      vec3  eye = vec3 (textureCoordinateGenerator .parameter [1], textureCoordinateGenerator .parameter [2], textureCoordinateGenerator .parameter [3]);

      return vec4 (refract (normalize (localVertex - eye), -N, eta), 1.0);
   }

   return getTextureMatrix (textureTransformMapping) * getTexCoord (textureCoordinateMapping);
}

uniform x3d_TextureCoordinateGeneratorParameters x3d_TextureCoordinateGenerator [X3D_NUM_TEXTURE_COORDINATES];

vec3
getTexCoord (const in int textureTransformMapping, const in int textureCoordinateMapping)
{
   vec4 texCoord;

   ${Array .from ({ length: maxTexCoords }, (_, i) => /* glsl */ `

   #if X3D_NUM_TEXTURE_COORDINATES > ${i}
   ${i === 0 ? "" : "else"} if (textureCoordinateMapping == ${i})
      texCoord = getTexCoord (x3d_TextureCoordinateGenerator [${i}], textureTransformMapping, textureCoordinateMapping);
   #endif

   `) .join ("\n")}

   #if defined (X3D_GEOMETRY_2D)
      if (gl_FrontFacing == false)
         texCoord .s = 1.0 - texCoord .s;
   #endif

   return texCoord .stp;
}

#endif // X3D_TEXTURE || X3D_MATERIAL_TEXTURES

#if defined (X3D_TEXTURE)

uniform sampler2D   x3d_Texture2D   [X3D_NUM_TEXTURES];
uniform samplerCube x3d_TextureCube [X3D_NUM_TEXTURES];

vec4
getTexture (const in int i, in vec3 texCoord)
{
   vec4 textureColor = vec4 (1.0);

   ${Array .from ({ length: maxTextures }, (_, i) => /* glsl */ `

   #if X3D_NUM_TEXTURES > ${i}
   ${i === 0 ? "" : "else"} if (i == ${i})
   {
      #if defined (X3D_TEXTURE${i}_FLIP_Y)
         texCoord .t = 1.0 - texCoord .t;
      #endif

      #if defined (X3D_TEXTURE${i}_2D)
         textureColor = texture2D (x3d_Texture2D [${i}], texCoord .st);
      #elif defined (X3D_TEXTURE${i}_CUBE)
         textureColor = textureCube (x3d_TextureCube [${i}], texCoord .stp);
      #endif

      #if defined (X3D_COLORSPACE_SRGB)
         #if defined (X3D_TEXTURE${i}_LINEAR)
            textureColor = linearTosRGB (textureColor);
         #endif
      #elif defined (X3D_COLORSPACE_LINEAR_WHEN_PHYSICAL_MATERIAL)
         #if defined (X3D_PHYSICAL_MATERIAL) && !defined (X3D_TEXTURE${i}_LINEAR)
            textureColor = sRGBToLinear (textureColor);
         #elif !defined (X3D_PHYSICAL_MATERIAL) && defined (X3D_TEXTURE${i}_LINEAR)
            textureColor = linearTosRGB (textureColor);
         #endif
      #elif defined (X3D_COLORSPACE_LINEAR)
         #if !defined (X3D_TEXTURE${i}_LINEAR)
            textureColor = sRGBToLinear (textureColor);
         #endif
      #endif
   }
   #endif

   `) .join ("\n")}

   return textureColor;
}

#if defined (X3D_MULTI_TEXTURING)
   uniform vec4 x3d_MultiTextureColor;
   uniform x3d_MultiTextureParameters x3d_MultiTexture [X3D_NUM_TEXTURES];
#endif

int
minI (const in int a, const in int b)
{
   return a < b ? a : b;
}

vec4
getTextureColor (const in vec4 diffuseColor, const in vec4 specularColor)
{
   #if defined (X3D_MULTI_TEXTURING)
      vec4 currentColor = diffuseColor;

      for (int i = 0; i < X3D_NUM_TEXTURES; ++ i)
      {
         // Get texture color.

         vec3 texCoord     = getTexCoord (minI (i, X3D_NUM_TEXTURE_TRANSFORMS - 1), minI (i, X3D_NUM_TEXTURE_COORDINATES - 1));
         vec4 textureColor = getTexture (i, texCoord);

         // Multi texturing

         x3d_MultiTextureParameters multiTexture = x3d_MultiTexture [i];

         vec4 arg1 = textureColor;
         vec4 arg2 = currentColor;

         // Source

         int source = multiTexture .source;

         if (source == x3d_Diffuse)
         {
            arg1 = diffuseColor;
         }
         else if (source == x3d_Specular)
         {
            arg1 = specularColor;
         }
         else if (source == x3d_Factor)
         {
            arg1 = x3d_MultiTextureColor;
         }

         // Function

         int function = multiTexture .function;

         if (function == x3d_Complement)
         {
            arg1 = 1.0 - arg1;
         }
         else if (function == x3d_AlphaReplicate)
         {
            arg1 .a = arg2 .a;
         }

         // Mode

         int mode      = multiTexture .mode;
         int alphaMode = multiTexture .alphaMode;

         // RGB

         if (mode == x3d_Replace)
         {
            currentColor .rgb = arg1 .rgb;
         }
         else if (mode == x3d_Modulate)
         {
            currentColor .rgb = arg1 .rgb * arg2 .rgb;
         }
         else if (mode == x3d_Modulate2X)
         {
            currentColor .rgb = (arg1 .rgb * arg2 .rgb) * 2.0;
         }
         else if (mode == x3d_Modulate4X)
         {
            currentColor .rgb = (arg1 .rgb * arg2 .rgb) * 4.0;
         }
         else if (mode == x3d_Add)
         {
            currentColor .rgb = arg1 .rgb + arg2 .rgb;
         }
         else if (mode == x3d_AddSigned)
         {
            currentColor .rgb = arg1 .rgb + arg2 .rgb - 0.5;
         }
         else if (mode == x3d_AddSigned2X)
         {
            currentColor .rgb = (arg1 .rgb + arg2 .rgb - 0.5) * 2.0;
         }
         else if (mode == x3d_AddSmooth)
         {
            currentColor .rgb = arg1 .rgb + (1.0 - arg1 .rgb) * arg2 .rgb;
         }
         else if (mode == x3d_Subtract)
         {
            currentColor .rgb = arg1 .rgb - arg2 .rgb;
         }
         else if (mode == x3d_BlendDiffuseAlpha)
         {
            currentColor .rgb = arg1 .rgb * diffuseColor .a + arg2 .rgb * (1.0 - diffuseColor .a);
         }
         else if (mode == x3d_BlendTextureAlpha)
         {
            currentColor .rgb = arg1 .rgb * arg1 .a + arg2 .rgb * (1.0 - arg1 .a);
         }
         else if (mode == x3d_BlendFactorAlpha)
         {
            currentColor .rgb = arg1 .rgb * x3d_MultiTextureColor .a + arg2 .rgb * (1.0 - x3d_MultiTextureColor .a);
         }
         else if (mode == x3d_BlendCurrentAlpha)
         {
            currentColor .rgb = arg1 .rgb * arg2 .a + arg2 .rgb * (1.0 - arg2 .a);
         }
         else if (mode == x3d_ModulateAlphaAddColor)
         {
            currentColor .rgb = arg1 .rgb + arg1 .a * arg2 .rgb;
         }
         else if (mode == x3d_ModulateInvAlphaAddColor)
         {
            currentColor .rgb = (1.0 - arg1 .a) * arg2 .rgb + arg1 .rgb;
         }
         else if (mode == x3d_ModulateInvColorAddAlpha)
         {
            currentColor .rgb = (1.0 - arg1 .rgb) * arg2 .rgb + arg1 .a;
         }
         else if (mode == x3d_DotProduct3)
         {
            currentColor .rgb = vec3 (dot (arg1 .rgb * 2.0 - 1.0, arg2 .rgb * 2.0 - 1.0));
         }
         else if (mode == x3d_SelectArg1)
         {
            currentColor .rgb = arg1 .rgb;
         }
         else if (mode == x3d_SelectArg2)
         {
            currentColor .rgb = arg2 .rgb;
         }
         else if (mode == x3d_Off)
            ;

         // Alpha

         if (alphaMode == x3d_Replace)
         {
            currentColor .a = arg1 .a;
         }
         else if (alphaMode == x3d_Modulate)
         {
            currentColor .a = arg1 .a * arg2 .a;
         }
         else if (alphaMode == x3d_Modulate2X)
         {
            currentColor .a = (arg1 .a * arg2 .a) * 2.0;
         }
         else if (alphaMode == x3d_Modulate4X)
         {
            currentColor .a = (arg1 .a * arg2 .a) * 4.0;
         }
         else if (alphaMode == x3d_Add)
         {
            currentColor .a = arg1 .a + arg2 .a;
         }
         else if (alphaMode == x3d_AddSigned)
         {
            currentColor .a = arg1 .a + arg2 .a - 0.5;
         }
         else if (alphaMode == x3d_AddSigned2X)
         {
            currentColor .a = (arg1 .a + arg2 .a - 0.5) * 2.0;
         }
         else if (alphaMode == x3d_AddSmooth)
         {
            currentColor .a = arg1 .a + (1.0 - arg1 .a) * arg2 .a;
         }
         else if (alphaMode == x3d_Subtract)
         {
            currentColor .a = arg1 .a - arg2 .a;
         }
         else if (alphaMode == x3d_BlendDiffuseAlpha)
         {
            currentColor .a = arg1 .a * diffuseColor .a + arg2 .a * (1.0 - diffuseColor .a);
         }
         else if (alphaMode == x3d_BlendTextureAlpha)
         {
            currentColor .a = arg1 .a * arg1 .a + arg2 .a * (1.0 - arg1 .a);
         }
         else if (alphaMode == x3d_BlendFactorAlpha)
         {
            currentColor .a = arg1 .a * x3d_MultiTextureColor .a + arg2 .a * (1.0 - x3d_MultiTextureColor .a);
         }
         else if (alphaMode == x3d_BlendCurrentAlpha)
         {
            currentColor .a = arg1 .a * arg2 .a + arg2 .a * (1.0 - arg2 .a);
         }
         else if (alphaMode == x3d_ModulateAlphaAddColor)
         {
            currentColor .a = arg1 .a + arg1 .a * arg2 .a;
         }
         else if (alphaMode == x3d_ModulateInvAlphaAddColor)
         {
            currentColor .a = (1.0 - arg1 .a) * arg2 .a + arg1 .a;
         }
         else if (alphaMode == x3d_ModulateInvColorAddAlpha)
         {
            currentColor .a = (1.0 - arg1 .a) * arg2 .a + arg1 .a;
         }
         else if (alphaMode == x3d_DotProduct3)
         {
            currentColor .a = dot (arg1 .rgb * 2.0 - 1.0, arg2 .rgb * 2.0 - 1.0);
         }
         else if (alphaMode == x3d_SelectArg1)
         {
            currentColor .a = arg1 .a;
         }
         else if (alphaMode == x3d_SelectArg2)
         {
            currentColor .a = arg2 .a;
         }
         else if (alphaMode == x3d_Off)
            ;
      }

      return currentColor;
   #else
      // Get texture color.

      vec3 texCoord     = getTexCoord (0, 0);
      vec4 textureColor = getTexture (0, texCoord);

      return diffuseColor * textureColor;
   #endif
}

#endif

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

   ${Array .from ({ length: maxTextures }, (_, i) => /* glsl */ `

   #if X3D_NUM_TEXTURE_PROJECTORS > ${i}
   ${i === 0 ? "" : "else"} if (i == ${i})
   {
      textureColor = texture2D (x3d_TextureProjectorTexture [${i}], texCoord);
   }
   #endif

   `) .join ("\n")}

   return textureColor;
}

vec3
getTextureProjectorColor ()
{
   vec3 currentColor = vec3 (1.0);

   vec3 N = gl_FrontFacing ? normal : -normal;

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
            T = linearTosRGB (T);
      #elif defined (X3D_COLORSPACE_LINEAR_WHEN_PHYSICAL_MATERIAL)
         #if defined (X3D_PHYSICAL_MATERIAL)
            if (!bool (x3d_TextureProjectorParams [i] .z))
               T = sRGBToLinear (T);
         #else
            if (bool (x3d_TextureProjectorParams [i] .z))
               T = linearTosRGB (T);
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
