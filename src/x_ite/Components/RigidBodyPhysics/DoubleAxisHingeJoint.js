import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DRigidJointNode    from "./X3DRigidJointNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import Ammo                 from "../../../lib/ammojs/AmmoClass.js";

function DoubleAxisHingeJoint (executionContext)
{
   X3DRigidJointNode .call (this, executionContext);

   this .addType (X3DConstants .DoubleAxisHingeJoint);

   // Units

   this ._anchorPoint             .setUnit ("length");
   this ._minAngle1               .setUnit ("angle");
   this ._maxAngle1               .setUnit ("angle");
   this ._desiredAngularVelocity1 .setUnit ("angularRate");
   this ._desiredAngularVelocity2 .setUnit ("angularRate");
   this ._stop1ConstantForceMix   .setUnit ("force");
   this ._suspensionForce         .setUnit ("force");

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
   {
      this .addAlias ("stopBounce1",           this ._stop1Bounce);
      this .addAlias ("stopConstantForceMix1", this ._stop1ConstantForceMix);
      this .addAlias ("stopErrorCorrection1",  this ._stop1ErrorCorrection);

      this ._axis1 = new Vector3 ();
      this ._axis2 = new Vector3 ();
   }

   // Private properties

   this .joint             = null;
   this .outputs           = new Set ();
   this .localAnchorPoint1 = new Vector3 ();
   this .localAnchorPoint2 = new Vector3 ();
   this .localAxis1        = new Vector3 ();
   this .localAxis2        = new Vector3 ();
}

Object .assign (Object .setPrototypeOf (DoubleAxisHingeJoint .prototype, X3DRigidJointNode .prototype),
{
   initialize ()
   {
      X3DRigidJointNode .prototype .initialize .call (this);

      this ._anchorPoint .addInterest ("set_joint__", this);
      this ._axis1       .addInterest ("set_joint__", this);
      this ._axis2       .addInterest ("set_joint__", this);
   },
   addJoint: (() =>
   {
      const
         localAnchorPoint1 = new Vector3 (),
         localAnchorPoint2 = new Vector3 (),
         localAxis1        = new Vector3 (),
         localAxis2        = new Vector3 ();

      return function ()
      {
         if (! this .getCollection ())
            return;

         if (! this .getBody1 ())
            return;

         if (! this .getBody2 ())
            return;

         if (this .getBody1 () .getCollection () !== this .getCollection ())
            return;

         if (this .getBody2 () .getCollection () !== this .getCollection ())
            return;

         localAnchorPoint1 .assign (this ._anchorPoint .getValue ());
         localAnchorPoint2 .assign (this ._anchorPoint .getValue ());
         localAxis1        .assign (this ._axis1 .getValue ());
         localAxis2        .assign (this ._axis2 .getValue ());

         this .getInitialInverseMatrix1 () .multVecMatrix (localAnchorPoint1);
         this .getInitialInverseMatrix2 () .multVecMatrix (localAnchorPoint2);
         this .getInitialInverseMatrix1 () .multDirMatrix (localAxis1) .normalize ();
         this .getInitialInverseMatrix2 () .multDirMatrix (localAxis2) .normalize ();

         this .joint = new Ammo .btHingeConstraint (this .getBody1 () .getRigidBody (),
                                                    this .getBody2 () .getRigidBody (),
                                                    new Ammo .btVector3 (localAnchorPoint1 .x, localAnchorPoint1 .y, localAnchorPoint1 .z),
                                                    new Ammo .btVector3 (localAnchorPoint2 .x, localAnchorPoint2 .y, localAnchorPoint2 .z),
                                                    new Ammo .btVector3 (localAxis1 .x, localAxis1 .y, localAxis1 .z),
                                                    new Ammo .btVector3 (localAxis2 .x, localAxis2 .y, localAxis2 .z),
                                                    false);

         this .getCollection () .getDynamicsWorld () .addConstraint (this .joint, true);
      };
   })(),
   removeJoint ()
   {
      if (! this .joint)
         return;

      this .getCollection () ?.getDynamicsWorld () .removeConstraint (this .joint);

      Ammo .destroy (this .joint);
      this .joint = null;
   },
   set_forceOutput__ ()
   {
      this .outputs .clear ();

      for (const value of this ._forceOutput)
      {
         if (value == "ALL")
         {
            this .outputs .add ("body1AnchorPoint");
            this .outputs .add ("body2AnchorPoint");
            this .outputs .add ("body1Axis");
            this .outputs .add ("body2Axis");
            this .outputs .add ("hinge1Angle");
            this .outputs .add ("hinge2Angle");
            this .outputs .add ("hinge1AngleRate");
            this .outputs .add ("hinge2AngleRate");
         }
         else
         {
            this .outputs .add (value);
         }
      }

      this .setOutput (!! this .outputs .size);
   },
   update1: (() =>
   {
      const
         localAnchorPoint1 = new Vector3 (),
         localAxis1        = new Vector3 (),
         difference        = new Matrix4 (),
         rotation          = new Rotation4 ();

      return function ()
      {
         if (this .outputs .has ("body1AnchorPoint"))
            this ._body1AnchorPoint = this .getBody1 () .getMatrix () .multVecMatrix (this .getInitialInverseMatrix1 () .multVecMatrix (localAnchorPoint1 .assign (this .localAnchorPoint1)));

         if (this .outputs .has ("body1Axis"))
            this ._body1Axis = this .getInitialInverseMatrix1 () .multDirMatrix (this .getBody1 () .getMatrix () .multDirMatrix (localAxis1 .assign (this .localAxis1))) .normalize ();

         if (this .outputs .has ("hinge1Angle"))
         {
            const lastAngle  = this ._hinge1Angle .getValue ();

            difference .assign (this .getInitialInverseMatrix1 ()) .multRight (this .getBody1 () .getMatrix ());
            difference .get (null, rotation);

            this ._hinge1Angle = rotation .angle;

            if (this .outputs .has ("angleRate"))
               this ._hinge1AngleRate = (this ._hinge1Angle .getValue () - lastAngle) * this .getBrowser () .getCurrentFrameRate ();
         }
      };
   })(),
   update2: (() =>
   {
      const
         localAnchorPoint2 = new Vector3 (),
         localAxis2        = new Vector3 (),
         difference        = new Matrix4 (),
         rotation          = new Rotation4 ();

      return function ()
      {
         if (this .outputs .has ("body2AnchorPoint"))
            this ._body2AnchorPoint = this .getBody2 () .getMatrix () .multVecMatrix (this .getInitialInverseMatrix2 () .multVecMatrix (localAnchorPoint2 .assign (this .localAnchorPoint2)));

         if (this .outputs .has ("body2Axis"))
            this ._body2Axis = this .getInitialInverseMatrix2 () .multDirMatrix (this .getBody2 () .getMatrix () .multDirMatrix (localAxis2 .assign (this .localAxis2))) .normalize ();

         if (this .outputs .has ("hinge2Angle"))
         {
            const lastAngle  = this ._hinge2Angle .getValue ();

            difference .assign (this .getInitialInverseMatrix2 ()) .multRight (this .getBody2 () .getMatrix ());
            difference .get (null, rotation);

            this ._hinge2Angle = rotation .angle;

            if (this .outputs .has ("angleRate"))
               this ._hinge2AngleRate = (this ._hinge2Angle .getValue () - lastAngle) * this .getBrowser () .getCurrentFrameRate ();
         }
      };
   })(),
});

Object .defineProperties (DoubleAxisHingeJoint,
{
   ... X3DNode .getStaticProperties ("DoubleAxisHingeJoint", "RigidBodyPhysics", 2, "joints", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "forceOutput",               new Fields .MFString ("NONE")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "anchorPoint",               new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "axis1",                     new Fields .SFVec3f (1, 0, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "axis2",                     new Fields .SFVec3f (0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "minAngle1",                 new Fields .SFFloat (-3.141592653)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "maxAngle1",                 new Fields .SFFloat (3.141592653)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "desiredAngularVelocity1",   new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "desiredAngularVelocity2",   new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "maxTorque1",                new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "maxTorque2",                new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "stop1Bounce",               new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "stop1ConstantForceMix",     new Fields .SFFloat (0.001)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "stop1ErrorCorrection",      new Fields .SFFloat (0.8)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "suspensionForce",           new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "suspensionErrorCorrection", new Fields .SFFloat (0.8)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "body1AnchorPoint",          new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "body2AnchorPoint",          new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "body1Axis",                 new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "body2Axis",                 new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "hinge1Angle",               new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "hinge2Angle",               new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "hinge1AngleRate",           new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "hinge2AngleRate",           new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "body1",                     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "body2",                     new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default DoubleAxisHingeJoint;
