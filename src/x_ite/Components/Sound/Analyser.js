import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DSoundProcessingNode from "./X3DSoundProcessingNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import Algorithm              from "../../../standard/Math/Algorithm.js";

function Analyser (executionContext)
{
   X3DSoundProcessingNode .call (this, executionContext);

   this .addType (X3DConstants .Analyser);

   const audioContext = this .getBrowser () .getAudioContext ();

   this .analyserNode       = new AnalyserNode (audioContext);
   this .byteFrequencyData  = new Uint8Array (this .analyserNode .frequencyBinCount);
   this .byteTimeDomainData = new Uint8Array (this .analyserNode .frequencyBinCount);

   this .analyserNode .connect (this .getAudioSource ());
}

Object .assign (Object .setPrototypeOf (Analyser .prototype, X3DSoundProcessingNode .prototype),
{
   initialize ()
   {
      X3DSoundProcessingNode .prototype .initialize .call (this);

      this ._fftSize               .addInterest ("set_fftSize__",               this);
      this ._minDecibels           .addInterest ("set_decibels__",              this);
      this ._maxDecibels           .addInterest ("set_decibels__",              this);
      this ._smoothingTimeConstant .addInterest ("set_smoothingTimeConstant__", this);

      this .setSoundProcessor (this .analyserNode);

      this .set_fftSize__ ();
      this .set_decibels__ ();
      this .set_smoothingTimeConstant__ ();
   },
   set_fftSize__ ()
   {
      this .analyserNode .fftSize = Algorithm .clamp (Algorithm .nextPowerOfTwo (this ._fftSize .getValue ()), 32, 32768);

      this ._frequencyBinCount = this .analyserNode .frequencyBinCount;
   },
   set_decibels__ ()
   {
      const
         minDecibels = Math .min (this ._minDecibels .getValue (), 0),
         maxDecibels = Math .min (this ._maxDecibels .getValue (), 0);

      this .analyserNode .minDecibels = Math .min (minDecibels, maxDecibels);
      this .analyserNode .maxDecibels = Math .max (minDecibels, maxDecibels);
   },
   set_smoothingTimeConstant__ ()
   {
      this .analyserNode .smoothingTimeConstant = Algorithm .clamp (this ._smoothingTimeConstant .getValue (), 0, 1);
   },
   set_time ()
   {
      X3DSoundProcessingNode .prototype .set_time .call (this);

      const
         analyserNode      = this .analyserNode,
         frequencyBinCount = analyserNode .frequencyBinCount;

      if (this .byteFrequencyData .length !== frequencyBinCount)
      {
         this .byteFrequencyData  = new Uint8Array (frequencyBinCount);
         this .byteTimeDomainData = new Uint8Array (frequencyBinCount);
      }

      this ._byteFrequencyData   .length = frequencyBinCount;
      this ._byteTimeDomainData  .length = frequencyBinCount;
      this ._floatFrequencyData  .length = frequencyBinCount;
      this ._floatTimeDomainData .length = frequencyBinCount;

      analyserNode .getByteFrequencyData  (this .byteFrequencyData);
      analyserNode .getByteTimeDomainData (this .byteTimeDomainData);

      this ._byteFrequencyData  .getValue () .set (this .byteFrequencyData);
      this ._byteTimeDomainData .getValue () .set (this .byteTimeDomainData);

      analyserNode .getFloatFrequencyData  (this ._floatFrequencyData  .shrinkToFit ());
      analyserNode .getFloatTimeDomainData (this ._floatTimeDomainData .shrinkToFit ());

      this ._byteFrequencyData   .addEvent ();
      this ._byteTimeDomainData  .addEvent ();
      this ._floatFrequencyData  .addEvent ();
      this ._floatTimeDomainData .addEvent ();
   },
});

Object .defineProperties (Analyser,
{
   ... X3DNode .getStaticProperties ("Analyser", "Sound", 2, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",              new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",           new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",               new Fields .SFBool (true)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "fftSize",               new Fields .SFInt32 (2048)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "minDecibels",           new Fields .SFFloat (-100)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "maxDecibels",           new Fields .SFFloat (-30)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "smoothingTimeConstant", new Fields .SFFloat (0.8)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "frequencyBinCount",     new Fields .SFInt32 ()), // skip test
         new X3DFieldDefinition (X3DConstants .outputOnly,  "byteFrequencyData",     new Fields .MFInt32 ()), // experimental
         new X3DFieldDefinition (X3DConstants .outputOnly,  "byteTimeDomainData",    new Fields .MFInt32 ()), // experimental
         new X3DFieldDefinition (X3DConstants .outputOnly,  "floatFrequencyData",    new Fields .MFFloat ()), // experimental
         new X3DFieldDefinition (X3DConstants .outputOnly,  "floatTimeDomainData",   new Fields .MFFloat ()), // experimental

         new X3DFieldDefinition (X3DConstants .inputOutput, "gain",                  new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "tailTime",              new Fields .SFTime (0)),
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

export default Analyser;
