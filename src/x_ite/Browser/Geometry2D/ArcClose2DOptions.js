import X3DBaseNode  from "../../Base/X3DBaseNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import Fields       from "../../Fields.js";

function ArcClose2DOptions (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this .addChildObjects (X3DConstants .inputOutput, "dimension", new Fields .SFInt32 (40))
}

Object .setPrototypeOf (ArcClose2DOptions .prototype, X3DBaseNode .prototype);

Object .defineProperties (ArcClose2DOptions,
{
   typeName:
   {
      value: "ArcClose2DOptions",
      enumerable: true,
   },
});

export default ArcClose2DOptions;
