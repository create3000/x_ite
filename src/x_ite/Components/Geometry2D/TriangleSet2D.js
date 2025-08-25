import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGeometryNode      from "../Rendering/X3DGeometryNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function TriangleSet2D (executionContext)
{
   X3DGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .TriangleSet2D);

   this .setGeometryType (2);

   // Units

   this ._vertices .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (TriangleSet2D .prototype, X3DGeometryNode .prototype),
{
   build ()
   {
      const
         vertices    = this ._vertices .getValue (),
         normalArray = this .getNormals (),
         vertexArray = this .getVertices ();

      for (let i = 0, length = this ._vertices .length * 2; i < length; i += 2)
      {
         normalArray .push (0, 0, 1);
         vertexArray .push (vertices [i], vertices [i + 1], 0, 1);
      }

      this .setSolid (this ._solid .getValue ());
   },
   generateTexCoords ()
   {
      const texCoordArray = this .getTexCoords ();

      if (texCoordArray .length === 0)
      {
         const
            p             = this .getTexCoordParams (),
            min           = p .min,
            Ssize         = p .Ssize,
            vertexArray   = this .getVertices () .getValue ();

         for (let i = 0, length = vertexArray .length; i < length; i += 4)
         {
            texCoordArray .push ((vertexArray [i]     - min [0]) / Ssize,
                                 (vertexArray [i + 1] - min [1]) / Ssize,
                                 0,
                                 1);
         }

         texCoordArray .shrinkToFit ();
      }

      this .getMultiTexCoords () .push (texCoordArray);
   },
});

Object .defineProperties (TriangleSet2D,
{
   ... X3DNode .getStaticProperties ("TriangleSet2D", "Geometry2D", 1, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "vertices", new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",    new Fields .SFBool ()),
      ]),
      enumerable: true,
   },
});

export default TriangleSet2D;
