import Fields                  from "../../Fields.js";
import X3DFieldDefinition      from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../../Base/FieldDefinitionArray.js";
import X3DNode                 from "../Core/X3DNode.js";
import X3DComposedGeometryNode from "../Rendering/X3DComposedGeometryNode.js";
import X3DConstants            from "../../Base/X3DConstants.js";

function IndexedQuadSet (executionContext)
{
   X3DComposedGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .IndexedQuadSet);
}

Object .assign (Object .setPrototypeOf (IndexedQuadSet .prototype, X3DComposedGeometryNode .prototype),
{
   initialize ()
   {
      X3DComposedGeometryNode .prototype .initialize .call (this);

      this ._set_index .addFieldInterest (this ._index);
   },
   getTriangleIndex: (() =>
   {
      const triangles = [0, 1, 2,   0, 2, 3];

      return function (i)
      {
         const mod = i % 6;

         return (i - mod) / 6 * 4 + triangles [mod];
      };
   })(),
   getPolygonIndex (i)
   {
      return this ._index [i];
   },
   getVerticesPerPolygon ()
   {
      return 4;
   },
   getNumVertices ()
   {
      return this .checkVertexCount (this ._index .length, 4);
   },
   build ()
   {
      const length = this .getNumVertices ();

      X3DComposedGeometryNode .prototype .build .call (this, 4, length, 6, length / 4 * 6);
   },
});

Object .defineProperties (IndexedQuadSet,
{
   ... X3DNode .getStaticProperties ("IndexedQuadSet", "CADGeometry", 1, "geometry", "3.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_index",       new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "colorPerVertex",  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "normalPerVertex", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "index",           new Fields .MFInt32 ()),
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

export default IndexedQuadSet;
