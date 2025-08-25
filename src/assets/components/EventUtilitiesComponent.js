import Components       from "../../x_ite/Components.js";
import BooleanFilter    from "../../x_ite/Components/EventUtilities/BooleanFilter.js";
import BooleanSequencer from "../../x_ite/Components/EventUtilities/BooleanSequencer.js";
import BooleanToggle    from "../../x_ite/Components/EventUtilities/BooleanToggle.js";
import BooleanTrigger   from "../../x_ite/Components/EventUtilities/BooleanTrigger.js";
import IntegerSequencer from "../../x_ite/Components/EventUtilities/IntegerSequencer.js";
import IntegerTrigger   from "../../x_ite/Components/EventUtilities/IntegerTrigger.js";
import TimeTrigger      from "../../x_ite/Components/EventUtilities/TimeTrigger.js";
import X3DSequencerNode from "../../x_ite/Components/EventUtilities/X3DSequencerNode.js";
import X3DTriggerNode   from "../../x_ite/Components/EventUtilities/X3DTriggerNode.js";

Components .add ({
   name: "EventUtilities",
   concreteNodes:
   [
      BooleanFilter,
      BooleanSequencer,
      BooleanToggle,
      BooleanTrigger,
      IntegerSequencer,
      IntegerTrigger,
      TimeTrigger,
   ],
   abstractNodes:
   [
      X3DSequencerNode,
      X3DTriggerNode,
   ],
});

export default undefined;
