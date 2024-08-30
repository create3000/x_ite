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

import Fields                  from "../../Fields.js";
import X3DNode                 from "../Core/X3DNode.js";
import X3DBindableNode         from "../Core/X3DBindableNode.js";
import TimeSensor              from "../Time/TimeSensor.js";
import EaseInEaseOut           from "../Interpolation/EaseInEaseOut.js";
import PositionInterpolator    from "../Interpolation/PositionInterpolator.js";
import OrientationInterpolator from "../Interpolation/OrientationInterpolator.js";
import ScalarInterpolator      from "../Interpolation/ScalarInterpolator.js";
import X3DCast                 from "../../Base/X3DCast.js";
import TraverseType            from "../../Rendering/TraverseType.js";
import X3DConstants            from "../../Base/X3DConstants.js";
import Vector3                 from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4               from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix3                 from "../../../standard/Math/Numbers/Matrix3.js";
import Matrix4                 from "../../../standard/Math/Numbers/Matrix4.js";
import Box3                    from "../../../standard/Math/Geometry/Box3.js";

function X3DViewpointNode (executionContext)
{
   X3DBindableNode .call (this, executionContext);

   this .addType (X3DConstants .X3DViewpointNode);

   this .addChildObjects (X3DConstants .inputOutput, "positionOffset",         new Fields .SFVec3f (),
                          X3DConstants .inputOutput, "orientationOffset",      new Fields .SFRotation (),
                          X3DConstants .inputOutput, "scaleOffset",            new Fields .SFVec3f (1, 1, 1),
                          X3DConstants .inputOutput, "scaleOrientationOffset", new Fields .SFRotation (),
                          X3DConstants .inputOutput, "centerOfRotationOffset", new Fields .SFVec3f (),
                          X3DConstants .inputOutput, "fieldOfViewScale",       new Fields .SFFloat (1));

   this .descriptions         = [ ];
   this .userPosition         = new Vector3 ();
   this .userOrientation      = new Rotation4 ();
   this .userCenterOfRotation = new Vector3 ();
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
   this .fieldOfViewScaleInterpolator = new ScalarInterpolator      (browser .getPrivateScene ());
}

Object .assign (Object .setPrototypeOf (X3DViewpointNode .prototype, X3DBindableNode .prototype),
{
   initialize ()
   {
      X3DBindableNode .prototype .initialize .call (this);

      this .timeSensor ._stopTime = 1;
      this .timeSensor .setup ();

      this .easeInEaseOut ._key           = new Fields .MFFloat (0, 1);
      this .easeInEaseOut ._easeInEaseOut = new Fields .MFVec2f (new Fields .SFVec2f (), new Fields .SFVec2f ());
      this .easeInEaseOut .setup ();

      this .positionInterpolator         ._key = new Fields .MFFloat (0, 1);
      this .orientationInterpolator      ._key = new Fields .MFFloat (0, 1);
      this .scaleInterpolator            ._key = new Fields .MFFloat (0, 1);
      this .scaleOrientationInterpolator ._key = new Fields .MFFloat (0, 1);
      this .fieldOfViewScaleInterpolator ._key = new Fields .MFFloat (0, 1);

      this .positionInterpolator         .setup ();
      this .orientationInterpolator      .setup ();
      this .scaleInterpolator            .setup ();
      this .scaleOrientationInterpolator .setup ();
      this .fieldOfViewScaleInterpolator .setup ();

      this .timeSensor ._fraction_changed .addFieldInterest (this .easeInEaseOut ._set_fraction);

      this .easeInEaseOut ._modifiedFraction_changed .addFieldInterest (this .positionInterpolator         ._set_fraction);
      this .easeInEaseOut ._modifiedFraction_changed .addFieldInterest (this .orientationInterpolator      ._set_fraction);
      this .easeInEaseOut ._modifiedFraction_changed .addFieldInterest (this .scaleInterpolator            ._set_fraction);
      this .easeInEaseOut ._modifiedFraction_changed .addFieldInterest (this .scaleOrientationInterpolator ._set_fraction);
      this .easeInEaseOut ._modifiedFraction_changed .addFieldInterest (this .fieldOfViewScaleInterpolator ._set_fraction);

      this .positionInterpolator         ._value_changed .addFieldInterest (this ._positionOffset);
      this .orientationInterpolator      ._value_changed .addFieldInterest (this ._orientationOffset);
      this .scaleInterpolator            ._value_changed .addFieldInterest (this ._scaleOffset);
      this .scaleOrientationInterpolator ._value_changed .addFieldInterest (this ._scaleOrientationOffset);
      this .fieldOfViewScaleInterpolator ._value_changed .addFieldInterest (this ._fieldOfViewScale);

      this ._nearDistance   .addInterest ("set_nearDistance__",   this);
      this ._farDistance    .addInterest ("set_farDistance__",    this);
      this ._viewAll        .addInterest ("set_viewAll__",        this);
      this ._navigationInfo .addInterest ("set_navigationInfo__", this);
      this ._isBound        .addInterest ("set_bound__",          this);

      this .set_nearDistance__ ();
      this .set_farDistance__ ();
      this .set_navigationInfo__ ();
   },
   set_nearDistance__ ()
   {
      const nearDistance = this ._nearDistance .getValue ();

      this .nearDistance = nearDistance >= 0 ? nearDistance : undefined;
   },
   set_farDistance__ ()
   {
      const farDistance = this ._farDistance .getValue ();

      this .farDistance = farDistance >= 0 ? farDistance : undefined;
   },
   set_viewAll__ ()
   {
      if (!this ._viewAll .getValue ())
         return;

      if (!this ._isBound .getValue ())
         return;

      this ._set_bind = true;
   },
   set_navigationInfo__ ()
   {
      if (this .navigationInfoNode)
         this ._isBound .removeFieldInterest (this .navigationInfoNode ._set_bind);

      this .navigationInfoNode = X3DCast (X3DConstants .NavigationInfo, this ._navigationInfo);

      if (this .navigationInfoNode)
         this ._isBound .addFieldInterest (this .navigationInfoNode ._set_bind);
   },
   set_bound__ ()
   {
      const browser = this .getBrowser ();

      if (this ._isBound .getValue ())
         browser .getNotification () ._string = this ._description;
      else
         this .timeSensor ._stopTime = browser .getCurrentTime ();
   },
   set_active__ (navigationInfoNode, active)
   {
      if (active .getValue ())
         return;

      this .timeSensor ._isActive .removeInterest ("set_active__", this);

      if (!this ._isBound .getValue ())
         return;

      if (this .timeSensor ._fraction_changed .getValue () !== 1)
         return;

      navigationInfoNode ._transitionComplete = true;
   },
   getDescriptions ()
   {
      return this .descriptions;
   },
   setInterpolators () { },
   getPosition ()
   {
      return this ._position .getValue ();
   },
   setPosition (value)
   {
      this ._position = value;
   },
   getOrientation ()
   {
      return this ._orientation .getValue ();
   },
   setOrientation (value)
   {
      this ._orientation = value;
   },
   getCenterOfRotation ()
   {
      return this ._centerOfRotation .getValue ();
   },
   setCenterOfRotation (value)
   {
      this ._centerOfRotation = value;
   },
   getUserPosition ()
   {
      return this .userPosition .assign (this .getPosition ()) .add (this ._positionOffset .getValue ());
   },
   getUserOrientation ()
   {
      return this .userOrientation .assign (this .getOrientation ()) .multRight (this ._orientationOffset .getValue ());
   },
   getUserCenterOfRotation ()
   {
      return this .userCenterOfRotation .assign (this .getCenterOfRotation ()) .add (this ._centerOfRotationOffset .getValue ());
   },
   getProjectionMatrix (renderObject)
   {
      const navigationInfo = renderObject .getNavigationInfo ();

      return this .getProjectionMatrixWithLimits (this .nearDistance ?? navigationInfo .getNearValue (),
                                                  this .farDistance ?? navigationInfo .getFarValue (this),
                                                  renderObject .getLayer () .getViewport () .getRectangle ());
   },
   getCameraSpaceMatrix ()
   {
      return this .cameraSpaceMatrix;
   },
   getViewMatrix ()
   {
      return this .viewMatrix;
   },
   getModelMatrix ()
   {
      return this .modelMatrix;
   },
   getMaxFarValue ()
   {
      return this .getBrowser () .getRenderingProperty ("LogarithmicDepthBuffer") ? 1e10 : 1e5;
   },
   getUpVector ()
   {
      // Local y-axis,
      // see https://www.web3d.org/documents/specifications/19775-1/V3.3/index.html#NavigationInfo.
      return Vector3 .yAxis;
   },
   getSpeedFactor ()
   {
      return 1;
   },
   setVRMLTransition (value)
   {
      // VRML behavior support.
      this .VRMLTransition = value;
   },
   getVRMLTransition ()
   {
      // VRML behavior support.
      return this .VRMLTransition;
   },
   transitionStart (layerNode, fromViewpointNode)
   {
      if (this ._jump .getValue ())
      {
         const relative = this .getRelativeTransformation (fromViewpointNode);

         if (!this ._retainUserOffsets .getValue ())
            this .resetUserOffsets ();

         if (this ._viewAll .getValue ())
            this .viewAll (layerNode .getBBox (new Box3 ()));

         // Handle NavigationInfo.

         const
            navigationInfoNode = layerNode .getNavigationInfo (),
            transitionTime     = navigationInfoNode ._transitionTime .getValue ();

         let transitionType = navigationInfoNode .getTransitionType ();

         // VRML behavior

         if (this .getExecutionContext () .getSpecificationVersion () == 2.0)
         {
            if (this .getVRMLTransition ())
               transitionType = "LINEAR";
            else
               transitionType = "TELEPORT";
         }

         this .setVRMLTransition (false);

         // End VRML behavior

         if (transitionTime <= 0)
            transitionType = "TELEPORT";

         if (this .constructor !== fromViewpointNode .constructor)
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
               this .easeInEaseOut ._easeInEaseOut = new Fields .MFVec2f (new Fields .SFVec2f (), new Fields .SFVec2f ());
               break;
            }
         }

         navigationInfoNode ._transitionStart = true;

         this .timeSensor ._cycleInterval = transitionTime;
         this .timeSensor ._stopTime      = this .getBrowser () .getCurrentTime ();
         this .timeSensor ._startTime     = this .getBrowser () .getCurrentTime ();

         this .timeSensor ._isActive .addInterest ("set_active__", this, navigationInfoNode);

         this .positionInterpolator         ._keyValue = new Fields .MFVec3f    (relative .position,         this ._positionOffset);
         this .orientationInterpolator      ._keyValue = new Fields .MFRotation (relative .orientation,      this ._orientationOffset);
         this .scaleInterpolator            ._keyValue = new Fields .MFVec3f    (relative .scale,            this ._scaleOffset);
         this .scaleOrientationInterpolator ._keyValue = new Fields .MFRotation (relative .scaleOrientation, this ._scaleOrientationOffset);

         this ._positionOffset         = relative .position;
         this ._orientationOffset      = relative .orientation;
         this ._scaleOffset            = relative .scale;
         this ._scaleOrientationOffset = relative .scaleOrientation;

         this .setInterpolators (fromViewpointNode, relative);
      }
      else
      {
         const navigationInfoNode = layerNode .getNavigationInfo ();

         navigationInfoNode ._transitionComplete = true;

         const relative = this .getRelativeTransformation (fromViewpointNode);

         this ._positionOffset         = relative .position;
         this ._orientationOffset      = relative .orientation;
         this ._scaleOffset            = relative .scale;
         this ._scaleOrientationOffset = relative .scaleOrientation;

         this .setInterpolators (fromViewpointNode, relative);
      }
   },
   transitionStop ()
   {
      this .timeSensor ._stopTime = this .getBrowser () .getCurrentTime ();
      this .timeSensor ._isActive .removeInterest ("set_active__", this);
   },
   resetUserOffsets ()
   {
      this ._positionOffset         = Vector3   .Zero;
      this ._orientationOffset      = Rotation4 .Identity;
      this ._scaleOffset            = Vector3   .One;
      this ._scaleOrientationOffset = Rotation4 .Identity;
      this ._centerOfRotationOffset = Vector3   .Zero;
      this ._fieldOfViewScale       = 1;

      this .set_nearDistance__ ();
      this .set_farDistance__ ();
   },
   getRelativeTransformation: (() =>
   {
      const
         position         = new Vector3 (),
         orientation      = new Rotation4 (),
         scale            = new Vector3 (),
         scaleOrientation = new Rotation4 ();

      return function (fromViewpointNode)
      {
         const differenceMatrix = this .modelMatrix .copy () .multRight (fromViewpointNode .getViewMatrix ()) .inverse ();

         differenceMatrix .get (position, orientation, scale, scaleOrientation);

         position .subtract (this .getPosition ());
         orientation .multLeft (this .getOrientation () .copy () .inverse ());

         return {
            position: position,
            orientation: orientation,
            scale: scale,
            scaleOrientation: scaleOrientation,
         };
      };
   })(),
   getLookAtRotation: (() =>
   {
      const
         x = new Vector3 (),
         y = new Vector3 (),
         z = new Vector3 (),
         m = new Matrix3 (),
         r = new Rotation4 ();

      return function (fromPoint, toPoint)
      {
         const up = this .getUpVector (true);

         z .assign (fromPoint) .subtract (toPoint) .normalize ();
         x .assign (up) .cross (z) .normalize ();
         y .assign (z) .cross (x) .normalize ();

         m .set (... x, ... y, ... z);
         r .setMatrix (m);

         return r;
      };
   })(),
   lookAtPoint (layerNode, point, transitionTime = 1, factor = 1, straighten = false)
   {
      this .getCameraSpaceMatrix () .multVecMatrix (point);
      this .getModelMatrix () .copy () .inverse () .multVecMatrix (point);

      const minDistance = layerNode .getNavigationInfo () .getNearValue () * 2;

      this .lookAt (layerNode, point, minDistance, transitionTime, factor, straighten);
   },
   lookAtBBox (layerNode, bbox, transitionTime = 1, factor, straighten)
   {
      if (bbox .size .equals (Vector3 .Zero))
         return;

      bbox = bbox .copy () .multRight (this .getModelMatrix () .copy () .inverse ());

      this .lookAt (layerNode, bbox .center, this .getLookAtDistance (bbox), transitionTime, factor, straighten);
   },
   lookAt (layerNode, point, distance, transitionTime = 1, factor = 1, straighten = false)
   {
      const
         offset = point .copy () .add (this .getUserOrientation () .multVecRot (new Vector3 (0, 0, distance))) .subtract (this .getPosition ());

      layerNode .getNavigationInfo () ._transitionStart = true;

      this .timeSensor ._cycleInterval = transitionTime;
      this .timeSensor ._stopTime      = this .getBrowser () .getCurrentTime ();
      this .timeSensor ._startTime     = this .getBrowser () .getCurrentTime ();

      this .timeSensor ._isActive .addInterest ("set_active__", this, layerNode .getNavigationInfo ());

      this .easeInEaseOut ._easeInEaseOut = new Fields .MFVec2f (new Fields .SFVec2f (0, 1), new Fields .SFVec2f (1, 0));

      const
         translation = this ._positionOffset .getValue () .copy () .lerp (offset, factor),
         direction   = this .getPosition () .copy () .add (translation) .subtract (point);

      let rotation = this ._orientationOffset .getValue () .copy () .multRight (new Rotation4 (this .getUserOrientation () .multVecRot (new Vector3 (0, 0, 1)), direction));

      if (straighten)
      {
         rotation = this .getOrientation () .copy () .inverse () .multRight (this .straightenHorizon (this .getOrientation () .copy () .multRight (rotation)));
      }

      this .positionInterpolator         ._keyValue = new Fields .MFVec3f (this ._positionOffset, translation);
      this .orientationInterpolator      ._keyValue = new Fields .MFRotation (this ._orientationOffset, rotation);
      this .scaleInterpolator            ._keyValue = new Fields .MFVec3f (this ._scaleOffset, Vector3 .One);
      this .scaleOrientationInterpolator ._keyValue = new Fields .MFRotation (this ._scaleOrientationOffset, this ._scaleOrientationOffset);

      const relative = this .getRelativeTransformation (this);

      this ._fieldOfViewScale       = 1;
      this ._centerOfRotationOffset = point .copy () .subtract (this .getCenterOfRotation ());
      this .nearDistance            = distance * (0.125 / 10);
      this .farDistance             = this .nearDistance * this .getMaxFarValue () / 0.125;

      this .setInterpolators (this, relative);
   },
   straightenView (layerNode)
   {
      layerNode .getNavigationInfo () ._transitionStart = true;

      this .timeSensor ._cycleInterval = 1;
      this .timeSensor ._stopTime      = this .getBrowser () .getCurrentTime ();
      this .timeSensor ._startTime     = this .getBrowser () .getCurrentTime ();

      this .timeSensor ._isActive .addInterest ("set_active__", this, layerNode .getNavigationInfo ());

      this .easeInEaseOut ._easeInEaseOut = new Fields .MFVec2f (new Fields .SFVec2f (0, 1), new Fields .SFVec2f (1, 0));

      const rotation = this .getOrientation () .copy () .inverse () .multRight (this .straightenHorizon (this .getUserOrientation ()));

      this .positionInterpolator         ._keyValue = new Fields .MFVec3f (this ._positionOffset, this ._positionOffset);
      this .orientationInterpolator      ._keyValue = new Fields .MFRotation (this ._orientationOffset, rotation);
      this .scaleInterpolator            ._keyValue = new Fields .MFVec3f (this ._scaleOffset, this ._scaleOffset);
      this .scaleOrientationInterpolator ._keyValue = new Fields .MFRotation (this ._scaleOrientationOffset, this ._scaleOrientationOffset);

      const relative = this .getRelativeTransformation (this);

      this ._fieldOfViewScale = 1;

      this .setInterpolators (this, relative);
   },
   straightenHorizon (orientation, upVector = this .getUpVector (true))
   {
      return orientation .straighten (upVector);
   },
   viewAll (bbox)
   {
      bbox .copy () .multRight (this .modelMatrix .copy () .inverse ());

      if (bbox .size .equals (Vector3 .Zero))
      {
         this .set_nearDistance__ ();
         this .set_farDistance__ ();
      }
      else
      {
         const
            direction       = this .getUserPosition () .copy () .subtract (bbox .center) .normalize (),
            distance        = this .getLookAtDistance (bbox),
            userPosition    = bbox .center .copy () .add (direction .multiply (distance)),
            userOrientation = this .getLookAtRotation (userPosition, bbox .center);

         this ._positionOffset         = userPosition .subtract (this .getPosition ());
         this ._orientationOffset      = this .getOrientation () .copy () .inverse () .multRight (userOrientation);
         this ._centerOfRotationOffset = bbox .center .copy () .subtract (this .getCenterOfRotation ());
         this ._fieldOfViewScale       = 1;
         this .nearDistance            = distance * (0.125 / 10);
         this .farDistance             = this .nearDistance * this .getMaxFarValue () / 0.125;
      }
   },
   traverse (type, renderObject)
   {
      if (type !== TraverseType .CAMERA)
         return;

      this .navigationInfoNode ?.traverse (type, renderObject);

      this .descriptions .length = 0;

      if (this ._description .getValue ())
      {
         if (renderObject .getViewpointGroups () .every (viewpointGroupNode => viewpointGroupNode ._displayed .getValue ()))
         {
            for (const viewpointGroupNode of renderObject .getViewpointGroups ())
            {
               if (viewpointGroupNode ._description .getValue ())
                  this .descriptions .push (viewpointGroupNode ._description .getValue ());
            }

            this .descriptions .push (this ._description .getValue ());
         }
      }

      renderObject .getLayer () .getViewpoints () .push (this);

      this .modelMatrix .assign (renderObject .getModelViewMatrix () .get ());
   },
   update ()
   {
      this .cameraSpaceMatrix .set (this .getUserPosition (),
                                    this .getUserOrientation (),
                                    this ._scaleOffset .getValue (),
                                    this ._scaleOrientationOffset .getValue ());

      this .cameraSpaceMatrix .multRight (this .modelMatrix);

      this .viewMatrix .assign (this .cameraSpaceMatrix) .inverse ();
   }
});

Object .defineProperties (X3DViewpointNode, X3DNode .getStaticProperties ("X3DViewpointNode", "Navigation", 1));

export default X3DViewpointNode;
