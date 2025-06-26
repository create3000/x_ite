import X3DInfoArray    from "../Base/X3DInfoArray.js";
import X3DExportedNode from "./X3DExportedNode.js"

function ExportedNodesArray (values = [ ])
{
   return X3DInfoArray .call (this, Array .from (values, value => [value .getExportedName (), value]), X3DExportedNode);
}

Object .setPrototypeOf (ExportedNodesArray .prototype, X3DInfoArray .prototype);

for (const key of Object .keys (ExportedNodesArray .prototype))
   Object .defineProperty (ExportedNodesArray .prototype, key, { enumerable: false });

Object .defineProperties (ExportedNodesArray,
{
   typeName:
   {
      value: "ExportedNodesArray",
      enumerable: true,
   },
});

export default ExportedNodesArray;
