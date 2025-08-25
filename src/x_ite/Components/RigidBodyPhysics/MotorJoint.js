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

function MotorJoint (executionContext)
{
   X3DRigidJointNode .call (this, executionContext);

   this .addType (X3DConstants .MotorJoint);

   // Units

   this ._axis1Angle      .setUnit ("angle");
   this ._axis2Angle      .setUnit ("angle");
   this ._axis3Angle      .setUnit ("angle");
   this ._motor1Angle     .setUnit ("angle");
   this ._motor2Angle     .setUnit ("angle");
   this ._motor3Angle     .setUnit ("angle");
   this ._motor1AngleRate .setUnit ("angularRate");
   this ._motor2AngleRate .setUnit ("angularRate");
   this ._motor3AngleRate .setUnit ("angularRate");

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
   {
      this ._motor1Axis = new Vector3 ();
      this ._motor2Axis = new Vector3 ();
      this ._motor3Axis = new Vector3 ();
   }
}

Object .setPrototypeOf (MotorJoint .prototype, X3DRigidJointNode .prototype);

Object .defineProperties (MotorJoint,
{
   ... X3DNode .getStaticProperties ("MotorJoint", "RigidBodyPhysics", 2, "joints", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "autoCalc",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "forceOutput",          new Fields .MFString ("NONE")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "axis1Angle",           new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "axis2Angle",           new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "axis3Angle",           new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "axis1Torque",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "axis2Torque",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "axis3Torque",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabledAxes",          new Fields .SFInt32 (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "motor1Axis",           new Fields .SFVec3f (1, 0, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "motor2Axis",           new Fields .SFVec3f (0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "motor3Axis",           new Fields .SFVec3f (0, 0, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "stop1Bounce",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "stop2Bounce",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "stop3Bounce",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "stop1ErrorCorrection", new Fields .SFFloat (0.8)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "stop2ErrorCorrection", new Fields .SFFloat (0.8)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "stop3ErrorCorrection", new Fields .SFFloat (0.8)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "motor1Angle",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "motor2Angle",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "motor3Angle",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "motor1AngleRate",      new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "motor2AngleRate",      new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "motor3AngleRate",      new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "body1",                new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "body2",                new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default MotorJoint;
