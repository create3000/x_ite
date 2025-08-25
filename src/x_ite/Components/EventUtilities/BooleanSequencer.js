import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DSequencerNode     from "./X3DSequencerNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function BooleanSequencer (executionContext)
{
   X3DSequencerNode .call (this, executionContext);

   this .addType (X3DConstants .BooleanSequencer);
}

Object .assign (Object .setPrototypeOf (BooleanSequencer .prototype, X3DSequencerNode .prototype),
{
   initialize ()
   {
      X3DSequencerNode .prototype .initialize .call (this);

      this ._keyValue .addInterest ("set_index__", this);
   },
   getSize ()
   {
      return this ._keyValue .length;
   },
   sequence (index)
   {
      this ._value_changed = this ._keyValue [index];
   },
});

Object .defineProperties (BooleanSequencer,
{
   ... X3DNode .getStaticProperties ("BooleanSequencer", "EventUtilities", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "previous",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "next",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "key",           new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "keyValue",      new Fields .MFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed", new Fields .SFBool ()),
      ]),
      enumerable: true,
   },
});

export default BooleanSequencer;
