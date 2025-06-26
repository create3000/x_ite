import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DSoundProcessingNode from "./X3DSoundProcessingNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import Algorithm              from "../../../standard/Math/Algorithm.js";

function Delay (executionContext)
{
   X3DSoundProcessingNode .call (this, executionContext);

   this .addType (X3DConstants .Delay);
}

Object .assign (Object .setPrototypeOf (Delay .prototype, X3DSoundProcessingNode .prototype),
{
   initialize ()
   {
      X3DSoundProcessingNode .prototype .initialize .call (this);

      this ._maxDelayTime .addInterest ("set_maxDelayTime__", this);
      this ._delayTime    .addInterest ("set_delayTime__",    this);

      this .set_maxDelayTime__ ();
   },
   set_delayTime__ ()
   {
      const
         maxDelayTime = Math .max (this ._maxDelayTime .getValue (), 0),
         delayTime    = Algorithm .clamp (this ._delayTime .getValue (), 0, maxDelayTime);

      this .delayNode .delayTime .value = delayTime;
   },
   set_maxDelayTime__ ()
   {
      this .delayNode ?.disconnect ();

      this .delayNode = this .createSoundProcessor ();

      this .delayNode .connect (this .getAudioSource ());

      this .setSoundProcessor (this .delayNode);
   },
   createSoundProcessor ()
   {
      const
         audioContext = this .getBrowser () .getAudioContext (),
         maxDelayTime = Math .max (this ._maxDelayTime .getValue (), 0),
         delayTime    = Algorithm .clamp (this ._delayTime .getValue (), 0, maxDelayTime),
         delayNode    = new DelayNode (audioContext, { maxDelayTime, delayTime });

      return delayNode;
   },
});

Object .defineProperties (Delay,
{
   ... X3DNode .getStaticProperties ("Delay", "Sound", 2, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",              new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",           new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",               new Fields .SFBool (true)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "gain",                  new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "tailTime",              new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "maxDelayTime",          new Fields .SFTime (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "delayTime",             new Fields .SFTime (0)),

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

export default Delay;
