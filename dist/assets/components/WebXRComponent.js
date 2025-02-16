/* X_ITE v11.2.0 */
const __X_ITE_X3D__ = window [Symbol .for ("X_ITE.X3D-11.2.0")];
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/

// UNUSED EXPORTS: default

;// external "__X_ITE_X3D__ .Components"
const external_X_ITE_X3D_Components_namespaceObject = __X_ITE_X3D__ .Components;
var external_X_ITE_X3D_Components_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Components_namespaceObject);
;// external "__X_ITE_X3D__ .ScreenLine"
const external_X_ITE_X3D_ScreenLine_namespaceObject = __X_ITE_X3D__ .ScreenLine;
var external_X_ITE_X3D_ScreenLine_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_ScreenLine_namespaceObject);
;// external "__X_ITE_X3D__ .GeometryContext"
const external_X_ITE_X3D_GeometryContext_namespaceObject = __X_ITE_X3D__ .GeometryContext;
var external_X_ITE_X3D_GeometryContext_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_GeometryContext_namespaceObject);
;// external "__X_ITE_X3D__ .AlphaMode"
const external_X_ITE_X3D_AlphaMode_namespaceObject = __X_ITE_X3D__ .AlphaMode;
var external_X_ITE_X3D_AlphaMode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_AlphaMode_namespaceObject);
;// external "__X_ITE_X3D__ .VertexArray"
const external_X_ITE_X3D_VertexArray_namespaceObject = __X_ITE_X3D__ .VertexArray;
var external_X_ITE_X3D_VertexArray_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_VertexArray_namespaceObject);
;// external "__X_ITE_X3D__ .Layer"
const external_X_ITE_X3D_Layer_namespaceObject = __X_ITE_X3D__ .Layer;
var external_X_ITE_X3D_Layer_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Layer_namespaceObject);
;// external "__X_ITE_X3D__ .Matrix4"
const external_X_ITE_X3D_Matrix4_namespaceObject = __X_ITE_X3D__ .Matrix4;
var external_X_ITE_X3D_Matrix4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Matrix4_namespaceObject);
;// external "__X_ITE_X3D__ .Namespace"
const external_X_ITE_X3D_Namespace_namespaceObject = __X_ITE_X3D__ .Namespace;
var external_X_ITE_X3D_Namespace_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Namespace_namespaceObject);
;// ./src/x_ite/Browser/Rendering/ScreenPoint.js
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






function ScreenPoint (browser)
{
   const gl = browser .getContext ();

   this .browser           = browser;
   this .vertexArrayObject = new (external_X_ITE_X3D_VertexArray_default()) (gl);

   // Black Circle

   this .circleVertexBuffer    = gl .createBuffer ();
   this .circleGeometryContext = new (external_X_ITE_X3D_GeometryContext_default()) ({
      renderObject: new (external_X_ITE_X3D_Layer_default()) (browser .getPrivateScene ()),
      alphaMode: (external_X_ITE_X3D_AlphaMode_default()).BLEND,
      geometryType: 1,
   });

   this .circleGeometryContext .renderObject .setup ();

   // Transfer circle vertices.

   const circleVertexArray = browser .getCircle2DOptions () .getGeometry () .getVertices ();

   this .circleNumVertices = circleVertexArray .length / 4;

   gl .bindBuffer (gl .ARRAY_BUFFER, this .circleVertexBuffer);
   gl .bufferData (gl .ARRAY_BUFFER, circleVertexArray .getValue (), gl .STATIC_DRAW);

   // Disk

   this .diskVertexBuffer      = gl .createBuffer ();
   this .diskGeometryContext   = new (external_X_ITE_X3D_GeometryContext_default()) ({
      renderObject: this .circleGeometryContext .renderObject,
      alphaMode: (external_X_ITE_X3D_AlphaMode_default()).BLEND,
      geometryType: 3,
   });

   // Transfer disk vertices.

   const diskVertexArray = browser .getDisk2DOptions () .getDiskVertices ();

   this .diskNumVertices = diskVertexArray .length / 4;

   gl .bindBuffer (gl .ARRAY_BUFFER, this .diskVertexBuffer);
   gl .bufferData (gl .ARRAY_BUFFER, diskVertexArray .getValue (), gl .STATIC_DRAW);
}

Object .assign (ScreenPoint .prototype,
{
   display: (() =>
   {
      const
         projectionMatrixArray = new Float32Array ((external_X_ITE_X3D_Matrix4_default()).Identity),
         modelViewMatrixArray  = new Float32Array ((external_X_ITE_X3D_Matrix4_default()).Identity),
         screenMatrix          = new (external_X_ITE_X3D_Matrix4_default()) (),
         clipPlanes            = [ ];

      return function (radius, color, transparency, circle, modelViewMatrix, projectionMatrix, frameBuffer)
      {
         // Configure HUD

         const
            browser  = this .browser,
            gl       = browser .getContext (),
            viewport = browser .getViewport ();

         frameBuffer .bind ();

         // Set viewport.

         gl .viewport (... viewport);
         gl .scissor (... viewport);

         // Apply screen scale to matrix.

         const
            screenScale = Math .abs (modelViewMatrix .origin .z),
            scale       = radius * screenScale;

         const
            x = modelViewMatrix .xAxis .normalize () .multiply (scale),
            y = modelViewMatrix .yAxis .normalize () .multiply (scale),
            z = modelViewMatrix .zAxis .normalize () .multiply (scale);

         screenMatrix .set (... x, 0, ... y, 0, ... z, 0, ... modelViewMatrix .origin, 1);

         // Set projection and model view matrix.

         projectionMatrixArray .set (projectionMatrix);
         modelViewMatrixArray  .set (screenMatrix);

         // Change state.

         gl .depthMask (false);
         gl .disable (gl .DEPTH_TEST);
         gl .enable (gl .BLEND);
         gl .disable (gl .CULL_FACE);

         {
            // Set uniforms and attributes.

            const shaderNode = browser .getDefaultMaterial () .getShader (this .circleGeometryContext);

            shaderNode .enable (gl);
            shaderNode .setClipPlanes (gl, clipPlanes);

            gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, projectionMatrixArray);
            gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,  false, modelViewMatrixArray);
            gl .uniform3f        (shaderNode .x3d_EmissiveColor, 0, 0, 0);
            gl .uniform1f        (shaderNode .x3d_Transparency, circle);

            if (this .vertexArrayObject .enable (shaderNode .getProgram ()))
               shaderNode .enableVertexAttribute (gl, this .circleVertexBuffer, 0, 0);

            // Draw a black and a white point.

            gl .drawArrays (gl .LINES, 0, this .circleNumVertices);
         }

         {
            // Set uniforms and attributes.

            const shaderNode = browser .getDefaultMaterial () .getShader (this .diskGeometryContext);

            shaderNode .enable (gl);
            shaderNode .setClipPlanes (gl, clipPlanes);

            gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, projectionMatrixArray);
            gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,  false, modelViewMatrixArray);
            gl .uniform3f        (shaderNode .x3d_EmissiveColor, ... color);
            gl .uniform1f        (shaderNode .x3d_Transparency, transparency);

            if (this .vertexArrayObject .enable (shaderNode .getProgram ()))
               shaderNode .enableVertexAttribute (gl, this .diskVertexBuffer, 0, 0);

            // Draw a black and a white point.

            gl .drawArrays (gl .TRIANGLES, 0, this .diskNumVertices);
         }

         // Reset state.

         gl .depthMask (true);
         gl .enable (gl .DEPTH_TEST);
         gl .disable (gl .BLEND);
      };
   })(),
   dispose ()
   {
      const gl = this .browser .getContext ();

      gl .deleteBuffer (this .diskVertexBuffer);

      this .diskVertexArrayObject .dispose (gl);
   },
});

const __default__ = ScreenPoint;
;

/* harmony default export */ const Rendering_ScreenPoint = (external_X_ITE_X3D_Namespace_default().add ("ScreenPoint", __default__));
;// external "__X_ITE_X3D__ .ViewVolume"
const external_X_ITE_X3D_ViewVolume_namespaceObject = __X_ITE_X3D__ .ViewVolume;
var external_X_ITE_X3D_ViewVolume_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_ViewVolume_namespaceObject);
;// external "__X_ITE_X3D__ .Color3"
const external_X_ITE_X3D_Color3_namespaceObject = __X_ITE_X3D__ .Color3;
var external_X_ITE_X3D_Color3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Color3_namespaceObject);
;// external "__X_ITE_X3D__ .Vector3"
const external_X_ITE_X3D_Vector3_namespaceObject = __X_ITE_X3D__ .Vector3;
var external_X_ITE_X3D_Vector3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Vector3_namespaceObject);
;// external "__X_ITE_X3D__ .Rotation4"
const external_X_ITE_X3D_Rotation4_namespaceObject = __X_ITE_X3D__ .Rotation4;
var external_X_ITE_X3D_Rotation4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Rotation4_namespaceObject);
;// external "__X_ITE_X3D__ .Lock"
const external_X_ITE_X3D_Lock_namespaceObject = __X_ITE_X3D__ .Lock;
var external_X_ITE_X3D_Lock_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Lock_namespaceObject);
;// external "__X_ITE_X3D__ .ExamineViewer"
const external_X_ITE_X3D_ExamineViewer_namespaceObject = __X_ITE_X3D__ .ExamineViewer;
var external_X_ITE_X3D_ExamineViewer_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_ExamineViewer_namespaceObject);
;// ./src/x_ite/Browser/WebXR/WebXRExamineViewer.js



const
   GAMEPAD_SPIN_FACTOR = 10,
   GAMEPAD_PAN_FACTOR  = 5,
   GAMEPAD_ZOOM_FACTOR = 1 / 200;

Object .assign ((external_X_ITE_X3D_ExamineViewer_default()).prototype,
{
   gamepads (gamepads)
   {
      const gamepad = gamepads .find (({ axes }) => axes [2] || axes [3]);

      if (!gamepad)
      {
         if (gamepads .action)
         {
            gamepads .action = false;

            this .disconnect ();
         }

         return;
      }

      const
         button0 = gamepad .buttons [0] .pressed,
         button1 = gamepad .buttons [1] .pressed;

      if (gamepads .button0 !== button0 || gamepads .button1 !== button1)
      {
         gamepads .button0 = button0;
         gamepads .button1 = button1;

         this .disconnect ();
      }

      const f = 60 / this .getBrowser () .currentFrameRate;

      gamepads .action = true;

      if (button0)
      {
         this .zoom (gamepad .axes [3] * GAMEPAD_ZOOM_FACTOR * f, Math .sign (-gamepad .axes [3]));
      }
      else if (button1)
      {
         // Pan
         this .startPan (0, 0);
         this .pan (-gamepad .axes [2] * GAMEPAD_PAN_FACTOR * f, gamepad .axes [3] * GAMEPAD_PAN_FACTOR * f);
      }
      else // default
      {
         // Rotate

         this .startRotate (0, 0);
         this .rotate (-gamepad .axes [2] * GAMEPAD_SPIN_FACTOR * f, gamepad .axes [3] * GAMEPAD_SPIN_FACTOR * f);
      }
   },
});

;// external "__X_ITE_X3D__ .X3DFlyViewer"
const external_X_ITE_X3D_X3DFlyViewer_namespaceObject = __X_ITE_X3D__ .X3DFlyViewer;
var external_X_ITE_X3D_X3DFlyViewer_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DFlyViewer_namespaceObject);
;// ./src/x_ite/Browser/WebXR/WebXRX3DFlyViewer.js



const GAMEPAD_SPEED_FACTOR = new (external_X_ITE_X3D_Vector3_default()) (300, 300, 400);

Object .assign ((external_X_ITE_X3D_X3DFlyViewer_default()).prototype,
{
   gamepads: (function ()
   {
      const axis = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (gamepads)
      {
         const gamepad = gamepads .find (({ axes }) => axes [2] || axes [3]);

         if (!gamepad)
         {
            this .startTime = Date .now ();
            return;
         }

         const button1 = gamepad .buttons [1] .pressed;

         if (button1)
         {
            axis
               .set (gamepad .axes [2], -gamepad .axes [3], 0)
               .multVec (GAMEPAD_SPEED_FACTOR);

            // Moving average.
            this .direction .add (axis) .divide (2);

            this .pan ();
         }
         else // default
         {
            axis
               .set (gamepad .axes [2], 0, gamepad .axes [3])
               .multVec (GAMEPAD_SPEED_FACTOR);

            // Moving average.
            this .direction .add (axis) .divide (2);

            this .fly ();
         }
      };
   })(),
});

;// external "__X_ITE_X3D__ .X3DViewer"
const external_X_ITE_X3D_X3DViewer_namespaceObject = __X_ITE_X3D__ .X3DViewer;
var external_X_ITE_X3D_X3DViewer_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DViewer_namespaceObject);
;// ./src/x_ite/Browser/WebXR/WebXRX3DViewer.js


Object .assign ((external_X_ITE_X3D_X3DViewer_default()).prototype,
{
   gamepads ()
   { },
});

;// ./src/x_ite/Browser/WebXR/X3DWebXRContext.js
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














const
   _referenceSpace = Symbol (),
   _baseLayer      = Symbol (),
   _pose           = Symbol (),
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
   async initXRSession ()
   {
      return external_X_ITE_X3D_Lock_default().acquire (`X3DWebXRContext.session-${this .getId ()}`, async () =>
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

         this .cameraEvents ()   .addInterest ("updatePose",     this);
         this .finishedEvents () .addInterest ("updatePointers", this);
         this .endEvents ()      .addInterest ("endFrame",       this);

         session .addEventListener ("inputsourceschange", event => this .updateInputSources (event));
         session .addEventListener ("end", () => this .stopXRSession ());

         this [_referenceSpace] = referenceSpace;

         this [_inputSources] = new Set ();
         this [_inputRay]     = new (external_X_ITE_X3D_ScreenLine_default()) (this, 4, 2, 0.9);
         this [_inputPoint]   = new Rendering_ScreenPoint (this);

         Object .assign (this [_gamepads], { action: true });

         this [_pose] = {
            cameraSpaceMatrix: new (external_X_ITE_X3D_Matrix4_default()) (),
            viewMatrix: new (external_X_ITE_X3D_Matrix4_default()) (),
            views: [ ],
         };

         this .updateBaseLayer ({ }, session);
         this .setSession (session);
         this .removeHit (this .getHit ());

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
      return external_X_ITE_X3D_Lock_default().acquire (`X3DWebXRContext.session-${this .getId ()}`, async () =>
      {
         if (this .getSession () === window)
            return;

         await this .getSession () .end () .catch (Function .prototype);

         this .cameraEvents ()   .removeInterest ("updatePose",     this);
         this .finishedEvents () .removeInterest ("updatePointers", this);
         this .endEvents ()      .removeInterest ("endFrame",       this);

         this .setSession (window);
         this .setDefaultFramebuffer (null);

         for (const { hit } of this [_inputSources])
            this .removeHit (hit);

         this [_referenceSpace] = null;
         this [_baseLayer]      = null;
         this [_pose]           = null;
         this [_inputSources]   = null;
         this [_inputRay]       = null;
         this [_inputPoint]     = null;
         this [_frame]          = null;
      });
   },
   setFramebufferScaleFactor (framebufferScaleFactor)
   {
      this .updateBaseLayer ({ framebufferScaleFactor });
   },
   updateBaseLayer (options = { }, session = this .getSession ())
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
   updateInputSources (event)
   {
      for (const inputSource of event .added)
      {
         this [_inputSources] .add (Object .assign (inputSource,
         {
            active: false,
            matrix: new (external_X_ITE_X3D_Matrix4_default()) (),
            inverse: new (external_X_ITE_X3D_Matrix4_default()) (),
            hit: Object .assign (this .getHit () .copy (),
            {
               button: false,
               pressed: false,
               pulse: true,
               poseViewMatrix: new (external_X_ITE_X3D_Matrix4_default()) (),
               originalPoint: new (external_X_ITE_X3D_Vector3_default()) (),
               originalNormal: new (external_X_ITE_X3D_Vector3_default()) (),
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
   },
   setFrame (frame)
   {
      if (!frame)
         return;

      this [_frame] = frame;

      // Emulator

      const emulator = !this .getCanvas () .parent () .is (this .getSurface ());

      // WebXR Emulator or polyfill.
      if (emulator)
         this .getCanvas () .css (this .getXREmulatorCSS ());

      // TODO: Clip planes

      // const
      //    navigationInfoNode = this .getActiveNavigationInfo (),
      //    viewpointNode      = this .getActiveViewpoint ();

      // this .getSession () .updateRenderState ({
      //    depthNear: viewpointNode .getNearDistance (navigationInfoNode), // 0.1
      //    depthFar:  viewpointNode .getFarDistance  (navigationInfoNode), // 10_000
      // });

      // Navigation

      this [_gamepads] .length = 0;

      for (const { active, gamepad } of this [_inputSources])
      {
         if (!active)
            continue;

         if (gamepad .axes .length < 4)
            continue;

         this [_gamepads] .push (gamepad);
      }

      this .getViewer () .gamepads (this [_gamepads]);

      // Trigger new frame.

      this .addBrowserEvent ();
   },
   getPose ()
   {
      return this [_pose];
   },
   updatePose ()
   {
      // Get matrices from views.

      const
         originalPose  = this [_frame] .getViewerPose (this [_referenceSpace]),
         pose          = this [_pose],
         viewpointNode = this .getActiveViewpoint ();

      pose .cameraSpaceMatrix .assign (originalPose .transform .matrix);
      pose .viewMatrix        .assign (originalPose .transform .inverse .matrix);

      if (viewpointNode)
      {
         pose .cameraSpaceMatrix .multRight (viewpointNode .getCameraSpaceMatrix ());
         pose .viewMatrix        .multLeft  (viewpointNode .getViewMatrix ());
      }

      let v = 0;

      for (const originalView of originalPose .views)
      {
         const { x, y, width, height } = this [_baseLayer] .getViewport (originalView);

         // WebXR Emulator: second view has width zero if in non-stereo mode.
         if (!width)
            continue;

         this .reshapeFramebuffer (v, x|0, y|0, width|0, height|0);

         const view = pose .views [v] ??= {
            projectionMatrix: new (external_X_ITE_X3D_Matrix4_default()) (),
            cameraSpaceMatrix: new (external_X_ITE_X3D_Matrix4_default()) (),
            viewMatrix: new (external_X_ITE_X3D_Matrix4_default()) (),
            matrix: new (external_X_ITE_X3D_Matrix4_default()) (),
            inverse: new (external_X_ITE_X3D_Matrix4_default()) (),
         };

         view .projectionMatrix  .assign (originalView .projectionMatrix);
         view .cameraSpaceMatrix .assign (originalView .transform .matrix);
         view .viewMatrix        .assign (originalView .transform .inverse .matrix);

         if (viewpointNode)
         {
            view .cameraSpaceMatrix .multRight (viewpointNode .getCameraSpaceMatrix ());
            view .viewMatrix        .multLeft  (viewpointNode .getViewMatrix ());
         }

         view .matrix  .assign (pose .cameraSpaceMatrix) .multRight (view .viewMatrix);
         view .inverse .assign (view .cameraSpaceMatrix) .multRight (pose .viewMatrix);

         ++ v;
      }

      pose .views .length              = v;
      this .getFramebuffers () .length = v;
   },
   updatePointers: (function ()
   {
      const
         blue           = new (external_X_ITE_X3D_Color3_default()) (0.5, 0.75, 1),
         inputRayMatrix = new (external_X_ITE_X3D_Matrix4_default()) (),
         toVector       = new (external_X_ITE_X3D_Vector3_default()) (0, 0, -0.5),
         fromPoint      = new (external_X_ITE_X3D_Vector3_default()) (),
         toPoint        = new (external_X_ITE_X3D_Vector3_default()) (),
         hitPoint       = new (external_X_ITE_X3D_Vector3_default()) (),
         hitRotation    = new (external_X_ITE_X3D_Rotation4_default()) (),
         hitSize        = 0.007,
         hitPressedSize = 0.005;

      return function ()
      {
         const
            viewport      = this .getViewport () .getValue (),
            pose          = this [_pose],
            viewpointNode = this .getActiveViewpoint ();

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

            if (viewpointNode)
            {
               matrix  .multRight (viewpointNode .getCameraSpaceMatrix ());
               inverse .multLeft  (viewpointNode .getViewMatrix ());
            }
         }

         // Test for hits.

         for (const inputSource of this [_inputSources])
         {
            const { active, gamepad, matrix, hit } = inputSource;

            if (!active)
               continue;

            this .touch (viewport [2] / 2, viewport [3] / 2, hit, inputSource);

            // Make a vibration puls if there is a sensor hit.

            this .sensorHitPulse (hit, gamepad);

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

            external_X_ITE_X3D_ViewVolume_default().projectPoint (hit .point, inputRayMatrix, projectionMatrix, viewport, hit .pointer);

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
                  color   = pressed ? blue : (external_X_ITE_X3D_Color3_default()).White;

               inputRayMatrix
                  .assign (matrix)
                  .multRight (viewMatrix);

               inputRayMatrix .multVecMatrix (fromPoint .assign ((external_X_ITE_X3D_Vector3_default()).Zero));
               inputRayMatrix .multVecMatrix (toPoint   .assign (toVector));
               inputRayMatrix .multVecMatrix (hitPoint  .assign (hit .originalPoint));

               // Make ray shorter if track point is very close.
               if (hitPoint .distance (fromPoint) < toPoint .distance (fromPoint))
                  toPoint .assign (hitPoint);

               if (fromPoint .z > 0 || toPoint .z > 0)
                  continue;

               external_X_ITE_X3D_ViewVolume_default().projectPointMatrix (fromPoint, projectionMatrix, viewport, fromPoint);
               external_X_ITE_X3D_ViewVolume_default().projectPointMatrix (toPoint,   projectionMatrix, viewport, toPoint);

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
                  .rotate (hitRotation .setFromToVec ((external_X_ITE_X3D_Vector3_default()).zAxis, hit .originalNormal));

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
   sensorHitPulse (hit, gamepad)
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

const X3DWebXRContext_default_ = X3DWebXRContext;
;

/* harmony default export */ const WebXR_X3DWebXRContext = (external_X_ITE_X3D_Namespace_default().add ("X3DWebXRContext", X3DWebXRContext_default_));
;// ./src/assets/components/WebXRComponent.js
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




external_X_ITE_X3D_Components_default().add ({
   name: "WebXR",
   concreteNodes:
   [
   ],
   abstractNodes:
   [
   ],
   browserContext: WebXR_X3DWebXRContext,
});

const WebXRComponent_default_ = undefined;
;

/* harmony default export */ const WebXRComponent = (external_X_ITE_X3D_Namespace_default().add ("WebXRComponent", WebXRComponent_default_));
/******/ })()
;