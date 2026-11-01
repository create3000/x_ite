import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import * as Interactivity   from "../../../../node_modules/@khronosgroup/gltf-interactivity-engine/build/index.js";

console .log (Interactivity)

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function BehaviorEngine (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .BehaviorEngine);

   // Private properties
}

Object .assign (Object .setPrototypeOf (BehaviorEngine .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      this .engine = new Interactivity .BasicBehaveEngine ();
   },
});

Object .defineProperties (BehaviorEngine,
{
   ... X3DNode .getStaticProperties ("BehaviorEngine", "X_ITE", 1, "children", "4.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "graph",    new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "graphs",   new Fields .MFString ()),
      ]),
      enumerable: true,
   },
});

export default BehaviorEngine;
