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

import Vector3   from "./Vector3.js";
import Matrix3   from "./Matrix3.js";
import Algorithm from "../Algorithm.js";

function Quaternion (x, y, z, w)
{
   this .x = x;
   this .y = y;
   this .z = z;
   this .w = w;
}

Quaternion .prototype =
{
   constructor: Quaternion,
   [Symbol .iterator]: function* ()
   {
      yield this .x;
      yield this .y;
      yield this .z;
      yield this .w;
   },
   copy: function ()
   {
      const copy = Object .create (Quaternion .prototype);
      copy .x = this .x;
      copy .y = this .y;
      copy .z = this .z;
      copy .w = this .w;
      return copy;
   },
   assign: function (quat)
   {
      this .x = quat .x;
      this .y = quat .y;
      this .z = quat .z;
      this .w = quat .w;
      return this;
   },
   set: function (x, y, z, w)
   {
      this .x = x;
      this .y = y;
      this .z = z;
      this .w = w;
      return this;
   },
   setMatrix: function (matrix)
   {
      // First, find largest diagonal in matrix:
      if (matrix [0] > matrix [4])
      {
         var i = matrix [0] > matrix [8] ? 0 : 2;
      }
      else
      {
         var i = matrix [4] > matrix [8] ? 1 : 2;
      }

      const scaleRow = matrix [0] + matrix [4] + matrix [8];

      if (scaleRow > matrix [i * 3 + i])
      {
         // Compute w first:
         this [3] = Math .sqrt (scaleRow + 1) / 2;

         // And compute other values:
         const d = 4 * this [3];
         this [0] = (matrix [5] - matrix [7]) / d;
         this [1] = (matrix [6] - matrix [2]) / d;
         this [2] = (matrix [1] - matrix [3]) / d;
      }
      else
      {
         // Compute x, y, or z first:
         const j = (i + 1) % 3;
         const k = (i + 2) % 3;

         // Compute first value:
         this [i] = Math .sqrt (matrix [i * 3 + i] - matrix [j * 3 + j] - matrix [k * 3 + k] + 1) / 2;

         // And the others:
         const d = 4 * this [i];
         this [j] = (matrix [i * 3 + j] + matrix [j * 3 + i]) / d;
         this [k] = (matrix [i * 3 + k] + matrix [k * 3 + i]) / d;
         this [3] = (matrix [j * 3 + k] - matrix [k * 3 + j]) / d;
      }

      return this;
   },
   getMatrix: function (matrix = new Matrix3 ())
   {
      const { x, y, z, w } = this;

      const
         a = x * x,
         b = x * y,
         c = y * y,
         d = y * z,
         e = z * x,
         f = z * z,
         g = w * x,
         h = w * y,
         i = w * z;

      matrix [0] = 1 - 2 * (c + f);
      matrix [1] =     2 * (b + i);
      matrix [2] =     2 * (e - h);

      matrix [3] =     2 * (b - i);
      matrix [4] = 1 - 2 * (f + a);
      matrix [5] =     2 * (d + g);

      matrix [6] =     2 * (e + h);
      matrix [7] =     2 * (d - g);
      matrix [8] = 1 - 2 * (c + a);

      return matrix;
   },
   isReal: function ()
   {
      return !(this .x || this .y || this .z);
   },
   isImag: function ()
   {
      return !this .w;
   },
   equals: function (quat)
   {
      return this .x === quat .x &&
             this .y === quat .y &&
             this .z === quat .z &&
             this .w === quat .w;
   },
   negate: function ()
   {
      this .x = -this .x;
      this .y = -this .y;
      this .z = -this .z;
      this .w = -this .w;
      return this;
   },
   inverse: function ()
   {
      this .x = -this .x;
      this .y = -this .y;
      this .z = -this .z;
      return this;
   },
   add: function (quat)
   {
      this .x += quat .x;
      this .y += quat .y;
      this .z += quat .z;
      this .w += quat .w;
      return this;
   },
   subtract: function (quat)
   {
      this .x -= quat .x;
      this .y -= quat .y;
      this .z -= quat .z;
      this .w -= quat .w;
      return this;
   },
   multiply: function (value)
   {
      this .x *= value;
      this .y *= value;
      this .z *= value;
      this .w *= value;
      return this;
   },
   multLeft: function (quat)
   {
      const
         { x: ax, y: ay, z: az, w: aw } = this,
         { x: bx, y: by, z: bz, w: bw } = quat;

      this .x = aw * bx + ax * bw + ay * bz - az * by;
      this .y = aw * by + ay * bw + az * bx - ax * bz;
      this .z = aw * bz + az * bw + ax * by - ay * bx;
      this .w = aw * bw - ax * bx - ay * by - az * bz;

      return this;
   },
   multRight: function (quat)
   {
      const
         { x: ax, y: ay, z: az, w: aw } = this,
         { x: bx, y: by, z: bz, w: bw } = quat;

      this .x = bw * ax + bx * aw + by * az - bz * ay;
      this .y = bw * ay + by * aw + bz * ax - bx * az;
      this .z = bw * az + bz * aw + bx * ay - by * ax;
      this .w = bw * aw - bx * ax - by * ay - bz * az;

      return this;
   },
   divide: function (value)
   {
      this .x /= value;
      this .y /= value;
      this .z /= value;
      this .w /= value;
      return this;
   },
   multVecQuat: function (vector)
   {
      const
         { x: qx, y: qy, z: qz, w: qw } = this,
         { x: vx, y: vy, z: vz } = vector,
         a  = qw * qw - qx * qx - qy * qy - qz * qz,
         b  = 2 * (vx * qx + vy * qy + vz * qz),
         c  = 2 * qw;

      vector .x = a * vx + b * qx + c * (qy * vz - qz * vy);
      vector .y = a * vy + b * qy + c * (qz * vx - qx * vz);
      vector .z = a * vz + b * qz + c * (qx * vy - qy * vx);

      return vector;
   },
   multQuatVec: function (vector)
   {
      const
         { x: qx, y: qy, z: qz, w: qw } = this,
         { x: vx, y: vy, z: vz } = vector,
         a  = qw * qw - qx * qx - qy * qy - qz * qz,
         b  = 2 * (vx * qx + vy * qy + vz * qz),
         c  = 2 * qw;

      vector .x = a * vx + b * qx - c * (qy * vz - qz * vy);
      vector .y = a * vy + b * qy - c * (qz * vx - qx * vz);
      vector .z = a * vz + b * qz - c * (qx * vy - qy * vx);

      return vector;
   },
   normalize: function ()
   {
      const length = Math .hypot (this .x, this .y, this .z, this .w);

      if (length)
      {
         this .x /= length;
         this .y /= length;
         this .z /= length;
         this .w /= length;
      }

      return this;
   },
   dot: function (quat)
   {
      return this .x * quat .x +
             this .y * quat .y +
             this .z * quat .z +
             this .w * quat .w;
   },
   norm: function ()
   {
      const { x, y, z, w } = this;

      return x * x +
             y * y +
             z * z +
             w * w;
   },
   magnitude: function ()
   {
      return Math .hypot (this .x, this .y, this .z, this .w);
   },
   pow: function (exponent)
   {
      if (exponent instanceof Quaternion)
         return this .assign (e .assign (exponent) .multRight (this .log ()) .exp ());

      if (this .isReal ())
         return this .set (0, 0, 0, Math .pow (this .w, exponent));

      const
         l     = this .magnitude (),
         theta = Math .acos (this .w / l),
         li    = this .imag .magnitude (),
         ltoe  = Math .pow (l, exponent),
         et    = exponent * theta,
         scale = ltoe / li * Math .sin (et);

      this .x *= scale;
      this .y *= scale;
      this .z *= scale;
      this .w  = ltoe * Math .cos (et);
      return this;
   },
   log: function ()
   {
      if (this .isReal ())
      {
         if (this .w > 0)
            return this .set (0, 0, 0, Math .log (this .w));

         else
            return this .set (Math .PI, 0, 0, Math .log (-this .w));
      }

      const
         l = this .magnitude (),
         v = this .imag .normalize () .multiply (Math .acos (this .w / l)),
         w = Math .log (l);

      this .x = v .x;
      this .y = v .y;
      this .z = v .z;
      this .w = w;
      return this;
   },
   exp: function ()
   {
      if (this .isReal ())
         return this .set (0, 0, 0, Math .exp (this .w));

      const
         i  = this .imag,
         li = i .magnitude (),
         ew = Math .exp (this .w),
         w  = ew * Math .cos (li),
         v  = i .multiply (ew * Math .sin (li) / li);

      this .x = v .x;
      this .y = v .y;
      this .z = v .z;
      this .w = w;
      return this;
   },
   slerp: function (destination, t)
   {
      return Algorithm .slerp (this, t1 .assign (destination), t);
   },
   squad: function (a, b, destination, t)
   {
      // We must use shortest path slerp to prevent flipping.  Also see spline.

      return Algorithm .slerp (Algorithm .slerp (this, t1 .assign (destination), t),
                               Algorithm .slerp (t2 .assign (a), t3 .assign (b), t),
                               2 * t * (1 - t));
   },
   toString: function ()
   {
      return this .x + " " +
             this .y + " " +
             this .z + " " +
             this .w;
   },
};

Object .defineProperties (Quaternion .prototype,
{
   length: { value: 4 },
   0:
   {
      get: function () { return this .x; },
      set: function (value) { this .x = value; },
   },
   1:
   {
      get: function () { return this .y; },
      set: function (value) { this .y = value; },
   },
   2:
   {
      get: function () { return this .z; },
      set: function (value) { this .z = value; },
   },
   3:
   {
      get: function () { return this .w; },
      set: function (value) { this .w = value; },
   },
   real:
   {
      get: function () { return this .w; },
   },
   imag:
   {
      get: (function ()
      {
         const result = new Vector3 (0, 0, 0);

         return function ()
         {
            return result .set (this .x,
                                this .y,
                                this .z);
         };
      })(),
   },
});

Object .assign (Quaternion,
{
   negate: function (quat)
   {
      return quat .copy () .negate ();
   },
   inverse: function (quat)
   {
      return quat .copy () .inverse ();
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
   multLeft: function (lhs, rhs)
   {
      return lhs .copy () .multLeft (rhs);
   },
   multRight: function (lhs, rhs)
   {
      return lhs .copy () .multRight (rhs);
   },
   divide: function (lhs, rhs)
   {
      return lhs .copy () .divide (rhs);
   },
   normalize: function (quat)
   {
      return quat .copy () .normalize ();
   },
   slerp: function (source, destination, t)
   {
      return source .copy () .slerp (destination, t);
   },
   squad: function (source, a, b, destination, t)
   {
      return source .copy () .squad (a, b, destination, t);
   },
   /*
   bezier: function (q0, a, b, q1, t)
   {
      return q0 .copy () .squad (a, b, q1, t);
   },
   */
   spline: function (Q0, Q1, Q2)
   {
      q0 .assign (Q0);
      q1 .assign (Q1);
      q2 .assign (Q2);

      // If the dot product is smaller than 0 we must negate the quaternion to prevent flipping. If we negate all
      // the terms we get a different quaternion but it represents the same rotation.

      if (q0 .dot (q1) < 0)
         q0 .negate ();

      if (q2 .dot (q1) < 0)
         q2 .negate ();

      q1_i .assign (q1) .inverse ();

      // The result must be normalized as it will be used in slerp and we can only slerp normalized vectors.

      return q1 .multRight (
         t1 .assign (q1_i) .multRight (q0) .log () .add (t2 .assign (q1_i) .multRight (q2) .log ()) .divide (-4) .exp ()
      )
      .normalize () .copy ();
   },
});

const
   t1 = new Quaternion (0, 0, 0, 1),
   t2 = new Quaternion (0, 0, 0, 1),
   t3 = new Quaternion (0, 0, 0, 1);

const
   q0   = new Quaternion (0, 0, 0, 1),
   q1   = new Quaternion (0, 0, 0, 1),
   q2   = new Quaternion (0, 0, 0, 1),
   q1_i = new Quaternion (0, 0, 0, 1);

export default Quaternion;
