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

import Vector2   from "./Vector2.js";
import Algorithm from "../Algorithm.js";

function Matrix2 ()
{
   if (arguments .length)
   {
      this [0] = arguments [0];
      this [1] = arguments [1];
      this [2] = arguments [2];
      this [3] = arguments [3];
   }
   else
   {
      this .identity ();
   }
}

Matrix2 .prototype =
{
   constructor: Matrix2,
   order: 2,
   length: 4,
   [Symbol .iterator]: function* ()
   {
      const length = this .length;

      for (let i = 0; i < length; ++ i)
         yield this [i];
   },
   copy: function ()
   {
      const copy = Object .create (Matrix2 .prototype);
      copy [0] = this [0];
      copy [1] = this [1];
      copy [2] = this [2];
      copy [3] = this [3];
      return copy;
   },
   assign: function (matrix)
   {
      this [0] = matrix [0];
      this [1] = matrix [1];
      this [2] = matrix [2];
      this [3] = matrix [3];
      return this;
   },
   equals: function (matrix)
   {
      return this [0] === matrix [0] &&
             this [1] === matrix [1] &&
             this [2] === matrix [2] &&
             this [3] === matrix [3];
   },
   set1: function (r, c, value)
   {
      this [r * this .order + c] = value;
   },
   get1: function (r, c)
   {
      return this [r * this .order + c];
   },
   set: function ()
   {
      switch (arguments .length)
      {
         case 0:
         {
            this .identity ();
            break;
         }
         case 4:
         {
            this [0] = arguments [0];
            this [1] = arguments [1];
            this [2] = arguments [2];
            this [3] = arguments [3];
            break;
         }
      }

      return this;
   },
   determinant1: function ()
   {
      return this [0];
   },
   determinant: function ()
   {
      return this [0] * this [3] -
             this [1] * this [2];
   },
   transpose: function ()
   {
      const tmp = this [1];

      this [1] = this [2];
      this [2] = tmp;

      return this;
   },
   inverse: function ()
   {
      const
         [A, B, C, D] = this [3],
         d = A * D - B * C;

      // if (d === 0) ... determinant is zero.

      this [0] =  D / d;
      this [1] = -B / d;
      this [2] = -C / d;
      this [3] =  A / d;

      return this;
   },
   multLeft: function (matrix)
   {
      const
         [a0, a1, a2, a3] = this,
         [b0, b1, b2, b3] = matrix;

      this [0] = a0 * b0 + a2 * b1;
      this [1] = a1 * b0 + a3 * b1;
      this [2] = a0 * b2 + a2 * b3;
      this [3] = a1 * b2 + a3 * b3;

      return this;
   },
   multRight: function (matrix)
   {
      const
         [a0, a1, a2, a3] = this,
         [b0, b1, b2, b3] = matrix;

      this [0] = b0 * a0 + b2 * a1;
      this [1] = b1 * a0 + b3 * a1;
      this [2] = b0 * a2 + b2 * a3;
      this [3] = b1 * a2 + b3 * a3;

      return this;
   },
   multVecMatrix: function (vector)
   {
      if (typeof vector === "number")
      {
         const
            x = vector,
            w = x * this [2] + this [3];

         return (x * this [0] + this [1]) / w;
      }

      const { x, y } = vector;

      vector .x = x * this [0] + y * this [2];
      vector .y = x * this [1] + y * this [3];

      return vector;
   },
   multMatrixVec: function (vector)
   {
      if (typeof vector === "number")
      {
         const
            x = vector,
            w = x * this [2] + this [3];

         return (x * this [0] + this [1]) / w;
      }

      const { x, y } = vector;

      vector .x = x * this [0] + y * this [1];
      vector .y = x * this [2] + y * this [3];

      return vector;
   },
   identity: function ()
   {
      this [0] = 1;
      this [1] = 0;
      this [2] = 0;
      this [3] = 1;
   },
   toString: function ()
   {
      return Array .prototype .join .call (this, " ");
   },
};

Object .defineProperty (Matrix2 .prototype, "x",
{
   get: (function ()
   {
      const vector = new Vector2 (0, 0);

      return function () { return vector .set (this [0], this [1]); };
   })(),
   enumerable: false,
   configurable: false
});

Object .defineProperty (Matrix2 .prototype, "y",
{
   get: (function ()
   {
      const vector = new Vector2 (0, 0);

      return function () { return vector .set (this [2], this [3]); };
   })(),
   enumerable: false,
   configurable: false
});

Object .defineProperty (Matrix2 .prototype, "xAxis",
{
   get: function () { return this [0]; },
   enumerable: false,
   configurable: false
});

Object .defineProperty (Matrix2 .prototype, "origin",
{
   get: function () { return this [2]; },
   enumerable: false,
   configurable: false
});

Object .defineProperty (Matrix2 .prototype, "submatrix",
{
   get: function () { return this [0]; },
   enumerable: false,
   configurable: false
});

Object .assign (Matrix2,
{
   Identity: new Matrix2 (),
});

export default Matrix2;
