import X3DInfoArray from "./X3DInfoArray.js";
import X3DField     from "./X3DField.js";

function FieldArray (values = [ ])
{
   return X3DInfoArray .call (this, Array .from (values, value => [value .getName (), value]), X3DField);
}

Object .setPrototypeOf (FieldArray .prototype, X3DInfoArray .prototype);

for (const key of Object .keys (FieldArray .prototype))
   Object .defineProperty (FieldArray .prototype, key, { enumerable: false });

Object .defineProperties (FieldArray,
{
   typeName:
   {
      value: "FieldArray",
      enumerable: true,
   },
});

export default FieldArray;
