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

import X3DConstants from "../../Base/X3DConstants.js";
import Fields       from "../../Fields.js";
import URLs         from "./URLs.js";
import X3DScene     from "../../Execution/X3DScene.js";
import _            from "../../../locale/gettext.js";

const
   _baseURL        = Symbol (),
   _loadingDisplay = Symbol (),
   _loadingTotal   = Symbol (),
   _loadingObjects = Symbol (),
   _loading        = Symbol (),
   _set_loadCount  = Symbol (),
   _defaultScene   = Symbol ();

function getBaseURI (element)
{
   const baseURI = element .prop ("baseURI");

   // Fix for Edge.
   if (baseURI .startsWith ("about:"))
      return document .baseURI;

   return baseURI;
}

function X3DNetworkingContext ()
{
   this .addChildObjects (X3DConstants .outputOnly, "loadCount", new Fields .SFInt32 ());

   this [_baseURL]        = getBaseURI (this .getElement ());
   this [_loadingDisplay] = 0;
   this [_loadingTotal]   = 0;
   this [_loadingObjects] = new Set ();
   this [_loading]        = false;
}

Object .assign (X3DNetworkingContext .prototype,
{
   initialize ()
   {
      this ._loadCount .addInterest (_set_loadCount, this);
   },
   getProviderURL ()
   {
      return URLs .getProviderURL ();
   },
   getBaseURL ()
   {
      return this [_baseURL];
   },
   setBaseURL (value)
   {
      const
         base = getBaseURI (this .getElement ()),
         url  = new URL (value, base);

      this [_baseURL] = url .protocol .match (/^(?:data|blob):$/) ? base : url .href;
   },
   getBrowserLoading ()
   {
      return this [_loading];
   },
   setBrowserLoading (value)
   {
      this [_loading] = value;

      if (value)
      {
         if (!this [_loadingObjects] .has (this))
            this .resetLoadCount ();

         this .getShadow () .find (".x_ite-private-world-info") .remove ();

         if (this .getBrowserOption ("SplashScreen"))
         {
            this .getContextMenu () .hide ();
            this .getCanvas () .hide ();
            this .getSplashScreen () .removeClass (["x_ite-private-fade-out-2000", "x_ite-private-hidden"]);
         }
      }
      else
      {
         if (this .getBrowserOption ("SplashScreen"))
         {
            this .getCanvas () .show ();

            // Defer until promises are resolved.
            setTimeout (() =>
            {
               if (!this [_loading])
                  this .getSplashScreen () .addClass ("x_ite-private-fade-out-2000");
            });
         }
      }
   },
   getLoadingObjects ()
   {
      return this [_loadingObjects];
   },
   addLoadingObject (object)
   {
      if (!this [_loadingObjects] .has (object))
         ++ this [_loadingTotal];

      this [_loadingObjects] .add (object);

      this ._loadCount = this [_loadingObjects] .size;
   },
   removeLoadingObject (object)
   {
      this [_loadingObjects] .delete (object);

      this ._loadCount = this [_loadingObjects] .size;
   },
   getDisplayLoadCount ()
   {
      return Array .from (this [_loadingObjects]) .reduce ((v, o) => v + !(o .isPrivate ?.() ?? true), 0);
   },
   resetLoadCount ()
   {
      this ._loadCount       = 0;
      this [_loadingDisplay] = 0;
      this [_loadingTotal]   = 0;

      this [_loadingObjects] .clear ();

      for (const object of this .getPrivateScene () .getLoadingObjects ())
         this .addLoadingObject (object);
   },
   [_set_loadCount] ()
   {
      const loadingDisplay = this .getDisplayLoadCount ();

      if (this ._loadCount .getValue () || this [_loading])
      {
         var string = ((loadingDisplay || 1) === 1
            ? _ ("Loading %1 file")
            : _ ("Loading %1 files")) .replace ("%1", loadingDisplay || 1);
      }
      else
      {
         var string = _("Loading done");
      }

      this .updateCursor ();

      if (this [_loading])
      {
         this .getSplashScreen () .find (".x_ite-private-spinner-text") .text (string);
         this .getSplashScreen () .find (".x_ite-private-progressbar div")
            .css ("width", (100 - 100 * this ._loadCount .getValue () / this [_loadingTotal]) + "%");
      }
      else
      {
         if (loadingDisplay !== this [_loadingDisplay])
            this .setDescription (string);
      }

      this [_loadingDisplay] = loadingDisplay;
   },
   getDefaultScene ()
   {
      // Inline node's empty scene.

      return this [_defaultScene] ??= (() =>
      {
         const defaultScene = new X3DScene (this);

         defaultScene .setup ();
         defaultScene .setLive (this .isLive ());

         return defaultScene;
      })();
   },
});

export default X3DNetworkingContext;
