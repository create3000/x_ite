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

import Vector3             from "./Vector3.js";
import Vector4             from "./Vector4.js";
import Quaternion          from "./Quaternion.js";
import Rotation4           from "./Rotation4.js";
import Matrix3             from "./Matrix3.js";
import eigen_decomposition from "../Algorithms/eigen_decomposition.js";

function Matrix4 (... args)
{
   if (args .length)
   {
      for (let i = 0; i < 16; ++ i)
         this [i] = args [i];
   }
   else
   {
      this .identity ();
   }
}

Object .assign (Matrix4 .prototype,
{
   *[Symbol .iterator] ()
   {
      for (let i = 0; i < 16; ++ i)
         yield this [i];
   },
   copy ()
   {
      const copy = Object .create (Matrix4 .prototype);

      for (let i = 0; i < 16; ++ i)
         copy [i] = this [i];

      return copy;
   },
   assign (matrix)
   {
      for (let i = 0; i < 16; ++ i)
         this [i] = matrix [i];

      return this;
   },
   equals (matrix)
   {
      return this [ 0] === matrix [ 0] &&
             this [ 1] === matrix [ 1] &&
             this [ 2] === matrix [ 2] &&
             this [ 3] === matrix [ 3] &&
             this [ 4] === matrix [ 4] &&
             this [ 5] === matrix [ 5] &&
             this [ 6] === matrix [ 6] &&
             this [ 7] === matrix [ 7] &&
             this [ 8] === matrix [ 8] &&
             this [ 9] === matrix [ 9] &&
             this [10] === matrix [10] &&
             this [11] === matrix [11] &&
             this [12] === matrix [12] &&
             this [13] === matrix [13] &&
             this [14] === matrix [14] &&
             this [15] === matrix [15];
   },
   set1 (r, c, value)
   {
      this [r * this .order + c] = value;

      return this;
   },
   get1 (r, c)
   {
      return this [r * this .order + c];
   },
   set: (() =>
   {
      const
         invScaleOrientation = new Rotation4 (),
         invCenter           = new Vector3 ();

      return function (translation, rotation, scale, scaleOrientation, center)
      {
         this .identity ();

         switch (arguments .length)
         {
            case 1:
            {
               if (translation && !translation .equals (Vector3 .Zero))
                  this .translate (translation);

               break;
            }
            case 2:
            {
               if (translation && !translation .equals (Vector3 .Zero))
                  this .translate (translation);

               if (rotation && !rotation .equals (Rotation4 .Identity))
                  this .rotate (rotation);

               break;
            }
            case 3:
            {
               if (translation && !translation .equals (Vector3 .Zero))
                  this .translate (translation);

               if (rotation && !rotation .equals (Rotation4 .Identity))
                  this .rotate (rotation);

               if (scale && !scale .equals (Vector3 .One))
                  this .scale (scale);

               break;
            }
            case 4:
            {
               if (translation && !translation .equals (Vector3 .Zero))
                  this .translate (translation);

               if (rotation && !rotation .equals (Rotation4 .Identity))
                  this .rotate (rotation);

               if (scale && !scale .equals (Vector3 .One))
               {
                  if (scaleOrientation && !scaleOrientation .equals (Rotation4 .Identity))
                  {
                     this .rotate (scaleOrientation);
                     this .scale (scale);
                     this .rotate (invScaleOrientation .assign (scaleOrientation) .inverse ());
                  }
                  else
                  {
                     this .scale (scale);
                  }
               }

               break;
            }
            case 5:
            {
               // P' = T * C * R * SR * S * -SR * -C * P
               if (translation && !translation .equals (Vector3 .Zero))
                  this .translate (translation);

               const hasCenter = center && !center .equals (Vector3 .Zero);

               if (hasCenter)
                  this .translate (center);

               if (rotation && !rotation .equals (Rotation4 .Identity))
                  this .rotate (rotation);

               if (scale && !scale .equals (Vector3 .One))
               {
                  if (scaleOrientation && !scaleOrientation .equals (Rotation4 .Identity))
                  {
                     this .rotate (scaleOrientation);
                     this .scale (scale);
                     this .rotate (invScaleOrientation .assign (scaleOrientation) .inverse ());
                  }
                  else
                  {
                     this .scale (scale);
                  }
               }

               if (hasCenter)
                  this .translate (invCenter .assign (center) .negate ());

               break;
            }
            case 16:
            {
               for (let i = 0; i < 16; ++ i)
                  this [i] = arguments [i];

               break;
            }
         }

         return this;
      };
   })(),
   get: (() =>
   {
      const c = new Vector3 ();

      return function (translation, rotation, scale, scaleOrientation, center)
      {
         switch (arguments .length)
         {
            case 1:
            {
               translation .set (this [12], this [13], this [14]);
               break;
            }
            case 2:
            case 3:
            case 4:
            {
               this .factor (translation, rotation, scale, scaleOrientation);
               break;
            }
            case 5:
            {
               if (center)
               {
                  m .set (c .assign (center) .negate ());
                  m .multLeft (this);
                  m .translate (center);
                  m .get (translation, rotation, scale, scaleOrientation);
               }
               else
               {
                  this .factor (translation, rotation, scale, scaleOrientation);
               }

               break;
            }
         }
      };
   })(),
   setRotation (rotation)
   {
      return this .setQuaternion (rotation .getQuaternion (q));
   },
   setQuaternion (quaternion)
   {
      const
         { x, y, z, w } = quaternion,
         A = y * y,
         B = z * z,
         C = x * y,
         D = z * w,
         E = z * x,
         F = y * w,
         G = x * x,
         H = y * z,
         I = x * w;

      this [0]  = 1 - 2 * (A + B);
      this [1]  = 2 * (C + D);
      this [2]  = 2 * (E - F);
      this [3]  = 0;
      this [4]  = 2 * (C - D);
      this [5]  = 1 - 2 * (B + G);
      this [6]  = 2 * (H + I);
      this [7]  = 0;
      this [8]  = 2 * (E + F);
      this [9]  = 2 * (H - I);
      this [10] = 1 - 2 * (A + G);
      this [11] = 0;
      this [12] = 0;
      this [13] = 0;
      this [14] = 0;
      this [15] = 1;

      return this;
   },
   factor: (() =>
   {
      const
         s  = new Vector3 (),
         si = new Matrix3 (),
         so = new Matrix3 (),
         b  = new Matrix3 ();

      const eigen = { values: [ ], vectors: [[ ], [ ], [ ]] };

      return function (translation, rotation, scale, scaleOrientation)
      {
         // (1) Get translation.
         translation ?.set (this [12], this [13], this [14]);

         // (2) Create 3x3 matrix.
         const a = this .submatrix;

         // (3) Compute det A. If negative, set sign = -1, else sign = 1
         const det      = a .determinant ();
         const det_sign = det < 0 ? -1 : 1;

         // (4) B = A * !A  (here !A means A transpose)
         b .assign (a) .transpose () .multLeft (a);
         const e = eigen_decomposition (b, eigen);

         // Find min / max eigenvalues and do ratio test to determine singularity.

         so .set (e .vectors [0] [0], e .vectors [1] [0], e .vectors [2] [0],
                  e .vectors [0] [1], e .vectors [1] [1], e .vectors [2] [1],
                  e .vectors [0] [2], e .vectors [1] [2], e .vectors [2] [2]);

         scaleOrientation ?.setMatrix (so);

         // Compute s = sqrt(eigen values), with sign. Set si = s-inverse

         s .set (det_sign * Math .sqrt (e .values [0]),
                 det_sign * Math .sqrt (e .values [1]),
                 det_sign * Math .sqrt (e .values [2]));

         scale ?.assign (s);

         if (rotation)
         {
            si [0] = 1 / s .x;
            si [4] = 1 / s .y;
            si [8] = 1 / s .z;

            // (5) Compute U = !R ~S R A.
            rotation .setMatrix (a .multLeft (so) .multLeft (si) .multLeft (so .transpose ()));
         }
      };
   })(),
   determinant3 ()
   {
      const { 0: m00, 1: m01, 2: m02,
              4: m04, 5: m05, 6: m06,
              8: m08, 9: m09, 10: m10 } = this;

      return m00 * (m05 * m10 - m06 * m09) -
             m01 * (m04 * m10 - m06 * m08) +
             m02 * (m04 * m09 - m05 * m08);
   },
   determinant ()
   {
      const
         { 0: m00, 1: m01, 2: m02, 3: m03, 4: m04, 5: m05, 6: m06, 7: m07,
           8: m08, 9: m09, 10: m10, 11: m11, 12: m12, 13: m13, 14: m14, 15: m15 } = this,
         b = m10 * m15,
         c = m14 * m11,
         d = m06 * m15,
         e = m14 * m07,
         f = m06 * m11,
         g = m10 * m07,
         h = m02 * m15,
         i = m14 * m03,
         j = m02 * m11,
         o = m10 * m03,
         r = m02 * m07,
         x = m06 * m03,
         H = b * m05 + e * m09 + f * m13 - (c * m05) - (d * m09) - (g * m13),
         I = c * m01 + h * m09 + o * m13 - (b * m01) - (i * m09) - (j * m13),
         J = d * m01 + i * m05 + r * m13 - (e * m01) - (h * m05) - (x * m13),
         K = g * m01 + j * m05 + x * m09 - (f * m01) - (o * m05) - (r * m09);

      return m00 * H + m04 * I + m08 * J + m12 * K;
   },
   transpose ()
   {
      let tmp;

      tmp = this [ 1]; this [ 1] = this [ 4]; this [ 4] = tmp;
      tmp = this [ 2]; this [ 2] = this [ 8]; this [ 8] = tmp;
      tmp = this [ 3]; this [ 3] = this [12]; this [12] = tmp;
      tmp = this [ 6]; this [ 6] = this [ 9]; this [ 9] = tmp;
      tmp = this [ 7]; this [ 7] = this [13]; this [13] = tmp;
      tmp = this [11]; this [11] = this [14]; this [14] = tmp;

      return this;
   },
   inverse ()
   {
      // Complexity 43 +, 40 -, 140 *. 1 /

      const
         { 0: m00, 1: m01, 2: m02, 3: m03, 4: m04, 5: m05, 6: m06, 7: m07,
           8: m08, 9: m09, 10: m10, 11: m11, 12: m12, 13: m13, 14: m14, 15: m15 } = this,
         b = m10 * m15,
         c = m14 * m11,
         d = m06 * m15,
         e = m14 * m07,
         f = m06 * m11,
         g = m10 * m07,
         h = m02 * m15,
         i = m14 * m03,
         j = m02 * m11,
         o = m10 * m03,
         r = m02 * m07,
         x = m06 * m03,
         t = m08 * m13,
         p = m12 * m09,
         v = m04 * m13,
         s = m12 * m05,
         y = m04 * m09,
         z = m08 * m05,
         A = m00 * m13,
         C = m12 * m01,
         D = m00 * m09,
         E = m08 * m01,
         F = m00 * m05,
         G = m04 * m01,
         H = b * m05 + e * m09 + f * m13 - ((c * m05) + (d * m09) + (g * m13)),
         I = c * m01 + h * m09 + o * m13 - ((b * m01) + (i * m09) + (j * m13)),
         J = d * m01 + i * m05 + r * m13 - ((e * m01) + (h * m05) + (x * m13)),
         K = g * m01 + j * m05 + x * m09 - ((f * m01) + (o * m05) + (r * m09));

      let B = m00 * H + m04 * I + m08 * J + m12 * K;

      // if (B === 0) ... determinant is zero.

      B = 1 / B;

      this [ 0] = B * H;
      this [ 1] = B * I;
      this [ 2] = B * J;
      this [ 3] = B * K;
      this [ 4] = B * (c * m04 + d * m08 + g * m12 - (b * m04) - (e * m08) - (f * m12));
      this [ 5] = B * (b * m00 + i * m08 + j * m12 - (c * m00) - (h * m08) - (o * m12));
      this [ 6] = B * (e * m00 + h * m04 + x * m12 - (d * m00) - (i * m04) - (r * m12));
      this [ 7] = B * (f * m00 + o * m04 + r * m08 - (g * m00) - (j * m04) - (x * m08));
      this [ 8] = B * (t * m07 + s * m11 + y * m15 - (p * m07) - (v * m11) - (z * m15));
      this [ 9] = B * (p * m03 + A * m11 + E * m15 - (t * m03) - (C * m11) - (D * m15));
      this [10] = B * (v * m03 + C * m07 + F * m15 - (s * m03) - (A * m07) - (G * m15));
      this [11] = B * (z * m03 + D * m07 + G * m11 - (y * m03) - (E * m07) - (F * m11));
      this [12] = B * (v * m10 + z * m14 + p * m06 - (y * m14) - (t * m06) - (s * m10));
      this [13] = B * (D * m14 + t * m02 + C * m10 - (A * m10) - (E * m14) - (p * m02));
      this [14] = B * (A * m06 + G * m14 + s * m02 - (F * m14) - (v * m02) - (C * m06));
      this [15] = B * (F * m10 + y * m02 + E * m06 - (D * m06) - (G * m10) - (z * m02));

      return this;
   },
   multLeft (matrix)
   {
      // Complexity 48 +, 64 *.

      const
         { 0: a00, 1: a01, 2: a02, 3: a03, 4: a04, 5: a05, 6: a06, 7: a07,
           8: a08, 9: a09, 10: a10, 11: a11, 12: a12, 13: a13, 14: a14, 15: a15 } = this,
         { 0: b00, 1: b01, 2: b02, 3: b03, 4: b04, 5: b05, 6: b06, 7: b07,
           8: b08, 9: b09, 10: b10, 11: b11, 12: b12, 13: b13, 14: b14, 15: b15 } = matrix;

      this [ 0] = a00 * b00 + a04 * b01 + a08 * b02 + a12 * b03;
      this [ 1] = a01 * b00 + a05 * b01 + a09 * b02 + a13 * b03;
      this [ 2] = a02 * b00 + a06 * b01 + a10 * b02 + a14 * b03;
      this [ 3] = a03 * b00 + a07 * b01 + a11 * b02 + a15 * b03;
      this [ 4] = a00 * b04 + a04 * b05 + a08 * b06 + a12 * b07;
      this [ 5] = a01 * b04 + a05 * b05 + a09 * b06 + a13 * b07;
      this [ 6] = a02 * b04 + a06 * b05 + a10 * b06 + a14 * b07;
      this [ 7] = a03 * b04 + a07 * b05 + a11 * b06 + a15 * b07;
      this [ 8] = a00 * b08 + a04 * b09 + a08 * b10 + a12 * b11;
      this [ 9] = a01 * b08 + a05 * b09 + a09 * b10 + a13 * b11;
      this [10] = a02 * b08 + a06 * b09 + a10 * b10 + a14 * b11;
      this [11] = a03 * b08 + a07 * b09 + a11 * b10 + a15 * b11;
      this [12] = a00 * b12 + a04 * b13 + a08 * b14 + a12 * b15;
      this [13] = a01 * b12 + a05 * b13 + a09 * b14 + a13 * b15;
      this [14] = a02 * b12 + a06 * b13 + a10 * b14 + a14 * b15;
      this [15] = a03 * b12 + a07 * b13 + a11 * b14 + a15 * b15;

      return this;
   },
   multRight (matrix)
   {
      // Complexity 48 +, 64 *.

      const
         { 0: a00, 1: a01, 2: a02, 3: a03, 4: a04, 5: a05, 6: a06, 7: a07,
           8: a08, 9: a09, 10: a10, 11: a11, 12: a12, 13: a13, 14: a14, 15: a15 } = this,
         { 0: b00, 1: b01, 2: b02, 3: b03, 4: b04, 5: b05, 6: b06, 7: b07,
           8: b08, 9: b09, 10: b10, 11: b11, 12: b12, 13: b13, 14: b14, 15: b15 } = matrix;

      this [ 0] = a00 * b00 + a01 * b04 + a02 * b08 + a03 * b12;
      this [ 1] = a00 * b01 + a01 * b05 + a02 * b09 + a03 * b13;
      this [ 2] = a00 * b02 + a01 * b06 + a02 * b10 + a03 * b14;
      this [ 3] = a00 * b03 + a01 * b07 + a02 * b11 + a03 * b15;
      this [ 4] = a04 * b00 + a05 * b04 + a06 * b08 + a07 * b12;
      this [ 5] = a04 * b01 + a05 * b05 + a06 * b09 + a07 * b13;
      this [ 6] = a04 * b02 + a05 * b06 + a06 * b10 + a07 * b14;
      this [ 7] = a04 * b03 + a05 * b07 + a06 * b11 + a07 * b15;
      this [ 8] = a08 * b00 + a09 * b04 + a10 * b08 + a11 * b12;
      this [ 9] = a08 * b01 + a09 * b05 + a10 * b09 + a11 * b13;
      this [10] = a08 * b02 + a09 * b06 + a10 * b10 + a11 * b14;
      this [11] = a08 * b03 + a09 * b07 + a10 * b11 + a11 * b15;
      this [12] = a12 * b00 + a13 * b04 + a14 * b08 + a15 * b12;
      this [13] = a12 * b01 + a13 * b05 + a14 * b09 + a15 * b13;
      this [14] = a12 * b02 + a13 * b06 + a14 * b10 + a15 * b14;
      this [15] = a12 * b03 + a13 * b07 + a14 * b11 + a15 * b15;

      return this;
   },
   multVecMatrix (vector)
   {
      if (vector .length === 3)
      {
         const
            { x, y, z } = vector,
            w = 1 / (x * this [3] + y * this [7] + z * this [11] + this [15]);

         vector .x = (x * this [0] + y * this [4] + z * this [ 8] + this [12]) * w;
         vector .y = (x * this [1] + y * this [5] + z * this [ 9] + this [13]) * w;
         vector .z = (x * this [2] + y * this [6] + z * this [10] + this [14]) * w;

         return vector;
      }
      else
      {
         const { x, y, z, w } = vector;

         vector .x = x * this [0] + y * this [4] + z * this [ 8] + w * this [12];
         vector .y = x * this [1] + y * this [5] + z * this [ 9] + w * this [13];
         vector .z = x * this [2] + y * this [6] + z * this [10] + w * this [14];
         vector .w = x * this [3] + y * this [7] + z * this [11] + w * this [15];

         return vector;
      }
   },
   multMatrixVec (vector)
   {
      if (vector .length === 3)
      {
         const
            { x, y, z } = vector,
            w = 1 / (x * this [12] + y * this [13] + z * this [14] + this [15]);

         vector .x = (x * this [0] + y * this [1] + z * this [ 2] + this [ 3]) * w;
         vector .y = (x * this [4] + y * this [5] + z * this [ 6] + this [ 7]) * w;
         vector .z = (x * this [8] + y * this [9] + z * this [10] + this [11]) * w;

         return vector;
      }
      else
      {
         const { x, y, z, w } = vector;

         vector .x = x * this [ 0] + y * this [ 1] + z * this [ 2] + w * this [ 3];
         vector .y = x * this [ 4] + y * this [ 5] + z * this [ 6] + w * this [ 7];
         vector .z = x * this [ 8] + y * this [ 9] + z * this [10] + w * this [11];
         vector .w = x * this [12] + y * this [13] + z * this [14] + w * this [15];

         return vector;
      }
   },
   multDirMatrix (vector)
   {
      const { x, y, z } = vector;

      vector .x = x * this [0] + y * this [4] + z * this [ 8];
      vector .y = x * this [1] + y * this [5] + z * this [ 9];
      vector .z = x * this [2] + y * this [6] + z * this [10];

      return vector;
   },
   multMatrixDir (vector)
   {
      const { x, y, z } = vector;

      vector .x = x * this [0] + y * this [1] + z * this [ 2];
      vector .y = x * this [4] + y * this [5] + z * this [ 6];
      vector .z = x * this [8] + y * this [9] + z * this [10];

      return vector;
   },
   identity ()
   {
      this [ 0] = 1; this [ 1] = 0; this [ 2] = 0; this [ 3] = 0;
      this [ 4] = 0; this [ 5] = 1; this [ 6] = 0; this [ 7] = 0;
      this [ 8] = 0; this [ 9] = 0; this [10] = 1; this [11] = 0;
      this [12] = 0; this [13] = 0; this [14] = 0; this [15] = 1;

      return this;
   },
   translate (translation)
   {
      const { x, y, z } = translation;

      this [12] += this [ 0] * x + this [ 4] * y + this [ 8] * z;
      this [13] += this [ 1] * x + this [ 5] * y + this [ 9] * z;
      this [14] += this [ 2] * x + this [ 6] * y + this [10] * z;

      return this;
   },
   rotate (rotation)
   {
      return this .multLeft (m .setQuaternion (rotation .getQuaternion (q)));
   },
   scale (scale)
   {
      const { x, y, z } = scale;

      this [ 0] *= x;
      this [ 4] *= y;
      this [ 8] *= z;

      this [ 1] *= x;
      this [ 5] *= y;
      this [ 9] *= z;

      this [ 2] *= x;
      this [ 6] *= y;
      this [10] *= z;

      return this;
   },
   toString ()
   {
      return Array .prototype .join .call (this, " ");
   },
});

for (const key of Object .keys (Matrix4 .prototype))
   Object .defineProperty (Matrix4 .prototype, key, { enumerable: false });

Object .defineProperties (Matrix4 .prototype,
{
   order: { value: 4 },
   length: { value: 16 },
   x:
   {
      get: (() =>
      {
         const vector = new Vector4 ();

         return function () { return vector .set (this [0], this [1], this [2], this [3]); };
      })(),
   },
   y:
   {
      get: (() =>
      {
         const vector = new Vector4 ();

         return function () { return vector .set (this [4], this [5], this [6], this [7]); };
      })(),
   },
   z:
   {
      get: (() =>
      {
         const vector = new Vector4 ();

         return function () { return vector .set (this [8], this [9], this [10], this [11]); };
      })(),
   },
   w:
   {
      get: (() =>
      {
         const vector = new Vector4 ();

         return function () { return vector .set (this [12], this [13], this [14], this [15]); };
      })(),
   },
   xAxis:
   {
      get: (() =>
      {
         const vector = new Vector3 ();

         return function () { return vector .set (this [0], this [1], this [2]); };
      })(),
   },
   yAxis:
   {
      get: (() =>
      {
         const vector = new Vector3 ();

         return function () { return vector .set (this [4], this [5], this [6]); };
      })(),
   },
   zAxis:
   {
      get: (() =>
      {
         const vector = new Vector3 ();

         return function () { return vector .set (this [8], this [9], this [10]); };
      })(),
   },
   origin:
   {
      get: (() =>
      {
         const vector = new Vector3 ();

         return function () { return vector .set (this [12], this [13], this [14]); };
      })(),
   },
   submatrix:
   {
      get: (() =>
      {
         const matrix = new Matrix3 ();

         return function ()
         {
            matrix [0] = this [0]; matrix [1] = this [1]; matrix [2] = this [ 2];
            matrix [3] = this [4]; matrix [4] = this [5]; matrix [5] = this [ 6];
            matrix [6] = this [8]; matrix [7] = this [9]; matrix [8] = this [10];
            return matrix;
         };
      })(),
   },
});

Object .assign (Matrix4,
{
   Identity: Object .freeze (new Matrix4 ()),
   Rotation (rotation)
   {
      return Object .create (this .prototype) .setQuaternion (rotation .getQuaternion (q));
   },
   Quaternion (quaternion)
   {
      return Object .create (this .prototype) .setQuaternion (quaternion);
   },
   Matrix3 (matrix)
   {
      return new Matrix4 (matrix [0], matrix [1], 0, 0,
                          matrix [3], matrix [4], 0, 0,
                          0, 0, 1, 0,
                          matrix [6], matrix [7], 0, 1);
   },
   SubMatrix (matrix)
   {
      return new Matrix4 (matrix [0], matrix [1], matrix [2], 0,
                          matrix [3], matrix [4], matrix [5], 0,
                          matrix [6], matrix [7], matrix [8], 0,
                          0, 0, 0, 1);
   },
});

const
   q = new Quaternion (),
   m = new Matrix4 ();

export default Matrix4;
