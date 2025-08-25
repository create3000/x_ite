import Components           from "../../x_ite/Components.js";
import DISEntityManager     from "../../x_ite/Components/DIS/DISEntityManager.js";
import DISEntityTypeMapping from "../../x_ite/Components/DIS/DISEntityTypeMapping.js";
import EspduTransform       from "../../x_ite/Components/DIS/EspduTransform.js";
import ReceiverPdu          from "../../x_ite/Components/DIS/ReceiverPdu.js";
import SignalPdu            from "../../x_ite/Components/DIS/SignalPdu.js";
import TransmitterPdu       from "../../x_ite/Components/DIS/TransmitterPdu.js";

Components .add ({
   name: "DIS",
   concreteNodes:
   [
      DISEntityManager,
      DISEntityTypeMapping,
      EspduTransform,
      ReceiverPdu,
      SignalPdu,
      TransmitterPdu,
   ],
   abstractNodes:
   [
   ],
});

export default undefined;
