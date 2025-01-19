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

import X3DField from "./X3DField.js";
import Features from "../Features.js";

function X3DArrayField (value)
{
   X3DField .call (this, value);
}

Object .assign (Object .setPrototypeOf (X3DArrayField .prototype, X3DField .prototype),
{
   // Implement all function also in TypedArray, if possible.
   at: Array .prototype .at,
   concat: Array .prototype .concat,
   // copyWithin: Array.prototype.copyWithin,
   entries: Array .prototype .entries,
   every: Array .prototype .every,
   fill: Array .prototype .fill,
   filter (/* callbackFn, thisArg */)
   {
      const array = new (this .constructor) ();

      for (const v of Array .prototype .filter .call (this, ... arguments))
         array .push (v);

      return array;
   },
   find: Array .prototype .find,
   findIndex: Array .prototype .findIndex,
   findLast: Array .prototype .findLast,
   findLastIndex: Array .prototype .findLastIndex,
   flat: Array .prototype .flat,
   flatMap: Array .prototype .flatMap,
   forEach: Array .prototype .forEach,
   includes: Array .prototype .includes,
   indexOf: Array .prototype .indexOf,
   join: Array .prototype .join,
   keys: Array .prototype .keys,
   lastIndexOf: Array .prototype .lastIndexOf,
   map (/* callbackFn, thisArg */)
   {
      const array = new (this .constructor) ();

      for (const v of Array .prototype .map .call (this, ... arguments))
         array .push (v);

      return array;
   },
   reduce: Array .prototype .reduce,
   reduceRight: Array .prototype .reduceRight,
   reverse: Array .prototype .reverse,
   slice (/* start, end */)
   {
      const array = new (this .constructor) ();

      for (const v of Array .prototype .slice .call (this, ... arguments))
         array .push (v);

      return array;
   },
   some: Array .prototype .some,
   sort: Array .prototype .sort,
   toReversed ()
   {
      return this .copy () .reverse ();
   },
   toSorted (/* compareFn */)
   {
      return this .copy () .sort (... arguments);
   },
   toSpliced (/* start, deleteCount, ... insertValues */)
   {
      const copy = this .copy ();

      copy .splice (... arguments);

      return copy;
   },
   values: Array .prototype .values,
   with (index, value)
   {
      const copy = this .copy ();

      copy [index] = value;

      return copy;
   },
});

for (const key of Object .keys (X3DArrayField .prototype))
   Object .defineProperty (X3DArrayField .prototype, key, { enumerable: false });

export default X3DArrayField;
