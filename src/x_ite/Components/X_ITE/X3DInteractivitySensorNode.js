import X3DNode                     from "../Core/X3DNode.js";
import X3DPointingDeviceSensorNode from "../PointingDeviceSensor/X3DPointingDeviceSensorNode.js";
import X3DConstants                from "../../Base/X3DConstants.js";

function X3DInteractivitySensorNode (executionContext)
{
   X3DPointingDeviceSensorNode .call (this, executionContext);

   this .addType (X3DConstants .X3DInteractivitySensorNode);
}

Object .setPrototypeOf (X3DInteractivitySensorNode .prototype, X3DPointingDeviceSensorNode .prototype);

Object .defineProperties (X3DInteractivitySensorNode, X3DNode .getStaticProperties ("X3DInteractivitySensorNode", "X_ITE", 1));

export default X3DInteractivitySensorNode;
