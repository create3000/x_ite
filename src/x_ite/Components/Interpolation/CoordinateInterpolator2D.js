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
import X3DInterpolatorNode  from "./X3DInterpolatorNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function CoordinateInterpolator2D (executionContext)
{
   X3DInterpolatorNode .call (this, executionContext);

   this .addType (X3DConstants .CoordinateInterpolator2D);
}

Object .assign (Object .setPrototypeOf (CoordinateInterpolator2D .prototype, X3DInterpolatorNode .prototype),
{
   set_keyValue__ () { },
   interpolate (index0, index1, weight)
   {
      const keyValue = this ._keyValue .getValue ();

      let size = this ._key .length ? Math .floor (this ._keyValue .length / this ._key .length) : 0;

      this ._value_changed .length = size;

      const value_changed = this ._value_changed .getValue ();

      index0 *= size;
      index1  = index0 + (this ._key .length > 1 ? size : 0);

      index0 *= 2;
      index1 *= 2;
      size   *= 2;

      for (let i0 = 0; i0 < size; i0 += 2)
      {
         const i1 = i0 + 1;

         value_changed [i0] = Algorithm .lerp (keyValue [index0 + i0], keyValue [index1 + i0], weight);
         value_changed [i1] = Algorithm .lerp (keyValue [index0 + i1], keyValue [index1 + i1], weight);
      }

      this ._value_changed .addEvent ();
   },
});

Object .defineProperties (CoordinateInterpolator2D,
{
   typeName:
   {
      value: "CoordinateInterpolator2D",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Interpolation", level: 3 }),
      enumerable: true,
   },
   containerField:
   {
      value: "children",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.0", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "key",           new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "keyValue",      new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed", new Fields .MFVec2f ()),
      ]),
      enumerable: true,
   },
});

export default CoordinateInterpolator2D;
