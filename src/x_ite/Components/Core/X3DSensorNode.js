import X3DNode      from "../Core/X3DNode.js";
import X3DChildNode from "./X3DChildNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

function X3DSensorNode (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .X3DSensorNode);
}

Object .setPrototypeOf (X3DSensorNode .prototype, X3DChildNode .prototype);

Object .defineProperties (X3DSensorNode, X3DNode .getStaticProperties ("X3DSensorNode", "Core", 1));

export default X3DSensorNode;
