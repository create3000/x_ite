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

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChaserNode        from "./X3DChaserNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";

var
   a        = new Rotation4 (),
   rotation = new Rotation4 ();

function OrientationChaser (executionContext)
{
   X3DChaserNode .call (this, executionContext);

   this .addType (X3DConstants .OrientationChaser);

   this ._set_value          .setUnit ("angle");
   this ._set_destination    .setUnit ("angle");
   this ._initialValue       .setUnit ("angle");
   this ._initialDestination .setUnit ("angle");
   this ._value_changed      .setUnit ("angle");
}

Object .assign (Object .setPrototypeOf (OrientationChaser .prototype, X3DChaserNode .prototype),
{
   getVector ()
   {
      return new Rotation4 ();
   },
   equals (lhs, rhs, tolerance)
   {
      a .assign (lhs) .inverse () .multRight (rhs);

      return Math .abs (a .angle) < tolerance;
   },
   interpolate (source, destination, weight)
   {
      return rotation .assign (source) .slerp (destination, weight);
   },
   step (value1, value2, t)
   {
      this .deltaOut .assign (value2) .inverse () .multRight (value1) .multLeft (this .output);

      this .output .slerp (this .deltaOut, t);
   },
});

Object .defineProperties (OrientationChaser,
{
   ... X3DNode .getStaticProperties ("OrientationChaser", "Followers", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_value",          new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_destination",    new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialValue",       new Fields .SFRotation (0, 1, 0, 0)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialDestination", new Fields .SFRotation (0, 1, 0, 0)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "duration",           new Fields .SFTime (1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "value_changed",      new Fields .SFRotation ()),
      ]),
      enumerable: true,
   },
});

export default OrientationChaser;
