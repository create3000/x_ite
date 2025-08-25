import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DChaserNode          from "./X3DChaserNode.js";
import X3DArrayChaserTemplate from "../../Browser/Followers/X3DArrayChaserTemplate.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import Vector2                from "../../../standard/Math/Numbers/Vector2.js";

const X3DArrayChaserObject = X3DArrayChaserTemplate (X3DChaserNode);

function TexCoordChaser2D (executionContext)
{
   X3DChaserNode        .call (this, executionContext);
   X3DArrayChaserObject .call (this, executionContext);

   this .addType (X3DConstants .TexCoordChaser2D);
}

Object .assign (Object .setPrototypeOf (TexCoordChaser2D .prototype, X3DChaserNode .prototype),
   X3DArrayChaserObject .prototype,
{
   getVector ()
   {
      return new Vector2 ();
   },
});

Object .defineProperties (TexCoordChaser2D,
{
   ... X3DNode .getStaticProperties ("TexCoordChaser2D", "Followers", 1, "children", "3.3"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_value",          new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_destination",    new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialValue",       new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialDestination", new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "duration",           new Fields .SFTime (1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "value_changed",      new Fields .MFVec2f ()),
      ]),
      enumerable: true,
   },
});

export default TexCoordChaser2D;
