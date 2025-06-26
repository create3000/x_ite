import X3DInfoArray       from "./X3DInfoArray.js";
import X3DFieldDefinition from "./X3DFieldDefinition.js"

function FieldDefinitionArray (values = [ ])
{
   return X3DInfoArray .call (this, Array .from (values, value => [value .name, value]), X3DFieldDefinition);
}

Object .setPrototypeOf (FieldDefinitionArray .prototype, X3DInfoArray .prototype);

for (const key of Object .keys (FieldDefinitionArray .prototype))
   Object .defineProperty (FieldDefinitionArray .prototype, key, { enumerable: false });

Object .defineProperties (FieldDefinitionArray,
{
   typeName:
   {
      value: "FieldDefinitionArray",
      enumerable: true,
   },
});

export default FieldDefinitionArray;
