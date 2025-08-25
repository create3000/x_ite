import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DSoundSourceNode   from "./X3DSoundSourceNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function MicrophoneSource (executionContext)
{
   X3DSoundSourceNode .call (this, executionContext);

   this .addType (X3DConstants .MicrophoneSource);

   this .addChildObjects (X3DConstants .inputOutput, "loop", new Fields .SFBool ());
}

Object .assign (Object .setPrototypeOf (MicrophoneSource .prototype, X3DSoundSourceNode .prototype),
{
   initialize ()
   {
      X3DSoundSourceNode .prototype .initialize .call (this);

      this ._mediaDeviceID .addInterest ("set_mediaDeviceID__", this);
   },
   set_mediaDeviceID__ ()
   {
      this .set_stop ();

      if (this ._isActive .getValue ())
         this .set_start ();
   },
   set_start ()
   {
      if (!navigator .mediaDevices)
         return;

      this .restore = false;

      navigator .mediaDevices .getUserMedia ({
         audio:
         {
            deviceId: this ._mediaDeviceID .getValue (),
         },
      })
      .then (mediaStream =>
      {
         const audioContext = this .getBrowser () .getAudioContext ();

         this .mediaStreamAudioSourceNode = new MediaStreamAudioSourceNode (audioContext, { mediaStream });

         if (this ._isActive .getValue ())
         {
            if (this ._isPaused .getValue () || !this .getLive () .getValue ())
               this .set_pause ();
            else
               this .set_resume ();
         }
         else
         {
            this .set_stop ();
         }
      })
      .catch (error =>
      {
         console .error (error .message);
      });
   },
   set_pause ()
   {
      if (!this .mediaStreamAudioSourceNode)
         return;

      if (this .getLive () .getValue ())
      {
         this .mediaStreamAudioSourceNode .disconnect ();

         for (const track of this .mediaStreamAudioSourceNode .mediaStream .getAudioTracks ())
            track .enabled = false;

         for (const track of this .mediaStreamAudioSourceNode .mediaStream .getVideoTracks ())
            track .enabled = false;
      }
      else
      {
         this .set_stop (true);
      }
   },
   set_resume ()
   {
      if (this .restore)
         return this .set_start ();

      if (!this .mediaStreamAudioSourceNode)
         return;

      this .mediaStreamAudioSourceNode .connect (this .getAudioSource ());

      for (const track of this .mediaStreamAudioSourceNode .mediaStream .getAudioTracks ())
         track .enabled = true;

      for (const track of this .mediaStreamAudioSourceNode .mediaStream .getVideoTracks ())
         track .enabled = true;
   },
   set_stop (restore = false)
   {
      if (!this .mediaStreamAudioSourceNode)
         return;

      this .mediaStreamAudioSourceNode .disconnect ();

      for (const track of this .mediaStreamAudioSourceNode .mediaStream .getAudioTracks ())
         track .stop ();

      for (const track of this .mediaStreamAudioSourceNode .mediaStream .getVideoTracks ())
         track .stop ();

      this .mediaStreamAudioSourceNode = null;
      this .restore                    = restore;
   },
});

Object .defineProperties (MicrophoneSource,
{
   ... X3DNode .getStaticProperties ("MicrophoneSource", "Sound", 2, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",   new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",       new Fields .SFBool (true)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "gain",          new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mediaDeviceID", new Fields .SFString ()),

         new X3DFieldDefinition (X3DConstants .inputOutput, "startTime",     new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "resumeTime",    new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pauseTime",     new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "stopTime",      new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isPaused",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "elapsedTime",   new Fields .SFTime ()),
      ]),
      enumerable: true,
   },
});

export default MicrophoneSource;
