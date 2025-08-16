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

function SingleAxisHingeJoint (executionContext)
{
   X3DRigidJointNode .call (this, executionContext);

   this .addType (X3DConstants .SingleAxisHingeJoint);

   // Units

   this ._anchorPoint      .setUnit ("length");
   this ._minAngle         .setUnit ("angle");
   this ._maxAngle         .setUnit ("angle");
   this ._body1AnchorPoint .setUnit ("length");
   this ._body2AnchorPoint .setUnit ("length");
   this ._angle            .setUnit ("angle");
   this ._angleRate        .setUnit ("angularRate");

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
      this ._axis = new Vector3 ();

   // Private properties

   this .joint             = null;
   this .outputs           = new Set ();
   this .localAnchorPoint1 = new Vector3 ();
   this .localAnchorPoint2 = new Vector3 ();
}

Object .assign (Object .setPrototypeOf (SingleAxisHingeJoint .prototype, X3DRigidJointNode .prototype),
{
   initialize ()
   {
      X3DRigidJointNode .prototype .initialize .call (this);

      this ._anchorPoint .addInterest ("set_joint__", this);
      this ._axis        .addInterest ("set_joint__", this);
   },
   addJoint: (() =>
   {
      const
         localAxis1 = new Vector3 (),
         localAxis2 = new Vector3 ();

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

         const
            localAnchorPoint1 = this .localAnchorPoint1,
            localAnchorPoint2 = this .localAnchorPoint2;

         localAnchorPoint1 .assign (this ._anchorPoint .getValue ());
         localAnchorPoint2 .assign (this ._anchorPoint .getValue ());
         localAxis1        .assign (this ._axis .getValue ());
         localAxis2        .assign (this ._axis .getValue ());

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
      if (this .joint)
      {
         this .getCollection () ?.getDynamicsWorld () .removeConstraint (this .joint);

         Ammo .destroy (this .joint);
         this .joint = null;
      }
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
            this .outputs .add ("angle");
            this .outputs .add ("angularRate");
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
      const localAnchorPoint1 = new Vector3 ();

      return function ()
      {
         if (this .outputs .has ("body1AnchorPoint"))
            this ._body1AnchorPoint = this .getBody1 () .getMatrix () .multVecMatrix (this .getInitialInverseMatrix1 () .multVecMatrix (localAnchorPoint1 .assign (this .localAnchorPoint1)));
      };
   })(),
   update2: (() =>
   {
      const
         localAnchorPoint2 = new Vector3 (),
         difference        = new Matrix4 (),
         rotation          = new Rotation4 ();

      return function ()
      {
         if (this .outputs .has ("body2AnchorPoint"))
            this ._body2AnchorPoint = this .getBody2 () .getMatrix () .multVecMatrix (this .getInitialInverseMatrix2 () .multVecMatrix (localAnchorPoint2 .assign (this .localAnchorPoint2)));

         if (this .outputs .has ("angle"))
         {
            const lastAngle  = this ._angle .getValue ();

            difference .assign (this .getInitialInverseMatrix2 ()) .multRight (this .getBody2 () .getMatrix ());
            difference .get (null, rotation);

            this ._angle = rotation .angle;

            if (this .outputs .has ("angleRate"))
               this ._angleRate = (this ._angle .getValue () - lastAngle) * this .getBrowser () .getCurrentFrameRate ();
         }
      };
   })(),
});

Object .defineProperties (SingleAxisHingeJoint,
{
   ... X3DNode .getStaticProperties ("SingleAxisHingeJoint", "RigidBodyPhysics", 2, "joints", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "forceOutput",         new Fields .MFString ("NONE")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "anchorPoint",         new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "axis",                new Fields .SFVec3f (0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "minAngle",            new Fields .SFFloat (-3.141592653)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "maxAngle",            new Fields .SFFloat (3.141592653)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "stopBounce",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "stopErrorCorrection", new Fields .SFFloat (0.8)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "body1AnchorPoint",    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "body2AnchorPoint",    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "angle",               new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "angleRate",           new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "body1",               new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "body2",               new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default SingleAxisHingeJoint;
