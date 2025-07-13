import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DTexture2DNode     from "./X3DTexture2DNode.js";
import X3DUrlObject         from "../Networking/X3DUrlObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import DEVELOPMENT          from "../../DEVELOPMENT.js";

function ImageTexture (executionContext)
{
   X3DTexture2DNode .call (this, executionContext);
   X3DUrlObject     .call (this, executionContext);

   this .addType (X3DConstants .ImageTexture);

   this .image    = $("<img></img>");
   this .urlStack = new Fields .MFString ();

   this .getMatrix () .set ([1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1]); // flipY
}

Object .assign (Object .setPrototypeOf (ImageTexture .prototype, X3DTexture2DNode .prototype),
   X3DUrlObject .prototype,
{
   initialize ()
   {
      X3DTexture2DNode .prototype .initialize .call (this);
      X3DUrlObject     .prototype .initialize .call (this);

      this ._colorSpaceConversion .addInterest ("loadNow", this);

      this .image
         .on ("load", this .setImage .bind (this))
         .on ("abort error", this .setError .bind (this))
         .attr ("crossorigin", "anonymous");

      this .requestImmediateLoad () .catch (Function .prototype);
   },
   getTextureType ()
   {
      return 1;
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

      if (this .URL .pathname .match (/\.ktx2?(?:\.gz)?$/) || this .URL .href .match (/^data:image\/ktx2[;,]/))
      {
         this .setLinear (true);
         this .setMipMaps (false);

         this .getBrowser () .getKTXDecoder ()
            .then (decoder => decoder .loadKTXFromURL (this .URL, this .getCache ()))
            .then (texture => this .setKTXTexture (texture))
            .catch (error => this .setError ({ type: error .message }));
      }
      else
      {
         this .setLinear (false);
         this .setMipMaps (true);

         if (this .URL .protocol !== "data:")
         {
            if (!this .getCache ())
               this .URL .searchParams .set ("_", Date .now ());
         }

         this .image .attr ("src", this .URL);
      }
   },
   setError (event)
   {
      if (this .URL .protocol !== "data:")
         console .warn (`Error loading image '${decodeURI (this .URL)}:'`, event .type);

      this .loadNext ();
   },
   setKTXTexture (texture)
   {
      if (texture .target !== this .getTarget ())
         return this .setError ({ type: "Invalid KTX texture target, must be 'TEXTURE_2D'." });

      if (DEVELOPMENT)
      {
         if (this .URL .protocol !== "data:")
            console .info (`Done loading image texture '${decodeURI (this .URL)}'.`);
      }

      try
      {
         this .setTexture (texture);
         this .setTransparent (false);
         this .setWidth (texture .baseWidth);
         this .setHeight (texture .baseHeight);
         this .updateTextureParameters ();

         this .setLoadState (X3DConstants .COMPLETE_STATE);
      }
      catch (error)
      {
         // Catch security error from cross origin requests.
         this .setError ({ type: error .message });
      }
   },
   setImage ()
   {
      if (DEVELOPMENT)
      {
         if (this .URL .protocol !== "data:")
            console .info (`Done loading image texture '${decodeURI (this .URL)}'.`);
      }

      try
      {
         const
            image             = this .image [0],
            { width, height } = image;

         // Upload image to GPU.

         this .setTextureData (width, height, this ._colorSpaceConversion .getValue (), this .isTransparent (), image);
         this .setTransparent (this .isImageTransparent (this .getTextureData (this .getTexture (), width, height)));
         this .setLoadState (X3DConstants .COMPLETE_STATE);
         this .addNodeEvent ();
      }
      catch (error)
      {
         // Catch security error from cross origin requests.
         this .setError ({ type: error .message });
      }
   },
   dispose ()
   {
      X3DUrlObject     .prototype .dispose .call (this);
      X3DTexture2DNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (ImageTexture,
{
   ... X3DNode .getStaticProperties ("ImageTexture", "Texturing", 1, "texture", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "load",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "url",                  new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefresh",          new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefreshTimeLimit", new Fields .SFTime (3600)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "colorSpaceConversion", new Fields .SFBool (true)), // experimental
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties",    new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default ImageTexture;
