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
      _combinedTextureUnits     = Symbol (),
      _maxTextureSize           = Symbol (),
      _maxCombinedTextureUnits  = Symbol (),
      _textureMemory            = Symbol (),
      _shadowTextureUnit        = Symbol (),
      _linetypeUnit             = Symbol (),
      _hatchStyleUnit           = Symbol (),
      _texture2DUnits           = Symbol (),
      _texture3DUnits           = Symbol (),
      _cubeMapTextureUnits      = Symbol (),
      _projectiveTextureUnits   = Symbol (),
      _defaultTexture2D         = Symbol (),
      _defaultTexture3D         = Symbol (),
      _defaultCubeMapTexture    = Symbol (),
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
      this [_combinedTextureUnits]     = [ ];
   }

   X3DTexturingContext .prototype =
   {
      initialize: function ()
      {
         const gl = this .getContext ();

         this [_maxTextureSize]          = gl .getParameter (gl .MAX_TEXTURE_SIZE);
         this [_maxCombinedTextureUnits] = gl .getParameter (gl .MAX_COMBINED_TEXTURE_IMAGE_UNITS);
         this [_textureMemory]           = NaN;

         const combinedTextureUnits = this [_combinedTextureUnits];

         // For shaders
         for (let i = 1, length = this [_maxCombinedTextureUnits]; i < length; ++ i)
            combinedTextureUnits .push (i);

         // There must always be a texture bound to the used texture units.

         this [_shadowTextureUnit] = this .getCombinedTextureUnits () .pop ();
         this [_linetypeUnit]      = this .getCombinedTextureUnits () .pop ();
         this [_hatchStyleUnit]    = this .getCombinedTextureUnits () .pop ();

         this [_texture2DUnits]         = new Int32Array (this .getMaxTextures ());
         this [_projectiveTextureUnits] = new Int32Array (this .getMaxTextures ());

         for (let i = 0, length = this .getMaxTextures (); i < length; ++ i)
            this [_texture2DUnits] [i] = this .getCombinedTextureUnits () .pop ();

         if (this .getProjectiveTextureMapping ())
         {
            for (let i = 0, length = this .getMaxTextures (); i < length; ++ i)
               this [_projectiveTextureUnits] [i] = this .getCombinedTextureUnits () .pop ();
         }

         const defaultData = new Uint8Array ([ 255, 255, 255, 255 ]);

         // Texture 2D Units

         this [_defaultTexture2D] = gl .createTexture ();

         gl .bindTexture (gl .TEXTURE_2D, this [_defaultTexture2D]);
         gl .texImage2D  (gl .TEXTURE_2D, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

         gl .activeTexture (gl .TEXTURE0 + this [_shadowTextureUnit]);
         gl .bindTexture (gl .TEXTURE_2D, this [_defaultTexture2D]);

         gl .activeTexture (gl .TEXTURE0 + this [_linetypeUnit]);
         gl .bindTexture (gl .TEXTURE_2D, this [_defaultTexture2D]);

         gl .activeTexture (gl .TEXTURE0 + this [_hatchStyleUnit]);
         gl .bindTexture (gl .TEXTURE_2D, this [_defaultTexture2D]);

         for (const unit of this [_texture2DUnits])
         {
            gl .activeTexture (gl .TEXTURE0 + unit);
            gl .bindTexture (gl .TEXTURE_2D, this [_defaultTexture2D]);
         }

         for (const unit of this [_projectiveTextureUnits])
         {
            gl .activeTexture (gl .TEXTURE0 + unit);
            gl .bindTexture (gl .TEXTURE_2D, this [_defaultTexture2D]);
         }

         // Texture 3D Units

         if (gl .getVersion () >= 2)
         {
            this [_texture3DUnits] = new Int32Array (this .getMaxTextures ());

            for (let i = 0, length = this .getMaxTextures (); i < length; ++ i)
               this [_texture3DUnits] [i] = this .getCombinedTextureUnits () .pop ();

            this [_defaultTexture3D] = gl .createTexture ();

            gl .bindTexture (gl .TEXTURE_3D, this [_defaultTexture3D]);
            gl .texImage3D  (gl .TEXTURE_3D, 0, gl .RGBA, 1, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

            for (const unit of this [_texture3DUnits])
            {
               gl .activeTexture (gl .TEXTURE0 + unit);
               gl .bindTexture (gl .TEXTURE_3D, this [_defaultTexture3D]);
            }

            // Fix for Chrome.
            gl .activeTexture (gl .TEXTURE0);
            gl .bindTexture (gl .TEXTURE_3D, this [_defaultTexture3D]);
         }

         // Cube Map Texture Units

         this [_cubeMapTextureUnits] = new Int32Array (this .getMaxTextures ());

         for (let i = 0, length = this .getMaxTextures (); i < length; ++ i)
            this [_cubeMapTextureUnits] [i] = this .getCombinedTextureUnits () .pop ();

          this [_defaultCubeMapTexture] = gl .createTexture ();

         gl .bindTexture (gl .TEXTURE_CUBE_MAP, this [_defaultCubeMapTexture]);
         gl .texImage2D  (gl .TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
         gl .texImage2D  (gl .TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
         gl .texImage2D  (gl .TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
         gl .texImage2D  (gl .TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
         gl .texImage2D  (gl .TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
         gl .texImage2D  (gl .TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

         for (const unit of this [_cubeMapTextureUnits])
         {
            gl .activeTexture (gl .TEXTURE0 + unit);
            gl .bindTexture (gl .TEXTURE_CUBE_MAP, this [_defaultCubeMapTexture]);
         }

         gl .activeTexture (gl .TEXTURE0);
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
      getCombinedTextureUnits: function ()
      {
         return this [_combinedTextureUnits];
      },
      getTexture2DUnits: function ()
      {
         return this [_texture2DUnits];
      },
      getTexture3DUnits: function ()
      {
         return this [_texture3DUnits];
      },
      getCubeMapTextureUnits: function ()
      {
         return this [_cubeMapTextureUnits];
      },
      getProjectiveTextureUnits: function ()
      {
         return this [_projectiveTextureUnits];
      },
      getShadowTextureUnit: function ()
      {
         return this [_shadowTextureUnit];
      },
      getLinetypeUnit: function ()
      {
         return this [_linetypeUnit];
      },
      getHatchStyleUnit: function ()
      {
         return this [_hatchStyleUnit];
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
