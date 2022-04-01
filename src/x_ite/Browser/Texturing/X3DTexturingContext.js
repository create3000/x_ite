/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
   "x_ite/Components/Texturing/TextureProperties",
   "x_ite/Components/Texturing/TextureTransform",
   "x_ite/Components/Texturing/TextureCoordinate",
],
function (TextureProperties,
          TextureTransform,
          TextureCoordinate)
{
"use strict";

   const
      _maxTextures              = Symbol (),
      _multiTexturing           = Symbol (),
      _projectiveTextureMapping = Symbol (),
      _maxTextureSize           = Symbol (),
      _maxCombinedTextureUnits  = Symbol (),
      _textureMemory            = Symbol (),
      _combinedTextureUnits     = Symbol (),
      _texture2DUnit            = Symbol (),
      _texture3DUnit            = Symbol (),
      _textureCubeUnit          = Symbol (),
      _textureUnitIndex         = Symbol (),
      _defaultTexture2D         = Symbol (),
      _defaultTexture3D         = Symbol (),
      _defaultTextureCube       = Symbol (),
      _defaultTextureProperties = Symbol (),
      _defaultTextureTransform  = Symbol (),
      _defaultTextureCoordinate = Symbol ();

   function X3DTexturingContext ()
   {
      const
         gl                    = this .getContext (),
         maxVertexTextureUnits = gl .getParameter (gl .MAX_VERTEX_TEXTURE_IMAGE_UNITS);

      this [_maxTextures]              = maxVertexTextureUnits > 8 ? 2 : 1;
      this [_multiTexturing]           = maxVertexTextureUnits > 8;
      this [_projectiveTextureMapping] = maxVertexTextureUnits > 8;
   }

   X3DTexturingContext .prototype =
   {
      initialize: function ()
      {
         const gl = this .getContext ();

         this [_maxTextureSize]          = gl .getParameter (gl .MAX_TEXTURE_SIZE);
         this [_maxCombinedTextureUnits] = gl .getParameter (gl .MAX_COMBINED_TEXTURE_IMAGE_UNITS);
         this [_textureMemory]           = NaN;

         // Get texture Units

         this [_combinedTextureUnits] = [...Array (this [_maxCombinedTextureUnits]) .keys ()];
         this [_texture2DUnit]        = this [_combinedTextureUnits] .pop ();
         this [_texture3DUnit]        = this [_combinedTextureUnits] .pop ();
         this [_textureCubeUnit]      = this [_combinedTextureUnits] .pop ();

         // Default Texture 2D Unit

         const defaultData = new Uint8Array ([ 255, 255, 255, 255 ]);

         this [_defaultTexture2D] = gl .createTexture ();

         gl .bindTexture (gl .TEXTURE_2D, this [_defaultTexture2D]);
         gl .texImage2D  (gl .TEXTURE_2D, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

         gl .activeTexture (gl .TEXTURE0 + this [_texture2DUnit]);
         gl .bindTexture (gl .TEXTURE_2D, this [_defaultTexture2D]);

         // Default Texture 3D Unit

         if (gl .getVersion () >= 2)
         {
            this [_defaultTexture3D] = gl .createTexture ();

            gl .bindTexture (gl .TEXTURE_3D, this [_defaultTexture3D]);
            gl .texImage3D  (gl .TEXTURE_3D, 0, gl .RGBA, 1, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

            gl .activeTexture (gl .TEXTURE0 + this [_texture3DUnit]);
            gl .bindTexture (gl .TEXTURE_3D, this [_defaultTexture3D]);
         }

         // Default Texture Cube Unit

         this [_defaultTextureCube] = gl .createTexture ();

         gl .bindTexture (gl .TEXTURE_CUBE_MAP, this [_defaultTextureCube]);
         gl .texImage2D  (gl .TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
         gl .texImage2D  (gl .TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
         gl .texImage2D  (gl .TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
         gl .texImage2D  (gl .TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
         gl .texImage2D  (gl .TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
         gl .texImage2D  (gl .TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

         gl .activeTexture (gl .TEXTURE0 + this [_textureCubeUnit]);
         gl .bindTexture (gl .TEXTURE_CUBE_MAP, this [_defaultTextureCube]);

         // Init texture units.

         this .resetTextureUnits ();
      },
      getMaxTextures: function ()
      {
         return this [_maxTextures];
      },
      getMinTextureSize: function ()
      {
         return 16;
      },
      getMaxTextureSize: function ()
      {
         return this [_maxTextureSize];
      },
      getMaxCombinedTextureUnits: function ()
      {
         return this [_maxCombinedTextureUnits];
      },
      popTextureUnit: function ()
      {
         -- this [_textureUnitIndex];

         return this [_combinedTextureUnits] .shift ();
      },
      pushTextureUnit: function (textureUnit)
      {
         if (textureUnit === undefined)
            return;

         this [_textureUnitIndex] = Math .max (this [_textureUnitIndex] + 1, 1);

         this [_combinedTextureUnits] .unshift (textureUnit);
      },
      getTextureUnit: function ()
      {
         return this [_combinedTextureUnits] [-- this [_textureUnitIndex]];
      },
      resetTextureUnits: function ()
      {
         this [_textureUnitIndex] = this [_combinedTextureUnits] .length;
      },
      getDefaultTexture2DUnit: function ()
      {
         return this [_texture2DUnit];
      },
      getDefaultTexture3DUnit: function ()
      {
         return this [_texture3DUnit];
      },
      getDefaultTextureCubeUnit: function ()
      {
         return this [_textureCubeUnit];
      },
      getTextureMemory: function ()
      {
         return this [_textureMemory];
      },
      getMultiTexturing: function ()
      {
         return this [_multiTexturing];
      },
      getProjectiveTextureMapping: function ()
      {
         return this [_projectiveTextureMapping];
      },
      getDefaultTextureProperties: function ()
      {
         this [_defaultTextureProperties] = new TextureProperties (this .getPrivateScene ());
         this [_defaultTextureProperties] ._magnificationFilter = "NICEST";
         this [_defaultTextureProperties] ._minificationFilter  = "AVG_PIXEL_AVG_MIPMAP";
         this [_defaultTextureProperties] ._textureCompression  = "NICEST";
         this [_defaultTextureProperties] ._generateMipMaps     = true;

         this [_defaultTextureProperties] .setup ();

         this .getDefaultTextureProperties = function () { return this [_defaultTextureProperties]; };

         Object .defineProperty (this, "getDefaultTextureProperties", { enumerable: false });

         return this [_defaultTextureProperties];
      },
      getDefaultTextureTransform: function ()
      {
         this [_defaultTextureTransform] = new TextureTransform (this .getPrivateScene ());
         this [_defaultTextureTransform] .setup ();

         this .getDefaultTextureTransform = function () { return this [_defaultTextureTransform]; };

         Object .defineProperty (this, "getDefaultTextureTransform", { enumerable: false });

         return this [_defaultTextureTransform];
      },
      getDefaultTextureCoordinate: function ()
      {
         this [_defaultTextureCoordinate] = new TextureCoordinate (this .getPrivateScene ());
         this [_defaultTextureCoordinate] .setup ();

         this .getDefaultTextureCoordinate = function () { return this [_defaultTextureCoordinate]; };

         Object .defineProperty (this, "getDefaultTextureCoordinate", { enumerable: false });

         return this [_defaultTextureCoordinate];
      },
   };

   return X3DTexturingContext;
});
