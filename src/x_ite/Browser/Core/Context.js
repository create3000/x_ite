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

import DEBUG from "../../DEBUG.js";

const extensions = [
   "ANGLE_instanced_arrays",
   "EXT_blend_minmax",
   "EXT_frag_depth",
   "EXT_shader_texture_lod",
   "EXT_texture_filter_anisotropic",
   "OES_element_index_uint",
   "OES_standard_derivatives",
   "OES_texture_float",
   "OES_texture_float_linear",
   "OES_texture_half_float",
   "OES_texture_half_float_linear",
   "OES_vertex_array_object",
   "WEBGL_compressed_texture_s3tc",
   //"WEBGL_debug_renderer_info",
   "WEBGL_debug_shaders",
   "WEBGL_depth_texture",
   "WEBGL_draw_buffers",
   "WEBGL_lose_context",

   "EXT_color_buffer_float",
   "EXT_color_buffer_half_float",
   "EXT_disjoint_timer_query",
   "EXT_disjoint_timer_query_webgl2",
   "EXT_sRGB",
   "WEBGL_color_buffer_float",
   "WEBGL_compressed_texture_astc",
   "WEBGL_compressed_texture_atc",
   "WEBGL_compressed_texture_etc",
   "WEBGL_compressed_texture_etc1",
   "WEBGL_compressed_texture_pvrtc",
   "WEBGL_compressed_texture_s3tc",
   "WEBGL_compressed_texture_s3tc_srgb",

   "EXT_float_blend",
   "OES_fbo_render_mipmap",
   "WEBGL_get_buffer_sub_data_async",
   "WEBGL_multiview",
   "WEBGL_security_sensitive_resources",
   "WEBGL_shared_resources",

   "EXT_clip_cull_distance",
   "WEBGL_debug",
   "WEBGL_dynamic_texture",
   "WEBGL_subarray_uploads",
   "WEBGL_texture_multisample",
   "WEBGL_texture_source_iframe",
   "WEBGL_video_texture",

   "EXT_texture_storage",
   "OES_depth24",
   "WEBGL_debug_shader_precision",
   "WEBGL_draw_elements_no_range_check",
   "WEBGL_subscribe_uniform",
   "WEBGL_texture_from_depth_video",
];

const Context =
{
   create: function (canvas, version, preserveDrawingBuffer)
   {
      const options = { preserveDrawingBuffer: preserveDrawingBuffer };

      let gl = null;

      if (version >= 2 && ! gl)
      {
         gl = canvas .getContext ("webgl2", { ... options, antialias: false });

         if (gl)
            gl .getVersion = function () { return 2; };
      }

      if (version >= 1 && ! gl)
      {
         gl = canvas .getContext ("webgl",              options) ||
              canvas .getContext ("experimental-webgl", options);

         if (gl)
         {
            gl .getVersion = function () { return 1; };

            {
               const ext = gl .getExtension ("OES_vertex_array_object");

               gl .bindVertexArray   =  ext .bindVertexArrayOES   .bind (ext);
               gl .createVertexArray =  ext .createVertexArrayOES .bind (ext);
               gl .deleteVertexArray =  ext .deleteVertexArrayOES .bind (ext);
               gl .isVertexArray     =  ext .isVertexArrayOES     .bind (ext);
            }
         }
      }

      if (! gl)
         throw new Error ("Couldn't create WebGL context.");

      // Feature detection:

      // If the aliased lineWidth ranges are both 1, gl .lineWidth is probably not possible,
      // thus we disable it completely to prevent webgl errors.

      const aliasedLineWidthRange = gl .getParameter (gl .ALIASED_LINE_WIDTH_RANGE);

      if (aliasedLineWidthRange [0] === 1 && aliasedLineWidthRange [1] === 1)
      {
         gl .lineWidth                     = Function .prototype;
         gl .HAS_FEATURE_TRANSFORMED_LINES = gl .getVersion () >= 2;

         if (DEBUG)
            console .info ("Lines are transformed if necessary to obtain thick lines.");
      }
      else
      {
         gl .HAS_FEATURE_TRANSFORMED_LINES = false;
      }

      gl .HAS_FEATURE_DEPTH_TEXTURE = gl .getVersion () >= 2 || !! gl .getExtension ("WEBGL_depth_texture");
      gl .HAS_FEATURE_FRAG_DEPTH    = gl .getVersion () >= 2 || !! gl .getExtension ("EXT_frag_depth");

      if (gl .getVersion () === 1)
      {
         const
            color_buffer_float = gl .getExtension ("WEBGL_color_buffer_float"),
            draw_buffers       = gl .getExtension ("WEBGL_draw_buffers");

         gl .RGBA32F               = color_buffer_float .RGBA32F_EXT;
         gl .MAX_COLOR_ATTACHMENTS = draw_buffers .MAX_COLOR_ATTACHMENTS_WEBGL;
         gl .drawBuffers           = draw_buffers .drawBuffersWEBGL .bind (draw_buffers);

         for (let i = 0, length = gl .getParameter(gl .MAX_COLOR_ATTACHMENTS); i < length; ++ i)
         {
            const COLOR_ATTACHMENTi = draw_buffers .COLOR_ATTACHMENT0_WEBGL + i;

            if (gl [`COLOR_ATTACHMENT${i}`] === undefined)
               gl [`COLOR_ATTACHMENT${i}`] = COLOR_ATTACHMENTi;
         }
      }

      // Load extensions.

      for (const extension of extensions)
         gl .getExtension (extension);

      // Async functions

      // Object .assign (gl, gl .getVersion () === 1
      // ? {
      //    readPixelsAsync: gl .readPixels,
      // }
      // : {
      //    clientWaitAsync: function (sync, flags, interval)
      //    {
      //       return new Promise ((resolve, reject) =>
      //       {
      //          const test = () =>
      //          {
      //             const result = this .clientWaitSync (sync, flags, 0);

      //             switch (result)
      //             {
      //                case this .WAIT_FAILED:
      //                {
      //                   reject ();
      //                   return;
      //                }
      //                case this .TIMEOUT_EXPIRED:
      //                {
      //                   setTimeout (test, interval);
      //                   return;
      //                }
      //                default:
      //                {
      //                   resolve ();
      //                   return;
      //                }
      //             }
      //          };

      //          test ();
      //       });
      //    },
      //    getBufferSubDataAsync: async function (target, buffer, srcByteOffset, dstBuffer, /* optional */ dstOffset, /* optional */ length)
      //    {
      //       const sync = this .fenceSync (this .SYNC_GPU_COMMANDS_COMPLETE, 0);

      //       this .flush ();

      //       await this .clientWaitAsync (sync, 0, 10);

      //       this .deleteSync (sync);

      //       this .bindBuffer (target, buffer);
      //       this .getBufferSubData (target, srcByteOffset, dstBuffer, dstOffset, length);
      //       this .bindBuffer (target, null);
      //    },
      //    readPixelsAsync: async function (x, y, w, h, format, type, dest, dstOffset)
      //    {
      //       const buffer = this .createBuffer ();

      //       this .bindBuffer (this .PIXEL_PACK_BUFFER, buffer);
      //       this .bufferData (this .PIXEL_PACK_BUFFER, dest .byteLength, this .STREAM_READ);
      //       this .readPixels (x, y, w, h, format, type, 0);
      //       this .bindBuffer (this .PIXEL_PACK_BUFFER, null);

      //       await this .getBufferSubDataAsync (this .PIXEL_PACK_BUFFER, buffer, 0, dest, dstOffset);

      //       this .deleteBuffer (buffer);
      //    },
      // });

      // Return context.

      return gl;
   },
}

export default Context;
