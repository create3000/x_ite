import DEVELOPMENT from "../DEVELOPMENT.js";

function MultiSampleFramebuffer ({ browser, x, y, width, height, samples, oit })
{
   const gl = browser .getContext ();

   this .browser = browser;
   this .context = gl;
   this .x       = x;
   this .y       = y;
   this .width   = width;
   this .height  = height;
   this .samples = samples;
   this .oit     = oit;

   // Create frame buffer.

   this .frameBuffer = gl .createFramebuffer ();

   gl .bindFramebuffer (gl .FRAMEBUFFER, this .frameBuffer);

   // Create color buffer.

   this .colorBuffer = gl .createRenderbuffer ();

   gl .bindRenderbuffer (gl .RENDERBUFFER, this .colorBuffer);

   if (samples)
      gl .renderbufferStorageMultisample (gl .RENDERBUFFER, samples, gl .RGBA8, width, height);
   else
      gl .renderbufferStorage (gl .RENDERBUFFER, gl .RGBA8, width, height);

   gl .framebufferRenderbuffer (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .RENDERBUFFER, this .colorBuffer);

   // Create depth buffer.

   this .depthBuffer = gl .createRenderbuffer ();

   gl .bindRenderbuffer (gl .RENDERBUFFER, this .depthBuffer);

   if (samples)
      gl .renderbufferStorageMultisample (gl .RENDERBUFFER, samples, gl .DEPTH_COMPONENT24, width, height);
   else
      gl .renderbufferStorage (gl .RENDERBUFFER, gl .DEPTH_COMPONENT24, width, height);

   gl .framebufferRenderbuffer (gl .FRAMEBUFFER, gl .DEPTH_ATTACHMENT, gl .RENDERBUFFER, this .depthBuffer);

   // Always check that our frame buffer is ok.

   if (gl .checkFramebufferStatus (gl .FRAMEBUFFER) !== gl .FRAMEBUFFER_COMPLETE)
      throw new Error ("Couldn't create frame buffer.");

   if (x || y)
   {
      // Create frame buffer.

      this .auxBuffer = gl .createFramebuffer ();

      gl .bindFramebuffer (gl .FRAMEBUFFER, this .auxBuffer);

      // Create color buffer.

      this .auxColorBuffer = gl .createRenderbuffer ();

      gl .bindRenderbuffer (gl .RENDERBUFFER, this .auxColorBuffer);
      gl .renderbufferStorage (gl .RENDERBUFFER, gl .RGBA8, width, height);
      gl .framebufferRenderbuffer (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .RENDERBUFFER, this .auxColorBuffer);

      // Always check that our frame buffer is ok.

      if (gl .checkFramebufferStatus (gl .FRAMEBUFFER) !== gl .FRAMEBUFFER_COMPLETE)
         throw new Error ("Couldn't create frame buffer.");
   }

   if (!oit)
      return;

   // Must use 16bit color buffer textures instead of 32bit, because there is an issue with iPhone.

   // Create oit frame buffer.

   this .oitFramebuffer = gl .createFramebuffer ();

   gl .bindFramebuffer (gl .FRAMEBUFFER, this .oitFramebuffer);

   // Set draw buffers.

   gl .drawBuffers ([
      gl .COLOR_ATTACHMENT0, // gl_FragData [0]
      gl .COLOR_ATTACHMENT1, // gl_FragData [1]
   ]);

   if (samples)
   {
      // Create accum and revealage buffer.

      this .accumRevealageBuffer = gl .createRenderbuffer ();

      gl .bindRenderbuffer (gl .RENDERBUFFER, this .accumRevealageBuffer);
      gl .renderbufferStorageMultisample (gl .RENDERBUFFER, samples, gl .RGBA16F, width, height);
      gl .framebufferRenderbuffer (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .RENDERBUFFER, this .accumRevealageBuffer);

      // Create alpha buffer.

      this .alphaBuffer = gl .createRenderbuffer ();

      gl .bindRenderbuffer (gl .RENDERBUFFER, this .alphaBuffer);
      gl .renderbufferStorageMultisample (gl .RENDERBUFFER, samples, gl .RGBA16F, width, height);
      gl .framebufferRenderbuffer (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT1, gl .RENDERBUFFER, this .alphaBuffer);

      // Add depth buffer.

      gl .framebufferRenderbuffer (gl .FRAMEBUFFER, gl .DEPTH_ATTACHMENT, gl .RENDERBUFFER, this .depthBuffer);

      // Create accum texture buffer.

      this .accumRevealageTextureBuffer = gl .createFramebuffer ();

      gl .bindFramebuffer (gl .FRAMEBUFFER, this .accumRevealageTextureBuffer);

      // Create accum texture.

      this .accumRevealageTexture = gl .createTexture ();

      gl .bindTexture (gl .TEXTURE_2D, this .accumRevealageTexture);

      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .NEAREST);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .NEAREST);

      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA16F, width, height, 0, gl .RGBA, gl .FLOAT, null);
      gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .TEXTURE_2D, this .accumRevealageTexture, 0);

      // Create alpha texture buffer.

      this .alphaTextureBuffer = gl .createFramebuffer ();

      gl .bindFramebuffer (gl .FRAMEBUFFER, this .alphaTextureBuffer);

      // Create alpha texture.

      this .alphaTexture = gl .createTexture ();

      gl .bindTexture (gl .TEXTURE_2D, this .alphaTexture);

      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .NEAREST);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .NEAREST);

      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA16F, width, height, 0, gl .RGBA, gl .FLOAT, null);
      gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .TEXTURE_2D, this .alphaTexture, 0);
   }
   else
   {
      // Create accum texture.

      this .accumRevealageTexture = gl .createTexture ();

      gl .bindTexture (gl .TEXTURE_2D, this .accumRevealageTexture);

      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .NEAREST);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .NEAREST);

      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA16F, width, height, 0, gl .RGBA, gl .FLOAT, null);
      gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .TEXTURE_2D, this .accumRevealageTexture, 0);

      // Create alpha texture.

      this .alphaTexture = gl .createTexture ();

      gl .bindTexture (gl .TEXTURE_2D, this .alphaTexture);

      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .NEAREST);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .NEAREST);

      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA16F, width, height, 0, gl .RGBA, gl .FLOAT, null);
      gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT1, gl .TEXTURE_2D, this .alphaTexture, 0);

      // Add depth buffer.

      gl .framebufferRenderbuffer (gl .FRAMEBUFFER, gl .DEPTH_ATTACHMENT, gl .RENDERBUFFER, this .depthBuffer);
   }

   // Always check that our frame buffer is ok.

   if (gl .checkFramebufferStatus (gl .FRAMEBUFFER) !== gl .FRAMEBUFFER_COMPLETE)
      throw new Error ("Couldn't create frame buffer.");

   // Get compose shader and texture units.

   this .shaderNode = browser .getOITComposeShader ();
   this .program    = this .shaderNode .getProgram ();

   gl .useProgram (this .program);

   const
      accumRevealageTextureUnit = gl .getUniformLocation (this .program, "x3d_AccumRevealageTexture"),
      alphaTextureUnit          = gl .getUniformLocation (this .program, "x3d_AlphaTexture");

   gl .uniform1i (accumRevealageTextureUnit, 0);
   gl .uniform1i (alphaTextureUnit,          1);
}

Object .assign (MultiSampleFramebuffer .prototype,
{
   getX ()
   {
      return this .x;
   },
   getY ()
   {
      return this .y;
   },
   getWidth ()
   {
      return this .width;
   },
   getHeight ()
   {
      return this .height;
   },
   getSamples ()
   {
      return this .samples;
   },
   getOIT ()
   {
      return this .oit;
   },
   bind ()
   {
      const { context: gl, frameBuffer } = this;

      gl .bindFramebuffer (gl .FRAMEBUFFER, frameBuffer);
   },
   clear ()
   {
      const { context: gl, frameBuffer, width, height } = this;

      gl .bindFramebuffer (gl .FRAMEBUFFER, frameBuffer);

      gl .viewport (0, 0, width, height);
      gl .scissor  (0, 0, width, height);
      gl .clearColor (0, 0, 0, 0);
      gl .clear (gl .COLOR_BUFFER_BIT);
   },
   bindTransparency ()
   {
      const { context: gl, oitFramebuffer } = this;

      gl .bindFramebuffer (gl .FRAMEBUFFER, oitFramebuffer);

      gl .clearColor (0, 0, 0, 1);
      gl .clear (gl .COLOR_BUFFER_BIT);
      gl .blendFuncSeparate (gl .ONE, gl .ONE, gl .ZERO, gl .ONE_MINUS_SRC_ALPHA);
   },
   compose ()
   {
      const { context: gl, browser, width, height, samples, program } = this;

      // TODO: Combining lights and lights with shadows, can cause feedback loop of texture.
      // TODO: VolumeRendering shader is not made for OIT.

      // Reset viewport before blit, otherwise only last layer size is used.
      gl .viewport (0, 0, width, height);
      gl .scissor  (0, 0, width, height);

      if (samples)
      {
         gl .bindFramebuffer (gl .READ_FRAMEBUFFER, this .oitFramebuffer);

         gl .readBuffer (gl .COLOR_ATTACHMENT0);
         gl .bindFramebuffer (gl .DRAW_FRAMEBUFFER, this .accumRevealageTextureBuffer);

         gl .blitFramebuffer (0, 0, width, height,
                              0, 0, width, height,
                              gl .COLOR_BUFFER_BIT, gl .LINEAR);

         gl .readBuffer (gl .COLOR_ATTACHMENT1);
         gl .bindFramebuffer (gl .DRAW_FRAMEBUFFER, this .alphaTextureBuffer);

         gl .blitFramebuffer (0, 0, width, height,
                              0, 0, width, height,
                              gl .COLOR_BUFFER_BIT, gl .LINEAR);
      }

      gl .useProgram (program);
      gl .activeTexture (gl .TEXTURE0 + 0);
      gl .bindTexture (gl .TEXTURE_2D, this .accumRevealageTexture);
      gl .activeTexture (gl .TEXTURE0 + 1);
      gl .bindTexture (gl .TEXTURE_2D, this .alphaTexture);

      gl .bindFramebuffer (gl .FRAMEBUFFER, this .frameBuffer);
      gl .disable (gl .DEPTH_TEST);
      gl .enable (gl .BLEND);
      gl .blendFunc (gl .ONE, gl .ONE_MINUS_SRC_ALPHA);
      gl .enable (gl .CULL_FACE);
      gl .frontFace (gl .CCW);
      gl .bindVertexArray (browser .getFullscreenVertexArrayObject ());
      gl .drawArrays (gl .TRIANGLES, 0, 6);
      gl .disable (gl .BLEND);
      gl .enable (gl .DEPTH_TEST);
   },
   blit ()
   {
      const { browser, context: gl, x, y, width, height, samples, frameBuffer, auxBuffer } = this;

      // Reset viewport before blit, otherwise only last layer size is used.
      gl .viewport (0, 0, x + width, y + height);
      gl .scissor  (0, 0, x + width, y + height);

      gl .bindFramebuffer (gl .READ_FRAMEBUFFER, frameBuffer);
      gl .bindFramebuffer (gl .DRAW_FRAMEBUFFER, auxBuffer ?? browser .getDefaultFramebuffer ());

      gl .blitFramebuffer (0, 0, width, height,
                           0, 0, width, height,
                           gl .COLOR_BUFFER_BIT, samples ? gl .LINEAR : gl .NEAREST);

      // // DEBUG start
      // if (DEVELOPMENT)
      // {
      //    const volumeScatterBuffer = browser .getVolumeScatterBuffer ?.();

      //    if (volumeScatterBuffer)
      //    {
      //       gl .bindFramebuffer (gl .READ_FRAMEBUFFER, volumeScatterBuffer .frameBuffer);
      //       gl .readBuffer (gl .COLOR_ATTACHMENT0);
      //       gl .bindFramebuffer (gl .DRAW_FRAMEBUFFER, browser .getDefaultFramebuffer ());

      //       gl .blitFramebuffer (0, 0, width, height,
      //                            0, 0, width / 4, height / 4,
      //                            gl .COLOR_BUFFER_BIT, gl .NEAREST);
      //    }
      // }
      // // DEBUG end

      if (!auxBuffer)
         return;

      gl .bindFramebuffer (gl .READ_FRAMEBUFFER, auxBuffer);
      gl .bindFramebuffer (gl .DRAW_FRAMEBUFFER, browser .getDefaultFramebuffer ());

      gl .blitFramebuffer (0, 0, width, height,
                           x, y, x + width, y + height,
                           gl .COLOR_BUFFER_BIT, gl .NEAREST);
   },
   dispose ()
   {
      const gl = this .context;

      gl .deleteFramebuffer (this .frameBuffer);
      gl .deleteRenderbuffer (this .colorBuffer);
      gl .deleteRenderbuffer (this .depthBuffer);

      gl .deleteFramebuffer (this .auxFramebuffer);
      gl .deleteRenderbuffer (this .auxColorBuffer);

      gl .deleteFramebuffer (this .oitFramebuffer);
      gl .deleteFramebuffer (this .accumRevealageTextureBuffer);
      gl .deleteFramebuffer (this .alphaTextureBuffer);
      gl .deleteRenderbuffer (this .accumRevealageBuffer);
      gl .deleteRenderbuffer (this .alphaBuffer);
      gl .deleteTexture (this .accumRevealageTexture);
      gl .deleteTexture (this .alphaTexture);
   },
});

export default MultiSampleFramebuffer;
