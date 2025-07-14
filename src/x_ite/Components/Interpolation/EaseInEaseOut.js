import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DInterpolatorNode  from "./X3DInterpolatorNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function EaseInEaseOut (executionContext)
{
   X3DInterpolatorNode .call (this, executionContext);

   this .addType (X3DConstants .EaseInEaseOut);
}

Object .assign (Object .setPrototypeOf (EaseInEaseOut .prototype, X3DInterpolatorNode .prototype),
{
   initialize ()
   {
      X3DInterpolatorNode .prototype .initialize .call (this);

      this ._easeInEaseOut .addInterest ("set_keyValue__", this);
   },
   set_keyValue__ ()
   {
      if (this ._easeInEaseOut .length < this ._key .length)
         this ._easeInEaseOut .resize (this ._key .length, this ._easeInEaseOut .length ? this ._easeInEaseOut [this ._easeInEaseOut .length - 1] : new Fields .SFVec2f ());

      this .set_fraction__ ();
   },
   interpolate (index0, index1, weight)
   {
      let
         easeOut = this ._easeInEaseOut [index0] .y,
         easeIn  = this ._easeInEaseOut [index1] .x;

      const sum = easeOut + easeIn;

      if (sum < 0)
      {
         this ._modifiedFraction_changed = weight;
      }
      else
      {
         if (sum > 1)
         {
            easeIn  /= sum;
            easeOut /= sum;
         }

         const t = 1 / (2 - easeOut - easeIn);

         if (weight < easeOut)
         {
            this ._modifiedFraction_changed = (t / easeOut) * weight * weight;
         }
         else if (weight <= 1 - easeIn) // Spec says (weight < 1 - easeIn), but then we get a NaN below if easeIn == 0.
         {
            this ._modifiedFraction_changed = t * (2 * weight - easeOut);
         }
         else
         {
            const w = 1 - weight;

            this ._modifiedFraction_changed = 1 - ((t * w * w) / easeIn);
         }
      }
   },
});

Object .defineProperties (EaseInEaseOut,
{
   ... X3DNode .getStaticProperties ("EaseInEaseOut", "Interpolation", 4, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                 new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",             new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "key",                      new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "easeInEaseOut",            new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "modifiedFraction_changed", new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

export default EaseInEaseOut;
