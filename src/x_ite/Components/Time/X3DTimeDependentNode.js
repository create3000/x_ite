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

import Fields       from "../../Fields.js";
import X3DNode      from "../Core/X3DNode.js";
import X3DChildNode from "../Core/X3DChildNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

function X3DTimeDependentNode (executionContext)
{
   this .addType (X3DConstants .X3DTimeDependentNode);

   this .addChildObjects (X3DConstants .outputOnly,  "initialized", new Fields .SFTime (),
                          X3DConstants .inputOutput, "isEvenLive",  new Fields .SFBool ());

   this .startTimeValue  = 0;
   this .pauseTimeValue  = 0;
   this .resumeTimeValue = 0;
   this .stopTimeValue   = 0;
   this .start           = 0;
   this .pause           = 0;
   this .pauseInterval   = 0;
   this .timeouts        = new Map ();
   this .disabled        = false;
}

Object .assign (Object .setPrototypeOf (X3DTimeDependentNode .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      this .getLive ()  .addInterest ("set_live__", this);
      this ._isEvenLive .addInterest ("set_live__", this);

      this ._initialized .addInterest ("set_loop__",       this);
      this ._enabled     .addInterest ("set_enabled__",    this);
      this ._loop        .addInterest ("set_loop__",       this);
      this ._startTime   .addInterest ("set_startTime__",  this);
      this ._pauseTime   .addInterest ("set_pauseTime__",  this);
      this ._resumeTime  .addInterest ("set_resumeTime__", this);
      this ._stopTime    .addInterest ("set_stopTime__",   this);

      this .startTimeValue  = this ._startTime  .getValue ();
      this .pauseTimeValue  = this ._pauseTime  .getValue ();
      this .resumeTimeValue = this ._resumeTime .getValue ();
      this .stopTimeValue   = this ._stopTime   .getValue ();

      this ._initialized = this .getBrowser () .getCurrentTime ();
   },
   getElapsedTime ()
   {
      return this .getBrowser () .getCurrentTime () - this .start - this .pauseInterval;
   },
   resetElapsedTime ()
   {
      this .start         = this .getBrowser () .getCurrentTime ();
      this .pause         = this .getBrowser () .getCurrentTime ();
      this .pauseInterval = 0;
   },
   set_live__ ()
   {
      if (this .getLive () .getValue () || this ._isEvenLive .getValue ())
      {
         if (this .disabled)
         {
            this .disabled = false;

            if (this ._isActive .getValue () && !this ._isPaused .getValue ())
               this .real_resume ();
         }
      }
      else
      {
         if (!this .disabled && this ._isActive .getValue () && !this ._isPaused .getValue ())
         {
            // Only disable if needed, ie. if running!
            this .disabled = true;
            this .real_pause ();
         }
      }
   },
   set_enabled__ ()
   {
      if (this ._enabled .getValue ())
         this .set_loop__ ();

      else
         this .stop ();
   },
   set_loop__ ()
   {
      if (this ._enabled .getValue ())
      {
         if (this ._loop .getValue ())
         {
            if (this .stopTimeValue <= this .startTimeValue)
            {
               if (this .startTimeValue <= this .getBrowser () .getCurrentTime ())
                  this .do_start ();
            }
         }
      }

      this .set_loop ();
   },
   set_startTime__ ()
   {
      this .startTimeValue = this ._startTime .getValue ();

      if (this ._enabled .getValue ())
      {
         this .removeTimeout ("start");

         if (this .startTimeValue <= this .getBrowser () .getCurrentTime ())
            this .do_start ();

         else
            this .addTimeout ("start", "do_start", this .startTimeValue);
      }
   },
   set_pauseTime__ ()
   {
      this .pauseTimeValue = this ._pauseTime .getValue ();

      if (this ._enabled .getValue ())
      {
         this .removeTimeout ("pause");

         if (this .pauseTimeValue <= this .resumeTimeValue)
            return;

         if (this .pauseTimeValue <= this .getBrowser () .getCurrentTime ())
            this .do_pause ();

         else
            this .addTimeout ("pause", "do_pause", this .pauseTimeValue);
      }
   },
   set_resumeTime__ ()
   {
      this .resumeTimeValue = this ._resumeTime .getValue ();

      if (this ._enabled .getValue ())
      {
         this .removeTimeout ("resume");

         if (this .resumeTimeValue <= this .pauseTimeValue)
            return;

         if (this .resumeTimeValue <= this .getBrowser () .getCurrentTime ())
            this .do_resume ();

         else
            this .addTimeout ("resume", "do_resume", this .resumeTimeValue);
      }
   },
   set_stopTime__ ()
   {
      this .stopTimeValue = this ._stopTime .getValue ();

      if (this ._enabled .getValue ())
      {
         this .removeTimeout ("stop");

         if (this .stopTimeValue <= this .startTimeValue)
            return;

         if (this .stopTimeValue <= this .getBrowser () .getCurrentTime ())
            this .do_stop ();

         else
            this .addTimeout ("stop", "do_stop", this .stopTimeValue);
      }
   },
   do_start ()
   {
      if (!this ._isActive .getValue ())
      {
         this .resetElapsedTime ();

         // The event order below is very important.

         this ._isActive    = true;
         this ._elapsedTime = 0;

         this .set_start ();

         if (this .getLive () .getValue () || this ._isEvenLive .getValue ())
         {
            this .getBrowser () .timeEvents () .addInterest ("set_time" ,this);
         }
         else
         {
            this .disabled = true;
            this .real_pause ();
         }
      }
   },
   do_pause ()
   {
      if (this ._isActive .getValue () && !this ._isPaused .getValue ())
      {
         this ._isPaused = true;

         if (this .getLive () .getValue () || this ._isEvenLive .getValue ())
            this .real_pause ();
      }
   },
   real_pause ()
   {
      this .pause = Date .now () / 1000;

      this .set_pause ();

      this .getBrowser () .timeEvents () .removeInterest ("set_time" ,this);
   },
   do_resume ()
   {
      if (this ._isActive .getValue () && this ._isPaused .getValue ())
      {
         this ._isPaused = false;

         if (this .getLive () .getValue () || this ._isEvenLive .getValue ())
            this .real_resume ();
      }
   },
   real_resume ()
   {
      const interval = Date .now () / 1000 - this .pause;

      this .pauseInterval += interval;

      this .set_resume (interval);

      this .getBrowser () .timeEvents () .addInterest ("set_time", this);
      this .getBrowser () .addBrowserEvent ();
   },
   do_stop ()
   {
      this .stop ();
   },
   stop ()
   {
      if (this ._isActive .getValue ())
      {
         // The event order below is very important.

         this .set_stop ();

         this ._elapsedTime = this .getElapsedTime ();

         if (this ._isPaused .getValue ())
            this ._isPaused = false;

         this ._isActive = false;

         this .getBrowser () .timeEvents () .removeInterest ("set_time" ,this);
      }
   },
   addTimeout (name, callback, time)
   {
      this .removeTimeout (name);

      this .timeouts .set (name, setTimeout (this .processTimeout .bind (this, callback), (time - this .getBrowser () .getCurrentTime ()) * 1000));
   },
   removeTimeout (name)
   {
      clearTimeout (this .timeouts .get (name));

      this .timeouts .delete (name);
   },
   processTimeout (callback)
   {
      if (!this ._enabled .getValue ())
         return;

      if (!(this .getLive () .getValue () || this ._isEvenLive .getValue ()))
         return;

      this .getBrowser () .advanceTime ();

      this [callback] ();
   },
   set_loop: Function .prototype,
   set_start: Function .prototype,
   set_pause: Function .prototype,
   set_resume: Function .prototype,
   set_stop: Function .prototype,
   set_time: Function .prototype,
   dispose ()
   {
      for (const name of [... this .timeouts .keys ()])
         this .removeTimeout (name);
   },
});

Object .defineProperties (X3DTimeDependentNode, X3DNode .getStaticProperties ("X3DTimeDependentNode", "Time", 1));

export default X3DTimeDependentNode;
