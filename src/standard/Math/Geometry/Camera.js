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

import Vector3 from "../Numbers/Vector3.js";

const Camera = {
   frustum: function (l, r, b, t, n, f, matrix)
   {
      const
         r_l = r - l,
         t_b = t - b,
         f_n = f - n,
         n_2 = 2 * n,

         A = (r + l) / r_l,
         B = (t + b) / t_b,
         C = -(f + n) / f_n,
         D = -(n_2 * f) / f_n,
         E = n_2 / r_l,
         F = n_2 / t_b;

      return matrix .set (E, 0, 0, 0,
                          0, F, 0, 0,
                          A, B, C, -1,
                          0, 0, D, 0);
   },
   perspective: function (fieldOfView, zNear, zFar, width, height, matrix)
   {
      const ratio = Math .tan (fieldOfView / 2) * zNear;

      if (width > height)
      {
         const aspect = width * ratio / height;
         return this .frustum (-aspect, aspect, -ratio, ratio, zNear, zFar, matrix);
      }
      else
      {
         const aspect = height * ratio / width;
         return this .frustum (-ratio, ratio, -aspect, aspect, zNear, zFar, matrix);
      }
   },
   perspective2: function (fieldOfView, zNear, zFar, width, height, matrix)
   {
      const ratio = Math .tan (fieldOfView / 2) * zNear;

      return this .frustum (-ratio, ratio, -ratio, ratio, zNear, zFar, matrix);
   },
   ortho: function (l, r, b, t, n, f, matrix)
   {
      const
         r_l = r - l,
         t_b = t - b,
         f_n = f - n,

         A =  2 / r_l,
         B =  2 / t_b,
         C = -2 / f_n,
         D = -(r + l) / r_l,
         E = -(t + b) / t_b,
         F = -(f + n) / f_n;

      return matrix .set (A, 0, 0, 0,
                          0, B, 0, 0,
                          0, 0, C, 0,
                          D, E, F, 1);
   },
   orthoBox: (function ()
   {
      const
         min = new Vector3 (0, 0, 0),
         max = new Vector3 (0, 0, 0);

      return function (box, matrix)
      {
         box .getExtents (min, max);

         return this .ortho (min .x, max .x, min .y, max .y, -max .z, -min .z, matrix);
      };
   })(),
};

export default Camera;
