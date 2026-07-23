import X3DViewer         from "./X3DViewer.js";
import PositionChaser    from "../../Components/Followers/PositionChaser.js";
import OrientationChaser from "../../Components/Followers/OrientationChaser.js";
import Vector2           from "../../../standard/Math/Numbers/Vector2.js";
import Vector3           from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4         from "../../../standard/Math/Numbers/Rotation4.js";
import $                 from "../../../lib/helper.js";

const
   SLOW_SCROLL   = /Mac OS X|OculusBrowser/i .test (navigator .userAgent),
   SCROLL_FACTOR = SLOW_SCROLL ? 1 / 120 : 1 / 20,
   MOVE_TIME     = 0.3,
   ROTATE_TIME   = 0.3,
   DBL_TAP_TIME  = 0.4;

function LookAtViewer (executionContext, navigationInfo)
{
   X3DViewer .call (this, executionContext, navigationInfo);

   this .button                 = -1;
   this .fromVector             = new Vector3 ();
   this .toVector               = new Vector3 ();

   this .touch1                 = new Vector2 ();
   this .touch2                 = new Vector2 ();
   this .tapStart               = 0;

   this .positionChaser         = new PositionChaser (executionContext);
   this .centerOfRotationChaser = new PositionChaser (executionContext);
   this .orientationChaser      = new OrientationChaser (executionContext);
}

Object .assign (Object .setPrototypeOf (LookAtViewer .prototype, X3DViewer .prototype),
{
   initialize ()
   {
      X3DViewer .prototype .initialize .call (this);

      const
         browser = this .getBrowser (),
         surface = browser .getSurface ();

      // Bind pointing device events.

      $.on (this, surface, "mousedown", event => this .mousedown (event));
      $.on (this, surface, "mouseup",   event => this .mouseup   (event));
      $.on (this, surface, "dblclick",  event => this .dblclick  (event));
      $.on (this, surface, "wheel",     event => this .wheel     (event));

      $.on (this, surface, "touchstart", event => this .touchstart (event));
      $.on (this, surface, "touchend",   event => this .touchend   (event));

      // Setup chaser.

      this .positionChaser ._duration = MOVE_TIME;
      this .positionChaser .setup ();

      this .centerOfRotationChaser ._duration = MOVE_TIME;
      this .centerOfRotationChaser .setup ();

      this .orientationChaser ._duration = ROTATE_TIME;
      this .orientationChaser .setup ();
   },
   mousedown (event)
   {
      if (this .button >= 0)
         return;

      const { x, y } = this .getBrowser () .getPointerFromEvent (event);

      if (!this .isPointerInRectangle (x, y))
         return;

      switch (event .button)
      {
         case 0:
         {
            // Stop event propagation.

            event .preventDefault ();

            // Look around.

            this .button = event .button;

            $.on (this, document, "mouseup",   event => this .mouseup   (event));
            $.on (this, document, "mousemove", event => this .mousemove (event));
            $.on (this, document, "touchend",  event => this .touchend  (event));
            $.on (this, document, "touchmove", event => this .touchmove (event));

            this .getActiveViewpoint () .transitionStop ();
            this .trackballProjectToSphere (x, y, this .fromVector);

            this ._isActive = true;
            break;
         }
      }
   },
   mouseup (event)
   {
      if (event .button !== this .button)
         return;

      // Stop event propagation.

      event .preventDefault ();

      // Disable all.

      this .button = -1;

      $.off (this, document);

      this .getBrowser () .setCursor ("DEFAULT");

      this ._isActive = false;
   },
   dblclick (event)
   {
      // Stop event propagation.

      event .preventDefault ();

      // Look at.

      const { x, y } = this .getBrowser () .getPointerFromEvent (event);

      this .disconnect ();

      if (this .getBrowser () .getAltKey ())
         this .lookAtPoint (x, y, this .getStraightenHorizon ());
      else
         this .lookAtBBox (x, y, this .getStraightenHorizon ());
   },
   mousemove (event)
   {
      this .getBrowser () .addBrowserEvent ();

      this .event = event;

      const { x, y } = this .getBrowser () .getPointerFromEvent (event);

      switch (this .button)
      {
         case 0:
         {
            // Stop event propagation.

            event .preventDefault ();

            // Look around.

            const toVector = this .trackballProjectToSphere (x, y, this .toVector);

            this .addRotation (this .fromVector, toVector);
            this .fromVector .assign (toVector);
            break;
         }
      }
   },
   wheel: (() =>
   {
      const
         step        = new Vector3 (),
         translation = new Vector3 ();

      return function (event)
      {
         const { x, y } = this .getBrowser () .getPointerFromEvent (event);

         if (!this .isPointerInRectangle (x, y))
            return;

         // Stop event propagation.

         event .preventDefault ();

         // Change viewpoint position.

         const viewpoint = this .getActiveViewpoint ();

         viewpoint .transitionStop ();

         this .getDistanceToCenter (step) .multiply (event .zoomFactor || SCROLL_FACTOR),
         viewpoint .getUserOrientation () .multVecRot (translation .set (0, 0, step .norm ()));

         if (event .deltaY < 0)
            this .addMove (translation .negate (), Vector3 .ZERO);

         else if (event .deltaY > 0)
            this .addMove (translation, Vector3 .ZERO);
      };
   })(),
   touchstart (event)
   {
      event = this .getBrowser () .copyEvent (event);

      const touches = event .touches;

      switch (touches .length)
      {
         case 1:
         {
            // Start move (button 0).

            event .preventDefault ();

            this .touch1 .set (touches [0] .pageX, touches [0] .pageY);
            break;
         }
         case 2:
         {
            // End move (button 0).

            this .touchend (event);

            // Start look around (button 0).

            event .button = 0;
            event .pageX  = (touches [0] .pageX + touches [1] .pageX) / 2;
            event .pageY  = (touches [0] .pageY + touches [1] .pageY) / 2;

            this .mousedown (event);

            // Start zoom (mouse wheel).

            this .touch1 .set (touches [0] .pageX, touches [0] .pageY);
            this .touch2 .set (touches [1] .pageX, touches [1] .pageY);
            break;
         }
         default:
         {
            // End move (button 1).

            this .touchend (event);
            break;
         }
      }
   },
   touchend (event)
   {
      event = this .getBrowser () .copyEvent (event);

      // End look around (button 0).

      event .button = 0;

      this .mouseup (event);

      // Start dblclick (button 0).

      if (Date .now () / 1_000 - this .tapStart < DBL_TAP_TIME)
      {
         event .button = 0;
         event .pageX  = this .touch1 .x;
         event .pageY  = this .touch1 .y;

         this .dblclick (event);
      }

      this .tapStart = Date .now () / 1_000;
   },
   touchmove: (() =>
   {
      const
         MOVE_ANGLE   = 0.7,
         ZOOM_ANGLE   = -0.7,
         touch1Change = new Vector2 (),
         touch2Change = new Vector2 ();

      return function (event)
      {
         event = this .getBrowser () .copyEvent (event);

         const touches = event .touches;

         switch (touches .length)
         {
            case 2:
            {
               touch1Change .set (touches [0] .pageX, touches [0] .pageY) .subtract (this .touch1) .normalize ();
               touch2Change .set (touches [1] .pageX, touches [1] .pageY) .subtract (this .touch2) .normalize ();

               const
                  move = touch1Change .dot (touch2Change) > MOVE_ANGLE,
                  zoom = touch1Change .dot (touch2Change) < ZOOM_ANGLE;

               if (move)
               {
                  // Look around (button 0).

                  event .button = 0;
                  event .pageX  = (touches [0] .pageX + touches [1] .pageX) / 2;
                  event .pageY  = (touches [0] .pageY + touches [1] .pageY) / 2;

                  this .mousemove (event);
               }
               else if (zoom)
               {
                  // Zoom (mouse wheel).

                  const distance1 = this .touch1 .distance (this .touch2);

                  this .touch1 .set (touches [0] .pageX, touches [0] .pageY);
                  this .touch2 .set (touches [1] .pageX, touches [1] .pageY);

                  const
                     distance2 = this .touch1 .distance (this .touch2),
                     delta     = distance1 - distance2;

                  event .deltaY     = delta;
                  event .zoomFactor = Math .abs (delta) / window .innerWidth;

                  event .pageX = (touches [0] .pageX + touches [1] .pageX) / 2;
                  event .pageY = (touches [0] .pageY + touches [1] .pageY) / 2;

                  this .wheel (event);
               }

               this .touch1 .set (touches [0] .pageX, touches [0] .pageY);
               this .touch2 .set (touches [1] .pageX, touches [1] .pageY);
               break;
            }
         }
      };
   })(),
   set_positionOffset__ (value)
   {
      const viewpoint = this .getActiveViewpoint ();

      viewpoint ._positionOffset = value;
   },
   set_centerOfRotationOffset__ (value)
   {
      const viewpoint = this .getActiveViewpoint ();

      viewpoint ._centerOfRotationOffset = value;
   },
   set_orientationOffset__ (value)
   {
      const viewpoint = this .getActiveViewpoint ();

      viewpoint ._orientationOffset = value;
   },
   addMove: (() =>
   {
      const
         positionOffset         = new Vector3 (),
         centerOfRotationOffset = new Vector3 ();

      return function (positionOffsetChange, centerOfRotationOffsetChange)
      {
         const viewpoint = this .getActiveViewpoint ();

         if (this .positionChaser ._isActive .getValue () && this .positionChaser ._value_changed .hasInterest ("set_positionOffset__", this))
         {
            positionOffset
               .assign (this .positionChaser ._set_destination .getValue ())
               .add (positionOffsetChange);

            this .positionChaser ._set_destination = positionOffset;
         }
         else
         {
            positionOffset
               .assign (viewpoint ._positionOffset .getValue ())
               .add (positionOffsetChange);

            this .positionChaser ._set_value       = viewpoint ._positionOffset;
            this .positionChaser ._set_destination = positionOffset;
         }

         if (this .centerOfRotationChaser ._isActive .getValue () && this .centerOfRotationChaser ._value_changed .hasInterest ("set_centerOfRotationOffset__", this))
         {
            centerOfRotationOffset
               .assign (this .centerOfRotationChaser ._set_destination .getValue ())
               .add (centerOfRotationOffsetChange);

            this .centerOfRotationChaser ._set_destination = centerOfRotationOffset;
         }
         else
         {
            centerOfRotationOffset
               .assign (viewpoint ._centerOfRotationOffset .getValue ())
               .add (centerOfRotationOffsetChange);

            this .centerOfRotationChaser ._set_value       = viewpoint ._centerOfRotationOffset;
            this .centerOfRotationChaser ._set_destination = centerOfRotationOffset;
         }

         this .disconnect ();
         this .positionChaser         ._value_changed .addInterest ("set_positionOffset__",         this);
         this .centerOfRotationChaser ._value_changed .addInterest ("set_centerOfRotationOffset__", this);
      };
   })(),
   addRotation: (() =>
   {
      const
         userOrientation   = new Rotation4 (),
         orientationOffset = new Rotation4 ();

      return function (fromVector, toVector)
      {
         const viewpoint = this .getActiveViewpoint ();

         if (this .orientationChaser ._isActive .getValue () && this .orientationChaser ._value_changed .hasInterest ("set_orientationOffset__", this))
         {
            userOrientation
               .setVectors (toVector, fromVector)
               .multRight (viewpoint .getOrientation ())
               .multRight (this .orientationChaser ._set_destination .getValue ());

            viewpoint .straightenHorizon (userOrientation);

            orientationOffset .assign (viewpoint .getOrientation ()) .inverse () .multRight (userOrientation);

            this .orientationChaser ._set_destination = orientationOffset;
         }
         else
         {
            userOrientation
               .setVectors (toVector, fromVector)
               .multRight (viewpoint .getUserOrientation ());

            viewpoint .straightenHorizon (userOrientation);

            orientationOffset .assign (viewpoint .getOrientation ()) .inverse () .multRight (userOrientation);

            this .orientationChaser ._set_value       = viewpoint ._orientationOffset;
            this .orientationChaser ._set_destination = orientationOffset;
         }

         this .disconnect ();
         this .orientationChaser ._value_changed .addInterest ("set_orientationOffset__", this);
      };
   })(),
   disconnect ()
   {
      this .orientationChaser      ._value_changed .removeInterest ("set_orientationOffset__",      this);
      this .positionChaser         ._value_changed .removeInterest ("set_positionOffset__",         this);
      this .centerOfRotationChaser ._value_changed .removeInterest ("set_centerOfRotationOffset__", this);
   },
   dispose ()
   {
      this .disconnect ();

      $.off (this, this .getBrowser () .getSurface ());
      $.off (this, document);
   },
});

Object .defineProperties (LookAtViewer,
{
   typeName:
   {
      value: "LookAtViewer",
      enumerable: true,
   },
});

export default LookAtViewer;
