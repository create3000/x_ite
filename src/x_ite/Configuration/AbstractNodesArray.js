import X3DInfoArray from "../Base/X3DInfoArray.js";
import X3DConstants from "../Base/X3DConstants.js";

function AbstractNodesArray (values = [ ])
{
   return X3DInfoArray .call (this, Array .from (values, value => [value .typeName, value]), Function);
}

Object .assign (Object .setPrototypeOf (AbstractNodesArray .prototype, X3DInfoArray .prototype),
{
   add (typeName, AbstractNode)
   {
      X3DConstants .addConstant (AbstractNode .typeName);

      X3DInfoArray .prototype .add .call (this, typeName, AbstractNode);
   },
});

for (const key of Object .keys (AbstractNodesArray .prototype))
   Object .defineProperty (AbstractNodesArray .prototype, key, { enumerable: false });

Object .defineProperties (AbstractNodesArray,
{
   typeName:
   {
      value: "AbstractNodesArray",
      enumerable: true,
   },
});

export default AbstractNodesArray;
