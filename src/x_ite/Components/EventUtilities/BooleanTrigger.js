import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DTriggerNode       from "./X3DTriggerNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function BooleanTrigger (executionContext)
{
   X3DTriggerNode .call (this, executionContext);

   this .addType (X3DConstants .BooleanTrigger);
}

Object .assign (Object .setPrototypeOf (BooleanTrigger .prototype, X3DTriggerNode .prototype),
{
   initialize ()
   {
      X3DTriggerNode .prototype .initialize .call (this);

      this ._set_triggerTime .addInterest ("set_triggerTime__", this);
   },
   set_triggerTime__ ()
   {
      this ._triggerTrue = true;
   },
});

Object .defineProperties (BooleanTrigger,
{
   ... X3DNode .getStaticProperties ("BooleanTrigger", "EventUtilities", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_triggerTime", new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "triggerTrue",     new Fields .SFBool ()),
      ]),
      enumerable: true,
   },
});

export default BooleanTrigger;
