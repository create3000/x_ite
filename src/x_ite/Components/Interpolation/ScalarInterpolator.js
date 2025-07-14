import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DInterpolatorNode  from "./X3DInterpolatorNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function ScalarInterpolator (executionContext)
{
   X3DInterpolatorNode .call (this, executionContext);

   this .addType (X3DConstants .ScalarInterpolator);
}

Object .assign (Object .setPrototypeOf (ScalarInterpolator .prototype, X3DInterpolatorNode .prototype),
{
   initialize ()
   {
      X3DInterpolatorNode .prototype .initialize .call (this);

      this ._keyValue .addInterest ("set_keyValue__", this);
   },
   set_keyValue__ ()
   {
      const
         key      = this ._key,
         keyValue = this ._keyValue;

      if (keyValue .length < key .length)
         keyValue .resize (key .length, keyValue .length ? keyValue [keyValue .length - 1] : 0);

      this .set_fraction__ ();
   },
   interpolate (index0, index1, weight)
   {
      this ._value_changed = Algorithm .lerp (this ._keyValue [index0], this ._keyValue [index1], weight);
   },
});

Object .defineProperties (ScalarInterpolator,
{
   ... X3DNode .getStaticProperties ("ScalarInterpolator", "Interpolation", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "key",           new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "keyValue",      new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed", new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

export default ScalarInterpolator;
