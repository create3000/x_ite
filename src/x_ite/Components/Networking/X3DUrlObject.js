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
   "x_ite/Fields",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DConstants)
{
"use strict";

   function X3DUrlObject (executionContext)
   {
      this .addType (X3DConstants .X3DUrlObject);

      this .addChildObjects ("loadState", new Fields .SFInt32 (X3DConstants .NOT_STARTED_STATE),
                             "urlBuffer", new Fields .MFString ());

      this .cache                = true;
      this .autoRefreshStartTime = performance .now ();
   }

   X3DUrlObject .prototype =
   {
      constructor: X3DUrlObject,
      initialize: function ()
      {
         this .isLive () .addInterest ("set_live__", this);

         this .load_                 .addInterest ("set_load__",        this);
         this .url_                  .addInterest ("set_url__",         this);
         this .urlBuffer_            .addInterest ("loadNow",           this);
         this .autoRefresh_          .addInterest ("set_autoRefresh__", this);
         this .autoRefreshTimeLimit_ .addInterest ("set_autoRefresh__", this);
      },
      setLoadState: function (value, notify = true)
      {
         this .loadState_ = value;

         if (value === X3DConstants .COMPLETE_STATE)
         {
            this .autoRefreshCompleteTime = performance .now ();
            this .setAutoRefreshTimer (this .autoRefresh_ .getValue ());
         }

         if (!notify)
            return;

         switch (value)
         {
            case X3DConstants .NOT_STARTED_STATE:
               break;
            case X3DConstants .IN_PROGRESS_STATE:
            {
               this .getScene () .addLoadCount (this);
               break;
            }
            case X3DConstants .COMPLETE_STATE:
            case X3DConstants .FAILED_STATE:
            {
               this .getScene () .removeLoadCount (this);
               break;
            }
         }
      },
      checkLoadState: function ()
      {
         return this .loadState_ .getValue ();
      },
      getLoadState: function ()
      {
         return this .loadState_;
      },
      setCache: function (value)
      {
         this .cache = value;
      },
      getCache: function ()
      {
         return this .cache;
      },
      requestImmediateLoad: function (cache = true)
      {
         if (this .checkLoadState () === X3DConstants .COMPLETE_STATE || this .checkLoadState () === X3DConstants .IN_PROGRESS_STATE)
            return;

         if (!this .load_ .getValue ())
            return;

         if (this .url_ .length === 0)
            return;

         this .setCache (cache);
         this .setLoadState (X3DConstants .IN_PROGRESS_STATE);

         // Buffer prevents double load of the scene if load and url field are set at the same time.
         this .urlBuffer_ = this .url_;
      },
      loadNow: function ()
      { },
      requestUnload: function ()
      {
         if (this .checkLoadState () === X3DConstants .NOT_STARTED_STATE || this .checkLoadState () === X3DConstants .FAILED_STATE)
            return;

         this .setLoadState (X3DConstants .NOT_STARTED_STATE);
         this .unloadNow ();
      },
      unloadNow: function ()
      { },
      setAutoRefreshTimer: function (autoRefreshInterval)
      {
         clearTimeout (this .autoRefreshId);

         if (this .autoRefresh_ .getValue () <= 0)
            return;

         const autoRefreshTimeLimit = this .autoRefreshTimeLimit_ .getValue ();

         if (autoRefreshTimeLimit !== 0)
         {
            if ((performance .now () - this .autoRefreshStartTime) / 1000 > autoRefreshTimeLimit - autoRefreshInterval)
               return;
         }

         this .autoRefreshId = setTimeout (this .performAutoRefresh .bind (this), autoRefreshInterval * 1000);
      },
      performAutoRefresh: function ()
      {
         this .setLoadState (X3DConstants .NOT_STARTED_STATE);
         this .requestImmediateLoad (false);
      },
      set_live__: function ()
      {
         if (this .isLive () .getValue ())
            this .set_autoRefresh__ ();
         else
            clearTimeout (this .autoRefreshId);
      },
      set_load__: function ()
      {
         if (this .load_ .getValue ())
         {
            this .setLoadState (X3DConstants .NOT_STARTED_STATE);

            this .requestImmediateLoad ();
         }
         else
            this .requestUnload ();
      },
      set_url__: function ()
      {
         if (!this .load_ .getValue ())
            return;

         this .setLoadState (X3DConstants .NOT_STARTED_STATE);

         this .requestImmediateLoad ();
      },
      set_autoRefresh__: function ()
      {
         if (this .checkLoadState () !== X3DConstants .COMPLETE_STATE)
            return;

         const
            elapsedTime = (performance .now () - this .autoRefreshCompleteTime) / 1000,
            autoRefresh = this .autoRefresh_ .getValue ();

         let autoRefreshInterval = autoRefresh - elapsedTime;

         if (autoRefreshInterval < 0)
            autoRefreshInterval = Math .ceil (elapsedTime / autoRefresh) * autoRefresh - elapsedTime;

         this .setAutoRefreshTimer (autoRefreshInterval);
      }
   };

   return X3DUrlObject;
});
