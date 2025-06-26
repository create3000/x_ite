import Components               from "../../x_ite/Components.js";
import TextureProjector         from "../../x_ite/Components/TextureProjection/TextureProjector.js";
import TextureProjectorParallel from "../../x_ite/Components/TextureProjection/TextureProjectorParallel.js";
import X3DTextureProjectorNode  from "../../x_ite/Components/TextureProjection/X3DTextureProjectorNode.js";

Components .add ({
   name: "TextureProjection",
   concreteNodes:
   [
      TextureProjector,
      TextureProjectorParallel,
   ],
   abstractNodes:
   [
      X3DTextureProjectorNode,
   ],
});

export default undefined;
