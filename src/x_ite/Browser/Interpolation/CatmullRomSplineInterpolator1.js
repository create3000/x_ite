import CatmullRomSplineInterpolator from "./CatmullRomSplineInterpolator.js";

function CatmullRomSplineInterpolator1 ()
{
   CatmullRomSplineInterpolator .call (this);
}

Object .assign (Object .setPrototypeOf (CatmullRomSplineInterpolator1 .prototype, CatmullRomSplineInterpolator .prototype),
{
   create ()
   {
      return 0;
   },
   copy (value)
   {
      return value;
   },
   subtract (lhs, rhs)
   {
      return lhs - rhs;
   },
   multiply (lhs, rhs)
   {
      return lhs * rhs;
   },
   divide (lhs, rhs)
   {
      return lhs / rhs;
   },
   magnitude (value)
   {
      return Math .abs (value);
   },
   distance (lhs, rhs)
   {
      return Math .abs (lhs - rhs);
   },
   dot (SH, C0, C1, C2, C3)
   {
      return C0 * SH [0] + C1 * SH [1] + C2 * SH [2] + C3 * SH [3];
   },
});

export default CatmullRomSplineInterpolator1;
