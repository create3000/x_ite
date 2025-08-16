import ProximitySensor            from "./EnvironmentalSensor/ProximitySensor.js";
import TransformSensor            from "./EnvironmentalSensor/TransformSensor.js";
import VisibilitySensor           from "./EnvironmentalSensor/VisibilitySensor.js";
import X3DEnvironmentalSensorNode from "./EnvironmentalSensor/X3DEnvironmentalSensorNode.js";

export default {
   name: "EnvironmentalSensor",
   concreteNodes:
   [
      ProximitySensor,
      TransformSensor,
      VisibilitySensor,
   ],
   abstractNodes:
   [
      X3DEnvironmentalSensorNode,
   ],
};
