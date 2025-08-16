import Fields                   from "../../Fields.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DGeometricPropertyNode from "./X3DGeometricPropertyNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";

function X3DColorNode (executionContext)
{
   X3DGeometricPropertyNode .call (this, executionContext);

   this .addType (X3DConstants .X3DColorNode);

   this .addChildObjects (X3DConstants .outputOnly, "transparent", new Fields .SFBool ());
}

Object .assign (Object .setPrototypeOf (X3DColorNode .prototype, X3DGeometricPropertyNode .prototype),
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

Object .defineProperties (X3DColorNode, X3DNode .getStaticProperties ("X3DColorNode", "Rendering", 1));

export default X3DColorNode;
