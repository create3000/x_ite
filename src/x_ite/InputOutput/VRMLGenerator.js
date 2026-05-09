import X3DGenerator from "./X3DGenerator.js";

function VRMLGenerator (options)
{
   X3DGenerator .call (this, options);
}

Object .assign (Object .setPrototypeOf (VRMLGenerator .prototype, X3DGenerator .prototype),
{
   NULL ()
   {
      this .CheckSpace ();
      this .string += "NULL";
      this .NeedsSpace ();
   },
});

for (const key of Object .keys (VRMLGenerator .prototype))
   Object .defineProperty (VRMLGenerator .prototype, key, { enumerable: false });

export default VRMLGenerator;
