import Fields       from "../../Fields.js";
import X3DNode      from "../Core/X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

function X3DAppearanceNode (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .X3DAppearanceNode);

   this .addChildObjects (X3DConstants .outputOnly, "transparent",   new Fields .SFBool (),
                          X3DConstants .outputOnly, "transmission",  new Fields .SFBool (),
                          X3DConstants .outputOnly, "volumeScatter", new Fields .SFBool ());
}

Object .assign (Object .setPrototypeOf (X3DAppearanceNode .prototype, X3DNode .prototype),
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
   setTransmission (value)
   {
      if (!!value !== this ._transmission .getValue ())
         this ._transmission = value;
   },
   isTransmission ()
   {
      return this ._transmission .getValue ();
   },
   setVolumeScatter (value)
   {
      if (!!value !== this ._volumeScatter .getValue ())
         this ._volumeScatter = value;
   },
   isVolumeScatter ()
   {
      return this ._volumeScatter .getValue ();
   },
});

Object .defineProperties (X3DAppearanceNode, X3DNode .getStaticProperties ("X3DAppearanceNode", "Shape", 1));

export default X3DAppearanceNode;
