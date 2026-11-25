import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DInterpolatorNode  from "./X3DInterpolatorNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function CoordinateInterpolator1D (executionContext)
{
   X3DInterpolatorNode .call (this, executionContext);

   this .addType (X3DConstants .CoordinateInterpolator1D);
}

Object .assign (Object .setPrototypeOf (CoordinateInterpolator1D .prototype, X3DInterpolatorNode .prototype),
{
   set_keyValue__ ()
   {
      // If there already was an set_fraction event in this frame, send a new value_changed to prevent glitches.
      if (this ._set_fraction .getModificationTime () >= this .getBrowser () .getCurrentTime ())
         this .set_fraction__ ();
   },
   interpolate (index0, index1, weight)
   {
      const keyValue = this ._keyValue .getValue ();

      let size = this ._key .length ? Math .floor (this ._keyValue .length / this ._key .length) : 0;

      this ._value_changed .length = size;

      const value_changed = this ._value_changed .getValue ();

      index0 *= size;
      index1  = index0 + (this ._key .length > 1 ? size : 0);

      for (let i0 = 0; i0 < size; ++ i0)
         value_changed [i0] = Algorithm .lerp (keyValue [index0 + i0], keyValue [index1 + i0], weight);

      this ._value_changed .addEvent ();
   },
});

Object .defineProperties (CoordinateInterpolator1D,
{
   ... X3DNode .getStaticProperties ("CoordinateInterpolator1D", "Interpolation", 1, "children", "4.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "key",           new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "keyValue",      new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed", new Fields .MFFloat ()),
      ]),
      enumerable: true,
   },
});

export default CoordinateInterpolator1D;
