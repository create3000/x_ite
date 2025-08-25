import X3DNode      from "../Core/X3DNode.js";
import X3DChildNode from "../Core/X3DChildNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

function X3DProductStructureChildNode (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .X3DProductStructureChildNode);
}

Object .setPrototypeOf (X3DProductStructureChildNode .prototype, X3DChildNode .prototype);

Object .defineProperties (X3DProductStructureChildNode, X3DNode .getStaticProperties ("X3DProductStructureChildNode", "CADGeometry", 2));

export default X3DProductStructureChildNode;
