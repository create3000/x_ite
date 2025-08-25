import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "./X3DNode.js";
import X3DMetadataObject    from "./X3DMetadataObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import LATEST_VERSION       from "../../LATEST_VERSION.js";

function MetadataSet (executionContext)
{
   X3DNode           .call (this, executionContext);
   X3DMetadataObject .call (this, executionContext);

   this .addType (X3DConstants .MetadataSet);
}

Object .assign (Object .setPrototypeOf (MetadataSet .prototype, X3DNode .prototype),
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
   getMetaValue (name)
   {
      return this ._value .find (node => node .name === name);
   },
   setMetaValue (name, value)
   {
      if (!Array .isArray (value))
         value = [value .valueOf ()];

      switch (value .type ?? (typeof value [0]))
      {
         case "boolean":
         {
            this .getMetadataObject ("MetadataBoolean", name, true) .value = value;
            return;
         }
         case "number":
         case "double":
         {
            this .getMetadataObject ("MetadataDouble", name, true) .value = value;
            break;
         }
         case "float":
         {
            this .getMetadataObject ("MetadataFloat", name, true) .value = value;
            break;
         }
         case "integer":
         {
            this .getMetadataObject ("MetadataInteger", name, true) .value = value;
            break;
         }
         case "string":
         {
            this .getMetadataObject ("MetadataString", name, true) .value = value;
            return;
         }
      }
   },
   removeMetaValue (name)
   {
      const index = this ._value .findIndex (node => node .name === name);

      if (index < 0)
         return;

      this ._value .splice (index, 1);
   },
   getMetadataObject (typeName, name, create = false)
   {
      let metadata = this .getMetaValue (name);

      if (metadata ?.getNodeTypeName () === typeName)
         return metadata;

      if (!create)
         return null;

      if (metadata)
         this .removeMetaValue (name);

      metadata = this .getExecutionContext () .createNode (typeName);

      metadata .reference = this .getBrowser () .getBrowserOption ("MetadataReference");
      metadata .name      = name;

      this ._value .push (metadata);

      return metadata;
   },
   dispose ()
   {
      X3DMetadataObject .prototype .dispose .call (this);
      X3DNode           .prototype .dispose .call (this);
   },
});

Object .defineProperties (MetadataSet,
{
   ... X3DNode .getStaticProperties ("MetadataSet", "Core", 1, "value", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "name",      new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "reference", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "value",     new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default MetadataSet;
