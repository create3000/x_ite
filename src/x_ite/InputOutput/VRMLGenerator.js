import X3DGenerator from "./X3DGenerator.js";

function VRMLGenerator (options)
{
   X3DGenerator .call (this, options);
}

Object .setPrototypeOf (VRMLGenerator .prototype, X3DGenerator .prototype);

for (const key of Object .keys (VRMLGenerator .prototype))
   Object .defineProperty (VRMLGenerator .prototype, key, { enumerable: false });

export default VRMLGenerator;
