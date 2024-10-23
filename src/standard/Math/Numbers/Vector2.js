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

function Vector2 (x = 0, y = 0)
{
   this .x = x;
   this .y = y;
}

Object .assign (Vector2 .prototype,
{
   *[Symbol .iterator] ()
   {
      yield this .x;
      yield this .y;
   },
   copy ()
   {
      const copy = Object .create (Vector2 .prototype);
      copy .x = this .x;
      copy .y = this .y;
      return copy;
   },
   assign (vector)
   {
      this .x = vector .x;
      this .y = vector .y;
      return this;
   },
   set (x = 0, y = 0)
   {
      this .x = x;
      this .y = y;
      return this;
   },
   equals (vector)
   {
      return this .x === vector .x &&
             this .y === vector .y;
   },
   negate ()
   {
      this .x = -this .x;
      this .y = -this .y;
      return this;
   },
   inverse ()
   {
      this .x = 1 / this .x;
      this .y = 1 / this .y;
      return this;
   },
   add (vector)
   {
      this .x += vector .x;
      this .y += vector .y;
      return this;
   },
   subtract (vector)
   {
      this .x -= vector .x;
      this .y -= vector .y;
      return this;
   },
   multiply (value)
   {
      this .x *= value;
      this .y *= value;
      return this;
   },
   multVec (vector)
   {
      this .x *= vector .x;
      this .y *= vector .y;
      return this;
   },
   divide (value)
   {
      this .x /= value;
      this .y /= value;
      return this;
   },
   divVec (vector)
   {
      this .x /= vector .x;
      this .y /= vector .y;
      return this;
   },
   normalize ()
   {
      const length = Math .hypot (this .x, this .y);

      if (length)
      {
         this .x /= length;
         this .y /= length;
      }

      return this;
   },
   dot (vector)
   {
      return this .x * vector .x +
             this .y * vector .y;
   },
   norm ()
   {
      const { x, y } = this;

      return x * x +
             y * y;
   },
   magnitude ()
   {
      return Math .hypot (this .x, this .y);
   },
   distance (vector)
   {
      return Math .hypot (this .x - vector .x,
                          this .y - vector .y);
   },
   lerp (destination, t)
   {
      const { x, y } = this;

      this .x = x + t * (destination .x - x);
      this .y = y + t * (destination .y - y);
      return this;
   },
   abs ()
   {
      this .x = Math .abs (this .x);
      this .y = Math .abs (this .y);
      return this;
   },
   min (vector)
   {
      let { x, y } = this;

      for (const vector of arguments)
      {
         x = Math .min (x, vector .x);
         y = Math .min (y, vector .y);
      }

      this .x = x;
      this .y = y;
      return this;
   },
   max (vector)
   {
      let { x, y } = this;

      for (const vector of arguments)
      {
         x = Math .max (x, vector .x);
         y = Math .max (y, vector .y);
      }

      this .x = x;
      this .y = y;
      return this;
   },
   clamp (min, max)
   {
      this .x = Algorithm .clamp (this .x, min .x, max .x);
      this .y = Algorithm .clamp (this .y, min .y, max .y);
   },
   toString ()
   {
      return this .x + " " +
             this .y;
   }
});

for (const key of Object .keys (Vector2 .prototype))
   Object .defineProperty (Vector2 .prototype, key, { enumerable: false });

Object .defineProperties (Vector2 .prototype,
{
   length: { value: 2 },
   0:
   {
      get () { return this .x; },
      set (value) { this .x = value; },
   },
   1:
   {
      get () { return this .y; },
      set (value) { this .y = value; },
   },
});

Object .assign (Vector2,
{
   Zero: Object .freeze (new Vector2 ()),
   One: Object .freeze (new Vector2 (1, 1)),
   xAxis: Object .freeze (new Vector2 (1, 0)),
   yAxis: Object .freeze (new Vector2 (0, 1)),
});

export default Vector2;
