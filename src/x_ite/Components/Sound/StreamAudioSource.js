import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DSoundSourceNode   from "./X3DSoundSourceNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

/**
 * THIS NODE IS NOT SUPPORTED.
 */

function StreamAudioSource (executionContext)
{
   X3DSoundSourceNode .call (this, executionContext);

   this .addType (X3DConstants .StreamAudioSource);

   this .addChildObjects (X3DConstants .inputOutput, "loop", new Fields .SFBool ());
}

Object .assign (Object .setPrototypeOf (StreamAudioSource .prototype, X3DSoundSourceNode .prototype),
{
   initialize ()
   {
      X3DSoundSourceNode .prototype .initialize .call (this);
   },
});


Object .defineProperties (StreamAudioSource,
{
   ... X3DNode .getStaticProperties ("StreamAudioSource", "Sound", 2, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",      new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",          new Fields .SFBool (true)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "gain",             new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "streamIdentifier", new Fields .MFString ()),

         new X3DFieldDefinition (X3DConstants .inputOutput, "startTime",        new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "resumeTime",       new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pauseTime",        new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "stopTime",         new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isPaused",         new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",         new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "elapsedTime",      new Fields .SFTime ()),
      ]),
      enumerable: true,
   },
});

export default StreamAudioSource;
