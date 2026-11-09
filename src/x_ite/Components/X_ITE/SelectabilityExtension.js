import Fields                     from "../../Fields.js";
import X3DFieldDefinition         from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray       from "../../Base/FieldDefinitionArray.js";
import X3DNode                    from "../Core/X3DNode.js";
import X3DInteractivitySensorNode from "./X3DInteractivitySensorNode.js";
import X3DConstants               from "../../Base/X3DConstants.js";
import PointingType               from "../../Browser/PointingDeviceSensor/PointingType.js";

function SelectabilityExtension (executionContext)
{
   X3DInteractivitySensorNode .call (this, executionContext);

   this .addType (X3DConstants .SelectabilityExtension);
}

Object .assign (Object .setPrototypeOf (SelectabilityExtension .prototype, X3DInteractivitySensorNode .prototype),
{
   push (renderObject, sensors)
   {
      X3DInteractivitySensorNode .prototype .push .call (this, renderObject, sensors);

      return this .getBrowser () .getHit () .type === PointingType .RELEASE
         ? this ._selectable .getValue ()
         : true;
   },
});

Object .defineProperties (SelectabilityExtension,
{
   ... X3DNode .getStaticProperties ("SelectabilityExtension", "X_ITE", 1, "children", "4.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "selectable",  new Fields .SFBool (true)),
      ]),
      enumerable: true,
   },
});

export default SelectabilityExtension;
