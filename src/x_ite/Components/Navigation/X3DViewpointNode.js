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

import Fields                  from "../../Fields.js";
import X3DBindableNode         from "../Core/X3DBindableNode.js";
import TimeSensor              from "../Time/TimeSensor.js";
import EaseInEaseOut           from "../Interpolation/EaseInEaseOut.js";
import PositionInterpolator    from "../Interpolation/PositionInterpolator.js";
import OrientationInterpolator from "../Interpolation/OrientationInterpolator.js";
import TraverseType            from "../../Rendering/TraverseType.js";
import X3DConstants            from "../../Base/X3DConstants.js";
import Vector3                 from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4               from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4                 from "../../../standard/Math/Numbers/Matrix4.js";

function X3DViewpointNode (executionContext)
{
   X3DBindableNode .call (this, executionContext);

   this .addType (X3DConstants .X3DViewpointNode);

   this .addChildObjects ("positionOffset",         new Fields .SFVec3f (),
                          "orientationOffset",      new Fields .SFRotation (),
                          "scaleOffset",            new Fields .SFVec3f (1, 1, 1),
                          "scaleOrientationOffset", new Fields .SFRotation (),
                          "centerOfRotationOffset", new Fields .SFVec3f (),
                          "fieldOfViewScale",       new Fields .SFFloat (1));

   this .userPosition         = new Vector3 (0, 1, 0);
   this .userOrientation      = new Rotation4 (0, 0, 1, 0);
   this .userCenterOfRotation = new Vector3 (0, 0, 0);
   this .modelMatrix          = new Matrix4 ();
   this .cameraSpaceMatrix    = new Matrix4 (1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0,  10, 1);
   this .viewMatrix           = new Matrix4 (1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -10, 1);

   const browser = this .getBrowser ();

   this .timeSensor                   = new TimeSensor              (browser .getPrivateScene ());
   this .easeInEaseOut                = new EaseInEaseOut           (browser .getPrivateScene ());
   this .positionInterpolator         = new PositionInterpolator    (browser .getPrivateScene ());
   this .orientationInterpolator      = new OrientationInterpolator (browser .getPrivateScene ());
   this .scaleInterpolator            = new PositionInterpolator    (browser .getPrivateScene ());
   this .scaleOrientationInterpolator = new OrientationInterpolator (browser .getPrivateScene ());
}

X3DViewpointNode .prototype = Object .assign (Object .create (X3DBindableNode .prototype),
{
   constructor: X3DViewpointNode,
   initialize: function ()
   {
      X3DBindableNode .prototype .initialize .call (this);

      this .timeSensor ._stopTime = 1;
      this .timeSensor .setup ();

      this .easeInEaseOut ._key           = new Fields .MFFloat (0, 1);
      this .easeInEaseOut ._easeInEaseOut = new Fields .MFVec2f (new Fields .SFVec2f (0, 0), new Fields .SFVec2f (0, 0));
      this .easeInEaseOut .setup ();

      this .positionInterpolator         ._key = new Fields .MFFloat (0, 1);
      this .orientationInterpolator      ._key = new Fields .MFFloat (0, 1);
      this .scaleInterpolator            ._key = new Fields .MFFloat (0, 1);
      this .scaleOrientationInterpolator ._key = new Fields .MFFloat (0, 1);

      this .positionInterpolator         .setup ();
      this .orientationInterpolator      .setup ();
      this .scaleInterpolator            .setup ();
      this .scaleOrientationInterpolator .setup ();

      this .timeSensor ._isActive         .addFieldInterest (this ._transitionActive);
      this .timeSensor ._fraction_changed .addFieldInterest (this .easeInEaseOut ._set_fraction);

      this .easeInEaseOut ._modifiedFraction_changed .addFieldInterest (this .positionInterpolator         ._set_fraction);
      this .easeInEaseOut ._modifiedFraction_changed .addFieldInterest (this .orientationInterpolator      ._set_fraction);
      this .easeInEaseOut ._modifiedFraction_changed .addFieldInterest (this .scaleInterpolator            ._set_fraction);
      this .easeInEaseOut ._modifiedFraction_changed .addFieldInterest (this .scaleOrientationInterpolator ._set_fraction);

      this .positionInterpolator         ._value_changed .addFieldInterest (this ._positionOffset);
      this .orientationInterpolator      ._value_changed .addFieldInterest (this ._orientationOffset);
      this .scaleInterpolator            ._value_changed .addFieldInterest (this ._scaleOffset);
      this .scaleOrientationInterpolator ._value_changed .addFieldInterest (this ._scaleOrientationOffset);

      this ._isBound .addInterest ("set_bound__", this);
   },
   getEaseInEaseOut: function ()
   {
      return this .easeInEaseOut;
   },
   setInterpolators: function () { },
   getPosition: function ()
   {
      return this ._position .getValue ();
   },
   getUserPosition: function ()
   {
      return this .userPosition .assign (this .getPosition ()) .add (this ._positionOffset .getValue ());
   },
   getOrientation: function ()
   {
      return this ._orientation .getValue ();
   },
   getUserOrientation: function ()
   {
      return this .userOrientation .assign (this .getOrientation ()) .multRight (this ._orientationOffset .getValue ());
   },
   getCenterOfRotation: function ()
   {
      return this ._centerOfRotation .getValue ();
   },
   getUserCenterOfRotation: function ()
   {
      return this .userCenterOfRotation .assign (this .getCenterOfRotation ()) .add (this ._centerOfRotationOffset .getValue ());
   },
   getProjectionMatrix: function (renderObject)
   {
      const navigationInfo = renderObject .getNavigationInfo ();

      return this .getProjectionMatrixWithLimits (navigationInfo .getNearValue (),
                                                  navigationInfo .getFarValue (this),
                                                  renderObject .getLayer () .getViewport () .getRectangle (this .getBrowser ()));
   },
   getCameraSpaceMatrix: function ()
   {
      return this .cameraSpaceMatrix;
   },
   getViewMatrix: function ()
   {
      return this .viewMatrix;
   },
   getModelMatrix: function ()
   {
      return this .modelMatrix;
   },
   getMaxFarValue: function ()
   {
      return this .getBrowser () .getRenderingProperty ("LogarithmicDepthBuffer") ? 1e10 : 1e5;
   },
   getUpVector: function ()
   {
      // Local y-axis,
      // see http://www.web3d.org/documents/specifications/19775-1/V3.3/index.html#NavigationInfo.
      return Vector3 .yAxis;
   },
   getSpeedFactor: function ()
   {
      return 1;
   },
   setVRMLTransition: function (value)
   {
      // VRML behaviour support.
      this .VRMLTransition = value;
   },
   getVRMLTransition: function ()
   {
      // VRML behaviour support.
      return this .VRMLTransition;
   },
   transitionStart: (function ()
   {
      const
         relativePosition         = new Vector3 (0, 0, 0),
         relativeOrientation      = new Rotation4 (0, 0, 1, 0),
         relativeScale            = new Vector3 (0, 0, 0),
         relativeScaleOrientation = new Rotation4 (0, 0, 1, 0);

      return function (layerNode, fromViewpointNode, toViewpointNode)
      {
         this .to = toViewpointNode;

         if (toViewpointNode ._jump .getValue ())
         {
            if (! toViewpointNode ._retainUserOffsets .getValue ())
               toViewpointNode .resetUserOffsets ();

            // Copy from toViewpointNode all fields.

            if (this !== toViewpointNode)
            {
               for (const field of toViewpointNode .getFields ())
                  this .getField (field .getName ()) .assign (field);
            }

            // Respect NavigationInfo.

            const
               navigationInfoNode = layerNode .getNavigationInfo (),
               transitionTime     = navigationInfoNode ._transitionTime .getValue ();

            let transitionType = navigationInfoNode .getTransitionType ();

            // VRML behavior

            if (this .getExecutionContext () .getSpecificationVersion () == "2.0")
            {
               if (toViewpointNode .getVRMLTransition ())
                  transitionType = "LINEAR";
               else
                  transitionType = "TELEPORT";
            }

            toViewpointNode .setVRMLTransition (false);

            // End VRML behavior

            if (transitionTime <= 0)
               transitionType = "TELEPORT";

            switch (transitionType)
            {
               case "TELEPORT":
               {
                  navigationInfoNode ._transitionComplete = true;
                  return;
               }
               case "ANIMATE":
               {
                  this .easeInEaseOut ._easeInEaseOut = new Fields .MFVec2f (new Fields .SFVec2f (0, 1), new Fields .SFVec2f (1, 0));
                  break;
               }
               default:
               {
                  // LINEAR
                  this .easeInEaseOut ._easeInEaseOut = new Fields .MFVec2f (new Fields .SFVec2f (0, 0), new Fields .SFVec2f (0, 0));
                  break;
               }
            }

            this .timeSensor ._cycleInterval = transitionTime;
            this .timeSensor ._stopTime      = this .getBrowser () .getCurrentTime ();
            this .timeSensor ._startTime     = this .getBrowser () .getCurrentTime ();

            this .timeSensor ._isActive .addInterest ("set_active__", this, navigationInfoNode);

            toViewpointNode .getRelativeTransformation (fromViewpointNode, relativePosition, relativeOrientation, relativeScale, relativeScaleOrientation);

            this .positionInterpolator         ._keyValue = new Fields .MFVec3f    (relativePosition,         toViewpointNode ._positionOffset);
            this .orientationInterpolator      ._keyValue = new Fields .MFRotation (relativeOrientation,      toViewpointNode ._orientationOffset);
            this .scaleInterpolator            ._keyValue = new Fields .MFVec3f    (relativeScale,            toViewpointNode ._scaleOffset);
            this .scaleOrientationInterpolator ._keyValue = new Fields .MFRotation (relativeScaleOrientation, toViewpointNode ._scaleOrientationOffset);

            this ._positionOffset         = relativePosition;
            this ._orientationOffset      = relativeOrientation;
            this ._scaleOffset            = relativeScale;
            this ._scaleOrientationOffset = relativeScaleOrientation;

            this .setInterpolators (fromViewpointNode, toViewpointNode);

            this ._transitionActive = true;
         }
         else
         {
            toViewpointNode .getRelativeTransformation (fromViewpointNode, relativePosition, relativeOrientation, relativeScale, relativeScaleOrientation);

            toViewpointNode ._positionOffset         = relativePosition;
            toViewpointNode ._orientationOffset      = relativeOrientation;
            toViewpointNode ._scaleOffset            = relativeScale;
            toViewpointNode ._scaleOrientationOffset = relativeScaleOrientation;

            toViewpointNode .setInterpolators (fromViewpointNode, toViewpointNode);
         }
      };
   })(),
   transitionStop: function ()
   {
      this .timeSensor ._stopTime = this .getBrowser () .getCurrentTime ();
      this .timeSensor ._isActive .removeInterest ("set_active__", this);
   },
   resetUserOffsets: function ()
   {
      this ._positionOffset         = Vector3   .Zero;
      this ._orientationOffset      = Rotation4 .Identity;
      this ._scaleOffset            = Vector3   .One;
      this ._scaleOrientationOffset = Rotation4 .Identity;
      this ._centerOfRotationOffset = Vector3   .Zero;
      this ._fieldOfViewScale       = 1;
   },
   getRelativeTransformation: function (fromViewpointNode, relativePosition, relativeOrientation, relativeScale, relativeScaleOrientation)
   {
      const differenceMatrix = this .modelMatrix .copy () .multRight (fromViewpointNode .getViewMatrix ()) .inverse ();

      differenceMatrix .get (relativePosition, relativeOrientation, relativeScale, relativeScaleOrientation);

      relativePosition .subtract (this .getPosition ());
      relativeOrientation .assign (this .getOrientation () .copy () .inverse () .multRight (relativeOrientation));
   },
   lookAtPoint: function (layerNode, point, factor, straighten)
   {
      this .getCameraSpaceMatrix () .multVecMatrix (point);

      Matrix4 .inverse (this .getModelMatrix ()) .multVecMatrix (point);

      const minDistance = layerNode .getNavigationInfo () .getNearValue () * 2;

      this .lookAt (layerNode, point, minDistance, factor, straighten);
   },
   lookAtBBox: function (layerNode, bbox, factor, straighten)
   {
      bbox = bbox .copy () .multRight (Matrix4 .inverse (this .getModelMatrix ()));

      const minDistance = layerNode .getNavigationInfo () .getNearValue () * 2;

      this .lookAt (layerNode, bbox .center, minDistance, factor, straighten);
   },
   lookAt: function (layerNode, point, distance, factor, straighten)
   {
      const
         offset = point .copy () .add (this .getUserOrientation () .multVecRot (new Vector3 (0, 0, distance))) .subtract (this .getPosition ());

      layerNode .getNavigationInfo () ._transitionStart = true;

      this .timeSensor ._cycleInterval = 0.2;
      this .timeSensor ._stopTime      = this .getBrowser () .getCurrentTime ();
      this .timeSensor ._startTime     = this .getBrowser () .getCurrentTime ();

      this .timeSensor ._isActive .addInterest ("set_active__", this, layerNode .getNavigationInfo ());

      this .easeInEaseOut ._easeInEaseOut = new Fields .MFVec2f (new Fields .SFVec2f (0, 1), new Fields .SFVec2f (1, 0));

      const
         translation = Vector3 .lerp (this ._positionOffset .getValue (), offset, factor),
         direction   = Vector3 .add (this .getPosition (), translation) .subtract (point);

      let rotation = Rotation4 .multRight (this ._orientationOffset .getValue (), new Rotation4 (this .getUserOrientation () .multVecRot (new Vector3 (0, 0, 1)), direction));

      if (straighten)
      {
         rotation = Rotation4 .inverse (this .getOrientation ()) .multRight (this .straightenHorizon (Rotation4 .multRight (this .getOrientation (), rotation)));
      }

      this .positionInterpolator         ._keyValue = new Fields .MFVec3f (this ._positionOffset, translation);
      this .orientationInterpolator      ._keyValue = new Fields .MFRotation (this ._orientationOffset, rotation);
      this .scaleInterpolator            ._keyValue = new Fields .MFVec3f (this ._scaleOffset, this ._scaleOffset);
      this .scaleOrientationInterpolator ._keyValue = new Fields .MFRotation (this ._scaleOrientationOffset, this ._scaleOrientationOffset);

      this .setInterpolators (this, this);

      this ._centerOfRotationOffset = Vector3 .subtract (point, this .getCenterOfRotation ());
      this ._set_bind               = true;
   },
   straighten: function (layerNode, horizon)
   {
      layerNode .getNavigationInfo () ._transitionStart = true;

      this .timeSensor ._cycleInterval = 0.4;
      this .timeSensor ._stopTime      = this .getBrowser () .getCurrentTime ();
      this .timeSensor ._startTime     = this .getBrowser () .getCurrentTime ();

      this .timeSensor ._isActive .addInterest ("set_active__", this, layerNode .getNavigationInfo ());

      this .easeInEaseOut ._easeInEaseOut = new Fields .MFVec2f (new Fields .SFVec2f (0, 1), new Fields .SFVec2f (1, 0));

      const rotation = Rotation4 .multRight (Rotation4 .inverse (this .getOrientation ()), this .straightenHorizon (this .getUserOrientation ()));

      this .positionInterpolator         ._keyValue = new Fields .MFVec3f (this ._positionOffset, this ._positionOffset);
      this .orientationInterpolator      ._keyValue = new Fields .MFRotation (this ._orientationOffset, rotation);
      this .scaleInterpolator            ._keyValue = new Fields .MFVec3f (this ._scaleOffset, this ._scaleOffset);
      this .scaleOrientationInterpolator ._keyValue = new Fields .MFRotation (this ._scaleOrientationOffset, this ._scaleOrientationOffset);

      this .setInterpolators (this, this);

      this ._set_bind = true;
   },
   straightenHorizon: (function ()
   {
      const
         localXAxis  = new Vector3 (0, 0, 0),
         localZAxis  = new Vector3 (0, 0, 0),
         rotation    = new Rotation4 (0, 0, 1, 0);

      return function (orientation, upVector = this .getUpVector ())
      {
         orientation .multVecRot (localXAxis .assign (Vector3 .xAxis) .negate ());
         orientation .multVecRot (localZAxis .assign (Vector3 .zAxis));

         const vector = localZAxis .cross (upVector);

         // If viewer looks along the up vector.
         if (Math .abs (localZAxis .dot (upVector)) >= 1)
            return orientation;

         if (Math .abs (vector .dot (localXAxis)) >= 1)
            return orientation;

         rotation .setFromToVec (localXAxis, vector);

         return orientation .multRight (rotation);
      };
   })(),
   set_active__: function (navigationInfoNode, active)
   {
      if (this ._isBound .getValue () && ! active .getValue () && this .timeSensor ._fraction_changed .getValue () === 1)
      {
         navigationInfoNode ._transitionComplete = true;
      }
   },
   set_bound__: function ()
   {
      if (this ._isBound .getValue ())
         this .getBrowser () .getNotification () ._string = this ._description;
      else
         this .timeSensor ._stopTime = this .getBrowser () .getCurrentTime ();
   },
   traverse: function (type, renderObject)
   {
      if (type !== TraverseType .CAMERA)
         return;

      renderObject .getLayer () .getViewpoints () .push (this);

      this .modelMatrix .assign (renderObject .getModelViewMatrix () .get ());
   },
   update: function ()
   {
      this .cameraSpaceMatrix .set (this .getUserPosition (),
                                    this .getUserOrientation (),
                                    this ._scaleOffset .getValue (),
                                    this ._scaleOrientationOffset .getValue ());

      this .cameraSpaceMatrix .multRight ((this .to || this) .modelMatrix);

      this .viewMatrix .assign (this .cameraSpaceMatrix) .inverse ();
   }
});

export default X3DViewpointNode;
