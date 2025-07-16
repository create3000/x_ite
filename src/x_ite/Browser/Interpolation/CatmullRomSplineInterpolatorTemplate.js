import CatmullRomSplineInterpolator from "./CatmullRomSplineInterpolator.js";

function CatmullRomSplineInterpolatorTemplate (Type)
{
   function CatmullRomSplineInterpolatorInstance ()
   {
      this .T0 = [ ];
      this .T1 = [ ];
   }

   Object .assign (Object .setPrototypeOf (CatmullRomSplineInterpolatorInstance .prototype, CatmullRomSplineInterpolator .prototype),
   {
      create ()
      {
         return new Type ();
      },
      copy (value)
      {
         return value .copy ();
      },
      subtract (lhs, rhs)
      {
         return lhs .copy () .subtract (rhs);
      },
      multiply (lhs, rhs)
      {
         return lhs .copy () .multiply (rhs);
      },
      divide (lhs, rhs)
      {
         return lhs .copy () .divide (rhs);
      },
      magnitude (value)
      {
         return value .magnitude ();
      },
      distance (lhs, rhs)
      {
         return lhs .distance (rhs);
      },
      dot: (() =>
      {
         const
            c0 = new Type (),
            c1 = new Type (),
            c2 = new Type (),
            c3 = new Type ();

         return function (SH, C0, C1, C2, C3)
         {
            c0 .assign (C0) .multiply (SH [0]);
            c1 .assign (C1) .multiply (SH [1]);
            c2 .assign (C2) .multiply (SH [2]);
            c3 .assign (C3) .multiply (SH [3]);

            return c0 .add (c1) .add (c2) .add (c3);
         };
      })(),
   });

   return CatmullRomSplineInterpolatorInstance;
}

export default CatmullRomSplineInterpolatorTemplate;
