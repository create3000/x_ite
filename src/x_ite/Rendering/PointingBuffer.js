function PointingBuffer ({ browser })
{
   const gl = browser .getContext ();

   this .browser = browser;
   this .context = gl;
   this .array   = new Float32Array (4 * 3);

   // Get current frame buffer.

   const currentFrameBuffer = gl .getParameter (gl .FRAMEBUFFER_BINDING);

   // Create frame buffer.

   this .frameBuffer = gl .createFramebuffer ();

   // Create color texture.

   this .colorTextures = [ ];

   for (let i = 0; i < 3; ++ i)
   {
      this .colorTextures [i] = gl .createTexture ();

      gl .bindTexture (gl .TEXTURE_2D, this .colorTextures [i]);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .NEAREST);
      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, 1, 1, 0, gl .RGBA, gl .FLOAT, null);

      gl .bindFramebuffer (gl .FRAMEBUFFER, this .frameBuffer);
      gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0 + i, gl .TEXTURE_2D, this .colorTextures [i], 0);
   }

   gl .bindFramebuffer (gl .FRAMEBUFFER, this .frameBuffer);

   gl .drawBuffers ([
      gl .COLOR_ATTACHMENT0, // gl_FragData [0]
      gl .COLOR_ATTACHMENT1, // gl_FragData [1]
      gl .COLOR_ATTACHMENT2, // gl_FragData [2]
   ]);

   // Create depth buffer.

   this .depthTexture = gl .createTexture ();

   gl .bindTexture (gl .TEXTURE_2D, this .depthTexture);

   gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
   gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
   gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
   gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .NEAREST);

   gl .texImage2D (gl .TEXTURE_2D, 0, gl .DEPTH_COMPONENT24, 1, 1, 0, gl .DEPTH_COMPONENT, gl .UNSIGNED_INT, null);
   gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .DEPTH_ATTACHMENT, gl .TEXTURE_2D, this .depthTexture, 0);

   const status = gl .checkFramebufferStatus (gl .FRAMEBUFFER) === gl .FRAMEBUFFER_COMPLETE;

   // Create frame buffer.

   this .combinedFrameBuffer = gl .createFramebuffer ();
   this .combinedColorBuffer = gl .createRenderbuffer ();

   gl .bindRenderbuffer (gl .RENDERBUFFER, this .combinedColorBuffer);
   gl .renderbufferStorage (gl .RENDERBUFFER, gl .RGBA32F, 3, 1);
   gl .bindFramebuffer (gl .FRAMEBUFFER, this .combinedFrameBuffer);
   gl .framebufferRenderbuffer (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .RENDERBUFFER, this .combinedColorBuffer);

   gl .bindFramebuffer (gl .FRAMEBUFFER, this .combinedFrameBuffer);

   const combinedStatus = gl .checkFramebufferStatus (gl .FRAMEBUFFER) === gl .FRAMEBUFFER_COMPLETE;

   // Restore current frame buffer.

   gl .bindFramebuffer (gl .FRAMEBUFFER, currentFrameBuffer);

   // Always check that our frame buffer is ok.

   if (!status || !combinedStatus)
      throw new Error ("Couldn't create frame buffer.");
}

Object .assign (PointingBuffer .prototype,
{
   bind ()
   {
      const gl = this .context;

      gl .bindFramebuffer (gl .FRAMEBUFFER, this .frameBuffer);

      // Clear all layers.
      gl .clearColor (0, 0, 0, 0);
      gl .clear (gl .COLOR_BUFFER_BIT);
   },
   getHit (hit)
   {
      const { browser, context: gl, array } = this;

      // Get compose shader and texture units.

      const
         shaderNode  = browser .getPointingComposeShader (),
         program     = shaderNode .getProgram (),
         textureUnit = gl .getUniformLocation (program, "x3d_PointingTexture");

      gl .bindFramebuffer (gl .FRAMEBUFFER, this .combinedFrameBuffer);
      gl .useProgram (program);
      gl .uniform1i (textureUnit, 0);

      // Render to combined framebuffer.

      gl .disable (gl .DEPTH_TEST);
      gl .disable (gl .BLEND);
      gl .enable (gl .CULL_FACE);
      gl .frontFace (gl .CCW);
      gl .bindVertexArray (browser .getFullscreenVertexArrayObject ());

      for (let i = 0; i < 3; ++ i)
      {
         gl .viewport (i, 0, 1, 1);
         gl .scissor  (i, 0, 1, 1);

         gl .activeTexture (gl .TEXTURE0);
         gl .bindTexture (gl .TEXTURE_2D, this .colorTextures [i]);
         gl .drawArrays (gl .TRIANGLES, 0, 6);
      }

      gl .enable (gl .DEPTH_TEST);

      // Read from combined framebuffer.

      gl .readBuffer (gl .COLOR_ATTACHMENT0);
      gl .readPixels (0, 0, 3, 1, gl .RGBA, gl .FLOAT, array);

      hit .id = array [3];

      hit .point    .set (array [0], array [1], array [2]);
      hit .normal   .set (array [4], array [5], array [6]);
      hit .texCoord .set (array [8], array [9], array [10], array [11]);
   },
   dispose ()
   {
      const gl = this .context;

      gl .deleteFramebuffer (this .frameBuffer);

      for (const colorTexture of this .colorTextures)
         gl .deleteTexture (colorTexture);

      gl .deleteRenderbuffer (this .depthBuffer);
      gl .deleteTexture (this .depthTexture);

      gl .deleteFramebuffer (this .combinedFrameBuffer);
      gl .deleteRenderbuffer (this .combinedColorBuffer);
   },
});

export default PointingBuffer;
