import X3DNode                  from "../Core/X3DNode.js";
import X3DTextureCoordinateNode from "./X3DTextureCoordinateNode.js";
import X3DGeometryNode          from "../Rendering/X3DGeometryNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";

function X3DSingleTextureCoordinateNode (executionContext)
{
   X3DTextureCoordinateNode .call (this, executionContext);

   this .addType (X3DConstants .X3DSingleTextureCoordinateNode);
}

Object .assign (Object .setPrototypeOf (X3DSingleTextureCoordinateNode .prototype, X3DTextureCoordinateNode .prototype),
{
   getCount ()
   {
      return 1;
   },
   init (multiArray)
   {
      // Must use new array, because there can be cloned texture coordinate nodes.
      multiArray .push (X3DGeometryNode .createArray ());
   },
   addPoint (index, multiArray)
   {
      this .addPointToChannel (index, multiArray [0]);
   },
   getTextureCoordinateMapping (textureCoordinateMapping, channel = 0)
   {
      textureCoordinateMapping .set (this ._mapping .getValue () || channel, channel);
   },
   setShaderUniforms (gl, shaderObject, channel = 0)
   {
      gl .uniform1i (shaderObject .x3d_TextureCoordinateGeneratorMode [channel], 0);
   },
});

Object .defineProperties (X3DSingleTextureCoordinateNode, X3DNode .getStaticProperties ("X3DSingleTextureCoordinateNode", "Texturing", 1));

export default X3DSingleTextureCoordinateNode;
