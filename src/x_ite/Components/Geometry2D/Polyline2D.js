import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DLineGeometryNode  from "../Rendering/X3DLineGeometryNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function Polyline2D (executionContext)
{
   X3DLineGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .Polyline2D);

   // Units

   this ._lineSegments .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Polyline2D .prototype, X3DLineGeometryNode .prototype),
{
   build ()
   {
      const
         lineSegments = this ._lineSegments .getValue (),
         vertexArray  = this .getVertices ();

      for (let i = 0, length = (this ._lineSegments .length - 1) * 2; i < length; i += 2)
      {
         vertexArray .push (lineSegments [i + 0], lineSegments [i + 1], 0, 1);
         vertexArray .push (lineSegments [i + 2], lineSegments [i + 3], 0, 1);
      }
   },
});

Object .defineProperties (Polyline2D,
{
   ... X3DNode .getStaticProperties ("Polyline2D", "Geometry2D", 1, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "lineSegments", new Fields .MFVec2f ()),
      ]),
      enumerable: true,
   },
});

export default Polyline2D;
