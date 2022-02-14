/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
   "standard/Math/Algorithm",
],
function (Algorithm)
{
"use strict";

   function Vector4 (x, y, z, w)
   {
      this .x = x;
      this .y = y;
      this .z = z;
      this .w = w;
   }

   Vector4 .prototype =
   {
      constructor: Vector4,
      length: 4,
      copy: function ()
      {
         const copy = Object .create (Vector4 .prototype);
         copy .x = this .x;
         copy .y = this .y;
         copy .z = this .z;
         copy .w = this .w;
         return copy;
      },
      assign: function (vector)
      {
         this .x = vector .x;
         this .y = vector .y;
         this .z = vector .z;
         this .w = vector .w;
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
      equals: function (vector)
      {
         return this .x === vector .x &&
                this .y === vector .y &&
                this .z === vector .z &&
                this .w === vector .w;
      },
      getReal: function (vector)
      {
         vector .x = this .x / this .w;
         vector .y = this .y / this .w;
         vector .z = this .z / this .w;
      },
      negate: function ()
      {
         this .x = -this .x;
         this .y = -this .y;
         this .z = -this .z;
         this .w = -this .w;
         return this;
      },
      add: function (vector)
      {
         this .x += vector .x;
         this .y += vector .y;
         this .z += vector .z;
         this .w += vector .w;
         return this;
      },
      subtract: function (vector)
      {
         this .x -= vector .x;
         this .y -= vector .y;
         this .z -= vector .z;
         this .w -= vector .w;
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
      multVec: function (vector)
      {
         this .x *= vector .x;
         this .y *= vector .y;
         this .z *= vector .z;
         this .w *= vector .w;
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
      divVec: function (vector)
      {
         this .x /= vector .x;
         this .y /= vector .y;
         this .z /= vector .z;
         this .w /= vector .w;
         return this;
      },
      normalize: function ()
      {
         let length = Math .hypot (this .x, this .y, this .z, this .w);

         if (length)
         {
            length = 1 / length;

            this .x *= length;
            this .y *= length;
            this .z *= length;
            this .w *= length;
         }

         return this;
      },
      dot: function (vector)
      {
         return this .x * vector .x +
                this .y * vector .y +
                this .z * vector .z +
                this .w * vector .w;
      },
      norm: function ()
      {
         const
            x = this .x,
            y = this .y,
            z = this .z,
            w = this .w;

         return x * x +
                y * y +
                z * z +
                w * w;
      },
      abs: function ()
      {
         return Math .hypot (this .x, this .y, this .z, this .w);
      },
      distance: function (vector)
      {
         return Math .hypot (this .x - vector .x,
                             this .y - vector .y,
                             this .z - vector .z,
                             this .w - vector .w);
      },
      lerp: function (destination, t)
      {
         const
            x = this .x,
            y = this .y,
            z = this .z,
            w = this .w;

         this .x = x + t * (destination .x - x);
         this .y = y + t * (destination .y - y);
         this .z = z + t * (destination .z - z);
         this .w = w + t * (destination .w - w);
         return this;
      },
      min: function (vector)
      {
         let
            x = this .x,
            y = this .y,
            z = this .z,
            w = this .w;

         for (const vector of arguments)
         {
            x = Math .min (x, vector .x);
            y = Math .min (y, vector .y);
            z = Math .min (z, vector .z);
            w = Math .min (w, vector .w);
         }

         this .x = x;
         this .y = y;
         this .z = z;
         this .w = w;
         return this;
      },
      max: function (vector)
      {
         let
            x = this .x,
            y = this .y,
            z = this .z,
            w = this .w;

         for (const vector of arguments)
         {
            x = Math .max (x, vector .x);
            y = Math .max (y, vector .y);
            z = Math .max (z, vector .z);
            w = Math .max (w, vector .w);
         }

         this .x = x;
         this .y = y;
         this .z = z;
         this .w = w;
         return this;
      },
      toString: function ()
      {
         return this .x + " " +
                this .y + " " +
                this .z + " " +
                this .w;
      },
   };

   Object .defineProperty (Vector4 .prototype, "0",
   {
      get: function () { return this .x; },
      set: function (value) { this .x = value; },
      enumerable: false,
      configurable: false
   });

   Object .defineProperty (Vector4 .prototype, "1",
   {
      get: function () { return this .y; },
      set: function (value) { this .y = value; },
      enumerable: false,
      configurable: false
   });

   Object .defineProperty (Vector4 .prototype, "2",
   {
      get: function () { return this .z; },
      set: function (value) { this .z = value; },
      enumerable: false,
      configurable: false
   });

   Object .defineProperty (Vector4 .prototype, "3",
   {
      get: function () { return this .w; },
      set: function (value) { this .w = value; },
      enumerable: false,
      configurable: false
   });

   Object .assign (Vector4,
   {
      Zero: new Vector4 (0, 0, 0, 0),
      One: new Vector4 (1, 1, 1, 1),
      xAxis: new Vector4 (1, 0, 0, 0),
      yAxis: new Vector4 (0, 1, 0, 0),
      zAxis: new Vector4 (0, 0, 1, 0),
      wAxis: new Vector4 (0, 0, 0, 1),
      negate: function (vector)
      {
         return vector .copy () .negate ();
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
      normalize: function (vector)
      {
         return vector .copy () .normalize ();
      },
      dot: function (lhs, rhs)
      {
         return lhs .copy () .dot (rhs);
      },
      lerp: function (source, destination, t)
      {
         return source .copy () .lerp (destination, t);
      },
      min: function (lhs, rhs)
      {
         return Vector4 .prototype .min .apply (lhs .copy (), arguments);
      },
      max: function (lhs, rhs)
      {
         return Vector4 .prototype .max .apply (lhs .copy (), arguments);
      },
   });

   return Vector4;
});
