import X3DInfoArray from "../Base/X3DInfoArray.js";

function FieldTypesArray (values = [ ])
{
   return X3DInfoArray .call (this, Array .from (values, value => [value .typeName, value]), Function);
}

Object .setPrototypeOf (FieldTypesArray .prototype, X3DInfoArray .prototype);

for (const key of Object .keys (FieldTypesArray .prototype))
   Object .defineProperty (FieldTypesArray .prototype, key, { enumerable: false });

Object .defineProperties (FieldTypesArray,
{
   typeName:
   {
      value: "FieldTypesArray",
      enumerable: true,
   },
});

export default FieldTypesArray;
