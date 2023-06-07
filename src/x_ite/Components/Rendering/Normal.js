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
import X3DNormalNode        from "./X3DNormalNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

function Normal (executionContext)
{
   X3DNormalNode .call (this, executionContext);

   this .addType (X3DConstants .Normal);
}

Normal .prototype = Object .assign (Object .create (X3DNormalNode .prototype),
{
   constructor: Normal,
   initialize ()
   {
      X3DNormalNode .prototype .initialize .call (this);

      this ._vector .addInterest ("set_vector__", this);

      this .set_vector__ ();
   },
   set_vector__ ()
   {
      this .vector = this ._vector .getValue ();
      this .length = this ._vector .length;
   },
   set1Vector (index, vector)
   {
      this ._vector [index] = vector;
   },
   get1Vector (index, result)
   {
      if (index >= 0 && index < this .length)
      {
         const vector = this .vector;

         index *= 3;

         return result .set (vector [index], vector [index + 1], vector [index + 2]);
      }
      else if (index >= 0 && this .length)
      {
         const vector = this .vector;

         index %= this .length;
         index *= 3;

         return result .set (vector [index], vector [index + 1], vector [index + 2]);
      }
      else
      {
         return result .set (0, 0, 0);
      }
   },
   addVector (index, array)
   {
      if (index >= 0 && index < this .length)
      {
         const vector = this .vector;

         index *= 3;

         array .push (vector [index], vector [index + 1], vector [index + 2]);
      }
      else if (index >= 0 && this .length)
      {
         const vector = this .vector;

         index %= this .length;
         index *= 3;

         array .push (vector [index], vector [index + 1], vector [index + 2]);
      }
      else
      {
         return array .push (0, 0, 0);
      }
   },
   addNormals (array, min)
   {
      if (this .length)
      {
         const vector = this .vector;

         for (var index = 0, length = Math .min (min, this .length) * 3; index < length; index += 3)
            array .push (vector [index], vector [index + 1], vector [index + 2]);

         if (this .length < min)
         {
            var index = (this .length - 1) * 3;

            const
               x = vector [index],
               y = vector [index + 1],
               z = vector [index + 2];

            for (var index = length, length = min * 3; index < length; index += 3)
               array .push (x, y, z);
         }
      }
      else
      {
         for (let index = 0; index < min; ++ index)
            array .push (0, 0, 0);
      }

      return array;
   },
});

Object .defineProperties (Normal,
{
   typeName:
   {
      value: "Normal",
      enumerable: true,
   },
   componentName:
   {
      value: "Rendering",
      enumerable: true,
   },
   containerField:
   {
      value: "normal",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze (["2.0", "Infinity"]),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "vector",   new Fields .MFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default Normal;
