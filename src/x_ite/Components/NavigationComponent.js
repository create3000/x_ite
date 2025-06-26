import Billboard        from "./Navigation/Billboard.js";
import Collision        from "./Navigation/Collision.js";
import LOD              from "./Navigation/LOD.js";
import NavigationInfo   from "./Navigation/NavigationInfo.js";
import OrthoViewpoint   from "./Navigation/OrthoViewpoint.js";
import Viewpoint        from "./Navigation/Viewpoint.js";
import ViewpointGroup   from "./Navigation/ViewpointGroup.js";
import X3DViewpointNode from "./Navigation/X3DViewpointNode.js";

export default {
   name: "Navigation",
   concreteNodes:
   [
      Billboard,
      Collision,
      LOD,
      NavigationInfo,
      OrthoViewpoint,
      Viewpoint,
      ViewpointGroup,
   ],
   abstractNodes:
   [
      X3DViewpointNode,
   ],
};
