import X3DViewer         from "./X3DViewer.js";
import ScreenLine        from "../Rendering/ScreenLine.js";
import OrientationChaser from "../../Components/Followers/OrientationChaser.js";
import Vector3           from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4         from "../../../standard/Math/Numbers/Rotation4.js";

typeof jquery_mousewheel; // import plugin

const macOS = /Mac OS X/i .test (navigator .userAgent)

const
   SPEED_FACTOR           = 0.007,
   SHIFT_SPEED_FACTOR     = 4 * SPEED_FACTOR,
   ROTATION_SPEED_FACTOR  = 1.4,
   ROTATION_LIMIT         = 40,
   PAN_SPEED_FACTOR       = SPEED_FACTOR,
   PAN_SHIFT_SPEED_FACTOR = 1.4 * PAN_SPEED_FACTOR,
   ROLL_ANGLE             = macOS ? Math .PI / 512 : Math .PI / 32,
   ROTATE_TIME            = 0.3;

const
   MOVE = 0,
   PAN  = 1;

function X3DFlyViewer (executionContext, navigationInfo)
{
   X3DViewer .call (this, executionContext, navigationInfo);

   const browser = this .getBrowser ();

   this .button            = -1;
   this .fromVector        = new Vector3 ();
   this .toVector          = new Vector3 ();
   this .direction         = new Vector3 ();
   this .startTime         = 0;
   this .event             = null;
   this .lookAround        = false;
   this .orientationChaser = new OrientationChaser (executionContext);
   this .rubberBand        = new ScreenLine (browser, 1, 1, 0.4);
}

Object .assign (Object .setPrototypeOf (X3DFlyViewer .prototype, X3DViewer .prototype),
{
   initialize ()
   {
      X3DViewer .prototype .initialize .call (this);

      const
         browser = this .getBrowser (),
         element = browser .getSurface ();

      // Bind pointing device events.

      element .on ("mousedown.X3DFlyViewer",  this .mousedown  .bind (this));
      element .on ("mouseup.X3DFlyViewer",    this .mouseup    .bind (this));
      element .on ("mousewheel.X3DFlyViewer", this .mousewheel .bind (this));

      element .on ("touchstart.X3DFlyViewer", this .touchstart .bind (this));
      element .on ("touchend.X3DFlyViewer",   this .touchend   .bind (this));

      browser ._controlKey .addInterest ("set_controlKey__", this);

      // Setup look around chaser.

      this .orientationChaser ._duration = ROTATE_TIME;
      this .orientationChaser .setup ();
   },
   addCollision () { },
   removeCollision () { },
   set_controlKey__ ()
   {
      if (this .event && this .event .button === 0)
      {
         this .button = -1;
         this .mousedown (this .event);
      }
   },
   mousedown (event)
   {
      if (this .button >= 0)
         return;

      this .event = event;

      const { x, y } = this .getBrowser () .getPointerFromEvent (event);

      if (!this .isPointerInRectangle (x, y))
         return;

      switch (this .getButton (event .button))
      {
         case 0:
         {
            // Stop event propagation.

            event .preventDefault ();

            // Start walk or fly.

            this .button = event .button;

            $(document) .on ("mouseup.X3DFlyViewer"   + this .getId (), this .mouseup   .bind (this));
            $(document) .on ("mousemove.X3DFlyViewer" + this .getId (), this .mousemove .bind (this));
            $(document) .on ("touchend.X3DFlyViewer"  + this .getId (), this .touchend  .bind (this));
            $(document) .on ("touchmove.X3DFlyViewer" + this .getId (), this .touchmove .bind (this));

            this .disconnect ();
            this .getActiveViewpoint () .transitionStop ();
            this .getBrowser () .setCursor ("MOVE");
            this .addCollision ();

            if (this .getBrowser () .getControlKey () || this .getBrowser () .getCommandKey () || this .lookAround)
            {
               // Look around.

               this .trackballProjectToSphere (x, y, this .fromVector);
            }
            else
            {
               // Move.

               this .fromVector .set (x, 0, -y);
               this .toVector   .assign (this .fromVector);

               this .getFlyDirection (this .fromVector, this .toVector, this .direction);
               this .addFly ();

               if (this .getBrowser () .getBrowserOption ("Rubberband"))
                  this .getBrowser () .finishedEvents () .addInterest ("display", this, MOVE);
            }

            this ._isActive = true;
            break;
         }
         case 1:
         {
            // Stop event propagation.

            event .preventDefault ();

            // Start pan.

            this .button = event .button;

            $(document) .on ("mouseup.X3DFlyViewer"   + this .getId (), this .mouseup   .bind (this));
            $(document) .on ("mousemove.X3DFlyViewer" + this .getId (), this .mousemove .bind (this));

            this .disconnect ();
            this .getActiveViewpoint () .transitionStop ();
            this .getBrowser () .setCursor ("MOVE");
            this .addCollision ();

            this .fromVector .set (x, y, 0);
            this .toVector   .assign (this .fromVector);
            this .direction  .set (0);

            this .addPan ();

            if (this .getBrowser () .getBrowserOption ("Rubberband"))
               this .getBrowser () .finishedEvents () .addInterest ("display", this, PAN);

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

      this .event  = null;
      this .button = -1;

      this .direction .set (0);

      $(document) .off (".X3DFlyViewer" + this .getId ());

      this .disconnect ();
      this .getBrowser () .setCursor ("DEFAULT");
      this .removeCollision ();

      this ._isActive = false;
   },
   mousemove (event)
   {
      const browser = this .getBrowser ();

      browser .addBrowserEvent ();

      this .event = event;

      const { x, y } = this .getBrowser () .getPointerFromEvent (event);

      switch (this .getButton (this .button))
      {
         case 0:
         {
            // Stop event propagation.

            event .preventDefault ();

            if (browser .getControlKey () || browser .getCommandKey () || this .lookAround)
            {
               // Look around

               const toVector = this .trackballProjectToSphere (x, y, this .toVector);

               this .addRotation (this .fromVector, toVector);
               this .fromVector .assign (toVector);
               break;
            }
            else
            {
               // Fly

               this .toVector .set (x, 0, -y);
               this .getFlyDirection (this .fromVector, this .toVector, this .direction);
               this .direction .divide (browser .getRenderingProperty ("ContentScale"));
               break;
            }
         }
         case 1:
         {
            // Stop event propagation.

            event .preventDefault ();

            // Pan

            this .toVector  .set (x, y, 0);
            this .direction .assign (this .toVector) .subtract (this .fromVector);
            this .direction .divide (browser .getRenderingProperty ("ContentScale"));
            break;
         }
      }
   },
   mousewheel (event)
   {
      const { x, y } = this .getBrowser () .getPointerFromEvent (event);

      if (!this .isPointerInRectangle (x, y))
         return;

      // Stop event propagation.

      event .preventDefault ();

      // Change viewpoint position.

      const viewpoint = this .getActiveViewpoint ();

      viewpoint .transitionStop ();

      if (event .deltaY > 0)
         this .addRoll (-ROLL_ANGLE);

      else if (event .deltaY < 0)
         this .addRoll (ROLL_ANGLE);
   },
   touchstart (event)
   {
      const touches = event .originalEvent .touches;

      switch (touches .length)
      {
         case 1:
         {
            // Start fly or walk (button 0).

            event .button = 0;
            event .pageX  = touches [0] .pageX;
            event .pageY  = touches [0] .pageY;

            this .mousedown (event);
            break;
         }
         case 2:
         {
            // End fly or walk (button 0).

            this .touchend (event);

            // Start look around (button 0).

            this .lookAround = true;
            event .button    = 0;
            event .pageX     = (touches [0] .pageX + touches [1] .pageX) / 2;
            event .pageY     = (touches [0] .pageY + touches [1] .pageY) / 2;

            this .mousedown (event);
            break;
         }
         case 3:
         {
            // End look around (button 0).

            this .touchend (event);
            break;
         }
      }
   },
   touchend (event)
   {
      switch (this .button)
      {
         case 0:
         {
            // End move or look around (button 0).
            this .lookAround = false;
            event .button    = 0;

            this .mouseup (event);
            break;
         }
      }
   },
   touchmove (event)
   {
      const touches = event .originalEvent .touches;

      switch (touches .length)
      {
         case 1:
         {
            // Fly or walk (button 0).

            event .button = 0;
            event .pageX  = touches [0] .pageX;
            event .pageY  = touches [0] .pageY;

            this .mousemove (event);
            break;
         }
         case 2:
         {
            // Fly or walk (button 0).

            event .button = 0;
            event .pageX  = (touches [0] .pageX + touches [1] .pageX) / 2;
            event .pageY  = (touches [0] .pageY + touches [1] .pageY) / 2;

            this .mousemove (event);
            break;
         }
      }
   },
   fly: (() =>
   {
      const
         upVector           = new Vector3 (),
         direction          = new Vector3 (),
         axis               = new Vector3 (),
         userOrientation    = new Rotation4 (),
         orientationOffset  = new Rotation4 (),
         rubberBandRotation = new Rotation4 ();

      return function ()
      {
         const
            navigationInfo = this .getNavigationInfo (),
            viewpoint      = this .getActiveViewpoint (),
            now            = Date .now (),
            dt             = (now - this .startTime) / 1000;

         upVector .assign (viewpoint .getUpVector ());

         // Rubberband values

         if (this .direction .z > 0)
            rubberBandRotation .setFromToVec (this .direction, axis .set (0, 0, 1));
         else
            rubberBandRotation .setFromToVec (axis .set (0, 0, -1), this .direction);

         const rubberBandLength = this .direction .norm ();

         // Determine positionOffset.

         let speedFactor = 1 - rubberBandRotation .angle / (Math .PI / 2);

         speedFactor *= navigationInfo ._speed .getValue ();
         speedFactor *= viewpoint .getSpeedFactor ();
         speedFactor *= this .getBrowser () .getShiftKey () ? SHIFT_SPEED_FACTOR : SPEED_FACTOR;
         speedFactor *= dt;

         const translation = this .getTranslationOffset (direction .assign (this .direction) .multiply (speedFactor));

         this .getActiveLayer () .constrainTranslation (translation, true);

         viewpoint ._positionOffset = translation .add (viewpoint ._positionOffset .getValue ());

         // Determine weight for rubberBandRotation.

         const weight = ROTATION_SPEED_FACTOR * dt * (rubberBandLength / (rubberBandLength + ROTATION_LIMIT)) ** 2;

         // Determine userOrientation.

         userOrientation
            .assign (Rotation4 .Identity)
            .slerp (rubberBandRotation, weight)
            .multRight (viewpoint .getUserOrientation ());

         // Straighten horizon of userOrientation.

         if (this .getStraightenHorizon ())
            viewpoint .straightenHorizon (userOrientation);

         // Determine orientationOffset.

         orientationOffset
            .assign (viewpoint .getOrientation ())
            .inverse ()
            .multRight (userOrientation);

         // Set orientationOffset.

         viewpoint ._orientationOffset = orientationOffset;

         this .startTime = now;
      };
   })(),
   pan: (() =>
   {
      const
         direction = new Vector3 (),
         axis      = new Vector3 ();

      return function ()
      {
         const
            navigationInfo = this .getNavigationInfo (),
            viewpoint      = this .getActiveViewpoint (),
            now            = Date .now (),
            dt             = (now - this .startTime) / 1000,
            upVector       = viewpoint .getUpVector ();

         this .constrainPanDirection (direction .assign (this .direction));

         let speedFactor = 1;

         speedFactor *= navigationInfo ._speed .getValue ();
         speedFactor *= viewpoint .getSpeedFactor ();
         speedFactor *= this .getBrowser () .getShiftKey () ? PAN_SHIFT_SPEED_FACTOR : PAN_SPEED_FACTOR;
         speedFactor *= dt;

         const
            orientation = viewpoint .getUserOrientation () .multRight (new Rotation4 (viewpoint .getUserOrientation () .multVecRot (axis .assign (Vector3 .yAxis)), upVector)),
            translation = orientation .multVecRot (direction .multiply (speedFactor));

         this .getActiveLayer () .constrainTranslation (translation, true);

         viewpoint ._positionOffset = translation .add (viewpoint ._positionOffset .getValue ());

         this .startTime = now;
      };
   })(),
   set_orientationOffset__ (value)
   {
      const viewpoint = this .getActiveViewpoint ();

      viewpoint ._orientationOffset = value;
   },
   addFly ()
   {
      if (this .startTime)
         return;

      this .getBrowser () .prepareEvents () .addInterest ("fly", this);
      this .getBrowser () .addBrowserEvent ();

      this .startTime = Date .now ();
   },
   addPan ()
   {
      if (this .startTime)
         return;

      this .disconnect ();
      this .getBrowser () .prepareEvents () .addInterest ("pan", this);
      this .getBrowser () .addBrowserEvent ();

      this .startTime = Date .now ();
   },
   addRoll: (() =>
   {
      const
         orientationOffset = new Rotation4 (),
         roll              = new Rotation4 ();

      return function (rollAngle)
      {
         const viewpoint = this .getActiveViewpoint ();

         if (this .orientationChaser ._isActive .getValue () && this .orientationChaser ._value_changed .hasInterest ("set_orientationOffset__", this))
         {
            orientationOffset
               .assign (viewpoint .getOrientation ())
               .inverse ()
               .multRight (roll .set (1, 0, 0, rollAngle))
               .multRight (viewpoint .getOrientation ())
               .multRight (this .orientationChaser ._set_destination .getValue ());

            this .orientationChaser ._set_destination = orientationOffset;
         }
         else
         {
            orientationOffset
               .assign (viewpoint .getOrientation ())
               .inverse ()
               .multRight (roll .set (1, 0, 0, rollAngle))
               .multRight (viewpoint .getUserOrientation ());

            this .orientationChaser ._set_value       = viewpoint ._orientationOffset;
            this .orientationChaser ._set_destination = orientationOffset;
         }

         this .disconnect ();
         this .orientationChaser ._value_changed .addInterest ("set_orientationOffset__", this);
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
               .setFromToVec (toVector, fromVector)
               .multRight (viewpoint .getOrientation ())
               .multRight (this .orientationChaser ._set_destination .getValue ());

            if (this .getStraightenHorizon ())
               viewpoint .straightenHorizon (userOrientation);

            orientationOffset .assign (viewpoint .getOrientation ()) .inverse () .multRight (userOrientation);

            this .orientationChaser ._set_destination = orientationOffset;
         }
         else
         {
            userOrientation
               .setFromToVec (toVector, fromVector)
               .multRight (viewpoint .getUserOrientation ());

            if (this .getStraightenHorizon ())
               viewpoint .straightenHorizon (userOrientation);

            orientationOffset .assign (viewpoint .getOrientation ()) .inverse () .multRight (userOrientation);

            this .orientationChaser ._set_value       = viewpoint ._orientationOffset;
            this .orientationChaser ._set_destination = orientationOffset;
         }

         this .disconnect ();
         this .orientationChaser ._value_changed .addInterest ("set_orientationOffset__", this);
      };
   })(),
   display: (() =>
   {
      const
         fromPoint = new Vector3 (),
         toPoint   = new Vector3 ();

      return function (type)
      {
         // Configure HUD

         const browser = this .getBrowser ();

         // Display Rubberband.

         switch (type)
         {
            case MOVE:
            {
               fromPoint .set (this .fromVector .x, -this .fromVector .z, 0);
               toPoint   .set (this .toVector   .x, -this .toVector   .z, 0);
               break;
            }
            case PAN:
            {
               fromPoint .set (this .fromVector .x, this .fromVector .y, 0);
               toPoint   .set (this .toVector   .x, this .toVector   .y, 0);
               break;
            }
         }

         for (const frameBuffer of browser .getFramebuffers ())
            this .rubberBand .display (fromPoint, toPoint, frameBuffer);
      };
   })(),
   disconnect ()
   {
      const browser = this .getBrowser ();

      browser .addBrowserEvent ();

      browser .prepareEvents ()  .removeInterest ("fly", this);
      browser .prepareEvents ()  .removeInterest ("pan", this);
      browser .finishedEvents () .removeInterest ("display", this);

      this .orientationChaser ._value_changed .removeInterest ("set_orientationOffset__", this);

      this .startTime = 0;
   },
   dispose ()
   {
      this .rubberBand .dispose ();

      this .disconnect ();
      this .getBrowser () ._controlKey .removeInterest ("set_controlKey__", this);
      this .getBrowser () .getSurface () .off (".X3DFlyViewer");
      $(document) .off (".X3DFlyViewer" + this .getId ());
   },
});

export default X3DFlyViewer;
