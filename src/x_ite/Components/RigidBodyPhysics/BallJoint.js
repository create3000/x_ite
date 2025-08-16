import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DRigidJointNode    from "./X3DRigidJointNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Ammo                 from "../../../lib/ammojs/AmmoClass.js";

function BallJoint (executionContext)
{
   X3DRigidJointNode .call (this, executionContext);

   this .addType (X3DConstants .BallJoint);

   this ._anchorPoint .setUnit ("length");

   // Units

   this .joint             = null;
   this .outputs           = new Set ();
   this .localAnchorPoint1 = new Vector3 ();
   this .localAnchorPoint2 = new Vector3 ();
}

Object .assign (Object .setPrototypeOf (BallJoint .prototype, X3DRigidJointNode .prototype),
{
   initialize ()
   {
      X3DRigidJointNode .prototype .initialize .call (this);

      this ._anchorPoint .addInterest ("set_anchorPoint__", this);
   },
   addJoint ()
   {
      if (!this .getCollection ())
         return;

      if (!this .getBody1 ())
         return;

      if (!this .getBody2 ())
         return;

      if (this .getBody1 () .getCollection () !== this .getCollection ())
         return;

      if (this .getBody2 () .getCollection () !== this .getCollection ())
         return;

      this .joint = new Ammo .btPoint2PointConstraint (this .getBody1 () .getRigidBody (),
                                                       this .getBody2 () .getRigidBody (),
                                                       new Ammo .btVector3 (),
                                                       new Ammo .btVector3 ());

      this .set_anchorPoint__ ();

      this .getCollection () .getDynamicsWorld () .addConstraint (this .joint, true);
   },
   removeJoint ()
   {
      if (!this .joint)
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
         }
         else
         {
            this .outputs .add (value);
         }
      }

      this .setOutput (!! this .outputs .size);
   },
   set_anchorPoint__ ()
   {
      if (this .joint)
      {
         const
            localAnchorPoint1 = this .localAnchorPoint1,
            localAnchorPoint2 = this .localAnchorPoint2;

         this .getInitialInverseMatrix1 () .multVecMatrix (localAnchorPoint1 .assign (this ._anchorPoint .getValue ()));
         this .getInitialInverseMatrix2 () .multVecMatrix (localAnchorPoint2 .assign (this ._anchorPoint .getValue ()));

         this .joint .setPivotA (new Ammo .btVector3 (localAnchorPoint1 .x, localAnchorPoint1 .y, localAnchorPoint1 .z));
         this .joint .setPivotB (new Ammo .btVector3 (localAnchorPoint2 .x, localAnchorPoint2 .y, localAnchorPoint2 .z));
      }
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
      const localAnchorPoint2 = new Vector3 ();

      return function ()
      {
         if (this .outputs .has ("body2AnchorPoint"))
            this ._body2AnchorPoint = this .getBody2 () .getMatrix () .multVecMatrix (this .getInitialInverseMatrix2 () .multVecMatrix (localAnchorPoint2 .assign (this .localAnchorPoint2)));
      };
   })(),
});

Object .defineProperties (BallJoint,
{
   ... X3DNode .getStaticProperties ("BallJoint", "RigidBodyPhysics", 2, "joints", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "forceOutput",      new Fields .MFString ("NONE")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "anchorPoint",      new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "body1AnchorPoint", new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "body2AnchorPoint", new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "body1",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "body2",            new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default BallJoint;
