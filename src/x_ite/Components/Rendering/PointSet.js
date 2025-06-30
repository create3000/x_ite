import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DPointGeometryNode from "./X3DPointGeometryNode.js";
import X3DCast              from "../../Base/X3DCast.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function PointSet (executionContext)
{
   X3DPointGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .PointSet);
}

Object .assign (Object .setPrototypeOf (PointSet .prototype, X3DPointGeometryNode .prototype),
{
   initialize ()
   {
      X3DPointGeometryNode .prototype .initialize .call (this);

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
   getCoord ()
   {
      return this .coordNode;
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

      this .tangentNode = X3DCast (X3DConstants .Tangent, this ._tangent);

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

      const
         coordIndicesArray = this .getCoordIndices (),
         attribNodes       = this .getAttrib (),
         numAttribNodes    = attribNodes .length,
         attribArrays      = this .getAttribs (),
         fogCoordNode      = this .fogCoordNode,
         fogDepthArray     = this .getFogDepths (),
         colorNode         = this .colorNode,
         colorArray        = this .getColors (),
         coordNode         = this .coordNode,
         normalArray       = this .getNormals (),
         normalNode        = this .normalNode,
         tangentArray      = this .getTangents (),
         tangentNode       = this .tangentNode,
         vertexArray       = this .getVertices (),
         numPoints         = coordNode ._point .length;

      for (let i = 0; i < numPoints; ++ i)
         coordIndicesArray .push (i);

      for (let a = 0; a < numAttribNodes; ++ a)
      {
         for (let i = 0; i < numPoints; ++ i)
            attribNodes [a] .addValue (i, attribArrays [a]);
      }

      fogCoordNode ?.addDepths  (fogDepthArray, numPoints);
      colorNode    ?.addColors  (colorArray,    numPoints);
      normalNode   ?.addVectors (normalArray,   numPoints);
      tangentNode  ?.addVectors (tangentArray,  numPoints);

      coordNode .addPoints (vertexArray);
   },
});

Object .defineProperties (PointSet,
{
   ... X3DNode .getStaticProperties ("PointSet", "Rendering", 1, "geometry", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "attrib",   new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "fogCoord", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "color",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "tangent",  new Fields .SFNode ()), // experimental
         new X3DFieldDefinition (X3DConstants .inputOutput, "normal",   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "coord",    new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default PointSet;
