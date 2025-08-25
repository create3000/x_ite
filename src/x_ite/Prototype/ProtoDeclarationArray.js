import X3DInfoArray        from "../Base/X3DInfoArray.js";
import X3DProtoDeclaration from "./X3DProtoDeclaration.js"

function ProtoDeclarationArray (values = [ ])
{
   return X3DInfoArray .call (this, Array .from (values, value => [value .name, value]), X3DProtoDeclaration);
}

Object .setPrototypeOf (ProtoDeclarationArray .prototype, X3DInfoArray .prototype);

for (const key of Object .keys (ProtoDeclarationArray .prototype))
   Object .defineProperty (ProtoDeclarationArray .prototype, key, { enumerable: false });

Object .defineProperties (ProtoDeclarationArray,
{
   typeName:
   {
      value: "ProtoDeclarationArray",
      enumerable: true,
   },
});

export default ProtoDeclarationArray;
