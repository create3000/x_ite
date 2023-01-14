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

import Quaternion from "./Quaternion.js";
import Vector3    from "./Vector3.js";
import Vector4    from "./Vector4.js";
import Algorithm  from "../Algorithm.js";

const
   _x          = Symbol (),
   _y          = Symbol (),
   _z          = Symbol (),
   _angle      = Symbol (),
   _quaternion = Symbol ();

function Rotation4 (x, y, z, angle)
{
   this [_x]     = 0;
   this [_y]     = 0;
   this [_z]     = 1;
   this [_angle] = 0;

   switch (arguments .length)
   {
      case 0:
      {
         this [_quaternion] = new Quaternion (0, 0, 0, 1);
         return;
      }
      case 1:
      {
         this [_quaternion] = arguments [0];
         this .update ();
         return;
      }
      case 2:
      {
         const
            arg0 = arguments [0],
            arg1 = arguments [1];

         this [_quaternion] = new Quaternion (0, 0, 0, 1);

         if (arg1 instanceof Vector3)
            return this .setFromToVec (arg0, arg1);

         this .set (arg0 .x,
                    arg0 .y,
                    arg0 .z,
                    arg1);

         return;
      }
      case 4:
      {
         this [_quaternion] = new Quaternion (0, 0, 0, 1);
         this .set (x, y, z, angle);
         return;
      }
   }
}

Rotation4 .prototype =
{
   constructor: Rotation4,
   length: 4,
   [Symbol .iterator]: function* ()
   {
      yield this [_x];
      yield this [_y];
      yield this [_z];
      yield this [_angle];
   },
   update: function ()
   {
      const rotation = this .get ();

      this [_x]     = rotation .x;
      this [_y]     = rotation .y;
      this [_z]     = rotation .z;
      this [_angle] = rotation .w;

      return this;
   },
   copy: function ()
   {
      const copy = Object .create (Rotation4 .prototype);

      copy [_x]     = this [_x];
      copy [_y]     = this [_y];
      copy [_z]     = this [_z];
      copy [_angle] = this [_angle];

      copy [_quaternion]  = this [_quaternion] .copy ();

      return copy;
   },
   assign: function (rotation)
   {
      this [_x]     = rotation [_x];
      this [_y]     = rotation [_y];
      this [_z]     = rotation [_z];
      this [_angle] = rotation [_angle];

      this [_quaternion] .assign (rotation [_quaternion]);

      return this;
   },
   set: function (x, y, z, angle)
   {
      this [_x]     = x;
      this [_y]     = y;
      this [_z]     = z;
      this [_angle] = angle;

      const scale = Math .hypot (x, y, z);

      if (scale === 0)
      {
         this [_quaternion] .set (0, 0, 0, 1);
         return this;
      }

      // Calculate quaternion

      const
         halfTheta = Algorithm .interval (angle / 2, 0, Math .PI),
         ascale    = Math .sin (halfTheta) / scale;

      this [_quaternion] .set (x * ascale,
                               y * ascale,
                               z * ascale,
                               Math .cos (halfTheta));
      return this;
   },
   get: (function ()
   {
      const result = new Vector4 (0, 0, 0, 0);

      return function ()
      {
         const quaternion = this [_quaternion];

         if (Math .abs (quaternion .w) > 1)
         {
            return Vector4 .zAxis;
         }
         else
         {
            const
               angle = Math .acos (quaternion .w) * 2,
               scale = Math .sin (angle / 2);

            if (scale === 0)
            {
               return Vector4 .zAxis;
            }
            else
            {
               const axis = quaternion .imag .divide (scale);

               return result .set (axis .x,
                                   axis .y,
                                   axis .z,
                                   angle);
            }
         }
      };
   })(),
   setAxisAngle: function (axis, angle)
   {
      return this .set (axis .x, axis .y, axis .z, angle);
   },
   setFromToVec: (function ()
   {
      const
         from = new Vector3 (0, 0, 0),
         to   = new Vector3 (0, 0, 0),
         cv   = new Vector3 (0, 0, 0),
         t    = new Vector3 (0, 0, 0);

      return function (fromVec, toVec)
      {
         // https://bitbucket.org/Coin3D/coin/src/abc9f50968c9/src/base/SbRotation.cpp

         from .assign (fromVec) .normalize ();
         to   .assign (toVec)   .normalize ();

         const
            cos_angle = Algorithm .clamp (from .dot (to), -1, 1),
            crossvec  = cv .assign (from) .cross (to) .normalize (),
            crosslen  = crossvec .magnitude ();

         if (crosslen === 0)
         {
            // Parallel vectors
            // Check if they are pointing in the same direction.
            if (cos_angle > 0)
               this [_quaternion] .set (0, 0, 0, 1); // standard rotation

            // Ok, so they are parallel and pointing in the opposite direction
            // of each other.
            else
            {
               // Try crossing with x axis.
               t .assign (from) .cross (Vector3 .xAxis);

               // If not ok, cross with y axis.
               if (t .norm () === 0)
                  t .assign (from) .cross (Vector3 .yAxis);

               t .normalize ();

               this [_quaternion] .set (t .x, t .y, t .z, 0);
            }
         }
         else
         {
            // Vectors are not parallel
            // The abs () wrapping is to avoid problems when `dot' "overflows" a tiny wee bit,
            // which can lead to sqrt () returning NaN.
            crossvec .multiply (Math .sqrt (Math .abs (1 - cos_angle) / 2));

            this [_quaternion] .set (crossvec .x,
                                     crossvec .y,
                                     crossvec .z,
                                     Math .sqrt (Math .abs (1 + cos_angle) / 2));
         }

         this .update ();

         return this;
      };
   })(),
   setAxis: function (vector)
   {
      this .set (vector .x, vector .y, vector .z, this [_angle]);
   },
   getAxis: function (axis)
   {
      return axis .set (this [_x], this [_y], this [_z]);
   },
   setQuaternion: function (quaternion)
   {
      this [_quaternion] .assign (quaternion) .normalize ();
      this .update ();
      return this;
   },
   getQuaternion: function (quaternion)
   {
      quaternion .assign (this [_quaternion]);
      return quaternion;
   },
   setMatrix: function (matrix)
   {
      this [_quaternion] .setMatrix (matrix) .normalize ();
      this .update ();
      return this;
   },
   getMatrix: function (matrix)
   {
      return this [_quaternion] .getMatrix (matrix);
   },
   equals: function (rotation)
   {
      return this [_quaternion] .equals (rotation [_quaternion]);
   },
   inverse: function ()
   {
      this [_quaternion] .inverse ();
      this .update ();
      return this;
   },
   multLeft: function (rotation)
   {
      this [_quaternion] .multLeft (rotation [_quaternion]) .normalize ();
      this .update ();
      return this;
   },
   multRight: function (rotation)
   {
      this [_quaternion] .multRight (rotation [_quaternion]) .normalize ();
      this .update ();
      return this;
   },
   multVecRot: function (vector)
   {
      return this [_quaternion] .multVecQuat (vector);
   },
   multRotVec: function (vector)
   {
      return this [_quaternion] .multQuatVec (vector);
   },
   normalize: function ()
   {
      this [_quaternion] .normalize ();
      this .update ();
      return this;
   },
   pow: function (exponent)
   {
      this [_quaternion] .pow (exponent);
      this .update ();
      return this;
   },
   slerp: function (dest, t)
   {
      this [_quaternion] .slerp (dest [_quaternion], t);
      this .update ();
      return this;
   },
   squad: function (a, b, dest, t)
   {
      this [_quaternion] .squad (a [_quaternion], b [_quaternion], dest [_quaternion], t);
      this .update ();
      return this;
   },
   toString: function ()
   {
      return this [_x] + " " +
             this [_y] + " " +
             this [_z] + " " +
             this [_angle];
   }
};

const x = {
   get: function ()
   {
      return this [_x];
   },
   set: function (x)
   {
      this [_x] = x;
      this .set (x, this [_y], this [_z], this [_angle]);
   },
   enumerable: true,
   configurable: false
};

const y = {
   get: function ()
   {
      return this [_y];
   },
   set: function (y)
   {
      this [_y] = y;
      this .set (this [_x], y, this [_z], this [_angle]);
   },
   enumerable: true,
   configurable: false
};

const z = {
   get: function ()
   {
      return this [_z];
   },
   set: function (z)
   {
      this [_z] = z;
      this .set (this [_x], this [_y], z, this [_angle]);
   },
   enumerable: true,
   configurable: false
};

const angle = {
   get: function ()
   {
      return this [_angle];
   },
   set: function (angle)
   {
      this [_angle] = angle;
      this .set (this [_x], this [_y], this [_z], angle);
   },
   enumerable: true,
   configurable: false
};

Object .defineProperty (Rotation4 .prototype, "x",     x);
Object .defineProperty (Rotation4 .prototype, "y",     y);
Object .defineProperty (Rotation4 .prototype, "z",     z);
Object .defineProperty (Rotation4 .prototype, "angle", angle);

x     .enumerable = false;
y     .enumerable = false;
z     .enumerable = false;
angle .enumerable = false;

Object .defineProperty (Rotation4 .prototype, "0", x);
Object .defineProperty (Rotation4 .prototype, "1", y);
Object .defineProperty (Rotation4 .prototype, "2", z);
Object .defineProperty (Rotation4 .prototype, "3", angle);

Object .assign (Rotation4,
{
   Identity: new Rotation4 (),
   inverse: function (rotation)
   {
      return rotation .copy () .inverse ();
   },
   multRight: function (lhs, rhs)
   {
      return lhs .copy () .multRight (rhs);
   },
   normalize: function (rotation)
   {
      return rotation .copy () .normalize ();
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
   bezier: function (source, a, b, destination, t)
   {
      const copy = Object .create (this .prototype);
      copy [_quaternion] = Quaternion .bezier (source [_quaternion], a, b, destination [_quaternion], t);
      copy .update ();
      return copy;
   },
   */
   spline: function (r0, r1, r2)
   {
      const copy = Object .create (this .prototype);
      copy [_quaternion] = Quaternion .spline (r0 [_quaternion], r1 [_quaternion], r2 [_quaternion]);
      copy .update ();
      return copy;
   },
});

export default Rotation4;
