import TimeSensor           from "./Time/TimeSensor.js";
import X3DTimeDependentNode from "./Time/X3DTimeDependentNode.js";

export default {
   name: "Time",
   concreteNodes:
   [
      TimeSensor,
   ],
   abstractNodes:
   [
      X3DTimeDependentNode,
   ],
};
