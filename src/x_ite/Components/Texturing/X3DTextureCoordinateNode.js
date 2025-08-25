import X3DNode                  from "../Core/X3DNode.js";
import X3DGeometricPropertyNode from "../Rendering/X3DGeometricPropertyNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";

function X3DTextureCoordinateNode (executionContext)
{
   X3DGeometricPropertyNode .call (this, executionContext);

   this .addType (X3DConstants .X3DTextureCoordinateNode);
}

Object .setPrototypeOf (X3DTextureCoordinateNode .prototype, X3DGeometricPropertyNode .prototype);

Object .defineProperties (X3DTextureCoordinateNode, X3DNode .getStaticProperties ("X3DTextureCoordinateNode", "Texturing", 1));

export default X3DTextureCoordinateNode;
