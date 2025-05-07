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

import Fields                     from "../../Fields.js";
import X3DFieldDefinition         from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray       from "../../Base/FieldDefinitionArray.js";
import X3DNode                    from "../Core/X3DNode.js";
import X3DEnvironmentalSensorNode from "./X3DEnvironmentalSensorNode.js";
import TraverseType               from "../../Rendering/TraverseType.js";
import X3DConstants               from "../../Base/X3DConstants.js";
import Vector3                    from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4                  from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4                    from "../../../standard/Math/Numbers/Matrix4.js";

function ProximitySensor (executionContext)
{
   X3DEnvironmentalSensorNode .call (this, executionContext);

   this .addType (X3DConstants .ProximitySensor);

   this .setCameraObject (true);
   this .setZeroTest (true);

   // Units

   this ._centerOfRotation_changed .setUnit ("length");
   this ._position_changed         .setUnit ("length");

   // Private properties

   this .min           = new Vector3 ();
   this .max           = new Vector3 ();
   this .layerNode     = null;
   this .modelMatrix   = new Matrix4 ();
   this .inside        = false;
}

Object .assign (Object .setPrototypeOf (ProximitySensor .prototype, X3DEnvironmentalSensorNode .prototype),
{
   initialize ()
   {
      X3DEnvironmentalSensorNode .prototype .initialize .call (this);

      this ._size   .addInterest ("set_extents__", this);
      this ._center .addInterest ("set_extents__", this);

      this ._enabled   .addFieldInterest (this ._isVisibleObject);
      this ._traversed .addFieldInterest (this ._isCameraObject);

      this ._isVisibleObject = this ._enabled;

      this .set_extents__ ();
   },
   set_extents__ ()
   {
      const
         s  = this ._size .getValue (),
         c  = this ._center .getValue (),
         sx = s .x / 2,
         sy = s .y / 2,
         sz = s .z / 2,
         cx = c .x,
         cy = c .y,
         cz = c .z;

      this .min .set (cx - sx, cy - sy, cz - sz);
      this .max .set (cx + sx, cy + sy, cz + sz);
   },
   update: (() =>
   {
      const
         position               = new Vector3 (),
         orientation            = new Rotation4 (),
         centerOfRotation       = new Vector3 (),
         centerOfRotationMatrix = new Matrix4 ();

      return function ()
      {
         if (this .inside && this .getTraversed ())
         {
            if (this .layerNode)
            {
               const
                  browser        = this .getBrowser (),
                  viewpointNode  = this .layerNode .getViewpoint (),
                  invModelMatrix = this .modelMatrix .inverse ()

               centerOfRotationMatrix
                  .assign (viewpointNode .getModelMatrix ())
                  .translate (viewpointNode .getUserCenterOfRotation ())
                  .multRight (invModelMatrix)
                  .get (centerOfRotation);

               invModelMatrix .multLeft (viewpointNode .getCameraSpaceMatrix ());

               if (this .layerNode === browser .getActiveLayer ())
               {
                  const pose = browser .getPose ();

                  if (pose)
                     invModelMatrix .multLeft (pose .cameraSpaceMatrix);
               }

               invModelMatrix .get (position, orientation);

               if (this ._isActive .getValue ())
               {
                  if (!this ._position_changed .getValue () .equals (position))
                     this ._position_changed = position;

                  if (!this ._orientation_changed .getValue () .equals (orientation))
                     this ._orientation_changed = orientation;

                  if (!this ._centerOfRotation_changed .getValue () .equals (centerOfRotation))
                     this ._centerOfRotation_changed = centerOfRotation;
               }
               else
               {
                  this ._isActive                 = true;
                  this ._enterTime                = browser .getCurrentTime ();
                  this ._position_changed         = position;
                  this ._orientation_changed      = orientation;
                  this ._centerOfRotation_changed = centerOfRotation;
               }
            }
         }
         else
         {
            if (this ._isActive .getValue ())
            {
               this ._isActive = false;
               this ._exitTime = this .getBrowser () .getCurrentTime ();
            }
         }

         this .inside    = false;
         this .layerNode = null;

         this .setTraversed (false);
      };
   })(),
   traverse: (() =>
   {
      const
         invModelViewMatrix = new Matrix4 (),
         infinity           = new Vector3 (-1, -1, -1);

      return function (type, renderObject)
      {
         switch (type)
         {
            case TraverseType .CAMERA:
            {
               this .layerNode = renderObject .getLayer ();
               this .modelMatrix .assign (renderObject .getModelViewMatrix () .get ());
               return;
            }
            case TraverseType .DISPLAY:
            {
               this .setTraversed (true);

               if (this .inside)
                  return;

               if (this ._size .getValue () .equals (infinity))
               {
                  this .inside = true;
               }
               else
               {
                  invModelViewMatrix .assign (renderObject .getModelViewMatrix () .get ()) .inverse ();

                  this .inside = this .containsPoint (invModelViewMatrix .origin);
               }

               return;
            }
         }
      };
   })(),
   containsPoint ({ x: px, y: py, z: pz })
   {
      const
         min = this .min,
         max = this .max;

      return min .x <= px &&
             max .x >= px &&
             min .y <= py &&
             max .y >= py &&
             min .z <= pz &&
             max .z >= pz;
   },
});

Object .defineProperties (ProximitySensor,
{
   ... X3DNode .getStaticProperties ("ProximitySensor", "EnvironmentalSensor", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                 new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",              new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",                  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "size",                     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "center",                   new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "enterTime",                new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "exitTime",                 new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",                 new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "position_changed",         new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "orientation_changed",      new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "centerOfRotation_changed", new Fields .SFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default ProximitySensor;
