import X3DField                  from "../Base/X3DField.js";
import SFMatrixPrototypeTemplate from "./SFMatrixPrototypeTemplate.js";
import Matrix4                   from "../../standard/Math/Numbers/Matrix4.js";

function SFMatrix4Template (TypeName, double)
{
   function SFMatrix4 (m00, m01, m02, m03,
                       m10, m11, m12, m13,
                       m20, m21, m22, m23,
                       m30, m31, m32, m33)
   {
      switch (arguments .length)
      {
         case 0:
            X3DField .call (this, new Matrix4 ());
            break;

         case 1:
            X3DField .call (this, arguments [0]);
            break;

         case 4:
         {
            const
               r0 = arguments [0],
               r1 = arguments [1],
               r2 = arguments [2],
               r3 = arguments [3];

            X3DField .call (this, new Matrix4 (r0 .x, r0 .y, r0 .z, r0 .w,
                                               r1 .x, r1 .y, r1 .z, r1 .w,
                                               r2 .x, r2 .y, r2 .z, r2 .w,
                                               r3 .x, r3 .y, r3 .z, r3 .w));

            break;
         }
         case 16:
         {
            X3DField .call (this, new Matrix4 (+m00, +m01, +m02, +m03,
                                               +m10, +m11, +m12, +m13,
                                               +m20, +m21, +m22, +m23,
                                               +m30, +m31, +m32, +m33));

            break;
         }
         default:
            throw new Error ("Invalid arguments.");
      }
   }

   return SFMatrixPrototypeTemplate (SFMatrix4, TypeName, Matrix4, double);
}

const SFMatrix4 = {
   SFMatrix4d: SFMatrix4Template ("SFMatrix4d", true),
   SFMatrix4f: SFMatrix4Template ("SFMatrix4f", false),
   VrmlMatrix: SFMatrix4Template ("VrmlMatrix", false),
};

export default SFMatrix4;
