import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function BooleanToggle (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .BooleanToggle);
}

Object .assign (Object .setPrototypeOf (BooleanToggle .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      this ._set_boolean .addInterest ("set_boolean__", this);
   },
   set_boolean__ ()
   {
      if (this ._set_boolean .getValue ())
         this ._toggle = ! this ._toggle .getValue ();
   },
});

Object .defineProperties (BooleanToggle,
{
   ... X3DNode .getStaticProperties ("BooleanToggle", "EventUtilities", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_boolean", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "toggle",      new Fields .SFBool ()),
      ]),
      enumerable: true,
   },
});

export default BooleanToggle;
