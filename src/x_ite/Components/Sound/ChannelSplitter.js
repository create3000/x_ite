import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DSoundChannelNode  from "./X3DSoundChannelNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function ChannelSplitter (executionContext)
{
   X3DSoundChannelNode .call (this, executionContext);

   this .addType (X3DConstants .ChannelSplitter);

   this .outputNodes = [ ];
}

Object .assign (Object .setPrototypeOf (ChannelSplitter .prototype, X3DSoundChannelNode .prototype),
{
   initialize ()
   {
      X3DSoundChannelNode .prototype .initialize .call (this);

      this ._enabled .addInterest ("set_outputs__", this);
      this ._outputs .addInterest ("set_outputs__", this);

      this .set_outputs__ ();
   },
   set_outputs__ ()
   {
      if (this .channelSplitterNode)
      {
         this .channelSplitterNode .disconnect ();
      }
      else
      {
         for (const outputNode of this .outputNodes)
            this .getAudioSource () .disconnect (outputNode .getAudioDestination ());
      }

      this .outputNodes .length = 0;

      for (const child of this ._outputs)
      {
         const outputNode = X3DCast (X3DConstants .X3DChildNode, child);

         if (!outputNode)
            continue;

         const type = outputNode .getType ();

         for (let t = type .length - 1; t >= 0; -- t)
         {
            switch (type [t])
            {
               case X3DConstants .X3DSoundChannelNode:
               case X3DConstants .X3DSoundProcessingNode:
                  this .outputNodes .push (outputNode);
                  break;
               default:
                  continue;
            }

            break;
         }
      }

      if (this .channelSplitterNode)
         this .getAudioSource () .disconnect (this .channelSplitterNode);

      if (this ._enabled .getValue ())
      {
         const
            audioContext    = this .getBrowser () .getAudioContext (),
            numberOfOutputs = Algorithm .clamp (this .outputNodes .length, 1, 32);

         if (this .channelSplitterNode ?.numberOfOutputs !== numberOfOutputs)
            this .channelSplitterNode = new ChannelSplitterNode (audioContext, { numberOfOutputs });

         this .getAudioSource () .connect (this .channelSplitterNode);
      }
      else
      {
         this .channelSplitterNode = null;
      }

      if (this .channelSplitterNode)
      {
         const length = Math .min (this .outputNodes .length, 32);

         for (let i = 0; i < length; ++ i)
            this .channelSplitterNode .connect (this .outputNodes [i] .getAudioDestination (), i);
      }
      else
      {
         for (const outputNode of this .outputNodes)
            this .getAudioSource () .connect (outputNode .getAudioDestination ());
      }
   },
});

Object .defineProperties (ChannelSplitter,
{
   ... X3DNode .getStaticProperties ("ChannelSplitter", "Sound", 2, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",              new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",           new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",               new Fields .SFBool (true)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "gain",                  new Fields .SFFloat (1)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "channelCount",          new Fields .SFInt32 ()), // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput, "channelCountMode",      new Fields .SFString ("MAX")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "channelInterpretation", new Fields .SFString ("SPEAKERS")),

         new X3DFieldDefinition (X3DConstants .inputOutput, "children",              new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "outputs",               new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default ChannelSplitter;
