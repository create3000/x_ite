import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DPointGeometryNode from "../Rendering/X3DPointGeometryNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function Polypoint2D (executionContext)
{
   X3DPointGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .Polypoint2D);

   // Units

   this ._point .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Polypoint2D .prototype, X3DPointGeometryNode .prototype),
{
   build ()
   {
      const
         point       = this ._point .getValue (),
         vertexArray = this .getVertices ();

      for (let i = 0, length = this ._point .length * 2; i < length; i += 2)
      {
         vertexArray .push (point [i], point [i + 1], 0, 1);
      }
   },
});

Object .defineProperties (Polypoint2D,
{
   ... X3DNode .getStaticProperties ("Polypoint2D", "Geometry2D", 1, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "point",    new Fields .MFVec2f ()),
      ]),
      enumerable: true,
   },
});

export default Polypoint2D;
