import X3DObject from "./X3DObject.js";

function X3DFieldDefinition (accessType, name, value)
{
   Object .defineProperties (this,
   {
      accessType: { value: accessType, enumerable: true },
      dataType: { value: value .getType (), enumerable: true },
      name: { value: name, enumerable: true },
      value: { value: value },
   });
}

Object .setPrototypeOf (X3DFieldDefinition .prototype, X3DObject .prototype);

for (const key of Object .keys (X3DFieldDefinition .prototype))
   Object .defineProperty (X3DFieldDefinition .prototype, key, { enumerable: false });

Object .defineProperties (X3DFieldDefinition,
{
   typeName:
   {
      value: "X3DFieldDefinition",
      enumerable: true,
   },
});

export default X3DFieldDefinition;
