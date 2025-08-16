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
