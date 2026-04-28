import Fields       from "../../Fields.js";
import X3DNode      from "../Core/X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import BitSet       from "../../../standard/Utility/BitSet.js";

function X3DMaterialExtensionNode (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .X3DMaterialExtensionNode);

   this .addChildObjects (X3DConstants .outputOnly, "renderedTextures", new Fields .SFTime ());

   // Private properties

   this .textureBits      = new BitSet ();
   this .renderedTextures = [ ];
}

Object .assign (Object .setPrototypeOf (X3DMaterialExtensionNode .prototype, X3DNode .prototype),
{
   addTexture (index, textureNode)
   {
      index *= 4;

      this .textureBits .remove (index, 0xf);
      this .textureBits .add (index, textureNode ?.getTextureBits () ?? 0);

      this .renderedTextures [index] = textureNode ?.isRenderedTexture () ? textureNode : undefined;

      this ._renderedTextures = this .getBrowser () .getCurrentTime ();
   },
   getTextureBits ()
   {
      return this .textureBits;
   },
   getRenderedTextures ()
   {
      return this .renderedTextures;
   },
});

Object .defineProperties (X3DMaterialExtensionNode, X3DNode .getStaticProperties ("X3DMaterialExtensionNode", "X_ITE", 1));

export default X3DMaterialExtensionNode;
