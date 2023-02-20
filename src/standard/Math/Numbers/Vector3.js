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

function Vector3 (x, y, z)
{
   this .x = x;
   this .y = y;
   this .z = z;
}

Vector3 .prototype =
{
   constructor: Vector3,
   length: 3,
   [Symbol .iterator]: function* ()
   {
      yield this .x;
      yield this .y;
      yield this .z;
   },
   copy: function ()
   {
      const copy = Object .create (Vector3 .prototype);
      copy .x = this .x;
      copy .y = this .y;
      copy .z = this .z;
      return copy;
   },
   assign: function (vector)
   {
      this .x = vector .x;
      this .y = vector .y;
      this .z = vector .z;
      return this;
   },
   set: function (x, y, z)
   {
      this .x = x;
      this .y = y;
      this .z = z;
      return this;
   },
   equals: function (vector)
   {
      return this .x === vector .x &&
             this .y === vector .y &&
             this .z === vector .z;
   },
   negate: function ()
   {
      this .x = -this .x;
      this .y = -this .y;
      this .z = -this .z;
      return this;
   },
   inverse: function ()
   {
      this .x = 1 / this .x;
      this .y = 1 / this .y;
      this .z = 1 / this .z;
      return this;
   },
   add: function (vector)
   {
      this .x += vector .x;
      this .y += vector .y;
      this .z += vector .z;
      return this;
   },
   subtract: function (vector)
   {
      this .x -= vector .x;
      this .y -= vector .y;
      this .z -= vector .z;
      return this;
   },
   multiply: function (value)
   {
      this .x *= value;
      this .y *= value;
      this .z *= value;
      return this;
   },
   multVec: function (vector)
   {
      this .x *= vector .x;
      this .y *= vector .y;
      this .z *= vector .z;
      return this;
   },
   divide: function (value)
   {
      this .x /= value;
      this .y /= value;
      this .z /= value;
      return this;
   },
   divVec: function (vector)
   {
      this .x /= vector .x;
      this .y /= vector .y;
      this .z /= vector .z;
      return this;
   },
   cross: function (vector)
   {
      const
         { x: ax, y: ay, z: az } = this,
         { x: bx, y: by, z: bz } = vector;

      this .x = ay * bz - az * by;
      this .y = az * bx - ax * bz;
      this .z = ax * by - ay * bx;

      return this;
   },
   normalize: function ()
   {
      const length = Math .hypot (this .x, this .y, this .z);

      if (length)
      {
         this .x /= length;
         this .y /= length;
         this .z /= length;
      }

      return this;
   },
   dot: function (vector)
   {
      return this .x * vector .x +
             this .y * vector .y +
             this .z * vector .z;
   },
   norm: function ()
   {
      const { x, y, z } = this;

      return x * x +
             y * y +
             z * z;
   },
   magnitude: function ()
   {
      return Math .hypot (this .x, this .y, this .z);
   },
   distance: function (vector)
   {
      return Math .hypot (this .x - vector .x,
                          this .y - vector .y,
                          this .z - vector .z);
   },
   lerp: function (destination, t)
   {
      const { x, y, z } = this;

      this .x = x + t * (destination .x - x);
      this .y = y + t * (destination .y - y);
      this .z = z + t * (destination .z - z);
      return this;
   },
   slerp: (function ()
   {
      const tmp = new Vector3 (0, 0, 0);

      return function (destination, t)
      {
         return Algorithm .simpleSlerp (this, tmp .assign (destination), t);
      };
   })(),
   abs: function ()
   {
      this .x = Math .abs (this .x);
      this .y = Math .abs (this .y);
      this .z = Math .abs (this .z);
      return this;
   },
   min: function (vector)
   {
      let { x, y, z } = this;

      for (const vector of arguments)
      {
         x = Math .min (x, vector .x);
         y = Math .min (y, vector .y);
         z = Math .min (z, vector .z);
      }

      this .x = x;
      this .y = y;
      this .z = z;
      return this;
   },
   max: function (vector)
   {
      let { x, y, z } = this;

      for (const vector of arguments)
      {
         x = Math .max (x, vector .x);
         y = Math .max (y, vector .y);
         z = Math .max (z, vector .z);
      }

      this .x = x;
      this .y = y;
      this .z = z;
      return this;
   },
   toString: function ()
   {
      return this .x + " " +
             this .y + " " +
             this .z;
   }
};

Object .defineProperty (Vector3 .prototype, "0",
{
   get: function () { return this .x; },
   set: function (value) { this .x = value; },
   enumerable: false,
   configurable: false
});

Object .defineProperty (Vector3 .prototype, "1",
{
   get: function () { return this .y; },
   set: function (value) { this .y = value; },
   enumerable: false,
   configurable: false
});

Object .defineProperty (Vector3 .prototype, "2",
{
   get: function () { return this .z; },
   set: function (value) { this .z = value; },
   enumerable: false,
   configurable: false
});

Object .assign (Vector3,
{
   Zero: new Vector3 (0, 0, 0),
   One: new Vector3 (1, 1, 1),
   xAxis: new Vector3 (1, 0, 0),
   yAxis: new Vector3 (0, 1, 0),
   zAxis: new Vector3 (0, 0, 1),
   negate: function (vector)
   {
      return vector .copy () .negate ();
   },
   inverse: function (vector)
   {
      return vector .copy () .inverse ();
   },
   add: function (lhs, rhs)
   {
      return lhs .copy () .add (rhs);
   },
   subtract: function (lhs, rhs)
   {
      return lhs .copy () .subtract (rhs);
   },
   multiply: function (lhs, rhs)
   {
      return lhs .copy () .multiply (rhs);
   },
   multVec: function (lhs, rhs)
   {
      return lhs .copy () .multVec (rhs);
   },
   divide: function (lhs, rhs)
   {
      return lhs .copy () .divide (rhs);
   },
   divVec: function (lhs, rhs)
   {
      return lhs .copy () .divVec (rhs);
   },
   cross: function (lhs, rhs)
   {
      return lhs .copy () .cross (rhs);
   },
   normalize: function (vector)
   {
      return vector .copy () .normalize ();
   },
   dot: function (lhs, rhs)
   {
      return lhs .dot (rhs);
   },
   magnitude: function (vector)
   {
      return vector .magnitude ();
   },
   distance: function (lhs, rhs)
   {
      return lhs .distance (rhs);
   },
   lerp: function (source, destination, t)
   {
      return source .copy () .lerp (destination, t);
   },
   slerp: function (source, destination, t)
   {
      return source .copy () .slerp (destination, t);
   },
   abs: function (vector)
   {
      return vector .copy () .abs ();
   },
   min: function (lhs, rhs)
   {
      return this .prototype .min .apply (lhs .copy (), arguments);
   },
   max: function (lhs, rhs)
   {
      return this .prototype .max .apply (lhs .copy (), arguments);
   },
});

export default Vector3;
