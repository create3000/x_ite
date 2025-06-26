import CylinderSensor              from "./PointingDeviceSensor/CylinderSensor.js";
import PlaneSensor                 from "./PointingDeviceSensor/PlaneSensor.js";
import SphereSensor                from "./PointingDeviceSensor/SphereSensor.js";
import TouchSensor                 from "./PointingDeviceSensor/TouchSensor.js";
import X3DDragSensorNode           from "./PointingDeviceSensor/X3DDragSensorNode.js";
import X3DPointingDeviceSensorNode from "./PointingDeviceSensor/X3DPointingDeviceSensorNode.js";
import X3DTouchSensorNode          from "./PointingDeviceSensor/X3DTouchSensorNode.js";

export default {
   name: "PointingDeviceSensor",
   concreteNodes:
   [
      CylinderSensor,
      PlaneSensor,
      SphereSensor,
      TouchSensor,
   ],
   abstractNodes:
   [
      X3DDragSensorNode,
      X3DPointingDeviceSensorNode,
      X3DTouchSensorNode,
   ],
};
