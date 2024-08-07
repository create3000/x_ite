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

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DDragSensorNode    from "./X3DDragSensorNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import Line3                from "../../../standard/Math/Geometry/Line3.js";
import Plane3               from "../../../standard/Math/Geometry/Plane3.js";
import Cylinder3            from "../../../standard/Math/Geometry/Cylinder3.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function CylinderSensor (executionContext)
{
   X3DDragSensorNode .call (this, executionContext);

   this .addType (X3DConstants .CylinderSensor);

   this ._diskAngle .setUnit ("angle");
   this ._minAngle  .setUnit ("angle");
   this ._maxAngle  .setUnit ("angle");
   this ._offset    .setUnit ("angle");
}

Object .assign (Object .setPrototypeOf (CylinderSensor .prototype, X3DDragSensorNode .prototype),
{
   initialize ()
   {
      X3DDragSensorNode .prototype .initialize .call (this);

      this ._axisRotation .addInterest ("set_fields__", this);
      this ._diskAngle    .addInterest ("set_fields__", this);

      this .modelViewMatrix    = new Matrix4 ();
      this .invModelViewMatrix = new Matrix4 ();

      this .cylinder    = new Cylinder3 (new Line3 (new Vector3 (), new Vector3 ()), 0);
      this .disk        = false;
      this .yPlane      = null;
      this .zPlane      = null;
      this .sxPlane     = null;
      this .szNormal    = null;
      this .behind      = false;
      this .fromVector  = new Vector3 ();
      this .startOffset = new Rotation4 ();
   },
   isBehind (hitRay, hitPoint)
   {
      const
         enter = new Vector3 (0, 0 ,0),
         exit  = new Vector3 ();

      this .cylinder .intersectsLine (hitRay, enter, exit);

      return hitPoint .distance (enter) > hitPoint .distance (exit);
   },
   getTrackPoint (hitRay, trackPoint)
   {
      const zPoint = new Vector3 ();

      this .zPlane .intersectsLine (hitRay, zPoint);

      const
         axisPoint = zPoint .copy () .add (this .cylinder .axis .getPerpendicularVectorToPoint (zPoint, new Vector3 ())),
         distance  = this .sxPlane .getDistanceToPoint (zPoint) / this .cylinder .radius,
         section   = Math .floor ((distance + 1) / 2);

      // Use asin on the cylinder and outside linear angle.
      const
         sinp  = Algorithm .interval (distance, -1, 1),
         phi   = section === 0 ? Math .asin (sinp) : sinp * Math .PI / 2,
         angle = phi + section * Math .PI;

      const rotation = new Rotation4 (this .cylinder .axis .direction, angle);

      rotation .multVecRot (trackPoint .assign (this .szNormal) .multiply (this .cylinder .radius));
      trackPoint .add (axisPoint);
   },
   getAngle (rotation)
   {
      if (rotation .getAxis (new Vector3 ()) .dot (this .cylinder .axis .direction) > 0)
         return rotation .angle;
      else
         return -rotation .angle;
   },
   set_fields__ ()
   {
      if (!this ._isActive .getValue ())
         return;

      this .activate (this .activateHit);
      this .set_motion__ (this .motionHit ?? this .activateHit);
   },
   set_active__ (active, hit, modelViewMatrix, projectionMatrix, viewport)
   {
      X3DDragSensorNode .prototype .set_active__ .call (this, active, hit, modelViewMatrix, projectionMatrix, viewport);

      if (this ._isActive .getValue ())
      {
         this .activateHit = hit .copy ();
         this .motionHit   = null;

         this .modelViewMatrix    .assign (modelViewMatrix);
         this .invModelViewMatrix .assign (modelViewMatrix) .inverse ();

         this .activate (hit);
      }
      else
      {
         if (this ._autoOffset .getValue ())
            this ._offset = this .getAngle (this ._rotation_changed .getValue ());
      }
   },
   activate (hit)
   {
      const
         hitRay   = hit .hitRay .copy () .multLineMatrix (this .invModelViewMatrix),
         hitPoint = this .invModelViewMatrix .multVecMatrix (hit .point .copy ());

      const
         yAxis      = this ._axisRotation .getValue () .multVecRot (new Vector3 (0, 1, 0)),
         cameraBack = this .invModelViewMatrix .multDirMatrix (new Vector3 (0, 0, 1)) .normalize ();

      const
         axis   = new Line3 (new Vector3 (), yAxis),
         radius = axis .getPerpendicularVectorToPoint (hitPoint, new Vector3 ()) .magnitude ();

      this .cylinder = new Cylinder3 (axis, radius);
      this .disk     = Math .abs (cameraBack .dot (yAxis)) > Math .cos (this ._diskAngle .getValue ());
      this .behind   = this .isBehind (hitRay, hitPoint);
      this .yPlane   = new Plane3 (hitPoint, yAxis);             // Sensor aligned y-plane
      this .zPlane   = new Plane3 (hitPoint, cameraBack);        // Screen aligned z-plane

      // Compute normal like in Billboard with yAxis as axis of rotation.
      const
         billboardToViewer = this .invModelViewMatrix .origin,
         sxNormal          = yAxis .copy () .cross (billboardToViewer) .normalize ();

      this .sxPlane  = new Plane3 (new Vector3 (), sxNormal);   // Billboarded special x-plane made parallel to sensors axis.
      this .szNormal = sxNormal .copy () .cross (yAxis) .normalize (); // Billboarded special z-normal made parallel to sensors axis.

      const trackPoint = new Vector3 ();

      if (this .disk)
         this .yPlane .intersectsLine (hitRay, trackPoint);
      else
         this .getTrackPoint (hitRay, trackPoint);

      this .fromVector  = this .cylinder .axis .getPerpendicularVectorToPoint (trackPoint, new Vector3 ()) .negate ();
      this .startOffset = new Rotation4 (yAxis, this ._offset .getValue ());

      this ._trackPoint_changed = trackPoint;
      this ._rotation_changed   = this .startOffset;

      // For min/max angle.

      this .angle       = this ._offset .getValue ();
      this .startVector = this ._rotation_changed .getValue () .multVecRot (this ._axisRotation .getValue () .multVecRot (new Vector3 (0, 0, 1)));
   },
   set_motion__ (hit)
   {
      this .motionHit = hit .copy ();

      const
         hitRay     = hit .hitRay .copy () .multLineMatrix (this .invModelViewMatrix),
         trackPoint = new Vector3 ();

      if (this .disk)
         this .yPlane .intersectsLine (hitRay, trackPoint);
      else
         this .getTrackPoint (hitRay, trackPoint);

      this ._trackPoint_changed = trackPoint;

      const
         toVector = this .cylinder .axis .getPerpendicularVectorToPoint (trackPoint, new Vector3 ()) .negate (),
         rotation = new Rotation4 (this .fromVector, toVector);

      if (this .disk)
      {
         // The trackpoint can swap behind the viewpoint if viewpoint is a Viewpoint node
         // as the viewing volume is not a cube where the picking ray goes straight up.
         // This phenomenon is very clear on the viewport corners.

         const trackPoint_ = this .modelViewMatrix .multVecMatrix (trackPoint .copy ());

         if (trackPoint_ .z > 0)
            rotation .multRight (new Rotation4 (this .yPlane .normal, Math .PI));
      }
      else
      {
         if (this .behind)
            rotation .inverse ();
      }

      rotation .multLeft (this .startOffset);

      if (this ._minAngle .getValue () > this ._maxAngle .getValue ())
      {
         this ._rotation_changed = rotation;
      }
      else
      {
         const
            endVector     = rotation .multVecRot (this ._axisRotation .getValue () .multVecRot (new Vector3 (0, 0, 1))),
            deltaRotation = new Rotation4 (this .startVector, endVector),
            axis          = this ._axisRotation .getValue () .multVecRot (new Vector3 (0, 1, 0)),
            sign          = axis .dot (deltaRotation .getAxis (new Vector3 ())) > 0 ? 1 : -1,
            min           = this ._minAngle .getValue (),
            max           = this ._maxAngle .getValue ();

         this .angle += sign * deltaRotation .angle;

         this .startVector .assign (endVector);

         //console .log (this .angle, min, max);

         if (this .angle < min)
            rotation .setAxisAngle (this .cylinder .axis .direction, min);
         else if (this .angle > max)
            rotation .setAxisAngle (this .cylinder .axis .direction, max);
         else
            rotation .setAxisAngle (this .cylinder .axis .direction, this .angle);

         if (! this ._rotation_changed .getValue () .equals (rotation))
            this ._rotation_changed = rotation;
      }
   },
});

Object .defineProperties (CylinderSensor,
{
   typeName:
   {
      value: "CylinderSensor",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "PointingDeviceSensor", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "children",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "2.0", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",        new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "axisRotation",       new Fields .SFRotation (0, 0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "diskAngle",          new Fields .SFFloat (0.26179167)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "minAngle",           new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "maxAngle",           new Fields .SFFloat (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "offset",             new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "autoOffset",         new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "trackPoint_changed", new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "rotation_changed",   new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isOver",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",           new Fields .SFBool ()),
      ]),
      enumerable: true,
   },
});

export default CylinderSensor;
