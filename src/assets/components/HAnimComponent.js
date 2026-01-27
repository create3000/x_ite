import Components     from "../../x_ite/Components.js";
import HAnimDisplacer from "../../x_ite/Components/HAnim/HAnimDisplacer.js";
import HAnimHumanoid  from "../../x_ite/Components/HAnim/HAnimHumanoid.js";
import HAnimJoint     from "../../x_ite/Components/HAnim/HAnimJoint.js";
import HAnimMotion    from "../../x_ite/Components/HAnim/HAnimMotion.js";
import HAnimPose      from "../../x_ite/Components/HAnim/HAnimPose.js";
import HAnimSegment   from "../../x_ite/Components/HAnim/HAnimSegment.js";
import HAnimSite      from "../../x_ite/Components/HAnim/HAnimSite.js";

Components .add ({
   name: "HAnim",
   concreteNodes:
   [
      HAnimDisplacer,
      HAnimHumanoid,
      HAnimJoint,
      HAnimMotion,
      HAnimPose,
      HAnimSegment,
      HAnimSite,
   ],
   abstractNodes:
   [
   ],
});

export default undefined;
