import X3DViewer         from "./X3DViewer.js";
import PositionChaser    from "../../Components/Followers/PositionChaser.js";
import OrientationChaser from "../../Components/Followers/OrientationChaser.js";
import TimeSensor        from "../../Components/Time/TimeSensor.js";
import Algorithm         from "../../../standard/Math/Algorithm.js";
import Vector2           from "../../../standard/Math/Numbers/Vector2.js";
import Vector3           from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4         from "../../../standard/Math/Numbers/Rotation4.js";

typeof jquery_mousewheel; // import plugin

const macOS = /Mac OS X/i .test (navigator .userAgent);

const
   SPIN_RELEASE_TIME   = 20,
   SPIN_ANGLE          = Algorithm .radians (2),
   SPIN_FACTOR         = 0.3,
   SCROLL_FACTOR       = macOS ? 1 / 120 : 1 / 20,
   MOVE_TIME           = 0.2,
   ROTATE_TIME         = 0.2,
   DISK_ANGLE          = Algorithm .radians (15),
   CRITICAL_ANGLE      = Algorithm .radians (0.1);

function ExamineViewer (executionContext, navigationInfo)
{
   X3DViewer .call (this, executionContext, navigationInfo);

   this .button                   = -1;
   this .orientationOffset        = new Rotation4 ();
   this .fromVector               = new Vector3 ();
   this .toVector                 = new Vector3 ();
   this .fromPointer              = new Vector2 ();
   this .fromPoint                = new Vector3 ();
   this .toPoint                  = new Vector3 ();
   this .startOrientation         = new Rotation4 ();
   this .roll                     = new Rotation4 ();
   this .rotation                 = new Rotation4 ();
   this .deltaRotation            = new Rotation4 ();
   this .direction                = new Vector3 ();
   this .axis                     = new Vector3 ();

   this .touchMode                = 0;
   this .touch1                   = new Vector2 ();
   this .touch2                   = new Vector2 ();
   this .tapStart                 = 0;
   this .dblTapInterval           = 0.4;

   this .initialPositionOffset    = new Vector3 ();
   this .initialOrientationOffset = new Rotation4 ();
   this .positionChaser           = new PositionChaser (executionContext);
   this .centerOfRotationChaser   = new PositionChaser (executionContext);
   this .rotationChaser           = new OrientationChaser (executionContext);

   this .timeSensor = new TimeSensor (executionContext);
}

Object .assign (Object .setPrototypeOf (ExamineViewer .prototype, X3DViewer .prototype),
{
   initialize ()
   {
      X3DViewer .prototype .initialize .call (this);

      const
         browser = this .getBrowser (),
         element = browser .getSurface ();

      // Disconnect from spin.

      this .getNavigationInfo () ._transitionStart .addInterest ("disconnect", this);
      browser .getBrowserOptions () ._StraightenHorizon .addInterest ("disconnect", this);
      browser ._activeViewpoint .addInterest ("set_activeViewpoint__", this);

      // Bind pointing device events.

      element .on ("mousedown.ExamineViewer",  this .mousedown  .bind (this));
      element .on ("mouseup.ExamineViewer",    this .mouseup    .bind (this));
      element .on ("dblclick.ExamineViewer",   this .dblclick   .bind (this));
      element .on ("mousewheel.ExamineViewer", this .mousewheel .bind (this));

      element .on ("touchstart.ExamineViewer",  this .touchstart .bind (this));
      element .on ("touchend.ExamineViewer",    this .touchend   .bind (this));

      // Setup scroll chaser.

      this .positionChaser ._duration = MOVE_TIME;
      this .positionChaser .setup ();

      this .centerOfRotationChaser ._duration = MOVE_TIME;
      this .centerOfRotationChaser .setup ();

      this .rotationChaser ._duration = ROTATE_TIME;
      this .rotationChaser .setup ();

      this .timeSensor ._loop     = true;
      this .timeSensor ._stopTime = Date .now () / 1000;
      this .timeSensor .setup ();

      this .timeSensor ._fraction_changed  .addInterest ("spin", this);

      this .set_activeViewpoint__ ();
   },
   set_activeViewpoint__ ()
   {
      if (this .getStraightenHorizon ())
      {
         const viewpoint = this .getActiveViewpoint ();

         if (viewpoint)
         {
            this .startOrientation .assign (viewpoint .getUserOrientation ());

            viewpoint ._orientationOffset = this .getOrientationOffset (Rotation4 .Identity, Rotation4 .Identity, viewpoint ._orientationOffset .getValue ());
         }
      }

      this .disconnect ();
   },
   mousedown (event)
   {
      if (this .button >= 0)
         return;

      const { x, y } = this .getBrowser () .getPointerFromEvent (event);

      if (!this .isPointerInRectangle (x, y))
         return;

      switch (this .getButton (event .button))
      {
         case 0:
         {
            // Stop event propagation.

            event .preventDefault ();

            // Start rotate.

            this .button = event .button;

            $(document) .on ("mouseup.ExamineViewer"   + this .getId (), this .mouseup   .bind (this));
            $(document) .on ("mousemove.ExamineViewer" + this .getId (), this .mousemove .bind (this));
            $(document) .on ("touchend.ExamineViewer"  + this .getId (), this .touchend  .bind (this));
            $(document) .on ("touchmove.ExamineViewer" + this .getId (), this .touchmove .bind (this));

            this .disconnect ();
            this .getActiveViewpoint () .transitionStop ();
            this .getBrowser () .setCursor ("MOVE");
            this .startRotate (x, y, 0);

            this .motionTime = Date .now ();

            this ._isActive = true;
            break;
         }
         case 1:
         {
            // Stop event propagation.

            event .preventDefault ();

            // Start pan.

            this .button = event .button;

            $(document) .on ("mouseup.ExamineViewer"   + this .getId (), this .mouseup   .bind (this));
            $(document) .on ("mousemove.ExamineViewer" + this .getId (), this .mousemove .bind (this));
            $(document) .on ("touchend.ExamineViewer"  + this .getId (), this .touchend  .bind (this));
            $(document) .on ("touchmove.ExamineViewer" + this .getId (), this .touchmove .bind (this));

            this .disconnect ();
            this .getActiveViewpoint () .transitionStop ();
            this .getBrowser () .setCursor ("MOVE");
            this .startPan (x, y);

            this ._isActive = true;
            break;
         }
      }
   },
   mouseup (event)
   {
      if (event .button !== this .button)
         return;

      this .button = -1;

      $(document) .off (".ExamineViewer" + this .getId ());

      switch (this .getButton (event .button))
      {
         case 0:
         {
            // Stop event propagation.

            event .preventDefault ();

            // End rotate.

            this .getBrowser () .setCursor ("DEFAULT");

            if (Math .abs (this .deltaRotation .angle) > SPIN_ANGLE && Date .now () - this .motionTime < SPIN_RELEASE_TIME)
               this .addSpinning (this .deltaRotation);

            this ._isActive = false;
            break;
         }
         case 1:
         {
            // Stop event propagation.

            event .preventDefault ();

            // End pan.

            this .getBrowser () .setCursor ("DEFAULT");

            this ._isActive = false;
            break;
         }
      }
   },
   dblclick (event)
   {
      // Stop event propagation.

      event .preventDefault ();

      // Look at.

      const { x, y } = this .getBrowser () .getPointerFromEvent (event);

      this .disconnect ();
      this .lookAtBBox (x, y, this .getStraightenHorizon ());
   },
   mousemove (event)
   {
      const { x, y } = this .getBrowser () .getPointerFromEvent (event);

      switch (this .getButton (this .button))
      {
         case 0:
         {
            // Stop event propagation.

            event .preventDefault ();

            // Rotate view around Viewpoint.centerOfRotation.

            this .rotate (x, y);

            this .motionTime = Date .now ();
            break;
         }
         case 1:
         {
            // Stop event propagation.

            event .preventDefault ();

            // Move view along center plane.

            this .pan (x, y);
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

      this .removeSpinning ();
      viewpoint .transitionStop ();

      this .zoom (event .zoomFactor || SCROLL_FACTOR, event .deltaY);
   },
   touchstart (event)
   {
      const touches = event .originalEvent .touches;

      switch (touches .length)
      {
         case 1:
         {
            // Start rotate (button 0).

            event .button = 0;
            event .pageX  = touches [0] .pageX;
            event .pageY  = touches [0] .pageY;

            this .mousedown (event);

            // Remember tap.

            this .touch1 .set (touches [0] .pageX, touches [0] .pageY);
            break;
         }
         case 2:
         {
            // End rotate (button 0).

            this .touchend (event);

            // Start move (button 1).

            event .button = 1;
            event .pageX  = (touches [0] .pageX + touches [1] .pageX) / 2;
            event .pageY  = (touches [0] .pageY + touches [1] .pageY) / 2;

            this .mousedown (event);

            // Start zoom (mouse wheel).

            this .touch1 .set (touches [0] .pageX, touches [0] .pageY);
            this .touch2 .set (touches [1] .pageX, touches [1] .pageY);
            break;
         }
         case 3:
         {
            // End move (button 1).
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
            // End rotate (button 0).

            event .button = 0;
            event .pageX  = this .touch1 .x;
            event .pageY  = this .touch1 .y;

            this .mouseup (event);

            // Start dblclick (button 0).

            if (this .tapedTwice)
            {
               this .dblclick (event);
            }
            else
            {
               this .tapedTwice = true;

               setTimeout (() => this .tapedTwice = false, 300);
            }

            break;
         }
         case 1:
         {
            // End move (button 1).

            this .touchMode = 0;
            event .button   = 1;

            this .mouseup (event);
            break;
         }
      }
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
         const touches = event .originalEvent .touches;

         switch (touches .length)
         {
            case 1:
            {
               // Rotate (button 0).

               event .pageX = touches [0] .pageX;
               event .pageY = touches [0] .pageY;

               this .mousemove (event);
               break;
            }
            case 2:
            {
               touch1Change .set (touches [0] .pageX, touches [0] .pageY) .subtract (this .touch1) .normalize ();
               touch2Change .set (touches [1] .pageX, touches [1] .pageY) .subtract (this .touch2) .normalize ();

               const
                  move = touch1Change .dot (touch2Change) > MOVE_ANGLE,
                  zoom = touch1Change .dot (touch2Change) < ZOOM_ANGLE,
                  mode = this .touchMode || (move ? 1 : (zoom ? 2 : 0));

               switch (mode)
               {
                  case 1:
                  {
                     // Move (button 1).

                     this .touchMode = 1;

                     event .pageX = (touches [0] .pageX + touches [1] .pageX) / 2;
                     event .pageY = (touches [0] .pageY + touches [1] .pageY) / 2;

                     this .mousemove (event);

                     break;
                  }
                  case 2:
                  {
                     // Zoom (mouse wheel).

                     this .touchMode = 2;

                     const distance1 = this .touch1 .distance (this .touch2);

                     this .touch1 .set (touches [0] .pageX, touches [0] .pageY);
                     this .touch2 .set (touches [1] .pageX, touches [1] .pageY);

                     const
                        distance2 = this .touch1 .distance (this .touch2),
                        delta     = distance2 - distance1;

                     event .deltaY     = delta;
                     event .zoomFactor = Math .abs (delta) / $(window) .width ();

                     event .pageX = (touches [0] .pageX + touches [1] .pageX) / 2;
                     event .pageY = (touches [0] .pageY + touches [1] .pageY) / 2;

                     this .mousewheel (event);

                     break;
                  }
               }

               this .touch1 .set (touches [0] .pageX, touches [0] .pageY);
               this .touch2 .set (touches [1] .pageX, touches [1] .pageY);
               break;
            }
         }
      };
   })(),
   startRotate (x, y, negate)
   {
      if (this .getStraightenHorizon ())
      {
         const viewpoint = this .getActiveViewpoint ();

         this .fromPointer .set (x, y);
         this .startOrientation .assign (viewpoint .getUserOrientation ());
         this .lastRoll = 0;
         this .negate   = negate;
      }
      else
      {
         this .trackballProjectToSphere (x, y, this .fromVector);
      }
   },
   rotate: (() =>
   {
      const
         translation = new Vector2 (),
         axis        = new Vector3 ();

      return function (x, y)
      {
         if (this .getStraightenHorizon ())
         {
            const
               viewpoint = this .getActiveViewpoint (),
               upVector  = viewpoint .getUpVector (true);

            translation .set (x, y) .subtract (this .fromPointer);

            const
               pixelPerRevolutionX = this .getViewport () [2] * 2,
               pixelPerRevolutionY = this .getViewport () [3] * 2,
               startRoll           = Math .acos (Algorithm .clamp (this .startOrientation .multVecRot (axis .assign (Vector3 .zAxis)) .dot (upVector), -1, 1)),
               roll                = Math .PI * 2 * +translation .y / pixelPerRevolutionY,
               clampedRoll         = Algorithm .clamp (startRoll + roll, CRITICAL_ANGLE, Math .PI - CRITICAL_ANGLE) - startRoll;

            // Adjust fromPointer y.

            if (this .lastRoll - Math .abs (roll) > 0)
               this .fromPointer .y += (roll - clampedRoll) / (Math .PI * 2) * pixelPerRevolutionY;

            this .lastRoll = Math .abs (roll);

            // Check disk angle.

            if (!this .negate)
            {
               if (Math .PI / 2 - Math .abs (startRoll - Math .PI / 2) < DISK_ANGLE)
               {
                  if (y - this .getViewport () [1] > this .getViewport () [3] / 2)
                     this .negate = startRoll < Math .PI / 4 ? -1 : 1;
                  else
                     this .negate = startRoll > Math .PI / 4 ? -1 : 1;
               }
               else
               {
                  this .negate = 1;
               }
            }

            // Determine roll and rotation.

            this .deltaRotation .assign (this .rotation);
            this .roll .set (1, 0, 0, clampedRoll);
            this .rotation .setAxisAngle (upVector, Math .PI * 2 * -translation .x / pixelPerRevolutionX * this .negate);
            this .deltaRotation .inverse () .multRight (this .rotation);
         }
         else
         {
            const toVector = this .trackballProjectToSphere (x, y, this .toVector);

            // Determine roll and rotation.

            this .deltaRotation .assign (this .rotation);
            this .roll .assign (Rotation4 .Identity);
            this .rotation .setFromToVec (toVector, this .fromVector);
            this .deltaRotation .inverse () .multRight (this .rotation);
         }

         this .addRotate (this .roll, this .rotation, this .deltaRotation);
      };
   })(),
   addRotate (roll, rotation, deltaRotation)
   {
      const viewpoint = this .getActiveViewpoint ();

      if (this .rotationChaser ._value_changed .hasInterest ("set_rotation__", this))
      {
         // console .warn ("active")

         this .getOrientationOffset (roll, rotation, this .initialOrientationOffset);

         this .rotationChaser ._set_destination = rotation;
      }
      else
      {
         // console .warn ("start")

         this .rotationChaser ._value_changed .addInterest ("set_rotation__", this);

         this .initialOrientationOffset .assign (viewpoint ._orientationOffset .getValue ());
         this .initialPositionOffset    .assign (viewpoint ._positionOffset    .getValue ());

         this .getOrientationOffset (roll, rotation, this .initialOrientationOffset);

         this .rotationChaser ._set_value       = Rotation4 .Identity;
         this .rotationChaser ._set_destination = rotation;
      }
   },
   addSpinning (deltaRotation)
   {
      this .disconnect ();

      if (this .getStraightenHorizon ())
      {
         const
            viewpoint            = this .getActiveViewpoint (),
            upVector             = viewpoint .getUpVector (true),
            userPosition         = viewpoint .getUserPosition (),
            userCenterOfRotation = viewpoint .getUserCenterOfRotation (),
            direction            = userPosition .copy () .subtract (userCenterOfRotation),
            angle                = Math .min (Math .abs (deltaRotation .angle), Math .PI / 4);

         this .axis .assign (upVector);

         if (Math .sign (deltaRotation .getAxis () .dot (upVector)) !== Math .sign (deltaRotation .angle))
            this .axis .negate ();

         this .timeSensor ._cycleInterval = Math .PI / (angle * SPIN_FACTOR * 25);
         this .timeSensor ._startTime     = Date .now () / 1000;

         const lookAtRotation = viewpoint .getLookAtRotation (userPosition, userCenterOfRotation);

         this .direction .assign (direction);
         this .orientationOffset .assign (viewpoint .getUserOrientation ()) .multRight (lookAtRotation .inverse ());
      }
      else
      {
         this .getBrowser () .prepareEvents () .addInterest ("spin", this);
         this .rotation .assign (deltaRotation);
      }
   },
   removeSpinning ()
   {
      const browser = this .getBrowser ();

      this .timeSensor ._stopTime = Date .now () / 1000;
      browser .prepareEvents () .removeInterest ("spin", this);
   },
   spin: (() =>
   {
      const
         direction         = new Vector3 (),
         positionOffset    = new Vector3 (),
         orientationOffset = new Rotation4 (),
         rotation          = new Rotation4 ();

      return function ()
      {
         const viewpoint = this .getActiveViewpoint ();

         if (this .getStraightenHorizon ())
         {
            const
               userCenterOfRotation = viewpoint .getUserCenterOfRotation (),
               fraction             = this .timeSensor ._fraction_changed .getValue (),
               rotation             = new Rotation4 (this .axis, 2 * Math .PI * fraction),
               userPosition         = rotation .multVecRot (direction .assign (this .direction)) .add (userCenterOfRotation),
               lookAtRotation       = viewpoint .getLookAtRotation (userPosition, viewpoint .getUserCenterOfRotation ());

            positionOffset .assign (userPosition) .subtract (viewpoint .getPosition ());

            orientationOffset .assign (viewpoint .getOrientation ()) .inverse ()
               .multRight (this .orientationOffset) .multRight (lookAtRotation);

            viewpoint ._positionOffset    = positionOffset;
            viewpoint ._orientationOffset = orientationOffset;
         }
         else
         {
            rotation .assign (Rotation4 .Identity) .slerp (this .rotation, SPIN_FACTOR * 60 / this .getBrowser () .getCurrentFrameRate ());

            this .orientationOffset .assign (viewpoint ._orientationOffset .getValue ());

            viewpoint ._orientationOffset = this .getOrientationOffset (Rotation4 .Identity, rotation, this .orientationOffset);
            viewpoint ._positionOffset    = this .getPositionOffset (viewpoint ._positionOffset .getValue (), this .orientationOffset, viewpoint ._orientationOffset .getValue ());
         }
      };
   })(),
   startPan (x, y)
   {
      this .getPointOnCenterPlane (x, y, this .fromPoint);
   },
   pan: (() =>
   {
      const fromPoint = new Vector3 ();

      return function  (x, y)
      {
         const
            viewpoint   = this .getActiveViewpoint (),
            toPoint     = this .getPointOnCenterPlane (x, y, this .toPoint),
            translation = viewpoint .getUserOrientation () .multVecRot (fromPoint .assign (this .fromPoint) .subtract (toPoint));

         this .addMove (translation, translation);

         this .fromPoint .assign (toPoint);
      };
   })(),
   zoom: (() =>
   {
      const
         step        = new Vector3 (),
         translation = new Vector3 ();

      return function (zoomFactor, deltaY)
      {
         // Change viewpoint position.

         const viewpoint = this .getActiveViewpoint ();

         this .getDistanceToCenter (step) .multiply (zoomFactor);
         viewpoint .getUserOrientation () .multVecRot (translation .set (0, 0, step .magnitude ()));

         if (deltaY > 0)
            this .addMove (translation .negate (), Vector3 .Zero);

         else if (deltaY < 0)
            this .addMove (translation, Vector3 .Zero);
      };
   })(),
   addMove: (() =>
   {
      const
         positionOffset         = new Vector3 (),
         centerOfRotationOffset = new Vector3 ();

      return function (positionOffsetChange, centerOfRotationOffsetChange)
      {
         const viewpoint = this .getActiveViewpoint ();

         if (this .positionChaser ._value_changed .hasInterest ("set_positionOffset__", this))
         {
            positionOffset
               .assign (this .positionChaser ._set_destination .getValue ())
               .add (positionOffsetChange);

            this .positionChaser ._set_destination = positionOffset;
         }
         else
         {
            this .positionChaser ._value_changed .addInterest ("set_positionOffset__", this);

            positionOffset
               .assign (viewpoint ._positionOffset .getValue ())
               .add (positionOffsetChange);

            this .positionChaser ._set_value       = viewpoint ._positionOffset;
            this .positionChaser ._set_destination = positionOffset;
         }

         if (this .centerOfRotationChaser ._value_changed .hasInterest ("set_centerOfRotationOffset__", this))
         {
            centerOfRotationOffset
               .assign (this .centerOfRotationChaser ._set_destination .getValue ())
               .add (centerOfRotationOffsetChange);

            this .centerOfRotationChaser ._set_destination = centerOfRotationOffset;
         }
         else
         {
            this .centerOfRotationChaser ._value_changed .addInterest ("set_centerOfRotationOffset__", this);

            centerOfRotationOffset
               .assign (viewpoint ._centerOfRotationOffset .getValue ())
               .add (centerOfRotationOffsetChange);

            this .centerOfRotationChaser ._set_value       = viewpoint ._centerOfRotationOffset;
            this .centerOfRotationChaser ._set_destination = centerOfRotationOffset;
         }
      };
   })(),
   getPositionOffset: (() =>
   {
      const
         distance = new Vector3 (),
         d        = new Vector3 (),
         oob      = new Rotation4 ();

      return function (positionOffsetBefore, orientationOffsetBefore, orientationOffsetAfter)
      {
         this .getDistanceToCenter (distance, positionOffsetBefore);

         return (oob
            .assign (orientationOffsetBefore)
            .inverse ()
            .multRight (orientationOffsetAfter)
            .multVecRot (d .assign (distance))
            .subtract (distance)
            .add (positionOffsetBefore));
      };
   })(),
   getOrientationOffset: (() =>
   {
      const
         userOrientation   = new Rotation4 (),
         orientationOffset = new Rotation4 ();

      return function (roll, rotation, orientationOffsetBefore)
      {
         const
            viewpoint         = this .getActiveViewpoint (),
            straightenHorizon = this .getStraightenHorizon ();

         if (straightenHorizon)
         {
            // Determine userOrientation.

            userOrientation
               .assign (roll)
               .multRight (this .startOrientation)
               .multRight (rotation);

            // Straighten horizon of userOrientation.

            viewpoint .straightenHorizon (userOrientation);
         }
         else
         {
            userOrientation
               .assign (rotation)
               .multRight (viewpoint .getOrientation ())
               .multRight (orientationOffsetBefore);
         }

         const orientationOffsetAfter = orientationOffset
            .assign (viewpoint .getOrientation ())
            .inverse ()
            .multRight (userOrientation);

         return orientationOffsetAfter;
      };
   })(),
   getHorizonRotation: (() =>
   {
      const
         V = new Vector3 (),
         N = new Vector3 (),
         H = new Vector3 (),
         r = new Rotation4 ();

      return function (rotation)
      {
         rotation .multVecRot (V .assign (Vector3 .zAxis));
         N .assign (Vector3 .yAxis) .cross (V);
         H .assign (N) .cross (Vector3 .yAxis);
         r .setFromToVec (Vector3 .zAxis, H);

         return r;
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
   set_rotation__ (value)
   {
      const viewpoint = this .getActiveViewpoint ();

      viewpoint ._orientationOffset = this .getOrientationOffset (this .roll, value .getValue (), this .initialOrientationOffset);
      viewpoint ._positionOffset    = this .getPositionOffset (this .initialPositionOffset, this .initialOrientationOffset, viewpoint ._orientationOffset .getValue ());
   },
   disconnect ()
   {
      this .positionChaser         ._value_changed .removeInterest ("set_positionOffset__",         this);
      this .centerOfRotationChaser ._value_changed .removeInterest ("set_centerOfRotationOffset__", this);
      this .rotationChaser         ._value_changed .removeInterest ("set_rotation__",               this);

      this .removeSpinning ();
   },
   dispose ()
   {
      const browser = this .getBrowser ();

      this .disconnect ();
      this    .getNavigationInfo () ._transitionStart   .removeInterest ("disconnect", this);
      browser .getBrowserOptions () ._StraightenHorizon .removeInterest ("disconnect", this);

      browser ._activeViewpoint .removeInterest ("set_activeViewpoint__", this);

      browser .getSurface () .off (".ExamineViewer");
      $(document) .off (".ExamineViewer" + this .getId ());
   },
});

Object .defineProperties (ExamineViewer,
{
   typeName:
   {
      value: "ExamineViewer",
      enumerable: true,
   },
});

export default ExamineViewer;
