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
   "x_ite/Components/Texturing/PixelTexture",
   "x_ite/Components/Texturing/TextureProperties",
   "x_ite/Components/VolumeRendering/OpacityMapVolumeStyle",
],
function (PixelTexture,
          TextureProperties,
          OpacityMapVolumeStyle)
{
"use strict";

   const
      _defaultVoxelsNode         = Symbol (),
      _defaultVolumeStyle        = Symbol (),
      _defaultBlendedVolumeStyle = Symbol (),
      _defaultTransferFunction   = Symbol ();

   function X3DVolumeRenderingContext () { }

   X3DVolumeRenderingContext .prototype =
   {
      getDefaultVoxels: function (executionContext)
      {
         this [_defaultVoxelsNode] = executionContext .createNode ("PixelTexture3D", false);
         this [_defaultVoxelsNode] ._image = [1, 2, 2, 2, 255, 255, 255, 255];
         this [_defaultVoxelsNode] .repeatS = true;
         this [_defaultVoxelsNode] .repeatT = true;
         this [_defaultVoxelsNode] .repeatR = true;
         this [_defaultVoxelsNode] .setup ();

         this .getDefaultVoxels = function () { return this [_defaultVoxelsNode]; };

         Object .defineProperty (this, "getDefaultVoxels", { enumerable: false });

         return this [_defaultVoxelsNode];
      },
      getDefaultVolumeStyle: function ()
      {
         this [_defaultVolumeStyle] = new OpacityMapVolumeStyle (this .getPrivateScene ());
         this [_defaultVolumeStyle] .setup ();

         this .getDefaultVolumeStyle = function () { return this [_defaultVolumeStyle]; };

         Object .defineProperty (this, "getDefaultVolumeStyle", { enumerable: false });

         return this [_defaultVolumeStyle];
      },
      getDefaultBlendedVolumeStyle: function ()
      {
         this [_defaultBlendedVolumeStyle] = new OpacityMapVolumeStyle (this .getPrivateScene ());
         this [_defaultBlendedVolumeStyle] .setup ();

         this .getDefaultBlendedVolumeStyle = function () { return this [_defaultBlendedVolumeStyle]; };

         Object .defineProperty (this, "getDefaultBlendedVolumeStyle", { enumerable: false });

         return this [_defaultBlendedVolumeStyle];
      },
      getDefaultTransferFunction: function ()
      {
         this [_defaultTransferFunction] = new PixelTexture (this .getPrivateScene ());

         const textureProperties = new TextureProperties (this .getPrivateScene ());

         textureProperties ._generateMipMaps = true;
         textureProperties ._boundaryModeS   = "CLAMP_TO_EDGE";
         textureProperties ._boundaryModeT   = "REPEAT";

         this [_defaultTransferFunction] ._textureProperties = textureProperties;

         this [_defaultTransferFunction] ._image .width  = 256;
         this [_defaultTransferFunction] ._image .height = 1;
         this [_defaultTransferFunction] ._image .comp   = 2;

         const array = this [_defaultTransferFunction] ._image .array;

         for (let i = 0; i < 256; ++ i)
            array [i] = (i << 8) | i;

         textureProperties               .setup ();
         this [_defaultTransferFunction] .setup ();

         this .getDefaultTransferFunction = function () { return this [_defaultTransferFunction]; };

         Object .defineProperty (this, "getDefaultTransferFunction", { enumerable: false });

         return this [_defaultTransferFunction];
      },
   };

   return X3DVolumeRenderingContext;
});
