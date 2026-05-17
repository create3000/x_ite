import X3DField               from "../Base/X3DField.js";
import SFVecPrototypeTemplate from "./SFVecPrototypeTemplate.js";
import Vector3                from "../../standard/Math/Numbers/Vector3.js";

function SFVec3Template (TypeName, double)
{
   function SFVec3 (x = 0, y = 0, z = 0)
   {
      X3DField .call (this, new Vector3 (+x, +y, +z));
   }

   SFVecPrototypeTemplate (SFVec3, TypeName, Vector3, double,
   {
      cross (vector)
      {
         return SFVec3 .fromValue (this .getValue () .copy () .cross (vector .getValue ()));
      },
   });

   return SFVec3;
}

const SFVec3 = {
   SFVec3d: SFVec3Template ("SFVec3d", true),
   SFVec3f: SFVec3Template ("SFVec3f", false),
};

export default SFVec3;
