async function PNGMedia (apng, movieTexture)
{

   const
      canvas = document .createElement ("canvas"),
      cx     = canvas .getContext ("2d"),
      player = await apng .getPlayer (cx);

   canvas .width  = apng .width;
   canvas .height = apng .height;

   Object .defineProperties (apng,
   {
      currentTime:
      {
         get ()
         {
            return player .ended
               ? this .duration
               : player .currentFrameNumber / apng .frames .length * this .duration;
         },
         set ()
         {
            player .stop ();
         },
      },
      duration:
      {
         get ()
         {
            return apng .playTime / 1000;
         },
      },
      loop:
      {
         get ()
         {
            return apng .numPlays === 0;
         },
         set (value)
         {
            apng .numPlays = value ? 0 : 1;
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
            return canvas;
         },
      },
      play:
      {
         value ()
         {
            player .play ();
            return Promise .resolve ();
         },
      },
      pause:
      {
         value ()
         {
            player .pause ();
         },
      },
      playbackRate:
      {
         get ()
         {
            return player .playbackRate;
         },
         set (value)
         {
            player .playbackRate = value;
         },
      },
   });
}

export default PNGMedia;
