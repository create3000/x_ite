import TextureProperties from "../../Components/Texturing/TextureProperties.js";
import TextureTransform  from "../../Components/Texturing/TextureTransform.js";
import TextureCoordinate from "../../Components/Texturing/TextureCoordinate.js";
import TextureQuality    from "../Core/TextureQuality.js";
import KTXDecoder        from "./KTXDecoder.js";
import URLs              from "../Networking/URLs.js";

import { maxTextureTransforms, maxTexCoords, maxTextures } from "./TexturingConfiguration.js";

const
   _maxTextures              = Symbol (),
   _combinedTextureUnits     = Symbol (),
   _textureUnitIndex         = Symbol (),
   _defaultTexture2DUnit     = Symbol (),
   _defaultTexture3DUnit     = Symbol (),
   _defaultTextureCubeUnit   = Symbol (),
   _defaultTexture2D         = Symbol (),
   _defaultTexture3D         = Symbol (),
   _defaultTextureCube       = Symbol (),
   _defaultTextureProperties = Symbol (),
   _defaultTextureTransform  = Symbol (),
   _defaultTextureCoordinate = Symbol (),
   _KTXDecoder               = Symbol ();

function X3DTexturingContext ()
{
   const
      gl                   = this .getContext (),
      maxTextureImageUnits = gl .getParameter (gl .MAX_TEXTURE_IMAGE_UNITS);

   // console .log (gl .getParameter (gl .MAX_TEXTURE_IMAGE_UNITS))
   // console .log (gl .getParameter (gl .MAX_ARRAY_TEXTURE_LAYERS))

   this [_maxTextures] = maxTextureImageUnits > 8 ? maxTextures : maxTextures / 2;
}

Object .assign (X3DTexturingContext .prototype,
{
   initialize ()
   {
      const gl = this .getContext ();

      gl .pixelStorei (gl .UNPACK_ALIGNMENT, 1);

      // Get texture Units

      const maxCombinedTextureUnits = gl .getParameter (gl .MAX_COMBINED_TEXTURE_IMAGE_UNITS);

      this [_combinedTextureUnits] = [... Array (maxCombinedTextureUnits) .keys ()];

      this [_defaultTexture2DUnit]   = this [_combinedTextureUnits] .pop ();
      this [_defaultTexture3DUnit]   = this [_combinedTextureUnits] .pop ();
      this [_defaultTextureCubeUnit] = this [_combinedTextureUnits] .pop ();

      // Default Texture 2D Unit

      const defaultData = new Uint8Array ([ 255, 255, 255, 255 ]);

      this [_defaultTexture2D] = gl .createTexture ();

      gl .activeTexture (gl .TEXTURE0 + this [_defaultTexture2DUnit]);
      gl .bindTexture (gl .TEXTURE_2D, this [_defaultTexture2D]);
      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

      // Default Texture 3D Unit

      this [_defaultTexture3D] = gl .createTexture ();

      gl .activeTexture (gl .TEXTURE0 + this [_defaultTexture3DUnit]);
      gl .bindTexture (gl .TEXTURE_3D, this [_defaultTexture3D]);
      gl .texImage3D (gl .TEXTURE_3D, 0, gl .RGBA, 1, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

      // Default Texture Cube Unit

      this [_defaultTextureCube] = gl .createTexture ();

      gl .activeTexture (gl .TEXTURE0 + this [_defaultTextureCubeUnit]);
      gl .bindTexture (gl .TEXTURE_CUBE_MAP, this [_defaultTextureCube]);
      gl .texImage2D (gl .TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
      gl .texImage2D (gl .TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
      gl .texImage2D (gl .TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
      gl .texImage2D (gl .TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
      gl .texImage2D (gl .TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
      gl .texImage2D (gl .TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

      // Reset texture units.

      gl .activeTexture (gl .TEXTURE0 + this [_combinedTextureUnits] [0]);

      this .resetTextureUnits ();

      // Set texture quality.

      this .setTextureQuality (this .getBrowserOptions () .getTextureQuality ());
   },
   getTextureMemory ()
   {
      return NaN;
   },
   getMaxTextures ()
   {
      return this [_maxTextures];
   },
   getMaxTextureTransforms ()
   {
      return maxTextureTransforms;
   },
   getMaxTexCoords ()
   {
      return maxTexCoords;
   },
   getMinTextureSize ()
   {
      return 16;
   },
   getMaxTextureSize ()
   {
      const gl = this .getContext ();

      return gl .getParameter (gl .MAX_TEXTURE_SIZE);
   },
   getAnisotropicExtension: (() =>
   {
      // Anisotropic Filtering in WebGL is handled by an extension, use one of getExtension depending on browser:

      const ANISOTROPIC_EXT = [
         "EXT_texture_filter_anisotropic",
         "MOZ_EXT_texture_filter_anisotropic",
         "WEBKIT_EXT_texture_filter_anisotropic",
      ];

      return function ()
      {
         const gl = this .getContext ();

         for (const extension of ANISOTROPIC_EXT)
         {
            const ext = gl .getExtension (extension);

            if (ext)
               return ext;
         }
      };
   })(),
   getMaxAnisotropicDegree ()
   {
      const
         gl  = this .getContext (),
         ext = this .getAnisotropicExtension ();

      return ext ? gl .getParameter (ext .MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 1;
   },
   getMaxCombinedTextureUnits ()
   {
      const gl = this .getContext ();

      return gl .getParameter (gl .MAX_COMBINED_TEXTURE_IMAGE_UNITS)
   },
   popTextureUnit ()
   {
      if (this [_textureUnitIndex] === 0)
         return;

      -- this [_textureUnitIndex];

      return this [_combinedTextureUnits] .pop ();
   },
   pushTextureUnit (textureUnit)
   {
      if (textureUnit === undefined)
         return;

      ++ this [_textureUnitIndex];

      this [_combinedTextureUnits] .push (textureUnit);
   },
   getTextureUnit ()
   {
      if (this [_textureUnitIndex] === 0)
         return;

      return this [_combinedTextureUnits] [-- this [_textureUnitIndex]];
   },
   resetTextureUnits ()
   {
      this [_textureUnitIndex] = this [_combinedTextureUnits] .length;
   },
   getDefaultTexture2DUnit ()
   {
      return this [_defaultTexture2DUnit];
   },
   getDefaultTexture3DUnit ()
   {
      return this [_defaultTexture3DUnit];
   },
   getDefaultTextureCubeUnit ()
   {
      return this [_defaultTextureCubeUnit];
   },
   getDefaultTexture2D ()
   {
      return this [_defaultTexture2D];
   },
   getDefaultTexture3D ()
   {
      return this [_defaultTexture3D];
   },
   getDefaultTextureCube ()
   {
      return this [_defaultTextureCube];
   },
   getDefaultTextureProperties ()
   {
      return this [_defaultTextureProperties] ??= (() =>
      {
         const defaultTextureProperties = new TextureProperties (this .getPrivateScene ());

         defaultTextureProperties ._generateMipMaps     = true;
         defaultTextureProperties ._minificationFilter  = "NICEST";
         defaultTextureProperties ._magnificationFilter = "NICEST";

         defaultTextureProperties .setup ();

         return defaultTextureProperties;
      })();
   },
   getDefaultTextureTransform ()
   {
      return this [_defaultTextureTransform] ??= (() =>
      {
         const defaultTextureTransform = new TextureTransform (this .getPrivateScene ());

         defaultTextureTransform .setup ();

         return defaultTextureTransform;
      })();
   },
   getDefaultTextureCoordinate ()
   {
      return this [_defaultTextureCoordinate] ??= (() =>
      {
         const defaultTextureCoordinate = new TextureCoordinate (this .getPrivateScene ());

         defaultTextureCoordinate .setup ();

         return defaultTextureCoordinate;
      })();
   },
   setTextureQuality (textureQuality)
   {
      const
         gl                = this .getContext (),
         textureProperties = this .getDefaultTextureProperties ();

      switch (textureQuality)
      {
         case TextureQuality .LOW:
         {
            textureProperties ._magnificationFilter = "AVG_PIXEL";
            textureProperties ._minificationFilter  = "AVG_PIXEL";
            textureProperties ._textureCompression  = "FASTEST";
            textureProperties ._generateMipMaps     = true;

            gl .hint (gl .GENERATE_MIPMAP_HINT, gl .FASTEST);
            //gl .hint (gl .PERSPECTIVE_CORRECTION_HINT, gl .FASTEST);
            break;
         }
         case TextureQuality .MEDIUM:
         {
            textureProperties ._magnificationFilter = "NICEST";
            textureProperties ._minificationFilter  = "NEAREST_PIXEL_AVG_MIPMAP";
            textureProperties ._textureCompression  = "NICEST";
            textureProperties ._generateMipMaps     = true;

            gl .hint (gl .GENERATE_MIPMAP_HINT, gl .FASTEST);
            //gl .hint (gl .PERSPECTIVE_CORRECTION_HINT, gl .FASTEST);
            break;
         }
         case TextureQuality .HIGH:
         {
            textureProperties ._magnificationFilter = "NICEST";
            textureProperties ._minificationFilter  = "NICEST";
            textureProperties ._textureCompression  = "NICEST";
            textureProperties ._generateMipMaps     = true;

            gl .hint (gl .GENERATE_MIPMAP_HINT, gl .NICEST);
            //gl .hint (gl .PERSPECTIVE_CORRECTION_HINT, gl .NICEST);
            break;
         }
      }
   },
   async getKTXDecoder ()
   {
      return this [_KTXDecoder] ??= await (async () =>
      {
         const
            response = await fetch (URLs .getLibraryURL ("libktx.js")),
            text     = await response .text (),
            libKTX   = new Function (text) (),
            decoder  = new KTXDecoder (this .getContext (), libKTX, URLs .getLibraryURL ("libktx.js"));

         return decoder;
      })();
   },
});

export default X3DTexturingContext;
