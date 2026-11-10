import Fields       from "../../Fields.js";
import X3DNode      from "../Core/X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import MaterialFlag from "../../Browser/Shape/MaterialFlag.js";

function X3DAppearanceNode (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .X3DAppearanceNode);

   this .addChildObjects (X3DConstants .outputOnly, "materialFlags", new Fields .SFInt32 ());
}

Object .assign (Object .setPrototypeOf (X3DAppearanceNode .prototype, X3DNode .prototype),
{
   getMaterialFlag (index)
   {
      return this .getNodeFlag (this ._materialFlags, index);
   },
   setMaterialFlag (index, value)
   {
      this .setNodeFlag (this ._materialFlags, index, value);
   },
   setTransparent (value)
   {
      this .setMaterialFlag (MaterialFlag .TRANSPARENT, value);
   },
   isTransparent ()
   {
      return this .getMaterialFlag (MaterialFlag .TRANSPARENT);
   },
   setTransmission (value)
   {
      this .setMaterialFlag (MaterialFlag .TRANSMISSION, value);
   },
   isTransmission ()
   {
      return this .getMaterialFlag (MaterialFlag .TRANSMISSION);
   },
   setScatter (value)
   {
      this .setMaterialFlag (MaterialFlag .SCATTER, value);
   },
   isScatter ()
   {
      return this .getMaterialFlag (MaterialFlag .SCATTER);
   },
});

Object .defineProperties (X3DAppearanceNode, X3DNode .getStaticProperties ("X3DAppearanceNode", "Shape", 1));

export default X3DAppearanceNode;
