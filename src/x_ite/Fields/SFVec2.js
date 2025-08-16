import X3DField               from "../Base/X3DField.js";
import SFVecPrototypeTemplate from "./SFVecPrototypeTemplate.js";
import Vector2                from "../../standard/Math/Numbers/Vector2.js";

function SFVec2Template (TypeName, double)
{
   function SFVec2 (x, y)
   {
      switch (arguments .length)
      {
         case 0:
            X3DField .call (this, new Vector2 ());
            break;

         case 1:
            X3DField .call (this, arguments [0]);
            break;

         case 2:
            X3DField .call (this, new Vector2 (+x, +y));
            break;

         default:
            throw new Error ("Invalid arguments.");
      }
   }

   return SFVecPrototypeTemplate (SFVec2, TypeName, Vector2, double);
}

const SFVec2 = {
   SFVec2d: SFVec2Template ("SFVec2d", true),
   SFVec2f: SFVec2Template ("SFVec2f", false),
};

export default SFVec2;
