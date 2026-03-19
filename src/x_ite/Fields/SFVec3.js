import X3DField               from "../Base/X3DField.js";
import SFVecPrototypeTemplate from "./SFVecPrototypeTemplate.js";
import Vector3                from "../../standard/Math/Numbers/Vector3.js";

function SFVec3Template (TypeName, double)
{
   function SFVec3 (x, y, z)
   {
      switch (arguments .length)
      {
         case 0:
            X3DField .call (this, new Vector3 ());
            break;

         case 1:
            X3DField .call (this, arguments [0]);
            break;

         case 3:
            X3DField .call (this, new Vector3 (+x, +y, +z));
            break;

         default:
            throw new Error ("Invalid arguments.");
      }
   }

   Object .defineProperties (SFVec3,
   {
      X_AXIS:
      {
         value: new SFVec3 (1, 0, 0),
         enumerable: true,
      },
      Y_AXIS:
      {
         value: new SFVec3 (0, 1, 0),
         enumerable: true,
      },
      Z_AXIS:
      {
         value: new SFVec3 (0, 0, 1),
         enumerable: true,
      },
   });

   return SFVecPrototypeTemplate (SFVec3, TypeName, Vector3, double,
   {
      cross (vector)
      {
         return new (this .constructor) (this .getValue () .copy () .cross (vector .getValue ()));
      },
   });
}

const SFVec3 = {
   SFVec3d: SFVec3Template ("SFVec3d", true),
   SFVec3f: SFVec3Template ("SFVec3f", false),
};

export default SFVec3;
