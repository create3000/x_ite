/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"x_ite/Components",
	"x_ite/Components/RigidBodyPhysics/BallJoint",
	"x_ite/Components/RigidBodyPhysics/CollidableOffset",
	"x_ite/Components/RigidBodyPhysics/CollidableShape",
	"x_ite/Components/RigidBodyPhysics/CollisionCollection",
	"x_ite/Components/RigidBodyPhysics/CollisionSensor",
	"x_ite/Components/RigidBodyPhysics/CollisionSpace",
	"x_ite/Components/RigidBodyPhysics/Contact",
	"x_ite/Components/RigidBodyPhysics/DoubleAxisHingeJoint",
	"x_ite/Components/RigidBodyPhysics/MotorJoint",
	"x_ite/Components/RigidBodyPhysics/RigidBody",
	"x_ite/Components/RigidBodyPhysics/RigidBodyCollection",
	"x_ite/Components/RigidBodyPhysics/SingleAxisHingeJoint",
	"x_ite/Components/RigidBodyPhysics/SliderJoint",
	"x_ite/Components/RigidBodyPhysics/UniversalJoint",
	"x_ite/Components/RigidBodyPhysics/X3DNBodyCollidableNode",
	"x_ite/Components/RigidBodyPhysics/X3DNBodyCollisionSpaceNode",
	"x_ite/Components/RigidBodyPhysics/X3DRigidJointNode",
],
function (Components,
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
          X3DNBodyCollidableNode,
          X3DNBodyCollisionSpaceNode,
          X3DRigidJointNode)
{
"use strict";

	Components .addComponent ({
		name: "RigidBodyPhysics",
		types:
		{
			BallJoint:            BallJoint,
			CollidableOffset:     CollidableOffset,
			CollidableShape:      CollidableShape,
			CollisionCollection:  CollisionCollection,
			CollisionSensor:      CollisionSensor,
			CollisionSpace:       CollisionSpace,
			Contact:              Contact,
			DoubleAxisHingeJoint: DoubleAxisHingeJoint,
			MotorJoint:           MotorJoint,
			RigidBody:            RigidBody,
			RigidBodyCollection:  RigidBodyCollection,
			SingleAxisHingeJoint: SingleAxisHingeJoint,
			SliderJoint:          SliderJoint,
			UniversalJoint:       UniversalJoint,
		},
		abstractTypes:
		{
			X3DNBodyCollidableNode:     X3DNBodyCollidableNode,
			X3DNBodyCollisionSpaceNode: X3DNBodyCollisionSpaceNode,
			X3DRigidJointNode:          X3DRigidJointNode,
		},
	});
});

