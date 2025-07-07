import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DLineGeometryNode  from "./X3DLineGeometryNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function LineSet (executionContext)
{
   X3DLineGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .LineSet);
}

Object .assign (Object .setPrototypeOf (LineSet .prototype, X3DLineGeometryNode .prototype),
{
   initialize ()
   {
      X3DLineGeometryNode .prototype .initialize .call (this);

      this ._attrib   .addInterest ("set_attrib__",   this);
      this ._fogCoord .addInterest ("set_fogCoord__", this);
      this ._color    .addInterest ("set_color__",    this);
      this ._tangent  .addInterest ("set_tangent__",  this);
      this ._normal   .addInterest ("set_normal__",   this);
      this ._coord    .addInterest ("set_coord__",    this);

      this .set_attrib__ ();
      this .set_fogCoord__ ();
      this .set_color__ ();
      this .set_tangent__ ();
      this .set_normal__ ();
      this .set_coord__ ();
   },
   build ()
   {
      if (!this .coordNode ?.getSize ())
         return;

      // Fill GeometryNode

      const
         vertexCount       = this ._vertexCount,
         coordIndicesArray = this .getCoordIndices (),
         attribNodes       = this .getAttrib (),
         numAttribNodes    = attribNodes .length,
         attribArrays      = this .getAttribs (),
         fogCoordNode      = this .getFogCoord (),
         colorNode         = this .getColor (),
         tangentNode       = this .getTangent (),
         normalNode        = this .getNormal (),
         coordNode         = this .getCoord (),
         fogDepthArray     = this .getFogDepths (),
         colorArray        = this .getColors (),
         tangentArray      = this .getTangents (),
         normalArray       = this .getNormals (),
         vertexArray       = this .getVertices (),
         size              = coordNode .getSize ();

      let index = 0;

      for (let count of vertexCount)
      {
         if (index + count > size)
            break;

         if (count > 1)
         {
            count = 2 * count - 2; // numVertices for line strip

            for (let i = 0; i < count; ++ i, index += i & 1)
            {
               coordIndicesArray .push (index);

               for (let a = 0; a < numAttribNodes; ++ a)
                  attribNodes [a] .addValue (index, attribArrays [a]);

               fogCoordNode ?.addDepth  (index, fogDepthArray);
               colorNode    ?.addColor  (index, colorArray);
               tangentNode  ?.addVector (index, tangentArray);
               normalNode   ?.addVector (index, normalArray);

               coordNode .addPoint (index, vertexArray);
            }

            ++ index;
         }
         else
            index += count;
      }
   },
});

Object .defineProperties (LineSet,
{
   ... X3DNode .getStaticProperties ("LineSet", "Rendering", 1, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "vertexCount", new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "attrib",      new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "fogCoord",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "color",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "tangent",     new Fields .SFNode ()), // experimental
         new X3DFieldDefinition (X3DConstants .inputOutput, "normal",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "coord",       new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default LineSet;
