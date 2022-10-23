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

require .config ({
   "waitSeconds": 0, //The number of seconds to wait before giving up on loading a script. Setting it to 0 disables the timeout. The default is 7 seconds.
});

define .show = function ()
{
   this   .define = window .define;
   window .define = this;
};

define .hide = function ()
{
   if (this .define === undefined)
      delete window .define;
   else
      window .define = this .define;

   delete this .define;
};

const getScriptURL = (function ()
{
   if (document .currentScript)
      var src = document .currentScript .src;
   else if (typeof __global_require__ === "function" && typeof __filename === "string")
      var src = __global_require__ ("url") .pathToFileURL (__filename) .href;

   return function ()
   {
      return src;
   };
})();

(function ()
{
"use strict";

   /**
    *
    * @param {function?} callback
    * @param {function?} fallback
    * @returns {Promise<void>} Promise
    */
   function X_ITE (callback, fallback)
   {
      return new Promise (function (resolve, reject)
      {
         require (["x_ite/X3D"], function (X3D)
         {
            X3D (callback, fallback);
            X3D (resolve, reject);
         },
         function (error)
         {
            if (typeof fallback === "function")
               fallback (error);

            reject (error);
         });
      });
   }

   function noConflict ()
   {
      if (window .X3D === X_ITE)
      {
         if (X3D_ === undefined)
            delete window .X3D;
         else
            window .X3D = X3D_;
      }

      return X_ITE;
   }

   X_ITE .noConflict = noConflict;
   X_ITE .require    = require;
   X_ITE .define     = define;

   // Save existing X3D object.
   const X3D_ = window .X3D;

   // Now assign our X3D.
   window .X3D                        = X_ITE;
   window [Symbol .for ("X_ITE.X3D")] = X_ITE;

   if (typeof __global_module__ === "object" && typeof __global_module__ .exports === "object")
      __global_module__ .exports = X_ITE;

   // Define custom element.

   // IE fix.
   document .createElement ("X3DCanvas");

   class X3DCanvas extends HTMLElement
   {
      constructor ()
      {
         super ();

         const
            shadow = this .attachShadow ({ mode: "open" }),
            link   = document .createElement ("link");

         shadow .loaded = new Promise (function (resolve, reject)
         {
            link .onload  = resolve;
            link .onerror = reject;
         });

         link .setAttribute ("rel", "stylesheet");
         link .setAttribute ("type", "text/css");
         link .setAttribute ("href", new URL ("x_ite.css", getScriptURL ()) .href);

         shadow .appendChild (link);

         require ([ "x_ite/X3D" ], function (X3D)
         {
            X3D .createBrowserFromElement (this);
         }
         .bind (this));
      }
   }

   customElements .define ("x3d-canvas", X3DCanvas);

   X_ITE .X3DCanvas = X3DCanvas;

   // Assign functions to X_ITE and init.

   require (["x_ite/X3D"], function (X3D)
   {
      Object .assign (X_ITE, X3D);

      for (const key of X3D .hidden)
         delete X_ITE [key];

      X3D ();
   });
})();

(function ()
{
   // Added at February 2022
   // https://github.com/tc39/proposal-relative-indexing-method#polyfill

   function at (n)
   {
      // ToInteger() abstract op
      n = Math.trunc(n) || 0;
      // Allow negative indexing from the end
      if (n < 0) n += this.length;
      // OOB access is guaranteed to return undefined
      if (n < 0 || n >= this.length) return undefined;
      // Otherwise, this is just normal property access
      return this[n];
   }

   const TypedArray = Reflect .getPrototypeOf (Int8Array);
   for (const C of [Array, String, TypedArray])
   {
      if (C .prototype .at === undefined)
      {
         Object .defineProperty (C .prototype, "at",
         {
            value: at,
            writable: true,
            enumerable: false,
            configurable: true,
         });
      }
   }
})();
