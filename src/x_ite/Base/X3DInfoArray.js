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

import X3DChildObject from "./X3DChildObject.js";

const
   _array = Symbol (),
   _index = Symbol ();

const handler =
{
   get: function (target, key)
   {
      const value = target [key];

      if (value !== undefined)
         return value;

      if (typeof key === "string")
      {
         const index = +key;

         if (Number .isInteger (index))
            return target [_array] [index];

         return;
      }
   },
   set: function (target, key, value)
   {
      if (target [key] === undefined)
         return false;

      target [key] = value;
      return true;
   },
   has: function (target, key)
   {
      if (Number .isInteger (+key))
         return key < target [_array] .length;

      return key in target;
   },
   ownKeys: function (target)
   {
      return Object .keys (target [_array]);
   },
   getOwnPropertyDescriptor: function (target, key)
   {
      if (typeof key !== "string")
         return;

      const index = +key;

      if (Number .isInteger (index) && index < target [_array] .length)
      {
         const propertyDescriptor = Object .getOwnPropertyDescriptor (target [_array], key);

         if (propertyDescriptor)
            propertyDescriptor .writable = false;

         return propertyDescriptor;
      }
   },
};

function X3DInfoArray (values, ValueType)
{
   const proxy = new Proxy (this, handler);

   X3DChildObject .call (this);

   this [_array] = [ ];
   this [_index] = new Map ();

   if (values)
   {
      for (const value of values)
      {
         if (!(value instanceof ValueType))
            throw new TypeError (`Wrong type in construction of ${this .getTypeName ()}.`);

         this .add (value .name, value);
      }
   }

   return proxy;
}

X3DInfoArray .prototype = Object .assign (Object .create (X3DChildObject .prototype),
{
   constructor: X3DInfoArray,
   [Symbol .iterator]: function* ()
   {
      yield* this [_array];
   },
   copy: function ()
   {
      return new (this .constructor) (this [_array]);
   },
   equals: function (array)
   {
      const
         a      = this [_array],
         b      = array [_array],
         length = a .length;

      if (a === b)
         return true;

      if (length !== b .length)
         return false;

      for (let i = 0; i < length; ++ i)
      {
         if (a [i] !== b [i])
            return false;
      }

      return true;
   },
   has: function (key)
   {
      return this [_index] .has (key);
   },
   get: function (key)
   {
      return this [_index] .get (key);
   },
   add: function (key, value)
   {
      this [_array] .push (value);
      this [_index] .set (key, value);

      this .addEvent ();
   },
   addAlias: function (alias, key)
   {
      this [_index] .set (alias, this [_index] .get (key));

      this .addEvent ();
   },
   update: function (oldKey, newKey, value)
   {
      // TODO: update alias.

      const oldValue = this [_index] .get (oldKey);

      if (oldKey !== newKey)
         this .remove (newKey);

      this [_index] .delete (oldKey);
      this [_index] .set (newKey, value);

      if (oldValue !== undefined)
      {
         const index = this [_array] .indexOf (oldValue);

         if (index > -1)
            this [_array] [index] = value;
      }
      else
      {
         this [_array] .push (value);
      }

      this .addEvent ();
   },
   remove: function (key)
   {
      // TODO: remove alias.

      const value = this [_index] .get (key);

      if (value === undefined)
         return;

      const index = this [_array] .indexOf (value);

      this [_index] .delete (key);

      if (index > -1)
         this [_array] .splice (index, 1);

      this .addEvent ();
   },
   at: Array .prototype .at,
   // concat: Array .prototype .concat,
   // copyWithin: Array.prototype.copyWithin,
   entries: Array .prototype .entries,
   every: Array .prototype .every,
   // fill: Array .prototype .fill,
   filter: function (callbackFn, thisArg)
   {
      return new (this .constructor) (Array .prototype .filter .call (this, callbackFn, thisArg));
   },
   find: Array .prototype .find,
   findIndex: Array .prototype .findIndex,
   findLast: Array .prototype .findLast,
   findLastIndex: Array .prototype .findLastIndex,
   // flat: Array .prototype .flat,
   // flatMap: Array .prototype .flatMap,
   forEach: Array .prototype .forEach,
   includes: Array .prototype .includes,
   indexOf: Array .prototype .indexOf,
   join: Array .prototype .join,
   keys: Array .prototype .keys,
   lastIndexOf: Array .prototype .lastIndexOf,
   map: function (callbackFn, thisArg)
   {
      return new (this .constructor) (Array .prototype .map .call (this, callbackFn, thisArg));
   },
   reduce: Array .prototype .reduce,
   reduceRight: Array .prototype .reduceRight,
   // reverse: Array .prototype .reverse,
   slice: function (start, end)
   {
      return new (this .constructor) (Array .prototype .slice .call (this, start, end));
   },
   some: Array .prototype .some,
   // sort: Array .prototype .sort,
   toReversed: function ()
   {
      return new (this .constructor) ([... this] .reverse ());
   },
   toSorted: function (compareFn)
   {
      return new (this .constructor) ([... this] .sort (compareFn));
   },
   toSpliced: function (start, deleteCount, ... insertValues)
   {
      const array = [... this];

      array .splice (start, deleteCount, ... insertValues)

      return new (this .constructor) (array);
   },
   values: Array .prototype .values,
   with: function (index, value)
   {
      const array = [... this];

      array [index] = value;

      return new (this .constructor) (array);
   },
   toVRMLStream: function (generator)
   {
      for (const value of this [_array])
      {
         try
         {
            value .toVRMLStream (generator);

            generator .string += generator .Break ();

            if (this .getTypeName () .match (/Proto/))
               generator .string += generator .TidyBreak ();
         }
         catch (error)
         {
            // console .error (error);
         }
      }
   },
   toXMLStream: function (generator)
   {
      for (const value of this [_array])
      {
         try
         {
            value .toXMLStream (generator);

            generator .string += generator .TidyBreak ();
         }
         catch (error)
         {
            // console .error (error);
         }
      }
   },
   toJSONStream: function (generator, comma)
   {
      let lastProperty = false;

      for (const value of this [_array])
      {
         try
         {
            value .toJSONStream (generator, true);

            generator .string += ',';
            generator .string += generator .TidyBreak ();

            lastProperty = true;
         }
         catch (error)
         {
            // console .error (error);
         }
      }

      if (lastProperty && !comma)
         generator .JSONRemoveComma ();

      return lastProperty;
   },
});

for (const key of Reflect .ownKeys (X3DInfoArray .prototype))
   Object .defineProperty (X3DInfoArray .prototype, key, { enumerable: false });

Object .defineProperties (X3DInfoArray .prototype,
{
   length:
   {
      get: function () { return this [_array] .length; },
   },
});

export default X3DInfoArray;
