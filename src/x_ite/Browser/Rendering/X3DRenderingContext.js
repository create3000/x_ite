import Fields                 from "../../Fields.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import MultiSampleFramebuffer from "../../Rendering/MultiSampleFramebuffer.js";
import { maxClipPlanes }      from "./RenderingConfiguration.js";
import Lock                   from "../../../standard/Utility/Lock.js";

const
   _session             = Symbol (),
   _framebuffers        = Symbol (),
   _defaultFramebuffer  = Symbol (),
   _textureBuffers      = Symbol (),
   _resizer             = Symbol (),
   _localObjects        = Symbol (),
   _fullscreenArray     = Symbol (),
   _fullscreenBuffer    = Symbol (),
   _composeShader       = Symbol (),
   _depthShaders        = Symbol (),
   _shapeId             = Symbol (),
   _buttonLock          = Symbol ();

function X3DRenderingContext ()
{
   this .addChildObjects (X3DConstants .outputOnly, "viewport", new Fields .SFVec4f (0, 0, 300, 150));

   this [_framebuffers]   = [ ];
   this [_textureBuffers] = [ ];
   this [_depthShaders]   = new Map ();
   this [_localObjects]   = [ ]; // shader objects dumpster

   // WebXR support

   this [_session]            = window;
   this [_defaultFramebuffer] = null;
   this [_buttonLock]         = Symbol ();
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

      this [_resizer] = new ResizeObserver (() => this .reshape ());
      this [_resizer] .observe (this .getSurface () [0]);

      $(window) .on (`orientationchange.X3DRenderingContext-${this .getInstanceId ()}`, () => this .reshape ());

      this .reshape ();

      // Observe fullscreen changes of <x3d-canvas>.

      $(document) .on ([
         "fullscreenchange",
         "webkitfullscreenchange",
         "mozfullscreenchange",
         "MSFullscreenChange",
      ]
      .map (event => `${event}.X3DRenderingContext-${this .getInstanceId ()}`)
      .join (" "), () => this .onfullscreen ());

      // Check for WebXR support.

      navigator .xr ?.addEventListener ("devicechange", () => this .xrUpdateButton ());

      this .xrUpdateButton ();
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

      return gl .getParameter (gl .MAX_SAMPLES);
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
   getFramebuffers ()
   {
      return this [_framebuffers];
   },
   getDefaultFramebuffer ()
   {
      return this [_defaultFramebuffer];
   },
   setDefaultFramebuffer (defaultFramebuffer)
   {
      this [_defaultFramebuffer] = defaultFramebuffer;

      for (const frameBuffer of this [_framebuffers])
         frameBuffer .dispose ();

      this [_framebuffers] = [ ];

      this .reshape ();
   },
   addTextureBuffer (key)
   {
      this [_textureBuffers] .push (key);
   },
   getFullscreenVertexArrayObject ()
   {
      // Quad for fullscreen rendering.

      return this [_fullscreenArray] ??= (() =>
      {
         const
            gl               = this .getContext (),
            fullscreenArray  = gl .createVertexArray (),
            fullscreenBuffer = gl .createBuffer ();

         this [_fullscreenBuffer] = fullscreenBuffer;

         gl .bindVertexArray (fullscreenArray);
         gl .bindBuffer (gl .ARRAY_BUFFER, fullscreenBuffer);
         gl .bufferData (gl .ARRAY_BUFFER, new Float32Array ([-1, 1, -1, -1, 1, -1, -1, 1, 1, -1, 1, 1]), gl .STATIC_DRAW);
         gl .enableVertexAttribArray (0);
         gl .vertexAttribPointer (0, 2, gl .FLOAT, false, 0, 0);

         return fullscreenArray;
      })();
   },
   getOITComposeShader ()
   {
      return this [_composeShader] ??= this .createShader ("OITCompose", "FullScreen", "OITCompose");
   },
   getDepthShader (numClipPlanes, shapeNode, hAnimNode)
   {
      const geometryContext = shapeNode .getGeometryContext ();

      let key = "";

      key += numClipPlanes; // Could be more than 9.
      key += hAnimNode ?.getHAnimKey () ?? "[]";
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
         ?? this .createDepthShader (key, numClipPlanes, shapeNode, hAnimNode);
   },
   createDepthShader (key, numClipPlanes, shapeNode, hAnimNode)
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

      if (hAnimNode)
      {
         options .push ("X3D_SKINNING");
         options .push (`X3D_NUM_JOINT_SETS ${hAnimNode .getNumJoints () / 4}`);
         options .push (`X3D_NUM_DISPLACEMENTS ${hAnimNode .getNumDisplacements ()}`);
      }

      const shaderNode = this .createShader ("Depth", "Depth", "Depth", options);

      this [_depthShaders] .set (key, shaderNode);

      return shaderNode;
   },
   resize (width, height)
   {
      return new Promise (resolve =>
      {
         const
            contentScale   = this .getRenderingProperty ("ContentScale"),
            viewportWidth  = Math .max (width * contentScale, 1)|0,
            viewportHeight = Math .max (height * contentScale, 1)|0,
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
      if (this .getSession () !== window)
         return;

      const
         canvas       = this .getCanvas (),
         contentScale = this .getRenderingProperty ("ContentScale"),
         width        = Math .max (canvas .parent () .width ()  * contentScale, 1)|0,
         height       = Math .max (canvas .parent () .height () * contentScale, 1)|0;

      canvas
         .prop ("width",  width)
         .prop ("height", height);

      this .reshapeFramebuffer (0, 0, 0, width, height);

      this .addBrowserEvent ();
   },
   reshapeFramebuffer (i, x, y, width, height)
   {
      const
         samples     = this .getRenderingProperty ("Multisampling"),
         oit         = this .getBrowserOption ("OrderIndependentTransparency"),
         frameBuffer = this [_framebuffers] [i];

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

      this [_framebuffers] [i] = new MultiSampleFramebuffer ({ browser: this, x, y, width, height, samples, oit });

      for (const key of this [_textureBuffers])
         this .reshapeTextureBuffer (key, width, height);
   },
   reshapeTextureBuffer (key, width, height)
   {
      const textureBuffer = this [key];

      if (!textureBuffer)
         return;

      if (width === textureBuffer .getWidth () && height === textureBuffer .getHeight ())
         return;

      textureBuffer .dispose ();

      this [key] = undefined;
   },
   resetShapeId ()
   {
      this [_shapeId] = 0;
   },
   getShapeId ()
   {
      return ++ this [_shapeId];
   },
   onfullscreen ()
   {
      const element = this .getElement ();

      if (document .fullscreenElement === element [0])
         element .addClass ("x_ite-fullscreen");
      else
         element .removeClass ("x_ite-fullscreen");
   },
   async xrCheckSupport ()
   {
      if (!("xr" in navigator))
         return false;

      const mode = this .getBrowserOption ("XRSessionMode") .toLowerCase () .replaceAll ("_", "-");

      try
      {
         return await navigator .xr .isSessionSupported (mode);
      }
      catch
      {
         return false;
      }
   },
   xrUpdateButton ()
   {
      return Lock .acquire (this [_buttonLock], async () =>
      {
         this .getSurface () .children (".x_ite-private-xr-button") .remove ();

         if (!await this .xrCheckSupport ())
            return;

         await this .loadComponents (this .getComponent ("WebXR"), this .getComponent ("Geometry2D"));

         this .xrAddButton ();
      });
   },
   xrFrame ()
   { },
   getSession ()
   {
      return this [_session];
   },
   setSession (session)
   {
      this [_session] = session;
   },
   getPose ()
   {
      return null;
   },
   dispose ()
   {
      this [_session] = window;

      this [_resizer] .disconnect ();

      $(window)   .off (`.X3DRenderingContext-${this .getInstanceId ()}`);
      $(document) .off (`.X3DRenderingContext-${this .getInstanceId ()}`);
   },
});

export default X3DRenderingContext;
