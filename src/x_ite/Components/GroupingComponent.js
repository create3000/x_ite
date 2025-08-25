import Group                    from "./Grouping/Group.js";
import StaticGroup              from "./Grouping/StaticGroup.js";
import Switch                   from "./Grouping/Switch.js";
import Transform                from "./Grouping/Transform.js";
import X3DBoundedObject         from "./Grouping/X3DBoundedObject.js";
import X3DGroupingNode          from "./Grouping/X3DGroupingNode.js";
import X3DTransformMatrix3DNode from "./Grouping/X3DTransformMatrix3DNode.js";
import X3DTransformNode         from "./Grouping/X3DTransformNode.js";

export default {
   name: "Grouping",
   concreteNodes:
   [
      Group,
      StaticGroup,
      Switch,
      Transform,
   ],
   abstractNodes:
   [
      X3DBoundedObject,
      X3DGroupingNode,
      X3DTransformMatrix3DNode,
      X3DTransformNode,
   ],
};
