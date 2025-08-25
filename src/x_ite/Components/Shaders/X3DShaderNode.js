import X3DNode                from "../Core/X3DNode.js";
import X3DAppearanceChildNode from "../Shape/X3DAppearanceChildNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";

function X3DShaderNode (executionContext)
{
   X3DAppearanceChildNode .call (this, executionContext);

   this .addType (X3DConstants .X3DShaderNode);

   this .valid    = false;
   this .selected = 0;
}

Object .assign (Object .setPrototypeOf (X3DShaderNode .prototype, X3DAppearanceChildNode .prototype),
{
   setValid (value)
   {
      this ._isValid = this .valid = value;
   },
   isValid ()
   {
      return this .valid;
   },
   select ()
   {
      ++ this .selected;

      if (! this ._isSelected .getValue ())
         this ._isSelected = true;
   },
   deselect ()
   {
      -- this .selected;

      if (this .selected === 0)
      {
         if (this ._isSelected .getValue ())
            this ._isSelected = false;
      }
   },
});

Object .defineProperties (X3DShaderNode, X3DNode .getStaticProperties ("X3DShaderNode", "Shaders", 1));

export default X3DShaderNode;
