import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DTexture2DNode     from "./X3DTexture2DNode.js";
import X3DSoundSourceNode   from "../Sound/X3DSoundSourceNode.js";
import X3DUrlObject         from "../Networking/X3DUrlObject.js";
import FileLoader           from "../../InputOutput/FileLoader.js";
import GifMedia             from "../../Browser/Texturing/GifMedia.js";
import PNGMedia             from "../../Browser/Texturing/PNGMedia.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import DEVELOPMENT          from "../../DEVELOPMENT.js";

function MovieTexture (executionContext)
{
   X3DTexture2DNode   .call (this, executionContext);
   X3DSoundSourceNode .call (this, executionContext);
   X3DUrlObject       .call (this, executionContext);

   this .addType (X3DConstants .MovieTexture);

   // Private properties

   const audioContext = this .getBrowser () .getAudioContext ();

   this .mediaStreamDestination = audioContext .createMediaStreamDestination ();

   this .getAudioSource () .connect (this .mediaStreamDestination);

   this .getMatrix () .set ([1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1]); // flipY
}

Object .assign (Object .setPrototypeOf (MovieTexture .prototype, X3DTexture2DNode .prototype),
   X3DSoundSourceNode .prototype,
   X3DUrlObject .prototype,
{
   initialize ()
   {
      X3DTexture2DNode   .prototype .initialize .call (this);
      X3DSoundSourceNode .prototype .initialize .call (this);
      X3DUrlObject       .prototype .initialize .call (this);

      this ._speed .addInterest ("set_speed__", this);
      this ._pitch .addInterest ("set_speed__", this);

      this .requestImmediateLoad () .catch (Function .prototype);
   },
   set_live__ ()
   {
      X3DSoundSourceNode .prototype .set_live__ .call (this);
      X3DUrlObject       .prototype .set_live__ .call (this);
   },
   getTextureType ()
   {
      return 1;
   },
   unloadData ()
   {
      this .clearTexture ();
      this .setMediaElement (null);
   },
   async loadData ()
   {
      this .sourceNode ?.disconnect ();

      for (const url of this ._url)
      {
         const fileURL = new URL (url, this .getExecutionContext () .getBaseURL ());

         try
         {
            if (fileURL .pathname .endsWith (".gif") || fileURL .href .match (/^\s*data:image\/gif[;,]/s))
            {
               const
                  data = await this .loadDocument (fileURL),
                  div  = document .createElement ("div"),
                  img  = document .createElement ("img");

               div .append (img);

               const gif = await new Promise ((resolve, reject) =>
               {
                  const gif = new SuperGif ({ gif: img, on_error: type => reject (new Error (type)) });

                  gif .load_raw (new Uint8Array (data), () => resolve (gif));
               });

               this .setGif (gif);
               return;
            }
            else if (fileURL .pathname .endsWith (".png") || fileURL .href .match (/^\s*data:image\/png[;,]/s))
            {
               const
                  data      = await this .loadDocument (fileURL),
                  parseAPNG = DEVELOPMENT ? window ["apng-js"] .default : APNG .default,
                  apng      = await parseAPNG (data);

               this .setAPNG (apng);
               return;
            }
            else
            {
               if (fileURL .protocol !== "data:")
               {
                  if (!this .getCache ())
                     fileURL .searchParams .set ("_", Date .now ());
               }

               const
                  audioContext = this .getBrowser () .getAudioContext (),
                  video        = await this .loadVideo (fileURL);

               video .loadeddata = null;
               video .onerror    = null;
               video .onabort    = null;

               this .sourceNode = audioContext .createMediaElementSource (video);
               this .sourceNode .connect (this .getAudioSource ());

               this .setVideo (video, fileURL);
               return;
            }
         }
         catch (error)
         {
            console .warn (`Error loading movie '${decodeURI (fileURL)}':`, error .message);

            if (DEVELOPMENT)
               console .error (error);
         }
      }

      this .setMediaElement (null);
      this .clearTexture ();
      this .updateOutputs (0, 0, 0, -1);
      this .setLoadState (X3DConstants .FAILED_STATE);
   },
   loadDocument (fileURL)
   {
      return new Promise ((resolve, reject) =>
      {
         new FileLoader (this, { dataAsString: false }) .loadDocument ([fileURL], async data =>
         {
            if (data instanceof ArrayBuffer)
               resolve (data);
            else
               reject (new Error (`${this .getTypeName ()}: No suitable file handler found.`));
         });
      });
   },
   loadVideo (fileURL)
   {
      return new Promise ((resolve, reject) =>
      {
         const video = document .createElement ("video");

         video .onloadeddata = () => resolve (video);

         video .onerror =
         video .onabort = event => reject (new Error (`Couldn't load video '${fileURL}': ${event .type}.`));

         video .crossOrigin = "anonymous";
         video .preload     = "auto";
         video .playsInline = true;
         video .src         = fileURL;
      });
   },
   setGif (gif)
   {
      GifMedia (gif, this);

      const { width, height } = gif .get_canvas ();

      this .setMediaElement (gif);
      this .setTextureData (width, height, true, false, gif .get_frames () [0] .data);
      this .updateOutputs (width, height, 4, gif .duration);
      this .setLoadState (X3DConstants .COMPLETE_STATE);

      this .set_speed__ ();
   },
   async setAPNG (apng)
   {
      await PNGMedia (apng, this);

      const { width, height, duration, currentFrame } = apng;

      this .setMediaElement (apng);
      this .setTextureData (width, height, true, false, currentFrame);
      this .updateOutputs (width, height, 4, duration);
      this .setLoadState (X3DConstants .COMPLETE_STATE);

      this .set_speed__ ();
   },
   setVideo (video, fileURL)
   {
      if (DEVELOPMENT)
      {
         if (fileURL .protocol !== "data:")
            console .info (`Done loading ${this .getTypeName ()} '${decodeURI (fileURL)}'.`);
      }

      const
         width  = video .videoWidth,
         height = video .videoHeight;

      video .currentFrame = video;

      this .setMediaElement (video);
      this .setTextureData (width, height, true, false, video);
      this .updateOutputs (width, height, 3, video .duration);
      this .setLoadState (X3DConstants .COMPLETE_STATE);

      this .set_speed__ ();
   },
   updateOutputs (width, height, colorDepth, duration)
   {
      this ._width            = width;
      this ._height           = height;
      this ._colorDepth       = colorDepth;
      this ._duration_changed = duration;
   },
   set_speed__ ()
   {
      const media = this .getMediaElement ();

      if (!media)
         return;

      try
      {
         // Chrome throws an error if playbackRate is negative.
         media .playbackRate = this ._speed .getValue () * Math .max (this ._pitch .getValue (), 0);
      }
      catch (error)
      {
         console .error (error .message);

         media .playbackRate = 1;
      }

      media .preservesPitch = this ._pitch .getValue () === 1;
   },
   set_time ()
   {
      X3DSoundSourceNode .prototype .set_time .call (this);

      const media = this .getMediaElement ();

      if (media)
         this .updateTextureData (media .currentFrame);
   },
   dispose ()
   {
      X3DUrlObject       .prototype .dispose .call (this);
      X3DSoundSourceNode .prototype .dispose .call (this);
      X3DTexture2DNode   .prototype .dispose .call (this);
   },
});

Object .defineProperties (MovieTexture,
{
   ... X3DNode .getStaticProperties ("MovieTexture", "Texturing", 3, "texture", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "load",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "url",                  new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefresh",          new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefreshTimeLimit", new Fields .SFTime (3600)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "gain",                 new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pitch",                new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "speed",                new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "loop",                 new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "startTime",            new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "resumeTime",           new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pauseTime",            new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "stopTime",             new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isPaused",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "elapsedTime",          new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "width",                new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "height",               new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "colorDepth",           new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "hasSound",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "duration_changed",     new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties",    new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default MovieTexture;
