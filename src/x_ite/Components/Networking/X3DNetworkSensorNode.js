import X3DNode       from "../Core/X3DNode.js";
import X3DSensorNode from "../Core/X3DSensorNode.js";
import X3DConstants  from "../../Base/X3DConstants.js";

function X3DNetworkSensorNode (executionContext)
{
   X3DSensorNode .call (this, executionContext);

   this .addType (X3DConstants .X3DNetworkSensorNode);
}

Object .setPrototypeOf (X3DNetworkSensorNode .prototype, X3DSensorNode .prototype);

Object .defineProperties (X3DNetworkSensorNode, X3DNode .getStaticProperties ("X3DNetworkSensorNode", "Networking", 1));

export default X3DNetworkSensorNode;
