function PointingBuffer ({ browser })
{
   const gl = browser .getContext ();

   this .context = gl;
   this .array   = new Float32Array (4);

   // Create frame buffer.

   this .frameBuffer = gl .createFramebuffer ();

   // Create color buffers.

   this .colorBuffers = [ ];

   for (let i = 0; i < 3; ++ i)
   {
      this .colorBuffers [i] = gl .createRenderbuffer ();

      gl .bindRenderbuffer (gl .RENDERBUFFER, this .colorBuffers [i]);
      gl .renderbufferStorage (gl .RENDERBUFFER, gl .RGBA32F, 1, 1);
      gl .bindFramebuffer (gl .FRAMEBUFFER, this .frameBuffer);
      gl .framebufferRenderbuffer (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0 + i, gl .RENDERBUFFER, this .colorBuffers [i]);
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

   // Always check that our frame buffer is ok.

   if (!status)
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
      const { context: gl, array } = this;

      gl .bindFramebuffer (gl .FRAMEBUFFER, this .frameBuffer);

      // Id, point

      gl .readBuffer (gl .COLOR_ATTACHMENT0);
      gl .readPixels (0, 0, 1, 1, gl .RGBA, gl .FLOAT, array);

      hit .id = array [3];
      hit .point .set (array [0], array [1], array [2]);

      // Normal

      gl .readBuffer (gl .COLOR_ATTACHMENT1);
      gl .readPixels (0, 0, 1, 1, gl .RGBA, gl .FLOAT, array);

      hit .normal .set (array [0], array [1], array [2]);

      // TexCoord

      gl .readBuffer (gl .COLOR_ATTACHMENT2);
      gl .readPixels (0, 0, 1, 1, gl .RGBA, gl .FLOAT, array);

      hit .texCoord .set (array [0], array [1], array [2], array [3]);
   },
   dispose ()
   {
      const gl = this .context;

      gl .deleteFramebuffer (this .frameBuffer);

      for (const colorBuffer of this .colorBuffers)
         gl .deleteRenderbuffer (colorBuffer);

      gl .deleteRenderbuffer (this .depthBuffer);
      gl .deleteTexture (this .depthTexture);
   },
});

export default PointingBuffer;
