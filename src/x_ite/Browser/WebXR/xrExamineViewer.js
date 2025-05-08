import ExamineViewer from "../Navigation/ExamineViewer.js";

const
   GAMEPAD_SPIN_FACTOR = 10,
   GAMEPAD_PAN_FACTOR  = 5,
   GAMEPAD_ZOOM_FACTOR = 1 / 200;

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

      const
         button0 = gamepad .buttons [0] .pressed,
         button1 = gamepad .buttons [1] .pressed;

      if (gamepads .button0 !== button0 || gamepads .button1 !== button1)
      {
         gamepads .button0 = button0;
         gamepads .button1 = button1;

         this .disconnect ();
      }

      if (button0)
      {
         gamepads .down = Date .now ();
      }
      else
      {
         gamepads .up     ??= 0;
         gamepads .clicks ??= 0;

         if (Date .now () - gamepad .down < 300)
            ++ gamepad .clicks;
         else
            gamepad .clicks = 0;

         if (gamepad .clicks === 2 && Date .now () - gamepads .up < 300)
         {
            gamepad .clicks = 0;

            this .dblclick ();
         }

         gamepads .up = Date .now ();
      }

      const f = 60 / this .getBrowser () .currentFrameRate;

      gamepads .action = true;

      if (button0)
      {
         this .zoom (gamepad .axes [3] * GAMEPAD_ZOOM_FACTOR * f, Math .sign (-gamepad .axes [3]));
      }
      else if (button1)
      {
         // Pan
         this .startPan (0, 0);
         this .pan (-gamepad .axes [2] * GAMEPAD_PAN_FACTOR * f, gamepad .axes [3] * GAMEPAD_PAN_FACTOR * f);
      }
      else // default
      {
         // Rotate

         this .startRotate (0, 0, 1);
         this .rotate (-gamepad .axes [2] * GAMEPAD_SPIN_FACTOR * f, gamepad .axes [3] * GAMEPAD_SPIN_FACTOR * f);
      }
   },
});
