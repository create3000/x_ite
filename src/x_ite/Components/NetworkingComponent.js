import Anchor               from "./Networking/Anchor.js";
import Inline               from "./Networking/Inline.js";
import LoadSensor           from "./Networking/LoadSensor.js";
import X3DNetworkSensorNode from "./Networking/X3DNetworkSensorNode.js";
import X3DUrlObject         from "./Networking/X3DUrlObject.js";

export default {
   name: "Networking",
   concreteNodes:
   [
      Anchor,
      Inline,
      LoadSensor,
   ],
   abstractNodes:
   [
      X3DNetworkSensorNode,
      X3DUrlObject,
   ],
};
