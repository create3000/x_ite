import X3DInfoArray from "../Base/X3DInfoArray.js";
import X3DConstants from "../Base/X3DConstants.js";
import HTMLSupport  from "../Parser/HTMLSupport.js";

function ConcreteNodesArray (values = [ ])
{
   return X3DInfoArray .call (this, Array .from (values, value => [value .typeName, value]), Function);
}

Object .assign (Object .setPrototypeOf (ConcreteNodesArray .prototype, X3DInfoArray .prototype),
{
   add (typeName, ConcreteNode)
   {
      X3DConstants .addConstant (ConcreteNode .typeName);
      HTMLSupport .addConcreteNode (ConcreteNode);

      X3DInfoArray .prototype .add .call (this, typeName, ConcreteNode);
   },
   update (oldTypeName, typeName, ConcreteNode)
   {
      X3DConstants .addConstant (ConcreteNode .typeName);
      HTMLSupport .addConcreteNode (ConcreteNode);

      X3DInfoArray .prototype .update .call (this, oldTypeName, typeName, ConcreteNode);
   },
});

for (const key of Object .keys (ConcreteNodesArray .prototype))
   Object .defineProperty (ConcreteNodesArray .prototype, key, { enumerable: false });

Object .defineProperties (ConcreteNodesArray,
{
   typeName:
   {
      value: "ConcreteNodesArray",
      enumerable: true,
   },
});

export default ConcreteNodesArray;
