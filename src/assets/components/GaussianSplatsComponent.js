import Components            from "../../x_ite/Components.js";
import GaussianSplats        from "../../x_ite/Components/GaussianSplats/GaussianSplats.js";
import X3DGaussianSplatsNode from "../../x_ite/Components/GaussianSplats/X3DGaussianSplatsNode.js";

Components .add ({
   name: "Layout",
   concreteNodes:
   [
      GaussianSplats,
   ],
   abstractNodes:
   [
      X3DGaussianSplatsNode,
   ],
});

export default undefined;
