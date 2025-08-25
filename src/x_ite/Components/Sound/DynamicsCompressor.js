import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DSoundProcessingNode from "./X3DSoundProcessingNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import Algorithm from "../../../standard/Math/Algorithm.js";

function DynamicsCompressor (executionContext)
{
   X3DSoundProcessingNode .call (this, executionContext);

   this .addType (X3DConstants .DynamicsCompressor);

   const audioContext = this .getBrowser () .getAudioContext ();

   this .dynamicsCompressorNode = new DynamicsCompressorNode (audioContext);

   this .dynamicsCompressorNode .connect (this .getAudioSource ());
}

Object .assign (Object .setPrototypeOf (DynamicsCompressor .prototype, X3DSoundProcessingNode .prototype),
{
   initialize ()
   {
      X3DSoundProcessingNode .prototype .initialize .call (this);

      this ._attack    .addInterest ("set_attack__",    this);
      this ._knee      .addInterest ("set_knee__",      this);
      this ._ratio     .addInterest ("set_ratio__",     this);
      this ._release   .addInterest ("set_release__",   this);
      this ._threshold .addInterest ("set_threshold__", this);

      this .setSoundProcessor (this .dynamicsCompressorNode);

      this .set_attack__ ();
      this .set_knee__ ();
      this .set_ratio__ ();
      this .set_release__ ();
      this .set_threshold__ ();
   },
   set_attack__ ()
   {
      this .dynamicsCompressorNode .attack .value = Algorithm .clamp (this ._attack .getValue (), 0, 1);
   },
   set_knee__ ()
   {
      this .dynamicsCompressorNode .knee .value = Algorithm .clamp (this ._knee .getValue (), 0, 40);
   },
   set_ratio__ ()
   {
      this .dynamicsCompressorNode .ratio .value = Algorithm .clamp (this ._ratio .getValue (), 1, 20);
   },
   set_release__ ()
   {
      this .dynamicsCompressorNode .release .value = Algorithm .clamp (this ._release .getValue (), 0, 1);
   },
   set_threshold__ ()
   {
      this .dynamicsCompressorNode .threshold .value = Algorithm .clamp (this ._threshold .getValue (), -100, 0);
   },
   set_time ()
   {
      this ._reduction = this .dynamicsCompressorNode .reduction;

      X3DSoundProcessingNode .prototype .set_time .call (this);
   },
});

Object .defineProperties (DynamicsCompressor,
{
   ... X3DNode .getStaticProperties ("DynamicsCompressor", "Sound", 2, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",              new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",           new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",               new Fields .SFBool (true)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "gain",                  new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "tailTime",              new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "attack",                new Fields .SFTime (0.003)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "knee",                  new Fields .SFFloat (30)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "ratio",                 new Fields .SFFloat (12)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "release",               new Fields .SFTime (0.25)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "threshold",             new Fields .SFFloat (-24)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "reduction",             new Fields .SFFloat ()),

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

export default DynamicsCompressor;
