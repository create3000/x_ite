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

import X3DArrayField from "./X3DArrayField.js";
import Algorithm     from "../../standard/Math/Algorithm.js";

const
   _target = Symbol (),
   _proxy  = Symbol (),
   _cache  = Symbol (),
   _tmp    = Symbol (),
   _length = Symbol (),
   _insert = Symbol (),
   _erase  = Symbol (),
   _grow   = Symbol ();

const handler =
{
   get (target, key)
   {
      const value = target [key];

      if (value !== undefined)
         return value;

      if (typeof key === "string")
      {
         const index = +key;

         if (Number .isInteger (index))
         {
            const
               components = target .getComponents (),
               valueType  = target .getValueType ();

            let array = target .getValue ();

            if (index >= target [_length])
               array = target .resize (index + 1);

            if (components === 1)
            {
               // Return native JavaScript value.
               return valueType (array [index]);
            }
            else
            {
               // Return reference to index.

               return target [_cache] [index]
                  ?? (target [_cache] [index] = createValue (target, index, components, valueType));
            }
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

      const components = target .getComponents ();

      let
         index = +key,
         array = target .getValue ();

      if (index >= target [_length])
         array = target .resize (index + 1);

      if (components === 1)
      {
         const valueType = target .getValueType ();

         array [index] = valueType (value);
      }
      else
      {
         index *= components;

         for (let c = 0; c < components; ++ c, ++ index)
            array [index] = value [c];
      }

      target .addEvent ();

      return true;
   },
   has (target, key)
   {
      if (Number .isInteger (+key))
         return key < target [_length];

      return key in target;
   },
   ownKeys (target)
   {
      const ownKeys = [ ];

      for (let i = 0, length = target [_length]; i < length; ++ i)
         ownKeys .push (String (i));

      return ownKeys;
   },
   getOwnPropertyDescriptor (target, key)
   {
      if (typeof key !== "string")
         return;

      const index = +key;

      if (Number .isInteger (index) && index < target [_length])
         return Object .getOwnPropertyDescriptor (target .getValue (), key);
   },
};

function X3DTypedArrayField (values)
{
   const proxy = new Proxy (this, handler);

   X3DArrayField .call (this, new (this .getArrayType ()) (16));

   this [_target] = this;
   this [_proxy]  = proxy;

   if (this .getComponents () > 1)
   {
      this [_cache] = [ ]; // Cache of elements.
      this [_tmp]   = [ ]; // Array with components size.
   }

   for (const value of values)
      this .push (value);

   return proxy;
}

Object .assign (Object .setPrototypeOf (X3DTypedArrayField .prototype, X3DArrayField .prototype),
{
   [_target]: null,
   [_tmp]: null,
   [_length]: 0,
   *[Symbol .iterator] ()
   {
      const
         target     = this [_target],
         array      = target .getValue (),
         components = target .getComponents (),
         valueType  = target .getValueType (),
         length     = target [_length];

      if (components === 1)
      {
         // Return native JavaScript value.

         for (let index = 0; index < length; ++ index)
            yield valueType (array [index]);
      }
      else
      {
         // Return reference to index.

         const cache = target [_cache];

         for (let index = 0; index < length; ++ index)
         {
            yield cache [index]
               ?? (cache [index] = createValue (target, index, components, valueType));
         }
      }
   },
   getTarget ()
   {
      return this [_target];
   },
   copy ()
   {
      const
         target     = this [_target],
         array      = target .getValue (),
         copy       = target .create (),
         copyArray  = new (target .getArrayType ()) (array);

      copy [_length] = target [_length];

      X3DArrayField .prototype .set .call (copy, copyArray);

      return copy;
   },
   equals (other)
   {
      const
         target      = this [_target],
         otherTarget = other [_target],
         length      = target [_length];

      if (target === otherTarget)
         return true;

      if (length !== otherTarget [_length])
         return false;

      const
         a = target .getValue (),
         b = otherTarget .getValue ();

      for (let i = 0, l = length * target .getComponents (); i < l; ++ i)
      {
         if (a [i] !== b [i])
            return false;
      }

      return true;
   },
   assign (value)
   {
      const target = this [_target];

      target .set (value .getValue (), value .length);
      target .addEvent ();
   },
   set (otherArray /* value of field */, l /* length of field */)
   {
      const
         target      = this [_target],
         components  = target .getComponents (),
         length      = target [_length];

      let
         array       = target .getValue (),
         otherLength = l !== undefined ? l * components : otherArray .length;

      const rest = otherLength % components;

      if (rest)
      {
         otherLength -= rest;

         console .warn (`Array length must be multiple of components size, which is ${components}.`);
      }

      otherLength /= components;

      if (array .length < otherArray .length)
      {
         array = target [_grow] (otherArray .length);

         array .set (otherArray);

         if (rest)
            array .fill (0, otherLength * components, otherLength * components + rest);
      }
      else
      {
         array .set (otherArray);

         if (otherLength < length)
            array .fill (0, otherLength * components, length * components);
      }

      target [_length] = otherLength;
   },
   isDefaultValue ()
   {
      return this [_length] === 0;
   },
   setValue (value)
   {
      const target = this [_target];

      if (value instanceof target .constructor)
      {
         target .assign (value);
      }
      else
      {
         target .set (value);
         target .addEvent ();
      }
   },
   unshift (value)
   {
      const
         target          = this [_target],
         components      = target .getComponents (),
         length          = target [_length],
         argumentsLength = arguments .length,
         array           = target [_grow] ((length + argumentsLength) * components);

      array .copyWithin (argumentsLength * components, 0, length * components);

      if (components === 1)
      {
         const valueType = target .getValueType ();

         for (let a = 0; a < argumentsLength; ++ a)
            array [a] = valueType (arguments [a]);
      }
      else
      {
         for (let i = 0, a = 0; a < argumentsLength; ++ a)
         {
            const argument = arguments [a];

            for (let c = 0; c < components; ++ c, ++ i)
            {
               array [i] = argument [c];
            }
         }
      }

      target [_length] += argumentsLength;

      target .addEvent ();

      return target [_length];
   },
   shift ()
   {
      const
         target = this [_target],
         length = target [_length];

      if (length)
      {
         const
            array      = target .getValue (),
            components = target .getComponents (),
            valueType  = target .getValueType (),
            newLength  = length - 1;

         if (components === 1)
         {
            var value = valueType (array [0]);
         }
         else
         {
            const tmp = target [_tmp];

            for (let c = 0; c < components; ++ c)
               tmp [c] = array [c];

            var value = new valueType (... tmp);
         }

         array .copyWithin (0, components, length * components);
         array .fill (0, components * newLength, length * components);

         target [_length] = newLength;

         target .addEvent ();
         return value;
      }
   },
   push (value)
   {
      const
         target          = this [_target],
         components      = target .getComponents (),
         length          = target [_length],
         argumentsLength = arguments .length,
         array           = target [_grow] ((length + argumentsLength) * components);

      if (components === 1)
      {
         const valueType = target .getValueType ();

         for (let a = 0, i = length; a < argumentsLength; ++ a, ++ i)
            array [i] = valueType (arguments [a]);
      }
      else
      {
         for (let i = length * components, a = 0; a < argumentsLength; ++ a)
         {
            const argument = arguments [a];

            for (let c = 0; c < components; ++ c,  ++ i)
            {
               array [i] = argument [c];
            }
         }
      }

      target [_length] += argumentsLength;

      target .addEvent ();

      return target [_length];
   },
   pop ()
   {
      const
         target = this [_target],
         length = target [_length];

      if (length)
      {
         const
            array      = target .getValue (),
            components = target .getComponents (),
            valueType  = target .getValueType (),
            newLength  = length - 1;

         if (components === 1)
         {
            var value = valueType (array [length - 1]); // Don't use at(-1).
         }
         else
         {
            const tmp = target [_tmp];

            for (let c = 0, a = newLength * components; c < components; ++ c, ++ a)
               tmp [c] = array [a];

            var value = new valueType (... tmp);
         }

         array .fill (0, newLength * components, length * components);

         target [_length] = newLength;

         target .addEvent ();

         return value;
      }
   },
   splice (index, deleteCount, ... insertValues)
   {
      const
         target = this [_target],
         length = target [_length];

      if (arguments .length === 0)
         return new (target .constructor) ();

      index = Math .min (index|0, length);

      if (arguments .length < 2)
         deleteCount = length;

      deleteCount = deleteCount|0;

      if (index + deleteCount > length)
         deleteCount = length - index;

      const result = target [_erase] (index, index + deleteCount);

      if (insertValues .length)
         target [_insert] (index, insertValues);

      target .addEvent ();

      return result;
   },
   [_insert] (index, other)
   {
      const
         target      = this [_target],
         components  = target .getComponents (),
         length      = target [_length],
         otherLength = other .length,
         array       = target [_grow] ((length + otherLength) * components);

      index *= components;

      array .copyWithin (index + otherLength * components, index, length * components);

      if (components === 1)
      {
         const valueType = target .getValueType ();

         for (let a = 0, i = index; a < otherLength; ++ a, ++ i)
            array [i] = valueType (other [a]);
      }
      else
      {
         for (let i = 0, a = index; i < otherLength; ++ i)
         {
            const value = other [i];

            for (let c = 0; c < components; ++ c, ++ a)
               array [a] = value [c];
         }
      }

      target [_length] += otherLength;
   },
   [_erase] (first, last)
   {
      const
         target     = this [_target],
         array      = target .getValue (),
         components = target .getComponents (),
         difference = last - first,
         length     = target [_length],
         newLength  = length - difference,
         values     = target [_proxy] .slice (first, last);

      first *= components;
      last  *= components;

      array .copyWithin (first, last, length * components);
      array .fill (0, newLength * components, length * components);

      target [_length] = newLength;

      if (components > 1)
         target [_cache] .length = newLength;

      target .addEvent ();

      return values;
   },
   resize (newLength, value, silently)
   {
      const
         target     = this [_target],
         length     = target [_length],
         components = target .getComponents ();

      if (newLength < 0)
         throw new RangeError ("Invalid array length");

      let array = target .getValue ();

      if (newLength < length)
      {
         array .fill (0, newLength * components, length * components);

         if (components > 1)
            target [_cache] .length = newLength;

         if (!silently)
            target .addEvent ();
      }
      else if (newLength > length)
      {
         array = target [_grow] (newLength * components);

         if (value !== undefined)
         {
            if (components === 1)
            {
               array .fill (value, length * components, newLength * components);
            }
            else
            {
               for (let i = length * components, il = newLength * components; i < il; )
               {
                  for (let c = 0; c < components; ++ c, ++ i)
                  {
                     array [i] = value [c];
                  }
               }
            }
         }

         if (!silently)
            target .addEvent ();
      }

      target [_length] = newLength;

      return array;
   },
   [_grow] (length)
   {
      const
         target = this [_target],
         array  = target .getValue ();

      if (length < array .length)
         return array;

      const
         maxLength = Algorithm .nextPowerOfTwo (length),
         newArray  = new (target .getArrayType ()) (maxLength);

      newArray .set (array);

      X3DArrayField .prototype .set .call (target, newArray);

      return newArray;
   },
   shrinkToFit ()
   {
      const
         target = this [_target],
         array  = target .getValue (),
         length = target [_length] * target .getComponents ();

      if (array .length === length)
         return array;

      const newArray = array .subarray (0, length);

      X3DArrayField .prototype .set .call (target, newArray);

      return newArray;
   },
   concat (... args)
   {
      const
         result     = this .copy (),
         target     = result [_target],
         components = target .getComponents (),
         length     = target [_length] + args .reduce ((p, c) => p + c .length, 0),
         value      = target [_grow] (length * components);

      let offset = target [_length] * components;

      for (const arg of args)
      {
         value .set (arg .shrinkToFit (), offset);

         offset += arg .length * components;
      }

      target [_length] = length;

      return result;
   },
   reverse ()
   {
      const
         target     = this [_target],
         array      = target .getValue (),
         components = target .getComponents (),
         length     = target [_length] * components,
         length1_2  = Math .floor (target [_length] / 2) * components;

      if (components === 1)
      {
         for (let i = 0; i < length1_2; ++ i)
         {
            const
               i2 = length - i - 1,
               t  = array [i];

            array [i]  = array [i2];
            array [i2] = t;
         }
      }
      else
      {
         for (let i = 0; i < length1_2; i += components)
         {
            for (let c = 0; c < components; ++ c)
            {
               const
                  i1 = i + c,
                  i2 = length - i - 1 - (components - c - 1),
                  t  = array [i1];

               array [i1] = array [i2];
               array [i2] = t;
            }
         }
      }

      target .addEvent ();

      return target [_proxy];
   },
   sort (compareFn)
   {
      const
         target     = this [_target],
         array      = target .getValue (),
         components = target .getComponents (),
         length     = target [_length];

      if (components === 1)
      {
         const valueType = target .getValueType ();

         const cmp = compareFn
            ? (a, b) => compareFn (valueType (a), valueType (b))
            : Algorithm .cmp;

         target .set (array .subarray (0, length) .sort (cmp));
      }
      else
      {
         const result = Array .from (target [_proxy], value => value .copy ())
            .sort (compareFn ?? ((a, b) =>
         {
            for (let c = 0; c < components; ++ c)
            {
               if (a [c] < b [c])
                  return -1;

               if (b [c] < a [c])
                  return 1;
            }

            return 0;
         }));

         for (let i = 0; i < length; ++ i)
         {
            const value = result [i];

            for (let c = 0, first = i * components; c < components; ++ c, ++ first)
               array [first] = value [c];
         }
      }

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
         target     = this [_target],
         array      = target .getValue (),
         length     = target [_length],
         components = target .getComponents (),
         value      = new (target .getSingleType ()) ();

      value .setUnit (target .getUnit ());

      switch (length)
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
            if (components === 1)
            {
               value .set (array [0]);
               value .toStream (generator);
            }
            else
            {
               for (let c = 0, first = 0; c < components; ++ c, ++ first)
                  value [c] = array [first];

               value .toStream (generator);
            }

            break;
         }
         default:
         {
            generator .string += "[";
            generator .string += generator .ListStart ();
            generator .IncIndent ();

            if (components === 1)
            {
               for (let i = 0, n = length - 1; i < n; ++ i)
               {
                  generator .string += generator .ListIndent ();

                  value .set (array [i * components]);
                  value .toStream (generator);

                  generator .string += generator .Comma ();
                  generator .string += generator .ListBreak ();
               }

               generator .string += generator .ListIndent ();
               value .set (array [(length - 1) * components]);
               value .toStream (generator);
            }
            else
            {
               for (let i = 0, n = length - 1; i < n; ++ i)
               {
                  generator .string += generator .ListIndent ();

                  for (let c = 0, first = i * components; c < components; ++ c, ++ first)
                     value [c] = array [first];

                  value .toStream (generator);

                  generator .string += generator .Comma ();
                  generator .string += generator .ListBreak ();
               }

               generator .string += generator .ListIndent ();

               for (let c = 0, first = (length - 1) * components; c < components; ++ c, ++ first)
                  value [c] = array [first];

               value .toStream (generator);
            }

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
         length = target [_length];

      if (length)
      {
         const
            array      = target .getValue (),
            components = target .getComponents (),
            value      = new (target .getSingleType ()) ();

         value .setUnit (target .getUnit ());

         if (components === 1)
         {
            for (let i = 0, n = length - 1; i < n; ++ i)
            {
               value .set (array [i * components]);
               value .toXMLStream (generator);

               generator .string += generator .Comma ();
               generator .string += generator .TidySpace ();
            }

            value .set (array [(length - 1) * components]);

            value .toXMLStream (generator);
         }
         else
         {
            for (let i = 0, n = length - 1; i < n; ++ i)
            {
               for (let c = 0, first = i * components; c < components; ++ c, ++ first)
                  value [c] = array [first];

               value .toXMLStream (generator);

               generator .string += generator .Comma ();
               generator .string += generator .TidySpace ();
            }

            for (let c = 0, first = (length - 1) * components; c < components; ++ c, ++ first)
               value [c] = array [first];

            value .toXMLStream (generator);
         }
      }
   },
   toJSONStream (generator)
   {
      const
         target = this [_target],
         length = target .length;

      if (length)
      {
         const
            array      = target .getValue (),
            components = target .getComponents (),
            value      = new (target .getSingleType ()) ();

         value .setUnit (target .getUnit ());

         generator .string += '[';
         generator .string += generator .ListBreak ();
         generator .string += generator .IncIndent ();

         if (components === 1)
         {
            for (let i = 0, n = length - 1; i < n; ++ i)
            {
               generator .string += generator .ListIndent ();

               value .set (array [i * components]);
               value .toJSONStreamValue (generator);

               generator .string += ',';
               generator .string += generator .ListBreak ();
            }

            generator .string += generator .ListIndent ();

            value .set (array [(length - 1) * components]);
            value .toJSONStreamValue (generator);
         }
         else
         {
            for (let i = 0, n = length - 1; i < n; ++ i)
            {
               generator .string += generator .ListIndent ();

               for (let c = 0, first = i * components; c < components; ++ c, ++ first)
                  value [c] = array [first];

               value .toJSONStreamValue (generator);

               generator .string += ',';
               generator .string += generator .ListBreak ();
            }

            generator .string += generator .ListIndent ();

            for (let c = 0, first = (length - 1) * components; c < components; ++ c, ++ first)
               value [c] = array [first];

            value .toJSONStreamValue (generator);
         }

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
   dispose ()
   {
      X3DArrayField .prototype .dispose .call (this [_target]);
   },
});

for (const key of Object .keys (X3DTypedArrayField .prototype))
   Object .defineProperty (X3DTypedArrayField .prototype, key, { enumerable: false });

Object .defineProperty (X3DTypedArrayField .prototype, "length",
{
   get () { return this [_length]; },
   set (value) { this [_target] .resize (value); },
});

// Getter/Setter functions to reference a value for a given index.

function createValue (target, index, components, valueType)
{
   const
      value         = new valueType (),
      internalValue = value .getValue (),
      i             = index * components;

   Object .defineProperties (value,
   {
      addEvent:
      {
         value: addEvent .bind (target, i, components, internalValue),
         configurable: true,
      },
      getValue:
      {
         value: getValue .bind (target, i, components, internalValue),
         configurable: true,
      },
   });

   return value;
}

function getValue (index, components, value)
{
   const array = this .getValue ();

   for (let c = 0; c < components; ++ c, ++ index)
      value [c] = array [index];

   return value;
}

function addEvent (index, components, value)
{
   const array = this .getValue ();

   for (let c = 0; c < components; ++ c, ++ index)
      array [index] = value [c];

   this .addEvent ();
}

export default X3DTypedArrayField;
