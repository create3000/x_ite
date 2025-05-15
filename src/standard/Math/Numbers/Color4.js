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

import Color3 from "./Color3.js";

const
   _r = Symbol .for ("X_ITE.Color3.r"),
   _g = Symbol .for ("X_ITE.Color3.g"),
   _b = Symbol .for ("X_ITE.Color3.b"),
   _a = Symbol ();

// glTF sometimes allows color values greater than 1.
// See: https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_specular/README.md
// See: https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SpecularTest/glTF/SpecularTest.gltf

function Color4 (r = 0, g = r, b = g, a = b)
{
   this [_r] = r;
   this [_g] = g;
   this [_b] = b;
   this [_a] = a;
}

Object .assign (Color4 .prototype,
{
   *[Symbol .iterator] ()
   {
      yield this [_r];
      yield this [_g];
      yield this [_b];
      yield this [_a];
   },
   copy ()
   {
      const copy = Object .create (Color4 .prototype);
      copy [_r] = this [_r];
      copy [_g] = this [_g];
      copy [_b] = this [_b];
      copy [_a] = this [_a];
      return copy;
   },
   assign (color)
   {
      this [_r] = color [_r];
      this [_g] = color [_g];
      this [_b] = color [_b];
      this [_a] = color [_a];
      return this;
   },
   set (r = 0, g = r, b = g, a = b)
   {
      this [_r] = r;
      this [_g] = g;
      this [_b] = b;
      this [_a] = a;
      return this;
   },
   equals (color)
   {
      return this [_r] === color [_r] &&
             this [_g] === color [_g] &&
             this [_b] === color [_b] &&
             this [_a] === color [_a];
   },
   getHSVA (result)
   {
      Color3 .prototype .getHSV .call (this, result);

      result [3] = this [_a];

      return result;
   },
   setHSVA (h, s, v, a)
   {
      Color3 .prototype .setHSV .call (this, h, s, v);

      this [_a] = a;

      return this;
   },
   linearToSRGB (color = new Color4 ())
   {
      Color3 .prototype .linearToSRGB .call (this, color);

      color [_a] = this [_a];

      return color;
   },
   sRGBToLinear (color = new Color4 ())
   {
      Color3 .prototype .sRGBToLinear .call (this, color);

      color [_a] = this [_a];

      return color;
   },
   toString ()
   {
      return this [_r] + " " +
             this [_g] + " " +
             this [_b] + " " +
             this [_a];
   },
});

for (const key of Object .keys (Color4 .prototype))
   Object .defineProperty (Color4 .prototype, key, { enumerable: false });

const r = {
   get () { return this [_r]; },
   set (value) { this [_r] = value; },
};

const g = {
   get () { return this [_g]; },
   set (value) { this [_g] = value; },
};

const b = {
   get () { return this [_b]; },
   set (value) { this [_b] = value; },
};

const a = {
   get () { return this [_a]; },
   set (value) { this [_a] = value; },
};

Object .defineProperties (Color4 .prototype,
{
   length: { value: 4 },
   0: r,
   1: g,
   2: b,
   3: a,
   r: Object .assign ({ enumerable: true }, r),
   g: Object .assign ({ enumerable: true }, g),
   b: Object .assign ({ enumerable: true }, b),
   a: Object .assign ({ enumerable: true }, a),
});

Object .assign (Color4,
{
   Transparent: Object .freeze (new Color4 ()),
   Black: Object .freeze (new Color4 (0, 0, 0, 1)),
   White: Object .freeze (new Color4 (1, 1, 1, 1)),
   HSVA (h, s, v, a)
   {
      const color = Object .create (this .prototype);
      color .setHSVA (h, s, v, a);
      return color;
   },
   lerp (a, b, t, r)
   {
      // Linearely interpolate in HSVA space between source color @a a and destination color @a b by an amount of @a t.
      // Source and destination color must be in HSVA space. The resulting HSVA color is stored in @a r.
      const aa = a [3];
      Color3 .lerp (a, b, t, r);
      r [3] = aa + t * (b [3] - aa);
      return r;
   },
});

export default Color4;
