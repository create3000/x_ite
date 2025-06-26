import X3DNode                 from "../Core/X3DNode.js";
import X3DTextureTransformNode from "./X3DTextureTransformNode.js";
import X3DConstants            from "../../Base/X3DConstants.js";
import Matrix4                 from "../../../standard/Math/Numbers/Matrix4.js";

function X3DSingleTextureTransformNode (executionContext)
{
   X3DTextureTransformNode .call (this, executionContext);

   this .addType (X3DConstants .X3DSingleTextureTransformNode);

   this .matrixArray = new Float32Array (Matrix4 .Identity);
}

Object .assign (Object .setPrototypeOf (X3DSingleTextureTransformNode .prototype, X3DTextureTransformNode .prototype),
{
   getCount ()
   {
      return 1;
   },
   getMatrix ()
   {
      return this .matrixArray;
   },
   setMatrix (value)
   {
      this .matrixArray .set (value);
   },
   getTextureTransformMapping (textureTransformMapping, channel = 0)
   {
      textureTransformMapping .set (this ._mapping .getValue () || channel, channel);
   },
   setShaderUniforms (gl, shaderObject, channel = 0)
   {
      gl .uniformMatrix4fv (shaderObject .x3d_TextureMatrix [channel], false, this .matrixArray);
   },
   transformPoint (texCoord)
   {
      return Matrix4 .prototype .multVecMatrix .call (this .matrixArray, texCoord);
   },
});

Object .defineProperties (X3DSingleTextureTransformNode, X3DNode .getStaticProperties ("X3DSingleTextureTransformNode", "Texturing", 1));

export default X3DSingleTextureTransformNode;
