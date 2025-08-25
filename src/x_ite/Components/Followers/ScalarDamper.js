import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DDamperNode        from "./X3DDamperNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function ScalarDamper (executionContext)
{
   X3DDamperNode .call (this, executionContext);

   this .addType (X3DConstants .ScalarDamper);
}

Object .assign (Object .setPrototypeOf (ScalarDamper .prototype, X3DDamperNode .prototype),
{
   getVector ()
   {
      return 0;
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
});

Object .defineProperties (ScalarDamper,
{
   ... X3DNode .getStaticProperties ("ScalarDamper", "Followers", 1, "children", "3.3"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_value",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_destination",    new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialValue",       new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialDestination", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "order",              new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tau",                new Fields .SFTime (0.3)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tolerance",          new Fields .SFFloat (-1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "value_changed",      new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

export default ScalarDamper;
