import PeriodicWave from "../../Components/Sound/PeriodicWave.js";
import X3DObject    from "../../Base/X3DObject.js";

const
   _audioElements       = Symbol (),
   _audioContext        = Symbol (),
   _defaultPeriodicWave = Symbol ();

function X3DSoundContext ()
{
   this [_audioElements] = new Map ();
}

Object .assign (X3DSoundContext .prototype,
{
   initialize ()
   {
      const id = `X3DSoundContext-${this .getId ()}`;

      const events = [
         "blur",
         "click",
         "contextmenu",
         "dblclick",
         "focus",
         "keydown",
         "keyup",
         "mousedown",
         "mouseup",
         "mousewheel",
         "pointerup",
         "touchend",
         "touchmove",
         "touchstart",
      ]
      .map (event => `${event}.${id}`);

      this .getCanvas () .on (events .join (" "), () => this .startAudioElements ());
   },
   getAudioContext ()
   {
      return this [_audioContext] ??= (() =>
      {
         const audioContext = new AudioContext ();

         this .startAudioElement (audioContext, "resume");

         return audioContext;
      })();
   },
   getDefaultPeriodicWave ()
   {
      return this [_defaultPeriodicWave] ??= (() =>
      {
         const defaultPeriodicWave = new PeriodicWave (this .getPrivateScene ());

         defaultPeriodicWave .setPrivate (true);
         defaultPeriodicWave .setup ();

         return defaultPeriodicWave;
      })();
   },
   startAudioElements ()
   {
      for (const [audioElement, functionName] of this [_audioElements])
      {
         audioElement [functionName] ()
            .then (() => this [_audioElements] .delete (audioElement))
            .catch (Function .prototype);
      }
   },
   startAudioElement (audioElement, functionName = "play")
   {
      if (!audioElement)
         return;

      this [_audioElements] .set (audioElement, functionName);

      this .startAudioElements ();
   },
   stopAudioElement (audioElement, functionName = "pause")
   {
      if (!audioElement)
         return;

      this [_audioElements] .delete (audioElement);

      audioElement [functionName] ();
   },
});

export default X3DSoundContext;
