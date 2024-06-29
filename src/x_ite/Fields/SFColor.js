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

import Color3   from "../../standard/Math/Numbers/Color3.js";
import X3DField from "../Base/X3DField.js";

function SFColor (r, g, b)
{
   switch (arguments .length)
   {
      case 0:
         X3DField .call (this, new Color3 ());
         break;

      case 1:
         X3DField .call (this, arguments [0]);
         break;

      case 3:
         X3DField .call (this, new Color3 (+r, +g, +b));
         break;

      default:
         throw new Error ("Invalid arguments.");
   }
}

Object .assign (Object .setPrototypeOf (SFColor .prototype, X3DField .prototype),
{
   *[Symbol .iterator] ()
   {
      yield* this .getValue ();
   },
   copy ()
   {
      return new SFColor (this .getValue () .copy ());
   },
   equals (color)
   {
      return this .getValue () .equals (color .getValue ());
   },
   isDefaultValue ()
   {
      return this .getValue () .equals (Color3 .Black);
   },
   set (value)
   {
      this .getValue () .assign (value);
   },
   getHSV ()
   {
      return this .getValue () .getHSV ([ ]);
   },
   setHSV (h, s, v)
   {
      this .getValue () .setHSV (h, s, v);
      this .addEvent ();
   },
   linearToSRGB ()
   {
      return new SFColor (this .getValue () .linearToSRGB ());
   },
   sRGBToLinear ()
   {
      return new SFColor (this .getValue () .sRGBToLinear ());
   },
   lerp: (() =>
   {
      const
         s = [ ],
         d = [ ],
         r = [ ];

      return function (destination, t)
      {
         const result = new SFColor ();

         this .getValue () .getHSV (s);
         destination .getValue () .getHSV (d);

         Color3 .lerp (s, d, t, r);

         result .setHSV (r [0], r [1], r [2]);

         return result;
      };
   })(),
   toStream (generator)
   {
      const
         value = this .getValue (),
         last  = value .length - 1;

      for (let i = 0; i < last; ++ i)
      {
         generator .string += generator .FloatFormat (value [i]);
         generator .string += generator .Space ();
      }

      generator .string += generator .FloatFormat (value [last]);
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
         generator .string += generator .JSONNumber (generator .FloatFormat (value [i]));
         generator .string += ',';
         generator .string += generator .TidySpace ();
      }

      generator .string += generator .JSONNumber (generator .FloatFormat (value [last]));
   },
});

for (const key of Object .keys (SFColor .prototype))
   Object .defineProperty (SFColor .prototype, key, { enumerable: false });

const r = {
   get ()
   {
      return this .getValue () .r;
   },
   set (value)
   {
      this .getValue () .r = +value;
      this .addEvent ();
   },
};

const g = {
   get ()
   {
      return this .getValue () .g;
   },
   set (value)
   {
      this .getValue () .g = +value;
      this .addEvent ();
   },
};

const b = {
   get ()
   {
      return this .getValue () .b;
   },
   set (value)
   {
      this .getValue () .b = +value;
      this .addEvent ();
   },
};

Object .defineProperties (SFColor .prototype,
{
   0: r,
   1: g,
   2: b,
   r: Object .assign ({ enumerable: true }, r),
   g: Object .assign ({ enumerable: true }, g),
   b: Object .assign ({ enumerable: true }, b),
});

Object .defineProperties (SFColor,
{
   typeName:
   {
      value: "SFColor",
      enumerable: true,
   },
});

export default SFColor;
