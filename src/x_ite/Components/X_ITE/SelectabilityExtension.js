import Fields                      from "../../Fields.js";
import X3DFieldDefinition          from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray        from "../../Base/FieldDefinitionArray.js";
import X3DNode                     from "../Core/X3DNode.js";
import X3DPointingDeviceSensorNode from "../PointingDeviceSensor/X3DPointingDeviceSensorNode.js";
import X3DConstants                from "../../Base/X3DConstants.js";

function SelectabilityExtension (executionContext)
{
   X3DPointingDeviceSensorNode .call (this, executionContext);

   this .addType (X3DConstants .SelectabilityExtension);

   this .addChildObjects (X3DConstants .outputOnly, "isOver",   new Fields .SFBool (),
                          X3DConstants .outputOnly, "isActive", new Fields .SFBool ());
}

Object .assign (Object .setPrototypeOf (SelectabilityExtension .prototype, X3DPointingDeviceSensorNode .prototype),
{
   initialize ()
   {
      X3DPointingDeviceSensorNode .prototype .initialize .call (this);
   },
});

Object .defineProperties (SelectabilityExtension,
{
   ... X3DNode .getStaticProperties ("SelectabilityExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",     new Fields .SFBool (true)),
      ]),
      enumerable: true,
   },
});

export default SelectabilityExtension;
