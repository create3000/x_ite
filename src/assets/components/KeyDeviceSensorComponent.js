import Components                from "../../x_ite/Components.js";
import X3DKeyDeviceSensorContext from "../../x_ite/Browser/KeyDeviceSensor/X3DKeyDeviceSensorContext.js";
import KeySensor                 from "../../x_ite/Components/KeyDeviceSensor/KeySensor.js";
import StringSensor              from "../../x_ite/Components/KeyDeviceSensor/StringSensor.js";
import X3DKeyDeviceSensorNode    from "../../x_ite/Components/KeyDeviceSensor/X3DKeyDeviceSensorNode.js";

Components .add ({
   name: "KeyDeviceSensor",
   concreteNodes:
   [
      KeySensor,
      StringSensor,
   ],
   abstractNodes:
   [
      X3DKeyDeviceSensorNode,
   ],
   browserContext: X3DKeyDeviceSensorContext,
});

export default undefined;
