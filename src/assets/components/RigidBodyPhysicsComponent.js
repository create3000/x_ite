import Components                 from "../../x_ite/Components.js";
import BallJoint                  from "../../x_ite/Components/RigidBodyPhysics/BallJoint.js";
import CollidableOffset           from "../../x_ite/Components/RigidBodyPhysics/CollidableOffset.js";
import CollidableShape            from "../../x_ite/Components/RigidBodyPhysics/CollidableShape.js";
import CollisionCollection        from "../../x_ite/Components/RigidBodyPhysics/CollisionCollection.js";
import CollisionSensor            from "../../x_ite/Components/RigidBodyPhysics/CollisionSensor.js";
import CollisionSpace             from "../../x_ite/Components/RigidBodyPhysics/CollisionSpace.js";
import Contact                    from "../../x_ite/Components/RigidBodyPhysics/Contact.js";
import DoubleAxisHingeJoint       from "../../x_ite/Components/RigidBodyPhysics/DoubleAxisHingeJoint.js";
import MotorJoint                 from "../../x_ite/Components/RigidBodyPhysics/MotorJoint.js";
import RigidBody                  from "../../x_ite/Components/RigidBodyPhysics/RigidBody.js";
import RigidBodyCollection        from "../../x_ite/Components/RigidBodyPhysics/RigidBodyCollection.js";
import SingleAxisHingeJoint       from "../../x_ite/Components/RigidBodyPhysics/SingleAxisHingeJoint.js";
import SliderJoint                from "../../x_ite/Components/RigidBodyPhysics/SliderJoint.js";
import UniversalJoint             from "../../x_ite/Components/RigidBodyPhysics/UniversalJoint.js";
import X3DNBodyCollidableNode     from "../../x_ite/Components/RigidBodyPhysics/X3DNBodyCollidableNode.js";
import X3DNBodyCollisionSpaceNode from "../../x_ite/Components/RigidBodyPhysics/X3DNBodyCollisionSpaceNode.js";
import X3DRigidJointNode          from "../../x_ite/Components/RigidBodyPhysics/X3DRigidJointNode.js";

Components .add ({
   name: "RigidBodyPhysics",
   concreteNodes:
   [
      BallJoint,
      CollidableOffset,
      CollidableShape,
      CollisionCollection,
      CollisionSensor,
      CollisionSpace,
      Contact,
      DoubleAxisHingeJoint,
      MotorJoint,
      RigidBody,
      RigidBodyCollection,
      SingleAxisHingeJoint,
      SliderJoint,
      UniversalJoint,
   ],
   abstractNodes:
   [
      X3DNBodyCollidableNode,
      X3DNBodyCollisionSpaceNode,
      X3DRigidJointNode,
   ],
});

export default undefined;
