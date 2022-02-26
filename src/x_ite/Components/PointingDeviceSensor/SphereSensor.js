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
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/PointingDeviceSensor/X3DDragSensorNode",
   "x_ite/Bits/X3DConstants",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Rotation4",
   "standard/Math/Numbers/Matrix4",
   "standard/Math/Geometry/Triangle3",
   "standard/Math/Geometry/Line3",
   "standard/Math/Geometry/Plane3",
   "standard/Math/Geometry/Sphere3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DDragSensorNode,
          X3DConstants,
          Vector3,
          Rotation4,
          Matrix4,
          Triangle3,
          Line3,
          Plane3,
          Sphere3)
{
"use strict";

   function SphereSensor (executionContext)
   {
      X3DDragSensorNode .call (this, executionContext);

      this .addType (X3DConstants .SphereSensor);
   }

   SphereSensor .prototype = Object .assign (Object .create (X3DDragSensorNode .prototype),
   {
      constructor: SphereSensor,
      [Symbol .for ("X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",        new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "autoOffset",         new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "offset",             new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "trackPoint_changed", new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "rotation_changed",   new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isOver",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",           new Fields .SFBool ()),
      ]),
      getTypeName: function ()
      {
         return "SphereSensor";
      },
      getComponentName: function ()
      {
         return "PointingDeviceSensor";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DDragSensorNode .prototype .initialize .call (this);

         this .modelViewMatrix    = new Matrix4 ();
         this .invModelViewMatrix = new Matrix4 ();

         this .sphere      = null;
         this .zPlane      = null;
         this .behind      = false;
         this .fromVector  = new Vector3 (0, 0, 0);
         this .startPoint  = new Vector3 (0, 0, 0);
         this .startOffset = new Rotation4 (0, 0, 1, 0);
      },
      getTrackPoint: function (hitRay, trackPoint, behind)
      {
         var exit = new Vector3 (0, 0, 0);

         if (this .sphere .intersectsLine (hitRay, trackPoint, exit))
         {
            if ((Vector3 .subtract (hitRay .point, exit) .abs () < Vector3 .subtract (hitRay .point, trackPoint) .abs ()) - behind)
               trackPoint .assign (exit);

            return true;
         }

         return false;
      },
      set_active__: function (active, hit, modelViewMatrix, projectionMatrix, viewport)
      {
         X3DDragSensorNode .prototype .set_active__ .call (this, active, hit, modelViewMatrix, projectionMatrix, viewport);

         try
         {
            if (this .isActive_ .getValue ())
            {
               this .modelViewMatrix    .assign (modelViewMatrix);
               this .invModelViewMatrix .assign (modelViewMatrix) .inverse ();

               var
                  hitPoint = this .invModelViewMatrix .multVecMatrix (hit .intersection .point .copy ()),
                  center   = new Vector3 (0, 0, 0);

               this .zPlane = new Plane3 (center, this .invModelViewMatrix .multDirMatrix (new Vector3 (0, 0, 1)) .normalize ()); // Screen aligned Z-plane
               this .sphere = new Sphere3 (hitPoint .abs (), center);
               this .behind = this .zPlane .getDistanceToPoint (hitPoint) < 0;

               this .fromVector  .assign (hitPoint);
               this .startPoint  .assign (hitPoint);
               this .startOffset .assign (this .offset_ .getValue ());

               this .trackPoint_changed_ = hitPoint;
               this .rotation_changed_   = this .offset_ .getValue ();
            }
            else
            {
               if (this .autoOffset_ .getValue ())
                  this .offset_ = this .rotation_changed_;
            }
         }
         catch (error)
         {
            //console .log (error);
         }
      },
      set_motion__: function (hit)
      {
         try
         {
            var
               hitRay     = hit .hitRay .copy () .multLineMatrix (this .invModelViewMatrix),
               trackPoint = new Vector3 (0, 0, 0);

            if (this .getTrackPoint (hitRay, trackPoint, this .behind))
            {
               var zAxis = this .invModelViewMatrix .multDirMatrix (new Vector3 (0, 0, 1)) .normalize (); // Camera direction
               this .zPlane = new Plane3 (trackPoint, zAxis);                                             // Screen aligned Z-plane
            }
            else
            {
               // Find trackPoint on the plane with sphere

               var tangentPoint = new Vector3 (0, 0, 0);
               this .zPlane .intersectsLine (hitRay, tangentPoint);

               hitRay = new Line3 (tangentPoint, Vector3 .subtract (this .sphere .center, tangentPoint) .normalize ());

               //console .log (hitRay .toString ());

               this .getTrackPoint (hitRay, trackPoint, false);

               // Find trackPoint behind sphere

               var
                  triNormal     = Triangle3 .normal (this .sphere .center, trackPoint, this .startPoint, new Vector3 (0, 0, 0)),
                  dirFromCenter = Vector3 .subtract (trackPoint, this .sphere .center) .normalize (),
                  normal        = Vector3 .cross (triNormal, dirFromCenter) .normalize ();

               var point1 = Vector3 .subtract (trackPoint, normal .multiply (Vector3 .subtract (tangentPoint, trackPoint) .abs ()));

               hitRay = new Line3 (point1, Vector3 .subtract (this .sphere .center, point1) .normalize ());

               this .getTrackPoint (hitRay, trackPoint, false);
            }

            this .trackPoint_changed_ = trackPoint;

            var
               toVector = Vector3 .subtract (trackPoint, this .sphere .center),
               rotation = new Rotation4 (this .fromVector, toVector);

            if (this .behind)
               rotation .inverse ();

            this .rotation_changed_ = Rotation4 .multRight (this .startOffset, rotation);
         }
         catch (error)
         {
            //console .log (error);

            this .trackPoint_changed_ .addEvent ();
            this .rotation_changed_   .addEvent ();
         }
      },
   });

   return SphereSensor;
});
