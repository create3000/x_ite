import ViewVolume from "../../standard/Math/Geometry/ViewVolume.js";
import Vector3    from "../../standard/Math/Numbers/Vector3.js";
import Matrix4    from "../../standard/Math/Numbers/Matrix4.js";

function TextureBuffer ({ browser, width, height, float = false, mipMaps = false, colorTextures = 1 })
{
   const gl = browser .getContext ();

   this .context = gl;
   this .width   = width;
   this .height  = height;

   Object .defineProperty (this, "array",
   {
      get ()
      {
         const value = float ? new Float32Array (width * height * 4) : new Uint8Array (width * height * 4);

         Object .defineProperty (this, "array", { value: value });

         return value;
      },
      configurable: true,
   });

   // Get current frame buffer.

   const currentFrameBuffer = gl .getParameter (gl .FRAMEBUFFER_BINDING);

   // Create frame buffer.

   this .frameBuffer = gl .createFramebuffer ();

   gl .bindFramebuffer (gl .FRAMEBUFFER, this .frameBuffer);

   // Set draw buffers.

   gl .drawBuffers (Array .from ({ length: colorTextures }, (_, i) => gl .COLOR_ATTACHMENT0 + i));

   // Create color textures.

   this .colorTextures = [ ];

   for (let i = 0; i < colorTextures; ++ i)
   {
      this .colorTextures [i] = gl .createTexture ();

      gl .bindTexture (gl .TEXTURE_2D, this .colorTextures [i]);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S, gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T, gl .CLAMP_TO_EDGE);

      if (mipMaps)
      {
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .LINEAR_MIPMAP_LINEAR);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .LINEAR);
      }
      else
      {
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .NEAREST);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
      }

      if (float)
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .getVersion () > 1 ? gl .RGBA32F : gl .RGBA, width, height, 0, gl .RGBA, gl .FLOAT, null);
      else
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA, width, height, 0, gl .RGBA, gl .UNSIGNED_BYTE, null);

      gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0 + i, gl .TEXTURE_2D, this .colorTextures [i], 0);
   }

   // Create depth buffer.

   if (gl .HAS_FEATURE_DEPTH_TEXTURE)
   {
      this .depthTexture = gl .createTexture ();

      gl .bindTexture (gl .TEXTURE_2D, this .depthTexture);

      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .NEAREST);

      const internalFormat = gl .getVersion () >= 2 ? gl .DEPTH_COMPONENT24 : gl .DEPTH_COMPONENT;

      gl .texImage2D (gl .TEXTURE_2D, 0, internalFormat, width, height, 0, gl .DEPTH_COMPONENT, gl .UNSIGNED_INT, null);
      gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .DEPTH_ATTACHMENT, gl .TEXTURE_2D, this .depthTexture, 0);
   }
   else
   {
      this .depthBuffer = gl .createRenderbuffer ();

      gl .bindRenderbuffer (gl .RENDERBUFFER, this .depthBuffer);
      gl .renderbufferStorage (gl .RENDERBUFFER, gl .DEPTH_COMPONENT16, width, height);
      gl .framebufferRenderbuffer (gl .FRAMEBUFFER, gl .DEPTH_ATTACHMENT, gl .RENDERBUFFER, this .depthBuffer);
   }

   const status = gl .checkFramebufferStatus (gl .FRAMEBUFFER) === gl .FRAMEBUFFER_COMPLETE;

   // Restore previous frame buffer.

   gl .bindFramebuffer (gl .FRAMEBUFFER, currentFrameBuffer);

   // Always check that our framebuffer is ok.

   if (!status)
      throw new Error ("Couldn't create frame buffer.");
}

Object .assign (TextureBuffer .prototype,
{
   getOIT ()
   {
      return false;
   },
   getWidth ()
   {
      return this .width;
   },
   getHeight ()
   {
      return this .height;
   },
   getColorTexture (i = 0)
   {
      return this .colorTextures [i];
   },
   getDepthTexture ()
   {
      return this .depthTexture;
   },
   readPixels ()
   {
      const { context: gl, array, width, height } = this;

      gl .readPixels (0, 0, width, height, gl .RGBA, gl .UNSIGNED_BYTE, array);

      return array;
   },
   readDepth: (() =>
   {
      const
         invProjectionMatrix = new Matrix4 (),
         point               = new Vector3 ();

      return function (projectionMatrix, viewport)
      {
         const { context: gl, array, width, height } = this;

         gl .readPixels (0, 0, width, height, gl .RGBA, gl .FLOAT, array);

         let
            winX = 0,
            winY = 0,
            winZ = Number .POSITIVE_INFINITY;

         for (let wy = 0, i = 0; wy < height; ++ wy)
         {
            for (let wx = 0; wx < width; ++ wx, i += 4)
            {
               const wz = array [i];

               if (wz < winZ)
               {
                  winX = wx;
                  winY = wy;
                  winZ = wz;
               }
            }
         }

         invProjectionMatrix .assign (projectionMatrix) .inverse ();

         ViewVolume .unProjectPointMatrix (winX, winY, winZ, invProjectionMatrix, viewport, point);

         return point .z;
      };
   })(),
   bind ()
   {
      const gl = this .context;

      gl .bindFramebuffer (gl .FRAMEBUFFER, this .frameBuffer);
   },
   dispose ()
   {
      const gl = this .context;

      gl .deleteFramebuffer (this .frameBuffer);

      for (const colorTexture of this .colorTextures)
         gl .deleteTexture (colorTexture);

      if (gl .HAS_FEATURE_DEPTH_TEXTURE)
         gl .deleteTexture (this .depthTexture);
      else
         gl .deleteRenderbuffer (this .depthBuffer);
    },
});

for (const key of Object .keys (TextureBuffer .prototype))
   Object .defineProperty (TextureBuffer .prototype, key, { enumerable: false });

export default TextureBuffer;
