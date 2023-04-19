/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DViewer            from "./X3DViewer.js";
import PositionChaser       from "../../Components/Followers/PositionChaser.js";
import OrientationChaser    from "../../Components/Followers/OrientationChaser.js";
import TimeSensor           from "../../Components/Time/TimeSensor.js";
import Vector2              from "../../../standard/Math/Numbers/Vector2.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";

typeof jquery_mousewheel; // import plugin

const macOS = /Mac OS X/i .test (navigator .userAgent)

const
   MOTION_TIME       = 0.05 * 1000,
   SPIN_RELEASE_TIME = 0.04 * 1000,
   SPIN_ANGLE        = 0.003,
   SPIN_FACTOR       = 0.4,
   SCROLL_FACTOR     = macOS ? 1 / 120 : 1 / 20,
   MOVE_TIME         = 0.2,
   ROTATE_TIME       = 0.2,
   CRITICAL_ANGLE    = 0.97;

function ExamineViewer (executionContext, navigationInfo)
{
   X3DViewer .call (this, executionContext, navigationInfo);

   this .button                   = -1;
   this .orientationOffset        = new Rotation4 (0, 0, 1, 0);
   this .fromVector               = new Vector3 (0, 0, 0);
   this .toVector                 = new Vector3 (0, 0, 0);
   this .fromPoint                = new Vector3 (0, 0, 0);
   this .toPoint                  = new Vector3 (0, 0, 0);
   this .rotation                 = new Rotation4 (0, 0, 1, 0);
   this .direction                = new Vector3 (0, 0, 0);
   this .axis                     = new Vector3 (0, 0, 0);
   this .pressTime                = 0;
   this .motionTime               = 0;

   this .touchMode                = 0;
   this .touch1                   = new Vector2 (0, 0);
   this .touch2                   = new Vector2 (0, 0);
   this .tapStart                 = 0;
   this .dblTapInterval           = 0.4;

   this .initialPositionOffset    = new Vector3 (0, 0, 0);
   this .initialOrientationOffset = new Rotation4 (0, 0, 1, 0);
   this .positionChaser           = new PositionChaser (executionContext);
   this .centerOfRotationChaser   = new PositionChaser (executionContext);
   this .rotationChaser           = new OrientationChaser (executionContext);

   this .timeSensor = new TimeSensor (executionContext);
}

ExamineViewer .prototype = Object .assign (Object .create (X3DViewer .prototype),
{
   constructor: ExamineViewer,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
      new X3DFieldDefinition (X3DConstants .outputOnly, "isActive", new Fields .SFBool ()),
   ]),
   initialize: function ()
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
      this .positionChaser .setPrivate (true);
      this .positionChaser .setup ();

      this .centerOfRotationChaser ._duration = MOVE_TIME;
      this .centerOfRotationChaser .setPrivate (true);
      this .centerOfRotationChaser .setup ();

      this .rotationChaser ._duration = ROTATE_TIME;
      this .rotationChaser .setPrivate (true);
      this .rotationChaser .setup ();

      this .timeSensor ._loop     = true;
      this .timeSensor ._stopTime = browser .getCurrentTime ();
      this .timeSensor .setPrivate (true);
      this .timeSensor .setup ();

      this .timeSensor ._fraction_changed  .addInterest ("spin", this);

      this .set_activeViewpoint__ ();
   },
   set_activeViewpoint__: function ()
   {
      if (this .getStraightenHorizon ())
      {
         const viewpoint = this .getActiveViewpoint ();

         if (viewpoint)
            viewpoint ._orientationOffset = this .getOrientationOffset (Rotation4 .Identity, viewpoint ._orientationOffset .getValue (), false);
      }

      this .disconnect ();
   },
   mousedown: function (event)
   {
      if (this .button >= 0)
         return;

      this .pressTime = Date .now ();

      const [x, y] = this .getPointer (event);

      if (!this .isPointerInRectangle (x, y))
         return;

      switch (this .getButton (event .button))
      {
         case 0:
         {
            // Start rotate.

            // Stop event propagation.
            event .preventDefault ();
            event .stopImmediatePropagation ();

            this .button = event .button;

            $(document) .on ("mouseup.ExamineViewer"   + this .getId (), this .mouseup   .bind (this));
            $(document) .on ("mousemove.ExamineViewer" + this .getId (), this .mousemove .bind (this));
            $(document) .on ("touchend.ExamineViewer"  + this .getId (), this .touchend  .bind (this));
            $(document) .on ("touchmove.ExamineViewer" + this .getId (), this .touchmove .bind (this));

            this .disconnect ();
            this .getActiveViewpoint () .transitionStop ();
            this .getBrowser () .setCursor ("MOVE");

            this .trackballProjectToSphere (x, y, this .fromVector);
            this .rotation .assign (Rotation4 .Identity);

            this .motionTime = 0;

            this ._isActive = true;
            break;
         }
         case 1:
         {
            // Start pan.

            // Stop event propagation.
            event .preventDefault ();
            event .stopImmediatePropagation ();

            this .button = event .button;

            $(document) .on ("mouseup.ExamineViewer"   + this .getId (), this .mouseup   .bind (this));
            $(document) .on ("mousemove.ExamineViewer" + this .getId (), this .mousemove .bind (this));
            $(document) .on ("touchend.ExamineViewer"  + this .getId (), this .touchend  .bind (this));
            $(document) .on ("touchmove.ExamineViewer" + this .getId (), this .touchmove .bind (this));

            this .disconnect ();
            this .getActiveViewpoint () .transitionStop ();
            this .getBrowser () .setCursor ("MOVE");

            this .getPointOnCenterPlane (x, y, this .fromPoint);

            this ._isActive = true;
            break;
         }
      }
   },
   mouseup: function (event)
   {
      if (event .button !== this .button)
         return;

      this .button = -1;

      $(document) .off (".ExamineViewer" + this .getId ());

      switch (this .getButton (event .button))
      {
         case 0:
         {
            // End rotate.

            // Stop event propagation.
            event .preventDefault ();
            event .stopImmediatePropagation ();

            this .getBrowser () .setCursor ("DEFAULT");

            if (Math .abs (this .rotation .angle) > SPIN_ANGLE && Date .now () - this .motionTime < SPIN_RELEASE_TIME)
               this .addSpinning (this .rotation);

            this ._isActive = false;
            break;
         }
         case 1:
         {
            // End pan.

            // Stop event propagation.
            event .preventDefault ();
            event .stopImmediatePropagation ();

            this .getBrowser () .setCursor ("DEFAULT");

            this ._isActive = false;
            break;
         }
      }
   },
   dblclick: function (event)
   {
      // Stop event propagation.
      event .preventDefault ();
      event .stopImmediatePropagation ();

      const [x, y] = this .getPointer (event);

      this .disconnect ();
      this .lookAtBBox (x, y, this .getStraightenHorizon ());
   },
   mousemove: (function ()
   {
      const fromPoint = new Vector3 (0, 0, 0);

      return function (event)
      {
         const [x, y] = this .getPointer (event);

         switch (this .getButton (this .button))
         {
            case 0:
            {
               // Rotate view around Viewpoint.centerOfRotation.

               // Stop event propagation.
               event .preventDefault ();
               event .stopImmediatePropagation ();

               const toVector = this .trackballProjectToSphere (x, y, this .toVector);

               this .rotation .setFromToVec (toVector, this .fromVector);

               if (Math .abs (this .rotation .angle) < SPIN_ANGLE && Date .now () - this .pressTime < MOTION_TIME)
                  return;

               this .addRotate (this .rotation);

               this .fromVector .assign (toVector);
               this .motionTime = Date .now ();
               break;
            }
            case 1:
            {
               // Move view along center plane.

               // Stop event propagation.
               event .preventDefault ();
               event .stopImmediatePropagation ();

               const
                  viewpoint   = this .getActiveViewpoint (),
                  toPoint     = this .getPointOnCenterPlane (x, y, this .toPoint),
                  translation = viewpoint .getUserOrientation () .multVecRot (fromPoint .assign (this .fromPoint) .subtract (toPoint));

               this .addMove (translation, translation);

               this .fromPoint .assign (toPoint);
               break;
            }
         }
      };
   })(),
   mousewheel: (function ()
   {
      const
         step        = new Vector3 (0, 0, 0),
         translation = new Vector3 (0, 0, 0);

      return function (event)
      {
         const [x, y] = this .getPointer (event);

         if (!this .isPointerInRectangle (x, y))
            return;

         // Stop event propagation.

         event .preventDefault ();
         event .stopImmediatePropagation ();

         // Change viewpoint position.

         const
            browser   = this .getBrowser (),
            viewpoint = this .getActiveViewpoint ();

         browser .prepareEvents () .removeInterest ("spin", this);
         viewpoint .transitionStop ();

         this .getDistanceToCenter (step) .multiply (event .zoomFactor || SCROLL_FACTOR);
         viewpoint .getUserOrientation () .multVecRot (translation .set (0, 0, step .magnitude ()));

         if (event .deltaY > 0)
            this .addMove (translation .negate (), Vector3 .Zero);

         else if (event .deltaY < 0)
            this .addMove (translation, Vector3 .Zero);
      };
   })(),
   touchstart: function (event)
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
   touchend: function (event)
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
   touchmove: (function ()
   {
      const
         MOVE_ANGLE   = 0.7,
         ZOOM_ANGLE   = -0.7,
         touch1Change = new Vector2 (0, 0),
         touch2Change = new Vector2 (0, 0);

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
   set_positionOffset__: function (value)
   {
      const viewpoint = this .getActiveViewpoint ();

      viewpoint ._positionOffset = value;
   },
   set_centerOfRotationOffset__: function (value)
   {
      const viewpoint = this .getActiveViewpoint ();

      viewpoint ._centerOfRotationOffset = value;
   },
   set_rotation__: function (value)
   {
      const viewpoint = this .getActiveViewpoint ();

      viewpoint ._orientationOffset = this .getOrientationOffset (value .getValue (), this .initialOrientationOffset, false);
      viewpoint ._positionOffset    = this .getPositionOffset (this .initialPositionOffset, this .initialOrientationOffset, viewpoint ._orientationOffset .getValue ());
   },
   addRotate: (function ()
   {
      const destination = new Rotation4 ();

      return function (rotationChange)
      {
         const viewpoint = this .getActiveViewpoint ();

         if (this .rotationChaser ._isActive .getValue () && this .rotationChaser ._value_changed .hasInterest ("set_rotation__", this))
         {
            try
            {
               destination .assign (this .rotationChaser ._set_destination .getValue ())
                  .multLeft (rotationChange);

               // Check for critical angle.
               this .getOrientationOffset (destination, this .initialOrientationOffset, true);

               this .rotationChaser ._set_destination = destination;
            }
            catch (error)
            {
               // Slide along critical angle.

               rotationChange = this .getHorizonRotation (rotationChange);

               destination .assign (this .rotationChaser ._set_destination .getValue ())
                  .multLeft (rotationChange);

               this .rotationChaser ._set_destination = destination;
            }
         }
         else
         {
            try
            {
               this .initialOrientationOffset .assign (viewpoint ._orientationOffset .getValue ());
               this .initialPositionOffset    .assign (viewpoint ._positionOffset    .getValue ());

               // Check for critical angle.
               this .getOrientationOffset (rotationChange, this .initialOrientationOffset, true);

               this .rotationChaser ._set_value       = Rotation4 .Identity;
               this .rotationChaser ._set_destination = rotationChange;
            }
            catch (error)
            {
               // Slide along critical angle.

               this .rotationChaser ._set_value       = Rotation4 .Identity;
               this .rotationChaser ._set_destination = this .getHorizonRotation (rotationChange);
            }
         }

         this .disconnect ();
         this .rotationChaser ._value_changed .addInterest ("set_rotation__", this);
      };
   })(),
   addSpinning: function (rotationChange)
   {
      this .disconnect ();

      if (this .getStraightenHorizon ())
      {
         const
            viewpoint            = this .getActiveViewpoint (),
            userPosition         = viewpoint .getUserPosition (),
            userCenterOfRotation = viewpoint .getUserCenterOfRotation (),
            direction            = Vector3 .subtract (userPosition, userCenterOfRotation),
            rotation             = this .getHorizonRotation (rotationChange),
            axis                 = viewpoint .getUpVector (true);

         this .axis .assign (axis);

         if (rotation .getAxis (new Vector3 (0, 0, 0)) .dot (Vector3 .yAxis) < 0 !== rotation .angle < 0)
            this .axis .negate ();

         this .timeSensor ._cycleInterval = Math .PI / (rotationChange .angle * SPIN_FACTOR * 30);
         this .timeSensor ._startTime     = this .getBrowser () .getCurrentTime ();

         const lookAtRotation = viewpoint .getLookAtRotation (userPosition, userCenterOfRotation);

         this .direction .assign (direction);
         this .orientationOffset .assign (viewpoint .getUserOrientation ()) .multRight (lookAtRotation .inverse ());
      }
      else
      {
         this .getBrowser () .prepareEvents () .addInterest ("spin", this);
         this .rotation .assign (rotationChange);
      }
   },
   spin: (function ()
   {
      const
         direction         = new Vector3 (0, 0, 0),
         positionOffset    = new Vector3 (0, 0, 0),
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

            viewpoint ._orientationOffset = this .getOrientationOffset (rotation, this .orientationOffset);
            viewpoint ._positionOffset    = this .getPositionOffset (viewpoint ._positionOffset .getValue (), this .orientationOffset, viewpoint ._orientationOffset .getValue ());
         }
      };
   })(),
   addMove: (function ()
   {
      const
         positionOffset         = new Vector3 (0, 0, 0),
         centerOfRotationOffset = new Vector3 (0, 0, 0);

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
   getPositionOffset: (function ()
   {
      const
         distance = new Vector3 (0, 0, 0),
         d        = new Vector3 (0, 0, 0),
         oob      = new Rotation4 (0, 0, 1, 0);

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
   getOrientationOffset: (function ()
   {
      const
         userOrientation   = new Rotation4 (0, 0, 1, 0),
         orientationOffset = new Rotation4 (0, 0, 1, 0),
         zAxis             = new Vector3 (0, 0, 0);

      return function (rotation, orientationOffsetBefore, _throw)
      {
         const
            viewpoint         = this .getActiveViewpoint (),
            straightenHorizon = this .getStraightenHorizon ();

         userOrientation
            .assign (rotation)
            .multRight (viewpoint .getOrientation ())
            .multRight (orientationOffsetBefore);

         if (straightenHorizon)
            viewpoint .straightenHorizon (userOrientation);

         const orientationOffsetAfter = orientationOffset
            .assign (viewpoint .getOrientation ())
            .inverse ()
            .multRight (userOrientation);

         if (straightenHorizon)
         {
            if (! _throw)
               return orientationOffsetAfter;

            const userVector = userOrientation .multVecRot (zAxis .assign (Vector3 .zAxis));

            if (Math .abs (viewpoint .getUpVector (true) .dot (userVector)) < CRITICAL_ANGLE)
               return orientationOffsetAfter;

            throw new Error ("Critical angle");
         }
         else
         {
            return orientationOffsetAfter;
         }
      };
   })(),
   getHorizonRotation: (function ()
   {
      const zAxis = new Vector3 (0, 0, 0);

      return function (rotation)
      {
         const
            V = rotation .multVecRot (zAxis .assign (Vector3 .zAxis)),
            N = Vector3 .cross (Vector3 .yAxis, V),
            H = Vector3 .cross (N, Vector3 .yAxis),
            r = new Rotation4 (Vector3 .zAxis, H);

         return r;
      };
   })(),
   disconnect: function ()
   {
      const browser = this .getBrowser ();

      this .positionChaser         ._value_changed .removeInterest ("set_positionOffset__",         this);
      this .centerOfRotationChaser ._value_changed .removeInterest ("set_centerOfRotationOffset__", this);
      this .rotationChaser         ._value_changed .removeInterest ("set_rotation__",               this);

      this .timeSensor ._stopTime = browser .getCurrentTime ();
      browser .prepareEvents () .removeInterest ("spin", this);
   },
   dispose: function ()
   {
      const browser = this .getBrowser ();

      this .disconnect ();
      this .getNavigationInfo () ._transitionStart .removeInterest ("disconnect", this);
      browser .getBrowserOptions () ._StraightenHorizon .removeInterest ("disconnect", this);

      browser ._activeViewpoint .removeInterest ("set_activeViewpoint__", this);

      browser .getSurface () .off (".ExamineViewer");
      $(document) .off (".ExamineViewer" + this .getId ());
   },
});

export default ExamineViewer;
