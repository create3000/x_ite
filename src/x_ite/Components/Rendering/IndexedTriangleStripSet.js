import Fields                  from "../../Fields.js";
import X3DFieldDefinition      from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../../Base/FieldDefinitionArray.js";
import X3DNode                 from "../Core/X3DNode.js";
import X3DComposedGeometryNode from "./X3DComposedGeometryNode.js";
import X3DConstants            from "../../Base/X3DConstants.js";

function IndexedTriangleStripSet (executionContext)
{
   X3DComposedGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .IndexedTriangleStripSet);

   this .triangleIndex = [ ];
}

Object .assign (Object .setPrototypeOf (IndexedTriangleStripSet .prototype, X3DComposedGeometryNode .prototype),
{
   initialize ()
   {
      X3DComposedGeometryNode .prototype .initialize .call (this);

      this ._set_index .addFieldInterest (this ._index);
      this ._index     .addInterest ("set_index__", this);

      this .set_index__ ();
   },
   set_index__ ()
   {
      // Build coordIndex

      const
         index         = this ._index,
         triangleIndex = this .triangleIndex,
         length        = index .length;

      triangleIndex .length = 0;

      // Build coordIndex

      for (let i = 0; i < length; ++ i)
      {
         let first = index [i];

         if (first < 0)
            continue;

         if (++ i < length)
         {
            let second = index [i];

            if (second < 0)
               continue;

            ++ i;

            for (let face = 0; i < length; ++ i, ++ face)
            {
               const third = index [i];

               if (third < 0)
                  break;

               triangleIndex .push (first, second, third);

               if (face & 1)
                  second = third;

               else
                  first = third;
            }
         }
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

Object .defineProperties (IndexedTriangleStripSet,
{
   ... X3DNode .getStaticProperties ("IndexedTriangleStripSet", "Rendering", 3, "geometry", "3.0"),
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

export default IndexedTriangleStripSet;
