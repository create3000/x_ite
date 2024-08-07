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

import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DVertexAttributeNode from "./X3DVertexAttributeNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import Matrix3                from "../../../standard/Math/Numbers/Matrix3.js";

function Matrix3VertexAttribute (executionContext)
{
   X3DVertexAttributeNode .call (this, executionContext);

   this .addType (X3DConstants .Matrix3VertexAttribute);
}

Object .assign (Object .setPrototypeOf (Matrix3VertexAttribute .prototype, X3DVertexAttributeNode .prototype),
{
   initialize ()
   {
      X3DVertexAttributeNode .prototype .initialize .call (this);

      this ._value .addInterest ("set_value__", this);

      this .set_value__ ();
   },
   set_value__ ()
   {
      this .value  = this ._value .getValue ();
      this .length = this ._value .length;
   },
   addValue (index, array)
   {
      if (index < this .length)
      {
         const value = this .value;

         for (let i = index * 9, l = i + 9; i < l; ++ i)
            array .push (value [i]);
      }
      else if (this .length)
      {
         const value = this .value;

         index = this .length - 1;

         for (let i = index * 9, l = i + 9; i < l; ++ i)
            array .push (value [i]);
      }
      else
      {
         const value = Matrix3 .Identity;

         for (let i = 0; i < 9; ++ i)
            array .push (value [i]);
      }
   },
   enable (gl, shaderNode, buffer)
   {
      shaderNode .enableMatrix3Attrib (gl, this ._name .getValue (), buffer, 0, 0);
   },
});

Object .defineProperties (Matrix3VertexAttribute, X3DNode .staticProperties ("Matrix3VertexAttribute", "Shaders", 1, "attrib", "3.0", "Infinity"));

Object .defineProperties (Matrix3VertexAttribute,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "name",     new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "value",    new Fields .MFMatrix3f ()),
      ]),
      enumerable: true,
   },
});

export default Matrix3VertexAttribute;
