import X3DNode      from "../Core/X3DNode.js";
import X3DChildNode from "../Core/X3DChildNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import Algorithm    from "../../../standard/Math/Algorithm.js";

function X3DInterpolatorNode (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .X3DInterpolatorNode);
}

Object .assign (Object .setPrototypeOf (X3DInterpolatorNode .prototype, X3DChildNode .prototype),
{
   setup ()
   {
      // If an X3DInterpolatorNode value_changed outputOnly field is read before it receives any inputs,
      // keyValue[0] is returned if keyValue is not empty. If keyValue is empty (i.e., [ ]), the initial
      // value for the respective field type is returned (EXAMPLE  (0, 0, 0) for Fields .SFVec3f);

      this .set_key__ ();

      X3DChildNode .prototype .setup .call (this);
   },
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      this ._set_fraction .addInterest ("set_fraction__", this);
      this ._key          .addInterest ("set_key__", this);
   },
   set_fraction__ ()
   {
      const
         key      = this ._key,
         length   = key .length,
         fraction = this ._set_fraction .getValue ();

      switch (length)
      {
         case 0:
            // Interpolator nodes containing no keys in the key field shall not produce any events.
            return;
         case 1:
            return this .interpolate (0, 0, 0);
         default:
         {
            if (fraction <= key [0])
               return this .interpolate (0, 1, 0);

            const index1 = Algorithm .upperBound (key, 0, length, fraction);

            if (index1 !== length)
            {
               const
                  index0 = index1 - 1,
                  weight = (fraction - key [index0]) / (key [index1] - key [index0]);

               this .interpolate (index0, index1, Algorithm .clamp (weight, 0, 1));
            }
            else
               this .interpolate (length - 2, length - 1, 1);
         }
      }
   },
   set_key__ ()
   {
      this .set_keyValue__ ();
   },
   set_keyValue__ () { },
   interpolate () { },
});

Object .defineProperties (X3DInterpolatorNode, X3DNode .getStaticProperties ("X3DInterpolatorNode", "Interpolation", 1));

export default X3DInterpolatorNode;
