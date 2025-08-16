import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DPointGeometryNode from "./X3DPointGeometryNode.js";
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

      const
         coordIndicesArray = this .getCoordIndices (),
         attribNodes       = this .getAttrib (),
         numAttribNodes    = attribNodes .length,
         attribArrays      = this .getAttribs (),
         fogCoordNode      = this .getFogCoord (),
         fogDepthArray     = this .getFogDepths (),
         colorNode         = this .getColor (),
         colorArray        = this .getColors (),
         tangentNode       = this .getTangent (),
         normalNode        = this .getNormal (),
         coordNode         = this .getCoord (),
         tangentArray      = this .getTangents (),
         normalArray       = this .getNormals (),
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
      tangentNode  ?.addVectors (tangentArray,  numPoints);
      normalNode   ?.addVectors (normalArray,   numPoints);

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
