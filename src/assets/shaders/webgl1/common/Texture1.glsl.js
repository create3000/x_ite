export default /* glsl */ `
#if defined (X3D_TEXTURE) || defined (X3D_MATERIAL_TEXTURES)

#pragma X3D include "Perlin.glsl"

uniform mat4 x3d_TextureTransformMatrix [X3D_NUM_TEXTURE_TRANSFORMS];

mat4
getTextureMatrix (const in int i)
{
   #if X3D_NUM_TEXTURE_TRANSFORMS > 1
      mat4 textureMatrix = mat4 (0.0);

      #if X3D_NUM_TEXTURE_TRANSFORMS > 0
      if (i == 0)
         textureMatrix = x3d_TextureTransformMatrix [0];
      #endif

      #if X3D_NUM_TEXTURE_TRANSFORMS > 1
      else if (i == 1)
         textureMatrix = x3d_TextureTransformMatrix [1];
      #endif

      #if X3D_NUM_TEXTURE_TRANSFORMS > 2
      else if (i == 2)
         textureMatrix = x3d_TextureTransformMatrix [2];
      #endif

      #if X3D_NUM_TEXTURE_TRANSFORMS > 3
      else if (i == 3)
         textureMatrix = x3d_TextureTransformMatrix [3];
      #endif

      return textureMatrix;
   #else
      return x3d_TextureTransformMatrix [0];
   #endif
}

vec4
getTexCoord (const in int i)
{
   #if X3D_NUM_TEXTURE_COORDINATES > 1
      vec4 texCoord = vec4 (0.0);

      #if X3D_NUM_TEXTURE_COORDINATES > 0
      if (i == 0)
         texCoord = texCoord0;
      #endif

      #if X3D_NUM_TEXTURE_COORDINATES > 1
      else if (i == 1)
         texCoord = texCoord1;
      #endif

      #if X3D_NUM_TEXTURE_COORDINATES > 2
      else if (i == 2)
         texCoord = texCoord2;
      #endif

      #if X3D_NUM_TEXTURE_COORDINATES > 3
      else if (i == 3)
         texCoord = texCoord3;
      #endif

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
getTexCoord (const in int textureTransformMapping, const in int textureCoordinateMapping, const in mat4 textureMatrix)
{
   vec4 texCoord;

   #if X3D_NUM_TEXTURE_COORDINATES > 0
   if (textureCoordinateMapping == 0)
      texCoord = getTexCoord (x3d_TextureCoordinateGenerator [0], textureTransformMapping, textureCoordinateMapping);
   #endif

   #if X3D_NUM_TEXTURE_COORDINATES > 1
   else if (textureCoordinateMapping == 1)
      texCoord = getTexCoord (x3d_TextureCoordinateGenerator [1], textureTransformMapping, textureCoordinateMapping);
   #endif

   #if X3D_NUM_TEXTURE_COORDINATES > 2
   else if (textureCoordinateMapping == 2)
      texCoord = getTexCoord (x3d_TextureCoordinateGenerator [2], textureTransformMapping, textureCoordinateMapping);
   #endif

   #if X3D_NUM_TEXTURE_COORDINATES > 3
   else if (textureCoordinateMapping == 3)
      texCoord = getTexCoord (x3d_TextureCoordinateGenerator [3], textureTransformMapping, textureCoordinateMapping);
   #endif

   texCoord = textureMatrix * vec4 (texCoord .stp / texCoord .q, 1.0);

   #if defined (X3D_GEOMETRY_2D)
      if (gl_FrontFacing == false)
         texCoord .s = 1.0 - texCoord .s;
   #endif

   return texCoord .stp;
}

#endif // X3D_TEXTURE || X3D_MATERIAL_TEXTURES

#if defined (X3D_TEXTURE)

uniform mat4        x3d_TextureMatrix [X3D_NUM_TEXTURES];
uniform sampler2D   x3d_Texture2D [X3D_NUM_TEXTURES];
uniform samplerCube x3d_TextureCube [X3D_NUM_TEXTURES];

#if defined (X3D_MULTI_TEXTURING)
vec4
getTexture (const in int i, const in vec3 texCoord)
{
   vec4 textureColor = vec4 (0.0);

   #if X3D_NUM_TEXTURES > 0
   if (i == 0)
   {
      #if defined (X3D_TEXTURE0_2D)
         textureColor = texture2D (x3d_Texture2D [0], texCoord .st);
      #elif defined (X3D_TEXTURE0_CUBE)
         textureColor = textureCube (x3d_TextureCube [0], texCoord .stp);
      #endif
   }
   #endif

   #if X3D_NUM_TEXTURES > 1
   else if (i == 1)
   {
      #if defined (X3D_TEXTURE0_2D)
         textureColor = texture2D (x3d_Texture2D [1], texCoord .st);
      #elif defined (X3D_TEXTURE0_CUBE)
         textureColor = textureCube (x3d_TextureCube [1], texCoord .stp);
      #endif
   }
   #endif

   return textureColor;
}
#endif

#if defined (X3D_MULTI_TEXTURING)
   uniform vec4 x3d_MultiTextureColor;
   uniform x3d_MultiTextureParameters x3d_MultiTexture [X3D_NUM_TEXTURES];
#endif

#if defined (X3D_PHYSICAL_MATERIAL)
vec4
sRGBToLinear (const in vec4 srgbIn);
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

         vec3 texCoord     = getTexCoord (minI (i, X3D_NUM_TEXTURE_TRANSFORMS - 1), minI (i, X3D_NUM_TEXTURE_COORDINATES - 1), x3d_TextureMatrix [i]);
         vec4 textureColor = getTexture (i, texCoord);

         #if defined (X3D_PHYSICAL_MATERIAL)
            textureColor = sRGBToLinear (textureColor);
         #endif

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

      vec3 texCoord = getTexCoord (0, 0, x3d_TextureMatrix [0]);

      #if defined (X3D_TEXTURE0_2D)
         vec4 textureColor = texture2D (x3d_Texture2D [0], texCoord .st);
      #elif defined (X3D_TEXTURE0_CUBE)
         vec4 textureColor = textureCube (x3d_TextureCube [0], texCoord .stp);
      #else
         vec4 textureColor = vec4 (0.0);
      #endif

      #if defined (X3D_PHYSICAL_MATERIAL)
         textureColor = sRGBToLinear (textureColor);
      #endif

      return diffuseColor * textureColor;
   #endif
}

#endif

#if defined (X3D_TEXTURE_PROJECTION)

uniform sampler2D x3d_TextureProjectorTexture [X3D_NUM_TEXTURE_PROJECTORS];
uniform mat4      x3d_TextureProjectorMatrix [X3D_NUM_TEXTURE_PROJECTORS];
uniform vec3      x3d_TextureProjectorLocation [X3D_NUM_TEXTURE_PROJECTORS];

vec4
getTextureProjectorTexture (const in int i, const in vec2 texCoord)
{
   vec4 color = vec4 (0.0);

   #if X3D_NUM_TEXTURE_PROJECTORS > 0
   if (i == 0)
      color = texture2D (x3d_TextureProjectorTexture [0], texCoord);
   #endif

   #if X3D_NUM_TEXTURE_PROJECTORS > 1
   else if (i == 1)
      color = texture2D (x3d_TextureProjectorTexture [1], texCoord);
   #endif

   return color;
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

      if (texCoord .s < 0.0 || texCoord .s > 1.0)
         continue;

      if (texCoord .t < 0.0 || texCoord .t > 1.0)
         continue;

      if (texCoord .p < 0.0 || texCoord .p > 1.0)
         continue;

      // We do not need to normalize p, as we only need the sign of the dot product.
      vec3 p = x3d_TextureProjectorLocation [i] - vertex;

      if (dot (N, p) < 0.0)
         continue;

      vec4 T = getTextureProjectorTexture (i, texCoord .st);

      currentColor *= mix (vec3 (1.0), T .rgb, T .a);
   }

   return currentColor;
}

#endif // X3D_TEXTURE_PROJECTION
`;
