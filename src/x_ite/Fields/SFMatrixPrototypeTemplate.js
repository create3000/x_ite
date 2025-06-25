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

function SFMatrixPrototypeTemplate (Constructor, TypeName, Matrix, double, properties = { })
{
   const _formatter = double ? "DoubleFormat" : "FloatFormat";

   Object .defineProperties (Constructor,
   {
      typeName:
      {
         value: TypeName,
         enumerable: true,
      },
   });

   Object .assign (Object .setPrototypeOf (Constructor .prototype, X3DField .prototype),
   {
      *[Symbol .iterator] ()
      {
         yield* this .getValue ();
      },
      copy ()
      {
         return new (this .constructor) (this .getValue () .copy ());
      },
      equals (matrix)
      {
         return this .getValue () .equals (matrix .getValue ());
      },
      isDefaultValue ()
      {
         return this .getValue () .equals (Matrix .Identity);
      },
      set (value)
      {
         this .getValue () .assign (value);
      },
      setTransform: (() =>
      {
         const args = [ ];

         return function (translation, rotation, scale, scaleOrientation, center)
         {
            args .push (translation      ?.getValue (),
                        rotation         ?.getValue (),
                        scale            ?.getValue (),
                        scaleOrientation ?.getValue (),
                        center           ?.getValue ());

            for (let i = args .length - 1; i > -1; -- i)
            {
               if (args [i])
                  break;

               args .pop ();
            }

            this .getValue () .set (... args);

            args .length = 0;
         };
      })(),
      getTransform: (() =>
      {
         const args = [ ];

         return function (translation, rotation, scale, scaleOrientation, center)
         {
            args .push (translation      ?.getValue (),
                        rotation         ?.getValue (),
                        scale            ?.getValue (),
                        scaleOrientation ?.getValue (),
                        center           ?.getValue ());

            for (let i = args .length - 1; i > -1; -- i)
            {
               if (args [i])
                  break;

               args .pop ();
            }

            this .getValue () .get (... args);

            translation      ?.addEvent ();
            rotation         ?.addEvent ();
            scale            ?.addEvent ();
            scaleOrientation ?.addEvent ();

            args .length = 0;
         };
      })(),
      determinant ()
      {
         return this .getValue () .determinant ();
      },
      transpose ()
      {
         return new (this .constructor) (this .getValue () .copy () .transpose ());
      },
      inverse ()
      {
         return new (this .constructor) (this .getValue () .copy () .inverse ());
      },
      multLeft (matrix)
      {
         return new (this .constructor) (this .getValue () .copy () .multLeft (matrix .getValue ()));
      },
      multRight (matrix)
      {
         return new (this .constructor) (this .getValue () .copy () .multRight (matrix .getValue ()));
      },
      multVecMatrix (vector)
      {
         return new (vector .constructor) (this .getValue () .multVecMatrix (vector .getValue () .copy ()));
      },
      multMatrixVec (vector)
      {
         return new (vector .constructor) (this .getValue () .multMatrixVec (vector .getValue () .copy ()));
      },
      multDirMatrix (vector)
      {
         return new (vector .constructor) (this .getValue () .multDirMatrix (vector .getValue () .copy ()));
      },
      multMatrixDir (vector)
      {
         return new (vector .constructor) (this .getValue () .multMatrixDir (vector .getValue () .copy ()));
      },
      translate (translation)
      {
         return new (this .constructor) (this .getValue () .copy () .translate (translation .getValue ()));
      },
      rotate (rotation)
      {
         return new (this .constructor) (this .getValue () .copy () .rotate (rotation .getValue ()));
      },
      scale (scale)
      {
         return new (this .constructor) (this .getValue () .copy () .scale (scale .getValue ()));
      },
      toStream (generator)
      {
         const
            value = this .getValue (),
            last  = value .length - 1;

         for (let i = 0; i < last; ++ i)
         {
            generator .string += generator [_formatter] (value [i]);
            generator .string += generator .Space ();
         }

         generator .string += generator [_formatter] (value [last]);
      },
      toVRMLStream (generator)
      {
         this .toStream (generator);
      },
      toXMLStream (generator)
      {
         this .toStream (generator);
      },
      toJSONStream (generator)
      {
         generator .string += '[';
         generator .string += generator .TidySpace ();

         this .toJSONStreamValue (generator);

         generator .string += generator .TidySpace ();
         generator .string += ']';
      },
      toJSONStreamValue (generator)
      {
         const
            value = this .getValue (),
            last  = value .length - 1;

         for (let i = 0; i < last; ++ i)
         {
            generator .string += generator .JSONNumber (generator [_formatter] (value [i]));
            generator .string += ',';
            generator .string += generator .TidySpace ();
         }

         generator .string += generator .JSONNumber (generator [_formatter] (value [last]));
      },
   },
   properties);

   for (const key of Object .keys (Constructor .prototype))
      Object .defineProperty (Constructor .prototype, key, { enumerable: false });

   function defineProperty (i)
   {
      Object .defineProperty (Constructor .prototype, i,
      {
         get ()
         {
            return this .getValue () [i];
         },
         set (value)
         {
            this .getValue () [i] = +value;
            this .addEvent ();
         },
         enumerable: true,
      });
   }

   for (let i = 0; i < Matrix .prototype .length; ++ i)
      defineProperty (i);

   return Constructor;
}

export default SFMatrixPrototypeTemplate;
