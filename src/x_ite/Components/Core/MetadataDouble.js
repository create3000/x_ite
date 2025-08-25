import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "./X3DNode.js";
import X3DMetadataObject    from "./X3DMetadataObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import LATEST_VERSION       from "../../LATEST_VERSION.js";

function MetadataDouble (executionContext)
{
   X3DNode           .call (this, executionContext);
   X3DMetadataObject .call (this, executionContext);

   this .addType (X3DConstants .MetadataDouble);
}

Object .assign (Object .setPrototypeOf (MetadataDouble .prototype, X3DNode .prototype),
   X3DMetadataObject .prototype,
{
   initialize ()
   {
      X3DNode           .prototype .initialize .call (this);
      X3DMetadataObject .prototype .initialize .call (this);
   },
   getContainerField (specificationVersion = LATEST_VERSION)
   {
      if (specificationVersion <= 3.3)
         return "metadata";

      return X3DNode .prototype .getContainerField .call (this);
   },
   dispose ()
   {
      X3DMetadataObject .prototype .dispose .call (this);
      X3DNode           .prototype .dispose .call (this);
   },
});

Object .defineProperties (MetadataDouble,
{
   ... X3DNode .getStaticProperties ("MetadataDouble", "Core", 1, "value", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "name",      new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "reference", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "value",     new Fields .MFDouble ()),
      ]),
      enumerable: true,
   },
});

export default MetadataDouble;
