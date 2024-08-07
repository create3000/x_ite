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

import X3DNode         from "../Core/X3DNode.js";
import X3DFollowerNode from "./X3DFollowerNode.js";
import X3DConstants    from "../../Base/X3DConstants.js";
import Algorithm       from "../../../standard/Math/Algorithm.js";

function X3DDamperNode (executionContext)
{
   X3DFollowerNode .call (this, executionContext);

   this .addType (X3DConstants .X3DDamperNode);
}

Object .assign (Object .setPrototypeOf (X3DDamperNode .prototype, X3DFollowerNode .prototype),
{
   initialize ()
   {
      X3DFollowerNode .prototype .initialize .call (this);

      this ._order           .addInterest ("set_order__", this);
      this ._set_value       .addInterest ("set_value__", this);
      this ._set_destination .addInterest ("set_destination__", this);

      var
         buffer             = this .getBuffer (),
         initialValue       = this .getInitialValue (),
         initialDestination = this .getInitialDestination ();

      buffer [0] = this .duplicate (initialDestination);

      for (var i = 1, length = this .getOrder () + 1; i < length; ++ i)
         buffer [i] = this .duplicate (initialValue);

      if (this .equals (initialDestination, initialValue, this .getTolerance ()))
         this .setValue (initialDestination);

      else
         this .set_active (true);
   },
   getOrder ()
   {
      return Algorithm .clamp (this ._order .getValue (), 0, 5);
   },
   getTolerance ()
   {
      if (this ._tolerance .getValue () < 0)
         return 1e-4;

      return this ._tolerance .getValue ();
   },
   prepareEvents ()
   {
      var
         buffer = this .getBuffer (),
         order  = buffer .length - 1;

      if (this ._tau .getValue ())
      {
         var
            delta = 1 / this .getBrowser () .currentFrameRate,
            alpha = Math .exp (-delta / this ._tau .getValue ());

         for (var i = 0; i < order; ++ i)
         {
            this .assign (buffer, i + 1, this .interpolate (buffer [i], buffer [i + 1], alpha));
         }

         this .setValue (buffer [order]);

         if (! this .equals (buffer [order], buffer [0], this .getTolerance ()))
            return;
      }
      else
      {
         this .setValue (buffer [0]);

         order = 0;
      }

      for (var i = 1, length = buffer .length; i < length; ++ i)
         this .assign (buffer, i, buffer [order]);

      this .set_active (false);
   },
   set_value__ ()
   {
      var
         buffer = this .getBuffer (),
         value  = this .getValue ();

      for (var i = 1, length = buffer .length; i < length; ++ i)
         this .assign (buffer, i, value);

      this .setValue (value);

      this .set_active (true);
   },
   set_destination__ ()
   {
      this .assign (this .getBuffer (), 0, this .getDestination ());

      this .set_active (true);
   },
   set_order__ ()
   {
      var
         buffer = this .getBuffer (),
         value  = buffer [buffer .length - 1];

      for (var i = buffer .length, length = this .getOrder () + 1; i < length; ++ i)
         buffer [i] = this .duplicate (value);

      buffer .length = length;
   },
});

Object .defineProperties (X3DDamperNode,
{
   typeName:
   {
      value: "X3DDamperNode",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Followers", level: 1 }),
      enumerable: true,
   },
});

export default X3DDamperNode;
