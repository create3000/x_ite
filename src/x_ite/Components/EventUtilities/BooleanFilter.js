import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function BooleanFilter (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .BooleanFilter);
}

Object .assign (Object .setPrototypeOf (BooleanFilter .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      this ._set_boolean .addInterest ("set_boolean__", this);
   },
   set_boolean__ ()
   {
      const value = this ._set_boolean .getValue ();

      if (value)
         this ._inputTrue = true;

      else
         this ._inputFalse = false;

      this ._inputNegate = ! value;
   },
});

Object .defineProperties (BooleanFilter,
{
   ... X3DNode .getStaticProperties ("BooleanFilter", "EventUtilities", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_boolean", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "inputTrue",   new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "inputFalse",  new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "inputNegate", new Fields .SFBool ()),
      ]),
      enumerable: true,
   },
});

export default BooleanFilter;
