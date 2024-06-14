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

import TextureBuffer from "../../Rendering/TextureBuffer.js";
import ImageTexture  from "../../Components/Texturing/ImageTexture.js";
import URLs          from "../Networking/URLs.js";

const
   _maxLights     = Symbol (),
   _textures      = Symbol (),
   _shadowBuffers = Symbol ();

function X3DLightingContext ()
{
   const
      gl                   = this .getContext (),
      maxTextureImageUnits = gl .getParameter (gl .MAX_TEXTURE_IMAGE_UNITS);

   if (maxTextureImageUnits > 8)
      this [_maxLights] = 8;
   else
      this [_maxLights] = 2;

   this [_textures]      = new Map ();
   this [_shadowBuffers] = [ ]; // Shadow buffer cache
}

Object .assign (X3DLightingContext .prototype,
{
   getMaxLights ()
   {
      return this [_maxLights];
   },
   getLibraryTexture (name)
   {
      return this [_textures] .get (name) ?? this .createLibraryTexture (name);
   },
   createLibraryTexture (name)
   {
      const texture = new ImageTexture (this .getPrivateScene ());

      texture ._url     = [URLs .getLibraryURL (name)];
      texture ._repeatS = false;
      texture ._repeatT = false;

      texture .setup ();

      this [_textures] .set (name, texture)

      return texture;
   },
   popShadowBuffer (shadowMapSize)
   {
      try
      {
         const shadowBuffers = this [_shadowBuffers] [shadowMapSize];

         if (shadowBuffers)
         {
            if (shadowBuffers .length)
               return shadowBuffers .pop ();
         }
         else
            this [_shadowBuffers] [shadowMapSize] = [ ];

         return new TextureBuffer (this, shadowMapSize, shadowMapSize, true);
      }
      catch (error)
      {
         // Couldn't create texture buffer.
         console .error (error);

         return null;
      }
   },
   pushShadowBuffer (buffer)
   {
      if (buffer)
         this [_shadowBuffers] [buffer .getWidth ()] .push (buffer);
   },
});

export default X3DLightingContext;
