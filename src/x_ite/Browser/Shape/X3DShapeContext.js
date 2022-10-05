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
   "x_ite/Components/Shape/Appearance",
   "x_ite/Components/Shape/PointProperties",
   "x_ite/Components/Shape/LineProperties",
   "x_ite/Components/Shape/FillProperties",
   "x_ite/Components/Shape/UnlitMaterial",
   "x_ite/Components/Texturing/ImageTexture",
   "x_ite/Components/Texturing/TextureProperties",
   "x_ite/Browser/Networking/urls",
],
function (Appearance,
          PointProperties,
          LineProperties,
          FillProperties,
          UnlitMaterial,
          ImageTexture,
          TextureProperties,
          urls)
{
"use strict";

   const
      _lineStippleScale          = Symbol (),
      _linetypeTextures          = Symbol (),
      _hatchStyleTextures        = Symbol (),
      _defaultAppearance         = Symbol (),
      _defaultPointProperties    = Symbol (),
      _defaultLineProperties     = Symbol (),
      _defaultFillProperties     = Symbol (),
      _defaultMaterial           = Symbol (),
      _lineFillTextureProperties = Symbol ();

   function X3DShapeContext ()
   {
      this [_linetypeTextures]   = [ ];
      this [_hatchStyleTextures] = [ ];

      const div = $("<div></div>") .css ("height", "1in") .css ("display", "none");
      this [_lineStippleScale] = div .appendTo ($("body")) .height () / 72 * 16; // 16px
      div .remove ();
   }

   X3DShapeContext .prototype =
   {
      initialize: function ()
      { },
      getDefaultAppearance: function ()
      {
         this [_defaultAppearance] = new Appearance (this .getPrivateScene ());
         this [_defaultAppearance] .setup ();

         this .getDefaultAppearance = function () { return this [_defaultAppearance]; };

         Object .defineProperty (this, "getDefaultAppearance", { enumerable: false });

         return this [_defaultAppearance];
      },
      getDefaultPointProperties: function ()
      {
         this [_defaultPointProperties] = new PointProperties (this .getPrivateScene ());
         this [_defaultPointProperties] .setup ();

         this .getDefaultPointProperties = function () { return this [_defaultPointProperties]; };

         Object .defineProperty (this, "getDefaultPointProperties", { enumerable: false });

         return this [_defaultPointProperties];
      },
      getLineStippleScale: function ()
      {
         return this [_lineStippleScale];
      },
      getDefaultLineProperties: function ()
      {
         this [_defaultLineProperties] = new LineProperties (this .getPrivateScene ());

         this [_defaultLineProperties] ._applied = false;
         this [_defaultLineProperties] .setup ();

         this .getDefaultLineProperties = function () { return this [_defaultLineProperties]; };

         Object .defineProperty (this, "getDefaultLineProperties", { enumerable: false });

         return this [_defaultLineProperties];
      },
      getDefaultFillProperties: function ()
      {
         this [_defaultFillProperties] = new FillProperties (this .getPrivateScene ());

         this [_defaultFillProperties] ._hatched = false;
         this [_defaultFillProperties] .setup ();

         this .getDefaultFillProperties = function () { return this [_defaultFillProperties]; };

         Object .defineProperty (this, "getDefaultFillProperties", { enumerable: false });

         return this [_defaultFillProperties];
      },
      getDefaultMaterial: function ()
      {
         this [_defaultMaterial] = new UnlitMaterial (this .getPrivateScene ());

         this [_defaultMaterial] .setup ();

         this .getDefaultMaterial = function () { return this [_defaultMaterial]; };

         Object .defineProperty (this, "getDefaultMaterial", { enumerable: false });

         return this [_defaultMaterial];
      },
      getLinetypeTexture: function (index)
      {
         let linetypeTexture = this [_linetypeTextures] [index];

         if (linetypeTexture)
            return linetypeTexture;

         linetypeTexture = this [_linetypeTextures] [index] = new ImageTexture (this .getPrivateScene ());

         linetypeTexture ._url [0]           = urls .getLinetypeUrl (index);
         linetypeTexture ._textureProperties = this .getLineFillTextureProperties ();
         linetypeTexture .setup ();

         return linetypeTexture;
      },
      getHatchStyleTexture: function (index)
      {
         let hatchStyleTexture = this [_hatchStyleTextures] [index];

         if (hatchStyleTexture)
            return hatchStyleTexture;

         hatchStyleTexture = this [_hatchStyleTextures] [index] = new ImageTexture (this .getPrivateScene ());

         hatchStyleTexture ._url [0]           = urls .getHatchingUrl (index);
         hatchStyleTexture ._textureProperties = this .getLineFillTextureProperties ();
         hatchStyleTexture .setup ();

         return hatchStyleTexture;
      },
      getLineFillTextureProperties: function ()
      {
         this [_lineFillTextureProperties] = new TextureProperties (this .getPrivateScene ());

         this [_lineFillTextureProperties] ._minificationFilter  = "NEAREST_PIXEL";
         this [_lineFillTextureProperties] ._magnificationFilter = "NEAREST_PIXEL";

         this [_lineFillTextureProperties] .setup ();

         this .getLineFillTextureProperties = function () { return this [_lineFillTextureProperties]; };

         Object .defineProperty (this, "getLineFillTextureProperties", { enumerable: false });

         return this [_lineFillTextureProperties];
      },
   };

   return X3DShapeContext;
});
