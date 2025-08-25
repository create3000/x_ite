import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DRigidJointNode    from "./X3DRigidJointNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

/**
 * THIS NODE IS NOT SUPPORTED.
 */

function UniversalJoint (executionContext)
{
   X3DRigidJointNode .call (this, executionContext);

   this .addType (X3DConstants .UniversalJoint);

   // Units

   this ._anchorPoint      .setUnit ("length");
   this ._body1AnchorPoint .setUnit ("length");
   this ._body2AnchorPoint .setUnit ("length");

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
   {
      this ._axis1 = new Vector3 ();
      this ._axis2 = new Vector3 ();
   }
}

Object .setPrototypeOf (UniversalJoint .prototype, X3DRigidJointNode .prototype);

Object .defineProperties (UniversalJoint,
{
   ... X3DNode .getStaticProperties ("UniversalJoint", "RigidBodyPhysics", 2, "joints", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "forceOutput",          new Fields .MFString ("NONE")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "anchorPoint",          new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "axis1",                new Fields .SFVec3f (1, 0, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "axis2",                new Fields .SFVec3f (0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "stop1Bounce",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "stop2Bounce",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "stop1ErrorCorrection", new Fields .SFFloat (0.8)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "stop2ErrorCorrection", new Fields .SFFloat (0.8)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "body1Axis",            new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "body2Axis",            new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "body1AnchorPoint",     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "body2AnchorPoint",     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "body1",                new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "body2",                new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default UniversalJoint;
