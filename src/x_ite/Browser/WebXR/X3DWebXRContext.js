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

import ScreenLine  from "../Rendering/ScreenLine.js";
import ScreenPoint from "../Rendering/ScreenPoint.js";
import ViewVolume  from "../../../standard/Math/Geometry/ViewVolume.js";
import Color3      from "../../../standard/Math/Numbers/Color3.js";
import Vector3     from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4   from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4     from "../../../standard/Math/Numbers/Matrix4.js";
import Lock        from "../../../standard/Utility/Lock.js";

import "./WebXRExamineViewer.js";
import "./WebXRX3DFlyViewer.js";
import "./WebXRX3DViewer.js";

const
   _referenceSpace = Symbol (),
   _baseLayer      = Symbol (),
   _pose           = Symbol (),
   _visible        = Symbol (),
   _inputSources   = Symbol (),
   _inputRay       = Symbol (),
   _inputPoint     = Symbol (),
   _gamepads       = Symbol (),
   _frame          = Symbol ();

function X3DWebXRContext ()
{
   this [_gamepads] = [ ];
}

Object .assign (X3DWebXRContext .prototype,
{
   getPose ()
   {
      return this [_pose];
   },
   async startXRSession ()
   {
      return Lock .acquire (`X3DWebXRContext.session-${this .getId ()}`, async () =>
      {
         if (this .getSession () !== window)
            return;

         const
            gl             = this .getContext (),
            mode           = this .getBrowserOption ("XRSessionMode") .toLowerCase () .replaceAll ("_", "-"),
            session        = await navigator .xr .requestSession (mode),
            referenceSpace = await session .requestReferenceSpace ("local"),
            compatible     = await gl .makeXRCompatible ();

         this .finishedEvents () .addInterest ("xrUpdatePointers", this);

         session .addEventListener ("visibilitychange", () => this .xrUpdateVisibility ());
         session .addEventListener ("inputsourceschange", event => this .xrUpdateInputSources (event));
         session .addEventListener ("end", () => this .stopXRSession ());

         this [_referenceSpace] = referenceSpace;
         this [_visible]        = true;
         this [_inputSources]   = new Set ();
         this [_inputRay]       = new ScreenLine (this, 4, 2, 0.9);
         this [_inputPoint]     = new ScreenPoint (this);

         Object .assign (this [_gamepads], { action: true });

         this [_pose] = {
            cameraSpaceMatrix: new Matrix4 (),
            viewMatrix: new Matrix4 (),
            views: [ ],
         };

         this .xrUpdateBaseLayer ({ }, session);
         this .setSession (session);
         this .removeHit (this .getHit ());

         // Rendering Properties

         this .getRenderingProperties () ._ContentScale .addInterest ("xrContentScale", this);

         this .getRenderingProperties () ._XRSession = true;

         // session .addEventListener ("select", event =>
         // {
         //    const { inputSource, frame } = event;
         //
         //    console .log (event)
         //    console .log (inputSource)
         //    console .log (frame)
         // });
      });
   },
   stopXRSession ()
   {
      return Lock .acquire (`X3DWebXRContext.session-${this .getId ()}`, async () =>
      {
         if (this .getSession () === window)
            return;

         await this .getSession () .end () .catch (Function .prototype);

         this .finishedEvents () .removeInterest ("xrUpdatePointers", this);

         this .setSession (window);
         this .setDefaultFramebuffer (null);

         for (const { hit } of this [_inputSources])
            this .removeHit (hit);

         this [_referenceSpace] = null;
         this [_baseLayer]      = null;
         this [_pose]           = null;
         this [_visible]        = false;
         this [_inputSources]   = null;
         this [_inputRay]       = null;
         this [_inputPoint]     = null;
         this [_frame]          = null;

         // Rendering Properties

         this .getRenderingProperties () ._ContentScale .removeInterest ("xrContentScale", this);

         this .getRenderingProperties () ._XRSession = false;
      });
   },
   xrContentScale ()
   {
      this .xrUpdateBaseLayer ();
   },
   xrUpdateBaseLayer (options = { }, session = this .getSession ())
   {
      if (session === window)
         return;

      const baseLayer = new XRWebGLLayer (session, this .getContext (), Object .assign ({
         antialias: false,
         alpha: true,
         depth: false,
         ignoreDepthValues: true,
         framebufferScaleFactor: this .getRenderingProperty ("ContentScale"),
      },
      options));

      this [_baseLayer] = baseLayer;

      session .updateRenderState ({ baseLayer });

      this .setDefaultFramebuffer (baseLayer .framebuffer);
   },
   xrUpdateNearFarPlanes: (function ()
   {
      const nearFarPlanes = { };

      return function ()
      {
         const
            navigationInfoNode = this .getActiveNavigationInfo (),
            viewpointNode      = this .getActiveViewpoint ();

         if (viewpointNode)
         {
            nearFarPlanes .depthNear = viewpointNode .getNearDistance (navigationInfoNode);
            nearFarPlanes .depthFar  = viewpointNode .getFarDistance  (navigationInfoNode);
         }
         else
         {
            nearFarPlanes .depthNear = 0.1;
            nearFarPlanes .depthFar  = 10_000;
         }

         this .getSession () .updateRenderState (nearFarPlanes);
      };
   })(),
   xrUpdateVisibility (event)
   {
      switch (this .getSession () .visibilityState)
      {
         case "visible-blurred":
         case "hidden":
            this [_visible] = false;
            break;

         default:
            this [_visible] = true;
            break;
      }
   },
   xrUpdateInputSources (event)
   {
      for (const inputSource of event .added)
      {
         this [_inputSources] .add (Object .assign (inputSource,
         {
            active: false,
            matrix: new Matrix4 (),
            inverse: new Matrix4 (),
            hit: Object .assign (this .getHit () .copy (),
            {
               button: false,
               pressed: false,
               pulse: true,
               poseViewMatrix: new Matrix4 (),
               originalPoint: new Vector3 (),
               originalNormal: new Vector3 (),
            }),
         }));

         if (inputSource .gamepad)
            inputSource .gamepad .hit = inputSource .hit;
      }

      for (const inputSource of event .removed)
      {
         this .removeHit (inputSource .hit);
         this [_inputSources] .delete (inputSource);
      }

      this .xrUpdateGamepads ();
   },
   xrUpdateGamepads ()
   {
      this [_gamepads] .length = 0;

      for (const { gamepad } of this [_inputSources])
      {
         if (!gamepad)
            continue;

         if (gamepad .axes .length < 4)
            continue;

         this [_gamepads] .push (gamepad);
      }
   },
   xrFrame (frame)
   {
      if (!frame)
         return;

      this [_frame] = frame;

      // Projection matrix

      this .xrUpdateNearFarPlanes ();

      // Navigation

      this .getViewer () .gamepads (this [_gamepads]);
      this .xrUpdatePose ();

      // Trigger new frame.

      this .addBrowserEvent ();
   },
   xrUpdatePose ()
   {
      // Get matrices from views.

      const
         originalPose = this [_frame] .getViewerPose (this [_referenceSpace]),
         pose         = this [_pose];

      pose .cameraSpaceMatrix .assign (originalPose .transform .matrix);
      pose .viewMatrix        .assign (originalPose .transform .inverse .matrix);

      let i = 0;

      for (const originalView of originalPose .views)
      {
         const { x, y, width, height } = this [_baseLayer] .getViewport (originalView);

         // WebXR Emulator: second view has width zero if in non-stereo mode.
         if (!width)
            continue;

         this .reshapeFramebuffer (i, x, y, width, height);

         const view = pose .views [i] ??= {
            projectionMatrix: new Matrix4 (),
            cameraSpaceMatrix: new Matrix4 (),
            viewMatrix: new Matrix4 (),
            matrix: new Matrix4 (),
            inverse: new Matrix4 (),
         };

         view .projectionMatrix  .assign (originalView .projectionMatrix);
         view .cameraSpaceMatrix .assign (originalView .transform .matrix);
         view .viewMatrix        .assign (originalView .transform .inverse .matrix);

         view .matrix  .assign (pose .cameraSpaceMatrix) .multRight (view .viewMatrix);
         view .inverse .assign (view .cameraSpaceMatrix) .multRight (pose .viewMatrix);

         ++ i;
      }

      this .getFramebuffers () .length = i;
      pose .views .length              = i;
   },
   xrUpdatePointers: (function ()
   {
      const
         blue           = new Color3 (0.5, 0.75, 1),
         inputRayMatrix = new Matrix4 (),
         toVector       = new Vector3 (0, 0, -0.5),
         fromPoint      = new Vector3 (),
         toPoint        = new Vector3 (),
         hitPoint       = new Vector3 (),
         hitRotation    = new Rotation4 (),
         hitSize        = 0.007,
         hitPressedSize = 0.005;

      return function ()
      {
         const
            viewport = this .getViewport () .getValue (),
            pose     = this [_pose];

         // Get target ray matrices from input sources.

         for (const inputSource of this [_inputSources])
         {
            const { targetRaySpace, matrix, inverse } = inputSource;

            const targetRayPose = this [_frame] .getPose (targetRaySpace, this [_referenceSpace]);

            inputSource .active = !! targetRayPose;

            if (!targetRayPose)
               continue;

            matrix  .assign (targetRayPose .transform .matrix);
            inverse .assign (targetRayPose .transform .inverse .matrix);
         }

         // Test for hits.

         for (const inputSource of this [_inputSources])
         {
            const { active, gamepad, matrix, hit } = inputSource;

            if (!active)
               continue;

            this .touch (viewport [2] / 2, viewport [3] / 2, hit, inputSource);

            // Make a vibration puls if there is a sensor hit.

            this .xrSensorHitPulse (hit, gamepad);

            // Update matrices and determine pointer position.

            if (!hit .id)
               continue;

            const projectionMatrix = pose .views [0] .projectionMatrix;

            if (!hit .pressed)
               hit .poseViewMatrix .assign (pose .viewMatrix);

            inputRayMatrix .assign (matrix) .multRight (hit .poseViewMatrix);

            for (const sensor of hit .sensors .values ())
            {
               sensor .projectionMatrix .assign (projectionMatrix);
               sensor .modelViewMatrix  .multRight (inputRayMatrix);
            }

            ViewVolume .projectPoint (hit .point, inputRayMatrix, projectionMatrix, viewport, hit .pointer);

            hit .originalPoint  .assign (hit .point);
            hit .originalNormal .assign (hit .normal);

            hit .ray .multLineMatrix (inputRayMatrix);
            inputRayMatrix .multVecMatrix (hit .point);
            inputRayMatrix .submatrix .inverse () .multMatrixVec (hit .normal);
         }

         // Handle nodes of type X3DPointingDeviceSensorNodes.

         for (const { active, gamepad, hit } of this [_inputSources])
         {
            if (!active)
               continue;

            // Press & Release

            const button0 = gamepad ?.buttons [0];

            if (button0 ?.pressed)
            {
               if (!hit .button)
               {
                  hit .button    = true;
                  hit .pressed ||= this .buttonPressEvent (0, 0, hit);
               }
            }
            else
            {
               hit .button = false;

               if (hit .pressed)
               {
                  hit .pressed = false;

                  this .buttonReleaseEvent (hit);
               }
            }

            // Motion

            this .motionNotifyEvent (0, 0, hit);
         }

         // Draw input source rays.

         if (!this [_visible])
            return;

         for (const [i, { viewMatrix, projectionMatrix }] of pose .views .entries ())
         {
            const frameBuffer = this .getFramebuffers () [i];

            for (const { active, gamepad, matrix, hit } of this [_inputSources])
            {
               if (!active)
                  continue;

               // Draw input ray.

               const
                  pressed = gamepad ?.buttons .some (button => button .pressed),
                  color   = pressed ? blue : Color3 .White;

               inputRayMatrix
                  .assign (matrix)
                  .multRight (viewMatrix);

               inputRayMatrix .multVecMatrix (fromPoint .assign (Vector3 .Zero));
               inputRayMatrix .multVecMatrix (toPoint   .assign (toVector));
               inputRayMatrix .multVecMatrix (hitPoint  .assign (hit .originalPoint));

               // Make ray shorter if track point is very close.
               if (hit .id && hitPoint .distance (fromPoint) < toPoint .distance (fromPoint))
                  toPoint .assign (hitPoint);

               if (fromPoint .z > 0 || toPoint .z > 0)
                  continue;

               ViewVolume .projectPointMatrix (fromPoint, projectionMatrix, viewport, fromPoint);
               ViewVolume .projectPointMatrix (toPoint,   projectionMatrix, viewport, toPoint);

               fromPoint .z = 0;
               toPoint   .z = 0;

               this [_inputRay]
                  .setColor (color)
                  .display (fromPoint, toPoint, frameBuffer);

               // Draw hit point.

               if (!hit .id)
                  continue;

               const radius = pressed ? hitPressedSize : hitSize;

               inputRayMatrix
                  .assign (matrix)
                  .multRight (viewMatrix)
                  .translate (hit .originalPoint)
                  .rotate (hitRotation .setFromToVec (Vector3 .zAxis, hit .originalNormal));

               this [_inputPoint] .display (radius, color, 0.3, 0.8, inputRayMatrix, projectionMatrix, frameBuffer);
            }
         }
      };
   })(),
   xrSensorHitPulse (hit, gamepad)
   {
      if (hit .sensors .size)
      {
         if (hit .pulse)
         {
            gamepad ?.hapticActuators ?.[0] ?.pulse (0.25, 10);

            hit .pulse = false;
         }
      }
      else
      {
         hit .pulse = true;
      }
   },
});

export default X3DWebXRContext;
