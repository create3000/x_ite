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

const
   _baseReferenceSpace = Symbol (),
   _referenceSpace     = Symbol (),
   _baseLayer          = Symbol (),
   _pose               = Symbol (),
   _inputSources       = Symbol (),
   _inputRay           = Symbol (),
   _inputPoint         = Symbol (),
   _combinedSensors    = Symbol ();

function X3DWebXRContext () { }

Object .assign (X3DWebXRContext .prototype,
{
   initialize ()
   {
      // Properties

      this [_combinedSensors] = [ ];

      // Events

      this ._activeViewpoint .addInterest ("setReferenceSpace", this);
   },
   async initXRSession ()
   {
      return Lock .acquire (`X3DWebXRContext.session-${this .getId ()}`, async () =>
      {
         if (this .getSession () !== window)
            return;

         const
            gl             = this .getContext (),
            mode           = this .getBrowserOption ("XRSessionMode") .toLowerCase () .replaceAll ("_", "-"),
            compatible     = await gl .makeXRCompatible (),
            session        = await navigator .xr .requestSession (mode),
            referenceSpace = await session .requestReferenceSpace ("local");

         // WebXR Emulator: must bind default framebuffer, to get xr emulator working.
         gl .bindFramebuffer (gl .FRAMEBUFFER, null);

         const baseLayer = new XRWebGLLayer (session, gl,
         {
            antialias: false,
            alpha: true,
            depth: false,
            ignoreDepthValues: true,
         });

         this .finishedEvents () .addInterest ("finishedFrame", this);
         this .endEvents ()      .addInterest ("endFrame",      this);

         session .updateRenderState ({ baseLayer });
         session .addEventListener( "inputsourceschange", event => this .setInputSources (event));
         session .addEventListener ("end", () => this .stopXRSession ());

         this [_baseReferenceSpace] = referenceSpace;
         this [_baseLayer]          = baseLayer;

         this [_pose] = {
            cameraSpaceMatrix: new Matrix4 (),
            viewMatrix: new Matrix4 (),
            views: [ ],
         };

         this [_inputSources] = new Map ();
         this [_inputRay]     = new ScreenLine (this, 5, 3, 0.9);
         this [_inputPoint]   = new ScreenPoint (this);

         this .setSession (session);
         this .setDefaultFrameBuffer (baseLayer .framebuffer);
         this .setReferenceSpace ();

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

         this .finishedEvents () .removeInterest ("finishedFrame", this);
         this .endEvents ()      .removeInterest ("endFrame",      this);

         this [_baseReferenceSpace] = null;
         this [_referenceSpace]     = null;
         this [_baseLayer]          = null;
         this [_pose]               = null;
         this [_inputSources]       = null;
         this [_inputRay]           = null;
         this [_inputPoint]         = null;

         this .setSession (window);
         this .setDefaultFrameBuffer (null);
      });
   },
   setReferenceSpace ()
   {
      if (!this [_baseReferenceSpace])
         return;

      const
         translation = new Vector3 (),
         rotation    = new Rotation4 ();

      this .getActiveViewpoint () ?.getViewMatrix () .get (translation, rotation)

      const offsetTransform = new XRRigidTransform (translation, rotation .getQuaternion ());

      this [_referenceSpace] = this [_baseReferenceSpace] .getOffsetReferenceSpace (offsetTransform);
   },
   setInputSources (event)
   {
      for (const inputSource of event .added)
      {
         this [_inputSources] .set (inputSource,
         {
            matrix: new Matrix4 (),
            inverse: new Matrix4 (),
            hit: Object .assign (this .getHit () .copy (),
            {
               combinedSensors: this [_combinedSensors],
               pulse: true,
            }),
         });
      }

      for (const inputSource of event .removed)
         this [_inputSources] .delete (inputSource);
   },
   setFrame (frame)
   {
      if (!frame)
         return;

      const emulator = !this .getCanvas () .parent () .is (this .getSurface ());

      // WebXR Emulator or polyfill.
      if (emulator)
         this .getCanvas () .css (this .getXREmulatorCSS ());

      // Get matrices from views.

      const pose = frame .getViewerPose (this [_referenceSpace]);

      this [_pose] .cameraSpaceMatrix .assign (pose .transform .matrix);
      this [_pose] .viewMatrix        .assign (pose .transform .inverse .matrix);

      let v = 0;

      for (const view of pose .views)
      {
         const { x, y, width, height } = this [_baseLayer] .getViewport (view);

         // WebXR Emulator: second view has width zero if in non-stereo mode.
         if (!width)
            continue;

         this .reshapeFrameBuffer (v, x|0, y|0, width|0, height|0);

         const pv = this [_pose] .views [v] ??= {
            projectionMatrix: new Matrix4 (),
            cameraSpaceMatrix: new Matrix4 (),
            viewMatrix: new Matrix4 (),
            matrix: new Matrix4 (),
            inverse: new Matrix4 (),
         };

         pv .projectionMatrix .assign (view .projectionMatrix);
         pv .cameraSpaceMatrix .assign (view .transform .matrix);
         pv .viewMatrix .assign (view .transform .inverse .matrix);
         pv .matrix .assign (pose .transform .matrix) .multRight (view .transform .inverse .matrix);
         pv .inverse .assign (pv .matrix) .inverse ();

         ++ v;
      }

      this .getFrameBuffers () .length = v;
      this [_pose] .views .length      = v;

      // Get target ray matrices from input sources.

      for (const [original, { matrix, inverse }] of this [_inputSources])
      {
         const
            targetRaySpace = original .targetRaySpace,
            targetRayPose  = frame .getPose (targetRaySpace, this [_referenceSpace]);

         original .active = !! targetRayPose;

         if (!targetRayPose)
            continue;

         matrix  .assign (targetRayPose .transform .matrix);
         inverse .assign (targetRayPose .transform .inverse .matrix);
      }

      // Trigger new frame.

      this .addBrowserEvent ();
   },
   finishedFrame: (function ()
   {
      const
         blue           = new Color3 (0.5, 0.75, 1),
         inputRayMatrix = new Matrix4 (),
         toVector       = new Vector3 (0, 0, -0.5),
         fromPoint      = new Vector3 (),
         toPoint        = new Vector3 (),
         hitRotation    = new Rotation4 (),
         hitSize        = 0.007,
         hitPressedSize = 0.005;

      return function ()
      {
         const
            pose     = this [_pose],
            viewport = this .getViewport () .getValue ();

         // Test for hit.

         for (const [original, inputSource] of this [_inputSources])
         {
            if (!original .active)
               continue;

            this .touch (viewport [2] / 2, viewport [3] / 2, inputSource, inputSource .hit);

            // Make a puls if there is a sensor hit.

            this .sensorHitPulse (inputSource .hit, original .gamepad);
         }

         // Combine sensors.

         const combinedSensors = this [_combinedSensors];

         combinedSensors .length = 0;

         for (const [original, { hit }] of this [_inputSources])
         {
            if (!original .active)
               continue;

            combinedSensors .push (... hit .sensors);
         }

         // Handle sensors.

         for (const [original, { hit }] of this [_inputSources])
         {
            if (!original .active)
               continue;

            // Pointing

            this .motionNotifyEvent (0, 0, hit);

            const button = original .gamepad ?.buttons [0];

            if (button ?.pressed)
            {
               if (!hit .pressed)
               {
                  hit .pressed = true;

                  this .buttonPressEvent (0, 0, hit);
               }

               break;
            }
            else if (hit .pressed)
            {
               hit .pressed = false;

               this .buttonReleaseEvent (hit);

               break;
            }
         }

         // Draw input source rays.

         for (const [i, view] of pose .views .entries ())
         {
            const
               frameBuffer      = this .getFrameBuffers () [i],
               projectionMatrix = view .projectionMatrix,
               viewMatrix       = view .viewMatrix;

            for (const [original, { matrix, hit }] of this [_inputSources])
            {
               if (!original .active)
                  continue;

               // Draw input ray.

               const
                  pressed = original .gamepad ?.buttons .some (button => button .pressed),
                  color   = pressed ? blue : Color3 .White;

               inputRayMatrix
                  .assign (matrix)
                  .multRight (viewMatrix);

               inputRayMatrix .multVecMatrix (fromPoint .assign (Vector3 .Zero));
               inputRayMatrix .multVecMatrix (toPoint   .assign (toVector));

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
                  .translate (hit .point)
                  .rotate (hitRotation .setFromToVec (Vector3 .zAxis, hit .normal));

               this [_inputPoint] .display (radius, color, 0.3, 0.8, inputRayMatrix, projectionMatrix, frameBuffer);
            }
         }
      };
   })(),
   endFrame ()
   {
      const gl = this .getContext ();

      // WebXR Emulator and polyfill: bind to null, to prevent changes.
      gl .bindVertexArray (null);
   },
   getPose ()
   {
      return this [_pose];
   },
   sensorHitPulse (hit, gamepad)
   {
      if (hit .sensors .length)
      {
         if (hit .pulse)
         {
            gamepad ?.hapticActuators ?.[0] ?.pulse (0.2, 10);

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
