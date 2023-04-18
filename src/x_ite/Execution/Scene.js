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

import Fields   from "../Fields.js";
import X3DScene from "./X3DScene.js";

const
   _browser        = Symbol .for ("X_ITE.X3DEventObject.browser"),
   _loadingObjects = Symbol ();

function Scene (browser)
{
   this [_browser] = browser;

   X3DScene .call (this, this);

   this .addChildObjects ("initLoadCount", new Fields .SFInt32 (),  // Pre load count, must be zero before the scene can be passed to the requester.
                          "loadCount",     new Fields .SFInt32 ()); // Load count of all X3DUrlObjects.

   this [_loadingObjects] = new Set ();
}

Scene .prototype = Object .assign (Object .create (X3DScene .prototype),
{
   constructor: Scene,
   setExecutionContext: function (value)
   {
      if (! this .isMainScene ())
      {
         const scene = this .getScene ();

         for (const object of this [_loadingObjects])
            scene .removeLoadingObject (object);
      }

      X3DScene .prototype .setExecutionContext .call (this, value);

      if (! this .isMainScene ())
      {
         const scene = this .getScene ();

         for (const object of this [_loadingObjects])
            scene .addLoadingObject (object);
      }
   },
   addInitLoadCount: function (node)
   {
      this ._initLoadCount = this ._initLoadCount .getValue () + 1;
   },
   removeInitLoadCount: function (node)
   {
      this ._initLoadCount = this ._initLoadCount .getValue () - 1;
   },
   getLoadingObjects: function ()
   {
      return this [_loadingObjects];
   },
   addLoadingObject: function (node)
   {
      if (this [_loadingObjects] .has (node))
         return;

      this [_loadingObjects] .add (node);

      this ._loadCount = this [_loadingObjects] .size;

      const
         browser = this .getBrowser (),
         scene   = this .getScene ();

      if (this === browser .getExecutionContext () || this .loader === browser .loader)
         browser .addLoadingObject (node);

      if (! this .isMainScene ())
         scene .addLoadingObject (node);
   },
   removeLoadingObject: function (node)
   {
      if (!this [_loadingObjects] .has (node))
         return;

      this [_loadingObjects] .delete (node);

      this ._loadCount = this [_loadingObjects] .size;

      const
         browser = this .getBrowser (),
         scene   = this .getScene ();

      if (this === browser .getExecutionContext () || this .loader === browser .loader)
         browser .removeLoadingObject (node);

      if (! this .isMainScene ())
         scene .removeLoadingObject (node);
   },
});

for (const key of Reflect .ownKeys (Scene .prototype))
   Object .defineProperty (Scene .prototype, key, { enumerable: false });

export default Scene;
