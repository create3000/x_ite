import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DChaserNode          from "./X3DChaserNode.js";
import X3DArrayChaserTemplate from "../../Browser/Followers/X3DArrayChaserTemplate.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import Vector3                from "../../../standard/Math/Numbers/Vector3.js";

const X3DArrayChaserObject = X3DArrayChaserTemplate (X3DChaserNode);

function CoordinateChaser (executionContext)
{
   X3DChaserNode        .call (this, executionContext);
   X3DArrayChaserObject .call (this, executionContext);

   this .addType (X3DConstants .CoordinateChaser);
}

Object .assign (Object .setPrototypeOf (CoordinateChaser .prototype, X3DChaserNode .prototype),
   X3DArrayChaserObject .prototype,
{
   getVector ()
   {
      return new Vector3 ();
   },
});

Object .defineProperties (CoordinateChaser,
{
   ... X3DNode .getStaticProperties ("CoordinateChaser", "Followers", 1, "children", "3.3"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_value",          new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_destination",    new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialValue",       new Fields .MFVec3f (new Vector3 ())),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialDestination", new Fields .MFVec3f (new Vector3 ())),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "duration",           new Fields .SFTime (1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "value_changed",      new Fields .MFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default CoordinateChaser;
