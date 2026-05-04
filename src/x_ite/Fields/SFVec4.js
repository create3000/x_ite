import X3DField               from "../Base/X3DField.js";
import SFVecPrototypeTemplate from "./SFVecPrototypeTemplate.js";
import Vector4                from "../../standard/Math/Numbers/Vector4.js";

function SFVec4Template (TypeName, double)
{
   function SFVec4 (x = 0, y = 0, z = 0, w = 1)
   {
      X3DField .call (this, new Vector4 (+x, +y, +z, +w));
   }

   SFVecPrototypeTemplate (SFVec4, TypeName, Vector4, double,
   {
      isDefaultValue ()
      {
         return this .getValue () .equals (Vector4 .W_AXIS);
      },
   });

   Object .defineProperties (SFVec4, Object .fromEntries ([
      "X_AXIS",
      "Y_AXIS",
      "Z_AXIS",
      "W_AXIS",
   ]
   .map (key => [key, { value: SFVec4 .fromValue (Vector4 [key]), enumerable: true }])));

   return SFVec4;
}

const SFVec4 = {
   SFVec4d: SFVec4Template ("SFVec4d", true),
   SFVec4f: SFVec4Template ("SFVec4f", false),
};

export default SFVec4;
