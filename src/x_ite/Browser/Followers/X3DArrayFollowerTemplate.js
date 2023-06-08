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

function X3DArrayFollowerTemplate (Type)
{
   function X3DArrayFollowerObject ()
   {
      this .array = this .getArray ();
      this .zero  = this .getVector ();
   }

   Object .assign (X3DArrayFollowerObject .prototype,
   {
      getArray ()
      {
         const array = [ ];

         array .assign = function (value)
         {
            if (Array .isArray (value))
            {
               for (var i = 0, length = Math .min (this .length, value .length); i < length; ++ i)
                  this [i] .assign (value [i]);

               for (var i = length, length = value .length; i < length; ++ i)
                  this [i] = value [i] .copy ();

               this .length = length;
            }
            else
            {
               for (var i = 0, length = Math .min (this .length, value .length); i < length; ++ i)
                  this [i] .assign (value [i] .getValue ());

               for (var i = length, length = value .length; i < length; ++ i)
                  this [i] = value [i] .getValue () .copy ();

               this .length = length;
            }
         };

         return array;
      },
      getValue ()
      {
         return this ._set_value;
      },
      getDestination ()
      {
         return this ._set_destination;
      },
      getInitialValue ()
      {
         return this ._initialValue;
      },
      getInitialDestination ()
      {
         return this ._initialDestination;
      },
      setValue (value)
      {
         if (Array .isArray (value))
         {
            const value_changed = this ._value_changed;

            for (var i = 0, length = value .length; i < length; ++ i)
               value_changed [i] = value [i];

            value_changed .length = length;
         }
         else
         {
            this ._value_changed = value;
         }
      },
      duplicate (value)
      {
         const array = this .getArray ();

         array .assign (value);

         return array;
      },
      equals (lhs, rhs, tolerance)
      {
         if (lhs .length !== rhs .length)
            return false;

         const a = this .a;

         let distance = 0;

         for (let i = 0, length = lhs .length; i < length; ++ i)
           distance = Math .max (a .assign (lhs [i]) .subtract (rhs [i]) .magnitude ());

         return distance < tolerance;
      },
      interpolate (source, destination, weight)
      {
         const array = this .array;

         array .assign (source);

         for (let i = 0, length = array .length; i < length; ++ i)
            array [i] .lerp (destination [i] || this .zero, weight);

         return array;
      },
      set_destination__ ()
      {
         const
            buffers = this .getBuffer (),
            l       = this ._set_destination .length;

         for (let i = 0, length = buffers .length; i < length; ++ i)
         {
            const buffer = buffers [i];

            for (let b = buffer .length; b < l; ++ b)
               buffer [b] = this .getVector ();

            buffer .length = l;
         }

         Type .prototype .set_destination__ .call (this);
      },
   });

   return X3DArrayFollowerObject;
}

export default X3DArrayFollowerTemplate;
