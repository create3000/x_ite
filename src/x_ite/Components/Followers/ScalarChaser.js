import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChaserNode        from "./X3DChaserNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function ScalarChaser (executionContext)
{
   X3DChaserNode .call (this, executionContext);

   this .addType (X3DConstants .ScalarChaser);
}

Object .assign (Object .setPrototypeOf (ScalarChaser .prototype, X3DChaserNode .prototype),
{
   getVector ()
   {
      return 0;
   },
   setPreviousValue (value)
   {
      this .previousValue = value;
   },
   setDestination (value)
   {
      this .destination = value;
   },
   duplicate (value)
   {
      return value;
   },
   assign (buffer, i, value)
   {
      buffer [i] = value;
   },
   equals (lhs, rhs, tolerance)
   {
      return Math .abs (lhs - rhs) < tolerance;
   },
   interpolate (source, destination, weight)
   {
      return Algorithm .lerp (source, destination, weight);
   },
   step (value1, value2, t)
   {
      this .output += (value1 - value2) * t;
   },
});

Object .defineProperties (ScalarChaser,
{
   ... X3DNode .getStaticProperties ("ScalarChaser", "Followers", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_value",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_destination",    new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialValue",       new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialDestination", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "duration",           new Fields .SFTime (1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "value_changed",      new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

export default ScalarChaser;
