import X3DInfoArray from "../Base/X3DInfoArray.js";
import SFNode       from "../Fields/SFNode.js";

function NamedNodesArray (values = [ ])
{
   return X3DInfoArray .call (this, Array .from (values, value => [value .getNodeName (), value]), SFNode);
}

Object .setPrototypeOf (NamedNodesArray .prototype, X3DInfoArray .prototype);

for (const key of Object .keys (NamedNodesArray .prototype))
   Object .defineProperty (NamedNodesArray .prototype, key, { enumerable: false });

Object .defineProperties (NamedNodesArray,
{
   typeName:
   {
      value: "NamedNodesArray",
      enumerable: true,
   },
});

export default NamedNodesArray;
