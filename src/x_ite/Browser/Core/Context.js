const Context =
{
   excludes: new Set ([
      "WEBGL_debug_renderer_info",
      "WEBGL_polygon_mode",
   ]),
   create (canvas, preserveDrawingBuffer)
   {
      const options = { preserveDrawingBuffer };

      const gl = canvas .getContext ("webgl2", { ... options, antialias: false });

      if (!gl)
         throw new Error ("Couldn't create WebGL context.");

      gl .getVersion = () => 2;

      // Load extensions.

      for (const extension of gl .getSupportedExtensions () .filter (extension => !this .excludes .has (extension)))
         gl .getExtension (extension);

      // // Feature detection:

      // // console .log (check32BitTextures (gl));

      // if (!check32BitTextures (gl))
      // {
      //    // Use defineProperty to overwrite property.
      //    Object .defineProperty (gl, "RGBA32F",
      //    {
      //       value: gl .RGBA16F,
      //       configurable: true,
      //       enumerable: true,
      //    });
      // }

      return gl;
   },
}

// function check32BitTextures (gl)
// {
//    // Create framebuffer.
//    const colorTexture = gl .createTexture ();
//    const framebuffer  = gl .createFramebuffer ();

//    gl .bindTexture (gl .TEXTURE_2D, colorTexture);

//    gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
//    gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
//    gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
//    gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .NEAREST);

//    gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, new Uint8Array (4));

//    gl .bindFramebuffer (gl.FRAMEBUFFER, framebuffer);
//    gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .TEXTURE_2D, colorTexture, 0);

//    if (gl .checkFramebufferStatus (gl .FRAMEBUFFER) !== gl .FRAMEBUFFER_COMPLETE)
//       return false;

//    // Vertex shader (pass through)
//    const vsSource = `#version 300 es
// precision highp float;
// in vec2 x3d_Vertex;
// void
// main ()
// {
//    gl_Position = vec4 (x3d_Vertex, 0.0, 1.0);
// }
//   `;

//   // Fragment shader
//   const fsSource = `#version 300 es
// precision highp float;
// precision highp sampler2D;
// uniform sampler2D x3d_Texture;
// out vec4 x3d_FragColor;
// void
// main ()
// {
//    vec4 pixel = texture (x3d_Texture, vec2 (0.5, 0.5));

//    float r = pixel .r == 0.0        ? 1.0 : 0.0;
//    float g = pixel .g == 1.0        ? 1.0 : 0.0;
//    float b = pixel .b == 16777216.0 ? 1.0 : 0.0;
//    float a = pixel .a == 16777216.0 ? 1.0 : 0.0;

//    x3d_FragColor = vec4 (r, g, b, a);
// }
//   `;

//    // Create program.
//    const program = createProgram (gl, vsSource, fsSource);
//    gl .useProgram (program);

//    // Quad covering the whole clip space.
//    const quadVertices = new Float32Array ([
//       -1, -1,
//        1, -1,
//       -1,  1,
//       -1,  1,
//        1, -1,
//        1,  1,
//    ]);

//    // Create buffer for vertices.
//    const buffer = gl .createBuffer ();
//    gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
//    gl .bufferData (gl .ARRAY_BUFFER, quadVertices, gl .STATIC_DRAW);

//    // Bind vertex attrib.
//    const vertexLocation = gl .getAttribLocation (program, "x3d_Vertex");
//    gl .enableVertexAttribArray (vertexLocation);
//    gl .vertexAttribPointer (vertexLocation, 2, gl .FLOAT, false, 0, 0);

//    // Create texture.
//    const pixelData = new Float32Array ([0, 1, 2**24, 2**24+1]);
//    const texture   = gl .createTexture ();
//    const sampler   = gl .getUniformLocation (program, "x3d_Texture");

//    gl .activeTexture (gl .TEXTURE0);
//    gl .bindTexture (gl .TEXTURE_2D, texture);

//    gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
//    gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
//    gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
//    gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .NEAREST);

//    gl .uniform1i (sampler, 0);
//    gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, 1, 1, 0, gl .RGBA, gl .FLOAT, pixelData);

//    gl .clearColor (0, 0, 0, 0);
//    gl .clear (gl .COLOR_BUFFER_BIT);
//    gl .drawArrays (gl .TRIANGLES, 0, 6);

//    const readData = new Uint8Array (4);
//    gl .readPixels (0, 0, 1, 1, gl .RGBA, gl .UNSIGNED_BYTE, readData);

//    // console .log ("Original data:",  ... pixelData);
//    // console .log ("Read-back data:", ... readData);
//    // $(".x_ite-console") .append (document .createTextNode (readData + "\n"))

//    // Cleanup
//    gl .deleteFramebuffer (framebuffer);
//    gl .deleteTexture (colorTexture);
//    gl .deleteTexture (texture);
//    gl .deleteBuffer (buffer);
//    gl .deleteProgram (program);

//    return readData .every (p => p === 255);
// }

// // Shader compile helper
// function createShader (gl, type, source)
// {
//    const shader = gl.createShader (type);
//    gl .shaderSource (shader, source);
//    gl .compileShader(shader);
//    return shader;
// }

// // Program link helper
// function createProgram (gl, vsSource, fsSource)
// {
//    const vs = createShader (gl, gl.VERTEX_SHADER, vsSource);
//    const fs = createShader (gl, gl.FRAGMENT_SHADER, fsSource);
//    const program = gl .createProgram ();
//    gl .attachShader (program, vs);
//    gl .attachShader (program, fs);
//    gl .linkProgram (program);
//    return program;
// }

export default Context;
