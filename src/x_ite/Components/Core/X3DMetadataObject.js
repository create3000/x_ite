import X3DNode      from "./X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

function X3DMetadataObject (executionContext)
{
   this .addType (X3DConstants .X3DMetadataObject);
}

Object .assign (X3DMetadataObject .prototype,
{
   initialize () { },
   dispose () { },
});

Object .defineProperties (X3DMetadataObject, X3DNode .getStaticProperties ("X3DMetadataObject", "Core", 1));

export default X3DMetadataObject;
