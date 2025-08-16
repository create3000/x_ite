import X3DNode      from "../Core/X3DNode.js";
import X3DChildNode from "./X3DChildNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

function X3DInfoNode (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .X3DInfoNode);
}

Object .setPrototypeOf (X3DInfoNode .prototype, X3DChildNode .prototype);

Object .defineProperties (X3DInfoNode, X3DNode .getStaticProperties ("X3DInfoNode", "Core", 1));

export default X3DInfoNode;
