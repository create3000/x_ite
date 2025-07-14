import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DInterpolatorNode  from "./X3DInterpolatorNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

function PositionInterpolator (executionContext)
{
   X3DInterpolatorNode .call (this, executionContext);

   this .addType (X3DConstants .PositionInterpolator);
}

Object .assign (Object .setPrototypeOf (PositionInterpolator .prototype, X3DInterpolatorNode .prototype),
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
         keyValue .resize (key .length, keyValue .length ? keyValue [keyValue .length - 1] : new Fields .SFVec3f ());

      this .set_fraction__ ();
   },
   interpolate: (() =>
   {
      const keyValue = new Vector3 ();

      return function (index0, index1, weight)
      {
         this ._value_changed = keyValue .assign (this ._keyValue [index0] .getValue ()) .lerp (this ._keyValue [index1] .getValue (), weight);
      };
   })(),
});

Object .defineProperties (PositionInterpolator,
{
   ... X3DNode .getStaticProperties ("PositionInterpolator", "Interpolation", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "key",           new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "keyValue",      new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed", new Fields .SFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default PositionInterpolator;
