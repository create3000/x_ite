import Vector3 from "../../../standard/Math/Numbers/Vector3.js";

const
   _currentTime      = Symbol (),
   _currentFrameRate = Symbol (),
   _currentPosition  = Symbol (),
   _currentSpeed     = Symbol ();

function X3DTimeContext ()
{
   this [_currentTime]      = Date .now () / 1000;
   this [_currentFrameRate] = 60;
   this [_currentPosition]  = new Vector3 ();
   this [_currentSpeed]     = 0;
}

Object .assign (X3DTimeContext .prototype,
{
   getCurrentTime ()
   {
      return this [_currentTime];
   },
   getCurrentFrameRate ()
   {
      return this [_currentFrameRate];
   },
   getCurrentSpeed ()
   {
      return this [_currentSpeed];
   },
   advanceOnlyTime ()
   {
      this [_currentTime] = Date .now () / 1000;
   },
   advanceTime: (() =>
   {
      const lastPosition = new Vector3 ();

      return function ()
      {
         const
            time          = Date .now () / 1000,
            interval      = time - this [_currentTime],
            viewpointNode = this .getActiveViewpoint ();

         this [_currentTime]      = time;
         this [_currentFrameRate] = interval ? 1 / interval : 60;

         if (viewpointNode)
         {
            const cameraSpaceMatrix = viewpointNode .getCameraSpaceMatrix ();

            lastPosition .assign (this [_currentPosition]);
            this [_currentPosition] .set (cameraSpaceMatrix [12], cameraSpaceMatrix [13], cameraSpaceMatrix [14]);

            this [_currentSpeed] = lastPosition .distance (this [_currentPosition]) * this [_currentFrameRate];
         }
         else
         {
            this [_currentSpeed] = 0;
         }

         if (this [_currentSpeed] > 0)
            this .addBrowserEvent ();
      };
   })(),
});

export default X3DTimeContext;
