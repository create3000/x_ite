import Layer           from "./Layering/Layer.js";
import LayerSet        from "./Layering/LayerSet.js";
import Viewport        from "./Layering/Viewport.js";
import X3DLayerNode    from "./Layering/X3DLayerNode.js";
import X3DViewportNode from "./Layering/X3DViewportNode.js";

export default {
   name: "Layering",
   concreteNodes:
   [
      Layer,
      LayerSet,
      Viewport,
   ],
   abstractNodes:
   [
      X3DLayerNode,
      X3DViewportNode,
   ],
};
