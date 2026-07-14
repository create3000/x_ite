import Fields                    from "../../Fields.js";
import X3DFieldDefinition        from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray      from "../../Base/FieldDefinitionArray.js";
import X3DNode                   from "../Core/X3DNode.js";
import X3DEnvironmentTextureNode from "./X3DEnvironmentTextureNode.js";
import X3DUrlObject              from "../Networking/X3DUrlObject.js";
import X3DConstants              from "../../Base/X3DConstants.js";
import FileLoader                from "../../InputOutput/FileLoader.js";
import Vector2                   from "../../../standard/Math/Numbers/Vector2.js";
import DEVELOPMENT               from "../../DEVELOPMENT.js";

function ImageCubeMapTexture (executionContext)
{
   X3DEnvironmentTextureNode .call (this, executionContext);
   X3DUrlObject              .call (this, executionContext);

   this .addType (X3DConstants .ImageCubeMapTexture);
}

Object .assign (Object .setPrototypeOf (ImageCubeMapTexture .prototype, X3DEnvironmentTextureNode .prototype),
   X3DUrlObject .prototype,
{
   initialize ()
   {
      X3DEnvironmentTextureNode .prototype .initialize .call (this);
      X3DUrlObject              .prototype .initialize .call (this);

      this .requestImmediateLoad () .catch (Function .prototype);
   },
   unloadData ()
   {
      this .clearTexture ();
   },
   loadData ()
   {
      new FileLoader (this, { dataAsString: false }) .loadDocument (this ._url, async (data, fileURL) =>
      {
         if (data === null)
         {
            this .clearTexture ();
            this .setLoadState (X3DConstants .FAILED_STATE);
         }
         else if (data instanceof ArrayBuffer)
         {
            fileURL = new URL (fileURL);

            if (fileURL .pathname .match (/\.ktx2?(?:\.gz)?$/) || fileURL .href .match (/^\s*data:image\/ktx2[;,]/s))
            {
               this .setLinear (true);
               this .setMipMaps (false);

               const
                  decoder = await this .getBrowser () .getKTXDecoder (),
                  texture = await decoder .loadKTXFromBuffer (data);

               this .setKTXTexture (texture, fileURL);
            }
            else
            {
               this .setLinear (false);
               this .setMipMaps (true);

               const objectURL = URL .createObjectURL (new Blob ([data]));

               try
               {
                  this .setImage (await this .loadImage (objectURL), fileURL);
               }
               finally
               {
                  URL .revokeObjectURL (objectURL);
               }
            }
         }
         else
         {
            throw new Error (`${this .getTypeName ()}: no suitable file type handler found.`);
         }
      });
   },
   setKTXTexture (texture, fileURL)
   {
      if (texture .target !== this .getTarget ())
         return this .setError ({ type: "Invalid KTX texture target, must be 'TEXTURE_CUBE_MAP'." });

      if (DEVELOPMENT)
      {
         if (fileURL .protocol !== "data:")
            console .info (`Done loading image cube map texture '${decodeURI (fileURL)}'.`);
      }

      this .setTexture (texture);
      this .setTransparent (false);
      this .setSize (texture .baseWidth);
      this .updateTextureParameters ();

      this .setLoadState (X3DConstants .COMPLETE_STATE);
   },
   setImage (image, fileURL)
   {
      if (DEVELOPMENT)
      {
         if (fileURL .protocol !== "data:")
            console .info (`Done loading image cube map texture '${decodeURI (fileURL)}'.`);
      }

      // Create texture.

      const
         gl      = this .getBrowser () .getContext (),
         texture = gl .createTexture ();

      gl .bindTexture (gl .TEXTURE_2D, texture);
      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA, gl .RGBA, gl .UNSIGNED_BYTE, image);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .LINEAR);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .LINEAR);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S, gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T, gl .CLAMP_TO_EDGE);

      this .imageToCubeMap (texture, image .width, image .height, false);

      // Update load state.

      this .setLoadState (X3DConstants .COMPLETE_STATE);
      this .addNodeEvent ();
   },
   imageToCubeMap (texture, width, height)
   {
      const aspectRatio = width / height;

      if (Math .abs (aspectRatio - 4/3) < 0.01)
         this .skyBoxToCubeMap (texture, width, height);

      if (Math .abs (aspectRatio - 2/1) < 0.01)
         this .panoramaToCubeMap (texture, width, height);

      this .updateTextureParameters ();
   },
   skyBoxToCubeMap: (() =>
   {
      const offsets = [
         new Vector2 (1, 1), // Front
         new Vector2 (3, 1), // Back
         new Vector2 (0, 1), // Left
         new Vector2 (2, 1), // Right
         new Vector2 (1, 0), // Top
         new Vector2 (1, 2), // Bottom
      ];

      //     -----
      //     | t |
      // -----------------
      // | l | f | r | b |
      // -----------------
      //     | b |
      //     -----

      return function (skyBoxTexture, width, height)
      {
         const
            gl          = this .getBrowser () .getContext (),
            framebuffer = gl .createFramebuffer (),
            width1_4    = Math .floor (width / 4),
            height1_3   = Math .floor (height / 3),
            data        = new Uint8Array (width1_4 * height1_3 * 4);

         // Init cube map texture.

         gl .bindTexture (this .getTarget (), this .getTexture ());

         for (let i = 0; i < 6; ++ i)
            gl .texImage2D  (this .getTargets () [i], 0, gl .RGBA, width1_4, height1_3, 0, gl .RGBA, gl .UNSIGNED_BYTE, null);

         // Extract images.

         gl .bindFramebuffer (gl .FRAMEBUFFER, framebuffer);
         gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .TEXTURE_2D, skyBoxTexture, 0);

         let transparent = false;

         gl .bindTexture (this .getTarget (), this .getTexture ());

         for (let i = 0; i < 6; ++ i)
         {
            gl .copyTexSubImage2D (this .getTargets () [i], 0, 0, 0, offsets [i] .x * width1_4, offsets [i] .y * height1_3, width1_4, height1_3);

            // Determine image alpha.

            if (!transparent)
            {
               gl .readPixels (offsets [i] .x * width1_4, offsets [i] .y * height1_3, width1_4, height1_3, gl .RGBA, gl .UNSIGNED_BYTE, data);

               transparent = this .isImageTransparent (data);
            }
         }

         gl .deleteFramebuffer (framebuffer);
         gl .deleteTexture (skyBoxTexture);

         // Update size and transparent field.

         this .setTransparent (transparent);
         this .setSize (width1_4);
      };
   })(),
   panoramaToCubeMap (panoramaTexture, width, height)
   {
      // Mercator Projection

      const
         browser     = this .getBrowser (),
         gl          = browser .getContext (),
         shaderNode  = browser .getPanoramaShader (),
         framebuffer = gl .createFramebuffer (),
         size        = Math .floor (height / 2),
         data        = new Uint8Array (size * size * 4);

      // Adjust panorama texture.

      gl .bindTexture (gl .TEXTURE_2D, panoramaTexture);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S, gl .MIRRORED_REPEAT);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T, gl .MIRRORED_REPEAT);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .LINEAR);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .LINEAR);

      // Init cube map texture.

      gl .bindTexture (this .getTarget (), this .getTexture ());

      for (let i = 0; i < 6; ++ i)
         gl .texImage2D  (this .getTargets () [i], 0, gl .RGBA, size, size, 0, gl .RGBA, gl .UNSIGNED_BYTE, null);

      // Render faces.

      gl .useProgram (shaderNode .getProgram ());

      gl .activeTexture (gl .TEXTURE0);
      gl .bindTexture (gl .TEXTURE_2D, panoramaTexture);
      gl .uniform1i (shaderNode .x3d_PanoramaTextureEXT, 0);

      gl .bindFramebuffer (gl .FRAMEBUFFER, framebuffer);
      gl .viewport (0, 0, size, size);
      gl .scissor (0, 0, size, size);
      gl .disable (gl .DEPTH_TEST);
      gl .enable (gl .CULL_FACE);
      gl .frontFace (gl .CCW);
      gl .clearColor (0, 0, 0, 0);
      gl .bindVertexArray (browser .getFullscreenVertexArrayObject ());

      let transparent = false;

      for (let i = 0; i < 6; ++ i)
      {
         gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, this .getTargets () [i], this .getTexture (), 0);
         gl .clear (gl .COLOR_BUFFER_BIT);
         gl .uniform1i (shaderNode .x3d_CurrentFaceEXT, i);
         gl .drawArrays (gl .TRIANGLES, 0, 6);

         if (!transparent)
         {
            gl .readPixels (0, 0, size, size, gl .RGBA, gl .UNSIGNED_BYTE, data);

            transparent = this .isImageTransparent (data);
         }
      }

      gl .enable (gl .DEPTH_TEST);
      gl .deleteFramebuffer (framebuffer);
      gl .deleteTexture (panoramaTexture);

      // Update size and transparent field.

      this .setTransparent (transparent);
      this .setSize (size);
   },
   dispose ()
   {
      X3DUrlObject              .prototype .dispose .call (this);
      X3DEnvironmentTextureNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (ImageCubeMapTexture,
{
   ... X3DNode .getStaticProperties ("ImageCubeMapTexture", "CubeMapTexturing", 2, "texture", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "load",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "url",                  new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefresh",          new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefreshTimeLimit", new Fields .SFTime (3600)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties",    new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default ImageCubeMapTexture;
