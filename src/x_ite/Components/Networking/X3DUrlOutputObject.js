import X3DNode              from "../Core/X3DNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DNetworkSensorNode from "./X3DNetworkSensorNode.js";

function X3DUrlOutputObject (executionContext)
{
   X3DNetworkSensorNode .call (this, executionContext);

   this .addType (X3DConstants .X3DUrlOutputObject);
}

Object .setPrototypeOf (X3DUrlOutputObject .prototype, X3DNetworkSensorNode .prototype);

Object .defineProperties (X3DUrlOutputObject, X3DNode .getStaticProperties ("X3DUrlOutputObject", "Networking", 4));

export default X3DUrlOutputObject;
