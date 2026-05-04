import X3DField               from "../Base/X3DField.js";
import SFVecPrototypeTemplate from "./SFVecPrototypeTemplate.js";
import Vector2                from "../../standard/Math/Numbers/Vector2.js";

function SFVec2Template (TypeName, double)
{
   function SFVec2 (x = 0, y = 0)
   {
      X3DField .call (this, new Vector2 (+x, +y));
   }

   SFVecPrototypeTemplate (SFVec2, TypeName, Vector2, double)

   Object .defineProperties (SFVec2, Object .fromEntries ([
      "X_AXIS",
      "Y_AXIS",
   ]
   .map (key => [key, { value: SFVec2 .fromValue (Vector2 [key]), enumerable: true }])));

   return SFVec2;
}

const SFVec2 = {
   SFVec2d: SFVec2Template ("SFVec2d", true),
   SFVec2f: SFVec2Template ("SFVec2f", false),
};

export default SFVec2;
