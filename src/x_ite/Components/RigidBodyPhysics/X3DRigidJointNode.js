import Fields       from "../../Fields.js";
import X3DNode      from "../Core/X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import X3DCast      from "../../Base/X3DCast.js";
import Matrix4      from "../../../standard/Math/Numbers/Matrix4.js";

function X3DRigidJointNode (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .X3DRigidJointNode);

   this .addChildObjects (X3DConstants .inputOutput, "collection", new Fields .SFNode ());

   this .initialInverseMatrix1 = new Matrix4 ();
   this .initialInverseMatrix2 = new Matrix4 ();
   this .output                = false;
}

Object .assign (Object .setPrototypeOf (X3DRigidJointNode .prototype, X3DNode .prototype),
{
   initialize ()
   {
      X3DNode .prototype .initialize .call (this);

      this ._forceOutput .addInterest ("set_forceOutput__", this);
      this ._body1       .addInterest ("set_body1__",       this);
      this ._body2       .addInterest ("set_body2__",       this);

      this .set_forceOutput__ ();
      this .set_body1__ ();
      this .set_body2__ ();
   },
   setCollection (value)
   {
      this .removeJoint ();

      this ._collection = value;

      this .addJoint ();
   },
   getCollection ()
   {
      return this ._collection .getValue ();
   },
   getBody1 ()
   {
      return this .bodyNode1;
   },
   getBody2 ()
   {
      return this .bodyNode2;
   },
   getInitialInverseMatrix1 ()
   {
      return this .initialInverseMatrix1;
   },
   getInitialInverseMatrix2 ()
   {
      return this .initialInverseMatrix2;
   },
   setOutput (value)
   {
      this .output = value;

      if (value)
      {
         if (this .bodyNode1)
            this .bodyNode1 .addInterest ("update1", this);

         if (this .bodyNode2)
            this .bodyNode2 .addInterest ("update2", this);
      }
      else
      {
         if (this .bodyNode1)
            this .bodyNode1 .removeInterest ("update1", this);

         if (this .bodyNode2)
            this .bodyNode2 .removeInterest ("update2", this);
      }
   },
   addJoint ()
   { },
   removeJoint ()
   { },
   set_forceOutput__ ()
   { },
   set_joint__ ()
   {
      this .removeJoint ();
      this .addJoint ();
   },
   set_body1__ ()
   {
      this .removeJoint ();

      if (this .bodyNode1)
      {
         this .bodyNode1 .removeInterest ("update1", this);
         this .bodyNode1 ._collection .removeInterest ("set_joint__", this);
      }

      this .bodyNode1 = X3DCast (X3DConstants .RigidBody, this ._body1);

      if (this .bodyNode1)
      {
         this .bodyNode1 ._collection .addInterest ("set_joint__", this);

         this .initialize1 ();
         this .addJoint ();
         this .setOutput (this .output);
      }
   },
   set_body2__ ()
   {
      this .removeJoint ();

      if (this .bodyNode2)
      {
         this .bodyNode2 .removeInterest ("update2", this);
         this .bodyNode2 ._collection .removeInterest ("set_joint__", this);
      }

      this .bodyNode2 = X3DCast (X3DConstants .RigidBody, this ._body2);

      if (this .bodyNode2)
      {
         this .bodyNode2 ._collection .addInterest ("set_joint__", this);

         this .initialize2 ();
         this .addJoint ();
         this .setOutput (this .output);
      }
   },
   initialize1 ()
   {
      this .initialInverseMatrix1 .set (this .bodyNode1 ._position .getValue (), this .bodyNode1 ._orientation .getValue ());
      this .initialInverseMatrix1 .inverse ();
   },
   initialize2 ()
   {
      this .initialInverseMatrix2 .set (this .bodyNode2 ._position .getValue (), this .bodyNode2 ._orientation .getValue ());
      this .initialInverseMatrix2 .inverse ();
   },
   update1 ()
   { },
   update2 ()
   { },
   dispose ()
   {
      this .removeJoint ();

      X3DNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (X3DRigidJointNode, X3DNode .getStaticProperties ("X3DRigidJointNode", "RigidBodyPhysics", 2));

export default X3DRigidJointNode;
