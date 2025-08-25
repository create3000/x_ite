import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DTriggerNode       from "./X3DTriggerNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function IntegerTrigger (executionContext)
{
   X3DTriggerNode .call (this, executionContext);

   this .addType (X3DConstants .IntegerTrigger);
}

Object .assign (Object .setPrototypeOf (IntegerTrigger .prototype, X3DTriggerNode .prototype),
{
   initialize ()
   {
      X3DTriggerNode .prototype .initialize .call (this);

      this ._set_boolean .addInterest ("set_boolean__", this);
   },
   set_boolean__ ()
   {
      this ._triggerValue = this ._integerKey;
   },
});

Object .defineProperties (IntegerTrigger,
{
   ... X3DNode .getStaticProperties ("IntegerTrigger", "EventUtilities", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_boolean",  new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "integerKey",   new Fields .SFInt32 (-1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "triggerValue", new Fields .SFInt32 ()),
      ]),
      enumerable: true,
   },
});

export default IntegerTrigger;
