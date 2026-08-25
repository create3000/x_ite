import X3DNode      from "../Core/X3DNode.js";
import X3DChildNode from "../Core/X3DChildNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

function X3DSoundNode (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .X3DSoundNode);

   // Private properties

   const audioContext = this .getBrowser () .getAudioContext ();

   this .soundDestination = new GainNode (audioContext, { gain: 0 });
}

Object .assign (Object .setPrototypeOf (X3DSoundNode .prototype, X3DChildNode .prototype),
{
   getSoundDestination ()
   {
      return this .soundDestination;
   },
   setEnabled (enabled)
   {
      const browser = this .getBrowser ();

      if (enabled)
         browser .addSoundNode (this);
      else
         browser .removeSoundNode (this);
   }
});

Object .defineProperties (X3DSoundNode, X3DNode .getStaticProperties ("X3DSoundNode", "Sound", 1));

export default X3DSoundNode;
