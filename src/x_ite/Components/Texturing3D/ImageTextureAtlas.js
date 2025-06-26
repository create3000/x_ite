import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DTexture3DNode     from "./X3DTexture3DNode.js";
import X3DUrlObject         from "../Networking/X3DUrlObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import DEVELOPMENT          from "../../DEVELOPMENT.js";

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function ImageTextureAtlas (executionContext)
{
   X3DTexture3DNode .call (this, executionContext);
   X3DUrlObject     .call (this, executionContext);

   this .addType (X3DConstants .ImageTextureAtlas);

   this .image    = $("<img></img>");
   this .urlStack = new Fields .MFString ();
}

Object .assign (Object .setPrototypeOf (ImageTextureAtlas .prototype, X3DTexture3DNode .prototype),
   X3DUrlObject .prototype,
{
   initialize ()
   {
      X3DTexture3DNode .prototype .initialize .call (this);
      X3DUrlObject     .prototype .initialize .call (this);

      this .image
         .on ("load", this .setImage .bind (this))
         .on ("abort error", this .setError .bind (this))
         .attr ("crossorigin", "anonymous");

      this .requestImmediateLoad () .catch (Function .prototype);
   },
   unloadData ()
   {
      this .clearTexture ();
   },
   loadData ()
   {
      this .urlStack .setValue (this ._url);
      this .loadNext ();
   },
   loadNext ()
   {
      if (this .urlStack .length === 0)
      {
         this .clearTexture ();
         this .setLoadState (X3DConstants .FAILED_STATE);
         return;
      }

      // Get URL.

      this .URL = new URL (this .urlStack .shift (), this .getExecutionContext () .getBaseURL ());

      if (this .URL .protocol !== "data:")
      {
         if (!this .getCache ())
            this .URL .searchParams .set ("_", Date .now ());
      }

      this .image .attr ("src", this .URL);
   },
   setError (event)
   {
      if (this .URL .protocol !== "data:")
         console .warn (`Error loading image '${decodeURI (this .URL)}':`, event .type);

      this .loadNext ();
   },
   setImage ()
   {
      if (DEVELOPMENT)
      {
         if (this .URL .protocol !== "data:")
            console .info (`Done loading image '${decodeURI (this .URL)}'.`);
      }

      try
      {
         const gl = this .getBrowser () .getContext ();

         if (gl .getVersion () === 1)
         {
            this .setLoadState (X3DConstants .COMPLETE_STATE);
            return;
         }

         const
            image       = this .image [0],
            w           = image .width,
            h           = image .height,
            texture     = gl .createTexture (),
            frameBuffer = gl .createFramebuffer ();

         // Slice me nice.

         const
            slicesOverX    = this ._slicesOverX .getValue (),
            slicesOverY    = this ._slicesOverY .getValue (),
            maxSlices      = slicesOverX * slicesOverY,
            width          = Math .floor (w / slicesOverX),
            height         = Math .floor (h / slicesOverY),
            depth          = Math .min (this ._numberOfSlices .getValue (), maxSlices),
            defaultData    = new Uint8Array (w * h * 4),
            data           = defaultData .subarray (0, width * height * depth * 4);

         gl .bindTexture (gl .TEXTURE_3D, this .getTexture ());
         gl .texImage3D (gl .TEXTURE_3D, 0, gl .RGBA, width, height, depth, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

         gl .bindFramebuffer (gl .FRAMEBUFFER, frameBuffer);
         gl .bindTexture (gl .TEXTURE_2D, texture);
         gl .texImage2D  (gl .TEXTURE_2D, 0, gl .RGBA, w, h, 0, gl .RGBA, gl .UNSIGNED_BYTE, image);
         gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .TEXTURE_2D, texture, 0);

         let transparent = false;

         for (let y = 0, i = 0; y < slicesOverY && i < depth; ++ y)
         {
            for (let x = 0; x < slicesOverX && i < depth; ++ x, ++ i)
            {
               const
                  sx = Math .floor (x * w / slicesOverX),
                  sy = Math .floor (y * h / slicesOverY);

               // gl .copyTexSubImage3D (gl .TEXTURE_3D, 0, 0, 0, i, sx, sy, width, height);

               gl .readPixels (sx, sy, width, height, gl .RGBA, gl .UNSIGNED_BYTE, data);
               gl .texSubImage3D (gl .TEXTURE_3D, 0, 0, 0, i, width, height, 1, gl .RGBA, gl .UNSIGNED_BYTE, data);

               transparent ||= this .isImageTransparent (data);
            }
         }

         gl .deleteFramebuffer (frameBuffer);
         gl .deleteTexture (texture);

         // Determine image alpha.

         this .setTransparent (transparent);
         this .setWidth (width);
         this .setHeight (height);
         this .setDepth (depth);
         this .updateTextureParameters ();
         this .setLoadState (X3DConstants .COMPLETE_STATE);
      }
      catch (error)
      {
         if (DEVELOPMENT)
            console .log (error)

         // Catch security error from cross origin requests.
         this .setError ({ type: error .message });
      }
   },
   dispose ()
   {
      X3DUrlObject     .prototype .dispose .call (this);
      X3DTexture3DNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (ImageTextureAtlas,
{
   ... X3DNode .getStaticProperties ("ImageTextureAtlas", "Texturing3D", 1, "texture", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "load",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "url",                  new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefresh",          new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefreshTimeLimit", new Fields .SFTime (3600)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "slicesOverX",          new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "slicesOverY",          new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "numberOfSlices",       new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatR",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties",    new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default ImageTextureAtlas;
