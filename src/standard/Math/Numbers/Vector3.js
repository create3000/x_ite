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

function Vector3 (x = 0, y = 0, z = 0)
{
   this .x = x;
   this .y = y;
   this .z = z;
}

Object .assign (Vector3 .prototype,
{
   *[Symbol .iterator] ()
   {
      yield this .x;
      yield this .y;
      yield this .z;
   },
   copy ()
   {
      const copy = Object .create (Vector3 .prototype);
      copy .x = this .x;
      copy .y = this .y;
      copy .z = this .z;
      return copy;
   },
   assign ({ x, y, z })
   {
      this .x = x;
      this .y = y;
      this .z = z;
      return this;
   },
   set (x = 0, y = 0, z = 0)
   {
      this .x = x;
      this .y = y;
      this .z = z;
      return this;
   },
   equals ({ x, y, z })
   {
      return this .x === x &&
             this .y === y &&
             this .z === z;
   },
   negate ()
   {
      this .x = -this .x;
      this .y = -this .y;
      this .z = -this .z;
      return this;
   },
   inverse ()
   {
      this .x = 1 / this .x;
      this .y = 1 / this .y;
      this .z = 1 / this .z;
      return this;
   },
   add ({ x, y, z })
   {
      this .x += x;
      this .y += y;
      this .z += z;
      return this;
   },
   subtract ({ x, y, z })
   {
      this .x -= x;
      this .y -= y;
      this .z -= z;
      return this;
   },
   multiply (value)
   {
      this .x *= value;
      this .y *= value;
      this .z *= value;
      return this;
   },
   multVec ({ x, y, z })
   {
      this .x *= x;
      this .y *= y;
      this .z *= z;
      return this;
   },
   divide (value)
   {
      this .x /= value;
      this .y /= value;
      this .z /= value;
      return this;
   },
   divVec ({ x, y, z })
   {
      this .x /= x;
      this .y /= y;
      this .z /= z;
      return this;
   },
   cross ({ x: bx, y: by, z: bz })
   {
      const { x: ax, y: ay, z: az } = this;

      this .x = ay * bz - az * by;
      this .y = az * bx - ax * bz;
      this .z = ax * by - ay * bx;

      return this;
   },
   normalize ()
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
   dot ({ x, y, z })
   {
      return this .x * x +
             this .y * y +
             this .z * z;
   },
   norm ()
   {
      const { x, y, z } = this;

      return x * x +
             y * y +
             z * z;
   },
   magnitude ()
   {
      return Math .hypot (this .x, this .y, this .z);
   },
   distance ({ x, y, z })
   {
      return Math .hypot (this .x - x,
                          this .y - y,
                          this .z - z);
   },
   lerp ({ x: dX, y: dY, z: dZ }, t)
   {
      const { x, y, z } = this;

      this .x = x + t * (dX - x);
      this .y = y + t * (dY - y);
      this .z = z + t * (dZ - z);
      return this;
   },
   slerp: (() =>
   {
      const tmp = new Vector3 ();

      return function (destination, t)
      {
         return Algorithm .simpleSlerp (this, tmp .assign (destination), t);
      };
   })(),
   abs ()
   {
      const { x, y, z } = this;

      this .x = Math .abs (x);
      this .y = Math .abs (y);
      this .z = Math .abs (z);
      return this;
   },
   min (vector)
   {
      let { x, y, z } = this;

      for (const { x: minX, y: minY, z: minZ } of arguments)
      {
         x = Math .min (x, minX);
         y = Math .min (y, minY);
         z = Math .min (z, minZ);
      }

      this .x = x;
      this .y = y;
      this .z = z;
      return this;
   },
   max (vector)
   {
      let { x, y, z } = this;

      for (const { x: maxX, y: maxY, z: maxZ } of arguments)
      {
         x = Math .max (x, maxX);
         y = Math .max (y, maxY);
         z = Math .max (z, maxZ);
      }

      this .x = x;
      this .y = y;
      this .z = z;
      return this;
   },
   clamp ({ x: minX, y: minY, z: minZ }, { x: maxX, y: maxY, z: maxZ })
   {
      this .x = Algorithm .clamp (this .x, minX, maxX);
      this .y = Algorithm .clamp (this .y, minY, maxY);
      this .z = Algorithm .clamp (this .z, minZ, maxZ);
      return this;
   },
   toString ()
   {
      return this .x + " " +
             this .y + " " +
             this .z;
   }
});

for (const key of Object .keys (Vector3 .prototype))
   Object .defineProperty (Vector3 .prototype, key, { enumerable: false });

Object .defineProperties (Vector3 .prototype,
{
   length: { value: 3 },
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
   2:
   {
      get () { return this .z; },
      set (value) { this .z = value; },
   },
});

Object .assign (Vector3,
{
   Zero: Object .freeze (new Vector3 ()),
   One: Object .freeze (new Vector3 (1, 1, 1)),
   xAxis: Object .freeze (new Vector3 (1, 0, 0)),
   yAxis: Object .freeze (new Vector3 (0, 1, 0)),
   zAxis: Object .freeze (new Vector3 (0, 0, 1)),
});

export default Vector3;
