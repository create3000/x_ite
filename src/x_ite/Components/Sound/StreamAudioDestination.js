import Fields                  from "../../Fields.js";
import X3DFieldDefinition      from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../../Base/FieldDefinitionArray.js";
import X3DNode                 from "../Core/X3DNode.js";
import X3DSoundDestinationNode from "./X3DSoundDestinationNode.js";
import X3DConstants            from "../../Base/X3DConstants.js";

/**
 * THIS NODE IS NOT SUPPORTED.
 */

function StreamAudioDestination (executionContext)
{
   X3DSoundDestinationNode .call (this, executionContext);

   this .addType (X3DConstants .StreamAudioDestination);
}

Object .assign (Object .setPrototypeOf (StreamAudioDestination .prototype, X3DSoundDestinationNode .prototype),
{
   initialize ()
   {
      X3DSoundDestinationNode .prototype .initialize .call (this);

      this ._mediaDeviceID .addInterest ("set_mediaDeviceID__", this);

      this .set_mediaDeviceID__ ();
   },
   getSoundDestination ()
   {
      return;
   },
   set_enabled__ () { /* remove this function if implemented */ },
   set_mediaDeviceID__ ()
   {

   },
});

Object .defineProperties (StreamAudioDestination,
{
   ... X3DNode .getStaticProperties ("StreamAudioDestination", "Sound", 2, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",              new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",           new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",               new Fields .SFBool (true)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "gain",                  new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mediaDeviceID",         new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "streamIdentifier",      new Fields .MFString ()),

         new X3DFieldDefinition (X3DConstants .inputOutput, "channelCount",          new Fields .SFInt32 ()), // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput, "channelCountMode",      new Fields .SFString ("MAX")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "channelInterpretation", new Fields .SFString ("SPEAKERS")),

         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "children",              new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default StreamAudioDestination;
