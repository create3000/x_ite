import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DVertexAttributeNode from "./X3DVertexAttributeNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import Algorithm              from "../../../standard/Math/Algorithm.js";

function FloatVertexAttribute (executionContext)
{
   X3DVertexAttributeNode .call (this, executionContext);

   this .addType (X3DConstants .FloatVertexAttribute);
}

Object .assign (Object .setPrototypeOf (FloatVertexAttribute .prototype, X3DVertexAttributeNode .prototype),
{
   initialize ()
   {
      X3DVertexAttributeNode .prototype .initialize .call (this);

      this ._numComponents .addInterest ("set_numComponents__", this);
      this ._numComponents .addInterest ("set_attribute__",     this);
      this ._value         .addInterest ("set_value__",         this);

      this .set_numComponents__ ();
      this .set_value__ ();
   },
   set_numComponents__ ()
   {
      this .numComponents = Algorithm .clamp (this ._numComponents .getValue (), 1, 4);
   },
   set_value__ ()
   {
      this .value  = this ._value .getValue ();
      this .length = this ._value .length;
   },
   addValue (index, array)
   {
      const value = this .value;

      let
         first = index * this .numComponents,
         last  = first + this .numComponents;

      if (last <= this .length)
      {
         for (; first < last; ++ first)
            array .push (value [first]);
      }
      else if (this .numComponents <= this .length)
      {
         last  = value .length;
         first = last - this .numComponents;

         for (; first < last; ++ first)
            array .push (value [first]);
      }
      else
      {
         for (; first < last; ++ first)
            array .push (0);
      }
   },
   enable (gl, shaderNode, buffer)
   {
      shaderNode .enableFloatAttrib (gl, this ._name .getValue (), buffer, this .numComponents, 0, 0);
   },
});

Object .defineProperties (FloatVertexAttribute,
{
   ... X3DNode .getStaticProperties ("FloatVertexAttribute", "Shaders", 1, "attrib", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "name",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "numComponents", new Fields .SFInt32 (4)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "value",         new Fields .MFFloat ()),
      ]),
      enumerable: true,
   },
});

export default FloatVertexAttribute;
