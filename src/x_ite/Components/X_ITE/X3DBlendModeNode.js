import Fields                 from "../../Fields.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DAppearanceChildNode from "../Shape/X3DAppearanceChildNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function X3DBlendModeNode (executionContext)
{
   X3DAppearanceChildNode .call (this, executionContext);

   this .addType (X3DConstants .X3DBlendModeNode);

   this .addChildObjects (X3DConstants .outputOnly, "transparent", new Fields .SFBool ());
}

Object .assign (Object .setPrototypeOf (X3DBlendModeNode .prototype, X3DAppearanceChildNode .prototype),
{
   initialize ()
   {
      X3DAppearanceChildNode .prototype .initialize .call (this);
   },
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

Object .defineProperties (X3DBlendModeNode, X3DNode .getStaticProperties ("X3DBlendModeNode", "X_ITE", 1));

export default X3DBlendModeNode;
