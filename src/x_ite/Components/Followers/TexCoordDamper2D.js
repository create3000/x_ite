import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DDamperNode            from "./X3DDamperNode.js";
import X3DArrayFollowerTemplate from "../../Browser/Followers/X3DArrayFollowerTemplate.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import Vector2                  from "../../../standard/Math/Numbers/Vector2.js";

const X3DArrayFollowerObject = X3DArrayFollowerTemplate (X3DDamperNode);

function TexCoordDamper2D (executionContext)
{
   X3DDamperNode          .call (this, executionContext);
   X3DArrayFollowerObject .call (this, executionContext);

   this .addType (X3DConstants .TexCoordDamper2D);
}

Object .assign (Object .setPrototypeOf (TexCoordDamper2D .prototype, X3DDamperNode .prototype),
   X3DArrayFollowerObject .prototype,
{
   getVector ()
   {
      return new Vector2 ();
   },
});

Object .defineProperties (TexCoordDamper2D,
{
   ... X3DNode .getStaticProperties ("TexCoordDamper2D", "Followers", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_value",          new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_destination",    new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialValue",       new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialDestination", new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "order",              new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tau",                new Fields .SFTime (0.3)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tolerance",          new Fields .SFFloat (-1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "value_changed",      new Fields .MFVec2f ()),
      ]),
      enumerable: true,
   },
});

export default TexCoordDamper2D;
