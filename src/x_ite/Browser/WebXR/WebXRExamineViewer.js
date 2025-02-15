import ExamineViewer from "../Navigation/ExamineViewer.js";

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
         if (gamepads .action)
         {
            gamepads .action = false;

            this .disconnect ();
         }

         return;
      }

      const button = gamepad .buttons [1] .pressed;

      if (gamepads .button !== button)
      {
         gamepads .button = button;

         this .disconnect ();
      }

      const f = 60 / this .getBrowser () .currentFrameRate;

      gamepads .action = true;

      if (button)
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
