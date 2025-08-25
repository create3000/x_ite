import ImageTexture                   from "./Texturing/ImageTexture.js";
import MovieTexture                   from "./Texturing/MovieTexture.js";
import MultiTexture                   from "./Texturing/MultiTexture.js";
import MultiTextureCoordinate         from "./Texturing/MultiTextureCoordinate.js";
import MultiTextureTransform          from "./Texturing/MultiTextureTransform.js";
import PixelTexture                   from "./Texturing/PixelTexture.js";
import TextureCoordinate              from "./Texturing/TextureCoordinate.js";
import TextureCoordinateGenerator     from "./Texturing/TextureCoordinateGenerator.js";
import TextureProperties              from "./Texturing/TextureProperties.js";
import TextureTransform               from "./Texturing/TextureTransform.js";
import X3DSingleTextureCoordinateNode from "./Texturing/X3DSingleTextureCoordinateNode.js";
import X3DSingleTextureNode           from "./Texturing/X3DSingleTextureNode.js";
import X3DSingleTextureTransformNode  from "./Texturing/X3DSingleTextureTransformNode.js";
import X3DTexture2DNode               from "./Texturing/X3DTexture2DNode.js";
import X3DTextureCoordinateNode       from "./Texturing/X3DTextureCoordinateNode.js";
import X3DTextureNode                 from "./Texturing/X3DTextureNode.js";
import X3DTextureTransformNode        from "./Texturing/X3DTextureTransformNode.js";

export default {
   name: "Texturing",
   concreteNodes:
   [
      ImageTexture,
      MovieTexture,
      MultiTexture,
      MultiTextureCoordinate,
      MultiTextureTransform,
      PixelTexture,
      TextureCoordinate,
      TextureCoordinateGenerator,
      TextureProperties,
      TextureTransform,
   ],
   abstractNodes:
   [
      X3DSingleTextureCoordinateNode,
      X3DSingleTextureNode,
      X3DSingleTextureTransformNode,
      X3DTexture2DNode,
      X3DTextureCoordinateNode,
      X3DTextureNode,
      X3DTextureTransformNode,
   ],
};
