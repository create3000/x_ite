import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DInterpolatorNode  from "./X3DInterpolatorNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function CoordinateInterpolator2D (executionContext)
{
   X3DInterpolatorNode .call (this, executionContext);

   this .addType (X3DConstants .CoordinateInterpolator2D);
}

Object .assign (Object .setPrototypeOf (CoordinateInterpolator2D .prototype, X3DInterpolatorNode .prototype),
{
   set_keyValue__ () { },
   interpolate (index0, index1, weight)
   {
      const keyValue = this ._keyValue .getValue ();

      let size = this ._key .length ? Math .floor (this ._keyValue .length / this ._key .length) : 0;

      this ._value_changed .length = size;

      const value_changed = this ._value_changed .getValue ();

      index0 *= size;
      index1  = index0 + (this ._key .length > 1 ? size : 0);

      index0 *= 2;
      index1 *= 2;
      size   *= 2;

      for (let i0 = 0; i0 < size; i0 += 2)
      {
         const i1 = i0 + 1;

         value_changed [i0] = Algorithm .lerp (keyValue [index0 + i0], keyValue [index1 + i0], weight);
         value_changed [i1] = Algorithm .lerp (keyValue [index0 + i1], keyValue [index1 + i1], weight);
      }

      this ._value_changed .addEvent ();
   },
});

Object .defineProperties (CoordinateInterpolator2D,
{
   ... X3DNode .getStaticProperties ("CoordinateInterpolator2D", "Interpolation", 3, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "key",           new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "keyValue",      new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed", new Fields .MFVec2f ()),
      ]),
      enumerable: true,
   },
});

export default CoordinateInterpolator2D;
