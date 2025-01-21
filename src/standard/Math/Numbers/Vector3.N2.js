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

class Vector3 extends Float64Array
{
   // static Zero = Object .freeze (new Vector3 ());
   // static One = Object .freeze (new Vector3 (1, 1, 1));
   // static xAxis = Object .freeze (new Vector3 (1, 0, 0));
   // static yAxis = Object .freeze (new Vector3 (0, 1, 0));
   // static zAxis = Object .freeze (new Vector3 (0, 0, 1));

   constructor (x = 0, y = 0, z = 0)
   {
      super (3);

      this [0] = x;
      this [1] = y;
      this [2] = z;
   }

   get x () { return this [0]; }
   get y () { return this [1]; }
   get z () { return this [2]; }

   set x (value) { this [0] = value; }
   set y (value) { this [1] = value; }
   set z (value) { this [2] = value; }

   *[Symbol .iterator] ()
   {
      yield this [0];
      yield this [1];
      yield this [2];
   }

   copy ()
   {
      const copy = Object .create (Vector3 .prototype);
      copy [0] = this [0];
      copy [1] = this [1];
      copy [2] = this [2];
      return copy;
   }

   assign ([x, y, z])
   {
      this [0] = x;
      this [1] = y;
      this [2] = z;
      return this;
   }

   set (x = 0, y = 0, z = 0)
   {
      this [0] = x;
      this [1] = y;
      this [2] = z;
      return this;
   }

   equals ([x, y, z])
   {
      return this [0] === x &&
             this [1] === y &&
             this [2] === z;
   }

   negate ()
   {
      this [0] = -this [0];
      this [1] = -this [1];
      this [2] = -this [2];
      return this;
   }

   inverse ()
   {
      this [0] = 1 / this [0];
      this [1] = 1 / this [1];
      this [2] = 1 / this [2];
      return this;
   }

   add ([x, y, z])
   {
      this [0] += x;
      this [1] += y;
      this [2] += z;
      return this;
   }

   subtract ([x, y, z])
   {
      this [0] -= x;
      this [1] -= y;
      this [2] -= z;
      return this;
   }

   multiply (value)
   {
      this [0] *= value;
      this [1] *= value;
      this [2] *= value;
      return this;
   }

   multVec ([x, y, z])
   {
      this [0] *= x;
      this [1] *= y;
      this [2] *= z;
      return this;
   }

   divide (value)
   {
      this [0] /= value;
      this [1] /= value;
      this [2] /= value;
      return this;
   }

   divVec ([x, y, z])
   {
      this [0] /= x;
      this [1] /= y;
      this [2] /= z;
      return this;
   }

   cross ([bx, by, bz])
   {
      const [ax, ay, az] = this;

      this [0] = ay * bz - az * by;
      this [1] = az * bx - ax * bz;
      this [2] = ax * by - ay * bx;

      return this;
   }

   normalize ()
   {
      const length = Math .hypot (this [0], this [1], this [2]);

      if (length)
      {
         this [0] /= length;
         this [1] /= length;
         this [2] /= length;
      }

      return this;
   }

   dot ([x, y, z])
   {
      return this [0] * x +
             this [1] * y +
             this [2] * z;
   }

   norm ()
   {
      const [x, y, z] = this;

      return x * x +
             y * y +
             z * z;
   }

   magnitude ()
   {
      return Math .hypot (this [0], this [1], this [2]);
   }

   distance ([x, y, z])
   {
      return Math .hypot (this [0] - x,
                          this [1] - y,
                          this [2] - z);
   }

   lerp ([dX, dY, dZ], t)
   {
      const [x, y, z] = this;

      this [0] = x + t * (dX - x);
      this [1] = y + t * (dY - y);
      this [2] = z + t * (dZ - z);
      return this;
   }

   // slerp: (() =>
   // {
   //    const tmp = new Vector3 ();

   //    return function (destination, t)
   //    {
   //       return Algorithm .simpleSlerp (this, tmp .assign (destination), t);
   //    };
   // })()

   abs ()
   {
      const [x, y, z] = this;

      this [0] = Math .abs (x);
      this [1] = Math .abs (y);
      this [2] = Math .abs (z);
      return this;
   }

   min (vector)
   {
      let [x, y, z] = this;

      for (const { x: minX, y: minY, z: minZ } of arguments)
      {
         x = Math .min (x, minX);
         y = Math .min (y, minY);
         z = Math .min (z, minZ);
      }

      this [0] = x;
      this [1] = y;
      this [2] = z;
      return this;
   }

   max (vector)
   {
      let [x, y, z] = this;

      for (const { x: maxX, y: maxY, z: maxZ } of arguments)
      {
         x = Math .max (x, maxX);
         y = Math .max (y, maxY);
         z = Math .max (z, maxZ);
      }

      this [0] = x;
      this [1] = y;
      this [2] = z;
      return this;
   }

   clamp ([minX, minY, minZ], [maxX, maxY, maxZ])
   {
      this [0] = Algorithm .clamp (this [0], minX, maxX);
      this [1] = Algorithm .clamp (this [1], minY, maxY);
      this [2] = Algorithm .clamp (this [2], minZ, maxZ);
      return this;
   }

   toString ()
   {
      return this [0] + " " +
             this [1] + " " +
             this [2];
   }
}

const a = new Vector3 (Math .random (), Math .random (), Math .random ());
const b = new Vector3 (Math .random (), Math .random (), Math .random ());

console .time ("Vector3");

for (let i = 0; i < 1000000; i++)
{
   a .add (b);
   a .subtract (b);
   a .multiply (Math .random ());
   a .divide (Math .random ());
   a .cross (b);
   a .normalize ();
   a .dot (b);
   a .norm ();
   a .magnitude ();
   a .distance (b);
   a .lerp (b, Math .random ());
   // a .slerp (b, Math .random ());
   a .abs ();
   a .min (b);
   a .max (b);
   a .clamp (b, b);
}

console .timeEnd ("Vector3");

export default Vector3;
