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

const a = [ ]; // more scratch
const b = [ ]; // more scratch
const z = [ ]; // more scratch

// Calculate eigenvalues and eigenvectors.
// This is from SGI Inventor Matrix.cpp.
function eigen_decomposition (matrix, result)
{
   const
      ORDER   = matrix .order,
      SIZE    = matrix .length,
      values  = result .values,
      vectors = result .vectors;

   let
      sm,         // smallest entry
      theta,      // angle for Jacobi rotation
      c, s, t,    // cosine, sine, tangent of theta
      tau,        // sine / (1 + cos)
      h, g,       // two scrap values
      thresh,     // threshold below which no rotation done
      p, q, i, j; // indices

   // initializations
   for (i = 0; i < ORDER; ++ i)
   {
      a [i] = a [i] ?? [ ];
      b [i] = values [i] = matrix .get1 (i, i);
      z [i] = 0;

      for (j = 0; j < ORDER; ++ j)
      {
         vectors [i] [j] = (i === j) ? 1 : 0;
         a [i] [j] = matrix .get1 (j, i);
      }
   }

   // Why 50? I don't know--it's the way the folks who wrote the
   // algorithm did it:
   for (i = 0; i < 50; ++ i)
   {
      sm = 0;

      for (p = 0; p < ORDER - 1; ++ p)
      {
         for (q = p + 1; q < ORDER; ++ q)
            sm += Math .abs (a [p] [q]);
      }

      if (sm === 0)
         break;

      thresh = i < 3 ?
         0.2 * sm / SIZE :
         0;

      for (p = 0; p < ORDER - 1; ++ p)
      {
         for (q = p + 1; q < ORDER; ++ q)
         {
            g = 100 * Math .abs (a [p] [q]);

            if (i > 3
                && (Math .abs (values [p]) + g === Math .abs (values [p]))
                && (Math .abs (values [q]) + g === Math .abs (values [q]))
            )
            {
               a [p] [q] = 0;
            }

            else if (Math .abs (a [p] [q]) > thresh)
            {
               h = values [q] - values [p];

               if (Math .abs (h) + g === Math .abs (h))
               {
                  t = a [p] [q] / h;
               }
               else
               {
                  theta = 0.5 * h / a [p] [q];
                  t     = 1 / (Math .abs (theta) + Math .sqrt (1 + theta * theta));

                  if (theta < 0)  t = -t;
               }
               // End of computing tangent of rotation angle

               c           = 1 / Math .sqrt (1 + t * t);
               s           = t * c;
               tau         = s / (1 + c);
               h           = t * a [p] [q];
               z [p]      -= h;
               z [q]      += h;
               values [p] -= h;
               values [q] += h;
               a [p] [q]   = 0;

               for (j = 0; j < p; ++ j)
               {
                  g = a [j] [p];
                  h = a [j] [q];
                  a [j] [p] = g - s * (h + g * tau);
                  a [j] [q] = h + s * (g - h * tau);
               }

               for (j = p + 1; j < q; ++ j)
               {
                  g = a [p] [j];
                  h = a [j] [q];
                  a [p] [j] = g - s * (h + g * tau);
                  a [j] [q] = h + s * (g - h * tau);
               }

               for (j = q + 1; j < ORDER; ++ j)
               {
                  g = a [p] [j];
                  h = a [q] [j];
                  a [p] [j] = g - s * (h + g * tau);
                  a [q] [j] = h + s * (g - h * tau);
               }

               for (j = 0; j < ORDER; ++ j)
               {
                  g = vectors [j] [p];
                  h = vectors [j] [q];
                  vectors [j] [p] = g - s * (h + g * tau);
                  vectors [j] [q] = h + s * (g - h * tau);
               }
            }
         }
      }

      for (p = 0; p < ORDER; ++ p)
      {
         values [p] = b [p] += z [p];
         z [p] = 0;
      }
   }

   return result;
}

export default eigen_decomposition;
