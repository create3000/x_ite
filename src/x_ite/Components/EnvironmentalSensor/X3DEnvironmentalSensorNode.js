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

import Fields        from "../../Fields.js";
import X3DNode       from "../Core/X3DNode.js";
import X3DSensorNode from "../Core/X3DSensorNode.js";
import X3DConstants  from "../../Base/X3DConstants.js";
import Vector3       from "../../../standard/Math/Numbers/Vector3.js";

function X3DEnvironmentalSensorNode (executionContext)
{
   X3DSensorNode .call (this, executionContext);

   this .addType (X3DConstants .X3DEnvironmentalSensorNode);

   this .addChildObjects (X3DConstants .outputOnly, "traversed", new Fields .SFBool (true));

   this ._size   .setUnit ("length");
   this ._center .setUnit ("length");

   this .zeroTest         = false;
   this .currentTraversed = true;
}

Object .assign (Object .setPrototypeOf (X3DEnvironmentalSensorNode .prototype, X3DSensorNode .prototype),
{
   initialize ()
   {
      X3DSensorNode .prototype .initialize .call (this);

      this .getLive () .addInterest ("set_live__", this);

      this ._enabled   .addInterest ("set_live__", this);
      this ._size      .addInterest ("set_live__", this);
      this ._traversed .addInterest ("set_live__", this);

      this .set_live__ ();
   },
   set_live__ ()
   {
      if (this ._traversed .getValue () && this .getLive () .getValue () && this ._enabled .getValue () && !(this .zeroTest && this ._size. getValue () .equals (Vector3 .Zero)))
      {
         this .getBrowser () .sensorEvents () .addInterest ("update", this);
      }
      else
      {
         this .getBrowser () .sensorEvents () .removeInterest ("update", this);

         if (this ._isActive .getValue ())
         {
            this ._isActive = false;
            this ._exitTime = this .getBrowser () .getCurrentTime ();
         }
      }
   },
   setZeroTest (value)
   {
      this .zeroTest = value;
   },
   getZeroTest ()
   {
      return this .zeroTest;
   },
   setTraversed (value)
   {
      if (value)
      {
         if (this ._traversed .getValue () === false)
            this ._traversed = true;
      }
      else
      {
         if (this .currentTraversed !== this ._traversed .getValue ())
            this ._traversed = this .currentTraversed;
      }

      this .currentTraversed = value;
   },
   getTraversed ()
   {
      return this .currentTraversed;
   },
   update () { },
});

Object .defineProperties (X3DEnvironmentalSensorNode,
{
   typeName:
   {
      value: "X3DEnvironmentalSensorNode",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "EnvironmentalSensor", level: 1 }),
      enumerable: true,
   },
});

export default X3DEnvironmentalSensorNode;
