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
   getMatrix: (() =>
   {
      const
         bbox    = new Box3 (),
         matrix  = new Matrix4 (),
         epsilon = new Vector3 (1e-6);

      return function ()
      {
         this .boundedObject .getBBox (bbox);

         const
            browser    = this .getBrowser (),
            max        = browser .getRenderingProperty ("ContentScale") === 1 ? Vector3 .Zero : epsilon,
            bboxSize   = bbox .size .max (max),
            bboxCenter = bbox .center;

         return matrix .set (bboxCenter, null, bboxSize);
      };
   })(),
   getShapes (shapes, parentModelViewMatrix)
   {
      const modelViewMatrix = parentModelViewMatrix .copy () .multLeft (this .getMatrix ());

      return this .bboxShape .getShapes (shapes, modelViewMatrix);
   },
   traverse (type, renderObject)
   {
      if (type === TraverseType .PICKING)
         return;

      const modelViewMatrix = renderObject .getModelViewMatrix ();

      modelViewMatrix .push ();
      modelViewMatrix .multLeft (this .getMatrix ());

      this .bboxShape .traverse (type, renderObject);

      modelViewMatrix .pop ();
   },
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
