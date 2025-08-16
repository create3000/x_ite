import X3DNode                     from "../Core/X3DNode.js";
import X3DPointingDeviceSensorNode from "./X3DPointingDeviceSensorNode.js";
import X3DConstants                from "../../Base/X3DConstants.js";

function X3DDragSensorNode (executionContext)
{
   X3DPointingDeviceSensorNode .call (this, executionContext);

   this .addType (X3DConstants .X3DDragSensorNode);

   // Units

   this ._trackPoint_changed .setUnit ("length");
}

Object .setPrototypeOf (X3DDragSensorNode .prototype, X3DPointingDeviceSensorNode .prototype);

Object .defineProperties (X3DDragSensorNode, X3DNode .getStaticProperties ("X3DDragSensorNode", "PointingDeviceSensor", 1));

export default X3DDragSensorNode;
