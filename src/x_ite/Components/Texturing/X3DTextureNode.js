import Fields                 from "../../Fields.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DAppearanceChildNode from "../Shape/X3DAppearanceChildNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";

function X3DTextureNode (executionContext)
{
   X3DAppearanceChildNode .call (this, executionContext);

   this .addType (X3DConstants .X3DTextureNode);

   this .addChildObjects (X3DConstants .outputOnly, "transparent", new Fields .SFBool ());
}

Object .assign (Object .setPrototypeOf (X3DTextureNode .prototype, X3DAppearanceChildNode .prototype),
{
   setTransparent (value)
   {
      if (!!value !== this ._transparent .getValue ())
         this ._transparent = value;
   },
   isTransparent ()
   {
      return this ._transparent .getValue ();
   },
});

Object .defineProperties (X3DTextureNode, X3DNode .getStaticProperties ("X3DTextureNode", "Texturing", 1));

export default X3DTextureNode;
