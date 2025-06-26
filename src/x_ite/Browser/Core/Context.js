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

      gl .HAS_FEATURE_DEPTH_TEXTURE = gl .getVersion () >= 2 || !! gl .getExtension ("WEBGL_depth_texture");
      gl .HAS_FEATURE_FRAG_DEPTH    = gl .getVersion () >= 2 || !! gl .getExtension ("EXT_frag_depth");

      if (MOBILE)
      {
         // At least on iOS and Samsung Galaxy, float 32 textures are not supported.
         // We use half float textures instead.

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
