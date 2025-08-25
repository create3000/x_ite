import Components               from "../../x_ite/Components.js";
import ComposedTexture3D        from "../../x_ite/Components/Texturing3D/ComposedTexture3D.js";
import ImageTexture3D           from "../../x_ite/Components/Texturing3D/ImageTexture3D.js";
import ImageTextureAtlas        from "../../x_ite/Components/Texturing3D/ImageTextureAtlas.js";
import PixelTexture3D           from "../../x_ite/Components/Texturing3D/PixelTexture3D.js";
import TextureCoordinate3D      from "../../x_ite/Components/Texturing3D/TextureCoordinate3D.js";
import TextureCoordinate4D      from "../../x_ite/Components/Texturing3D/TextureCoordinate4D.js";
import TextureTransform3D       from "../../x_ite/Components/Texturing3D/TextureTransform3D.js";
import TextureTransformMatrix3D from "../../x_ite/Components/Texturing3D/TextureTransformMatrix3D.js";
import X3DTexture3DNode         from "../../x_ite/Components/Texturing3D/X3DTexture3DNode.js";

Components .add ({
   name: "Texturing3D",
   concreteNodes:
   [
      ComposedTexture3D,
      ImageTexture3D,
      ImageTextureAtlas, // non-standard
      PixelTexture3D,
      TextureCoordinate3D,
      TextureCoordinate4D,
      TextureTransform3D,
      TextureTransformMatrix3D,
   ],
   abstractNodes:
   [
      X3DTexture3DNode,
   ],
});

export default undefined;
