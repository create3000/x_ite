import X3DFlyViewer from "../Navigation/X3DFlyViewer.js";
import Vector3      from "../../../standard/Math/Numbers/Vector3.js";

const GAMEPAD_SPEED_FACTOR = new Vector3 (300, 300, 400);

Object .assign (X3DFlyViewer .prototype,
{
   gamepads: (function ()
   {
      const axis = new Vector3 ();

      return function (gamepads)
      {
         const gamepad = gamepads .find (({ axes }) => axes [2] || axes [3]);

         if (!gamepad)
         {
            this .startTime = Date .now ();
            return;
         }

         const
            button0 = gamepad .buttons [0] .pressed,
            button1 = gamepad .buttons [1] .pressed;

         if (button1)
         {
            axis
               .set (gamepad .axes [2], -gamepad .axes [3], 0)
               .multVec (GAMEPAD_SPEED_FACTOR);

            // Moving average.
            this .direction .add (axis) .divide (2);

            this .pan ();
         }
         else // default
         {
            axis
               .set (gamepad .axes [2], 0, gamepad .axes [3])
               .multVec (GAMEPAD_SPEED_FACTOR)
               .multiply (button0 ? 2 : 1);

            // Moving average.
            this .direction .add (axis) .divide (2);

            this .fly ();
         }
      };
   })(),
});
