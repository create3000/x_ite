import Fields                  from "../../Fields.js";
import X3DFieldDefinition      from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../../Base/FieldDefinitionArray.js";
import X3DNode                 from "../Core/X3DNode.js";
import X3DComposedGeometryNode from "./X3DComposedGeometryNode.js";
import X3DConstants            from "../../Base/X3DConstants.js";

function TriangleStripSet (executionContext)
{
   X3DComposedGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .TriangleStripSet);

   this .triangleIndex = [ ];
}

Object .assign (Object .setPrototypeOf (TriangleStripSet .prototype, X3DComposedGeometryNode .prototype),
{
   initialize ()
   {
      X3DComposedGeometryNode .prototype .initialize .call (this);

      this ._stripCount .addInterest ("set_stripCount__", this);

      this .set_stripCount__ ();
   },
   set_stripCount__ ()
   {
      // Build coordIndex

      const
         stripCount    = this ._stripCount,
         triangleIndex = this .triangleIndex;

      triangleIndex .length = 0;

      let index = 0;

      for (const vertexCount of stripCount)
      {
         const count = vertexCount - 2;

         for (let i = 0; i < count; ++ i)
         {
            const odd = i & 1;

            triangleIndex .push (index + (odd ? i + 1 : i),
                                 index + (odd ? i : i + 1),
                                 index + (i + 2));
         }

         index += vertexCount;
      }
   },
   getPolygonIndex (index)
   {
      return this .triangleIndex [index];
   },
   getVerticesPerPolygon ()
   {
      return 3;
   },
   getNumVertices ()
   {
      return this .checkVertexCount (this .triangleIndex .length, 3);
   },
   build ()
   {
      X3DComposedGeometryNode .prototype .build .call (this, 3, this .triangleIndex .length, 3, this .triangleIndex .length);
   },
});

Object .defineProperties (TriangleStripSet,
{
   ... X3DNode .getStaticProperties ("TriangleStripSet", "Rendering", 3, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "colorPerVertex",  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "normalPerVertex", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "stripCount",      new Fields .MFInt32 ()),
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

export default TriangleStripSet;
