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

import X3DBrowser from "./Browser/X3DBrowser.js";

class X3DCanvasElement extends HTMLElement
{
   browser;

   constructor ()
   {
      try
      {
         super ();

         Object .defineProperty (this, "browser",
         {
            value: new X3DBrowser (this),
            enumerable: true,
         });
      }
      catch (error)
      {
         console .error (error);

         $(this .shadowRoot)
            .append ($("<slot></slot>"))
            .children (".x_ite-private-browser") .remove ();
      }
   }

   connectedCallback ()
   {
      this .browser ?.connectedCallback ();
   }

   static get observedAttributes ()
   {
      return [
         "antialiased",
         "baseURL",
         "baseurl",
         "cache",
         "colorSpace",
         "colorspace",
         "contentScale",
         "contentscale",
         "contextMenu",
         "contextmenu",
         "debug",
         "exposure",
         "logarithmicDepthBuffer",
         "logarithmicdepthbuffer",
         "multisampling",
         "notifications",
         "oninitialized",
         "onshutdown",
         "orderIndependentTransparency",
         "orderindependenttransparency",
         "splashScreen",
         "splashscreen",
         "src",
         "timings",
         "toneMapping",
         "tonemapping",
         "update",
         "url",
      ];
   }

   attributeChangedCallback (name, oldValue, newValue)
   {
      this .browser ?.attributeChangedCallback (name, oldValue, newValue);
   }

   captureStream (... args)
   {
      return this .browser ?.getCanvas () [0] .captureStream (... args);
   }

   toBlob (... args)
   {
      return this .browser ?.getCanvas () [0] .toBlob (... args);
   }

   toDataURL (... args)
   {
      return this .browser ?.getCanvas () [0] .toDataURL (... args);
   }

   get [Symbol .toStringTag] ()
   {
      return "X3DCanvasElement";
   }
}

// IE fix.
document .createElement ("X3DCanvas");

export default X3DCanvasElement;
