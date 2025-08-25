import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DSoundProcessingNode from "./X3DSoundProcessingNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import Algorithm              from "../../../standard/Math/Algorithm.js";

function Convolver (executionContext)
{
   X3DSoundProcessingNode .call (this, executionContext);

   this .addType (X3DConstants .Convolver);

   const audioContext = this .getBrowser () .getAudioContext ();

   this .convolverNode = new ConvolverNode (audioContext);

   this .convolverNode .connect (this .getAudioSource ());
}

Object .assign (Object .setPrototypeOf (Convolver .prototype, X3DSoundProcessingNode .prototype),
{
   initialize ()
   {
      X3DSoundProcessingNode .prototype .initialize .call (this);

      this ._numberOfChannels .addInterest ("set_buffer__",    this);
      this ._buffer           .addInterest ("set_buffer__",    this);
      this ._normalize        .addInterest ("set_normalize__", this);

      this .setSoundProcessor (this .convolverNode);

      this .set_buffer__ ();
      this .set_normalize__ ();
   },
   set_buffer__ ()
   {
      const
         audioContext     = this .getBrowser () .getAudioContext (),
         numberOfChannels = Algorithm .clamp (this ._numberOfChannels .getValue (), 1, 32),
         sampleRate       = audioContext .sampleRate,
         bufferLength     = Math .max (Math .floor (this ._buffer .length / numberOfChannels), 1),
         audioBuffer      = audioContext .createBuffer (numberOfChannels, bufferLength, sampleRate),
         buffer           = this ._buffer .getValue ();

      if (this ._buffer .length >= bufferLength * numberOfChannels)
      {
         for (let i = 0; i < numberOfChannels; ++ i)
         {
            const channelData = audioBuffer .getChannelData (i);

            channelData .set (buffer .subarray (i * bufferLength, (i + 1) * bufferLength));
         }
      }

      this .convolverNode .buffer = audioBuffer;
   },
   set_normalize__ ()
   {
      this .convolverNode .normalize = this ._normalize .getValue ();
   },
});

Object .defineProperties (Convolver,
{
   ... X3DNode .getStaticProperties ("Convolver", "Sound", 2, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",              new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",           new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",               new Fields .SFBool (true)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "numberOfChannels",      new Fields .SFInt32 ()), // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput, "buffer",                new Fields .MFFloat ()),

         new X3DFieldDefinition (X3DConstants .inputOutput, "gain",                  new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "tailTime",              new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalize",             new Fields .SFBool ()),

         new X3DFieldDefinition (X3DConstants .inputOutput, "channelCount",          new Fields .SFInt32 ()), // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput, "channelCountMode",      new Fields .SFString ("MAX")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "channelInterpretation", new Fields .SFString ("SPEAKERS")),

         new X3DFieldDefinition (X3DConstants .inputOutput, "startTime",             new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "resumeTime",            new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pauseTime",             new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "stopTime",              new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isPaused",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "elapsedTime",           new Fields .SFTime ()),

         new X3DFieldDefinition (X3DConstants .inputOutput, "children",              new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default Convolver;
