import Algorithm from "../../../standard/Math/Algorithm.js";

function Geocentric () { }

Object .assign (Geocentric .prototype,
{
   convert (geocentric, result)
   {
      return result .assign (geocentric);
   },
   apply (geocentric, result)
   {
      return result .assign (geocentric);
   },
   slerp (source, destination, t)
   {
      const
         sourceLength      = source      .norm (),
         destinationLength = destination .norm ();

      source      .normalize ();
      destination .normalize ();

      return Algorithm .simpleSlerp (source, destination, t) .multiply (Algorithm .lerp (sourceLength, destinationLength, t));
   },
});

export default Geocentric;
