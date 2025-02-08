/* X_ITE v11.1.1 */
const __X_ITE_X3D__ = window [Symbol .for ("X_ITE.X3D-11.1.1")];
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
;// external "__X_ITE_X3D__ .Vector3"
const external_X_ITE_X3D_Vector3_namespaceObject = __X_ITE_X3D__ .Vector3;
var external_X_ITE_X3D_Vector3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Vector3_namespaceObject);
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
   this .vertexBuffer      = gl .createBuffer ();
   this .vertexArrayObject = new (external_X_ITE_X3D_VertexArray_default()) (gl);
   this .geometryContext   = new (external_X_ITE_X3D_GeometryContext_default()) ({
      renderObject: new (external_X_ITE_X3D_Layer_default()) (browser .getPrivateScene ()),
      alphaMode: (external_X_ITE_X3D_AlphaMode_default()).BLEND,
      geometryType: 3,
   });

   this .geometryContext .renderObject .setup ();

   // Transfer vertices.

   const vertexArray = browser .getSphereOptions () .getGeometry () .getVertices ();

   this .numVertices = vertexArray .length / 4;

   gl .bindBuffer (gl .ARRAY_BUFFER, this .vertexBuffer);
   gl .bufferData (gl .ARRAY_BUFFER, vertexArray .getValue (), gl .STATIC_DRAW);
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

      return function (radius, color, transparency, modelViewMatrix, projectionMatrix, frameBuffer)
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
            contentScale = browser .getRenderingProperty ("ContentScale"),
            screenScale  = contentScale * Math .abs (modelViewMatrix .origin .z),
            scale        = radius * screenScale;

         const
            x = modelViewMatrix .xAxis .normalize () .multiply (scale),
            y = modelViewMatrix .yAxis .normalize () .multiply (scale),
            z = modelViewMatrix .zAxis .normalize () .multiply (scale);

         screenMatrix .set (... x, 0, ... y, 0, ... z, 0, ... modelViewMatrix .origin, 1);

         // Set projection and model view matrix.

         projectionMatrixArray .set (projectionMatrix);
         modelViewMatrixArray  .set (screenMatrix);
         modelViewMatrixArray  .set ((external_X_ITE_X3D_Vector3_default()).Zero, 8);

         // Set uniforms and attributes.

         const shaderNode = browser .getDefaultMaterial () .getShader (this .geometryContext);

         shaderNode .enable (gl);
         shaderNode .setClipPlanes (gl, clipPlanes);

         gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, projectionMatrixArray);
         gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,  false, modelViewMatrixArray);
         gl .uniform3f        (shaderNode .x3d_EmissiveColor, ... color);
         gl .uniform1f        (shaderNode .x3d_Transparency, transparency);

         if (this .vertexArrayObject .enable (shaderNode .getProgram ()))
            shaderNode .enableVertexAttribute (gl, this .vertexBuffer, 0, 0);

         // Draw a black and a white point.

         gl .disable (gl .DEPTH_TEST);
         gl .enable (gl .BLEND);
         gl .enable (gl .CULL_FACE);
         gl .drawArrays (gl .TRIANGLES, 0, this .numVertices);
         gl .enable (gl .DEPTH_TEST);
         gl .disable (gl .BLEND);
      };
   })(),
   dispose ()
   {
      const gl = this .browser .getContext ();

      gl .deleteBuffer (this .vertexBuffer);

      this .vertexArrayObject .dispose (gl);
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
;// external "__X_ITE_X3D__ .Rotation4"
const external_X_ITE_X3D_Rotation4_namespaceObject = __X_ITE_X3D__ .Rotation4;
var external_X_ITE_X3D_Rotation4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Rotation4_namespaceObject);
;// external "__X_ITE_X3D__ .Lock"
const external_X_ITE_X3D_Lock_namespaceObject = __X_ITE_X3D__ .Lock;
var external_X_ITE_X3D_Lock_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Lock_namespaceObject);
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
   _baseReferenceSpace = Symbol (),
   _referenceSpace     = Symbol (),
   _baseLayer          = Symbol (),
   _pose               = Symbol (),
   _inputSources       = Symbol (),
   _inputRay           = Symbol (),
   _inputPoint         = Symbol ();

function X3DWebXRContext () { }

Object .assign (X3DWebXRContext .prototype,
{
   initialize ()
   {
      console .log ("Loaded X3DWebXRContext.");

      // Events

      this ._activeViewpoint .addInterest ("setReferenceSpace", this);

   },
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
         session .addEventListener ("end", () => this .stopXRSession ());

         this [_baseReferenceSpace] = referenceSpace;
         this [_baseLayer]          = baseLayer;

         this .setSession (session);
         this .setDefaultFrameBuffer (baseLayer .framebuffer);
         this .setReferenceSpace ();

         this [_pose] = {
            cameraSpaceMatrix: new (external_X_ITE_X3D_Matrix4_default()) (),
            viewMatrix: new (external_X_ITE_X3D_Matrix4_default()) (),
            views: [ ],
         };

         this [_inputSources] = [ ];
         this [_inputRay]     = new (external_X_ITE_X3D_ScreenLine_default()) (this, 5, 3, 0.9);
         this [_inputPoint]   = new Rendering_ScreenPoint (this);

         // $(session) .on ("select", event =>
         // {
         //    const { inputSource, frame } = event .originalEvent;

         //    /* handle the event */

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

         try
         {
            await this .getSession () .end ();
         }
         catch
         { }
         finally
         {
            this .finishedEvents () .removeInterest ("finishedFrame", this);
            this .endEvents ()      .removeInterest ("endFrame",      this);

            this .setSession (window);
            this .setDefaultFrameBuffer (null);

            this [_baseReferenceSpace] = null;
            this [_referenceSpace]     = null;
            this [_baseLayer]          = null;
            this [_pose]               = null;
            this [_inputSources]       = null;
            this [_inputRay]           = null;
            this [_inputPoint]         = null;
         }
      });
   },
   getReferenceSpace ()
   {
      return this [_referenceSpace];
   },
   setReferenceSpace ()
   {
      if (!this [_baseReferenceSpace])
         return;

      const
         translation = new (external_X_ITE_X3D_Vector3_default()) (),
         rotation    = new (external_X_ITE_X3D_Rotation4_default()) ();

      this .getActiveViewpoint () ?.getViewMatrix () .get (translation, rotation)

      const offsetTransform = new XRRigidTransform (translation, rotation .getQuaternion ());

      this [_referenceSpace] = this [_baseReferenceSpace] .getOffsetReferenceSpace (offsetTransform);
   },
   setFrame (frame)
   {
      if (!frame)
         return;

      const emulator = !this .getCanvas () .parent () .is (this .getSurface ());

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
            projectionMatrix: new (external_X_ITE_X3D_Matrix4_default()) (),
            cameraSpaceMatrix: new (external_X_ITE_X3D_Matrix4_default()) (),
            viewMatrix: new (external_X_ITE_X3D_Matrix4_default()) (),
            matrix: new (external_X_ITE_X3D_Matrix4_default()) (),
            inverse: new (external_X_ITE_X3D_Matrix4_default()) (),
         };

         pv .projectionMatrix .assign (view .projectionMatrix);
         pv .cameraSpaceMatrix .assign (view .transform .matrix);
         pv .viewMatrix .assign (view .transform .inverse .matrix);
         pv .matrix .assign (pose .transform .matrix) .multRight (view .transform .inverse .matrix);
         pv .inverse .assign (pv .matrix) .inverse ();

         ++ v;
      }

      this .getFrameBuffers () .length = v;

      // WebXR Emulator or polyfill.
      if (emulator)
         this .getCanvas () .css (this .getXREmulatorCSS ());

      // Get target ray matrices from input sources.

      let r = 0;

      for (const inputSource of this .getSession () .inputSources)
      {
         const
            targetRaySpace = inputSource .targetRaySpace,
            targetRayPose  = frame .getPose (targetRaySpace, this [_referenceSpace]);

         if (!targetRayPose)
            continue;

         const is = this [_inputSources] [r] ??= {
            matrix: new (external_X_ITE_X3D_Matrix4_default()) (),
            inverse: new (external_X_ITE_X3D_Matrix4_default()) (),
            hit: this .getHit () .copy (),
         };

         is .matrix  .assign (targetRayPose .transform .matrix);
         is .inverse .assign (targetRayPose .transform .inverse .matrix);

         is .buttons = inputSource .gamepad ?.buttons,

         ++ r;
      }

      this [_inputSources] .length = r;

      // Trigger new frame.

      this .addBrowserEvent ();
   },
   finishedFrame: (function ()
   {
      const
         blue           = new (external_X_ITE_X3D_Color3_default()) (0.5, 0.75, 1),
         inputRayMatrix = new (external_X_ITE_X3D_Matrix4_default()) (),
         toVector       = new (external_X_ITE_X3D_Vector3_default()) (0, 0, -0.5),
         fromPoint      = new (external_X_ITE_X3D_Vector3_default()) (),
         toPoint        = new (external_X_ITE_X3D_Vector3_default()) (),
         hitRotation    = new (external_X_ITE_X3D_Rotation4_default()) (),
         hitSize        = 0.007,
         hitPressedSize = 0.005;

      return function ()
      {
         const
            pose     = this [_pose],
            viewport = this .getViewport () .getValue ();

         // Test for hit.

         for (const inputSource of this [_inputSources])
            this .touch (viewport [2] / 2, viewport [3] / 2, inputSource, inputSource .hit);

         // Draw input source rays.

         for (const [i, view] of pose .views .entries ())
         {
            const
               frameBuffer      = this .getFrameBuffers () [i],
               projectionMatrix = view .projectionMatrix,
               viewMatrix       = view .viewMatrix;

            for (const { matrix, buttons, hit } of this [_inputSources])
            {
               // Draw input ray.

               const
                  pressed = buttons ?.some (button => button .pressed),
                  color   = pressed ? blue : (external_X_ITE_X3D_Color3_default()).White;

               inputRayMatrix
                  .assign (matrix)
                  .multRight (viewMatrix);

               inputRayMatrix .multVecMatrix (fromPoint .assign ((external_X_ITE_X3D_Vector3_default()).Zero));
               inputRayMatrix .multVecMatrix (toPoint .assign (toVector));

               if (toPoint .z > fromPoint .z)
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

               const radius = (pressed ? hitPressedSize : hitSize);

               inputRayMatrix
                  .assign (matrix)
                  .multRight (viewMatrix)
                  .translate (hit .point)
                  .rotate (hitRotation .setFromToVec ((external_X_ITE_X3D_Vector3_default()).zAxis, hit .normal));

               this [_inputPoint] .display (radius, color, 0.3, inputRayMatrix, projectionMatrix, frameBuffer);
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