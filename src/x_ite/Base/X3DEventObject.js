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

import X3DChildObject from "./X3DChildObject.js";
import Events         from "./Events.js";

const _browser = Symbol .for ("X_ITE.X3DEventObject.browser");

function X3DEventObject (browser)
{
   X3DChildObject .call (this);

   this [_browser] = browser;
}

Object .assign (Object .setPrototypeOf (X3DEventObject .prototype, X3DChildObject .prototype),
{
   constructor: X3DEventObject,
   getBrowser ()
   {
      return this [_browser];
   },
   getExtendedEventHandling ()
   {
      // Whether initializeOnly field are treated like inputOnly and inputOutput fields.
      return true;
   },
   addEvent (field)
   {
      if (field .isTainted ())
         return;

      field .setTainted (true);

      this .addEventObject (field, Events .create (field));
   },
   addEventObject (field, event)
   {
      const browser = this .getBrowser ();

      // Register for processEvent

      browser .addTaintedField (field, event);
      browser .addBrowserEvent ();

      // Register for eventsProcessed

      if (this .isTainted ())
         return;

      if (field .isInput () || (this .getExtendedEventHandling () && field .isInitializable ()))
      {
         this .addNodeEvent ();
      }
   },
   addNodeEvent ()
   {
      if (this .isTainted ())
         return;

      const browser = this .getBrowser ();

      this .setTainted (true);
      browser .addTaintedNode (this);
      browser .addBrowserEvent ();
   },
});

for (const key of Reflect .ownKeys (X3DEventObject .prototype))
   Object .defineProperty (X3DEventObject .prototype, key, { enumerable: false });

export default X3DEventObject;
