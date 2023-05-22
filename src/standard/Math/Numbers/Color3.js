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

import Algorithm from "../Algorithm.js";

const { clamp, interval, degrees } = Algorithm;

const
   _r = Symbol .for ("X_ITE.Color3.r"),
   _g = Symbol .for ("X_ITE.Color3.g"),
   _b = Symbol .for ("X_ITE.Color3.b");

function Color3 (r, g, b)
{
   this [_r] = clamp (r, 0, 1);
   this [_g] = clamp (g, 0, 1);
   this [_b] = clamp (b, 0, 1);
}

Color3 .prototype =
{
   constructor: Color3,
   [Symbol .iterator]: function* ()
   {
      yield this [_r];
      yield this [_g];
      yield this [_b];
   },
   copy: function ()
   {
      const copy = Object .create (Color3 .prototype);
      copy [_r] = this [_r];
      copy [_g] = this [_g];
      copy [_b] = this [_b];
      return copy;
   },
   assign: function (color)
   {
      this [_r] = color [_r];
      this [_g] = color [_g];
      this [_b] = color [_b];
      return this;
   },
   set: function (r, g, b)
   {
      this [_r] = clamp (r, 0, 1);
      this [_g] = clamp (g, 0, 1);
      this [_b] = clamp (b, 0, 1);
      return this;
   },
   equals: function (color)
   {
      return this [_r] === color [_r] &&
             this [_g] === color [_g] &&
             this [_b] === color [_b];
   },
   getHSV: function (result)
   {
      let h, s, v;

      const min = Math .min (this [_r], this [_g], this [_b]);
      const max = Math .max (this [_r], this [_g], this [_b]);
      v = max; // value

      const delta = max - min;

      if (max !== 0 && delta !== 0)
      {
         s = delta / max; // s

         if (this [_r] === max)
            h =     (this [_g] - this [_b]) / delta;  // between yellow & magenta
         else if (this [_g] === max)
            h = 2 + (this [_b] - this [_r]) / delta;  // between cyan & yellow
         else
            h = 4 + (this [_r] - this [_g]) / delta;  // between magenta & cyan

         h *= Math .PI / 3;  // radiants
         if (h < 0)
            h += Math .PI * 2;
      }
      else
         s = h = 0;         // s = 0, h is undefined

      result [0] = h;
      result [1] = s;
      result [2] = v;

      return result;
   },
   setHSV: function (h, s, v)
   {
      s = clamp (s, 0, 1),
      v = clamp (v, 0, 1);

      // H is given on [0, 2 * Pi]. S and V are given on [0, 1].
      // RGB are each returned on [0, 1].

      if (s === 0)
      {
         // achromatic (grey)
         this [_r] = this [_g] = this [_b] = v;
      }
      else
      {
         const w = degrees (interval (h, 0, Math .PI * 2)) / 60;     // sector 0 to 5

         const i = Math .floor (w);
         const f = w - i;                      // factorial part of h
         const p = v * ( 1 - s );
         const q = v * ( 1 - s * f );
         const t = v * ( 1 - s * ( 1 - f ) );

         switch (i % 6)
         {
            case 0:  this [_r] = v; this [_g] = t; this [_b] = p; break;
            case 1:  this [_r] = q; this [_g] = v; this [_b] = p; break;
            case 2:  this [_r] = p; this [_g] = v; this [_b] = t; break;
            case 3:  this [_r] = p; this [_g] = q; this [_b] = v; break;
            case 4:  this [_r] = t; this [_g] = p; this [_b] = v; break;
            default: this [_r] = v; this [_g] = p; this [_b] = q; break;
         }
      }

      return this;
   },
   toString: function ()
   {
      return this [_r] + " " +
             this [_g] + " " +
             this [_b];
   },
};

const r = {
   get: function () { return this [_r]; },
   set: function (value) { this [_r] = clamp (value, 0, 1); },
   enumerable: true,
};

const g = {
   get: function () { return this [_g]; },
   set: function (value) { this [_g] = clamp (value, 0, 1); },
   enumerable: true,
};

const b = {
   get: function () { return this [_b]; },
   set: function (value) { this [_b] = clamp (value, 0, 1); },
   enumerable: true,
};

Object .defineProperties (Color3 .prototype,
{
   length: { value: 3 },
   r: r,
   g: g,
   b: b,
});

r .enumerable = false;
g .enumerable = false;
b .enumerable = false;

Object .defineProperties (Color3 .prototype,
{
   0: r,
   1: g,
   2: b,
});

Object .assign (Color3,
{
   Black: new Color3 (0, 0, 0),
   White: new Color3 (1, 1, 1),
   HSV: function (h, s, v)
   {
      const color = Object .create (this .prototype);
      color .setHSV (h, s, v);
      return color;
   },
   lerp: function (a, b, t, r)
   {
      // Linearly interpolate in HSV space between source color @a a and destination color @a b by an amount of @a t.
      // Source and destination color must be in HSV space. The resulting HSV color is stored in @a r.

      let
         [ha, sa, va] = a,
         [hb, sb, vb] = b;

      if (sa === 0)
         ha = hb;

      if (sb === 0)
         hb = ha;

      const range = Math .abs (hb - ha);

      if (range <= Math .PI)
      {
         r [0] = ha + t * (hb - ha);
         r [1] = sa + t * (sb - sa);
         r [2] = va + t * (vb - va);
         return r;
      }

      const
         PI2  = Math .PI * 2,
         step = (PI2 - range) * t;

      let h = ha < hb ? ha - step : ha + step;

      if (h < 0)
         h += PI2;

      else if (h > PI2)
         h -= PI2;

      r [0] = h;
      r [1] = sa + t * (sb - sa);
      r [2] = va + t * (vb - va);
      return r;
   },
});

export default Color3;
