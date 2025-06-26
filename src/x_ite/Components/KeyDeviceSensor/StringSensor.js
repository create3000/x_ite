import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DKeyDeviceSensorNode from "./X3DKeyDeviceSensorNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";

function StringSensor (executionContext)
{
   X3DKeyDeviceSensorNode .call (this, executionContext);

   this .addType (X3DConstants .StringSensor);
}

Object .assign (Object .setPrototypeOf (StringSensor .prototype, X3DKeyDeviceSensorNode .prototype),
{
   keydown (event)
   {
      event .preventDefault ();

      switch (event .key)
      {
         case "Backspace":
         {
            if (this ._isActive .getValue ())
            {
               if (this ._deletionAllowed .getValue ())
               {
                  if (this ._enteredText .length)
                     this ._enteredText = this ._enteredText .getValue () .substring (0, this ._enteredText .length - 1);
               }
            }

            break;
         }
         case "Enter":
         {
            this ._finalText = this ._enteredText;

            this ._enteredText .set ("");

            if (this ._isActive .getValue ())
               this ._isActive = false;

            break;
         }
         case "Escape":
         {
            this ._enteredText .set ("");

            if (this ._isActive .getValue ())
               this ._isActive = false;

            break;
         }
         case "Tab":
         {
            break;
         }
         default:
         {
            if (event .charCode || event .keyCode)
            {
               if (event .key .length === 1)
               {
                  if (! this ._isActive .getValue ())
                  {
                     this ._isActive    = true;
                     this ._enteredText = "";
                  }

                  this ._enteredText = this ._enteredText .getValue () + event .key;
               }
            }

            break;
         }
      }
   },
});

Object .defineProperties (StringSensor,
{
   ... X3DNode .getStaticProperties ("StringSensor", "KeyDeviceSensor", 2, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",     new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",         new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "deletionAllowed", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "enteredText",     new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "finalText",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",        new Fields .SFBool ()),
      ]),
      enumerable: true,
   },
});

export default StringSensor;
