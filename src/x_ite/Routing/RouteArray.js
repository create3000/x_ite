import X3DInfoArray from "../Base/X3DInfoArray.js";
import X3DRoute     from "./X3DRoute.js";

function RouteArray (values = [ ])
{
   return X3DInfoArray .call (this, Array .from (values, value => [value .getId (), value]), X3DRoute);
}

Object .setPrototypeOf (RouteArray .prototype, X3DInfoArray .prototype);

for (const key of Object .keys (RouteArray .prototype))
   Object .defineProperty (RouteArray .prototype, key, { enumerable: false });

Object .defineProperties (RouteArray,
{
   typeName:
   {
      value: "RouteArray",
      enumerable: true,
   },
});

export default RouteArray;
