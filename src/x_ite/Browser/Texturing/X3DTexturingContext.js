/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

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
   _texture2DUnits           = Symbol (),
   _texture3DUnits           = Symbol (),
   _textureCubeUnits         = Symbol (),
   _texture2DUnitIndex       = Symbol (),
   _texture3DUnitIndex       = Symbol (),
   _textureCubeUnitIndex     = Symbol (),
   _defaultTexture2D         = Symbol (),
   _defaultTexture3D         = Symbol (),
   _defaultTextureCube       = Symbol (),
   _defaultTextureProperties = Symbol (),
   _defaultTextureTransform  = Symbol (),
   _defaultTextureCoordinate = Symbol (),
   _libktx                   = Symbol ();

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

      this [_combinedTextureUnits] = [...Array (maxCombinedTextureUnits) .keys ()] .reverse ();
      this [_texture2DUnits]       = [this [_combinedTextureUnits] .pop ()];
      this [_texture3DUnits]       = [this [_combinedTextureUnits] .pop ()];
      this [_textureCubeUnits]     = [this [_combinedTextureUnits] .pop ()];

      // Default Texture 2D Unit

      const defaultData = new Uint8Array ([ 255, 255, 255, 255 ]);

      this [_defaultTexture2D] = gl .createTexture ();

      gl .activeTexture (gl .TEXTURE0 + this [_texture2DUnits] [0]);
      gl .bindTexture (gl .TEXTURE_2D, this [_defaultTexture2D]);
      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

      // Default Texture 3D Unit

      if (gl .getVersion () >= 2)
      {
         this [_defaultTexture3D] = gl .createTexture ();

         gl .activeTexture (gl .TEXTURE0 + this [_texture3DUnits] [0]);
         gl .bindTexture (gl .TEXTURE_3D, this [_defaultTexture3D]);
         gl .texImage3D (gl .TEXTURE_3D, 0, gl .RGBA, 1, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
      }

      // Default Texture Cube Unit

      this [_defaultTextureCube] = gl .createTexture ();

      gl .activeTexture (gl .TEXTURE0 + this [_textureCubeUnits] [0]);
      gl .bindTexture (gl .TEXTURE_CUBE_MAP, this [_defaultTextureCube]);
      gl .texImage2D (gl .TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
      gl .texImage2D (gl .TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
      gl .texImage2D (gl .TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
      gl .texImage2D (gl .TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
      gl .texImage2D (gl .TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
      gl .texImage2D (gl .TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

      // Init texture units.

      this .resetTextureUnits ();

      // Set texture quality.

      this .setTextureQuality (this .getBrowserOptions () .getTextureQuality ());
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
   popTexture2DUnit ()
   {
      if (this [_texture2DUnitIndex] > 0)
      {
         -- this [_texture2DUnitIndex];

         return this [_texture2DUnits] .pop ();
      }
      else
      {
         return this [_combinedTextureUnits] .pop ();
      }
   },
   pushTexture2DUnit (textureUnit)
   {
      if (textureUnit === undefined)
         return;

      ++ this [_texture2DUnitIndex];

      this [_texture2DUnits] .push (textureUnit);
   },
   getTexture2DUnit ()
   {
      if (this [_texture2DUnitIndex] > 0)
         return this [_texture2DUnits] [-- this [_texture2DUnitIndex]];

      const textureUnit = this [_combinedTextureUnits] .pop ();

      if (textureUnit !== undefined)
         this [_texture2DUnits] .push (textureUnit);

      return textureUnit;
   },
   getTexture3DUnit ()
   {
      if (this [_texture3DUnitIndex] > 0)
         return this [_texture3DUnits] [-- this [_texture3DUnitIndex]];

      const textureUnit = this [_combinedTextureUnits] .pop ();

      if (textureUnit !== undefined)
         this [_texture3DUnits] .push (textureUnit);

      return textureUnit;
   },
   popTextureCubeUnit ()
   {
      if (this [_textureCubeUnitIndex] > 0)
      {
         -- this [_textureCubeUnitIndex];

         return this [_textureCubeUnits] .pop ();
      }
      else
      {
         return this [_combinedTextureUnits] .pop ();
      }
   },
   pushTextureCubeUnit (textureUnit)
   {
      if (textureUnit === undefined)
         return;

      ++ this [_textureCubeUnitIndex];

      this [_textureCubeUnits] .push (textureUnit);
   },
   getTextureCubeUnit ()
   {
      if (this [_textureCubeUnitIndex] > 0)
         return this [_textureCubeUnits] [-- this [_textureCubeUnitIndex]];

      const textureUnit = this [_combinedTextureUnits] .pop ();

      if (textureUnit !== undefined)
         this [_textureCubeUnits] .push (textureUnit);

      return textureUnit;
   },
   getTextureUnit (textureType)
   {
      switch (textureType)
      {
         case 1:
         case 2: return this .getTexture2DUnit ();
         case 3: return this .getTexture3DUnit ();
         case 4: return this .getTextureCubeUnit ();
      }
   },
   resetTextureUnits ()
   {
      this [_texture2DUnitIndex]   = this [_texture2DUnits]   .length;
      this [_texture3DUnitIndex]   = this [_texture3DUnits]   .length;
      this [_textureCubeUnitIndex] = this [_textureCubeUnits] .length;
   },
   getDefaultTexture2DUnit ()
   {
      return this [_texture2DUnits] [0];
   },
   getDefaultTexture3DUnit ()
   {
      return this [_texture3DUnits] [0];
   },
   getDefaultTextureCubeUnit ()
   {
      return this [_textureCubeUnits] [0];
   },
   getTextureMemory ()
   {
      return NaN;
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
      this [_defaultTextureProperties] = new TextureProperties (this .getPrivateScene ());
      this [_defaultTextureProperties] ._generateMipMaps     = true;
      this [_defaultTextureProperties] ._minificationFilter  = "NICEST";
      this [_defaultTextureProperties] ._magnificationFilter = "NICEST";

      this [_defaultTextureProperties] .setup ();

      this .getDefaultTextureProperties = function () { return this [_defaultTextureProperties]; };

      Object .defineProperty (this, "getDefaultTextureProperties", { enumerable: false });

      return this [_defaultTextureProperties];
   },
   getDefaultTextureTransform ()
   {
      this [_defaultTextureTransform] = new TextureTransform (this .getPrivateScene ());
      this [_defaultTextureTransform] .setPrivate (true);
      this [_defaultTextureTransform] .setup ();

      this .getDefaultTextureTransform = function () { return this [_defaultTextureTransform]; };

      Object .defineProperty (this, "getDefaultTextureTransform", { enumerable: false });

      return this [_defaultTextureTransform];
   },
   getDefaultTextureCoordinate ()
   {
      this [_defaultTextureCoordinate] = new TextureCoordinate (this .getPrivateScene ());
      this [_defaultTextureCoordinate] .setPrivate (true);
      this [_defaultTextureCoordinate] .setup ();

      this .getDefaultTextureCoordinate = function () { return this [_defaultTextureCoordinate]; };

      Object .defineProperty (this, "getDefaultTextureCoordinate", { enumerable: false });

      return this [_defaultTextureCoordinate];
   },
   setTextureQuality (textureQuality)
   {
      const textureProperties = this .getDefaultTextureProperties ();

      switch (textureQuality)
      {
         case TextureQuality .LOW:
         {
            textureProperties ._magnificationFilter = "AVG_PIXEL";
            textureProperties ._minificationFilter  = "AVG_PIXEL";
            textureProperties ._textureCompression  = "FASTEST";
            textureProperties ._generateMipMaps     = true;

            //glHint (GL_GENERATE_MIPMAP_HINT,        GL_FASTEST);
            //glHint (GL_PERSPECTIVE_CORRECTION_HINT, GL_FASTEST);
            break;
         }
         case TextureQuality .MEDIUM:
         {
            textureProperties ._magnificationFilter = "NICEST";
            textureProperties ._minificationFilter  = "NEAREST_PIXEL_AVG_MIPMAP";
            textureProperties ._textureCompression  = "NICEST";
            textureProperties ._generateMipMaps     = true;

            //glHint (GL_GENERATE_MIPMAP_HINT,        GL_FASTEST);
            //glHint (GL_PERSPECTIVE_CORRECTION_HINT, GL_FASTEST);
            break;
         }
         case TextureQuality .HIGH:
         {
            textureProperties ._magnificationFilter = "NICEST";
            textureProperties ._minificationFilter  = "NICEST";
            textureProperties ._textureCompression  = "NICEST";
            textureProperties ._generateMipMaps     = true;

            //glHint (GL_GENERATE_MIPMAP_HINT,        GL_NICEST);
            //glHint (GL_PERSPECTIVE_CORRECTION_HINT, GL_NICEST);
            break;
         }
      }
   },
   async getKTXDecoder ()
   {
      return new KTXDecoder (this .getContext (), await this .getLibKTX (), URLs .getLibraryURL (""));
   },
   async getLibKTX ()
   {
      if (this [_libktx])
         return this [_libktx];

      const
         response = await fetch (URLs .getLibraryURL ("libktx.js")),
         text     = await response .text (),
         libktx   = await new Function (text) ();

      return this [_libktx] = libktx;
   },
});

export default X3DTexturingContext;
