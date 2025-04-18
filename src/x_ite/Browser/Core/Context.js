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

import MOBILE      from "../../MOBILE.js";
import DEVELOPMENT from "../../DEVELOPMENT.js";

const Context =
{
   excludes: new Set ([
      "WEBGL_debug_renderer_info",
      "WEBGL_polygon_mode",
   ]),
   create (canvas, version, preserveDrawingBuffer)
   {
      const options = { preserveDrawingBuffer };

      let gl = null;

      if (version >= 2 && !gl)
      {
         gl = canvas .getContext ("webgl2", { ... options, antialias: false });

         if (gl)
            gl .getVersion = () => 2;
      }

      if (version >= 1 && !gl)
      {
         gl = canvas .getContext ("webgl",              options) ||
              canvas .getContext ("experimental-webgl", options);

         if (gl)
         {
            gl .getVersion = () => 1;

            {
               const ext = gl .getExtension ("OES_vertex_array_object");

               gl .bindVertexArray   = ext .bindVertexArrayOES   .bind (ext);
               gl .createVertexArray = ext .createVertexArrayOES .bind (ext);
               gl .deleteVertexArray = ext .deleteVertexArrayOES .bind (ext);
               gl .isVertexArray     = ext .isVertexArrayOES     .bind (ext);
            }

            {
               const ext = gl .getExtension ("ANGLE_instanced_arrays");

               gl .VERTEX_ATTRIB_ARRAY_DIVISOR = ext .VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE;

               gl .vertexAttribDivisor   = ext .vertexAttribDivisorANGLE   .bind (ext);
               gl .drawArraysInstanced   = ext .drawArraysInstancedANGLE   .bind (ext);
               gl .drawElementsInstanced = ext .drawElementsInstancedANGLE .bind (ext);
            }

            {
               const ext = gl .getExtension ("WEBGL_color_buffer_float");

               gl .RGBA32F = ext .RGBA32F_EXT;
            }

            {
               const ext = gl .getExtension ("WEBGL_draw_buffers");

               gl .MAX_COLOR_ATTACHMENTS = ext .MAX_COLOR_ATTACHMENTS_WEBGL;
               gl .drawBuffers           = ext .drawBuffersWEBGL .bind (ext);

               for (let i = 0, length = gl .getParameter(gl .MAX_COLOR_ATTACHMENTS); i < length; ++ i)
               {
                  const COLOR_ATTACHMENTi = ext .COLOR_ATTACHMENT0_WEBGL + i;

                  if (gl [`COLOR_ATTACHMENT${i}`] === undefined)
                     gl [`COLOR_ATTACHMENT${i}`] = COLOR_ATTACHMENTi;
               }
            }
         }
      }

      if (!gl)
         throw new Error ("Couldn't create WebGL context.");

      // Load extensions.

      for (const extension of gl .getSupportedExtensions () .filter (extension => !this .excludes .has (extension)))
         gl .getExtension (extension);

      // Feature detection:

      // If the aliased lineWidth ranges are both 1, gl .lineWidth is probably not possible,
      // thus we disable it completely to prevent webgl errors.

      const aliasedLineWidthRange = gl .getParameter (gl .ALIASED_LINE_WIDTH_RANGE);

      if (aliasedLineWidthRange [0] === 1 && aliasedLineWidthRange [1] === 1)
      {
         gl .lineWidth                     = Function .prototype;
         gl .HAS_FEATURE_TRANSFORMED_LINES = gl .getVersion () >= 2;

         if (DEVELOPMENT)
            console .info ("Lines are transformed if necessary to obtain thick lines.");
      }
      else
      {
         gl .HAS_FEATURE_TRANSFORMED_LINES = false;
      }

      gl .HAS_FEATURE_DEPTH_TEXTURE = gl .getVersion () >= 2 || !! gl .getExtension ("WEBGL_depth_texture");
      gl .HAS_FEATURE_FRAG_DEPTH    = gl .getVersion () >= 2 || !! gl .getExtension ("EXT_frag_depth");

      if (MOBILE)
      {
         const ext = gl .getExtension ("EXT_color_buffer_half_float");

         // Use defineProperty to overwrite property.
         Object .defineProperty (gl, "RGBA32F",
         {
            value: gl .getVersion () === 1 ? ext .RGBA16F_EXT : gl .RGBA16F,
            enumerable: true,
         });
      }

      return gl;
   },
}

export default Context;
