import X3DField               from "../Base/X3DField.js";
import SFVecPrototypeTemplate from "./SFVecPrototypeTemplate.js";
import Vector4                from "../../standard/Math/Numbers/Vector4.js";

function SFVec4Template (TypeName, double)
{
   function SFVec4 (x, y, z, w)
   {
      switch (arguments .length)
      {
         case 0:
            X3DField .call (this, new Vector4 (0, 0, 0, 1));
            break;

         case 1:
            X3DField .call (this, arguments [0]);
            break;

         case 4:
            X3DField .call (this, new Vector4 (+x, +y, +z, +w));
            break;

         default:
            throw new Error ("Invalid arguments.");
      }
   }

   return SFVecPrototypeTemplate (SFVec4, TypeName, Vector4, double,
   {
      isDefaultValue ()
      {
         return this .getValue () .equals (Vector4 .wAxis);
      },
   });
}

const SFVec4 = {
   SFVec4d: SFVec4Template ("SFVec4d", true),
   SFVec4f: SFVec4Template ("SFVec4f", false),
};

export default SFVec4;
