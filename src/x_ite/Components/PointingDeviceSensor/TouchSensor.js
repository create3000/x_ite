import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DTouchSensorNode   from "./X3DTouchSensorNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function TouchSensor (executionContext)
{
   X3DTouchSensorNode .call (this, executionContext);

   this .addType (X3DConstants .TouchSensor);

   // Units

   this ._hitPoint_changed .setUnit ("length");
}

Object .setPrototypeOf (TouchSensor .prototype, X3DTouchSensorNode .prototype);

Object .defineProperties (TouchSensor,
{
   ... X3DNode .getStaticProperties ("TouchSensor", "PointingDeviceSensor", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",         new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "hitTexCoord_changed", new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "hitNormal_changed",   new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "hitPoint_changed",    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isOver",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",            new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "touchTime",           new Fields .SFTime ()),
      ]),
      enumerable: true,
   },
});

export default TouchSensor;
