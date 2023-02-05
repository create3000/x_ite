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

function MultiSampleFrameBuffer (browser, width, height, samples)
{
   const gl = browser .getContext ();

   if (gl .getVersion () === 1 || width === 0 || height === 0)
      return Fallback;

   this .browser = browser;
   this .width   = width;
   this .height  = height;
   this .samples = Math .min (samples, gl .getParameter (gl .MAX_SAMPLES));

   // Create frame buffer.

   this .lastBuffer  = gl .getParameter (gl .FRAMEBUFFER_BINDING);
   this .frameBuffer = gl .createFramebuffer ();

   gl .bindFramebuffer (gl .FRAMEBUFFER, this .frameBuffer);

   // Create color buffer.

   this .colorBuffer = gl .createRenderbuffer ();

   gl .bindRenderbuffer (gl .RENDERBUFFER, this .colorBuffer);
   gl .renderbufferStorageMultisample (gl .RENDERBUFFER, this .samples, gl .RGBA8, this .width, this .height);
   gl .framebufferRenderbuffer (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .RENDERBUFFER, this .colorBuffer);

   // Create depth buffer.

   this .depthBuffer = gl .createRenderbuffer ();

   gl .bindRenderbuffer (gl .RENDERBUFFER, this .depthBuffer);
   gl .renderbufferStorageMultisample (gl .RENDERBUFFER, this .samples, gl .DEPTH_COMPONENT24, this .width, this .height);
   gl .framebufferRenderbuffer (gl .FRAMEBUFFER, gl .DEPTH_ATTACHMENT,  gl .RENDERBUFFER, this .depthBuffer);

   gl .bindFramebuffer (gl .FRAMEBUFFER, this .lastBuffer);

   // Always check that our frame buffer is ok.

   if (gl .checkFramebufferStatus (gl .FRAMEBUFFER) === gl .FRAMEBUFFER_COMPLETE)
      return;

   throw new Error ("Couldn't create frame buffer.");
}

MultiSampleFrameBuffer .prototype =
{
   constructor: MultiSampleFrameBuffer,
   getWidth: function ()
   {
      return this .width;
   },
   getHeight: function ()
   {
      return this .height;
   },
   getSamples: function ()
   {
      return this .samples;
   },
   bind: function ()
   {
      const gl = this .browser .getContext ();

      this .lastBuffer = gl .getParameter (gl .FRAMEBUFFER_BINDING);

      gl .bindFramebuffer (gl .FRAMEBUFFER, this .frameBuffer);
   },
   unbind: function ()
   {
      const gl = this .browser .getContext ();

      gl .bindFramebuffer (gl .FRAMEBUFFER, this .lastBuffer);
   },
   blit: function ()
   {
      const gl = this .browser .getContext ();

      gl .viewport (0, 0, this .width, this .height);
      gl .scissor  (0, 0, this .width, this .height);

      gl .bindFramebuffer (gl .READ_FRAMEBUFFER, this .frameBuffer);
      gl .bindFramebuffer (gl .DRAW_FRAMEBUFFER, null);

      gl .blitFramebuffer (0, 0, this .width, this .height,
                           0, 0, this .width, this .height,
                           gl .COLOR_BUFFER_BIT, gl .LINEAR);
   },
   dispose: function ()
   {
      const gl = this .browser .getContext ();

      gl .deleteFramebuffer (this .frameBuffer);
      gl .deleteRenderbuffer (this .colorBuffer);
      gl .deleteRenderbuffer (this .depthBuffer);
   },
};

const Fallback = {
   getWidth: Function .prototype,
   getHeight: Function .prototype,
   getSamples: Function .prototype,
   bind: Function .prototype,
   unbind: Function .prototype,
   blit: Function .prototype,
   dispose: Function .prototype,
};

export default MultiSampleFrameBuffer;
