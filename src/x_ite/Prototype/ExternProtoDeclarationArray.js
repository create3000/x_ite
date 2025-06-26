import X3DInfoArray              from "../Base/X3DInfoArray.js";
import X3DExternProtoDeclaration from "./X3DExternProtoDeclaration.js"

function ExternProtoDeclarationArray (values = [ ])
{
   return X3DInfoArray .call (this, Array .from (values, value => [value .name, value]), X3DExternProtoDeclaration);
}

Object .setPrototypeOf (ExternProtoDeclarationArray .prototype, X3DInfoArray .prototype);

for (const key of Object .keys (ExternProtoDeclarationArray .prototype))
   Object .defineProperty (ExternProtoDeclarationArray .prototype, key, { enumerable: false });

Object .defineProperties (ExternProtoDeclarationArray,
{
   typeName:
   {
      value: "ExternProtoDeclarationArray",
      enumerable: true,
   },
});

export default ExternProtoDeclarationArray;
