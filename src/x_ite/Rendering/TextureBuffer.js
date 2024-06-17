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

import ViewVolume from "../../standard/Math/Geometry/ViewVolume.js";
import Vector3    from "../../standard/Math/Numbers/Vector3.js";
import Matrix4    from "../../standard/Math/Numbers/Matrix4.js";

function TextureBuffer (browser, width, height, float = false, mipMaps = false)
{
   const gl = browser .getContext ();

   this .context = gl;
   this .width   = width;
   this .height  = height;

   Object .defineProperty (this, "array",
   {
      get ()
      {
         const value = float ? new Float32Array (width * height * 4) : new Uint8Array (width * height * 4);

         Object .defineProperty (this, "array", { value: value });

         return value;
      },
      configurable: true,
   });

   // Create frame buffer.

   this .frameBuffer = gl .createFramebuffer ();

   gl .bindFramebuffer (gl .FRAMEBUFFER, this .frameBuffer);

   // Create color texture.

   this .colorTexture = gl .createTexture ();

   gl .bindTexture (gl .TEXTURE_2D, this .colorTexture);
   gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
   gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);

   if (mipMaps)
   {
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .LINEAR_MIPMAP_LINEAR);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .LINEAR);
   }
   else
   {
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .LINEAR);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .LINEAR);
   }

   if (float)
      gl .texImage2D (gl .TEXTURE_2D, 0, gl .getVersion () > 1 ? gl .RGBA32F : gl .RGBA, width, height, 0, gl .RGBA, gl .FLOAT, null);
   else
      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA, width, height, 0, gl .RGBA, gl .UNSIGNED_BYTE, null);

   gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .TEXTURE_2D, this .colorTexture, 0);

   // Create depth buffer.

   if (gl .HAS_FEATURE_DEPTH_TEXTURE)
   {
      this .depthTexture = gl .createTexture ();

      gl .bindTexture (gl .TEXTURE_2D, this .depthTexture);

      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .NEAREST);

      const internalFormat = gl .getVersion () >= 2 ? gl .DEPTH_COMPONENT24 : gl .DEPTH_COMPONENT;

      gl .texImage2D (gl .TEXTURE_2D, 0, internalFormat, width, height, 0, gl .DEPTH_COMPONENT, gl .UNSIGNED_INT, null);
      gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .DEPTH_ATTACHMENT, gl .TEXTURE_2D, this .depthTexture, 0);
   }
   else
   {
      this .depthBuffer = gl .createRenderbuffer ();

      gl .bindRenderbuffer (gl .RENDERBUFFER, this .depthBuffer);
      gl .renderbufferStorage (gl .RENDERBUFFER, gl .DEPTH_COMPONENT16, width, height);
      gl .framebufferRenderbuffer (gl .FRAMEBUFFER, gl .DEPTH_ATTACHMENT, gl .RENDERBUFFER, this .depthBuffer);
   }

   const status = gl .checkFramebufferStatus (gl .FRAMEBUFFER) === gl .FRAMEBUFFER_COMPLETE;

   // Always check that our framebuffer is ok.

   if (!status)
      throw new Error ("Couldn't create frame buffer.");
}

Object .assign (TextureBuffer .prototype,
{
   getWidth ()
   {
      return this .width;
   },
   getHeight ()
   {
      return this .height;
   },
   getColorTexture ()
   {
      return this .colorTexture;
   },
   getDepthTexture ()
   {
      return this .depthTexture;
   },
   readPixels ()
   {
      const { context: gl, array, width, height } = this;

      gl .readPixels (0, 0, width, height, gl .RGBA, gl .UNSIGNED_BYTE, array);

      return array;
   },
   readDepth: (() =>
   {
      const
         invProjectionMatrix = new Matrix4 (),
         point               = new Vector3 ();

      return function (projectionMatrix, viewport)
      {
         const { context: gl, array, width, height } = this;

         gl .readPixels (0, 0, width, height, gl .RGBA, gl .FLOAT, array);

         let
            winX = 0,
            winY = 0,
            winZ = Number .POSITIVE_INFINITY;

         for (let wy = 0, i = 0; wy < height; ++ wy)
         {
            for (let wx = 0; wx < width; ++ wx, i += 4)
            {
               const wz = array [i];

               if (wz < winZ)
               {
                  winX = wx;
                  winY = wy;
                  winZ = wz;
               }
            }
         }

         invProjectionMatrix .assign (projectionMatrix) .inverse ();

         ViewVolume .unProjectPointMatrix (winX, winY, winZ, invProjectionMatrix, viewport, point);

         return point .z;
      };
   })(),
   bind ()
   {
      const gl = this .context;

      gl .bindFramebuffer (gl .FRAMEBUFFER, this .frameBuffer);
   },
   dispose ()
   {
      const gl = this .context;

      gl .deleteFramebuffer (this .frameBuffer);
      gl .deleteTexture (this .colorTexture);

      if (gl .HAS_FEATURE_DEPTH_TEXTURE)
         gl .deleteTexture (this .depthTexture);
      else
         gl .deleteRenderbuffer (this .depthBuffer);
    },
});

for (const key of Object .keys (TextureBuffer .prototype))
   Object .defineProperty (TextureBuffer .prototype, key, { enumerable: false });

export default TextureBuffer;
