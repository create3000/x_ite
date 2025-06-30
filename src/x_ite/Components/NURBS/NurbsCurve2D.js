import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DNurbsControlCurveNode from "./X3DNurbsControlCurveNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import NURBS                    from "../../Browser/NURBS/NURBS.js";
import Vector3                  from "../../../standard/Math/Numbers/Vector3.js";
import nurbs                    from "../../../lib/nurbs/nurbs.js";

function NurbsCurve2D (executionContext)
{
   X3DNurbsControlCurveNode .call (this, executionContext);

   this .addType (X3DConstants .NurbsCurve2D);

   this .knots         = [ ];
   this .weights       = [ ];
   this .controlPoints = [ ];
   this .mesh          = { };
   this .sampleOptions = { resolution: [ ] };
   this .array         = [ ];
}

Object .assign (Object .setPrototypeOf (NurbsCurve2D .prototype, X3DNurbsControlCurveNode .prototype),
{
   getTessellation (dimension)
   {
      return NURBS .getTessellation (this ._tessellation .getValue (), dimension);
   },
   getClosed (order, knot, weight, controlPoint)
   {
      if (!this ._closed .getValue ())
         return false;

      return NURBS .getClosed2D (order, knot, weight, controlPoint);
   },
   getKnots (result, closed, order, dimension, knot)
   {
      return NURBS .getKnots (result, closed, order, dimension, knot);
   },
   getWeights (result, dimension, weight)
   {
      return NURBS .getWeights (result, dimension, weight);
   },
   getControlPoints (result, closed, order, weights, controlPoint)
   {
      return NURBS .getControlPoints2D (result, closed, order, weights, controlPoint);
   },
   tessellate (type, array = this .array)
   {
      if (this ._order .getValue () < 2)
         return array;

      if (this ._controlPoint .length < this ._order .getValue ())
         return array;

      // Order and dimension are now positive numbers.

      const
         closed        = this .getClosed (this ._order .getValue (), this ._knot, this ._weight, this ._controlPoint),
         weights       = this .getWeights (this .weights, this ._controlPoint .length, this ._weight),
         controlPoints = this .getControlPoints (this .controlPoints, closed, this ._order .getValue (), weights, this ._controlPoint);

      // Knots

      const
         knots = this .getKnots (this .knots, closed, this ._order .getValue (), this ._controlPoint .length, this ._knot),
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

      this .sampleOptions .resolution [0] = this .getTessellation (this ._controlPoint .length);
      this .sampleOptions .closed         = closed;
      this .sampleOptions .haveWeights    = !! weights;

      const
         mesh      = nurbs .sample (this .mesh, this .surface, this .sampleOptions),
         points    = mesh .points,
         numPoints = points .length;

      switch (type)
      {
         case 0:
         {
            array .length = 0;

            for (const p of points)
               array .push (p);

            break;
         }
         case 1:
         {
            array .length = 0;

            for (let i = 0; i < numPoints; i += 2)
               array .push (points [i], 0, points [i + 1]);

            break;
         }
         case 2: // Contour2D
         {
            for (let i = 0; i < numPoints; i += 2)
               array .push (new Vector3 (points [i], points [i + 1], 0));

            break;
         }
      }

      return array;
   },
});

Object .defineProperties (NurbsCurve2D,
{
   ... X3DNode .getStaticProperties ("NurbsCurve2D", "NURBS", 3, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tessellation", new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "closed",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "order",        new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "knot",         new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "weight",       new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "controlPoint", new Fields .MFVec2d ()),
      ]),
      enumerable: true,
   },
});

export default NurbsCurve2D;
