import Fields                  from "../../Fields.js";
import X3DFieldDefinition      from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../../Base/FieldDefinitionArray.js";
import X3DNode                 from "../Core/X3DNode.js";
import X3DComposedGeometryNode from "../Rendering/X3DComposedGeometryNode.js";
import X3DConstants            from "../../Base/X3DConstants.js";

function QuadSet (executionContext)
{
   X3DComposedGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .QuadSet);
}

Object .assign (Object .setPrototypeOf (QuadSet .prototype, X3DComposedGeometryNode .prototype),
{
   getTriangleIndex: (() =>
   {
      const triangles = [0, 1, 2,   0, 2, 3];

      return function (i)
      {
         const mod = i % 6;

         return (i - mod) / 6 * 4 + triangles [mod];
      };
   })(),
   getVerticesPerPolygon ()
   {
      return 4;
   },
   getNumVertices ()
   {
      return this .checkVertexCount (this .getCoord () ?.getSize () ?? 0, 4);
   },
   build ()
   {
      const length = this .getNumVertices ();

      X3DComposedGeometryNode .prototype .build .call (this, 4, length, 6, length / 4 * 6);
   },
   createNormals (verticesPerPolygon, polygonsSize, polygons)
   {
      return this .createFaceNormals (verticesPerPolygon, polygonsSize, polygons);
   },
});

Object .defineProperties (QuadSet,
{
   ... X3DNode .getStaticProperties ("QuadSet", "CADGeometry", 1, "geometry", "3.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "colorPerVertex",  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "normalPerVertex", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "attrib",          new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "fogCoord",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "color",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "texCoord",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tangent",         new Fields .SFNode ()), // experimental
         new X3DFieldDefinition (X3DConstants .inputOutput,    "normal",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "coord",           new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default QuadSet;
