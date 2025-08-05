import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../../Components/Core/X3DNode.js";
import X3DChildNode         from "../../Components/Core/X3DChildNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import Box3                 from "../../../standard/Math/Geometry/Box3.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

function X3DBBoxNode (executionContext, boundedObject)
{
   X3DChildNode .call (this, executionContext);

   this .boundedObject = boundedObject;
   this .bboxShape     = this .getBrowser () .getBBoxShape ();
}

Object .assign (Object .setPrototypeOf (X3DBBoxNode .prototype, X3DChildNode .prototype),
{
   getShapes (shapes, parentModelViewMatrix)
   {
      const
         browser    = this .getBrowser (),
         max        = browser .getRenderingProperty ("ContentScale") === 1 ? Vector3 .Zero : new Vector3 (1e-6),
         bbox       = this .boundedObject .getBBox (new Box3 ()),
         bboxSize   = bbox .size .max (max),
         bboxCenter = bbox .center;

      const modelViewMatrix = new Matrix4 ()
         .set (bboxCenter, null, bboxSize)
         .multRight (parentModelViewMatrix);

      return this .bboxShape .getShapes (shapes, modelViewMatrix);
   },
   traverse: (() =>
   {
      const
         bbox    = new Box3 (),
         matrix  = new Matrix4 (),
         epsilon = new Vector3 (1e-6);

      return function (type, renderObject)
      {
         if (type === TraverseType .PICKING)
            return;

         this .boundedObject .getBBox (bbox);

         const
            browser         = this .getBrowser (),
            max             = browser .getRenderingProperty ("ContentScale") === 1 ? Vector3 .Zero : epsilon,
            bboxSize        = bbox .size .max (max),
            bboxCenter      = bbox .center,
            modelViewMatrix = renderObject .getModelViewMatrix ();

         matrix .set (bboxCenter, null, bboxSize);

         modelViewMatrix .push ();
         modelViewMatrix .multLeft (matrix);

         this .bboxShape .traverse (type, renderObject);

         modelViewMatrix .pop ();
      };
   })(),
});

Object .defineProperties (X3DBBoxNode,
{
   ... X3DNode .getStaticProperties ("X3DBBoxNode", "Grouping", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default X3DBBoxNode;
