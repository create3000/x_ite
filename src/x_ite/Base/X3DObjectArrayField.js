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
   _proxy  = Symbol (),
   _insert = Symbol (),
   _erase  = Symbol ();

const handler =
{
   get (target, key)
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
   set (target, key, value)
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
   has (target, key)
   {
      if (Number .isInteger (+key))
         return key < target .getValue () .length;

      return key in target;
   },
   ownKeys (target)
   {
      return Object .keys (target .getValue ());
   },
   getOwnPropertyDescriptor (target, key)
   {
      if (typeof key !== "string")
         return;

      const index = +key;

      if (Number .isInteger (index) && index < target .getValue () .length)
         return Object .getOwnPropertyDescriptor (target .getValue (), key);
   },
};

function X3DObjectArrayField (values)
{
   const proxy = new Proxy (this, handler);

   X3DArrayField .call (this, [ ]);

   this [_target] = this;
   this [_proxy]  = proxy;

   for (const value of values)
      this .push (value);

   return proxy;
}

Object .assign (Object .setPrototypeOf (X3DObjectArrayField .prototype, X3DArrayField .prototype),
{
   [_target]: null,
   [_proxy]: null,
   *[Symbol .iterator] ()
   {
      const
         target = this [_target],
         array  = target .getValue ();

      for (const value of array)
         yield value .valueOf ();
   },
   getTarget ()
   {
      return this [_target];
   },
   copy ()
   {
      const
         target = this [_target],
         copy   = target .create ();

      copy .assign (target);

      return copy;
   },
   equals (array)
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
         if (!a [i] .equals (b [i]))
            return false;
      }

      return true;
   },
   isDefaultValue ()
   {
      return this .length === 0;
   },
   set (value)
   {
      const
         target    = this [_target],
         array     = target .getValue (),
         newLength = value .length;

      target .resize (newLength, undefined, true);

      for (let i = 0; i < newLength; ++ i)
         array [i] .set (value [i] instanceof X3DField ? value [i] .getValue () : value [i]);
   },
   setValue (value)
   {
      const target = this [_target];

      target .set (value instanceof X3DObjectArrayField ? value .getValue () : value);
      target .addEvent ();
   },
   unshift (... args)
   {
      const
         target = this [_target],
         array  = target .getValue ();

      for (let i = args .length - 1; i >= 0; -- i)
      {
         const field = new (target .getSingleType ()) ();

         field .setValue (args [i]);
         target .addChildObject (field);
         array .unshift (field);
      }

      target .addEvent ();

      return array .length;
   },
   shift ()
   {
      const
         target = this [_target],
         array  = target .getValue ();

      if (array .length)
      {
         const
            field  = array .shift (),
            result = field .valueOf ();

         target .removeChildObject (field);
         target .addEvent ();

         return result;
      }
   },
   push (... args)
   {
      const
         target = this [_target],
         array  = target .getValue ();

      for (const argument of args)
      {
         const field = new (target .getSingleType ()) ();

         field .setValue (argument);
         target .addChildObject (field);
         array .push (field);
      }

      target .addEvent ();

      return array .length;
   },
   pop ()
   {
      const
         target = this [_target],
         array  = target .getValue ();

      if (array .length)
      {
         const
            field  = array .pop (),
            result = field .valueOf ();

         target .removeChildObject (field);
         target .addEvent ();

         return result;
      }
   },
   splice (index, deleteCount, ... insertValues)
   {
      const
         target = this [_target],
         array  = target .getValue (),
         length = array .length;

      if (arguments .length === 0)
         return new (target .constructor) ();

      if (arguments .length < 2)
         deleteCount = length;

      const result = target [_erase] (index, deleteCount);

      if (insertValues .length)
         target [_insert] (index, insertValues);

      return result;
   },
   [_insert] (index, array)
   {
      const
         target = this [_target],
         args   = [ ];

      for (const value of array)
      {
         const field = new (target .getSingleType ()) ();

         field .setValue (value);
         target .addChildObject (field);
         args .push (field);
      }

      target .getValue () .splice (index, 0, ... args);
      target .addEvent ();
   },
   [_erase] (index, deleteCount)
   {
      const
         target = this [_target],
         values = target .getValue () .splice (index, deleteCount),
         result = new (target .constructor) ();

      for (const value of values)
      {
         result .push (value);
         target .removeChildObject (value);
      }

      target .addEvent ();

      return result;
   },
   resize (newLength, value, silently)
   {
      const
         target = this [_target],
         array  = target .getValue (),
         length = array .length;

      if (newLength < 0)
         throw new RangeError ("Invalid array length");

      if (newLength < length)
      {
         for (let i = newLength; i < length; ++ i)
            target .removeChildObject (array [i]);

         array .length = newLength;

         if (!silently)
            target .addEvent ();
      }
      else if (newLength > length)
      {
         for (let i = length; i < newLength; ++ i)
         {
            const field = new (target .getSingleType ()) ();

            if (value !== undefined)
               field .setValue (value);

            target .addChildObject (field);
            array .push (field);
         }

         if (!silently)
            target .addEvent ();
      }
   },
   addChildObject (value)
   {
      value .addParent (this [_proxy]);
   },
   removeChildObject (value)
   {
      value .dispose ();
   },
   shrinkToFit ()
   {
      return this .getValue ();
   },
   concat (... args)
   {
      const
         result = this .copy (),
         target = result [_target];

      for (const arg of args)
      {
         for (const value of arg)
            target .push (value);
      }

      return result;
   },
   reverse ()
   {
      const target = this [_target];

      target .getValue () .reverse ();
      target .addEvent ();

      return target [_proxy];
   },
   sort (compareFn)
   {
      const target = this [_target];

      Array .prototype .sort .call (this, compareFn);
      target .addEvent ();

      return target [_proxy];
   },
   valueOf ()
   {
      return this [_proxy];
   },
   toStream (generator)
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
            array [0] .toStream (generator);
            break;
         }
         default:
         {
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

            generator .string += generator .ListEnd ();
            generator .DecIndent ();
            generator .string += generator .ListIndent ();
            generator .string += "]";
            break;
         }
      }
   },
   toVRMLStream (generator)
   {
      this .toStream (generator);
   },
   toXMLStream (generator)
   {
      const
         target = this [_target],
         length = target .length;

      if (length)
      {
         const array = target .getValue ();

         for (let i = 0, length = array .length - 1; i < length; ++ i)
         {
            array [i] .toXMLStream (generator);
            generator .string += generator .Comma ();
            generator .string += generator .TidySpace ();
         }

         array .at (-1) .toXMLStream (generator);
      }
   },
   toJSONStream (generator)
   {
      const
         target = this [_target],
         length = target .length;

      if (length)
      {
         const value = this .getValue ();

         generator .string += '[';
         generator .string += generator .ListBreak ();
         generator .string += generator .IncIndent ();

         for (let i = 0, n = length - 1; i < n; ++ i)
         {
            generator .string += generator .ListIndent ();

            value [i] .toJSONStreamValue (generator);

            generator .string += ',';
            generator .string += generator .ListBreak ();
         }

         generator .string += generator .ListIndent ();

         value .at (-1) .toJSONStreamValue (generator);

         generator .string += generator .ListBreak ();
         generator .string += generator .DecIndent ();
         generator .string += generator .ListIndent ();
         generator .string += ']';
      }
      else
      {
         generator .string += '[';
         generator .string += generator .TidySpace ();
         generator .string += ']';
      }
   },
});

for (const key of Object .keys (X3DObjectArrayField .prototype))
   Object .defineProperty (X3DObjectArrayField .prototype, key, { enumerable: false });

Object .defineProperty (X3DObjectArrayField .prototype, "length",
{
   get () { return this [_target] .getValue () .length; },
   set (value) { this [_target] .resize (value); },
});

export default X3DObjectArrayField;
