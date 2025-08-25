import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChaserNode        from "./X3DChaserNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector2              from "../../../standard/Math/Numbers/Vector2.js";

function PositionChaser2D (executionContext)
{
   X3DChaserNode .call (this, executionContext);

   this .addType (X3DConstants .PositionChaser2D);
}

Object .assign (Object .setPrototypeOf (PositionChaser2D .prototype, X3DChaserNode .prototype),
{
   getVector ()
   {
      return new Vector2 ();
   },
});

Object .defineProperties (PositionChaser2D,
{
   ... X3DNode .getStaticProperties ("PositionChaser2D", "Followers", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_value",          new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_destination",    new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialValue",       new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialDestination", new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "duration",           new Fields .SFTime (1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "value_changed",      new Fields .SFVec2f ()),
      ]),
      enumerable: true,
   },
});

export default PositionChaser2D;
