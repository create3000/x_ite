import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DSoundProcessingNode from "./X3DSoundProcessingNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";

function WaveShaper (executionContext)
{
   X3DSoundProcessingNode .call (this, executionContext);

   this .addType (X3DConstants .WaveShaper);

   const audioContext = this .getBrowser () .getAudioContext ();

   this .waveShaperNode = new WaveShaperNode (audioContext);

   this .waveShaperNode .connect (this .getAudioSource ());
}

Object .assign (Object .setPrototypeOf (WaveShaper .prototype, X3DSoundProcessingNode .prototype),
{
   initialize ()
   {
      X3DSoundProcessingNode .prototype .initialize .call (this);

      this ._curve      .addInterest ("set_curve__",      this);
      this ._oversample .addInterest ("set_oversample__", this);

      this .setSoundProcessor (this .waveShaperNode);

      this .set_curve__ ();
      this .set_oversample__ ();
   },
   set_curve__ ()
   {
      this .waveShaperNode .curve = this ._curve .length < 2
         ? new Float32Array (2)
         : this ._curve .shrinkToFit ();
   },
   set_oversample__: (() =>
   {
      const oversampleTypes = new Map ([
         ["NONE", "none"],
         ["2X",   "2x"],
         ["4X",   "4x"],
      ]);

      return function ()
      {
         this .waveShaperNode .oversample = oversampleTypes .get (this ._oversample .getValue ()) ?? "none";
      };
   })(),
});

Object .defineProperties (WaveShaper,
{
   ... X3DNode .getStaticProperties ("WaveShaper", "Sound", 2, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",              new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",           new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",               new Fields .SFBool (true)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "gain",                  new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "tailTime",              new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "curve",                 new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "oversample",            new Fields .SFString ("NONE")),

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

export default WaveShaper;
