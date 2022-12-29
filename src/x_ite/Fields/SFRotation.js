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

import X3DField     from "../Base/X3DField.js";
import SFVec3       from "./SFVec3.js";
import SFMatrix3    from "./SFMatrix3.js";
import X3DConstants from "../Base/X3DConstants.js";
import Generator    from "../InputOutput/Generator.js";
import Rotation4    from "../../standard/Math/Numbers/Rotation4.js";
import Matrix3      from "../../standard/Math/Numbers/Matrix3.js";

const
   SFVec3f    = SFVec3 .SFVec3f,
   SFMatrix3f = SFMatrix3 .SFMatrix3f;

function SFRotation (x, y, z, angle)
{
   switch (arguments .length)
   {
      case 0:
      {
         return X3DField .call (this, new Rotation4 ());
      }
      case 1:
      {
         if (arguments [0] instanceof SFMatrix3f)
            return X3DField .call (this, new Rotation4 () .setMatrix (arguments [0] .getValue ()));

         return X3DField .call (this, arguments [0]);
      }
      case 2:
      {
         if (arguments [1] instanceof SFVec3f)
            return X3DField .call (this, new Rotation4 (arguments [0] .getValue (), arguments [1] .getValue ()));

         return X3DField .call (this, new Rotation4 (arguments [0] .getValue (), +arguments [1]));
      }
      case 4:
      {
         return X3DField .call (this, new Rotation4 (+x, +y, +z, +angle));
      }
   }

   throw new Error ("Invalid arguments.");
}

SFRotation .prototype = Object .assign (Object .create (X3DField .prototype),
{
   constructor: SFRotation,
   [Symbol .iterator]: function* ()
   {
      yield* this .getValue ();
   },
   copy: function ()
   {
      return new SFRotation (this .getValue () .copy ());
   },
   equals: function (rotation)
   {
      return this .getValue () .equals (rotation .getValue ());
   },
   isDefaultValue: function ()
   {
      return this .getValue () .equals (Rotation4 .Identity);
   },
   getTypeName: function ()
   {
      return "SFRotation";
   },
   getType: function ()
   {
      return X3DConstants .SFRotation;
   },
   set: function (value)
   {
      this .getValue () .assign (value);
   },
   setAxis: function (vector)
   {
      this .getValue () .setAxis (vector .getValue ());
      this .addEvent ();
   },
   getAxis: function ()
   {
      return new SFVec3f (this .getValue () .getAxis () .copy ());
   },
   setMatrix: function (matrix)
   {
      this .getValue () .setMatrix (matrix .getValue ());
      this .addEvent ();
   },
   getMatrix: function ()
   {
      return new SFMatrix3f (this .getValue () .getMatrix (new Matrix3 ()));
   },
   inverse: function ()
   {
      return new SFRotation (Rotation4 .inverse (this .getValue ()));
   },
   multiply: function (rotation)
   {
      return new SFRotation (Rotation4 .multRight (this .getValue (), rotation .getValue ()));
   },
   multVec: function (vector)
   {
      return new SFVec3f (this .getValue () .multVecRot (vector .getValue () .copy ()));
   },
   slerp: function (rotation, t)
   {
      return new SFRotation (Rotation4 .slerp (this .getValue (), rotation .getValue (), t));
   },
   toStream: function (generator)
   {
      const rotation = this .getValue ();

      generator .string += generator .DoublePrecision (rotation .x) + " " +
                        generator .DoublePrecision (rotation .y) + " " +
                        generator .DoublePrecision (rotation .z) + " " +
                        generator .DoublePrecision (generator .ToUnit ("angle", rotation .angle));
   },
   toVRMLStream: function (generator)
   {
      this .toStream (generator);
   },
   toXMLStream: function (generator)
   {
      this .toStream (generator);
   },
});

for (const key of Reflect .ownKeys (SFRotation .prototype))
   Object .defineProperty (SFRotation .prototype, key, { enumerable: false });

const x = {
   get: function ()
   {
      return this .getValue () .x;
   },
   set: function (value)
   {
      this .getValue () .x = +value;
      this .addEvent ();
   },
   enumerable: true,
   configurable: false
};

const y = {
   get: function ()
   {
      return this .getValue () .y;
   },
   set: function (value)
   {
      this .getValue () .y = +value;
      this .addEvent ();
   },
   enumerable: true,
   configurable: false
};

const z = {
   get: function ()
   {
      return this .getValue () .z;
   },
   set: function (value)
   {
      this .getValue () .z = +value;
      this .addEvent ();
   },
   enumerable: true,
   configurable: false
};

const angle = {
   get: function ()
   {
      return this .getValue () .angle;
   },
   set: function (value)
   {
      this .getValue () .angle = +value;
      this .addEvent ();
   },
   enumerable: true,
   configurable: false
};

Object .defineProperty (SFRotation .prototype, "x",     x);
Object .defineProperty (SFRotation .prototype, "y",     y);
Object .defineProperty (SFRotation .prototype, "z",     z);
Object .defineProperty (SFRotation .prototype, "angle", angle);

x     .enumerable = false;
y     .enumerable = false;
z     .enumerable = false;
angle .enumerable = false;

Object .defineProperty (SFRotation .prototype, "0", x);
Object .defineProperty (SFRotation .prototype, "1", y);
Object .defineProperty (SFRotation .prototype, "2", z);
Object .defineProperty (SFRotation .prototype, "3", angle);

export default SFRotation;
