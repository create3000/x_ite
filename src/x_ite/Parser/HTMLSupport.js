import X3DConstants from "../Base/X3DConstants.js";

const
   nodeTypeNames = new Map (), // (TYPENAME -> TypeName)
   fieldNames    = new Map (); // (fieldname -> fieldName)

const HTMLSupport =
{
   addConcreteNode ({ typeName, fieldDefinitions })
   {
      if (nodeTypeNames .has (typeName))
         return;

      this .addNodeTypeName (typeName);

      for (const { name, accessType } of fieldDefinitions)
      {
         if (accessType & X3DConstants .initializeOnly)
            this .addFieldName (name)
      }
   },
   addNodeTypeName (typeName)
   {
      nodeTypeNames .set (typeName,                 typeName);
      nodeTypeNames .set (typeName .toUpperCase (), typeName);
   },
   getNodeTypeName (typeName)
   {
      return nodeTypeNames .get (typeName);
   },
   addFieldName (name)
   {
      fieldNames .set (name,                 name);
      fieldNames .set (name .toLowerCase (), name);
   },
   getFieldName (name)
   {
      return fieldNames .get (name);
   },
};

HTMLSupport .addNodeTypeName ("ProtoInstance");

export default HTMLSupport;
