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

function Complex (real, imag)
{
   this .real = real;
   this .imag = imag;
}

Complex .prototype =
{
   constructor: Complex,
   [Symbol .iterator]: function* ()
   {
      yield this .real;
      yield this .imag;
   },
   copy: function ()
   {
      const copy = Object .create (Complex .prototype);
      copy .real = this .real;
      copy .imag = this .imag;
      return copy;
   },
   assign: function (complex)
   {
      this .real = complex .real;
      this .imag = complex .imag;
      return this;
   },
   equals: function (complex)
   {
      return this .real === complex .real &&
             this .imag === complex .imag;
   },
   set: function (real, imag)
   {
      this .real = real;
      this .imag = imag;
      return this;
   },
   setPolar: function (magnitude, angle)
   {
      this .real = magnitude * Math .cos (angle);
      this .imag = magnitude * Math .sin (angle);
      return this;
   },
   conjugate: function ()
   {
      this .imag = -this .imag;
      return this;
   },
   negate: function ()
   {
      this .real = -this .real;
      this .imag = -this .imag;
      return this;
   },
   inverse: function ()
   {
      const d = this .real * this .real + this .imag * this .imag;

      this .real /=  d;
      this .imag /= -d;
      return this;
   },
   add: function (value)
   {
      this .real += value .real;
      this .imag += value .imag;
      return this;
   },
   subtract: function (value)
   {
      this .real -= value .real;
      this .imag -= value .imag;
      return this;
   },
   multiply: function (value)
   {
      this .real *= value;
      this .imag *= value;
      return this;
   },
   multComp: function (value)
   {
      const
         { real: ar, imag: ai } = this,
         { real: br, imag: bi } = value;

      this .real = ar * br - ai * bi;
      this .imag = ar * bi + ai * br;
      return this;
   },
   divide: function (value)
   {
      this .real /= value;
      this .imag /= value;
      return this;
   },
   divComp: function (value)
   {
      const
         { real: ar, imag: ai } = this,
         { real: br, imag: bi } = value,
         d = br * br + bi * bi;

      this .real = (ar * br + ai * bi) / d;
      this .imag = (ai * br - ar * bi) / d;
      return this;
   },
   toString: function ()
   {
      if (this .imag)
         return this .real + " " + this .imag + "i";

      return String (this .real);
   },
};

Object .defineProperties (Complex .prototype,
{
   length: { value: 2 },
   "0":
   {
      get: function ()
      {
         return this .real;
      },
      set: function (value)
      {
         this .real = value;
      },
   },
   "1":
   {
      get: function ()
      {
         return this .imag;
      },
      set: function (value)
      {
         this .imag = value;
      },
   },
   magnitude:
   {
      get: function ()
      {
         if (this .real)
         {
            if (this .imag)
               return Math .hypot (this .real, this .imag);

            return Math .abs (this .real);
         }

         return Math .abs (this .imag);
      },
      set: function (magnitude)
      {
         this .setPolar (magnitude, this .angle);
      },
   },
   angle:
   {
      get: function ()
      {
         return Math .atan2 (this .imag, this .real);
      },
      set: function (angle)
      {
         this .setPolar (this .magnitude, angle);
      },
   },
});

Object .assign (Complex,
{
   Polar: function (magnitude, angle)
   {
      return Object .create (Complex .prototype) .setPolar (magnitude, angle);
   },
   multiply: function (lhs, rhs)
   {
      return lhs .copy () .multiply (rhs);
   },
   multComp: function (lhs, rhs)
   {
      return lhs .copy () .multComp (rhs);
   },
});

export default Complex;
