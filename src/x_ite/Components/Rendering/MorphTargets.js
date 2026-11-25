import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DGeometricPropertyNode from "./X3DGeometricPropertyNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function MorphTargets (executionContext)
{
   X3DGeometricPropertyNode .call (this, executionContext);

   this .addType (X3DConstants .MorphTargets);
}

Object .assign (Object .setPrototypeOf (MorphTargets .prototype, X3DGeometricPropertyNode .prototype),
{
   initialize ()
   {
      X3DGeometricPropertyNode .prototype .initialize .call (this);
   },
});

Object .defineProperties (MorphTargets,
{
   ... X3DNode .getStaticProperties ("MorphTargets", "Rendering", 5, "targets", "4.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "weights",  new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "targets",  new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default MorphTargets;
