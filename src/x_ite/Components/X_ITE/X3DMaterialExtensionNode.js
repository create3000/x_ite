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

   this .textureBits  = new BitSet ();
   this .textureNodes = [ ];
}

Object .assign (Object .setPrototypeOf (X3DMaterialExtensionNode .prototype, X3DNode .prototype),
{
   addTexture (index, textureNode)
   {
      // Collect textures.

      this .textureNodes [index] = textureNode;

      this ._renderedTextures = this .getBrowser () .getCurrentTime ();

      // Set texture bits.

      index *= 4;

      this .textureBits .remove (index, 0xf);
      this .textureBits .add (index, textureNode ?.getTextureBits () ?? 0);
   },
   getTextureBits ()
   {
      return this .textureBits;
   },
   getRenderedTextures (renderedTextures)
   {
      for (const textureNode of this .textureNodes)
         textureNode ?.getRenderedTextures (renderedTextures);
   },
});

Object .defineProperties (X3DMaterialExtensionNode, X3DNode .getStaticProperties ("X3DMaterialExtensionNode", "X_ITE", 1));

export default X3DMaterialExtensionNode;
