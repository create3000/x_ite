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
import SFColor  from "./SFColor.js";
import Color4   from "../../standard/Math/Numbers/Color4.js";

function SFColorRGBA (r, g, b, a)
{
   switch (arguments .length)
   {
      case 0:
         X3DField .call (this, new Color4 ());
         break;

      case 1:
         X3DField .call (this, arguments [0]);
         break;

      case 4:
         X3DField .call (this, new Color4 (+r, +g, +b, +a));
         break

      default:
         throw new Error ("Invalid arguments.");
   }
}

Object .assign (Object .setPrototypeOf (SFColorRGBA .prototype, X3DField .prototype),
{
   *[Symbol .iterator] ()
   {
      yield* this .getValue ();
   },
   copy ()
   {
      return new SFColorRGBA (this .getValue () .copy ());
   },
   equals: SFColor .prototype .equals,
   isDefaultValue ()
   {
      return this .getValue () .equals (Color4 .Transparent);
   },
   set: SFColor .prototype .set,
   getHSVA ()
   {
      return this .getValue () .getHSVA ([ ]);
   },
   setHSVA (h, s, v, a)
   {
      this .getValue () .setHSVA (h, s, v, a);
      this .addEvent ();
   },
   linearTosRGB ()
   {
      return new SFColorRGBA (this .getValue () .linearTosRGB ());
   },
   sRGBToLinear ()
   {
      return new SFColorRGBA (this .getValue () .sRGBToLinear ());
   },
   lerp: (() =>
   {
      const
         s = [ ],
         d = [ ],
         r = [ ];

      return function (destination, t)
      {
         const result = new SFColorRGBA ();

         this .getValue () .getHSVA (s);
         destination .getValue () .getHSVA (d);

         Color4 .lerp (s, d, t, r);

         result .setHSVA (r [0], r [1], r [2], r [3]);

         return result;
      };
   })(),
   toStream: SFColor .prototype .toStream,
   toVRMLStream: SFColor .prototype .toVRMLStream,
   toXMLStream: SFColor .prototype .toXMLStream,
   toJSONStream: SFColor .prototype .toJSONStream,
   toJSONStreamValue: SFColor .prototype .toJSONStreamValue,
});

for (const key of Object .keys (SFColorRGBA .prototype))
   Object .defineProperty (SFColorRGBA .prototype, key, { enumerable: false });

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

const a = {
   get ()
   {
      return this .getValue () .a;
   },
   set (value)
   {
      this .getValue () .a = +value;
      this .addEvent ();
   },
};

Object .defineProperties (SFColorRGBA .prototype,
{
   0: r,
   1: g,
   2: b,
   3: a,
   r: Object .assign ({ enumerable: true }, r),
   g: Object .assign ({ enumerable: true }, g),
   b: Object .assign ({ enumerable: true }, b),
   a: Object .assign ({ enumerable: true }, a),
});

Object .defineProperties (SFColorRGBA,
{
   typeName:
   {
      value: "SFColorRGBA",
      enumerable: true,
   },
});

export default SFColorRGBA;
