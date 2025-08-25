import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DNurbsControlCurveNode from "./X3DNurbsControlCurveNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import Vector3                  from "../../../standard/Math/Numbers/Vector3.js";

function ContourPolyline2D (executionContext)
{
   X3DNurbsControlCurveNode .call (this, executionContext);

   this .addType (X3DConstants .ContourPolyline2D);

   this .array = [ ];
}

Object .assign (Object .setPrototypeOf (ContourPolyline2D .prototype, X3DNurbsControlCurveNode .prototype),
{
   tessellate (type, array = this .array)
   {
      const
         controlPoints    = this ._controlPoint .getValue (),
         numControlPoints = this ._controlPoint .length * 2;

      switch (type)
      {
         case 0:
         {
            array .length = 0;

            for (let i = 0; i < numControlPoints; i += 2)
               array .push (controlPoints [i], controlPoints [i + 1]);

            break;
         }
         case 1:
         {
            array .length = 0;

            for (let i = 0; i < numControlPoints; i += 2)
               array .push (controlPoints [i], 0, controlPoints [i + 1]);

            break;
         }
         case 2: // Contour2D
         {
            for (let i = 0; i < numControlPoints; i += 2)
               array .push (new Vector3 (controlPoints [i], controlPoints [i + 1], 0));

            break;
         }
      }

      return array;
   },
});

Object .defineProperties (ContourPolyline2D,
{
   ... X3DNode .getStaticProperties ("ContourPolyline2D", "NURBS", 3, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "controlPoint", new Fields .MFVec2d ()),
      ]),
      enumerable: true,
   },
});

export default ContourPolyline2D;
