import X3DNode              from "../Core/X3DNode.js";
import X3DSoundNode         from "./X3DSoundNode.js";
import X3DTimeDependentNode from "../Time/X3DTimeDependentNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function X3DSoundSourceNode (executionContext)
{
   X3DSoundNode         .call (this, executionContext);
   X3DTimeDependentNode .call (this, executionContext);

   this .addType (X3DConstants .X3DSoundSourceNode);

   const audioContext = this .getBrowser () .getAudioContext ();

   this .audioSource  = new GainNode (audioContext, { gain: 0 });
   this .mediaElement = null;
}

Object .assign (Object .setPrototypeOf (X3DSoundSourceNode .prototype, X3DSoundNode .prototype),
   X3DTimeDependentNode .prototype,
{
   initialize ()
   {
      X3DSoundNode         .prototype .initialize .call (this);
      X3DTimeDependentNode .prototype .initialize .call (this);

      this ._gain .addInterest ("set_gain__", this);

      this .set_gain__ ();
   },
   getAudioSource ()
   {
      return this .audioSource;
   },
   getMediaElement ()
   {
      return this .mediaElement;
   },
   setMediaElement (value)
   {
      this .getBrowser () .stopAudioElement (this .mediaElement);

      this .mediaElement = value;

      if (!value)
         return;

      // Init mediaElement.

      this .set_loop ();

      // Handle events.

      this .resetElapsedTime ();

      if (this ._isActive .getValue ())
      {
         if (this ._isPaused .getValue ())
         {
            this .set_pause ();
         }
         else
         {
            if (this .getLive () .getValue ())
               this .set_start ();
            else
               this .set_pause ();
         }
      }
      else
      {
         this .set_stop ();
      }
   },
   set_gain__ ()
   {
      this .audioSource .gain .value = this ._gain .getValue ();
   },
   set_loop ()
   {
      if (!this .mediaElement)
         return;

      this .mediaElement .loop = this ._loop .getValue ();
   },
   set_start ()
   {
      if (!this .mediaElement)
         return;

      this .mediaElement .currentTime = 0;

      this .getBrowser () .startAudioElement (this .mediaElement);
   },
   set_pause ()
   {
      this .getBrowser () .stopAudioElement (this .mediaElement);
   },
   set_resume ()
   {
      this .getBrowser () .startAudioElement (this .mediaElement);
   },
   set_stop ()
   {
      this .getBrowser () .stopAudioElement (this .mediaElement);
   },
   set_end ()
   {
      if (this ._loop .getValue ())
         return;

      this .stop ();
   },
   set_time ()
   {
      if (!this .mediaElement)
         return;

      this ._elapsedTime = this .getElapsedTime ();

      if (this .mediaElement .currentTime < this .mediaElement .duration)
         return;

      this .set_end ();
   },
   dispose ()
   {
      X3DTimeDependentNode .prototype .dispose .call (this);
      X3DSoundNode         .prototype .dispose .call (this);
   },
});

Object .defineProperties (X3DSoundSourceNode, X3DNode .getStaticProperties ("X3DSoundSourceNode", "Sound", 1));

export default X3DSoundSourceNode;
