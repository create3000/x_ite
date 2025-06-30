import X3DNode                  from "../Core/X3DNode.js";
import X3DVolumeRenderStyleNode from "./X3DVolumeRenderStyleNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";

function X3DComposableVolumeRenderStyleNode (executionContext)
{
   X3DVolumeRenderStyleNode .call (this, executionContext);

   this .addType (X3DConstants .X3DComposableVolumeRenderStyleNode);
}

Object .setPrototypeOf (X3DComposableVolumeRenderStyleNode .prototype, X3DVolumeRenderStyleNode .prototype);

Object .defineProperties (X3DComposableVolumeRenderStyleNode, X3DNode .getStaticProperties ("X3DComposableVolumeRenderStyleNode", "VolumeRendering", 1));

export default X3DComposableVolumeRenderStyleNode;
