import ExamineViewer from "../Navigation/ExamineViewer.js";
import Vector3       from "../../../standard/Math/Numbers/Vector3.js";

const
   GAMEPAD_SPIN_FACTOR = 10,
   GAMEPAD_PAN_FACTOR  = 5;

Object .assign (ExamineViewer .prototype,
{
   gamepads (gamepads)
   {
      const gamepad = gamepads .find (({ axes }) => axes [2] || axes [3]);

      if (!gamepad)
      {
         const gamepad = gamepads .find (gamepad => gamepad .buttons [0] .pressed);

         if (gamepad && !gamepad .hit .sensors .size)
         {
            gamepads .action = true;

            this .zoom (1 / 200, gamepad .hit .id && !gamepad .buttons [1] .pressed ? 1 : -1);
         }
         else if (gamepads .action)
         {
            gamepads .action = false;

            this .disconnect ();
         }

         return;
      }

      const button1 = gamepad .buttons [1] .pressed;

      if (gamepads .button1 !== button1)
      {
         gamepads .button1 = button1;

         this .disconnect ();
      }

      const f = 60 / this .getBrowser () .currentFrameRate;

      gamepads .action = true;

      if (button1)
      {
         // Pan
         this .startPan (0, 0);
         this .pan (-gamepad .axes [2] * GAMEPAD_PAN_FACTOR * f, gamepad .axes [3] * GAMEPAD_PAN_FACTOR * f);
      }
      else // default
      {
         // Rotate

         this .startRotate (0, 0);
         this .rotate (-gamepad .axes [2] * GAMEPAD_SPIN_FACTOR * f, gamepad .axes [3] * GAMEPAD_SPIN_FACTOR * f);
      }
   },
});
