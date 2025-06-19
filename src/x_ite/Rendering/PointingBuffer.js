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

function PointingBuffer ({ browser })
{
   const gl = browser .getContext ();

   this .context = gl;
   this .array   = new Float32Array (4);

   // Get current frame buffer.

   const currentFrameBuffer = gl .getParameter (gl .FRAMEBUFFER_BINDING);

   // Create frame buffer.

   this .frameBuffer = gl .createFramebuffer ();

   // Create color buffers.

   this .colorBuffers = [ ];
   this .framebuffers = [ ];

   for (let i = 0; i < 3; ++ i)
   {
      this .colorBuffers [i] = gl .createRenderbuffer ();
      this .framebuffers [i] = gl .createFramebuffer ();

      gl .bindRenderbuffer (gl .RENDERBUFFER, this .colorBuffers [i]);
      gl .renderbufferStorage (gl .RENDERBUFFER, gl .RGBA32F, 1, 1);
      gl .bindFramebuffer (gl .FRAMEBUFFER, this .frameBuffer);
      gl .framebufferRenderbuffer (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0 + i, gl .RENDERBUFFER, this .colorBuffers [i]);
      gl .bindFramebuffer (gl .FRAMEBUFFER, this .framebuffers [i]);
      gl .framebufferRenderbuffer (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .RENDERBUFFER, this .colorBuffers [i]);
   }

   gl .bindFramebuffer (gl .FRAMEBUFFER, this .frameBuffer);

   gl .drawBuffers ([
      gl .COLOR_ATTACHMENT0, // gl_FragData [0]
      gl .COLOR_ATTACHMENT1, // gl_FragData [1]
      gl .COLOR_ATTACHMENT2, // gl_FragData [2]
   ]);

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

      gl .texImage2D (gl .TEXTURE_2D, 0, internalFormat, 1, 1, 0, gl .DEPTH_COMPONENT, gl .UNSIGNED_INT, null);
      gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .DEPTH_ATTACHMENT, gl .TEXTURE_2D, this .depthTexture, 0);
   }
   else
   {
      this .depthBuffer = gl .createRenderbuffer ();

      gl .bindRenderbuffer (gl .RENDERBUFFER, this .depthBuffer);
      gl .renderbufferStorage (gl .RENDERBUFFER, gl .DEPTH_COMPONENT16, 1, 1);
      gl .framebufferRenderbuffer (gl .FRAMEBUFFER, gl .DEPTH_ATTACHMENT, gl .RENDERBUFFER, this .depthBuffer);
   }

   const status = gl .checkFramebufferStatus (gl .FRAMEBUFFER) === gl .FRAMEBUFFER_COMPLETE;

   // Restore current frame buffer.

   gl .bindFramebuffer (gl .FRAMEBUFFER, currentFrameBuffer);

   // Always check that our frame buffer is ok.

   if (!status)
      throw new Error ("Couldn't create frame buffer.");
}

Object .assign (PointingBuffer .prototype,
{
   bind ()
   {
      const gl = this .context;

      gl .bindFramebuffer (gl .FRAMEBUFFER, this .frameBuffer);

      // Clear all layers.
      gl .clearColor (0, 0, 0, 0);
      gl .clear (gl .COLOR_BUFFER_BIT);
   },
   getHit (hit)
   {
      const { context: gl, array } = this;

      // Id, point

      // gl .readBuffer (gl .COLOR_ATTACHMENT0); // WebGL 2
      gl .bindFramebuffer (gl .FRAMEBUFFER, this .framebuffers [0]);
      gl .readPixels (0, 0, 1, 1, gl .RGBA, gl .FLOAT, array);

      hit .id = array [3];
      hit .point .set (array [0], array [1], array [2]);

      // Normal

      gl .bindFramebuffer (gl .FRAMEBUFFER, this .framebuffers [1]);
      gl .readPixels (0, 0, 1, 1, gl .RGBA, gl .FLOAT, array);

      hit .normal .set (array [0], array [1], array [2]);

      // TexCoord

      gl .bindFramebuffer (gl .FRAMEBUFFER, this .framebuffers [2]);
      gl .readPixels (0, 0, 1, 1, gl .RGBA, gl .FLOAT, array);

      hit .texCoord .set (array [0], array [1], array [2], array [3]);

      // Finish

      gl .bindFramebuffer (gl .FRAMEBUFFER, this .frameBuffer);
   },
   dispose ()
   {
      const gl = this .context;

      gl .deleteFramebuffer (this .frameBuffer);

      for (const framebuffer of this .framebuffers)
         gl .deleteFramebuffer (framebuffer);

      for (const colorBuffer of this .colorBuffers)
         gl .deleteRenderbuffer (colorBuffer);

      gl .deleteRenderbuffer (this .depthBuffer);
      gl .deleteTexture (this .depthTexture);
   },
});

export default PointingBuffer;
