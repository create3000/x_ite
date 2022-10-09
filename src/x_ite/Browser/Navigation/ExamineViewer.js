/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
   "jquery",
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Base/X3DConstants",
   "x_ite/Browser/Navigation/X3DViewer",
   "x_ite/Components/Followers/PositionChaser",
   "x_ite/Components/Followers/OrientationChaser",
   "standard/Math/Numbers/Vector2",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Rotation4",
   "jquery-mousewheel",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DConstants,
          X3DViewer,
          PositionChaser,
          OrientationChaser,
          Vector2,
          Vector3,
          Rotation4)
{
"use strict";

   var macOS = /Mac OS X/i .test (navigator .userAgent)

   var
      MOTION_TIME       = 0.05 * 1000,
      SPIN_RELEASE_TIME = 0.04 * 1000,
      SPIN_ANGLE        = 0.003,
      SPIN_FACTOR       = 0.6,
      SCROLL_FACTOR     = macOS ? 1 / 120 : 1 / 20,
      MOVE_TIME         = 0.2,
      ROTATE_TIME       = 0.2,
      MAX_ANGLE         = 0.97;

   function ExamineViewer (executionContext)
   {
      X3DViewer .call (this, executionContext);

      this .button                   = -1;
      this .orientationOffset        = new Rotation4 (0, 0, 1, 0);
      this .fromVector               = new Vector3 (0, 0, 0);
      this .toVector                 = new Vector3 (0, 0, 0);
      this .fromPoint                = new Vector3 (0, 0, 0);
      this .toPoint                  = new Vector3 (0, 0, 0);
      this .rotation                 = new Rotation4 (0, 0, 1, 0);
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

         var
            browser = this .getBrowser (),
            element = browser .getSurface ();

         // Disconnect from spin.

         this .getNavigationInfo () ._transitionStart .addInterest ("disconnect", this);
         browser ._activeViewpoint .addInterest ("set_activeViewpoint__", this);

         // Bind pointing device events.

         element .bind ("mousedown.ExamineViewer",  this .mousedown  .bind (this));
         element .bind ("mouseup.ExamineViewer",    this .mouseup    .bind (this));
         element .bind ("dblclick.ExamineViewer",   this .dblclick   .bind (this));
         element .bind ("mousewheel.ExamineViewer", this .mousewheel .bind (this));

         element .bind ("touchstart.ExamineViewer",  this .touchstart .bind (this));
         element .bind ("touchend.ExamineViewer",    this .touchend   .bind (this));

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

         this .set_activeViewpoint__ ();
      },
      set_activeViewpoint__: function ()
      {
         if (this .getStraightenHorizon ())
         {
            var viewpoint = this .getActiveViewpoint ();

            if (viewpoint)
               viewpoint ._orientationOffset = this .getOrientationOffset (Rotation4 .Identity, viewpoint ._orientationOffset .getValue (), false);
         }

         this .disconnect ();
      },
      mousedown: function (event)
      {
         if (this .getBrowser () .getContextMenu () .getActive ())
            return;

         if (this .button >= 0)
            return;

         this .pressTime = performance .now ();

         var
            offset = this .getBrowser () .getSurface () .offset (),
            x      = event .pageX - offset .left,
            y      = event .pageY - offset .top;

         switch (this .getButton (event .button))
         {
            case 0:
            {
               // Start rotate.

               // Stop event propagation.
               event .preventDefault ();
               event .stopImmediatePropagation ();

               this .button = event .button;

               $(document) .bind ("mouseup.ExamineViewer"   + this .getId (), this .mouseup   .bind (this));
               $(document) .bind ("mousemove.ExamineViewer" + this .getId (), this .mousemove .bind (this));
               $(document) .bind ("touchend.ExamineViewer"  + this .getId (), this .touchend  .bind (this));
               $(document) .bind ("touchmove.ExamineViewer" + this .getId (), this .touchmove .bind (this));

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

               $(document) .bind ("mouseup.ExamineViewer"   + this .getId (), this .mouseup   .bind (this));
               $(document) .bind ("mousemove.ExamineViewer" + this .getId (), this .mousemove .bind (this));
               $(document) .bind ("touchend.ExamineViewer"  + this .getId (), this .touchend  .bind (this));
               $(document) .bind ("touchmove.ExamineViewer" + this .getId (), this .touchmove .bind (this));

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

         $(document) .unbind (".ExamineViewer" + this .getId ());

         switch (this .getButton (event .button))
         {
            case 0:
            {
               // End rotate.

               // Stop event propagation.
               event .preventDefault ();
               event .stopImmediatePropagation ();

               var viewpoint = this .getActiveViewpoint ();

               this .getBrowser () .setCursor ("DEFAULT");

               if (Math .abs (this .rotation .angle) > SPIN_ANGLE && performance .now () - this .motionTime < SPIN_RELEASE_TIME)
               {
                  if (this .getStraightenHorizon () && viewpoint .getTypeName () !== "GeoViewpoint")
                     this .rotation = this .getHorizonRotation (this .rotation);

                  this .addSpinning (this .rotation);
               }

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

         const
            element = this .getBrowser () .getSurface (),
            offset  = element .offset (),
            x       = event .pageX - offset .left - parseFloat (element .css ('borderLeftWidth')),
            y       = element .innerHeight () - (event .pageY - offset .top - parseFloat (element .css ('borderTopWidth')));

         this .disconnect ();
         this .lookAtBBox (x, y, this .getStraightenHorizon ());
      },
      mousemove: (function ()
      {
         var fromPoint = new Vector3 (0, 0, 0);

         return function (event)
         {
            var
               offset = this .getBrowser () .getSurface () .offset (),
               x      = event .pageX - offset .left,
               y      = event .pageY - offset .top;

            switch (this .getButton (this .button))
            {
               case 0:
               {
                  // Rotate view around Viewpoint.centerOfRotation.

                  // Stop event propagation.
                  event .preventDefault ();
                  event .stopImmediatePropagation ();

                  var toVector = this .trackballProjectToSphere (x, y, this .toVector);

                  this .rotation .setFromToVec (toVector, this .fromVector);

                  if (Math .abs (this .rotation .angle) < SPIN_ANGLE && performance .now () - this .pressTime < MOTION_TIME)
                     return;

                  this .addRotate (this .rotation);

                  this .fromVector .assign (toVector);
                  this .motionTime = performance .now ();
                  break;
               }
               case 1:
               {
                  // Move view along center plane.

                  // Stop event propagation.
                  event .preventDefault ();
                  event .stopImmediatePropagation ();

                  var
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
         var
            step        = new Vector3 (0, 0, 0),
            translation = new Vector3 (0, 0, 0);

         return function (event)
         {
            // Stop event propagation.
            event .preventDefault ();
            event .stopImmediatePropagation ();

            // Change viewpoint position.

            var
               browser   = this .getBrowser (),
               viewpoint = this .getActiveViewpoint ();

            browser .prepareEvents () .removeInterest ("spin", this);
            viewpoint .transitionStop ();

            step        = this .getDistanceToCenter (step) .multiply (event .zoomFactor || SCROLL_FACTOR),
            translation = viewpoint .getUserOrientation () .multVecRot (translation .set (0, 0, step .abs ()));

            if (event .deltaY > 0)
               this .addMove (translation .negate (), Vector3 .Zero);

            else if (event .deltaY < 0)
               this .addMove (translation, Vector3 .Zero);
         };
      })(),
      touchstart: function (event)
      {
         var touches = event .originalEvent .touches;

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

               this .mouseup (event);

               // Start dblclick (button 0).

               if (this .getBrowser () .getCurrentTime () - this .tapStart < this .dblTapInterval)
               {
                  event .button = 0;
                  event .pageX  = this .touch1 .x;
                  event .pageY  = this .touch1 .y;

                  this .dblclick (event);
               }

               this .tapStart = this .getBrowser () .getCurrentTime ();
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
         var
            MOVE_ANGLE   = 0.7,
            ZOOM_ANGLE   = -0.7,
            touch1Change = new Vector2 (0, 0),
            touch2Change = new Vector2 (0, 0);

         return function (event)
         {
            var touches = event .originalEvent .touches;

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

                  var
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

                        var distance1 = this .touch1 .distance (this .touch2);

                        this .touch1 .set (touches [0] .pageX, touches [0] .pageY);
                        this .touch2 .set (touches [1] .pageX, touches [1] .pageY);

                        var
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
      spin: function ()
      {
         var viewpoint = this .getActiveViewpoint ();

         this .orientationOffset .assign (viewpoint ._orientationOffset .getValue ());

         viewpoint ._orientationOffset = this .getOrientationOffset (this .rotation, this .orientationOffset);
         viewpoint ._positionOffset    = this .getPositionOffset (viewpoint ._positionOffset .getValue (), this .orientationOffset, viewpoint ._orientationOffset .getValue ());
      },
      set_positionOffset__: function (value)
      {
         var viewpoint = this .getActiveViewpoint ();

         viewpoint ._positionOffset = value;
      },
      set_centerOfRotationOffset__: function (value)
      {
         var viewpoint = this .getActiveViewpoint ();

         viewpoint ._centerOfRotationOffset = value;
      },
      set_rotation__: function (value)
      {
         var viewpoint = this .getActiveViewpoint ();

         viewpoint ._orientationOffset = this .getOrientationOffset (value .getValue (), this .initialOrientationOffset, false);
         viewpoint ._positionOffset    = this .getPositionOffset (this .initialPositionOffset, this .initialOrientationOffset, viewpoint ._orientationOffset .getValue ());
      },
      addRotate: (function ()
      {
         var destination = new Rotation4 ();

         return function (rotationChange)
         {
            var viewpoint = this .getActiveViewpoint ();

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
      addSpinning: (function ()
      {
         var rotation = new Rotation4 (0, 0, 1, 0);

         return function (rotationChange)
         {
            this .disconnect ();
            this .getBrowser () .prepareEvents () .addInterest ("spin", this);

            this .rotation .assign (rotation .assign (Rotation4 .Identity) .slerp (rotationChange, SPIN_FACTOR));
         };
      })(),
      addMove: (function ()
      {
         var
            positionOffset         = new Vector3 (0, 0, 0),
            centerOfRotationOffset = new Vector3 (0, 0, 0);

         return function (positionOffsetChange, centerOfRotationOffsetChange)
         {
            var viewpoint = this .getActiveViewpoint ();

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
         var
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
         var
            userOrientation   = new Rotation4 (0, 0, 1, 0),
            orientationOffset = new Rotation4 (0, 0, 1, 0),
            zAxis             = new Vector3 (0, 0, 0);

         return function (rotation, orientationOffsetBefore, _throw)
         {
            var
               viewpoint         = this .getActiveViewpoint (),
               straightenHorizon = this .getStraightenHorizon ();

            userOrientation
               .assign (rotation)
               .multRight (viewpoint .getOrientation ())
               .multRight (orientationOffsetBefore);

            if (straightenHorizon && viewpoint .getTypeName () !== "GeoViewpoint")
               viewpoint .straightenHorizon (userOrientation);

            var orientationOffsetAfter = orientationOffset
               .assign (viewpoint .getOrientation ())
               .inverse ()
               .multRight (userOrientation);

            if (straightenHorizon && viewpoint .getTypeName () !== "GeoViewpoint")
            {
               if (! _throw)
                  return orientationOffsetAfter;

               var userVector = userOrientation .multVecRot (zAxis .assign (Vector3 .zAxis));

               if (Math .abs (viewpoint .getUpVector () .dot (userVector)) < MAX_ANGLE)
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
         var zAxis = new Vector3 (0, 0, 0);

         return function (rotation)
         {
            var viewpoint = this .getActiveViewpoint ();

            var
               V = rotation .multVecRot (zAxis .assign (Vector3 .zAxis)) .normalize (),
               N = Vector3 .cross (viewpoint .getUpVector (), V) .normalize (),
               H = Vector3 .cross (N, viewpoint .getUpVector ()) .normalize ();

            return new Rotation4 (Vector3 .zAxis, H);
         };
      })(),
      disconnect: function ()
      {
         var browser = this .getBrowser ();

         this .positionChaser         ._value_changed .removeInterest ("set_positionOffset__",         this);
         this .centerOfRotationChaser ._value_changed .removeInterest ("set_centerOfRotationOffset__", this);
         this .rotationChaser         ._value_changed .removeInterest ("set_rotation__",               this);

         browser .prepareEvents () .removeInterest ("spin", this);
      },
      dispose: function ()
      {
         var browser = this .getBrowser ();

         this .disconnect ();
         browser ._activeViewpoint .removeInterest ("set_activeViewpoint__", this);
         browser .getSurface () .unbind (".ExamineViewer");
         $(document) .unbind (".ExamineViewer" + this .getId ());
      },
   });

   return ExamineViewer;
});
