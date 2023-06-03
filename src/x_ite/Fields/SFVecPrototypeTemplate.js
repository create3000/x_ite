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

import X3DField from "../Base/X3DField.js";

function SFVecPrototypeTemplate (Constructor, TypeName, Type, Vector, double)
{
   const _formatter = double ? "DoubleFormat" : "FloatFormat";

   Object .defineProperties (Constructor,
   {
      typeName:
      {
         value: TypeName,
         enumerate: true,
      },
   });

   return Object .assign (Object .create (X3DField .prototype),
   {
      constructor: Constructor,
      [Symbol .iterator]: function* ()
      {
         yield* this .getValue ();
      },
      getType: function ()
      {
         return Type;
      },
      copy: function ()
      {
         return new (this .constructor) (this .getValue () .copy ());
      },
      equals: function (vector)
      {
         return this .getValue () .equals (vector .getValue ());
      },
      isDefaultValue: function ()
      {
         return this .getValue () .equals (Vector .Zero);
      },
      set: function (value)
      {
         this .getValue () .assign (value);
      },
      abs: function ()
      {
         return new (this .constructor) (this .getValue () .copy () .abs ());
      },
      add: function (vector)
      {
         return new (this .constructor) (this .getValue () .copy () .add (vector .getValue ()));
      },
      distance: function (vector)
      {
         return this .getValue () .distance (vector .getValue ());
      },
      divide: function (value)
      {
         return new (this .constructor) (this .getValue () .copy () .divide (value));
      },
      divVec: function (vector)
      {
         return new (this .constructor) (this .getValue () .copy () .divVec (vector .getValue ()));
      },
      dot: function (vector)
      {
         return this .getValue () .dot (vector .getValue ());
      },
      inverse: function ()
      {
         return new (this .constructor) (this .getValue () .copy () .inverse ());
      },
      length: function ()
      {
         return this .getValue () .magnitude ();
      },
      lerp: function (destination, t)
      {
         return new (this .constructor) (this .getValue () .copy () .lerp (destination, t));
      },
      max: function (vector)
      {
         return new (this .constructor) (this .getValue () .copy () .max (vector .getValue ()));
      },
      min: function (vector)
      {
         return new (this .constructor) (this .getValue () .copy () .min (vector .getValue ()));
      },
      multiply: function (value)
      {
         return new (this .constructor) (this .getValue () .copy () .multiply (value));
      },
      multVec: function (vector)
      {
         return new (this .constructor) (this .getValue () .copy () .multVec (vector .getValue ()));
      },
      negate: function ()
      {
         return new (this .constructor) (this .getValue () .copy () .negate ());
      },
      normalize: function (vector)
      {
         return new (this .constructor) (this .getValue () .copy () .normalize ());
      },
      subtract: function (vector)
      {
         return new (this .constructor) (this .getValue () .copy () .subtract (vector .getValue ()));
      },
      toStream: function (generator)
      {
         const
            value    = this .getValue (),
            last     = value .length - 1,
            category = generator .Unit (this .getUnit ());

         for (let i = 0; i < last; ++ i)
         {
            generator .string += generator [_formatter] (generator .ToUnit (category, value [i]));
            generator .string += generator .TidySpace ();
         }

         generator .string += generator [_formatter] (generator .ToUnit (category, value [last]));
      },
      toVRMLStream: function (generator)
      {
         this .toStream (generator);
      },
      toXMLStream: function (generator)
      {
         this .toStream (generator);
      },
      toJSONStream: function (generator)
      {
         generator .string += '[';
         generator .string += generator .TidySpace ();

         this .toJSONStreamValue (generator);

         generator .string += generator .TidySpace ();
         generator .string += ']';
      },
      toJSONStreamValue: function (generator)
      {
         const
            value    = this .getValue (),
            last     = value .length - 1,
            category = generator .Unit (this .getUnit ());

         for (let i = 0; i < last; ++ i)
         {
            generator .string += generator .JSONNumber (generator [_formatter] (generator .ToUnit (category, value [i])));
            generator .string += ',';
            generator .string += generator .TidySpace ();
         }

         generator .string += generator .JSONNumber (generator [_formatter] (generator .ToUnit (category, value [last])));
      },
   });
}

export default SFVecPrototypeTemplate;
