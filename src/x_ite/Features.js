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

import DEVELOPMENT from "./DEVELOPMENT.js";

const MODULE = false;

const Features =
{
   get ENVIRONMENT ()
   {
      if (DEVELOPMENT)
         return "BROWSER";

      if (MODULE)
         return "MODULE";

      if ((typeof process === "object") && (process .release .name .search (/node|io.js/) !== -1))
         return "NODE";

      return "BROWSER";
   },
   WEAK_REF: typeof WeakRef !== "undefined",
   FINALIZATION_REGISTRY: typeof FinalizationRegistry !== "undefined",
};

(() =>
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

(() =>
{
   if (!Features .WEAK_REF)
   {
      if (DEVELOPMENT)
         console .info ("Added shim for WeakRef.");

      window .WeakRef = class WeakRef
      {
         #object;

         constructor (object)
         {
            this .#object = object;
         }

         deref ()
         {
            return this .#object;
         }
      };
   }

   if (!Features .FINALIZATION_REGISTRY)
   {
      if (DEVELOPMENT)
         console .info ("Added shim for FinalizationRegistry.");

      window .FinalizationRegistry = class FinalizationRegistry
      {
         register () { }
         unregister () { }
      };
   }
})();

(() =>
{
   // https://tc39.es/proposal-upsert/

   for (const Class of [Map, WeakMap])
   {
      Class .prototype .getOrInsert ??= function (key, value)
      {
         if (this .has (key))
            return this .get (key);

         this .set (key, value);

         return value;
      };
   }

   for (const Class of [Map, WeakMap])
   {
      Class .prototype .getOrInsertComputed ??= function (key, callbackfn)
      {
         if (this .has (key))
            return this .get (key);

         const value = callbackfn ();

         this .set (key, value);

         return value;
      };
   }
})();

export default Features;
