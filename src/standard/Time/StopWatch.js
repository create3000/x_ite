class StopWatch
{
   #startTime = 0;
   #stopTime = 0;
   cycles = 0;
   elapsedTime = 0;

   start ()
   {
      this .#startTime = Date .now ();
   }

   stop ()
   {
      if (this .#startTime <= this .#stopTime)
         return;

      this .#stopTime    = Date .now ();
      this .cycles      += 1;
      this .elapsedTime += this .#stopTime - this .#startTime;
   }

   reset ()
   {
      this .#startTime  = 0;
      this .#stopTime   = 0;
      this .cycles      = 0;
      this .elapsedTime = 0;
   }

   get averageTime ()
   {
      return this .cycles ? this .elapsedTime / this .cycles : 0;
   }
}

export default StopWatch;
