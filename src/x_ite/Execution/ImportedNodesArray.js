import X3DInfoArray    from "../Base/X3DInfoArray.js";
import X3DImportedNode from "./X3DImportedNode.js"

function ImportedNodesArray (values = [ ])
{
   return X3DInfoArray .call (this, Array .from (values, value => [value .getImportedName (), value]), X3DImportedNode);
}

Object .setPrototypeOf (ImportedNodesArray .prototype, X3DInfoArray .prototype);

for (const key of Object .keys (ImportedNodesArray .prototype))
   Object .defineProperty (ImportedNodesArray .prototype, key, { enumerable: false });

Object .defineProperties (ImportedNodesArray,
{
   typeName:
   {
      value: "ImportedNodesArray",
      enumerable: true,
   },
});

export default ImportedNodesArray;
