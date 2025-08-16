import Components          from "../../x_ite/Components.js";
import LinePickSensor      from "../../x_ite/Components/Picking/LinePickSensor.js";
import PickableGroup       from "../../x_ite/Components/Picking/PickableGroup.js";
import PointPickSensor     from "../../x_ite/Components/Picking/PointPickSensor.js";
import PrimitivePickSensor from "../../x_ite/Components/Picking/PrimitivePickSensor.js";
import VolumePickSensor    from "../../x_ite/Components/Picking/VolumePickSensor.js";
import X3DPickSensorNode   from "../../x_ite/Components/Picking/X3DPickSensorNode.js";
import X3DPickableObject   from "../../x_ite/Components/Picking/X3DPickableObject.js";

Components .add ({
   name: "Picking",
   concreteNodes:
   [
      LinePickSensor,
      PickableGroup,
      PointPickSensor,
      PrimitivePickSensor,
      VolumePickSensor,
   ],
   abstractNodes:
   [
      X3DPickSensorNode,
      X3DPickableObject,
   ],
});

export default undefined;
