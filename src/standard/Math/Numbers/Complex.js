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

function Complex (real = 0, imag = 0)
{
   this .real = real;
   this .imag = imag;
}

Object .assign (Complex .prototype,
{
   *[Symbol .iterator] ()
   {
      yield this .real;
      yield this .imag;
   },
   copy ()
   {
      const copy = Object .create (Complex .prototype);
      copy .real = this .real;
      copy .imag = this .imag;
      return copy;
   },
   assign (complex)
   {
      this .real = complex .real;
      this .imag = complex .imag;
      return this;
   },
   equals (complex)
   {
      return this .real === complex .real &&
             this .imag === complex .imag;
   },
   set (real = 0, imag = 0)
   {
      this .real = real;
      this .imag = imag;
      return this;
   },
   setPolar (magnitude, angle)
   {
      this .real = magnitude * Math .cos (angle);
      this .imag = magnitude * Math .sin (angle);
      return this;
   },
   conjugate ()
   {
      this .imag = -this .imag;
      return this;
   },
   negate ()
   {
      this .real = -this .real;
      this .imag = -this .imag;
      return this;
   },
   inverse ()
   {
      const d = this .real * this .real + this .imag * this .imag;

      this .real /=  d;
      this .imag /= -d;
      return this;
   },
   add (value)
   {
      this .real += value .real;
      this .imag += value .imag;
      return this;
   },
   subtract (value)
   {
      this .real -= value .real;
      this .imag -= value .imag;
      return this;
   },
   multiply (value)
   {
      this .real *= value;
      this .imag *= value;
      return this;
   },
   multComp (value)
   {
      const
         { real: ar, imag: ai } = this,
         { real: br, imag: bi } = value;

      this .real = ar * br - ai * bi;
      this .imag = ar * bi + ai * br;
      return this;
   },
   divide (value)
   {
      this .real /= value;
      this .imag /= value;
      return this;
   },
   divComp (value)
   {
      const
         { real: ar, imag: ai } = this,
         { real: br, imag: bi } = value,
         d = br * br + bi * bi;

      this .real = (ar * br + ai * bi) / d;
      this .imag = (ai * br - ar * bi) / d;
      return this;
   },
   toString ()
   {
      let string = "";

      string += this .real;

      if (this .imag < 0)
      {
         string += this .imag;
         string += "i";
      }
      else if (this .imag > 0)
      {
         string += "+";
         string += this .imag;
         string += "i";
      }

      return string;
   },
});

for (const key of Object .keys (Complex .prototype))
   Object .defineProperty (Complex .prototype, key, { enumerable: false });

Object .defineProperties (Complex .prototype,
{
   length: { value: 2 },
   0:
   {
      get ()
      {
         return this .real;
      },
      set (value)
      {
         this .real = value;
      },
   },
   1:
   {
      get ()
      {
         return this .imag;
      },
      set (value)
      {
         this .imag = value;
      },
   },
   magnitude:
   {
      get ()
      {
         if (this .real)
         {
            if (this .imag)
               return Math .hypot (this .real, this .imag);

            return Math .abs (this .real);
         }

         return Math .abs (this .imag);
      },
      set (magnitude)
      {
         this .setPolar (magnitude, this .angle);
      },
   },
   angle:
   {
      get ()
      {
         return Math .atan2 (this .imag, this .real);
      },
      set (angle)
      {
         this .setPolar (this .magnitude, angle);
      },
   },
});

Object .assign (Complex,
{
   Polar (magnitude, angle)
   {
      return Object .create (Complex .prototype) .setPolar (magnitude, angle);
   },
   multiply (lhs, rhs)
   {
      return lhs .copy () .multiply (rhs);
   },
});

export default Complex;
