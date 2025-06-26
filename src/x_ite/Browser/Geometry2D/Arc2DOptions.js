import X3DBaseNode  from "../../Base/X3DBaseNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import Fields       from "../../Fields.js";

function Arc2DOptions (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this .addChildObjects (X3DConstants .inputOutput, "dimension", new Fields .SFInt32 (40))
}

Object .setPrototypeOf (Arc2DOptions .prototype, X3DBaseNode .prototype);

Object .defineProperties (Arc2DOptions,
{
   typeName:
   {
      value: "Arc2DOptions",
      enumerable: true,
   },
});

export default Arc2DOptions;
