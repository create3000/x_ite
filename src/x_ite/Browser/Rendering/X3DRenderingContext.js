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

import Fields                 from "../../Fields.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import MultiSampleFrameBuffer from "../../Rendering/MultiSampleFrameBuffer.js";
import TextureBuffer          from "../../Rendering/TextureBuffer.js";
import { maxClipPlanes }      from "./RenderingConfiguration.js";
import Vector3                from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4              from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4                from "../../../standard/Math/Numbers/Matrix4.js";
import Lock                   from "../../../standard/Utility/Lock.js";

const
   _frameBuffers       = Symbol (),
   _transmissionBuffer = Symbol (),
   _observer           = Symbol (),
   _resizer            = Symbol (),
   _localObjects       = Symbol (),
   _fullscreenArray    = Symbol (),
   _fullscreenBuffer   = Symbol (),
   _composeShader      = Symbol (),
   _depthShaders       = Symbol ();

const
   _session            = Symbol (),
   _baseReferenceSpace = Symbol (),
   _referenceSpace     = Symbol (),
   _baseLayer          = Symbol (),
   _defaultFrameBuffer = Symbol (),
   _pose               = Symbol ();

// WebXR Emulator and polyfill:
const canvasCSS = {
   position: "fixed",
   top: "0px",
   left: "0px",
   width: "100vw",
   height: "100vh",
};

function X3DRenderingContext ()
{
   this .addChildObjects (X3DConstants .outputOnly, "viewport", new Fields .MFInt32 (0, 0, 300, 150));

   this [_frameBuffers] = [ ];
   this [_depthShaders] = new Map ();
   this [_localObjects] = [ ]; // shader objects dumpster

   // XR support

   this [_session]            = window;
   this [_defaultFrameBuffer] = null;

   this .updateXRButton ();
}

Object .assign (X3DRenderingContext .prototype,
{
   initialize ()
   {
      // Configure context.

      const gl = this .getContext ();

      gl .enable (gl .SCISSOR_TEST);
      gl .enable (gl .DEPTH_TEST);
      gl .depthFunc (gl .LEQUAL);
      gl .clearDepth (1);

      gl .blendFuncSeparate (gl .SRC_ALPHA, gl .ONE_MINUS_SRC_ALPHA, gl .ONE, gl .ONE_MINUS_SRC_ALPHA);
      gl .blendEquationSeparate (gl .FUNC_ADD, gl .FUNC_ADD);

      // Events

      this ._activeViewpoint .addInterest ("setReferenceSpace", this);

      // Observe resize and parent changes of <canvas> and configure viewport.

      this [_observer] = new MutationObserver (() => this .setResizeTarget (this .getCanvas () .parent ()));
      this [_resizer]  = new ResizeObserver (() => this .reshape ());

      this .setResizeTarget (this .getCanvas () .parent ());

      $(window) .on (`orientationchange.X3DRenderingContext-${this .getInstanceId ()}`, () => this .reshape ());

      // Observe fullscreen changes of <x3d-canvas>.

      $(document) .on ([
         "webkitfullscreenchange",
         "mozfullscreenchange",
         "fullscreenchange",
         "MSFullscreenChange",
      ]
      .map (event => `${event}.X3DRenderingContext-${this .getInstanceId ()}`)
      .join (" "), () => this .onfullscreen ());
   },
   getRenderer ()
   {
      const gl = this .getContext ();

      if (!navigator .userAgent .match (/Firefox/))
      {
         const dbgRenderInfo = gl .getExtension ("WEBGL_debug_renderer_info");

         if (dbgRenderInfo)
            return gl .getParameter (dbgRenderInfo .UNMASKED_RENDERER_WEBGL);
      }

      return gl .getParameter (gl .RENDERER);
   },
   getVendor ()
   {
      const gl = this .getContext ();

      if (!navigator .userAgent .match (/Firefox/))
      {
         const dbgRenderInfo = gl .getExtension ("WEBGL_debug_renderer_info");

         if (dbgRenderInfo)
            return gl .getParameter (dbgRenderInfo .UNMASKED_VENDOR_WEBGL);
      }

      return gl .getParameter (gl .VENDOR);
   },
   getWebGLVersion ()
   {
      const gl = this .getContext ();

      return gl .getParameter (gl .VERSION);
   },
   getMaxSamples ()
   {
      const gl = this .getContext ();

      return gl .getVersion () > 1 ? gl .getParameter (gl .MAX_SAMPLES) : 0;
   },
   getMaxClipPlanes ()
   {
      return maxClipPlanes;
   },
   getDepthSize ()
   {
      const gl = this .getContext ();

      return gl .getParameter (gl .DEPTH_BITS);
   },
   getColorDepth ()
   {
      const gl = this .getContext ();

      return (gl .getParameter (gl .RED_BITS) +
              gl .getParameter (gl .BLUE_BITS) +
              gl .getParameter (gl .GREEN_BITS) +
              gl .getParameter (gl .ALPHA_BITS));
   },
   getViewport ()
   {
      return this ._viewport;
   },
   getLocalObjects ()
   {
      return this [_localObjects];
   },
   getFrameBuffers ()
   {
      return this [_frameBuffers];
   },
   getTransmissionBuffer ()
   {
      this [_transmissionBuffer] = new TextureBuffer (this,
         this ._viewport [2],
         this ._viewport [3],
         false,
         true);

      this .getTransmissionBuffer = function () { return this [_transmissionBuffer]; };

      Object .defineProperty (this, "getTransmissionBuffer", { enumerable: false });

      return this [_transmissionBuffer];
   },
   getFullscreenVertexArrayObject ()
   {
      // Quad for fullscreen rendering.

      const gl = this .getContext ();

      this [_fullscreenArray]  = gl .createVertexArray ();
      this [_fullscreenBuffer] = gl .createBuffer ();

      gl .bindVertexArray (this [_fullscreenArray]);
      gl .bindBuffer (gl .ARRAY_BUFFER, this [_fullscreenBuffer]);
      gl .bufferData (gl .ARRAY_BUFFER, new Float32Array ([-1, 1, -1, -1, 1, -1, -1, 1, 1, -1, 1, 1]), gl .STATIC_DRAW);
      gl .enableVertexAttribArray (0);
      gl .vertexAttribPointer (0, 2, gl .FLOAT, false, 0, 0);

      this .getFullscreenVertexArrayObject = function () { return this [_fullscreenArray]; };

      Object .defineProperty (this, "getFullscreenVertexArrayObject", { enumerable: false });

      return this [_fullscreenArray];
   },
   getOITComposeShader ()
   {
      if (this [_composeShader])
         return this [_composeShader];

      return this [_composeShader] = this .createShader ("OITCompose", "FullScreen", "OITCompose");
   },
   getDepthShader (numClipPlanes, shapeNode, hAnimNode)
   {
      const geometryContext = shapeNode .getGeometryContext ();

      let key = "";

      key += numClipPlanes; // Could be more than 9.
      key += hAnimNode ?.getHAnimKey () ?? "[]";
      key += shapeNode .getShapeKey ();
      key += geometryContext .geometryType;

      if (geometryContext .geometryType >= 2)
      {
         key += "0.0.0";
      }
      else
      {
         const appearanceNode  = shapeNode .getAppearance ();

         key += appearanceNode .getStyleProperties (geometryContext .geometryType) ? 1 : 0;
         key += ".";
         key += appearanceNode .getTextureBits () .toString (16); // Textures for point and line.
         key += ".";
         key += appearanceNode .getMaterial () .getTextureBits () .toString (16); // Textures for point and line.
      }

      return this [_depthShaders] .get (key)
         ?? this .createDepthShader (key, numClipPlanes, shapeNode, hAnimNode);
   },
   createDepthShader (key, numClipPlanes, shapeNode, hAnimNode)
   {
      const
         appearanceNode  = shapeNode .getAppearance (),
         geometryContext = shapeNode .getGeometryContext (),
         options         = [ ];

      if (numClipPlanes)
      {
         options .push ("X3D_CLIP_PLANES");
         options .push ("X3D_NUM_CLIP_PLANES " + numClipPlanes);
      }

      if (shapeNode .getShapeKey () > 0)
         options .push ("X3D_INSTANCING");

      options .push (`X3D_GEOMETRY_${geometryContext .geometryType}D`);

      if (appearanceNode .getStyleProperties (geometryContext .geometryType))
         options .push ("X3D_STYLE_PROPERTIES");

      if (hAnimNode)
      {
         options .push ("X3D_SKINNING");
         options .push (`X3D_NUM_JOINT_SETS ${hAnimNode .getNumJoints () / 4}`);
         options .push (`X3D_NUM_DISPLACEMENTS ${hAnimNode .getNumDisplacements ()}`);
      }

      const shaderNode = this .createShader ("Depth", "Depth", "Depth", options);

      this [_depthShaders] .set (key, shaderNode);

      return shaderNode;
   },
   setResizeTarget (element)
   {
      if (!element .length)
      {
         // WebXR polyfill: parent can be null.
         this .stopXRSession ();
         this .getCanvas () .prependTo (this .getSurface ());
         this .setResizeTarget (this .getSurface ());
         return;
      }

      if (element .is (this .getSurface ()))
         this .getCanvas () .removeAttr ("style");
      else // WebXR Emulator or polyfill.
         this .getCanvas () .css (canvasCSS);

      this [_observer] .disconnect ();
      this [_observer] .observe (element [0], { childList: true });

      this [_resizer] .disconnect ();
      this [_resizer] .observe (element [0]);

      this .reshape ();
   },
   resize (width, height)
   {
      return new Promise (resolve =>
      {
         const
            contentScale   = this .getRenderingProperty ("ContentScale"),
            viewportWidth  = Math .max (width * contentScale, 1)|0,
            viewportHeight = Math .max (height * contentScale, 1)|0,
            key            = Symbol ();

         const test = () =>
         {
            if (this ._viewport [2] !== viewportWidth)
               return;

            if (this ._viewport [3] !== viewportHeight)
               return;

            this ._viewport .removeFieldCallback (key);

            resolve ();
         }

         this .getElement () .css ({ "width": `${width}px`, "height": `${height}px` });

         this ._viewport .addFieldCallback (key, test);

         test ();
      });
   },
   reshape ()
   {
      const
         canvas       = this .getCanvas (),
         contentScale = this .getRenderingProperty ("ContentScale"),
         width        = Math .max (canvas .parent () .width ()  * contentScale, 1)|0,
         height       = Math .max (canvas .parent () .height () * contentScale, 1)|0;

      canvas
         .prop ("width",  width)
         .prop ("height", height);

      if (this [_frameBuffers] .length < 2)
         this .reshapeFrameBuffer (0, 0, 0, width, height);

      this .addBrowserEvent ();
   },
   reshapeFrameBuffer (i, x, y, width, height)
   {
      const
         samples     = this .getRenderingProperty ("Multisampling"),
         oit         = this .getBrowserOption ("OrderIndependentTransparency"),
         frameBuffer = this [_frameBuffers] [i];

      if (frameBuffer &&
          x       === frameBuffer .getX () &&
          y       === frameBuffer .getY () &&
          width   === frameBuffer .getWidth () &&
          height  === frameBuffer .getHeight () &&
          samples === frameBuffer .getSamples () &&
          oit     === frameBuffer .getOIT ())
      {
         return;
      }

      this ._viewport [2] = width;
      this ._viewport [3] = height;

      frameBuffer ?.dispose ();

      this [_frameBuffers] [i] = new MultiSampleFrameBuffer (this, x, y, width, height, samples, oit);

      this .reshapeTransmissionBuffer (width, height);
   },
   reshapeTransmissionBuffer (width, height)
   {
      if (!this [_transmissionBuffer])
         return;

      if (width  === this [_transmissionBuffer] .getWidth () &&
          height === this [_transmissionBuffer] .getHeight ())
      {
         return;
      }

      this [_transmissionBuffer] .dispose ();
      this [_transmissionBuffer] = new TextureBuffer (this, width, height, false, true);
   },
   onfullscreen ()
   {
      const element = this .getElement ();

      if (element .fullScreen ())
         element .addClass ("x_ite-fullscreen");
      else
         element .removeClass ("x_ite-fullscreen");
   },
   async checkXRSupport ()
   {
      if (this .getContext () .getVersion () <= 1)
         return false;

      if (!("xr" in navigator))
         return false;

      const mode = this .getBrowserOption ("XRSessionMode") .toLowerCase () .replaceAll ("_", "-");

      if (!mode .match (/^(?:immersive-vr|immersive-ar)$/))
         return false;

      return await $.try (() => navigator .xr .isSessionSupported (mode)) ?? false;
   },
   updateXRButton ()
   {
      return Lock .acquire (`X3DRenderingContext.updateXRButton-${this .getId ()}`, async () =>
      {
         this .getSurface () .children (".x_ite-private-xr-button") .remove ();

         if (!this .getBrowserOption ("XRButton"))
            return;

         if (!await this .checkXRSupport ())
            return;

         $("<div></div>")
            .attr ("part", "xr-button")
            .addClass ("x_ite-private-xr-button")
            .on ("mousedown touchstart", false)
            .on ("mouseup touchend", event => this .startXRSession (event))
            .appendTo (this .getSurface ());
      });
   },
   startXRSession (event)
   {
      event ?.preventDefault ();
      event ?.stopImmediatePropagation ();
      event ?.stopPropagation ();

      return Lock .acquire (`X3DRenderingContext.session-${this .getId ()}`, async () =>
      {
         if (!await this .checkXRSupport ())
            return;

         if (this [_session] !== window)
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

         this .endEvents () .addInterest ("endFrame", this);

         session .updateRenderState ({ baseLayer });
         session .addEventListener ("end", () => this .stopXRSession ());

         this [_session]            = session;
         this [_baseReferenceSpace] = referenceSpace;
         this [_baseLayer]          = baseLayer;
         this [_defaultFrameBuffer] = baseLayer .framebuffer;

         this [_pose] = {
            cameraSpaceMatrix: new Matrix4 (),
            viewMatrix: new Matrix4 (),
            views: [ ],
         };

         this .setReferenceSpace ();
         this .reshape ();
      });
   },
   stopXRSession ()
   {
      return Lock .acquire (`X3DRenderingContext.session-${this .getId ()}`, async () =>
      {
         if (this [_session] === window)
            return;

         try
         {
            await this [_session] .end ();
         }
         catch
         { }
         finally
         {
            this .endEvents () .removeInterest ("endFrame", this);

            for (const frameBuffer of this [_frameBuffers])
               frameBuffer .dispose ();

            this [_frameBuffers]       = [ ];
            this [_session]            = window;
            this [_baseReferenceSpace] = null;
            this [_referenceSpace]     = null;
            this [_baseLayer]          = null;
            this [_defaultFrameBuffer] = null;
            this [_pose]               = null;

            this .reshape ();
         }
      });
   },
   getSession ()
   {
      return this [_session];
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
         translation = new Vector3 (),
         rotation    = new Rotation4 ();

      this .getActiveViewpoint () ?.getViewMatrix () .get (translation, rotation)

      const offsetTransform = new XRRigidTransform (translation, rotation .getQuaternion ());

      this [_referenceSpace] = this [_baseReferenceSpace] .getOffsetReferenceSpace (offsetTransform);
   },
   getDefaultFrameBuffer ()
   {
      return this [_defaultFrameBuffer];
   },
   setFrame (frame)
   {
      if (!frame)
         return;

      const
         pose     = frame .getViewerPose (this [_referenceSpace]),
         numViews = pose .views .length;

      this [_pose] .cameraSpaceMatrix .assign (pose .transform .matrix);
      this [_pose] .viewMatrix        .assign (pose .transform .inverse .matrix);

      let v = 0;

      for (let i = 0; i < numViews; ++ i)
      {
         const
            view                    = pose .views [i],
            { x, y, width, height } = this [_baseLayer] .getViewport (view);

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

      this [_frameBuffers] .length = v;

      // WebXR Emulator or polyfill.
      if (!this .getCanvas () .parent () .is (this .getSurface ()))
         this .getCanvas () .css (canvasCSS);

      this .addBrowserEvent ();
   },
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
   dispose ()
   {
      this [_session] = window;

      this [_observer] .disconnect ();
      this [_resizer]  .disconnect ();

      $(window) .off (`.X3DRenderingContext-${this .getInstanceId ()}`);
      $(document) .off (`.X3DRenderingContext-${this .getInstanceId ()}`);
   },
});

export default X3DRenderingContext;
