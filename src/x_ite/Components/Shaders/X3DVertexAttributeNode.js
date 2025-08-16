import Fields                   from "../../Fields.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DGeometricPropertyNode from "../Rendering/X3DGeometricPropertyNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";

function X3DVertexAttributeNode (executionContext)
{
   X3DGeometricPropertyNode .call (this, executionContext);

   this .addType (X3DConstants .X3DVertexAttributeNode);

   this .addChildObjects (X3DConstants .outputOnly, "attribute_changed", new Fields .SFTime ());
}

Object .assign (Object .setPrototypeOf (X3DVertexAttributeNode .prototype, X3DGeometricPropertyNode .prototype),
{
   initialize ()
   {
      X3DGeometricPropertyNode .prototype .initialize .call (this);

      this ._name .addInterest ("set_attribute__", this);
   },
   set_attribute__ ()
   {
      this ._attribute_changed = this .getBrowser () .getCurrentTime ();
   },
});

Object .defineProperties (X3DVertexAttributeNode, X3DNode .getStaticProperties ("X3DVertexAttributeNode", "Shaders", 1));

export default X3DVertexAttributeNode;
