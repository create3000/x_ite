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

import Color3       from "../../standard/Math/Numbers/Color3.js";
import X3DField     from "../Base/X3DField.js";
import X3DConstants from "../Base/X3DConstants.js";
import Generator    from "../InputOutput/Generator.js";

function SFColor (r, g, b)
{
   switch (arguments .length)
   {
      case 0:
         return X3DField .call (this, new Color3 ());

      case 1:
         return X3DField .call (this, arguments [0]);

      case 3:
         return X3DField .call (this, new Color3 (+r, +g, +b));
   }

   throw new Error ("Invalid arguments.");
}

SFColor .prototype = Object .assign (Object .create (X3DField .prototype),
{
   constructor: SFColor,
   [Symbol .iterator]: function* ()
   {
      yield* this .getValue ();
   },
   copy: function ()
   {
      return new SFColor (this .getValue () .copy ());
   },
   getTypeName: function ()
   {
      return "SFColor";
   },
   getType: function ()
   {
      return X3DConstants .SFColor;
   },
   equals: function (color)
   {
      return this .getValue () .equals (color .getValue ());
   },
   isDefaultValue: function ()
   {
      return this .getValue () .equals (Color3 .Black);
   },
   set: function (value)
   {
      this .getValue () .assign (value);
   },
   getHSV: function ()
   {
      return this .getValue () .getHSV ([ ]);
   },
   setHSV: function (h, s, v)
   {
      this .getValue () .setHSV (h, s, v);
      this .addEvent ();
   },
   lerp: (function ()
   {
      const
         s = [ ],
         d = [ ],
         r = [ ];

      return function (destination, t)
      {
         const result = new SFColor ();

         this .getValue () .getHSV (s),
         destination .getValue () .getHSV (d),
         Color3 .lerp (s, d, t, r),

         result .setHSV (r [0], r [1], r [2], r [3]);

         return result;
      };
   })(),
   toStream: function (generator)
   {
      const
         value = this .getValue (),
         last  = value .length - 1;

      for (let i = 0; i < last; ++ i)
      {
         generator .string += generator .Precision (value [i]);
         generator .string += " ";
      }

      generator .string += generator .Precision (value [last]);
   },
   toVRMLStream: function (generator)
   {
      this .toStream (generator);
   },
   toXMLStream: function (generator)
   {
      this .toStream (generator);
   },
});

for (const key of Reflect .ownKeys (SFColor .prototype))
   Object .defineProperty (SFColor .prototype, key, { enumerable: false });

const r = {
   get: function ()
   {
      return this .getValue () .r;
   },
   set: function (value)
   {
      this .getValue () .r = +value;
      this .addEvent ();
   },
   enumerable: true,
   configurable: false
};

const g = {
   get: function ()
   {
      return this .getValue () .g;
   },
   set: function (value)
   {
      this .getValue () .g = +value;
      this .addEvent ();
   },
   enumerable: true,
   configurable: false
};

const b = {
   get: function ()
   {
      return this .getValue () .b;
   },
   set: function (value)
   {
      this .getValue () .b = +value;
      this .addEvent ();
   },
   enumerable: true,
   configurable: false
};

Object .defineProperty (SFColor .prototype, "r", r);
Object .defineProperty (SFColor .prototype, "g", g);
Object .defineProperty (SFColor .prototype, "b", b);

r .enumerable = false;
g .enumerable = false;
b .enumerable = false;

Object .defineProperty (SFColor .prototype, "0", r);
Object .defineProperty (SFColor .prototype, "1", g);
Object .defineProperty (SFColor .prototype, "2", b);

export default SFColor;
