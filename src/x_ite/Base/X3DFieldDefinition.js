import X3DObject from "./X3DObject.js";

const
   _accessType = Symbol (),
   _name       = Symbol (),
   _value      = Symbol ();

function X3DFieldDefinition (accessType, name, value)
{
   this [_accessType] = accessType;
   this [_name]       = name;
   this [_value]      = value;
}

Object .setPrototypeOf (X3DFieldDefinition .prototype, X3DObject .prototype);

for (const key of Object .keys (X3DFieldDefinition .prototype))
   Object .defineProperty (X3DFieldDefinition .prototype, key, { enumerable: false });

Object .defineProperties (X3DFieldDefinition .prototype,
{
   accessType:
   {
      get () { return this [_accessType]; },
      enumerable: true,
   },
   dataType:
   {
      get () { return this [_value] .getType (); },
      enumerable: true,
   },
   name:
   {
      get () { return this [_name]; },
      enumerable: true,
   },
   value:
   {
      get () { return this [_value]; },
   },
   appInfo:
   {
      get () { return this [_value] .getAppInfo (); },
      enumerable: true,
   },
   documentation:
   {
      get () { return this [_value] .getDocumentation (); },
      enumerable: true,
   },
});

Object .defineProperties (X3DFieldDefinition,
{
   typeName:
   {
      value: "X3DFieldDefinition",
      enumerable: true,
   },
});

export default X3DFieldDefinition;
