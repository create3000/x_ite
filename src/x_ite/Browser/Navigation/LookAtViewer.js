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
import Vector2              from "../../../standard/Math/Numbers/Vector2.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";

typeof jquery_mousewheel; // import plugin

const macOS = /Mac OS X/i .test (navigator .userAgent)

const
   SCROLL_FACTOR = macOS ? 1 / 120 : 1 / 20,
   MOVE_TIME     = 0.3,
   ROTATE_TIME   = 0.3;

function LookAtViewer (executionContext, navigationInfo)
{
   X3DViewer .call (this, executionContext, navigationInfo);

   this .button                 = -1;
   this .fromVector             = new Vector3 ();
   this .toVector               = new Vector3 ();

   this .touch1                 = new Vector2 ();
   this .touch2                 = new Vector2 ();
   this .tapStart               = 0;
   this .dblTapInterval         = 0.4;

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
         element = browser .getSurface ();

      // Bind pointing device events.

      element .on ("mousedown.LookAtViewer",  this .mousedown  .bind (this));
      element .on ("mouseup.LookAtViewer",    this .mouseup    .bind (this));
      element .on ("dblclick.LookAtViewer",   this .dblclick   .bind (this));
      element .on ("mousewheel.LookAtViewer", this .mousewheel .bind (this));

      element .on ("touchstart.LookAtViewer", this .touchstart .bind (this));
      element .on ("touchend.LookAtViewer",   this .touchend   .bind (this));

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

            this .button = event .button;

            $(document) .on ("mouseup.LookAtViewer"   + this .getId (), this .mouseup   .bind (this));
            $(document) .on ("mousemove.LookAtViewer" + this .getId (), this .mousemove .bind (this));
            $(document) .on ("touchend.LookAtViewer"  + this .getId (), this .mouseup   .bind (this));
            $(document) .on ("touchmove.LookAtViewer" + this .getId (), this .touchmove .bind (this));

            this .getActiveViewpoint () .transitionStop ();

            // Look around.

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

      this .button = -1;

      $(document) .off (".LookAtViewer" + this .getId ());

      switch (event .button)
      {
         case 0:
         {
            // Stop event propagation.

            event .preventDefault ();

            this ._isActive = false;
            break;
         }
      }
   },
   dblclick (event)
   {
      // Stop event propagation.

      event .preventDefault ();

      const { x, y } = this .getBrowser () .getPointerFromEvent (event);

      this .disconnect ();
      this .lookAtPoint (x, y, this .getStraightenHorizon ());
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

            // Look around

            const toVector = this .trackballProjectToSphere (x, y, this .toVector);

            this .addRotation (this .fromVector, toVector);
            this .fromVector .assign (toVector);
            break;
         }
      }
   },
   mousewheel: (() =>
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
         viewpoint .getUserOrientation () .multVecRot (translation .set (0, 0, step .magnitude ()));

         if (event .deltaY > 0)
            this .addMove (translation .negate (), Vector3 .Zero);

         else if (event .deltaY < 0)
            this .addMove (translation, Vector3 .Zero);
      };
   })(),
   touchstart (event)
   {
      const touches = event .originalEvent .touches;

      switch (touches .length)
      {
         case 1:
         {
            // Start move (button 0).

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
         case 3:
         {
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
            // End look around (button 0).
            this .mouseup (event);
            break;
         }
      }

      // Start dblclick (button 0).

      if (this .getBrowser () .getCurrentTime () - this .tapStart < this .dblTapInterval)
      {
         event .button = 1;
         event .pageX  = this .touch1 .x;
         event .pageY  = this .touch1 .y;

         this .dblclick (event);
      }

      this .tapStart = this .getBrowser () .getCurrentTime ();
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
               // Move (button 0).
               break;
            }
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
                     delta     = distance2 - distance1;

                  event .deltaY     = delta;
                  event .zoomFactor = Math .abs (delta) / $(window) .width ();

                  event .pageX  = (touches [0] .pageX + touches [1] .pageX) / 2;
                  event .pageY  = (touches [0] .pageY + touches [1] .pageY) / 2;

                  this .mousewheel (event);
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
               .setFromToVec (toVector, fromVector)
               .multRight (viewpoint .getOrientation ())
               .multRight (this .orientationChaser ._set_destination .getValue ());

            viewpoint .straightenHorizon (userOrientation);

            orientationOffset .assign (viewpoint .getOrientation ()) .inverse () .multRight (userOrientation);

            this .orientationChaser ._set_destination = orientationOffset;
         }
         else
         {
            userOrientation
               .setFromToVec (toVector, fromVector)
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
      this .orientationChaser      ._value_changed .removeInterest ("set_orientationOffset__", this);
      this .positionChaser         ._value_changed .removeInterest ("set_positionOffset__",         this)
      this .centerOfRotationChaser ._value_changed .removeInterest ("set_centerOfRotationOffset__", this)
   },
   dispose ()
   {
      this .getBrowser () .getSurface () .off (".LookAtViewer");
      $(document) .off (".LookAtViewer" + this .getId ());
   },
});

Object .defineProperties (LookAtViewer,
{
   typeName:
   {
      value: "LookAtViewer",
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .outputOnly, "isActive", new Fields .SFBool ()),
      ]),
      enumerable: true,
   },
});

export default LookAtViewer;
