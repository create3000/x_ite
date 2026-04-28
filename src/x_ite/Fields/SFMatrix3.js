import X3DField                  from "../Base/X3DField.js";
import SFMatrixPrototypeTemplate from "./SFMatrixPrototypeTemplate.js";
import Matrix3                   from "../../standard/Math/Numbers/Matrix3.js";
import SFVec3                    from "./SFVec3.js";

const { SFVec3d, SFVec3f } = SFVec3;

function SFMatrix3Template (TypeName, double)
{
   function SFMatrix3 (m00 = 1, m01 = 0, m02 = 0,
                       m10 = 0, m11 = 1, m12 = 0,
                       m20 = 0, m21 = 0, m22 = 1)
   {
      X3DField .call (this, new Matrix3 (+m00, +m01, +m02,
                                         +m10, +m11, +m12,
                                         +m20, +m21, +m22));
   }

   return SFMatrixPrototypeTemplate (SFMatrix3, TypeName, Matrix3, double,
   {
      setTransform: (() =>
      {
         const args = [ ];

         return function (translation, rotation, scale, scaleOrientation, center)
         {
            args .push (translation ?.getValue (), rotation, scale ?.getValue (), scaleOrientation, center ?.getValue ());

            for (let i = args .length - 1; i > -1; -- i)
            {
               if (args [i])
                  break;

               args .pop ();
            }

            this .getValue () .set (... args);

            args .length = 0;
         };
      })(),
      rotate (rotation)
      {
         return SFMatrix3 .fromValue (this .getValue () .copy () .rotate (rotation));
      },
      skewX (angle)
      {
         return SFMatrix3 .fromValue (this .getValue () .copy () .skewX (angle));
      },
      skewY (angle)
      {
         return SFMatrix3 .fromValue (this .getValue () .copy () .skewY (angle));
      },
   });
}

const SFMatrix3 = {
   SFMatrix3d: SFMatrix3Template ("SFMatrix3d", true),
   SFMatrix3f: SFMatrix3Template ("SFMatrix3f", false),
};

export default SFMatrix3;
