import X3DNode      from "../Core/X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

function X3DUrlOutputObject (executionContext)
{
   this .addType (X3DConstants .X3DUrlOutputObject);
}

Object .assign (X3DUrlOutputObject .prototype,
{
   initialize ()
   { },
   dispose ()
   { },
});

Object .defineProperties (X3DUrlOutputObject, X3DNode .getStaticProperties ("X3DUrlOutputObject", "Networking", 4));

export default X3DUrlOutputObject;
