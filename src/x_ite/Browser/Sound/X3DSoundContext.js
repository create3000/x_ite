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

         defaultPeriodicWave .setup ();

         return defaultPeriodicWave;
      })();
   },
   startAudioElement (audioElement, functionName = "play", sound = true)
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
         this [_noSoundButton] ??= $("<div></div>")
            .attr ("part", "no-sound-button")
            .attr ("title", _("Activate sound."))
            .addClass (["x_ite-private-no-sound-button", "x_ite-private-button"])
            .on ("mouseup touchend", () => this .startAudioElements ())
            .appendTo (this .getSurface () .find (".x_ite-private-buttons"));

         const
            count   = this [_audioElements] .size,
            add     = count ? "x_ite-private-fade-in-300" : "x_ite-private-fade-out-300",
            display = count ? "show" : "hide";

         this [_noSoundButton] .addClass (add);

         await $.sleep (400);

         this [_noSoundButton] [display] () .removeClass (add);
      },
      200);
   },
});

export default X3DSoundContext;
