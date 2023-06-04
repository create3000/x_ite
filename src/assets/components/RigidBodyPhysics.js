/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

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
