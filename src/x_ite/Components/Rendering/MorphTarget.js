import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function MorphTarget (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .MorphTarget);
}

Object .assign (Object .setPrototypeOf (MorphTarget .prototype, X3DNode .prototype),
{
   initialize ()
   {
      X3DNode .prototype .initialize .call (this);
   },
});

Object .defineProperties (MorphTarget,
{
   ... X3DNode .getStaticProperties ("MorphTarget", "Rendering", 5, "targets", "4.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "displacements", new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default MorphTarget;
