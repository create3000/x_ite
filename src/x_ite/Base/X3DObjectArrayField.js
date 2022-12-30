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

import X3DField      from "./X3DField.js";
import X3DArrayField from "./X3DArrayField.js";

const
   _target = Symbol (),
   _proxy  = Symbol ();

const handler =
{
   get: function (target, key)
   {
      const value = target [key];

      if (value !== undefined)
         return value;

      if (typeof key === "string")
      {
         const
            array = target .getValue (),
            index = +key;

         if (Number .isInteger (index))
         {
            if (index >= array .length)
               target .resize (index + 1);

            return array [index] .valueOf ();
         }
         else
         {
            return target [key];
         }
      }
   },
   set: function (target, key, value)
   {
      if (key in target)
      {
         target [key] = value;
         return true;
      }

      const
         array = target .getValue (),
         index = +key;

      if (index >= array .length)
         target .resize (index + 1);

      array [index] .setValue (value);

      return true;
   },
   has: function (target, key)
   {
      if (Number .isInteger (+key))
         return key < target .getValue () .length;

      return key in target;
   },
   ownKeys: function (target)
   {
      return Object .keys (target .getValue ());
   },
   getOwnPropertyDescriptor: function (target, key)
   {
      if (typeof key !== "string")
         return;

      const index = +key;

      if (Number .isInteger (index) && index < target .getValue () .length)
         return Object .getOwnPropertyDescriptor (target .getValue (), key);
   },
};

function X3DObjectArrayField (value)
{
   const proxy = new Proxy (this, handler);

   X3DArrayField .call (this, [ ]);

   this [_target] = this;
   this [_proxy]  = proxy;

   if (value [0] instanceof Array)
      value = value [0];

   X3DObjectArrayField .prototype .push .apply (this, value);

   return proxy;
}

X3DObjectArrayField .prototype = Object .assign (Object .create (X3DArrayField .prototype),
{
   constructor: X3DObjectArrayField,
   [_target]: null,
   [_proxy]: null,
   [Symbol .iterator]: function* ()
   {
      const
         target = this [_target],
         array  = target .getValue ();

      for (const value of array)
         yield value .valueOf ();
   },
   getTarget: function ()
   {
      return this [_target];
   },
   copy: function ()
   {
      const
         target = this [_target],
         copy   = target .create (),
         array  = target .getValue ();

      X3DObjectArrayField .prototype .push .apply (copy, array);

      copy .setModificationTime (0);

      return copy;
   },
   equals: function (array)
   {
      const
         target = this [_target],
         a      = target .getValue (),
         b      = array .getValue (),
         length = a .length;

      if (a === b)
         return true;

      if (length !== b .length)
         return false;

      for (let i = 0; i < length; ++ i)
      {
         if (! a [i] .equals (b [i]))
            return false;
      }

      return true;
   },
   set: function (value)
   {
      const target = this [_target];

      target .resize (value .length, undefined, true);

      const array = target .getValue ();

      for (let i = 0, length = value .length; i < length; ++ i)
         array [i] .set (value [i] instanceof X3DField ? value [i] .getValue () : value [i]);
   },
   isDefaultValue: function ()
   {
      return this .length === 0;
   },
   setValue: function (value)
   {
      const target = this [_target];

      target .set (value instanceof X3DObjectArrayField ? value .getValue () : value);
      target .addEvent ();
   },
   unshift: function (value)
   {
      const
         target = this [_target],
         array  = target .getValue ();

      for (let i = arguments .length - 1; i >= 0; -- i)
      {
         const field = new (target .getSingleType ()) ();

         field .setValue (arguments [i]);
         target .addChildObject (field);
         array .unshift (field);
      }

      target .addEvent ();

      return array .length;
   },
   shift: function ()
   {
      const
         target = this [_target],
         array  = target .getValue ();

      if (array .length)
      {
         const field = array .shift ();
         target .removeChildObject (field);
         target .addEvent ();
         return field .valueOf ();
      }
   },
   push: function (value)
   {
      const
         target = this [_target],
         array  = target .getValue ();

      for (const argument of arguments)
      {
         const field = new (target .getSingleType ()) ();

         field .setValue (argument);
         target .addChildObject (field);
         array .push (field);
      }

      target .addEvent ();

      return array .length;
   },
   pop: function ()
   {
      const
         target = this [_target],
         array  = target .getValue ();

      if (array .length)
      {
         const field = array .pop ();
         target .removeChildObject (field);
         target .addEvent ();
         return field .valueOf ();
      }
   },
   splice: function (index, deleteCount)
   {
      const
         target = this [_target],
         array  = target .getValue ();

      if (index > array .length)
         index = array .length;

      if (index + deleteCount > array .length)
         deleteCount = array .length - index;

      const result = target .erase (index, index + deleteCount);

      if (arguments .length > 2)
         target .insert (index, arguments, 2, arguments .length);

      return result;
   },
   insert: function (index, array, first, last)
   {
      const
         target = this [_target],
         args   = [index, 0];

      for (let i = first; i < last; ++ i)
      {
         const field = new (target .getSingleType ()) ();

         field .setValue (array [i]);
         target .addChildObject (field);
         args .push (field);
      }

      Array .prototype .splice .apply (target .getValue (), args);

      target .addEvent ();
   },
   find: function (first, last, value)
   {
      const
         target = this [_target],
         values = target .getValue ();

      if (typeof value === "function")
      {
         for (let i = first; i < last; ++ i)
         {
            if (value (values [i] .valueOf ()))
               return i;
         }

         return last;
      }

      for (let i = first; i < last; ++ i)
      {
         if (values [i] .equals (value))
            return i;
      }

      return last;
   },
   remove: function (first, last, value)
   {
      const
         target = this [_target],
         values = target .getValue ();

      if (typeof value === "function")
      {
         first = target .find (first, last, value);

         if (first !== last)
         {
            for (let i = first; ++ i < last; )
            {
               const current = values [i];

               if (! value (current .valueOf ()))
               {
                  const tmp = values [first];

                  values [first ++] = current;
                  values [i]        = tmp;
               }
            }
         }

         if (first !== last)
            target .addEvent ();

         return first;
      }

      first = target .find (first, last, value);

      if (first !== last)
      {
         for (let i = first; ++ i < last; )
         {
            const current = values [i];

            if (! current .equals (value))
            {
               const tmp = values [first];

               values [first ++] = current;
               values [i]        = tmp;
            }
         }
      }

      if (first !== last)
         target .addEvent ();

      return first;
   },
   erase: function (first, last)
   {
      const
         target = this [_target],
         values = target .getValue () .splice (first, last - first);

      for (const value of values)
         target .removeChildObject (value);

      target .addEvent ();

      return values .map (function (value) { return value .valueOf () });
   },
   resize: function (size, value, silent)
   {
      const
         target = this [_target],
         array  = target .getValue ();

      if (size < array .length)
      {
         for (let i = size, length = array .length; i < length; ++ i)
            target .removeChildObject (array [i]);

         array .length = size;

         if (! silent)
            target .addEvent ();
      }
      else if (size > array .length)
      {
         for (let i = array .length; i < size; ++ i)
         {
            const field = new (target .getSingleType ()) ();

            if (value !== undefined)
               field .setValue (value);

            target .addChildObject (field);
            array .push (field);
         }

         if (! silent)
            target .addEvent ();
      }
   },
   addChildObject: function (value)
   {
      value .addParent (this [_proxy]);
   },
   removeChildObject: function (value)
   {
      value .removeParent (this [_proxy]);
   },
   toStream: function (generator)
   {
      const
         target = this [_target],
         array  = target .getValue ();

      switch (array .length)
      {
         case 0:
         {
            generator .string += "[";
            generator .string += generator .TidySpace ();
            generator .string += "]";
            break;
         }
         case 1:
         {
            generator .PushUnitCategory (target .getUnit ());

            array [0] .toStream (generator);

            generator .PopUnitCategory ();
            break;
         }
         default:
         {
            generator .PushUnitCategory (target .getUnit ());

            generator .string += "[";
            generator .string += generator .ListStart ();
            generator .IncIndent ();

            for (let i = 0, length = array .length - 1; i < length; ++ i)
            {
               generator .string += generator .ListIndent ();
               array [i] .toStream (generator);
               generator .string += generator .Comma ();
               generator .string += generator .ListBreak ();
            }

            generator .string += generator .ListIndent ();
            array .at (-1) .toStream (generator);

            generator .string += generator .ListStart ();
            generator .DecIndent ();
            generator .string += generator .ListIndent ();
            generator .string += "]";

            generator .PopUnitCategory ();
            break;
         }
      }
   },
   toVRMLStream: function (generator)
   {
      this .toStream (generator);
   },
   toXMLStream: function (generator)
   {
      const
         target = this [_target],
         length = target .length;

      if (length)
      {
         const array = target .getValue ();

         generator .PushUnitCategory (target .getUnit ());

         for (let i = 0, length = array .length - 1; i < length; ++ i)
         {
            array [i] .toXMLStream (generator);
            generator .string += generator .Comma ();
            generator .string += generator .TidySpace ();
         }

         array .at (-1) .toXMLStream (generator);

         generator .PopUnitCategory ();
      }
   },
   dispose: function ()
   {
      const
         target = this [_target],
         array  = target .getValue ();

      for (const value of array)
         target .removeChildObject (value);

      array .length = 0;

      X3DArrayField .prototype .dispose .call (target);
   },
});

for (const key of Reflect .ownKeys (X3DObjectArrayField .prototype))
   Object .defineProperty (X3DObjectArrayField .prototype, key, { enumerable: false });

Object .defineProperty (X3DObjectArrayField .prototype, "length",
{
   get: function () { return this [_target] .getValue () .length; },
   set: function (value) { this [_target] .resize (value); },
   enumerable: false,
   configurable: false,
});

export default X3DObjectArrayField;
