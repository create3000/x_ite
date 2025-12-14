import Fields                  from "../../Fields.js";
import X3DFieldDefinition      from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../../Base/FieldDefinitionArray.js";
import X3DNode                 from "../Core/X3DNode.js";
import X3DSoundDestinationNode from "./X3DSoundDestinationNode.js";
import X3DConstants            from "../../Base/X3DConstants.js";

function AudioDestination (executionContext)
{
   X3DSoundDestinationNode .call (this, executionContext);

   this .addType (X3DConstants .AudioDestination);

   const audioContext = this .getBrowser () .getAudioContext ();

   this .audioElement                    = new Audio ();
   this .mediaStreamAudioDestinationNode = new MediaStreamAudioDestinationNode (audioContext);
   this .audioElement .srcObject         = this .mediaStreamAudioDestinationNode .stream;
}

Object .assign (Object .setPrototypeOf (AudioDestination .prototype, X3DSoundDestinationNode .prototype),
{
   initialize ()
   {
      X3DSoundDestinationNode .prototype .initialize .call (this);

      const audioContext = this .getBrowser () .getAudioContext ();

      this ._mediaDeviceID .addInterest ("set_mediaDeviceID__", this);

      this ._maxChannelCount = audioContext .destination .maxChannelCount;

      this .set_mediaDeviceID__ ();
   },
   getSoundDestination ()
   {
      return this .mediaStreamAudioDestinationNode;
   },
   set_enabled__ ()
   {
      const
         browser = this .getBrowser (),
         active  = this ._enabled .getValue () && this .getLive () .getValue ();

      if (active)
         browser .startAudioElement (this .audioElement);
      else
         browser .stopAudioElement (this .audioElement);

      X3DSoundDestinationNode .prototype .set_enabled__ .call (this);
   },
   set_mediaDeviceID__ ()
   {
      this .getBrowser () .startAudioElement (this, "set_mediaDeviceID_impl__");
   },
   async set_mediaDeviceID_impl__ ()
   {
      const sinkId = this ._mediaDeviceID .getValue () || "default";

      return this .audioElement .setSinkId ?.(sinkId) ?? Promise .resolve ();
   },
});

Object .defineProperties (AudioDestination,
{
   ... X3DNode .getStaticProperties ("AudioDestination", "Sound", 2, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",              new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",           new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",               new Fields .SFBool (true)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "gain",                  new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mediaDeviceID",         new Fields .SFString ()),

         new X3DFieldDefinition (X3DConstants .inputOutput, "channelCount",          new Fields .SFInt32 ()), // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput, "channelCountMode",      new Fields .SFString ("MAX")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "channelInterpretation", new Fields .SFString ("SPEAKERS")),

         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "maxChannelCount",       new Fields .SFInt32 ()), // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput, "children",              new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default AudioDestination;
