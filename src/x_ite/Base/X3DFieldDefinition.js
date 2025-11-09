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

Object .assign (Object .setPrototypeOf (X3DFieldDefinition .prototype, X3DObject .prototype),
{
   getAccessType ()
   {
      return this [_accessType];
   },
   getDataType ()
   {
      return this [_value] .getType ();
   },
   getName ()
   {
      return this [_name];
   },
   getValue ()
   {
      return this [_value];
   },
   getAppInfo ()
   {
      return this [_value] .getAppInfo ();
   },
   getDocumentation ()
   {
      return this [_value] .getDocumentation ();
   },
   setDocumentation (value)
   {
      this [_value] .setDocumentation (value);
   },
});

for (const key of Object .keys (X3DFieldDefinition .prototype))
   Object .defineProperty (X3DFieldDefinition .prototype, key, { enumerable: false });

Object .defineProperties (X3DFieldDefinition .prototype,
{
   accessType:
   {
      get: X3DFieldDefinition .prototype .getAccessType,
      enumerable: true,
   },
   dataType:
   {
      get: X3DFieldDefinition .prototype .getDataType,
      enumerable: true,
   },
   name:
   {
      get: X3DFieldDefinition .prototype .getName,
      enumerable: true,
   },
   value:
   {
      get () { return this .getValue () .valueOf (); },
      enumerable: true,
   },
   appInfo:
   {
      get: X3DFieldDefinition .prototype .getAppInfo,
      set: X3DFieldDefinition .prototype .setAppInfo,
      enumerable: true,
   },
   documentation:
   {
      get: X3DFieldDefinition .prototype .getDocumentation,
      set: X3DFieldDefinition .prototype .setDocumentation,
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
