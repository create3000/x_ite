import X3DInfoArray from "../Base/X3DInfoArray.js";

function SupportedFieldsArray (values = [ ])
{
   return X3DInfoArray .call (this, Array .from (values, value => [value .typeName, value]), Function);
}

Object .setPrototypeOf (SupportedFieldsArray .prototype, X3DInfoArray .prototype);

for (const key of Object .keys (SupportedFieldsArray .prototype))
   Object .defineProperty (SupportedFieldsArray .prototype, key, { enumerable: false });

Object .defineProperties (SupportedFieldsArray,
{
   typeName:
   {
      value: "SupportedFieldsArray",
      enumerable: true,
   },
});

export default SupportedFieldsArray;
