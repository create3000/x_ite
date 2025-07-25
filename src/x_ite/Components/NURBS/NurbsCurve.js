import X3DCast                   from "../../Base/X3DCast.js";
import Fields                    from "../../Fields.js";
import X3DFieldDefinition        from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray      from "../../Base/FieldDefinitionArray.js";
import X3DNode                   from "../Core/X3DNode.js";
import X3DParametricGeometryNode from "./X3DParametricGeometryNode.js";
import X3DLineGeometryNode       from "../Rendering/X3DLineGeometryNode.js";
import X3DConstants              from "../../Base/X3DConstants.js";
import NURBS                     from "../../Browser/NURBS/NURBS.js";
import nurbs                     from "../../../lib/nurbs/nurbs.js";

function NurbsCurve (executionContext)
{
   X3DParametricGeometryNode .call (this, executionContext);
   X3DLineGeometryNode       .call (this, executionContext);

   this .addType (X3DConstants .NurbsCurve);

   this .knots         = [ ];
   this .weights       = [ ];
   this .controlPoints = [ ];
   this .mesh          = { };
   this .sampleOptions = { resolution: [ ] };
}

Object .assign (Object .setPrototypeOf (NurbsCurve .prototype, X3DParametricGeometryNode .prototype),
   X3DLineGeometryNode .prototype,
{
   initialize ()
   {
      X3DParametricGeometryNode .prototype .initialize .call (this);

      this ._controlPoint .addInterest ("set_controlPoint__", this);

      this .set_controlPoint__ ();
   },
   set_controlPoint__ ()
   {
      this .controlPointNode ?.removeInterest ("requestRebuild", this);

      this .controlPointNode = X3DCast (X3DConstants .X3DCoordinateNode, this ._controlPoint);

      this .controlPointNode ?.addInterest ("requestRebuild", this);
   },
   getTessellation (dimension)
   {
      return NURBS .getTessellation (this ._tessellation .getValue (), dimension);
   },
   getClosed (order, knot, weight, controlPointNode)
   {
      if (!this ._closed .getValue ())
         return false;

      return NURBS .getClosed (order, knot, weight, controlPointNode);
   },
   getWeights (result, dimension, weight)
   {
      return NURBS .getWeights (result, dimension, weight);
   },
   getControlPoints (result, closed, order, weights, controlPointNode)
   {
      return NURBS .getControlPoints (result, closed, order, weights, controlPointNode);
   },
   getSurface ()
   {
      return this .surface;
   },
   tessellate ()
   {
      if (this ._order .getValue () < 2)
         return [ ];

      if (!this .controlPointNode)
         return [ ];

      if (this .controlPointNode .getSize () < this ._order .getValue ())
         return [ ];

      const
         vertexArray = this .getVertices (),
         numVertices = vertexArray .length,
         array       = [ ];

      if (numVertices)
      {
         for (let i = 0; i < numVertices; i += 8)
            array .push (vertexArray [i], vertexArray [i + 1], vertexArray [i + 2]);

         array .push (vertexArray [numVertices - 4], vertexArray [numVertices - 3], vertexArray [numVertices - 2]);
      }

      return array;
   },
   build ()
   {
      if (this ._order .getValue () < 2)
         return;

      if (!this .controlPointNode)
         return;

      if (this .controlPointNode .getSize () < this ._order .getValue ())
         return;

      // Order and dimension are now positive numbers.

      const
         closed        = this .getClosed (this ._order .getValue (), this ._knot, this ._weight, this .controlPointNode),
         weights       = this .getWeights (this .weights, this .controlPointNode .getSize (), this ._weight),
         controlPoints = this .getControlPoints (this .controlPoints, closed, this ._order .getValue (), weights, this .controlPointNode);

      // Knots

      const
         knots = this .getKnots (this .knots, closed, this ._order .getValue (), this .controlPointNode .getSize (), this ._knot),
         scale = knots .at (-1) - knots [0];

      // Initialize NURBS tessellator

      const degree = this ._order .getValue () - 1;

      this .surface = (this .surface ?? nurbs) ({
         boundary: ["open"],
         degree: [degree],
         knots: [knots],
         points: controlPoints,
         debug: false,
      });

      this .sampleOptions .resolution [0] = this .getTessellation (this .controlPointNode .getSize ());
      this .sampleOptions .closed         = closed;
      this .sampleOptions .haveWeights    = !! weights;

      const
         mesh        = nurbs .sample (this .mesh, this .surface, this .sampleOptions),
         points      = mesh .points,
         numPoints   = points .length - 3,
         vertexArray = this .getVertices ();

      for (let i = 0; i < numPoints; i += 3)
      {
         vertexArray .push (points [i + 0], points [i + 1], points [i + 2], 1,
                            points [i + 3], points [i + 4], points [i + 5], 1);
      }
   },
   dispose ()
   {
      X3DParametricGeometryNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (NurbsCurve,
{
   ... X3DNode .getStaticProperties ("NurbsCurve", "NURBS", 1, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tessellation", new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "closed",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "order",        new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "knot",         new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "weight",       new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "controlPoint", new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default NurbsCurve;
