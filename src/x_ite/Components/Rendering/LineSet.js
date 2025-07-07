import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DLineGeometryNode  from "./X3DLineGeometryNode.js";
import X3DCast              from "../../Base/X3DCast.js";
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
      this ._normal   .addInterest ("set_normal__",   this);
      this ._tangent  .addInterest ("set_tangent__",  this);
      this ._coord    .addInterest ("set_coord__",    this);

      this .set_attrib__ ();
      this .set_fogCoord__ ();
      this .set_color__ ();
      this .set_normal__ ();
      this .set_tangent__ ();
      this .set_coord__ ();
   },
   set_attrib__ ()
   {
      const attribNodes = this .getAttrib ();

      for (const attribNode of attribNodes)
      {
         attribNode .removeInterest ("requestRebuild", this);
         attribNode ._attribute_changed .removeInterest ("updateVertexArrays", this);
      }

      attribNodes .length = 0;

      for (const node of this ._attrib)
      {
         const attribNode = X3DCast (X3DConstants .X3DVertexAttributeNode, node);

         if (attribNode)
            attribNodes .push (attribNode);
      }

      for (const attribNode of attribNodes)
      {
         attribNode .addInterest ("requestRebuild", this);
         attribNode ._attribute_changed .addInterest ("updateVertexArrays", this);
      }

      this .updateVertexArrays ();
   },
   set_fogCoord__ ()
   {
      this .fogCoordNode ?.removeInterest ("requestRebuild", this);

      this .fogCoordNode = X3DCast (X3DConstants .FogCoordinate, this ._fogCoord);

      this .fogCoordNode ?.addInterest ("requestRebuild", this);
   },
   set_color__ ()
   {
      this .colorNode ?.removeInterest ("requestRebuild", this);

      this .colorNode = X3DCast (X3DConstants .X3DColorNode, this ._color);

      this .colorNode ?.addInterest ("requestRebuild", this);

      this .setTransparent (this .colorNode ?.isTransparent ());
   },
   set_normal__ ()
   {
      this .normalNode ?.removeInterest ("requestRebuild", this);

      this .normalNode = X3DCast (X3DConstants .X3DNormalNode, this ._normal);

      this .normalNode ?.addInterest ("requestRebuild", this);
   },
   set_tangent__ ()
   {
      this .tangentNode ?.removeInterest ("requestRebuild", this);

      this .tangentNode = X3DCast (X3DConstants .X3DTangentNode, this ._tangent);

      this .tangentNode ?.addInterest ("requestRebuild", this);
   },
   set_coord__ ()
   {
      this .coordNode ?.removeInterest ("requestRebuild", this);

      this .coordNode = X3DCast (X3DConstants .X3DCoordinateNode, this ._coord);

      this .coordNode ?.addInterest ("requestRebuild", this);
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
         fogCoordNode      = this .fogCoordNode,
         colorNode         = this .colorNode,
         normalNode        = this .normalNode,
         tangentNode       = this .tangentNode,
         coordNode         = this .coordNode,
         fogDepthArray     = this .getFogDepths (),
         colorArray        = this .getColors (),
         normalArray       = this .getNormals (),
         tangentArray      = this .getTangents (),
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
               normalNode   ?.addVector (index, normalArray);
               tangentNode  ?.addVector (index, tangentArray);

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
