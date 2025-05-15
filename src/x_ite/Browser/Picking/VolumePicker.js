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

import Vector3   from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4 from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4   from "../../../standard/Math/Numbers/Matrix4.js";
import Ammo      from "../../../lib/ammojs/AmmoClass.js";

function VolumePicker ()
{
   this .broadphase             = new Ammo .btDbvtBroadphase ();
   this .collisionConfiguration = new Ammo .btDefaultCollisionConfiguration ();
   this .dispatcher             = new Ammo .btCollisionDispatcher (this .collisionConfiguration);
   this .collisionWorld         = new Ammo .btCollisionWorld (this .dispatcher, this .broadphase, this .collisionConfiguration);

   this .compoundShape1         = new Ammo .btCompoundShape ();
   this .motionState1           = new Ammo .btDefaultMotionState ();
   this .constructionInfo1      = new Ammo .btRigidBodyConstructionInfo (0, this .motionState1, this .compoundShape1);
   this .rigidBody1             = new Ammo .btRigidBody (this .constructionInfo1);

   this .compoundShape2         = new Ammo .btCompoundShape ();
   this .motionState2           = new Ammo .btDefaultMotionState ();
   this .constructionInfo2      = new Ammo .btRigidBodyConstructionInfo (0, this .motionState2, this .compoundShape2);
   this .rigidBody2             = new Ammo .btRigidBody (this .constructionInfo2);

   this .collisionWorld .addCollisionObject (this .rigidBody1);
   this .collisionWorld .addCollisionObject (this .rigidBody2);
}

Object .assign (VolumePicker .prototype,
{
   constuctor: VolumePicker,
   setChildShape1 (matrix, childShape)
   {
      this .setChildShape (this .compoundShape1, matrix, childShape);
   },
   setChildShape2 (matrix, childShape)
   {
      this .setChildShape (this .compoundShape2, matrix, childShape);
   },
   setChildShape1Components (transform, localScaling, childShape)
   {
      this .setChildShapeComponents (this .compoundShape1, transform, localScaling, childShape);
   },
   setChildShape2Components (transform, localScaling, childShape)
   {
      this .setChildShapeComponents (this .compoundShape2, transform, localScaling, childShape);
   },
   setChildShape: (() =>
   {
      const
         translation = new Vector3 (),
         rotation    = new Rotation4 (),
         scale       = new Vector3 (1),
         s           = new Ammo .btVector3 (0, 0, 0);

      return function (compoundShape, matrix, childShape)
      {
         if (compoundShape .getNumChildShapes ())
            compoundShape .removeChildShapeByIndex (0);

         if (childShape .getNumChildShapes ())
         {
            matrix .get (translation, rotation, scale);

            s .setValue (scale .x, scale .y, scale .z);

            childShape .setLocalScaling (s);
            compoundShape .addChildShape (this .getTransform (translation, rotation), childShape);
         }
      };
   })(),
   setChildShapeComponents (compoundShape, transform, localScaling, childShape)
   {
      if (compoundShape .getNumChildShapes ())
         compoundShape .removeChildShapeByIndex (0);

      if (childShape .getNumChildShapes ())
      {
         childShape .setLocalScaling (localScaling);
         compoundShape .addChildShape (transform, childShape);
      }
   },
   contactTest ()
   {
      this .collisionWorld .performDiscreteCollisionDetection ();

      const numManifolds = this .dispatcher .getNumManifolds ();

      for (let i = 0; i < numManifolds; ++ i)
      {
         const
            contactManifold = this .dispatcher .getManifoldByIndexInternal (i),
            numContacts     = contactManifold .getNumContacts ();

         for (let j = 0; j < numContacts; ++ j)
         {
            const pt = contactManifold .getContactPoint (j);

            if (pt .getDistance () <= 0)
               return true;
         }
      }

      return false;
   },
   getTransform: (() =>
   {
      const
         T = new Ammo .btTransform (),
         o = new Ammo .btVector3 (0, 0, 0),
         m = new Matrix4 ();

      return function (translation, rotation, transform)
      {
         const t = transform || T;

         m .set (translation, rotation);

         o .setValue (m [12], m [13], m [14]);

         t .getBasis () .setValue (m [0], m [4], m [8],
                                   m [1], m [5], m [9],
                                   m [2], m [6], m [10]);

         t .setOrigin (o);

         return t;
      };
   })(),
});

export default VolumePicker;
