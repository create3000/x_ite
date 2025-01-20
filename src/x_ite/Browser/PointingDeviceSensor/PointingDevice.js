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

import X3DBaseNode from "../../Base/X3DBaseNode.js";

typeof jquery_mousewheel; // import plugin

const CONTEXT_MENU_TIME = 1200;

function PointingDevice (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this .cursor = "DEFAULT";
   this .isOver = false;
}

Object .assign (Object .setPrototypeOf (PointingDevice .prototype, X3DBaseNode .prototype),
{
   initialize ()
   {
      const element = this .getBrowser () .getSurface ();

      //element .on ("mousewheel.PointingDevice", this .mousewheel .bind (this));
      element .on ("mousedown.PointingDevice" + this .getId (), this .mousedown  .bind (this));
      element .on ("mouseup.PointingDevice"   + this .getId (), this .mouseup    .bind (this));
      element .on ("dblclick.PointingDevice"  + this .getId (), this .dblclick   .bind (this));
      element .on ("mousemove.PointingDevice" + this .getId (), this .mousemove  .bind (this));
      element .on ("mouseout.PointingDevice"  + this .getId (), this .onmouseout .bind (this));

      element .on ("touchstart.PointingDevice" + this .getId (), this .touchstart .bind (this));
      element .on ("touchend.PointingDevice"   + this .getId (), this .touchend   .bind (this));
   },
   mousewheel (event)
   {
      // event .preventDefault () must be done in the all viewers.
   },
   mousedown (event)
   {
      const
         browser = this .getBrowser (),
         element = browser .getSurface ();

      browser .getElement () .focus ();

      if (browser .getShiftKey () && browser .getControlKey ())
         return;

      if (event .button === 0)
      {
         const { x, y } = browser .getPointerFromEvent (event);

         element .off ("mousemove.PointingDevice" + this .getId ());

         $(document)
            .on ("mouseup.PointingDevice"   + this .getId (), this .mouseup   .bind (this))
            .on ("mousemove.PointingDevice" + this .getId (), this .mousemove .bind (this))
            .on ("touchend.PointingDevice"  + this .getId (), this .touchend  .bind (this))
            .on ("touchmove.PointingDevice" + this .getId (), this .touchmove .bind (this));

         if (browser .buttonPressEvent (x, y))
         {
            event .preventDefault ();
            event .stopImmediatePropagation (); // Keeps the rest of the handlers from being executed

            browser .setCursor ("HAND");
            this .onverifymotion (x, y);
         }
      }
   },
   mouseup (event)
   {
      event .preventDefault ();

      if (event .button === 0)
      {
         const
            browser = this .getBrowser (),
            element = browser .getSurface ();

         const { x, y } = browser .getPointerFromEvent (event);

         $(document) .off (".PointingDevice" + this .getId ());
         element .on ("mousemove.PointingDevice" + this .getId (), this .mousemove .bind (this));

         browser .buttonReleaseEvent ();
         browser .setCursor (this .isOver ? "HAND" : "DEFAULT");
         this .onverifymotion (x, y);

         this .cursor = "DEFAULT";
      }
   },
   dblclick (event)
   {
      if (this .isOver)
         event .stopImmediatePropagation ();
   },
   mousemove (event)
   {
      event .preventDefault ();

      const browser = this .getBrowser ();

      const { x, y } = browser .getPointerFromEvent (event);

      this .onmotion (x, y);
   },
   touchstart (event)
   {
      const touches = event .originalEvent .touches;

      switch (touches .length)
      {
         case 1:
         {
            // button 0.

            event .button = 0;
            event .pageX  = touches [0] .pageX;
            event .pageY  = touches [0] .pageY;

            this .mousedown (event);

            // Show context menu on long tab.

            const hit = this .getBrowser () .getHit ();

            if (hit .id === 0 || hit .sensors .length === 0)
            {
               this .touchX       = event .pageX;
               this .touchY       = event .pageY;
               this .touchTimeout = setTimeout (this .showContextMenu .bind (this, event), CONTEXT_MENU_TIME);
            }

            break;
         }
         case 2:
         {
            this .touchend (event);
            break;
         }
      }
   },
   touchend (event)
   {
      event .button = 0;

      this .mouseup (event);

      clearTimeout (this .touchTimeout);
   },
   touchmove (event)
   {
      const touches = event .originalEvent .touches;

      switch (touches .length)
      {
         case 1:
         {
            // button 0.

            event .button = 0;
            event .pageX  = touches [0] .pageX;
            event .pageY  = touches [0] .pageY;

            this .mousemove (event);

            if (Math .hypot (this .touchX - event .pageX, this .touchY - event .pageY) > 7)
               clearTimeout (this .touchTimeout);

            break;
         }
      }
   },
   onmotion (x, y)
   {
      const browser = this .getBrowser ();

      if (browser .motionNotifyEvent (x, y))
      {
         if (!this .isOver)
         {
            this .isOver = true;
            this .cursor = browser .getCursor ();

            browser .setCursor ("HAND");
         }
      }
      else
      {
         if (this .isOver)
         {
            this .isOver = false;

            browser .setCursor (this .cursor);
         }
      }
   },
   onmouseout (event)
   {
      this .getBrowser () .leaveNotifyEvent ();
   },
   async onverifymotion (x, y)
   {
      // Verify isOver state. This is necessary if an Switch changes on buttonReleaseEvent
      // and the new child has a sensor node inside. This sensor node must be updated to
      // reflect the correct isOver state.

      await this .getBrowser () .nextFrame ();

      this .onmotion (x, y);
   },
   showContextMenu (event)
   {
      this .getBrowser () .getContextMenu () .show (event);
   },
});

Object .defineProperties (PointingDevice,
{
   typeName:
   {
      value: "PointingDevice",
      enumerable: true,
   },
});

export default PointingDevice;
