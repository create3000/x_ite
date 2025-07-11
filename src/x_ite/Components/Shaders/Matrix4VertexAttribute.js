import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DVertexAttributeNode from "./X3DVertexAttributeNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";

function Matrix4VertexAttribute (executionContext)
{
   X3DVertexAttributeNode .call (this, executionContext);

   this .addType (X3DConstants .Matrix4VertexAttribute);
}

Object .assign (Object .setPrototypeOf (Matrix4VertexAttribute .prototype, X3DVertexAttributeNode .prototype),
{
   initialize ()
   {
      X3DVertexAttributeNode .prototype .initialize .call (this);

      this ._value .addInterest ("set_value__", this);

      this .set_value__ ();
   },
   set_value__ ()
   {
      this .value  = this ._value .getValue ();
      this .length = this ._value .length;
   },
   addValue (index, array)
   {
      if (index < this .length)
      {
         const value = this .value;

         for (let i = index * 16, l = i + 16; i < l; ++ i)
            array .push (value [i]);
      }
      else if (this .length)
      {
         const value = this .value;

         index = this .length - 1;

         for (let i = index * 16, l = i + 16; i < l; ++ i)
            array .push (value [i]);
      }
      else
      {
         const value = Matrix4 .Identity;

         for (let i = 0; i < 16; ++ i)
            array .push (value [i]);
      }
   },
   enable (gl, shaderNode, buffer)
   {
      shaderNode .enableMatrix4Attrib (gl, this ._name .getValue (), buffer, 0, 0);
   },
});

Object .defineProperties (Matrix4VertexAttribute,
{
   ... X3DNode .getStaticProperties ("Matrix4VertexAttribute", "Shaders", 1, "attrib", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "name",     new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "value",    new Fields .MFMatrix4f ()),
      ]),
      enumerable: true,
   },
});

export default Matrix4VertexAttribute;
