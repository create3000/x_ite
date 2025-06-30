import Rotation4 from "../../../standard/Math/Numbers/Rotation4.js";

function SquatInterpolator ()
{
   this .s = [ ];
}

Object .assign (SquatInterpolator .prototype,
{
   generate (closed, key, keyValue)
   {
      const s = this .s;

      s .length = 0;

      if (key .length > 1)
      {
         if (closed)
         {
            s .push (Rotation4 .spline (keyValue [key .length - 2] .getValue (),
                                        keyValue [0] .getValue (),
                                        keyValue [1] .getValue ()));
         }
         else
         {
            s .push (keyValue [0] .getValue ());
         }

         for (let i = 1, length = key .length - 1; i < length; ++ i)
         {
            s .push (Rotation4 .spline (keyValue [i - 1] .getValue (),
                                        keyValue [i]     .getValue (),
                                        keyValue [i + 1] .getValue ()));
         }

         if (closed)
         {
            s .push (Rotation4 .spline (keyValue [key .length - 2] .getValue (),
                                        keyValue [key .length - 1] .getValue (),
                                        keyValue [1] .getValue ()));
         }
         else
         {
            s .push (keyValue [key .length - 1] .getValue ());
         }
      }
      else if (key .length > 0)
      {
         s .push (keyValue [0] .getValue () .copy ());
      }
   },
   interpolate: (() =>
   {
      const result = new Rotation4 ();

      return function (index0, index1, weight, keyValue)
      {
         return result .assign (keyValue [index0] .getValue ()) .squad (this .s [index0],
                                                                        this .s [index1],
                                                                        keyValue [index1] .getValue (), weight);
      };
   })(),
});

export default SquatInterpolator;
