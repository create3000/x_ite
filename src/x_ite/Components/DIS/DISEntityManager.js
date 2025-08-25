import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

/**
 * THIS NODE IS NOT SUPPORTED.
 */

function DISEntityManager (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .DISEntityManager);

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
      this .addAlias ("mapping", this ._children);
}

Object .setPrototypeOf (DISEntityManager .prototype, X3DChildNode .prototype);

Object .defineProperties (DISEntityManager,
{
   ... X3DNode .getStaticProperties ("DISEntityManager", "DIS", 2, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "address",         new Fields .SFString ("localhost")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "applicationID",   new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "children",        new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "port",            new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "siteID",          new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "addedEntities",   new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "removedEntities", new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default DISEntityManager;
