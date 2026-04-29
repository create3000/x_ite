import X3DField                  from "../Base/X3DField.js";
import SFMatrixPrototypeTemplate from "./SFMatrixPrototypeTemplate.js";
import Matrix4                   from "../../standard/Math/Numbers/Matrix4.js";

function SFMatrix4Template (TypeName, double)
{
   function SFMatrix4 (m00 = 1, m01 = 0, m02 = 0, m03 = 0,
                       m10 = 0, m11 = 1, m12 = 0, m13 = 0,
                       m20 = 0, m21 = 0, m22 = 1, m23 = 0,
                       m30 = 0, m31 = 0, m32 = 0, m33 = 1)
   {
      X3DField .call (this, new Matrix4 (+m00, +m01, +m02, +m03,
                                         +m10, +m11, +m12, +m13,
                                         +m20, +m21, +m22, +m23,
                                         +m30, +m31, +m32, +m33));
   }

   return SFMatrixPrototypeTemplate (SFMatrix4, TypeName, Matrix4, double);
}

const SFMatrix4 = {
   SFMatrix4d: SFMatrix4Template ("SFMatrix4d", true),
   SFMatrix4f: SFMatrix4Template ("SFMatrix4f", false),
   VrmlMatrix: SFMatrix4Template ("VrmlMatrix", false),
};

export default SFMatrix4;
