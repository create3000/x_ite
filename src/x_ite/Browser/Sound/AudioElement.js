
export default
{
   create (audioContext, audioSource, audioBuffer)
   {
      let
         audioBufferSource = new AudioBufferSourceNode (audioContext),
         detune            = 0,
         playbackRate      = 1,
         loopStart         = 0,
         loopEnd           = 0,
         loop              = false,
         startTime         = 0,
         currentTime       = 0,
         active            = false;

      return Object .defineProperties ({ },
      {
         detune:
         {
            get ()
            {
               return detune;
            },
            set (value)
            {
               detune                           = value;
               audioBufferSource .detune .value = value;
            },
         },
         playbackRate:
         {
            get ()
            {
               return playbackRate;
            },
            set (value)
            {
               playbackRate                           = value;
               audioBufferSource .playbackRate .value = value;
            },
         },
         loopStart:
         {
            get ()
            {
               return loopStart;
            },
            set (value)
            {
               loopStart                    = value;
               audioBufferSource .loopStart = value;
            },
         },
         loopEnd:
         {
            get ()
            {
               return loopEnd;
            },
            set (value)
            {
               loopEnd                    = value;
               audioBufferSource .loopEnd = value;
            },
         },
         loop:
         {
            get ()
            {
               return loop;
            },
            set (value)
            {
               if (!value)
                  startTime = audioContext .currentTime - this .currentTime;

               loop                    = value;
               audioBufferSource .loop = value;
            },
         },
         currentTime:
         {
            get ()
            {
               if (active)
               {
                  if (this .duration)
                  {
                     if (this .loop)
                        return (audioContext .currentTime - startTime) % this .duration;

                     return audioContext .currentTime - startTime;
                  }

                  return 0;
               }

               return currentTime;
            },
            set (value)
            {
               currentTime = value;
               startTime   = audioContext .currentTime - currentTime;

               if (!active)
                  return;

               this .pause ();
               this .play ();
            },
         },
         duration:
         {
            value: audioBuffer ?.duration ?? 0,
         },
         play:
         {
            value ()
            {
               if (active)
                  return Promise .resolve ();

               audioBufferSource = new AudioBufferSourceNode (audioContext);

               audioBufferSource .buffer              = audioBuffer;
               audioBufferSource .loopStart           = loopStart;
               audioBufferSource .loopEnd             = loopEnd;
               audioBufferSource .loop                = loop;
               audioBufferSource .playbackRate .value = playbackRate;

               audioBufferSource .connect (audioSource);
               audioBufferSource .start (0, currentTime);

               startTime = audioContext .currentTime - currentTime;
               active    = true;

               return Promise .resolve ();
            },
         },
         pause:
         {
            value ()
            {
               if (!active)
                  return;

               audioBufferSource .stop ();
               audioBufferSource .disconnect ();

               currentTime = this .currentTime;
               active      = false;

               // Create 1s silence to clear channels.

               const silence = new AudioBufferSourceNode (audioContext);

               silence .connect (audioSource);
               silence .start ();
               silence .stop (audioContext .currentTime + 1);
            },
         },
      });
   },
};
