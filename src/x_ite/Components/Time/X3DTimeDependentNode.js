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
import X3DChildNode from "../Core/X3DChildNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

function X3DTimeDependentNode (executionContext)
{
   this .addType (X3DConstants .X3DTimeDependentNode);

   this .addChildObjects ("initialized", new Fields .SFTime (),
                          "isEvenLive",  new Fields .SFBool ());

   this .startTimeValue  = 0;
   this .pauseTimeValue  = 0;
   this .resumeTimeValue = 0;
   this .stopTimeValue   = 0;
   this .start           = 0;
   this .pause           = 0;
   this .pauseInterval   = 0;
   this .startTimeout    = null;
   this .pauseTimeout    = null;
   this .resumeTimeout   = null;
   this .stopTimeout     = null;
   this .disabled        = false;
}

X3DTimeDependentNode .prototype = Object .assign (Object .create (X3DChildNode .prototype),
{
   constructor: X3DTimeDependentNode,
   initialize: function ()
   {
      this .isLive ()   .addInterest ("set_live__", this);
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
   getDisabled: function ()
   {
      return this .disabled;
   },
   getLiveState: function ()
   {
      ///  Determines the live state of this node.

      return this .getLive () && (this .getExecutionContext () .isLive () .getValue () || this ._isEvenLive .getValue ());
   },
   getElapsedTime: function ()
   {
      return this .getBrowser () .getCurrentTime () - this .start - this .pauseInterval;
   },
   resetElapsedTime: function ()
   {
      this .start         = this .getBrowser () .getCurrentTime ();
      this .pause         = this .getBrowser () .getCurrentTime ();
      this .pauseInterval = 0;
   },
   set_live__: function ()
   {
      if (this .isLive () .getValue () || this ._isEvenLive .getValue ())
      {
         if (this .disabled)
         {
            this .disabled = false;

            if (this ._isActive .getValue () && ! this ._isPaused .getValue ())
               this .real_resume ();
         }
      }
      else
      {
         if (! this .disabled && this ._isActive .getValue () && ! this ._isPaused .getValue ())
         {
            // Only disable if needed, ie. if running!
            this .disabled = true;
            this .real_pause ();
         }
      }
   },
   set_enabled__: function ()
   {
      if (this ._enabled .getValue ())
         this .set_loop__ ();

      else
         this .stop ();
   },
   set_loop__: function ()
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
   },
   set_startTime__: function ()
   {
      this .startTimeValue = this ._startTime .getValue ();

      if (this ._enabled .getValue ())
      {
         this .removeTimeout ("startTimeout");

         if (this .startTimeValue <= this .getBrowser () .getCurrentTime ())
            this .do_start ();

         else
            this .addTimeout ("startTimeout", "do_start", this .startTimeValue);
      }
   },
   set_pauseTime__: function ()
   {
      this .pauseTimeValue = this ._pauseTime .getValue ();

      if (this ._enabled .getValue ())
      {
         this .removeTimeout ("pauseTimeout");

         if (this .pauseTimeValue <= this .resumeTimeValue)
            return;

         if (this .pauseTimeValue <= this .getBrowser () .getCurrentTime ())
            this .do_pause ();

         else
            this .addTimeout ("pauseTimeout", "do_pause", this .pauseTimeValue);
      }
   },
   set_resumeTime__: function ()
   {
      this .resumeTimeValue = this ._resumeTime .getValue ();

      if (this ._enabled .getValue ())
      {
         this .removeTimeout ("resumeTimeout");

         if (this .resumeTimeValue <= this .pauseTimeValue)
            return;

         if (this .resumeTimeValue <= this .getBrowser () .getCurrentTime ())
            this .do_resume ();

         else
            this .addTimeout ("resumeTimeout", "do_resume", this .resumeTimeValue);
      }
   },
   set_stopTime__: function ()
   {
      this .stopTimeValue = this ._stopTime .getValue ();

      if (this ._enabled .getValue ())
      {
         this .removeTimeout ("stopTimeout");

         if (this .stopTimeValue <= this .startTimeValue)
            return;

         if (this .stopTimeValue <= this .getBrowser () .getCurrentTime ())
            this .do_stop ();

         else
            this .addTimeout ("stopTimeout", "do_stop", this .stopTimeValue);
      }
   },
   do_start: function ()
   {
      if (!this ._isActive .getValue ())
      {
         this .resetElapsedTime ();

         // The event order below is very important.

         this ._isActive    = true;
         this ._elapsedTime = 0;

         this .set_start ();

         if (this .isLive () .getValue ())
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
   do_pause: function ()
   {
      if (this ._isActive .getValue () && !this ._isPaused .getValue ())
      {
         this ._isPaused = true;

         if (this .pauseTimeValue !== this .getBrowser () .getCurrentTime ())
            this .pauseTimeValue = this .getBrowser () .getCurrentTime ();

         if (this .isLive () .getValue ())
            this .real_pause ();
      }
   },
   real_pause: function ()
   {
      this .pause = Date .now ();

      this .set_pause ();

      this .getBrowser () .timeEvents () .removeInterest ("set_time" ,this);
   },
   do_resume: function ()
   {
      if (this ._isActive .getValue () && this ._isPaused .getValue ())
      {
         this ._isPaused = false;

         if (this .resumeTimeValue !== this .getBrowser () .getCurrentTime ())
            this .resumeTimeValue = this .getBrowser () .getCurrentTime ();

         if (this .isLive () .getValue ())
            this .real_resume ();
      }
   },
   real_resume: function ()
   {
      const interval = (Date .now () - this .pause) / 1000;

      this .pauseInterval += interval;

      this .set_resume (interval);

      this .getBrowser () .timeEvents () .addInterest ("set_time", this);
      this .getBrowser () .addBrowserEvent ();
   },
   do_stop: function ()
   {
      this .stop ();
   },
   stop: function ()
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
   timeout: function (callback)
   {
      if (this ._enabled .getValue ())
      {
         this .getBrowser () .advanceTime ();

         this [callback] ();
      }
   },
   addTimeout: function (name, callback, time)
   {
      this .removeTimeout (name);
      this [name] = setTimeout (this .timeout .bind (this, callback), (time - this .getBrowser () .getCurrentTime ()) * 1000);
   },
   removeTimeout: function (name)
   {
      clearTimeout (this [name]);
      this [name] = null;
   },
   set_start: function () { },
   set_pause: function () { },
   set_resume: function () { },
   set_stop: function () { },
   set_time: function () { },
   dispose: function () { }
});

export default X3DTimeDependentNode;
