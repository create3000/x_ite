import PeriodicWave from "../../Components/Sound/PeriodicWave.js";
import _            from "../../../locale/gettext.js";

const
   _audioElements       = Symbol (),
   _audioContext        = Symbol (),
   _defaultPeriodicWave = Symbol (),
   _noSoundButton       = Symbol (),
   _noSoundButtonId     = Symbol ();

function X3DSoundContext ()
{
   this [_audioElements] = new Map ();
}

Object .assign (X3DSoundContext .prototype,
{
   initialize ()
   {
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
         "pointerup",
         "touchend",
         "touchstart",
         "wheel",
      ];

      for (const event of events)
         this .getCanvas () .addEventListener (event, () => this .startAudioElements ());
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

         defaultPeriodicWave .setup ();

         return defaultPeriodicWave;
      })();
   },
   startAudioElement (audioElement, functionName = "play")
   {
      if (!audioElement)
         return;

      this [_audioElements] .set (audioElement, functionName);

      this .startAudioElements ();
   },
   startAudioElements ()
   {
      for (const [audioElement, functionName] of this [_audioElements])
      {
         audioElement [functionName] ()
            .then (() => this [_audioElements] .delete (audioElement))
            .catch (Function .prototype)
            .finally (() => this .toggleNoSoundButton ());
      }
   },
   stopAudioElement (audioElement, functionName = "pause")
   {
      if (!audioElement)
         return;

      this [_audioElements] .delete (audioElement);

      audioElement [functionName] ();

      this .toggleNoSoundButton ();
   },
   toggleNoSoundButton ()
   {
      clearTimeout (this [_noSoundButtonId]);

      this [_noSoundButtonId] = setTimeout (async () =>
      {
         this [_noSoundButton] ??= (() =>
         {
            const
               noSoundButton      = document .createElement ("div"),
               startAudioElements = () => this .startAudioElements ();

            noSoundButton .classList .add ("x_ite-private-no-sound-button", "x_ite-private-button");
            noSoundButton .part .add ("no-sound-button");

            noSoundButton .title      = _("Activate sound.");
            noSoundButton .onmouseup  = startAudioElements;
            noSoundButton .ontouchend = startAudioElements;

            this .getSurface () .querySelector (".x_ite-private-buttons") .append (noSoundButton);

            return noSoundButton;
         })();

         const
            count = !! this [_audioElements] .size,
            fade  = count ? "x_ite-private-fade-in-300" : "x_ite-private-fade-out-300";

         if (count)
            this [_noSoundButton] .style .display = "";

         this [_noSoundButton] .classList .add (fade);

         await $.sleep (400);

         this [_noSoundButton] .classList .remove (fade);

         if (count !== !! this [_audioElements] .size)
            return;

         if (!count)
            this [_noSoundButton] .style .display = "none";
      },
      200);
   },
});

export default X3DSoundContext;
