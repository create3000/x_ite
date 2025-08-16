import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DSoundChannelNode  from "./X3DSoundChannelNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function ChannelMerger (executionContext)
{
   X3DSoundChannelNode .call (this, executionContext);

   this .addType (X3DConstants .ChannelMerger);
}

Object .assign (Object .setPrototypeOf (ChannelMerger .prototype, X3DSoundChannelNode .prototype),
{
   initialize ()
   {
      X3DSoundChannelNode .prototype .initialize .call (this);

      this ._enabled .addInterest ("set_children__", this);
   },
   setChildNodes (childNodes)
   {
      this .channelMergerNode ?.disconnect ();

      if (this ._enabled .getValue ())
      {
         const
            audioContext   = this .getBrowser () .getAudioContext (),
            numberOfInputs = Algorithm .clamp (childNodes .length, 1, 32);

         if (this .channelMergerNode ?.numberOfInputs !== numberOfInputs)
            this .channelMergerNode = new ChannelMergerNode (audioContext, { numberOfInputs });

         this .channelMergerNode .connect (this .getAudioDestination ());
      }
      else
      {
         this .channelMergerNode = null;
      }
   },
   connectChildNode (i, childNode)
   {
      if (this .channelMergerNode)
      {
         if (i < 32)
            childNode .getAudioSource () .connect (this .channelMergerNode, 0, i);
      }
      else
      {
         childNode .getAudioSource () .connect (this .getAudioDestination ());
      }
   },
   disconnectChildNode (i, childNode)
   {
      if (this .channelMergerNode)
      {
         if (i < 32)
            childNode .getAudioSource () .disconnect (this .channelMergerNode, 0, i);
      }
      else
      {
         childNode .getAudioSource () .disconnect (this .getAudioDestination ());
      }
   },
});

Object .defineProperties (ChannelMerger,
{
   ... X3DNode .getStaticProperties ("ChannelMerger", "Sound", 2, "children", "4.0"),
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
      ]),
      enumerable: true,
   },
});

export default ChannelMerger;
