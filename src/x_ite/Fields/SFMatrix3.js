import X3DField                  from "../Base/X3DField.js";
import SFMatrixPrototypeTemplate from "./SFMatrixPrototypeTemplate.js";
import Matrix3                   from "../../standard/Math/Numbers/Matrix3.js";

function SFMatrix3Template (TypeName, double)
{
   function SFMatrix3 (m00, m01, m02,
                       m10, m11, m12,
                       m20, m21, m22)
   {
      switch (arguments .length)
      {
         case 0:
            X3DField .call (this, new Matrix3 ());
            break;

         case 1:
            X3DField .call (this, arguments [0]);
            break;

         case 3:
         {
            const
               r0 = arguments [0],
               r1 = arguments [1],
               r2 = arguments [2];

            X3DField .call (this, new Matrix3 (r0 .x, r0 .y, r0 .z,
                                               r1 .x, r1 .y, r1 .z,
                                               r2 .x, r2 .y, r2 .z));

            break;
         }
         case 9:
         {
            X3DField .call (this, new Matrix3 (+m00, +m01, +m02,
                                               +m10, +m11, +m12,
                                               +m20, +m21, +m22));

            break;
         }
         default:
            throw new Error ("Invalid arguments.");
      }
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
         return new (this .constructor) (this .getValue () .copy () .rotate (rotation));
      },
      skewX (angle)
      {
         return new (this .constructor) (this .getValue () .copy () .skewX (angle));
      },
      skewY (angle)
      {
         return new (this .constructor) (this .getValue () .copy () .skewY (angle));
      },
   });
}

const SFMatrix3 = {
   SFMatrix3d: SFMatrix3Template ("SFMatrix3d", true),
   SFMatrix3f: SFMatrix3Template ("SFMatrix3f", false),
};

export default SFMatrix3;
