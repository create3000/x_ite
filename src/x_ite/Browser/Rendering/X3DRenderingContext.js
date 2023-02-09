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
import MultiSampleFrameBuffer from "../../Rendering/MultiSampleFrameBuffer.js";

const
   _localObjects = Symbol (),
   _depthShaders = Symbol (),
   _resizer      = Symbol (),
   _frameBuffer  = Symbol ();

function X3DRenderingContext ()
{
   this .addChildObjects ("viewport", new Fields .MFFloat (0, 0, 300, 150));

   this [_localObjects] = [ ]; // shader objects dumpster
   this [_depthShaders] = new Map ();
   this [_frameBuffer]  = new MultiSampleFrameBuffer (this, 300, 150, 4);
}

X3DRenderingContext .prototype =
{
   initialize: function ()
   {
      // Configure context.

      const gl = this .getContext ();

      gl .enable (gl .SCISSOR_TEST);
      gl .depthFunc (gl .LEQUAL);
      gl .clearDepth (1);

      gl .blendFuncSeparate (gl .SRC_ALPHA, gl .ONE_MINUS_SRC_ALPHA, gl .ONE, gl .ONE_MINUS_SRC_ALPHA);
      gl .blendEquationSeparate (gl .FUNC_ADD, gl .FUNC_ADD);

      // Configure viewport.

      $(document) .on ('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', this .onfullscreen .bind (this));

      //https://github.com/sdecima/javascript-detect-element-resize
      this [_resizer] = new ResizeSensor (this .getSurface (), this .reshape .bind (this));

		this .getSurface () .css ("position", ""); // Reset position, set from ResizeSensor.

      this .reshape ();
   },
   getRenderer: function ()
   {
      const gl = this .getContext ();

      if (! navigator .userAgent .match (/Firefox/))
      {
         const dbgRenderInfo = gl .getExtension ("WEBGL_debug_renderer_info");

         if (dbgRenderInfo)
            return gl .getParameter (dbgRenderInfo .UNMASKED_RENDERER_WEBGL);
      }

      return gl .getParameter (gl .RENDERER);
   },
   getVendor: function ()
   {
      const gl = this .getContext ();

      if (! navigator .userAgent .match (/Firefox/))
      {
         const dbgRenderInfo = gl .getExtension ("WEBGL_debug_renderer_info");

         if (dbgRenderInfo)
            return gl .getParameter (dbgRenderInfo .UNMASKED_VENDOR_WEBGL);
      }

      return gl .getParameter (gl .VENDOR);
   },
   getWebGLVersion: function ()
   {
      const gl = this .getContext ();

      return gl .getParameter (gl .VERSION);
   },
   getAntialiased: function ()
   {
      const gl = this .getContext ();

      return gl .getParameter (gl .SAMPLES) > 0 || (gl .getVersion () > 1 && this .getRenderingProperty ("Multisampling") > 0);
   },
   getMaxSamples: function ()
   {
      const gl = this .getContext ();

      return gl .getVersion () > 1 ? gl .getParameter (gl .MAX_SAMPLES) : 0;
   },
   getMaxClipPlanes: function ()
   {
      return 6;
   },
   getDepthSize: function ()
   {
      const gl = this .getContext ();

      return gl .getParameter (gl .DEPTH_BITS);
   },
   getColorDepth: function ()
   {
      const gl = this .getContext ();

      return (gl .getParameter (gl .RED_BITS) +
              gl .getParameter (gl .BLUE_BITS) +
              gl .getParameter (gl .GREEN_BITS) +
              gl .getParameter (gl .ALPHA_BITS));
   },
   getViewport: function ()
   {
      return this ._viewport;
   },
   getLocalObjects: function ()
   {
      return this [_localObjects];
   },
   getFrameBuffer: function ()
   {
      return this [_frameBuffer];
   },
   getDepthShader: function (numClipPlanes, shapeNode)
   {
      const
         appearanceNode  = shapeNode .getAppearance (),
         geometryContext = shapeNode .getGeometryContext ();

      let key = "";

      key += numClipPlanes;
      key += shapeNode .getShapeKey ();
      key += appearanceNode .getStyleProperties (geometryContext .geometryType) ? 1 : 0;
      key += geometryContext .geometryType;

      return this [_depthShaders] .get (key) || this .createDepthShader (key, numClipPlanes, shapeNode);
   },
   createDepthShader: function (key, numClipPlanes, shapeNode)
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
         options .push ("X3D_PARTICLE_SYSTEM");

      options .push (`X3D_GEOMETRY_${geometryContext .geometryType}D`);

      if (appearanceNode .getStyleProperties (geometryContext .geometryType))
         options .push ("X3D_STYLE_PROPERTIES");

      const shaderNode = this .createShader ("DepthShader", "Depth", "Depth", options);

      this [_depthShaders] .set (key, shaderNode);

      return shaderNode;
   },
   reshape: function ()
   {
      const
         $canvas      = this .getCanvas (),
         contentScale = this .getRenderingProperty ("ContentScale"),
         samples      = this .getRenderingProperty ("Multisampling"),
         width        = $canvas .width () * contentScale,
         height       = $canvas .height () * contentScale,
         canvas       = $canvas [0];

      canvas .width  = width;
      canvas .height = height;

      this ._viewport [2] = width;
      this ._viewport [3] = height;

      if (width   !== this [_frameBuffer] .getWidth ()  ||
          height  !== this [_frameBuffer] .getHeight () ||
          samples !== this [_frameBuffer] .getSamples ())
      {
         this [_frameBuffer] .dispose ();
         this [_frameBuffer] = new MultiSampleFrameBuffer (this, width, height, samples);
      }

      this .addBrowserEvent ();
   },
   onfullscreen: function ()
   {
      const element = this .getElement ();

      if (element .fullScreen ())
         element .addClass ("x_ite-fullscreen");
      else
         element .removeClass ("x_ite-fullscreen");
   },
};

export default X3DRenderingContext;
