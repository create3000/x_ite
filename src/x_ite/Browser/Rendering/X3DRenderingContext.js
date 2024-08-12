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
import Matrix4                from "../../../standard/Math/Numbers/Matrix4.js";

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
   _referenceSpace     = Symbol (),
   _baseLayer          = Symbol (),
   _defaultFrameBuffer = Symbol (),
   _pose               = Symbol ();

function X3DRenderingContext ()
{
   this .addChildObjects (X3DConstants .outputOnly, "viewport", new Fields .MFInt32 (0, 0, 300, 150));

   this [_frameBuffers] = [ ];
   this [_depthShaders] = new Map ();
   this [_localObjects] = [ ]; // shader objects dumpster

   // XR support

   this .addXRSupport ();
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

      // Observe resize and parent changes of <canvas> and configure viewport.

      this [_observer] = new MutationObserver (() => this .setResizeTarget (this .getCanvas () .parent ()));
      this [_resizer]  = new ResizeObserver (() => this .reshape ());

      this .setResizeTarget (this .getCanvas () .parent ());

      // Observe fullscreen changes of <x3d-canvas>.

      $(document) .on ('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', () => this .onfullscreen ());
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
   getDepthShader (numClipPlanes, shapeNode, humanoidNode)
   {
      const geometryContext = shapeNode .getGeometryContext ();

      let key = "";

      key += numClipPlanes; // Could be more than 9.
      key += humanoidNode ?.getHumanoidKey () ?? "[]";
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
         ?? this .createDepthShader (key, numClipPlanes, shapeNode, humanoidNode);
   },
   createDepthShader (key, numClipPlanes, shapeNode, humanoidNode)
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

      if (humanoidNode)
      {
         options .push ("X3D_SKINNING");
         options .push (`X3D_NUM_JOINT_SETS ${humanoidNode .getNumJoints () / 4}`);
         options .push (`X3D_NUM_DISPLACEMENTS ${humanoidNode .getNumDisplacements ()}`);
      }

      const shaderNode = this .createShader ("Depth", "Depth", "Depth", options);

      this [_depthShaders] .set (key, shaderNode);

      return shaderNode;
   },
   setResizeTarget (element)
   {
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
            viewportWidth  = Math .max (width * contentScale, 1),
            viewportHeight = Math .max (height * contentScale, 1),
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
         width        = Math .max (canvas .width ()  * contentScale, 1),
         height       = Math .max (canvas .height () * contentScale, 1);

      this .addBrowserEvent ();

      canvas .prop ("width",  width);
      canvas .prop ("height", height);

      if (this [_frameBuffers] .length < 2)
         this .reshapeFrameBuffer (0, 0, 0, width, height);
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
   async addXRSupport ()
   {
      this [_session]            = window;
      this [_defaultFrameBuffer] = null;

      if (this .getContext () .getVersion () <= 1)
         return;

      if (!("xr" in navigator))
         return;

      const supported = await navigator .xr .isSessionSupported ("immersive-vr");

      if (!supported)
         return;

      $("<div></div>")
         .addClass ("x_ite-private-xr-button")
         .on ("mousedown", false)
         .on ("click", event => this .startXRSession (event))
         .appendTo (this .getSurface ());
   },
   async startXRSession (event)
   {
      event ?.preventDefault ();
      event ?.stopImmediatePropagation ();
      event ?.stopPropagation ();

      const
         gl             = this .getContext (),
         compatible     = await gl .makeXRCompatible (),
         session        = await navigator .xr .requestSession ("immersive-vr"),
         referenceSpace = await session .requestReferenceSpace ("local");

      // Must bind default framebuffer, to get xr emulator working.
      gl .bindFramebuffer (gl .FRAMEBUFFER, null);

      const baseLayer = new XRWebGLLayer (session, gl);

      session .updateRenderState ({ baseLayer });
      session .addEventListener ("end", () => this .stopXRSession ());

      this [_session]            = session;
      this [_referenceSpace]     = referenceSpace;
      this [_baseLayer]          = baseLayer;
      this [_defaultFrameBuffer] = baseLayer .framebuffer;

      this [_pose] = {
         projectionMatrix: new Matrix4 (),
         cameraSpaceMatrix: new Matrix4 (),
         viewMatrix: new Matrix4 (),
         views: [
            new Matrix4 (),
            new Matrix4 (),
         ],
      };

      this .getCanvas () .css ({ all: "unset", position: "fixed", width: "100vw", height: "100vh" });
      this .addBrowserEvent ();
   },
   stopXRSession ()
   {
      for (const frameBuffer of this [_frameBuffers])
         frameBuffer .dispose ();

      this [_frameBuffers] .length = 0;

      this [_session] .end ();

      this [_session]            = window;
      this [_referenceSpace]     = null;
      this [_baseLayer]          = null;
      this [_defaultFrameBuffer] = null;
      this [_pose]               = null;

      this .getCanvas () .removeAttr ("style");
      this .addBrowserEvent ();
      this .reshape (); // Maybe not needed, because a setResizeTarget comes later.
   },
   getSession ()
   {
      return this [_session];
   },
   getReferenceSpace ()
   {
      return this [_referenceSpace];
   },
   getDefaultFrameBuffer ()
   {
      return this [_defaultFrameBuffer];
   },
   setFrame (frame)
   {
      if (!frame)
         return;

      const pose = frame .getViewerPose (this [_referenceSpace]);

      this [_pose] .cameraSpaceMatrix .assign (pose .transform .matrix);
      this [_pose] .viewMatrix        .assign (pose .transform .inverse .matrix);

      // console .log (... pose .transform .matrix)

      for (const [i, view] of pose .views .entries ())
      {
         const { x, y, width, height } = this [_baseLayer] .getViewport (view);

         this .reshapeFrameBuffer (i, x, y, width, height);

         this [_pose] .projectionMatrix .assign (view .projectionMatrix);

         // this [_frameBuffers] [i] .projectionMatrix  = view .projectionMatrix;
         // this [_frameBuffers] [i] .viewMatrix        = view .transform .inverse .matrix;
         // this [_frameBuffers] [i] .cameraSpaceMatrix = view .transform .matrix;

         // console .log (i, ... view .projectionMatrix)
      }
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
   },
});

export default X3DRenderingContext;
