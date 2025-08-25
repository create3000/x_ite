import X3DInfoArray from "../Base/X3DInfoArray.js";
import UnitInfo     from "./UnitInfo.js"

function UnitInfoArray (values = [ ])
{
   return X3DInfoArray .call (this, Array .from (values, value => [value .category, value]), UnitInfo);
}

Object .setPrototypeOf (UnitInfoArray .prototype, X3DInfoArray .prototype);

for (const key of Object .keys (UnitInfoArray .prototype))
   Object .defineProperty (UnitInfoArray .prototype, key, { enumerable: false });

Object .defineProperties (UnitInfoArray,
{
   typeName:
   {
      value: "UnitInfoArray",
      enumerable: true,
   },
});

export default UnitInfoArray;
