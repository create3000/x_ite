import Vector4 from "../../../standard/Math/Numbers/Vector4.js";
import Matrix4 from "../../../standard/Math/Numbers/Matrix4.js";

function CatmullRomSplineInterpolator ()
{
   this .T0 = [ ];
   this .T1 = [ ];
}

Object .assign (CatmullRomSplineInterpolator .prototype,
{
   generate: (() =>
   {
      const
         T  = [ ],
         Fp = [ ],
         Fm = [ ];

      return function (closed, key, keyValue, keyVelocity, normalizeVelocity)
      {
         const
            T0 = this .T0,
            T1 = this .T1;

         T0 .length = 0;
         T1 .length = 0;

         T  .length = 0;
         Fp .length = 0;
         Fm .length = 0;

         if (key .length > 1)
         {
            // T

            if (keyVelocity .length === 0)
            {
               if (closed)
                  T .push (this .divide (this .subtract (keyValue [1], keyValue [keyValue .length - 2]), 2));

               else
                  T .push (this .create ());

               for (let i = 1, length = keyValue .length - 1; i < length; ++ i)
                  T .push (this .divide (this .subtract (keyValue [i + 1], keyValue [i - 1]), 2));

               T .push (this .copy (T [0]));
            }
            else
            {
               for (let i = 0, length = keyVelocity .length; i < length; ++ i)
                  T .push (this .copy (keyVelocity [i]));

               if (normalizeVelocity)
               {
                  let Dtot = 0;

                  for (let i = 0, length = keyValue .length - 1; i < length; ++ i)
                     Dtot += this .magnitude (this .subtract (keyValue [i], keyValue [i + 1]));

                  for (let i = 0, length = T .length - 1; i < length; ++ i)
                  {
                     const Tia = this .magnitude (T [i]);

                     if (Tia)
                        T [i] = this .multiply (T [i], Dtot / Tia);
                  }
               }
            }

            // Fm, Fp

            if (closed)
            {
               const i_1 = key .length - 1;
               const i_2 = key .length - 2;

               const d = key [1] - key [0] + key [i_1] - key [i_2];

               Fm .push (2 * (key [1]   - key [0])   / d);
               Fp .push (2 * (key [i_1] - key [i_2]) / d);
            }
            else
            {
               Fm .push (1);
               Fp .push (1);
            }

            for (let i = 1, length = key .length - 1; i < length; ++ i)
            {
               const d = key [i + 1] - key [i - 1];

               Fm .push (2 * (key [i + 1] - key [i])     / d);
               Fp .push (2 * (key [i]     - key [i - 1]) / d);
            }

            Fm .push (Fm [0]);
            Fp .push (Fp [0]);

            // T0, T1

            for (let i = 0, length = T .length; i < length; ++ i)
            {
               T0 .push (this .multiply (T [i], Fp [i]));
               T1 .push (this .multiply (T [i], Fm [i]));
            }
         }
         else
         {
            T0 .push (this .create ());
            T1 .push (this .create ());
         }
      };
   })(),
   interpolate: (() =>
   {
      const S = new Vector4 ();

      const H = new Matrix4 ( 2, -2,  1,  1,
                             -3,  3, -2, -1,
                              0,  0,  1,  0,
                              1,  0,  0,  0);

      return function (index0, index1, weight, keyValue)
      {
         S .set (weight ** 3, weight ** 2, weight, 1);

         // Taking dot product from SH and C;

         return this .dot (H .multVecMatrix (S),
                           keyValue [index0],
                           keyValue [index1],
                           this .T0 [index0],
                           this .T1 [index1]);
      };
   })(),
});

export default CatmullRomSplineInterpolator;
