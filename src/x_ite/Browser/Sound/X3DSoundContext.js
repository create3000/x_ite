import X3DConstants from "../../Base/X3DConstants.js";
import Fields       from "../../Fields.js";
import PeriodicWave from "../../Components/Sound/PeriodicWave.js";
import $            from "../../../lib/helper.js";
import _            from "../../../locale/gettext.js";

const
   _audioContext        = Symbol (),
   _audioElements       = Symbol (),
   _startElements       = Symbol (),
   _defaultPeriodicWave = Symbol (),
   _noSoundButton       = Symbol (),
   _noSoundButtonId     = Symbol ();

function X3DSoundContext ()
{
   this .addChildObjects (X3DConstants .outputOnly, "audio", new Fields .SFBool ());

   this [_audioElements] = new Set ();
   this [_startElements] = new Map ();
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
   addAudioElement (element)
   {
      this [_audioElements] .add (element);

      this ._audio = this [_audioElements] .size;
   },
   removeAudioElement (element)
   {
      this [_audioElements] .delete (element);

      this ._audio = this [_audioElements] .size;
   },
   startAudioElement (audioElement, functionName = "play")
   {
      if (!audioElement)
         return;

      this [_startElements] .set (audioElement, functionName);

      this .startAudioElements ();
   },
   startAudioElements ()
   {
      for (const [audioElement, functionName] of this [_startElements])
      {
         audioElement [functionName] ()
            .then (() => this [_startElements] .delete (audioElement))
            .catch (Function .prototype)
            .finally (() => this .toggleNoSoundButton ());
      }
   },
   stopAudioElement (audioElement, functionName = "pause")
   {
      if (!audioElement)
         return;

      this [_startElements] .delete (audioElement);

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
            noSoundButton .part ?.add ("no-sound-button");

            noSoundButton .title      = _("Activate sound.");
            noSoundButton .onmouseup  = startAudioElements;
            noSoundButton .ontouchend = startAudioElements;

            this .getSurface () .querySelector (".x_ite-private-buttons") .append (noSoundButton);

            return noSoundButton;
         })();

         const
            count = !! this [_startElements] .size,
            fade  = count ? "x_ite-private-fade-in-300" : "x_ite-private-fade-out-300";

         if (count)
            this [_noSoundButton] .style .display = "";

         this [_noSoundButton] .classList .add (fade);

         await $.sleep (400);

         this [_noSoundButton] .classList .remove (fade);

         if (count !== !! this [_startElements] .size)
            return;

         if (!count)
            this [_noSoundButton] .style .display = "none";
      },
      200);
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
});

export default X3DSoundContext;
