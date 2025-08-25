import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DSoundChannelNode  from "./X3DSoundChannelNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function ChannelSelector (executionContext)
{
   X3DSoundChannelNode .call (this, executionContext);

   this .addType (X3DConstants .ChannelSelector);
}

Object .assign (Object .setPrototypeOf (ChannelSelector .prototype, X3DSoundChannelNode .prototype),
{
   initialize ()
   {
      X3DSoundChannelNode .prototype .initialize .call (this);

      this ._channelSelection .addInterest ("set_channelSelection__", this);

      this .set_channelSelection__ ();
   },
   set_channelSelection__ ()
   {
      const
         audioContext     = this .getBrowser () .getAudioContext (),
         channelSelection = Algorithm .clamp (this ._channelSelection .getValue (), 0, 31),
         numberOfOutputs  = channelSelection + 1;

      this .channelSplitterNode ?.disconnect ();

      if (this .channelSplitterNode ?.numberOfOutputs !== numberOfOutputs)
         this .channelSplitterNode = new ChannelSplitterNode (audioContext, { numberOfOutputs });

      this .channelSplitterNode .connect (this .getAudioSource (), channelSelection);

      this .setSoundProcessor (this .channelSplitterNode);
   },
});

Object .defineProperties (ChannelSelector,
{
   ... X3DNode .getStaticProperties ("ChannelSelector", "Sound", 2, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",              new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",           new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",               new Fields .SFBool (true)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "gain",                  new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "channelSelection",      new Fields .SFInt32 ()),

         new X3DFieldDefinition (X3DConstants .inputOutput, "channelCount",          new Fields .SFInt32 ()), // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput, "channelCountMode",      new Fields .SFString ("MAX")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "channelInterpretation", new Fields .SFString ("SPEAKERS")),

         new X3DFieldDefinition (X3DConstants .inputOutput, "children",              new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default ChannelSelector;
