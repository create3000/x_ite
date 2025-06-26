function GifMedia (gif, movieTexture)
{
   let
      playbackRate = 1,
      cycle        = 0,
      loop         = false;

   Object .defineProperties (gif,
   {
      currentTime:
      {
         get ()
         {
            if (!loop && cycle < this .cycle)
               return this .duration;

            return (movieTexture ._elapsedTime * playbackRate) % this .duration;
         },
         set: Function .prototype,
      },
      duration:
      {
         get ()
         {
            return this .get_duration_ms () / 1000;
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
            cycle = this .cycle;
            loop  = value;
         },
      },
      cycle:
      {
         get ()
         {
            return Math .floor (movieTexture ._elapsedTime / this .duration);
         },
      },
      currentFrame:
      {
         get ()
         {
            const length = this .get_length ();

            return this .get_frames () [Math .max (Math .ceil (this .currentTime / this .duration * length) - 1, 0)];
         },
      },
      play:
      {
         value ()
         {
            cycle = this .cycle;
            return Promise .resolve ();
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
            playbackRate = value;
         },
      },
   });

   gif .pause ();
}

export default GifMedia;
