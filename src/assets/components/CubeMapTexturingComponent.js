import Components                 from "../../x_ite/Components.js";
import X3DCubeMapTexturingContext from "../../x_ite/Browser/CubeMapTexturing/X3DCubeMapTexturingContext.js";
import ComposedCubeMapTexture     from "../../x_ite/Components/CubeMapTexturing/ComposedCubeMapTexture.js";
import GeneratedCubeMapTexture    from "../../x_ite/Components/CubeMapTexturing/GeneratedCubeMapTexture.js";
import ImageCubeMapTexture        from "../../x_ite/Components/CubeMapTexturing/ImageCubeMapTexture.js";
import X3DEnvironmentTextureNode  from "../../x_ite/Components/CubeMapTexturing/X3DEnvironmentTextureNode.js";

Components .add ({
   name: "CubeMapTexturing",
   concreteNodes:
   [
      ComposedCubeMapTexture,
      GeneratedCubeMapTexture,
      ImageCubeMapTexture,
   ],
   abstractNodes:
   [
      X3DEnvironmentTextureNode,
   ],
   browserContext: X3DCubeMapTexturingContext,
});

export default undefined;
